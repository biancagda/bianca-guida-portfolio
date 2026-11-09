import Image from "next/image";

type Logo = { src: string; width: number; height: number };

/**
 * Affiche un logo avec un équilibre optique : tous les logos occupent
 * la même surface visuelle, quel que soit leur format (large ou compact).
 * `size` = hauteur de référence d'un logo au format 3,5:1.
 */
export function BrandLogo({ logo, name, size = "clamp(30px,3vw,46px)" }: { logo: Logo; name: string; size?: string }) {
  const ratio = logo.width / logo.height;
  const factor = Math.sqrt(3.5 / ratio);
  return (
    <Image
      src={logo.src}
      alt={name}
      width={logo.width}
      height={logo.height}
      sizes="320px"
      className="block w-auto max-w-full select-none"
      style={{ height: `calc(${size} * ${factor.toFixed(3)})` }}
    />
  );
}
