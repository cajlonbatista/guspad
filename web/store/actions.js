module.exports = {
  toggleRefresh(refresh) {
    return {
      type: 'SET_REFRESH',
      refresh,
    };
  }
}
