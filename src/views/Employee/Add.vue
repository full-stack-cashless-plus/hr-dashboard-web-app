<!-- =========================================================================================
  Author: Hazem Ashraf
  Author URL: https://www.linkedin.com/in/hazem-ashraf-1242169b/
========================================================================================== -->

<template>
  <div id="data-list">
    <vx-card
      ref="filterCard"
      title="Personal info."
      class="user-list-filters mb-8"
      collapse-action
      refresh-content-action
      @refresh="resetColFilters"
    >
      <form>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>Employee Name</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-user"
              icon-no-border
              v-model="employee_name"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">
              <span class="text-primary">*</span>COMPANY
            </label>
            <v-select
              label="title"
              :options="companies"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="company"
              class="mb-4"
              placeholder="Company"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
                <label class="text-sm opacity-75"
                  ><span class="text-primary">*</span>First Name</label
                >
                <vs-input
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-chevron-right"
                  icon-no-border
                  v-model="first_name"
                />
              </div>
              <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
                <label class="text-sm opacity-75"
                  ><span class="text-primary">*</span>Last Name</label
                >
                <vs-input
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-chevron-right"
                  icon-no-border
                  v-model="last_name"
                />
              </div>
            </div>
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>Employee code</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-hash"
              icon-no-border
              v-model="employee_code"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>National ID</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-chevron-right"
              icon-no-border
              v-model="national_id"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">
              <span class="text-primary">*</span>CATEGORY
            </label>
            <v-select
              label="name"
              :options="categorys"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="category"
              class="mb-4 md:mb-0"
              placeholder="Category"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">Private mob.</label>
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-phone"
              icon-no-border
              v-model="private_mob"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">
              <span class="text-primary">*</span>DEPARTMENT
            </label>
            <v-select
              label="department_name"
              :options="departments"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="department"
              class="mb-4 md:mb-0"
              placeholder="Department"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>Business mob.</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-phone"
              icon-no-border
              v-model="business_mob"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>Job Title</label
            >
            <v-select
              label="title"
              :options="job_titles"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="job_title"
              class="mb-4"
              placeholder="Job Title"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>E-mail</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-mail"
              icon-no-border
              v-model="email"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75 mr-3">
              <span class="text-primary">*</span>Start date
            </label>
            <flat-pickr
              :config="configFromdateTimePicker"
              v-model="start_date"
              icon-pack="feather"
              icon="icon-calendar"
              icon-no-border
              placeholder="Start Date"
              @on-change="onFromChange"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">Serial mob.</label>
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-hash"
              icon-no-border
              v-model="serial_mob"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">
              <span class="text-primary">*</span>Direct manager
            </label>
            <v-select
              label="name"
              :options="managers"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="manager"
              class="mb-4 md:mb-0"
              placeholder="Direct Manager"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
                <label class="text-md opacity-75">Profile photo</label><br />
                <input
                  type="file"
                  id="file"
                  ref="file"
                  @change="onFileChange"
                />
              </div>
              <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
                <img
                  v-if="image != ''"
                  style="width: 100%;height: 100%"
                  :src="image"
                />
              </div>
            </div>
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2"></div>
        </div>

        <br />
        <hr />
        <br />
        <b>Authorization areas.</b>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>City</label
            >
            <v-select
              label="name"
              :options="cities"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="city"
              class="mb-4"
              placeholder="City"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>Area</label
            >
            <v-select
              label="name"
              :options="areas"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="area"
              class="mb-4"
              multiple
              placeholder="Area"
            />
          </div>
        </div>
        <br />
        <hr />
        <br />
        <b>Account security.</b>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>username</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-user"
              icon-no-border
              v-model="username"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2"></div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>password</label
            >
            <vs-input
              class="w-full"
              type="password"
              icon-pack="feather"
              icon="icon-lock"
              icon-no-border
              v-model="password"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2"></div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">confirm password</label>
            <vs-input
              class="w-full"
              type="password"
              icon-pack="feather"
              icon="icon-lock"
              icon-no-border
              v-model="confirm_password"
            />
          </div>
        </div>

        <br />
        <hr />
        <br />
        <div class="vx-row">
          <div class="vx-col md:w-1/3 sm:w-1/3 w-full mb-3">
            <b>Notes</b><br />
            <textarea
              placeholder="write any notes here...!"
              style="outline:none;resize: none;border-radius: 7px;padding: 5px"
              v-model="notes"
              rows="10"
              cols="60"
            >
            </textarea>
          </div>
        </div>
        <hr v-if="showErrors" />
        <h3 v-if="showErrors"><b style="color:red">Errors*</b></h3>
        <br v-if="showErrors" />
        <h5 id="error"></h5>
        <br v-if="showErrors" />

        <vs-button
          :disabled="
            employee_code == null ||
              start_date == null ||
              employee_code == null ||
              national_id == null ||
              business_mob == null ||
              email == null ||
              last_name == null ||
              first_name == null ||
              employee_name == null ||
              password == null ||
              username == null ||
              category == null ||
              company == null ||
              department == null ||
              job_title == null
          "
          type="filled"
          @click="addEmployee()"
          class="mb-2"
          >SUBMIT</vs-button
        >
      </form>
    </vx-card>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import axios from "@/axios.js";
