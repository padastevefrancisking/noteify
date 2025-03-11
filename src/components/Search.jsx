import "./Component.css";
import SearchIcon from "./../assets/search.png";

function Search({ setQuery, fetchNotes }) {
    return (
        <div className="w-auto flex items-center gap-2">
            <input 
                className="min-w-[120px] w-50vh sm:w-[300px] h-8 bg-[#EBF2FA] border-2 border-[#427AA1] text-[#05668D] placeholder-gray-600 text-sm 
                rounded-md px-2 flex-1 focus:outline-none "
                placeholder="Search Title..." 
                onKeyDown={(e)=> {
                    if(e.key === "Enter") {
                        fetchNotes();
                    }
                }}
                onChange={(e) => {
                    setQuery(e.target.value);
                    console.log(e.target.value);}
                }
            />

            <button
                className="w-8 h-8 flex items-center justify-center border-2 border-[#427AA1] rounded-md shadow-md
                hover:bg-[#427AA1] transition duration-300"
                onClick={() => fetchNotes()}
            >
                <img src={SearchIcon} alt="Search Icon" className="w-4 h-4 object-contain" />
            </button>
        </div>
    );
}

export default Search;
