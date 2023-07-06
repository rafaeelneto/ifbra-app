<template>
  <v-card :class="`${theme.dark ? '' : theme.color} h-100`">
    <Evaluation />
    <v-container>
      <v-tabs
        class="hidden-sm-and-down tab-title"
        color="primary"
        v-model="tab"
        background-color="transparent"
        grow
      >
        <v-tab
          v-for="(item, n) in tabData"
          class="d-flex justify-center"
          :key="n"
        >
          {{ `Formulário ${n + 1}` }}
        </v-tab>
      </v-tabs>
      <v-tabs
        class="hidden-md-and-up"
        vertical
        v-model="tab"
        grow
        background-color="transparent"
      >
        <v-tab
          v-for="(item, n) in tabData"
          :key="n"
          class="d-flex justify-center"
        >
          Formulário {{ n + 1 }}
        </v-tab>
      </v-tabs>
    </v-container>

    <v-window v-model="tab">
      <v-window-item>
        <Form1 />
      </v-window-item>
      <v-window-item>
        <Form2 />
      </v-window-item>
      <v-window-item eager>
        <Form3 />
      </v-window-item>
      <v-window-item eager>
        <Form4 />
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

import Evaluation from '@/components/Evaluation.vue';
import TabTitle from '@/components/TabTitle.vue';
import Form1 from '@/components/forms/Form1.vue';
import Form2 from '@/components/forms/Form2.vue';
import Form3 from '@/components/forms/Form3.vue';
import Form4 from '@/components/forms/Form4.vue';

export default {
  components: {
    Evaluation,
    TabTitle,
    Form1,
    Form2,
    Form3,
    Form4,
  },
  data() {
    return {
      tab: null,
      tabData: [
        {
          subtitle: 'Identificação do Avaliado e da Avaliação',
          comment: 'Matriz',
        },
        {
          subtitle: 'Funções corporais acometidas',
          comment: 'a ser preenchido pelo médico perito',
        },
        {
          subtitle: 'Aplicação do Instrumento',
          comment: 'Matriz',
        },
        {
          subtitle: 'Aplicação do Modelo Linguístico Fuzzy',
          comment: '',
        },
      ],
      eager: [false, false, false],
    };
  },
  computed: mapGetters(['theme']),
};
</script>
<style>
@media only print {
  .print-hidden {
    display: none;
  }
}
.tab-title {
  font-size: 3em;
}
</style>
