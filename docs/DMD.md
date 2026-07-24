# Domain Model Document (DMD) - Learning OS

**Date** : 2026-07-24
**Statut** : V1.3

Ce document cartographie les entités fondamentales du Learning OS et leurs relations.

## 1. La Fondation (Les Faits)

- **StudyRecord** : L'unité de mesure fondamentale.
  - *Attributs* : `id`, `sessionId/habitId`, `skillId`, `actualDuration`, `status` (completed/partial/skipped), `energy`, `quality`, `proof` (URL/texte).
  - *Rôle* : Il représente un fait passé. C'est la matière première ingérée par tous les autres moteurs.

- **Journal** : La mémoire qualitative d'une journée.
  - *Attributs* : `mood`, `energy`, `learned`, `blockers`, `improve`, `priority1`, `priority2`.

## 2. Le Futur (Les Engagements)

- **Goal (Objectif)** : La finalité à long terme. Binaire.
  - *Attributs* : `id`, `title`, `targetDate`, `subGoals` (étapes), `completed`.
  - *Exemple* : "Obtenir la certification Cisco".

- **Habit (Habitude)** : Une routine récurrente. Continue.
  - *Attributs* : `id`, `title`, `importance`, `idealTime`, `streak`.
  - *Exemple* : "Shadowing English 15 min le matin".

## 3. L'Intelligence (La Représentation)

- **KnowledgeNode (Nœud de Connaissance)** : Un composant du graphe de compétences.
  - *Attributs* : `id`, `title`, `parentId` (pour l'arborescence), `estimatedLevel` (0-100), `lastPracticed`, `totalDuration`.
  - *Exemple* : Le nœud "Permissions" a pour parent "Linux". L'estimation est calculée dynamiquement par le `KnowledgeEngine` en fonction des `StudyRecords` associés à cette compétence.
