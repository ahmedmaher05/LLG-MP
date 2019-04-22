var Datastore = require('nedb'),
    db = new Datastore({
        filename: mainVar.getGlobal('dirName').dirname,
        autoload: true
    });
const {
    remote
} = require('electron')
ipc.on('openmedia', function (event, message) {
    remote.getCurrentWindow().loadURL('file:///' + __dirname + "/MediaPl.html")
})
ipc.on('opensub', function (event, message) {
    remote.getCurrentWindow().loadURL('file:///' + __dirname + "/MediaPl.html")
});
ipc.on('about', function (event, message) {
    Swal.fire({
        title: '<strong>About</strong>',
        imageUrl: 'https://i.imgur.com/kDqOC8w.png',
        html: 'LLG media player is an open source media player built with \
        <a href="#" onclick="shell.openExternal(\'https://github.com/RSATom/WebChimera.js\')" >webchimera.js</a> which \
        provides javscript bindings for <a href="#" onclick="shell.openExternal(\'https://www.videolan.org/vlc/libvlc.html\')" >libvlc</a>\
         <br> it\'s main purpose is to gamify the language learning process through appending clickable subtitles to different types of media with an onclick instant translation \
          during the stream flow',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Github',
        confirmButtonAriaLabel: 'Thumbs up, great!',
    }).then((result) => {
        if (result.value) shell.openExternal('https://github.com/engMaher')
    })
})
ipc.on('newReleases', function (event, message) {
    shell.openExternal('https://github.com/engMaher')
})
db.find({}, function (err, docs) {
    if (err) throw err;
    for (var i = 0; i < docs.length; i++) {
        if (docs[i].source == "youtube") {
            $("#dtableb").append(
                "<tr role='row' class='odd'>" +
                "<td class='sorting_1'>" + docs[i].expression + "</td>" +
                "<td>" + docs[i].translation + "</td>" +
                "<td>" + "https://www.youtube.com/" + docs[i].mediaPath.substring(docs[i].mediaPath.lastIndexOf("/") + 1, docs[i].mediaPath.length) + "</td>" +
                "<td>" + Math.floor(docs[i].currentPos / (60 * 60)) + ":" + Math.floor(docs[i].currentPos / 60) + ":" + Math.floor(docs[i].currentPos) + "</td> </tr>"
            );
        } else if (docs[i].source == "local") {
            $("#dtableb").append(
                "<tr role='row' class='odd'>" +
                "<td>" + docs[i].expression + "</td>" +
                "<td>" + docs[i].translation + "</td>" +
                "<td>" + docs[i].mediaPath.substring(docs[i].mediaPath.lastIndexOf("/") + 1, docs[i].mediaPath.length) + "</td>" +
                "<td>" + Math.floor(docs[i].currentPos / (1000 * 60 * 60)) + ":" + Math.floor(docs[i].currentPos / (1000 * 60)) + ":" + Math.floor(docs[i].currentPos / (1000)) + "</td> </tr>"
            );
        }
    }
})
setTimeout(function () {
    $(document).ready(function () {
        $('#dtBasicExample').DataTable();
        $('.dataTables_length').addClass('bs-select');
    });
}, 1000);