WebTracker.version = '1.0';
WebTracker.description = 'v1.0 提供了记录用户行为的方法（依赖 jQuery）' +
    ' recordBehavior(typeId, subTypeId, detail, url)';
WebTracker.API = {
    RECORD_BEHAVIOR: '//localhost:8081/record/behavior'
};

/**
 * 浏览器行为记录组件
 * @example
 * var webRecorder = new WebTracker(appId);
 * webRecorder.recordBehavior(typeId, subTypeId, detail, url);
 */
function WebTracker(appId) {

    if (! appId || (typeof appId !== 'number')) {
        throw new Error('创建 WebTracker 失败，不合法的应用 ID')
    }

    this.appId = appId;

    if (window.$) {
        this.getJSON = window.$.getJSON
    } else if (window.jQuery) {
        this.getJSON = window.jQuery.getJSON
    }
    if (! this.getJSON) {
        throw new Error('创建 WebTracker 失败，缺少依赖的组件 jQuery')
    }
}

/**
 * 记录用户行为
 * @param typeId
 * @param subTypeId
 * @param detail
 * @param url
 */
WebTracker.prototype.recordBehavior = function (typeId, subTypeId, detail, url) {

    var jsonpUrl = WebTracker.API.RECORD_BEHAVIOR + '?callback=?';

    this.getJSON(jsonpUrl, {
        appId: this.appId,
        typeId: typeId,
        subTypeId: subTypeId,
        detail: detail ? detail : null,
        url: url ? url : null
    }, function (json) {
        if (json.ok) {
            console.log('[recordBehavior] succeed. ' + json.data)
        } else {
            console.warn('[recordBehavior] failed. ' + json.description)
        }
    });
};
