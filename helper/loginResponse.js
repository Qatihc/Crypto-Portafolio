const loginResponse = (user, token) => {
  return {
    user: {
      username: user.username
    },
    token,
  }
}

module.exports = loginResponse;