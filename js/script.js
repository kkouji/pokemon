var div = document.getElementById('main');
var btn = div.getElementsByClassName('button');
console.dir(btn);

var div2 = document.getElementById('result');
var btn2 = div2.getElementsByClassName('button');
console.dir(btn2);

// ボタンの個数分ループ
// 変数「i」に現在のループ回数が代入される
for (var i = btn.length - 1; i >= 0; i--) {
    btnAction(btn[i],i);
}

function btnAction(btnDOM, btnId) {
    // 各ボタンをイベントリスナーに登録
    btnDOM.addEventListener("click", function () {
        // activeクラスの追加と削除
        // thisは、クリックされたオブジェクト
        this.classList.toggle('select');
        btn2[btnId].classList.toggle('transparecy');
    })
}
