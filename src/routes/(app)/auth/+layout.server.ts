import { CartService } from '$lib/services'
export const prerender = false

export async function load({ url, locals, cookies }) {
	const currentPage = +url.searchParams.get('page') || 1
	const q = url.searchParams.get('q') || ''
	let cart
	try {
		const sid = cookies.get('connect.sid')
		const res: any = await CartService.fetchMyCart({
			storeId: locals.store?.id,
			server: true,
			sid,
			origin: locals.origin
		})

		if (res) {
			const cookieCart = {
				items: res?.items,
				qty: res?.qty,
				tax: res?.tax,
				subtotal: res?.subtotal,
				total: res?.total,
				currencySymbol: res?.currencySymbol,
				discount: res?.discount,
				savings: res?.savings,
				selfTakeout: res?.selfTakeout,
				shipping: res?.shipping,
				unavailableItems: res?.unavailableItems,
				formattedAmount: res?.formattedAmount
			}
			cart = cookieCart
			// serializedCart = cookie.serialize('cart', JSON.stringify(cookieCart) || '', {
			// 	path: '/'
			// })
		}
	} catch (e) {
	} finally {
	}

	if (cookies) {
		// cookies.set(serializedCart)
	}
	return {
		cart,
		currentPage,
		q,
		settings: locals.settings,
		store: locals.store,
		url: url.href
	}
}
