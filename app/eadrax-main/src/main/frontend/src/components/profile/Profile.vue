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
			    				<input type="text" name="First Name" v-model="profile.firstName" class="w3-input w3-border">
			    			</div>
			    		</div>
					    <div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
					    		<span>{{texts.lblLastName}}</span>
					    	</div>
	    					<div class="w3-col" style="width:70%">
					    		<input type="text" name="Last Name" v-model="profile.lastName" class="w3-input w3-border">
					    	</div>
					    </div>
	    			</div>
	    			<div class="w3-row w3-row-padding">
	    				<div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
		    					<span>{{texts.lblTitle}}</span>
		    				</div>
	    					<div class="w3-col" style="width:70%">
		    				<input type="text" name="title" v-model="profile.title" class="w3-input w3-border">
		    				</div>
			    		</div>
              	<div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
		    					<span>{{texts.lblEmail}}<span class="necessary">*</span></span>
		    				</div>
	    					<div class="w3-col" style="width:70%">
		    					<input type="text" name="E-Mail" v-model="profile.email" disabled class="w3-input w3-border">
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
					    		<input type="text" name="Postal Address" v-model="location.postalAddress" v-validate="'required'" class="w3-input w3-border">
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

	    <div class="w3-panel w3-large w3-border-bottom">{{texts.skillsHeading}}</div>
	    <div class="w3-panel">
	    	<div class="w3-row">
	    		<div class="w3-col" style="width:70%">
	    			<div class="w3-row w3-row-padding">
	    				<div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
			    				<span>{{texts.lblOverview}}</span>
			    			</div>
	    					<div class="w3-col" style="width:70%">
			    				<textarea type="text" name="Overview" v-model="skillSet.overview" class="w3-input w3-border" rows="5"></textarea>
			    			</div>
			    		</div>
					    <div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
	    						{{texts.lblTop3Skills}}<span class="necessary">*</span>
					    	</div>
	    					<div class="w3-col" style="width:70%">
	    						<div class="w3-row">
					    			<input type="text" name="skill" v-model="skillSet.skills[0]" v-validate="'required'" class="w3-input w3-border">
									<span v-show="errors.has('skill')" class="red">{{ errors.first('skill') }}</span>
					    		</div>
					    		<div class="w3-row w3-section-8">
					    			<input type="text" name="skill 2" v-model="skillSet.skills[1]" v-validate="'required'" class="w3-input w3-border">
									<span v-show="errors.has('skill 2')" class="red">{{ errors.first('skill 2') }}</span>
					    		</div>

					    		<div class="w3-row">
					    			<input type="text" name="skill 3" v-model="skillSet.skills[2]" v-validate="'required'" class="w3-input w3-border">
									<span v-show="errors.has('skill 3')" class="red">{{ errors.first('skill 3') }}</span>
					    		</div>
					    	</div>
					    </div>
	    			</div>
	    			<div class="w3-row w3-row-padding">
	    				<div class="w3-col" style="width:100%">
	    					<div class="w3-col" style="width:14%">
		    					<span>{{texts.lblListOfSkill}}</span>
		    				</div>
	    					<div class="w3-col" style="width:86%">
                  <better-input-tag :tags="skillTags"></better-input-tag>
								</div>
			    		</div>
	    			</div>
				  </div>
			    <div class="w3-col" style="width:20%"></div>
	    	</div>
	    </div>

	    <div class="w3-panel w3-large w3-border-bottom">{{texts.lblPaymentHeading}}</div>
	    <div class="w3-panel">
	    	<div class="w3-row">
	    		<div class="w3-col" style="width:70%">

	    			<div class="w3-row w3-row-padding">
	    				<div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
		    					<span>{{texts.lblTaxNumberType}}<span class="necessary">*</span></span>
		    				</div>
	    					<div class="w3-col" style="width:70%">
		    					<input type="text" name="Tax Number Type" v-model="paymentInformation.taxNumberType" class="w3-input w3-border" />
		    				</div>
			    		</div>
			    		<div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
		    					<span>{{texts.lblTaxNumber}}<span class="necessary">*</span></span>
		    				</div>
	    					<div class="w3-col" style="width:70%">
								  <input type="text" name="Tax Number" v-model="paymentInformation.taxNumber" v-validate="'required'" class="w3-input w3-border" />
									  <span v-show="errors.has('Tax Number')" class="red">{{ errors.first('Tax Number') }}</span>
		    				</div>
			    		</div>
	    			</div>


	    			<div class="w3-row w3-row-padding">
	    				<div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
		    					<span>{{texts.lblHourlyRate}}<span class="necessary">*</span></span>
		    				</div>
	    					<div class="w3-col" style="width:70%">
		    					<input type="number" name="Hourly Rate" v-model="paymentInformation.hourlyRate" class="w3-input w3-border" />
									  <span v-show="errors.has('Hourly Rate')" class="red">{{ errors.first('Hourly Rate') }}</span>
		    				</div>
			    		</div>
	    			</div>
	    			<div class="w3-row w3-row-padding">
	    				<div class="w3-col" style="width:50%">
	    					<div class="w3-col" style="width:30%">
			    				<span>{{texts.lblAvailability}}</span>
			    			</div>
	    					<div class="w3-col" style="width:70%">
								<datepicker :format="formatDateShort" name="Availability" v-model="availabilityInformation.startDate"
									 input-class="w3-input w3-border"></datepicker>
			    			</div>
			    		</div>
					    <div class="w3-col" style="width:50%">    	
							  <div class="w3-col" style="width:30%">
			    				<span>{{texts.lblWeeklyTime}}</span>
			    			</div>
	    					<div class="w3-col" style="width:70%">
			    				<input type="number" name="WeeklyTime" v-model="availabilityInformation.weeklyTimeInHours" class="w3-input w3-border" />
			    			</div>				
					    </div>
	    			</div>
				</div>
			    <div class="w3-col" style="width:20%">
			    </div>
	    	</div>
	    	<div class="w3-row w3-row-padding">
				<div class="w3-col" style="width:70%">
				</div>    				
				<div class="w3-col center" style="width:20%">
					<button type="submit" class="w3-button w3-theme-d3">
            <i class="fa fa-save"></i> {{texts.btSubmit}}</button>
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
import Datepicker from "vuejs-datepicker";
import BetterInputTag from "better-vue-input-tag";
import dateFormatter from "../../i18n/Dateformatter";
import currencyFormat from "../../i18n/CurrencyFormat";
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
        title: "",
        firstName: "",
        lastName: "",
        avatarUrl: "",
        email: this.$cookies.get("EMAIL")
      },
      skillSet: {
        overview: "",
        skills: []
      },
      location: {
        countryCode: "",
        postalAddress: ""
      },
      paymentInformation: {
        taxNumberType: "",
        taxNumber: "",
        hourlyRate: 0
      },
      availabilityInformation: {
        startDate: 0,
        weeklyTimeInHours: 0
      },
      displayUrl: "",
      skillTags: []
    };
  },
  mixins: [textLoader, dateFormatter, currencyFormat],
  components: {
    Datepicker,
    "better-input-tag": BetterInputTag,
    CountryFlag
  },
  watch: {
    "data.skillTags": function(newVal) {
      let _this = this;
      _this.data.tags = [];

      newVal.map(function(value) {
        _this.skillTags[value.ranking - 3] = value.name;
      });
    }
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
      let role = this.$cookies.get("ROLES");
      let url = role === "SKIPPER" ? "/eam/api/skipper" : "/eam/api/crew";
      let _this = this;

      var dataToSend = this.profile;
      let skillSet = { overview: this.skillSet.overview, skills: [] };

      if (this.skillSet && this.skillSet.skills) {
        skillSet.skills.push({ name: this.skillSet.skills[0], ranking: 0 });
        skillSet.skills.push({ name: this.skillSet.skills[1], ranking: 1 });
        skillSet.skills.push({ name: this.skillSet.skills[2], ranking: 2 });

        _this.skillTags.map(function(value, key) {
          skillSet.skills.push({ name: value, ranking: key + 3 });
        });

        dataToSend.skillSet = skillSet;
      } else {
        dataToSend.skillSet = null;
      }

      dataToSend.paymentInformation = this.paymentInformation;
      dataToSend.availabilityInformation = this.availabilityInformation;
      dataToSend.availabilityInformation.startDate =
        this.availabilityInformation.startDate instanceof Date
          ? this.availabilityInformation.startDate.getTime()
          : this.availabilityInformation.startDate;
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
      let role = this.$cookies.get("ROLES");

      let profileUrl =
        role === "SKIPPER"
          ? "/eam/api/skipper/profile"
          : "/eam/api/crew/profile";
      let options = {
        url: profileUrl,
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

            if (response.data.location) _this.location = response.data.location;

            if (response.data.paymentInformation)
              _this.paymentInformation = response.data.paymentInformation;

            if (response.data.availabilityInformation) {
              _this.availabilityInformation =
                response.data.availabilityInformation;
              _this.availabilityInformation.startDate = new Date(
                response.data.availabilityInformation.startDate
              );
            }

            if (response.data.skillSet) {
              _this.skillSet = {
                overview: response.data.skillSet.overview,
                skills: []
              };

              _this.skillSet.skills = [];
              _this.skillTags = [];

              response.data.skillSet.skills.map(function(value) {
                if (value.ranking <= 2) {
                  _this.skillSet.skills[value.ranking] = value.name;
                } else {
                  _this.skillTags[value.ranking - 3] = value.name;
                }
              });
            }

            Vue.delete(_this.profile, "paymentInformation");
            Vue.delete(_this.profile, "availabilityInformation");
            Vue.delete(_this.profile, "skillSet");
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
