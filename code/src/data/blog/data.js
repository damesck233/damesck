// 博客数据导出
export const blogData = {
  "status": "success",
  "message": "",
  "data": {
    "page": 1,
    "pageSize": 5,
    "pages": 3,
    "count": 14,
    "dataSet": [
      {
        "cid": 32,
        "title": "思科 NAT 配置",
        "created": 1745236980,
        "modified": 1745237154,
        "slug": "32",
        "commentsNum": 0,
        "type": "post",
        "digest": "<h1>思科 NAT 配置</h1><p>Owner: damesck<br>Created time: 2025年4月13日 13:48</p><h2>静态NAT 的配置</h2><pre><code class=\"lang-arduino\">TuYORoute(config)#int &lt;外网端口&gt; //选择NAT的出口\nTuYORoute(config-if)#ip nat outside //将端口配置为NAT外部端口</code></pre><pre><code class=\"lang-arduino\">TuYORoute(config)#int &lt;内网端口&gt;<p>TuYORoute(config-if)#ip nat inside //将端口配置为NAT内部端口</code></pre><pre><code class=\"lang-arduino\">TuYORoute(config)#ip nat inside source static &lt;需要NAT的内网IP&gt; &lt;转为外网的IP&gt; //配置IP映射</code></pre><h2>PAT的配置</h2><pre><code class=\"lang-arduino\">TuYORoute(config)#int &lt;外网端口&gt; //选择NAT的出口<br>TuYORoute(config-if)#ip nat outside //将端口配置为NAT外部端口</code></pre><pre><code class=\"lang-arduino\">TuYORoute(config)#int &lt;内网端口&gt;<br>TuYORoute(config-if)#ip nat inside //将端口配置为NAT内部端口</code></pre><pre><code class=\"lang-arduino\">TuYORoute(config)#acces-list 1 permit &lt;内网网络地址&gt; &lt;反掩码&gt; //配置acl规则<br>TuYORoute(config)#ip nat inside source list 1 int &lt;外端口&gt; overload //配置 PAT将内网地址通过公网地址的端口号转发出去</code></pre><h2>例题:</h2><p>R0部分配置 PAT,R1 配置静态 NAT</p><p>拓扑图</p><p><img src=\"https://img.klpz.net/file/tc/img/2025/04/21/680633f91267b.png\" alt=\"Test\" title=\"Test\"> </p><p>R0的配置</p><pre><code class=\"lang-arduino\">int s0/0/0<br>no sh<br>ip add 20.6.9.7 255.255.255.0<br>ip nat outside<br>int f0/0<br>no sh<br>ip add 10.10.1.1 255.255.255.0<br>ip nat inside<br>ex<br>acces-list 1 permit 10.10.1.0 0.0.0.255<br>ip nat inside source list 1 int s0/0/0<br>ip route 0.0.0.0 0.0.0.0 s0/0/0</code></pre><p>R1的配置</p><pre><code class=\"lang-arduino\">int s0/0/0<br>no sh<br>ip add 8.8.8.8<br>ip nat outside<br>int f0/0 <br>no sh<br>ip add 192.168.1.1<br>ipnat inside<br>ex<br>ip nat inside source static 192.168.1.2 8.8.8.8</code></pre></p>",
        "password": "",
        "categories": [
          {
            "mid": 4,
            "name": "网络",
            "slug": "网络",
            "type": "category",
            "description": "",
            "count": 10,
            "order": 1,
            "parent": 2,
            "cid": 32,
            "directory": [
              "学习",
              "网络"
            ],
            "permalink": "https://blog.damesck.net/index.php/category/%E7%BD%91%E7%BB%9C/",
            "url": "https://blog.damesck.net/index.php/category/%E7%BD%91%E7%BB%9C/",
            "feedUrl": "https://blog.damesck.net/index.php/feed/category/%E7%BD%91%E7%BB%9C/",
            "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/category/%E7%BD%91%E7%BB%9C/",
            "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/category/%E7%BD%91%E7%BB%9C/"
          },
          {
            "mid": 2,
            "name": "🥇学习",
            "slug": "学习",
            "type": "category",
            "description": "",
            "count": 12,
            "order": 2,
            "parent": 0,
            "cid": 32,
            "directory": [
              "学习"
            ],
            "permalink": "https://blog.damesck.net/index.php/category/%E5%AD%A6%E4%B9%A0/",
            "url": "https://blog.damesck.net/index.php/category/%E5%AD%A6%E4%B9%A0/",
            "feedUrl": "https://blog.damesck.net/index.php/feed/category/%E5%AD%A6%E4%B9%A0/",
            "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/category/%E5%AD%A6%E4%B9%A0/",
            "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/category/%E5%AD%A6%E4%B9%A0/"
          }
        ],
        "category": "网络",
        "directory": [
          "学习",
          "网络"
        ],
        "date": {
          "timeStamp": 1745265780,
          "year": "2025",
          "month": "04",
          "day": "21"
        },
        "year": "2025",
        "month": "04",
        "day": "21",
        "hidden": false,
        "pathinfo": "/archives/32/",
        "permalink": "https://blog.damesck.net/index.php/archives/32/",
        "url": "https://blog.damesck.net/index.php/archives/32/",
        "isMarkdown": true,
        "feedUrl": "https://blog.damesck.net/index.php/feed/archives/32/",
        "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/archives/32/",
        "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/archives/32/",
        "titleShow": false,
        "fields": {
          "catalog": {
            "name": "catalog",
            "type": "str",
            "value": "0"
          },
          "excerpt": {
            "name": "excerpt",
            "type": "str",
            "value": ""
          },
          "imgst": {
            "name": "imgst",
            "type": "str",
            "value": "https://img.klpz.net/file/tc/img/2025/04/21/680633f91267b.png"
          }
        }
      },
      {
        "cid": 31,
        "title": "Docker的配置",
        "created": 1732965960,
        "modified": 1745236154,
        "slug": "31",
        "commentsNum": 0,
        "type": "post",
        "digest": "<h1>Docker的配置</h1><p>Created: 2024年11月30日 13:12<br>Tags: Doc, docker, ubantu</p><h1>1.Docker的安装</h1><blockquote>ubantu以例</blockquote><h2>1-1 安装依赖</h2><pre><code class=\"lang-bash\">sudo apt upgrade -y\nsudo apt install -y apt-transport-https ca-certificates curl software-properties-common</code></pre><h2>1-2 <strong>添加Docker的官方GPG密钥</strong></h2><pre><code class=\"lang-bash\">curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg</code></pre><h2>1-3 <strong>添加Docker软件包源</strong></h2><pre><code class=\"lang-bash\">echo &quot;deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null</code></pre><h2>1-4安装Docker</h2><pre><code class=\"lang-bash\">sudo apt update<p>sudo apt install -y docker-ce docker-ce-cli containerd.io</code></pre><h2>1-5 验证安装</h2><pre><code class=\"lang-bash\">docker --version<br>sudo docker run hello-world</code></pre><h2>1-6 配置开机启动</h2><pre><code class=\"lang-bash\">sudo systemctl start docker<br>sudo systemctl enable docker</code></pre><h2>1-7 配置加速镜像</h2><blockquote>参考文档 <a href=\"https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6\"><a href=\"https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6\">https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6</a></a></blockquote><h3>1-7-1 创建文件 路径 /etc/docker/daemon.json 输入</h3><pre><code class=\"lang-json\">{</p><pre><code>&amp;quot;registry-mirrors&amp;quot;: [\n    &amp;quot;https://dockerproxy.com&amp;quot;,\n    &amp;quot;https://docker.mirrors.ustc.edu.cn&amp;quot;,\n    &amp;quot;https://docker.nju.edu.cn&amp;quot;\n]</code></pre><p>}</code></pre><h3>1-7- 重启Docker使配置生效</h3><pre><code class=\"lang-bash\">sudo systemctl daemon-reload<br>sudo systemctl restart docker</code></pre><h1>2.Docker基础命令</h1><h2>2-1 查看容器</h2><pre><code class=\"lang-bash\">docker ps #查看运行中的容器<br>docker ps -a #查看所有容器</code></pre><h2>2-2 下载镜像</h2><blockquote>例如使用Max KB的Docker</blockquote><h3>2-2-3 使用命令来拉起</h3><pre><code class=\"lang-bash\">docker run -d --name=maxkb --restart=always -p 8080:8080 -v ~/.maxkb:/var/lib/postgresql/data -v ~/.python-packages:/opt/maxkb/app/sandbox/python-packages cr2.fit2cloud.com/1panel/maxkb</code></pre><pre><code class=\"lang-bash\">#参数<br>-d #后台运行<br>-p #随机端口映射<br>-P #指定端口映射<br>--name=&quot;name&quot; #容器命名<br>-v #绑定一个卷</code></pre><p><img src=\"Docker%E7%9A%84%E9%85%8D%E7%BD%AE%2014e56b240b7b808f9c17c0f5fda08b3d/image.png\" alt=\"image.png\" title=\"image.png\"></p><h2>2-3 停止容器</h2><pre><code class=\"lang-bash\">docker stop &lt;id&gt; #停止</p><h1>例</h1><p>docker stop 1801e20d9cbc</code></pre><h2>2-4 启动容器</h2><pre><code class=\"lang-bash\">docker start &lt;id&gt; #启动一个容器</code></pre><h2>2-5 删除容器</h2><pre><code class=\"lang-bash\">#先停止后删除<br>docker rm &lt;id&gt; #删除容器</code></pre><h2>2-6 导入出tar镜像</h2><h3>2-6-1 导出</h3><pre><code class=\"lang-bash\">docker load &lt;文件&gt;</code></pre><h3>2-6-2 导出</h3><pre><code class=\"lang-bash\">docker save &lt;id&gt;</code></pre><h1>2-7 进入shlle</h1><pre><code class=\"lang-bash\">docker exec -it &lt;id&gt; bash</code></pre><h1>3.Docker制作镜像</h1><blockquote>以node.js为例</blockquote><h2>3-0 准备步骤</h2><h3>3-0-1 创建一个文件夹</h3><pre><code class=\"lang-bash\">mkdir &lt;文件夹名称&gt; #创建一个文件夹</code></pre><h3>3-0-2 安装node.js</h3><pre><code class=\"lang-bash\">sudo apt install -y curl #安装必要的工具<br>curl -fsSL <a href=\"https://deb.nodesource.com/setup_20.x\">https://deb.nodesource.com/setup_20.x</a> | sudo -E bash - #添加 NodeSource 的 APT 源<br>sudo apt install -y nodejs #安装node.js<br>node -v #验证安装<br>npm -v</code></pre><h3>3-0-3 创建node项目</h3><pre><code class=\"lang-bash\">#剩下的看自己</code></pre><h2>3-1 创建一个docker配置文件并写入</h2><h3>3-1-1 创建Dockerfile</h3><pre><code class=\"lang-bash\">vim Dockerfile #创建一个Dockerfile</code></pre><h3>3-1-2 写入配置</h3><pre><code class=\"lang-bash\">FROM node:18-alpine3.15 #引入基础镜像（nodejs18版本 系统alpine3.15）<br>WORKDIR /projects #指定工作目录<br>COPY package.json . #复制package.json<br>RUN npm install #运行命令安装依赖<br>COPY . .<br>EXPOSE 50001 #指定端口号<br>CMD [&quot;node&quot;,&quot;app.js&quot;] #执行命令（数组空格）</code></pre><h3>3-1-3 设置排除配置文件</h3><pre><code class=\"lang-bash\">vim .dockerignore #创建.dockerignore</code></pre><pre><code class=\"lang-bash\">&lt;文件夹名&gt; #排除创建的文件夹<br>Dockerfile #排除Dockerfile<br>.dockerignore #排除.dockerignore</code></pre><h2>3-4 构建镜像并运行</h2><h3>3-4-1 构建镜像</h3><pre><code class=\"lang-bash\">docker build -t damesck233/nodetest . #构建当前文件夹的镜像</code></pre><h3>3-4-2 查看是否构建成功</h3><pre><code class=\"lang-bash\">docker images #查看是否构建成功</code></pre><pre><code class=\"lang-bash\">#将镜像推送到Docker Hub<br>docker login #登陆dockerhub<br>docker push damesck233/nodetest的</p><h1>下载镜像到本地</h1><p>docker pull</code></pre><h3>3-4-3 运行镜像</h3><pre><code class=\"lang-bash\">docker run -d -p 3000:3000 --name nodetest damesck233/nodetest #运行镜像在后台</code></pre>",
        "password": "",
        "categories": [
          {
            "mid": 2,
            "name": "🥇学习",
            "slug": "学习",
            "type": "category",
            "description": "",
            "count": 12,
            "order": 2,
            "parent": 0,
            "cid": 31,
            "directory": [
              "学习"
            ],
            "permalink": "https://blog.damesck.net/index.php/category/%E5%AD%A6%E4%B9%A0/",
            "url": "https://blog.damesck.net/index.php/category/%E5%AD%A6%E4%B9%A0/",
            "feedUrl": "https://blog.damesck.net/index.php/feed/category/%E5%AD%A6%E4%B9%A0/",
            "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/category/%E5%AD%A6%E4%B9%A0/",
            "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/category/%E5%AD%A6%E4%B9%A0/"
          }
        ],
        "category": "学习",
        "directory": [
          "学习"
        ],
        "date": {
          "timeStamp": 1732994760,
          "year": "2024",
          "month": "11",
          "day": "30"
        },
        "year": "2024",
        "month": "11",
        "day": "30",
        "hidden": false,
        "pathinfo": "/archives/31/",
        "permalink": "https://blog.damesck.net/index.php/archives/31/",
        "url": "https://blog.damesck.net/index.php/archives/31/",
        "isMarkdown": true,
        "feedUrl": "https://blog.damesck.net/index.php/feed/archives/31/",
        "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/archives/31/",
        "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/archives/31/",
        "titleShow": false,
        "fields": {
          "catalog": {
            "name": "catalog",
            "type": "str",
            "value": "0"
          },
          "excerpt": {
            "name": "excerpt",
            "type": "str",
            "value": ""
          },
          "imgst": {
            "name": "imgst",
            "type": "str",
            "value": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUCb0RfH4deCeNO67FS5hIvdr_dq3bB-OeMIsG5SiZn04ON6Oc4DGyLErgGVrDtzkEiQ&usqp=CAU"
          }
        }
      },
      {
        "cid": 30,
        "title": "[rust]第一个hello world",
        "created": 1721214120,
        "modified": 1721214259,
        "slug": "30",
        "commentsNum": 0,
        "type": "post",
        "digest": "<p>[card title=\"提示\" color=\"info\"]教程在windows平台进行测试不保证其他平台试用，且熟练后不建议使用rustc进行编译[/card]</p><h2>步骤</h2><hr><h3>1.新建一个文件夹（mkdir）名称随意</h3><p>创建一个新的文件夹用于存放Rust项目文件。</p><h3>2.进入文件夹新建一个 <code>hello_world.rs</code>的文件</h3><p>在文件夹中创建Rust源代码文件。</p><h3>3.使用vs code打开文件并输入已下代码</h3><pre><code class=\"lang-rust\">fn main() {\n    println!(&quot;Hello World！&quot;);\n}</code></pre><p><code>fn</code>代表建立一个函数   <code>main</code> 代表函数名  <code>println!</code>代表函数体</p><h3>4.编译并运行程序</h3><h4>4-1在你文件的所在位置右键选择 <code>在终端打开</code></h4><p>在文件所在目录打开终端。如没有此选项，可以在地址栏输入 <code>PowerShell</code> 后按Enter。</p><h4>4-2打开后输入 <code>rustc hello_world.rs</code>进行编译</h4><p>然后输入 <code>.\\hello_world.exe</code> 运行文件就成功了！程序将输出 \"Hello World！\"。</p>",
        "password": "",
        "categories": [
          {
            "mid": 2,
            "name": "🥇学习",
            "slug": "学习",
            "type": "category",
            "description": "",
            "count": 12,
            "order": 2,
            "parent": 0,
            "cid": 30,
            "directory": [
              "学习"
            ],
            "permalink": "https://blog.damesck.net/index.php/category/%E5%AD%A6%E4%B9%A0/",
            "url": "https://blog.damesck.net/index.php/category/%E5%AD%A6%E4%B9%A0/",
            "feedUrl": "https://blog.damesck.net/index.php/feed/category/%E5%AD%A6%E4%B9%A0/",
            "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/category/%E5%AD%A6%E4%B9%A0/",
            "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/category/%E5%AD%A6%E4%B9%A0/"
          },
          {
            "mid": 16,
            "name": "编程",
            "slug": "编程",
            "type": "category",
            "description": "",
            "count": 1,
            "order": 2,
            "parent": 2,
            "cid": 30,
            "directory": [
              "学习",
              "编程"
            ],
            "permalink": "https://blog.damesck.net/index.php/category/%E7%BC%96%E7%A8%8B/",
            "url": "https://blog.damesck.net/index.php/category/%E7%BC%96%E7%A8%8B/",
            "feedUrl": "https://blog.damesck.net/index.php/feed/category/%E7%BC%96%E7%A8%8B/",
            "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/category/%E7%BC%96%E7%A8%8B/",
            "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/category/%E7%BC%96%E7%A8%8B/"
          }
        ],
        "category": "学习",
        "directory": [
          "学习"
        ],
        "date": {
          "timeStamp": 1721242920,
          "year": "2024",
          "month": "07",
          "day": "17"
        },
        "year": "2024",
        "month": "07",
        "day": "17",
        "hidden": false,
        "pathinfo": "/archives/30/",
        "permalink": "https://blog.damesck.net/index.php/archives/30/",
        "url": "https://blog.damesck.net/index.php/archives/30/",
        "isMarkdown": true,
        "feedUrl": "https://blog.damesck.net/index.php/feed/archives/30/",
        "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/archives/30/",
        "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/archives/30/",
        "titleShow": false,
        "fields": {
          "catalog": {
            "name": "catalog",
            "type": "str",
            "value": "0"
          },
          "excerpt": {
            "name": "excerpt",
            "type": "str",
            "value": ""
          },
          "imgst": {
            "name": "imgst",
            "type": "str",
            "value": "https://img.klpz.net/file/tc/img/2024/07/17/6697a1ff534a9.png"
          }
        }
      },
      {
        "cid": 28,
        "title": "git基础",
        "created": 1721007600,
        "modified": 1721033707,
        "slug": "28",
        "commentsNum": 0,
        "type": "post",
        "digest": "<h1>创建用户名&email</h1><pre><code class=\"lang-git\">git config --global user.name 用户名</code></pre><pre><code class=\"lang-git\">git config --global user.email 邮箱</code></pre><h1>将 github 代码下载到本地</h1><pre><code class=\"lang-git\">git clone &lt;url&gt;</code></pre><h1>创建一个自己的项目</h1><pre><code class=\"lang-git\">git init</code></pre><h1>提交</h1><h2>准备提交</h2><pre><code class=\"lang-git\">git add 文件或目录</code></pre><p><code>all be .</code></p><h2>正式提交</h2><pre><code class=\"lang-git\">git commit -m &quot;备注&quot;</code></pre><h1>查看提交记录</h1><pre><code class=\"lang-git\">git log</code></pre><h1>恢复代码</h1><pre><code class=\"lang-git\">git checkout HEAD 恢复的文件</code></pre>",
        "password": "",
        "categories": [
          {
            "mid": 1,
            "name": "👋日常",
            "slug": "rc",
            "type": "category",
            "description": "",
            "count": 2,
            "order": 1,
            "parent": 0,
            "cid": 28,
            "directory": [
              "rc"
            ],
            "permalink": "https://blog.damesck.net/index.php/category/rc/",
            "url": "https://blog.damesck.net/index.php/category/rc/",
            "feedUrl": "https://blog.damesck.net/index.php/feed/category/rc/",
            "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/category/rc/",
            "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/category/rc/"
          }
        ],
        "category": "rc",
        "directory": [
          "rc"
        ],
        "date": {
          "timeStamp": 1721036400,
          "year": "2024",
          "month": "07",
          "day": "15"
        },
        "year": "2024",
        "month": "07",
        "day": "15",
        "hidden": false,
        "pathinfo": "/archives/28/",
        "permalink": "https://blog.damesck.net/index.php/archives/28/",
        "url": "https://blog.damesck.net/index.php/archives/28/",
        "isMarkdown": true,
        "feedUrl": "https://blog.damesck.net/index.php/feed/archives/28/",
        "feedRssUrl": "https://blog.damesck.net/index.php/feed/rss/archives/28/",
        "feedAtomUrl": "https://blog.damesck.net/index.php/feed/atom/archives/28/",
        "titleShow": false,
        "fields": {
          "catalog": {
            "name": "catalog",
            "type": "str",
            "value": "0"
          },
          "excerpt": {
            "name": "excerpt",
            "type": "str",
            "value": ""
          },
          "imgst": {
            "name": "imgst",
            "type": "str",
            "value": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSldQjmmAS1fbdhyX9EO94wP2wwHC_p-bMlRw&s"
          }
        }
      }
    ]
  }
};