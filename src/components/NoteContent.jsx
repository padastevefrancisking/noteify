import "./Component.css";

function NoteContent({ note, onClose }) {
    const weather_date = {
        day: new Intl.DateTimeFormat(navigator.language, {
            month: "long",
            day: "2-digit",
            year: "numeric"
        }).format(new Date(note.created_at)),
        time: new Intl.DateTimeFormat(navigator.language, {
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(note.created_at)),
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 pt-4 pb-8 shadow-lg rounded-lg border border-gray-300 w-[300px] flex flex-col">
                <div className="flex flex-col">
                    <button 
                        className="self-end text-gray-500 hover:text-gray-700" 
                        onClick={onClose}
                    >
                        ✖
                    </button>
                </div>
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col">
                        <h1 className="text-[#05668D] text-xs text-left font-semibold">Note Title</h1>
                        <div className="flex items-center pl-3 gap-x-1">
                            <h2 className="text-gray-600 font-bold text-md">{note.title}</h2>
                            <p className="text-sm text-gray-600">by {note.author}</p>
                        </div>
                        {note.tags && <p className="text-gray-600 text-left text-sm pl-3 italic">#{note.tags}</p>}
                    </div>
                    <div>
                        <h1 className="text-[#05668D] text-xs text-left font-semibold">Note Created</h1>
                        <h2 className="text-gray-600 text-left text-sm pl-3 ">{weather_date.day}</h2>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <h1 className="text-[#05668D] text- text-left font-semibold border-b-2 pb-1">Note Description</h1>
                        <div className="flex items-center p-2 py-0.5 gap-x-1  rounded-sm ">
                            <p className="text-sm text-gray-700 text-left">{note.message}</p>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default NoteContent;