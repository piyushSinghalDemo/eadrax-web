<template>
	<div class="w3-container">
 	  <form @submit.prevent="validateBeforeSubmit" id="profile-form" autocomplete = 'off'>  
	    <div class="w3-panel w3-large w3-border-bottom">{{texts.lblContainerHeading}}</div>
	    <div class="w3-panel">
	    	<div class="w3-row">
	    		<div class="w3-col" style="width:70%">
	    			<div class="w3-row w3-row-padding">
	    				<div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
			    				<span>{{texts.lblFirstName}}</span>
			    			</div>
	    					<div class="w3-col" style="width:70%">
			    				<input id="firstName" type="text" name="First Name" v-model="profile.firstName" class="w3-input w3-border">
			    			</div>
			    		</div>
					    <div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
					    		<span>{{texts.lblLastName}}</span>
					    	</div>
	    					<div class="w3-col" style="width:70%">
					    		<input id="lastName" type="text" name="Last Name" v-model="profile.lastName" class="w3-input w3-border">
					    	</div>
					    </div>
	    			</div>
	    			<div class="w3-row w3-row-padding">
	    			    <div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
		    					<span>{{texts.lblEmail}}<span class="necessary">*</span></span>
		    				</div>
	    					<div class="w3-col" style="width:70%">
		    					<input id="email" type="text" name="E-Mail" v-model="profile.email" disabled class="w3-input w3-border">
								  <span v-show="errors.has('E-Mail')" class="red">{{ errors.first('E-Mail') }}</span>
		    				</div>
			    		</div>
	    			</div>
	    			<div class="w3-row w3-row-padding">
					    <div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
					    		<span>{{texts.lblLocation}}<span class="necessary">*</span></span>
					    	</div>
	    					<div class="w3-col" style="width:54%">
                  <select id="location" name="Location" v-model="location.countryCode" v-validate="'required'" class="w3-input w3-border">
                    <option value="">select location</option>
                    <option v-for="(country, index) in countryCodes" :key="index" :value="country">{{country+'-'+ countryList[country]}}</option>
                  </select>
							    <span v-show="errors.has('Location')" class="red">{{ errors.first('Location') }}</span>
					    	</div>
                <div class="w3-col" style="width:10%" v-if="location.countryCode"> 
                  <country-flag name="Country Flag" id="country-flag" :country='location.countryCode' size='big' style="position:relative;top:-13px"/>
                </div>
					    </div>
	    			</div>
            <div class="w3-row w3-row-padding">
	    					<div class="w3-col" style="width:14%">
					    		<span>{{texts.lblPostalAddress}}<span class="necessary">*</span></span>
					    	</div>
	    					<div class="w3-col" style="width:86%">
					    		<input id="address" type="text" name="Postal Address" v-model="location.postalAddress" v-validate="'required'"  class="w3-input w3-border">
									  <span v-show="errors.has('Postal Address')" class="red">{{ errors.first('Postal Address') }}</span>
					    	</div>
					    
	    			</div>
				  </div>
			    <div class="w3-col center" style="width:20%">
            <div class="profileSize" :style="{'background-image': 'url(' + displayUrl + ')', 'background-size': '100% 100%', 'min-height':'138px', 'border':'01px solid' }">
              <input type="file" class="profileSize" @change="previewImage" accept="image/*" id="file" ref="file" style="opacity: 0;">
            </div>
			    </div>
	    	</div>
	    </div>

	    <div class="w3-panel w3-large w3-border-bottom">{{texts.lblCompanyProfile}}</div>
	    <div class="w3-panel">
	    	<div class="w3-row">
	    		<div class="w3-col" style="width:70%">
	    			<div class="w3-row w3-row-padding">
	    				<div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
			    				<span>{{texts.lblName}}<span class="necessary">*</span></span>
			    			</div>
	    					<div class="w3-col" style="width:70%">
			    				<input id="companyName" type="text" name="Company Name" v-model="profile.companyName" v-validate="'required'" class="w3-input w3-border">
									  <span v-show="errors.has('Company Name')" class="red">{{ errors.first('Company Name') }}</span>
			    			</div>
			    		</div>
					    <div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
	    						{{texts.lblWebsite}}<span class="necessary">*</span>
					    	</div>
	    					<div class="w3-col" style="width:70%">
	    						<div class="w3-row">
					    			<input id="website" v-model="profile.companyWebsite" type="text" name="website" class="w3-input w3-border">									
					    		</div>
					    	</div>
					    </div>
	    			</div>
				  </div>
			    <div class="w3-col" style="width:20%"></div>
	    	</div>
        <div class="w3-row w3-row-padding">
          <div class="w3-col" style="width:70%">
          </div>    				
          <div class="w3-col center" style="width:20%">
            <button type="submit" id="btSubmitCustomerProfile" class="w3-button w3-theme-d3">
              <i class="fa fa-save"></i>{{texts.btSubmit}}
            </button>
          </div>
        </div>
	    </div>
	  </form>
	</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import textLoader from "../../i18n/StaticTextLoader";
