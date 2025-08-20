const {app,BrowserWindow}=require("electron")
const path = require("path");
console.log("main process")
function createWindow(){
const win=new BrowserWindow({
    width:800,
    height:1000,
    alwaysOnTop:false,
  minWidth: 800,
    minHeight: 600,
    resizable: true,
    fullscreen: false,
    frame: true,
    backgroundColor:"#3b3b3bff",
        icon: path.join(__dirname, "assets/icons/downloads.jpg"),
    title:"Nikhil's Software",
    webPreferences:{
        nodeIntegration:true,
    }
})
win.loadFile("index.html")
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

app.whenReady().then(createWindow)