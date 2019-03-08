import React, { Component } from 'react';
import logo from './site-logo.png';
import './App.css';
const contentful = require("contentful");
class App extends Component {
  constructor () {
    super()
    this.state = {
      landingPageSectionOneHeroImage: "",
      landingPageSectionOneTitle: "",
      landingSectionOneBody: "",
      landingSectionOneSubtitle: "",
      landingSectionTwoBody: "",
      landingSectionTwoSubtitle: "",
      landingSectionTwoTitle: "",
      igPosts: [],
      footerPromotion: false
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
          landingPageSectionOneHeroImage: response.fields.landingPageSectionOneHeroImage.fields.file.url,
          landingPageSectionOneTitle: response.fields.landingPageSectionOneTitle,
          landingSectionOneBody: response.fields.landingSectionOneBody,
          landingSectionOneSubtitle: response.fields.landingSectionOneSubtitle,
          landingSectionTwoBody: response.fields.landingSectionTwoBody,
          landingSectionTwoSubtitle: response.fields.landingSectionTwoSubtitle,
          landingSectionTwoTitle: response.fields.landingSectionTwoTitle,
          igPosts: response.fields.igPosts,
          footerPromotion: response.fields.footerPromotion
        })
      )
      .catch(err => console.log(err));
  }

  generateIGPosts() {
    const posts = this.state.igPosts.map((post, i) =>
      <img key={i} src={post.fields.file.url} alt="IG Post" className="landing-ig--image" />
    );
    return posts
  }

  render() {
    const { landingPageSectionOneHeroImage,
          landingPageSectionOneTitle,
          landingSectionOneBody,
          landingSectionOneSubtitle,
          landingSectionTwoBody,
          landingSectionTwoSubtitle,
          landingSectionTwoTitle,
          footerPromotion } = this.state;

    const posts = this.generateIGPosts();

    return (
      <div className="App">
        <header className="app--header">
          <img id="logo--image" src={logo} alt="Photo" />
        </header>
        <section id="landing--tap-into-outer">
          <div id="landing--tap-into-module">
            <div id="tap-into-module--image">
              <img src={landingPageSectionOneHeroImage} alt="Photo" />
            </div>
            <div id="tap-into-module--text">
              <h2>{landingPageSectionOneTitle}</h2>
              <h3>{landingSectionOneSubtitle}</h3>
              <p>{landingSectionOneBody}</p>
            </div>
          </div>

          <div id="landing--instagram-photos-outer">
            <div id="tap-instagram--text">
              <h2>{landingSectionTwoTitle}</h2>
              <h3>{landingSectionTwoSubtitle}</h3>
              <p>{landingSectionTwoBody}</p>
            </div>
            <div id="landing--instagram-photos">
              {posts}
            </div>
          </div>
          {footerPromotion &&
            <div id="promotion--box">
              <h2>Explore the Latest in Luxury Living</h2>
              <a href="mailto:" className="button">Contact a broker today</a>
            </div>
          }
        </section>
      </div>
    );
  }
}

export default App;
