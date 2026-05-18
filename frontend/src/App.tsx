import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import NoteDetails from "./pages/NoteDetails";
import { Home, Notebook, Plus } from "lucide-react";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost">
            <Home /> <p className="pl-1">Home</p>
          </a>
        </div>
        <div className="navbar-center">
          <Notebook /> <p className="pl-2">Note Maker</p>
        </div>
        <div className="navbar-end">
          <a href="/create" className="btn btn-ghost">
            <Plus /> <p className="pl-1">Create</p>
          </a>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  )
}

export default App