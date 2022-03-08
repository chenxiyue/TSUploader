import TSUploader from './Uploader.vue'

TSUploader.install = function(Vue) {
  Vue.component(TSUploader.name, TSUploader)
}

export default TSUploader