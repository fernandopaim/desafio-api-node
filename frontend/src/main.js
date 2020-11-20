import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

if (process.env.NODE_ENV !== 'production') {
    Vue.config.productionTip = false
    Vue.config.devtools = true
    Vue.config.performance = true
}

// Inicialize Vue.js
new Vue({
    name: 'Vue',
    vuetify,
    render: h => h(App)
}).$mount('#app')
