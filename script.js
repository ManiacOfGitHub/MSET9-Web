var m9status = {
    connected: false,
    sdSelected: false,
    sdInserted: false,
    supportCode: "MWS00"
};
$(document).ready(async()=>{
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
            $("#sdStatusText").text("SD Card not inserted");
        }
        $("#status-bar").removeClass("opacity-0");
    },100);


    if(!window["showDirectoryPicker"]) {
        $("#welcomeStatus").text("Your browser is incompatible with this web application.");
        $("#return").show();
        m9status.supportCode = "MWE01";
        return;
    }
    $("#welcomeStatus").text("Insert your SD card into your device, then press Continue.");
});