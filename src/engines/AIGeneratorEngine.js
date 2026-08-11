import { AppLogger } from '../utils/AppLogger.js';

export class AIGeneratorEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }

    async generateBootcamp(apiKey, goal, weeks, hoursPerDay) {
        AppLogger.info(`AI Generator: Début de génération pour l'objectif '${goal}'`);
        
        const systemPrompt = `Tu es un Pédagogue Expert et Ingénieur de Formation. 
Ton rôle est de créer un Bootcamp intensif sur-mesure pour un étudiant.
L'étudiant a l'objectif suivant : "${goal}".
Le Bootcamp doit durer ${weeks} semaines, à raison de ${hoursPerDay} heures par jour.

Tu dois répondre UNIQUEMENT par un objet JSON valide (sans formatage Markdown, sans texte avant ou après). Le JSON doit strictement respecter le format suivant:
{
  "title": "Titre du Bootcamp",
  "description": "Courte description inspirante (2-3 phrases)",
  "skills": [
    { "id": "code_unique", "label": "Nom de la matière", "color": "#codeHexadecimal" }
  ],
  "habits": [
    { "id": "hab_1", "title": "Nom de l'habitude (ex: Révision flash)", "minTime": 15, "skillId": "code_unique_existant_dans_skills" }
  ],
  "program": [
    {
      "week": 1,
      "days": [
        {
          "day": 1,
          "sessions": [
            { "title": "Titre de la session", "expectedDuration": 60, "skillId": "code_unique", "priority": "Haute" }
          ]
        }
      ]
    }
  ]
}

Règles impératives :
1. Crée entre 3 et 6 "skills" pertinents pour l'objectif avec des couleurs (hex) harmonieuses. Toujours inclure une matière 'reflection' (Bilan).
2. Crée 2 ou 3 "habits" (habitudes quotidiennes) de 10 à 20 minutes maximum (utilise un skillId valide).
3. Tu dois impérativement générer le programme pour TOUS LES JOURS de TOUTES LES SEMAINES. (Donc ${weeks} semaines avec 7 jours par semaine = ${weeks * 7} jours).
4. Chaque jour (day) doit comporter un nombre de sessions dont la somme des "expectedDuration" (en minutes) s'approche de ${hoursPerDay * 60} minutes. Ne dépasse pas de beaucoup.
5. Inclus des jours de repos ou de révision légère (par ex le jour 7).
6. Le JSON doit être prêt à être parsé par JSON.parse(). AUCUNE balise markdown \`\`\`json. Seulement l'objet { ... }
`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: systemPrompt }]
                    }]
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || "Erreur API Gemini");
            }

            const data = await response.json();
            const textContent = data.candidates[0].content.parts[0].text;
            
            // Clean markdown if the LLM still added it
            const jsonStr = textContent.replace(/```json/g, '').replace(/```/g, '').trim();
            const bootcampData = JSON.parse(jsonStr);

            // Validation de base
            if (!bootcampData.program || !bootcampData.skills || !bootcampData.habits) {
                throw new Error("Structure JSON invalide générée par l'IA.");
            }

            // Save to DB
            await this.storage.saveData('bootcamp_program', bootcampData.program);
            await this.storage.saveData('bootcamp_skills', bootcampData.skills);
            await this.storage.saveData('bootcamp_habits', bootcampData.habits);
            await this.storage.saveData('bootcamp_metadata', {
                title: bootcampData.title,
                description: bootcampData.description
            });
            await this.storage.saveData('bootcamp_program_version', 'AI_GENERATED');
            
            // Réinitialiser le suivi des jours pour le nouveau programme
            const todayStr = new Date().toLocaleDateString('fr-CA') + 'T12:00:00';
            await this.storage.saveData('bootcamp_start_date', todayStr);
            await this.storage.saveData('bootcamp_offset', 0);
            await this.storage.saveData('current_day_index', 0);

            AppLogger.info("AI Generator: Bootcamp généré et sauvegardé avec succès.");
            return true;
        } catch (e) {
            AppLogger.error("AI Generator error: " + e.message);
            throw e;
        }
    }
}
