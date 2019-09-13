import React from 'react';

import './Dashboard.css';

import { Sidebar , Main } from '../components'

const Dasboard = () => (
    <div className='dashboard'>
        <Sidebar/>
        <Main/>
    </div>
)

export default Dasboard;