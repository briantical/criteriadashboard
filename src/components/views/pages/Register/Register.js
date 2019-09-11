import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => (
    <div>
        <p>THIS IS THE REGISTER PAGE</p>
        <Link to="/login" >LOGIN</Link>
        <Link to="/" >DASHBOARD</Link>
    </div>
)

export default Register;