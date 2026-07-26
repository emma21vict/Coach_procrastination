export class LearningCoachEngine {
    constructor() {}

    generateInsights(analyticsSummary) {
        let insights = [];
        
        if (!analyticsSummary) return insights;

        if (analyticsSummary.regularity >= 6) {
            insights.push({ type: 'success', text: "Régularité exemplaire. Continue comme ça !" });
        } else if (analyticsSummary.regularity < 3) {
            insights.push({ type: 'warning', text: "Attention à la régularité. Essaie de faire au moins 15 min par jour pour maintenir l'élan." });
        }

        const skillDistribution = analyticsSummary.skillDistribution || {};
        
        if (skillDistribution['cyber_linux'] && skillDistribution['cyber_linux'] > 120 && (!skillDistribution['english_speaking'] || skillDistribution['english_speaking'] < 30)) {
            insights.push({ type: 'warning', text: "Tu as beaucoup pratiqué Linux cette semaine, mais l'Anglais a été négligé." });
        }

        if (insights.length === 0) {
            insights.push({ type: 'success', text: "Très bon équilibre général dans tes compétences. N'oublie pas de vérifier tes missions hebdomadaires !" });
        }

        return insights;
    }
}
