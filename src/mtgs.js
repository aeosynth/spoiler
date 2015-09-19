import $ from 'cheerio'
import _ from './_'

export default function(xml) {
  return $('item description', xml).map(parse).get()
}

function parse() {
  const tmp = {}
  $(this).text()
    .replace(/\r/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&bull;/g, '*')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .match(/\n[^]+?<br>/g)
    .forEach(s => {
      const match = s
        .replace(/\<.+?\>/g, '')
        .match(/(.+?): ([^]*)/)

      if (!match)
        return

      const [, key, val] = match
      tmp[key.toLowerCase()] = val.trim()
    })

  const {cost, name, rarity} = tmp
  const num = tmp['set number'].slice(1)
  const type = tmp.type.replace('-', '—')
  const pt = type.includes('Creature')
    ? tmp['pow/tgh']
    : ''
  const text = tmp['rules text']

  const color = cost.match(/\D*$/)[0].replace(/X/g, '')
  const cmc = (parseInt(cost) | 0) + color.length
  const colors = /^Devoid/.test(text)
    ? []
    : color.replace(/(.)\1+/g, '$1').split('')

  return { cmc, colors, cost, name, num, pt, rarity, text, type }
}
