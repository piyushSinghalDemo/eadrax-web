<script>
const moment = require("moment");

export default {
  created() {
    const userLang = window.navigator.language || window.navigator.userLanguage;
    moment.locale(userLang);
  },
  methods: {
    // Used to format dates as the following: Montag, 24. Oktober 2016 19:35
    // see also: http://momentjs.com/
    formatDateLong(dateToFormat) {
      if (dateToFormat) {
        return moment(dateToFormat).format("LLLL");
      } else {
        return "";
      }
    },
    formatDateShort(dateToFormat) {
      if (dateToFormat) {
        return moment(dateToFormat).format("L");
      } else {
        return "";
      }
    }
  }
};
</script>
