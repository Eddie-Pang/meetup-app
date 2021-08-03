
// import React, { useEffect, useState } from "react";
// import { updateImg } from "../services/userService";
// import http from '../services/httpService'
// import { useAuth } from '../Context/AuthContext';

// function useGetImg() {
//     const [status, setStatus]=useState('init');
//     const [image, setImage] = useState();
//     const { currentUser} = useAuth()
    
//     useEffect (() =>{
//         let isMounted = true;
//         async function requestUserImage(){

//             try{
//                 setStatus('requesting');
    
//                 if (isMounted){
//                     const result = await http.get(`/account`)
                
//                     const encode=result.data?.img?.data?.data;
//                     const type = result.data?.img?.contentType
//                     console.log(type)

//                     const arrayBufferToBase64 = buffer => {
//                         var binary = ''
//                         var bytes = [].slice.call(new Uint8Array(buffer))
//                         bytes.forEach(b => binary += String.fromCharCode(b))
//                         return window.btoa(binary)
//                     }
                
//                     const imgStr = arrayBufferToBase64(encode)
                    
//                     // const userProfile = (`data:${currentUser?.img?.contentType};base64,`+ imgStr ) 
//                     const userProfile = (`data:${type};base64,`+ imgStr ) 
                
//                     console.log(userProfile)
                
                    
//                     setImage(userProfile);
                  
//                     setStatus('received');
                 
//                 }  
//             }catch(error){
            
//                 setStatus('error');
//             }
//         }
//        requestUserImage();
//         return()=>{
//             setStatus('idle');
//             isMounted=false;
//         }
//     },[currentUser]);
//     return {
//         status, 
//         image
      
    

//     }
    
    
// }

// export default useGetImg;