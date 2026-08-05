import { LocalStorageProvider } from '../services/LocalStorageProvider.js';
import { SchedulerEngine } from '../engines/SchedulerEngine.js?v=11';
import { XPEngine } from '../engines/XPEngine.js';
import { StudyRecordEngine } from '../engines/StudyRecordEngine.js';
import { AnalyticsEngine } from '../engines/AnalyticsEngine.js';
import { LearningCoachEngine } from '../engines/LearningCoachEngine.js';
import { App } from './App.js?v=10';
import { AppLogger } from '../utils/AppLogger.js';

export class Bootstrap {
    static async init() {
        AppLogger.info("Démarrage du Bootstrap du Learning OS...");
        
        let storage, scheduler, xpEngine, studyRecordEngine, analyticsEngine, coachEngine;
        
        try {
            storage = new LocalStorageProvider();
            const savedVersion = await storage.loadData('bootcamp_program_version');
            if (savedVersion !== "2.8_eloquence_no_ted") {
                await storage.removeData('bootcamp_program');
                await storage.saveData('bootcamp_program_version', "2.8_eloquence_no_ted");
                AppLogger.info("Cache du programme purgé (v2.8 : TED complètement remplacé par Storytelling en français) !");
            }
        } catch (e) { AppLogger.error("Erreur Storage: " + e.message); }
        
        try {
            scheduler = new SchedulerEngine(storage);
        } catch (e) { AppLogger.error("Erreur Scheduler: " + e.message); }
        
        try {
            xpEngine = new XPEngine();
        } catch (e) { AppLogger.error("Erreur XP: " + e.message); }
        
        try {
            studyRecordEngine = new StudyRecordEngine(storage, xpEngine);
        } catch (e) { AppLogger.error("Erreur StudyRecord: " + e.message); }
        
        try {
            analyticsEngine = new AnalyticsEngine(storage);
        } catch (e) { AppLogger.error("Erreur Analytics: " + e.message); }
        
        try {
            coachEngine = new LearningCoachEngine();
        } catch (e) { AppLogger.error("Erreur Coach: " + e.message); }
        
        if (!storage || !scheduler || !xpEngine || !studyRecordEngine || !analyticsEngine || !coachEngine) {
            throw new Error("Impossible d'initialiser les moteurs critiques.");
        }
        
        const app = new App(storage, scheduler, xpEngine, studyRecordEngine, analyticsEngine, coachEngine);
        try {
            await app.start();
        } catch (err) {
            AppLogger.error("Erreur dans app.start(): " + err.message);
            const root = document.getElementById('app-root');
            if (root) {
                root.innerHTML = `<div style="color:red; padding:20px; text-align:center;">
                    <h3>Erreur de démarrage : ${err.message}</h3>
                    <button onclick="localStorage.clear(); window.location.reload(true);" style="background:#00f2fe;color:#0f2027;padding:10px 20px;border-radius:15px;border:none;cursor:pointer;margin-top:10px;font-weight:bold;">
                        🔄 Réinitialiser l'application
                    </button>
                </div>`;
            }
            throw err;
        }
        
        AppLogger.info("Bootstrap terminé. Application prête.");
        return app;
    }
}
