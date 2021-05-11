/**
 * yozodcs v0.1.0
 * By zhouhongyu
 */
; (function () {
    var DcsRender = function (iframeId) {
        if (iframeId) {
            this.customerIframe = document.getElementById(iframeId);
            this.renderWindow = this.customerIframe.window || this.customerIframe.contentWindow;
            this.render = this.renderWindow.reader;
        } else {
            this.render = window.reader
        }
    }
    DcsRender.prototype = {
        // 页码跳转
        nextPage: function () {
            this.render.changePageNext();
        },
        nextPageSync: function (callback) {
            this.render.changePageNext();
            callback.bind(this)();
        },
        lastPage: function () {
            this.render.changePageLast();
        },
        lastPageSync: function (callback) {
            this.render.changePageLast();
            callback.bind(this)();
        },
        gotoPage: function (index) {
            this.render.changePage(index);
        },
        gotoPageSync: function (index, callback) {
            this.render.changePage(index);
            callback.bind(this)();
        },
        getCurrentPage: function () {
            return this.render.startPageIndex + 1;
        },
        // 动画跳转
        nextAnimation: function () {
            this.render.animationManager.next();
        },
        nextAnimationSync: function () {
            this.render.animationManager.next();
            callback.bind(this)();
        },
        preAnimation: function () {
            this.render.animationManager.pre()
        },
        preAnimationSync: function () {
            this.render.animationManager.pre();
            callback.bind(this)();
        },
        gotoAnimation: function (animateObj) {
            this.render.animationManager.gotoAnimation(animateObj);
        },
        gotoAnimationSync: function (animateObj) {
            this.render.animationManager.gotoAnimation(animateObj);
            callback.bind(this)();
        },
        getAnimationInfo: function () {
            return {
                currentAnimIndex: this.render.animationManager.currentAnimIndex,
                page: this.render.animationManager.gotoAimationPageIndex,
                type: this.render.animationManager.gotoAimationType
            }
        },
    }

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = DcsRender;
    } else {
        window.DcsRender = DcsRender;
    }
})()