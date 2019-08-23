<template>
  <div class="container is-fluid">
    <b-table
      :data="rows"
      striped
      hoverable
      focusable
      @dblclick="selectedItem"
    >
      <template slot-scope="props">
        <b-table-column field="vorname" label="Vorname">
          {{ props.row.vorname }}
        </b-table-column>
        <b-table-column field="nachname" label="Nachname">
          {{ props.row.nachname }}
        </b-table-column>
        <b-table-column field="krank" label="Krank">
          {{ props.row.krank }}
        </b-table-column>
        <b-table-column field="krankMitKind" label="Krank mit Kind">
          {{ props.row.krankMitKind }}
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
import AddPerson from '@/components/AddPerson.vue';

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      rows: [],
      selected: {},
      formData: {
        nachname: '',
        vorname: '',
      },
    };
  },
  methods: {
    addItem() {
      this.$buefy.modal.open({
        parent: this,
        component: AddPerson,
        hasModalCard: true,
        props: this.formData,
      });
    },
    selectedItem(item) {
      this.$router.push(`/edit/${item.nachname}/${item.vorname}`);
    },
    removeItem(item) {
      this.rows = this.rows.filter(row => row !== item);
    },
  },
  mounted() {
    this.rows = this.$store.getters.personenListe.map(person => Object.assign(person, {
      krank: this.$store.getters.anzahlAbwesenheitstage(person.vorname, person.nachname),
    }));
  },
};
</script>
