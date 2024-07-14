export function getPbImageURL(item, fileName = 'photo') {
  return `https://enter-euid.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}

export function getPbImagesURL(item, index, fileName = 'photo') {
  return `https://enter-euid.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName][index]}`;
}
