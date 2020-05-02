//main buttonのリストを取得。
var div_main = document.getElementById('main');
var btn_main = div_main.getElementsByClassName('button');
//result buttonのリストを取得。
var div_result = document.getElementById('result');
var btn_result = div_result.getElementsByClassName('button');


// ボタンの個数分ループ
for (var i = btn_main.length - 1; i >= 0; i--) {
    btnAction(btn_main[i],i);
}

function btnAction(btnDOM, btnId) {
    btnDOM.addEventListener("click", function () {
        this.classList.toggle('select');
        btn_result[btnId].classList.toggle('transparecy');
    })
}