function getImageIndex(image: string): string | null {
    const idOfImage = image.split('/').at(-1);
    if (!idOfImage) return null;
    const idWithoutType = idOfImage.split('.')[0];
    if (!idWithoutType) return null;
    return idWithoutType;
}

export { getImageIndex };