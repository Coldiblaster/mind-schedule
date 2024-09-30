/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as Lucide from 'lucide-react';
import React from 'react';
import { match, P } from 'ts-pattern';

export type IconName = keyof typeof Lucide;

export type IconProps = Lucide.LucideProps & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  const element = match(name)
    .with(P.string.startsWith(name), icon => Lucide[icon])
    .otherwise(() => React.Fragment);

  return React.createElement(element, props);
}
