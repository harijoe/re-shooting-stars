import React from 'react';
import AddRepo from './AddRepo/AddRepo'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.githubClient = axios.create({
      baseURL: 'https://api.github.com/',
      timeout: 1000,
      headers: {'Authorization': 'token b559dcd69ee7ac9553830372583b99313eb90184'}
    });
    this.apiClient = axios.create({
      baseURL: 'http://vallini.io:8080/',
      timeout: 1000
    });
  }
  render() {
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
          </div>
        </nav>
        <div className="container">
          <div className="col-sm-4">
            <AddRepo githubClient={this.githubClient} apiClient={this.apiClient} />
          </div>
          <div className="col-sm-8">
            <h3>Graph</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Main