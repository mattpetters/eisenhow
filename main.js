const {app, BrowserWindow} = require('electron')
let win

const ipc = require('electron').ipcMain

ipc.on('save-tasks', function (event, arg) {
    console.log(arg);
    console.log("Saving to json file");
    event.returnValue = 'Saved tasks'
})

app.on('ready', () => {
    win = new BrowserWindow({
            width: 1000,
            height: 700
        })

    win.setTitle('Eisenhow - Prioritization')
    win.loadURL(`file://${__dirname}/index.html`)
})

app.on('window-all-closed', ()=>{
        app.quit()
})
