import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
	baseURL: baseUrl,
});

function apiRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
	return api.request<T>({ ...config });
}

export default apiRequest;
