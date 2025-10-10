export const FileErrors = {
  FILE_NOT_UPLOADED: 'No file provided',
  FILE_SIZE: (maxSize: number) =>
    `File size exceeds limit of ${maxSize / 1000000}MB`,

  FILE_TYPE: (types: string[]) =>
    `Invalid file type. Allowed: ${types.join(', ')}`,
};
