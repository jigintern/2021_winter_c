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

const users = [];
const ranking = [];                     // ランキングのデータを保持する変数
const fetchNumber = 3;
class body extends Server{

    api(path, prm){
        let retObj = null;
        switch(path.split("/")[2]){
            // テンプレ
            case "":
                break;

            // 起動時ランキング
            case "startup":
                retObj = getRanking(prm.schoolName, fetchNumber);
                break;
            
            // タイマーストップ
            case "timerstop":
                const point = (/* なんか適当な処理でポイント計算する */ 0);
                ranking.push({schoolName: prm.schoolName, point: point, userName: prm.userName});
                // retObj = [Number(prm.time), Number(prm.distance), String(prm.schoolName), String(prm.userName)];
                retObj = getRanking(prm.schoolName, fetchNumber);
                break;

            // ユーザー登録
            case "adduser":
                break;
            
            // returns error
            default:
                break;
        }
        return retObj;
    }

    //schoolNameに学校名を指定、fetchCountに必要なデータ件数を指定
    getRanking(schoolName, fetchCount){
        // schoolNameをキーにrankingを検索し、pointの降順にfetchCount件取得してreturnする
        let retObj = [];
        const tmpObj = ranking.filter(r => r.schoolName = schoolName).sort( (a, b) => {
            return a.point > b.point ? -1 : 1;
        });
        for(let i = 0; i < fetchCount; i++){
            if(tmpObj.length > i){retObj.push(tmpObj[i]);}else{retObj.push({schoolName: "", point: 0, userName: ""});}
        }
        return retObj;
    }

}
new body(8001);