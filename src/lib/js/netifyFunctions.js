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