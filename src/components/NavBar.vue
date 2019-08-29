<template>
  <b-navbar type="is-info">
    <template slot="brand">
      <b-navbar-item tag="div" class="is-size-5 has-text-weight-bold">
        Abwesenheitsliste
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item href="https://github.com/dlemper/abwesenheitsliste">
        <b-icon pack="fab" icon="github" />
      </b-navbar-item>
      <b-navbar-item tag="div">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Coat_of_arms_of_Lower_Saxony.svg/26px-Coat_of_arms_of_Lower_Saxony.svg.png">
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-upload @input="$emit('upload', $event)">
            <a class="button is-light">
              <b-icon icon="upload" size="is-small" />
              <span>Upload</span>
            </a>
          </b-upload>
          <b-button type="is-light" icon-left="download" @click="$emit('download')">
            Download
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>