var tpt = function (item) {
    "use strict";
    if (typeof item === "string") {
        return tpt.captureObject(
            tpt.selectAll(item)
        );
    }
    if (typeof item === "object" && item.nodeType === 1) {
        return tpt.captureObject([item]);
    }
    if (item === undefined) {
        return tpt.captureObject([]);
    }
};

/* Helpers */
tpt.each = function (array, action) {
    "use strict";
    var i = array.length;
    while (i) {
        i -= 1;
        action(array[i]);
    }
};

tpt.listToArray = function (list) {
    "use strict";
    return (list && Array.prototype.slice.call(list)) || list;
};

tpt.getElementFromEvent = function (event) {
    "use strict";
    return event.target || event.srcElement;
};

tpt.cancelEvent = function (event) {
    "use strict";
    event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
};

tpt.getFocusedElement = function () {
    "use strict";
    if (document.activeElement !== document.body) {
        return document.activeElement;
    } else {
        return tpt.select(":focus");
    }
};

tpt.setEphimeralFocus = function (element) {
    "use strict";
    if (element && 1 === element.nodeType) {
        var oldOnBlur = element.onblur;
        var oldTabIndex = element.tabIndex;
        if (typeof oldTabIndex !== "number" || oldTabIndex < 0) {
            oldTabIndex = null;
            element.tabIndex = 0;
        }
        element.focus();
        element.onblur = function () {
            if (typeof oldTabIndex !== "number" || oldTabIndex < 0) {
                element.removeAttribute("tabIndex");
            }
            if (typeof oldOnBlur === "function") {
                element.onblur = oldOnBlur();
            } else {
                element.onblur = oldOnBlur;
            }
        };
    }
};

/* String helpers */
tpt.trim = function (baseString) {
    "use strict";
    if (String.prototype.trim) {
        return baseString.trim();
    } else {
        return baseString.replace(/^\s+|\s+$/g, "");
    }
};

tpt.startsWith = function (baseString, compareString) {
    "use strict";
    return baseString.substr(0, compareString.length).indexOf(compareString) !== -1;
};

tpt.endsWith = function (baseString, compareString) {
    "use strict";
    return baseString.indexOf(compareString, baseString.length - compareString.length) !== -1;
};

/* DOM node helpers */
tpt.nextSiblingByNodeType = function (node, nodeTypeNumber) {
    "use strict";
    do {
        node = node.nextSibling;
    } while (node && node.nodeType !== nodeTypeNumber);
    return node;
};

tpt.addListener = function (node, eventName, behaviourFunction) {
    "use strict";
    if (node.addEventListener) {
        node.addEventListener(eventName, behaviourFunction, false);
    } else if (node.attachEvent) {
        node.attachEvent("on" + eventName, behaviourFunction);
    }
};

tpt.removeListener = function (node, eventName, behaviourFunction) {
    "use strict";
    if (node.removeEventListener) {
        node.removeEventListener(eventName, behaviourFunction, false);
    } else if (node.dettachEvent) {
        node.dettachEvent("on" + eventName, behaviourFunction);
    }
};

tpt.onActive = function (elementsSet, behaviourFunction, cancelEvent) {
    "use strict";
    var cancelActiveAction = function (element) {
        element.onclick = function (event) {
            event = event || window.event;
            if (cancelEvent) {
                tpt.cancelEvent(event);
            }
        };
        element.onkeypress = function (event) {
            event = event || window.event;
            if ((13 === event.keyCode) && cancelEvent) {
                tpt.cancelEvent(event);
            }
        };
    };

    if (elementsSet && behaviourFunction) {
        var i = elementsSet.length;
        var atKeypress = function (event) {
            event = event || window.event;
            if (13 === event.keyCode) {
                behaviourFunction(event);
            }
        };
        while (i) {
            i -= 1;
            if (elementsSet[i]) {
                if (cancelEvent) {
                    cancelActiveAction(elementsSet[i]);
                }
                tpt.addListener(elementsSet[i], "click", behaviourFunction);
                tpt.addListener(elementsSet[i], "keypress", atKeypress);
            }
        }
    }
};

