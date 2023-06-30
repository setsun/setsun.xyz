import Layout from "../../components/Layout"
import SpotifyIframePlaylist from "../../components/SpotifyIframePlaylist";

interface Props { }

const NowPlaying: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/1bUUPhe0zP9FgrsqYjxbTp?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/1cUbQxIOFcxeL5oUheu85i?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/3xx5COLUZ7Xwvyfg8MF4Nb?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/4LddzZkIk08J3IwqXladlJ?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/1aQK4Hz4Xmz3Y4NEhz9ReT?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/26ItkYptyl56YEIYQDQs7r?theme=0" />
      </div>
    </Layout>
  );
}

export default NowPlaying;
