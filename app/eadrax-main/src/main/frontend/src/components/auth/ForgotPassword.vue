<template>
  <div>
    <div class="w3-content" style="max-width:500px;margin-top:70px" v-if="!emailSend">
      <div class="w3-card-4">
        <header>
          <div class="w3-theme" style="padding:8px">
            <i class="fas fa-globe" style="font-size:24px"></i>
          </div>
        </header>
        <p class="w3-container" style="margin-top:25px">
          <span>{{ texts.lblIntroduction }}</span>
        </p>
        <div class="w3-container" style="margin-top:25px">
          <div class="w3-row">
            <div class="w3-third">
              <label for="email">{{ texts.lblEMail }}:</label>
            </div>
            <div class="w3-rest">
              <input id="email" v-model="email" style="margin-bottom:10px;width:100%" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('lblEMail') }" name="lblEMail" type="text" autofocus>
              <span v-show="errors.has('lblEMail')" class="help is-danger">{{ errors.first('lblEMail') }}</span>
            </div>
          </div>
        </div>
        <footer class="w3-container" style="margin-top:25px">
          <div style="text-align:center">
            <button v-on:click="resetPassword" class="w3-btn w3-theme-d4" style="margin-bottom:15px">
              <span class="glyphicons glyphicons-log-in"></span>{{ texts.btResetPassword }}
            </button>
          </div>
        </footer>
      </div>
    </div>
    <div class="w3-content" style="max-width:500px;margin-top:70px" v-if="emailSend">
      <div class="w3-card-4">
        <header>
          <div class="w3-theme" style="padding:8px">
            <i class="fas fa-globe" style="font-size:24px"></i>
          </div>
        </header>
        <div class="w3-container" style="margin-top:25px">
          <label>{{ texts.lblOutro }}</label>
        </div>
        <footer class="w3-container" style="margin-top:25px"></footer>
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
      email: "",
      emailSend: false
    };
  },
  mixins: [auth, textLoader, dateformatter],
  created() {
    const promiseGetText = this.getText(["forgotPassword"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];
    });
  },
  methods: {
    resetPassword() {
      this.$validator.validateAll().then(result => {
        if (result) {
          var config = { headers: { "Content-Type": "text/plain" } };
          axios.post(this.apiUrl + "/forgot", this.email, config).then(
            () => {},
            err => {
              this.$toasted.error(err);
            }
          );
          this.texts.lblOutro = this.texts.lblOutro.replace("{0}", this.email);
          this.emailSend = true;
        } else {
          this.$toasted.error(this.texts.msgCheckForm);
        }
      });
    }
  }
};
</script>
