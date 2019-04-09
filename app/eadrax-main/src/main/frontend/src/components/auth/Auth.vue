<script>
import axios from "axios";

export default {
  methods: {
    isAuthenticated() {
      if (process.env.auth) {
        return true;
      } else {
        if (this.$store.state.accessToken) {
          return true;
        } else {
          if (this.$cookies.get("BEARER")) {
            this.saveAccessToken(
              this.$cookies.get("BEARER"),
              this.$cookies.get("ROLES")
            );
            return true;
          }
        }
        return false;
      }
    },
    saveAccessToken(token, authorities) {
      // save in store for having computed properties working correctly
      this.$store.commit("setAccessToken", token);
      this.$store.commit("setAuthorities", authorities.split(","));
      this.$cookies.set("BEARER", token, -1, "/");
      this.$cookies.set("ROLES", authorities, -1, "/");
      // update axios interceptor
      this.setAxiosInterceptor(token);
    },
    setAxiosInterceptor(token) {
      // change http interceptor and insert access token and csrf for every request
      /* eslint no-param-reassign: "off" */
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      }
      axios.interceptors.request.use(
        config => {
          // TODO add to cookies before..
          if (this.$cookies.get("XSRF-TOKEN")) {
            config.headers["XSRF-TOKEN"] = this.$cookies.get("XSRF-TOKEN");
          }
          return config;
        },
        err => {
          this.$toasted.error(err);
          return Promise.reject(err);
        }
      );
    },
    setEmail(email) {
      this.$store.commit("setEmail", email);
      this.$cookies.set("EMAIL", email);
    },
    unsetAxiosInterceptor() {
      axios.interceptors.request.eject(0);
    },
    logout() {
      // clear token in BE
      axios.get(process.env.BASE_URL + "api/authorization/revoke_token");
      // clear token in FE
      this.$store.commit("setAccessToken", "");
      this.$store.commit("setAuthorities", []);
      this.$cookies.remove("XSRF-TOKEN", "/");
      this.$cookies.remove("BEARER", "/");
      this.$cookies.remove("ROLES", "/");
      this.$cookies.remove("JSESSIONID");
      this.$cookies.remove("EMAIL");
      this.$cookies.remove("JSESSIONID", "/");
      this.$cookies.remove("JSESSIONID", process.env.BASE_URL);
      // remove headers from interceptors
      this.unsetAxiosInterceptor();
    }
  }
};
</script>
