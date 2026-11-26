# Visionneuse SBS — 26 novembre 2026

## Besoin et solution
Afficher chaque diapositive entière dès l'ouverture en tenant compte de la largeur et de la hauteur disponibles. Conserver les 18 images et les quatre accès existants. Zoom progressif de 100 à 300 %, retour Page entière, réinitialisation à chaque nouvelle page et plein écran avec repli si l'API est indisponible. Aucun changement des règles métier ou de la page de recette.

## Vérifications avant publication
Syntaxe JavaScript : réussite. Images : 18/18 décodables, fichiers inchangés. Chromium : 54/54 affichages conformes après chargement dans des fenêtres intégrées de 390 × 844, 844 × 390 et 1280 × 720 ; aucune coupure ou défilement interne à 100 %. Inspection visuelle bureau 1363 × 936 et portrait. Zoom borné à 300 %, retour à 100 % au changement de page, raccourcis p. 1/5/6/8 et fermeture/réouverture contrôlés. Commande plein écran et retour contrôlés ; disponibilité native selon navigateur, avec repli agrandi. Pas de test physique Samsung ni Safari/iOS.

## Livraison et retour arrière
Publication demandée sur l'adresse existante /sbs/. Le déploiement et la réponse effectivement servie doivent encore être contrôlés après ce commit. Pour revenir en arrière, restaurer seulement sbs/index.html depuis 18f2b6074a5625d8cf9f279bb61c9902ba7bb999 et republier. Les ressources et les autres applications restent identiques.
