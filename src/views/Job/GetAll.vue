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

        <vs-button class="mb-4 md:mb-0" @click="goToAddJob()"
          ><span style="font-weight: bold; font-size: 13px">+</span> Add
          job</vs-button
        >
        <hr />
        <vs-button color="dark" class="mb-4 md:mb-0" @click="openConfirm()"
          ><span style="font-weight: bold; font-size: 13px">-</span> Delete
          selected</vs-button
        >
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
        @row-double-clicked="onRowDoubleClicked"
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
import moduleHrReportManagement from "@/store/get-all-jobs/moduleHrReportManagement.js";

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
          headerName: "ID",
          field: "id",
          sortable: true,
          filter: true,
          checkboxSelection: true,
          width: 200,
        },
        {
          headerName: "NAME",
          field: "title",
          sortable: true,
          filter: true,
          width: 200,
        },
        {
          headerName: "Department",
          cellRenderer: function (params) {
            return JSON.stringify(
              params.data.departments_list.map(
                (departments) => departments.department_name
              )
            );
          },
          sortable: true,
          filter: true,
          width: 500,
        },
        {
          headerName: "COMPANY",
          cellRenderer: function (params) {
            return JSON.stringify(
              params.data.departments_list.map(
                (departments) => departments.comapny_info.company_title
              )
            );
          },
          sortable: true,
          filter: true,
          width: 200,
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
      axios
        .get(
          `${process.env.VUE_APP_BASE_URI}/dashboard/main_report/category/jobs?category=${obj.name}`
        )
        .then((response) => {
          this.job_titles = response.data.data;
        });
    },
  },
  computed: {
    itemsData() {
      return this.$store.state.job.items;
    },
    itemsDataTotal() {
      return this.$store.state.job.total;
    },
    paginationPageSize() {
      return 10;
    },
    totalPages() {
      if (this.gridApi) return this.$store.state.job.num_of_pages;
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
    // Fetch job Data
    fetchItemsData(val) {
      this.$store.dispatch("job/fetchItemsMainReport", val).catch((err) => {
        this.$vs.notify({
          title: "Error",
          text: err,
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "danger",
        });
      });
    },
    openConfirm() {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData.map(
        (node) => node.title
      );
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text:
          "Are you sure to delete this : (" +
          selectedDataStringPresentation +
          ") with it's related data?",
        accept: this.goToDeleteJob,
      });
    },
    goToAddJob() {
      router.push("/Add/Job");
    },
    goToDeleteJob() {
      this.$vs.loading();
      const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData.map(
        (node) => node.id
      );
      // .map(node => node.make + " " + node.model)
      // .join(", ");
      // alert(selectedDataStringPresentation);
      let upData = new FormData();
      upData.append("jobs_ids", selectedDataStringPresentation);
      axios
        .delete(
          `${process.env.VUE_APP_BASE_URI}/dashboard/job/delete/`,
          { data: upData }
        )
        .then(response => {
          this.$vs.loading.close();
          if (response.data.code === 200) {
            this.onRemoveSelected();
            this.$vs.notify({
              title: "success",
              text: response.data.data,
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success"
            });
          } else {
            this.$vs.notify({
              title: "Error",
              text: response.data.data,
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          }
          // document.location.reload();
        })
        .catch(() => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Error",
            text: "Can't delete this job",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        });
    },
      onRemoveSelected() {
      var selectedData = this.gridApi.getSelectedRows();
      //alert(JSON.stringify(selectedData));
      this.gridApi.applyTransaction({ remove: selectedData });

      //  printResult(res);
    },
    onRowDoubleClicked(event) {
      ////////console.log('row data clicked is: ', JSON.stringify(event.data));
      router.push("/Update/Job?SID=" + event.data.id);
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

    // this.$store.dispatch("job/fetchItemsMainReport").then((response) => {
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
      this.$store.registerModule("job", moduleHrReportManagement);
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
