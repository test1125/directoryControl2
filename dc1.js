async function readAllFilesInDirectory(directoryHandle) {
  for await (const entry of directoryHandle.values()) {
    if (entry.isFile) {
      let file = await entry.getFile();
      let content = await file.text();
      console.log(`File: ${entry.name}\nContent: ${content}\n`);
    } else if (entry.isDirectory) {
      let subDirectoryHandle = await entry.getDirectory();
      await readAllFilesInDirectory(subDirectoryHandle);
    }
  }
}

document.getElementById('btn1').addEventListener('click', async () => {
  try {
    let initialDirectoryHandle = await window.showDirectoryPicker();
    await readAllFilesInDirectory(initialDirectoryHandle);
  } catch (error) {
    console.error('Error:', error);
  }
});
