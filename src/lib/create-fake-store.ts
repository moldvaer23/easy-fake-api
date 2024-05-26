import { TFakeStore } from '../types'

/**
 * A function for creating a typed fake data store object
 * @param store - Storage object
 */
export const createFakeStore = <T>(store: TFakeStore<T>): TFakeStore<T> => store
