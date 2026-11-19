# Incident — ancienne URL GitHub Pages S3E devenue inaccessible

Date de constat : 2026-11-19

## Symptôme
URL historique du guide véhicules : https://timetogrowup.github.io/simulateur-s3e/vehicules/ — HTTP 404 observé.

## Diagnostic confirmé
Le dépôt GitHub est désormais `timetogrowup/P-114-simulateur-s3e` (ancien nom : `simulateur-s3e`). Le fichier source `vehicules/index.html` existe toujours sur `main`; le dépôt indique `has_pages=true` et sa homepage utilise `/P-114-simulateur-s3e/`. GitHub ne redirige pas les anciens chemins GitHub Pages lors d'un renommage.

## Rétablissement le 19 novembre 2026

Les trois anciens chemins (racine, véhicules et SBS) renvoyaient HTTP 404. Leurs trois destinations sous `/P-114-simulateur-s3e/` répondaient déjà en HTTP 200 avec les titres attendus.

Le dépôt public de site utilisateur était disponible à la création. Sa branche `main` publie depuis `/(root)`. Le [commit de correction](https://github.com/timetogrowup/timetogrowup.github.io/commit/6a0de035763d1db4665a354a5af7ae3321b84e2e) installe les trois fichiers HTML préparés, en conservant leur arborescence. Le code applicatif et le nom du dépôt P-114 sont conservés.

## Contrôles de clôture

- Les trois anciennes adresses répondent HTTP 200 et chargent leur destination dans le navigateur.
- La [recette GitHub Actions réussie](https://github.com/timetogrowup/P-114-simulateur-s3e/actions/runs/44490105118) couvre douze parcours sur le site public. Chacune des trois adresses a été ouverte avec et sans paramètres et fragment, sur Chromium bureau et Pixel 7 émulé. L’URL finale et le titre ont été vérifiés pour chaque parcours. Les tests ont démarré le questionnaire, ouvert le sommaire véhicules et feuilleté la brochure SBS.
- Les six autres racines publiques Pages recensées répondaient en HTTP 200 après publication, avec le contenu attendu (GEPP, Pilotage global, CLN, questionnaire création d’activité, Wenare et son ancienne page de redirection).
- La première tentative de recette CI s’est arrêtée à l’installation du navigateur. Le passage à Ubuntu 24.04 a permis l’exécution complète. Le contrôle mobile utilise une émulation.

**Incident clos.** Les [adresses officielles et historiques](../../README.md) et la [procédure de publication et de retour arrière](../../compatibilite-pages/README.md) sont à jour.
