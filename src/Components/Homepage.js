import React from 'react';
import homepage from '../image/homepage.png';
import NavBar from './NavBar';
import SearchArea from './Search/SearchArea';

export default function Homepage(){
    return(
        <>
        <NavBar/>
        <div className="row">
            <div className="col " style={{marginLeft: '100px', marginTop:'100px'}}>
                <div className="col"><h1 className="text-danger">Dive in! <br/>There are so many things to do on<strong> Meetup</strong></h1></div>
                <div className="col" style={{fontFamily: 'sans-serif', fontSize:'20px'}}>Join a group to meet people, make friends, find support, grow a business, and explore your interests. Thousands of events are happening every day, both online and in person!</div>
            </div>
            <div className="col"><img src={homepage} alt="together" style={{width:'600px', height:'500px'}}></img></div>
        </div>
        <SearchArea/>
        </>
    )
}