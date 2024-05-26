import { fakeRequest } from './fake-request'
import {
	TConfigureFakeApiServer,
	TFakeRequests,
	TFakeStore,
	TGetFakeRequestProps,
	TResponse,
} from '../types'

/**
 * A function for creating a fake api server
 * @param middlewares - An array of anonymous functions that must be executed during each request
 * @param requests - Handlers for data
 * @param store - Data storage
 */
export const createFakeApiServer = <T>({
	middlewares,
	requests,
	store,
}: TConfigureFakeApiServer<T>) => {
	/* A variable for storing data */
	const configStore: TFakeStore<T> = store

	/* A variable for storing requests */
	const configRequests: TFakeRequests<T> = requests

	/**
	 * A function for getting a request promise from a variable for storing requests
	 * @param {string} requestName - Name of the request
	 * @param payload - Optional request payload parameter. As K
	 */
	const getFakeRequest = <T, K = void>({
		requestName,
		payload,
	}: TGetFakeRequestProps<K>): Promise<TResponse<T>> | null => {
		/* Attempt to get a request from the configRequests variable */
		const storeRequest = configRequests[requestName] || null

		/* If the attempt to receive the request is unsuccessful, we return Null */
		if (!storeRequest) return null

		/* If you have passed middlewares, then iterate over all of them and call them */
		if (middlewares)
			middlewares.map((middleware) => {
				middleware(requestName, configStore)
			})

		/* We are fulfilling the necessary request */
		const dataFromRequest = storeRequest(configStore, payload && payload)

		/* We return the promise and with the execution of the fake request */
		return new Promise<TResponse<T>>((resolve, reject) => {
			fakeRequest(dataFromRequest)
				.then((res) => {
					if (!res.success || !res.data) return reject(res)
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	return {
		getFakeRequest: getFakeRequest,
	}
}
