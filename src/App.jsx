import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Split  from 'react-split';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

export default function App(){
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState('')
    //     (notes[0] && notes[0].id) || ""
    // )

    useEffect(() => {
      if (notes.length > 0 && !currentNoteId) {
          setCurrentNoteId(notes[0].id);
      }
  }, [notes, currentNoteId]);

    function createNewNote(){
        const newNote = {
            id : nanoid(),
            body : "# Type your markdown note's title here"
        }
        setNotes(prevNote => [newNote, ...prevNote])
        if (!currentNoteId) {
          setCurrentNoteId(newNote.id);
      }
    }

    function findCurrentNote(){
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0] || {}
    }

    function updateNote(text) {
      setNotes(prevNotes =>
          prevNotes.map(note =>
              note.id === currentNoteId ? { ...note, body: text } : note
          )
      );
  }

    return (
        <main>
           {
            notes.length > 0 
            ?
            
                <Split 
                  sizes = {[30,70]}
                  direction = "horizontal"
                  className = "split"
                >
                <Sidebar 
                notes = {notes}
                currentNote = {findCurrentNote()}
                setCurrentNoteId = {setCurrentNoteId}
                newNote = {createNewNote}
                />
                {
                    currentNoteId &&
                    notes.length > 0 &&
                <Editor 
                currentNote = {findCurrentNote()}
                updateNote = {updateNote}
                />
                }    
                </Split>
            :
                <div className='no-notes'>
                    <h1>You have no notes</h1>
                    <button className="first-note" onClick={createNewNote}>Create one now</button>
                </div>
           }
        </main>
    )
}