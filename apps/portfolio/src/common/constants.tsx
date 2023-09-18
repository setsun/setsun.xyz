import {
  RiGithubFill,
  RiInstagramLine,
  RiSpotifyLine,
  RiThreadsFill,
} from "react-icons/ri";

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    link: "https://github.com/setsun",
    icon: <RiGithubFill className="h-4 w-4" />,
  },
  {
    name: "Instagram",
    link: "https://instagram.com/i.am.setsun",
    icon: <RiInstagramLine className="h-4 w-4" />,
  },
  {
    name: "Threads",
    link: "https://threads.net/i.am.setsun",
    icon: <RiThreadsFill className="h-4 w-4" />,
  },
  {
    name: "Spotify",
    link: "https://open.spotify.com/user/3cl7vscgpyz5agjjh7fxg0l1z?si=66806580a1d24d68",
    icon: <RiSpotifyLine className="h-4 w-4" />,
  },
  // {
  //   name: "",
  //   link: "https://raycaster.io",
  //   icon: <RiFlashlightFill className="h-4 w-4" />,
  // },
  // {
  //   name: "SoundCloud",
  //   link: "https://soundcloud.com/setsun_ai"
  // }
];

export const NAVIGATION_ITEMS = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Visualizers",
    link: "/visualizers",
  },
  // {
  //   name: "UI",
  //   link: "/user-interfaces",
  // },
  {
    name: "Data",
    link: "/data-explorations",
  },
  // {
  //   name: "Games",
  //   link: "/games",
  // },
  // {
  //   name: "Writing",
  //   link: "/writing",
  // },
];
