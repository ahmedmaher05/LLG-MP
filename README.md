# LLG-MP 0.1.0

![alt tag](https://i.imgur.com/kDqOC8w.png)
<br>
<br>
Language Learning Gamification Media Player 

* version [0.1.0] --> [(public releases).(beta versions).(bugfixes patches)]

* this software is under  AGPLv3 license 

______________________________________________________________________________________________________________________________
## what is LLG-MP ? 

LLG media player is an <a href="https://electronjs.org/">Electron</a> based open source media player built with <a href="https://github.com/RSATom/WebChimera.js">webchimera.js</a> which provides javscript bindings for <a href="https://www.videolan.org/vlc/libvlc.html">libvlc</a>  , 
it's main purpose is to gamify the language learning process through appending clickable subtitles/lyrics to different types of local/remote media with an onclick instant translation during the media stream flow , it also provides the ability to save new words/expressions along with their translations for future reference , 
the clickable subtitles/lyrics functionality is performed through the manipulation of <a href="https://github.com/mozilla/vtt.js?files=1">vtt.js library</a> which is Mozilla's implementation of <a href="https://en.wikipedia.org/wiki/WebVTT">WEBVTT standard</a> <br>


## LLG-MP features 
* supports almost all media formats much like VLC media player as both are built on the same media engine (libvlc)  
* supports popular subtitles files such as .vtt & .srt
* transforms subtitles/lyrics words and phrases into clickable strings , once clicked their google translation appears 
* automatic detection for subtitles/lyrics language with support of translation to 10+ different languages 
* integrates with <a href="https://www.youtube.com"> youtube </a> and <a href="https://yesmovies.to/"> yesmovies </a> 
* ability to fetch songs lyrics by song name & singer name then show it on either local media or remote media from youtube/yesmovies (clickable & translatable)
* ability to import subtitles file and append it to either local media or remote media from youtube/yesmovies videos (clickable & translatable)
* ability to save new words/phrases along with their translation , local media path/remote media url and time of occurence in the media file

## what can i do with LLG-MP ?
* you can use it as a regular media player much like vlc 
* browse pc for a subtitles file to be appended to youtube / yesmovies videos 
* search and fetch lyrics while playing youtube songs with controls over the video through keyboard buttons 
* browse PC for subtitles file and append it to local media / youtube video / yesmovies video 
* refer to new words/expressions in savedWords view 

## how to use LLG-MP ? 
* As a regular user : download and install the latest release from this <a href="https://github.com/engMaher/LLG-MP/releases">link</a> which complies with your operation system type/architecture [currently only windows 64-bit is supported] 

* As a contributer :      
``` git clone https://github.com/engMaher/LLG-MP.git ``` <br>
                           ``` npm install ``` <br>
                           ``` npm install -g electron@1.4.3 ``` <br>
                           ``` electron . ```
                        

## pictures from LLG media player 

![alt tag](https://i.imgur.com/S9TQn4w.png)
![alt tag](https://i.imgur.com/ZWXoQ2t.png)
![alt tag](https://i.imgur.com/eKaPn6N.png)
<br>
<br>
![alt tag](https://i.imgur.com/ViVFC77.png)
![alt tag](https://i.imgur.com/4BEHrJW.png)
![alt tag](https://i.imgur.com/XgRXKxt.png)
![alt tag](https://i.imgur.com/bqdMadp.png)

![alt tag](https://i.imgur.com/lswdkXP.png)
![alt tag](https://i.imgur.com/roi4ovt.png)
![alt tag](https://i.imgur.com/dn2xEqS.png)

![alt tag](https://i.imgur.com/JgZYGSl.png)
![alt tag](https://i.imgur.com/7WhhdpD.png)
![alt tag](https://i.imgur.com/DoWVE63.png)
![alt tag](https://i.imgur.com/EGehypU.png)

## TODO list(features) 
- [x] Customization of Mozilla's implementation of WEBVTT standard library for making subtitles clickable
- [x] interception/customization of sent http headers to overcome same origin regulation from youtube 
- [x] Dom tree traversal for detection of yesmovies players nested iframes 
- [x] drag&drop  
- [x] youtube/yesmovies integration 
- [x] using <a href="https://github.com/louischatriot/nedb">NEDB</a> for new words/expressions storage
- [x] integration with <a href="https://www.azlyrics.com/">azlyrics</a> for fetching songs lyrics by song & singer names
- [x] implementing a simple route traffic detector feedback using google analytics to user behavior anonimously for future modifications
- [ ] opensubtitles integration 
- [ ] implementation of user authentication system & synchronization between different instances of LLG-MP for group learning remotely  
- [ ] adding a torrent client 
- [ ] making the media player cross platform and signing it in both appstore and windows store 

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/engMaher/6a6080973f2c7be7285aeec17bce4c56) for details on our code of conduct, and the process for submitting pull requests to us.

## Acknowledgments

- the open source community for sharing knowledge 
- opensubtitles <a href="http://trac.opensubtitles.org/projects/opensubtitles/wiki/DevReadFirst"> support team </a> for granting LLG-MP an API agent for free
- <a href="https://electronjs.org/community"> electron </a> and <a href="https://github.com/RSATom/WebChimera.js">Webchimera.js</a> communities for the support
