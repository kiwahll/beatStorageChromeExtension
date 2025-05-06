var url = undefined;

(async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    url = tab.url;
})();

document.getElementById("sendBtn").addEventListener("click", async function () {
    fetch(`http://127.0.0.1:8000/add/${document.getElementById("title").value}/${encodeURIComponent(url)}`)
        .then(resp => resp.text())
        .then(data => document.getElementById("savedID").innerText = data);
});