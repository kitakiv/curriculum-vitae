export type PrevState<V> = {
    message?: string;
    errors?: {
        [K in keyof V]?: string[];
    };
    success?: boolean;
    id: string | null;
};

export type PrevStateFull<V> = {
    message?: string;
    errors?: {
        [K in keyof V]?: string[];
    };
    success?: boolean;
    data: V;
}