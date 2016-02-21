import React from 'react'
import _ from 'lodash'

var LineChart = require("react-chartjs").Line;

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRepos: ['harijoe/cheerup'],
      data: this.initData()
    };
    this.fetchRepoData('harijoe/cheerup');
  }

  componentDidMount() {
    var newDatasets = this.state.data.datasets.concat([{
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#eee",
      pointHighlightFill: "#eee",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [10, 20, 30, 40, 50, 60, 70]
    }]);
    var newData = this.state.data;
    newData.datasets = newDatasets;
    this.setState({data: newData})
  }

  initData() {
    var labels = _.rangeRight(-30);
    return {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }

  setDataset(dataset) {
    var newDatasets = this.state.data.datasets.concat(dataset);
    var newData = this.state.data;
    newData.datasets = newDatasets;
    this.setState({data: newData})
  }

  fetchRepoData(repo) {
    this.props.apiClient.get('github_stars_measures?repository=' + repo)
      .then(({data}) => {
        var datapoints = data['hydra:member'];
        datapoints = datapoints.map((e) => {
          return parseInt(e['stars']);
        });
        console.log(datapoints);
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
        this.setDataset(dataset);
      })
  }

  render() {
    return <div>
      <h3>Graph</h3>
      <LineChart data={this.state.data} width="600" height="250" redraw/>
    </div>
  }
}

export default Graph