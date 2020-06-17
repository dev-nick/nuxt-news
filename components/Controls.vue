<template>
  <b-container class="controller">
    <b-row>
      <b-form-select
        v-model="edition"
        :options="editions"
        class="selectedition"
        @change="changeEdition()"
      ></b-form-select>
    </b-row>

    <b-row class="topicnav">
      <b-nav vertical class="w-25">
        <b-nav-item @click="changeTopic('WORLD')">
          WORLD
        </b-nav-item>
        <b-nav-item @click="changeTopic('NATION')">
          NATION
        </b-nav-item>
        <b-nav-item @click="changeTopic('BUSINESS')">
          BUSINESS
        </b-nav-item>
        <b-nav-item @click="changeTopic('TECHNOLOGY')">
          TECHNOLOGY
        </b-nav-item>
        <b-nav-item @click="changeTopic('ENTERTAINMENT')">
          ENTERTAINMENT
        </b-nav-item>
        <b-nav-item @click="changeTopic('SPORTS')">
          SPORTS
        </b-nav-item>
        <b-nav-item @click="changeTopic('SCIENCE')">
          SCIENCE
        </b-nav-item>
        <b-nav-item @click="changeTopic('HEALTH')">
          HEALTH
        </b-nav-item>
      </b-nav>
    </b-row>
  </b-container>
</template>

<script>
/*
                                  cancel all other pic xhr when nav xhr is activated
*/
import axios from 'axios'
export default {
  name: 'Controls',
  data: () => ({
    edition: '',
    editions: []
  }),
  computed: {
    location() {
      return this.$store.state.edition
    }
  },
  watch: {
    location(oldval, newval) {
      if (this.edition === '') {
        this.edition = this.location
      }
    }
  },
  async mounted() {
    try {
      const resp = await axios.get('editions.json')
      this.editions = resp.data
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    changeEdition() {
      this.$store.commit('location', this.edition)
    },
    changeTopic(topic) {
      this.$store.commit('topichange', topic)
    }
  }
}
</script>

<style scoped>
v-container {
  width: 100px;
  min-height: 100%;
  float: left;
}
.controller {
  display: block;
  margin-top: 50px;
}
.topicnav {
  margin-top: 50px;
  text-align: left;
}
.selectedition {
  width: 150px;
}
</style>
