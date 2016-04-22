var React = require('react');

var Comment = React.createClass({
  render: function () {
    return (
      <div className="comment group">
        <div className="thumb">
          <img src={this.props.comment.author.avatar_url}/>
        </div>
        <div className="right">
          <div className="author">{this.props.comment.author.email}</div>
          <p className="comment-body">
            {this.props.comment.body}
          </p>
        </div>
      </div>
    );
  }
});

module.exports = Comment;
