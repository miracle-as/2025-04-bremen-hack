import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const bremenHackColors = {
  primary: '#38939F',     // --primary
  accent: '#E00060',      // --accent
  secondary: '#0092A5',   // --primary-light
  error: '#E01D5A',       // --accent-red
  warning: '#F4783C',     // --accent-orange
  background: '#fdfbe6',  // Changed to white
  surface: '#FFFFFF',
  appBar: '#fdfbe6',      // Using cream for app bar
  grey: '#E8E7E7',        // --background-gray
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'bremenHackTheme',
    themes: {
      bremenHackTheme: {
        dark: false,
        colors: {
          ...bremenHackColors
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
  },
}) 