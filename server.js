// server.js
// 2/25 16:06
// author : Mitta Kazuki (santa)

// Todo : タイマー停止時の処理
// Return : ゴールとタイム、ランキングを表示
/*
    How to
    開始点と終了点の時刻？
    ランキング更新
    距離から基礎pt算出

    I need
    開始時、終了時にAPIを呼び出すように記述
    学校情報 - ID？
    DBの形式は？
*/
// gps -> https

import {Server} from "https://js.sabae.cc/Server.js"

const ranking = [];
class body extends Server{
    api(path, prm){
        //
        switch(path.split("/")[2]){
            // テンプレ
            case "":
                break;
            
            // タイマーストップ 
            case "timerstop":
                alert("timer stop");
                break;
            
            // returns error
            default:
                break;
        }
    }
}
new body(8001);