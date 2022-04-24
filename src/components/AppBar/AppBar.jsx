import React from 'react';
import 'components/AppBar/AppBar';
import './AppBar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function AppBar() {
    return (
        <nav className='app_bar'>
            <div className='app_bar_items app_bar_logo'>
                <div className='bar_item'>
                    <FontAwesomeIcon icon={solid('table-list')} />
                </div>
                <div className='bar_item logo_item'>
                    <FontAwesomeIcon icon={solid('dice-d6')} />
                    Troller
                </div>
            </div>
            <div className='app_bar_items app_bar_options'>
                <div className='bar_item'>
                    Workspaces
                    <FontAwesomeIcon icon={solid('angle-down')} />
                </div>
                <div className='bar_item'>
                    Recent
                    <FontAwesomeIcon icon={solid('angle-down')} />
                </div>
                <div className='bar_item'>
                    Starred
                    <FontAwesomeIcon icon={solid('angle-down')} />
                </div>
                <div className='bar_item'>
                    Templates
                    <FontAwesomeIcon icon={solid('angle-down')} />
                </div>
                <div className='bar_item'>
                    Create
                    <FontAwesomeIcon icon={solid('angle-down')} />
                </div>
            </div>
            <div className='app_bar_items app_bar_actions'>
                <div className='bar_item item_input'>
                    <label htmlFor='action_search'>
                        <FontAwesomeIcon icon={solid('magnifying-glass')} />
                    </label>
                    <input
                        id='action_search'
                        type='text'
                        placeholder='Search'
                    />
                </div>
                <a className='bar_item' href='/'>
                    <FontAwesomeIcon icon={solid('circle-info')} />
                </a>
                <a className='bar_item' href='/'>
                    <FontAwesomeIcon icon={solid('bell')} />
                </a>
                <div
                    className='bar_item'
                    style={{
                        width: '30px',
                        height: '30px',
                        display: 'inline-block',
                        backgroundImage:
                            'url("https://www.w3schools.com/howto/img_avatar.png")',
                        backgroundSize: 'cover',
                        borderRadius: '999px',
                    }}
                    href='/home'
                ></div>
            </div>
        </nav>
    );
}

export default AppBar;
