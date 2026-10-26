# Direction artistique : Atelier Kora

## Idée directrice
Le site emprunte au plan de menuisier : un papier à dessin gris clair,
un trait d'encre, et des lignes de cotes (les flèches de dimension des
plans techniques) autour des photos. La cote est le seul élément
décoratif du site. Elle porte toujours une vraie information
(dimensions d'un ouvrage, durée d'une étape), jamais de la décoration.

## Ton
Sobre, précis, sans superlatifs. Phrases courtes, vouvoiement.
Les photos montrent le travail ; le texte donne les faits.

## Couleurs
- papier #EDEEEA : fond principal
- ivoire #F7F7F4 : fond des blocs secondaires (formulaire)
- encre #1B1F1C : texte, pied de page (fond)
- graphite #565D58 : texte secondaire, lignes de cotes
- trait #C7CBC4 : filets et bordures
- vert machine #2E4B3E : bouton principal, bandeau d'appel
  survol #22392F
- sauge #A9B8AE : texte secondaire sur fond encre ou vert
- erreur #9B2C1F : messages d'erreur du formulaire, rien d'autre
- blanc #FFFFFF : texte sur vert, fond des champs de formulaire
- Aucune autre couleur. Aucun dégradé, aucune ombre.

Contrastes mesurés : encre sur papier 14,3:1 ; graphite sur papier
5,8:1 ; blanc sur vert 9,6:1 ; sauge sur encre 8,1:1 ;
erreur sur ivoire 7,1:1.

## Police
Une seule famille : Archivo (variable, graisse et largeur), servie
depuis le projet (pas d'appel à Google Fonts).
- Titres : Archivo condensé (largeur 72 %), graisse 700, interlettrage
  légèrement serré.
- Texte : Archivo largeur 100 %, graisse 400, 17 px.
- Cotes et légendes : Archivo largeur 87 %, graisse 500, chiffres
  tabulaires, 13 px.
- Interdit : capitales pour les étiquettes, mot isolé mis en couleur
  dans un titre, police à chasse fixe.

## Échelle (px, téléphone / ordinateur)
- h1 44 / 88, h2 32 / 52, h3 22 / 26
- Chapeau (introduction de page) 19, texte 17, petit texte 15, cotes 13
- Interligne : 1,55 (texte), 1,0 à 1,1 (titres)
- 68 caractères par ligne au plus

## Mise en page
- Grille de 12 colonnes, largeur max 1280 px, marges 20 / 48 px.
- Tout est aligné à gauche. Rien n'est centré, sauf la page 404.
- Entre sections : 72 px (téléphone), 128 px (ordinateur).
- Les sections sont séparées par un filet couleur trait, pas par des
  aplats de couleur. Seul le bandeau d'appel est en vert.

## Composants
- Bouton principal : fond vert, texte blanc, hauteur 52, coins 3 px.
  Un seul par écran.
- Lien secondaire : texte encre souligné, épaisseur 1 px, décalage 4 px.
- Pas de cartes à ombre. Les listes de services sont des rangées
  séparées par des filets.
- Focus clavier : contour 2 px vert, décalage 3 px, toujours visible.

## Images
- Photos réelles uniquement, formats 3:2 ou 4:5. La visionneuse de la
  galerie montre la photo entière, dans ses proportions d'origine.
- Texte alternatif : ouvrage, essence, pièce.
- Légende sous chaque réalisation : nom, bois, finition, dimensions.

## Icône du site
L'initiale K du logotype, blanche sur vert machine.

## Mouvement
- Un seul moment animé : au chargement de l'accueil, les cotes de la
  photo d'ouverture se tracent (0,9 s). Désactivé si l'utilisateur a
  demandé de réduire les animations.
- Ailleurs : seulement les réponses aux actions (ouverture du menu,
  filtre de la galerie, agrandissement d'une photo).

## Interdit
- Dégradés, effets de verre, ombres portées, néons
- Icônes dans des cercles colorés, illustrations 3D, images générées
- Étiquettes en capitales au-dessus des titres
- Numéros 01 / 02 / 03 hors d'une vraie suite d'étapes
- Flèches ajoutées au texte des liens et boutons
- Chiffres, logos clients ou avis inventés
- Émojis et tirets longs dans les textes
