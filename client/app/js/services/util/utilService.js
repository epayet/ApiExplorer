'use strict';

angular.module(APP_NAME_SERVICES).factory('util', [
    function() {
        var copy = function(obj) {
            switch(typeof obj) {
                default:
                    return obj;
                case "object":
                    if(Array.isArray(obj)) {
                        return obj.slice(0);
                    } else {
                        var obj2 = {};
                        for (var attr in obj) {
                            obj2[attr] = copy(obj[attr]);
                        }
                        return obj2;
                    }
            }
        };

        return {
            escapeStr : function(str) {
                if(!str) return "";
                return str.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;');
            },

            copy : copy,

            guessType : function(str) {
                var firstChar = str.substr(0, 1);
                switch(firstChar) {
                    case "[":
                    case "{":
                        return "json";
                    case "<":
                        return "xml";
                }
            }
        }
    }]);