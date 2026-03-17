export type PrevState<V> = {
    message?: string;
    errors?: {
        [K in keyof V]?: string[];
    };
    success?: boolean;
    id: string | null;
};