import React from 'react';
import 'App.scss';

//custom component
import AppBar from 'components/AppBar/AppBar.jsx';
import BoardBar from 'components/BoardBar/BoardBar';
import BoardContent from 'components/BoardContent/BoardContent';

function App() {
    return (
        <div className='trello_container'>
            <AppBar />
            <BoardBar />
            <BoardContent />
        </div>
    );
}

export default App;
