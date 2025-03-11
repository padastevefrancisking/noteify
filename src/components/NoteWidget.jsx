import "./Component.css";

function NoteWidget({ note, onView}) {
    return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex flex-col items-start gap-x-2">
                <h3 className="text-[#05668D] font-semibold">{note.title}</h3>
                <p className="text-sm text-left  text-gray-600">by {note.author}</p>
                {note.tags && <p className="text-xs text-gray-500 italic">#{note.tags}</p>}
            </div>

            <div className="flex gap-x-2">
                <button 
                    className="bg-[#427AA1] text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
                    onClick={() => onView(note)}
                >
                    View
                </button>
            </div>
        </div>
    );
}

export default NoteWidget;
