const path = require('path');

module.exports = {
  webpack: {
    // .... 其他配置
    alias: {
      // 文件路径别名
      'react-clipboardjs-copy': path.resolve(__dirname, 'src/lib/index.ts'),
    },
  },
};
