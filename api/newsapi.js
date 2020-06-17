const axios = require('axios')
const Parser = require('rss-parser')
const parser = new Parser()
const atob = require('atob')

module.exports = async (req, res) => {
  let headline = '', feed = []
  try {
    const xmldata = await axios.get('https://news.google.com/rss')
    feed = await parser.parseString(xmldata.data)
    headline = feed.title.slice(0, feed.title.indexOf('-'))

    feed.items.forEach((it) => {
      const titles = it.content.match(/blank">([^<]*)/g).map((i) => i.slice(7))
      const links = it.content
        .match(/"http([^"]*)" /g)
        .map((i) => i.slice(1, i.length - 2)) // combine these matches
      const publish = it.content
        .match(/>([^<]*)<\/font/g)
        .map((i) => i.slice(1, i.length - 6))
      publish.push('Google News')

      const r = []
      let x = []
      for (let i = 0; i < titles.length; i++) {
        if (i !== titles.length - 1) {
          links[i] = links[i].match(/articles[A-Za-z0-9+/=_-]*/)
          links[i] = links[i][0].slice(9)

          links[i] = atob(links[i].replace(/_/g, '/').replace(/-/g, '+')) // url safe decode
          /* eslint-disable no-control-regex */
          x = links[i].match(/(http[^\xD2\x01]+)/)
          /* eslint-enable no-control-regex */
          links[i] = x[1]
        }
        r.push({
          title: titles[i],
          link: links[i],
          publisher: publish[i]
        })
      }
      it.content = r
      it.image = 'no'
    })
  } catch (err) {
    console.log(err)
  }

  return res.status(200).json({
    headline: headline,
    items: feed.items
  })
}
