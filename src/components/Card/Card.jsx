import React from 'react';
import './Card.scss';

function Card({ card, ...props }) {
    return (
        <li className='card_item'>
            {card.cover && <img src={card.cover} alt='test img' />}
            <p>{card.title}</p>
        </li>
    );
}

export default Card;
