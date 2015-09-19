export default function(cards, code) {
  function doCards() {
    let ret = ''
    for (let name in cards) {
      const card = cards[name]

      const cost = card.cost ? `<manacost>${card.cost}</manacost>` : ''
      const pt = card.pt ? `<pt>${card.pt}</pt>` : ''

      const {type} = card
      const tablerow
        = type.includes('Creature') ? 2
        : type.includes('Land') ? 0
        : /Instant|Sorcery/.test(type) ? 3
        : 1

      const colors = card.colors.map(color => `\
      <color>${color}</color>`).join('\n')

      ret += `
    <card>
      <name>${card.name}</name>
      <set picURL="${card.url}">${code}</set>
${colors}
      ${cost}
      ${pt}
      <type>${card.type}</type>
      <tablerow>${tablerow}</tablerow>
      <text>${card.text}</text>
    </card>`
    }
    return ret
  }

  return ['xml', `\
<cockatrice_carddatabase version="3">
  <cards>${doCards()}
  </cards>
</cockatrice_carddatabase>`]
}
