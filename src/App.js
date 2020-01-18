import React from "react";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Detail from "./Detail";
import Search from "./SearchParams";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleBreedChange,
      getBreeds: this.getBreeds
    };
  }
  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value
      },
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        console.log("data", data);
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({
            breeds: []
          });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }
  render() {
    return (
      <div>
        <header>
          <Link to={"/"}>Sample One</Link>
          <Link to="/search">
            <span aria-label="search" role="img">
              🔍
            </span>
          </Link>
        </header>
        {/* <pre>
  <code>{JSON.stringify(this.state, null, 2)}</code>
         </pre> */}
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Detail path="/details/:id" />
            <Search path="/search" />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
