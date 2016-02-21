import React from 'react';
import axios from 'axios';
import Rebase from 're-base';
var _ = require('lodash');

class AppRepo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      message: '',
      messageType: '',
      repos: []
    };
  }

  onChange(e) {
    this.setState({value: e.target.value.toLowerCase()})
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.githubClient.get('/repos/' + this.state.value)
      .then(({data, status}) => {
        this.sendMessage('Repo exists, pushing data...', 'warning');
        this.addRepo();
      })
      .catch(({statusText}) => {
        this.sendMessage(statusText, 'danger');
      })
  }

  addRepo() {
    this.props.apiClient.post('/watched_repositories', {
      name: this.state.value
    }).then(() => {
      this.sendMessage('Data pushed successfully', 'success');
    }).catch(() => {
      this.sendMessage('Something went wrong, maybe the repo has already been added', 'danger');
    })
  }

  sendMessage(message, messageType) {
    this.setState({message, messageType});
  }

  render() {
    return <div>
      <h3>Add a repo</h3>
      {this.state.message != '' &&
      <div className={"alert alert-"+this.state.messageType} role="alert">{this.state.message}</div>}
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="input-group">
          <input className="form-control" onChange={this.onChange.bind(this)}/>
          <div className="input-group-btn">
            <button className="btn btn-default" type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  }
}

export default AppRepo