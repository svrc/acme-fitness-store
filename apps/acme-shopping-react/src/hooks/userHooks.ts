import { useQuery } from "@tanstack/react-query";
import { UserInfo, fetchUserInfo } from "../api/userClient";

export const useUserInfo = () => {
    return useQuery<UserInfo | null, Error>({
      queryKey: ['userInfo'],
      queryFn: fetchUserInfo
    });
  };