# Accès à la brochure S3E depuis le guide SBS

## Besoin
Le salarié qui ouvre la page SBS doit identifier immédiatement la brochure S3E, voir sa couverture et pouvoir lire ses 17 planches sans renseigner son profil. Le crédit reste collectif. La synthèse V24 est hors périmètre.

## Spécification et livraison
Réorganiser l’accueil de sbs/index.html en réutilisant la couverture, la galerie et les raccourcis existants. Garder le parcours individuel sous la brochure. Vérifier sur ordinateur et mobile l’ordre de lecture, les 17 planches, les raccourcis et le formulaire. Publier sur GitHub Pages et vérifier la version servie. Pour revenir en arrière, restaurer sbs/index.html depuis le commit précédent.

## Réalisation
La première section présente le titre, le crédit S3E, la couverture et le bouton ouvrant la première planche. Contrôles locaux réussis sur les quatre destinations, le décodage des 17 images et la présence du formulaire. Le script du guide est identique à la version précédente.

## Affichage temporaire de la brochure seule

Patrick souhaite que le lecteur accède uniquement à la présentation et aux 17 planches. Masquer le formulaire, ses résultats et le pied de page associé au parcours individuel. Conserver les quatre points d’entrée et les commandes de la galerie. Le masquage doit aussi retirer les filtres de la navigation au clavier.

Regrouper le parcours dans un conteneur masqué et masquer son pied de page. Publier sur la même adresse, tester l’accueil et les raccourcis, puis inscrire le résultat ici. Pour rétablir le parcours, annuler le commit de masquage.

## Recette séparée du guide complet

Publier sous `/sbs-recette/` la page autonome de la révision `6583265` pour tester la brochure et le parcours « Ma situation ». La page `/sbs/` conserve sa diffusion actuelle. Réutiliser le fichier historique avec ses ressources intégrées. Contrôler les deux URL, comparer les contenus servis aux versions attendues et tester la galerie et les filtres. Pour retirer la recette, supprimer uniquement `sbs-recette/index.html`.

Qualification du 23 novembre 2026. La recette publiée au commit `c2d6371` sert exactement le HTML de `6583265`. Le contenu servi sous `/sbs/` correspond à `b136a61`. Sur la recette en ligne, le profil de test « Embauche directe / Cadre » donne accès à « Mon bilan ». Le bouton de lecture ouvre la couverture et le sélecteur propose les 17 diapositives. La validation métier des règles reste hors du périmètre de cette publication.

## Parcours de recette par situation

Placer le questionnaire en tête, inclure le véhicule de fonction et afficher le bilan dès la dernière réponse. Présenter les priorités du profil, puis les thèmes avec des phrases avant/après et un conseil syndical par sujet. Distinguer les conseils rédigés pour le guide de la position publiée du S3E. Pour le véhicule, appliquer l’article 19.2 de l’accord signé, p. 34, en distinguant le régime Groupe et le groupe fermé. Tester les profils transfert, mobilité, embauche et incertitude, la mise à jour du bilan, la brochure et l’impression. Publier uniquement sous sbs-recette et comparer les deux pages aux fichiers attendus. Retour arrière par restauration de la recette c2d6371.

## Feuille de route de reprise — 23 novembre 2026

| Étape | Critère de fin | État et résultat |
|---|---|---|
| 1. Reprendre et cadrer | Identifier les deux adresses, les sources et l’état initial. | Réalisée. AGENTS.md et page de recette relus. Le guide de départ intègre 17 planches et quatre thèmes. |
| 2. Développer | Profil en tête, bilan automatique, priorités et conseils par sujet, article 19.2 traité selon la situation. | Réalisée sur la branche de recette, commit 43400e1. Questionnaire conditionnel, bilan, conseils par sujet et rapport imprimable. Article 19.2 vérifié sur la page 34 du PDF « ACCORD SBS SIGNE NOVEMBRE 2026 ». |
| 3. Tester | Vérifier les quatre modes, la modification du profil, le véhicule, les 17 planches et l’impression. | Réalisée. 26 tests navigateur réussis, dont 22 dédiés à SBS (11 sur bureau et 11 sur mobile émulé). Correctif de restauration des rubriques après impression. PDF contrôlé sur 6 pages. |
| 4. Publier et contrôler | Comparer les contenus effectivement servis sur les deux URL avec les versions attendues. | En cours. Tests réussis ; intégration et contrôle en ligne à effectuer. |

La saisie reste locale au navigateur. Le guide réutilise son modèle de comparaison par origine et statut. La question véhicule porte sur la situation avant l’entrée chez SBS. Une réponse inconnue conduit à une vérification documentaire. La brochure, le courrier et le rapport imprimable restent accessibles. Reprendre à la première étape ouverte et consigner les limites observées dans cette table.

## Qualification du parcours — reprise du 23 novembre 2026

Exécuter des tests navigateur reproductibles pour les quatre modes d’entrée, les réponses incomplètes, les différents régimes véhicule, la modification du profil, les liens vers les 17 planches, la confidentialité locale et le rapport imprimable. Contrôler les paragraphes avant/après/conseil de chaque sujet. Vérifier le rendu bureau et mobile émulé et corriger les anomalies constatées avant publication. Ces contrôles fonctionnels ne valent pas validation métier de l’ensemble des sources historiques du modèle.

Après réussite, intégrer seulement la page sous `sbs-recette/`, les tests et le suivi. Comparer l’empreinte du HTML servi à celle du fichier livré et vérifier que `sbs/index.html` garde son empreinte initiale. Rejouer les parcours sur l’adresse de recette publique. Le retour arrière consiste à restaurer uniquement `sbs-recette/index.html` depuis `c2d6371`, sans toucher à `sbs/`.

### Résultats locaux

- `npx playwright test --reporter=list` : 26 réussites, aucun échec (22 contrôles SBS et 4 contrôles du simulateur existant).
- `npm run test:unit` : contrôles existants réussis ; 9 tests du collecteur réussis. Le rapport du simulateur conserve son écart connu PR-03 sur la prise en charge partielle d’une borne, indépendant de la page SBS et hors périmètre de cette évolution.
- Les deux PDF de test contiennent six pages, la clause véhicule et le courrier personnalisé. Contrôle visuel du rendu mobile et de la première page imprimée réalisé.
- Anomalie corrigée : plusieurs événements `beforeprint` écrasaient la liste des rubriques initialement fermées. La mémorisation est désormais conservée jusqu’à `afterprint` ; le retour à l’écran rétablit les rubriques fermées.
- Régression automatisée conservée dans `tests/sbs-recette.spec.cjs` et incluse dans les tests GitHub Actions via `playwright.config.cjs`. La variable `SBS_TEST_BASE` permet de rejouer les tests sur l’URL publique après déploiement.

Limites : mobile émulé, sans essai sur Samsung physique. Les données de comparaison historiques sont réutilisées ; le contrôle fonctionnel ne certifie pas chaque règle métier. Aucun nom ni renseignement personnel n’est demandé ou transmis par le questionnaire.
