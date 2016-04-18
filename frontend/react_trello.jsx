var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var BoardsIndex = require('./components/boards_index.jsx');
var BoardShow = require('./components/board_show.jsx');
var BoardsDropdown = require('./components/boards_dropdown.jsx');
var UserDropdown = require('./components/user_dropdown.jsx');
var Profile = require('./components/profile.jsx');
var UIActions = require('./actions/ui_actions.js');


var _collapseDropdowns = function () {
  UIActions.collapseAllDropdowns();
};

var Header = React.createClass({
  render: function () {
    return (
      <header className="app-header group">
        <BoardsDropdown/>
        <a className="logo" href="/">Mello</a>
        <UserDropdown/>
      </header>
    );
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
    <IndexRoute component={BoardsIndex} onEnter={_collapseDropdowns}/>
    <Route path="boards/:id" component={BoardShow} onEnter={_collapseDropdowns}/>
    <Route path="profile" component={Profile} onEnter={_collapseDropdowns}/>
  </Route>
);

$(function() {
  ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('content'));

  // NOTE – this is a workaround for a react-modal bug.  Without it, the modal
  // doesn't collapse when the overlay is clicked.
  $("#modal").click(function(e) {
    if (!e.target.className.startsWith('ReactModal__Overlay')) {
      return;
    }
    UIActions.toggleCardModal();
  });
});
