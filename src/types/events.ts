import * as amplitudeEvents from './amplitude/events'
import * as foucocoEvents from './foucoco/events'
import * as pendulumEvents from './pendulum/events'

import { network } from '../config'

const events =
    network === 'foucoco'
        ? foucocoEvents
        : network === 'amplitude'
        ? amplitudeEvents
        : pendulumEvents

export { amplitudeEvents, foucocoEvents, pendulumEvents }
export default events
