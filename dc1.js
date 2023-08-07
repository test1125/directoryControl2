document.getElementById('btn1').addEventListener('click', async () => {
    // ディレクトリ選択ダイアログを表示して
    // FileSystemDirectoryHandle オブジェクトを取得
    const dh = await window.showDirectoryPicker();
   
    // 開いたディレクトリ内のファイルとディレクトリをコンソールに出力
    for await (const handle of root.values()) {
      if (handle.kind === 'file') {
        console.log(handle.name);
      } else if (handle.kind === 'directory') {
        console.log(handle.name + '/');
      }
    }
});