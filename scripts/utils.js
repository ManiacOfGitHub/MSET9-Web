var dialogModal = new bootstrap.Modal("#dialogModal", {backdrop:'static',keyboard:false});
var currentDialog;
$("#dialogPrimary").click(dialogNext);
$("#dialogSecondary").click(dialogPrev);

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
        $("#dialogPrimary").text("Continue");
        $("#dialogSecondary").text("Previous");
        if(currentDialog.stage == 0) {
            $("#dialogSecondary").hide();
        } else {
            $("#dialogSecondary").show();
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
