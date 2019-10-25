export default {
  install(vue) {
    vue.derective('dialogDrag', {
      inserted: (el, binding, vnode, oldVnode) => {
        let $header = el.querySelector('.el-dialog__header')
        let $dialog = el.querySelector('.el-dialog')
        let $closeBtn = el.querySelector('.el-dialog__headerbtn')
        let tempH = $dialog.style.marginTop
        $header.style.cursor = 'move'
        $header.style.userSelect = 'none'
        $dialog.style.margin = 0
        $dialog.style.position = 'absolute'
        // 清除margin值改用定位方式
        $dialog.style.top = tempH
        $dialog.style.left = '50%'
        $dialog.style.transform = 'translateX(-50%)'
        $header.onmousedown = function (s) {
          // 重新获取dialog框
          let $dialog_ = el.querySelector('.el-dialog')
          // 获取遮罩层, dialog框在遮罩层中移动
          let $modal = document.querySelector('.v-modal')
          // 计算可移动的最大距离
          let maxX = $modal.offsetWidth - $dialog_.offsetWidth / 2
          let maxY = $modal.offsetHeight - $dialog_.offsetHeight
          let posX = $dialog_.offsetLeft // 距离父元素左边的距离
          let posY = $dialog_.offsetTop // 距离父元素上边的距离
          // 注册鼠标移动事件
          document.onmousemove = function (m) {
            // 鼠标移动时,计算需要位移距离 初始位置 + 鼠标位移距离
            let moveX = m.clientX - s.clientX + posX
            let moveY = m.clientY - s.clientY + posY
            let x = moveX <= $dialog_.offsetWidth / 2 ? $dialog_.offsetWidth / 2 : moveX >= maxX ? maxX : moveX
            let y = moveY <= 0 ? 0 : moveY >= maxY ? maxY : moveY
            $dialog_.style.left = x + 'px'
            $dialog_.style.top = y + 'px'
          }
        }
        document.onmouseup = function (e) {
          this.onmousemove = null
        }
        document.onmouseleave = function (e) {
          this.onmousemove = null
        }
        if ($closeBtn) {
          $closeBtn.onmouseenter = function (e) {
            document.onmousemove = null
          }
        }
      }
    })
  }
}
