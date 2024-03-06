import React, { useEffect, useState } from 'react'
import CreateNote from './CreateNote'
import './notes.css'
import {v4 as uuid} from 'uuid'
import Note from './Note'
import Search from './Search'

const Notes = () => {
    const [inputText, setInputText] = useState("")
    const [notes, setNotes] = useState([])
    const [editToggle, setEditToggle] = useState(null)
    const [searchText, setSearchText] = useState('');


    const editHandler = (id,text) => {
        setEditToggle(id)
        setInputText(text)
    }
    const saveHandler = () => {
        if(editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ?
                {...note, text: inputText}
                : note
            )))
        } else {
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    text: inputText
                }
            ])
        }
        
        setInputText("")
        setEditToggle(null)
    }

    const deleteHandler = (id) => {
        const newNotes = notes.filter(n => n.id !== id)
        setNotes(newNotes)
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (data) {
          setNotes(data);
        }
      }, []);

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);
  return (
    <>
    <Search handleSearchNote={setSearchText}/>
    <div className='notes'>
        {
            notes
            .filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()))
            .map((note) => (
                editToggle === note.id ?
                <CreateNote 
                        inputText={inputText}
                        setInputText = {setInputText} 
                        saveHandler = {saveHandler}
                        />
                :
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    editHandler = {editHandler}
                    deleteHandler= {deleteHandler}
                >
                </Note>
            ))
        }
        {
            editToggle === null ? 
            <CreateNote 
            inputText={inputText}
            setInputText = {setInputText} 
            saveHandler = {saveHandler}
        /> : <></>
        }
        
    </div>
    </>
  )
}

export default Notes
