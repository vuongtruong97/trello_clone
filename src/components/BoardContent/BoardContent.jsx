import React, { useState, useEffect } from 'react';
import './BoardContent.scss';
import { isEmpty } from 'lodash';

import { initialData } from 'actions/initialData';
import sortByKeyOfAnotherArr from 'utilities/sortByKeyOfAnotherArr';

import Column from '../Column/Column.jsx';

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
    return (
        <div className='board_content'>
            {columns.map((column, i) => {
                return <Column key={i} column={column} />;
            })}
        </div>
    );

    // <div className='board_content'></div>;
}

export default BoardContent;
