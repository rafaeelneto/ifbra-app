<template>
  <v-select
    :density="makeDense ? 'compact' : 'default'"
    :label="innerLabel"
    color="primary"
    v-model="selectedItems"
    :items="innerItems"
    :multiple="allowMultiple"
    :clearable="allowMultiple"
    :hint="innerHint"
    variant="outlined"
    :persistent-hint="innerHint.length > 0"
    ref="select"
    :rules="isRequired(selectedItems)"
  >
    <template v-if="allowMultiple" v-slot:prepend-item>
      <v-list-item ripple @click="toggle">
        <v-list-item-action>
          <v-icon :color="selectedItems.length > 0 ? 'secondary' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-title>Todos</v-list-item-title>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'CheckList',
  data: () => ({
    selectedItems: [],
  }),
  props: [
    'innerItems',
    'innerLabel',
    'allowMultiple',
    'makeClearable',
    'makeOutlined',
    'makeDense',
    'innerHint',
    'allowClean', //required by default
  ],
  computed: {
    allItems() {
      return this.selectedItems.length === this.innerItems.length;
    },
    someItems() {
      return this.selectedItems.length > 0 && !this.allItems;
    },
    icon() {
      if (this.allItems) return 'mdi-close-box';
      if (this.someItems) return 'mdi-minus-box';
      return 'mdi-checkbox-blank-outline';
    },
  },

  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.allItems) {
          this.selectedItems = [];
        } else {
          this.selectedItems = this.innerItems.slice();
        }
      });
    },
    clear() {
      if (this.allowMultiple) {
        return (this.selectedItems = []);
      }
      this.selectedItems = '';
    },
    innerFocus() {
      this.$refs.select.focus();
    },
    isRequired(val) {
      if (!this.allowClean) {
        return [(val || '').length > 0 || 'Campo Obrigatório'];
      }
    },
    changed(value) {
      this.$emit('selected-items', value);
      this.$emit('changed', 'changed');
    },
  },
  watch: {
    selectedItems() {
      this.changed(this.selectedItems);
    },
  },
};
</script>
