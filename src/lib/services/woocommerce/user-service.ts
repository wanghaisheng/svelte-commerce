import { getWoocommerceApi, postWoocommerceApi } from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import { error } from '@sveltejs/kit'

export const fetchMeData = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}

		const response = await getWoocommerceApi(`auth`, null, sid)
		res.firstName = response.first_name
		res.lastName = response.last_name
		res.active = res.has_account

		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const signupService = async ({
	firstName,
	lastName,
	phone,
	email,
	password,
	passwordConfirmation,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		const response = await postWoocommerceApi(`customers`, {
			first_name: firstName,
			last_name: lastName,
			phone,
			email,
			password
		})
		res = response.customer
		res.firstName = res.first_name
		res.lastName = res.last_name
		res.active = res.has_account

		return res
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const loginService = async ({
	email,
	password,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		const response = await postWoocommerceApi(`auth`, {
			email,
			password
		})
		res = response.customer
		res.firstName = res.first_name
		res.lastName = res.last_name
		res.active = res.has_account

		return res
	} catch (e) {
		if (e.status === 401) e.message = 'email or password is invalid'
		throw error(e.status, e.data?.message || e.message)
	}
}

export const forgotPasswordService = async ({
	email,
	referrer,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await postWoocommerceApi(`signup`, {})

		return res
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const changePasswordService = async ({
	oldPassword,
	password,
	passwordConfirmation,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await postWoocommerceApi(`signup`, {})

		return res
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const getOtpService = async ({
	firstName,
	lastName,
	phone,
	email,
	password,
	passwordConfirmation,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await postWoocommerceApi(`signup`, {})

		return res
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const verifyOtpService = async ({
	phone,
	otp,
	storeId,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await postWoocommerceApi(`signup`, {})

		return res
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const logoutService = async ({ storeId, origin, server = false, sid = null }: any) => {
	try {
		let res: any = {}

		res = await delBySid(`auth`, origin)

		return res
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const updateProfileService = async ({
	storeId,
	e,
	origin,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getWoocommerceApi(`customers/me`, {}, sid)

		return res
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}
