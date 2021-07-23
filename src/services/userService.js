import http from './httpService';

export function searching(query){
    return http.get(`/search`, {params: {query}})
}