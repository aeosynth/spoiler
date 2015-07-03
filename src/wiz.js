import cheerio from 'cheerio'

let $

export default function(html) {
  $ = cheerio.load(html)
  return $('div[align] img').map(parse).get()
}

function parse() {
    let $el = $(this)
    let name = $el.attr('alt').replace('’', "'")
    let url = $el.attr('src')

    return { name, url }
}
