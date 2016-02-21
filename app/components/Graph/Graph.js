import React from 'react'
import _ from 'lodash'

var LineChart = require("react-chartjs").Line;

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRepos: ['harijoe/cheerup', 'harijoe/weatherStation'],
      data: {
        labels: _.rangeRight(-30),
        datasets: null
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
    _(this.state.selectedRepos).forEach(function (repo) {
      that.fetchRepoData(repo, newData);
    });
  }

  setDataset(dataset, newData) {
    newData.datasets = newData.datasets.concat(dataset);
    this.setState({data: newData});
  }

  fetchRepoData(repo, newData) {
    this.props.apiClient.get('github_stars_measures?repository=' + repo)
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

  render() {
    return <div>
      <h3>Graph</h3>
      {this.state.data.datasets && <LineChart data={this.state.data} width="600" height="250" redraw/>}
    </div>
  }
}

export default Graph