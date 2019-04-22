global.lyrics = false;
global.lyricsText = "";
global.mediaPath = document.getElementById("player").contentWindow.location.href;
global.currentPos = 0;
var captionsArea = document.querySelector('.captions-area');
var captionsDisplay = document.querySelector('.captions-display');
global.iframeVidElm = "";
global.cues = [];
var regions = [];
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
        if (result.value) {
            loadSubtitles(result.value.path);
            swal.fire("Please open the video in full screen mode")
        }
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
                                    title: 'Use left/right/space keyboard buttons to control the video',
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
    swal.fire('open subtitles integration is coming soon , stay tuned for new releases!!!');
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
var loadSubtitles = function (fpath) {
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
            doCaptions(webvtt);
        } else if (xhr2.readyState != 4 && xhr2.status != 200) {
            swal.fire(
                "couldn't find subtitle file . PS: only .srt and .vtt formats are currently supported "
            )
        }
    };
    xhr2.send();
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

function clearSelection() {
    if (document.getElementById("player").contentWindow.getSelection) {
        document.getElementById("player").contentWindow.getSelection().removeAllRanges();
    } else if (document.getElementById("player").contentWindow.document.selection) {
        document.getElementById("player").contentWindow.document.selection.empty();
    }
}

function getSelectedText() {
    var text = "";
    if (typeof document.getElementById("player").contentWindow.getSelection != "undefined" && document.getElementById("player").contentWindow.getSelection().anchorNode != null && document.getElementById("player").contentWindow
        .getSelection().toString().replace(/\s/g, '')) {
        if (iframeVidElm) {
            currentPos = iframeVidElm.currentTime
            iframeVidElm.pause();
        }
        text = document.getElementById("player").contentWindow.getSelection().toString();
    }
    if (typeof document.getElementById("player").contentWindow.document.selection != "undefined" && document.getElementById("player").contentWindow.document.selection.type == "Text") {
        if (iframeVidElm) {
            currentPos = iframeVidElm.currentTime
            iframeVidElm.pause();
        }
        text = document.getElementById("player").contentWindow.document.selection.createRange().text;
    }
    return text;
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
                                source: "youtube",
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
                                    if (iframeVidElm) iframeVidElm.play();
                                })
                            });
                        } else {
                            if (iframeVidElm) iframeVidElm.play();
                        }
                    })
                })
            });
            // console.log(res.from.language.iso);
        }).catch(err => {});
    }
}

function doSomethingWithSelectedTextLrx() {
    var lang = mainVar.getGlobal('lang').lang;
    if (!lang)
        lang = 'ar';
    var selectedText = getSelectedTextLrx();
    if (selectedText) {
        clearSelectionLrx();
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
                                    source: "youtube",
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
                                        if (iframeVidElm) iframeVidElm.play();
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
                                if (iframeVidElm) iframeVidElm.play();
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
                                    source: "youtube",
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
                                if (iframeVidElm) iframeVidElm.play();
                            } else {
                                if (iframeVidElm) iframeVidElm.play();
                            }
                        })
                    })
                }
            });
        }).catch(err => {});
    }
}

function getSelectedTextLrx() {
    var text = "";
    if (typeof window.getSelection != "undefined" && window.getSelection().anchorNode != null && window
        .getSelection().toString().replace(/\s/g, '')) {
        if (iframeVidElm) {
            currentPos = iframeVidElm.currentTime
            iframeVidElm.pause();
        }
        text = window.getSelection().toString();
    }
    if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        if (iframeVidElm) {
            currentPos = iframeVidElm.currentTime
            iframeVidElm.pause();
        }
        text = document.selection.createRange().text;
    }
    return text;
}

function clearSelectionLrx() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}
if (document.getElementById("player").contentWindow.document.getElementsByTagName('video')[0]) {
    iframeVidElm = document.getElementById("player").contentWindow.document.getElementsByTagName('video')[0]
}
if (document.getElementById("player").contentWindow.document.getElementById("iframe-embed")) {
    if (document.getElementById("player").contentWindow.document.getElementById("iframe-embed").contentWindow.document.getElementsByTagName('video')[0]) {
        iframeVidElm = document.getElementById("player").contentWindow.document.getElementById("iframe-embed").contentWindow.document.getElementsByTagName('video')[0]
    }
}
document.getElementById("player").contentWindow.document.onmouseup = doSomethingWithSelectedText;
$(document).on('mouseup', 'body', function () {
    doSomethingWithSelectedTextLrx();
});
if (iframeVidElm) {
    var video = iframeVidElm
    video.addEventListener('timeupdate', function () {
        var ct = video.currentTime;
        var activeCues = cues.filter(function (cue) {
            return cue.startTime <= ct && cue.endTime >= ct;
        });
        WebVTT.processCues(window, activeCues, captionsDisplay);
    });
    $(document).on('keyup', 'body', function (evt) {
        if (evt.which == 32 && iframeVidElm.paused) {
            iframeVidElm.play();
        } else if (evt.which == 32 && !iframeVidElm.paused) {
            iframeVidElm.pause();
        }
        if (evt.which == 37) {
            iframeVidElm.currentTime = iframeVidElm.currentTime - 5;
        }
        if (evt.which == 39) {
            iframeVidElm.currentTime = iframeVidElm.currentTime + 5;
        }
    }).keyup(function (evt) {
        if (evt.which == 17) {
            // ctrlPressed = false;
        }
    });
}