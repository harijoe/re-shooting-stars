import React from 'react'
import _ from 'lodash'

import RepoSelector from './RepoSelector';

import { Line as LineChart } from 'react-chartjs';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRepos: [],
      selectedReposNormalized: [],
      data: {
        labels: _.rangeRight(-30),
        datasets: null,
        loaded: false
      }
    }
  }

  componentWillMount() {
    this.refreshData();
  }

  refreshData() {
    var newData = this.state.data;
    newData.datasets = [];
    var that = this;
    if (0 === this.state.selectedReposNormalized.length) {
      this.setState({loaded: false});

      return;
    }
    this.setState({loaded: false}, () => {
      // Display some kind of graph loader here
      var promises = [];
      _(this.state.selectedReposNormalized).forEach(function (repo) {
        promises.push(that.fetchRepoData(repo, newData));
      });
      Promise.all(promises).then(() => {
        this.setState({loaded: true});
      })
    });

  }

  setDataset(dataset, newData) {
    newData.datasets = newData.datasets.concat(dataset);
    this.setState({data: newData, loaded: true});
  }

  fetchRepoData(repo, newData) {
    return this.props.apiClient.get('github_stars_measures?repository=' + repo)
      .then(({data}) => {
        var datapoints = data['hydra:member'];
        datapoints = datapoints.map((e) => {
          return parseInt(e['stars']);
        });
        datapoints = _.rangeRight(0, 30 - datapoints.length, 0).concat(_(datapoints).reverse().value());
        var dataset = {
          label: repo,
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: datapoints
        };
        this.setDataset(dataset, newData);
      })
  }

  updateRepos(repos) {
    var selectedReposNormalized = repos.map((e) => {
      return e['text'];
    });
    this.setState({selectedRepos: repos, selectedReposNormalized}, () => {
      this.refreshData();
    });
  }

  render() {
    return <div>
      <h3>Graph</h3>
      <RepoSelector repos={this.props.repos} updateRepos={this.updateRepos.bind(this)}
                    selectedRepos={this.state.selectedRepos}/>
      {this.state.loaded && this.state.data.datasets.length >= 1 && <LineChart data={this.state.data} width="600" height="250" redraw/>}
    </div>
  }
}

export default Graph