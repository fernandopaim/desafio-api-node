import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
    lang: {
        locales: { pt },
        current: 'pt',
    },
    icons: {
        iconfont: 'md',
    },
    theme: {
        themes: {
            light: {
                primary: '#337594',
                secondary: '#383737',
                accent: '#0097A7',
                error: '#ce6b41',
                info: '#dbab5a',
                success: '#a7af8c',
                warning: '#dbab5a'
            },
        },
    },
})
