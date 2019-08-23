<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Person hinzufügen</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Vorname">
          <b-input
            type="text"
            :value="vorname"
            placeholder="Erika"
            required>
          </b-input>
        </b-field>

        <b-field label="Nachname">
          <b-input
            type="text"
            :value="nachname"
            placeholder="Mustermann"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Abbrechen</button>
        <button class="button is-primary" @click="add()">Hinzufügen</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'add-person',
  props: {
    vorname: String,
    nachname: String,
  },
  methods: {
    add() {
      console.log(this.vorname, this.nachname);
      this.$parent.close();
    },
  },
};
</script>
