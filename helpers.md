## vuex拓展 mapModelState的实现
mapModelState.js 
- 基于vuex helper源码实现vuex中store与template模板双向绑定函数
- 使用方法
  ```js
  //demo.vue
  div(@click="addPage") {{page}}
  import { mapModelState } from './helper/mapModelState'
  export default {
    computed: {
      //this.args: dir(namespace.params), map(params attr), Module.mutation
      ...mapModelState('moduleA.params', ['page', 'size'], 'modelStateMutation'),
      ...mapModelState('moduleA', ['loading'], 'modelStateMutationRoot'),
    },
    method: {
      addPage() {
        this.page++
        this.loading = !this.loading
      }
    }
  }
  // store moduleA.js

  const ModuleA = {
    state: {
      params: {
        page: '',
        size
      },
      loading: false
    },
    mutations: {
      modelStateMutation(state, opt) {
        state.params[otp.key] = opt.val
      }
      modelStateMutationRoot(state, opt) {
        state[opt.key] = opt.val
      }
    }
  }
  
  ```
- 注意：
  1. 依赖vuex修改store方式，state只能通过mutation提交，所以需要存在对应的mutation方法;
  
