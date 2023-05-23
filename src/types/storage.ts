import * as amplitudeStorage from './amplitude/storage'
import * as foucocoStorage from './foucoco/storage'

const network = process.env.NETWORK || 'amplitude'
const storage = network === 'foucoco' ? foucocoStorage : amplitudeStorage

export default storage
