import { useState, useEffect } from 'react';
import './BoardContent.scss';
import { isEmpty, cloneDeep, set } from 'lodash';

import { initialData } from 'actions/initialData';
import sortByKeyOfAnotherArr from 'utilities/sortByKeyOfAnotherArr';
import {
    DragDropContext,
    // , Droppable
} from 'react-beautiful-dnd';

import Column from '../Column/Column.jsx';
function BoardContent() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    const appBar = document.querySelector('.app_bar');
    const boardBbar = document.querySelector('.board_bar');

    useEffect(() => {
        const boardFromDb = initialData.boards.find(
            (board) => board.id === 'board-1'
        );
        if (boardFromDb) {
            setBoard(boardFromDb);

            //sort [columns] by [orderColumn]
            const sortedColumns = sortByKeyOfAnotherArr(
                boardFromDb.columns,
                boardFromDb.columnOrder,
                'id'
            );
            setColumns(sortedColumns);
        }
    }, []);

    if (isEmpty(board)) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100vh',
                    fontSize: '2.5rem',
                    color: '#fefefe',
                    paddingTop: '10vh',
                }}
                className='not_found'
            >
                <h2>Board Not Found!</h2>
            </div>
        );
    }
    const onDragEnd = (result) => {
        const { draggableId, source, destination } = result;

        // invalid position drop
        if (!destination) {
            return;
        }

        // the position does not change
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const startColumn = columns.find((column) => {
            return column.id === source.droppableId;
        });
        const finishColumn = columns.find((column) => {
            return column.id === destination.droppableId;
        });
        // same column
        if (startColumn === finishColumn) {
            const column = columns.find(
                (board) => board.id === destination.droppableId
            );
            const { cardOrder } = column;

            // update card order
            const [dragItemOrder] = cardOrder.splice(source.index, 1);
            cardOrder.splice(destination.index, 0, dragItemOrder);

            //change object reference and setState
            setColumns(cloneDeep(columns));
        }
        // different column
        if (startColumn !== finishColumn) {
            const [cardOrderDrag] = startColumn.cardOrder.splice(
                source.index,
                1
            );
            const [cardDrag] = startColumn.cards.splice(source.index, 1);

            finishColumn.cardOrder.splice(destination.index, 0, cardOrderDrag);
            finishColumn.cards.splice(destination.index, 0, cardDrag);

            //change object reference and setState
            setColumns(cloneDeep(columns));
        }
        appBar.style.opacity = 'inherit';
        boardBbar.style.opacity = 'inherit';
    };
    const onDragStart = (start) => {
        if (start) {
            // if ((appBar, boardBbar)) {
            //     appBar.style.opacity = '0.2';
            //     boardBbar.style.opacity = '0.2';
            // }
        }
    };
    const onDragUpdate = () => {
        // const opacity = destination ? destination.index / 6 : 0;
    };
    console.log('re - render');
    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
        >
            {/* <Droppable droppableId={board.id}>
                {(provided) => ( */}
            <div
                // ref={provided.innerRef}
                // {...provided.droppableProps}
                className='board_content'
            >
                {columns.map((column, i) => {
                    return <Column key={i} column={column} index={i} />;
                })}
                {/* {provided.placeholder} */}
            </div>
            {/* )}
            </Droppable> */}
        </DragDropContext>
    );
}

export default BoardContent;
