import Image from "next/image";
import Icon from "./Icon";

export default function Cover({
  src,
  alt,
  className,
  style,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {src && !src.endsWith(".gif") ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface">
          <Icon type="no-img" className="text-muted" size="medium" />
        </div>
      )}
    </div>
  );
}
