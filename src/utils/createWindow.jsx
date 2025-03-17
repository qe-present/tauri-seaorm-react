import {Window,} from '@tauri-apps/api/window'
export function disableMainWindow() {
    const mainWindow = appWindow;
    mainWindow.setFocusable(false); // 禁用父窗口的焦点
    console.log("Main window interaction disabled");
}
export function enableMainWindow() {
    const mainWindow = appWindow;
    mainWindow.setFocusable(true); // 恢复父窗口的焦点
    console.log("Main window interaction enabled");
}
export default function createWindow(){
    const addWindow=new Window("add",{
        url:"/add",
        parent:"main",
        width:400,
        height:300,

    })
    console.log('213213')
    addWindow.listen("tauri://close-requested", () => {
        console.log("Window close requested, hiding instead of destroying.");
        addWindow.hide(); // 隐藏窗口
    });
    addWindow.once("tauri://created", () => {
        console.log("Window is ready, showing it.");
        addWindow.show(); // 显示窗口
    });
}