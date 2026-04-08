interface SingleImage {
    getImageKey(id: string): Promise<string | null>;
    uploadImage({ id, image }: { id: string; image: string }): Promise<{ id: string; [key: string]: string}>;
}


abstract class SingleImageBaseClass {
    public name: string;
    abstract getImageKey(id: string): Promise<string | null>;
    abstract uploadImage({ id, image }: { id: string; image: string }): Promise<{ id: string; [key: string]: string}>;
}

export { SingleImage, SingleImageBaseClass };