// Import necessary packages
const express = require('express');
const router = express.Router();
const db = require('../firestore'); // Import the Firestore database reference

// POST route to create a new note
router.post('/', async (req, res) => {
    try {
        // Extract data from the request body
        let { userId, title, tagline, body, pinned = false } = req.body;

        // Validate the presence of required fields
        if (!userId || !title) {
            return res.status(400).json({ 
                error: "Required fields are missing" 
            });
        }

        // Create a new document in the "notes" collection
        const docRef = await db.collection('notes').add({
            userId,
            title,
            tagline,
            body,
            pinned,
            timestamp: new Date()
        });

        // Respond with the newly created note's ID and other data
        res.status(201).json({ id: docRef.id, ...req.body });
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET route to fetch notes for a specific user
router.get('/', async (req, res) => {
    try {
        // Extract user ID from the query parameters
        const userId = req.query.userId;

        // Validate the presence of user ID
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Fetch notes from the "notes" collection based on user ID
        const snapshot = await db.collection('notes').where("userId", "==", userId).get();

        // Process the fetched notes and send them in the response
        const notes = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            notes.push({ id: doc.id, ...data });
        });
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT route to update a note by its ID
router.put('/:id', async (req, res) => {
    try {
        // Extract note ID and updated data from the request
        const noteId = req.params.id;
        const updatedData = req.body;

        // Update the document in the "notes" collection
        const noteRef = db.collection('notes').doc(noteId);
        await noteRef.update(updatedData);

        // Respond with the updated note's ID and updated data
        res.status(200).json({ id: noteId, ...updatedData });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE route to delete a note by its ID
router.delete('/:id', async (req, res) => {
    try {
        // Extract note ID from the request parameters
        const noteId = req.params.id;

        // Delete the document from the "notes" collection
        await db.collection('notes').doc(noteId).delete();

        // Respond with a success message
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
