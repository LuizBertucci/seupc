'use client';

import { faGear, faHashtag, faLaptop, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../public/logo.png';

import { Tooltip } from './ui/tooltip';

export default function MainNav() {
  return (
    <div className="flex flex-col h-min-full w-[60px] bg-white justify-start items-center gap-2 ">
      <Link href="/admin">
        <Image src={logo} alt="SeuPC logo" className="w-[60px] h-[60px] cursor-pointer" />
      </Link>
      <div className="flex flex-col w-full gap-6 justify-center items-center">
        <Tooltip content="Configurações Gerais">
          <Link href="/admin">
            <FontAwesomeIcon
              icon={faGear}
              className="cursor-pointer text-primary w-[20px] h-[20px] transition delay-75 hover:translate-y-[-1px]"
            />
          </Link>
        </Tooltip>

        <Tooltip content="Notebooks">
          <Link href="/admin/notbooks">
            <FontAwesomeIcon
              icon={faLaptop}
              className="cursor-pointer text-primary w-[20px] h-[20px] transition delay-75 hover:translate-y-[-1px]"
            />
          </Link>
        </Tooltip>

        <Tooltip content="Parts">
          <Link href="/admin/parts">
            <FontAwesomeIcon
              icon={faMicrochip}
              className="cursor-pointer text-primary w-[20px] h-[20px] transition delay-75 hover:translate-y-[-1px]"
            />
          </Link>
        </Tooltip>

        <Tooltip content="Tags">
          <Link href="/admin/tags">
            <FontAwesomeIcon
              icon={faHashtag}
              className="cursor-pointer text-primary w-[20px] h-[20px] transition delay-75 hover:translate-y-[-1px]"
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
