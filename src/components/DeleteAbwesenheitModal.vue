<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Abwesenheit löschen?
      </p>
    </header>
    <section class="modal-card-body">
      Wollen Sie Abwesenheit {{ abwesenheit.art === 'krank' ? 'Krank' : 'Krank mit Kind' }}
      {{ abwesenheit.von | date }} - {{ abwesenheit.bis | date }} wirklich löschen?
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Abbrechen
      </button>
      <button class="button is-danger" @click="save()">
        Löschen
      </button>
    </footer>
  </div>
</template>

<script>
import {
  parse,
} from 'date-fns';

const parseDate = (date) => parse(`${date}Z`, 'yyyy-MM-ddX', new Date());

export default {
  name: 'delete-abwesenheit-modal',
  props: {
    person: Object,
    abwesenheit: Object,
  },
  methods: {
    save() {
      this.$emit('save', this.person, this.abwesenheit);
      this.$parent.close();
    },
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

<style scoped>
.modal-card-foot{
  justify-content: end;
}
</style>
