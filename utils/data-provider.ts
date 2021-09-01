const dataProvider = require('faker')

// eslint-disable-next-line import/prefer-default-export
const id: string = 'TEST-AUTO-'.concat(dataProvider.random.uuid())

export default { id }
