import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ChatState from './AppContext/Chat/ChatState';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChatState>
      <App />
    </ChatState>
  </React.StrictMode>
);
