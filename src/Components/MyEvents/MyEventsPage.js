import React from 'react';
import { Switch, Route, Link} from 'react-router-dom';
import MyPreviousEvents from './MyPreviousEvents';
import MyEventsView from './MyEventsView';
import {useUserEventsContext } from '../../Context/UserDataContext';
import {handleRenderEventViewer} from '../../util/functionStore'
import NavBar from "../NavBar";
import { useAuth } from '../../Context/AuthContext';
import '../../styles/myEventStyle.css'

export default function MyEventsPage(props) {

    const {loading} = useAuth();

    const { history } = props;
    const {events} = useUserEventsContext();
    const method = 'myEvent'

    const items = document.getElementsByClassName('myEvents-links');
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', printDetails);
    }
    
    function printDetails(e) {
        
        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains("act")) {
                items[i].classList.toggle("act")
            }
        }
        this.classList.add("act");
    }
  
  
    
    return (
        <>
            {loading
            ?
                <></>
            :
                <>
                    <NavBar/>
                    <br/>

                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <ul id="menu-list">
                          
                            <Link className='myEvents-links act' to="/myEvents">
                                All events
                            </Link>
                            
                            <Link className='myEvents-links' to="/myEvents/joined">
                                Joined events
                            </Link>
                          
                            <Link className='myEvents-links' to="/myEvents/hosted">
                                Hosted events
                            </Link>
                            
                        </ul>    
                    </div>
                    <hr/>
                </>   
            }

            <Switch>
                <Route path="/myEvents" render = {(props) => (<MyEventsView {...props} loading = {loading} history = {history} events = {events} method={method}  handleRenderEventViewer={handleRenderEventViewer}></MyEventsView>)} />
                {/* <Route path="/myEvents/previous" component = {props =><MyPreviousEvents {...props}/>}/> */}
                {/* <Route path="/myOwnEvents" render = {(props) => (<MyHostedEvents {...props} handleViewEvent={handleRenderEventViewer}></MyOwnEvents>)} /> */}
            
            </Switch>
        </>
       
    );
}
