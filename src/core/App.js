import { Router } from './Router.js';
import { AppLogger } from '../utils/AppLogger.js';

export class App {
    constructor(storage, scheduler, xpEngine) {
        this.storage = storage;
        this.scheduler = scheduler;
        this.xpEngine = xpEngine;
        this.state = {
            currentView: 'dashboard',
            todaySessions: []
        };
        this.router = new Router('app-root');
    }
    
    async start() {
        AppLogger.info("Lancement de l'application (start)");
        document.getElementById('bottom-nav').style.display = 'flex';
        this.setupNavigation();
        
        // Normalize date to local time (ex: YYYY-MM-DD)
        const localDate = new Date().toLocaleDateString('fr-CA');
        
        document.getElementById('app-root').innerHTML = '<p style="text-align:center;">Génération du planning...</p>';
        this.state.todaySessions = await this.scheduler.generateDailyPlan(localDate);
        
        this.renderView('dashboard');
    }
    
    setupNavigation() {
        document.querySelectorAll('#bottom-nav button[data-view]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const viewName = e.currentTarget.getAttribute('data-view');
                this.renderView(viewName);
            });
        });
    }
    
    renderView(viewName) {
        this.state.currentView = viewName;
        document.querySelectorAll('#bottom-nav button[data-view]').forEach(b => b.classList.remove('active'));
        
        const activeBtn = document.querySelector(`#bottom-nav button[data-view="${viewName}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        this.router.render(viewName, this.state);
    }
}
