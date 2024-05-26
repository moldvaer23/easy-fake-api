import { createFakeApiServer } from './lib/create-fake-api-store'

enum EnumRequests {
	GET_USER = 'GET_USER',
}

const { getFakeRequest } = createFakeApiServer({
	store: {
		users: [
			{
				id: 1,
				name: 'John',
			},
		],
		agents: [
			{
				name: 'John',
			},
		],
	},
	middlewares: [
		(reqName, store) => {
			console.log('Выполняется запрос' + reqName)
			console.log(store.agents)
		},
	],
	requests: {
		[EnumRequests.GET_USER]: (store) => {
			return {
				data: store.users,
				errorObject: null,
				success: true,
			}
		},
	},
})

const getUsers = getFakeRequest<{ id: number; name: string }, unknown>({
	requestName: EnumRequests.GET_USER,
})

getUsers
	?.then((res) => {
		console.log(res.data)
	})
	.catch((err) => {
		console.log(err)
	})
