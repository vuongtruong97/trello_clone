import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import './AddColumn.scss';

function AddColumn({ boardId, addNewColumn }) {
    const formInput = useRef();
    const inputRef = useRef();
    const [formIsVisible, setFormIsVisible] = useState(false);
    const [newColumTitle, setNewColumTitle] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);

    const onInput = (e) => {
        setIsEmpty(false);
        setNewColumTitle(e.target.value);
    };
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    }, [formIsVisible]);
    const toggleForm = () => {
        setFormIsVisible(!formIsVisible);

        if (formIsVisible) {
            setIsEmpty(false);
        }
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!newColumTitle) {
            setIsEmpty(true);
            inputRef.current.focus();
        }
        if (newColumTitle) {
            console.log('submit-post-creat-new-column-api');
            const newColumnToAdd = {
                id: Math.random().toString(36).substr(4, 9),
                boardId: boardId,
                columnId: Math.random().toString(36).substr(4, 9),
                title: newColumTitle.trim(),
                cardOrder: [],
                cards: [],
            };
            addNewColumn(newColumnToAdd);
            setNewColumTitle('');
            setFormIsVisible(false);
        }
    };
    console.log('render');
    return (
        <div className='crud_list add_list'>
            <form
                // action='/user/task/creat'
                // method='POST'
                className='add_column'
                onSubmit={handleFormSubmit}
            >
                <label
                    htmlFor='toggleForm'
                    onClick={toggleForm}
                    className='add_btn'
                >
                    <FontAwesomeIcon icon={solid('plus')} />
                    Add another list
                </label>
                {formIsVisible && (
                    <div className='toggleForm' ref={formInput}>
                        <input
                            value={newColumTitle}
                            onInput={(e) => {
                                onInput(e);
                            }}
                            ref={inputRef}
                            name='column_title'
                            id='toggleForm'
                            className='form_input'
                            type='text'
                            placeholder='Enter list title...'
                        />
                        {isEmpty && (
                            <span className='input_warn'>
                                Please input list title!
                            </span>
                        )}
                        <div className='form_footer'>
                            <input
                                className='form_submit_btn'
                                type='submit'
                                value='Add'
                            />
                            <div onClick={toggleForm} className='close_form'>
                                <FontAwesomeIcon icon={solid('xmark')} />
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default AddColumn;
