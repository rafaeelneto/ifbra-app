<template>
  <div :class="`${!theme.dark ? theme.color : ''} pt-4`">
    <v-card :class="`${!theme.dark ? theme.color : ''}`">
      <v-tabs v-model="tab" grow bg-color="primary">
        <v-tab class="d-flex justify-start">
          Detalhamento de pontuação do INSS
        </v-tab>
        <v-tab class="d-flex justify-start"> Descrição das Barreiras </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item>
          <INSS />
        </v-window-item>
        <v-window-item>
          <Barriers />
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import INSS from '@/components/INSS.vue';
import Barriers from '@/components/Barriers.vue';

export default {
  name: 'Helper',
  data() {
    return {
      tab: null,
    };
  },
  computed: mapGetters(['theme']),
  components: {
    INSS,
    Barriers,
  },
};
</script>

<style scoped>
h3 {
  padding-top: 1rem;
}
.vertical {
  transform: rotate(270deg);
}
.wrap {
  width: 1ch;
  word-break: break-all;
}
.vertical-pad {
  font-size: 80%;
  margin-top: 1rem;
}
</style>
