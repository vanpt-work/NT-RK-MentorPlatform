/* eslint-disable @typescript-eslint/no-explicit-any */
export type Result<T = any> = {
    isSuccess: boolean;
    statusCode: number;
    errors?: Error[];
    data?: T;
};


export type Error = {
    code: string;
    message: string;
}