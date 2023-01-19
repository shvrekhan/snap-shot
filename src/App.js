import React from "react";
import Header from "./components/header";
import SearchBar from "./components/searchBar"


class App extends React.Component {
  render() {
    return (
      < div >
        <Header />
        <SearchBar />
      </div >

    )
  }
}


export default App;