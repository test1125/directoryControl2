async function readAllFilesInDirectory(directoryHandle) {
  for await (const entry of directoryHandle.values()) {
    if (entry.kind === "file") {
      let file = await entry.getFileHandle(entry.name);
      let content = await file.getFile()
      console.log(`File: ${entry.name}\nContent: ${content}\n`);
    } else if (entry.isDirectory) {
      let subDirectoryHandle = await entry.getDirectory();
      await readAllFilesInDirectory(subDirectoryHandle);
    }
    else {
      console.log("else")
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
