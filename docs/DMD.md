# Domain Model Document (DMD) - Learning OS

**Date** : 2026-07-24
**Statut** : [FROZEN] - V1.4 Architecture Finale

Ce document cartographie les entités fondamentales du Learning OS. Ce modèle est gelé. Toute nouvelle fonctionnalité doit s'y intégrer.

## 1. La Fondation (Les Faits)

- **StudyRecord** : L'unité de mesure fondamentale.
  - *Attributs* : `id`, `sessionId/habitId`, `skillId`, `actualDuration`, `status`, `energy`, `quality`, `proof`.
  - *Proof (Preuve)* : Objet typé : `{ type, url, date, description, source }`.

- **Journal** : La mémoire qualitative d'une journée.
  - *Attributs* : `mood`, `energy`, `learned`, `blockers`, `improve`, `mission1`, `mission2`.

## 2. Le Futur (Les Engagements)

- **Goal (Objectif)** : La finalité à long terme. Binaire.
  - *Attributs* : `id`, `title`, `targetDate`, `subGoals`, `completed`.

- **Habit (Habitude)** : Une routine récurrente. Continue.
  - *Attributs* : `id`, `title`, `importance`, `idealTime`, `streak`.

- **Resource (Ressource)** : Le moyen d'apprentissage.
  - *Attributs* : `id`, `title`, `category`, `difficulty`, `estimatedTimeMinutes`, `cost`, `offline`, `language`.

## 3. L'Intelligence (La Représentation)

- **LearningNode (Nœud d'Apprentissage)** : Composant du Learning Graph. Ne représente plus seulement un sujet, mais une compétence précise.
  - *Attributs* : `id`, `title`, `parentId`, `level` (%), `confidence`, `lastPractice`, `proofs` (liste d'IDs de preuves), `revision` (date prévue).
  - *Remarque* : Calculé dynamiquement par le `LearningGraphEngine` à partir des `StudyRecords`.
