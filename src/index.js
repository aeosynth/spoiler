import fs from 'fs'
import fetch from 'node-fetch'

import cock from './cock'
import config from '../config'
import mws from './mws'
import mtgs from './mtgs'
import wiz from './wiz'

const {CODE, cardsURL, imagesURL} = config

function ok(res) {
  if (res.ok)
    return res.text()
  throw `fetch error: ${res.status} ${res.statusText}`
}

const promises = [imagesURL, cardsURL].map(url => fetch(url).then(ok))

Promise
  .all(promises)
  .then(go, console.log)

function go(vals) {
  const cards = {}

  mtgs(vals[1]).forEach(x =>
    cards[x.name.toLowerCase()] = x)

  wiz(vals[0]).forEach(x => {
    if (x.name in cards)
      cards[x.name].url = x.url
    else
      console.log('text not found:', x.name)
  })

  for (let name in cards)
    if (!cards[name].url) {
      console.log('image not found:', name)
      delete cards[name]
    }

  fix(cards)
  write(cards)
}

function fix(cards) {
  cards['brute strength'].rarity = 'Common'
}

function write(cards) {
  try {
    fs.mkdirSync('data')
  } catch(err) {}

  let [ext, text] = cock(cards, CODE)
  fs.writeFileSync(`data/${CODE}.${ext}`, text)

  ;[ext, text] = mws(cards)
  fs.writeFileSync(`data/${CODE}.${ext}`, text)

  const cardsArr = Object.keys(cards).map(x => cards[x])
  text = JSON.stringify({ cards: cardsArr, code: CODE }, null, 2)
  fs.writeFileSync(`data/${CODE}.json`, text)
}
