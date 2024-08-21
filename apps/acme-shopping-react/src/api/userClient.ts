import axios from 'axios';


export interface UserInfo {
  userId: string;
  userName: string;
}

export const getUsernfo = async (): Promise<UserInfo | null> => {
  try {

    const response = await axios.get<UserInfo>('/userinfo', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Could not get user information due to:', error.response?.data || error.message);
    } else {
      console.error('Could not get user information due to an unexpected error:', error);
    }
    return null;
  }
};

