<template>
  <div class="d-flex justify-center">
    <v-btn small tile class="hidden-md-and-up" depressed @click="dialog = true">
      <v-icon>mdi-alert-circle-outline</v-icon>
    </v-btn>
    <v-btn tile class="hidden-sm-and-down" depressed @click="dialog = true">
      <v-icon>mdi-alert-circle-outline</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="75%">
      <Disclaimer
        :isDialog="true"
        @close-dialog="onAccept"
        @keydown.enter="dialog = false"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import Disclaimer from '@/components/Disclaimer.vue';

export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    onAccept() {
      this.dialog = false;
      localStorage.setItem('privacyAware', true);
    },
  },
  components: {
    Disclaimer,
  },
  created() {
    this.dialog = localStorage.getItem('privacyAware') ? false : true;
  },
  computed: {
    ...mapGetters(['theme']),
  },
};
</script>

<style scoped></style>
