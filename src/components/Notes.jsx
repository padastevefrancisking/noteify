import "./Component.css";
import { useState, useEffect } from "react";

import NoteWidget from "./NoteWidget.jsx";
import NoteContent from "./NoteContent.jsx";

function Notes({ noteList = [] }) {
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        if (selectedNote) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto"; // Restore scrolling
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedNote]);

    return (
        <div className="w-[400px] h-auto p-5 flex flex-col gap-y-3">
            <div className="flex flex-col pl-2">
                <h1 className="text-[#05668D] text-left font-semibold text-2xl"> General Notes</h1>
                <p className="text-gray-500 text-left italic text-sm"> Check out some notes left by different people! </p>
            </div>
            <div className="flex flex-col gap-y-3">
                {noteList.length === 0 ? (
                    <p className="text-gray-500 text-center">No notes available.</p>
                ) : (
                    noteList.map((note) => (
                        <NoteWidget key={note.id} note={note} onView={setSelectedNote} />
                    ))
                )}
            </div>

            {selectedNote && (
                <NoteContent 
                    note={selectedNote} 
                    onClose={() => setSelectedNote(null)} 
                />
            )}
        </div>
    );
}

export default Notes;
