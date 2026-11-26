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
| 3. Tester | Vérifier les quatre modes, la modification du profil, le véhicule, les 17 planches et l’impression. | À réaliser. |
| 4. Publier et contrôler | Comparer les contenus effectivement servis sur les deux URL avec les versions attendues. | À réaliser. |

La saisie reste locale au navigateur. Le guide réutilise son modèle de comparaison par origine et statut. La question véhicule porte sur la situation avant l’entrée chez SBS. Une réponse inconnue conduit à une vérification documentaire. La brochure, le courrier et le rapport imprimable restent accessibles. Reprendre à la première étape ouverte et consigner les limites observées dans cette table.

## Mise à jour de la brochure publique du 23 novembre 2026

Remplacer les 17 planches de /sbs/ par les 18 diapositives du PowerPoint fourni par Patrick, dans l’ordre du support. La planche sur les jalons devient la page 3. Conserver la lecture sans saisie, le crédit collectif et le masquage du profil. La recette suit son propre calendrier.

Exporter les diapositives en images, vérifier les titres et décaler les renvois concernés. Tester les 18 pages, les vignettes, la navigation et le zoom en affichage mobile et bureau. Publier sur la même URL, contrôler la version servie et documenter les résultats. Retour arrière par annulation du commit de publication.

Publication qualifiée au commit 66dc410. GitHub Pages a déployé la version avec succès. Les 18 planches, le logo et le HTML servis sont identiques aux fichiers testés. Sur l’URL publique, Chromium a parcouru les 18 diapositives en largeur 1440 et 390 pixels. Les quatre accès (couverture, FAQ p. 5, position p. 6 et comparatifs p. 8), le sélecteur, précédent/suivant, le zoom, la fermeture et le masquage du profil ont été vérifiés. Le contrôle mobile est émulé. Les diapositives sont des rendus du PowerPoint, avec substitution des polices indisponibles. La recette séparée suit son propre calendrier.

## Remplacement du support du 26 novembre 2026

Patrick demande de publier les 18 pages de « Brochure SBS du S3E (3).pptx » sur /sbs/. Exporter chaque page dans l’ordre du PowerPoint en WebP, avec une nouvelle adresse pour éviter les anciennes images en cache. Conserver les accès directs aux pages 1, 5, 6 et 8 et la visionneuse. Vérifier les images, les raccourcis et la version servie. Annuler le commit de publication pour revenir à la brochure précédente.

Contrôles avant publication. Les 18 images ont été exportées du PowerPoint avec la police Aptos. Dans Chromium (390 × 844 et 1440 × 900), les 18 images se décodent dans l’ordre, les quatre accès ouvrent la page attendue et le zoom passe à 125 % puis revient à 100 %. Le contrôle mobile est émulé.
