import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { NAVIGATION_ITEMS } from '../common/constants';

interface Props {
  className?: string
}

const SideNavigation: React.FC<Props> = ({ className }) => (
  <nav className={classNames('p-4 border-r-2 border-r-zinc-200 min-w-max', className)}>
    {/* <HamburgerMenuIcon className='h-8 w-8' /> */}

    {/* <Cross1Icon className='h-8 w-8' /> */}

    <div className='flex flex-col gap-1'>
      {NAVIGATION_ITEMS.map(({ name, link }) => (
        <a href={link} key={link}>
          {name}
        </a>
      ))}
    </div>
  </nav>
);

export default SideNavigation;