import React from 'react';
import './Card.scss';
import { Draggable } from 'react-beautiful-dnd';

function Card({ card, index, ...props }) {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => {
                const style = {
                    // backgroundColor: snapshot.isDragging ? '#ccc' : 'white',
                    ...provided.draggableProps.style,
                    fontSize: snapshot.isDragging ? '' : null,
                    border: snapshot.isDragging ? '1px dashed #00AFC1' : null,
                    color: snapshot.isDragging ? '#00AFC1' : null,
                    boxShadow: snapshot.isDragging
                        ? ' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
                        : null,
                };
                return (
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={style}
                        className='card_item'
                    >
                        {card.cover && <img src={card.cover} alt='test img' />}
                        <p>{card.title}</p>
                    </li>
                );
            }}
        </Draggable>
    );
}

export default Card;
