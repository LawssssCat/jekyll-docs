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
```
