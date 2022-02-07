import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Subscription from './pages/subscription.js';
import Subscribed from './pages/subscribed.js';
import { URLContextProvider } from './context/back_end_url.js';

function App() {
    return (
        <URLContextProvider>
        <Router>
            <Routes>
                    <Route exact path="/" element={<Subscription />} />
                    <Route exact path="/subscribed" element={<Subscribed />} />  
            </Routes>
        </Router>
        </URLContextProvider>
  );
}

export default App;
