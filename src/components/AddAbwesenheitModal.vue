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
        <b-datepicker
          v-model="zeitraum"
          :month-names="monthNames"
          :day-names="dayNames"
          range
          inline
          required
        />
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
import {
  lightFormat,
  parse,
} from 'date-fns';

const parseDate = (date) => parse(`${date}Z`, 'yyyy-MM-ddX', new Date());

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
    index: {
      type: Number,
      default: () => -1,
    },
  },
  data() {
    return {
      zeitraum: null,
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
    };
  },
  methods: {
    save() {
      this.$emit('save', this.person, {
        ...this.abwesenheit,
        von: lightFormat(this.zeitraum[0], 'yyyy-MM-dd'),
        bis: lightFormat(this.zeitraum[1], 'yyyy-MM-dd'),
      }, this.index);
      this.$parent.close();
    },
  },
  mounted() {
    if (this.abwesenheit && this.abwesenheit.von.length > 0 && this.abwesenheit.bis.length > 0) {
      this.zeitraum = [parseDate(this.abwesenheit.von), parseDate(this.abwesenheit.bis)];
    }
  },
};
</script>

<style scoped>
.modal-card-foot{
  justify-content: end;
}
</style>
