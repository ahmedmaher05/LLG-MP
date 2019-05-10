var wjs = require("wcjs-player");
var mainVar = require('electron').remote;
var ipc = require('electron').ipcRenderer;
const OS = require('opensubtitles-api');
const OpenSubtitles = new OS({
    useragent: 'LLG-MP v0.1',
    username: 'LLG-MP',
    password: 'dahag',
    ssl: true
});
const {
    shell
} = require('electron')
var {
    translate
} = require("google-translate-api-browser");
var $ = require('jquery');
var Datastore = require('nedb'),
    db = new Datastore({
        filename: mainVar.getGlobal('dirName').dirname,
        autoload: true
    });
var captionsDisplay = document.querySelector('.captions-display');
var regions = [];
global.cues = [];
global.lyrics = false;
global.lyricsText = "";
global.mediaPath = '';
global.currentPos = 0;
global.player = new wjs("#player").addPlayer({
    autoplay: true,
    wcjs: require('wcjs-prebuilt')
});
player.vlc.play("G:/resilio/motivationalResilio/series/silicon valley/season 1/Silicon Valley S01E01.mkv")

ipc.on('updateCheck', function (event, message) {
    swal.fire(message);
})
ipc.on('updateAvailable', function (event, message) {
    swal.fire(message);
})
ipc.on('noUpdates', function (event, message) {
    swal.fire(message);
})
ipc.on('updateError', function (event, message) {
    swal.fire(message);
})
ipc.on('updateProgress', function (event, message) {
    swal.fire(message);
})
ipc.on('installingUPdate', function (event, message) {
    swal.fire(message);
})
ipc.on('openmedia', function (event, message) {
    Swal.fire({
        title: 'Select media file',
        input: 'file',
        inputAttributes: {
            'accept': '*',
            'aria-label': 'choose your media file'
        }
    }).then((result) => {
        mediaPath = result.value.path;
        console.log(result.value.path.replace(/\\/ig, '/'))
        player.vlc.play("file:///" + result.value.path.replace(/\\/ig, '/'))
        loadSubtitles(result.value.path);

    })
})
ipc.on('opensub', function (event, message) {
    Swal.fire({
        title: 'Select subtitles file',
        html: "note: Only .srt and .vtt formats are supported",
        input: 'file',
        inputAttributes: {
            'accept': '.vtt,.srt',
            'aria-label': 'choose your subtitles file'
        }
    }).then((result) => {
        loadSubtitles(result.value.path);
    })
});
ipc.on('lyrics', function (event, message) {
    swal.fire({
        text: 'please enter song name',
        input: 'text',
        inputPlaceholder: 'Ex: rolling in the deep',
        showCancelButton: true,
        inputValidator: (song) => {
            if (!song) {
                return 'You need to write something!';
            }
        }
    }).then((song) => {
        if (song.value) {
            swal.fire({
                text: 'please enter the artist name',
                input: 'text',
                inputPlaceholder: 'Ex: adele',
                showCancelButton: true,
                inputValidator: (artist) => {
                    if (!artist) {
                        return 'you need to write something!'
                    }
                }
            }).then((artist) => {
                $.get("https://www.azlyrics.com/lyrics/" + artist.value.replace(
                        /\s/g,
                        '') + "/" +
                    song.value.replace(/\s/g,
                        '') +
                    ".html",
                    function (responseText) {
                        var elements = $.parseHTML(responseText)[44]
                            .childNodes[1]
                            .childNodes[5]
                        for (let i = 0; i < elements.childNodes.length; i++) {
                            if (elements.childNodes[i].tagName == "DIV" && $(elements.childNodes[i]).hasClass('')) {
                                lyrics = true;
                                lyricsText = elements.childNodes[i];
                                Swal.fire({
                                    allowOutsideClick: false,
                                    allowEnterKey: false,
                                    html: elements.childNodes[i]
                                }).then((result) => {
                                    if (result.value) {
                                        lyrics = false;
                                    }
                                })
                            }
                        }
                    }).fail(function () {
                    swal.fire({
                        text: "couldn't get the lyrics of the song '" +
                            song.value + "' for the artist '" +
                            artist
                            .value + "'"
                    })
                });
            })
        }
    })
});
ipc.on('movies/series', function (event, message) {
    OpenSubtitles.login()
        .then(res => {
            console.log(res.token);
            console.log("sdad", res.userinfo);
            swal.fire({
                showCancelButton: true,
                html: `
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Subtitles language</label>
                </div>
                <select class="custom-select" id="lang">
                <option value=afr>Afrikaans</option>
                <option value=alb>Albanian</option>
                <option value=amh>Amharic</option>
                <option value=ara>Arabic</option>
                <option value=arm>Armenian</option>
                <option value=aze>Azerbaijani</option>
                <option value=baq>Basque</option>
                <option value=bel>Belarusian</option>
                <option value=ben>Bengali</option>
                <option value=bos>Bosnian</option>
                <option value=bul>Bulgarian</option>
                <option value=cat>Catalan</option>
                <option value=ceb>Cebuano</option>
                <option value=nya>Chichewa</option>
                <option value=chi>Chinese</option>
                <option value=cos>Corsican</option>
                <option value=hrv>Croatian</option>
                <option value=cze>Czech</option>
                <option value=dan>Danish</option>
                <option value=dut>Dutch</option>
                <option value=eng selected="selected">English</option>
                <option value=epo>Esperanto</option>
                <option value=est>Estonian</option>
                <option value=fil>Filipino</option>
                <option value=fin>Finnish</option>
                <option value=fre>French</option>
                <option value=frr>Frisian</option>
                <option value=glg>Galician</option>
                <option value=geo>Georgian</option>
                <option value=ger>German</option>
                <option value=gre>Greek</option>
                <option value=guj>Gujarati</option>
                <option value=hat>Haitian Creole</option>
                <option value=hau>Hausa</option>
                <option value=haw>Hawaiian</option>
                <option value=heb>Hebrew</option>
                <option value=hin>Hindi</option>
                <option value=hmn>Hmong</option>
                <option value=hun>Hungarian</option>
                <option value=ice>Icelandic</option>
                <option value=ibo>Igbo</option>
                <option value=ind>Indonesian</option>
                <option value=gle>Irish</option>
                <option value=ita>Italian</option>
                <option value=jpn>Japanese</option>
                <option value=jav>Javanese</option>
                <option value=kan>Kannada</option>
                <option value=kaz>Kazakh</option>
                <option value=khm>Khmer</option>
                <option value=kor>Korean</option>
                <option value=kur>Kurdish (Kurmanji)</option>
                <option value=kir>Kyrgyz</option>
                <option value=lao>Lao</option>
                <option value=lat>Latin</option>
                <option value=lav>Latvian</option>
                <option value=lit>Lithuanian</option>
                <option value=ltz>Luxembourgish</option>
                <option value=mac>Macedonian</option>
                <option value=mlg>Malagasy</option>
                <option value=may>Malay</option>
                <option value=mal>Malayalam</option>
                <option value=mlt>Maltese</option>
                <option value=mao>Maori</option>
                <option value=mar>Marathi</option>
                <option value=mon>Mongolian</option>
                <option value=nep>Nepali</option>
                <option value=nno>Norwegian</option>
                <option value=pus>Pashto</option>
                <option value=per>Persian</option>
                <option value=pol>Polish</option>
                <option value=por>Portuguese</option>
                <option value=pan>Punjabi</option>
                <option value=rum>Romanian</option>
                <option value=rus>Russian</option>
                <option value=smo>Samoan</option>
                <option value=srp>Serbian</option>
                <option value=sna>Shona</option>
                <option value=snd>Sindhi</option>
                <option value=sin>Sinhala</option>
                <option value=slo>Slovak</option>
                <option value=slv>Slovenian</option>
                <option value=som>Somali</option>
                <option value=spa>Spanish</option>
                <option value=sun>Sundanese</option>
                <option value=swa>Swahili</option>
                <option value=swe>Swedish</option>
                <option value=tgk>Tajik</option>
                <option value=tam>Tamil</option>
                <option value=tel>Telugu</option>
                <option value=tha>Thai</option>
                <option value=tur>Turkish</option>
                <option value=ukr>Ukrainian</option>
                <option value=urd>Urdu</option>
                <option value=uzb>Uzbek</option>
                <option value=vie>Vietnamese</option>
                <option value=wel>Welsh</option>
                <option value=xho>Xhosa</option>
                <option value=yid>Yiddish</option>
                <option value=yor>Yoruba</option>
                <option value=zul>Zulu</option>
                </select>
                </div>
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Title</span>
                </div>
                <input type="text" placeholder="ex: game of thrones" class="form-control" id="title" aria-describedby="basic-addon3">
                </div>
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                <span class="input-group-text" id="season">Season(series)</span>
                </div>
                <input type="text" placeholder="ex: 1" class="form-control" id="title" aria-describedby="basic-addon3">
                </div>

                <div class="input-group mb-3">
                <div class="input-group-prepend">
                <span class="input-group-text" id="episode">Episode(series)</span>
                </div>
                <input type="text" placeholder="ex: 5" class="form-control" id="title" aria-describedby="basic-addon3">
                </div>
                `,
                preConfirm: () => {
                    const subLang = $('#lang').val();
                    const title = $('#title').val();
                    const season = $('#season').val();
                    const episode = $('#episode').val();
                    OpenSubtitles.search({
                        sublanguageid: subLang,
                        season: season,
                        episode: episode,
                        query: title,
                        limit: '20',
                        extensions: ['srt', 'vtt']
                    }).then(subtitles => {
                        console.log(subtitles);
                        var htmlcont = `<select class="custom-select" id="subtitles" multiple>`;
                        var subsArr = Object.keys(subtitles).map(k => subtitles[k])[0];
                        for (let i = 0; i < subsArr.length; i++) {
                            htmlcont += `<option value="` + subsArr[i].url + `">` + subsArr[i].filename + `</option>`
                        }
                        swal.fire({
                            html: htmlcont,
                            preConfirm: function () {
                                const subUrl = $('#subtitles').val();
                                ipcRenderer.send("download", {
                                    url: subUrl,
                                    properties: {
                                        directory: mainVar.getGlobal('filePath')
                                    }
                                });
                            }
                        }).then((result) => {
                            if (result.value) {

                            }
                        })
                    })
                }
            }).then((choice) => {
                if (choice.value) {

                }
            })
        })
        .catch(err => {
            console.log(err);
        });
})
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
document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault()
}
document.body.ondrop = (ev) => {
    drop(ev)
    mediaPath = ev.dataTransfer.files[0].path.replace(/\\/ig, '/');
    player.vlc.play("file:///" + ev.dataTransfer.files[0].path.replace(/\\/ig, '/'))
    ev.preventDefault()
    loadSubtitles(ev.dataTransfer.files[0].path);
}

