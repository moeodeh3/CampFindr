import React from 'react';
import Player from 'lottie-react';

interface LottieProps {
  width: number;
  height: number;
  src: object;
}
export const Lottie = (props: LottieProps) => {
  const { width, height, src } = props;
  return (
    <div style={{ width: width, height: height }}>
      <Player
        autoplay
        loop
        style={{ height: '100%', width: '100%' }}
        animationData={src}
      />
    </div>
  );
};
