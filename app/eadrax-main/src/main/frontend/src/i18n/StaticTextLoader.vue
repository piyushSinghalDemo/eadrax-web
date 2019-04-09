<script>
import axios from "axios";
import { Validator } from "vee-validate";
import veeDe from "vee-validate/dist/locale/de";
import veeEn from "vee-validate/dist/locale/en";

export default {
  data() {
    return {
      userLang: "en"
    };
  },
  created() {
    this.userLang = this.getLang();
    Validator.localize("de", veeDe);
    Validator.localize("en", veeEn);
  },
  methods: {
    // Used to load key-values pairs of source text and target text from json-file
    // is returned in json format
    getText(viewParts) {
      return new Promise(resolve => {
        let lang = this.getLang();
        this.$validator.localize(lang);
        const uri = process.env.BASE_URL + "locales/" + lang + ".json";
        axios.get(uri).then(
          response => {
            const texts = [];
            for (let i = 0; i < viewParts.length; i += 1) {
              texts.push(response.data[viewParts[i]]);
              this.updateDictionary(response.data[viewParts[i]]);
            }
            resolve(texts);
          },
          () => {
            // if language not supported => use fallback
            window.alert(
              "Your language (" +
                this.getLang() +
                ") is not supported. Using english (en) as default."
            );
            axios.get("locales/en.json").then(
              responseFallback => {
                resolve(responseFallback.body);
              },
              () => {
                window.alert(
                  "Internal error. Default language-files not found."
                );
              }
            );
          }
        );
      });
    },
    getLang() {
      const userLang =
        window.navigator.language || window.navigator.userLanguage;
      let mainLang = userLang.split("-");
      return mainLang[0];
    },
    updateDictionary(attrs) {
      this.$validator.localize({
        de: {
          attributes: attrs
        },
        en: {
          attributes: attrs
        }
      });
    }
  }
};
</script>
