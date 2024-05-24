/* Menu */

/* Example usage:
    tpt.menu(".tpt_menuLeftPrimary");

    Will use these classes:
    "tpt_menuLeftPrimary" -> for the menu itself
    "tpt_menuLeftPrimaryTrigger" -> for the buttons that open/close the menu
    "tpt_menuLeftPrimaryNotification" -> optional, these elements will be notified of the menu state

    If the browser is not able to use CSS Transitions or CSS Transforms,
    a "fallbackMenu" class will be appended to the HTML element
*/

tpt.menu = function (menuClassSelector) {
    "use strict";
    tpt.menu.browserTest();

    var menuObject = {
        "menuName": menuClassSelector.slice(1),
        "menus": tpt.selectAll(menuClassSelector),
        "triggers": tpt.selectAll(menuClassSelector + "Trigger"),
        "toNotify": tpt.selectAll(menuClassSelector + "Notification")
    };

    if (menuClassSelector) {
        tpt.menu.setToggleEvents(menuObject);
    }

    return tpt.createObject({
        "open": function () {
            tpt.menu.open(menuObject);
            return this;
        },
        "close": function () {
            tpt.menu.close(menuObject);
            return this;
        },
        "toggle": function () {
            tpt.menu.toggle(menuObject);
            return this;
        }
    });
};

tpt.menu.browserTest = function () {
    "use strict";
    if (tpt.browser && tpt.browser.supportsTransition && tpt.browser.supportsTransform) {
        if (!tpt.browser.supportsTransition(false) || !tpt.browser.supportsTransform(false)) {
            tpt.addClass(document.documentElement, "fallbackMenu");
        }
    }
};

tpt.menu.open = function (menuObject) {
    "use strict";
    this.classToggler(menuObject, tpt.addClass);
};

tpt.menu.close = function (menuObject) {
    "use strict";
    this.classToggler(menuObject, tpt.removeClass);
};

tpt.menu.toggle = function (menuObject) {
    "use strict";
    this.classToggler(menuObject, tpt.toggleClass);
};

tpt.menu.classToggler = function (menuObject, classHandlerFunction) {
    "use strict";
    var openClass = "open";
    var notificationClass = menuObject.menuName + "NotificationOpen";

    var i = menuObject.menus.length;
    while (i) {
        i -= 1;
        classHandlerFunction(menuObject.menus[i], openClass);
    }

    var j = menuObject.triggers.length;
    while (j) {
        j -= 1;
        classHandlerFunction(menuObject.triggers[j], openClass);
    }

    var k = menuObject.toNotify.length;
    while (k) {
        k -= 1;
        classHandlerFunction(menuObject.toNotify[k], notificationClass);
    }

    classHandlerFunction(document.documentElement, notificationClass);
};

tpt.menu.setToggleEvents = function (menuObject) {
    "use strict";
    var setMenus = function (allMenus) {
        var atFocus = function (item) {
            tpt.addListener(item, "focus", function () {
                tpt.menu.open(menuObject);
            });
        };
        var atBlur = function (item) {
            tpt.addListener(item, "blur", function () {
                if (!tpt.hasFocusedChild(menuObject.menus)) {
                    tpt.menu.close(menuObject);
                }
            });
        };

        var i = allMenus.length;
        var menuItems = [];
        var j = 0;
        while (i) {
            i -= 1;
            menuItems = tpt.selectAll("a", allMenus[i]);
            j = menuItems.length;

            while (j) {
                j -= 1;
                atFocus(menuItems[j]);
                atBlur(menuItems[j]);
            }
        }
    };

    var setTriggers = function (allTriggers) {
        tpt.onActive(
            allTriggers,
            function () {
                tpt.menu.toggle(menuObject);
            },
            true
        );
    };

    if (menuObject.triggers) {
        setTriggers(menuObject.triggers);
    }

    if (menuObject.menus) {
        setMenus(menuObject.menus);
    }
};
