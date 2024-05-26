import { TFakeMiddlewares } from '../types'

/**
 * The function of creating a typed object that stores middlewares
 * @param middlewares - An object that stores middlewares
 */
export const createFakeMiddlewares = <T>(
	middlewares: TFakeMiddlewares<T>
): TFakeMiddlewares<T> => middlewares
