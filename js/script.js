
var effect_table = [
//   nor fir wat ele gla ice fig poi gro fly psy bug roc gho dra dar ste fair
    [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1/2,0  ,1  ,1  ,1/2,1  ], // atack normal
    [1  ,1/2,1/2,1  ,2  ,2  ,1  ,1  ,1  ,1  ,1  ,2  ,1/2,1  ,1/2,1  ,2  ,1  ], // atack fire
    [1  ,2  ,1/2,1  ,1/2,1  ,1  ,1  ,2  ,1  ,1  ,1  ,2  ,1  ,1/2,1  ,1  ,1  ], // atack water
    [1  ,1  ,2  ,1/2,1/2,1  ,1  ,1  ,0  ,2  ,1  ,1  ,1  ,1  ,1/2,1  ,1  ,1  ], // atack electric
    [1  ,1/2,2  ,1  ,1/2,1  ,1  ,1/2,2  ,1/2,1  ,1/2,2  ,1  ,1/2,1  ,1/2,1  ], // atack glass
    [1  ,1/2,1/2,1  ,2  ,1/2,1  ,1  ,2  ,2  ,1  ,1  ,1  ,1  ,2  ,1  ,1/2,1  ], // atack ice
    [2  ,1  ,1  ,1  ,1  ,2  ,1  ,1/2,1  ,1/2,1/2,1/2,2  ,0  ,1  ,2  ,2  ,1/2], // atack fighting
    [1  ,1  ,1  ,1  ,2  ,1  ,1  ,1/2,1/2,1  ,1  ,1  ,1/2,1/2,1  ,1  ,0  ,2  ], // atack poison
    [1  ,2  ,1  ,2  ,1/2,1  ,1  ,2  ,1  ,0  ,1  ,1/2,2  ,1  ,1  ,1  ,2  ,1  ], // atack ground
    [1  ,1  ,1  ,1/2,2  ,1  ,2  ,1  ,1  ,1  ,1  ,2  ,1/2,1  ,1  ,1  ,1/2,1  ], // atack flying
    [1  ,1  ,1  ,1  ,1  ,1  ,2  ,2  ,1  ,1  ,1/2,1  ,1  ,1  ,1  ,0  ,1/2,1  ], // atack psychic
    [1  ,1/2,1  ,1  ,2  ,1  ,1/2,1/2,1  ,1/2,2  ,1  ,1  ,1/2,1  ,2  ,1/2,1/2], // atack bug
    [1  ,2  ,1  ,1  ,1  ,2  ,1/2,1  ,1/2,2  ,1  ,2  ,1  ,1  ,1  ,1  ,1/2,1  ], // atack rock
    [0  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,2  ,1  ,1  ,2  ,1  ,1/2,1  ,1  ], // atack ghost
    [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,2  ,1  ,1/2,0  ], // atack dragon
    [1  ,1  ,1  ,1  ,1  ,1  ,1/2,1  ,1  ,1  ,2  ,1  ,1  ,2  ,1  ,1/2,1  ,1/2], // atack dark
    [1  ,1/2,1/2,1/2,1  ,2  ,1  ,1  ,1  ,1  ,1  ,1  ,2  ,1  ,1  ,1  ,1/2,2  ], // atack steel
    [1  ,1/2,1  ,1  ,1  ,1  ,2  ,1/2,1  ,1  ,1  ,1  ,1  ,1  ,2  ,2  ,1/2,1  ], // atack faily
];


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

////// functions //////
function btnAction(btnDOM, btnId) {
    btnDOM.addEventListener("click", function () {
        this.classList.toggle('select');
        btn_result[btnId].classList.toggle('transparecy');
    })
}

