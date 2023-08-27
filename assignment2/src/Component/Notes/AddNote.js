import { Button, TextField, Card, CardContent } from '@mui/material';
import React, { useState } from 'react';

export default function AddNote({ onAdd, fetchNotes }) {
    const [title, setTitle] = useState('');
    const [tagline, setTagline] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = () => {
        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                title,
                tagline,
                body,
                pinned: false   // <---- Add this
            })
            
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || "Server responded with a non-200 status");
                });
            }
            return response.json();
        })
        .then(data => {
            fetchNotes(); // Fetch the latest notes after adding a new note
        })
        .catch(error => console.error('Error adding note:', error));

        setTitle('');
        setTagline('');
        setBody('');
    }

    return (
        <Card className="addNoteCard" style={{backgroundColor: "#f5f5f5", marginBottom: "20px", width: "40%", alignContent: "center"}}>
            <CardContent>
                <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    variant="outlined"
                />
                <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Tagline" 
                    value={tagline} 
                    onChange={e => setTagline(e.target.value)} 
                    variant="outlined"
                />
                <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Body" 
                    value={body} 
                    onChange={e => setBody(e.target.value)} 
                    multiline 
                    rowsMax={10}
                    variant="outlined"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} className="addButton">Add</Button>
            </CardContent>
        </Card>
    );
}