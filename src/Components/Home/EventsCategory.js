import React from 'react';
import friends from '../../image/make-friends.png'
import connection from '../../image/connection.png'
import outdoor from '../../image/outdoor.png'
import { findEvents } from '../../services/userService';
import { useHistory } from "react-router-dom";
import { useCategory } from '../../Context/CategoryContext';

export default function EventsCategory(){
    const history = useHistory()
    const { category } = useCategory()
    const cover = [friends, connection, outdoor]
    // console.log(category)

    function handleClick(e){
        console.log(e.target.innerText)
        findEvents(e.target.innerText).then(res => {
            console.log(res.data)
            history.push({
                pathname : '/find',
                data: res.data
            });
        })


    }
    return(
        <>
        <div className="row">
            {/* <div className="col" style={{textAlign: 'center'}}>
                <img src={friends} className="rounded" alt="friends"  width="300" height="300" />
                <button type="button" className="btn btn-link" onClick={handleClick}>Learn culture & language</button>
            </div>

            <div className="col" style={{textAlign:'center'}}>
                <img src={connection} className="rounded" alt="connection"  width="300" height="300" />
                <button type="button" className="btn btn-link" onClick={handleClick}>Connection via tech</button>
            </div>

            <div className="col" style={{textAlign: 'center'}}>
                <img src={outdoor} className="rounded" alt="outdoor"  width="300" height="300" />
                <button type="button" className="btn btn-link" onClick={handleClick}>Explore the outdoors</button>
            </div>
            
            <div style={{margin: 'auto'}}>
                 <button className="btn btn-info" type="button" onClick={handleClick}>Reading</button>
                 <button className="btn btn-info" type="button" onClick={handleClick}>Career boost</button>
                 <button className="btn btn-info" type="button" onClick={handleClick}>Hone your craft</button>
                 <button className="btn btn-info" type="button" onClick={handleClick}>Find your zen</button>
            </div> */}
            {category.slice(0,3).map((value, index) => {
                return (
                    <div className="col" style={{textAlign: 'center'}} key={index}>
                        <img src={cover[index]} className="rounded" alt="default"  width="300" height="300"/>
                        <button type="button" className="btn btn-link" onClick={handleClick} key={index}>{value}</button>
                    </div>
                )
            })}
            <div style={{margin: 'auto'}}>
                {category.slice(3).map((value,index) => {
                    return (
                        <button className="btn btn-info" type="button" onClick={handleClick} key={index}>{value}</button>
                    )
                })}
            </div>

        </div>
        </>
    )
}