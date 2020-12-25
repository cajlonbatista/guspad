module.exports = {
  toggleRefresh(refresh) {
    return {
      type: 'SET_REFRESH',
      refresh,
    };
  },
  toggleAuth(auth) { 
    return {
      type: 'SET_AUTH',
      auth
    }
  }
}
