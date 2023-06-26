<template>
  <VueDatePicker
    v-model="date"
    locale="pt-BR"
    :placeholder="label"
    :readonly="readonly"
    :max-date="maxDate || new Date()"
    :month-change-on-scroll="false"
    text-input
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
  props: ["label", "maxDate", "defaultDate", "readonly"],
  methods: {},
  watch: {
    date: function () {
      this.$emit("inner-date", this.date);
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
