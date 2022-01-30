import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import { ItemContext, items } from "./context";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleItems = () => {
      this.setState((state) => ({
        items: state,
      }));
    };

    this.state = {
      items: items,
      toggleItems: this.toggleItems,
    };
  }

  render() {
    return (
      <ItemContext.Provider value={this.state}>
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
      </ItemContext.Provider>
    );
  }
}

export default App;
