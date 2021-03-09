<!-- =========================================================================================
  Author: Hazem Ashraf
  Author URL: https://www.linkedin.com/in/hazem-ashraf-1242169b/
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <vx-card
      ref="filterCard"
      title="Filters"
      class="user-list-filters mb-8"
      actionButtons
      @refresh="resetColFilters"
      @remove="resetColFilters"
    >
      <form>
        <!-- {{this.job_title}} -->
        <div class="vx-row">
          <div class="vx-col md:w-1/3 sm:w-1/3 w-full mb-2">
            <!-- <label class="text-sm opacity-75">
              <span class="text-primary">*</span>Company
            </label> -->

            <v-select
              label="title"
              :reduce="title => title"
              :options="companies"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="company"
              class="mb-2"
              placeholder="Company"
            />
          </div>
          <div class="vx-col md:w-1/3 sm:w-1/3 w-full mb-2">
            <flat-pickr
              :config="configFromdateTimePicker"
              v-model="start_date"
              placeholder="From Date"
              @on-change="onFromChange"
            />
          </div>
          <div class="vx-col md:w-1/3 sm:w-1/3 w-full mb-2">
            <flat-pickr
              :config="configTodateTimePicker"
              v-model="end_date"
              placeholder="To Date"
              @on-change="onToChange"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/3 sm:w-1/3 w-full mb-2">
            <vs-button
              color="dark"
              type="filled"
              @click="showAdv = !showAdv"
              class="w-full mb-2"
            >
              Advanced Filters</vs-button
            >
          </div>
        </div>
        <div class="vx-row" v-if="showAdv">
          <div class="vx-col md:w-1/3 sm:w-1/3 w-full mb-2">
            <v-select
              label="name"
              :reduce="name => name"
              :options="categories"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="category"
              class="mb-2"
              placeholder="Category"
            />
          </div>
          <div class="vx-col md:w-1/3 sm:w-1/3 w-full mb-2">
            <v-select
              label="department_name"
              :reduce="department_name => department_name"
              :options="departments"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="department"
              class="mb-4 md:mb-0"
              placeholder="Department"
            />
          </div>
          <div class="vx-col md:w-1/3 sm:w-1/3 w-full mb-2">
            <v-select
              label="title"
              :reduce="title => title"
              :options="job_titles"
              :clearable="false"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              v-model="job_title"
              class="mb-4"
              placeholder="Job title"
            />
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col md:w-1/3 sm:w-1/3 w-full mb-2">
            <vs-button
              :disabled="
                company == null || start_date == null || end_date == null
              "
              type="filled"
              @click.prevent="showStats"
              class="w-full"
              >Show Statistics</vs-button
            >
          </div>
        </div>
      </form>
    </vx-card>
    <!-- ROW 4 -->
    <!-- <div  class="vx-row">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mb-base">
        <statistics-card-line
          class="md:mb-0 mb-base"
          icon="UserCheckIcon"
          icon-right
          :statistic="totalWorkingEmps"
          statisticTitle="total of active employees"
          :chartData="activeUsers.series"
          color="success"
        />
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mb-base">
        <statistics-card-line
          class="md:mb-0 mb-base"
          icon="UserMinusIcon"
          icon-right
          :statistic="totalResignedEmps"
          statisticTitle="total resigned employees"
          :chartData="resignedUsers.series"
        />
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mb-base">
        <statistics-card-line
          icon="UserXIcon"
          icon-right
          :statistic="totalTerminatedEmps"
          statisticTitle="total terminated employees"
          :chartData="terminatedUsers.series"
          color="danger"
        />
      </div>
    </div> -->

    <vx-card
      v-if="showStatsPanel"
      title="Show statistics of employees for the following data :"
    >
      <div class="vx-row">
        <div class="vx-col w-full md:w-1/3 mb-base" v-if="company != null">
          <b>{{ company.title }}</b>
        </div>
        <div class="vx-col w-full md:w-1/3 mb-base" v-if="start_date != null">
          <b>{{ start_date }}</b>
        </div>
        <div class="vx-col w-full md:w-1/3 mb-base" v-if="end_date != null">
          <b>{{ end_date }}</b>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full md:w-1/3 mb-base" v-if="category != null">
          <b>{{ category.name }}</b>
        </div>
        <div class="vx-col w-full md:w-1/3 mb-base" v-if="department != null">
          <b>{{ department.department_name }}</b>
        </div>
        <div class="vx-col w-full md:w-1/3 mb-base" v-if="job_title != null">
          <b>{{ job_title.title }}</b>
        </div>
      </div>
    </vx-card>
    <br />

    <div v-if="showStatsPanel" class="vx-row">
      <div class="vx-col w-full md:w-1/2 mb-base">
        <vx-card title="Employees statistics.">
          <!-- CARD ACTION -->
          <!-- <template slot="actions">
            <change-time-duration-dropdown />
          </template> -->

          <div slot="no-body" v-if="supportTracker.analyticsData">
            <div class="vx-row text-center">
              <!-- Open Tickets Heading -->
              <div
                class="vx-col w-full lg:w-1/5 md:w-full sm:w-1/5 flex flex-col justify-between mb-4 lg:order-first md:order-last sm:order-first order-last"
              >
                <div class="lg:ml-6 lg:mt-6 md:mt-0 md:ml-0 sm:ml-6 sm:mt-6">
                  <h1 class="font-bold text-5xl">
                    {{ supportTracker.analyticsData.openTickets }}
                  </h1>
                  <small>Total employees</small>
                </div>
              </div>

              <!-- Chart -->
              <div
                class="vx-col w-full lg:w-4/5 md:w-full sm:w-4/5 justify-center mx-auto lg:mt-0 md:mt-6 sm:mt-0 mt-6"
              >
                <!-- <vue-apex-charts
                  type="radialBar"
                  height="385"
                  :options="analyticsData.supportTrackerRadialBar.chartOptions"
                  :series="supportTracker.series"
                /> -->
                <vue-apex-charts
                  type="pie"
                  height="400"
                  width="400"
                  :options="chartOptionsPie"
                  :series="seriesPie"
                />
              </div>
            </div>

            <!-- Support Tracker Meta Data -->
            <div class="flex flex-row justify-between px-8 pb-4 mt-4">
              <p
                class="text-center"
                v-for="(val, key) in supportTracker.analyticsData.meta"
                :key="key"
              >
                <span class="block">{{ key }}</span>
                <span
                  class="text-2xl font-semibold"
                  :style="[
                    key === 'Active'
                      ? {
                          'background-color': '#73e373',
                          border: '2px solid #73e373',
                          'border-radius': '5px',
                          color: 'white'
                        }
                      : key === 'Resigned'
                      ? {
                          background: '#ffcc00',
                          border: '2px solid #ffcc00',
                          'border-radius': '5px',
                          color: 'white'
                        }
                      : {
                          background: '#ff3333',
                          border: '2px solid #ff3333',
                          'border-radius': '5px',
                          color: 'white'
                        }
                  ]"
                  >{{ val }}</span
                >
              </p>
            </div>
          </div>
        </vx-card>
      </div>

      <!-- CARD 5: SUPPORT TRACKER lg:w-1/2 xl:w-1/2 -->
      <div class="vx-col w-full md:w-1/2  mb-base">
        <vx-card title="Absence statistics.">
          <!-- CARD ACTION -->
          <!-- <template slot="actions">
            <change-time-duration-dropdown />
          </template> -->

          <div slot="no-body" v-if="supportTracker.analyticsData">
            <div class="vx-row text-center">
              <!-- Open Tickets Heading -->
              <div
                class="vx-col w-full lg:w-1/5 md:w-full sm:w-1/5 flex flex-col justify-between mb-4 lg:order-first md:order-last sm:order-first order-last"
              >
                <div class="lg:ml-6 lg:mt-6 md:mt-0 md:ml-0 sm:ml-6 sm:mt-6">
                  <h1 class="font-bold text-5xl">
                    {{ supportTracker.analyticsData.openTicketsAbsence }}
                  </h1>
                  <small>Total</small>
                </div>
              </div>

              <!-- Chart -->
              <div
                class="vx-col w-full lg:w-4/5 md:w-full sm:w-4/5 justify-center mx-auto lg:mt-0 md:mt-6 sm:mt-0 mt-6"
              >
                <!-- <vue-apex-charts
                  type="radialBar"
                  height="385"
                  :options="analyticsData.supportTrackerRadialBar.chartOptions"
                  :series="supportTracker.series"
                /> -->
                <vue-apex-charts
                  type="pie"
                  height="247"
                  width="400"
                  :options="chartOptionsPieAbsence"
                  :series="seriesPieAbsence"
                />
              </div>
            </div>

            <div class="flex flex-row justify-between px-8 pb-4 mt-4">
              <p
                class="text-center"
                v-for="(val, key) in supportTracker.analyticsData.metaAbsence"
                :key="key"
              >
                <span class="block">{{ key }}</span>
                <span
                  class="text-2xl font-semibold"
                  :style="[
                    key === 'Attendance'
                      ? {
                          'background-color': '#73e373',
                          border: '2px solid #73e373',
                          'border-radius': '5px',
                          color: 'white'
                        }
                      : {
                          background: '#3366ff',
                          border: '2px solid #3366ff',
                          'border-radius': '5px',
                          color: 'white'
                        }
                  ]"
                  >{{ val }}</span
                >
              </p>
            </div>
          </div>
        </vx-card>
      </div>
    </div>

    <div v-if="showStatsPanel" class="vx-row">
      <div class="vx-col w-full md:w-1/2 mb-base">
        <vx-card title="No show statistics.">
          <!-- CARD ACTION -->
          <!-- <template slot="actions">
            <change-time-duration-dropdown />
          </template> -->

          <div slot="no-body" v-if="supportTracker.analyticsData">
            <div class="vx-row text-center">
              <!-- Open Tickets Heading -->
              <div
                class="vx-col w-full lg:w-1/5 md:w-full sm:w-1/5 flex flex-col justify-between mb-4 lg:order-first md:order-last sm:order-first order-last"
              >
                <div class="lg:ml-6 lg:mt-6 md:mt-0 md:ml-0 sm:ml-6 sm:mt-6">
                  <h1 class="font-bold text-5xl">
                    {{ supportTracker.analyticsData.openTicketsNoShow }}
                  </h1>
                  <small>Total no show in 2 , 3 and 4 days</small>
                </div>
              </div>

              <!-- Chart -->
              <div
                class="vx-col w-full lg:w-4/5 md:w-full sm:w-4/5 justify-center mx-auto lg:mt-0 md:mt-6 sm:mt-0 mt-6"
              >
                <!-- <vue-apex-charts
                  type="radialBar"
                  height="385"
                  :options="analyticsData.supportTrackerRadialBar.chartOptions"
                  :series="supportTracker.series"
                /> -->
                <vue-apex-charts
                  type="pie"
                  height="400"
                  width="400"
                  :options="chartOptionsPieNoShow"
                  :series="seriesPieNoShow"
                />
              </div>
            </div>

            <!-- Support Tracker Meta Data -->
            <div class="flex flex-row justify-between px-8 pb-4 mt-4">
              <p
                class="text-center"
                v-for="(val, key) in supportTracker.analyticsData.metaNoShow"
                :key="key"
              >
                <span class="block">{{ key }}</span>
                <span
                  class="text-2xl font-semibold"
                  :style="[
                    key === 'twoDays'
                      ? {
                          'background-color': '#3366ff',
                          border: '2px solid #3366ff',
                          'border-radius': '5px',
                          color: 'white'
                        }
                      : key === 'threeDays'
                      ? {
                          background: '#73e373',
                          border: '2px solid #73e373',
                          'border-radius': '5px',
                          color: 'white'
                        }
                      : {
                          background: '#ffcc00',
                          border: '2px solid #ffcc00',
                          'border-radius': '5px',
                          color: 'white'
                        }
                  ]"
                  >{{ val }}</span
                >
              </p>
            </div>
          </div>
        </vx-card>
      </div>

      <div style="display: none" class="vx-col w-full md:w-1/2 mb-base">
        <vx-card>
          <div
            class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-row lg:flex-row"
          >
            <!-- LEFT COL -->
            <div
              class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-between"
              v-if="salesBarSession.analyticsData"
            >
              <div>
                <h2 class="mb-1 font-bold">
                  {{ salesBarSession.analyticsData.session }}
                </h2>
                <span class="font-medium">absence percentage</span>

                <!-- Previous Data Comparison -->
                <p class="mt-2 text-xl font-medium">
                  <span
                    :class="
                      salesBarSession.analyticsData.comparison.result >= 0
                        ? 'text-success'
                        : 'text-danger'
                    "
                  >
                    <span
                      v-if="salesBarSession.analyticsData.comparison.result > 0"
                      >+</span
                    >
                    <span>{{
                      salesBarSession.analyticsData.comparison.result
                    }}</span>
                  </span>

                  <span>{{
                    salesBarSession.analyticsData.comparison.str
                  }}</span>
                </p>
              </div>
              <vs-button
                icon-pack="feather"
                icon="icon-chevrons-right"
                icon-after
                class="shadow-md w-full lg:mt-0 mt-4"
                @click.prevent="changeStats"
                >View Details</vs-button
              >
            </div>

            <!-- RIGHT COL -->
            <div
              class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base  mt-6"
            >
              <!-- <change-time-duration-dropdown class="self-end" /> -->
              <vue-apex-charts
                type="bar"
                height="245"
                :options="analyticsData.salesBar.chartOptions"
                :series="salesBarSession.series"
                v-if="salesBarSession.series"
              />
            </div>
          </div>
          <vs-divider class="my-6 mt-6"></vs-divider>
          <!-- <div class="vx-row">
            <div class="vx-col w-1/2 mb-5 mt-5">
              <p>Goal: $100000</p>
              <vs-progress
                class="block mt-1"
                :percent="50"
                color="primary"
              ></vs-progress>
            </div>
            <div class="vx-col w-1/2 mb-3">
              <p>Users: 100K</p>
              <vs-progress
                class="block mt-1"
                :percent="60"
                color="warning"
              ></vs-progress>
            </div>
            <div class="vx-col w-1/2 mb-3">
              <p>Retention: 90%</p>
              <vs-progress
                class="block mt-1"
                :percent="70"
                color="danger"
              ></vs-progress>
            </div>
            <div class="vx-col w-1/2 mb-3">
              <p>Duration: 1yr</p>
              <vs-progress
                class="block mt-1"
                :percent="90"
                color="success"
              ></vs-progress>
            </div>
          </div> -->
        </vx-card>
      </div>

      <!-- CARD 5: SUPPORT TRACKER -->
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import analyticsData from "./ui-elements/card/analyticsData.js";
import ChangeTimeDurationDropdown from "@/components/ChangeTimeDurationDropdown.vue";
import VxTimeline from "@/components/timeline/VxTimeline";
import flatPickr from "vue-flatpickr-component";
// import Cookie from "js-cookie";
import "flatpickr/dist/flatpickr.css";
// import router from '@/router'
import vSelect from "vue-select";
import axios from "@/axios.js";

