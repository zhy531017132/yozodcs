/**
 * yozodcs v0.1.0
 * By zhouhongyu
 */
 ; (function () {
    var DcsRender = function (iframeId) {
        this.isCrossDomain = false;
        if (iframeId) {
            this.customerIframe = document.getElementById(iframeId);
            try {
                this.renderWindow = this.customerIframe.window || this.customerIframe.contentWindow;
                this.render = this.renderWindow.reader;
            } catch (err) {
                this.isCrossDomain = true
                addEventListener('message', function (event) {
                    // console.log(event);
                    var type =event.data.type
                    switch (type) {
                        case 'getCurrentPage':
                            // var currentPage= event.data.currentPage
                        //    $('#currentPage').html(event.data.currentPage)
                            break;
                        case 'getAnimationInfo':
                        //    var currentAnimIndex=event.data.currentAnimIndex
                        //    var gotoAimationPageIndex=event.data.gotoAimationPageIndex
                        //    var gotoAimationType=event.data.gotoAimationType
                            break;
                        default:
                            break;
                    }
                })
            }
        } else {
            this.render = window.reader
        }
    }
    DcsRender.prototype = {
        // 页码跳转
        nextPage: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'nextPage', param: '' }, '*')
            } else {
                this.render.changePageNext();
            }
        },
        nextPageSync: function (callback) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'nextPage', param: '' }, '*');
                callback.bind(this)();
            } else {
                this.render.changePageNext();
                callback.bind(this)();
            }
        },
        lastPage: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'lastPage', param: '' }, '*');
            } else {
                this.render.changePageLast();
            }
        },
        lastPageSync: function (callback) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'lastPage', param: '' }, '*');
                callback.bind(this)();
            } else {
                this.render.changePageLast();
                callback.bind(this)();
            }
        },
        gotoPage: function (index) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'gotoPage', param: index }, '*');
            } else {
                this.render.changePage(index);
            }
        },
        gotoPageSync: function (index, callback) {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'gotoPage', param: index }, '*');
                callback.bind(this)();
            } else {
                this.render.changePage(index);
                callback.bind(this)();
            }
        },
        getCurrentPage: function () {
            if (this.isCrossDomain) {
                this.customerIframe.contentWindow.postMessage({ type: 'getCurrentPage', param: '' }, '*');
            } else {
                return this.render.startPageIndex + 1;
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
                this.customerIframe.contentWindow.postMessage({ type: 'getAnimationInfo', param: '' }, '*');
            } else {
                return {
                    currentAnimIndex: this.render.animationManager.currentAnimIndex,
                    page: this.render.animationManager.gotoAimationPageIndex,
                    type: this.render.animationManager.gotoAimationType
                }
            }
        },
    }

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = DcsRender;
    } else {
        window.DcsRender = DcsRender;
    }
})()
