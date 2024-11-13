var m9status = {
    connected: false,
    sdSelected: false,
    sdInserted: false,
    supportCode: "MWS00"
};
$(document).ready(async()=>{
    if(!window["showDirectoryPicker"]) {
        $("#welcomeStatus").text("Your browser is incompatible with this web application.");
        $("#return").show();
        m9status.supportCode = "MWE01";
        return;
    }

    setInterval(function() {
        if(navigator.onLine) {
            m9status.connected = true;
            $("#networkStatusIcon").text("wifi");
            $("#networkStatusText").text("Connected");
        } else {
            m9status.connected = false;
            $("#networkStatusIcon").text("wifi_off");
            $("#networkStatusText").text("Disconnected");
        }
        if(m9status.sdSelected) {
            
        } else {
            m9status.sdInserted = false;
            $("#sdStatusIcon").text("pending");
            $("#sdStatusText").text("Waiting for SD Card selection");
        }
        $("#supportIdText").text(m9status.supportCode);
        $("#status-bar").removeClass("opacity-0");
    },250);


    $("#welcomeStatus").text("Power off your console and insert your SD card into this device, then press Continue.");
    $("#showQuickNotes").removeClass("d-none");
    var quickNotesModal = new bootstrap.Modal("#quickNotes", {backdrop:'static',keyboard:false});
    $("#showQuickNotes").click(()=>{
        quickNotesModal.show();
        $("#welcome-section").hide();
        $("#main-area").hide();
    });
    var quickNotesState = 0;
    $("#quickNotesContinue").click(()=>{
        if(quickNotesState == 0) {
            quickNotesState = 1;
            $("#quickNotesTitle").text("Get Help!");
            $("#quickNotesBody").text("If you need assistance at any point during this guide, click on the support section as shown on the top right of this page.");
            $("#supportSection").addClass("showSupport");
        } else if(quickNotesState == 1) {
            quickNotesState = 2;
            $("#quickNotesTitle").text("MSET9-Web v0beta");
            $("#quickNotesBody").text("This web application is still in early beta, so there are likely going to be issues. Again, I cannot stress this enough, make a backup of any important data before beginning.");
            $("#supportSection").removeClass("showSupport");
        } else if(quickNotesState == 2) {
            quickNotesModal.hide();
            selectSdPrompt();
        }
    })
});

function selectSdPrompt() {
    $("#select-sd-section").show();
    $("#main-area").show();
    $("#video-tutorial-source").attr("src","assets/tutorials/select-sd-windows.mp4");
    $("#video-tutorial-section").show();
    $("#video-tutorial-source")[0].parentElement.load();
    $("#secondary-area").show();
    $("#select-sd-button").click(()=>{
        alert("not implemented\n\np.s. bonk gabbi lmao");
    });
}