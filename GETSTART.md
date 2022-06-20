```bash
# 设置依赖存放位置（github actions 缓存）
bundle config --local path vendor/bundle
```

```bash
#列出默认源
gem sources  
#移除默认源（国外）
gem sources --remove https://rubygems.org/  
#添加科大源
gem sources -a https://mirrors.ustc.edu.cn/rubygems/  
#或者添加 ruby-china
gem sources -a https://gems.ruby-china.com/
#清空源缓存
gem sources -c
#更新源缓存
gem sources -u
bundle config 'mirror.https://rubygems.org' 'https://gems.ruby-china.com/'

$ bundle install 
$ npm install
```

```bash
# 编译
$ npm run build
# 运行
$ npm run serve
# 调试
$ npm run debug
$ npm run js-watch
```

## vscode plugs 

Stylelint

```json
"stylelint.validate": [
    "css",
    "scss"
],
```

ESLint

```json
// eslint   -----settings begin-----
// 是否为JavaScript文件开启eslint检测
"eslint.enable": true,
// 保存之后进行lint
"eslint.run": "onSave",
// 是否启用eslint的调试模式
//"eslint.debug": true,
// 保存文件时进行eslint修复(MacOS：快捷键是 command + s ),并不能修复所有问题，多数还是需要手动修复
//"editor.codeActionsOnSave":{
//  "source.fixAll.eslint": true
//}
// eslint   -----settings end-----
```