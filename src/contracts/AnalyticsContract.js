export class AnalyticsContract {
    async generateInsights(dateStr) {
        throw new Error("Method 'generateInsights()' must be implemented.");
    }
    
    async generateHealth() {
        throw new Error("Method 'generateHealth()' must be implemented.");
    }

    async generateMonthlyReport(year, month) {
        throw new Error("Method 'generateMonthlyReport()' must be implemented.");
    }
}
