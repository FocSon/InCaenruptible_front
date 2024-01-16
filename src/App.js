import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './component/Home';
import Posts from './component/Posts';
import Events from './component/Events';
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index path="*" element={<Home/>} />
            <Route path="/posts" element={<Posts/>} />
            <Route path="/events" element={<Events/>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
