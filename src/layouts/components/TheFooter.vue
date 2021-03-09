<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Human Resources Application
    Author: Hossam Ali
    Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
========================================================================================== -->

<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <span>
      COPYRIGHT &copy; {{ new Date().getFullYear() }}
      <a href="/" rel="nofollow"> Human Resources Application </a>, All rights Reserved
    </span>
    <span>
        Powered by GS-Group
    </span>
  </footer>
</template>

<script>
export default {
  name: "the-footer",
  props: {
    classes: {
      type: String
    }
  }
};
</script>
