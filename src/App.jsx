import "./components/Component.css"
import "./App.css"
import React, { useState, useEffect } from "react"

import Header from "./components/Header.jsx"
import Notes from "./components/Notes.jsx";
import Footer from "./components/Footer.jsx";
import supabase from "./supabase-client.js";

function App() {
  const [query, setQuery] = useState("");
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("Note")
      .select("*")
      .ilike("title", `%${query}%`)
      .eq("is_archived", false);
    if(error) {
      console.log("Error fetching data: ", error);
    } else {
      setNoteList(data);
    }
  }

  return(
    <>
      <div className="w-full h-full flex flex-col">
        <Header setQuery={setQuery} fetchNotes={fetchNotes}/>

        <main className="w-full min-h-screen py-6">
          <div className="w-full h-auto flex justify-center items-center">
            <Notes noteList={noteList}/>
          </div>
        </main>

        <Footer/>
      </div>
    </>
  )
}

export default App
