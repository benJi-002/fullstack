import { request } from "./request";
import { login } from "./login";

export const register = async (
  username: string,
  password: string,
  confirmation_password: string
) => {
  await request({
    url: "/register",
    method: "POST",
    data: {
        username,
        password,
        confirmation_password,
    },
  });
  
  const response = await login(username, password);

  return response;
};