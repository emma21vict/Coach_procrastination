import { DashboardView } from '../ui/DashboardView.js';
import { PlanningView } from '../ui/PlanningView.js';
import { FocusView } from '../ui/FocusView.js';
import { BilanView } from '../ui/BilanView.js';
import { JournalView } from '../ui/JournalView.js';
import { PortfolioView } from '../ui/PortfolioView.js';

export class Router {
    constructor(containerId, app) {
        this.views = {
            coach: new DashboardView(containerId, app),
            planning: new PlanningView(containerId, app),
            focus: new FocusView(containerId, app),
            bilan: new BilanView(containerId, app),
            journal: new JournalView(containerId, app),
            portfolio: new PortfolioView(containerId, app)
        };
    }

    render(viewName, state) {
        const view = this.views[viewName];
        if (view) {
            let data = state;
            if (viewName === 'planning') data = state.dailyPlan;
            if (viewName === 'focus') {
                data = state.dailyPlan.sessions.find(s => !s.completed) || null;
            }
            if (viewName === 'bilan') data = state.dailyStats;
            if (viewName === 'journal') data = state.currentJournal;
            if (viewName === 'portfolio') data = state.fullHistory;
            
            view.render(data);
        } else {
            console.error(`View ${viewName} not found`);
        }
    }
}