tpt.hasFocusedChild = function (parentElements) {
    "use strict";
    var focusedElement = tpt.getFocusedElement();
    if (focusedElement) {
        var i = parentElements.length;
        while (i) {
            i -= 1;
            if (parentElements[i].contains(focusedElement)) {
                return true;
            }
        }
    }
    return false;
};

/* DOM Node Class attribute manipulation */

tpt.hasClass = function (element, stringValue) {
    "use strict";
    stringValue = tpt.trim(stringValue);
    var elementClass = tpt.trim(element.className);

    if (document.documentElement.classList) {
        return element.classList.contains(stringValue);
    }
    if (elementClass && (elementClass.length >= stringValue.length)) {
        if (elementClass.indexOf(stringValue) !== -1 && (elementClass.length === stringValue.length)) {
            /* If identical */
            return true;
        }
        if (elementClass.indexOf(" " + stringValue + " ") !== -1) {
            /* If somewhere in the middle */
            return true;
        }
        if (tpt.startsWith(elementClass, stringValue)) {
            /* If at the start */
            return true;
        }
        if (tpt.endsWith(elementClass, stringValue)) {
            /* If at the end */
            return true;
        }
    }
    return false;
};

tpt.addClass = function (element, stringValue) {
    "use strict";
    stringValue = tpt.trim(stringValue);
    if (document.documentElement.classList) {
        element.classList.add(stringValue);
    } else if (!tpt.hasClass(element, stringValue)) {
        element.className = tpt.trim(tpt.trim(element.className) + " " + stringValue);
    }
    return element;
};

tpt.removeClass = function (element, stringValue) {
    "use strict";
    stringValue = tpt.trim(stringValue);
    if (document.documentElement.classList) {
        element.classList.remove(stringValue);
    } else if (tpt.hasClass(element, stringValue)) {
        var elementClass = tpt.trim(element.className);

        /* If identical */
        if (elementClass.length === stringValue.length) {
            elementClass = "";
        } else {
            /* If somewhere in the middle */
            if (elementClass.indexOf(" " + stringValue + " ") !== -1) {
                elementClass = elementClass.replace(" " + stringValue, "");
            }

            /* If at the end */
            if (tpt.endsWith(elementClass, stringValue)) {
                elementClass = elementClass.substr(0, (elementClass.length - stringValue.length));
            }

            /* If at the start */
            if (tpt.startsWith(elementClass, stringValue)) {
                elementClass = elementClass.substr(elementClass.length - stringValue.length - 1);
            }
        }
        element.className = tpt.trim(elementClass);
    }
    return element;
};

tpt.toggleClass = function (element, stringValue) {
    "use strict";
    if (tpt.hasClass(element, stringValue)) {
        tpt.removeClass(element, stringValue);
    } else {
        tpt.addClass(element, stringValue);
    }
    return element;
};

/* DOM Queries */
/*
    The purpose of the following functions (tpt.getByClass, tpt.selectAll and tpt.select)
    is to create a few fallbacks for commonly used functions without extending any browser's native capabilities
*/

/* tpt.getByClass */
/* Similar to document.getElementsByClassName

    Signature:
    tpt.getByClass(className, optionalContextElement)
*/

tpt.getByClass = function (className, sourceElement) {
    "use strict";
    sourceElement = sourceElement || document;

    if (document.getElementsByClassName) {
        return tpt.listToArray(sourceElement.getElementsByClassName(className));
    } else {
        var classes = className.split(" ");
        var classesToCheck = [];
        var childs = sourceElement.all;
        var currentChild;
        var match;
        var foundElements = [];

        var i = classes.length;
        var j = childs.length;
        var k = classesToCheck.length;

        while (i) {
            i -= 1;
            classesToCheck.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
        }

        while (j) {
            j -= 1;
            currentChild = childs[j];
            match = false;

            while (k) {
                k -= 1;
                match = classesToCheck[k].test(currentChild.className);
                if (!match) {
                    break;
                }
            }

            if (match) {
                foundElements.push(currentChild);
            }
        }
        return foundElements;
    }
};

/* tpt.select & tpt.selectAll */
/* Similar to document.querySelector & document.querySelectorAll

    It has limited flexibility for old IEs

    Signatures:
    tpt.select(CSS_selector, optionalContextElement)
    tpt.selectAll(CSS_selector, optionalContextElement)
*/

