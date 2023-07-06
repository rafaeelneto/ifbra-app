<template>
  <v-app-bar
    tile
    fixed
    :density="width < 960 ? 'compact' : 'default'"
    :color="!theme.dark ? 'primary' : ''"
  >
    <div class="hidden-md-and-up">
      <v-btn @click="drawer = !drawer" tile small depressed>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>
    <v-toolbar-title class="title">IFBr-A</v-toolbar-title>
    <div class="hidden-sm-and-down aling-start">
      <v-btn
        depressed
        :color="theme.dark ? 'primary' : ''"
        v-for="(item, i) in menu"
        :key="i"
        :to="item[1]"
        class="margin"
        tile
      >
        {{ item[0] }}
      </v-btn>
    </div>
    <v-spacer />
    <ReportDialog />
    <PrivacyAlert />
    <v-item-group>
      <div class="d-flex flex-row">
        <div class="hidden-md-and-up">
          <v-btn :color="theme.dark ? 'primary' : ''" tile small>
            <v-icon @click="showPrintView()">mdi-printer</v-icon>
          </v-btn>
        </div>
        <div class="hidden-sm-and-down">
          <v-btn :color="theme.dark ? 'primary' : ''" tile>
            <v-icon @click="showPrintView()">mdi-printer</v-icon>
          </v-btn>
        </div>
        <Theme />
      </div>
    </v-item-group>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list nav :density="width < 960 ? 'compact' : 'default'">
      <v-list-group active-class="deep-purple--text text--accent-4">
        <v-list-item v-for="(item, i) in menu" :key="i" :to="item[1]">
          <v-list-item-title>{{ item[0] }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import eventBus from '@/utils/eventBus';

import Theme from '@/components/Theme.vue';
import PrivacyAlert from '@/components/PrivacyAlert.vue';
import ReportDialog from '@/components/ReportDialog.vue';

export default {
  name: 'AppHeader',
  data: () => ({
    drawer: false,
    menu: [
      ['Formulários', '/'],
      ['Informações', 'info'],
      ['Privacidade', 'lgpd'],
      ['Contribua', 'apoio'],
    ],
    width: 0,
  }),
  components: {
    Theme,
    PrivacyAlert,
    ReportDialog,
  },
  computed: mapGetters(['theme']),
  mounted() {
    eventBus.on('resize', this.setWidth);
  },
  methods: {
    ...mapActions(['updatePrintView']),
    setWidth() {
      this.width = window.innerWidth;
    },
    showPrintView() {
      eventBus.emit('update-printview');
      this.updatePrintView();
      eventBus.emit('force-blur');
    },
  },
  beforeUnmount() {
    eventBus.off('resize', this.setWidth);
  },
};
</script>

<style scoped>
.title {
  padding: 1rem;
}
.margin {
  margin-right: 0.2rem;
}
.black-bg {
  background-color: black;
}
.white-bg {
  background-color: white;
}
</style>
