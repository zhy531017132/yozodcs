## yozodcs是什么？

dcs安全预览预览调用接口的插件。

### NPM 暂时未测试，勿用

```
npm install yozodcs
```

or


```
<script src="./yozodcs.min.js"></script>
```


### 使用说明
引用canvas的预览,通过iframe引用，

一、通过iframe引用的情况，传入iframe标签的id和跨域文件类型 (type必须传值)

```
var render = new DcsRender('type','iframeId') 

/*类型说明
type='pgindex' //ppt
type='index'  // word
type='sindex'  // excel
*/

```
二、同域情况下预览直接调用接口(type必须传值)	

```
var render = new DcsRender('type') 

/*类型说明
type='pgindex' //ppt
type='index'  // word
type='sindex'  // excel
*/

```

### 接口使用说明

#### 页码跳转

参数|传参|返回值|描述|示例
--|:--:|--:|--:|--:
nextPage|null|underfined|跳转到下一页|render.nextPage()
nextPageSync|fn|underfined|跳转到下一页|render.nextPageSync(fn)
lastPage|null|underfined|跳转到上一页|render.lastPage()
lastPageSync|fn|underfined|跳转到上一页|render.lastPageSync(fn)
gotoPage|number|underfined|跳转到指定页|render.gotoPage(2)
gotoPageSync|number,fn|underfined|跳转到指定页|render.gotoPageSync(2,fn)
getCurrentPage|null|promise|返回当前页码|render.getCurrentPage()

#### 动画跳转

参数|传参|返回值|描述|示例
--|:--:|--:|--:|--:
nextAnimation|null|underfined|跳转到下一动画|render.nextAnimation()
nextAnimationSync|fn|underfined|跳转到下一动画|render.nextAnimationSync(fn)
preAnimation|null|underfined|跳转到上一动画|render.preAnimation()
preAnimationSync|fn|underfined|跳转到上一动画|render.preAnimationSync(fn)
gotoAnimation|object1|underfined|跳转到指定页|render.gotoAnimation(object)
gotoAnimationSync|object1,fn|underfined|跳转到指定页|render.gotoAnimationSync(object1,fn)
getAnimationInfo|null|promise|返回当前动画数据|render.getAnimationInfo()
play|null|underfined|播放|render.play()

#### 缩放

参数|传参|返回值|描述|示例
--|:--:|--:|--:|--:
magnify|null|underfined|放大|render.magnify()
magnifySync|fn|underfined|放大|render.magnifySync(fn)
shrink|null|underfined|缩小|render.shrink()
shrinkSync|fn|underfined|缩小|render.shrinkSync(fn)

#### 其他

参数|传参|返回值|描述|示例
--|:--:|--:|--:|--:
isHideSidebar|boolean|underfined|显示隐藏左缩略图|render.isHideSidebar(true)
rotate|boolean|underfined|旋转|render.rotate(true)
isShowTool|boolean|underfined|显示隐藏工具栏|render.isShowTool(true)



##### 注释
object1：

```
{
    'pageIndex':number,
    'animationId':number,
    'type':'next'/'pre'
}
```
object2：

```
{
    'currentAnimIndex':number,
    'page':number,
    'type':'next'/'pre'
}
```
#####  demo示例
跨域请求html：
```
<script src="./yozodcs.min.js"></script>
 <script>
        var red
        window.onload = function () {
            red = new DcsRender('pgindex', 'cont');
        }
        //下一页
        function nextPage() {
            red.nextPage();
        }
         //上一页
        function prePage() {
            red.lastPage();
        }
        //获取当前页面
        function getCurrentPage() {
            //方法一
            red.getCurrentPage().then(data =>{
                console.log(data,'当前页面');
            })

            //方法二
             async function getCurrentPage() {
               //return await red.getCurrentPage();
               var value= await red.getCurrentPage();
               console.log(value)
            }
            getCurrentPage()
        }
        //
        function getAnimationInfo(data) {
        red.getAnimationInfo().then(data =>{
            console.log(data,'当前动画信息');
        })
    }

       
 </script>
```

### 有问题反馈
在使用中有任何问题，欢迎反馈。

