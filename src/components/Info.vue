<template>
  <div :class="`${theme.dark ? '' : theme.color}`">
    <v-container :class="`${theme.dark ? '' : theme.color}`">
      <v-card flat :class="`${theme.dark ? '' : theme.color}`">
        <v-card-title class="text-center justify-center">
          <h1 class="font-weight-bold display-3">Informações Legais</h1>
        </v-card-title>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          direction="vertical"
          grow
          class="hidden-md-and-up"
        >
          <v-tab class="d-flex justify-start"> Legenda </v-tab>
          <v-tab class="d-flex justify-start">
            Manual e Informações Legais
          </v-tab>
          <v-tab class="d-flex justify-start"> CID10 </v-tab>
        </v-tabs>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          class="hidden-sm-and-down"
          grow
        >
          <v-tab> Legenda </v-tab>
          <v-tab> Manual e Informações Legais </v-tab>
          <v-tab> CID10 </v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item>
            <Helper />
          </v-window-item>
          <v-window-item>
            <Manual />
          </v-window-item>
          <v-window-item>
            <CID10 />
          </v-window-item>
        </v-window>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Helper from '@/components/Helper.vue';
import Manual from '@/components/Manual.vue';
import CID10 from '@/components/CID10.vue';

export default {
  data() {
    return {
      tab: null,
    };
  },
  components: {
    Helper,
    Manual,
    CID10,
  },
  computed: mapGetters(['theme']),
};
</script>

<style></style>
