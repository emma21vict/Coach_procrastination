import { DashboardView } from '../ui/DashboardView.js';
import { PlanningView } from '../ui/PlanningView.js';
import { FocusView } from '../ui/FocusView.js';

export class Router {
    constructor(containerId) {
        this.views = {
            dashboard: new DashboardView(containerId),
            planning: new PlanningView(containerId),
            focus: new FocusView(containerId)
        };
    }

    render(viewName, state) {
        const view = this.views[viewName];
        if (view) {
            let data = state;
            if (viewName === 'planning') data = state.todaySessions;
            if (viewName === 'focus') data = state.todaySessions[0] || null;
            view.render(data);
        } else {
            console.error(`View ${viewName} not found`);
        }
    }
}
