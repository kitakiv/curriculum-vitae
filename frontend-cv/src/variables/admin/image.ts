function getImageIndex(image: string): number {
    const idOfImage = image.split('/').at(-1);
    if (!idOfImage) return -1;
    const idWithoutType = idOfImage.split('.')[0];
    if (!idWithoutType) return -1;
    const index = Number(idWithoutType.split('-').at(-1));
    if (isNaN(index) || index < 0 || index > 50) return -1;
    return index;
}

export { getImageIndex };