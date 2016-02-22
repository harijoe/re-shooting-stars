import React from 'react'
import axios from 'axios'
import {parameters} from '../utils/parameters'

import AddRepo from './AddRepo/AddRepo'
import Graph from './Graph/Graph'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.githubClient = axios.create({
      baseURL: 'https://api.github.com/',
      timeout: 1000,
      headers: {'Authorization': 'token ' + parameters.githubApiToken}
    });
    this.apiClient = axios.create({
      baseURL: 'http://vallini.io:8080/',
      timeout: 1000
    });

    this.state = {
      reposList: []
    };

    this.init();
  }

  init() {
    this.apiClient.get('watched_repositories').then(({data}) => {
      var repos = data['hydra:member'].map((e) => {
        return e['name'];
      });
      this.setState({reposList: repos});
    })
  }

  render() {
    return (
      <div className="main-container">
        <nav className="navbar navbar-default text-center" role="navigation">
            <h2>Github Trends</h2>
        </nav>
        <div className="container">
          <div className="col-sm-4">
            <AddRepo githubClient={this.githubClient} apiClient={this.apiClient}/>
            <h3>Repos watched:</h3>
            <p>{this.state.reposList.length} repos watched</p>
            <ul>
              {this.state.reposList.map((e) => {
                return <li key={e}>{e}</li>
              })}
            </ul>
          </div>
          <div className="col-sm-8">
            <Graph repos={this.state.reposList} apiClient={this.apiClient}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Main