function drop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var vidUrl = evt.dataTransfer.getData('text/html');
    var rex = /src="?([^"\s]+)"?\s*/;
    var url, res;
    url = rex.exec(vidUrl);
}

function loadSubtitles(fpath) {
    var xhr = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();
    xhr.open('GET', "file:///" + fpath.replace(/\\/ig, '/').split(
        /(?:\.([^.]+))?$/)[0] + ".vtt");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && this.status == 200) {
            doCaptions(xhr.responseText);
        }
    };
    xhr.send();
    xhr2.open('GET', "file:///" + fpath.replace(/\\/ig, '/').split(
        /(?:\.([^.]+))?$/)[0] + ".srt");
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status == 200) {
            var webvtt = srt2webvtt(xhr2.responseText);
            doCaptions(webvtt); // convert to vtt
        } else if (xhr2.readyState != 4 && xhr2.status != 200) {
            swal.fire(
                "couldn't find subtitle file . PS: only .srt and .vtt formats are currently supported "
            )
        }
    };
    xhr2.send();
}

function srt2webvtt(data) {
    var srt = data.replace(/\r+/g, '');
    srt = srt.replace(/^\s+|\s+$/g, '');
    var cuelist = srt.split('\n\n');
    var result = "";
    if (cuelist.length > 0) {
        result += "WEBVTT\n\n";
        for (var i = 0; i < cuelist.length; i = i + 1) {
            result += convertSrtCue(cuelist[i]);
        }
    }
    return result;
}

