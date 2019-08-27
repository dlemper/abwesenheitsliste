<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Abwesenheit {{ abwesenheit.von | date }} - {{ abwesenheit.bis | date}} löschen?
      </p>
    </header>
    <section class="modal-card-body">
      Wollen Sie Abwesenheit {{ abwesenheit.art === 'krank' ? 'Krank' : 'Krank mit Kind' }}
      {{ abwesenheit.von | date }} - {{ abwesenheit.bis | date }} wirklich löschen?
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">
        Abbrechen
      </button>
      <button class="button is-danger" @click="$emit('save', person, abwesenheit)">
        Löschen
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'delete-abwesenheit-modal',
  props: {
    person: Object,
    abwesenheit: Object,
  },
};
</script>

<style>

</style>
