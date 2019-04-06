const loggedIn = token => {
  if (token) {
    return true;
  } else {
    return false;
  }
};

export default { loggedIn };
