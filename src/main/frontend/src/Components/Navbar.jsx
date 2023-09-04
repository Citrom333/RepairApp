import gears from '/images/gears-5908.gif'
import React from 'react';
export default function Navbar() {
    return (
        <div className='sideBar'>
            <img src={gears} className="mini_logo" alt="Vite logo" />
            <ul className='sideBar_list'>
                <li className='sideBar_list_element'><a href="/">Home</a></li>
                <li className='sideBar_list_element'><a href="/vehicles">Vehicles</a></li>
                <li className='sideBar_list_element'><a href="/newShop">Add new shop</a></li>
                <li className='sideBar_list_element'><a href="/newFixture">New fixture</a></li>
                {/* További menüpontok */}
            </ul>
        </div>
    );
} 