<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Abwesenheit hinzufügen</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Art">
        <b-select v-model="abwesenheit.art" required>
          <option value="krank">Krank</option>
          <option value="krankMitKind">Krank mit Kind</option>
        </b-select>
      </b-field>
      <b-field label="Zeitraum">
        <b-datepicker v-model="zeitraum" range inline required />
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">
        Abbrechen
      </button>
      <button class="button is-primary" @click="save()">
        Speichern
      </button>
    </footer>
  </div>
</template>

<script>
import {
  lightFormat,
} from 'date-fns';

export default {
  name: 'add-abwesenheit-modal',
  props: {
    person: Object,
    abwesenheit: {
      type: Object,
      default: () => ({
        von: '',
        bis: '',
        art: 'krank',
      }),
    },
  },
  data() {
    return {
      zeitraum: [],
    };
  },
  methods: {
    save() {
      this.$emit('save', this.person, Object.assign({}, this.abwesenheit, {
        von: lightFormat(this.abwesenheit.von, 'yyyy-MM-dd'),
        bis: lightFormat(this.abwesenheit.bis, 'yyyy-MM-dd'),
      }));
    },
  },
};
</script>
