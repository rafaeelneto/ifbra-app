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
  --dp-background-color: rgb(var(--v-theme-background));
  --dp-primary-color: rgb(var(--v-theme-primary));
  --dp-menu-border-color: rgb(var(--v-theme-primary-light-1));
}
.dp__theme_light {
  --dp-primary-color: rgb(var(--v-theme-primary));
}
</style>
