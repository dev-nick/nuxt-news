<template>
  <div class="maindiv">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Nuxt-News</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search for news"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container class="bodycontainer">
      <b-row>
        <b-col md="3"> <Controls /> </b-col>
        <b-col md="9">
          <div class="newscontainer">
            <News />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import News from '@/components/News'
import Controls from '@/components/Controls'

export default {
  components: {
    News,
    Controls
  }
}
</script>

<style scoped>
.newscontainer {
  width: 100%;
  min-width: 100%;
}

.bodycontainer {
  margin: 80px auto;
  min-width: 80vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f2f2f2;
  padding-top: 50px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.maindiv {
  background-color: #f6f6f6;
  background-image: linear-gradient(315deg, #f6f6f6 0%, #e9e9e9 74%);
}
</style>
