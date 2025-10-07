import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils"
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";


function NoteCard({note, setNotes}) {
  const handleDelete = async(e, noteId) => {
    e.preventDefault(); // getting rid of navigation behaviour

    if(!window.confirm("Are you sure you want to delete this note !")) return;

    try{
      await axiosInstance.delete(`/notes/${noteId}`);
      setNotes(n => n.filter(note => note._id !== noteId));
      toast.success("Note deleted successfully !")
      
    } catch(error) {
      toast.error("Failed to delete note. Please Try again later !")
    }
  }
  return (
    <div>
      <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff88]">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    { formatDate(note.createdAt) }
                </span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4" />
                    <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default NoteCard
