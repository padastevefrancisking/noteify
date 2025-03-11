import "./Component.css"
import NoteifyLogo from "./../assets/noteify-logo.png"
import AddIcon from "./../assets/add.png"
import Search from "./Search.jsx";

import { useState } from "react";
import AddNote from "./AddNote.jsx";

function Header ({ setQuery, fetchNotes }) {
    const [showPrompt, setShowPrompt] = useState(false);

    return (
        <header className="w-full h-12 fixed top-0 left-0 bg-[#05668D] text-[#EBF2FA] text-center p-2 flex items-center justify-between z-10">
            <div className="flex items-center flex-1">
                <img src={NoteifyLogo} alt="Tempest Logo" className="w-6 h-auto object-cover" />
                <h1 className="text-md font-bold mx-1">NoteIfy!</h1>
            </div>

            <div className="flex justify-end flex-1 gap-x-2">
                <Search setQuery={setQuery} fetchNotes={fetchNotes} />
                <button
                    className="w-8 h-8 flex items-center justify-center border-2 border-[#427AA1] rounded-md shadow-md
                        hover:bg-[#427AA1] transition duration-300"
                    onClick={() => {
                        console.log(showPrompt);
                        setShowPrompt(true);
                    }}
                >
                    <img src={AddIcon} alt="Search Icon" className="w-4 h-4 object-contain" />
                </button>
            </div>

            {showPrompt && (
                <AddNote 
                    showPrompt={showPrompt} 
                    setShowPrompt={setShowPrompt}
                    fetchNotes={fetchNotes} 
                />
            )}
        </header>
    )
}

export default Header;