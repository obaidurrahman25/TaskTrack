import React, {useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import ToDoList from "./components/ToDoList/ToDoList";

function App() {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="App-container">
      <Router>
        <div className="App">
          {!isOnline && <div className="offline">You are offline. Please check your internet connectivity.</div>}
          <Header />
          <div className="page">
            <Routes>
              <Route path="/" element={<Navigate to="/to-do-list" />} />
              <Route path="/to-do-list" element={<ToDoList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
