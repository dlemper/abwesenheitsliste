<template>
  <div class="container is-fluid">
    <h1 class="is-size-4">{{ $route.params.vorname }} {{ $route.params.nachname }}</h1>
    <div class="field is-grouped">
      <p class="control">
        <b-button type="is-primary" @click="save()">Speichern</b-button>
      </p>
      <p class="control">
        <b-button @click="$router.back()">Abbrechen</b-button>
      </p>
    </div>
    <b-table :data="rows" striped>
      <template slot-scope="props">
        <b-table-column field="von" label="Von">
          <b-datepicker
            v-model="props.row.von"
            :month-names="monthNames"
            :day-names="dayNames"
            :first-day-of-week="1"
          >
          </b-datepicker>
        </b-table-column>
        <b-table-column field="bis" label="Bis">
          <b-datepicker v-model="props.row.bis"></b-datepicker>
        </b-table-column>
        <b-table-column field="art" label="Art">
          <b-select v-model="props.row.art">
            <option value="krank">Krank</option>
            <option value="krankMitKind">Krank mit Kind</option>
          </b-select>
        </b-table-column>
        <b-table-column>
          <template slot="header">
            <b-button type="is-success" icon-right="plus" @click="addItem()" />
          </template>
          <b-button type="is-danger" icon-right="trash-alt" @click="removeItem(props.row)" />
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      rows: [],
      dayNames: [
        'So',
        'Mo',
        'Di',
        'Mi',
        'Do',
        'Fr',
        'Sa',
      ],
      monthNames: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
      columns: [
        {
          field: 'von',
          label: 'Von',
        },
        {
          field: 'bis',
          label: 'Bis',
        },
        {
          field: 'art',
          label: 'Art',
        },
      ],
    };
  },
  methods: {
    addItem() {
      this.rows.push({
        von: new Date(),
        bis: new Date(),
        art: 'krank',
      });
    },
    removeItem(item) {
      this.rows = this.rows.filter(row => row !== item);
    },
    save() {
      this.$store.commit('updateAbwesenheiten', {
        vorname: this.$route.params.vorname,
        nachname: this.$route.params.nachname,
        abwesenheiten: this.rows,
      });

      this.$router.push('/');
    },
  },
  mounted() {
    this.rows = this.$store.getters
      .abwesenheitsListe(
        this.$route.params.vorname,
        this.$route.params.nachname,
      ).map(item => Object.assign(item, {
        von: new Date(item.von),
        bis: new Date(item.bis),
      }));
  },
};
</script>
