

interface SingleImagesFromIds {
    resourceId: string;
    imageKey: string;
}

interface SingleImage {
    getImageKey(id: string): Promise<string | null>;
    uploadImage({ id, image }: { id: string; image: string }): Promise<{ id: string; [key: string]: string}>;
    getImageKeys(ids: string[]): Promise<(SingleImagesFromIds)[]>;
}

abstract class SingleImageBaseClass {
    public name: string;
    abstract getImageKey(id: string): Promise<string | null>;
    abstract uploadImage({ id, image }: { id: string; image: string }): Promise<{ id: string; [key: string]: string}>;
    abstract getImageKeys(ids: string[]): Promise<(SingleImagesFromIds)[]>;
}

export { SingleImage, SingleImagesFromIds, SingleImageBaseClass };