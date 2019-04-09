<template>
  <div id="App">
    <topNavigation></topNavigation>
    <router-view style="margin-bottom:150px"/>
  </div>
</template>

<script>
import TopNavigation from "./components/TopNavigation";

export default {
  components: {
    TopNavigation
  }
};

import "../public/css/styles.css";
</script>
