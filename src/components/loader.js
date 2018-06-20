import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/loaderActions';

const style = {
  container: {

    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 4000,
    cursor: 'pointer',

  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    marginLeft: '50%',
    marginTop: '25%',
  },
};

class LoaderIndicator extends Component {
  componentDidMount() {
    console.log('this.props', this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }
  render() {
    // if (this.props.isLoading > 0) {
    //   setTimeout(() => {
    //     this.props.actions.loaderStop();
    //   }, 15000);
    // }
    return (this.props.isLoading > 0 ?
      <div style={style.container}>
        <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status="loading"
          style={style.refresh}
        />
      </div> : null);
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    isLoading: state.loaderReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderIndicator);
