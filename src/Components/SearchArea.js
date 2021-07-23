import React, { useRef, Component } from 'react';
import {searching} from '../services/userService';

export default function SearchArea(){

    const keywordRef = useRef();
    const locationRef = useRef();
   
    function handleSearch(e){
        e.preventDefault()
        const query = {
            keyword: keywordRef.current.value,
            location: locationRef.current.value
        }
        searching(query);
        
    }


    return(
        <div style={{width: '500px', marginLeft: '100px'}}>
        <h2>What do you want to do?</h2>
        <form>
            <div className="form-row">
                <div className="col">
                    <input type="texct" name="keyword" className="form-control" placeholder="Search for ..." ref={keywordRef}/>
                </div>
                <div className="col">
                    <input type="text" name="location" className="form-control" placeholder="Location" ref={locationRef}/>
                </div>
            </div>
            <button type="submit" className="btn btn-success mt-2 btn-block" onClick={handleSearch}>Search</button>
        </form>
        
        </div>
    )
}