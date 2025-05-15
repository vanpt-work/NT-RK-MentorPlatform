export type Result<T = any> = {
    isSuccess: boolean;
    statusCode: number;
    errors?: string[];
    data?: T;
};
