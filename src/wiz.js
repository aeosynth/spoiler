import $ from 'cheerio'
import _ from './_'

export default function(html) {
  return $('p[align] img', html).map(parse).get()
}

function parse() {
  const $el = $(this)
  const name = _.ascii($el.attr('alt')).toLowerCase()
  const url = $el.attr('src')

  return { name, url }
}
