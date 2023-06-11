import stream from 'stream'
import S3 from 'aws-sdk/clients/s3'
import * as path from 'path'
import AmazonS3URI from 'amazon-s3-uri'
import {
	SECRET_S3_ACCESS_KEY,
	SECRET_S3_BUCKET_NAME,
	SECRET_S3_REGION,
	SECRET_S3_SECRET_KEY
} from '$env/static/private'

const bucketName = SECRET_S3_BUCKET_NAME
const region = SECRET_S3_REGION
const accessKeyId = SECRET_S3_ACCESS_KEY
const secretAccessKey = SECRET_S3_SECRET_KEY
const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey
})

export const createUploadStream = async (key: string, mimetype: string) => {
	try {
		const pass = new stream.PassThrough()
		return {
			writeStream: pass,
			promise: s3
				.upload({
					Bucket: bucketName,
					Key: key,
					Body: pass,
					ContentType: mimetype,
					ContentDisposition: 'inline',
					ACL: 'public-read',
					CacheControl: 'public, max-age=31536000'
				})
				.promise()
		}
	} catch (e) {
		throw new Error(e)
	}
}

export const deleteFileFromS3 = async (url: string) => {
	let deleted = null
	try {
		const { region, bucket, key } = AmazonS3URI(url)
		try {
			const params: any = {
				Bucket: bucket,
				Key: key
			}
			deleted = await s3.deleteObject(params).promise()
			return deleted
		} catch (e) {
			throw new Error(e)
		}
	} catch (e) {
		throw new Error(e)
	}
}

export const createDestinationFilePath = async (folder: string, fileName: string) => {
	try {
		const randomName = await generateRandomFilename(fileName)
		return folder + '/' + randomName
	} catch (e) {
		throw new Error(e)
	}
}

const generateRandomFilename = async (fileName: string) => {
	try {
		const { ext, name } = path.parse(fileName)
		const nameHyphen = name
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(/[^\w\-]+/g, '') // Remove all non-word chars
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, '')
		const randomName = nameHyphen + '-' + generateRandomString(12) + ext.split('?')[0]
		return randomName.toLowerCase()
	} catch (e) {
		throw new Error(e)
	}
}
const generateRandomString = (length: number) => {
	let result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}
