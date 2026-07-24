import { Router } from './Router.js';
import { AppLogger } from '../utils/AppLogger.js';

export class App {
    constructor(storage, scheduler, xpEngine, studyRecordEngine) {
        this.storage = storage;
        this.scheduler = scheduler;
        this.xpEngine = xpEngine;
        this.studyRecordEngine = studyRecordEngine;
        this.state = {
            currentView: 'dashboard',
            todaySessions: [],
            dailyStats: null,
            userProfile: null
        };
        this.router = new Router('app-root', this);
    }
    
    async start() {
        AppLogger.info("Lancement de l'application (start)");
        document.getElementById('bottom-nav').style.display = 'flex';
        this.setupNavigation();
        
        const localDate = new Date().toLocaleDateString('fr-CA');
        document.getElementById('app-root').innerHTML = '<p style="text-align:center;">Génération du planning...</p>';
        
        // Génération du plan
        let sessions = await this.scheduler.generateDailyPlan(localDate);
        
        // Vérification de l'historique pour les tâches déjà accomplies
        const history = await this.storage.loadData('study_history') || [];
        const completedSessionIds = history.map(r => r.sessionId);
        
        sessions.forEach(s => {
            s.completed = completedSessionIds.includes(s.id);
        });
        
        this.state.todaySessions = sessions;
        await this.refreshUserStats();
        
        this.renderView('dashboard');
    }
    
    async refreshUserStats() {
        const localDate = new Date().toLocaleDateString('fr-CA');
        this.state.dailyStats = await this.studyRecordEngine.getDailyStats(localDate);
        this.state.userProfile = await this.storage.loadData('user_profile') || { xpTotal: 0, streak: 1 };
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
    
    async markSessionCompleted(sessionId) {
        const session = this.state.todaySessions.find(s => s.id === sessionId);
        if (session && !session.completed) {
            session.completed = true;
            await this.studyRecordEngine.completeSession(session);
            await this.refreshUserStats();
            this.renderView(this.state.currentView);
        }
    }
    
    async showBilan() {
        await this.refreshUserStats();
        this.renderView('bilan');
    }
}
