# ADR 0001 : Abstraction du stockage via StorageProvider

**Date** : 2026-07-24

## Contexte
L'application doit pouvoir sauvegarder ses données de manière persistante, mais aussi pouvoir être testée en mémoire, voire connectée à un cloud plus tard. Coupler directement l'application à `localStorage` empêcherait ces évolutions.

## Décision
Création d'une interface `StorageProvider` implémentée par `LocalStorageProvider` et `MemoryProvider`. Le moteur central (`App.js` via `Bootstrap.js`) interagit uniquement avec l'interface.

## Conséquences
- **Avantage** : Facilité de test (utilisation de `MemoryProvider`). Migration future vers une API Cloud transparente.
- **Inconvénient** : Légère sur-ingénierie pour un MVP pur, mais nécessaire pour la vision "Learning OS".
