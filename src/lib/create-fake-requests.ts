import { TFakeRequests } from '../types'

/**
 * The function of creating a typed query object
 * @param requests - Request object
 */
export const createFakeRequests = <T>(
	requests: TFakeRequests<T>
): TFakeRequests<T> => requests
