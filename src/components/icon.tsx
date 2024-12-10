import React from 'react';
import * as FaIcon from 'react-icons/fa6';
import { type IconBaseProps } from 'react-icons/lib';
import * as LuIcon from 'react-icons/lu';
import * as MdIcon from 'react-icons/md';
import * as PiIcon from 'react-icons/pi';
import { match, P } from 'ts-pattern';

export type IconName =
  | keyof typeof MdIcon
  | keyof typeof LuIcon
  | keyof typeof PiIcon
  | keyof typeof FaIcon;

export type IconProps = IconBaseProps & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  const element = match(name)
    .with(P.string.startsWith('Md'), icon => MdIcon[icon])
    .with(P.string.startsWith('Lu'), icon => LuIcon[icon])
    .with(P.string.startsWith('Pi'), icon => PiIcon[icon])
    .with(P.string.startsWith('Fa'), icon => FaIcon[icon])
    .otherwise(() => React.Fragment);

  return React.createElement(element, props);
}
