# ADR 0002 : Implémentation d'un Router dédié

**Date** : 2026-07-24

## Contexte
La logique de navigation (`if / else if`) était codée en dur dans `App.js` avec des identifiants DOM spécifiques, liant fortement le contrôleur principal aux vues spécifiques.

## Décision
Extraction de la logique de routage dans une classe `Router.js`. La navigation s'appuie désormais sur des attributs HTML génériques `data-view="..."` et une table de dispatch orientée objet (`this.views[viewName].render(data)`).

## Conséquences
- **Avantage** : L'ajout d'une nouvelle vue (ex: `StatisticsView`) nécessitera l'ajout d'une seule ligne dans le `Router` et d'un bouton `data-view` en HTML. Le fichier `App.js` n'est plus modifié.
- **Inconvénient** : Aucun.
