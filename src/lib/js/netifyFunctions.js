import api from "./api.js";

export const getNetworkDetails = async (ipAddress, subnetPrefix) => {
	try {
		const response = await api.post("/v1/network/details/", {
			ip_address: ipAddress,
			subnet_mask_prefix: subnetPrefix
		})
		return response.data
	} catch (err) {
		console.error(err);
	}
}

export const convertPrefixToMask = async (subnetPrefix) => {
	try {
		const response = await api.get(`/v1/mask/prefix/${subnetPrefix}/`)
		return response.data
	} catch (err) {
		console.error(err);
	}
}

export const convertMaskToPrefix = async (subnetMask) => {
	try {
		const response = await api.get(`/v1/mask/ip/${subnetMask}/`)
		return response.data
	} catch (err) {
		console.error(err);
	}
}

export const convertIPToBinary = async (ipAddress) => {
	try {
		const response = await api.get(`/v1/ip/bin/${ipAddress}/`)
		return response.data
	} catch (err) {
		console.error(err);
	}
}

export const convertBinaryToIP = async (binaryIPAddress) => {
	try {
		const response = await api.get(`/v1/ip/dec/${binaryIPAddress}/`)
		return response.data
	} catch (err) {
		console.error(err);
	}
}