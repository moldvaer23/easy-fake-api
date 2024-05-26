import { errorRequest } from './constants'
import { TResponse } from '../types'

/**
 * An imitation of an api request that returns data with a 90% chance and returns an error with a 10% chance.
 * With a 70% chance, the request will be delayed by 0.5 seconds with a 20% chance of 1-5 seconds and a 10% chance of error, respectively.
 */
export const fakeRequest = async <T>({
	data,
	errorObject,
	success,
}: TResponse<T>): Promise<TResponse<T>> => {
	const minChanceError = 1
	const maxChanceError = 11

	let delay: number

	/* Generating a chance of error */
	/* If errorChance <= 7, the delay will be 0.5 seconds, if a different number, the delay will be delay * 1000*/
	/* If errorChance <= 9, then we return the data  */
	/* If errorChance === 10, then we return an error */
	const errorChance = Math.floor(
		Math.random() * (maxChanceError - minChanceError) + minChanceError
	)

	/* Generation of the delay duration */
	if (errorChance <= 7) {
		const minDelay = 1
		const maxDelay = 6

		delay = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay)
	}

	return new Promise<TResponse<T>>((resolve, reject) => {
		setTimeout(
			() => {
				/* We return the data with a 90% chance */
				if (errorChance <= 9) {
					/* If data mining in middleware ended with bad luck */
					/* Then we return the error that the middleware request generated */
					if (!success || !data) reject(errorObject)

					/* If everything is successful, then we give the data */
					resolve({
						data: data,
						errorObject: errorObject,
						success: success,
					})
				} else if (errorChance === 10) {
					/* We return an error with a 10% chance */
					reject(errorRequest)
				}
			},
			errorChance <= 7 ? 500 : delay * 1000
		)
	})
}
