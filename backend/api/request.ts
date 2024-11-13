import axios from "axios";

interface Data {
    username?: string;
    password?: string;
    confirmation_password?: string;
    content?: string;
    userId?: number;
    token?: string;
}

interface Request {
    method: string;
    url: string;
    data: Data;
    params?: string;
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

export const request = async ({ method, url, data, params }: Request) => {
    const options = {
        method,
        data,
        params,
        url,
    };

    const result = await axiosInstance(options);
        return result;
};