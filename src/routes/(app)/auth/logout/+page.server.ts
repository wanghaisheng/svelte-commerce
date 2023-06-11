import { UserService } from '$lib/services'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	throw redirect(307, '/')
}

export const actions: Actions = {
	async default({ cookies, locals }) {
		await UserService.logoutService({ storeId: locals.store?.id, sid: cookies.get('connect.sid') })
		// eat the cookie

		cookies.set('store', null, {
			path: '/',
			expires: new Date(0)
		})

		cookies.set('settings', null, {
			path: '/',
			expires: new Date(0)
		})

		cookies.set('session', null, {
			path: '/',
			expires: new Date(0)
		})

		cookies.set('connect.sid', null, {
			path: '/',
			expires: new Date(0)
		})

		cookies.set('sid', null, {
			path: '/',
			expires: new Date(0)
		})

		cookies.set('me', null, {
			path: '/',
			expires: new Date(0)
		})

		locals.store = null
		locals.settings = null
		locals.session = null
		locals.me = null
		locals.sid = null

		// cookies.set('sid', '', {
		// 	path: '/',
		// 	expires: new Date(0)
		// })

		//redirect the user

		throw redirect(307, locals.store?.loginUrl || '/auth/login')
	}
}
