import { useState, useEffect } from 'react';
import './BoardContent.scss';

import AddColumn from 'components/AddColumn/AddColumn';
import Column from '../Column/Column.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { isEmpty, cloneDeep } from 'lodash';
import { initialData } from 'actions/initialData';
import { reOrder } from 'utilities/dndutil';
import sortByKeyOfAnotherArr from 'utilities/sortByKeyOfAnotherArr';

function BoardContent() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

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
        const { source, destination } = result;
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

        if (result.type === destination.droppableId) {
            let newBoard = { ...board };
            let newColumns = [...columns];
            newColumns = reOrder(newColumns, source.index, destination.index);
            const newcolumnsOrder = newColumns.map((col) => col.id);
            newBoard.columnOrder = newcolumnsOrder;

            setColumns(newColumns);
            setBoard(newBoard);
        }
        if (result.type === 'DEFAULT') {
            const startColumn = columns.find((column) => {
                return column.id === source.droppableId;
            });
            const finishColumn = columns.find((column) => {
                return column.id === destination.droppableId;
            });
            // same column
            if (startColumn === finishColumn) {
                const newColumn = { ...finishColumn };
                const newCards = reOrder(
                    newColumn.cards,
                    source.index,
                    destination.index
                );
                newColumn.cards = newCards;
                newColumn.cardOrder = newCards.map((card) => card.id);

                // map and change
                const newColumns = columns.map((col) => {
                    if (col.id === newColumn.id) {
                        col = newColumn;
                    }
                    return col;
                });
                setColumns(newColumns);
            }
            // different column
            if (startColumn !== finishColumn) {
                // get and remove dragged item
                const [cardOrderDrag] = startColumn.cardOrder.splice(
                    source.index,
                    1
                );
                const [cardDrag] = startColumn.cards.splice(source.index, 1);

                //add droped item
                finishColumn.cardOrder.splice(
                    destination.index,
                    0,
                    cardOrderDrag
                );
                finishColumn.cards.splice(destination.index, 0, cardDrag);

                //change object reference and setState
                setColumns(cloneDeep(columns));
            }
        }
    };
    const addNewColumn = (newColumn) => {
        const newColumns = [...columns];
        newColumns.push(newColumn);

        //update board
        board.columns = newColumns;
        //update board column order
        const newColumnsOrder = board.columns.map((column) => column.id);
        board.columnOrder = newColumnsOrder;
        // end update //

        setColumns(newColumns);
    };

    console.log('render');
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId={board.id}
                direction='horizontal'
                type={board.id}
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='board_content'
                    >
                        {columns.map((column, i) => {
                            return (
                                <Draggable
                                    key={column.id}
                                    draggableId={column.id}
                                    index={i}
                                >
                                    {(provided) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Column column={column} />
                                            </div>
                                        );
                                    }}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                        <AddColumn
                            boardId={board.id}
                            addNewColumn={addNewColumn}
                        />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default BoardContent;
