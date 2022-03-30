import { request } from "@/plugins";

export const userLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return request({
    path: "/account/login",
    method: "post",
    data: { username, password },
  });
};
