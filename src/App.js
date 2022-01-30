import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import { ThemeContext, themes } from "./context";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state,
      }));
    };

    this.state = {
      theme: themes,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <div className="App">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
            </Routes>
          </header>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
