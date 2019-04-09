<script>
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    accessToken: "",
    authorities: [],
    email: "",
    role: ""
  },
  getters: {
    accessToken: state => state.accessToken,
    authorities: state => state.authorities,
    role: state => state.role,
    email: state => state.email
  },
  mutations: {
    setAccessToken(state, newAccessToken) {
      state.accessToken = newAccessToken;
    },
    setRole(state, role) {
      state.role = role;
    },
    /* eslint no-param-reassign: "off" */
    setAuthorities(state, newAuthorities) {
      state.authorities = newAuthorities;
    },
    setEmail(state, newEmail) {
      state.email = newEmail;
    }
  }
});

export default store;
</script>
