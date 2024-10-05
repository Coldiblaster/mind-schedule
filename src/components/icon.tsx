import React from 'react';
import { type IconBaseProps } from 'react-icons/lib';
import * as LuIcon from 'react-icons/lu';
import * as MdIcon from 'react-icons/md';
import { match, P } from 'ts-pattern';

export type IconName = keyof typeof MdIcon | keyof typeof LuIcon;

export type IconProps = IconBaseProps & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  const element = match(name)
    .with(P.string.startsWith('Md'), icon => MdIcon[icon])
    .with(P.string.startsWith('Lu'), icon => LuIcon[icon])
    .otherwise(() => React.Fragment);

  return React.createElement(element, props);
}
