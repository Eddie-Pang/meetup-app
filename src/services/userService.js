import http from "./httpService";

export function getAccount(user) {
  return http.get(`/account`, { params: user });
}

export function searching(query) {
  return http.get(`/search`, { params: { query } });
}

export function resetUserPassword(email) {
  return http.put(`/resetPassword/${email}`);
}

export function createEvent(event) {
  return http.post(`/new-events`, event);
}

export function uploadImg(formData) {
  return http.post(`/new-image`, formData, {});
}

export function getEvent(id) {
  return http.get(`/getEvent/${id}`);
}

export function getImg(id) {
  return http.get(`/image/${id}`);
}

export function updateUserOwnEvents(user, events) {
  return http.put(`/ownEvents/:${user._id}`, { events: events });
}

export function updateUserEvents(user, events) {
  return http.put(`/events/:${user._id}`, { events: events });
}

export function updateProfileImg(formData) {
  return http.put(`/upload`, formData, {});
}

export function updatePersonalData(id, data) {
  return http.put(`/personal/${id}`, data);
}
