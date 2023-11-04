import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Split  from 'react-split';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { notesCollection, db } from '../firebase';


export default function App(){
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState('')

    const sortedNotes = notes.sort((a,b) => b.updatedAt - a.updatedAt)

    const currentNote =
        notes.find(note => note.id === currentNoteId)
        || notes[0]

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    },[notes])

    useEffect(() => {
      const unSubscribe = onSnapshot(notesCollection, function (snapshot) {
        const notesArray = snapshot.docs.map(doc => ({
            ...doc.data(),
            id : doc.id
        }))
        setNotes(notesArray)
      })
      return unSubscribe
  }, []);

  useEffect(() => {
    if(!currentNoteId){
        setCurrentNoteId(notes[0]?.id)
    }
  }, [notes])

    async function createNewNote(){
        const newNote = {
            body : "# Type your markdown note's title here",
            createdAt : Date.now(),
            updatedAt : Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        if (!currentNoteId) {
          setCurrentNoteId(newNoteRef.id);
      }
    }

    function findCurrentNote(){
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0] || {}
    }

    async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId)
    await setDoc(docRef, {body : text, updatedAt : Date.now()}, {merge : true})
  }

  async function deleteNote(noteId){
   const docRef = doc(db, "notes", noteId)
   await deleteDoc(docRef)
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
                notes = {sortedNotes}
                currentNote = {currentNote}
                setCurrentNoteId = {setCurrentNoteId}
                newNote = {createNewNote}
                deleteNote = {deleteNote}
                />
                {
                <Editor 
                currentNote = {currentNote}
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