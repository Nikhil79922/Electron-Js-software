const { app, BrowserWindow, globalShortcut , dialog , Tray, Menu} = require("electron")
const windowStateKeeper=require("electron-window-state")
const path = require("path");
console.log("main process")
 // Create a custom menu
 const template = [
    {
      label: "App",
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: "File",
      submenu: [
        { label: "New Order", click: () => { console.log("New order clicked"); } },
        { label: "Open", role: "openFile" },
        { label: "Save", role: "save" },
        { type: "separator" },
        { role: "close" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          },
        },
      ],
    },
]

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu); // ✅ This makes the menu visible on mac
function createWindow() {
    let mainWindowState=windowStateKeeper({
        defaultHeight:900,
        defaultWidth:1000
    })
    const win = new BrowserWindow({
        x:mainWindowState.x,
        y:mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        // alwaysOnTop: false,
        // minWidth: 800,
        // minHeight: 600,
        // resizable: true,
        // fullscreen: false,
        // frame: false,
        backgroundColor: "#3b3b3bff",
        icon: path.join(__dirname, "assets/icons/downloads.jpg"),
        title: "Nikhil's Software",
        webPreferences: {
            nodeIntegration: true,
        }
    })
    mainWindowState.manage(win)

    let wc =win.webContents;
    wc.on('dom-ready',()=>{
        console.log("Dom is ready")
    })

    wc.on('did-finish-load',()=>{
        console.log("Dom finishes load");
    })

    // wc.on('before-input-event',()=>{
    //     console.log('Input event occurence')
    // })

    // wc.on('new-window',()=>{
    //     console.log('new window opened')
    // })


    win.loadFile("index.html")
    globalShortcut.register("Shift+K",()=>{
        win.loadFile("ShortCutrender.html")
    })

    win.webContents.on("context-menu",()=>{
        
    })

     tray=new Tray(path.join(__dirname, "assets/icons/download.png"),)
     const contextMenu = Menu.buildFromTemplate([
        { label: 'Show App', click: () => win.show() },
        { label: 'Hide App', click: () => win.hide() },
        { label: 'Quit', click: () => app.quit() }
      ]);
      tray.setToolTip('My Electron App');
      tray.setContextMenu(contextMenu);
    // win.webContents.openDevTools()

    // {Child window from main processing}
    // const childWin=new BrowserWindow({
    //     parent:win,
    //     title:"I'm a child Window",
    //     backgroundColor:"#d7f780ff",
    // })
    // childWin.loadFile("child.html")
    // childWin.show();
}

// app.whenReady().then(createWindow)

//Life cycle event
// console.log(app.isReady());

// app.on('before-quit',(e)=>{
//     console.log("call before quiting the app")
//     e.preventDefault();
// })

// app.on('will-quit',(e)=>{
//     console.log("call before quiting the app")
//     e.preventDefault();
// })

// app.on('browser-window-focus',()=>{
//     console.log("will call on the browser focus ")
// })

// app.on('browser-window-blur',()=>{
//     console.log("will call on the browser unfocus ")
// })

app.on('ready',()=>{
    createWindow()
    console.log("app is ready")
       globalShortcut.register("Shift+M",()=>{
        console.log("ShortCut Key Triggered ")
    })
    globalShortcut.register("Shift+D",()=>{
        console.log("Triggered Dialog Box")
        dialog.showOpenDialog({
            defaultPath:app.getPath("desktop"),
            buttonLabel:"select file"
        })
    })

})