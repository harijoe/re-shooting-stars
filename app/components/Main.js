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
      })
      this.setState({reposList: repos});
    })
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
            <AddRepo githubClient={this.githubClient} apiClient={this.apiClient}/>
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