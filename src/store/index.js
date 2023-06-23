import { createStore } from "vuex";
import { VueMaskDirective } from "v-mask";
import evaluation from "./modules/evaluation";
import score from "./modules/score";
import theme from "./modules/theme";
import personal from "./modules/personal";
import print from "./modules/print";
import bodyFunctions from "./modules/bodyFunctions";
import fuzzy from "./modules/fuzzy";
import cid from "./modules/cid";

const store = createStore({
  modules: {
    evaluation,
    score,
    theme,
    personal,
    print,
    bodyFunctions,
    fuzzy,
    cid,
  },
});

export default store;
