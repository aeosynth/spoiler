export default function(cards, code) {
  function doCards() {
    let ret = ''
    for (let name in cards) {
      let card = cards[name]
      let colors = card.colors.map(color => `\
      <color>${color}</color>`).join('\n')

      ret += `
    <card>
      <name>${card.name}</name>>
      <set picURL="${card.url}">${code}</set>
${colors}
      <manacost>${card.cost}</manacost>
      <type>${card.type}</type>
      <text>${card.text}</text>
    </card>`
    }
    return ret
  }

  return `\
<cockatrice_carddatabase version="3">
  <cards>${doCards()}
  </cards>
</cockatrice_carddatabase>`
}
