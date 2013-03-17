Lin-App
=================


# 框架执行/加载原理

## index.html

静态文件index.html是个空白bootstrap模板,
它有以下有个事项：

* 加载了以下通用js库：
  - jQuery
  - underscore
  - backbone
* 同时加载了laolin.main.js, 包含了自定义的一些常用辅助函数
* 定义了函数 set_top_nav(tdata) 用来动态显示 页头导航条(top_av)
* 定义了函数 set_main_box(htm) 用来动态显示 页面主要内容(main_box)
* 加载了 js/_app_loader.js, 它会根据?app=xxx自动调用 apps/app.xxx.js文件
* apps/app.xxx.js 文件里可调用set_top_nav和set_main_box等函数来动态显示合适的内容
* 默认app是'py',即加载apps/app.py.js

## apps/app.py.js

- 它动态加载apps/app.py.html作为main_box的内容。
- 设置好参数tdata，并调用set_top_nav，显示合适的导航条
- 显示了一个查询表单，对应的动作是函数get_py
- get_py函数调用 laolin.fn.loadJs 动态加载一个跨域的js文件
- 这个js文件会根据我们的参数执行合适的代码实现显示查询结果

# Authors
-------

**LaoLin (LaoLinCom) **

+ http://laolin.com/
+ http://weibo.com/n/laolincom
 

Copyright and license
---------------------

Copyright 2012~2013 LaoLin 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
