import { redirect } from '@sveltejs/kit'
import { AddressService, CartService, PaymentMethodService } from '$lib/services'

export const prerender = false

export async function load({ params, parent, locals, url, request, cookies }) {
	const { me } = locals

	if (!me) {
		const redirectUrl = `${locals.store?.loginUrl || '/auth/login'}?ref=${url?.pathname}`
		throw redirect(307, redirectUrl)
	}

	const cartRes: any = await CartService.fetchRefreshCart({
		storeId: locals.store?.id,
		server: true,
		sid: cookies.get('connect.sid'),
		origin: locals.origin
	})

	const cart = {
		cartId: cartRes.cart_id,
		items: cartRes?.items,
		qty: cartRes.qty,
		tax: cartRes.tax,
		subtotal: cartRes.subtotal,
		total: cartRes.total,
		currencySymbol: cartRes.currencySymbol,
		discount: cartRes.discount,
		savings: cartRes.savings,
		selfTakeout: cartRes.selfTakeout,
		shipping: cartRes.shipping,
		unavailableItems: cartRes.unavailableItems,
		formattedAmount: cartRes.formattedAmount
	}

	locals.cart = cart

	try {
		const id = url.searchParams.get('address')

		const address = await AddressService.fetchAddress({
			storeId: locals.store?.id,
			server: true,
			id,
			sid: cookies.get('connect.sid')
		})

		const paymentMethods = await PaymentMethodService.fetchPaymentMethods({
			storeId: locals.store.id,
			server: true,
			sid: cookies.get('connect.sid')
		})

		return { paymentMethods, address, addressId: id, me, cart }
	} catch (e) {
		if (e) {
			throw redirect(307, '/checkout/address')
		}
	}
}
