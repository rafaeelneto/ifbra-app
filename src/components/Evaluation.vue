<template>
  <div :class="`form ${!theme.dark ? theme.color : ''} d-flex`">
    <v-container>
      <v-row dense class="d-flex text-center justify-center">
        <h1 class="font-weight-bold display-3 basil--text">
          Avaliação Médica Funcional
        </h1>
      </v-row>
      <v-row dense class="d-flex text-center justify-start">
        <v-col md="3" cols="12">
          <!-- small col -->
          <DateDialog label="Data da Avaliação" @inner-date="setDate($event)" />
        </v-col>
      </v-row>
      <v-row dense class="d-flex text-center justify-center">
        <!-- eval name -->
        <v-col md="7" cols="12" class="d-flex">
          <v-text-field
            v-model="name"
            justify-start
            density="compact"
            variant="outlined"
            label="Nome do avaliador"
            @keydown.enter="addEval()"
            :hint="hintEvalName"
            :persistent-hint="hintEvalName.length > 0"
            ref="evalName"
          />
        </v-col>
        <!-- eval type -->
        <v-col md="2" cols="7">
          <CheckList
            :inner-items="evaluatorType"
            inner-label="Tipo de avaliador"
            @selected-items="type = $event"
            ref="evalType"
            density="compact"
            :allow-multiple="false"
            variant="outlined"
            :inner-hint="hintTypeEval"
            :allow-clean="true"
          />
        </v-col>
        <!-- eval registry -->
        <v-col md="2" cols="4">
          <v-text-field
            v-model="registry.value"
            justify-start
            density="compact"
            variant="outlined"
            :label="registryType"
            @keydown.enter="addEval()"
            :hint="hintEvalValue"
            :persistent-hint="hintEvalValue.length > 0"
            ref="evalValue"
          />
        </v-col>
        <!-- eval button -->
        <v-col md="1" cols="1" class="d-flex justify-center text-center">
          <v-btn @click="addEval()" color="secondary" icon class="align-center">
            <v-icon>mdi-plus-box</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        v-for="evaluator in allEvaluators"
        :key="evaluator.id"
        dense
        class="d-flex align-center"
      >
        <v-col md="7" cols="12" class="d-flex">
          <v-text-field
            :model-value="evaluator.name"
            label="Nome do avaliador"
            density="compact"
            variant="outlined"
            rows="1"
            disabled
            auto-grow
            class="align-start"
          />
        </v-col>
        <v-col md="2" cols="6" class="d-flex">
          <v-text-field
            :model-value="evaluator.type"
            label="Tipo de avaliador"
            density="compact"
            variant="outlined"
            rows="1"
            disabled
            auto-grow
            class="align-start"
          />
        </v-col>
        <v-col md="2" cols="5" class="d-flex">
          <v-text-field
            :model-value="evaluator.registry.value"
            :label="evaluator.registry.label"
            density="compact"
            variant="outlined"
            rows="1"
            disabled
            auto-grow
            class="align-start"
          />
        </v-col>
        <v-col md="1" cols="1" class="d-flex justify-center">
          <v-btn
            @click="removeEvaluator(evaluator.id)"
            icon
            class="align-center"
          >
            <v-icon>mdi-minus-box</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CheckList from '@/components/CheckList.vue';
import DateDialog from '@/components/DateDialog.vue';

export default {
  data() {
    return {
      evaluatorType: ['Médico', 'Assistente Social'],
      registryType: 'Registro profissional',
      name: '',
      type: '',
      registry: {
        value: '',
        label: '',
      },
      count: 0,
      hintTypeEval: '',
      hintEvalName: '',
      hintEvalValue: '',
    };
  },
  components: {
    CheckList,
    DateDialog,
  },
  methods: {
    ...mapActions(['addEvaluator', 'removeEvaluator', 'setDate']),
    addEval() {
      if (this.name.length === 0) {
        this.hintEvalName = 'Insira o nome do avaliador';
        this.$refs.evalName.focus();
        return;
      } else {
        this.hintEvalName = '';
      }

      if (this.type.length === 0) {
        this.hintTypeEval = 'Insira tipo de avaliador';
        this.$refs.evalType.innerFocus();
        return;
      } else {
        this.hintTypeEval = '';
      }

      if (this.registry.value.length === 0) {
        this.hintEvalValue = 'Insira registro profissional';
        this.$refs.evalValue.innerFocus();
        return;
      } else {
        this.hintEvalValue = '';
      }

      const evaluator = {
        id: this.count,
        type: this.type,
        registry: this.registry,
        name: this.name,
      };
      this.count++;
      this.addEvaluator(evaluator);
      this.name = '';
      this.registryType = 'Registro profissional';
      this.registry = {
        value: '',
        label: '',
      };
      this.$refs.evalType.clear();
    },
  },
  watch: {
    type() {
      if (!this.type) return;
      const normalizedType = this.$custom.normalize(this.type).toLowerCase();
      if (normalizedType === 'medico') {
        this.registryType = 'CRM';
        this.registry.label = 'CRM';
      }
      if (normalizedType.includes('social')) {
        this.registryType = 'CRESS';
        this.registry.label = 'CRESS';
      }
    },
  },
  computed: {
    ...mapGetters(['allEvaluators', 'theme']),
    required() {
      return (val) => [(val || '').length > 0 || 'Campo obrigatório'];
    },
  },
};
</script>

<style scoped>
.pad-top {
  margin-top: 1rem;
}
</style>
