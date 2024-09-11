const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dbAPI', {
  addPerson: (name, age, email) => ipcRenderer.send('add-person', name, age, email),
  getPeople: () => ipcRenderer.invoke('get-people')
});
