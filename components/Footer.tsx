import {} from '@radix-ui/react-icons';

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    link: "https://github.com/setsun",
  },
  {
    name: "Instagram",
    link: "https://instagram.com/i.am.setsun"
  },
  {
    name: "Twitter",
    link: "https://twitter.com/setsun_"
  },

  {
    name: "Spotify",
    link: "https://open.spotify.com/user/3cl7vscgpyz5agjjh7fxg0l1z?si=66806580a1d24d68"
  },
  {
    name: "SoundCloud",
    link: "https://soundcloud.com/setsun_ai"
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center gap-4 my-8">
      {SOCIAL_LINKS.map(({ name, link }) => (
        <a href={link} key={name} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ))}
    </footer>
  );
}

export default Footer;