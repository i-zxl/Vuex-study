## install
首先来说一下vuex的install，vuex1.0和vuex2.0版本的差异存在于如何影响全部的子组件的store
vuex2.0采用全局混入的方式，给每个子组件赋值store对象，如果子组件中自己存在store，则子组件赋值就采用当前store赋值；如果子组件没有store对象，则沿用父级的store；代码片段如下：
```js
  Vue.mixin({ beforeCreate: vuexInit })
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
```
vuex1.0则是使用vue.init方式影响，其实质作用是一样的
