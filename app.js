const {
  autoUpdater
} = require("electron-updater");
var path = require("path");
if (process.platform == "win32" && process.env["ELECTRON_ENV"] != "development")
  process.env["VLC_PLUGIN_PATH"] = path.join(
    __dirname.substring(0, __dirname.lastIndexOf("\\") + 1),
    "\\app.asar.unpacked\\node_modules\\wcjs-prebuilt\\bin\\plugins"
  );

if (process.platform == "win32" && process.env["ELECTRON_ENV"] == "development")
  process.env["VLC_PLUGIN_PATH"] =
  __dirname + "./node_modules/wcjs-prebuilt/bin/plugins";
if (process.argv.length >= 2) {
  global.filePath = process.argv[1];
}
const electron = require("electron");
const {
  app,
  BrowserWindow,
  Menu
} = electron;
var ua = require("universal-analytics");
const uuid = require("uuid/v4");
const log = require("electron-log");
const electronShell = require("electron").shell;
const {
  JSONStorage
} = require("node-localstorage");
var Datastore = require("nedb"),
  db = new Datastore({
    filename: path.join(
      __dirname.substring(0, __dirname.lastIndexOf("\\") + 1),
      "\\newVocab"
    ),
    autoload: true
  });
/* autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...'); */
const nodeStorage = new JSONStorage(app.getPath("userData"));
const userId = nodeStorage.getItem("userid") || uuid();
nodeStorage.setItem("userid", userId);
global.visitor = ua("UA-138310097-1", userId);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const ipc = require('electron').ipcMain;
var mainWindow = null;
global.lang = {
  lang: "ar"
};
global.dirName = {
  dirname: path.join(
    __dirname.substring(0, __dirname.lastIndexOf("\\") + 1),
    "\\newVocab"
  )
};

