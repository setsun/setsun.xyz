import classNames from "classnames";

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => (
  <footer className={classNames("my-8 flex justify-center gap-4 text-xs", className)}>
    {/** todo: something will go here */}
  </footer>
);

export default Footer;
