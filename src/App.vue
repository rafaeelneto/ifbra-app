<template>
  <v-app id="app">
    <PrintView v-if="printView" />
    <ScrollTop />
    <template v-if="!printView">
      <AppHeader></AppHeader>
      <v-main style="padding-top: 0">
        <router-view />
        <Footer />
      </v-main>
    </template>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { useTheme } from 'vuetify';

import eventBus from '@/utils/eventBus';

import AppHeader from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PrintView from '@/components/print/PrintView.vue';
import ScrollTop from '@/components/ScrollTop.vue';

export default {
  data: () => ({ media: null }),
  components: {
    AppHeader,
    Footer,
    PrintView,
    ScrollTop,
  },
  methods: {
    ...mapActions(['updatePrintView', 'setTheme']),
    close() {
      this.updatePrintView();
    },
    forceBlur() {
      let el = this.$el.querySelector(':focus');
      if (el) el.blur();
    },
    setWidth() {
      eventBus.emit('resize');
    },
  },
  setup() {
    const theme = useTheme();
    function setVueTheme() {
      theme.global.name.value = theme.global.current.value.dark
        ? 'light'
        : 'dark';
    }
    return {
      setVueTheme,
    };
  },
  created() {
    eventBus.on('theme', this.setVueTheme);
    eventBus.on('force-blur', this.forceBlur);
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
  beforeUnmount() {
    eventBus.off('theme', this.setVueTheme);
    eventBus.off('force-blur', this.forceBlur);
  },
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
