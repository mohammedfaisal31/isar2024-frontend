const API_URL = 'http://localhost:8080';

export const API_ROUTES = {
  login: `${API_URL}/login`,
  displayUsers: `${API_URL}/users/display`,
  createSession: `${API_URL}/create-session`,
  addMember: `${API_URL}/api/addMember`,
  displayActiveSession: `${API_URL}/api/sessions/active`,
  displayInactiveSession: `${API_URL}/api/sessions/inactive`,
  endSession: `${API_URL}/api/sessions/end`,
  createEvent: `${API_URL}/api/events/create`,
  userLogin: `${API_URL}/api/user/login`,
  currentEvent: `${API_URL}/api/event/current`,
  endEvent: `${API_URL}/api/event/end`,
  getMembersBySession: `${API_URL}/api/getMembersBySession`,
  updateUser: `${API_URL}/api/updateUser`,
};
