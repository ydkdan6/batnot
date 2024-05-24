/* Attachments previews */
tpt.attachments = {
    "attachmentBox": null
}

tpt.attachments.getAttachmentBox = function () {
    "use strict";
    if (!tpt.attachments.attachmentBox) {
        tpt.attachments.attachmentBox = (tpt.select('.tpt_filePreview')) ? (tpt.select('.tpt_filePreview')) : null
    }
};

tpt.attachments.getAttachmentBox();

tpt.attachments.showPreview = function (element) {
    "use strict";
    if (tpt.attachments.attachmentBox) {
        tpt.attachments.attachmentBox.getElementsByTagName('iframe')[0].src = element.href;
        tpt.addClass(tpt.attachments.attachmentBox, 'fileShow');
    }
};

tpt.attachments.hidePreview = function () {
    "use strict";
    if (tpt.attachments.attachmentBox) {
        tpt.attachments.attachmentBox.getElementsByTagName('iframe')[0].src = 'about:blank';
        tpt.removeClass(tpt.attachments.attachmentBox, 'fileShow');
    }
};

tpt.attachments.deleteFile = function (element) {
    "use strict";
    var userResponse = window.confirm(element.getAttribute('data-confirmation'));
    if (userResponse) {
        tpt.select('.tpt_attachmentDeletionFileName').value = element.getAttribute('data-filename');
        tpt.select('.tpt_attachmentDeletionForm').submit();
    }
};
