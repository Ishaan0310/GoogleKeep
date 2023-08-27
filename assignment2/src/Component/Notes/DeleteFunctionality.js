import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButton({ onDelete }) {
    return (
        <IconButton
            onClick={(e) => {
                e.stopPropagation();
                onDelete();
            }}
        >
            <DeleteIcon />
        </IconButton>
    );
}

const handleDeleteForNote = (noteId, notes) => {
    return notes.filter(note => note.id !== noteId);
};

export { DeleteButton, handleDeleteForNote };
