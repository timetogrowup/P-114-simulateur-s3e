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

## Publication et maintenance

Le dépôt public [timetogrowup.github.io](https://github.com/timetogrowup/timetogrowup.github.io) publie la branche `main`, dossier `/(root)`. Le [commit de mise en service](https://github.com/timetogrowup/timetogrowup.github.io/commit/6a0de035763d1db4665a354a5af7ae3321b84e2e) ajoute trois fichiers sous `simulateur-s3e/`.

Pour changer une destination, modifier la copie source sous `compatibilite-pages/simulateur-s3e/`, puis reporter le fichier dans le dépôt de publication au même chemin à partir de `simulateur-s3e/`. Attendre le déploiement Pages, puis lancer [la recette en ligne](https://github.com/timetogrowup/P-114-simulateur-s3e/actions/workflows/recette-liens-s3e.yml) avec **Run workflow**.

La page historique répond en HTTP 200. Le navigateur charge ensuite la destination via `location.replace`, en conservant paramètres et fragment. Sans JavaScript, le rafraîchissement HTML et le lien de secours mènent à la page canonique sans recopier les paramètres.

## Retour arrière

Pour annuler une modification future, rétablir uniquement les fichiers concernés à partir du dernier commit validé, dans un nouveau commit sur `main`, puis relancer la recette après publication. Pour retirer précisément la mise en service initiale, utiliser `git revert 6a0de035763d1db4665a354a5af7ae3321b84e2e` dans le dépôt de publication. Cette opération retire les trois anciens accès. Les pages officielles restent hébergées dans P-114.
