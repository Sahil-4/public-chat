import './App.css';
import Login from './Components/Login';
import Chats from './Components/Chats';
import NotFound from './Components/NotFound';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatState from './AppContext/Chat/ChatState';

function App() {
  return (
    <ChatState>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/chat' element={<Chats />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </ChatState>
  );
}

export default App;