export default {
  data() {
    return {
      total_absence: 100,
      total_attendance: 500,
      showAdv: false,
      start_date: null,
      end_date: null,
      configFromdateTimePicker: {
        allowInput: true,
        minDate: null,
        maxDate: new Date()
      },
      configTodateTimePicker: {
        minDate: null,
        maxDate: new Date()
      },
      totalWorkingEmps: null,
      totalResignedEmps: null,
      totalTerminatedEmps: null,
      company: null,
      companies: [],
      category: null,
      categories: [{ name: "Staff" }, { name: "Operation" }],
      departments: [],
      department: null,
      job_title: null,
      job_titles: [],
      showStatsPanel: false,
      noShow: [],
      salesBarSession: {
        series: [
          {
            name: "absence",
            data: [10, 20, 30]
          }
        ],
        analyticsData: {
          session: null,
          comparison: {
            str: "No show users in last 2 , 3 , 4 Days",
            result: null
          }
        }
      },
      supportTracker: {
        analyticsData: {
          openTickets: null,
          openTicketsAbsence: null,
          meta: {},
          metaAbsence: {}
        },
        series: [83]
      },

      // Line Charts
      resignedUsers: {
        series: [
          {
            name: "Resigned Users",
            data: [6000, 5000, 3000, 4000]
          }
        ]
      },
      activeUsers: {
        series: [
          {
            name: "Active Users",
            data: [750, 1000, 900, 1250]
          }
        ]
      },
      terminatedUsers: {
        series: [
          {
            name: "Terminated Users",
            data: [365, 390, 365, 400]
          }
        ]
      },

      seriesPie: [],
      chartOptionsPie: {
        chart: {
          width: 380,
          type: "pie"
        },
        labels: ["All", "Active", "Resigned", "Terminated"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      seriesPieNoShow: [],
      chartOptionsPieNoShow: {
        chart: {
          width: 380,
          type: "pie"
        },
        labels: ["2 days", "3 days", "4 days"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      seriesPieAbsence: [],
      chartOptionsPieAbsence: {
        chart: {
          width: 380,
          type: "pie"
        },
        labels: ["Absence", "Attendance"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },

      analyticsData: analyticsData
    };
  },
  components: {
    VueApexCharts,
    flatPickr,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline,
    vSelect
  },
  methods: {
    changeStats() {},
    showStats() {
      this.$vs.loading();
      //  //////console.log("selected company isdasdasdasdasd ");
      var categoryID;
      if (this.category == null) categoryID = null;
      else categoryID = this.category.name;

      var departmentID;
      if (this.department == null) departmentID = null;
      else departmentID = this.department.id;

      var job_titleID;
      if (this.job_title == null) job_titleID = null;
      else job_titleID = this.job_title.id;

      axios
        .get(
          `${process.env.VUE_APP_BASE_URI}/dashboard/stats/?company=${this.company.id}&from=${this.start_date}&to=${this.end_date}&category=${categoryID}&department=${departmentID}&job_title=${job_titleID}`
        )
        .then(response => {
          // ////console.log(JSON.stringify(response.data.data));
           this.$vs.loading.close();
           this.showStatsPanel = true;
           if(response.data.data.total_absence != null) this.total_absence = response.data.data.total_absence;
           if(response.data.data.total_attendance != null) this.total_attendance = response.data.data.total_attendance;
     

          // //////console.log(JSON.stringify(this.salesBarSession.series[0].data));
          this.salesBarSession.series = [
            {
              data: response.data.data.no_show
            }
          ];
          // this.salesBarSession.series[0].data = response.data.data.no_show;
          ////////console.log('new no show array is : ' + this.noShow)
          ////////console.log(JSON.stringify(response.data.data.no_show));
          // this.salesBarSession.series[0].data = this.noShow;
          ////////console.log('sdasd : ' + this.salesBarSession.series[0].data[0]);
          this.salesBarSession.analyticsData.session =
            response.data.data.absence_percentage + "%";

          this.supportTracker.analyticsData.meta = {
            Active: response.data.data.total_working_emps,
            Resigned: response.data.data.total_resigned_emps,
            Terminated: response.data.data.total_terminate_emps
          };
          this.supportTracker.analyticsData.metaNoShow = {
            twoDays: response.data.data.no_show[0],
            threeDays: response.data.data.no_show[1],
            FourDays: response.data.data.no_show[2]
          };
          this.supportTracker.analyticsData.metaAbsence = {
            Absence: this.total_absence,
            Attendance: this.total_attendance
          };
          this.supportTracker.analyticsData.openTickets =
            response.data.data.total_working_emps +
            response.data.data.total_resigned_emps +
            response.data.data.total_terminate_emps;

          this.supportTracker.analyticsData.openTicketsNoShow = response.data.data.no_show[0] + response.data.data.no_show[1] + response.data.data.no_show[2];

          this.supportTracker.analyticsData.openTicketsAbsence = this.total_absence + this.total_attendance;

          this.seriesPie = [
            0,
            response.data.data.total_working_emps,
            response.data.data.total_resigned_emps,
            response.data.data.total_terminate_emps
          ];

          this.seriesPieNoShow = response.data.data.no_show;

          this.seriesPieAbsence = [this.total_absence, this.total_attendance];
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
    onFromChange(selectedDates, dateStr) {
      this.$set(this.configTodateTimePicker, "minDate", dateStr);
    },
    onToChange(selectedDates, dateStr) {
      this.$set(this.configFromdateTimePicker, "maxDate", dateStr);
    },
    resetColFilters(card) {
      card.removeRefreshAnimation(500);
      this.company = this.start_date = this.end_date = this.category = this.department = this.job_title =  null;

      // Reset Grid Filter
      // this.gridApi.setFilterModel(null);
      // this.gridApi.onFilterChanged();
      // this.$refs.filterCard.removeRefreshAnimation();
    }
  },
  // beforeCreate(){
  //   var x = Cookie.get('sessionid');

  //   if(x == null)  router.push(router.currentRoute.query.to || '/login');
  // },
  mounted() {
    // this.showStats();
    

    axios
      .get(`${process.env.VUE_APP_BASE_URI}/dashboard/stats/companies/`)
      .then(response => {
        this.companies = response.data.data;
      });

    // axios
    //   .get(`${process.env.VUE_APP_BASE_URI}/dashboard/department/`)
    //   .then(response => {
    //     //  ////////console.log(response.data.data[0].department_name);
    //     this.departments = response.data.data;
    //   });

    //  axios
    // .get(`${process.env.VUE_APP_BASE_URI}/dashboard/job/`)
    // .then(response => {
    //   //  ////////console.log(response.data.data[0].department_name);
    //   this.job_titles = response.data.data;
    // });
    //this.showStats();
  },
  watch: {
    category(obj) {
      this.department = null;
      this.job_title = null;
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
      this.job_title = null;
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
      ///   //////console.log('nasjdhasjkdjkldsa   :   ' + obj.id);
      axios
        .get(
          process.env.VUE_APP_BASE_URI +
            "/dashboard/stats/jobs/?department_id=" +
            obj.id
        )
        .then(response => {
          this.job_titles = response.data.data;
        });
    }
    // department(obj) {
    //   this.items.job_title = null;
    //   if (this.company !== null && this.items.category !== null) {
    //     axios
    //       .get(
    //         `${process.env.VUE_APP_BASE_URI}/dashboard/main_report/department/jobs?category=${this.category.name}&company=${this.company.title}&department=${obj}`
    //       )
    //       .then((response) => {
    //         this.job_titles = response.data.data;
    //       });
    //   }
    // },
  }
};
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user {
    position: relative;

    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  @media (max-width: 576px) {
    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>
