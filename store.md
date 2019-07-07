
## store 参数说明

*  _committing 提交状态的标志，在_withCommit中，当使用mutation时，会先赋值为true，再执行mutation，修改state后再赋值为false，在这个过程中，会用watch监听state的变化时时_committing为true，从而来保证只能通过mutation来修改state
* _actions 保存包装之后的action
* _actionSubscribers 保存订阅action订阅者
* _mutations 保存包装后所有的mutation
* _wrappedGetters 用于保存包装后的getter
* _modules 保存生成的module🌲
* _modulesNamespaceMap 保存namespaced的模块

### 绑定commit和dispatch

```js
    const { dispatch, commit } = this
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }
```
### module-collection
vuex中不存在module拆分，则_modules就是Module实例;如果存在，则递归生成modules树；
```js
// module-collection.js 核心代码
 register (path, rawModule, runtime = true) {
    if (process.env.NODE_ENV !== 'production') {
      assertRawModule(path, rawModule)
    }

    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      this.root = newModule
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }
  // module.js module属性
  constructor (rawModule, runtime) {
    this.runtime = runtime
    // Store some children item
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule
    const rawState = rawModule.state

    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }
```
### Vuex核心部分installModule

这里会判断module的namespace是否存在，不存在不会对dispatch和commit做处理，如果存在，给type加上namespace，如果声明了{root: true}也不做处理，另外getters和state需要延迟处理，需要等数据更新后才进行计算，所以使用Object.defineProperties的getter函数，当访问的时候再进行计算。


