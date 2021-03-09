<!-- =========================================================================================
  Author: Hossam Ali
  Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
========================================================================================== -->

<template>
  <div id="data-list">
    <vx-card
      ref="filterCard"
      title="Filters"
      class="user-list-filters mb-8"
      collapse-action
      refresh-content-action
      @refresh="resetColFilters"
    >
      <form>
        <div class="vx-row">
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75 mr-3">
              <span class="text-primary">*</span>From
            </label>
            <flat-pickr
              :config="configFromdateTimePicker"
              v-model="items.start_date"
              placeholder="From Date"
              @on-change="onFromChange"
            />
          </div>

          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75 mr-3">
              <span class="text-primary">*</span>To
            </label>
            <flat-pickr
              :config="configTodateTimePicker"
              v-model="items.end_date"
              placeholder="To Date"
              @on-change="onToChange"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">
              <span class="text-primary">*</span>Category
            </label>
            <v-select
              label="name"
              :reduce="(name) => name"
              :options="categorys"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="category"
              class="mb-4 md:mb-0"
              placeholder="Category"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">
              <span class="text-primary">*</span>Company
            </label>
            <v-select
              label="name"
              :reduce="(name) => name"
              :options="companies"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="company"
              class="mb-4"
              placeholder="Company"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2" v-if="show">
            <label class="text-sm opacity-75">Departments</label>
            <v-select
              :options="allDepartments"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="department"
              class="mb-4"
              placeholder="Departments"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2" v-if="show">
            <label class="text-sm opacity-75">Job Title</label>
            <v-select
              :options="job_titles"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="items.job_title"
              class="mb-4"
              placeholder="Job Title"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2" v-if="show">
            <label class="text-sm opacity-75">Employee Name</label>
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-user"
              icon-no-border
              v-model="items.employee_name"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2" v-if="show">
            <label class="text-sm opacity-75">Employee Code</label>
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-hash"
              icon-no-border
              v-model="items.employee_code"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2" v-if="show">
            <label class="text-sm opacity-75">Reporting To</label>
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-user"
              icon-no-border
              v-model="items.reporting_to"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2" v-if="show">
            <label class="text-sm opacity-75">City</label>
            <v-select
              :options="cities"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="city"
              class="mb-4"
              placeholder="City"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2" v-if="show">
            <label class="text-sm opacity-75">Area</label>
            <v-select
              :options="areas"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="items.area"
              class="mb-4"
              placeholder="Area"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2" v-if="show">
            <label class="text-sm opacity-75">Authorization Area Name</label>
            <v-select
              :options="area_names"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="items.area_name"
              class="mb-4"
              placeholder="Authorization Area Name"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2" v-if="show">
            <label class="text-sm opacity-75">Absenteeism Days</label>
            <v-select
              label="name"
              :reduce="(name) => name"
              :options="absenteeismDays"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="items.Absenteeism_Days"
              class="mb-4"
              placeholder="Absenteeism Days"
            />
          </div>

          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mt-6">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 sm:w-1/1 w-full">
                <vs-button
                  type="filled"
                  @click.prevent="addNewFilter"
                  class="w-full mb-2"
                  >Filters</vs-button
                >
              </div>
              <div class="vx-col md:w-1/2 sm:w-1/1 w-full">
                <vs-button
                  color="dark"
                  type="filled"
                  @click="show = !show"
                  class="w-full mb-2"
                >
                  Advanced Filters</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </form>
    </vx-card>
    <div class="vx-card p-6 vs-con-loading__container" id="div-with-loading">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2">
                {{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }}
                -
                {{
                  itemsData.length - currentPage * paginationPageSize > 0
                    ? currentPage * paginationPageSize
                    : itemsData.length
                }}
                From {{ itemsData.length }}
              </span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(40)">
                <span>40</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                <span>50</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <vs-input
          class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4"
          v-model="searchQuery"
          @input="updateSearchQuery"
          placeholder="Search..."
        />
        <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()"
          >Export CSV</vs-button
        >
      </div>

      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="itemsData"
        rowSelection="multiple"
        :animateRows="true"
        :floatingFilter="false"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
      ></ag-grid-vue>

      <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
    </div>
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

// Cell Renderer
import CellRendererLink from "./cell-renderer/CellRendererLink.vue";
import CellRendererStatus from "./cell-renderer/CellRendererStatus.vue";

