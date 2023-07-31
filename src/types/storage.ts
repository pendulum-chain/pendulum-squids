import * as amplitudeStorage from './amplitude/storage'
import * as foucocoStorage from './foucoco/storage'
import { network } from '../config'

const storage = network === 'foucoco' ? foucocoStorage : amplitudeStorage

export { amplitudeStorage, foucocoStorage }

export default storage
