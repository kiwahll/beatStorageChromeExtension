const successText = document.getElementById("successText");
const titleInput = document.getElementById("title");
const sendBtn = document.getElementById("sendBtn");
var url = undefined;
var server = undefined;

(async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    url = tab.url;
})();

sendBtn.addEventListener("click", async function () {
    chrome.storage.sync.get(["url"], function(items){
        console.log(items);
        try {
            server = items["url"];
        } catch {
            successText.innerText = "URL in Einstellugen anpassen!";
            document.body.style.backgroundColor = "#BF9264";
            return;
        }
    });

    if (titleInput == "" || titleInput == undefined) {
        successText.innerText = "Titel eingeben!";
        document.body.style.backgroundColor = "#BF9264";
        return;
    }

    if (server == undefined) return;

    fetch(`${server}/add/${titleInput.value}/${encodeURIComponent(url)}`)
        .then(resp => resp.text())
        .then(data => {
            successText.innerText = data;
            document.body.style.backgroundColor = "#BBD8A3";
        })
        .catch(_ => {
            successText.innerText = "URL nicht korrekt!";
            document.body.style.backgroundColor = "#BF9264";
        });
});