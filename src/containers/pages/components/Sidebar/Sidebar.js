import React from 'react';

import { Sidebarnav } from './Sidebarnav';
import { Sidebarcontent } from './Sidebarcontent'
import './Sidebar.css';

const Sidebar = () => (
    <aside className='sidebar'>
        <Sidebarnav/>
        <Sidebarcontent/>
    </aside>
);

export default Sidebar;
