import React, { useEffect } from 'react';

import { connect } from 'react-redux';

const Feed = ({ refresh, dispatch }) => {
  useEffect(() => {

  }, []);
  return <h1>{refresh}</h1>
};

export default connect(state => ({ refresh: state.refresh }))(Feed);