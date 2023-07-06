<template>
  <v-checkbox color="secondary" v-model="val" hide-details />
</template>

<script>
export default {
  data: () => ({
    val: false,
  }),
  name: 'RowSwitch',
  props: {
    makeActive: Boolean,
    innerLabel: String,
    innerModel: Boolean,
  },
  methods: {
    innerChange() {
      this.val = !this.val;
    },
  },
};
</script>
