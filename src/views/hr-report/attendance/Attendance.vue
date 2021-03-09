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
      actionButtons
      @refresh="resetColFilters"
      @remove="resetColFilters"
    >
      <form>
        <div class="vx-row">
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
            <label class="text-sm opacity-75 mr-3">From</label>
            <flat-pickr
              :config="configFromdateTimePicker"
              v-model="items.start_date_ms"
              placeholder="From Date"
              @on-change="onFromChange"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
            <label class="text-sm opacity-75 mr-3">To</label>
            <flat-pickr
              :config="configTodateTimePicker"
              v-model="items.end_date_ms"
              placeholder="To Date"
              @on-change="onToChange"
            />
          </div>
          <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
            <vs-button
              type="filled"
              @click.prevent="addNewUser"
              class=" mb-2"
              >Filters</vs-button
            >
          </div>
        </div>
      </form>
    </vx-card>
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }}
                -
                {{
                  itemsData.length - currentPage * paginationPageSize > 0
                    ? currentPage * paginationPageSize
                    : itemsData.length
                }}
                From {{ itemsData.length }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
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
        <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">
          Export CSV</vs-button
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
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="false"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
      >
      </ag-grid-vue>

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
    CellRendererStatus
  },
  data() {
    return {

      configFromdateTimePicker: {
        minDate: null,
        maxDate: new Date()
      },
      configTodateTimePicker: {
        minDate: null,
        maxDate: new Date()
      },
      items: {
        start_date_ms: new Date(),
        end_date_ms: new Date()
      },
      searchQuery: "",

      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: false,
        resizable: false,
        suppressMenu: false
      },
      columnDefs: [
        {
          headerName: "PersonnalNumber",
          field: "PersonnalNumber",
          width: 175
        },
        {
          headerName: "Transaction Date",
          field: "Transaction Date",
          width: 200
        },
        {
          headerName: "Type",
          field: "Type",
          width: 125
        },
        {
          headerName: "Start Time",
          field: "date",
          width: 150
        },
        {
          headerName: "End Time",
          field: "End Time",
          width: 150
        },
        {
          headerName: "Category",
          field: "Category",
          width: 150
        },
        {
          headerName: "Job Identification",
          field: "Job Identification",
          width: 150
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus
      }
    };
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
    addNewUser() {
      // ////console.log(this.items);
      this.$validator.validateAll().then(result => {
        if (result) {
          // ////console.log(this.items);

          this.$store.dispatch(
            "hrReportManagement/fetchItemsAttendance",
            Object.assign({},  this.items)
          );
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
    resetColFilters() {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null);
      this.gridApi.onFilterChanged();

      this.$refs.filterCard.removeRefreshAnimation();
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
  },
  created() {
    if (!moduleHrReportManagement.isRegistered) {
      this.$store.registerModule(
        "hrReportManagement",
        moduleHrReportManagement
      );
      moduleHrReportManagement.isRegistered = true;
    }
    // this.$store.dispatch("hrReportManagement/fetchItemsAttendance").catch(err => {
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
