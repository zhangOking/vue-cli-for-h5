/**
 * 基础服务扩展
 */

// 按需加载插件
import {
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  Toast,
  Popup
} from 'vant'

import ajax from './ajax'
import focus from './directives/focus'
import { toThousands } from './filters/toThousands'
import mixin from './mixin/mixin'

// 自定义组件
import commonButtonDialog from './components/buttonDialog/buttonDialog.vue'

const plugin = {
  install: (Vue, option) => {
    // 注册系统服务
    Vue.prototype.$ajax = ajax
    Vue.prototype.$toast = Toast

    // 注册全局组件
    Vue.component('c-buttonDialog', commonButtonDialog)

    // 注册全局指令
    Vue.directive('focus', focus)

    // 注册全局过滤器
    Vue.filter('toThousands', toThousands)

    // 注册全局Mixin
    Vue.mixin(mixin)

    // 按需加载插件
    Vue.use(Button)
    Vue.use(Cell)
    Vue.use(List)
    Vue.use(Popup)
    Vue.use(Tabbar).use(TabbarItem)
  }
}

export default plugin
