'use client';

import Lottie from 'lottie-react';

interface Props {
  size?: { width: string; height: string };
  url: unknown;
}

export const Animations = ({ size, url }: Props) => {
  return (
    <Lottie
      animationData={url}
      loop={true}
      style={{
        width: size?.width,
        height: size?.height,
      }}
    />
  );
};
