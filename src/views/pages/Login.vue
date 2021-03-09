<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Human Resources Application
    Author: Hossam Ali
    Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
========================================================================================== -->

<template>
  <div
    class="h-screen flex w-full full-page-bg-color vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/3 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col sm:w-full md:w-full d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="mb-5">
                  <img
                    src="@/assets/images/pages/titd_new_logo.png"
                    alt="login"
                    class="mx-auto w-48"
                  />
                </div>
                <div class="vx-card__title mb-4 text-center">
                  <p class="mb-10">
                    Welcome back, please login to your account.
                  </p>
                </div>

                <div>
                  <vs-input
                    v-validate="'required'"
                    data-vv-validate-on="blur"
                    name="username"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Username"
                    v-model="username"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("username")
                  }}</span>

                  <vs-input
                    data-vv-validate-on="blur"
                    v-validate="'required'"
                    type="password"
                    name="password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="Password"
                    v-model="password"
                    class="w-full mt-6"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("password")
                  }}</span>
                  <div class="mt-5 text-center">
                    <vs-button
                      :disabled="!validateForm"
                      @click="loginJWT"
                      class="my-4"
                      >Login</vs-button
                    >
                    <div class="mt-1">
                      <router-link to="">Forgot Password?</router-link>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="bg-gray p-3">
                    <img
                    src="@/assets/images/pages/GOpluslogo2.png"
                    alt="login"
                    class="mx-auto w-16"
                  />
                  </div> -->
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.username != "" && this.password != "";
    },
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });

        return true;
      }
      return false;
    },
    loginJWT() {
      if (this.checkLogin()) return;

      // Loading
      this.$vs.loading();

      const payload = {
        userDetails: {
          username: this.username,
          password: this.password,
        },
      };

      this.$store
        .dispatch("auth/loginJWT", payload)
        .then(() => {
          this.$vs.loading.close();
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        });
    },
  },
};
</script>
<style lang="scss">
.bg-gray {
  background-color: #ededed;
}
</style>
