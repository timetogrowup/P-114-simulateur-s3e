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
