var quickNotesDialog = {
    screens: [
        {
            title: "Some quick notes before we begin...",
            body: `
                <p>While much effort has been put in to ensure user data is not lost, SD corruption is still possible. It is strongly recommended that you make a backup of the Nintendo 3DS folder to another device before using this guide.</p>
                <p>Alternatively, you can also use <a href="https://3ds.hacks.guide/get-started.html">an alternate exploit</a>, however, do note that they are also not completely immune to these issues.</p>
            `,
            script: function() {
                $("#supportSection").removeClass("showSupport");
            }
        },
        {
            title: "Get Help!",
            body: "If you need assistance at any point during this guide, click on the support section as shown on the top right of this page.",
            script: function() {
                $("#supportSection").addClass("showSupport");
            }
        },
        {
            title: "MSET9-Web v0beta",
            body: "This web application is still in early beta, so there are likely going to be issues. Again, I cannot stress this enough, make a backup of any important data before beginning.",
            script: function() {
                $("#supportSection").removeClass("showSupport");
            }
        }
    ]
}