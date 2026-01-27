export type TErrorSource = {
    path: string,
    message: string
}[]

export type TErrorResponse = {
    statusCode: number,
    message: string,
    errorSource: TErrorSource
}