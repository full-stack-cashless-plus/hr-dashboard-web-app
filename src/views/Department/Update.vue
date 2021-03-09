<!-- =========================================================================================
  Author: Hazem Ashraf
  Author URL: https://www.linkedin.com/in/hazem-ashraf-1242169b/
========================================================================================== -->

<template>
  <div id="data-list">
    <vx-card
      ref="filterCard"
      title="Updating new department"
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
           <label class="text-sm opacity-75"><span class="text-primary">*</span>DEPARTMENT NAME</label>
            <vs-input
              class="w-full"
              icon-pack="feather"
              icon="icon-layers"
              icon-no-border
              v-model="department_name"
              placeholder="Information Technology,Financial..etc"
            />
          </div>
        </div>
      <!-- {{company.id}} -->
        <vs-button :disabled="category == null || company == null || department_name == null" type="filled" @click="openConfirm()" class="mb-2"
          >UPDATE</vs-button
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
      department_name: null,
      company: {id:null,title:null},
     // company_id: this.company.id,
    //  company: this.companies.filter(companyy => {return companyy.title == this.company?companyy.id:null}),
      company_code: null,
      employee: {
        company: null,
        job_title: null
      },
      show: false,
      categorys: [{ name: "Operation" }, { name: "Staff" }],
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
      // Cell Renderer Components
    };
  },
  watch: {
    city(obj) {
      this.items.area = this.items.area_name = null;
      axios
        .get(
          `${process.env.VUE_APP_BASE_URI}/dashboard/main_report/city/areas?city=${obj}`
        )
        .then(response => {
          this.areas = this.area_names = response.data.data;
        });
    },
    category(obj) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URI}/dashboard/main_report/category/jobs/?category=${obj.name}`
        )
        .then(response => {
          this.job_titles = response.data.data;
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
     openConfirm(){
      // const selectedNodes = this.gridApi.getSelectedNodes();
      // const selectedData = selectedNodes.map(node => node.data);
      // const selectedDataStringPresentation = selectedData
      // .map(node => node.title);
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure to update this data?',
        accept:this.updateDepartment
      })
      },
    updateDepartment() {
      this.$vs.loading();
      const formData = new FormData();

      formData.append("company_name", this.company.id);
      formData.append("category_name", this.category);
      formData.append("department_name", this.department_name);
     

      axios
        .post(`${process.env.VUE_APP_BASE_URI}/dashboard/department/${this.$route.query.SID}/update/` , formData)
        .then(response => {
           this.$vs.loading.close();
          if(response.status  !== 200 ) {
               this.$vs.notify({
                  title: "Error",
                  text: "Department is not updated",
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger",
              });
          }
          else{
                 this.$vs.notify({
                  title: "Success",
                  text: "Department is updated",
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success",
              });
          }
        })
         .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
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
      .then((response) => {
        this.companies = response.data.data;
      });
      axios
      .get(`${process.env.VUE_APP_BASE_URI}/dashboard/department/${this.$route.query.SID}/`)
      .then((response) => {
        this.company.id = response.data.data.company_info.id;
        this.company.title = response.data.data.company_info.title;
        this.category = response.data.data.category_name;
        this.department_name = response.data.data.department_name;
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
