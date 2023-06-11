import { CategoryService } from '$lib/services'

export const prerender = false
const isServer = import.meta.env.SSR

export async function load({ url, params, parent, setHeaders }) {
	const { store, origin, sid } = await parent()

	const categorySlug = params.slug

	const currentPage = +url.searchParams.get('page') || 1
	const fl = {}
	const query = url.searchParams
	const searchData = url.searchParams.get('q')
	const sort = url.searchParams.get('sort')

	query.forEach(function (value, key) {
		fl[key] = value
	})

	return {
		category: CategoryService.fetchCategory({
			id: categorySlug,
			server: isServer,
			sid,
			storeId: store?.id,
			origin
		}),
		// streamed: {
		megamenu: CategoryService.fetchMegamenuData({
			server: isServer,
			sid,
			storeId: store?.id,
			origin
		}),
		// },
		query: query.toString(),
		searchData,
		sort,
		store,
		currentPage
	}
}
