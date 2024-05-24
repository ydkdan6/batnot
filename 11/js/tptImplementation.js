/* This scripts are intended to be run deferred */

/* Back links behaviour */
tpt.back("a.tpt_back");

/* Anchors Focus at load */
if (window.location.hash) {
    var isLetter = /^[a-zA-Z]*$/;
    if ((window.location.hash.indexOf(" ") === -1) && isLetter.test(window.location.hash[1])) {
        tpt(window.location.hash).setEphimeralFocus();
    }
}

/* Anchors Focus */
tpt(".tpt_localAnchor").onActive(
    function (event) {
        "use strict";
        tpt("#" + tpt.getElementFromEvent(event).href.split("#")[1]).setEphimeralFocus();
    }
);

/* Search Agents hidden fields toggle */
tpt(".tpt_searchAgentHiddenFieldsToggle").onActive(
    function () {
        "use strict";
        tpt(".tpt_searchAgentHiddenFields").toggleClass("open");
    },
    true
);

/* Login hidden fields toggle */
tpt(".tpt_loginHiddenFieldsToggle").onActive(
    function () {
        "use strict";
        tpt(".tpt_loginHiddenFields").toggleClass("open");
        tpt(".tpt_uploadResumeLoginLegend").toggleClass("open");
    },
    true
);

/* Lists sorting */
tpt(".tpt_listSortableItem").onActive(
    function (event) {
        "use strict";
        var trigger = tpt.getElementFromEvent(event);
        tpt.listSearchAndSort(trigger.getAttribute("data-sortBy"), trigger.getAttribute("data-entity"));
        tpt.togglePageBusy(true);
    },
    true
);

tpt(".tpt_peopleFilterByJob").onActive(
    function (event) {
        "use strict";
        tpt.listSearchAndSortPeopleByJobId(tpt.getElementFromEvent(event).getAttribute("data-jobid"));
        tpt.togglePageBusy(true);
    },
    true
);

/* Social Share */

tpt(".tpt_socialSharePopupTrigger").onActive(
    function (event) {
        "use strict";
        var activeSocialLink = tpt.getElementFromEvent(event);
        window.open(
            activeSocialLink.href,
            "popup_id" + tpt.trim(activeSocialLink.title),
            "scrollbars,resizable,width=700,height=500"
        );
    },
    true
);

/* Profile upload file */
tpt(".tpt_uploadFileCaptionTrigger").onActive(
    function () {
        "use strict";
        tpt(".tpt_uploadFileCaption").toggleClass("dBlock").toggleClass("dNone");
        tpt(".tpt_uploadFile").toggleClass("dBlock").toggleClass("dNone");
    },
    true
);

/* Attachments */
tpt(".tpt_attachments_showPreviewTrigger").onActive(
    function (event) {
        "use strict";
        tpt.attachments.showPreview(tpt.getElementFromEvent(event));
    },
    true
);

tpt(".tpt_attachments_hidePreviewTrigger").onActive(
    function () {
        "use strict";
        tpt.attachments.hidePreview();
    },
    true
);

tpt(".tpt_attachments_deleteFileTrigger").onActive(
    function (event) {
        "use strict";
        tpt.attachments.deleteFile(tpt.getElementFromEvent(event));
    },
    true
);

/* Mobile menu */
tpt.menu(".tpt_menuLeftSlideAll");
