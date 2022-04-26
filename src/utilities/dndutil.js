// a little function to help us with reordering the result
export const reOrder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const getCardStyle = (isDragging, draggableStyle) => {
    return {
        //apply styles if item is dragging
        border: isDragging ? '1px dashed #00AFC1' : null,
        boxShadow: isDragging
            ? ' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
            : null,
        color: isDragging ? '#00AFC1' : null,

        // styles need to apply on draggables
        ...draggableStyle,
    };
};

export const getDraggingOverStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : null,
});
