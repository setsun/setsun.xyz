
interface Props {
  src: string;
}

const SpotifyIframePlaylist = ({ src }: Props) => {
  return (
    <iframe
      src={src}
      style={{ borderRadius: '12px' }}
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}

export default SpotifyIframePlaylist;