# Compatibilité des anciennes adresses GitHub Pages — S3E

## Cause
Le dépôt `timetogrowup/simulateur-s3e` est devenu `timetogrowup/P-114-simulateur-s3e`. GitHub ne redirige pas les URLs GitHub Pages après un renommage.

## URLs
- Ancien guide véhicules à maintenir : https://timetogrowup.github.io/simulateur-s3e/vehicules/
- Nouveau guide : https://timetogrowup.github.io/P-114-simulateur-s3e/vehicules/
- Ancienne racine : https://timetogrowup.github.io/simulateur-s3e/
- Nouvelle racine : https://timetogrowup.github.io/P-114-simulateur-s3e/
- Ancienne page SBS : https://timetogrowup.github.io/simulateur-s3e/sbs/
- Nouvelle page SBS : https://timetogrowup.github.io/P-114-simulateur-s3e/sbs/

## Déploiement de compatibilité (action ponctuelle nécessaire)
1. Créer le dépôt **public** `timetogrowup/timetogrowup.github.io` avec une branche `main`. Cette création ne peut pas être faite par les actions du connecteur GitHub actuellement disponibles.
2. Copier le contenu du dossier `compatibilite-pages/simulateur-s3e/` à la racine du NOUVEAU dépôt, en conservant l'arborescence `simulateur-s3e/...`.
3. Dans Settings > Pages du nouveau dépôt, choisir **Deploy from a branch**, `main`, `/(root)`.
4. Vérifier les trois anciennes URLs, les redirections vers le dépôt normalisé, et une URL avec paramètres ou ancre.

**Important : ne pas recréer de dépôt nommé `simulateur-s3e`**, car cela casserait les redirections Git de l'ancien dépôt vers `P-114-simulateur-s3e`.

Les pages ci-dessus sont des redirections HTML avec `meta refresh` et `location.replace`; elles ne constituent pas des redirections HTTP 301. Le JavaScript conserve recherche et ancre de l'URL. Les pages affichent aussi un lien alternatif sans script.

## Statut au 19 novembre 2026
Source de compatibilité préparée dans ce dépôt. Publication sur l'ancienne URL **non réalisée** tant que `timetogrowup.github.io` n'est pas créé et que GitHub Pages n'y est pas activé. Ne pas annoncer la réparation comme achevée avant validation externe.
