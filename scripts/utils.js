var dialogModal = new bootstrap.Modal("#dialogModal", {backdrop:'static',keyboard:false});
var currentDialog;
var dialogPrimary = $("#dialogPrimary");
var dialogSecondary = $("#dialogSecondary");
dialogPrimary.click(dialogNext);
dialogSecondary.click(dialogPrev);

function devConfirmContinue(callback) {
    if(prompt("Are you sure? (y/n)")=="y") {
        callback();
    } else {
        alert("Cancelled.");
    }
}

function is3DSID(name) {
    if(name.length != 32) return false;

    var hex_test = parseInt(name, 16);
    return Number.isInteger(hex_test);
}

async function showDialog(data) {
    currentDialog = data;
    currentDialog.stage = 0;
    updateDialog();
    dialogModal.show();
    return new Promise(resolve=>{
        currentDialog.dialogComplete = resolve;
    });
}

function updateDialog() {
    var stageData = currentDialog.screens[currentDialog.stage];
    $("#dialogTitle").text(stageData.title);
    $("#dialogBody").html(stageData.body);
    if(stageData.script) stageData.script();
    if(!stageData.buttons) {
        dialogPrimary.text("Continue");
        dialogSecondary.text("Previous");
        if(currentDialog.stage == 0) {
            dialogSecondary.hide();
        } else {
            dialogSecondary.show();
        }
    } else {
        var buttonElements = [dialogPrimary, dialogSecondary];
        for(var i = 0; i < buttonElements.length; i++) {
            if(i < stageData.buttons.length) {
                buttonElements[i].show();
                buttonElements[i].text(stageData.buttons[i].text);
                buttonElements[i].off("click");
                buttonElements[i].click(stageData.buttons[i].action);
            } else {
                buttonElements[i].hide();
            }
        }
    }
}


function dialogNext() {
    if(currentDialog.stage == currentDialog.screens.length-1) {
        dialogModal.hide();
        currentDialog.dialogComplete();
    } else {
        currentDialog.stage++;
        updateDialog();
    }
}

function dialogPrev() {
    if(currentDialog.stage == 0) return;
    currentDialog.stage--;
    updateDialog();
}

async function loadScript(url) {
    while(true) {
        try {
            return await new Promise((resolve, reject)=>{
                let script = document.createElement("script");
                script.src = url;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        } catch(err) {
            var shouldRetry = await showDialog({
                screens: [{
                    title: "Error",
                    body: `
                        <p>There was an error loading the script "${url}" from the server. Please check your internet connection and press Retry.</p>
                        <p>Developer Info:</p>
                        <pre>${err}</pre>
                    `,
                    buttons: [{
                        text: "Retry",
                        action: async function() {
                            return true;
                        }
                    }]
                }]
            });
        }
    }
}
