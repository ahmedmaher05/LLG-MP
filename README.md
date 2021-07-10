# LLG-MP 0.2.4

 [![GitHub version](https://img.shields.io/github/v/tag/engMaher/LLG-MP)](https://badge.fury.io/gh/engMaher%2FLLG-MP) [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0) [![Miro](https://img.shields.io/badge/wireframe-miro-yellow.svg)](https://miro.com/app/board/o9J_knGF4P8=/)  [![Github All Releases](https://img.shields.io/github/downloads/engMaher/LLG-MP/total)]()  [![Gitter](https://img.shields.io/gitter/room/engMaher/LLg-MP)](https://gitter.im/LLG-MP/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![GitHub contributors](https://img.shields.io/github/contributors-anon/engMaher/LLG-MP)]() [![GitHub contributors](https://img.shields.io/github/issues-raw/engMaher/LLG-MP)]() [![GitHub contributors](https://img.shields.io/github/issues-closed-raw/engMaher/LLG-MP)]() 


 <!-- [![Build Status](https://travis-ci.org/emk/subtitles-rs.svg?branch=master)](https://travis-ci.org/emk/subtitles-rs) [![Build status](https://ci.appveyor.com/api/projects/status/3hn8cwckcdhpcasm/branch/master?svg=true)](https://ci.appveyor.comproject/emk/subtitles-rs/branch/master) -->

![alt tag](https://i.imgur.com/kDqOC8w.png)

Language Learning Gamification Media Player
* This software is under  AGPLv3 license

______________________________________________________________________________________________________________________________
## what is LLG-MP ?

LLG media player is an <a href="https://electronjs.org/">Electron</a> based open source media player built with <a href="https://github.com/RSATom/WebChimera.js">webchimera.js</a> which provides javscript bindings for <a href="https://www.videolan.org/vlc/libvlc.html">libvlc</a>, it's main purpose is to gamify the language learning process through appending clickable subtitles/lyrics to different types of local/remote media with an onclick instant translation during the media stream flow , it also provides the ability to save new words/expressions along with their translations for future reference ,the clickable subtitles/lyrics functionality is performed through the manipulation of <a href="https://github.com/mozilla/vtt.js?files=1">vtt.js library</a> which is Mozilla's implementation of <a href="https://en.wikipedia.org/wiki/WebVTT">WEBVTT standard</a> <br>
## LLG-MP features

* Media player:
    * Normal media player (much like VLC)
	* Clickable/translatable subtitles & lyrics
	* Fetching subtitles (open subtitles) & lyrics (AZ lyrics) by hash & by name
	* Save translated words/phrases In a separate view & playing media when they occurred
	* Integration with external media websites (Youtube - Yesmovies)
    * Keeping track of users preferences through google analytics for further optimization

	*  Video auto replay
	*  Media playlist
	*  Support for all languages
	*  Play words/phrases sound  (original &translated)
	*  Play forward/backward & volume up/down using keyboard arrow keys
    * Support all subtitles formats (.srt,.vtt,.ass,.ssa,.sub,.sbv,.smi,.lrc,.json)
    * Linux support
<br>

* As a language learning gamification framework:
  * Transforms subtitles/lyrics text into highlightable words and phrases, once highlighted , their google text translation appears with audio sound of both original & translated text.
  * Ability to save new words/phrases along with their translation, local media path/remote media url and time of occurence in the media object & refer to the new words/phrases occurence in the media afterwards.
  * Automatic detection for subtitles/lyrics language with support of translation to all languages (supported by google text/voice translation API)
  * Automaticlly download subtitles file and append it to either local media or remote media from youtube/yesmovies videos (clickable & translatable)
  * Ability to fetch songs lyrics by song name & singer name then show it on either local media or remote media from youtube/yesmovies (clickable & translatable)  

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
   * Windows

        ``` git clone https://github.com/engMaher/LLG-MP.git ```
        ```npm install```
        ```npm run postinstall-windows```
        ```npm run dev-windows```


    <br>

    * Linux:
    ``` git clone https://github.com/engMaher/LLG-MP.git ```
    ```npm install```
    ```npm run postinstall-linux```
    ```npm run dev-linux ```

## [Demo youtube playlist demonstrating how to use LLG media player](https://www.youtube.com/watch?v=irOc8Un86pM&list=PLElD1l78qwgrAVCFHVvIUqh9zhY13JpnK&index=1)

[![Watch the video](https://i.imgur.com/QSuecRg.png)](https://www.youtube.com/watch?v=irOc8Un86pM&list=PLElD1l78qwgrAVCFHVvIUqh9zhY13JpnK&index=1)

## Pictures from the media player 
![image not found](https://i.imgur.com/lbv4xl6.jpg)


## TODO list(features)
- [x] Normal media player (much like VLC)
- [x] Clickable/translatable subtitles & lyrics
- [x] Drag & drop for Media files & subtitles files
- [x] Saving translated words/phrases in a seperate view
- [x] Opening media instance at saved words occurrence
- [x] Integration with external media websites (<a href="https://www.youyube.com">Youtube</a> & <a href="https://yesmovies.ag/">yesmovies</a>)
- [x] Fetching subtitles (open subtitles) & lyrics (AZ lyrics) by hash & by name
- [x] Keeping track of users preferences through google analytics for further optimization
- [x] Adding support for all languages
- [x] Media auto reply
- [x] Media playlist
- [x] Adding play sound option for words (original & translated)
- [x] Adding support for subtitles formats (.srt,.vtt,.ass,.ssa,.sub,.sbv,.smi,.lrc,.json)
- [x] Play forward/backward & volume up/down using keyboard arrow keys
- [x] Linux support
- [ ] Implementation of user authentication system & synchronization between different instances of LLG-MP for group/party learning remotely  
- [ ] Adding a torrent client
- [ ] Adding ANKI interface & user tests from saved words view
- [ ] Adding Books reader capability
- [ ] Chrome extension for using LLG-MP with different media sources online
- [ ] Making the media player cross platform and signing it in both appstore and windows store
## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/engMaher/6a6080973f2c7be7285aeec17bce4c56) for details on our code of conduct, and the process for submitting pull requests to us.

## Acknowledgments

- The open source community for sharing knowledge
- Opensubtitles <a href="http://trac.opensubtitles.org/projects/opensubtitles/wiki/DevReadFirst"> support team </a> for granting LLG-MP an API agent for free
- <a href="https://electronjs.org/community"> Electron </a> and <a href="https://github.com/RSATom/WebChimera.js">Webchimera.js</a> communities for the support
