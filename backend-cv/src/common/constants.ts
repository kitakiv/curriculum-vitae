const MAX_FILE_IMAGES = 5;
const KB = 1000;
const MB = KB * 1000;
const FILE_EXTENSIONS = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp', 'svg+xml'];
const expiryDate = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);
export { MAX_FILE_IMAGES, KB, MB, FILE_EXTENSIONS, expiryDate };
