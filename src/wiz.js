import cheerio from 'cheerio'
import _ from './_'

let $

export default function(html) {
  $ = cheerio.load(html)
  return $('p[align] img').map(parse).get()
}

function parse() {
    const $el = $(this)
    const name = _.ascii($el.attr('alt')).toLowerCase()
    const url = $el.attr('src')

    return { name, url }
}
