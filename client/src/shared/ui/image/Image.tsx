import { Skeleton } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { IImageLazyProps } from './type';

export const ImageLazy: FC<IImageLazyProps> = ({ src, inView, altText }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  useEffect(() => {
    if (inView && !isLoadedImage) {
      const img = new Image();
      img.onload = () => {
        setIsLoadedImage(true);
      };
      img.src = src;
    }
  }, [inView]);
  return (
    <>
      {isLoadedImage && inView && <img onLoad={() => setIsLoadedImage(true)} src={src} alt={altText} />}
      {!isLoadedImage && <Skeleton.Image active={true} />}
    </>
  );
};
