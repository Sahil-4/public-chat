import './App.css';
import Login from './Components/Login';
import Chats from './Components/Chats';
import NotFound from './Components/NotFound';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import ChatContext from './AppContext/Chat/ChatContext';
import Test from './Components/Test';

function App() {
  const { status } = useContext(ChatContext);
  return (
    <>
      <div className={`loader-container-${status} H100 W100`}>
        <div className={`loader-${status}`} ></div>
      </div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/chat' element={<Chats />} />
          <Route exact path='/test' element={<Test />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );

}

export default App;
