// https://velog.io/@votogether2023/%EC%82%AC%EC%9A%A9%EC%9E%90%EA%B0%80-%EC%97%85%EB%A1%9C%EB%93%9C-%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%95%95%EC%B6%95%ED%95%98%EC%97%AC-%EC%84%9C%EB%B2%84%EB%A1%9C-%EB%B3%B4%EB%82%B4%EA%B8%B0-feat.Browser-Image-Compression-Upload-Images-Converter-webp
export const getImageSize = (imageFile) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      resolve({ width, height });
    };

    reader.onload = () => {
      img.src = reader.result?.toString() ?? '';
    };

    reader.readAsDataURL(imageFile);

    img.onerror = (error) => {
      reject(error);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
