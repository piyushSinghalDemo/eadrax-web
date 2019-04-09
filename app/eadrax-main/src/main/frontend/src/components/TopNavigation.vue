<template>
  <div class="w3-container w3-theme">
    <div class="w3-panel w3-left">
      <i class="fas fa-globe" style="font-size:24px"></i>
    </div>
    <div class="w3-panel w3-left">
      <router-link to="/" active-class="w3-theme"  class="w3-padding">{{ texts.home }}</router-link>
    </div>
    <div class="w3-panel w3-right">
      <router-link to="/login" id="login" active-class="w3-theme-d4" class="w3-padding" v-if="!authenticated">
        <i class="fas fa-sign-in-alt" style="margin-right:8px"></i>{{ texts.login }}
      </router-link>
      <router-link to="/findCrew" id="find" active-class="w3-theme-d4" class="w3-padding"
        v-if="authenticated && role == 'SKIPPER'">
        <i class="fas fa-search" style="margin-right:8px"></i>{{ texts.find }}
      </router-link>
      <router-link to="/projects" id="projects" active-class="w3-theme-d4" class="w3-padding"
        v-if="authenticated && (role == 'CUSTOMER'|| role == 'SKIPPER' || role == 'CREW')">
        <i class="fas fa-calendar-alt" style="margin-right:8px"></i>{{ texts.projects }}
      </router-link>
      <router-link to="/profile" id="profile" active-class="w3-theme-d4" class="w3-padding"
        v-if="authenticated && (role == 'SKIPPER' || role == 'CREW')">
        <i class="fas fa-user" style="margin-right:8px"></i>{{ texts.profile }}
      </router-link>
      <router-link to="/customerprofile" id="customerprofile" active-class="w3-theme-d4" class="w3-padding"
        v-if="authenticated && (role == 'CUSTOMER')">
        <i class="fas fa-user" style="margin-right:8px"></i>{{ texts.profile }}
      </router-link>
      <router-link to="/register" id="register" active-class="w3-theme-d4" class="w3-padding" v-if="!authenticated">
        <i class="fas fa-user-plus" style="margin-right:8px"></i>{{ texts.register }}
      </router-link>
      <router-link to="/logout" id="logout" active-class="w3-theme-d4" class="w3-padding" v-if="authenticated">
        <i class="fas fa-sign-out-alt" style="margin-right:8px"></i>{{ texts.logout }}
      </router-link>
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
    const promiseGetText = this.getText(["topNavigation"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];
    });
  },
  computed: {
    role() {
      return this.$store.state.role || this.$cookies.get("ROLES");
    },
    authenticated() {
      return this.isAuthenticated();
    }
  }
};
</script>
