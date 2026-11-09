# Portfolio — Bianca Guida

Site Next.js 15 · TypeScript · Tailwind CSS 4 · Motion (Framer Motion).

## Lancer le site

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # version de production
```

## Où modifier quoi

| Je veux…                                   | Fichier                                   |
|--------------------------------------------|-------------------------------------------|
| Ajouter / modifier / supprimer un projet   | `src/content/projects.ts`                 |
| Changer bio, e-mail, réseaux, compétences  | `src/content/site.ts`                     |
| Ajouter des images d'un projet             | `public/images/projets/<slug>/`           |
| Changer ma photo                           | `public/images/portrait/bianca.jpg`       |
| Couleurs & typographies                    | `src/app/globals.css` (bloc `@theme`)     |

Tout ce qui est marqué **⚠︎ À COMPLÉTER** ou **⚠︎ À RELIRE** est provisoire.

### Ajouter un projet
1. Crée le dossier `public/images/projets/mon-projet/` et dépose tes visuels (JPG/WebP, ~2000 px de large max).
2. Dans `src/content/projects.ts`, copie un bloc existant, change `slug`, `title`, les textes, et renseigne `cover` / `gallery` avec `src`, `alt`, `width`, `height`.
   - `thumbnail` = la **vignette** cliquable dans la liste des projets (facultatif : sinon c'est `cover` qui est utilisée).
   - `cover` = le grand visuel en haut de la page du projet.
3. Passe `draft: false` quand l'étude de cas est complète.

Le projet `flying-blue-lime` est l'exemple complet à imiter.

### Formulaire de contact
Crée un formulaire gratuit sur https://formspree.io, puis crée un fichier `.env.local` :

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Sans cette variable, le bouton « Envoyer » ouvre la messagerie avec le message pré-rempli.

## Mise en ligne
Le plus simple : pousser ce dossier sur GitHub puis l'importer sur https://vercel.com (gratuit). Pense à mettre à jour `url` dans `src/content/site.ts` avec ton nom de domaine.
