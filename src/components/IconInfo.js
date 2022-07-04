import React from 'react'
import './pages/Map.css';

export default function IconInfo({icon, title, specs}) {
    return (
        <div className='iconIUCRList'>
            <img src={icon} className='crimeLogo' alt='crime logo' />
            <div className='iconCopyWrap'>
                <h4 className='crimeName'>{title}</h4>
                <h6 className='crimeSpecs'>{specs}</h6>
            </div>
        </div>
    )
}
