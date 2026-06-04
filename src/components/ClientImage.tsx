import type { CSSProperties, ImgHTMLAttributes } from "react";

interface ClientImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  style?: CSSProperties;
}

export default function ClientImage({
  src,
  alt = "",
  className = "",
  style,
  ...rest
}: ClientImageProps) {
  return <img src={src} alt={alt} className={className} style={style} {...rest} />;
}