(function () {
    "use strict";
    if (document.createStyleSheet) {
        var styleSheet = document.styleSheets[0] || document.createStyleSheet();
    }

    var selectFallback = function (selector, sourceElement, maxCount) {
        if (document.createStyleSheet) {
            styleSheet.addRule(selector, "a:b");
            var foundElements = [];
            var i = sourceElement.all.length;
            while (i) {
                i -= 1;
                if (sourceElement.all[i].currentStyle.a === "b") {
                    foundElements.push(sourceElement.all[i]);
                    if (foundElements.length > maxCount) {
                        break;
                    }
                }
            }
            styleSheet.removeRule(0);
            return foundElements;
        }
    };

    tpt.selectAll = function (selector, sourceElement) {
        sourceElement = sourceElement || document;
        if (document.querySelectorAll) {
            return tpt.listToArray(sourceElement.querySelectorAll(selector));
        } else {
            return selectFallback(selector, sourceElement, Infinity);
        }
    };

    tpt.select = function (selector, sourceElement) {
        sourceElement = sourceElement || document;
        if (document.querySelector) {
            return sourceElement.querySelector(selector);
        } else {
            return selectFallback(selector, sourceElement, 1)[0] || null;
        }
    };
}());

/* Objects handling */

(function () {
    "use strict";
    var instances = (function () {
        var savedInstances = [];

        var filterByProperty = function (property, value) {
            if (typeof property === "string") {
                var matchedInstances = [];
                var i = savedInstances.length;
                while (i) {
                    i -= 1;
                    if (savedInstances[i][property] === value) {
                        matchedInstances.push(savedInstances[i]);
                    }
                }
                return matchedInstances;
            } else {
                return savedInstances;
            }
        };

        var filterByName = function (name) {
            if (name) {
                return filterByProperty("name", name);
            }
            return filterByProperty();
        };

        var filterById = function (id) {
            if (id) {
                return filterByProperty("id", id);
            }
            return filterByProperty();
        };

        return {
            addContext: function (name, objectInstance) {
                if (typeof name === "number") {
                    savedInstances.push(
                        {
                            "id": savedInstances.length,
                            "name": name || "",
                            "value": objectInstance
                        }
                    );
                    return objectInstance;
                }
            },
            getContext: function (key) {
                if (typeof key === "string") {
                    return filterByName(key);
                }
                if (typeof key === "number") {
                    return filterById(key);
                }
            },
            unlinkContexts: function (name) {
                var i = savedInstances.length;
                while (i) {
                    i -= 1;
                    if (savedInstances[i].name === name) {
                        savedInstances[i] = null;
                        return true;
                    }
                }
            }
        };
    }());

    tpt.addContext = function (name, objectInstance) {
        return instances.addContext(name, objectInstance);
    };

    tpt.getContext = function (name) {
        return instances.getContext(name);
    };

    tpt.unlinkContexts = function (name) {
        return instances.unlinkContexts(name);
    };
}());

tpt.createObject = function (protoObject) {
    "use strict";
    if (typeof Object.create !== "function") {
        if (typeof protoObject !== "object") {
            throw new TypeError("Argument must be an object");
        }
        var F = function () {};
        F.prototype = protoObject;
        return new F();
    } else {
        return Object.create(protoObject);
    }
};

