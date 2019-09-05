const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win;

function createWindow() {
    win = new BrowserWindow({ 
        webPreferences: {
            nodeIntegration:true
        },
        width: 800, 
        height: 600 
        // icon: __dirname+'/img/balloon.png' 
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true }))

    win.webContents.openDevTools

    win.on('closed', _ => win = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', _ => {
    if (process.platform !== 'darwin') app.quit()
})