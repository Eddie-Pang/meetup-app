import http from './httpService';


// export function getUser(user) { 
//     return http.get(`/me`, user)
// };

export function searching(query){
    return http.get(`/search`, {params: {query}})
}

export function resetUserPassword(email) {
    return http.put(`/resetPassword/${email}`);

}

export function updateUserEvents(user,events) { 
    return http.put(`/events/:${user._id}`, {'events': events});
};

export function getEvent(id){
    return http.get(`/getEvent/${id}`)
}

// export async function googleLogin(email){
//     const result = await http.get(`/googleLogin/${email}`)
//     console.log(result)
//     const { headers: {'x-auth-token':token} } = result;
//     localStorage.setItem( "token" , token);
//     return result.data;
// }
