<template>
  <div>
    <div class="w3-content" style="max-width:900px" v-if="!emailSend">
      <div class="w3-card-4" style="margin-top:70px">
        <header>
          <div class="w3-theme" style="padding:8px">
            <i class="fas fa-globe" style="font-size:24px"></i>
          </div>
        </header>
        <div class="w3-container" style="margin-top:25px">
          <div class="w3-row">
            <label>{{ texts.lblIntro }}</label>
          </div>
          <div class="w3-row" style="margin-top:15px">
            <div class="w3-third">
              <label for="role">{{ texts.lblRole }}</label><span style="color:red">*</span>
            </div>
            <div class="w3-twothird">
              <div>
                <input type="radio" id="skipper" value="SKIPPER" v-model="newUser.role">
                <label for="skipper" style="margin-left:5px">{{ texts.lblRoleSkipper }}</label>
              </div>
              <div>
                <input type="radio" id="crew" value="CREW" v-model="newUser.role">
                <label for="crew" style="margin-left:5px">{{ texts.lblRoleCrew }}</label>
              </div>
              <div>
                <input type="radio" id="customer" value="CUSTOMER" v-model="newUser.role">
                <label for="customer" style="margin-left:5px">{{ texts.lblRoleCustomer }}</label>
              </div>
            </div>
          </div>
          <div class="w3-row" style="margin-top:20px">
            <div class="w3-third">
              <label for="email">{{ texts.lblEMail }}:</label><span style="color:red">*</span>
            </div>
            <div class="w3-rest">
              <input id="email" v-model="newUser.email" style="margin-bottom:10px;width:100%" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('lblEMail') }" name="lblEMail" type="text">
              <span v-show="errors.has('lblEMail')" class="help is-danger">{{ errors.first('lblEMail') }}</span>
            </div>
          </div>
          <div class="w3-row" style="margin-top:15px;margin-bottom:25px">
            <div class="w3-third">&nbsp;</div>
            <div class="w3-rest">
              <button type="submit" id="btRegister" v-on:click="persistUser" class="w3-btn w3-theme-d4">
                <span class="glyphicons glyphicons-log-in"></span>{{ texts.btRegisterUser }}
              </button>
            </div>
          </div>
        </div>
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
          <label id="msgCreated">{{ texts.msgCreated }}</label>
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

export default {
  data() {
    return {
      apiUrl: process.env.BASE_URL + "api/users",
      texts: {},
      newUser: {
        role: "",
        email: ""
      },
      emailSend: false
    };
  },
  mixins: [auth, textLoader],
  created() {
    const promiseGetText = this.getText(["register"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];
    });
  },
  methods: {
    persistUser() {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios.post(this.apiUrl, this.newUser).then(
            () => {
              this.newUser.role = "";
              this.newUser.email = "";
              this.emailSend = true;
            },
            err => {
              if (err.response && err.response.status === 400) {
                this.$toasted.error(this.texts.msgFail400);
              } else {
                this.$toasted.error(err);
              }
            }
          );
        } else {
          this.$toasted.error(this.texts.msgCheckForm);
        }
      });
    }
  }
};
</script>
