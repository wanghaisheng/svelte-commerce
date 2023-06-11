import { getBigcommerceApi } from '$lib/utils/server'
import { error } from '@sveltejs/kit'
import type { Error } from '$lib/types'
import { post } from '$lib/utils/api'

export const submitContactUsForm = async ({
	storeId,
	fullName,
	email,
	phone,
	subject,
	message,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getBigcommerceApi(`customers/me`, {}, sid)

		return res
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data.message)
	}
}

export const bulkOrderEnquiry = async ({
	storeId,
	name,
	companayName,
	email,
	phone,
	interestedProducts,
	minQty,
	message,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getBigcommerceApi(`customers/me`, {}, sid)

		return res
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}
