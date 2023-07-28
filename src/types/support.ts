import * as amplitudeSupport from './amplitude/support'
import * as foucocoSupport from './foucoco/support'

import { network } from '../config'

const support = network === 'foucoco' ? foucocoSupport : amplitudeSupport

export default support
