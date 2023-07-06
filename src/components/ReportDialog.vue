<template>
  <div :class="`text-center ${filledStatus ? '' : 'd-none'}`">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:trigger="{ isActive, props }">
        <v-btn
          class="hidden-sm-and-down"
          tile
          color="green lighten-2"
          dark
          v-bind="props"
          @click="isActive = !isActive"
        >
          Resumo do Índice
        </v-btn>
        <v-btn
          class="hidden-md-and-up"
          tile
          color="green lighten-2"
          dark
          v-bind="props"
          @click="isActive = !isActive"
          text
        >
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </template>

      <v-card flat>
        <Report @close="dialog = false" :is-dialog="true" />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import eventBus from '@/utils/eventBus';

import Report from '@/components/Report.vue';

export default {
  data: () => ({
    dialog: false,
    control: true,
  }),
  components: { Report },
  computed: mapGetters(['filledStatus']),
  methods: {
    showDialog() {
      if (this.control) {
        this.dialog = true;
        this.control = false;
      }
    },
  },
  created() {
    eventBus.on('filled', this.showDialog);
  },
  beforeUnmount() {
    eventBus.off('filled', this.showDialog);
  },
};
</script>