tpt.captureTemplate = {
    "raw": function () {
        "use strict";
        return this.value;
    },
    "each": function (action) {
        "use strict";
        tpt.each(this.value, action);
        return this;
    },
    "setEphimeralFocus": function () {
        "use strict";
        tpt.setEphimeralFocus(this.value[0]);
        return this;
    },
    "addListener": function (eventName, behaviourFunction) {
        "use strict";
        var i = this.value.length;
        while (i) {
            i -= 1;
            tpt.addListener(this.value[i], eventName, behaviourFunction);
        }
        return this;
    },
    "removeListener": function (eventName, behaviourFunction) {
        "use strict";
        var i = this.value.length;
        while (i) {
            i -= 1;
            tpt.removeListener(this.value[i], eventName, behaviourFunction);
        }
        return this;
    },
    "onActive": function (behaviourFunction, cancelEvent) {
        "use strict";
        tpt.onActive(this.value, behaviourFunction, cancelEvent);
        return this;
    },
    "hasFocusedChild": function () {
        "use strict";
        return tpt.hasFocusedChild(this.value);
    },
    "hasClass": function (stringValue) {
        "use strict";
        var i = this.value.length;
        while (i) {
            i -= 1;
            if (tpt.hasClass(this.value[i], stringValue)) {
                return true;
            }
        }
        return false;
    },
    "addClass": function (stringValue) {
        "use strict";
        var i = this.value.length;
        while (i) {
            i -= 1;
            tpt.addClass(this.value[i], stringValue);
        }
        return this;
    },
    "removeClass": function (stringValue) {
        "use strict";
        var i = this.value.length;
        while (i) {
            i -= 1;
            tpt.removeClass(this.value[i], stringValue);
        }
        return this;
    },
    "toggleClass": function (stringValue) {
        "use strict";
        var i = this.value.length;
        while (i) {
            i -= 1;
            tpt.toggleClass(this.value[i], stringValue);
        }
        return this;
    },
    "getByClass": function (className) {
        "use strict";
        var foundElements = [];
        var i = this.value.length;
        while (i) {
            i -= 1;
            foundElements.concat(tpt.getByClass(className, this.value[i]));
        }
        var newObject = tpt.createObject(tpt.captureTemplate);
        newObject.value = foundElements;
        return newObject;
    },
    "selectAll": function (selector) {
        "use strict";
        var foundElements = [];
        var i = this.value.length;
        while (i) {
            i -= 1;
            foundElements = foundElements.concat(tpt.selectAll(selector, this.value[i]));
        }
        var newObject = tpt.createObject(tpt.captureTemplate);
        newObject.value = foundElements;
        return newObject;
    },
    "select": function (selector) {
        "use strict";
        var foundElement;
        var i = this.value.length;
        var item;
        while (i) {
            i -= 1;
            item = tpt.select(selector, this.value[i]);
            if (item) {
                foundElement = item;
                break;
            }
        }
        var newObject = tpt.createObject(tpt.captureTemplate);
        newObject.value = [foundElement];
        return newObject;
    }
};

tpt.captureObject = function (something) {
    "use strict";
    var newObject = tpt.createObject(tpt.captureTemplate);
    newObject.value = something;
    return newObject;
};

/* Misc */

tpt.togglePageBusy = function (howBusy) {
    "use strict";
    var timeAmountMs = 20000;
    if (typeof howBusy === "number") {
        timeAmountMs = howBusy;
        tpt.addClass(document.documentElement, "tpt_pageBusy");
        setTimeout(
            function () {
                tpt.togglePageBusy(false);
            },
            timeAmountMs
        );
    } else {
        tpt.removeClass(document.documentElement, "tpt_pageBusy");
    }
};

tpt.back = function (selector) {
    "use strict";
    if (typeof selector === "string") {
        var elements = tpt.selectAll(selector);
        if (elements) {
            var i = elements.length;
            while (i) {
                i -= 1;
                if (document.referrer) {
                    elements[i].href = document.referrer;
                }
            }
        }
    } else {
        history.back(-1);
    }
};

tpt.queue = {
    "runningCount": 0,
    "functionsToCall": [],
    "lanes": 3,
    "add": function (functionToAdd) {
        "use strict";
        if (typeof functionToAdd !== "function") {
            return false;
        }
        this.functionsToCall.push(functionToAdd);
        this.attemptRun();
    },
    "next": function () {
        "use strict";
        this.runningCount = this.runningCount - 1;
        this.attemptRun();
    },
    "attemptRun": function () {
        "use strict";
        var lanesOpen = this.lanes - this.runningCount;
        var runsRemaining = this.functionsToCall.length;
        var toRun = runsRemaining;
        if (lanesOpen < runsRemaining) {
            toRun = lanesOpen;
        }

        if (toRun > 0) {
            this.functionsToCall[0]();
            this.functionsToCall.splice(0, 1);
            this.runningCount = this.runningCount + 1;
        }
    }
};
