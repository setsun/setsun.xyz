'use client';

import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import classNames from 'classnames';
import { NAVIGATION_ITEMS } from '../common/constants';

interface Props {
  className?: string
}

const SideNavigation: React.FC<Props> = ({ className }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className={classNames('flex flex-col items-center p-6 border-r-2 border-r-zinc-200 min-w-max', className)}>
      <button onClick={() => setOpen(!isOpen)}>
        {isOpen ? (
          <Cross1Icon className='h-8 w-8' />

        ) : (
          <HamburgerMenuIcon className='h-8 w-8' />
        )}
      </button>


      <div className='flex flex-col gap-1 mt-4'>
        {isOpen ?
          NAVIGATION_ITEMS.map(({ name, link }) => (
            <a href={link} key={link}>
              {name}
            </a>
          ))
          : (
            <div
              className='uppercase text-xl font-light font-antonio'
              style={{
                textOrientation: 'upright',
                writingMode: 'vertical-lr',
              }}
            >
              setsun.xyz
            </div>
          )}
      </div>
    </nav>
  );
}

export default SideNavigation;