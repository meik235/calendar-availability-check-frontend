import axios from "axios";
import { MIDDLEWARE } from "../constants/constants";

const createAxiosInstance = (baseURL: string | undefined) => {
	const instance = axios.create({
		baseURL,
	});
	return instance;
};

const axiosInstance = createAxiosInstance(MIDDLEWARE);

const ApiCalls = {
	get: function (url: string, params = {}, onFinish: any) {
		try {
			axiosInstance
				.get(url, params)
				.then((response) => {
					onFinish({
						success: true,
						status: response?.status,
						data: response?.data,
					});
				})
				.catch((error) => {
					onFinish({
						success: false,
						status: error?.response?.status,
						data: error?.response?.data,
					});
				});
		} catch (error) {
			onFinish({ success: false, status: 0, data: {} });
		}
	},
};

export default ApiCalls;
