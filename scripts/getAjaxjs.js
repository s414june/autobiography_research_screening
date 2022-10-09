function getAjaxByUUID(Httpurl, uuid, callbackFn) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', Httpurl)
    xhr.send()
    let schoolData = null
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
            let data = JSON.parse(xhr.response)
            data.every((d) => {
                if (d.uuid == uuid) {
                    schoolData = d.data
                    return false
                }
                return true
            })
            callbackFn(JSON.stringify(schoolData))
        }
    }
}

function getAjaxByUUID_code(Httpurl, uuid, callbackFn) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', Httpurl)
    xhr.send()
    let schoolData = null
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
            let decodeXhr = decodeURIComponent(escape(window.atob(xhr.response)));
            let data = JSON.parse(decodeXhr)
            data.every((d) => {
                if (d.uuid == uuid) {
                    schoolData = d.data
                    return false
                }
                return true
            })
            callbackFn(JSON.stringify(schoolData))
        }
    }
}