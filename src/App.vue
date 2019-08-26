<template>
  <div id="app">
    <b-navbar type="is-info">
      <template slot="brand">
        <b-navbar-item href="/">Abwesenheitsliste</b-navbar-item>
      </template>
      <!--<template slot="start">
        <b-navbar-item href="#">Home</b-navbar-item>
        <b-navbar-item href="#">Documentation</b-navbar-item>
      </template>-->

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-light">Upload</a>
            <a class="button is-light">Download</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <div id="container is-fluid">
      <b-table
        :data="personen"
        detailed
        hoverable
        custom-detail-row
        default-sort="nachname"
        show-detail-icon
      >
        <template slot-scope="props">
          <b-table-column
            field="nachname"
            label="Nachname"
            width="300"
            sortable
          >
            <template>{{ props.row.nachname }}</template>
          </b-table-column>

          <b-table-column
            field="vorname"
            label="Vorname"
            sortable
          >{{ props.row.vorname }}</b-table-column>

          <b-table-column
            label="Krank"
            centered
          >
            {{ anzahlAbwesenheitstage(props.row.abwesenheiten) }}
          </b-table-column>

          <b-table-column
            label="Krank mit Kind"
            centered
          >
            {{ anzahlKrankMitKind(props.row.abwesenheiten) }}
          </b-table-column>

          <b-table-column
            sortable
          >
            <template slot="header">
              <b-button
                class="is-add-btn"
                icon-left="plus"
                size="is-small"
                type="is-success"
                @click="isAddPersonModalActive = true"
              />
            </template>
            <div class="buttons has-addons">
              <b-button
                icon-left="trash-alt"
                size="is-small"
                type="is-danger"
                @click="isDeletePersonModalActive = true"
              />
              <b-button
                icon-left="pencil-alt"
                size="is-small"
                @click="isAddPersonModalActive = true"
              />
              <b-button
                icon-left="plus"
                size="is-small"
                type="is-success"
                @click="isAddAbwModalActive = true"
              />
            </div>
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <tr
            v-for="(item, index) in props.row.abwesenheiten"
            :key="index" class="has-background-light"
          >
            <td></td>
            <td></td>
            <td>
              {{ item.art === 'krank' ? 'Krank' : 'Krank mit Kind' }}
            </td>
            <td class="has-text-centered">
              {{ item.von | date}}
            </td>
            <td class="has-text-centered">
              {{ item.bis | date }}
            </td>
            <td>
              <div class="buttons has-addons">
                <b-button
                  icon-left="trash-alt"
                  size="is-small"
                  type="is-danger"
                  @click="isDeleteAbwModalActive = true"
                />
                <b-button icon-left="pencil-alt" size="is-small" />
              </div>
            </td>
          </tr>
        </template>
      </b-table>
    </div>
    <b-modal :active.sync="isAddPersonModalActive" has-modal-card>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Person hinzufügen</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Vorname">
            <b-input type="text" :value="vorname" placeholder="Erika" required />
          </b-field>

          <b-field label="Nachname">
            <b-input type="text" :value="nachname" placeholder="Mustermann" required />
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isAddPersonModalActive = false">
            Abbrechen
          </button>
          <button class="button is-primary" @click="isAddPersonModalActive = false">
            Speichern
          </button>
        </footer>
      </div>
    </b-modal>
    <b-modal :active.sync="isAddAbwModalActive" has-modal-card>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Abwesenheit hinzufügen</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Art">
            <b-select v-model="neueAbwesenheit.art" required>
              <option value="krank">Krank</option>
              <option value="krankMitKind">Krank mit Kind</option>
            </b-select>
          </b-field>

          <b-field label="Zeitraum">
            <b-datepicker v-model="neueAbwesenheit.zeitraum" range inline required />
          </b-field>

          <!--<b-field label="Nachname">
            <b-input type="text" :value="nachname" placeholder="Mustermann" required />
          </b-field>-->
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isAddAbwModalActive = false">
            Abbrechen
          </button>
          <button class="button is-primary" @click="isAddAbwModalActive = false">
            Speichern
          </button>
        </footer>
      </div>
    </b-modal>
    <b-modal :active.sync="isDeletePersonModalActive" has-modal-card>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ vorname }} {{ nachname}} löschen?</p>
        </header>
        <section class="modal-card-body">
          Wollen Sie {{ vorname }} {{ nachname}} wirklich löschen?
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isDeletePersonModalActive = false">
            Abbrechen
          </button>
          <button class="button is-danger" @click="isDeletePersonModalActive = false">
            Löschen
          </button>
        </footer>
      </div>
    </b-modal>
    <b-modal :active.sync="isDeleteAbwModalActive" has-modal-card>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Abwesenheit {{ von | date }} - {{ bis | date}} löschen?</p>
        </header>
        <section class="modal-card-body">
          Wollen Sie Abwesenheit {{ art === 'krank' ? 'Krank' : 'Krank mit Kind' }}
          {{ von | date }} - {{ bis | date }} wirklich löschen?
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isDeleteAbwModalActive = false">
            Abbrechen
          </button>
          <button class="button is-danger" @click="isDeleteAbwModalActive = false">
            Löschen
          </button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  eachDayOfInterval,
  parse,
  lightFormat,
  isWeekend,
} from 'date-fns';
// import HelloWorld from './components/HelloWorld.vue';

