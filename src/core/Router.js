import { DashboardView } from '../ui/DashboardView.js';
import { PlanningView } from '../ui/PlanningView.js';
import { FocusView } from '../ui/FocusView.js';
import { BilanView } from '../ui/BilanView.js';

export class Router {
    constructor(containerId, app) {
        this.views = {
            dashboard: new DashboardView(containerId, app),
            planning: new PlanningView(containerId, app),
            focus: new FocusView(containerId, app),
            bilan: new BilanView(containerId, app)
        };
    }

    render(viewName, state) {
        const view = this.views[viewName];
        if (view) {
            let data = state;
            if (viewName === 'planning') data = state.todaySessions;
            if (viewName === 'focus') {
                // Le mode Focus prend la première tâche NON terminée
                data = state.todaySessions.find(s => !s.completed) || null;
            }
            if (viewName === 'bilan') data = state.dailyStats;
            
            view.render(data);
        } else {
            console.error(`View ${viewName} not found`);
        }
    }
}
