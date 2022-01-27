import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

// Import font awesome icons and add component
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faBuilding, faDesktop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faHome, faBuilding, faDesktop)

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')