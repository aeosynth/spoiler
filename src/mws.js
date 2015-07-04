export default function(cards, code) {
  let ret = ''
  for (let name in cards) {
    let card = cards[name]

    let {colors} = card
    let color =
      colors.length === 1 ? colors[0] :
      colors.length === 0 ? 'Art' :
      'Gld'
    
    ret += `
Card Name: ${card.name}
Card Color: ${color}
Mana Cost: ${card.cost}
Type & Class: ${card.type}
Pow/Tou: ${card.pt}
Card Text: ${card.text}
Flavor Text:
Artist:
Rarity: ${card.rarity}
Card #:
`
  }
  return ['txt', ret]
}
