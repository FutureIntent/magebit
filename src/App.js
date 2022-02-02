import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Subscription from './pages/subscription.js';
import Subscribed from './pages/subscribed.js';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Subscription />} />
                <Route exact path="/subscribed" element={<Subscribed />} />
            </Routes>
        </Router>
  );
}

export default App;
