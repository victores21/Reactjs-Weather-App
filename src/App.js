import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import './App.css';
import WeatherCard from "./pages/WeatherCard/WeatherCard";
import WeatherPage from "./pages/WeatherPage/WeatherPage"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={WeatherCard} />
          <Route exact path="/we" component={WeatherPage} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
