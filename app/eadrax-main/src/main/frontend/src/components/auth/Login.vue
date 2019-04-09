<template>
  <div class="w3-content" style="max-width:500px">
    <div class="w3-card-4" style="margin-top:70px">
      <header>
        <div class="w3-theme" style="padding:8px">
          <i class="fas fa-globe" style="font-size:24px"></i>
        </div>
      </header>
      <div class="w3-container" style="margin-top:25px">
        <div class="w3-row">
          <div class="w3-quarter">
            <label for="email">{{ texts.lblEMail }}:</label>
          </div>
          <div class="w3-rest">
            <input id="email" name="email" v-model="email" style="margin-bottom:10px;width:100%" autofocus>
          </div>
        </div>
        <div class="w3-row">
          <div class="w3-quarter">
            <label for="password">{{ texts.lblPassword }}:</label>
          </div>
          <div class="w3-rest">
            <input id="password" type="password" name="password" v-model="password" style="margin-bottom:10px;width:100%">
            <input type="hidden" name="_csrf" :value="csrf">
          </div>
        </div>
        <div class="w3-row" style="margin-top:15px;margin-bottom:25px">
          <div class="w3-col s3">&nbsp;</div>
          <div class="w3-col s5" style="padding-top:7px">
            <a href="forgot">{{ texts.lblPasswordForgotten }}</a>
          </div>
          <div class="w3-col s4" style="text-align:right">
            <button type="submit" id="btLogin" v-on:click="login" class="w3-btn w3-theme-d4">
              <span class="glyphicons glyphicons-log-in"></span>{{ texts.btLogin }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import auth from "./Auth";
import textLoader from "../../i18n/StaticTextLoader";

export default {
  data() {
    return {
      texts: {},
      email: "",
      password: "",
      csrf: ""
    };
  },
  mixins: [auth, textLoader],
  created() {
    const promiseGetText = this.getText(["login"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];

      // must be here, otherwise the text it not present as fast as the error is displayed.
      if (this.$route.query.error) {
        this.$toasted.error(this.texts.msgAuthError);
      }
    });
    this.csrf = this.$cookies.get("XSRF-TOKEN");
  },
  methods: {
    login() {
      // remove headers from interceptors
      this.unsetAxiosInterceptor();
      let urlParams = new URLSearchParams();
      urlParams.append("grant_type", "password");
      urlParams.append("username", this.email);
      urlParams.append("password", this.password);
      urlParams.append("scope", "read");
      let options = {
        url: window.location.origin + process.env.BASE_URL + "oauth/token",
        method: "post",
        params: urlParams,
        auth: {
          username: "theid",
          password: "test"
        }
      };
      axios(options).then(
        response => {
          // transform array to string for saving it
          let rolesString = "";
          if (response.data["authorities"]) {
            for (let i = 0; i < response.data["authorities"].length; i++) {
              rolesString += response.data["authorities"][i] + ",";
            }
            if (rolesString) {
              rolesString = rolesString.substr(0, rolesString.length - 1);
            }
          }
          this.saveAccessToken(response.data["access_token"], rolesString);
          this.$store.state.role = response.data["authorities"][0];
          this.setEmail(this.email);
          this.$router.replace(this.$route.query.redirect || "/");
        },
        err => {
          this.$toasted.error(err);
        }
      );
    }
  }
};
</script>
