import React from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import IconButton from '@mui/material/IconButton';

function PinButton({ isPinned, togglePin }) {
    return (
        <IconButton onClick={(e) => {
            e.stopPropagation();  // Stop the event from propagating up
            togglePin();
        }}>
            {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
        </IconButton>
    );
}


const sortNotesByPin = (notes) => {
    console.log("Before sorting:", notes);
    const sorted = [...notes].sort((a, b) => b.pinned - a.pinned);
    console.log("After sorting:", sorted);
    return sorted;
};


const togglePinForNote = (noteId, notes) => {
    return notes.map(note => 
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
    );
};

export { PinButton, sortNotesByPin, togglePinForNote };
