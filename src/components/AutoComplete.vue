<template>
  <div>
    <v-row class="align-center">
      <v-col cols="12">
        <v-autocomplete
          :items="allCID"
          :label="innerLabel"
          :multiple="allowMultiple"
          hide-selected
          :hint="innerHint"
          :persistent-hint="innerHint.length > 0"
          :clearable="allowMultiple"
          :messages="messages"
          v-model="text"
          variant="outlined"
          density="compact"
          chips
          ref="field"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AutoComplete',
  data: () => ({
    value: null,
    text: '',
  }),
  props: ['innerLabel', 'allowMultiple', 'innerHint', 'messages', 'require'],
  methods: {
    clear() {
      this.text = '';
    },
    focus() {
      this.$refs.field.focus();
    },
  },
  watch: {
    text(newValue) {
      this.$emit('inner-change', newValue);
    },
  },
  computed: {
    ...mapGetters(['allCID']),
  },
};
</script>
