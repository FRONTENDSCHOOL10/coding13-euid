export function getPbImageURL(item, fileName = 'photo') {
  return `${process.env.VITE_PB_URL}api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}

export function getPbImagesURL(item, index, fileName = 'photo') {
  return `${process.env.VITE_PB_URL}api/files/${item.collectionId}/${item.id}/${item[fileName][index]}`;
}
