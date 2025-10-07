
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../lib/axios";


const createNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()) {
      toast.error("All field are Required !")
      return;
    } else {
      setLoading(true);
      try{
        await axiosInstance.post("/notes", {
          title: title,
          content, content
        })
        toast.success("Note created successfully !")
        navigate("/")
      } catch(error) {
          toast.error("There was issue creating note !")
          console.log("Error", error)
      } finally {
        setLoading(false);
      }
    }
  }


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"/>
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>

                  <input type="text" placeholder="Note Title" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>

                  <textarea type="text" placeholder="Write your note here..." className="textarea textarea-bordered h-32 w-full" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default createNote
