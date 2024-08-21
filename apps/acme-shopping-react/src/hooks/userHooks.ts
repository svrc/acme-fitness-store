import { useQuery } from "@tanstack/react-query";
import { UserInfo, getUsernfo } from "../api/userClient";

export const useGetUserInfo = () => {
  return useQuery<UserInfo | null, Error>({
    queryKey: ['userInfo'],
    queryFn: getUsernfo
  });
};