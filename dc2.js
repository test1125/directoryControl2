async function readAllFilesInDirectory(dirHandle, list=[]) {
    console.log("1")
    for await (let [name, handle] of dirHandle) {
        if  (handle.kind === "file") {
            let fileHandle = await dirHandle.getFileHandle(name)
            let file = await fileHandle.getFile()
            if (name === "area.csv"){
                let file_path = await rootdirHandle.resolve(handle)
                let labels = ""
                labels = String(file_path).replace(name, "")
                
                let content = await file.text()
                let area = content.split(/\r\n|\r|\n/)[1].split(",")[1]
                console.log(`labels:${labels}`)

                let fileHandle = await dirHandle.getFileHandle("c0.75 particles_Results.csv")
                file = await fileHandle.getFile()
                content = await file.text()
                let amount = content.split(/\r\n|\r|\n/).slice(-2)[0].split(",")[0]
                console.log(amount)
                await writableStream.write(`${labels}${area},${amount}\n`)
            }
            
        }
        else if (handle.kind === "directory") {
            list.push(name)
            let childDirHandle = await dirHandle.getDirectoryHandle(name)
            await readAllFilesInDirectory(childDirHandle, list);
            }
    }
  }


document.getElementById('btn1').addEventListener('click', async () => {
    try {
        rootdirHandle = await window.showDirectoryPicker()
        let resultFileHandle = await rootdirHandle.getFileHandle('result.csv', { create: true })
        let num = await rootdirHandle.name.replace(/no/i, "")
        writableStream = await resultFileHandle.createWritable()
        await writableStream.write(`,No.${num},,area,定量結果,exclusion,number of c-Fos+,c-Fos/area(10^5 um2)\n`)
        await readAllFilesInDirectory(rootdirHandle);
        await writableStream.close()
    } catch (error) {
      console.error('Error:', error);
    }
  });
  