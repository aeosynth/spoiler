export default {
  ascii(s) {
    return s.replace(/[Æâàáéíöúû’]/g, c => {
      switch (c) {
      case 'Æ': return 'AE'
      case 'â': case 'à': case 'á': return 'a'
      case 'é': return 'e'
      case 'í': return 'i'
      case 'ö': return 'o'
      case 'ú': case 'û': return 'u'
      case '’': return "'"
      }
    })
  }
}
