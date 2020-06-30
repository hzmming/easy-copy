import inject from '@/utils/inject';

const req = require.context('./modules', false, /.+\.js$/);
// require.context的返回值既是方法，还有方法成员：keys
req.keys().forEach(path => inject(req(path).default));
