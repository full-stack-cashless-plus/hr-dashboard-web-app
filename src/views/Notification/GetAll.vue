<!-- =========================================================================================
  Author: Hazem Ashraf
  Author URL: https://www.linkedin.com/in/hazem-ashraf-1242169b/
========================================================================================== -->

<template>
  <div id="data-list">
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->

        <vs-button class="mb-4 md:mb-0" @click="goToNewMessage()"
          >New message</vs-button
        >
        <!-- <hr />
        <vs-button color="dark" class="mb-4 md:mb-0" @click="openConfirm()" disabled
          ><span style="font-weight: bold; font-size: 13px">-</span> Delete
          selected</vs-button
        > -->
      </div>
      <br />

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

// Store Module
import moduleHrReportManagement from "@/store/get-all-notifications/moduleHrReportManagement.js";

// Cell Renderer
import CellRendererLink from "../hr-report/main-report/cell-renderer/CellRendererLink.vue";
import CellRendererStatus from "../hr-report/main-report/cell-renderer/CellRendererStatus.vue";
// Router to navigate
import router from "@/router";


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
      page: 1,
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
      city: null,
      category: null,
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
          headerName: "Subject",
          field: "Title",
          sortable: true,
          filter: true,
          width: 200,
        },
        {
          headerName: "Message",
          field: "Body",
          sortable: true,
          filter: true,
          width: 500,
        },
        {
          headerName: "Category",
          field: "category",
          sortable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Company",
          field: "company.title",
          sortable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Date",
          field: "Time_Created",
          sortable: true,
          filter: true,
          width: 170,
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus,
      },
    };
  },
  computed: {
    itemsData() {
      //  ////////console.log("hahahahahah : " + this.$store.state.city.items);
      return this.$store.state.notification.items;
    },
    itemsDataTotal() {
      if (this.gridApi) return this.$store.state.notification.total;
    },
    paginationPageSize() {
      return 10;
    },
    totalPages() {
      if (this.gridApi) return this.$store.state.notification.num_of_pages;
      else return 0;
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.page;
        else return 1;
      },
      set(val) {
        this.page = val;
        this.fetchItemsData(val);
        this.gridApi.paginationGoToPage(val - 1);
      },
    },
  },
  methods: {
    // Fetch notification Data
    fetchItemsData(val) {
      this.$store
        .dispatch("notification/fetchItemsNotification", val)
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        });
    },
    goToNewMessage(){
      router.push("/Add/Notification");
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

    // this.$store.dispatch("area/fetchItemsMainReport").then((response) => {
    //   this.$vs.loading.close();
    //   if (response.data.status === 404) {
    //     this.$vs.notify({
    //       title: "Error",
    //       text: "Make sure select the main filters ",
    //       iconPack: "feather",
    //       icon: "icon-alert-circle",
    //       color: "danger",
    //     });
    //   }
    // });
  },
  created() {
    if (!moduleHrReportManagement.isRegistered) {
      this.$store.registerModule("notification", moduleHrReportManagement);
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
