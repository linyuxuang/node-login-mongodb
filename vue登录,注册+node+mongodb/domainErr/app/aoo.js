let domain = require('domain')
let d = domain.create()
d.on('error', function (e) {
    /*处理异常*/
    console.log("错误："+e.message)
})
d.run(asyncError)
// d.run(syncError)