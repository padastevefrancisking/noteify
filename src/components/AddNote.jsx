import "./Component.css";
import { useState, useEffect } from "react";
import supabase from "./../supabase-client.js";

function AddNote({ showPrompt, setShowPrompt, fetchNotes }) { 
    const [successMessage, setSuccessMessage] = useState("");

    const [note, setNote] = useState({
        title: "",
        author: "",
        message: "",
        tags: "",
        is_archived: false,
    });

    useEffect(() => {
        if (showPrompt) {
            document.body.style.overflow = "hidden"; 
        } else {
            document.body.style.overflow = "auto"; 
        }

        return () => {
            document.body.style.overflow = "auto"; 
        };
    }, [showPrompt]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote((prevNote) => ({
            ...prevNote,
            [name]: value, 
        }));
    };

    const addNote = async () => {
        if (!note.title.trim() || !note.author.trim() || !note.message.trim()) {
            setSuccessMessage("Title, Author, and Description cannot be empty!");
            return;
        }

        const { data, error } = await supabase
            .from("Note")
            .insert([note])
            .select();

        if (error) {
            setSuccessMessage("Error adding note!");
            console.log("Error adding note! ", error);
        } else {
            console.log("Data: ", data);
            setSuccessMessage("Note successfully added!");
            fetchNotes();
            
            // Reset the note fields
            setNote({
                title: "",
                author: "",
                message: "",
                tags: "",
                is_archived: false,
            });

            // Clear success message and close modal after 2 seconds
            setTimeout(() => {
                setSuccessMessage("");
            }, 2000);
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-300 w-[300px] flex flex-col gap-y-3">
                <h2 className="text-[#05668D] font-bold">Add New Note</h2>

                <div className="flex flex-col gap-y-1">
                    <div className="flex flex-row gap-x-1">
                        <h3 className="text-[#427AA1] text-left text-xs font-semibold">Title</h3>
                        <p className="text-red-600">*</p>
                    </div>
                    <input 
                        name="title"
                        type="text" 
                        value={note.title}
                        onChange={handleChange}
                        maxLength={32}
                        placeholder="Enter title..." 
                        className="w-full text-sm text-gray-600 p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex flex-col gap-y-1">
                    <div className="flex flex-row gap-x-1">
                        <h3 className="text-[#427AA1] text-left text-xs font-semibold">Author</h3>
                        <p className="text-red-600">*</p>
                    </div>
                    <input 
                        name="author"
                        type="text" 
                        value={note.author}
                        onChange={handleChange}
                        maxLength={32}
                        placeholder="Enter author..." 
                        className="w-full text-sm text-gray-600 p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex flex-col gap-y-1">
                    <h3 className="text-[#427AA1] text-left text-xs font-semibold">Tag</h3>
                    <input 
                        name="tags"
                        type="text" 
                        value={note.tags}
                        onChange={handleChange}
                        maxLength={32}
                        placeholder="Enter tag..." 
                        className="w-full text-sm text-gray-600 p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex flex-col gap-y-1">
                    <div className="flex flex-row gap-x-1">
                        <h3 className="text-[#427AA1] text-left text-xs font-semibold">Description</h3>
                        <p className="text-red-600">*</p>
                    </div>
                    <textarea 
                        name="message"
                        value={note.message}
                        onChange={handleChange}
                        placeholder="Enter note description..." 
                        maxLength={127}
                        className="w-full h-28 text-sm text-gray-600 p-2 border border-gray-300 rounded resize-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-end gap-2">
                        <button 
                            className="px-3 py-1 text-sm text-[#427AA1] bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition duration-300"
                            onClick={() => setShowPrompt(false)} 
                        >
                            Cancel
                        </button>
                        <button 
                            className="px-3 py-1 text-sm bg-[#427AA1] text-white rounded hover:bg-[#05668D] transition duration-300"
                            onClick={addNote}
                        >
                            Add Note
                        </button>
                    </div>

                    {/* Success/Error Message */}
                    {successMessage && (
                        <p className={`text-xs text-center ${successMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                            {successMessage}
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default AddNote;
