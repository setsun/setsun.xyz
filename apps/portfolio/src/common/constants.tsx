import {
  InstagramLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    link: "https://github.com/setsun",
    icon: <GitHubLogoIcon />,
  },
  {
    name: "Instagram",
    link: "https://instagram.com/i.am.setsun",
    icon: <InstagramLogoIcon />,
  },
  {
    name: "Twitter",
    link: "https://twitter.com/setsun_",
    icon: <TwitterLogoIcon />,
  },
  // {
  //   name: "Spotify",
  //   link: "https://open.spotify.com/user/3cl7vscgpyz5agjjh7fxg0l1z?si=66806580a1d24d68"
  // },
  // {
  //   name: "SoundCloud",
  //   link: "https://soundcloud.com/setsun_ai"
  // }
];

// todo: uncomment pages as they are ready
export const NAVIGATION_ITEMS = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Visualizers",
    link: "/visualizers",
  },
  {
    name: "Shaders",
    link: "/shaders",
  },
  {
    name: "Data",
    link: "/data",
  },
  {
    name: "Writing",
    link: "/writing",
  },
];