const parseDate = date => parse(`${date}Z`, 'yyyy-MM-ddX', new Date());

export default {
  name: 'app',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      isAddPersonModalActive: false,
      isAddAbwModalActive: false,
      isDeleteAbwModalActive: false,
      isDeletePersonModalActive: false,
      neueAbwesenheit: { art: 'krank' },
      bundesland: 'NI',
      feiertage: [],
      personen: [
        {
          nachname: 'Lemper',
          vorname: 'Daniel',
          abwesenheiten: [
            {
              von: '2019-07-21',
              bis: '2019-08-02',
              art: 'krank',
            },
          ],
        },
        {
          nachname: 'Lemper',
          vorname: 'Katharina',
          abwesenheiten: [
            {
              von: '2019-01-01',
              bis: '2019-01-03',
              art: 'krankMitKind',
            },
            {
              von: '2019-12-24',
              bis: '2019-12-30',
              art: 'krankMitKind',
            },
          ],
        },
      ],
    };
  },
  methods: {
    addAbwesenheit(person, abwesenheit) {
      person.abwesenheiten.push(abwesenheit);
    },
    addPerson(person) {
      this.personen.push(person);
    },
    anzahlAbwesenheitstage(abwesenheiten) {
      return abwesenheiten
        .filter(item => item.art === 'krank')
        .reduce((acc, item) => acc
          + eachDayOfInterval({
            start: parseDate(item.von),
            end: parseDate(item.bis),
          })
            .filter(day => !this.feiertage.includes(lightFormat(day, 'yyyy-MM-dd')))
            .filter(day => !isWeekend(day))
            .length,
        0);
    },
    anzahlKrankMitKind(abwesenheiten) {
      return this.feiertage.length > 0
        ? abwesenheiten
          .filter(item => item.art === 'krankMitKind')
          .reduce((acc, item) => acc
            + eachDayOfInterval({
              start: parseDate(item.von),
              end: parseDate(item.bis),
            })
              .filter(day => !this.feiertage.includes(lightFormat(day, 'yyyy-MM-dd')))
              .filter(day => !isWeekend(day))
              .length,
          0)
        : '';
    },
  },
  mounted() {
    const currentYear = (new Date()).getFullYear();

    Promise.all(
      [currentYear - 1, currentYear, currentYear + 1]
        .map(year => fetch(`https://feiertage-api.de/api/?jahr=${year}&nur_land=${this.bundesland}`)),
    )
      .then((years) => {
        years.forEach(async (year) => {
          if (year.ok) {
            const tage = await year.json();

            this.feiertage.push(...Object.values(tage).map(tag => tag.datum));
          }
        });
      })
      .catch(console.error);
  },
  filters: {
    date(value) {
      return value
        ? Intl
          .DateTimeFormat(window.navigator.language, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .format(parseDate(value))
        : '';
    },
  },
};
</script>

<style>
.is-add-btn {
  width: 27px;
  height: 27px;
}

.is-add-btn .icon {
  margin-left: 0 !important;
  height: 1.2rem !important;
}
</style>
