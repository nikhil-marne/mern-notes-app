import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import axiosInstance from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const Homepage = () => {
  const [isRatelimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const fetchResult = await axiosInstance.get("/notes");

        setNotes(fetchResult.data);
        setIsRateLimited(false);

      } catch(error) {
        if(error.response?.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Error Loading Notes !");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [])


  return (
    <div className="min-h-screen">
      <Navbar />
      {isRatelimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        <div className="max-w-7xl mx-auto p-4 mt-6">
        {notes.length < 1 && !isRatelimited && <NotesNotFound />}</div>

        {notes.length > 0 && !isRatelimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => {
            return (<NoteCard key={note._id} note={note} setNotes={setNotes} />)
          })}
        </div>)}
      </div>
    </div>
  )
}

export default Homepage
