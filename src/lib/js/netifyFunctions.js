import api from "./api.js";

export const getNetworkInfo = async (ipAddress, subnetPrefix) => {
	try {
		const response = await api.post("/v1/network/details/", {
			ip_address: ipAddress,
			subnet_mask_prefix: subnetPrefix
		})
		console.log(response);
		return response.data
	} catch (err) {
		console.error(err);
	}
}