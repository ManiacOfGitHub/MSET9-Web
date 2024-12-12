var infoModal = new bootstrap.Modal("#infoModal");

$("#closeInfo").click(()=>{
    infoModal.hide();
});


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

function showInfo(title, body) {
    $("#infoTitle").text(title);
    $("#infoBody").text(body);
    infoModal.show();
}