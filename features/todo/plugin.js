import ExternalTodoPage from './index.vue'

export default {
  install(vue, options) {
    vue.component(ExternalTodoPage.name, ExternalTodoPage)
  }
}
