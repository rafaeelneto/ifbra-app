<template>
  <v-app id="app">
    <!-- <PrintView /> -->
    <!-- <ScrollTop /> -->
    <AppHeader></AppHeader>
    <h1>TITULO TESTE</h1>
    <!-- <div :class="{ 'd-none': printView }"> -->
    <!-- <router-view />
      <Footer /> -->
    <!-- </div> -->
  </v-app>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { defineAsyncComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import AppHeader from '@/components/Header.vue';

export default {
  data: () => ({ media: null }),
  components: {
    AppHeader,
    Footer: defineAsyncComponent(() => import('@/components/Footer.vue')),
    PrintView: defineAsyncComponent(
      () => import('@/components/print/PrintView.vue')
    ),
    ScrollTop: defineAsyncComponent(() => import('@/components/ScrollTop.vue')),
  },
  methods: {
    ...mapActions(['updatePrintView', 'setTheme']),
    setVueTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    close() {
      this.updatePrintView();
    },
    forceBlur() {
      let el = this.$el.querySelector(':focus');
      if (el) el.blur();
    },
    setWidth() {
      this.$eventHub.$emit('resize');
    },
  },
  created() {
    this.$eventHub.$on('theme', this.setVueTheme);
    this.$eventHub.$on('force-blur', this.forceBlur);
    console.log('CREATED APP');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('Enabling dark mode automatically.');
      this.setTheme(true);
      this.setVueTheme();
    }
  },
  mounted() {
    window.addEventListener('resize', this.setWidth);
  },
  computed: mapGetters(['printView', 'theme']),
};
</script>

<style>
@media only print {
  .print-hidden {
    display: none;
  }
}
@media only print {
  .print-show {
    display: contents;
  }
}
.default-grey {
  background-color: #121212 !important;
}
</style>
