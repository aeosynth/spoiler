export default function(cards, code) {
  function doCards() {
    let ret = ''
    for (let name in cards) {
      let card = cards[name]
      let colors = card.colors.map(color => `\
      <color>${color}</color>`).join('\n')
      let cost = card.cost ? `<manacost>${card.cost}</manacost>` : ''

      if (card.type.startsWith('Planeswalker'))
        card.pt = null
      let pt = card.pt ? `<pt>${card.pt}</pt>` : ''

      ret += `
    <card>
      <name>${card.name}</name>>
      <set picURL="${card.url}">${code}</set>
${colors}
      ${cost}
      ${pt}
      <type>${card.type}</type>
      <text>${card.text}</text>
    </card>`
    }
    return ret
  }

  return ['cod', `\
<cockatrice_carddatabase version="3">
  <cards>${doCards()}
  </cards>
</cockatrice_carddatabase>`]
}
