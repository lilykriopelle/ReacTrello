var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var BoardsIndex = require('./components/boards_index.jsx');
var BoardShow = require('./components/board_show.jsx');

var Header = React.createClass({
  render: function () {
    return <header className="group"><a href="/#">Mello</a></header>;
  }
});

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Header/>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={BoardsIndex}/>
    <Route path="boards/:id" component={BoardShow}/>
  </Route>
);


$(function() {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
});
