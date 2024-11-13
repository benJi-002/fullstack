import { request } from "./request";

export const login = async (username: string, password: string) => {
    const response = await request({
        url: "/login",
        method: "POST",
        data: {
            username,
            password,
        },
    });

    return response;
};