const retrieveJwt = () => {
  const jwt = window.localStorage.getItem('jwt')
  if (jwt) {
    return jwt;
  } else {
    return null;
  }
  
}

export default retrieveJwt;