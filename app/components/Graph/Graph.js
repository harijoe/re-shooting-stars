import React from 'react'
var LineChart = require("react-chartjs").Line;

var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
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


class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRepos: ['harijoe/cheerup']
    };
    this.fetchRepoData('harijoe/cheerup');
  }

  fetchRepoData(repo) {
    this.props.apiClient.get('github_stars_measures?repository='+repo)
    .then(({data}) => {
      console.log(data['hydra:member']);
    })
  }

  render() {
    return <div>
      <h3>Graph</h3>
      <LineChart data={data} width="600" height="250" />
    </div>
  }
}

export default Graph