import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const contentful = require("contentful");
class App extends Component {
  constructor () {
    super()
    this.state = {
      landingPageSectionOneTitle: "",
      landingPageSectionOneHeroImage: ""
    }
  }

  componentDidMount() {
    const client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: "1ujsawf6071m",
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: "d4aa555b6615534b0f9941aafa04c0f96e06cc98615f05d8e1b5260c51919c40"
    });
    // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
    client
      .getEntry("5JYEr8oVAIYyLpGrUFjxmp")
      .then(
        response => this.setState({
          landingPageSectionOneTitle: response.fields.landingPageSectionOneTitle,
          landingPageSectionOneHeroImage: response.fields.landingPageSectionOneHeroImage.fields.file.url
        })
      )
      .catch(err => console.log(err));
  }

  constructImageURL() {
    var imageURL = 'https:' + this.state.landingPageSectionOneHeroImage;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.landingPageSectionOneHeroImage} alt="Photo" />
          <h1>
            {this.state.landingPageSectionOneTitle}
          </h1>
        </header>
      </div>
    );
  }
}

export default App;
