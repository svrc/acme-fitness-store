export interface UserInfo {
  userId: string;
  userName: string;
}

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await fetch('/userinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Could not get user information');
      return null;
    }

    const data = await response.json();
    console.debug('Received user info:', data);
    return data;
  } catch (error) {
    console.error('Could not get user information due to:', error);
    return null;
  }
};

