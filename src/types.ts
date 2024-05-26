/* Type of request or response error */
export type TError = {
	code: string
	message: string
	name: string
}

/* The type of data sent during the request */
export type TRequest<T> = {
	payload: TResponse<T>
	requestName: string
}

/* Type of server response*/
export type TResponse<T> = {
	data: T | null
	errorObject: TError | null
	success: boolean
}

/* Type of the request object */
type TRequestObject<T> = (store: TFakeStore<T>, payload?: any) => TResponse<any>

/* The type of data warehouse to which queries will be created */
export type TFakeStore<T> = T

/* Type of query storage */
export type TFakeRequests<T> = Record<string, TRequestObject<T>>

/* The type of middleware function */
export type TFakeMiddlewares<T> = Array<
	(activeRequestName: string, store: TFakeStore<T>) => void
>

/* The type of server parameters of the fake api */
export type TConfigureFakeApiServer<T> = {
	middlewares?: TFakeMiddlewares<T>
	requests: TFakeRequests<T>
	store: TFakeStore<T>
}

/* The type of parameters for the request receiving function */
export type TGetFakeRequestProps<T> = {
	requestName: string
	payload?: T
}
