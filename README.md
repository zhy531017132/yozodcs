## yozodcs是什么？

一个dcs新预览调用接口的插件。

### NPM

```
npm install yozodcs
```

or


```
<script src="./yozodcs.js"></script>
```


### 使用说明
引用canvas的预览通常有两种方式，一种是通过iframe引用，一种将html模板等静态资源一起打包。前者引用方便，后者方便二次开发。

一、通过iframe引用的情况，传入iframe标签的id即可

```
var render = new DcsRender('iframeId')
```
二、模板二次开发，无需传入任何参数
```
var render = new DcsRender()
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
getCurrentPage|null|number|返回当前页码|render.getCurrentPage()

#### 动画跳转

参数|传参|返回值|描述|示例
--|:--:|--:|--:|--:
nextAnimation|null|underfined|跳转到下一动画|render.nextAnimation()
nextAnimationSync|fn|underfined|跳转到下一动画|render.nextAnimationSync(fn)
preAnimation|null|underfined|跳转到上一动画|render.preAnimation()
preAnimationSync|fn|underfined|跳转到上一动画|render.preAnimationSync(fn)
gotoAnimation|object1|underfined|跳转到指定页|render.gotoAnimation(object)
gotoAnimationSync|object1,fn|underfined|跳转到指定页|render.gotoAnimationSync(object1,fn)
getAnimationInfo|null|object2|返回当前动画数据|render.getAnimationInfo()

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
跨域（同域）请求html：
```
 <script>
        var red
        window.onload = function () {
            red = new DcsRender('cont');
        }
        function nextPage() {
            red.nextPage();
        }
 </script>
```
跨域时子页面js：
```
addEventListener('message', function (event) {
    //console.log(JSON.stringify(event.data) + "接收到了，子页面开始发送消息");
    switch (event.data.type) {
        case 'nextPage':
            reader.changePageNext();
            break;
        case 'lastPage':
            reader.changePageLast();
            break;
        
        case 'gotoPage':
            reader.changePage(event.data.param);
            break;
        
        case 'getCurrentPage':
            var currentPage=reader.startPageIndex + 1;
            var obj={
                currentPage:currentPage,
                type:'getCurrentPage'
            }
            window.parent.postMessage(obj, '*');
            break;
        
        case 'nextAnimation':
            reader.animationManager.next();
            break;
        
        case 'preAnimation':
            reader.animationManager.pre();
            break;
        
        case 'gotoAnimation':
            reader.animationManager.gotoAnimation(event.data.param);
            break;
        
        case 'getAnimationInfo':
            var obj={
                currentAnimIndex: reader.animationManager.currentAnimIndex,
                page:reader.animationManager.gotoAimationPageIndex,
                type: reader.animationManager.gotoAimationType,
                type:'getAnimationInfo'
            }
            window.parent.postMessage(obj, '*');
            break;
        
        default:
        break;
    }
})
```
### 有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流。
#### 联系方式：18018300481
#### 姓名： 周红雨

