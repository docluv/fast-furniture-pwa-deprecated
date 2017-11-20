;

/* # l2sStorageCache #

l2sStorageCache is a service module that manages persisting data in either localStorage or 
sessionStorage. It can be used by other services to provide a common caching layer.
*/


(function (window, undefined) {

    var l2Storeagecache = function (customSettings) {

        var that = new l2Storeagecache.fn.init();

        if (customSettings) {

            that.ttlKey = customSettings.ttlKey || that.ttlKey;

        }

        return that;
    };

    l2Storeagecache.fn = l2Storeagecache.prototype = {

        constructor: l2Storeagecache,

        init: function () {


            return this;
        },

        version: "0.0.1",

        setItem: function (key, value, ttl) {

            var cache = this;

            if (!key) {
                throw new {
                    Message: "Item must have a key"
                }
            }

            if (!value) {
                throw new {
                    Message: "Item must have a value"
                }
            }

            if (typeof value === "Object") {
                value = JSON.stringify(value);
            }

            idbKeyval.set(key, value)
                .then(function () {

                    if (ttl) {

                        idbKeyval.set(cache.ttlKey + key, +new Date() + ttl);

                    }

                });

        },

        getItem: function (key) {

            return new Promise(function (resolve, reject) {

                var cache = this,
                    value,
                    hasExpired;

                idbKeyval.get(cache.ttlKey + key).then(function (ttl) {

                    hasExpired = ttl !== null && !cache.hasItemExpired(key, ttl);

                    if (!window.online || hasExpired) {

                        idbKeyval.get(key).then(function (val) {

                            if (window.online === true && hasExpired) {

                                cache.removeItem(key);

                            }

                            resolve(val);

                        });

                    }

                });

            });

        },

        hasItemExpired: function (key, ttl) {

            var cache = this;

            // if there's a TTL that's expired, flush this item
            if (!ttl || ttl < +new Date()) {
                cache.removeItem(key);
                return true;
            }

            return false;

        },

        getObject: function (key) {

            return new Promise(function (resolve, reject) {

                this.getItem(key).then(function (val) {

                    resolve(JSON.parse(val));

                });

            });

        },

        setObject: function (key, value, ttl) {

            if (typeof value === "object") {
                value = JSON.stringify(value);
            }

            this.setItem(key, value, ttl);

        },

        removeItem: function (key) {

            idbKeyval.delete(key);
            idbKeyval.delete(this.ttlKey + key);

        },

        clear: function () {

            idbKeyval.clear();

        },

        getTTLConstant: function (ttlType) {

            switch (ttlType) {

                case "week":

                    return 604800000;

                    break;

                case "day":

                    return 86400000;

                    break;


                case "hour":

                    return 3600000;

                    break;

                case "minute":

                    //1 minute
                    return 3600;

                    break;
            }

            return 0;

        },

        ttlKey: "l2S-Cache-"

    };

    l2Storeagecache.fn.init.prototype = l2Storeagecache.fn;

    return (window.l2Storeagecache = l2Storeagecache);

})(window);