import React, { Component } from 'react';


class TodoHeader extends Component {
  render() {
    return (
      <div className="TodoHeader">
          
       <h3>To-Do List</h3>
       <div id="divDelete" className="hideDelete">
       <a href="javascript:;" onClick={this.props.clear}>
       <img  width="20px" height="20px"   src="http://localhost:9999/images/deletewhite.png"></img></a>
      </div></div>
    );
  }
}

export default TodoHeader;
