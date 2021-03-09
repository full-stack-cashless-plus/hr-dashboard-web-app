<template>
    <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
      <span>{{ textStatus(params.value) }}</span>
    </vs-chip>
</template>

<script>
    export default {
        name: 'CellRendererStatus',
        computed: {
          chipColor() {
            return (value) => {
              if(value === 1) return "success"
              if(value === 0) return "danger"
              else return "warring"
            }
          },
          textStatus() {
            return (value) => {
              if(value === 1) return "نعم"
              if(value === 0) return "لا"
              else return "warring"
            }
          }
        }
    }
</script>

<style lang="scss" scpoped>
.ag-grid-cell-chip {
  &.vs-chip-success {
    background: rgba(var(--vs-success),.15);
    color: rgba(var(--vs-success),1) !important;
    font-weight: 500;
  }
  &.vs-chip-warning {
    background: rgba(var(--vs-warning),.15);
    color: rgba(var(--vs-warning),1) !important;
    font-weight: 500;
  }
  &.vs-chip-danger {
    background: rgba(var(--vs-danger),.15);
    color: rgba(var(--vs-danger),1) !important;
    font-weight: 500;
  }
}
</style>
