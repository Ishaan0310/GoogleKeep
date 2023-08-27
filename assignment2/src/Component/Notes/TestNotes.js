// import React, { useState } from 'react';

// function PinButton({ isPinned, togglePin }) {
//     return (
//         <button onClick={(e) => {
//             e.stopPropagation();
//             togglePin();
//         }}>
//             {isPinned ? 'Unpin' : 'Pin'}
//         </button>
//     );
// }

// const TestNotes = () => {
//     const [notes, setNotes] = useState([
//         { id: 1, title: 'Note 1', pinned: false },
//         { id: 2, title: 'Note 2', pinned: false }
//     ]);

//     const togglePinForNote = (noteId) => {
//         const updatedNotes = notes.map(note => 
//             note.id === noteId ? { ...note, pinned: !note.pinned } : note
//         );
//         setNotes(updatedNotes);
//     };

//     const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

//     return (
//         <div>
//             {sortedNotes.map(note => (
//                 <div key={note.id}>
//                     <h3>{note.title}</h3>
//                     <PinButton isPinned={note.pinned} togglePin={() => togglePinForNote(note.id)} />
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default TestNotes;
