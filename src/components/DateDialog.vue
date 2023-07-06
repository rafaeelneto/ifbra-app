<template>
  <VueDatePicker
    v-model="date"
    locale="pt-BR"
    :placeholder="label"
    :readonly="readonly"
    :max-date="maxDate || new Date()"
    :month-change-on-scroll="false"
    text-input
    :dark="theme.dark"
    :enable-time-picker="false"
  />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    date: new Date(),
  }),
  props: ['label', 'maxDate', 'defaultDate', 'readonly'],
  methods: {},
  computed: mapGetters(['theme']),
  watch: {
    date: function () {
      this.$emit('inner-date', this.date);
    },
  },
  created() {
    if (this.defaultDate == undefined) {
      return;
    }
    if (this.defaultDate.length > 0) {
      this.picker = this.defaultDate;
    }
  },
};
</script>

<style>
.dp__theme_dark {
  --dp-background-color: rgb(var(--v-theme-background)) !important;
  --dp-primary-color: rgb(var(--v-theme-primary)) !important;
  --dp-menu-border-color: rgb(var(--v-theme-primary-light-1)) !important;
  --dp-secondary-color: #465663 !important;
  --dp-hover-color: rgb(var(--v-theme-primary-light-1)) !important;
  --dp-border-color: rgb(118, 118, 118) !important;
  --dp-border-color-hover: #aaaeb7 !important;
}
.dp__theme_light {
  --dp-primary-color: rgb(var(--v-theme-primary)) !important;
}

:root {
  --dp-input-padding: 9px 30px 9px 12px !important;
}
</style>
