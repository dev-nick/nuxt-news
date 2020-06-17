// const axios = require('axios')
// const metascraper = require('metascraper')([require('metascraper-image')()])
// const got = require('got')
const ogs = require('open-graph-scraper')

module.exports = async (req, res) => {
  const imgtoget = req.body.data, links = []
  try {
    // foreach doesnt work with async
    for (const it of imgtoget) {
      const x = await ogs({ timeout: 1800, url: it })
      const index = imgtoget.indexOf(x.result.requestUrl)
      if (x.error) {
        links[index] = 'no'
      } else {
        links[index] = x.result.ogImage.url
      }
    }
  } catch (err) {
    console.log(err)
  }
  return res.status(200).json({
    imglinks: links
  })
}
