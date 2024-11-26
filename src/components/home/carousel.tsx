import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { colors } from 'src/design/constant';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { BaseButton } from '../button/base-button';

interface CarouselProps {
  images: string[];
}

export default function Carousel(props: CarouselProps) {
  const { images } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      pauseAutoScroll();
    }
  };

  const handleNextClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      pauseAutoScroll();
    }
  };

  const pauseAutoScroll = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 12000);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isPaused, images.length]);

  useEffect(() => {
    // we disable animation lock after 1 second
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative flex flex-col w-full overflow-hidden">
      <div className="flex flex-row justify-center items-center w-full h-full">
        <ArrowButton onClick={handlePrevClick} icon={faChevronLeft} />
        <div className="w-[900px] h-[563px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                width={900}
                height={563}
                className="rounded-xl flex-shrink-0"
              />
            ))}
          </div>
        </div>
        <ArrowButton onClick={handleNextClick} icon={faChevronRight} />
      </div>
    </div>
  );
}

interface ArrowButtonProps {
  onClick: () => void;
  icon: IconProp;
}

const ArrowButton = (props: ArrowButtonProps) => {
  const { onClick, icon } = props;

  return (
    <div
      className={`flex flex-col relative z-10 ${
        icon === faChevronLeft ? 'left-12' : 'right-12'
      } bg-white px-2 py-1 rounded-full items-center justify-center`}
    >
      <BaseButton onClick={onClick}>
        <div>
          <FontAwesomeIcon icon={icon} size="lg" color={colors.primary} />
        </div>
      </BaseButton>
    </div>
  );
};
