# ADR 0003 : SchedulerEngine comme moteur de génération

**Date** : 2026-07-24

## Contexte
L'agenda quotidien (le "Planning") ne doit pas être un JSON statique mais doit être généré dynamiquement en fonction du cursus (Bootcamp), des urgences (Events / Force-N) et des compétences.

## Décision
Le `SchedulerEngine` est le seul responsable de la génération du planning du jour (`generateDailyPlan`). Il retourne un tableau ordonné d'objets `Session`. L'UI consomme ce tableau sans en connaître la logique.

## Conséquences
- **Avantage** : Logique métier purement séparée de l'interface graphique.
- **Inconvénient** : Le moteur devra être fortement testé car unitairement responsable de l'expérience utilisateur de la journée.
