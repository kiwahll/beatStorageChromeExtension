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
            error("URL in Einstellungen fehlt!");
            return;
        }
    });

    if (titleInput == "" || titleInput == undefined) {
        error("Titel eingeben!");
        return;
    }

    if (server == undefined) return;

    fetch(`${server}/add/${titleInput.value.trim()}/${encodeURIComponent(url)}`)
        .then(resp => {
            if (!resp.ok) {
                resp.text().then((data) => warning(data));
            }
            return resp.text();
        })
        .then(data => {
            success(data);
        })
        .catch(_ => {
            error("URL nicht korrekt!");
        });
});

function error(text) {
    sendBtn.innerText = text;
    sendBtn.classList.remove('warning');
    sendBtn.classList.remove('success');
    sendBtn.classList.add('error')
}

function success(text) {
    sendBtn.innerText = text;
    sendBtn.classList.remove('warning');
    sendBtn.classList.remove('error');
    sendBtn.classList.add('success');
}

function warning(text) {
    sendBtn.innerText = text;
    sendBtn.classList.remove('error');
    sendBtn.classList.remove('success');
    sendBtn.classList.add('warning');
}