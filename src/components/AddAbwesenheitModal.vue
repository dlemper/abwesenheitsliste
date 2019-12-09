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
          inline
          :unselectable-days-of-week="[0, 6]"
          :first-day-of-week="1"
          indicators="bars"
          :events="events"
          :mobile-native="false"
          :month-names="monthNames"
          :day-names="dayNames"
          :min-date="minDate"
          :max-date="maxDate"
          range
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
import locale from 'date-fns/esm/locale/de';
import {
  lightFormat,
  parse,
  lastDayOfYear,
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
    feiertage: Array,
  },
  data() {
    return {
      zeitraum: null,
      // ferien: [],
      bundesland: 'NI',
    };
  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();

      return [currentYear - 1, currentYear, currentYear + 1];
    },
    events() {
      // return [...this.feiertage, ...this.ferien];
      return this.feiertage;
    },
    monthNames() {
      return [...Array(12).keys()].map((i) => locale.localize.month(i, { width: 'wide' }));
    },
    dayNames() {
      return [...Array(7).keys()]
        .map((i) => locale.localize.day(i, { width: 'abbreviated' }))
        .map((n) => n.replace('.', ''));
    },
    minDate() {
      return this.years.length > 0 ? new Date(this.years[0], 0) : undefined;
    },
    maxDate() {
      return this.years.length > 0
        ? lastDayOfYear(new Date(this.years[this.years.length - 1], 0))
        : undefined;
    },
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
