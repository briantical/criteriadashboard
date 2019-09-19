import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Login extends Component {
    componentDidMount() {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2VhMGE0MTkyNGYxMGI5MTg3NDczZiIsImlhdCI6MTU2ODc1MzkwOSwiZXhwIjoxNTcxMzQ1OTA5fQ.xh1xXYb4OLXUMYvKYRsugxektjOgKpwCx2O42qY7o_Q";
        let config = {
            headers: {
              'Authorization': "bearer " + token
            }
        };
        
        axios.get( 
          'http://localhost:3000/api/v1/cake/?skip=0&limit=1&search=cakeDetail',
          config
        ).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        });
    }

    render() {
        return (
            <div>
                <p>THIS IS THE LOGIN PAGE</p>
                <Link to="/register" >REGISTER</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
