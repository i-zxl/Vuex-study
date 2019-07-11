// 性能监控
module.export = function() {
  return function(req, res, next) {
    let _send = res.send,
        exec_start_at = Date.now()
    res.send  = () => {
      res.set('X-Execution-Time', String(Date.now() - exec_start_at))
      return _send.apply(res, arguments)
    }
    next()
  }
}