import * as amplitudeEvents from './amplitude/events'
import * as foucocoEvents from './foucoco/events'

import { network } from '../config'

const events = network === 'foucoco' ? foucocoEvents : amplitudeEvents

export { amplitudeEvents, foucocoEvents }
export default events
