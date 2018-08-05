import $ from 'jquery'

/**
 * 浏览器行为记录组件
 */
class WebRecorder {

    constructor(appId, trackAPI = null) {
        this.appId = appId;
        this.trackAPI = trackAPI !== null ? trackAPI : WebRecorder.DEFAULT_RECORD_API;
    }

    /**
     * 记录用户行为
     * @param userId
     * @param typeId
     * @param subTypeId
     * @param detail
     * @param url
     */
    recordBehavior(userId, typeId, subTypeId, detail, url) {

        let jsonpUrl = `${this.trackAPI}?callback=?
            &appId=${this.appId}&userId=${userId}&typeId=${typeId}&subTypeId=${subTypeId}`;

        if (detail) {
            jsonpUrl += `&detail=${encodeURIComponent(detail)}`
        }
        if (url) {
            jsonpUrl += `&url=${encodeURIComponent(url)}`
        }

        $.getJSON(jsonpUrl, (data) => {
            console.log(data)
        })
    }
}

WebRecorder.version = '1.0';
WebRecorder.description = 'v1.0 提供了记录用户行为的方法 recordBehavior(userId，typeId, subTypeId, detail, url)';
WebRecorder.DEFAULT_RECORD_API = '//localhost:8081/record';

/**
 * 根据应用 ID 创建一个浏览器行为记录组件
 * @param appId 应用 ID
 * @returns {WebRecorder}
 */
export function createByAppId(appId) {
    if (appId || (typeof appId !== 'number')) {
        throw new Error('创建 WebRecorder 失败，不合法的应用 ID')
    }
    return new WebRecorder(appId);
}