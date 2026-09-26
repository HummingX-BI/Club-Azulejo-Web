/// <reference types="vite/client" />

/* Allow importing CSS modules and plain CSS files */
declare module "*.css" {
  const content: string;
  export default content;
}

/* Allow importing fontsource italic variant */
declare module "@fontsource-variable/newsreader/wght-italic.css" {}
