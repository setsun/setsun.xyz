"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PagePreviewLink: React.FC<{
  title: string;
  href: string;
  imageSrc?: string;
}> = ({ title, href, imageSrc }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      className="font-antonio relative block h-1/5 w-full overflow-hidden border-b-2 p-4 text-2xl"
      href={href}
    >
      <p className="relative z-10">{title}</p>

      {imageSrc && (
        <Image
          src={imageSrc}
          alt={`Image preview for ${title}`}
          fill={true}
          className="transition-opacity duration-500 ease-in-out"
          style={{
            objectFit: "cover",
            opacity: imageLoaded ? 0.3 : 0,
          }}
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </Link>
  );
};

export default PagePreviewLink;