import BetterInputTag from "better-vue-input-tag";
import countries from "i18n-iso-countries";
import CountryFlag from "vue-country-flag";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
export default {
  data() {
    return {
      countryList: {},
      countryCodes: [],
      texts: {},
      imageData: "",
      baseUrl: process.env.VUE_APP_URL,
      profile: {
        companyName: "",
        companyWebsite: "",
        title: "",
        firstName: "",
        lastName: "",
        avatarUrl: "",
        email: this.$cookies.get("EMAIL")
      },
      location: {
        countryCode: "",
        postalAddress: ""
      },
      displayUrl: ""
    };
  },
  mixins: [textLoader],
  components: {
    "better-input-tag": BetterInputTag,
    CountryFlag
  },
  created() {
    const promiseGetText = this.getText(["profile"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];
    });
  },
  mounted() {
    this.countryList = countries.getNames("en");
    this.countryCodes = Object.keys(this.countryList);
    this.getProfile();
  },
  methods: {
    updateProfile() {
      let url = "/eam/api/customer";
      let _this = this;

      var dataToSend = this.profile;

      dataToSend.location = this.location;

      axios.put(url, dataToSend).then(
        response => {
          if (response) {
            this.$toasted.success(_this.texts.msgProfileSave);
          }
        },
        err => {
          this.$toasted.error(err);
        }
      );
    },
    previewImage: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
      let file = this.$refs.file.files[0];
      if (file) this.saveImage(file);
    },
    saveImage(file) {
      /*
					Initialize the form data
				*/
      let formData = new FormData();

      /*
					Add the form data we need to submit
				*/
      formData.append("file", file);
      formData.append("email", this.$cookies.get("EMAIL"));

      /*
				Make the request to the POST /single-file URL
				*/
      let _this = this;
      axios
        .post("/eam/api/users/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(
          response => {
            if (response.data) this.profile.avatarUrl = response.data;
            this.displayUrl = response.data + "?" + new Date().getTime();
          },
          err => {
            this.$toasted.error(err);
          }
        )
        .catch(function() {
          this.$toasted.error(_this.texts.lblImageException);
        });
    },
    validateBeforeSubmit() {
      let self = this;
      self.$validator.validateAll().then(result => {
        if (result) self.updateProfile();
      });
    },
    getProfile() {
      let options = {
        url: "/eam/api/customer/profile",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        data: null
      };
      axios(options).then(
        response => {
          if (response.data) {
            var _this = this;
            _this.profile = response.data;

            _this.displayUrl = response.data.avatarUrl;

            if (response.data && response.data.location) {
              _this.location = {
                postalAddress: response.data.location.postalAddress,
                countryCode: response.data.location.countryCode
              };
            }

            Vue.delete(_this.profile, "location");
          }
        },
        err => {
          this.$toasted.error(err);
        }
      );
    }
  }
};
</script>
<style scoped>
.profileSize {
  width: 148px !important;
  height: 138px !important;
}
</style>
