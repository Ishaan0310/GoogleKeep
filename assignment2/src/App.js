import React, { useState, useEffect } from 'react'; // Added useEffect
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { v4 as uuidv4 } from 'uuid';

import { UserProvider } from './Context/UserContext';
import Topmenu from './Component/menubar/topmenu';
import SideMenu from './Component/menubar/sidemenu';
import { ManageNotes } from './Component/Notes';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyXy0llKi0QPkFg1h-rdWUbYXNqJakKBs",
  authDomain: "keep-397116.firebaseapp.com",
  projectId: "keep-397116",
  storageBucket: "keep-397116.appspot.com",
  messagingSenderId: "587907291852",
  appId: "1:587907291852:web:2117e8fd763617aa530069",
  measurementId: "G-TS04N2MKFR"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    let localUserId = localStorage.getItem('userId');
    if (!localUserId) {
        localUserId = uuidv4();
        localStorage.setItem('userId', localUserId);
    }
    setUserId(localUserId);
    // This effect will run once, when the component mounts
    
  }, []);

  const addNote = (note) => {
     
     fetch('/api/notes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          userId,  // <-- Include this
          title: note.title,
          tagline: note.tagline,
          body: note.body
      })
    })
    .then(res => res.json())
    .then(data => {
      
    })
    .catch(error => console.error('Error adding note:', error));
    setNotes(prevNotes => [...prevNotes, note]);
  };

  const updateNote = (updatedNotesArray) => {  
    setNotes(updatedNotesArray);  // Update the notes array directly with the provided array
  };
  const fetchNotes = () => {
    if (!userId) return;

    console.log("Fetching notes for user:", userId);

    fetch("/api/notes?userId=" + userId)
        .then(response => {
            if (!response.ok) {
                throw new Error("Server responded with a non-200 status");
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                console.log("Received notes:", data);
                setNotes(data);
            } else {
                console.error("Unexpected data format:", data);
            }
        })
        .catch(error => console.error("Error fetching notes:", error));
  };


useEffect(() => {
    fetchNotes();
}, [userId]);
  return (
    <UserProvider>
        <Topmenu 
            darkTheme={darkTheme} 
            setDarkTheme={setDarkTheme} 
            sideMenuOpen={sideMenuOpen} 
            setSideMenuOpen={setSideMenuOpen}
        />
        <SideMenu open={sideMenuOpen} setOpen={setSideMenuOpen} darkTheme={darkTheme} />
        {/* Main Content Container */}
        <div 
            style={{ 
                transform: sideMenuOpen ? 'translateX(240px)' : 'none',
                transition: 'transform 0.3s ease-in-out',
                position: 'relative',
            }}
        >
            <div style={{ marginTop: '70px' }}>
            <ManageNotes notes={notes} addNote={addNote} updateNote={updateNote} fetchNotes={fetchNotes} />

            </div>
        </div>
    </UserProvider>
  );
}

export default App;