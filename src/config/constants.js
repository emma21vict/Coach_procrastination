export const PRIORITIES = {
    LOW: 'Basse',
    NORMAL: 'Normale',
    HIGH: 'Haute',
    CRITICAL: 'Critique'
};

export const ENERGY_LEVELS = {
    LOW: 'Faible',
    MEDIUM: 'Moyenne',
    HIGH: 'Élevée'
};

export const XP_MULTIPLIERS = {
    [PRIORITIES.LOW]: 1,
    [PRIORITIES.NORMAL]: 1.2,
    [PRIORITIES.HIGH]: 1.5,
    [PRIORITIES.CRITICAL]: 2
};
