import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddUser from './component/addUser';
import GetUser from './component/getUser';
import Navbar from './component/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/users" element={<GetUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
