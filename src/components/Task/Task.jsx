import React, { useState } from 'react';
import './Task.scss';

function Task() {
    const [img, setImg] = useState(null);
    return (
        <li className='task_item'>
            {img && (
                <img
                    src='https://images.unsplash.com/photo-1650501808056-b68e94871f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
                    alt='test img'
                />
            )}
            <p>Title: Vuong9x</p>
        </li>
    );
}

export default Task;
