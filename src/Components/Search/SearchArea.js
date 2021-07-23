import React, { useRef, useState, Component } from 'react';
import {searching} from '../../services/userService';
import { Link, useHistory } from "react-router-dom"
import Result from './Result';

export default function SearchArea(){

    const keywordRef = useRef();
    const locationRef = useRef();
    const [error, setError] = useState("");
    const history = useHistory() 
   
    async function handleSearch(e){
        e.preventDefault()
        try{
            setError("")
            const query = {
                keyword: keywordRef.current.value,
                location: locationRef.current.value
            }
            let result = await searching(query);

            history.push({
                pathname : '/result',
                data: result.data
            });
            
        }catch{
            setError('failed to search')
        }
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