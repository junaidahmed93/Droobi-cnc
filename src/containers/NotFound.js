import React, { Component } from 'react';

class NotFoundContainer extends Component {
  render() {
    return (
      <div>
        <div style={{
 height: '50px', width: '300px', margin: '10vh auto', color: '#0D5BD5',
}}
        >
          <h1>Ops! Page not found</h1>
        </div>
        {/* <div className="not-found-container" /> */}
      </div>

    );
  }
}


export default NotFoundContainer;
