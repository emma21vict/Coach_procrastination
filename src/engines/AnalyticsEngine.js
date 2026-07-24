import { AppLogger } from '../utils/AppLogger.js';

export class AnalyticsEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }
    
    async generateInsights(dateStr) {
        const history = await this.storage.loadData('study_history') || [];
        
        // 1. Filtrer les 7 derniers jours
        const todayDate = new Date(dateStr);
        const last7DaysRecords = history.filter(r => {
            const rDate = new Date(r.date);
            const diffTime = Math.abs(todayDate - rDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7;
        });

        // 2. Metrics (Temps, Régularité, Equilibre, Qualité)
        let totalTimeMinutes = 0;
        let activeDays = new Set();
        let skillDistribution = {};
        let qualitySum = 0;
        let qualityCount = 0;

        last7DaysRecords.forEach(r => {
            if (r.status === 'completed' || r.status === 'partial') {
                totalTimeMinutes += r.actualDuration;
                activeDays.add(r.date);
                
                if (r.skillId) {
                    skillDistribution[r.skillId] = (skillDistribution[r.skillId] || 0) + r.actualDuration;
                }
                
                qualitySum += r.quality;
                qualityCount++;
            }
        });

        const regularity = activeDays.size; // sur 7 jours
        const avgQuality = qualityCount > 0 ? (qualitySum / qualityCount).toFixed(1) : 0;
        
        // 3. Insight generation (Règles basiques pour le MVP Coach)
        let insights = [];
        
        if (regularity >= 6) {
            insights.push({ type: 'success', text: "Régularité exemplaire (travaillé " + regularity + " jours sur 7). Continue comme ça !" });
        } else if (regularity < 3 && history.length > 3) {
            insights.push({ type: 'warning', text: "Attention à la régularité. Essaie de faire au moins 15 min par jour pour maintenir l'élan." });
        }
        
        if (skillDistribution['cyber_linux'] && skillDistribution['cyber_linux'] > 120 && (!skillDistribution['english_speaking'] || skillDistribution['english_speaking'] < 30)) {
            insights.push({ type: 'warning', text: "Tu as beaucoup pratiqué Linux cette semaine, mais l'Anglais a été négligé." });
        }
        
        if (!skillDistribution['machine_learning']) {
            insights.push({ type: 'warning', text: "Tu n'as consacré aucun temps au Machine Learning cette semaine." });
        }

        if (insights.length === 0) {
            insights.push({ type: 'success', text: "Très bon équilibre général dans tes compétences. Les fondamentaux sont solides." });
        }

        AppLogger.info("AnalyticsEngine: Insights générés.");
        
        return {
            totalTimeHours: (totalTimeMinutes / 60).toFixed(1),
            totalTimeMinutes: totalTimeMinutes,
            regularity: regularity,
            skillDistribution: skillDistribution,
            avgQuality: avgQuality,
            insights: insights
        };
    }

    async generateMonthlyReport(year, month) {
        const history = await this.storage.loadData('study_history') || [];
        
        const monthRecords = history.filter(r => {
            const date = new Date(r.date);
            return date.getFullYear() === year && date.getMonth() === month;
        });

        let totalTimeMinutes = 0;
        let qualitySum = 0;
        let qualityCount = 0;
        let daysActive = new Set();
        let proofsCount = 0;

        monthRecords.forEach(r => {
            if (r.status === 'completed' || r.status === 'partial') {
                totalTimeMinutes += r.actualDuration;
                daysActive.add(r.date);
                qualitySum += r.quality;
                qualityCount++;
                if (r.proof && r.proof.url) proofsCount++;
            }
        });

        const avgQuality = qualityCount > 0 ? (qualitySum / qualityCount).toFixed(1) : 0;
        
        return {
            month: month + 1,
            year: year,
            totalHours: (totalTimeMinutes / 60).toFixed(1),
            daysActive: daysActive.size,
            avgQuality: avgQuality,
            proofsGenerated: proofsCount,
            summary: `En ${month + 1}/${year}, tu as investi ${(totalTimeMinutes / 60).toFixed(1)} heures réparties sur ${daysActive.size} jours. Tu as généré ${proofsCount} preuves tangibles de tes compétences.`
        };
    }
}
