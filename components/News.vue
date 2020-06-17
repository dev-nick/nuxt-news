<template>
  <div>
    <h3>{{ headline }}</h3>

    <!-- can use item,key,index fro v-for -->
    <b-row v-for="(item, i) in articles" :key="i">
      <b-card v-b-toggle="item.guid">
        <!-- card title not clickable :( -->
        <b-row no-gutters>
          <b-col md="3">
            <b-card-img-lazy
              v-if="item.image !== 'no'"
              :src="item.image"
              class="itemimg"
              img-top
            ></b-card-img-lazy>
          </b-col>

          <b-col md="9" class="card-text">
            <a class="card-title" :href="item.url">
              {{ item.title }}
              <span class="pubname">-{{ item.publisher }}</span></a
            >
          </b-col>
        </b-row>

        <b-collapse :id="item.guid">
          <br />
          <div v-for="(i, kk) in item.content" :key="kk">
            <b-link
              v-if="!i.title.toLowerCase().includes('view full coverage')"
              class="card-link"
              :href="i.link"
              >{{ i.title }}</b-link
            >
            <b-button
              v-else
              class="cardbutton"
              :href="i.link"
              variant="primary"
            >
              View Full Coverage
            </b-button>
          </div>
        </b-collapse>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'News',
  data: () => ({
    articles: {},
    headline: ''
  }),
  computed: {
    // to give default val to dropdown
    location() {
      // IMPPPPPPPP dont use arrow fn, it loses this.* context
      return this.$store.state.edition
    },
    geturl() {
      return this.$store.state.url // use these to change url on b-nav click
    }
  },
  watch: {
    geturl(oldval, newval) {
      if (oldval.slice(0, -2) !== newval) this.fetchrss()
    }
  }, // so do
  async mounted() {
    // url is updating now only add store url here
    try {
      const country = await axios.get('https://extreme-ip-lookup.com/json')

      this.fetchrss(country.data.countryCode)
    } catch (err) {
      console.error(err)
    }
  },
  methods: {
    async fetchrss(countrycodeee = 'def') {
      // defulat val then call defult rss else get from store
      // const corsproxy = 'https://cors-anywhere.herokuapp.com/'
      // const corsproxy = ''
      // let newsdata = {}
      // if (countrycodeee === 'def') {
      // newsdata = await axios.get(corsproxy + this.$store.state.url)
      // } else {
      // newsdata = await axios.get(
      // corsproxy + 'https://news.google.com/rss?gl=' + countrycodeee
      // )
      // }
      const newsdata = await axios.get('/api/newsapi')
      console.log(newsdata)

      this.headline = newsdata.data.headline
      this.articles = newsdata.data.items

      const arr = []
      this.articles.forEach((it, idx) => {
        arr.push(it.content[0].link)
      })

      const n = 3 // length of slice
      const result = new Array(Math.ceil(arr.length / n))
        .fill()
        .map((_) => arr.splice(0, n))
      let temp = null
      let cnt = 0
      for (const it of result) {
        temp = await axios.post('/api/imageapi', { data: it })
        temp.data.imglinks.forEach((it, index) => {
          this.$set(this.articles[cnt], 'image', temp.data.imglinks[index])
          cnt += 1
        })
      }
      if (countrycodeee !== 'def') this.$store.commit('location', countrycodeee)
    }
  }
}
</script>

<style scoped>
.card-title {
  color: #000 !important;
}
.card a {
  color: #0051d0;
}
.cardbutton {
  margin-top: 15px;
  color: #fff !important;
}
.card {
  margin-bottom: 20px;
  max-width: 60%;
  margin-left: 20%;
  text-align: left;
  font-kerning: none;
}
.card-title {
  overflow-wrap: break-word;
  color: #212529;
  font-weight: bold;
}
.itemimg {
  width: 110px;
  height: 80px;
}
.card-body {
  background-color: #e0e0e0;
}
.card-text {
  padding-left: 15px;
}
.pubname {
  color: gray;
}
</style>
