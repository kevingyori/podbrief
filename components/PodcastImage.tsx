type PodcastImageProps = {
  src: string | undefined;
  alt: string | undefined;
};

function PodcastImage({ src, alt }: PodcastImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      placeholder="/placeholder.png"
      className="w-20 h-20 rounded-md bg-[#a7baad]"
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/placeholder.png";
      }}
    />
  );
}

export { PodcastImage }
