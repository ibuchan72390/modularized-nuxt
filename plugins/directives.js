// This code will be injected before initializing the root App
import Vue from 'vue'

Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
