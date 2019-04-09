<template>
  <div class="w3-container">
    <div class="w3-panel w3-large w3-border-bottom">{{texts.lblOverview}}</div>
    <div class="w3-panel">
      <div class="w3-row">
        <div class="w3-col" style="width:80%">
          <div class="w3-row w3-row-padding">
            <div class="w3-col" style="width:50%">
              <div class="w3-col" style="width:60%">
                <span>{{texts.lblFinishedProjects}}</span>
              </div>
              <div class="w3-col" style="width:40%">
                <input type="text" v-model="projectList.length" disabled class="w3-input w3-border">
              </div>
            </div>
            <div class="w3-col" style="width:50%">
              <div class="w3-col" style="width:60%" v-if="(role == 'CUSTOMER'|| role == 'SKIPPER')">
                <button type="submit" class="w3-button w3-theme-d3" @click="onNewProject"><i class="fa fa-plus"></i> {{texts.btNew}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w3-panel w3-large w3-border-bottom">{{texts.lblListOfProjects}}</div>
    <div v-for="(project, index) in projectList" :key="index">
      <div class="w3-panel w3-large w3-border-bottom" v-show="index !== 0" style="width:80%;margin-left:10%"></div>
      <div class="w3-panel">
        <div class="w3-row">
          <div class="w3-col" style="width:100%">
            <div class="w3-row w3-row-padding" v-if="(role == 'CUSTOMER'|| role == 'SKIPPER')">
              <div class="w3-col" style="width:7%">
                <button type="submit" class="w3-button w3-theme-d3" @click="onEditProject(project)"><i class="fa fa-edit"></i> {{texts.btEdit}}</button>
              </div>
              <div class="w3-col" style="width:93%">
                <button type="submit" class="w3-button w3-theme-d3" @click="onDeletePanel(project)"><i class="fa fa-trash"></i> {{texts.btDelete}}</button>
              </div>
            </div>
            <div class="w3-row w3-row-padding">
              <div class="w3-col" style="width:33%">
                  <div class="w3-col" style="width:30%">
                    <span>{{texts.lblCustomer}}</span>
                  </div>
                  <div class="w3-col" style="width:70%">
                    <input type="text" v-model="project.customer" disabled class="w3-input w3-border">
                  </div>
              </div>
              <div class="w3-col" style="width:33%">
                <div class="profileSize" :style="{'background-image': 'url(' + project.customerImage + ')', 'background-size': '100% 100%', 'min-height':'50px', 'border':'01px solid' }">
                  <input type="file" class="profileSize" accept="image/*" id="file" ref="file" style="opacity: 0;" disabled />
                </div>
              </div>
            </div>
            <div class="w3-row w3-row-padding">
              <div class="w3-col" style="width:33%">
                <div class="w3-col" style="width:30%">
                  <span>{{texts.lblName}}</span>
                </div>
                <div class="w3-col" style="width:70%">
                  <input type="text" v-model="project.name" disabled class="w3-input w3-border">
                </div>
              </div>
              <div class="w3-col" style="width:33%">
                <div class="w3-col" style="width:30%">
                  <span>{{texts.lblStarted}}</span>
                </div>
                <div class="w3-col" style="width:70%">
                  <datepicker :format="formatDateShort" name="startDate" v-model="project.startDate"
									 v-validate="'required'" input-class="w3-input w3-border" disabled></datepicker>
                </div>
              </div>

              <div class="w3-col" style="width:33%">
                <div class="w3-col" style="width:30%">
                  <span>{{texts.lblEnded}}</span>
                </div>
                <div class="w3-col" style="width:70%">
                  <datepicker :format="formatDateShort" name="endDate" v-model="project.endDate"
									 v-validate="'required'" input-class="w3-input w3-border" disabled></datepicker>
                </div>
              </div>
            </div>
            <div class="w3-row w3-row-padding">
              <div class="w3-col" style="width:33%">
                <div class="w3-col" style="width:30%">
                  <span>{{texts.lblSkipper}}</span>
                </div>
                <div class="w3-col" style="width:51%;margin-right:2%">
                  <input type="text" v-model="project.skipper" class="w3-input w3-border" disabled>
                </div>
                <div class="w3-col" style="width:17%">
                  <div class="profileSize" :style="{'background-image': 'url(' + project.skipperImage + ')', 'background-size': '100% 100%', 'min-height':'50px', 'border':'01px solid' }">
                    <input type="file" class="profileSize" accept="image/*" id="file" ref="file" style="opacity: 0;" disabled />
                  </div>
                </div>
              </div>
              <div class="w3-col" style="width:67%">
                <div class="w3-col" style="width:14%">
                  <span>{{texts.lblCrew}}</span>
                </div>
                <better-input-tag :tags="project.tags" :read-only="true"></better-input-tag>
              </div>
            </div>

            <div class="w3-row w3-row-padding">
              <div class="w3-col" style="width:33%">
                <div class="w3-col" style="width:30%">
                  <span>{{texts.lblRating}}</span>
                </div>
                <div class="w3-col" style="width:70%">
                  <star-rating :read-only="true" v-model="project.ratingStars" :show-rating="false" :star-size="25" :increment="0.5" disabled></star-rating>
                </div>
              </div>
            </div>
            <div class="w3-row w3-row-padding">
              <div class="w3-col" style="width:100%">
                <textarea style="width:100%" v-model="project.ratingText" rows="4" disabled></textarea>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>

    <div id="deletePanel" class="w3-modal">
      <div class="w3-modal-content" style="width:350px">
        <header class="w3-container" style="background-color: #607d8b;color:white">
          <span onclick="document.getElementById('deletePanel').style.display='none'" class="w3-button w3-display-topright">&times;</span>
          <h4>Delete Project</h4>
        </header>
        <div class="w3-container">
          <p>Are you sure, You want to delete ?</p>
        </div>
        <footer class="w3-container" style="background-color: #607d8b;">
          <div class="w3-row w3-row-padding">
            <div class="w3-col" style="width:50%;text-align:left">
              <button type="submit" onclick="document.getElementById('deletePanel').style.display='none'" class="w3-button w3-theme-d3">{{texts.btCancel}}</button>
            </div>
            <div class="w3-col" style="width:50%;text-align:right">
              <button type="submit" class="w3-button w3-theme-d3" @click="onDelete">
                {{texts.btDelete}}
              </button>
            </div>
          </div>        
        </footer>
      </div>
    </div>
    <edit-project :data="data" @onSuccess="onSuccess"></edit-project>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import textLoader from "../../i18n/StaticTextLoader";
import BetterInputTag from "better-vue-input-tag";
import EditProject from "./editProject";
import cloneDeep from "lodash/cloneDeep";
import dateFormatter from "../../i18n/Dateformatter";

export default {
  data() {
    return {
      displayUrl: "",
      customer: this.$cookies.get("EMAIL"),
      projectObj: {
        customer: "",
        skipper: "",
        name: "",
        startDate: "",
        endDate: "",
        ratingStars: 0,
        ratingText: "",
        crews: [],
        tags: [],
        skipperImage: "",
        customerImage: ""
      },
      data: {},
      objectType: "New",
      texts: "",
      projectList: [],
      keyArray: [13, 188]
    };
  },
  mixins: [textLoader, dateFormatter],
  created() {
    const promiseGetText = this.getText(["projects"]);
    promiseGetText.then(texts => {
      this.texts = texts[0];
    });
  },
  computed: {
    role() {
      return this.$store.state.role || this.$cookies.get("ROLES");
    }
  },
  components: {
    "star-rating": StarRating,
    "edit-project": EditProject,
    "better-input-tag": BetterInputTag,
    Datepicker
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    onEditProject(project) {
      this.data = cloneDeep(project);
      document.getElementById("id01").style.display = "block";
    },
    onNewProject() {
      if (this.role == "CUSTOMER") {
        this.projectObj.customer = this.$cookies.get("EMAIL");
      } else if (this.role == "SKIPPER") {
        this.projectObj.skipper = this.$cookies.get("EMAIL");
      }
      this.data = cloneDeep(this.projectObj);
      this.data.role = this.role;
      document.getElementById("id01").style.display = "block";
    },
    onDeletePanel(project) {
      this.data = project;
      document.getElementById("deletePanel").style.display = "block";
    },
    onDelete() {
      let _this = this;
      let options = {
        url: "/eam/api/project/" + this.data.id,
        method: "delete"
      };
      axios(options).then(
        () => {
          this.$toasted.success(_this.texts.msgDelete);
          document.getElementById("deletePanel").style.display = "none";
          this.getProjects();
        },
        err => {
          this.$toasted.error(err);
        }
      );
    },
    onSuccess() {
      this.getProjects();
    },
    getProjects() {
      let _this = this;
      let options = {
        url: "/eam/api/project/self",
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        data: null
      };
      axios(options).then(
        response => {
          _this.projectList = [];
          response.data.map(project => {
            let temp = cloneDeep(_this.projectObj);
            temp.name = project.name;
            temp.ratingStars = project.ratingStars ? project.ratingStars : 0;
            temp.ratingText = project.ratingText ? project.ratingText : "";
            temp.startDate = project.startDate
              ? new Date(project.startDate)
              : null;
            temp.endDate = project.endDate ? new Date(project.endDate) : null;

            temp.customer = project.customer.email;
            temp.customerImage = project.customer.avatarUrl;

            temp.skipper = project.skippers[0].email;
            temp.skipperImage = project.skippers[0].avatarUrl;

            project.crews.map(crew => {
              temp.tags.push(cloneDeep(crew.email));
            });
            temp.id = project.id;
            temp.crews = project.crews;
            _this.projectList.push(cloneDeep(temp));
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
<style scoped>
.profileSize {
  width: 65px !important;
  height: 45px !important;
}
</style>
