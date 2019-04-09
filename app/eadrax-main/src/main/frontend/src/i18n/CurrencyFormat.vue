<script>
import axios from "axios";
export default {
  methods: {
    getformat() {
      return new Promise((resolve, reject) => {
        const uri = process.env.BASE_URL + "locales/currencyFormat.json";
        axios.get(uri).then(
          response => {
            resolve(response.data);
          },
          response => {
            reject(response);
          }
        );
      });
    }
  }
};
</script>
