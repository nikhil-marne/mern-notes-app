import { Link } from "react-router"
import {PlusIcon} from 'lucide-react'


function Navbar() {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="items-center justify-between flex">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
                Thinkboard
            </h1>
            <div className="flex items-center gap-4">
                <Link className="btn btn-primary" to={"/create"}><PlusIcon className="size-5"/><span>New Note</span></Link>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
