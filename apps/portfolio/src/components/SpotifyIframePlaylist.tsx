
type Props = Pick<React.IframeHTMLAttributes<HTMLIFrameElement>, "src" | "className">

const SpotifyIframePlaylist = (props: Props) => {
  return (
    <iframe
      {...props}
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