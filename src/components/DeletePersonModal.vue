<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ person.vorname }} {{ person.nachname}} löschen?</p>
    </header>
    <section class="modal-card-body">
      Wollen Sie {{ person.vorname }} {{ person.nachname}} wirklich löschen?
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
export default {
  name: 'delete-person-modal',
  props: {
    person: Object,
  },
  methods: {
    save() {
      this.$emit('save', this.person);
      this.$parent.close();
    },
  },
};
</script>

<style scoped>
.modal-card-foot{
  justify-content: end;
}
</style>