function convertSrtCue(caption) {
    var cue = "";
    var s = caption.split(/\n/);
    while (s.length > 3) {
        for (var i = 3; i < s.length; i++) {
            s[2] += "\n" + s[i]
        }
        s.splice(3, s.length - 3);
    }
    var line = 0;
    if (!s[0].match(/\d+:\d+:\d+/) && s[1].match(/\d+:\d+:\d+/)) {
        cue += s[0].match(/\w+/) + "\n";
        line += 1;
    }
    if (s[line].match(/\d+:\d+:\d+/)) {
        var m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
        if (m) {
            cue += m[1] + ":" + m[2] + ":" + m[3] + "." + m[4] + " --> " +
                m[5] + ":" + m[6] + ":" + m[7] + "." + m[8] + "\n";
            line += 1;
        } else {
            return "";
        }
    } else {
        return "";
    }
    if (s[line]) {
        cue += s[line] + "\n\n";
    }
    return cue;
}

function doCaptions(caption) {
    cues = [];
    var parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
    parser.oncue = function (cue) {
        cues.push(cue);
    };
    parser.onregion = function (region) {
        regions.push(region);
    }
    parser.onparsingerror = function (error) {}
    parser.parse(caption);
    parser.flush();
}
player.onTime(function (t) {
    var ct = t / 1000;
    var activeCues = cues.filter(function (cue) {
        return cue.startTime <= ct && cue.endTime >= ct;
    });
    WebVTT.processCues(window, activeCues, captionsDisplay);
});

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined" && window.getSelection().anchorNode != null && window
        .getSelection().toString().replace(/\s/g, '')) {
        player.pause();
        currentPos = player.time()
        text = window.getSelection().toString();
    }
    if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        player.pause();
        text = document.selection.createRange().text;
    }
    return text;
}

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}

