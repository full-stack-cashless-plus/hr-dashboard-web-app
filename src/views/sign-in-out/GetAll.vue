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
              v-model="start_date"
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
              v-model="end_date"
              placeholder="To Date"
              @on-change="onToChange"
            />
          </div>

           <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2">
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
           <div class="vx-col md:w-1/4 sm:w-1/2 w-full mb-2">
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
              placeholder="Area"
            />
          </div>
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mt-6">
            <div class="vx-col md:w-1/2 sm:w-1/1 w-full">
              <vs-button
                type="filled"
                @click="fetchItemsData(1)"
                class="w-full mb-2"
                >Filter</vs-button
              >
            </div>
          </div>
        </div>
      </form>
    </vx-card>
    <div class="vx-card p-6 vs-con-loading__container" id="div-with-loading">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
           <div class="flex-grow">
          <button class="vs-con-dropdown cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2">
                {{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }}
                to
                {{ currentPage * paginationPageSize }}
                of {{ itemsDataTotal }}
              </span>
            </div>
          </button>
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
import moduleHrReportManagement from "@/store/sign-in-out/moduleHrReportManagement.js";

// Cell Renderer
import CellRendererLink from "../hr-report/main-report/cell-renderer/CellRendererLink.vue";
import CellRendererStatus from "../hr-report/main-report/cell-renderer/CellRendererStatus.vue";

export default {
  components: {
    AgGridVue,
    vSelect,
    flatPickr,
    // Cell Renderer
    CellRendererLink,
    CellRendererStatus
  },
  data() {
    return {
      page: 1,
      start_date: "",
      end_date: "",
      show: false,
      categorys: [{ name: "Operation" }, { name: "Staff" }],
      companies: [
        { name: "Aman" },
        { name: "Cashless" },
        { name: "Go Plus" },
        { name: "WeFlyPlus" }
      ],
      absenteeismDays: [{ name: 0 }, { name: 1 }, { name: "All" }],
      cities: [],
      areas: [],
      area: null,
      area_names: [],
      job_titles: [],
      allDepartments: [],
      city: null,
      company: null,
      category: null,
      department: null,
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
          headerName: "User",
          field: "user",
          width: 350
        },
        {
          headerName: "Area",
          field: "area",
          width: 250
        },
        {
          headerName: "SignIn time",
          field: "signin_time",
          width: 200
        },
        {
          headerName: "SignOut time",
          field: "signout_time",
          width: 200
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus
      }
    };
  },
  watch: {
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
      return this.$store.state.sign_in_out.items;
    },
    itemsDataTotal() {
      if (this.gridApi) return this.$store.state.sign_in_out.total;
    },
    paginationPageSize() {
      return 10;
    },
    totalPages() {
      if (this.gridApi) return this.$store.state.sign_in_out.num_of_pages;
      else return 0;
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.page;
        else return 1;
      },
      set(val) {
        this.fetchItemsData(val);
        this.gridApi.paginationGoToPage(val - 1);
      }
    }
  },
  methods: {
    fetchItemsData(val) {
      var areaId;
      if(this.area !== null)  areaId = this.area.id;
      else areaId = '';
      let params = {
        page: val,
        from: this.start_date,
        to: this.end_date,
        area_id: areaId
      };

      this.$store
        .dispatch("sign_in_out/fetchItems", Object.assign({}, params))
        .then(response => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (response.data.data.length === 0) {
            this.$vs.notify({
              title: "Information",
              text: "No data available",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success"
            });
          } else if (response.data.status === 404) {
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
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          this.$vs.notify({
            title: "Error",
            text: "Make sure select the main filters ",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
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
  },
  created() {
    if (!moduleHrReportManagement.isRegistered) {
      this.$store.registerModule("sign_in_out", moduleHrReportManagement);
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
