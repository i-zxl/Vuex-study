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

export const mapModelState = normalizeNamespace((namespace, map, path, mutation) => {
  let state = this.$store.state
  let commit = this.$store.commit
  if (namespace) {
    const _module = this.$store._modulesNamespaceMap[namespace]
    if (!_module) {
      return 
    }
    state = _module.state
    commit = _module.commit
  }
  if (path) {
    state = state[path]
  }
  let res = {}
  for(let i of map) {
    res[i] = {
      get () {
        return state[i]
      },
      set (val) {
        return commit(mutation, {
          key: path,
          val: val
        })
      }
    }
  }
  return res
})
 

