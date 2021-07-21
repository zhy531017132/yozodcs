/**
 * yozodcs v0.1.0
 * By zhouhongyu
 */

; (function () {
    var callbackCache;
    var srcType;
    var iframe
    var DcsRender = function (type, iframeId) {
        if (!type) return
        srcType = type
        iframe = iframeId
        this.isCrossDomain = false;
        if (iframeId) {
            this.customerIframe = document.getElementById(iframeId);
            try {
                this.renderWindow = this.customerIframe.window || this.customerIframe.contentWindow;
                if (srcType == 'pgindex') {
                    this.render = this.renderWindow.reader;
                } else if (srcType == 'index') {
                    this.render = this.renderWindow.wp;
                } else if (srcType == 'sindex') {
                    this.render = this.renderWindow.ss;
                }
            } catch (err) {
                this.isCrossDomain = true
                addEventListener('message', function (event) {
                    var reqType = event.data.reqType
                    switch (reqType) {
                        case 'getCurrentPage':
                            if (!callbackCache) break;
                            callbackCache(event.data.currentPage)
                            break;
                        case 'getAnimationInfo':
                            if (!callbackCache) break;
                            object2 = {
                                currentAnimIndex: event.data.currentAnimIndex,
                                page: event.data.page,
                                type: event.data.type
                            }
                            callbackCache(object2)
                            break;
                        default:
                            break;
                    }
                })
            }
        } else {
            if (srcType == 'pgindex') {
                this.render = window.reader;
            } else if (srcType == 'index') {
                this.render = window.wp;
            } else if (srcType == 'sindex') {
                this.render = window.ss;
            }
        }
    }
    DcsRender.prototype = {
        // 页码跳转
        nextPage: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'nextPage', param: srcType }, '*')
            } else {
                this.render.changePageNext();
            }
        },
        nextPageSync: function (callback) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'nextPage', param: srcType }, '*');
                callback.bind(this)();
            } else {
                this.render.changePageNext();
                callback.bind(this)();
            }
        },
        lastPage: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'lastPage', param: srcType }, '*');
            } else {
                this.render.changePageLast();
            }
        },
        lastPageSync: function (callback) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'lastPage', param: srcType }, '*');
                callback.bind(this)();
            } else {
                this.render.changePageLast();
                callback.bind(this)();
            }
        },
        gotoPage: function (index) {
            if (this.isCrossDomain) {
                var obj = {
                    index: index,
                    srcType: srcType
                }
                this.customerIframe.contentWindow.postMessage({ type: 'gotoPage', param: obj }, '*');
            } else {
                this.render.changePage(index);
            }
        },
        gotoPageSync: function (index, callback) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'gotoPage', param: obj }, '*');
                callback.bind(this)();
            } else {
                this.render.changePage(index);
                callback.bind(this)();
            }
        },
        getCurrentPage: function () {
            if (this.isCrossDomain) {
                return new Promise((resolve, reject) => {
                    const callback = function (data) {
                        resolve(data)
                    }
                    this.pushCallback(callback);
                    this.customerIframe.contentWindow.postMessage({ type: 'getCurrentPage', param: srcType }, '*');
                })
            } else {
                return new Promise((resolve, reject) => {
                    resolve(this.render.startPageIndex + 1)
                })
            }
        },
        // 动画跳转
        nextAnimation: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'nextAnimation', param: '' }, '*');
            } else {
                this.render.animationManager.next();
            }
        },
        nextAnimationSync: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'nextAnimation', param: '' }, '*');
                callback.bind(this)();
            } else {
                this.render.animationManager.next();
                callback.bind(this)();
            }
        },
        preAnimation: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'preAnimation', param: '' }, '*');
            } else {
                this.render.animationManager.pre()
            }
        },
        preAnimationSync: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'preAnimation', param: '' }, '*');
                callback.bind(this)();
            } else {
                this.render.animationManager.pre();
                callback.bind(this)();
            }
        },
        gotoAnimation: function (animateObj) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'gotoAnimation', param: animateObj }, '*');
            } else {
                this.render.animationManager.gotoAnimation(animateObj);
            }
        },
        gotoAnimationSync: function (animateObj) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'gotoAnimation', param: animateObj }, '*');
                callback.bind(this)();
            } else {
                this.render.animationManager.gotoAnimation(animateObj);
                callback.bind(this)();
            }
        },
        getAnimationInfo: function () {
            if (this.isCrossDomain) {
                return new Promise((resolve, reject) => {
                    const callback = function (data) {
                        resolve(data)
                    }
                    this.pushCallback(callback);
                    this.customerIframe.contentWindow.postMessage({ type: 'getAnimationInfo', param: srcType }, '*');
                })
            } else {
                return new Promise((resolve, reject) => {
                    resolve(object2 = {
                        currentAnimIndex: this.render.animationManager.currentAnimIndex,
                        page: this.render.animationManager.gotoAimationPageIndex + 1,
                        type: this.render.animationManager.gotoAimationType
                    })
                })
            }
        },
        //放大
        magnify: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'magnify', param: srcType }, '*');
            } else {
                if (srcType == 'pgindex' || srcType == 'index') {
                    this.render.changeTab(1);
                } else if (srcType == 'sindex') {
                    this.render.changeScale(1);
                }
            }
        },
        magnifySync: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'magnify', param: srcType }, '*');
                callback.bind(this)();
            } else {
                if (srcType == 'pgindex' || srcType == 'index') {
                    this.render.changeTab(1);
                } else if (srcType == 'sindex') {
                    this.render.changeScale(1);
                }
                callback.bind(this)();
            }
        },
        //缩小
        shrink: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'shrink', param: srcType }, '*');
            } else {
                if (srcType == 'pgindex' || srcType == 'index') {
                    this.render.changeTab(0);
                } else if (srcType == 'sindex') {
                    this.render.changeScale(0);
                }
            }
        },
        shrinkSync: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'shrink', param: srcType }, '*');
                callback.bind(this)();
            } else {
                if (srcType == 'pgindex' || srcType == 'index') {
                    this.render.changeTab(0);
                } else if (srcType == 'sindex') {
                    this.render.changeScale(0);
                }
                callback.bind(this)();
            }
        },
        //播放
        play: function (flag) {
            flag = false//不自动播放
            if (this.isCrossDomain) {
                obj = {
                    flag: flag,
                    srcType: srcType,
                }
                this.customerIframe.contentWindow.postMessage({ type: 'play', param: obj }, '*');
            } else {
                this.render.setFullScreen(flag);
            }
        },
        playSync: function (flag) {
            flag = false//不自动播放
            if (this.isCrossDomain) {
                obj = {
                    flag: flag,
                    srcType: srcType,
                }
                this.customerIframe.contentWindow.postMessage({ type: 'play', param: obj }, '*');
                callback.bind(this)();
            } else {
                this.render.setFullScreen(flag);
                callback.bind(this)();
            }
        },
        //搜索
        search: function (search) {
            if (this.isCrossDomain) {
                obj = {
                    srcType: srcType,
                    search: search
                }
                this.customerIframe.contentWindow.postMessage({ type: 'search', param: obj }, '*');
            } else {
                if (srcType == 'index') {
                    this.render.startSearch(search);
                } else if (srcType == 'sindex') {
                    this.render.beginSearch(search, true);
                }
            }
        },
        searchSync: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.
                    obj = {
                    srcType: srcType,
                    search: search
                }
                postMessage({ type: 'search', param: obj }, '*');
                callback.bind(this)();
            } else {
                if (srcType == 'index') {
                    this.render.startSearch(search);
                } else if (srcType == 'sindex') {
                    this.render.beginSearch(search, true);
                }
                callback.bind(this)();
            }
        },
        //顺（逆）时针旋转
        rotate: function (flag) {
            if (this.isCrossDomain) {
                obj = {
                    flag: flag,
                    srcType: srcType,
                }
                this.customerIframe.contentWindow.postMessage({ type: 'rotate', param: obj }, '*');
            } else {
                if (srcType == 'index') {
                    this.render.rotate(flag);
                }
            }
        },
        rotateSync: function (flag) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.
                    obj = {
                    flag: flag,
                    srcType: srcType,
                }
                postMessage({ type: 'rotate', param: obj }, '*');
                callback.bind(this)();
            } else {
                if (srcType == 'index') {
                    this.render.rotate(flag);
                }
                callback.bind(this)();
            }
        },
        //隐藏显示缩略图
        isHideSidebar: function (flag) {
            if (this.isCrossDomain) {
                obj = {
                    flag: flag,
                    srcType: srcType,
                }
                this.customerIframe.contentWindow.postMessage({ type: 'isHideSidebar', param: obj }, '*');
            } else {
                if (srcType == 'pgindex') {
                    this.render.isHideSidebar(flag);
                }
            }
        },
        isHideSidebarSync: function (flag) {
            if (this.isCrossDomain) {
                obj = {
                    flag: flag,
                    srcType: srcType,
                }
                this.customerIframe.contentWindow.postMessage({ type: 'isHideSidebar', param: obj }, '*');
                callback.bind(this)();
            } else {
                if (srcType == 'pgindex') {
                    this.render.isHideSidebar(flag);
                }
                callback.bind(this)();
            }
        },
        //隐藏显示工具栏
        isShowTool: function (flag) {
            if (this.isCrossDomain) {
                obj = {
                    flag: flag,
                    srcType: srcType,
                }
                this.customerIframe.contentWindow.postMessage({ type: 'isShowTool', param: obj }, '*');
            } else {
                // $(window.frames["iframeName"].document).find("#title-box").css('display', 'none')
                if (srcType == 'index' || srcType == 'sindex') {
                    this.render.isShowTool(flag);
                }
            }
        },
        isShowToolSync: function (flag) {
            if (this.isCrossDomain) {
                obj = {
                    flag: flag,
                    srcType: srcType,
                }
                this.customerIframe.contentWindow.postMessage({ type: 'isShowTool', param: obj }, '*');
                callback.bind(this)();
            } else {
                if (srcType == 'index' || srcType == 'sindex') {
                    this.render.isShowTool(flag);
                }
                callback.bind(this)();
            }
        },
        //全屏
        fullScreen: function () {
            if (this.isCrossDomain) {
                this.fullScreen1(iframe)
            } else {
                this.fullScreen1(iframe)
            }
        },
        fullScreenSync: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'fullScreen', param: srcType }, '*');
                callback.bind(this)();
            } else {

                callback.bind(this)();
            }
        },
        pushCallback: function (callback) {
            callbackCache = callback
        },
        fullScreen1: function (domId) {
            var element = document.getElementById(domId);
            var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen
                || element.mozRequestFullScreen || element.msRequestFullScreen;
            if (requestMethod) {
                requestMethod.call(element);
            } else if (typeof window.ActiveXObject !== "undefined") {
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{Esc}");
                }
            }
        }
    }

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = DcsRender;
    } else {
        window.DcsRender = DcsRender;
    }
})()