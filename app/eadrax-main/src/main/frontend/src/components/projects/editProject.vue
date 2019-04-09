<template>
  <div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom">
      <header class="w3-container" style="background-color: #607d8b;color:white">
        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-display-topright">&times;</span>
        <h2>{{texts.lblProjectSummary}}</h2>
      </header>
      <div class="w3-container">
        <form @submit.prevent="validateBeforeSubmit" id="project-form" autocomplete = 'off'>  
        <div class="w3-panel">
          <div class="w3-row">
            <div class="w3-col" style="width:100%">
              <div class="w3-row w3-row-padding">
                <div class="w3-col" style="width:47%">
                  <div class="w3-col" style="width:23%;margin-right:2%">
                    <span>{{texts.lblCustomer}}<span class="necessary">*</span></span>
                  </div>
                  <div class="w3-col" style="width:51%;margin-right:2%">
                    <select class="w3-input w3-border" v-validate="'required'" name = "Customer" v-model="data.customer"  @change="onCustomerSelected">
                      <option value="">Select Customer</option>
                      <option v-for="customer in customers" :key="customer" :value="customer">
										    {{ customer }}
									    </option>
                    </select>
                    <span v-show="errors.has('Customer')" class="red">{{ errors.first('Customer') }}</span>
                  </div>
                  <div class="w3-col" style="width:17%">
                    <div class="profileSize" :style="{'background-image': 'url(' + data.customerImage + ')', 'background-size': '100% 100%', 'min-height':'50px', 'border':'01px solid' }">
                      <input type="file" class="profileSize" accept="image/*" id="file" ref="file" style="opacity: 0;">
                    </div>
                  </div>
                </div>
              </div>
              <div class="w3-row w3-row-padding">
                <div class="w3-col" style="width:42%">
                  <div class="w3-col" style="width:30%">
                    <span>{{texts.lblName}}<span class="necessary">*</span></span>
                  </div>
                  <div class="w3-col" style="width:70%">
                    <input type="text" v-model="data.name" name="Name" v-validate="'required'" class="w3-input w3-border">
                    <span v-show="errors.has('Name')" class="red">{{ errors.first('Name') }}</span>
                  </div>
                </div>
                 <div class="w3-col" style="width:29%">
                  <div class="w3-col" style="width:30%">
                    <span>{{texts.lblStarted}}<span class="necessary">*</span></span>
                  </div>
                  <div class="w3-col" style="width:70%">
                    <datepicker :format="formatDateShort" name="startDate" v-model="data.startDate"
									 v-validate="'required'" input-class="w3-input w3-border"></datepicker>
                   <span v-show="errors.has('startDate')" class="red">{{ errors.first('startDate') }}</span>
                  </div>
                </div>
                 <div class="w3-col" style="width:27%">
                  <div class="w3-col" style="width:30%">
                    <span>{{texts.lblEnded}}</span>
                  </div>
                  <div class="w3-col" style="width:70%">
                    <datepicker :format="formatDateShort" name="endDate" v-model="data.endDate"
									  input-class="w3-input w3-border"></datepicker>
                  </div>
                </div>
              </div>

              <div class="w3-row w3-row-padding">
                <div class="w3-col" style="width:42%">
                  <div class="w3-col" style="width:30%">
                    <span>{{texts.lblSkipper}}</span>
                  </div>
                  <div class="w3-col auto-complete" style="width:42%;margin-right:2%">
                    <input type="text" v-model="data.skipper" class="w3-input w3-border" v-if="data.skipper">
                    <autocomplete source="/eam/api/skipper/search/email?email=" v-if="!data.skipper" results-display="email" :request-headers="authHeaders" @selected="onSkipperSelected" input-class="w3-input" placeholder="Search Skipper"></autocomplete>
                  </div>
                  <div class="w3-col" style="width:17%">
                    <div class="profileSize" :style="{'background-image': 'url(' + data.skipperImage + ')', 'background-size': '100% 100%', 'min-height':'50px', 'border':'01px solid' }">
                      <input type="file" class="profileSize" accept="image/*" id="file" ref="file" style="opacity: 0;">
                    </div>
                  </div>
                </div>

                <div class="w3-col" style="width:58%">
                  <div class="w3-col" style="width:15%">
                    <span>{{texts.lblCrew}}</span>
                  </div>
                  <div class="w3-col auto-complete" style="width:25%;margin-right:2%">
                    <autocomplete source="/eam/api/crew/search/email?email=" results-display="email" :request-headers="authHeaders" @selected="onCrewSelected" input-class="w3-input" placeholder="Search Crew"></autocomplete>
                  </div>
                  <div class="w3-col" style="width:55%">
                    <better-input-tag :tags="data.tags"></better-input-tag>
                  </div>
                </div>
              </div>

              <div class="w3-row w3-row-padding">
                <div class="w3-col" style="width:33%">
                  <div class="w3-col" style="width:30%">
                    <span>{{texts.lblRating}}</span>
                  </div>
                  <div class="w3-col" style="width:70%">
                    <star-rating :show-rating="false" v-model="data.ratingStars" :star-size="25" :increment="0.5"></star-rating>
                  </div>
                </div>
              </div>
              <div class="w3-row w3-row-padding">
                <div class="w3-col" style="width:100%">
                  <textarea style="width:100%" v-model="data.ratingText" rows="4"></textarea>
                </div>
              </div>

              <div class="w3-row w3-row-padding">
                <div class="w3-col" style="width:100%;text-align:right">
                  <button type="submit" class="w3-button w3-theme-d3">
                    <i class="fa fa-save"></i> {{texts.btSave}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import cloneDeep from "lodash/cloneDeep";
import textLoader from "../../i18n/StaticTextLoader";
import BetterInputTag from "better-vue-input-tag";
import dateFormatter from "../../i18n/Dateformatter";
import Autocomplete from "vuejs-auto-complete";
import _ from "lodash";

export default {
  data() {
    return {
      skipperImage: "",
      crewSign: "?",
      skipperSign: "?",
      customer: "",
      customerImage: "",
      customers: [],
      skippers: [],
      crews: [],
      texts: "",
      tags: [],
      startDate: new Date(),
      endDate: new Date(),
      name: "",
      project: {
        name: "",
        startDate: new Date(),
        endDate: new Date()
      }
    };
  },
  mixins: [textLoader, dateFormatter],
  props: ["data"],
  created() {
    const promiseGetText = this.getText(["projects"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];
    });
    this.getCustomers();
  },
  components: {
    "star-rating": StarRating,
    "better-input-tag": BetterInputTag,
    Datepicker,
    Autocomplete
  },
  watch: {
    "data.crews"(newVal) {
      let _this = this;
      _this.data.tags = [];

      newVal.map(obj => {
        _this.data.tags.push(obj.email);
      });
    }
  },
  computed: {
    authHeaders() {
      return {
        Authorization: "Bearer " + this.$cookies.get("BEARER"),
        "Content-Type": "application/json"
      };
    }
  },
  methods: {
    onCustomerSelected() {
      if (this.data.customer === "Select Customer") {
        this.data.customerImage = null;
      } else {
        this.data.customerImage = _.find(
          this.customerObjs,
          "email",
          this.data.customer
        ).avatarUrl;
      }
    },
    onSkipperSelected(pSkipper) {
      this.data.skipper = pSkipper.selectedObject.email;
      this.data.skipperImage = pSkipper.selectedObject.avatarUrl;
    },
    onCrewSelected(pCrew) {
      this.data.tags = _.union(this.data.tags, [pCrew.selectedObject.email]);
    },
    validateBeforeSubmit() {
      let self = this;
      self.$validator.validateAll().then(result => {
        if (result) self.submit();
      });
    },
    submit() {
      let _this = this;

      if (_this.data.id) {
        _this.updateProject();
      } else {
        _this.saveProject();
      }
    },
    saveProject() {
      this.project.skippers = [];
      this.project.crews = [];

      this.project.id = this.data.id;
      this.project.startDate =
        this.data.startDate instanceof Date
          ? this.data.startDate.getTime()
          : this.data.startDate;

      this.project.endDate =
        this.data.endDate instanceof Date
          ? this.data.endDate.getTime()
          : this.data.endDate;

      this.data.tags.map(tag => {
        let emailObj = {
          email: tag
        };
        this.project.crews.push(cloneDeep(emailObj));
      });

      this.project.customer = { email: this.data.customer };
      this.project.skippers.push({ email: this.data.skipper });
      this.project.name = this.data.name;
      this.project.ratingStars = this.data.ratingStars;
      this.project.ratingText = this.data.ratingText;

      let url = "/eam/api/project";
      axios.post(url, this.project).then(
        response => {
          if (response) {
            this.$toasted.success(this.texts.msgProfileSave);
            document.getElementById("id01").style.display = "none";
          }
          this.$emit("onSuccess");
        },
        err => {
          this.$toasted.error(err);
        }
      );
    },
    updateProject() {
      this.project.skippers = [];
      this.project.crews = [];

      this.project.id = this.data.id;
      this.project.startDate =
        this.data.startDate instanceof Date
          ? this.data.startDate.getTime()
          : this.data.startDate;

      this.project.endDate =
        this.data.endDate instanceof Date
          ? this.data.endDate.getTime()
          : this.data.endDate;

      this.data.tags.map(tag => {
        let emailObj = {
          email: tag
        };
        this.project.crews.push(cloneDeep(emailObj));
      });

      this.project.customer = { email: this.data.customer };
      this.project.skippers.push({ email: this.data.skipper });
      this.project.name = this.data.name;
      this.project.ratingStars = this.data.ratingStars;
      this.project.ratingText = this.data.ratingText;

      let url = "/eam/api/project";
      axios.put(url, this.project).then(
        response => {
          if (response) {
            this.$toasted.success(this.texts.msgProfileSave);
            document.getElementById("id01").style.display = "none";
          }
          this.$emit("onSuccess");
        },
        err => {
          this.$toasted.error(err);
        }
      );
    },
    getCustomers() {
      let _this = this;
      let options = {
        url: "/eam/api/customer",
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        data: null
      };
      axios(options).then(
        response => {
          _this.customerObjs = response.data;
          _this.customerObjs.map(customerObj => {
            _this.customers.push(customerObj.email);
          });
        },
        err => {
          this.$toasted.error(err);
        }
      );
    }
  }
};
</script>
<style>
.profileSize {
  width: 45px !important;
  height: 15px !important;
}

.auto-complete .autocomplete__icon {
  display: none;
}

.auto-complete .autocomplete__box {
  padding: 0px;
}

.auto-complete .autocomplete__inputs {
  padding: 0px;
}
</style>
