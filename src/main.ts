import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import eventBus from "@/utils/eventBus";

import { VueMaskDirective } from "v-mask";

import { custom } from "./plugins/custom";
import vuetify from "@/plugins/vuetify";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

app.provide("$eventHub", eventBus);
app.config.globalProperties.productionTip = false;
app.config.globalProperties.$custom = custom;

app.directive("mask", VueMaskDirective);
app.use(router);
app.use(store);
app.use(vuetify);

app.component("VueDatePicker", VueDatePicker);

app.mount("#app");
