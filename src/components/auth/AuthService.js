import CookieService from "./CookieService";

class AuthService {
  constructor() {
    const token = CookieService.get("access_token");
    //   console.log(token);
    token ? (this.authenticated = true) : (this.authenticated = false);
    // this.authenticated = true;
  }

  logout(cb) {
    CookieService.remove("access_token");
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getAccessToken() {
    return CookieService("access_token");
  }
}

export default new AuthService();
