import * as amplitudeSupport from './amplitude/support'
import * as foucocoSupport from './foucoco/support'
import * as pendulumSupport from './pendulum/support'

import { network } from '../config'

const support =
    network === 'foucoco'
        ? foucocoSupport
        : network === 'amplitude'
        ? amplitudeSupport
        : pendulumSupport

export default support
