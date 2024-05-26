import { TError } from '../types'

/* Default error object */
export const errorRequest: TError = {
	code: '500',
	message: 'Internal failures or inability to process the request',
	name: 'Internal Server Error',
}
