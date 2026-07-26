import { LocalStorageProvider } from '../services/LocalStorageProvider.js';
import { SchedulerEngine } from '../engines/SchedulerEngine.js?v=5';
import { XPEngine } from '../engines/XPEngine.js';
import { StudyRecordEngine } from '../engines/StudyRecordEngine.js';
import { AnalyticsEngine } from '../engines/AnalyticsEngine.js';
import { LearningCoachEngine } from '../engines/LearningCoachEngine.js';
import { App } from './App.js?v=6';
import { AppLogger } from '../utils/AppLogger.js';

export class Bootstrap {
    static async init() {
        AppLogger.info("Démarrage du Bootstrap du Learning OS...");
        
        let storage, scheduler, xpEngine, studyRecordEngine, analyticsEngine, coachEngine;
        
        try {
            storage = new LocalStorageProvider();
            const savedVersion = await storage.loadData('bootcamp_program_version');
            if (savedVersion !== "1.8_bootcamp_complet_officiel") {
                await storage.removeData('bootcamp_program');
                await storage.saveData('bootcamp_program_version', "1.8_bootcamp_complet_officiel");
                AppLogger.info("Cache du programme purgé pour passer au Bootcamp Complet Officiel v1.8 !");
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
        await app.start();
        
        AppLogger.info("Bootstrap terminé. Application prête.");
        return app;
    }
}
