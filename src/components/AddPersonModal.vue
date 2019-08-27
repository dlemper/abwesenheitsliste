<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Person hinzufügen</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Vorname">
        <b-input type="text" v-model="vorname" placeholder="Erika" required />
      </b-field>

      <b-field label="Nachname">
        <b-input type="text" v-model="nachname" placeholder="Mustermann" required />
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">
        Abbrechen
      </button>
      <button class="button is-primary" @click="$emit('save', { vorname, nachname })">
        Speichern
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'add-person-modal',
  props: {
    vorname: String,
    nachname: String,
  },
};
</script>
