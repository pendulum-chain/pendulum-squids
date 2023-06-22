import * as amplitudeEvents from './amplitude/events'
import * as foucocoEvents from './foucoco/events'

const network = process.env.NETWORK || 'amplitude'

const events = network === 'foucoco' ? foucocoEvents : amplitudeEvents

export default events
