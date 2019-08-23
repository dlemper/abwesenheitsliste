<template>
  <div id="app">
    <b-navbar fixed-top type="is-info">
      <template slot="brand">
          <b-navbar-item>Abwesenheitsliste</b-navbar-item>
      </template>
      <!--<template slot="start">
        <b-navbar-item href="#">Home</b-navbar-item>
        <b-navbar-item href="#">Documentation</b-navbar-item>
      </template>-->
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-light">Download</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <br>
    <router-view/>
  </div>
</template>
