const getStoredUser = () => {
  const jsonUser = window.localStorage.getItem('user');
  const user = JSON.parse(jsonUser);
  return user;
}

const setStoredUser = (user) => {
  const jsonUser = JSON.stringify(user);
  window.localStorage.setItem('user', jsonUser);
}

const removeStoredUser = () => {
  window.localStorage.removeItem('user');
}

export { getStoredUser, setStoredUser, removeStoredUser };