import * as amplitudeSupport from './amplitude/support'
import * as foucocoSupport from './foucoco/support'

const network = process.env.NETWORK || 'amplitude'

const support = network === 'foucoco' ? foucocoSupport : amplitudeSupport

export default support
