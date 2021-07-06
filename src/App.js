import './App.css';
import Search from './components/search'
import Results from './components/results'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.url = 'https://pixel-helper-api.herokuapp.com/api'
    this.fetchPictures = this.fetchPictures.bind(this)
    this.search = this.search.bind(this)
    this.updateTerm = this.updateTerm.bind(this)
    
    this.state = {
      'pictures': []
    }
  }
  
  componentDidMount() {
    this.fetchPictures(this.url)
  }

  fetchPictures(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((newPictures) => {
        this.setState({'pictures': newPictures});
      })
      .catch((err) => {
        console.log(err);
      })
  }

  search() {
    this.fetchPictures(this.url + `?q=${this.state.term}`);
  }

  updateTerm(term) {
    this.setState({'term': term});
  }

  render() {
    return (
      <div className="App">
        <Search search={this.search} updateTerm={this.updateTerm} />
        <Results pictures={this.state.pictures} />
      </div>
    );
  }
}

export default App;
