<template>
  <div :class="`print-btn ${!printView ? 'd-none' : ''}`">
    <v-card :class="`${theme.dark ? '' : theme.color}`">
      <PrintBar />
      <v-container id="print-section">
        <h1 class="text-center">Avaliação Médica Funcional</h1>
        <h3 class="text-center">
          <a
            href="https://www.in.gov.br/materia/-/asset_publisher/Kujrw0TZC2Mb/content/id/30050742/do1-2014-01-30-portaria-interministerial-n-1-de-27-de-janeiro-de-2014-30050738"
            target="_blank"
          >
            Portaria Interministerial Nº 1, de 27 de Janeiro DE 2014
          </a>
        </h3>
        <MiniReport />
        <v-divider class="divider" />
        <Form1 />
        <v-divider class="divider" />
        <Form2 />
        <v-divider class="divider" />
        <Form3 />
        <v-divider class="divider" />
        <Form4 />
        <v-divider class="divider" />
        <p style="page-break-before: always" />
        <Report :make-outlined="true" />
        <ClassificationBoard />
        <v-divider class="divider" />
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import eventBus from "@/utils/eventBus";
import { mapActions, mapGetters } from "vuex";

import PrintBar from "@/components/print/PrintBar.vue";
import Form1 from "@/components/print/Form1.vue";
import Form2 from "@/components/print/Form2.vue";
import Form3 from "@/components/print/Form3.vue";
import Form4 from "@/components/print/Form4.vue";
import MiniReport from "@/components/print/MiniReport.vue";
import ClassificationBoard from "@/components/print/ClassificationBoard.vue";
import Report from "@/components/Report.vue";

export default {
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
  }),
  methods: {
    ...mapActions(["updatePrintView"]),
    close() {
      this.updatePrintView();
      eventBus.emit("force-blur");
    },
    firstLast(name) {
      name = (name || "").length > 0 || "nome";
      let arr = name.split(" ");
      return arr.length > 1 ? [arr[0], arr[arr.length - 1]].join("_") : name;
    },
  },
  computed: mapGetters([
    "personal",
    "allEvaluators",
    "evalDate",
    "bodyFunctions",
    "allScores",
    "theme",
    "fuzzy",
    "printView",
  ]),
  components: {
    PrintBar,
    Form1,
    Form2,
    Form3,
    Form4,
    MiniReport,
    ClassificationBoard,
    Report,
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.printView) {
        this.close();
      }
    });
  },
};
</script>

<style scoped>
.divider {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}
.print-section {
  margin: 2em;
}
</style>
