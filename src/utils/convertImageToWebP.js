// https://velog.io/@votogether2023/%EC%82%AC%EC%9A%A9%EC%9E%90%EA%B0%80-%EC%97%85%EB%A1%9C%EB%93%9C-%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%95%95%EC%B6%95%ED%95%98%EC%97%AC-%EC%84%9C%EB%B2%84%EB%A1%9C-%EB%B3%B4%EB%82%B4%EA%B8%B0-feat.Browser-Image-Compression-Upload-Images-Converter-webp
import { imageConverter } from 'upload-images-converter';

import { calculateAspectRatioSize } from '@/utils/calculateAspectRatioSize';
import { getImageSize } from '@/utils/getImageSize';

export const convertImageToWebP = async (imageFile) => {
  const { width: originWidth, height: originHeight } = await getImageSize(imageFile);

  const { width, height } = calculateAspectRatioSize({
    originWidth,
    originHeight,
    maxWidthOrHeight: 1280,
  });

  const compressedBlob = await imageConverter({
    files: [imageFile],
    width,
    height,
  });

  const outputWebpFile = new File([compressedBlob[0]], `${imageFile.name || Date.now().toString()}.webp`);

  return outputWebpFile;
};
