import {parseString} from 'xml2js'
import _ from './_'

export default function(xml, cb) {
  parseString(xml, (err, result) =>
    cb(result.rss.channel[0].item.map(x => parse(x.description[0]))))
}

function parse(desc) {
  const tmp = {}
  desc
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
        .match(/(.+?): ([^]+)/)

      if (!match)
        return

      const [, key, val] = match
      tmp[key.toLowerCase()] = val.trim()
    })

  const {name, type, rarity} = tmp
  const cost = tmp.cost || ''
  const num = tmp['set number'].slice(1)
  const pt = tmp['pow/tgh']
  const text = tmp['rules text']

  const color = cost.match(/\D*$/)[0].replace(/X/g, '')
  const cmc = (parseInt(cost) | 0) + color.length
  const colors = /^Devoid/.test(text)
    ? []
    : color.replace(/(.)\1+/g, '$1').split('')

  return { cmc, colors, cost, name, num, pt, rarity, text, type }
}
