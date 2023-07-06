import classNames from "classnames";
import { SOCIAL_LINKS } from "../common/constants";

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => (
  <footer className={classNames("my-8 flex justify-center gap-4", className)}>
    {SOCIAL_LINKS.map(({ name, link, icon }) => (
      <a href={link} key={name} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    ))}
  </footer>
);

export default Footer;
