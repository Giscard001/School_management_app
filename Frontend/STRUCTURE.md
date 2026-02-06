# Structure du Projet Frontend

## Architecture

Le projet utilise une architecture modulaire avec des composants réutilisables pour garantir la cohérence des interfaces.

## Composants Sidebar

Chaque type d'utilisateur a son propre composant Sidebar réutilisable dans `/src/components/sidebars/` :

- `AdminSidebar.vue` - Sidebar pour les administrateurs
- `EleveSidebar.vue` - Sidebar pour les élèves
- `ProfesseurSidebar.vue` - Sidebar pour les professeurs
- `ParentSidebar.vue` - Sidebar pour les parents
- `CenseurSidebar.vue` - Sidebar pour les censeurs
- `CPESidebar.vue` - Sidebar pour les conseillers d'éducation
- `ProviseurSidebar.vue` - Sidebar pour les proviseurs
- `SecretaireSidebar.vue` - Sidebar pour les secrétaires

**Avantage** : La sidebar est identique dans toutes les interfaces d'un même utilisateur, garantissant une expérience utilisateur cohérente.

## Layouts

Chaque layout (`/src/layouts/`) utilise le composant Sidebar correspondant :

- `AdminLayout.vue` → utilise `AdminSidebar`
- `EleveLayout.vue` → utilise `EleveSidebar`
- `ProfesseurLayout.vue` → utilise `ProfesseurSidebar`
- `ParentLayout.vue` → utilise `ParentSidebar`
- `CenseurLayout.vue` → utilise `CenseurSidebar`
- `CPELayout.vue` → utilise `CPESidebar`
- `ProviseurLayout.vue` → utilise `ProviseurSidebar`
- `SecretaireLayout.vue` → utilise `SecretaireSidebar`

## Navigation

Toutes les interfaces sont liées entre elles via Vue Router :

1. **Navigation via Sidebar** : Chaque lien dans la sidebar pointe vers une route spécifique
2. **Navigation via Dashboard** : Les dashboards contiennent des liens vers les autres interfaces
3. **Navigation contextuelle** : Les vues contiennent des liens vers les pages connexes

## Routes

Toutes les routes sont définies dans `/src/router/index.js` et organisées par type d'utilisateur :

- `/admin/*` - Routes pour les administrateurs
- `/eleve/*` - Routes pour les élèves
- `/professeur/*` - Routes pour les professeurs
- `/parent/*` - Routes pour les parents
- `/censeur/*` - Routes pour les censeurs
- `/cpe/*` - Routes pour les CPE
- `/proviseur/*` - Routes pour les proviseurs
- `/secretaire/*` - Routes pour les secrétaires

## Cohérence des Interfaces

Pour garantir que la sidebar reste identique :

1. **Modifiez uniquement le composant Sidebar** dans `/src/components/sidebars/`
2. **Toutes les interfaces utilisant ce layout** seront automatiquement mises à jour
3. **Pas besoin de modifier chaque vue individuellement**

## Exemple de Navigation

Un utilisateur Admin peut naviguer :
- Depuis le Dashboard → vers Gestion Utilisateurs, Classes, etc.
- Depuis la Sidebar → vers n'importe quelle interface Admin
- Depuis les activités récentes → vers les pages correspondantes

Toutes ces navigations utilisent `router-link` pour une navigation fluide sans rechargement de page.
