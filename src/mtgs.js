import {parseString} from 'xml2js'
import _ from './_'

export default function(xml, cb) {
  parseString(xml, (err, result) =>
    cb(result.rss.channel[0].item.map(x => parse(x.description[0]))))
}

function parse(desc) {
  let tmp = {}
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
      let match = s
        .replace(/\<.+?\>/g, '')
        .match(/(.+?): ([^]+)/)

      if (!match)
        return

      let [, key, val] = match
      tmp[key.toLowerCase()] = val
    })

  let {name, cost, type, rarity} = tmp
  cost = cost || ''
  let num = tmp['set number'].slice(1)
  let pt = tmp['pow/tgh']
  let text = tmp['rules text']

  let color = cost.match(/\D*$/)[0].replace(/X/g, '')
  let cmc = (parseInt(cost) | 0) + color.length
  let colors = color.replace(/(.)\1+/g, '$1').split('')

  return { cmc, colors, cost, name, num, pt, rarity, text, type }
}
