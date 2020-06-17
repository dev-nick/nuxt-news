export const state = () => ({
  topicbaseurl: 'https://news.google.com/news/rss/headlines/section/topic/',
  urltemplate: 'https://news.google.com/rss?gl=',
  url: 'https://news.google.com/rss?gl=',
  edition: ''
})

export const mutations = {
  topichange(state, topic) {
    state.url = state.topicbaseurl + topic + '?gl=' + state.edition
  },
  location(state, country) {
    if (state.url.endsWith('gl=')) {
      state.url = state.url + country
    } else {
      state.url = state.url.slice(0, -2) + country
    }
    state.edition = country
  },
  search(state, query) {
    state.url = state.urltemplate + state.edition + '&q=' + query
  }
}
