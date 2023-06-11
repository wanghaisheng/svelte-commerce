import { getAPI } from '$lib/utils/api'
import { getBySid } from '$lib/utils/server'
const isServer = import.meta.env.SSR

export const fetchCollections = async ({
	origin,
	query,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		if (isServer) {
			res = await getBySid(`collections?store=${storeId}`, sid)
		} else {
			res = await getAPI(`collections?store=${storeId}`, origin)
		}

		return res || {}
	} catch (e) {
		return {}
	}
}
