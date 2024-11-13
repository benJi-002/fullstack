import { request } from "./request";

export const postNote = async (content: string, token: string) => {
    const response = await request({
        url: "/addmessage",
        method: "POST",
        data: {
            content,
            token,
        },
    });

    return response;
};