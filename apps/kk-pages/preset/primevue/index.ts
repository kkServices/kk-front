import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import { generateColors } from '@kk-project/utils/index'
// import { button } from './components/button'

export default definePreset(Aura, {

  semantic: {
    primary: generateColors('primary'),
  },

  components: {
    // button,
  },
})
