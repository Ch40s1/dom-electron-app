const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dbAPI', {
  addPerson: (name, age, email) => ipcRenderer.send('add-person', name, age, email),
  getPeople: () => ipcRenderer.invoke('get-people'),
  deletePerson: (name) => ipcRenderer.send('delete-person', name),
  editPerson: (name, age, email) => ipcRenderer.send('edit-person', name, age, email),
  getPerson: (name) => ipcRenderer.invoke('get-person', name),
});
