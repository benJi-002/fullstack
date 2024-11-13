'use client'
import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hooks';
import { postNote } from '../../../backend/api/note';
// import { redirect } from 'next/navigation';


type Note = {
    id: string | number;
    content: string;
    userId: number;
};

export default function DashboardPage() {
    const defaultNotes: Note[] = [
        {
            id: generateUUID(),
            content: 'Помыть посуду после обеда.',
            userId: 1,
        },
        {
            id: generateUUID(),
            content: 'Починить дверную ручку на кухне.',
            userId: 1,
        },
        {
            id: generateUUID(),
            content: 'Купить молоко и хлеб по пути домой.',
            userId: 1,
        },
    ]
    
    const role = useAppSelector(state => state.app.role);
    const userId = useAppSelector(state => state.app.userId);
    const token = useAppSelector(state => state.app.token);
    console.log(token)

    const [notes, setNotes] = useState<Note[]>(defaultNotes);
    const [textNewNote, setTextNewNote] = useState('');
    
    useEffect(() => {
        // Загрузить заметки из базы данных
    }, []);

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    const addNote = async () => {
        // Добавить новую заметку

        
        if (textNewNote.trim().length === 0) return;

        if (userId) {
            postNote(textNewNote.trim(), String(token));
        }
        
        const note = {
            id: generateUUID(),
            content: textNewNote.trim(),
            userId,
        }

        setNotes(notes => [...notes, note]);
        setTextNewNote('');
    };

    const updateNote = async (note: Note, content: string) => {
        // Обновить заметку
        const updatedNote = {
            id: note.id,
            content,
            userId: note.userId,
        }

        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
            )
        );
    };

    const deleteNote = async (noteId: number | string) => {
        setNotes(notes => notes.filter(note => note.id !== noteId));
        // Удалить заметку
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <input
                type="text"
                placeholder="New Note"
                value={textNewNote}
                onChange={(e) => setTextNewNote(e.target.value)}
            />
            <button onClick={addNote}>Add Note</button>
            <div className="notes-list">
                {notes.map((note) => (
                <div key={note.id} className="note">
                    <textarea
                        value={note.content}
                        onChange={(e) => updateNote(note, e.target.value)}
                    />
                    <button onClick={() => deleteNote(note.id)}>Delete</button>
                </div>
                ))}
            </div>
        </div>
    );
}
