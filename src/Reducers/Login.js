const Login = (state = { authenticated: false, token: "", keycloak: null }, action) => {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        authenticated: action.data.authenticated,
        token: action.data.token,
        keycloak: action.data
      });
    case "LOGOUT":
      return  Object.assign({}, state, {
        authenticated: false,
        token: action.data,
        keycloak: action.data
      });
    default:
      return state;
  }
};

export default Login;
