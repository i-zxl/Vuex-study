export const mapModelState = normalizeNamespace((namespace, map, path, mutation) => {
  let res = {}
  for(let i of map) {
    res[i] = {
      get () {
        return getModuleByNamespace(this.$store, path, namespace).state[i]
      },
      set (val) {
        return getModuleByNamespace(this.$store, path, namespace).commit(mutation, {
          key: i,
          val: val
        })
      }
    }
  }
  return res
})

function normalizeNamespace (fn) {
  // namespace: 'a/b.c' || 'a/b'
  return (dir, map, mutation) => {
    if (typeof dir !== 'string') {
      map = dir
      dir = ''
      mutation = map
    }
    let dirMap = dir.split('.'), 
        path = '', namespace = ''
    if (dirMap.length > 1) {
      path = dirMap[dirMap.length-1]
    } else {
      path = ''
    }
    namespace = dirMap[0]
    if (namespace && namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }
    return fn(namespace, map, path, mutation)
  }
}

function getModuleByNamespace (store, path, namespace) {
  let state = store.state
  let commit = store.commit
  if (namespace) {
    const _module = store._modulesNamespaceMap[namespace]
    if (!_module) {
      return 
    }
    state = _module.context.state
    commit = _module.context.commit
  }
  if (path) {
    state = state[path]
  }
  return {
    state,
    commit
  }
}
