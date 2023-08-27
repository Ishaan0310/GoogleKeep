import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Pagination, Dialog, TextField, Button } from '@mui/material';
import { AddNote } from './';
import { PinButton, sortNotesByPin, togglePinForNote } from './PinFunctionality';
import { DeleteButton, handleDeleteForNote } from './DeleteFunctionality';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import './ManageNotes.css';

export default function ManageNotes({ fetchNotes, notes, addNote, updateNote }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [page, setPage] = useState(1);
    const userId = localStorage.getItem('userId'); // Get userId from local storage


    useEffect(() => {
        if (!Array.isArray(notes)) {
            console.error("Notes is not an array:", notes);
            return; // Exit the effect
        }

        console.log("Fetching notes for user:", userId);

        fetch("/api/notes?userId=" + userId)
            .then(response => {
                console.log("Server response:", response);
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    console.log("Received notes:", data);
                    updateNote(data);
                } else {
                    console.error("Unexpected data format:", data);
                }
            })
            .catch(error => console.error("Error fetching notes:", error.message));

    }, [userId]);
    const sortedNotes = sortNotesByPin(notes);
    const handleTogglePin = (noteId) => {
        const updatedNotes = togglePinForNote(noteId, notes);

        // Update the specific note on the backend
        const updatedNote = updatedNotes.find(note => note.id === noteId);
        updatedNote.pinned = !!updatedNote.pinned; // Ensure it's a boolean

        fetch(`/api/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedNote)
        })
            .then(res => res.json())
            .then(data => {
                updateNote(updatedNotes);
            })
            .catch(error => console.error('Error updating note:', error));
    };


    const handleDelete = (noteId) => {
        fetch(`/api/notes/${noteId}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updatedNotes = handleDeleteForNote(noteId, notes);
                updateNote(updatedNotes);
            })
            .catch(error => console.error('Error deleting note:', error));
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setOpenDialog(true);
    };

    const saveEdit = () => {
        fetch(`/api/notes/${editingNote.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editingNote)
        })
            .then(res => res.json())
            .then(data => {
                const updatedNotes = notes.map(note => note.id === editingNote.id ? editingNote : note);
                updateNote(updatedNotes);
                setOpenDialog(false);
            })
            .catch(error => console.error('Error updating note:', error));
    };


    return (
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AddNote onAdd={addNote} fetchNotes={fetchNotes} />
            <Grid container spacing={3} style={{
                justifyContent: 'center', backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                borderRadius: 15,
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                marginBottom: "20px",
                marginTop: "20px",
                width: "80%",
                alignContent: "center"
            }}>
                {sortedNotes.slice((page - 1) * 6, page * 6).map(note => (
                    <Grid item xs={12} sm={4} key={note.id}>
                        <Card className="noteCard" style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 5, right: 5 }}>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the card's click event
                                        handleEdit(note);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <PinButton isPinned={note.pinned} togglePin={() => handleTogglePin(note.id)} />
                                <DeleteButton
                                    onDelete={() => {
                                        handleDelete(note.id);
                                        const updatedNotes = handleDeleteForNote(note.id, notes);
                                        updateNote(updatedNotes);
                                    }}
                                />



                            </div>
                            <CardContent>
                                <Typography variant="h6">{note.title}</Typography>
                                <Typography>{note.tagline}</Typography>
                                <Typography>{note.body}</Typography>
                            </CardContent>
                        </Card>

                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <div style={{ padding: '20px' }}>
                    <TextField fullWidth label="Title" value={editingNote?.title} onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })} />
                    <TextField fullWidth label="Tagline" value={editingNote?.tagline} onChange={(e) => setEditingNote({ ...editingNote, tagline: e.target.value })} style={{ marginTop: '10px' }} />
                    <TextField fullWidth label="Body" value={editingNote?.body} onChange={(e) => setEditingNote({ ...editingNote, body: e.target.value })} style={{ marginTop: '10px' }} />
                    <Button color="primary" variant="contained" style={{ marginTop: '20px' }} onClick={saveEdit}>
                        Save
                    </Button>
                </div>
            </Dialog>
            <Pagination count={Math.ceil(notes.length / 6)} page={page} onChange={(event, value) => setPage(value)} sx={{ justifyContent: 'center', marginTop: '20px' }} />
        </div>
    );
}