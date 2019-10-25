
export default {
  install(vue) {
    vue.derective('inputMax', {
      inserted: (el, binding) => {
        let $input = el.querySelector('input')
        if (!$input) return
        // 除远程搜索之外的下拉框
        if ((el.classList[0] === 'el-select' && !el.__vue__.remote) || $input.disabled) return
        let params = +binding.value
        // 注册focus事件
        $input.onfocus = function () {
          let sValue =  params && params > 1 ? params : 1.3
          this.style.setProperty('border', 'none', 'important')
          el.style.transform = `scale(${sValue})`
          el.style.transformOrigin = 'top left'
          el.style.boxShadow = '2px 5px 12px rgba(0, 0, 0, .3)'
          el.style.zIndex = 66
        }
        $input.onblur = function () {
          this.style.removeProperty('border')
          el.style.removeProperty('transform')
          el.style.removeProperty('transform-origin')
          el.style.removeProperty('box-shadow')
          el.style.removeProperty('z-index')
        }
        if (binding.arg === 'enter') {
          $input.onkeyup = function (e) { // enter键
            e.keyCode === 13 && this.blur()
          }
        }
      }
    })
  }
}
