

export function handleRenderEventViewer(event, events, method, history){
    events.handleEventViewer(event)
    history.push(`/event-viewer/?&method=${method}&&event=${event._id}`)
    
}

//check whether the event is joined, hosted or neither 
export function isOwned(event, currentUser) {
    const isHosted = (event) => event.host.id===currentUser._id
    const isJoined =(event)=> event.attendees?.some(i => i===currentUser?._id);
    if (isHosted(event)) return 'Hosted'
    else if (isJoined(event)) return 'Joined'
    else return   
}