function doSomethingWithSelectedText() {
    var lang = mainVar.getGlobal('lang').lang;
    if (!lang)
        lang = 'ar';
    var selectedText = getSelectedText();
    if (selectedText) {
        clearSelection();
        translate(selectedText, {
            to: lang
        }).then(res => {
            $(document).ready(function () {
                if (lyrics) {
                    Swal.fire({
                        html: '<span>' +
                            '<span style="color:red;font-size:xx-large;font-weight: bold;">' +
                            selectedText + '</span><br>' +
                            " in " + ((lang == 'ar') ? "Arabic" : (lang ==
                                    'en') ?
                                "English" :
                                (lang == 'de') ? "German" : (lang == 'nl') ? "Dutch" : (lang == 'fr') ? "French" : (lang == 'hi') ? "Hindi" : (lang == 'iw') ? "Hebrew" : (lang == 'it') ? "Italian" : (lang == 'ja') ? "Japanese" : (lang == 'ru') ? "Russian" : (lang == 'es') ? "Spanish" : (lang == 'tr') ? "Turkish" : "Invalid_Lang") +
                            " is : <br>" +
                            '</span>' +
                            '<span style="color:red;font-size:xx-large;font-weight: bold;">' +
                            res.text + '</span>'
                    }).then((result) => {
                        Swal.fire({
                            title: 'Do you want to save this word/phrase for future tests?',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Save'
                        }).then((result) => {
                            if (result.value) {
                                var doc = {
                                    source: "local",
                                    expression: selectedText,
                                    translation: res.text,
                                    mediaPath: mediaPath,
                                    currentPos: currentPos,
                                    date: new Date()
                                };
                                db.insert(doc, function (err,
                                    newDoc) {
                                    if (err) throw err;
                                    Swal.fire(
                                        'Saved!',
                                        'the word/expression has been saved',
                                        'success'
                                    ).then((result) => {
                                        if (result.value) {
                                            Swal.fire({
                                                allowOutsideClick: false,
                                                allowEnterKey: false,
                                                html: lyricsText
                                            }).then((result) => {
                                                if (result.value) {
                                                    lyrics = false;
                                                }
                                            })
                                        }
                                    })
                                });
                                player.play();
                            } else {
                                Swal.fire({
                                    allowOutsideClick: false,
                                    allowEnterKey: false,
                                    html: lyricsText
                                }).then((result) => {
                                    if (result.value) {
                                        lyrics = false;
                                    }
                                })
                                player.play();
                            }
                        })
                    })
                } else {
                    Swal.fire({
                        html: '<span>' +
                            '<span style="color:red;font-size:xx-large;font-weight: bold;">' +
                            selectedText + '</span><br>' +
                            " in " + ((lang == 'ar') ? "Arabic" : (lang ==
                                    'en') ?
                                "English" :
                                (lang == 'de') ? "German" : (lang == 'nl') ? "Dutch" : (lang == 'fr') ? "French" : (lang == 'hi') ? "Hindi" : (lang == 'iw') ? "Hebrew" : (lang == 'it') ? "Italian" : (lang == 'ja') ? "Japanese" : (lang == 'ru') ? "Russian" : (lang == 'es') ? "Spanish" : (lang == 'tr') ? "Turkish" : "Invalid_Lang") +
                            " is : <br>" +
                            '</span>' +
                            '<span style="color:red;font-size:xx-large;font-weight: bold;">' +
                            res.text + '</span>'
                    }).then((result) => {
                        Swal.fire({
                            title: 'Do you want to save this word/phrase for future tests?',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Save'
                        }).then((result) => {
                            if (result.value) {
                                var doc = {
                                    source: "local",
                                    expression: selectedText,
                                    translation: res.text,
                                    mediaPath: mediaPath,
                                    currentPos: currentPos,
                                    date: new Date()
                                };
                                db.insert(doc, function (err,
                                    newDoc) {
                                    if (err) throw err;
                                    Swal.fire(
                                        'Saved!',
                                        'the word/expression has been saved',
                                        'success'
                                    )
                                });
                                player.play();
                            } else {
                                player.play();
                            }
                        })
                    })
                }
            });
            // console.log(res.from.language.iso);
        }).catch(err => {
            console.error(err);
        });
    }
}
document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;
document.getElementById('video-area').onclick = function videoClicked() {
    player.togglePause();
}
$(document).keydown(function (evt) {
    if (evt.which == 32) {
        player.togglePause();
    }
    if (evt.which == 37) {
        player.time(player.time() - 5000);
    }
    if (evt.which == 39) {
        player.time(player.time() + 5000);
    }
}).keyup(function (evt) {
    if (evt.which == 17) {
        // ctrlPressed = false;
    }
});