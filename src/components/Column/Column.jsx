import './Column.scss';
import sortByKeyOfAnotherArr from 'utilities/sortByKeyOfAnotherArr';
import Card from '../Card/Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
function Column({ column, index }) {
    const { cards, cardOrder } = column;
    const sortedCards = sortByKeyOfAnotherArr(cards, cardOrder, 'id');

    return (
        // <Draggable draggableId={column.id} index={index}>
        // {(provided) => (
        <div
            // ref={provided.innerRef}
            // {...provided.draggableProps}
            // {...provided.dragHandleProps}
            className='column'
        >
            <header>{column.title}</header>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='card_list'
                    >
                        {sortedCards.map((card, index) => (
                            <Card key={card.id} card={card} index={index} />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
            <footer>Add another card</footer>
        </div>
        // )}
        // </Draggable>
    );
}

export default Column;
