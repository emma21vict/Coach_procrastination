import { DashboardView } from '../ui/DashboardView.js';
import { PlanningView } from '../ui/PlanningView.js';
import { FocusView } from '../ui/FocusView.js';

export class App {
    constructor(storage, scheduler, xpEngine) {
        this.storage = storage;
        this.scheduler = scheduler;
        this.xpEngine = xpEngine;
        this.state = {
            currentView: 'dashboard',
            todaySessions: []
        };
        
        this.views = {
            dashboard: new DashboardView('app-root'),
            planning: new PlanningView('app-root'),
            focus: new FocusView('app-root')
        };
    }
    
    async start() {
        document.getElementById('bottom-nav').style.display = 'flex';
        this.setupNavigation();
        
        // Generate plan for today
        this.state.todaySessions = await this.scheduler.generateDailyPlan(new Date().toISOString());
        
        this.renderView('dashboard');
    }
    
    setupNavigation() {
        document.getElementById('nav-dashboard').addEventListener('click', () => this.renderView('dashboard'));
        document.getElementById('nav-planning').addEventListener('click', () => this.renderView('planning'));
        document.getElementById('nav-focus').addEventListener('click', () => this.renderView('focus'));
    }
    
    renderView(viewName) {
        document.querySelectorAll('#bottom-nav button').forEach(b => b.classList.remove('active'));
        document.getElementById(`nav-${viewName}`).classList.add('active');
        
        if (viewName === 'dashboard') {
            this.views.dashboard.render(this.state);
        } else if (viewName === 'planning') {
            this.views.planning.render(this.state.todaySessions);
        } else if (viewName === 'focus') {
            const activeSession = this.state.todaySessions[0]; // mock active
            this.views.focus.render(activeSession);
        }
    }
}
