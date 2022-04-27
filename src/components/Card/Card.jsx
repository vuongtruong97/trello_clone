import './Card.scss';
import { Draggable } from 'react-beautiful-dnd';
import { getCardStyle } from 'utilities/dndutil';

function Card({ card, index }) {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getCardStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                        className='card_item'
                    >
                        {card.cover && <img src={card.cover} alt='test img' />}
                        <p>{card.title}</p>
                    </div>
                );
            }}
        </Draggable>
    );
}

export default Card;
