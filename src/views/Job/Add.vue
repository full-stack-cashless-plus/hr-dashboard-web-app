<!-- =========================================================================================
  Author: Hazem Ashraf
  Author URL: https://www.linkedin.com/in/hazem-ashraf-1242169b/
========================================================================================== -->

<template>
  <div id="data-list">
    <vx-card
      ref="filterCard"
      title="Adding new job"
      class="user-list-filters mb-8"
      collapse-action
      refresh-content-action
      @refresh="resetColFilters"
    >
      <form>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
                
          <label class="text-sm opacity-75">
            <span class="text-primary">*</span>COMPANY
            </label>
            <v-select
              label="title"
              :reduce="name => name"
              :options="companies"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="company"
              class="mb-4"
              placeholder="Company"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
     <label class="text-sm opacity-75">
              <span class="text-primary">*</span>CATEGORY
            </label>
            <v-select
              label="name"
              :reduce="name => name"
              :options="categorys"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="category"
              class="mb-4 md:mb-0"
              placeholder="Category"
            />

      

    
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
          <label class="text-sm opacity-75">
              <span class="text-primary">*</span>DEPARTMENT
            </label>
            <v-select
              label="department_name"
              :reduce="name => name"
              :options="departments"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="department"
              class="mb-4 md:mb-0"
              multiple
              placeholder="Department"
            />

          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2">
                  <label class="text-sm opacity-75"
              ><span class="text-primary">*</span>JOB NAME</label
            >
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-layers"
              icon-no-border
              v-model="job_name"
              placeholder="Information Technology,Financial..etc"
            />
          </div>
        </div>
        <!-- {{department}}
        {{ category}} -->
        <vs-button
          :disabled="category == null ||  job_name == null || department == null"
          type="filled"
          @click="addJob()"
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
      departments: [],
      department: [],
      job_name: null,
      company: { id: null, title: null },
      // company_id: this.company.id,
      //  company: this.companies.filter(companyy => {return companyy.title == this.company?companyy.id:null}),
      company_code: null,
      employee: {
        company: null,
        job_title: null
      },
      show: false,
      categorys: [],
      companies: [],
      absenteeismDays: [{ name: 0 }, { name: 1 }, { name: "All" }],
      cities: [],
      areas: [],
      area_names: [],
      job_titles: [],
      city: null,
      category: null,
      items: {
        start_date: null,
        end_date: null,
        category: null,
        company: null,
        job_title: null,
        employee_name: null,
        employee_code: null,
        reporting_to: null,
        city: null,
        area: null,
        area_name: null,
        Absenteeism_Days: null
      },
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
      },
      columnDefs: [
        {
          headerName: "Record Date",
          field: "Record_Date",
          width: 250
        },
        {
          headerName: "Employee Name",
          field: "Employee_Name",
          width: 250
        },
        {
          headerName: "Code",
          field: "Code",
          width: 150
        },
        {
          headerName: "job title",
          field: "job_title",
          width: 175
        },

        {
          headerName: "Category",
          field: "Category",
          width: 150
        },
        {
          headerName: "Company",
          field: "Company",
          width: 150
        },
        {
          headerName: "Start Date",
          field: "Start_date",
          width: 150
        },
        {
          headerName: "End Date",
          field: "End_date",
          width: 150
        },
        {
          headerName: "Reporting To Level 1",
          field: "Reporting_To_Level_1",
          width: 225
        },
        {
          headerName: "Reporting To Level 2",
          field: "Reporting_To_Level_2",
          width: 225
        },
        {
          headerName: "Reporting To Level 3",
          field: "Reporting_To_Level_3",
          width: 225
        },
        {
          headerName: "Reporting To Level 4",
          field: "Reporting_To_Level_4",
          width: 225
        },
        {
          headerName: "Reporting To Level 5",
          field: "Reporting_To_Level_5",
          width: 225
        },
        {
          headerName: "City",
          field: "city",
          width: 200
        },
        {
          headerName: "Area",
          field: "area",
          width: 200
        },
        {
          headerName: "Department",
          field: "Department",
          width: 200
        },

        {
          headerName: "Authorization Area Name",
          field: "area_name",
          width: 225
        },
        {
          headerName: "check_in_date_time",
          field: "check_in_date_time",
          width: 175
        },
        {
          headerName: "check_out_date_time",
          field: "check_out_date_time",
          width: 200
        },
        {
          headerName: "total_working_time",
          field: "total_working_time",
          width: 200
        },
        {
          headerName: "total_latency_in_hours",
          field: "total_latency_in_hours",
          width: 200
        },
        {
          headerName: "total_latency_in_minutes",
          field: "total_latency_in_minutes",
          width: 225
        },
        {
          headerName: "total_over_time_in_hours",
          field: "total_over_time_in_hours",
          width: 225
        },
        {
          headerName: "total_over_time_in_minutes",
          field: "total_over_time_in_minutes",
          width: 225
        },
        {
          headerName: "Absenteeism Days",
          field: "Absenteeism_Days",
          width: 175
        }
      ]

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
      this.department = null;
      if(obj !== null) this.categorys = [{ name: "Operation" }, { name: "Staff" }];
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
    addJob() {
      this.$vs.loading();
      const formData = new FormData();
     
      var isStaff = (this.category.name === 'Staff');
      var isTopManagment = (this.category.name === 'TopManagment');
      formData.append("is_staff", isStaff);
       formData.append("is_TopManagment", isTopManagment);
      formData.append("title", this.job_name);
      var depts_id = this.department.map(depts=>depts.id);
      var depts_id_sep = depts_id.join();
      formData.append("departments", depts_id_sep);

      //////console.log('jobTitle : ' + this.job_name);
      //////console.log('is_staff : ' + isStaff);
      //////console.log('is_TopManagment : ' + isTopManagment);
      //////console.log('departments : ' + depts_id_sep);

      axios
        .post(`${process.env.VUE_APP_BASE_URI}/dashboard/job/`, formData)
        .then(response => {
          this.$vs.loading.close();
          if (response.status !== 200) {
            this.$vs.notify({
              title: "Error",
              text: "Job is not added",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          } else {
            this.$vs.notify({
              title: "Success",
              text: "Job is added",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success"
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
      .get(`${process.env.VUE_APP_BASE_URI}/dashboard/company/`)
      .then(response => {
        //////console.log(response.data.data[0].title);
        this.companies = response.data.data;
      });

    // axios
    //   .get(`${process.env.VUE_APP_BASE_URI}/dashboard/department/`)
    //   .then(response => {
    //   //  //////console.log(response.data.data[0].department_name);
    //     this.departments = response.data.data;
       
    //   });
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
