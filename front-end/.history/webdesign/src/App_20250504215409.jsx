import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import Router and Route from react-router-dom
import Navbar from './components/Navbar';
import Home from './components/Home';
import Developers from './components/Developers';
import Mission from './components/Mission1';
import Footer from './components/Footer1';

function App() {
  return (
    <Router> {/* Wrap your entire app with Router */}
      <Navbar />
      <Switch> {/* Use Switch to render only the first matching route */}
        <Route path="/home" component={Home} />
        <Route path="/about" component={Developers} />
        <Route path="/mission" component={Mission} />
        <Route path="/contact" component={Footer} />
        <Route path="/" exact component={Home} /> {/* Default route */}
      </Switch>
      <Home />
      <Developers />
      <Mission />
      <Footer />
    </Router>
  );
}

export default App;