// Store Module
import moduleHrReportManagement from "@/store/hr-report-management/moduleHrReportManagement.js";

export default {
  components: {
    AgGridVue,
    vSelect,
    flatPickr
    // Cell Renderer
  },
  data() {
    return {
      showErrors: false,
      errors_returned: "",
      image: "",
      file: "",
      company: null,
      job_title: null,
      manager: null,
      username: null,
      password: null,
      notes: null,
      confirm_password: null,
      employee_name: null,
      first_name: null,
      last_name: null,
      employee_code: null,
      national_id: null,
      private_mob: null,
      business_mob: null,
      email: null,
      start_date: null,
      serial_mob: null,
      show: false,
      categorys: [
        { name: "Operation" },
        { name: "Staff" },
        { name: "Top management" }
      ],
      companies: [],
      managers: [],
      departments: [],
      department: null,
      cities: [],
      areas: [],
      area_names: [],
      job_titles: [],
      city: null,
      area: [],
      category: null,
      configFromdateTimePicker: {
        allowInput: true,
        minDate: null,
        maxDate: new Date()
      },
      configTodateTimePicker: {
        minDate: null,
        maxDate: new Date()
      },

      searchQuery: "",

      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        resizable: true
      }

      // Cell Renderer Components
    };
  },
  watch: {
    category(obj) {
      this.department = null;
      if (this.company !== null) {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URI}/dashboard/stats/departments/?company_id=${this.company.id}&category=${obj.name}`
          )
          .then(response => {
            this.departments = response.data.data;
          });
      }
    },
    company(obj) {
      if (obj.title.length > 2) {
        var res = obj.title.substring(0, 2);
        var res1 = res.toUpperCase();
        this.employee_code = res1 + "_";
      }

      this.department = null;
      // if(obj !== null) this.categorys = [{ name: "Operation" }, { name: "Staff" }];
      if (this.category !== null) {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URI}/dashboard/stats/departments/?company_id=${obj.id}&category=${this.category.name}`
          )
          .then(response => {
            this.departments = response.data.data;
          });
      }
    },
    department(obj) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URI}/dashboard/job/filter/?department_id=${obj.id}`
        )
        .then(response => {
          this.job_titles = response.data.data;
        });
    },
    city(obj) {
      axios
        .get(
          `https://hrattendence.gs-group.nl/dashboard/area/filter/?city_id=${obj.id}`
        )
        .then(response => {
          this.areas = response.data.data;
        });
    }
  },
  computed: {
    itemsData() {
      return this.$store.state.hrReportManagement.items;
    },
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize();
      else return 10;
    },
    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages();
      else return 0;
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
        else return 1;
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1);
      }
    }
  },
  methods: {
    addEmployee() {
      this.$vs.loading();
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("photo", this.file);
      ////console.log(this.username);
      formData.append("username", this.username);
      ////console.log(this.password);
      formData.append("password", this.password);
      ////console.log(this.employee_name);
      formData.append("name", this.employee_name);
      ////console.log(this.first_name);
      formData.append("first_name", this.first_name);
      ////console.log(this.last_name);
      formData.append("last_name", this.last_name);
      ////console.log(this.email);
      formData.append("email", this.email);
      ////console.log(this.business_mob);
      formData.append("phone", this.business_mob);
      ////console.log(this.private_mob);
      formData.append("PrivatePhone", this.private_mob);
      ////console.log(this.serial_mob);
      formData.append("PhoneSerialNumber", this.serial_mob);
      ////console.log(this.national_id);
      formData.append("national_id", this.national_id);
      ////console.log(this.employee_code);
      formData.append("employee_code", this.employee_code);
      ////console.log(this.start_date);
      formData.append("start_date", this.start_date);
      ////console.log(this.company.id);
      formData.append("company", this.company.id);
      ////console.log(this.notes);
      formData.append("Notes", this.notes);
      ////console.log(this.category.name);
      formData.append("category", this.category.name);
      ////console.log(this.department.id);
      formData.append("department", this.department.id);
      ////console.log(this.job_title.id);
      formData.append("job_id", this.job_title.id);
      ////console.log(this.manager.id);
      formData.append("reporting_to", this.manager.id);

      var areas_id = this.area.map(areass => areass.id);
      var areas_id_sep = areas_id.join();
      ////console.log(areas_id_sep);
      formData.append("auth_areas", areas_id_sep);

      axios
        .post(`${process.env.VUE_APP_BASE_URI}/dashboard/user/`, formData)
        .then(response => {
          this.$vs.loading.close();
          ////console.log(JSON.stringify(response.data));
          if (response.data.code == 200) {
            if( this.showErrors )  this.showErrors = false;
            this.$vs.notify({
              title: "Success",
              text: "Employee is added",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success"
            });
          } else {
            //  alert(JSON.stringify(response.data.data));
            this.showErrors = true;
            var myObj, x;
            myObj = response.data.data;
            document.getElementById("error").innerHTML = "";
            for (x in myObj) {
              if (x != null) {
                //  this.errors_returned += x + " : " + myObj[x] + " <br>";
                // alert(x + " : " + myObj[x]);
                document.getElementById("error").innerHTML +=
                  x + " : " + myObj[x] + "<br>";
              }
            }
            // this.errors_returned = JSON.stringify(response.data.data);
            // this.$vs.notify({
            //   title: "Error",
            //   text:
            //     "Employee is not added.Error: " +
            //     JSON.stringify(response.data.data),
            //   iconPack: "feather",
            //   icon: "icon-alert-circle",
            //   color: "danger"
            // });
          }
        })
        .catch(error => {
          this.$vs.loading.close();
          this.showErrors = true;
          this.errors_returned = JSON.stringify(error.message);
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
        });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = this.$refs.file.files[0];
      this.createImage(files[0]);
    },
    createImage(file) {
    //  var image = new Image();
      ////console.log(image);
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function() {
      this.image = "";
    },

    addNewFilter() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading();
          this.items.category = this.category;
          this.items.city = this.city;

          if (this.items.Absenteeism_Days !== null) {
            this.items.Absenteeism_Days = this.items.Absenteeism_Days.name;
          }
          this.$store
            .dispatch(
              "hrReportManagement/fetchItemsMainReport",
              Object.assign({}, this.items)
            )
            .then(response => {
              this.$vs.loading.close();
              if (response.data.status === 404) {
                this.$vs.notify({
                  title: "Error",
                  text: "Make sure select the main filters ",
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
            })
            .catch(() => {
              this.$vs.loading.close();
              this.$vs.notify({
                title: "Error",
                text: "Make sure select the main filters ",
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger"
              });
            });
        } else {
          // form have errors
        }
      });
    },
    onFromChange(selectedDates, dateStr) {
      this.$set(this.configTodateTimePicker, "minDate", dateStr);
    },
    onToChange(selectedDates, dateStr) {
      this.$set(this.configFromdateTimePicker, "maxDate", dateStr);
    },
    setColumnFilter(column, val) {
      const filter = this.gridApi.getFilterInstance(column);
      let modelObj = null;

      if (val !== "all") {
        modelObj = { type: "equals", filter: val };
      }

      filter.setModel(modelObj);
      this.gridApi.onFilterChanged();
    },
    resetColFilters(card) {
      card.removeRefreshAnimation(500);
      this.items.start_date = this.items.end_date = this.items.category = this.category = this.items.company = this.items.job_title = this.items.employee_name = this.items.employee_code = this.items.reporting_to = this.items.city = this.city = this.items.area = this.items.area_name = this.items.Absenteeism_Days = null;

      // Reset Grid Filter
      // this.gridApi.setFilterModel(null);
      // this.gridApi.onFilterChanged();
      // this.$refs.filterCard.removeRefreshAnimation();
    },
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
    },
    convertBool(val) {
      return val === true ? "1" : "all";
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;

    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(
        ".ag-header-container"
      );
      header.style.left =
        "-" + String(Number(header.style.transform.slice(11, -3)) + 9) + "px";
    }
    axios
      .get(`https://hrattendence.gs-group.nl/dashboard/city/filter/`)
      .then(response => {
        this.cities = response.data.data;
      });

    axios
      .get(`${process.env.VUE_APP_BASE_URI}/dashboard/company/`)
      .then(response => {
        this.companies = response.data.data;
      });

    axios
      .get(`https://hrattendence.gs-group.nl/dashboard/user/reporting_to/`)
      .then(response => {
        this.managers = response.data.data;
        // ////console.log(JSON.stringify(this.managers));
      });
  },
  created() {
    if (!moduleHrReportManagement.isRegistered) {
      this.$store.registerModule(
        "hrReportManagement",
        moduleHrReportManagement
      );
      moduleHrReportManagement.isRegistered = true;
    }
    // this.$store.dispatch("hrReportManagement/fetchItemsMainReport").catch(err => {
    //   console.error(err);
    // });
  }
};
</script>
<style scoped>
textarea:focus,
input:focus {
  outline: none;
  border: 1.5px solid #ff751a;
}
</style>
<style lang="scss">
#data-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}

[dir="rtl"] .ag-theme-material .ag-rtl {
  text-align: right;
}
[dir="rtl"] .ag-rtl {
  direction: rtl;
}
</style>
