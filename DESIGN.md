# Direction artistique : Atelier Kora

## Idée directrice
Le bois, vu de l'atelier. Le site alterne des sections sombres couleur
noyer et des sections claires couleur sciure, comme un plateau huilé
posé sur un établi. Les photos sont grandes, souvent pleine largeur.

L'élément que l'on retient : la typographie qui s'étire. Archivo est
une police variable dont la largeur va de 62 % à 125 %. Les grands
titres se resserrent ou s'élargissent au défilement et au survol,
comme une planche qu'on trace et qu'on débite. Les noms des essences
sont remplis du fil du bois.

La cote (ligne de dimension des plans de menuisier) reste présente,
en petit, là où elle porte une vraie mesure : la frise des étapes,
proportionnelle à leur durée.

## Ton
Sobre, précis, sans superlatifs. Phrases courtes, vouvoiement.
Les photos montrent le travail ; le texte donne les faits.

## Couleurs
- noyer #241913 : fond des sections sombres, texte sur fond clair
- noyer clair #33241A : surfaces posées sur fond noyer
- sciure #ECE5D9 : fond des sections claires, texte sur fond noyer
- copeau #F6F1E8 : surfaces posées sur fond sciure (formulaire, fiches)
- chêne #C99A5B : couleur d'accent. Bouton principal, bandeau d'appel,
  chiffres des étapes. Sur fond chêne, le texte est toujours noyer.
- brou #6B5848 : texte secondaire sur fond clair
- lin #B9A894 : texte secondaire sur fond sombre
- filet clair #D6CCBC, filet sombre #4A382B : filets et bordures ;
  sur fond chêne, filet noyer à 25 % d'opacité
- erreur #A1351E : messages d'erreur du formulaire, rien d'autre
- Aucune autre couleur. Pas de dégradé décoratif, pas d'ombre portée.
  Seule exception : un voile noyer en dégradé sur la photo d'ouverture,
  pour la lisibilité du texte posé dessus.

Contrastes mesurés : sciure sur noyer 13,7:1 ; brou sur sciure 5,4:1 ;
brou sur copeau 6,0:1 ; lin sur noyer 7,4:1 ; chêne sur noyer 6,8:1 ;
noyer sur chêne 6,8:1 ; erreur sur copeau 6,1:1.
Interdit : brou sur chêne (2,7:1).

## Police
Une seule famille : Archivo variable (graisse 100 à 900, largeur 62 % à
125 %), servie depuis le projet.
- Très grands titres (ouverture, appel final) : graisse 800, largeur
  animée entre 62 % et 125 %, interlettrage -0,03 em.
- Titres de section : graisse 700, largeur 75 %.
- Texte : largeur 100 %, graisse 400, 17 px, interligne 1,55.
- Petites mentions (légendes, durées) : largeur 87 %, graisse 500,
  chiffres tabulaires, 14 px.
- Interdit : capitales pour les étiquettes, mot isolé mis en couleur ou
  en italique dans un titre, police à chasse fixe, texte en contour.

## Échelle (px, téléphone / ordinateur)
- Ouverture : 64 / 220 (le mot Kora occupe toute la largeur)
- h1 des pages intérieures 52 / 150
- h2 36 / 88, h3 24 / 34
- Chapeau 19 / 22, texte 17, petit texte 15, mentions 14
- 68 caractères par ligne au plus pour le texte courant

## Mise en page
- Grille de 12 colonnes, largeur max 1440 px, marges 20 / 40 px.
- Texte aligné à gauche. Rien n'est centré, sauf la page 404.
- Entre sections : 96 px (téléphone), 176 px (ordinateur).
- Les photos débordent volontiers de la grille (pleine largeur).

## Mouvement
Le site est animé, mais chaque animation montre quelque chose :
- Ouverture de l'accueil (une fois) : la photo s'ouvre depuis une
  fente verticale, comme un trait de scie, et le mot Kora se déploie
  en largeur.
- Titres : les lignes montent derrière un masque quand elles entrent
  à l'écran.
- Manifeste : les mots passent de pâle à plein à mesure du défilement
  (opacité de départ 0,5 : le texte pâle garde un contraste de 3:1).
- Services : au survol, le titre s'élargit et la photo du service suit
  le pointeur.
- Réalisations de l'accueil : défilement horizontal épinglé.
- Étapes : cartes empilées, la frise des durées se remplit.
- Essences : bandeau qui avance avec le défilement.
- Photos : légère parallaxe, ouverture par masque.
- Galerie : réorganisation animée quand on change de filtre.
- Défilement doux (Lenis), désactivé sur écran tactile.
- Transitions de page : la nouvelle page se découvre de bas en haut
  pendant que l'ancienne s'efface (View Transitions du navigateur).

Règles :
- Durées 0,6 à 1,2 s, courbe expo.out ou power3.out.
- Contenu lisible sans JavaScript.
- Si l'utilisateur a demandé de réduire les animations : aucune
  animation, aucun défilement doux, tout est affiché d'emblée.

## Composants
- Bouton principal : fond chêne, texte noyer, hauteur 56, entièrement
  arrondi, effet magnétique au survol sur ordinateur. Un seul par écran.
  Sur fond chêne, il passe en noyer (texte sciure).
- Bouton secondaire : contour 1 px, rempli de chêne au survol.
- Lien secondaire : texte souligné 1 px, décalage 5 px.
- Menu : plein écran, fond noyer, grands liens qui montent un à un.
- Focus clavier : contour 2 px chêne, décalage 3 px, toujours visible.
- Cibles tactiles de 44 px au moins.

## Images
- Photos réelles uniquement. La visionneuse de la galerie montre la
  photo entière, dans ses proportions d'origine.
- Texte alternatif : ouvrage, essence, pièce.
- Légende de chaque réalisation : nom, bois, finition, dimensions.

## Icône du site
L'initiale K, noyer sur chêne.

## Interdit
- Effets de verre, ombres portées, néons, texte en contour
- Icônes dans des cercles colorés, illustrations 3D, images générées
- Étiquettes en capitales au-dessus des titres
- Numéros 01 / 02 / 03 hors d'une vraie suite d'étapes
- Flèches ajoutées au texte des liens et boutons
- Chiffres, logos clients ou avis inventés
- Émojis et tirets longs dans les textes
