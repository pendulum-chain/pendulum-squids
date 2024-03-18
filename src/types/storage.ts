import * as amplitudeStorage from './amplitude/storage'
import * as foucocoStorage from './foucoco/storage'
import * as pendulumStorage from './pendulum/storage'
import { network } from '../config'

const storage =
    network === 'foucoco' || network === 'local'
        ? foucocoStorage
        : network === 'amplitude'
        ? amplitudeStorage
        : pendulumStorage

export { amplitudeStorage, foucocoStorage, pendulumStorage }

export default storage