function applyMagick() {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", "file://" + __dirname + "/scripts/ExtRenderer.js", false);
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
var mediaPlayerMenu = [{
    label: "File",
    submenu: [{
        label: "Open",
        submenu: [{
            label: "From PC",
            submenu: [{
                label: "Media file",
                click() {
                  mainWindow.webContents.send("openmedia", "openMedia");
                }
              },
              {
                label: "Subtitles file",
                click() {
                  mainWindow.webContents.send("opensub", "openSub");
                }
              }
            ]
          },
          {
            label: "External Website",
            submenu: [{
                label: "Youtube",
                click() {
                  mainWindow.loadURL(
                    "file://" + __dirname + "/embeddedYoutube.html"
                  );
                  mainWindow.setMenu(menuExtYoutube);
                }
              },
              {
                label: "Yesmovies",
                click() {
                  mainWindow.setMenu(menuExtYesmovies);
                  mainWindow.loadURL(
                    "file://" + __dirname + "/embeddedYesmovies.html"
                  );
                }
              }
            ]
          },
          {
            label: "Saved Words",
            click() {
              mainWindow.setMenu(menuSavedExp);
              mainWindow.loadURL("file://" + __dirname + "/newExp.html");
              mainWindow.webContents.send("newwords", "newwords");
            }
          }
        ]
      },
      {
        label: "Quit",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Translate to",
    submenu: [{
        label: "English",
        click() {
          global.lang = {
            lang: "en"
          };
        }
      },
      {
        label: "Arabic",
        click() {
          global.lang = {
            lang: "ar"
          };
        }
      },
      {
        label: "German",
        click() {
          global.lang = {
            lang: "de"
          };
        }
      },
      {
        label: "Dutch",
        click() {
          global.lang = {
            lang: "nl"
          };
        }
      },
      {
        label: "French",
        click() {
          global.lang = {
            lang: "fr"
          };
        }
      },
      {
        label: "Hindi",
        click() {
          global.lang = {
            lang: "hi"
          };
        }
      },
      {
        label: "Hebrew",
        click() {
          global.lang = {
            lang: "iw"
          };
        }
      },
      {
        label: "Italian",
        click() {
          global.lang = {
            lang: "it"
          };
        }
      },
      {
        label: "Japanese",
        click() {
          global.lang = {
            lang: "ja"
          };
        }
      },
      {
        label: "Russian",
        click() {
          global.lang = {
            lang: "ru"
          };
        }
      },
      {
        label: "Spanish",
        click() {
          global.lang = {
            lang: "es"
          };
        }
      },
      {
        label: "Turkish",
        click() {
          global.lang = {
            lang: "tr"
          };
        }
      }
    ]
  },
  {
    label: "Search",
    submenu: [{
        label: "Lyrics",
        click() {
          mainWindow.webContents.send("lyrics", "lyrics");
        }
      },
      {
        label: "Subtitles",
        click() {
          mainWindow.webContents.send("movies/series", "movies/series");
        }
      }
    ]
  },
  {
    label: "Help",
    submenu: [{
        label: "About",
        click() {
          mainWindow.webContents.send("about", "about");
        }
      },
      {
        label: "Check for new releases",
        click() {
          electronShell.openExternal("https://github.com/engMaher");
        }
      }
    ]
  }
];
var ExtWebsiteMenu_youtube = [{
    label: "File",
    submenu: [{
        label: "Open",
        submenu: [{
            label: "From PC",
            submenu: [{
              label: "Subtitles File",
              click() {
                applyMagick();
                mainWindow.webContents.send("opensub", "openSub");
              }
            }]
          },
          {
            label: "External Website",
            submenu: [{
              label: "Yesmovies",
              click() {
                mainWindow.setMenu(menuExtYesmovies);
                mainWindow.loadURL(
                  "file://" + __dirname + "/embeddedYesmovies.html"
                );
              }
            }]
          },
          {
            label: "LLG-MP",
            click() {
              mainWindow.setMenu(menuMP);
              mainWindow.loadURL("file://" + __dirname + "/MediaPl.html");
            }
          },
          {
            label: "Saved Words",
            click() {
              mainWindow.setMenu(menuSavedExp);
              mainWindow.loadURL("file://" + __dirname + "/newExp.html");
              mainWindow.webContents.send("newwords", "newwords");
            }
          }
        ]
      },
      {
        label: "Quit",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Translate to",
    submenu: [{
        label: "English",
        click() {
          global.lang = {
            lang: "en"
          };
        }
      },
      {
        label: "Arabic",
        click() {
          global.lang = {
            lang: "ar"
          };
        }
      },
      {
        label: "German",
        click() {
          global.lang = {
            lang: "de"
          };
        }
      },
      {
        label: "Dutch",
        click() {
          global.lang = {
            lang: "nl"
          };
        }
      },
      {
        label: "French",
        click() {
          global.lang = {
            lang: "fr"
          };
        }
      },
      {
        label: "Hindi",
        click() {
          global.lang = {
            lang: "hi"
          };
        }
      },
      {
        label: "Hebrew",
        click() {
          global.lang = {
            lang: "iw"
          };
        }
      },
      {
        label: "Italian",
        click() {
          global.lang = {
            lang: "it"
          };
        }
      },
      {
        label: "Japanese",
        click() {
          global.lang = {
            lang: "ja"
          };
        }
      },
      {
        label: "Russian",
        click() {
          global.lang = {
            lang: "ru"
          };
        }
      },
      {
        label: "Spanish",
        click() {
          global.lang = {
            lang: "es"
          };
        }
      },
      {
        label: "Turkish",
        click() {
          global.lang = {
            lang: "tr"
          };
        }
      }
    ]
  },
  {
    label: "Search",
    submenu: [{
        label: "Lyrics",
        click() {
          applyMagick();
          mainWindow.webContents.send("lyrics", "lyrics");
        }
      },
      {
        label: "Subtitles",
        click() {
          applyMagick();
          mainWindow.webContents.send("movies/series", "movies/series");
        }
      }
    ]
  },
  {
    label: "Help",
    submenu: [{
        label: "About",
        click() {
          mainWindow.webContents.send("about", "about");
        }
      },
      {
        label: "Check for new releases",
        click() {
          electronShell.openExternal("https://github.com/engMaher");
        }
      }
    ]
  }
];
var ExtWebsiteMenu_yesMovies = [{
    label: "File",
    submenu: [{
        label: "Open",
        submenu: [{
            label: "From PC",
            submenu: [{
              label: "Subtitles File",
              click() {
                applyMagick();
                mainWindow.webContents.send("opensub", "openSub");
              }
            }]
          },
          {
            label: "External Website",
            submenu: [{
              label: "Youtube",
              click() {
                mainWindow.setMenu(menuExtYoutube);
                mainWindow.loadURL(
                  "file://" + __dirname + "/embeddedYoutube.html"
                );
              }
            }]
          },
          {
            label: "LLG-MP",
            click() {
              mainWindow.setMenu(menuMP);
              mainWindow.loadURL("file://" + __dirname + "/MediaPl.html");
            }
          },
          {
            label: "Saved Words",
            click() {
              mainWindow.setMenu(menuSavedExp);
              mainWindow.loadURL("file://" + __dirname + "/newExp.html");
              mainWindow.webContents.send("newwords", "newwords");
            }
          }
        ]
      },
      {
        label: "Quit",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Translate to",
    submenu: [{
        label: "English",
        click() {
          global.lang = {
            lang: "en"
          };
        }
      },
      {
        label: "Arabic",
        click() {
          global.lang = {
            lang: "ar"
          };
        }
      },
      {
        label: "German",
        click() {
          global.lang = {
            lang: "de"
          };
        }
      },
      {
        label: "Dutch",
        click() {
          global.lang = {
            lang: "nl"
          };
        }
      },
      {
        label: "French",
        click() {
          global.lang = {
            lang: "fr"
          };
        }
      },
      {
        label: "Hindi",
        click() {
          global.lang = {
            lang: "hi"
          };
        }
      },
      {
        label: "Hebrew",
        click() {
          global.lang = {
            lang: "iw"
          };
        }
      },
      {
        label: "Italian",
        click() {
          global.lang = {
            lang: "it"
          };
        }
      },
      {
        label: "Japanese",
        click() {
          global.lang = {
            lang: "ja"
          };
        }
      },
      {
        label: "Russian",
        click() {
          global.lang = {
            lang: "ru"
          };
        }
      },
      {
        label: "Spanish",
        click() {
          global.lang = {
            lang: "es"
          };
        }
      },
      {
        label: "Turkish",
        click() {
          global.lang = {
            lang: "tr"
          };
        }
      }
    ]
  },
  {
    label: "Search",
    submenu: [{
        label: "Lyrics",
        click() {
          applyMagick();
          mainWindow.webContents.send("lyrics", "lyrics");
        }
      },
      {
        label: "Subtitles",
        click() {
          applyMagick();
          mainWindow.webContents.send("movies/series", "movies/series");
        }
      }
    ]
  },
  {
    label: "Help",
    submenu: [{
        label: "About",
        click() {
          mainWindow.webContents.send("about", "about");
        }
      },
      {
        label: "Check for new releases",
        click() {
          electronShell.openExternal("https://github.com/engMaher");
        }
      }
    ]
  }
];
var savedExpMenu = [{
    label: "File",
    submenu: [{
        label: "Open",
        submenu: [{
            label: "External Website",
            submenu: [{
                label: "Youtube",
                click() {
                  mainWindow.setMenu(menuExtYoutube);
                  mainWindow.loadURL(
                    "file://" + __dirname + "/embeddedYoutube.html"
                  );
                }
              },
              {
                label: "Yesmovies",
                click() {
                  mainWindow.setMenu(menuExtYesmovies);
                  mainWindow.loadURL(
                    "file://" + __dirname + "/embeddedYesmovies.html"
                  );
                }
              }
            ]
          },
          {
            label: "LLG-MP",
            click() {
              mainWindow.setMenu(menuMP);
              mainWindow.loadURL("file://" + __dirname + "/MediaPl.html");
            }
          }
        ]
      },
      {
        label: "Quit",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Help",
    submenu: [{
        label: "About",
        click() {
          mainWindow.webContents.send("about", "about");
        }
      },
      {
        label: "Check for new releases",
        click() {
          electronShell.openExternal("https://github.com/engMaher");
        }
      }
    ]
  }
];
const menuMP = Menu.buildFromTemplate(mediaPlayerMenu);
const menuSavedExp = Menu.buildFromTemplate(savedExpMenu);
const menuExtYoutube = Menu.buildFromTemplate(ExtWebsiteMenu_youtube);
const menuExtYesmovies = Menu.buildFromTemplate(ExtWebsiteMenu_yesMovies);
// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
//app.commandLine.appendSwitch('allow-file-access-from-files');
app.on("ready", function () {
  /*   proto col.interceptFileProtocol('file', (request, callback) => {
      const url = request.url.substr(7) /* all urls start with 'file://' */
  /*
      callback({
        path: path.normalize(`${__dirname}/${url}`)
      })
    }, (err) => {
      if (err) console.error('Failed to register protocol', err)
    }) */
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.loadURL("file://" + __dirname + "/MediaPl.html");
  //Menu.setApplicationMenu(menu);
  mainWindow.setMenu(menuMP);
  mainWindow.openDevTools({
    detach: true
  });
  ipc.on("download", (event, info) => {
    download(BrowserWindow.getFocusedWindow(), info.url, info.properties)
      .then(dl => window.webContents.send("download complete", dl.getSavePath()));
  });

  mainWindow.webContents.session.webRequest.onHeadersReceived({}, (d, c) => {
    if (
      d.responseHeaders["x-frame-options"] ||
      d.responseHeaders["X-Frame-Options"]
    ) {
      d.responseHeaders["x-frame-options"] = "*";
      d.responseHeaders["X-Frame-Options"] = "*";
    }
    c({
      cancel: false,
      responseHeaders: d.responseHeaders
    });
  });
  autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.on("checking-for-update", () => {
    mainWindow.webContents.send("updateCheck", "Checking for update...");
  });
  autoUpdater.on("update-available", info => {
    mainWindow.webContents.send("updateAvailable", "Update available." + info);
  });
  autoUpdater.on("update-not-available", info => {
    mainWindow.webContents.send("noUpdates", "Update not available." + info);
  });
  autoUpdater.on("error", err => {
    mainWindow.webContents.send(
      "updateError",
      "An error occurred while checking for updates " + err
    );
  });
  autoUpdater.on("download-progress", progressObj => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")";
    mainWindow.webContents.send("updateProgress", log_message);
  });
  autoUpdater.on("update-downloaded", info => {
    mainWindow.webContents.send(
      "installingUPdate",
      "Update was downloaded , installing the update" + info
    );
    autoUpdater.quitAndInstall();
  });
  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    mainWindow.removeAllListeners();
    mainWindow = null;
    app.quit();
  });
});