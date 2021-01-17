
import v1 from './router.v1.js';
import v2 from './router.v2.js';
import bus from './router.bus.js';

const router = {
    bus: bus,
    v1: v1,
    v2: v2
}

export default router;