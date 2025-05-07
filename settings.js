const successText = document.getElementById("successText");
const saveBtn = document.getElementById("saveBtn");
const urlInput = document.getElementById("urlInput");
const ullTitle = document.getElementById("URLTitle");

saveBtn.addEventListener("click", () => {
    const newUrl = urlInput.value;
    if (newUrl == "" || newUrl == undefined) {
        error("URL eintragen!");
        return;
    }

    chrome.storage.sync.set({ "url": newUrl }, function(){
        success("URL gespeichert!");
        loadUrlTitel();
    });
});

function loadUrlTitel() {
    ullTitle.innerText = "URL";

    chrome.storage.sync.get(["url"], function(items){
        console.log(items);
        try {
            ullTitle.innerText += ": " + items["url"];
        } catch {
        }
    });
}

onload = loadUrlTitel();

function error(text) {
    saveBtn.innerText = text;
    saveBtn.classList.remove('warning');
    saveBtn.classList.remove('success');
    saveBtn.classList.add('error')
}

function success(text) {
    saveBtn.innerText = text;
    saveBtn.classList.remove('warning');
    saveBtn.classList.remove('error');
    saveBtn.classList.add('success');
}

function warning(text) {
    saveBtn.innerText = text;
    saveBtn.classList.remove('error');
    saveBtn.classList.remove('success');
    saveBtn.classList.add('warning');
}