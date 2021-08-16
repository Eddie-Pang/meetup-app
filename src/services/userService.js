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
    console.log(event)
    return http.post(`/new-events`, event)
}
//follow create event
export function uploadImg(formData){
    return http.put(`/new-images`, formData, {})
}
//get event (used in viewer)
export function getEvent(id){
    return http.get(`/getEvent/${id}`)
}

export function updateProfileImg(formData){
    return http.put(`/upload`, formData, {})
}

export function updatePersonalData(id, data){
    return http.put(`/personal/${id}`, data)
}

export function getUpcomingEvents(){
    return http.get(`/upcoming`)
}

//get all the events (joined, hosted) (used in myEvent)
export function getAllEvents(userId){
    return http.get(`/getAllEvents/${userId}`)
}

//when somebody join or canel event
export function updateAttendees(event,attendees) { 
    console.log(attendees)
    console.log(event)
    return http.put(`/attendees/${event._id}`, {'attendees': attendees});
};

export function deleteEvent(eventId){
    return http.delete(`/deleteEvent/${eventId}`)
}

//find events based on the category
export function findEvents(keyword){
    return http.get(`/find`, {params: {keyword}})
}


// export function updateUserOwnEvents(user,events) { 
//     return http.put(`/ownEvents/:${user._id}`, {'events': events});
// };

// export function updateUserEvents(user,events) { 
//     return http.put(`/events/:${user._id}`, {'events': events});
// };

// export function getImg(id){
//     return http.get(`/image/${id}`)
// }

// export function uploadImg(formData){
//     return http.post(`/new-image`, formData, {})
// }



















