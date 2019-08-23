import Vue from 'vue';
import Vuex from 'vuex';
import {
  eachDayOfInterval,
} from 'date-fns';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bundesland: 'NI',
    personen: [
      {
        nachname: 'Lemper',
        vorname: 'Daniel',
        abwesenheiten: [
          {
            von: new Date('2019-07-21'),
            bis: new Date('2019-08-02'),
            art: 'krank',
          },
        ],
      },
      {
        nachname: 'Lemper',
        vorname: 'Katharina',
        abwesenheiten: [
          {
            von: new Date('2019-01-01'),
            bis: new Date('2019-01-03'),
            art: 'krankMitKind',
          },
        ],
      },
    ],
  },
  mutations: {
    updateAbwesenheiten(state, payload) {
      state.personen
        .find(person => person.nachname === payload.nachname
          && person.vorname === payload.vorname)
        .abwesenheiten = payload.abwesenheiten;
    },
  },
  getters: {
    abwesenheitsListe: state => (vorname, nachname) => state.personen
      .find(person => person.nachname === nachname && person.vorname === vorname)
      .abwesenheiten,
    personenListe: state => state.personen.map(n => Object.assign({
      krank: 0,
      krankMitKind: 0,
    }, n)),
    anzahlAbwesenheitstage: state => (vorname, nachname) => state.personen
      .find(person => person.nachname === nachname && person.vorname === vorname)
      .abwesenheiten
      .reduce((acc, abw) => acc + eachDayOfInterval({
        start: abw.von,
        end: abw.bis,
      }).length, 0),
  },
});
