import http from './httpService';


export function getAccount(){
    return http.get(`/account`)
}

export function searching(query){
    return http.get(`/search`, {params: {query}})
}

export function resetUserPassword(email) {
    return http.put(`/resetPassword/${email}`);
}

export function createEvent(event){
    return http.post(`/new-events`, event)
}

export function getEvent(id){
    return http.get(`/getEvent/${id}`)
}

export function updateUserEvents(user,events) { 
    return http.put(`/events/:${user._id}`, {'events': events});
};

export function updateEventImg(formData){
    return http.put(`/upload-eventImage`, formData, {})
}

export function updateProfileImg(formData){
    return http.put(`/upload`, formData, {})
}

export function updatePersonalData(id, data){
    return http.put(`/personal/${id}`, data)
}





