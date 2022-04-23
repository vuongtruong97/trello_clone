import React from 'react';
import './Column.scss';
import sortByKeyOfAnotherArr from 'utilities/sortByKeyOfAnotherArr';

import Card from '../Card/Card';

function Column({ column, ...props }) {
    const { cards, cardOder } = column;
    const sortedCards = sortByKeyOfAnotherArr(cards, cardOder, 'id');
    return (
        <div className='column'>
            <header>{column.title}</header>
            <ul className='card_list'>
                {sortedCards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </ul>
            <footer>Add another card</footer>
        </div>
    );
}

export default Column;
