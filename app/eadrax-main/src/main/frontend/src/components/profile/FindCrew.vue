<template>
  <div class="w3-container">
    <div class="w3-panel w3-large w3-border-bottom">{{texts.lblFindCrewMember}}</div>
    <div class="w3-panel">
      <div class="w3-row">
        <div class="w3-col" style="width:80%">
          <div class="w3-row w3-row-padding">
            <div class="w3-cprojectCountol" style="width:50%">
              <div class="w3-col" style="width:30%">
                <span>{{texts.lblName}}</span>
              </div>
              <div class="w3-col" style="width:70%">
                <input id="nameOrTitle" type="text" @change="searchResult" v-model="nameOrTitle"
                       class="w3-input w3-border">
              </div>
            </div>
            <div class="w3-col" style="width:50%">
              <div class="w3-col" style="width:30%">
                <span>{{texts.lblSkill}}</span>
              </div>
              <div class="w3-col" style="width:70%">
                <input id="skills" type="text" @change="searchResult" v-model="skill" class="w3-input w3-border">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w3-row w3-row-padding">
        <div class="w3-col" style="width:15%">
          <span>{{texts.lblHourlyRate}}</span>
        </div>
        <div class="w3-col" style="width:85%">
          <vue-slider id="hourlyRate" ref="slider" v-bind="slider.hourlyRate" v-model="hourlyRate"
                      @drag-end="searchResult"
                      width="310px"></vue-slider>
        </div>
      </div>
      <div class="w3-row w3-row-padding">
        <div class="w3-col" style="width:15%">
          <span>{{texts.lblAvgRating}}</span>
        </div>
        <div class="w3-col" style="width:30%;margin-right:5%">
          <vue-slider id="rating" ref="slider" v-bind="slider.rating" @drag-end="searchResult" v-model="rating"
                      width="310px"></vue-slider>
        </div>
      </div>
    </div>

    <div class="w3-panel w3-large w3-border-bottom">{{texts.lblResult}}</div>
    <div class="w3-row">
        <vue-good-table id="searchResult" :columns="columns" mode="remote" :totalRows="totalRecords"
                      @on-selected-rows-change="selectionChanged"
                      :rows="rows" :pagination-options="{ enabled: true }" :selectOptions="selectOptions">
                       <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'actions'" @click="routeToProfile(props.row)">
                            <span style="font-weight: bold; color: blue;cursor:pointer">
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </span>
                          </span>
                            <span v-else>
                              {{props.row[props.column.field]}} 
                          </span>
                       </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import textLoader from "../../i18n/StaticTextLoader";
import vueSlider from "vue-slider-component";
import axios from "axios";
import BetterInputTag from "better-vue-input-tag";
import dateFormatter from "../../i18n/Dateformatter";
import currencyFormat from "../../i18n/CurrencyFormat";
import _ from "lodash";
export default {
  data() {
    return {
      skill: "",
      currencyList: [],
      selectOptions: {
        enabled: true,
        selectOnCheckboxOnly: true,
        selectionInfoClass: "custom-class",
        selectionText: "rows selected",
        clearSelectionText: "clear"
      },
      role: "",
      nameOrTitle: "",
      slider: {
        rating: {
          min: 1,
          max: 5
        },
        hourlyRate: {
          min: 1,
          max: 200
        }
      },
      columns: [
        {
          label: "Name",
          field: "fullName"
        },
        {
          label: "Title",
          field: "title"
        },
        {
          label: "Email",
          field: "email"
        },
        {
          label: "Hourly Rate",
          field: "hourlyRate"
        },
        {
          label: "Location",
          field: "location"
        },
        {
          label: "Rating",
          field: "rating"
        },
        {
          label: "Availability",
          field: "availability"
        },
        {
          label: "Actions",
          field: "actions"
        }
      ],
      rows: [],
      page: 0,
      size: 10,
      totalRecords: 0,
      texts: "", //all label from language json
      hourlyRate: 30,
      rating: 1,
      searchQuery: "",
      gridColumns: [
        "name",
        "Title",
        "Hourly Rate",
        "Location",
        "rating",
        "Availability"
      ]
    };
  },
  mixins: [textLoader, dateFormatter, currencyFormat],
  components: {
    vueSlider,
    "better-input-tag": BetterInputTag
  },
  created() {
    const promiseGetText = this.getText(["searchAndFind"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];
    });
  },
  mounted() {
    this.role = this.$cookies.get("ROLES");
    this.getCurrencyFormat();
  },
  methods: {
    routeToProfile(record){
      debugger;
      this.$router.push({ name: 'profile', query: { email: record.email, role:'crew' }});
    },
    getCurrencyFormat() {
      const format = this.getformat();
      let _this = this;
      format.then(formatResponse => {
        _this.currencyList = formatResponse;
      });
    },
    selectionChanged() {},
    searchResult() {
      this.searchCrewResult();
    },
    searchCrewResult() {
      let urlParams = new URLSearchParams();
      let _this = this;
      urlParams.append("nameOrTitle", this.nameOrTitle);
      urlParams.append("rating", this.rating);
      urlParams.append("hourlyRate", this.hourlyRate);
      urlParams.append("page", this.page);
      urlParams.append("size", this.size);
      urlParams.append("skill", this.skill);
      let options = {
        url: "/eam/api/crew/search",
        method: "get",
        params: urlParams,
        headers: {
          "Content-Type": "application/json"
        },
        data: null
      };
      axios(options).then(
        response => {
          if (response.data.content) {
            this.rows = response.data.content;
            this.rows.map(row => {
              let currencyObj = _.find(
                _this.currencyList,
                "code",
                row.currency
              );
              row.hourlyRate = this.$options.filters.currency(
                row.hourlyRate,
                currencyObj.symbol
              );
              row.availability = this.formatDateShort(
                new Date(row.availability)
              );
            });
          }

          this.totalRecords = response.data.totalElements;
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
</style>
