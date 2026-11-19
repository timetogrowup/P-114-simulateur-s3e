# Incident — ancienne URL GitHub Pages S3E devenue inaccessible

Date de constat : 2026-11-19

## Symptôme
URL historique du guide véhicules : https://timetogrowup.github.io/simulateur-s3e/vehicules/ — HTTP 404 observé.

## Diagnostic confirmé
Le dépôt GitHub est désormais `timetogrowup/P-114-simulateur-s3e` (ancien nom : `simulateur-s3e`). Le fichier source `vehicules/index.html` existe toujours sur `main`; le dépôt indique `has_pages=true` et sa homepage utilise `/P-114-simulateur-s3e/`. GitHub ne redirige pas les anciens chemins GitHub Pages lors d'un renommage.

## Solution retenue
Préparer des pages de compatibilité dans `compatibilite-pages/`. Déployer ensuite ces fichiers via le site utilisateur `timetogrowup.github.io` en préservant le sous-chemin `/simulateur-s3e/`. Cette approche maintient les anciens favoris sans restaurer l'ancien nom de dépôt ni casser les redirections Git.

## Avancement
- [x] Diagnostic du renommage.
- [x] Confirmation de l'existence de `vehicules/index.html`.
- [x] Préparation des pages de compatibilité (racine, véhicules et SBS).
- [ ] Création du dépôt public `timetogrowup/timetogrowup.github.io` avec branche main.
- [ ] Installation des pages de compatibilité dans ce dépôt.
- [ ] Activation de GitHub Pages main/(root).
- [ ] Vérification externe de l'ancienne URL et du nouveau chemin.

## Références
- https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

**État : partiellement traité — la publication de la redirection reste bloquée par l'absence du dépôt de site utilisateur.**
