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
  const text = tmp['rules text'] || ''

  const generic = parseInt(cost) | 0
  const specific = cost.match(/\D*$/)[0].replace(/X/g, '')

  const cmc = generic + specific.length
  const color = specific.replace(/C/g, '')
  const cid = color.replace(/(.)\1+/g, '$1').split('')
  const colors = text.startsWith('Devoid') ? [] : cid

  return { cid, cmc, colors, cost, name, num, pt, rarity, text, type }
}
