import { Router } from './Router.js';
import { AppLogger } from '../utils/AppLogger.js';
import { AnalyticsEngine } from '../engines/AnalyticsEngine.js?v=3';
import { LearningGraphEngine } from '../engines/LearningGraphEngine.js';
import { GoalEngine } from '../engines/GoalEngine.js';
import { ReflectionEngine } from '../engines/ReflectionEngine.js';

export class App {
    constructor(storage, scheduler, xpEngine, studyRecordEngine) {
        this.storage = storage;
        this.scheduler = scheduler;
        this.xpEngine = xpEngine;
        this.studyRecordEngine = studyRecordEngine;
        
        this.analyticsEngine = new AnalyticsEngine(storage);
        this.learningGraphEngine = new LearningGraphEngine(storage);
        this.goalEngine = new GoalEngine(storage);
        this.reflectionEngine = new ReflectionEngine(storage);
        
        this.state = {
            currentView: 'coach',
            dailyPlan: { habits: [], sessions: [] },
            dailyStats: null,
            userProfile: null,
            currentJournal: null,
            yesterdayJournal: null,
            fullHistory: [],
            analytics: null,
            learningGraph: null,
            reflections: null,
            monthlyReport: null,
            allJournals: {},
            fullProgram: []
        };
        this.router = new Router('app-root', this);
    }
    
    async start() {
        AppLogger.info("Lancement de l'application (start)");
        document.getElementById('app-root').innerHTML = '<p style="text-align:center;">Génération du planning... (Etape 1)</p>';
        document.getElementById('bottom-nav').style.display = 'flex';
        this.setupNavigation();
        
        const localDate = new Date().toLocaleDateString('fr-CA');
        
        const plan = await this.scheduler.generateDailyPlan(localDate);
        document.getElementById('app-root').innerHTML = '<p style="text-align:center;">Génération du planning... (Etape 2)</p>';
        
        const history = await this.storage.loadData('study_history') || [];
        const completedIds = history.filter(r => r.date === localDate).map(r => r.sessionId);
        
        plan.habits.forEach(h => h.completed = completedIds.includes(h.id));
        plan.sessions.forEach(s => s.completed = completedIds.includes(s.id));
        
        this.state.dailyPlan = plan;
        document.getElementById('app-root').innerHTML = '<p style="text-align:center;">Génération du planning... (Etape 3)</p>';
        await this.refreshUserStats();
        
        document.getElementById('app-root').innerHTML = '<p style="text-align:center;">Génération du planning... (Etape 4)</p>';
        this.renderView('coach');
    }
    
    async refreshUserStats() {
        const dToday = new Date();
        const localDate = dToday.toLocaleDateString('fr-CA');
        let dYesterday = new Date();
        dYesterday.setDate(dYesterday.getDate() - 1);
        const yesterdayDate = dYesterday.toLocaleDateString('fr-CA');

        this.state.dailyStats = await this.studyRecordEngine.getDailyStats(localDate);
        this.state.userProfile = await this.storage.loadData('user_profile') || { xpTotal: 0, streak: 1, lastActive: null };
        this.state.currentJournal = await this.studyRecordEngine.getJournal(localDate);
        this.state.yesterdayJournal = await this.studyRecordEngine.getJournal(yesterdayDate);
        this.state.fullHistory = await this.studyRecordEngine.getFullHistory();
        
        this.state.analytics = await this.analyticsEngine.generateInsights(localDate);
        this.state.learningGraph = await this.learningGraphEngine.evaluateGraph();
        this.state.reflections = await this.reflectionEngine.analyzeJournalTrends();
        this.state.monthlyReport = await this.analyticsEngine.generateMonthlyReport(dToday.getFullYear(), dToday.getMonth());
        this.state.allJournals = await this.storage.loadData('daily_journals') || {};
        this.state.fullProgram = await this.scheduler.getFullProgram();
    }
    
    setupNavigation() {
        document.querySelectorAll('#bottom-nav button[data-view]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const viewName = e.currentTarget.getAttribute('data-view');
                this.renderView(viewName);
            });
        });
    }
    
    async renderView(viewName) {
        if (viewName === 'journal' || viewName === 'portfolio' || viewName === 'coach' || viewName === 'bilan') {
            await this.refreshUserStats();
        }
        
        this.state.currentView = viewName;
        document.querySelectorAll('#bottom-nav button[data-view]').forEach(b => b.classList.remove('active'));
        
        const activeBtn = document.querySelector(`#bottom-nav button[data-view="${viewName}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        this.router.render(viewName, this.state);
    }
    
    async markSessionCompleted(sessionId, metrics = { status: 'completed' }) {
        const session = this.state.dailyPlan.sessions.find(s => s.id === sessionId);
        if (session && !session.completed) {
            session.completed = true;
            await this.studyRecordEngine.completeSession(session, metrics);
            await this.refreshUserStats();
            this.renderView(this.state.currentView);
        }
    }
    
    async markHabitCompleted(habitId) {
        const habit = this.state.dailyPlan.habits.find(h => h.id === habitId);
        if (habit && !habit.completed) {
            habit.completed = true;
            const pseudoSession = {
                id: habit.id,
                title: habit.title,
                skillId: habit.skillId,
                priority: "Normale",
                expectedDuration: habit.minTime
            };
            await this.studyRecordEngine.completeSession(pseudoSession, { status: 'completed', quality: 4 });
            await this.refreshUserStats();
            this.renderView(this.state.currentView);
        }
    }
    
    async saveJournal(data) {
        const localDate = new Date().toLocaleDateString('fr-CA');
        await this.studyRecordEngine.saveDailyJournal(localDate, data);
        await this.refreshUserStats();
    }
    
    async saveProgram(programData) {
        await this.scheduler.saveFullProgram(programData);
        await this.refreshUserStats();
        const localDate = new Date().toLocaleDateString('fr-CA');
        this.state.dailyPlan = await this.scheduler.generateDailyPlan(localDate);
        this.renderView('program');
    }
    
    async showBilan() {
        await this.refreshUserStats();
        this.renderView('bilan');
    }
}
