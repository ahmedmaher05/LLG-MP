// const { autoUpdater } = require('electron-updater');
var path = require('path');
const { session } = require('electron');
// Query all cookies associated with a specific url.

const { download } = require('electron-dl');
if ((process.platform == 'win32' || process.platform === 'darwin') && process.env.ELECTRON_ENV != 'development') {
    process.env.VLC_PLUGIN_PATH = path.join(
        path.basename(__dirname),
        'app.asar.unpacked',
        'node_modules',
        'wcjs-prebuilt',
        'bin',
        'plugins'
    );
}

if (
    (process.platform == 'win32' || process.platform == 'darwin') &&
    process.mainModule.filename.indexOf('app.asar') === -1
) {
    process.env.VLC_PLUGIN_PATH = path.join(
        __dirname,
        './node_modules/wcjs-prebuilt/bin/plugins'
    );
}

if (process.platform == 'win32' || process.platform == 'darwin')
    process.env['VLC_PLUGIN_PATH'] = require('path').join(
        __dirname,
        'node_modules/webchimera.js/plugins'
    );

if (process.argv.length >= 2) {
    global.filePath = process.argv[1];
}

const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
var ua = require('universal-analytics');
const uuid = require('uuid/v4');
const log = require('electron-log');
const electronShell = require('electron').shell;
const { JSONStorage } = require('node-localstorage');
var Datastore = require('nedb');
var db = new Datastore({
    filename: path.join(
        path.basename(__dirname),
        'newVocab'
    ),
    autoload: true,
});
/* autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = 'info';
    log.info('App starting...'); */
const nodeStorage = new JSONStorage(app.getPath('userData'));
const userId = nodeStorage.getItem('userid') || uuid();
nodeStorage.setItem('userid', userId);
global.visitor = ua('UA-138310097-1', userId);
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const ipc = require('electron').ipcMain;
var mainWindow = null;
global.lang = {
    lang: 'ar',
};
global.dirName = {
    dirname: path.join(
        path.basename(__dirname),
        'newVocab'
    ),
};

function applyMagick() {
    var rawFile = new XMLHttpRequest();
    rawFile.open(
        'GET',
        'file://' + __dirname + '/scripts/ExtRenderer.js',
        false
    );
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                mainWindow.webContents.executeJavaScript(allText);
            }
        }
    };
    rawFile.send(null);
}

function setMenu(window, menu) {
    if (process.platform === "darwin") {
        Menu.setApplicationMenu(menu)
    } else {
        window.setMenu(menu);
    }    
}

function buildMenuFromTemplate(menu) {
    // Adds View menu to menu bar if not in production mode. This enables usage of developer tools during development.
    if (process.env.ELECTRON_ENV !== 'production') {
        menu.push({role: 'viewMenu', label: "Developer"})
    }
    return Menu.buildFromTemplate(menu)
}


var mediaPlayerMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                submenu: [
                    {
                        label: 'From PC',
                        submenu: [
                            {
                                label: 'Media file',
                                click() {
                                    mainWindow.webContents.send(
                                        'openmedia',
                                        'openMedia'
                                    );
                                },
                            },
                            {
                                label: 'Subtitles file',
                                click() {
                                    mainWindow.webContents.send(
                                        'opensub',
                                        'openSub'
                                    );
                                },
                            },
                        ],
                    },
                    {
                        label: 'External Website',
                        submenu: [
                            {
                                label: 'Youtube',
                                click() {
                                    setMenu(mainWindow, menuExtYoutube);
                                    console.log('entered');
                                    mainWindow.loadURL(
                                        'file://' +
                                            __dirname +
                                            '/embeddedYoutube.html'
                                    );
                                },
                            },
                            {
                                label: 'Yesmovies',
                                click() {
                                    setMenu(mainWindow, menuExtYesmovies);
                                    mainWindow.loadURL(
                                        'file://' +
                                            __dirname +
                                            '/embeddedYesmovies.html'
                                    );
                                },
                            },
                        ],
                    },
                    {
                        label: 'Saved Words',
                        click() {
                            setMenu(mainWindow, menuSavedExp);
                            mainWindow.setSize(1000, 800);
                            mainWindow.loadURL(
                                'file://' + __dirname + '/newExp.html'
                            );
                            mainWindow.webContents.send('newwords', 'newwords');
                        },
                    },
                ],
            },
            {
                label: 'Quit',
                click() {
                    app.quit();
                },
            },
        ],
    },
    {
        label: 'Translate to',
        submenu: [
            {
                label: 'Afrikaans',
                click() {
                    global.lang = {
                        lang: 'AF',
                    };
                },
            },
            {
                label: 'Albanian',
                click() {
                    global.lang = {
                        lang: 'SQ',
                    };
                },
            },
            {
                label: 'Arabic',
                click() {
                    global.lang = {
                        lang: 'AR',
                    };
                },
            },
            {
                label: 'Armenian',
                click() {
                    global.lang = {
                        lang: 'HY',
                    };
                },
            },

            {
                label: 'Basque',
                click() {
                    global.lang = {
                        lang: 'EU',
                    };
                },
            },
            {
                label: 'Bengali',
                click() {
                    global.lang = {
                        lang: 'BN',
                    };
                },
            },
            {
                label: 'Bulgarian',
                click() {
                    global.lang = {
                        lang: 'BG',
                    };
                },
            },
            {
                label: 'Catalan',
                click() {
                    global.lang = {
                        lang: 'CA',
                    };
                },
            },
            {
                label: 'Cambodian',
                click() {
                    global.lang = {
                        lang: 'KM',
                    };
                },
            },
            {
                label: 'Chinese (Mandarin)',
                click() {
                    global.lang = {
                        lang: 'ZH',
                    };
                },
            },
            {
                label: 'Croatian',
                click() {
                    global.lang = {
                        lang: 'HR',
                    };
                },
            },
            {
                label: 'Czech',
                click() {
                    global.lang = {
                        lang: 'CS',
                    };
                },
            },
            {
                label: 'Danish',
                click() {
                    global.lang = {
                        lang: 'DA',
                    };
                },
            },
            {
                label: 'Dutch',
                click() {
                    global.lang = {
                        lang: 'NL',
                    };
                },
            },
            {
                label: 'English',
                click() {
                    global.lang = {
                        lang: 'EN',
                    };
                },
            },
            {
                label: 'Estonian',
                click() {
                    global.lang = {
                        lang: 'ET',
                    };
                },
            },
            {
                label: 'Fiji',
                click() {
                    global.lang = {
                        lang: 'FJ',
                    };
                },
            },
            {
                label: 'Finnish',
                click() {
                    global.lang = {
                        lang: 'FI',
                    };
                },
            },
            {
                label: 'French',
                click() {
                    global.lang = {
                        lang: 'FR',
                    };
                },
            },
            {
                label: 'Georgian',
                click() {
                    global.lang = {
                        lang: 'KA',
                    };
                },
            },
            {
                label: 'German',
                click() {
                    global.lang = {
                        lang: 'DE',
                    };
                },
            },
            {
                label: 'Greek',
                click() {
                    global.lang = {
                        lang: 'EL',
                    };
                },
            },
            {
                label: 'Gujarati',
                click() {
                    global.lang = {
                        lang: 'GU',
                    };
                },
            },
            {
                label: 'Hebrew',
                click() {
                    global.lang = {
                        lang: 'HE',
                    };
                },
            },
            {
                label: 'Hindi',
                click() {
                    global.lang = {
                        lang: 'HI',
                    };
                },
            },
            {
                label: 'Hungarian',
                click() {
                    global.lang = {
                        lang: 'HU',
                    };
                },
            },
            {
                label: 'Icelandic',
                click() {
                    global.lang = {
                        lang: 'IS',
                    };
                },
            },
            {
                label: 'Indonesian',
                click() {
                    global.lang = {
                        lang: 'ID',
                    };
                },
            },
            {
                label: 'Irish',
                click() {
                    global.lang = {
                        lang: 'GA',
                    };
                },
            },
            {
                label: 'Italian',
                click() {
                    global.lang = {
                        lang: 'IT',
                    };
                },
            },
            {
                label: 'Japanese',
                click() {
                    global.lang = {
                        lang: 'JA',
                    };
                },
            },
            {
                label: 'Javanese',
                click() {
                    global.lang = {
                        lang: 'JW',
                    };
                },
            },
            {
                label: 'Korean',
                click() {
                    global.lang = {
                        lang: 'KO',
                    };
                },
            },
            {
                label: 'Latin',
                click() {
                    global.lang = {
                        lang: 'LA',
                    };
                },
            },
            {
                label: 'Latvian',
                click() {
                    global.lang = {
                        lang: 'LV',
                    };
                },
            },
            {
                label: 'Lithuanian',
                click() {
                    global.lang = {
                        lang: 'LT',
                    };
                },
            },
            {
                label: 'Macedonian',
                click() {
                    global.lang = {
                        lang: 'MK',
                    };
                },
            },
            {
                label: 'Malay',
                click() {
                    global.lang = {
                        lang: 'MS',
                    };
                },
            },
            {
                label: 'Malayalam',
                click() {
                    global.lang = {
                        lang: 'ML',
                    };
                },
            },
            {
                label: 'Maltese',
                click() {
                    global.lang = {
                        lang: 'MT',
                    };
                },
            },
            {
                label: 'Maori',
                click() {
                    global.lang = {
                        lang: 'MI',
                    };
                },
            },
            {
                label: 'Marathi',
                click() {
                    global.lang = {
                        lang: 'MR',
                    };
                },
            },
            {
                label: 'Mongolian',
                click() {
                    global.lang = {
                        lang: 'MN',
                    };
                },
            },
            {
                label: 'Nepali',
                click() {
                    global.lang = {
                        lang: 'NE',
                    };
                },
            },
            {
                label: 'Norwegian',
                click() {
                    global.lang = {
                        lang: 'NO',
                    };
                },
            },
            {
                label: 'Persian',
                click() {
                    global.lang = {
                        lang: 'FA',
                    };
                },
            },
            {
                label: 'Polish',
                click() {
                    global.lang = {
                        lang: 'PL',
                    };
                },
            },
            {
                label: 'Portuguese',
                click() {
                    global.lang = {
                        lang: 'PT',
                    };
                },
            },
            {
                label: 'Punjabi',
                click() {
                    global.lang = {
                        lang: 'PA',
                    };
                },
            },
            {
                label: 'Quechua',
                click() {
                    global.lang = {
                        lang: 'QU',
                    };
                },
            },
            {
                label: 'Romanian',
                click() {
                    global.lang = {
                        lang: 'RO',
                    };
                },
            },
            {
                label: 'Russian',
                click() {
                    global.lang = {
                        lang: 'RU',
                    };
                },
            },
            {
                label: 'Samoan',
                click() {
                    global.lang = {
                        lang: 'SM',
                    };
                },
            },
            {
                label: 'Serbian',
                click() {
                    global.lang = {
                        lang: 'SR',
                    };
                },
            },
            {
                label: 'Slovak',
                click() {
                    global.lang = {
                        lang: 'SK',
                    };
                },
            },
            {
                label: 'Slovenian',
                click() {
                    global.lang = {
                        lang: 'SL',
                    };
                },
            },
            {
                label: 'Spanish',
                click() {
                    global.lang = {
                        lang: 'ES',
                    };
                },
            },
            {
                label: 'Swahili',
                click() {
                    global.lang = {
                        lang: 'SW',
                    };
                },
            },
            {
                label: 'Swedish',
                click() {
                    global.lang = {
                        lang: 'SV',
                    };
                },
            },
            {
                label: 'Tamil',
                click() {
                    global.lang = {
                        lang: 'TA',
                    };
                },
            },
            {
                label: 'Tatar',
                click() {
                    global.lang = {
                        lang: 'TT',
                    };
                },
            },
            {
                label: 'Telugu',
                click() {
                    global.lang = {
                        lang: 'TE',
                    };
                },
            },
            {
                label: 'Thai',
                click() {
                    global.lang = {
                        lang: 'TH',
                    };
                },
            },
            {
                label: 'Tibetan',
                click() {
                    global.lang = {
                        lang: 'BO',
                    };
                },
            },
            {
                label: 'Tonga',
                click() {
                    global.lang = {
                        lang: 'TO',
                    };
                },
            },
            {
                label: 'Turkish',
                click() {
                    global.lang = {
                        lang: 'TR',
                    };
                },
            },
            {
                label: 'Ukrainian',
                click() {
                    global.lang = {
                        lang: 'UK',
                    };
                },
            },
            {
                label: 'Urdu',
                click() {
                    global.lang = {
                        lang: 'UR',
                    };
                },
            },
            {
                label: 'Uzbek',
                click() {
                    global.lang = {
                        lang: 'UZ',
                    };
                },
            },
            {
                label: 'Vietnamese',
                click() {
                    global.lang = {
                        lang: 'VI',
                    };
                },
            },
            {
                label: 'Welsh',
                click() {
                    global.lang = {
                        lang: 'CY',
                    };
                },
            },
            {
                label: 'Xhosa',
                click() {
                    global.lang = {
                        lang: 'XH',
                    };
                },
            },
        ],
    },
    {
        label: 'Search',
        submenu: [
            {
                label: 'Lyrics',
                click() {
                    mainWindow.webContents.send('lyrics', 'lyrics');
                },
            },
            {
                label: 'Subtitles',
                click() {
                    mainWindow.webContents.send(
                        'movies/series',
                        'movies/series'
                    );
                },
            },
        ],
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click() {
                    mainWindow.webContents.send('about', 'about');
                },
            },
            {
                label: 'Check for new releases',
                click() {
                    electronShell.openExternal(
                        'https://github.com/engMaher/LLG-MP/releases'
                    );
                },
            },
        ],
    },
];
var ExtWebsiteMenu_youtube = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                submenu: [
                    {
                        label: 'From PC',
                        submenu: [
                            {
                                label: 'Subtitles File',
                                click() {
                                    applyMagick();
                                    mainWindow.webContents.send(
                                        'opensub',
                                        'openSub'
                                    );
                                },
                            },
                        ],
                    },
                    {
                        label: 'External Website',
                        submenu: [
                            {
                                label: 'Yesmovies',
                                click() {
                                    setMenu(mainWindow, menuExtYesmovies);
                                    mainWindow.loadURL(
                                        'file://' +
                                            __dirname +
                                            '/embeddedYesmovies.html'
                                    );
                                },
                            },
                        ],
                    },
                    {
                        label: 'LLG-MP',
                        click() {
                            setMenu(mainWindow, menuMP);
                            mainWindow.loadURL(
                                'file://' + __dirname + '/MediaPl.html'
                            );
                        },
                    },
                    {
                        label: 'Saved Words',
                        click() {
                            setMenu(mainWindow, menuSavedExp);
                            mainWindow.loadURL(
                                'file://' + __dirname + '/newExp.html'
                            );
                            mainWindow.webContents.send('newwords', 'newwords');
                        },
                    },
                ],
            },
            {
                label: 'Quit',
                click() {
                    app.quit();
                },
            },
        ],
    },
    {
        label: 'Translate to',
        submenu: [
            {
                label: 'Afrikaans',
                click() {
                    global.lang = {
                        lang: 'AF',
                    };
                },
            },
            {
                label: 'Albanian',
                click() {
                    global.lang = {
                        lang: 'SQ',
                    };
                },
            },
            {
                label: 'Arabic',
                click() {
                    global.lang = {
                        lang: 'AR',
                    };
                },
            },
            {
                label: 'Armenian',
                click() {
                    global.lang = {
                        lang: 'HY',
                    };
                },
            },

            {
                label: 'Basque',
                click() {
                    global.lang = {
                        lang: 'EU',
                    };
                },
            },
            {
                label: 'Bengali',
                click() {
                    global.lang = {
                        lang: 'BN',
                    };
                },
            },
            {
                label: 'Bulgarian',
                click() {
                    global.lang = {
                        lang: 'BG',
                    };
                },
            },
            {
                label: 'Catalan',
                click() {
                    global.lang = {
                        lang: 'CA',
                    };
                },
            },
            {
                label: 'Cambodian',
                click() {
                    global.lang = {
                        lang: 'KM',
                    };
                },
            },
            {
                label: 'Chinese (Mandarin)',
                click() {
                    global.lang = {
                        lang: 'ZH',
                    };
                },
            },
            {
                label: 'Croatian',
                click() {
                    global.lang = {
                        lang: 'HR',
                    };
                },
            },
            {
                label: 'Czech',
                click() {
                    global.lang = {
                        lang: 'CS',
                    };
                },
            },
            {
                label: 'Danish',
                click() {
                    global.lang = {
                        lang: 'DA',
                    };
                },
            },
            {
                label: 'Dutch',
                click() {
                    global.lang = {
                        lang: 'NL',
                    };
                },
            },
            {
                label: 'English',
                click() {
                    global.lang = {
                        lang: 'EN',
                    };
                },
            },
            {
                label: 'Estonian',
                click() {
                    global.lang = {
                        lang: 'ET',
                    };
                },
            },
            {
                label: 'Fiji',
                click() {
                    global.lang = {
                        lang: 'FJ',
                    };
                },
            },
            {
                label: 'Finnish',
                click() {
                    global.lang = {
                        lang: 'FI',
                    };
                },
            },
            {
                label: 'French',
                click() {
                    global.lang = {
                        lang: 'FR',
                    };
                },
            },
            {
                label: 'Georgian',
                click() {
                    global.lang = {
                        lang: 'KA',
                    };
                },
            },
            {
                label: 'German',
                click() {
                    global.lang = {
                        lang: 'DE',
                    };
                },
            },
            {
                label: 'Greek',
                click() {
                    global.lang = {
                        lang: 'EL',
                    };
                },
            },
            {
                label: 'Gujarati',
                click() {
                    global.lang = {
                        lang: 'GU',
                    };
                },
            },
            {
                label: 'Hebrew',
                click() {
                    global.lang = {
                        lang: 'HE',
                    };
                },
            },
            {
                label: 'Hindi',
                click() {
                    global.lang = {
                        lang: 'HI',
                    };
                },
            },
            {
                label: 'Hungarian',
                click() {
                    global.lang = {
                        lang: 'HU',
                    };
                },
            },
            {
                label: 'Icelandic',
                click() {
                    global.lang = {
                        lang: 'IS',
                    };
                },
            },
            {
                label: 'Indonesian',
                click() {
                    global.lang = {
                        lang: 'ID',
                    };
                },
            },
            {
                label: 'Irish',
                click() {
                    global.lang = {
                        lang: 'GA',
                    };
                },
            },
            {
                label: 'Italian',
                click() {
                    global.lang = {
                        lang: 'IT',
                    };
                },
            },
            {
                label: 'Japanese',
                click() {
                    global.lang = {
                        lang: 'JA',
                    };
                },
            },
            {
                label: 'Javanese',
                click() {
                    global.lang = {
                        lang: 'JW',
                    };
                },
            },
            {
                label: 'Korean',
                click() {
                    global.lang = {
                        lang: 'KO',
                    };
                },
            },
            {
                label: 'Latin',
                click() {
                    global.lang = {
                        lang: 'LA',
                    };
                },
            },
            {
                label: 'Latvian',
                click() {
                    global.lang = {
                        lang: 'LV',
                    };
                },
            },
            {
                label: 'Lithuanian',
                click() {
                    global.lang = {
                        lang: 'LT',
                    };
                },
            },
            {
                label: 'Macedonian',
                click() {
                    global.lang = {
                        lang: 'MK',
                    };
                },
            },
            {
                label: 'Malay',
                click() {
                    global.lang = {
                        lang: 'MS',
                    };
                },
            },
            {
                label: 'Malayalam',
                click() {
                    global.lang = {
                        lang: 'ML',
                    };
                },
            },
            {
                label: 'Maltese',
                click() {
                    global.lang = {
                        lang: 'MT',
                    };
                },
            },
            {
                label: 'Maori',
                click() {
                    global.lang = {
                        lang: 'MI',
                    };
                },
            },
            {
                label: 'Marathi',
                click() {
                    global.lang = {
                        lang: 'MR',
                    };
                },
            },
            {
                label: 'Mongolian',
                click() {
                    global.lang = {
                        lang: 'MN',
                    };
                },
            },
            {
                label: 'Nepali',
                click() {
                    global.lang = {
                        lang: 'NE',
                    };
                },
            },
            {
                label: 'Norwegian',
                click() {
                    global.lang = {
                        lang: 'NO',
                    };
                },
            },
            {
                label: 'Persian',
                click() {
                    global.lang = {
                        lang: 'FA',
                    };
                },
            },
            {
                label: 'Polish',
                click() {
                    global.lang = {
                        lang: 'PL',
                    };
                },
            },
            {
                label: 'Portuguese',
                click() {
                    global.lang = {
                        lang: 'PT',
                    };
                },
            },
            {
                label: 'Punjabi',
                click() {
                    global.lang = {
                        lang: 'PA',
                    };
                },
            },
            {
                label: 'Quechua',
                click() {
                    global.lang = {
                        lang: 'QU',
                    };
                },
            },
            {
                label: 'Romanian',
                click() {
                    global.lang = {
                        lang: 'RO',
                    };
                },
            },
            {
                label: 'Russian',
                click() {
                    global.lang = {
                        lang: 'RU',
                    };
                },
            },
            {
                label: 'Samoan',
                click() {
                    global.lang = {
                        lang: 'SM',
                    };
                },
            },
            {
                label: 'Serbian',
                click() {
                    global.lang = {
                        lang: 'SR',
                    };
                },
            },
            {
                label: 'Slovak',
                click() {
                    global.lang = {
                        lang: 'SK',
                    };
                },
            },
            {
                label: 'Slovenian',
                click() {
                    global.lang = {
                        lang: 'SL',
                    };
                },
            },
            {
                label: 'Spanish',
                click() {
                    global.lang = {
                        lang: 'ES',
                    };
                },
            },
            {
                label: 'Swahili',
                click() {
                    global.lang = {
                        lang: 'SW',
                    };
                },
            },
            {
                label: 'Swedish',
                click() {
                    global.lang = {
                        lang: 'SV',
                    };
                },
            },
            {
                label: 'Tamil',
                click() {
                    global.lang = {
                        lang: 'TA',
                    };
                },
            },
            {
                label: 'Tatar',
                click() {
                    global.lang = {
                        lang: 'TT',
                    };
                },
            },
            {
                label: 'Telugu',
                click() {
                    global.lang = {
                        lang: 'TE',
                    };
                },
            },
            {
                label: 'Thai',
                click() {
                    global.lang = {
                        lang: 'TH',
                    };
                },
            },
            {
                label: 'Tibetan',
                click() {
                    global.lang = {
                        lang: 'BO',
                    };
                },
            },
            {
                label: 'Tonga',
                click() {
                    global.lang = {
                        lang: 'TO',
                    };
                },
            },
            {
                label: 'Turkish',
                click() {
                    global.lang = {
                        lang: 'TR',
                    };
                },
            },
            {
                label: 'Ukrainian',
                click() {
                    global.lang = {
                        lang: 'UK',
                    };
                },
            },
            {
                label: 'Urdu',
                click() {
                    global.lang = {
                        lang: 'UR',
                    };
                },
            },
            {
                label: 'Uzbek',
                click() {
                    global.lang = {
                        lang: 'UZ',
                    };
                },
            },
            {
                label: 'Vietnamese',
                click() {
                    global.lang = {
                        lang: 'VI',
                    };
                },
            },
            {
                label: 'Welsh',
                click() {
                    global.lang = {
                        lang: 'CY',
                    };
                },
            },
            {
                label: 'Xhosa',
                click() {
                    global.lang = {
                        lang: 'XH',
                    };
                },
            },
        ],
    },
    {
        label: 'Search',
        submenu: [
            {
                label: 'Lyrics',
                click() {
                    applyMagick();
                    mainWindow.webContents.send('lyrics', 'lyrics');
                },
            },
            {
                label: 'Subtitles',
                click() {
                    applyMagick();
                    mainWindow.webContents.send(
                        'movies/series',
                        'movies/series'
                    );
                },
            },
        ],
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click() {
                    mainWindow.webContents.send('about', 'about');
                },
            },
            {
                label: 'Check for new releases',
                click() {
                    electronShell.openExternal(
                        'https://github.com/engMaher/LLG-MP/releases'
                    );
                },
            },
        ],
    },
];
var ExtWebsiteMenu_yesMovies = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                submenu: [
                    {
                        label: 'From PC',
                        submenu: [
                            {
                                label: 'Subtitles File',
                                click() {
                                    applyMagick();
                                    mainWindow.webContents.send(
                                        'opensub',
                                        'openSub'
                                    );
                                },
                            },
                        ],
                    },
                    {
                        label: 'External Website',
                        submenu: [
                            {
                                label: 'Youtube',
                                click() {
                                    setMenu(mainWindow, menuExtYoutube);
                                    mainWindow.loadURL(
                                        'file://' +
                                            __dirname +
                                            '/embeddedYoutube.html'
                                    );
                                },
                            },
                        ],
                    },
                    {
                        label: 'LLG-MP',
                        click() {
                            setMenu(mainWindow, menuMP);
                            mainWindow.loadURL(
                                'file://' + __dirname + '/MediaPl.html'
                            );
                        },
                    },
                    {
                        label: 'Saved Words',
                        click() {
                            setMenu(mainWindow, menuSavedExp);
                            mainWindow.loadURL(
                                'file://' + __dirname + '/newExp.html'
                            );
                            mainWindow.webContents.send('newwords', 'newwords');
                        },
                    },
                ],
            },
            {
                label: 'Quit',
                click() {
                    app.quit();
                },
            },
        ],
    },
    {
        label: 'Translate to',
        submenu: [
            {
                label: 'Afrikaans',
                click() {
                    global.lang = {
                        lang: 'AF',
                    };
                },
            },
            {
                label: 'Albanian',
                click() {
                    global.lang = {
                        lang: 'SQ',
                    };
                },
            },
            {
                label: 'Arabic',
                click() {
                    global.lang = {
                        lang: 'AR',
                    };
                },
            },
            {
                label: 'Armenian',
                click() {
                    global.lang = {
                        lang: 'HY',
                    };
                },
            },

            {
                label: 'Basque',
                click() {
                    global.lang = {
                        lang: 'EU',
                    };
                },
            },
            {
                label: 'Bengali',
                click() {
                    global.lang = {
                        lang: 'BN',
                    };
                },
            },
            {
                label: 'Bulgarian',
                click() {
                    global.lang = {
                        lang: 'BG',
                    };
                },
            },
            {
                label: 'Catalan',
                click() {
                    global.lang = {
                        lang: 'CA',
                    };
                },
            },
            {
                label: 'Cambodian',
                click() {
                    global.lang = {
                        lang: 'KM',
                    };
                },
            },
            {
                label: 'Chinese (Mandarin)',
                click() {
                    global.lang = {
                        lang: 'ZH',
                    };
                },
            },
            {
                label: 'Croatian',
                click() {
                    global.lang = {
                        lang: 'HR',
                    };
                },
            },
            {
                label: 'Czech',
                click() {
                    global.lang = {
                        lang: 'CS',
                    };
                },
            },
            {
                label: 'Danish',
                click() {
                    global.lang = {
                        lang: 'DA',
                    };
                },
            },
            {
                label: 'Dutch',
                click() {
                    global.lang = {
                        lang: 'NL',
                    };
                },
            },
            {
                label: 'English',
                click() {
                    global.lang = {
                        lang: 'EN',
                    };
                },
            },
            {
                label: 'Estonian',
                click() {
                    global.lang = {
                        lang: 'ET',
                    };
                },
            },
            {
                label: 'Fiji',
                click() {
                    global.lang = {
                        lang: 'FJ',
                    };
                },
            },
            {
                label: 'Finnish',
                click() {
                    global.lang = {
                        lang: 'FI',
                    };
                },
            },
            {
                label: 'French',
                click() {
                    global.lang = {
                        lang: 'FR',
                    };
                },
            },
            {
                label: 'Georgian',
                click() {
                    global.lang = {
                        lang: 'KA',
                    };
                },
            },
            {
                label: 'German',
                click() {
                    global.lang = {
                        lang: 'DE',
                    };
                },
            },
            {
                label: 'Greek',
                click() {
                    global.lang = {
                        lang: 'EL',
                    };
                },
            },
            {
                label: 'Gujarati',
                click() {
                    global.lang = {
                        lang: 'GU',
                    };
                },
            },
            {
                label: 'Hebrew',
                click() {
                    global.lang = {
                        lang: 'HE',
                    };
                },
            },
            {
                label: 'Hindi',
                click() {
                    global.lang = {
                        lang: 'HI',
                    };
                },
            },
            {
                label: 'Hungarian',
                click() {
                    global.lang = {
                        lang: 'HU',
                    };
                },
            },
            {
                label: 'Icelandic',
                click() {
                    global.lang = {
                        lang: 'IS',
                    };
                },
            },
            {
                label: 'Indonesian',
                click() {
                    global.lang = {
                        lang: 'ID',
                    };
                },
            },
            {
                label: 'Irish',
                click() {
                    global.lang = {
                        lang: 'GA',
                    };
                },
            },
            {
                label: 'Italian',
                click() {
                    global.lang = {
                        lang: 'IT',
                    };
                },
            },
            {
                label: 'Japanese',
                click() {
                    global.lang = {
                        lang: 'JA',
                    };
                },
            },
            {
                label: 'Javanese',
                click() {
                    global.lang = {
                        lang: 'JW',
                    };
                },
            },
            {
                label: 'Korean',
                click() {
                    global.lang = {
                        lang: 'KO',
                    };
                },
            },
            {
                label: 'Latin',
                click() {
                    global.lang = {
                        lang: 'LA',
                    };
                },
            },
            {
                label: 'Latvian',
                click() {
                    global.lang = {
                        lang: 'LV',
                    };
                },
            },
            {
                label: 'Lithuanian',
                click() {
                    global.lang = {
                        lang: 'LT',
                    };
                },
            },
            {
                label: 'Macedonian',
                click() {
                    global.lang = {
                        lang: 'MK',
                    };
                },
            },
            {
                label: 'Malay',
                click() {
                    global.lang = {
                        lang: 'MS',
                    };
                },
            },
            {
                label: 'Malayalam',
                click() {
                    global.lang = {
                        lang: 'ML',
                    };
                },
            },
            {
                label: 'Maltese',
                click() {
                    global.lang = {
                        lang: 'MT',
                    };
                },
            },
            {
                label: 'Maori',
                click() {
                    global.lang = {
                        lang: 'MI',
                    };
                },
            },
            {
                label: 'Marathi',
                click() {
                    global.lang = {
                        lang: 'MR',
                    };
                },
            },
            {
                label: 'Mongolian',
                click() {
                    global.lang = {
                        lang: 'MN',
                    };
                },
            },
            {
                label: 'Nepali',
                click() {
                    global.lang = {
                        lang: 'NE',
                    };
                },
            },
            {
                label: 'Norwegian',
                click() {
                    global.lang = {
                        lang: 'NO',
                    };
                },
            },
            {
                label: 'Persian',
                click() {
                    global.lang = {
                        lang: 'FA',
                    };
                },
            },
            {
                label: 'Polish',
                click() {
                    global.lang = {
                        lang: 'PL',
                    };
                },
            },
            {
                label: 'Portuguese',
                click() {
                    global.lang = {
                        lang: 'PT',
                    };
                },
            },
            {
                label: 'Punjabi',
                click() {
                    global.lang = {
                        lang: 'PA',
                    };
                },
            },
            {
                label: 'Quechua',
                click() {
                    global.lang = {
                        lang: 'QU',
                    };
                },
            },
            {
                label: 'Romanian',
                click() {
                    global.lang = {
                        lang: 'RO',
                    };
                },
            },
            {
                label: 'Russian',
                click() {
                    global.lang = {
                        lang: 'RU',
                    };
                },
            },
            {
                label: 'Samoan',
                click() {
                    global.lang = {
                        lang: 'SM',
                    };
                },
            },
            {
                label: 'Serbian',
                click() {
                    global.lang = {
                        lang: 'SR',
                    };
                },
            },
            {
                label: 'Slovak',
                click() {
                    global.lang = {
                        lang: 'SK',
                    };
                },
            },
            {
                label: 'Slovenian',
                click() {
                    global.lang = {
                        lang: 'SL',
                    };
                },
            },
            {
                label: 'Spanish',
                click() {
                    global.lang = {
                        lang: 'ES',
                    };
                },
            },
            {
                label: 'Swahili',
                click() {
                    global.lang = {
                        lang: 'SW',
                    };
                },
            },
            {
                label: 'Swedish',
                click() {
                    global.lang = {
                        lang: 'SV',
                    };
                },
            },
            {
                label: 'Tamil',
                click() {
                    global.lang = {
                        lang: 'TA',
                    };
                },
            },
            {
                label: 'Tatar',
                click() {
                    global.lang = {
                        lang: 'TT',
                    };
                },
            },
            {
                label: 'Telugu',
                click() {
                    global.lang = {
                        lang: 'TE',
                    };
                },
            },
            {
                label: 'Thai',
                click() {
                    global.lang = {
                        lang: 'TH',
                    };
                },
            },
            {
                label: 'Tibetan',
                click() {
                    global.lang = {
                        lang: 'BO',
                    };
                },
            },
            {
                label: 'Tonga',
                click() {
                    global.lang = {
                        lang: 'TO',
                    };
                },
            },
            {
                label: 'Turkish',
                click() {
                    global.lang = {
                        lang: 'TR',
                    };
                },
            },
            {
                label: 'Ukrainian',
                click() {
                    global.lang = {
                        lang: 'UK',
                    };
                },
            },
            {
                label: 'Urdu',
                click() {
                    global.lang = {
                        lang: 'UR',
                    };
                },
            },
            {
                label: 'Uzbek',
                click() {
                    global.lang = {
                        lang: 'UZ',
                    };
                },
            },
            {
                label: 'Vietnamese',
                click() {
                    global.lang = {
                        lang: 'VI',
                    };
                },
            },
            {
                label: 'Welsh',
                click() {
                    global.lang = {
                        lang: 'CY',
                    };
                },
            },
            {
                label: 'Xhosa',
                click() {
                    global.lang = {
                        lang: 'XH',
                    };
                },
            },
        ],
    },
    {
        label: 'Search',
        submenu: [
            {
                label: 'Lyrics',
                click() {
                    applyMagick();
                    mainWindow.webContents.send('lyrics', 'lyrics');
                },
            },
            {
                label: 'Subtitles',
                click() {
                    applyMagick();
                    mainWindow.webContents.send(
                        'movies/series',
                        'movies/series'
                    );
                },
            },
        ],
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click() {
                    mainWindow.webContents.send('about', 'about');
                },
            },
            {
                label: 'Check for new releases',
                click() {
                    electronShell.openExternal(
                        'https://github.com/engMaher/LLG-MP/releases'
                    );
                },
            },
        ],
    },
];
var savedExpMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                submenu: [
                    {
                        label: 'External Website',
                        submenu: [
                            {
                                label: 'Youtube',
                                click() {
                                    setMenu(mainWindow, menuExtYoutube);
                                    mainWindow.loadURL(
                                        'file://' +
                                            __dirname +
                                            '/embeddedYoutube.html'
                                    );
                                },
                            },
                            {
                                label: 'Yesmovies',
                                click() {
                                    setMenu(mainWindow, menuExtYesmovies);
                                    mainWindow.loadURL(
                                        'file://' +
                                            __dirname +
                                            '/embeddedYesmovies.html'
                                    );
                                },
                            },
                        ],
                    },
                    {
                        label: 'LLG-MP',
                        click() {
                            setMenu(mainWindow, menuMP);
                            mainWindow.loadURL(
                                'file://' + __dirname + '/MediaPl.html'
                            );
                        },
                    },
                ],
            },
            {
                label: 'Quit',
                click() {
                    app.quit();
                },
            },
        ],
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click() {
                    mainWindow.webContents.send('about', 'about');
                },
            },
            {
                label: 'Check for new releases',
                click() {
                    electronShell.openExternal(
                        'https://github.com/engMaher/LLG-MP/releases'
                    );
                },
            },
        ],
    },
];

