const req = require.context('./modules', false, /.+\.js$/);
// require.context的返回值既是方法，还有方法成员：keys
req.keys().forEach(path => req(path));
