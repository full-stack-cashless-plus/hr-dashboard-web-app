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
            <!-- {{department}} -->
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
            <label class="text-sm opacity-75">
              <span class="text-primary">*</span>status
            </label>
            <v-select
              :options="statuses"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="status"
              class="mb-4 md:mb-0"
              placeholder="Status"
            />
          </div>
          <div
            v-if="status == 'Terminated' || status == 'Resigned'"
            class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2"
          >
            <label class="text-sm opacity-75 mr-3">
              <span class="text-primary">*</span>Leave date
            </label>
            <flat-pickr
              :config="configTodateTimePicker"
              v-model="leave_date"
              icon-pack="feather"
              icon="icon-calendar"
              icon-no-border
              placeholder="Leave Date"
              @on-change="onToChange"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
                <label class="text-md opacity-75">Profile photo : </label><br />
                <a v-bind:href="prevPhoto">show photo</a>
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
              ><span class="text-primary">*</span>Areas</label
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
        <!-- {{ area }} -->

        <br />
        <hr />
        <br />

        <b>Vacations.</b>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span
              >user_planned_vacation_days</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-hash"
              icon-no-border
              type="number"
              v-model="user_planned_vacation_days"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span
              >user_remaining_planned_days</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-hash"
              icon-no-border
              type="number"
              v-model="user_remaining_planned_days"
              disabled
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span
              >user_casual_vacation_days</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-hash"
              icon-no-border
              type="number"
              v-model="user_casual_vacation_days"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span
              >user_remaining_casual_days</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-hash"
              icon-no-border
              type="number"
              v-model="user_remaining_casual_days"
              disabled
            />
    
          </div>
        </div>
        <!-- {{ area }} -->

        <br />
        <hr />
        <br />

        <b>Mobile.</b>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>fcm_device_id</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-hash"
              icon-no-border
              v-model="fcm_device_id"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>fcm_device_type</label
            >
            <v-select
              :options="fcm_device_types"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="fcm_device_type"
              class="mb-4"
              placeholder="FCM Device Type"
            />
          </div>
        </div>
        <!-- {{ area }} -->
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
              category == null ||
              company == null ||
              department == null ||
              job_title == null
          "
          type="filled"
          @click="updateEmployee()"
          class="mb-2"
          >SUBMIT</vs-button
        >
      </form>

      <form>
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
              ><span class="text-primary">*</span>New password</label
            >
            <vs-input
              class="w-full"
              type="password"
              icon-pack="feather"
              icon="icon-lock"
              icon-no-border
              v-model="newPassword"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2"></div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">Confirm new password</label>
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

        <vs-button
          :disabled="password == null || username == null"
          type="filled"
          @click="changePassword()"
          class="mb-2"
          >Change Password</vs-button
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
      image: "",
      file: "",
      prevPhoto: null,
      fcm_device_id: null,
      fcm_device_type: null,
      fcm_device_types: ["android", "ios"],
      statuses: ["Active", "Terminated", "Resigned"],
      user_planned_vacation_days: null,
      user_casual_vacation_days: null,
      user_remaining_planned_days: null,
      user_remaining_casual_days: null,
      status: null,
      company: null,
      job_title: null,
      manager: null,
      username: null,
      password: null,
      notes: null,
      confirm_password: null,
      newPassword: null,
      employee_name: null,
      first_name: null,
      last_name: null,
      employee_code: null,
      national_id: null,
      private_mob: null,
      business_mob: null,
      email: null,
      start_date: null,
      leave_date: null,
      serial_mob: null,
      show: false,
      categorys: [{ name: "Operation" }, { name: "Staff" }],
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
        minDate: this.start_date,
        maxDate: null
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
      //  this.department = null;
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
      // if (obj.title.length > 2) {
      //   var res = obj.title.substring(0, 2);
      //   var res1 = res.toUpperCase();
      //   this.employee_code = res1 + "_";
      // }

      // this.department = null;
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
    updateEmployee() {
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
      ////console.log(this.leave_date);
      formData.append("leave_date", this.leave_date);
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

      formData.append("reason_for_leave", this.status);
      formData.append("fcm_device_id", this.fcm_device_id);
      formData.append("fcm_device_type", this.fcm_device_type);

      formData.append("user_planned_vacation_days", this.user_planned_vacation_days);
      formData.append("user_casual_vacation_days", this.user_casual_vacation_days);
      axios
        .post(
          `${process.env.VUE_APP_BASE_URI}/dashboard/user/${this.$route.query.SID}/update/`,
          formData
        )
        .then(response => {
          this.$vs.loading.close();
          ////console.log(JSON.stringify(response.data));
          if (response.data.code == 200) {
            this.$vs.notify({
              title: "Success",
              text: "Employee is updated",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success"
            });
          } else {
            this.$vs.notify({
              title: "Error",
              text:
                "Employee is not updated.Error: " +
                JSON.stringify(response.data.data),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          }
        })
        .catch(error => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
        });
    },
    changePassword() {
      let formData = new FormData();
      formData.append("new_password", this.newPassword);

      axios
        .post(
          `${process.env.VUE_APP_BASE_URI}/dashboard/user/${this.$route.query.SID}/change_password/`,
          formData
        )
        .then(response => {
          this.$vs.loading.close();
          ////console.log(JSON.stringify(response.data));
          if (response.data.code == 200) {
            this.$vs.notify({
              title: "Success",
              text: "password has changed successfully",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success"
            });
          } else {
            this.$vs.notify({
              title: "Error",
              text:
                "password has not changed.Error: " +
                JSON.stringify(response.data.data),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          }
        })
        .catch(error => {
          this.$vs.loading.close();
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
      .get(
        `${process.env.VUE_APP_BASE_URI}/dashboard/user/${this.$route.query.SID}/`
      )
      .then(response => {
        this.employee_name = response.data.data.name;
        this.first_name = response.data.data.first_name;
        this.last_name = response.data.data.last_name;
        this.business_mob = response.data.data.phone;
        this.private_mob = response.data.data.PrivatePhone;
        this.national_id = response.data.data.national_id;
        this.email = response.data.data.email;
        this.serial_mob = response.data.data.PhoneSerialNumber;
        this.company = response.data.data.company;
        this.employee_code = response.data.data.employee_code;
        this.category = response.data.data.category;
        // alert(JSON.stringify(response.data.data.department));
        this.department = response.data.data.department;
        // alert(JSON.stringify(this.department));
        this.job_title = response.data.data.job_title;
        this.start_date = response.data.data.start_date;
        this.manager = response.data.data.direct_manager;
        this.prevPhoto =
          "https://hrattendence.gs-group.nl/" + response.data.data.photo;
        this.status = response.data.data.status;
        // alert(response.data.data.leave_date);
        this.leave_date = response.data.data.leave_date;
        //  alert(this.leave_date);
        this.area = response.data.data.auth_areas;
        // alert(response.data.data.username);
        this.username = response.data.data.username;
        this.notes = response.data.data.Notes;
        this.fcm_device_type = response.data.data.fcm_device_type;
        this.fcm_device_id = response.data.data.fcm_device_id;

        this.user_planned_vacation_days = response.data.data.user_planned_vacation_days;
        this.user_casual_vacation_days = response.data.data.user_casual_vacation_days;
        this.user_remaining_planned_days = response.data.data.user_remaining_planned_days;
        this.user_remaining_casual_days = response.data.data.user_remaining_casual_days;
      });

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
