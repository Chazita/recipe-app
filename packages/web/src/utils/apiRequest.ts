import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000/",
});

function apiRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
	return api.request<T>({ ...config });
}

export default apiRequest;
