<template>
  <div id="app">
    <b-navbar type="is-info">
      <template slot="brand">
        <b-navbar-item tag="div" class="is-size-5 has-text-weight-bold">
          Abwesenheitsliste
        </b-navbar-item>
      </template>
      <!--<template slot="start">
        <b-navbar-item href="#">Home</b-navbar-item>
        <b-navbar-item href="#">Documentation</b-navbar-item>
      </template>-->

      <template slot="end">
        <b-navbar-item href="https://github.com/dlemper/abwesenheitsliste">
          <b-icon pack="fab" icon="github" />
        </b-navbar-item>
        <b-navbar-item tag="div">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Coat_of_arms_of_Lower_Saxony.svg/26px-Coat_of_arms_of_Lower_Saxony.svg.png">
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-upload @input="upload">
              <a class="button is-light">
                <b-icon icon="upload" size="is-small" />
                <span>Upload</span>
              </a>
            </b-upload>
            <b-button type="is-light" icon-left="download" @click="downloadData()">
              Download
            </b-button>
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
        ref="table"
      >
        <template slot-scope="props">
          <b-table-column field="nachname" label="Nachname" sortable>
            <template>{{ props.row.nachname }}</template>
          </b-table-column>

          <b-table-column field="vorname" label="Vorname" sortable>
            {{ props.row.vorname }}
          </b-table-column>

          <b-table-column label="Krank" numeric centered>
            {{ anzahlAbwesenheitstage(props.row.abwesenheiten) }}
          </b-table-column>

          <b-table-column label="Krank mit Kind" numeric centered>
            {{ anzahlKrankMitKind(props.row.abwesenheiten) }}
          </b-table-column>

          <b-table-column>
            <template slot="header">
              <b-button
                class="is-add-btn"
                icon-left="plus"
                size="is-small"
                type="is-success"
                @click="openAddPersonModal()"
              />
            </template>
            <div class="buttons has-addons">
              <b-button
                icon-left="trash-alt"
                size="is-small"
                type="is-danger"
                @click="openDeletePersonModal(props.row)"
              />
              <b-button
                icon-left="pencil-alt"
                size="is-small"
                @click="openAddPersonModal(props.row)"
              />
              <b-button
                icon-left="plus"
                size="is-small"
                type="is-success"
                @click="openAddAbwesenheitModal(props.row)"
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
                  @click="openDeleteAbwesenheitModal(props.row, item)"
                />
                <b-button
                  icon-left="pencil-alt"
                  size="is-small"
                  @click="openAddAbwesenheitModal(props.row, item)"
                />
              </div>
            </td>
          </tr>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>Keine Abwesenheiten eingetragen.</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import {
  eachDayOfInterval,
  parse,
  lightFormat,
  isWeekend,
} from 'date-fns';
import AddPersonModal from './components/AddPersonModal.vue';
import AddAbwesenheitModal from './components/AddAbwesenheitModal.vue';
import DeletePersonModal from './components/DeletePersonModal.vue';
import DeleteAbwesenheitModal from './components/DeleteAbwesenheitModal.vue';

const parseDate = date => parse(`${date}Z`, 'yyyy-MM-ddX', new Date());

export default {
  name: 'app',
  data() {
    return {
      neueAbwesenheit: { art: 'krank' },
      bundesland: 'NI',
      feiertage: [],
      personen: [
        {
          vorname: '',
          nachname: '',
          abwesenheiten: [],
        },
      ],
    };
  },
  methods: {
    addAbwesenheit(person, abwesenheit, index) {
      if (index === -1) {
        person.abwesenheiten.push(abwesenheit);
      } else {
        person.abwesenheiten[index] = abwesenheit; // eslint-disable-line no-param-reassign

        // evil bad hack to let the table update the details rows
        this.$refs.table.toggleDetails(person);
        this.$refs.table.toggleDetails(person);
      }
    },
    addPerson(person, index) {
      if (index === -1) {
        this.personen.push(Object.assign({ abwesenheiten: [] }, person));
      } else {
        this.personen[index] = person;
      }
    },
    deletePerson(person) {
      this.personen = this.personen.filter(item => item !== person);
    },
    deleteAbwesenheit(person, abwesenheit) {
      person.abwesenheiten = person.abwesenheiten.filter(item => item !== abwesenheit); // eslint-disable-line no-param-reassign, max-len
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
    openModal(component, props, events) {
      this.$buefy.modal.open({
        parent: this,
        component,
        hasModalCard: true,
        props,
        events,
      });
    },
    openAddPersonModal(person) {
      this.openModal(AddPersonModal, {
        person,
        index: this.personen.indexOf(person),
      }, {
        save: this.addPerson,
      });
    },
    openAddAbwesenheitModal(person, abwesenheit) {
      this.openModal(AddAbwesenheitModal, {
        person,
        abwesenheit,
        index: person.abwesenheiten.indexOf(abwesenheit),
      }, {
        save: this.addAbwesenheit,
      });
    },
    openDeletePersonModal(person) {
      this.openModal(DeletePersonModal, { person }, { save: this.deletePerson });
    },
    openDeleteAbwesenheitModal(person, abwesenheit) {
      this.openModal(DeleteAbwesenheitModal, {
        person,
        abwesenheit,
      }, {
        save: this.deleteAbwesenheit,
      });
    },
    downloadDataAsFile(filename, data) { // from https://codepen.io/nigamshirish/pen/ZMpvRa
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    },
    downloadData() {
      this.downloadDataAsFile(
        `Abwesenheitsliste-${lightFormat(new Date(), 'yyyy-MM-dd')}.json`,
        JSON.stringify({
          bundesland: this.bundesland,
          personen: this.personen,
        }),
      );
    },
    upload(file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        this.personen = data.personen;
        this.bundesland = data.bundesland;
      };

      reader.readAsText(file);
    },
  },
  mounted() {
    // evil bad hack: if we initialize the table with data, columns get displayed
    //    and then we clear the table data
    this.personen = [];

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
