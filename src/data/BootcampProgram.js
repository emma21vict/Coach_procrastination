export const DefaultBootcampProgram = [
    {
        week: 1,
        theme: "Les Fondations",
        objective: "Construire les bases indispensables en anglais, cybersécurité, Python, Excel et apprentissage de l'IA.",
        missions: [
            "🇬🇧 Finir au moins 5 modules sur Busuu.",
            "🇬🇧 Réaliser 3 heures de shadowing.",
            "🛡️ Terminer au moins 3 salles TryHackMe.",
            "🛡️ Avancer sur les modules Cisco et Linux Journey chaque jour.",
            "🤖 Écrire plusieurs scripts Python (variables, conditions, boucles).",
            "🤖 Comprendre les bases de Pandas et de NumPy.",
            "📊 Créer un premier tableau Excel avec formules, graphique et mise en forme.",
            "🏆 Participer à toutes les sessions Force-N prévues."
        ],
        days: [
            { day: 1, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Pratiquer le vocabulaire et la grammaire de base", expectedResult: "Compléter une leçon Busuu", proof: "Capture d'écran Busuu", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing TED Talk)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Améliorer la prononciation et l'intonation", expectedResult: "Répéter un discours de manière fluide", proof: "Enregistrement audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Cisco Networking Academy", skillId: "cyber_network", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Comprendre l'adressage IP", expectedResult: "Compléter le module et les exercices", proof: "Notes Cisco", difficulty: "🟡", xp: 120, resourceLink: "https://www.netacad.com/" },
                { title: "Python (Bases)", skillId: "ia_python", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Maîtriser variables, conditions, boucles", expectedResult: "Écrire un petit programme sans aide", proof: "Script Python", difficulty: "🟢", xp: 60, resourceLink: "" },
                { title: "Excel", skillId: "data_excel", expectedDuration: 60, startTime: "09:30", endTime: "10:30", objective: "Découvrir l'interface et formules simples", expectedResult: "Créer un tableau de base", proof: "Fichier Excel", difficulty: "🟢", xp: 60, resourceLink: "https://excel-practice-online.com/" },
                { title: "Linux Journey", skillId: "cyber_linux", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Naviguer dans un terminal", expectedResult: "Maîtriser cd, pwd, ls", proof: "Capture + notes", difficulty: "🟢", xp: 60, resourceLink: "https://linuxjourney.com/" },
                { title: "NumPy", skillId: "ia_numpy", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Créer et manipuler des tableaux", expectedResult: "Faire des opérations sur tableaux", proof: "Notebook NumPy", difficulty: "🟡", xp: 120, resourceLink: "https://numpy.org/" },
                { title: "Force-N (Coaching PPP)", skillId: "force_n", expectedDuration: 120, startTime: "15:00", endTime: "17:00", objective: "Participer au coaching", expectedResult: "Valider la session", proof: "Notes de session", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Révision rapide + fiches", skillId: "reflection", expectedDuration: 45, startTime: "17:15", endTime: "18:00", objective: "Consolider les acquis du jour", expectedResult: "Fiches créées/révisées", proof: "Fiches de révision", difficulty: "🟢", xp: 45, resourceLink: "" }
            ]},
            { day: 2, sessions: [
                { title: "Dessin animé en anglais", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Améliorer la compréhension orale", expectedResult: "Comprendre sans sous-titres", proof: "Notes de vocabulaire", difficulty: "🟢", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing BBC)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Améliorer l'accent", expectedResult: "Discours fluide", proof: "Enregistrement audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.bbc.co.uk/learningenglish/" },
                { title: "TryHackMe", skillId: "cyber_tryhackme", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Découvrir la plateforme et faire une room", expectedResult: "Compléter une room débutant", proof: "Badge TryHackMe", difficulty: "🟡", xp: 120, resourceLink: "https://tryhackme.com/" },
                { title: "Pandas", skillId: "ia_pandas", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Comprendre Series et DataFrame", expectedResult: "Manipuler des données de base", proof: "Notebook Pandas", difficulty: "🟢", xp: 60, resourceLink: "https://pandas.pydata.org/" },
                { title: "Excel (Fonctions avancées)", skillId: "data_excel", expectedDuration: 60, startTime: "09:30", endTime: "10:30", objective: "Utiliser SOMME, MOYENNE, SI", expectedResult: "Automatiser des calculs", proof: "Fichier Excel", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "GitHub Skills", skillId: "dev_git", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Apprendre les bases de Git", expectedResult: "Premier commit", proof: "Premier dépôt GitHub", difficulty: "🟢", xp: 60, resourceLink: "https://skills.github.com/" },
                { title: "Lecture en anglais", skillId: "english_speaking", expectedDuration: 60, startTime: "11:30", endTime: "12:30", objective: "Enrichir le vocabulaire", expectedResult: "Lire un article complet", proof: "Notes de vocabulaire", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Exercices Python/Pandas", skillId: "ia_pandas", expectedDuration: 75, startTime: "12:30", endTime: "13:45", objective: "Mettre en pratique les concepts", expectedResult: "Script fonctionnel", proof: "Script Python", difficulty: "🟡", xp: 75, resourceLink: "" },
                { title: "Force-N (Entrepreneuriat)", skillId: "force_n", expectedDuration: 120, startTime: "14:00", endTime: "16:00", objective: "Participer à la session", expectedResult: "Valider la session", proof: "Notes", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Exercices Excel", skillId: "data_excel", expectedDuration: 105, startTime: "16:15", endTime: "18:00", objective: "Pratiquer les fonctions", expectedResult: "Tableau automatisé", proof: "Fichier Excel", difficulty: "🟡", xp: 105, resourceLink: "" }
            ]},
            { day: 3, sessions: [
                { title: "Scrabble GO (Anglais)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Travailler le vocabulaire", expectedResult: "Gagner une partie ou trouver de bons mots", proof: "Capture d'écran", difficulty: "🟢", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Perfectionner l'articulation", expectedResult: "Discours fluide", proof: "Enregistrement audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "OSINT Framework", skillId: "cyber_osint", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Découvrir les outils OSINT", expectedResult: "Trouver des informations publiquement", proof: "Capture + notes", difficulty: "🟡", xp: 120, resourceLink: "https://osintframework.com/" },
                { title: "Excel (Graphiques)", skillId: "data_excel", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Visualiser des données", expectedResult: "Créer un graphique clair", proof: "Fichier Excel avec graphique", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Force-N (Employabilité)", skillId: "force_n", expectedDuration: 120, startTime: "10:00", endTime: "12:00", objective: "Participer à la session", expectedResult: "Valider la session", proof: "Notes", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Intro au Machine Learning", skillId: "ia_ml", expectedDuration: 90, startTime: "13:00", endTime: "14:30", objective: "Comprendre les concepts de base du ML", expectedResult: "Assimiler les principes", proof: "Notes de cours", difficulty: "🔴", xp: 90, resourceLink: "" },
                { title: "Force-N (Coaching PPP)", skillId: "force_n", expectedDuration: 120, startTime: "15:00", endTime: "17:00", objective: "Participer au coaching", expectedResult: "Valider la session", proof: "Notes", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Linux Journey (pratique)", skillId: "cyber_linux", expectedDuration: 105, startTime: "17:15", endTime: "19:00", objective: "Mettre en pratique les commandes", expectedResult: "Gérer fichiers et répertoires", proof: "Captures Linux", difficulty: "🟡", xp: 105, resourceLink: "https://linuxjourney.com/" }
            ]},
            { day: 4, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Avancer dans le programme Busuu", expectedResult: "Compléter 1 module", proof: "Capture Busuu", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing BBC)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Travailler l'intonation", expectedResult: "Répéter un dialogue", proof: "Enregistrement audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.bbc.co.uk/learningenglish/" },
                { title: "Cisco (DNS, HTTP, HTTPS)", skillId: "cyber_network", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Comprendre les protocoles web", expectedResult: "Terminer le module", proof: "Notes Cisco", difficulty: "🔴", xp: 120, resourceLink: "https://www.netacad.com/" },
                { title: "Scikit-Learn", skillId: "ia_ml", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Installation et découverte", expectedResult: "Environnement prêt", proof: "Capture d'écran IDE", difficulty: "🟡", xp: 60, resourceLink: "https://scikit-learn.org/" },
                { title: "Excel (TCD)", skillId: "data_excel", expectedDuration: 60, startTime: "09:30", endTime: "10:30", objective: "Créer un Tableau Croisé Dynamique", expectedResult: "Analyse de données", proof: "Fichier Excel", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "Mentor Force-N", skillId: "force_n", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Rendez-vous mentor", expectedResult: "Valider les objectifs", proof: "Compte rendu", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Mini-projet Python", skillId: "ia_python", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Réaliser un projet complet", expectedResult: "Script fonctionnel", proof: "Script Python complet", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Force-N (Test de qualification)", skillId: "force_n", expectedDuration: 120, startTime: "15:00", endTime: "17:00", objective: "Passer le test", expectedResult: "Réussir le test", proof: "Résultat du test", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Révision générale", skillId: "reflection", expectedDuration: 75, startTime: "17:15", endTime: "18:30", objective: "Faire le point", expectedResult: "Consolidation", proof: "Fiches de synthèse", difficulty: "🟡", xp: 75, resourceLink: "" }
            ]},
            { day: 5, sessions: [
                { title: "IA de conversation (Anglais)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Pratiquer à l'oral", expectedResult: "Conversation de 10 min", proof: "Résumé de la conversation", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing Discours)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Travailler la présence vocale", expectedResult: "Discours charismatique", proof: "Enregistrement audio", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "TryHackMe", skillId: "cyber_tryhackme", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Pratiquer le pentest de base", expectedResult: "Résoudre une room", proof: "Badge TryHackMe", difficulty: "🔴", xp: 120, resourceLink: "https://tryhackme.com/" },
                { title: "Pandas (filtrage, nettoyage)", skillId: "ia_pandas", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Nettoyer un dataset", expectedResult: "Dataset propre", proof: "Notebook Pandas", difficulty: "🟡", xp: 60, resourceLink: "https://pandas.pydata.org/" },
                { title: "Excel (Mise en forme conditionnelle)", skillId: "data_excel", expectedDuration: 60, startTime: "09:30", endTime: "10:30", objective: "Mettre en valeur des données", expectedResult: "Tableau visuel", proof: "Fichier Excel", difficulty: "🟢", xp: 60, resourceLink: "" },
                { title: "GitHub Skills", skillId: "dev_git", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Gérer des branches", expectedResult: "Merge réussi", proof: "Dépôt GitHub à jour", difficulty: "🟡", xp: 60, resourceLink: "https://skills.github.com/" },
                { title: "Lecture", skillId: "english_speaking", expectedDuration: 60, startTime: "11:30", endTime: "12:30", objective: "Lecture approfondie", expectedResult: "Comprendre le texte", proof: "Notes", difficulty: "🟢", xp: 60, resourceLink: "" },
                { title: "Kaggle Learn", skillId: "ia_ml", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Découvrir la Data Science", expectedResult: "Compléter un cours", proof: "Certificat Kaggle", difficulty: "🔴", xp: 120, resourceLink: "https://www.kaggle.com/learn" },
                { title: "Projet IA + Excel", skillId: "ia_ml", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Combiner Python et Excel", expectedResult: "Projet de bout en bout", proof: "Fichiers de projet", difficulty: "🔴", xp: 180, resourceLink: "" }
            ]},
            { day: 6, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Finir les modules de la semaine", expectedResult: "Atteindre l'objectif hebo", proof: "Capture de progression", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Dernière révision orale", expectedResult: "Fluidité totale", proof: "Enregistrement", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Projet Cyber", skillId: "cyber_network", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Appliquer Linux et TryHackMe", expectedResult: "Finaliser le projet", proof: "Rapport ou capture", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Projet IA", skillId: "ia_python", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Appliquer Python et Pandas", expectedResult: "Projet fonctionnel", proof: "Notebook finalisé", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Projet Excel", skillId: "data_excel", expectedDuration: 90, startTime: "10:30", endTime: "12:00", objective: "Créer le tableau de suivi", expectedResult: "Tableau de suivi complet", proof: "Fichier Excel", difficulty: "🟡", xp: 90, resourceLink: "" },
                { title: "Révision générale", skillId: "reflection", expectedDuration: 120, startTime: "13:00", endTime: "15:00", objective: "Revoir la semaine", expectedResult: "Synthèse", proof: "Mindmap", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Corrections et consolidation", skillId: "reflection", expectedDuration: 150, startTime: "15:00", endTime: "17:30", objective: "Rattraper le retard", expectedResult: "Tous objectifs atteints", proof: "Aucune tâche manquante", difficulty: "🟡", xp: 150, resourceLink: "" }
            ]},
            { day: 7, sessions: [
                { title: "Repos / Préparation (Optionnel)", skillId: "reflection", expectedDuration: 60, startTime: "10:00", endTime: "11:00", objective: "Se reposer et préparer la suite", expectedResult: "Prêt pour la semaine 2", proof: "Programme semaine 2", difficulty: "🟢", xp: 60, resourceLink: "" }
            ]}
        ]
    },
    {
        week: 2,
        theme: "Consolidation et pratique",
        objective: "Passer du mode 'je découvre' au mode 'je pratique'.",
        missions: [
            "🇬🇧 Tenir une conversation simple en anglais pendant quelques minutes.",
            "🇬🇧 Faire du shadowing avec une meilleure prononciation.",
            "🛡️ Être plus autonome sur Linux et les bases réseau.",
            "🤖 Manipuler des données avec Pandas.",
            "📊 Créer un tableau Excel professionnel avec graphiques et tableaux croisés."
        ],
        days: [
            { day: 1, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Consolider le vocabulaire", expectedResult: "Leçon terminée", proof: "Capture Busuu", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Pratiquer le shadowing TED", expectedResult: "Prononciation fluide", proof: "Audio TED", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Cisco (IPv4, sous-réseaux)", skillId: "cyber_network", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Maîtriser IPv4", expectedResult: "Exercices Cisco validés", proof: "Notes sous-réseaux", difficulty: "🔴", xp: 120, resourceLink: "https://www.netacad.com/" },
                { title: "Python (Fonctions)", skillId: "ia_python", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Créer des fonctions réutilisables", expectedResult: "Code modulaire", proof: "Script Python", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Excel (Fonctions avancées)", skillId: "data_excel", expectedDuration: 60, startTime: "09:30", endTime: "10:30", objective: "SI, NB.SI, RECHERCHEV", expectedResult: "Tableau dynamique automatisé", proof: "Fichier Excel", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Linux Journey (Permissions)", skillId: "cyber_linux", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Gérer chmod/chown", expectedResult: "Permissions comprises", proof: "Capture Linux", difficulty: "🟡", xp: 60, resourceLink: "https://linuxjourney.com/" },
                { title: "Pandas (Nettoyage)", skillId: "ia_pandas", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Importation et nettoyage", expectedResult: "Dataset propre", proof: "Notebook Pandas", difficulty: "🟡", xp: 120, resourceLink: "https://pandas.pydata.org/" },
                { title: "Mini-projet Python + Excel", skillId: "ia_ml", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Combiner les compétences", expectedResult: "Mini-projet abouti", proof: "Livrable complet", difficulty: "🔴", xp: 180, resourceLink: "" }
            ]},
            { day: 2, sessions: [
                { title: "Dessin animé en anglais", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Compréhension orale", expectedResult: "Regarder sans ST", proof: "Vocabulaire noté", difficulty: "🟢", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing BBC)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Shadowing BBC", expectedResult: "Fluidité", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.bbc.co.uk/learningenglish/" },
                { title: "TryHackMe", skillId: "cyber_tryhackme", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Pratique cybersécurité", expectedResult: "Terminer la room", proof: "Badge ou capture", difficulty: "🔴", xp: 120, resourceLink: "https://tryhackme.com/" },
                { title: "NumPy", skillId: "ia_numpy", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Révision Numpy", expectedResult: "Exercices terminés", proof: "Notebook Numpy", difficulty: "🟡", xp: 60, resourceLink: "https://numpy.org/" },
                { title: "Excel (Tri, filtres, validation)", skillId: "data_excel", expectedDuration: 60, startTime: "09:30", endTime: "10:30", objective: "Nettoyer des données dans Excel", expectedResult: "Feuille de calcul sans erreurs", proof: "Fichier Excel", difficulty: "🟢", xp: 60, resourceLink: "" },
                { title: "GitHub Skills", skillId: "dev_git", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Pratiquer Git", expectedResult: "Dépôt mis à jour", proof: "Historique de commits", difficulty: "🟢", xp: 60, resourceLink: "https://skills.github.com/" },
                { title: "Lecture en anglais", skillId: "english_speaking", expectedDuration: 60, startTime: "11:30", endTime: "12:30", objective: "Lecture longue", expectedResult: "Lire plusieurs pages", proof: "Résumé", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Kaggle Learn", skillId: "ia_ml", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Avancer sur Kaggle", expectedResult: "Module terminé", proof: "Certificat/Badge Kaggle", difficulty: "🟡", xp: 120, resourceLink: "https://www.kaggle.com/learn" },
                { title: "Exercices pratiques", skillId: "ia_ml", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Mise en pratique globale", expectedResult: "Exercices résolus", proof: "Code produit", difficulty: "🔴", xp: 180, resourceLink: "" }
            ]},
            { day: 3, sessions: [
                { title: "IA de conversation", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Conversation fluide", expectedResult: "Échange de 10 min", proof: "Notes de session", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing Discours)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Shadowing discours inspirant", expectedResult: "Imitation parfaite", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "OSINT Framework", skillId: "cyber_osint", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Recherche en source ouverte", expectedResult: "Outils maîtrisés", proof: "Capture des recherches", difficulty: "🟡", xp: 120, resourceLink: "https://osintframework.com/" },
                { title: "Machine Learning (Préparation)", skillId: "ia_ml", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Préparer les données pour le ML", expectedResult: "Données prêtes à l'emploi", proof: "Script/Notebook", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "Excel (Graphiques avancés)", skillId: "data_excel", expectedDuration: 60, startTime: "09:30", endTime: "10:30", objective: "Faire des graphiques pro", expectedResult: "Graphique clair et lisible", proof: "Fichier Excel", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Linux Journey", skillId: "cyber_linux", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Avancer sur les commandes", expectedResult: "Nouveau module fini", proof: "Notes de commandes", difficulty: "🟢", xp: 60, resourceLink: "https://linuxjourney.com/" },
                { title: "Pandas (Jointures)", skillId: "ia_pandas", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Faire des merges/joins", expectedResult: "Datasets combinés", proof: "Notebook Pandas", difficulty: "🔴", xp: 120, resourceLink: "https://pandas.pydata.org/" },
                { title: "Projet Cyber", skillId: "cyber_network", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Appliquer la théorie", expectedResult: "Scénario résolu", proof: "Rapport d'intervention", difficulty: "🔴", xp: 180, resourceLink: "" }
            ]},
            { day: 4, sessions: [
                { title: "Anglais (Scrabble GO)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Travailler les mots complexes", expectedResult: "Bons scores", proof: "Capture d'écran", difficulty: "🟢", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Shadowing TED", expectedResult: "Bonne intonation", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Mentor Force-N", skillId: "force_n", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Rendez-vous mentor", expectedResult: "Alignement des objectifs", proof: "Compte-rendu", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Scikit-Learn (Régression)", skillId: "ia_ml", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Comprendre la régression linéaire", expectedResult: "Modèle entraîné", proof: "Notebook Sklearn", difficulty: "🔴", xp: 60, resourceLink: "https://scikit-learn.org/" },
                { title: "Excel (Tableaux croisés dynamiques)", skillId: "data_excel", expectedDuration: 60, startTime: "09:30", endTime: "10:30", objective: "Créer des TCD avancés", expectedResult: "TCD interactif", proof: "Fichier Excel", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "Cisco (DNS, DHCP)", skillId: "cyber_network", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Comprendre les services réseaux", expectedResult: "Test Cisco validé", proof: "Notes de cours", difficulty: "🟡", xp: 60, resourceLink: "https://www.netacad.com/" },
                { title: "Lecture en anglais", skillId: "english_speaking", expectedDuration: 60, startTime: "11:30", endTime: "12:30", objective: "Lire un article technique", expectedResult: "Résumé", proof: "Fiche de lecture", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Mini-projet IA", skillId: "ia_ml", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Appliquer la régression", expectedResult: "Prédiction réussie", proof: "Livrable IA", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Révisions générales", skillId: "reflection", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Consolider la semaine", expectedResult: "Fiches complètes", proof: "Cartes mentales/fiches", difficulty: "🟡", xp: 180, resourceLink: "" }
            ]},
            { day: 5, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Valider les leçons", expectedResult: "Modules finis", proof: "Capture de la semaine", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing BBC)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Shadowing intensif", expectedResult: "Prononciation parfaite", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.bbc.co.uk/learningenglish/" },
                { title: "TryHackMe", skillId: "cyber_tryhackme", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Terminer un module Cyber", expectedResult: "Room terminée", proof: "Badge final", difficulty: "🔴", xp: 120, resourceLink: "https://tryhackme.com/" },
                { title: "Pandas (Visualisation)", skillId: "ia_pandas", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Tracer des graphiques", expectedResult: "Graphiques avec Pandas/Matplotlib", proof: "Notebook visuel", difficulty: "🟡", xp: 60, resourceLink: "https://pandas.pydata.org/" },
                { title: "Excel (Dashboard simple)", skillId: "data_excel", expectedDuration: 60, startTime: "09:30", endTime: "10:30", objective: "Compiler les données", expectedResult: "Dashboard dynamique", proof: "Fichier Excel final", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "GitHub Skills", skillId: "dev_git", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Collaborer sur Git", expectedResult: "Pull Request réussie", proof: "Lien de la PR", difficulty: "🟡", xp: 60, resourceLink: "https://skills.github.com/" },
                { title: "IA de conversation", skillId: "english_speaking", expectedDuration: 60, startTime: "11:30", endTime: "12:30", objective: "Conversation longue", expectedResult: "Échange technique en anglais", proof: "Résumé", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "Kaggle", skillId: "ia_ml", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Challenge de données", expectedResult: "Soumission réussie", proof: "Score Kaggle", difficulty: "🔴", xp: 120, resourceLink: "https://www.kaggle.com/" },
                { title: "Projet IA", skillId: "ia_ml", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Développer le projet IA", expectedResult: "Modèle en place", proof: "Notebook final", difficulty: "🔴", xp: 180, resourceLink: "" }
            ]},
            { day: 6, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Révision de la semaine", expectedResult: "Objectifs hebdo atteints", proof: "Capture Bilan", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Révision vocale", expectedResult: "Sans faute", proof: "Audio de validation", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Projet Cybersécurité", skillId: "cyber_network", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Finaliser le projet cyber", expectedResult: "Objectif atteint", proof: "Livrable", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Projet IA", skillId: "ia_ml", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Finaliser le projet IA", expectedResult: "Objectif atteint", proof: "Livrable", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Projet Excel", skillId: "data_excel", expectedDuration: 90, startTime: "10:30", endTime: "12:00", objective: "Finaliser le dashboard", expectedResult: "Dashboard professionnel", proof: "Fichier Excel", difficulty: "🟡", xp: 90, resourceLink: "" },
                { title: "Révision de toute la semaine", skillId: "reflection", expectedDuration: 120, startTime: "13:00", endTime: "15:00", objective: "Faire le bilan", expectedResult: "Identification des lacunes", proof: "Journal d'apprentissage", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Correction des erreurs + fiches", skillId: "reflection", expectedDuration: 150, startTime: "15:00", endTime: "17:30", objective: "Rattrapage et consolidation", expectedResult: "Toutes les erreurs corrigées", proof: "Fiches de corrections", difficulty: "🟡", xp: 150, resourceLink: "" }
            ]},
            { day: 7, sessions: [
                { title: "Repos / Préparation (Optionnel)", skillId: "reflection", expectedDuration: 60, startTime: "10:00", endTime: "11:00", objective: "Se reposer et préparer la suite", expectedResult: "Prêt pour la semaine 3", proof: "Programme semaine 3", difficulty: "🟢", xp: 60, resourceLink: "" }
            ]}
        ]
    },
    {
        week: 3,
        theme: "Passage à l'autonomie",
        objective: "Ne plus seulement consommer des cours, mais produire des livrables concrets.",
        missions: [
            "🇬🇧 6 modules Busuu supplémentaires et 4 heures de shadowing.",
            "🇬🇧 3 conversations avec ton IA.",
            "🛡️ 5 salles TryHackMe et progression sur Cisco/Linux.",
            "🛡️ Utiliser Git/GitHub sur un projet.",
            "🤖 Nettoyer un dataset complet avec Pandas.",
            "🤖 Entraîner ton premier modèle de régression linéaire avec Scikit-Learn.",
            "🤖 Réaliser un mini-projet de data analysis.",
            "📊 Créer un dashboard interactif avec TCD et graphiques.",
            "🏆 Assister à tous les lancements des certificats Force-N."
        ],
        days: [
            { day: 1, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Pratiquer le vocabulaire avancé", expectedResult: "Leçon terminée", proof: "Capture Busuu", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Fluidité vocale", expectedResult: "Discours maîtrisé", proof: "Audio TED", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Cisco (VLAN & Switching)", skillId: "cyber_network", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Comprendre les VLAN", expectedResult: "Exercices Cisco validés", proof: "Notes VLAN", difficulty: "🔴", xp: 120, resourceLink: "https://www.netacad.com/" },
                { title: "Python (Fonctions avancées)", skillId: "ia_python", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Lambdas, map, filter", expectedResult: "Scripts optimisés", proof: "Script Python", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Force-N (Lancement Certificats)", skillId: "force_n", expectedDuration: 165, startTime: "10:00", endTime: "12:45", objective: "Assister aux lancements (Web3, Drone, Cyber)", expectedResult: "Notes prises", proof: "Résumé des certifs", difficulty: "🟡", xp: 165, resourceLink: "" },
                { title: "Excel (Dashboard dynamique)", skillId: "data_excel", expectedDuration: 90, startTime: "14:00", endTime: "15:30", objective: "Créer un dashboard dynamique", expectedResult: "Dashboard fonctionnel", proof: "Fichier Excel", difficulty: "🔴", xp: 90, resourceLink: "" },
                { title: "Pandas (Nettoyage avancé)", skillId: "ia_pandas", expectedDuration: 120, startTime: "15:30", endTime: "17:30", objective: "Gérer NaN et anomalies", expectedResult: "Dataset parfait", proof: "Notebook Pandas", difficulty: "🔴", xp: 120, resourceLink: "https://pandas.pydata.org/" },
                { title: "Linux Journey", skillId: "cyber_linux", expectedDuration: 60, startTime: "17:30", endTime: "18:30", objective: "Avancer sur les modules Linux", expectedResult: "Module complété", proof: "Capture Linux", difficulty: "🟢", xp: 60, resourceLink: "https://linuxjourney.com/" }
            ]},
            { day: 2, sessions: [
                { title: "IA Conversation", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Débat technique", expectedResult: "Échange fluide", proof: "Notes de session", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing BBC)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Intonation britannique", expectedResult: "Imitation parfaite", proof: "Audio BBC", difficulty: "🟡", xp: 30, resourceLink: "https://www.bbc.co.uk/learningenglish/" },
                { title: "TryHackMe", skillId: "cyber_tryhackme", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Room intermédiaire", expectedResult: "Challenge réussi", proof: "Badge final", difficulty: "🔴", xp: 120, resourceLink: "https://tryhackme.com/" },
                { title: "NumPy", skillId: "ia_numpy", expectedDuration: 60, startTime: "08:30", endTime: "09:30", objective: "Opérations avancées", expectedResult: "Exercices réussis", proof: "Notebook Numpy", difficulty: "🟡", xp: 60, resourceLink: "https://numpy.org/" },
                { title: "Force-N (IoT)", skillId: "force_n", expectedDuration: 45, startTime: "10:00", endTime: "10:45", objective: "Certificat IoT", expectedResult: "Notes prises", proof: "Résumé IoT", difficulty: "🟢", xp: 45, resourceLink: "" },
                { title: "Excel (Finances & stats)", skillId: "data_excel", expectedDuration: 60, startTime: "11:00", endTime: "12:00", objective: "Fonctions VPM, ECARTYPE", expectedResult: "Tableau financier", proof: "Fichier Excel", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Force-N (IA Pour Tous)", skillId: "force_n", expectedDuration: 45, startTime: "13:00", endTime: "13:45", objective: "Certificat IA", expectedResult: "Notes prises", proof: "Résumé IA", difficulty: "🟢", xp: 45, resourceLink: "" },
                { title: "Kaggle Learn", skillId: "ia_ml", expectedDuration: 90, startTime: "14:00", endTime: "15:30", objective: "Avancer sur Kaggle", expectedResult: "Module terminé", proof: "Certificat/Badge Kaggle", difficulty: "🟡", xp: 90, resourceLink: "https://www.kaggle.com/learn" },
                { title: "GitHub Skills + Git", skillId: "dev_git", expectedDuration: 120, startTime: "15:30", endTime: "17:30", objective: "Gérer un repo complexe", expectedResult: "Merge & conflits gérés", proof: "Historique Git", difficulty: "🔴", xp: 120, resourceLink: "https://skills.github.com/" }
            ]},
            { day: 3, sessions: [
                { title: "Dessin animé", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Compréhension sans effort", expectedResult: "Aucun ST", proof: "Notes", difficulty: "🟢", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing Discours)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Charisme vocal", expectedResult: "Prestation convaincante", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "Linux Journey (Shell)", skillId: "cyber_linux", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Scripting Bash de base", expectedResult: "Scripts fonctionnels", proof: "Scripts .sh", difficulty: "🔴", xp: 120, resourceLink: "https://linuxjourney.com/" },
                { title: "Pandas (Fusion)", skillId: "ia_pandas", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Merge, join, concat", expectedResult: "Datasets combinés complexes", proof: "Notebook Pandas", difficulty: "🔴", xp: 120, resourceLink: "https://pandas.pydata.org/" },
                { title: "Excel (Tableaux croisés avancés)", skillId: "data_excel", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "TCD complexes", expectedResult: "Analyse poussée", proof: "Fichier Excel", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "OSINT", skillId: "cyber_osint", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Mener une enquête", expectedResult: "Informations trouvées", proof: "Rapport OSINT", difficulty: "🔴", xp: 120, resourceLink: "https://osintframework.com/" },
                { title: "Mini-projet Data Analysis", skillId: "ia_pandas", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Analyse de A à Z", expectedResult: "Insights générés", proof: "Notebook complet", difficulty: "🔴", xp: 180, resourceLink: "" }
            ]},
            { day: 4, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Leçon du jour", expectedResult: "Leçon terminée", proof: "Capture Busuu", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Shadowing TED", expectedResult: "Bon rythme", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Cisco (Routage)", skillId: "cyber_network", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Comprendre le routage IP", expectedResult: "Exercices Cisco validés", proof: "Notes de routage", difficulty: "🔴", xp: 120, resourceLink: "https://www.netacad.com/" },
                { title: "ML (Régression Linéaire)", skillId: "ia_ml", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Entraîner le modèle", expectedResult: "Prédiction réussie", proof: "Notebook Sklearn", difficulty: "🔴", xp: 120, resourceLink: "https://scikit-learn.org/" },
                { title: "Excel (Dashboard interactif)", skillId: "data_excel", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Ajouter des segments", expectedResult: "Dashboard dynamique", proof: "Fichier Excel", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "Mentor Force-N", skillId: "force_n", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Point d'étape", expectedResult: "Validation des progrès", proof: "Compte-rendu", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Projet Machine Learning", skillId: "ia_ml", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Modèle de bout en bout", expectedResult: "Projet fonctionnel", proof: "Code Python complet", difficulty: "🔴", xp: 180, resourceLink: "" }
            ]},
            { day: 5, sessions: [
                { title: "Lecture en anglais", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Lire des articles tech", expectedResult: "Compréhension fine", proof: "Résumé écrit", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing BBC)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Shadowing intensif", expectedResult: "Parfaite clarté", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.bbc.co.uk/learningenglish/" },
                { title: "TryHackMe", skillId: "cyber_tryhackme", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Room Cyber", expectedResult: "Room terminée", proof: "Badge final", difficulty: "🔴", xp: 120, resourceLink: "https://tryhackme.com/" },
                { title: "Scikit-Learn (Classification)", skillId: "ia_ml", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Découvrir la classification", expectedResult: "Modèle entraîné", proof: "Notebook Sklearn", difficulty: "🔴", xp: 120, resourceLink: "https://scikit-learn.org/" },
                { title: "Excel (Automatisation simple)", skillId: "data_excel", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Macros basiques", expectedResult: "Tâche automatisée", proof: "Fichier Excel", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "GitHub Skills", skillId: "dev_git", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Pratiquer la collaboration", expectedResult: "Actions GitHub", proof: "Repo complété", difficulty: "🟡", xp: 120, resourceLink: "https://skills.github.com/" },
                { title: "Projet IA", skillId: "ia_ml", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Projet de classification", expectedResult: "Modèle évalué", proof: "Notebook final", difficulty: "🔴", xp: 180, resourceLink: "" }
            ]},
            { day: 6, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Finaliser les leçons", expectedResult: "Objectifs hebdo atteints", proof: "Capture Bilan", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Révision vocale", expectedResult: "Sans faute", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Projet Cybersécurité", skillId: "cyber_network", expectedDuration: 150, startTime: "06:30", endTime: "09:00", objective: "Finaliser projet cyber", expectedResult: "Objectif atteint", proof: "Livrable complet", difficulty: "🔴", xp: 150, resourceLink: "" },
                { title: "Projet IA", skillId: "ia_ml", expectedDuration: 150, startTime: "09:00", endTime: "11:30", objective: "Finaliser projet IA", expectedResult: "Modèle déployé/évalué", proof: "Notebook complet", difficulty: "🔴", xp: 150, resourceLink: "" },
                { title: "Projet Excel", skillId: "data_excel", expectedDuration: 60, startTime: "11:30", endTime: "12:30", objective: "Finaliser le dashboard", expectedResult: "Dashboard professionnel interactif", proof: "Fichier Excel", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "Corrections", skillId: "reflection", expectedDuration: 120, startTime: "13:30", endTime: "15:30", objective: "Corriger les erreurs de la semaine", expectedResult: "Code débuggé", proof: "Code fonctionnel", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Révisions générales", skillId: "reflection", expectedDuration: 150, startTime: "15:30", endTime: "18:00", objective: "Faire le bilan et réviser", expectedResult: "Connaissances ancrées", proof: "Journal d'apprentissage", difficulty: "🟡", xp: 150, resourceLink: "" }
            ]},
            { day: 7, sessions: [
                { title: "Repos / Préparation (Optionnel)", skillId: "reflection", expectedDuration: 60, startTime: "10:00", endTime: "11:00", objective: "Se reposer et préparer la suite", expectedResult: "Prêt pour la semaine 4", proof: "Programme semaine 4", difficulty: "🟢", xp: 60, resourceLink: "" }
            ]}
        ]
    },
    {
        week: 4,
        theme: "Validation & Construction",
        objective: "Mettre en pratique tout ce que tu as appris, avec des projets et des preuves.",
        missions: [
            "🇬🇧 Environ 20 modules Busuu terminés et 12h de shadowing.",
            "🛡️ Bases de Linux/Cisco acquises et progression TryHackMe.",
            "🛡️ Git et GitHub utilisés pour versionner tes projets.",
            "🤖 Entraîner un premier modèle avec Scikit-Learn.",
            "🤖 Réaliser 2 à 3 mini-projets Python/Data.",
            "📊 Construire un dashboard Excel professionnel et réaliser 2 projets.",
            "🏆 Enregistrer tes StudyRecords avec des preuves (GitHub, certificats, etc.)."
        ],
        days: [
            { day: 1, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Pratiquer le vocabulaire", expectedResult: "Leçon terminée", proof: "Capture Busuu", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Fluidité vocale", expectedResult: "Discours maîtrisé", proof: "Audio TED", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Cisco (Révision générale)", skillId: "cyber_network", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Réviser concepts réseaux", expectedResult: "Quiz réussis", proof: "Notes de synthèse", difficulty: "🟡", xp: 120, resourceLink: "https://www.netacad.com/" },
                { title: "Projet Python (Données)", skillId: "ia_python", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Appliquer Python pur", expectedResult: "Script fonctionnel", proof: "Script Python", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Excel (Révision complète)", skillId: "data_excel", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Revoir les fonctions clés", expectedResult: "Exercices réussis", proof: "Fichier Excel", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "TryHackMe", skillId: "cyber_tryhackme", expectedDuration: 150, startTime: "12:30", endTime: "15:00", objective: "Résolution de CTF", expectedResult: "Room terminée", proof: "Badge ou capture", difficulty: "🔴", xp: 150, resourceLink: "https://tryhackme.com/" },
                { title: "Projet Cyber", skillId: "cyber_network", expectedDuration: 150, startTime: "15:00", endTime: "17:30", objective: "Mettre en pratique la théorie", expectedResult: "Projet finalisé", proof: "Rapport/Notes", difficulty: "🔴", xp: 150, resourceLink: "" }
            ]},
            { day: 2, sessions: [
                { title: "IA Conversation", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Débat technique", expectedResult: "Échange fluide", proof: "Notes de session", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing BBC)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Intonation britannique", expectedResult: "Imitation parfaite", proof: "Audio BBC", difficulty: "🟡", xp: 30, resourceLink: "https://www.bbc.co.uk/learningenglish/" },
                { title: "Linux Journey", skillId: "cyber_linux", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Révision Linux", expectedResult: "Commandes maîtrisées", proof: "Capture Linux", difficulty: "🟡", xp: 120, resourceLink: "https://linuxjourney.com/" },
                { title: "Pandas (Projet complet)", skillId: "ia_pandas", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Analyse complète", expectedResult: "Données analysées", proof: "Notebook Pandas", difficulty: "🔴", xp: 120, resourceLink: "https://pandas.pydata.org/" },
                { title: "Dashboard Excel", skillId: "data_excel", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Visualiser les données", expectedResult: "Dashboard propre", proof: "Fichier Excel", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "OSINT", skillId: "cyber_osint", expectedDuration: 120, startTime: "12:30", endTime: "14:30", objective: "Pratique OSINT", expectedResult: "Scénario résolu", proof: "Rapport OSINT", difficulty: "🔴", xp: 120, resourceLink: "https://osintframework.com/" },
                { title: "Projet IA", skillId: "ia_ml", expectedDuration: 180, startTime: "14:30", endTime: "17:30", objective: "Projet IA de bout en bout", expectedResult: "Modèle validé", proof: "Notebook complet", difficulty: "🔴", xp: 180, resourceLink: "" }
            ]},
            { day: 3, sessions: [
                { title: "Dessin animé", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Compréhension sans effort", expectedResult: "Aucun ST", proof: "Notes", difficulty: "🟢", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing Discours)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Charisme vocal", expectedResult: "Prestation convaincante", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "GitHub Skills", skillId: "dev_git", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Maîtriser Git/GitHub", expectedResult: "Dépôts propres", proof: "Historique Git", difficulty: "🔴", xp: 120, resourceLink: "https://skills.github.com/" },
                { title: "ML (Classification)", skillId: "ia_ml", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Réviser la classification", expectedResult: "Modèles comparés", proof: "Notebook Sklearn", difficulty: "🔴", xp: 120, resourceLink: "https://scikit-learn.org/" },
                { title: "Excel (Automatisation)", skillId: "data_excel", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Scripts ou macros", expectedResult: "Processus automatisé", proof: "Fichier Excel", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "TryHackMe", skillId: "cyber_tryhackme", expectedDuration: 150, startTime: "12:30", endTime: "15:00", objective: "Pratique intensive Cyber", expectedResult: "Challenge terminé", proof: "Capture THM", difficulty: "🔴", xp: 150, resourceLink: "https://tryhackme.com/" },
                { title: "Projet Cyber", skillId: "cyber_network", expectedDuration: 150, startTime: "15:00", endTime: "17:30", objective: "Construire un lab", expectedResult: "Lab fonctionnel", proof: "Documentation", difficulty: "🔴", xp: 150, resourceLink: "" }
            ]},
            { day: 4, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Leçon du jour", expectedResult: "Leçon terminée", proof: "Capture Busuu", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing TED)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Shadowing TED", expectedResult: "Bon rythme", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.ted.com/" },
                { title: "Cisco + Linux (Révision)", skillId: "cyber_network", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Consolider réseaux & OS", expectedResult: "Concepts clairs", proof: "Notes combinées", difficulty: "🟡", xp: 120, resourceLink: "" },
                { title: "Kaggle Learn", skillId: "ia_ml", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Terminer un module", expectedResult: "Certificat obtenu", proof: "Badge Kaggle", difficulty: "🟡", xp: 120, resourceLink: "https://www.kaggle.com/learn" },
                { title: "Excel (Tableau de bord final)", skillId: "data_excel", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Finaliser le TDB", expectedResult: "Dashboard parfait", proof: "Fichier Excel", difficulty: "🔴", xp: 60, resourceLink: "" },
                { title: "Mentor Force-N", skillId: "force_n", expectedDuration: 150, startTime: "12:30", endTime: "15:00", objective: "Bilan du mois avec Mentor", expectedResult: "Validation des acquis", proof: "Compte-rendu", difficulty: "🟡", xp: 150, resourceLink: "" },
                { title: "Projet IA", skillId: "ia_ml", expectedDuration: 150, startTime: "15:00", endTime: "17:30", objective: "Améliorer le modèle", expectedResult: "Métriques optimisées", proof: "Notebook final", difficulty: "🔴", xp: 150, resourceLink: "" }
            ]},
            { day: 5, sessions: [
                { title: "Lecture en anglais", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Lire des articles tech", expectedResult: "Compréhension fine", proof: "Résumé écrit", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "Éloquence (Shadowing BBC)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Shadowing intensif", expectedResult: "Parfaite clarté", proof: "Audio", difficulty: "🟡", xp: 30, resourceLink: "https://www.bbc.co.uk/learningenglish/" },
                { title: "TryHackMe", skillId: "cyber_tryhackme", expectedDuration: 120, startTime: "06:30", endTime: "08:30", objective: "Dernière room", expectedResult: "Room terminée", proof: "Badge final", difficulty: "🔴", xp: 120, resourceLink: "https://tryhackme.com/" },
                { title: "Projet Machine Learning", skillId: "ia_ml", expectedDuration: 120, startTime: "08:30", endTime: "10:30", objective: "Validation finale du projet", expectedResult: "Projet abouti", proof: "Livrable ML", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Révision Excel", skillId: "data_excel", expectedDuration: 60, startTime: "10:30", endTime: "11:30", objective: "Revoir les points faibles", expectedResult: "Maîtrise totale", proof: "Fiches révision", difficulty: "🟡", xp: 60, resourceLink: "" },
                { title: "GitHub Skills", skillId: "dev_git", expectedDuration: 150, startTime: "12:30", endTime: "15:00", objective: "Pousser les projets", expectedResult: "Portfolio à jour", proof: "Lien GitHub", difficulty: "🔴", xp: 150, resourceLink: "https://skills.github.com/" },
                { title: "Préparation des preuves", skillId: "reflection", expectedDuration: 150, startTime: "15:00", endTime: "17:30", objective: "Organiser les livrables", expectedResult: "Preuves prêtes", proof: "Dossier preuves", difficulty: "🟡", xp: 150, resourceLink: "" }
            ]},
            { day: 6, sessions: [
                { title: "Anglais (Busuu)", skillId: "english_speaking", expectedDuration: 30, startTime: "05:30", endTime: "06:00", objective: "Validation finale", expectedResult: "Niveau atteint", proof: "Capture Bilan", difficulty: "🟢", xp: 30, resourceLink: "https://www.busuu.com/" },
                { title: "Éloquence (Shadowing)", skillId: "english_speaking", expectedDuration: 30, startTime: "06:00", endTime: "06:30", objective: "Dernier practice", expectedResult: "Sans faute", proof: "Audio final", difficulty: "🟡", xp: 30, resourceLink: "" },
                { title: "Défi Cybersécurité", skillId: "cyber_network", expectedDuration: 180, startTime: "06:30", endTime: "09:30", objective: "Challenge TryHackMe/Linux", expectedResult: "Scénario réussi", proof: "Rapport d'intervention", difficulty: "🔴", xp: 180, resourceLink: "" },
                { title: "Défi IA", skillId: "ia_ml", expectedDuration: 150, startTime: "09:30", endTime: "12:00", objective: "Python + Pandas + Sklearn", expectedResult: "Prédiction réussie", proof: "Notebook complet", difficulty: "🔴", xp: 150, resourceLink: "" },
                { title: "Défi Excel", skillId: "data_excel", expectedDuration: 120, startTime: "13:00", endTime: "15:00", objective: "Dashboard complet from scratch", expectedResult: "Dashboard professionnel", proof: "Fichier Excel", difficulty: "🔴", xp: 120, resourceLink: "" },
                { title: "Documentation & GitHub", skillId: "dev_git", expectedDuration: 150, startTime: "15:00", endTime: "17:30", objective: "Publier le travail", expectedResult: "Portfolio en ligne", proof: "Lien portfolio", difficulty: "🟡", xp: 150, resourceLink: "" }
            ]},
            { day: 7, sessions: [
                { title: "Bilan du mois & Organisation", skillId: "reflection", expectedDuration: 120, startTime: "10:00", endTime: "12:00", objective: "Relire notes, organiser OS, analyser", expectedResult: "Vision claire des acquis", proof: "Journal de bord", difficulty: "🟡", xp: 120, resourceLink: "" }
            ]}
        ]
    }
];
