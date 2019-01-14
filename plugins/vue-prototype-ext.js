import Vue from 'vue'

// Extend the Vue prototype that we extend to generate our components
// Requires the use of declaration merging if you still want TS to work nicely
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
// Probably need to extend the VueConstructor<any> interface accordingly
Vue.prototype.$myAddedProperty = 'Example Property'
Vue.prototype.$myAddedMethod = function() {
  return this.$myAddedProperty
}

// Demonstrates the extension of the Vue prototype instance
Vue.mixin({
  mounted() {
    console.log('Vue prototype variable for component (' + this._uid + ') is: ' + this.$myAddedProperty)
  }
})
