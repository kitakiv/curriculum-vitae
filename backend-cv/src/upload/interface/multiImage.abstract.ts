import { BadRequestException } from "@nestjs/common";

interface MultiImage {
    getImageKey(resourceId: string, imageId: string): Promise<string | null>;
    uploadImage({ id, url }: { id: string; url: string }): Promise<{ id: string; [key: string]: string | string[]} | BadRequestException>;
    getImageKeys(resourceId: string): Promise<string[] | null>;
    uploadImages({ id, images }: { id: string; images: string[] }): Promise<{ id: string; [key: string]: string[] | string} | BadRequestException>;
    uploadImageIndex({ id, previousImageId, url }: { id: string; previousImageId: string; url: string }): Promise<{ id: string; [key: string]: string[] | string} | BadRequestException>;
    deleteImageIndex({ id, imageId }: { id: string; imageId: string }): Promise<{ id: string; [key: string]: string[] | string} | BadRequestException>;
}

abstract class MultiImageBaseClass {
    public name: string;
    abstract getImageKey(resourceId: string, imageId: string): Promise<string | null>;
    abstract uploadImage({ id, url }: { id: string; url: string }): Promise<{ id: string; [key: string]: string | string[]} | BadRequestException>;
    abstract getImageKeys(resourceId: string): Promise<string[] | null>;
    abstract uploadImages({ id, images }: { id: string; images: string[] }): Promise<{ id: string; [key: string]: string[] | string} | BadRequestException>;
    abstract uploadImageIndex({ id, previousImageId, url }: { id: string; previousImageId: string; url: string }): Promise<{ id: string; [key: string]: string[] | string} | BadRequestException>;
    abstract deleteImageIndex({ id, imageId }: { id: string; imageId: string }): Promise<{ id: string; [key: string]: string[] | string} | BadRequestException>;
}

export { MultiImage, MultiImageBaseClass };