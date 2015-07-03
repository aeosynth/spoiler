import cheerio from 'cheerio'

let $

export default function(html) {
  $ = cheerio.load(html, { normalizeWhitespace: true })
  return $('.t-spoiler').map(parse).get()
}

function parse() {
  let $el = $(this)

  let rarity = $el
    .find('.t-spoiler-rarity span')
    .attr('class')
    .match(/\w+$/)[0]

  if (rarity === 'land' || rarity === 'unknown')
    return

  let name = $el.attr('id')

  let type = $el
    .find('.t-spoiler-type')
    .text()

  let cost = $el
    .find('.t-spoiler-mana')
    .text()
    .replace(/\s+/g, '')

  let color = cost.match(/\D*$/)[0].replace(/X/g, '')

  let cmc = (parseInt(cost) || 0) + color.length
  let colors = color.replace(/(.)\1+/g, '$1').split('')

  let text = $el
    .find('.t-spoiler-ability')
    .text()
    .trim()

  return { cmc, colors, cost, name, rarity, text, type }
}
