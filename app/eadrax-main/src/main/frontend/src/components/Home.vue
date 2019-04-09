<template>
  <div class="w3-content" style="max-width:500px">
    <div class="w3-card-4" style="margin-top:70px">
      <header>
        <div class="w3-theme" style="padding:8px">
          <i class="fas fa-globe" style="font-size:24px"></i>
        </div>
      </header>
      <div class="w3-container" style="margin-top:5px" v-if="authenticated">
        <p id="lblAuthSucceeded" style="margin-bottom:20px">{{ texts.lblAuthSucceeded }}</p>
      </div>
      <div class="w3-container" style="margin-top:5px" v-if="!authenticated">
        <p id="lblPleaseAuth" style="margin-bottom:20px">{{ texts.lblPleaseAuth }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "./auth/Auth";
import textLoader from "../i18n/StaticTextLoader";

export default {
  data() {
    return {
      texts: {}
    };
  },
  mixins: [auth, textLoader],
  created() {
    const promiseGetText = this.getText(["home"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];
    });
  },
  computed: {
    authenticated() {
      return this.isAuthenticated();
    }
  }
};
</script>
