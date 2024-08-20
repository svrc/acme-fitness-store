import React, { createContext, useContext } from 'react';
import { UserInfo } from './api/userClient';

export const UserInfoContext = createContext<UserInfo | null>(null);

export const useUserInfo = () => {
    return useContext(UserInfoContext);
};