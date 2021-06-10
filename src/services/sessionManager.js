const config = {
  sessionTokenKey: btoa("adielson_auth_token"),
  sessionUserKey: btoa("adielson_session_user"),
};

class SessionManager {
  constructor() {
    this._authToken = sessionStorage.getItem(config.sessionTokenKey);
    this._currentUser = sessionStorage.getItem(config.sessionUserKey);
  }

  getAuthToken() {
    return this._authToken;
  }

  setAuthToken(token) {
    if (this.getAuthToken()) {
      sessionStorage.removeItem(config.sessionTokenKey);
    }

    sessionStorage.setItem(config.sessionTokenKey, token);
    this._authToken = token;
  }

  getCurrentUser() {
    if (this._currentUser) {
      return JSON.parse(atob(this._currentUser));
    }

    return null;
  }

  setCurrentUser(user) {
    if (this.getCurrentUser()) {
      sessionStorage.removeItem(config.sessionUserKey);
    }

    const encodedUser = btoa(JSON.stringify(user));

    sessionStorage.setItem(config.sessionUserKey, encodedUser);
    this._currentUser = encodedUser;
  }
}

const _sessionManager = new SessionManager();

export default _sessionManager;
