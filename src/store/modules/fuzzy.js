/* eslint-disable no-console */
const state = {
  fuzzy: [],
  printFuzzy: []
};
const actions = {
  makePrintFuzzy({ commit }, fuzzyData) {
    commit(
      "mutatePrint",
      fuzzyData.reduce((output, row) => {
        row.needAid = false;
        row.severe = false;
        return [...output, row];
      }, [])
    );
  },
  updatePrintFuzzy({ commit }, input) {
    commit(
      "mutatePrint",
      state.printFuzzy.reduce((output, row) => {
        return [
          ...output,
          row.Desc === input.Desc
            ? {
                Desc: row.Desc,
                Obs: row.Obs,
                Dominios: row.Dominios,
                needAid: input.needAid,
                severe: input.severe
              }
            : row
        ];
      }, [])
    );
  },
  makeFuzzy({ commit }, input) {
    var dominios = input.Fuzzy.reduce((output, element) => {
      return [
        ...output,
        ...element.Dominios.filter(innerEl => {
          return !output.some(innerOut => innerOut === innerEl);
        })
      ];
    }, []).map(input.normalize);
    commit(
      "mutateFuzzy",
      input.scores.reduce((output, score) => {
        return [
          ...output,
          ...(dominios.some(el => input.normalize(score.Dominio) === el)
            ? [
                {
                  Desc: score.Desc,
                  Dominio: input.normalize(score.Dominio),
                  switch: false
                }
              ]
            : [])
        ];
      }, [])
    );
  },
  updateFuzzy({ commit }, update) {
    var dominio = update.scores.filter(score => {
      return score.Dominio.toLowerCase().includes(update.dominio.toLowerCase());
    })[0];
    commit(
      "mutateFuzzy",
      state.fuzzy.reduce((fuzzyOutput, fuzzyRow) => {
        var _50 = dominio.SubDominios.some(subdominio => {
          return (
            parseInt(subdominio.medical, 10) <= 50 ||
            parseInt(subdominio.social, 10) <= 50
          );
        });
        var _75 = _50
          ? false
          : dominio.SubDominios.every(subdominio => {
              return (
                parseInt(subdominio.medical, 10) == 75 &&
                parseInt(subdominio.social, 10) == 75
              );
            });
        return [
          ...fuzzyOutput,
          fuzzyRow.Dominio.includes(update.dominio.toLowerCase())
            ? {
                Desc: fuzzyRow.Desc,
                Dominio: fuzzyRow.Dominio,
                switch: _50 || _75
              }
            : fuzzyRow
        ];
      }, [])
    );
  }
};

const mutations = {
  mutateFuzzy: (state, fuzzy) => (state.fuzzy = fuzzy),
  mutatePrint: (state, printFuzzy) => (state.printFuzzy = printFuzzy)
};
const getters = {
  fuzzy: state => state.fuzzy,
  printFuzzy: state => state.printFuzzy
};

export default {
  state,
  actions,
  mutations,
  getters
};
