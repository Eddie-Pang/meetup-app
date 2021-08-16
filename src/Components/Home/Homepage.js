import React from 'react';
import homepage from '../../image/homepage.png';
import NavBar from '../NavBar';
import SearchArea from '../Search/SearchArea';
import { loadingIcon } from '../../util/imgPicker'
import UpcomingEvents from './UpcomingEvents';
import EventsCategory from './EventsCategory';
import { useAuth } from '../../Context/AuthContext';




export default function Homepage(props){
    const { loading} = useAuth()
    const { history, method, handleRenderEventViewer} = props
    
    return(
       
        <>  
            {loading
            ?
                <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
            :
                <>
                    <NavBar/>
                    <div className="row">
                        <div className="col " style={{marginLeft: '100px', marginTop:'100px'}}>
                            <div className="col"><h1 className="text-danger">Dive in! <br/>There are so many things to do on<strong> Meetup</strong></h1></div>
                            <div className="col" style={{fontFamily: 'sans-serif', fontSize:'20px'}}>Join a group to meet people, make friends, find support, grow a business, and explore your interests. Thousands of events are happening every day, both online and in person!</div>
                        </div>
                        <div className="col"><img src={homepage} alt="together" style={{width:'600px', height:'500px'}}></img></div>
                    </div>

                    <br/><br/>

                    <EventsCategory />

                    <br/><br/>
                    
                    <div style={{width: '500px', paddingLeft: '100px', marginTop:'2rem'}}>
                        <h2>What do you want to do?</h2>
                        <SearchArea/>
                    </div>

                    <br/><br/><br/>
                    <hr/>

                    <UpcomingEvents  method = {method} history = {history} handleRenderEventViewer={handleRenderEventViewer} />
                    </>
            }    
        </>        
    )
}