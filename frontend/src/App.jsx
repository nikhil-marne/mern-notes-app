import {Route, Routes} from 'react-router';
import Homepage from './pages/Homepage.jsx';
import CreateNote from './pages/createNote.jsx';
import NoteDetails from './pages/NoteDetails.jsx';
import toast from 'react-hot-toast';

function App() {
  return(<div className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]'></div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/create' element={<CreateNote />} />
        <Route path='/note/:id' element={<NoteDetails />} />
      </Routes>
  </div>)
}

export default App;