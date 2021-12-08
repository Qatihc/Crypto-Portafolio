const storeJwt = (jwt) => {
  window.localStorage.setItem('jwt', jwt)
}

export default storeJwt;