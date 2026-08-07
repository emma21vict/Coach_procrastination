const fs = require('fs');

const dateStr = '2026-08-07';
const session = {
    id: `sess_${dateStr}_0`,
    title: 'Test Session',
    skillId: 'cyber_network'
};

const history = [];

// Simulate completeSession
function completeSession(session) {
    const record = {
        id: `rec_${Date.now()}`,
        sessionId: session.id,
        date: dateStr,
        startTime: new Date().toISOString(),
        skillIds: [session.skillId]
    };
    history.push(record);
}

completeSession(session);

// Simulate App.js start()
const completedIds = history.filter(r => r.date === dateStr).map(r => r.sessionId);
console.log("completedIds:", completedIds);
console.log("includes:", completedIds.includes(session.id));
