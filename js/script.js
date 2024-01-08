////// init //////

//main buttonのリストを取得。
let btns_main    = Array.from(document.getElementById('main').getElementsByClassName('button'));
//result buttonのリストを取得。
let boxes_result = Array.from(document.getElementById('new_result').getElementsByClassName('result_box'));
//reset buttonを取得
let btn_reset    = document.getElementById('main').getElementsByClassName('btn_06');
//input_formを取得
let input_form   = document.getElementById("name");


// 選択ボタンの初期化
btns_main.forEach(element => {
  element.addEventListener("click", addEventBtnsMain);
})

//リセット表示の初期化
resetResetbtn(btn_reset[0]);
//結果表示の初期化
resetResult();
//inputフォームの初期化
addEventSerch(input_form);

////// functions //////

// リセットボタンにアクション追加
function resetResetbtn(btnDOM) {
  btnDOM.addEventListener("click", function () {
    resetMain();
    resetResult();
    resetInput();
  })
}

//mainボタンアクション
function addEventBtnsMain() {
  this.classList.toggle('select');
  let select_num = document.getElementById('main').getElementsByClassName('select').length;
  if (select_num > 2) {
    this.classList.toggle('select');
    return false;
  } else if (select_num == 2 || select_num == 1) {
    updateResult();
  } else if (select_num == 0) { //タイプの選択がすべて解除されたとき
    resetResult();
  } else {
    alert("Something wrong. Programming Error");
  }
}

// mainボタンをデフォルトに戻す
function resetMain() {
  btns_main.forEach(element => {
    element.classList.remove('select');//selectを外す
    element.classList.remove('transparecy');//色を濃くする
  })
}

// 結果ボタンをデフォルトに戻す
function resetResult() {
  boxes_result[0].innerHTML = "<div>x4</div>"
  boxes_result[1].innerHTML = "<div>x2</div>"
  boxes_result[2].innerHTML = "<div>x1</div>"
  boxes_result[3].innerHTML = "<div>x0.5</div>"
  boxes_result[4].innerHTML = "<div>x0.25</div>"
  boxes_result[5].innerHTML = "<div>x0</div>"
}

// inputをデフォルトに戻す
function resetInput() {
  input_form.value = "";
  let disp_pokemon_list = document.getElementById("pokemon_list");
  disp_pokemon_list.innerHTML = "";
}

//結果ボタンをアップデートする
function updateResult() {
  //selectされているbtns_mainのindexリストを作成
  let select_list = Array.from(document.getElementById('main').getElementsByClassName('select'));
  let select_index = [];

  select_list.forEach(element => { //アロー関数式
    select_index.push(btns_main.indexOf(element));
  })

  // btns_mainの透過を操作
  if (select_list.length == 2) { // 2つselectされた場合選択されていないボタンを薄くする。
    btns_main.forEach(element => {
      if (element.classList.contains("select")) {
        element.classList.remove('transparecy');
      } else {
        element.classList.add('transparecy');
      }
    })
  } else if (select_list.length == 1) { // 1つselectされた場合、選択ボタンをすべて表示する。
    btns_main.forEach(element => {
      element.classList.remove("transparecy");
    })
  }

  //Result領域をリセット
  resetResult();

  //Result領域のアップデート

  for (let j = 0; j < effect_table[0].length; j++) { // タイプを探索する。
    //ダメージ計算
    let damage = 1;
    for (let i = 0; i < select_list.length; i++) { // 選択されているタイプ分ダメージを走査し掛け算
      damage *= effect_table[j][select_index[i]];
    }

    let update_index = "";
    switch (damage) {
      case 4    : update_index = 0; break;
      case 2    : update_index = 1; break;
      case 1    : update_index = 2; break;
      case 1 / 2: update_index = 3; break;
      case 1 / 4: update_index = 4; break;
      case 0    : update_index = 5; break;
      default   : alert("Something wrong. Undefined damage data.");
    }
    boxes_result[update_index].insertAdjacentHTML('beforeend', `<div class="button ${type_list[j]}">${type_list[j]}<img src="image/${type_list[j]}.png"></div>`);
  }
}

//名前検索機能
function addEventSerch(inputDOM) {
  inputDOM.addEventListener("input", function () {
    let disp_pokemon_list = document.getElementById("pokemon_list"); // 検索結果を出す領域
    let input_name = input_form.value; //Inputフォーム

    //文字が入力されたら、mein,resultをリセットする。
    resetMain();
    resetResult();

    // Inputフォームに一致するポケモンの名前リストを作る
    let match_pokemon_list = pokemon_table.filter(element => element.Name.toLowerCase().includes(input_name.toLowerCase()));

    // 結果表示を初期化
    disp_pokemon_list.innerHTML = "";

    //ポケモン選択ボタンを複数作成
    if (match_pokemon_list.length != pokemon_table.length) {
      match_pokemon_list.forEach(element => {
        let {Name, No, Type1, Type2 } = element;

        disp_pokemon_list.insertAdjacentHTML('beforeend', `<div class="button">No${No} ${Name}/${Type1}/${Type2}<br></div>`);
      });
    }

    //作成したポケモン選択ボタンにアクションを追加
    //ポケモン選択ボタンのリストを取得。
    let btn_pokemon = Array.from(document.getElementById('search').getElementsByClassName('button'));

    btn_pokemon.forEach(element => {
      element.addEventListener("click", function () {
        //　選択ボタン、結果ボタンを初期化
        resetMain();
        resetResult();

        //クリックされたボタンにselectクラスをaddする
        //ポケモン選択ボタンを取得
        let btns_pokemon_select = Array.from(document.getElementById('search').getElementsByClassName('button'));
        btns_pokemon_select.forEach(btn_pokemon_select => {
          btn_pokemon_select.classList.remove('select');
        });
        this.classList.add('select');

        //選択されたボタンの情報を取得
        let pokemon_info = this.textContent.trim().split('/');
        let pokemon_type1 = pokemon_info[1];
        let pokemon_type2 = pokemon_info[2];

        //type_listからIndex番号を取得
        let pokemon_type1_index = type_list.indexOf(pokemon_type1);
        let pokemon_type2_index = type_list.indexOf(pokemon_type2);

        //type listのIndex番号から選択ボタンをselect
        btns_main[pokemon_type1_index].classList.toggle('select');
        if (pokemon_type2_index >= 0) {
          btns_main[pokemon_type2_index].classList.toggle('select');
        }

        //選択されているボタンから結果をアップデートする
        let select_num = document.getElementById('main').getElementsByClassName('select').length;
        if (select_num > 2) {
          this.classList.toggle('select');
          return false;
        } else if (select_num == 2 || select_num == 1) {
          updateResult();
        } else if (select_num == 0) { //タイプの選択がすべて解除されたとき
          resetResult();
        } else {
          alert("Something wrong. Programming Error");
        }
      })
    });
  });
}

