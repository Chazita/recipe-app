import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
	baseURL,
});

function apiRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
	return api.request<T>({ ...config });
}

export default apiRequest;
