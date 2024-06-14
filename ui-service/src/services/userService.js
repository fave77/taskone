import apiClient from '../utils/apiUtil';

const userService = {
  accessProfile: (username) => {
    return apiClient.post('/access-user', { userId: username });
  },

  deleteProfile: (username) => {
    return apiClient.post('/delete-user', { userId: username });
  },
};

export default userService;