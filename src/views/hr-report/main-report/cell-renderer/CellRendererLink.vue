<template>
  <div class="flex items-center">
    <vs-avatar
       icon-pack="feather" icon="icon-info"
      class="flex-shrink-0 mr-2"
      color="success"
      @click="$router.push(url)"
    />
    <router-link
      :to="url"
      @click.stop.prevent
      class="text-inherit hover:text-primary"
      >{{ params.value }}</router-link
    >
  </div>
</template>

<script>
export default {
  name: "CellRendererLink",
  computed: {
    url() {
      return "/ticket-settled/ticket-view/" + this.params.data.id;
    }
  }
};
</script>
