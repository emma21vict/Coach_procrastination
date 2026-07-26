import { DashboardView } from '../ui/DashboardView.js?v=4';
import { PlanningView } from '../ui/PlanningView.js?v=6';
import { FocusView } from '../ui/FocusView.js?v=6';
import { BilanView } from '../ui/BilanView.js?v=3';
import { JournalView } from '../ui/JournalView.js?v=3';
import { PortfolioView } from '../ui/PortfolioView.js?v=3';
import { ProgramView } from '../ui/ProgramView.js?v=5';

export class Router {
    constructor(containerId, app) {
        this.views = {
            coach: new DashboardView(containerId, app),
            planning: new PlanningView(containerId, app),
            focus: new FocusView(containerId, app),
            bilan: new BilanView(containerId, app),
            journal: new JournalView(containerId, app),
            portfolio: new PortfolioView(containerId, app),
            program: new ProgramView(containerId, app)
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
            if (viewName === 'portfolio') data = state;
            if (viewName === 'program') data = state.fullProgram;
            
            view.render(data);
        } else {
            console.error(`View ${viewName} not found`);
        }
    }
}
