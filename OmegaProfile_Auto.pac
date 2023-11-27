var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+Auto", {
    "+Auto": function(url, host, scheme) {
        "use strict";
        if (/(?:^|\.)bilibili\.com$/.test(host)) return "DIRECT";
        if (/(?:^|\.)douyu\.com$/.test(host)) return "DIRECT";
        if (/(?:^|\.)baidu\.com$/.test(host)) return "DIRECT";
        if (/(?:^|\.)52pojie\.cn$/.test(host)) return "DIRECT";
        if (/(?:^|\.)qq\.com$/.test(host)) return "DIRECT";
        if (/(?:^|\.)speedtest\.cn$/.test(host)) return "DIRECT";
        if (/(?:^|\.)zhihu\.com$/.test(host)) return "DIRECT";
        return "+proxy";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        return "PROXY 127.0.0.1:7890";
    }
});