let menuMP;
const menuSavedExp = buildMenuFromTemplate(savedExpMenu);
const menuExtYoutube = buildMenuFromTemplate(ExtWebsiteMenu_youtube);
const menuExtYesmovies = buildMenuFromTemplate(ExtWebsiteMenu_yesMovies);
// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
// app.commandLine.appendSwitch('allow-file-access-from-files');

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            worldSafeExecuteJavaScript: true,
            nodeIntegrationInWorker: true,
            width: 800,
            height: 600,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL('file://' + __dirname + '/MediaPl.html');

    mainWindow.webContents.on(
        'new-window',
        (event, url, frameName, disposition, options, additionalFeatures) => {
            mainWindow.webContents.send('newwindow', {
                event: event,
                url: url,
                frameName: frameName,
                disposition: disposition,
                options: options,
                additionalFeatures: additionalFeatures,
            });
        }
    );
    session.defaultSession.cookies
        .get({ url: 'https://www.youtube.com' })
        .then((cookies) => {})
        .catch((error) => {
            console.log(error);
        });


    menuMP = buildMenuFromTemplate(mediaPlayerMenu);
    setMenu(mainWindow, menuMP);

    // if (process.platform == "win32" && process.mainModule.filename.indexOf('app.asar') === -1)
    //mainWindow.openDevTools({ mode: 'detach' });
    ipc.on('download', (event, info) => {
        download(mainWindow, info.url, info.properties)
            .then(function (dl) {})
            .catch(console.error);

        download(
            BrowserWindow.getFocusedWindow(),
            info.url,
            info.properties
        ).then((dl) =>
            mainWindow.webContents.send('download complete', dl.getSavePath())
        );
    });

    ipc.on('newWindowOpen', (event, info) => {
        if (info.type == 'youtube') {
            setMenu(mainWindow, menuExtYoutube);
            mainWindow.loadURL(
                'file://' + __dirname + '/embeddedYoutube.html',
                { userAgent: 'Chrome' }
            );
            mainWindow.webContents.executeJavaScript(
                " document.getElementById('player').src='" +
                    info.path +
                    "';" +
                    `
      ;setTimeout(function(){document.getElementById("player").contentWindow.document.getElementsByTagName('video')[0].addEventListener('loadedmetadata', function() {
        this.currentTime = ` +
                    (parseFloat(info.time) - 4).toString() +
                    `;
      }, false);},1000);
      `
            );
        } else if (info.type == 'local') {
            setMenu(mainWindow, menuMP);
            mainWindow.loadURL('file://' + __dirname + '/MediaPl.html');
            mainWindow.webContents.executeJavaScript(
                'player.vlc.play("file:///" + "' +
                    info.path +
                    '");loadSubtitles("' +
                    info.path +
                    '");player.vlc.time=' +
                    (parseFloat(info.time) - 10)
            );
        }
    });

    mainWindow.webContents.session.webRequest.onHeadersReceived(
        { urls: ['*://*.youtube.com/*', '*://*.yesmovies.com/*'] },
        (d, c) => {
            if (
                d.responseHeaders['x-frame-options'] ||
                d.responseHeaders['X-Frame-Options']
            ) {
                d.responseHeaders['x-frame-options'] = '*';
                d.responseHeaders['X-Frame-Options'] = '*';
            }
            c({
                cancel: false,
                responseHeaders: d.responseHeaders,
            });
        }
    );
    // autoUpdater.checkForUpdatesAndNotify();
    // autoUpdater.on('checking-for-update', () => {
    //     mainWindow.webContents.send('updateCheck', 'Checking for update...');
    // });
    // autoUpdater.on('update-available', (info) => {
    //     mainWindow.webContents.send(
    //         'updateAvailable',
    //         'Update available.' + info
    //     );
    // });
    // autoUpdater.on('update-not-available', (info) => {
    //     mainWindow.webContents.send(
    //         'noUpdates',
    //         'Update not available.' + info
    //     );
    // });
    // autoUpdater.on('error', (err) => {
    //     mainWindow.webContents.send(
    //         'updateError',
    //         'An error occurred while checking for updates ' + err
    //     );
    // });
    // autoUpdater.on('download-progress', (progressObj) => {
    //     let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
    //     log_message =
    //         log_message + ' - Downloaded ' + progressObj.percent + '%';
    //     log_message =
    //         log_message +
    //         ' (' +
    //         progressObj.transferred +
    //         '/' +
    //         progressObj.total +
    //         ')';
    //     mainWindow.webContents.send('updateProgress', log_message);
    // });
    // autoUpdater.on('update-downloaded', (info) => {
    //     mainWindow.webContents.send(
    //         'installingUPdate',
    //         'Update was downloaded , installing the update' + info
    //     );
    //     autoUpdater.quitAndInstall();
    // });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow.removeAllListeners();
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on("window-all-closed", () => {
    // For OSX application should stay active until user explicitly quits the app
    if (process.platform !== "darwin") {
        app.quit();
    }
})

app.on("activate", () => {
    // In OSX it's common to re-create a window in the app when the cok icon is clicked and there are no windows open.
    if (mainWindow === null) {
        createWindow()
    }
})