const successText = document.getElementById("successText");
const saveBtn = document.getElementById("saveBtn");
const urlInput = document.getElementById("urlInput");

saveBtn.addEventListener("click", () => {
    const newUrl = urlInput.value;
    if (newUrl == "" || newUrl == undefined) {
        successText.innerText = "URL eintragen!";
        document.body.style.backgroundColor = "#BF9264";
        return;
    }

    chrome.storage.sync.set({ "url": newUrl }, function(){
        successText.innerText = "Gespeichert";
        document.body.style.backgroundColor = "#BBD8A3";
    });
});