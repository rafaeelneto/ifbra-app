<template>
  <v-app id="app">
    <PrintView />
    <ScrollTop />
    <template v-if="!printView">
      <AppHeader></AppHeader>
      <v-main>
        <router-view />
        <Footer />
      </v-main>
    </template>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import eventBus from "@/utils/eventBus";

import AppHeader from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PrintView from "@/components/print/PrintView.vue";
import ScrollTop from "@/components/ScrollTop.vue";

export default {
  data: () => ({ media: null }),
  components: {
    AppHeader,
    Footer,
    PrintView,
    ScrollTop,
  },
  methods: {
    ...mapActions(["updatePrintView", "setTheme"]),
    toggleDrawer() {
      console.log("inadsonfdadfa");
    },
    setVueTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    close() {
      this.updatePrintView();
    },
    forceBlur() {
      let el = this.$el.querySelector(":focus");
      if (el) el.blur();
    },
    setWidth() {
      eventBus.emit("resize");
    },
  },
  created() {
    eventBus.on("theme", this.setVueTheme);
    eventBus.on("force-blur", this.forceBlur);
    console.log("CREATED APP");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      console.log("Enabling dark mode automatically.");
      this.setTheme(true);
      this.setVueTheme();
    }
  },
  mounted() {
    window.addEventListener("resize", this.setWidth);
  },
  computed: mapGetters(["printView", "theme"]),
  beforeUnmount() {
    eventBus.off("theme", this.setVueTheme);
    eventBus.off("force-blur", this.forceBlur);
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
