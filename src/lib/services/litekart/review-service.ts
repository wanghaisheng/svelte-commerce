import { error } from '@sveltejs/kit'
import { getAPI, post } from '$lib/utils/api'
import { getBySid } from '$lib/utils/server'
import type { Error, ProductReview } from '$lib/types'
const isServer = import.meta.env.SSR

export const fetchReviews = async ({
	origin,
	storeId,
	pid,
	search,
	sort,
	currentPage,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		if (isServer) {
			res = await getBySid(
				`es/reviews?search=${search || ''
				}&sort=${sort}&page=${currentPage}&store=${storeId}`,
				sid
			)
		} else {
			res = await getAPI(
				`es/reviews?search=${search || ''
				}&sort=${sort}&page=${currentPage}&store=${storeId}`,
				origin
			)
		}

		return {
			data: res.data || [],
			count: res.count,
			pageSize: res.pageSize,
			noOfPage: res.noOfPage,
			page: res.page
		}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

// Fetch product reviews

export const fetchProductReviews = async ({
	origin,
	page,
	slug,
	server = false,
	sid = null,
	storeId
}: any) => {
	try {
		let productReviewsRes: any = {}
		// : ProductReviews[]
		let productReviews: ProductReview = []

		if (isServer) {
			productReviewsRes = await getBySid(
				`reviews/product-reviews?slug=${slug}&page=${page}&sort=-createdAt&store=${storeId}`,
				sid
			)
		} else {
			productReviewsRes = await getAPI(
				`reviews/product-reviews?slug=${slug}&page=${page}&sort=-createdAt&store=${storeId}`,
				origin
			)
		}

		productReviews = productReviewsRes

		return productReviews || []
	} catch (e) {
		return []
	}
}

export const saveReview = async ({
	id,
	images,
	message,
	oid,
	pid,
	rating,
	storeId,
	origin
}: any) => {
	try {
		let res: any = {}

		res = await post(
			`reviews`,
			{
				id,
				images,
				message,
				oid,
				pid,
				rating,
				store: storeId
			},
			origin
		)

		return res
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}
