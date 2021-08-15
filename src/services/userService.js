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

export function uploadImg(formData){
    return http.post(`/new-image`, formData, {})
}

export function getEvent(id){
    return http.get(`/getEvent/${id}`)
}

export function getImg(id){
    return http.get(`/image/${id}`)
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

export function getAllEvents(userId){
    return http.get(`/getAllEvents/${userId}`)
}

export function updateAttendees(event,attendees) { 
    console.log(attendees)
    console.log(event)
    return http.put(`/attendees/${event._id}`, {'attendees': attendees});
};

export function deleteEvent(eventId){
    return http.delete(`/deleteEvent/${eventId}`)

}

// export function updateUserOwnEvents(user,events) { 
//     return http.put(`/ownEvents/:${user._id}`, {'events': events});
// };

// export function updateUserEvents(user,events) { 
//     return http.put(`/events/:${user._id}`, {'events': events});
// };








<<<<<<< HEAD
=======
export function handleRenderEventViewer(event, events, method, history){
    events.handleEventViewer(event)
    history.push(`/event-viewer/?&method=${method}&&event=${event._id}`)
    
}

export function isOwned(event, currentUser) {
    const isHosted = (event) => event.host.id===currentUser._id
    const isJoined =(event)=> event.attendees?.some(i => i===currentUser?._id);
    if (isHosted(event)) return 'Hosted'
    else if (isJoined(event)) return 'Joined'
    else return   
}



//find events based on the category
export function findEvents(keyword){
    return http.get(`/find`, {params: {keyword}})
}




>>>>>>> eb4d074a0cabf0e52117972e54d1b6af6f53838d




