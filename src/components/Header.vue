<template>
  <div>
    <v-app-bar
      tile
      fixed
      :density="width < 960 ? 'compact' : 'default'"
      :class="`${!theme.dark ? 'light-blue darken-3' : ''}`"
      theme="dark"
    >
      <div class="hidden-md-and-up">
        <v-btn @click="drawer = true" tile small depressed text>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
      <v-toolbar-title class="title">IFBr-A</v-toolbar-title>
      <div class="hidden-sm-and-down">
        <router-link
          v-for="(item, i) in menu"
          :key="i"
          :to="item[1]"
          custom
          class="margin"
        >
          <v-btn
            depressed
            :active-class="`${
              theme.dark
                ? 'deep-purple--text text--accent-4'
                : 'blue--text text--accent-4'
            }`"
            :class="`${!theme.dark ? 'blue--text text--accent-4' : ''}`"
            tile
          >
            {{ item[0] }}
          </v-btn>
        </router-link>
      </div>
      <v-spacer />
      <ReportDialog />
      <PrivacyAlert />
      <v-item-group>
        <div class="hidden-md-and-up">
          <v-btn
            :class="`${theme.dark ? 'black-bg' : 'white-bg'}`"
            text
            tile
            small
          >
            <v-icon @click="showPrintView()">mdi-printer</v-icon>
          </v-btn>
        </div>
        <div class="hidden-sm-and-down">
          <v-btn :class="`${theme.dark ? 'black-bg' : 'white-bg'}`" text tile>
            <v-icon @click="showPrintView()">mdi-printer</v-icon>
          </v-btn>
        </div>
        <Theme />
      </v-item-group>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav :density="width < 960 ? 'compact' : 'default'">
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="(item, i) in menu" :key="i" :to="item[1]">
            <v-list-item-title>{{ item[0] }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';

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
    this.$eventHub.$on('resize', this.setWidth);
  },
  methods: {
    ...mapActions(['updatePrintView']),
    setWidth() {
      this.width = window.innerWidth;
    },
    showPrintView() {
      this.$eventHub.$emit('update-printview');
      this.updatePrintView();
      this.$eventHub.$emit('force-blur');
    },
  },
};
</script>

<style scoped>
.title {
  padding: 1rem;
}
.filler {
  height: 1.6rem;
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
