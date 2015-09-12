import cheerio from 'cheerio'
import _ from './_'

let $

export default function(html) {
  $ = cheerio.load(html)
  return $('p[align] img').map(parse).get()
}

function parse() {
    let $el = $(this)
    let name = _.ascii($el.attr('alt')).toLowerCase()
    let url = $el.attr('src')

    return { name, url }
}
