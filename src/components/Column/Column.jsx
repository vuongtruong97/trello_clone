import './Column.scss';
import sortByKeyOfAnotherArr from 'utilities/sortByKeyOfAnotherArr';
import Card from '../Card/Card';
import { Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
function Column({ column }) {
    const { cards, cardOrder } = column;
    const sortedCards = sortByKeyOfAnotherArr(cards, cardOrder, 'id');

    return (
        <div className='column'>
            <div className='column_pin'>
                <FontAwesomeIcon icon={solid('paperclip')} />
            </div>
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
            <footer>
                <div className='footer_add'>
                    <FontAwesomeIcon icon={solid('plus')} />
                    Add a card
                </div>
            </footer>
        </div>
    );
}

export default Column;
