import React from 'react';

import './Profilemodal.css';
import axios from 'axios';
import { secureStorage } from '../../../../../utils';
import { withRouter } from 'react-router-dom';


 const Profilemodal = (props) => {
    
    let signout = () =>{
        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }
          axios.post( 
            'http://localhost:3000/api/v1/auth/sign-out',
            null,
            {headers}
          ).then((response) => {
            secureStorage.clear();
            
            console.log(props);
          })
          .then(()=>{
              console.log('Its not dne')
              props.history.push('/')
              console.log('Its not dne')
            })
          .catch((error) => {
            let theError = {message:error ,show:true}
            console.log(theError)
          });
    }

    return (
        <div className='profilemodal' onClick={()=>props.hideModal()}>
            <div>LUTAAYA BRIAN IVAN</div>
            <div onClick={() => signout()}>SIGN OUT</div>
        </div>
    )
};

export default withRouter(Profilemodal);