import React from 'react';
var ReactTags = require('react-tag-input').WithContext;

class RepoSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete(i) {
    var tags = this.props.selectedRepos;
    tags.splice(i, 1);
    //this.setState({tags: tags});
    this.props.updateRepos(tags);
  }

  handleAddition(tag) {
    var tags = this.props.selectedRepos;
    if (!_.some(this.props.repos, tag['text'])) {
      return;
    }
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.props.updateRepos(tags);
  }

  handleDrag(tag, currPos, newPos) {
    var tags = this.props.selectedRepos;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.props.updateRepos(tags);
  }

  render() {
    return (
      <div>
        <ReactTags tags={this.props.selectedRepos}
                   suggestions={this.props.repos}
                   handleDelete={this.handleDelete.bind(this)}
                   handleAddition={this.handleAddition.bind(this)}
                   handleDrag={this.handleDrag.bind(this)}
        />
      </div>
    )
  }
}

export default RepoSelector;