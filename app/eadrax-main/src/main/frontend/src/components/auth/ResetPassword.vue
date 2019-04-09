<template>
  <div>
    <!-- Token valid -->
    <div class="w3-content" style="max-width:500px;margin-top:70px" v-if="tokenValid">
      <div class="w3-card-4" v-if="!emailSend">
        <header>
          <div class="w3-theme" style="padding:8px">
            <i class="fas fa-globe" style="font-size:24px"></i>
          </div>
        </header>
        <p class="w3-container" style="margin-top:25px">
          <span>{{ texts.lblWelcomeAfterRegister }}</span>
        </p>
        <div class="w3-container" style="margin-top:25px">
          <div class="w3-row">
            <div class="w3-third">
              <label for="password">{{ texts.lblPassword }}:</label>
            </div>
            <div class="w3-rest">
              <input id="password" type="password" v-model="password" style="margin-bottom:10px;width:100%" autofocus>
            </div>
          </div>
          <div class="w3-row">
            <div class="w3-third">
              <label for="confirmation">{{ texts.lblPasswordConfirm }}:</label>
            </div>
            <div class="w3-rest">
              <input id="confirmation" type="password" v-model="passwordConfirmation" style="margin-bottom:10px;width:100%">
            </div>
          </div>
        </div>
        <footer class="w3-container" style="margin-top:25px">
          <div style="text-align:center">
            <button v-on:click="resetPassword" class="w3-btn w3-theme-d4" style="margin-bottom:15px">
              <span class="glyphicons glyphicons-log-in"></span>{{ texts.btResetUser }}
            </button>
          </div>
        </footer>
      </div>
      <div class="w3-card-4" v-if="emailSend">
        <header>
          <div class="w3-theme" style="padding:8px">
            <i class="fas fa-globe" style="font-size:24px"></i>
          </div>
        </header>
        <div class="w3-container" style="margin-top:25px">
          <label>{{ texts.msgPasswordChanged }}</label>
        </div>
        <footer class="w3-container" style="margin-top:25px"></footer>
      </div>
    </div>
    <!-- Token invalid -->
    <div class="w3-content" style="max-width:500px;margin-top:70px" v-if="!tokenValid">
      <div class="w3-card-4">
        <header>
          <div class="w3-theme" style="padding:8px">
            <i class="fas fa-globe" style="font-size:24px"></i>
          </div>
        </header>
        <div class="w3-container" style="margin-top:25px">
          <label>{{ texts.lblInvalidToken }}</label>
        </div>
        <footer class="w3-container" style="margin-top:30px"></footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import auth from "./Auth";
import textLoader from "../../i18n/StaticTextLoader";
import dateformatter from "../../i18n/Dateformatter";

export default {
  data() {
    return {
      apiUrl: process.env.BASE_URL + "api/users",
      texts: {},
      tokenValid: false,
      password: "",
      passwordConfirmation: "",
      emailSend: false
    };
  },
  mixins: [auth, textLoader, dateformatter],
  created() {
    const promiseGetText = this.getText(["resetPassword"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];
    });

    this.checkToken();
  },
  methods: {
    checkToken() {
      axios.get(this.apiUrl + "/isValid?token=" + this.$route.query.token).then(
        response => {
          if (response.data === true) {
            this.tokenValid = true;
          } else {
            this.tokenValid = false;
          }
        },
        err => {
          this.tokenValid = false;
          this.$toasted.error(err);
        }
      );
    },
    resetPassword() {
      if (this.password === this.passwordConfirmation) {
        let passwordReset = {
          token: this.$route.query.token,
          password: this.password
        };
        axios.put(this.apiUrl + "/resetPassword", passwordReset).then(
          () => {
            this.emailSend = true;
          },
          err => {
            this.$toasted.error(err);
          }
        );
        this.password = "";
        this.passwordConfirmation = "";
      } else {
        this.$toasted.error(this.texts.msgPasswordsDifferent);
        this.password = "";
        this.passwordConfirmation = "";
      }
    }
  }
};
</script>
