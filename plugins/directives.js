// This code will be injected before initializing the root App
import Vue from 'vue'

/*
 * This is where we will maintain our application wide directives
 * These can also be maintained in separate files and imported
 * We can simply reference the Vue.directive(XXX.name, XXX) pattern
 * where XXX is the explicitly named import
 */
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
