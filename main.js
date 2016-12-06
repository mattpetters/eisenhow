const {app, BrowserWindow} = require('electron')
let win

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
