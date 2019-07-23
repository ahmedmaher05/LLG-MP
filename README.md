# LLG-MP 0.1.3

![alt tag](https://i.imgur.com/kDqOC8w.png)
<br>
<br>
Language Learning Gamification Media Player 

* Version [0.1.3] --> [(public releases).(beta versions).(bugfixes patches)]

* This software is under  AGPLv3 license 

______________________________________________________________________________________________________________________________
## what is LLG-MP ? 

LLG media player is an <a href="https://electronjs.org/">Electron</a> based open source media player built with <a href="https://github.com/RSATom/WebChimera.js">webchimera.js</a> which provides javscript bindings for <a href="https://www.videolan.org/vlc/libvlc.html">libvlc</a>  , 
it's main purpose is to gamify the language learning process through appending clickable subtitles/lyrics to different types of local/remote media with an onclick instant translation during the media stream flow , it also provides the ability to save new words/expressions along with their translations for future reference , 
the clickable subtitles/lyrics functionality is performed through the manipulation of <a href="https://github.com/mozilla/vtt.js?files=1">vtt.js library</a> which is Mozilla's implementation of <a href="https://en.wikipedia.org/wiki/WebVTT">WEBVTT standard</a> <br>


## LLG-MP features 
* Supports almost all media formats much like VLC media player as both are built on the same media engine (libvlc)  
* Supports popular subtitles files such as .vtt & .srt
* Transforms subtitles/lyrics words and phrases into clickable strings , once clicked their google translation appears 
* Automatic detection for subtitles/lyrics language with support of translation to 10+ different languages 
* Integrates with <a href="https://www.youtube.com"> youtube </a> and <a href="https://yesmovies.to/"> yesmovies </a> 
* Ability to fetch songs lyrics by song name & singer name then show it on either local media or remote media from youtube/yesmovies (clickable & translatable)
* Ability to import subtitles file and append it to either local media or remote media from youtube/yesmovies videos (clickable & translatable)
* Ability to save new words/phrases along with their translation , local media path/remote media url and time of occurence in the media file

## what can i do with LLG-MP ?
* You can use it as a regular media player much like vlc 
* Browse pc for a subtitles file to be appended to youtube / yesmovies videos 
* Search and fetch lyrics while playing youtube songs with controls over the video through keyboard buttons 
* Browse PC for subtitles file and append it to local media / youtube video / yesmovies video 
* Refer to new words/expressions in savedWords view 
* Download subtitles files (by either media hash or specifying movie/series name) and append them to either local media file or youtube/yesmovies videos . 

## How to use LLG-MP ? 
* As a regular user : download and install the latest release from this <a href="https://github.com/engMaher/LLG-MP/releases">link</a> which complies with your operation system type/architecture [currently only windows 64-bit is supported] 

* As a contributer :      
``` git clone https://github.com/engMaher/LLG-MP.git ``` <br>
                           ``` npm install ``` <br>
                           ``` npm install -g electron@1.4.3 ``` <br>
                           ``` electron . ```
                        

## [Demo youtube playlist demonstrating how to use LLG media player](https://www.youtube.com/watch?v=irOc8Un86pM&list=PLElD1l78qwgrAVCFHVvIUqh9zhY13JpnK&index=1)

[![Watch the video](https://i.imgur.com/QSuecRg.png)](https://www.youtube.com/watch?v=irOc8Un86pM&list=PLElD1l78qwgrAVCFHVvIUqh9zhY13JpnK&index=1)

## Pictures from the media player 
![image not found](https://i.imgur.com/lbv4xl6.jpg)

## Users anonymous heat map generated via google analytics 
![image not found](https://i.imgur.com/ADLOcOQ.png)



## TODO list(features) 
- [x] Customization of Mozilla's implementation of WEBVTT standard library for making subtitles clickable
- [x] Interception/customization of sent http headers to overcome same origin regulation from youtube 
- [x] Dom tree traversal for detection of yesmovies players nested iframes 
- [x] Drag&drop media and subtitle files
- [x] Youtube/yesmovies integration 
- [x] Using <a href="https://github.com/louischatriot/nedb">NEDB</a> for new words/expressions storage
- [x] Integration with <a href="https://www.azlyrics.com/">azlyrics</a> for fetching songs lyrics by song & singer names
- [x] Implementing a simple route traffic detector feedback using google analytics to user behavior anonimously for future modifications
- [x] Opensubtitles integration 
- [x] opening media at saved words occurrence 
- [ ] Implementation of user authentication system & synchronization between different instances of LLG-MP for group learning remotely  
- [ ] Adding a torrent client 
- [ ] Making the media player cross platform and signing it in both appstore and windows store 

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/engMaher/6a6080973f2c7be7285aeec17bce4c56) for details on our code of conduct, and the process for submitting pull requests to us.

## Acknowledgments

- The open source community for sharing knowledge 
- Opensubtitles <a href="http://trac.opensubtitles.org/projects/opensubtitles/wiki/DevReadFirst"> support team </a> for granting LLG-MP an API agent for free
- <a href="https://electronjs.org/community"> Electron </a> and <a href="https://github.com/RSATom/WebChimera.js">Webchimera.js</a> communities for the support