export default {
  components: {
    AgGridVue,
    vSelect,
    flatPickr,
    // Cell Renderer
    CellRendererLink,
    CellRendererStatus,
  },
  data() {
    return {
      show: false,
      categorys: [{ name: "Operation" }, { name: "Staff" }],
      companies: [
        { name: "Aman" },
        { name: "Cashless" },
        { name: "Go Plus" },
        { name: "WeFlyPlus" },
      ],
      absenteeismDays: [{ name: 0 }, { name: 1 }, { name: "All" }],
      cities: [],
      areas: [],
      area_names: [],
      job_titles: [],
      allDepartments: [],
      city: null,
      company: null,
      category: null,
      department: null,
      items: {
        start_date: null,
        end_date: null,
        category: null,
        company: null,
        department: null,
        job_title: null,
        employee_name: null,
        employee_code: null,
        reporting_to: null,
        city: null,
        area: null,
        area_name: null,
        Absenteeism_Days: null,
      },
      configFromdateTimePicker: {
        allowInput: true,
        minDate: null,
        maxDate: new Date(),
      },
      configTodateTimePicker: {
        minDate: null,
        maxDate: new Date(),
      },

      searchQuery: "",

      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        resizable: true,
      },
      columnDefs: [
        {
          headerName: "Record Date",
          field: "Record_Date",
          width: 250,
        },
        {
          headerName: "Employee Name",
          field: "Employee_Name",
          width: 250,
        },
        {
          headerName: "Code",
          field: "Code",
          width: 150,
        },
        {
          headerName: "job title",
          field: "job_title",
          width: 175,
        },

        {
          headerName: "Category",
          field: "Category",
          width: 150,
        },
        {
          headerName: "Company",
          field: "Company",
          width: 150,
        },
        {
          headerName: "Start Date",
          field: "Start_date",
          width: 150,
        },
        {
          headerName: "End Date",
          field: "End_date",
          width: 150,
        },
        {
          headerName: "Reporting To Level 1",
          field: "Reporting_To_Level_1",
          width: 225,
        },
        {
          headerName: "Reporting To Level 2",
          field: "Reporting_To_Level_2",
          width: 225,
        },
        {
          headerName: "Reporting To Level 3",
          field: "Reporting_To_Level_3",
          width: 225,
        },
        {
          headerName: "Reporting To Level 4",
          field: "Reporting_To_Level_4",
          width: 225,
        },
        {
          headerName: "Reporting To Level 5",
          field: "Reporting_To_Level_5",
          width: 225,
        },
        {
          headerName: "City",
          field: "city",
          width: 200,
        },
        {
          headerName: "Area",
          field: "area",
          width: 200,
        },
        {
          headerName: "Department",
          field: "Department",
          width: 200,
        },

        {
          headerName: "Authorization Area Name",
          field: "area_name",
          width: 225,
        },
        {
          headerName: "check_in_date_time",
          field: "check_in_date_time",
          width: 175,
        },
        {
          headerName: "check_out_date_time",
          field: "check_out_date_time",
          width: 200,
        },
        {
          headerName: "total_working_time",
          field: "total_working_time",
          width: 200,
        },
        {
          headerName: "total_latency_in_hours",
          field: "total_latency_in_hours",
          width: 200,
        },
        {
          headerName: "total_latency_in_minutes",
          field: "total_latency_in_minutes",
          width: 225,
        },
        {
          headerName: "total_over_time_in_hours",
          field: "total_over_time_in_hours",
          width: 225,
        },
        {
          headerName: "total_over_time_in_minutes",
          field: "total_over_time_in_minutes",
          width: 225,
        },
        {
          headerName: "Absenteeism Days",
          field: "Absenteeism_Days",
          width: 175,
        },
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus,
      },
    };
  },
  watch: {
    city(obj) {
      this.items.area = this.items.area_name = null;
      axios
        .get(
          `${process.env.VUE_APP_BASE_URI}/dashboard/main_report/city/areas?city=${obj}`
        )
        .then((response) => {
          this.areas = this.area_names = response.data.data;
        });
    },
    category(obj) {
      this.department = null;
      this.items.job_title = null;
      if (this.company !== null) {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URI}/dashboard/main_report/departments/?company=${this.company.name}&category=${obj.name}`
          )
          .then((response) => {
            this.allDepartments = response.data.data;
          });
      }
    },
    company(obj) {
      this.department = null;
      this.items.job_title = null;
      if (this.category !== null) {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URI}/dashboard/main_report/departments/?category=${this.category.name}&company=${obj.name}`
          )
          .then((response) => {
            this.allDepartments = response.data.data;
          });
      }
    },
    department(obj) {
      this.items.job_title = null;
      if (this.company !== null && this.items.category !== null) {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URI}/dashboard/main_report/department/jobs?category=${this.category.name}&company=${this.company.name}&department=${obj}`
          )
          .then((response) => {
            this.job_titles = response.data.data;
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
      },
    },
  },
  methods: {
    addNewFilter() {
      this.$validator.validateAll().then((result) => {
       
        if (result) {
          this.$vs.loading({
            container: "#div-with-loading",
            scale: 0.6,
          });
          this.items.company = this.company;
          this.items.category = this.category;
          this.items.department = this.department;
          this.items.city = this.city;

          if (this.items.Absenteeism_Days !== null) {
            this.items.Absenteeism_Days = this.items.Absenteeism_Days.name;
          }
          this.$store
            .dispatch(
              "hrReportManagement/fetchItemsMainReport",
              Object.assign({}, this.items)
            )
            .then((response) => {
              this.$vs.loading.close("#div-with-loading > .con-vs-loading");
              if (response.data.data.length === 0) {
                this.$vs.notify({
                  title: "Information",
                  text: "No data available",
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success",
                });
              } else if (response.data.status === 404) {
                this.$vs.notify({
                  title: "Error",
                  text: "Make sure select the main filters ",
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger",
                });
              }
            })
            .catch(() => {
              this.$vs.loading.close("#div-with-loading > .con-vs-loading");
              this.$vs.notify({
                title: "Error",
                text: "Make sure select the main filters ",
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
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
    resetColFilters(card) {
      card.removeRefreshAnimation(500);
      this.items.start_date = this.items.end_date = this.category = this.company = this.items.job_title = this.items.employee_name = this.items.employee_code = this.items.reporting_to = this.items.city = this.city = this.items.area = this.items.area_name = this.items.Absenteeism_Days = null;

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
    },
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
      .get(`${process.env.VUE_APP_BASE_URI}/dashboard/main_report/cities`)
      .then((response) => {
        this.cities = response.data.data;
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
  },
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
