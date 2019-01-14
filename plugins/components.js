import Vue from 'vue'
import { UserPanel } from '~/components'

/*
 * I'd be very intrigued to know whether or not this piece works
 * If it DOES, this prevents us from needing to include this in our "components" attrs
 * As long as we don't change our <tag-declarations> for our components much, this should work great
 *
 * IT DOES WORK!!!!
 *
 * This will setup our plugin based component inclusion patterns
 * This ensures the parent app knows as little about its NPM Package components as possible
 */
console.log('Registering User Panel component')
Vue.component(UserPanel.name, UserPanel)
