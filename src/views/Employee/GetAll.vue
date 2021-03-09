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
        <div class="flex-grow">
          <vs-button class="mb-4 md:mb-0" @click="goToAddUser()"
            ><span style="font-weight: bold; font-size: 13px">+</span> Add
            user</vs-button
          >
          -
          <vs-button
            color="dark"
            class="mb-4 md:mb-0"
            @click="openConfirm()"
            ><span style="font-weight: bold; font-size: 13px">-</span> Delete
            selected</vs-button
          >
        </div>
        <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()"
          >Export CSV</vs-button
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
          v-model="empName"
          placeholder="Search by employee name..."
        />

        <vs-button class="mb-4 md:mb-0" @click="fetchItemsData(1)"
          >Search</vs-button
        >
      </div>
      <!-- <div class="vx-row">
          <div class="vx-col md:w-1/2 sm:w-1/2 w-full mb-2"> -->

      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :gridOptions="gridOptions"
        :components="components"
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

// Store Module
import moduleHrReportManagement from "@/store/get-all-employees/moduleHrReportManagement.js";

// Cell Renderer
import CellRendererLink from "../hr-report/main-report/cell-renderer/CellRendererLink.vue";
import CellRendererStatus from "../hr-report/main-report/cell-renderer/CellRendererStatus.vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import axios from "@/axios.js";

// Router to navigate
import router from "@/router";

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
      empName: "",
      searchQuery: "",

      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        resizable: true
      },
      columnDefs: [
        {
          headerName: "ID",
          field: "id",
          sortable: true,
          filter: true,
          checkboxSelection: true,
          width: 200
        },
        {
          headerName: "Username",
          field: "username",
          sortable: true,
          filter: true,
          width: 200
        },
        {
          headerName: "Name",
          field: "name",
          sortable: true,
          filter: true,
          width: 300
        },
        {
          headerName: "National ID",
          field: "national_id",
          sortable: true,
          filter: true,
          width: 200
        },

        {
          headerName: "Code",
          field: "employee_code",
          sortable: true,
          filter: true,
          width: 150
        },
        {
          headerName: "Company",
          field: "category",
          sortable: true,
          filter: true,
          width: 150
        },
        {
          headerName: "Category",
          field: "employee_code",
          sortable: true,
          filter: true,
          width: 150
        },
        {
          headerName: "Department",
          field: "department.department_name",
          sortable: true,
          filter: true,
          width: 150
        },
        {
          headerName: "Job title",
          field: "job_title",
          sortable: true,
          filter: true,
          width: 150
        },
        {
          headerName: "Active status",
          field: "status",
          sortable: true,
          filter: true,
          width: 150
        },
        {
          headerName: "Direct manager",
          field: "reporting_to",
          sortable: true,
          filter: true,
          width: 150
        }
      ]
    };
  },
  computed: {
    itemsData() {
      return this.$store.state.employee.items;
    },
    itemsDataTotal() {
      return this.$store.state.employee.total;
    },
    paginationPageSize() {
      return 10;
    },
    totalPages() {
      if (this.gridApi) return this.$store.state.employee.num_of_pages;
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
      }
    }
  },
  methods: {
    openConfirm() {
          const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData.map(
        (node) => node.name
      );
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text:
          "Are you sure to delete this : (" +
          selectedDataStringPresentation +
          ") with it's related data?",
        accept: this.goToDeleteEmployee,
      });
    },
    goToAddUser() {
      router.push("/Add/Employee");
    },
    // Fetch Employee Data
    fetchItemsData(val) {
      this.$vs.loading();
      let params = {
        page: val,
        empName: this.empName
      };
      this.$store
        .dispatch("employee/fetchItems", params)
        .then(resp => {
          // alert(val);
          // alert(JSON.stringify(resp));

          if (resp.data.code === 200) {
            this.$vs.loading.close();
          } else if (resp.data.code === 401) {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Error",
              text: "خطأ : يوجد مستخدم بياناته غير كامله",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          } else {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Error",
              text: resp.data.message,
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          }
        })
        .catch(err => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Error",
            text: err,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
        });
    },
        goToDeleteEmployee() {
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
      upData.append("users_ids", selectedDataStringPresentation);
      axios
        .delete(
          `${process.env.VUE_APP_BASE_URI}/dashboard/user/delete/`,
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
            text: "Can't delete this employee",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        });
    },

    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
    },
        onRemoveSelected() {
      var selectedData = this.gridApi.getSelectedRows();
      //alert(JSON.stringify(selectedData));
      this.gridApi.applyTransaction({ remove: selectedData });

      //  printResult(res);
    },
    onRowDoubleClicked(event) {
      ////////console.log('row data clicked is: ', JSON.stringify(event.data));
      router.push("/Update/Employee?SID=" + event.data.id);
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
      this.$store.registerModule("employee", moduleHrReportManagement);
      moduleHrReportManagement.isRegistered = true;
    }
  }
};
</script>
