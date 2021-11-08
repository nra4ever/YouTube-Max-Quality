console.log('[YT MAX QUALITY] Loaded.');

function selectQuality(qualityButton) {
    // click the settings button on the video
    qualityButton.click();
    // get all menu items
    var menuItems = document.querySelectorAll('.ytp-settings-menu .ytp-panel .ytp-menuitem');
    // click quality menu (last element as of 11/7/21)
    menuItems[menuItems.length-1].click();
    // click first element (highest quality in quality menu)
    document.querySelectorAll('.ytp-settings-menu .ytp-panel.ytp-quality-menu .ytp-menuitem')[0].click();
}

qualityButton = document.querySelector('.ytp-settings-button');
if ((qualityButton !== null) && (qualityButton !== undefined)) {
    console.log('[YT MAX QUALITY] Found quality button without watching for mutations, excellent news.');
    selectQuality(qualityButton);
} else {
    function onMutation(mutations) {
        for (const { addedNodes } of mutations) {
            for (const node of addedNodes) {
                if (!node.tagName) continue; // not an element
                if (node.classList.contains('ytp-settings-button')) {
                    selectQuality(node);
                    console.log('[YT MAX QUALITY] Found quality button in node, disconnecting observer.')
                    observer.disconnect();
                } else {
                    var qualityButtons = node.getElementsByClassName('ytp-settings-button');
                    if (qualityButtons[0] !== undefined) {
                        selectQuality(qualityButtons[0]);
                        console.log('[YT MAX QUALITY] Found quality button in children, disconnecting observer.')
                        observer.disconnect();
                    }
                }
            }
        }
    }
    const observer = new MutationObserver(onMutation);
    observer.observe(document, {
        childList: true,
        subtree: true,
    });
}
