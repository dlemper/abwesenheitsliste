<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Person hinzufügen</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Vorname">
        <b-input type="text" v-model="person.vorname" placeholder="Erika" required />
      </b-field>

      <b-field label="Nachname">
        <b-input type="text" v-model="person.nachname" placeholder="Mustermann" required />
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Abbrechen
      </button>
      <button class="button is-primary" @click="save()">
        Speichern
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'add-person-modal',
  props: {
    person: {
      type: Object,
      default: () => ({
        vorname: '',
        nachname: '',
        abwesenheiten: [],
      }),
    },
  },
  methods: {
    save() {
      this.$emit('save', this.person);
      this.$parent.close();
    },
  },
};
</script>
