import { lazy } from "react";

const icons = import.meta.glob("@/assets/icons/*.svg", {
  query: { react: "" }
});
console.log(icons);
export default function loadIcon(path) {
  console.log(path);
  const iconImport = icons[path];
  console.log("iconImport:", iconImport)

  if (iconImport) {
    return lazy(iconImport);
  } else {
    console.error(`No such icon at ${path}`);
    return null;
  }
}