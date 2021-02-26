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

import {Server} from "./MyServer.js"

const lastuserid = 0;
const ranking = [];                     // ランキングのデータを保持する変数
const fetchNumber = 3;
class body extends Server{

    //schoolNameに学校名を指定、fetchCountに必要なデータ件数を指定
    getRanking(schoolName, userId, fetchCount, queryType){
        /*
            queryType = 1, 2, 3
            queryType 1 : schoolName only
            queryType 2 : userId only
            queryType 3 : both keysto query
        */
        let retObj = [];
        const tmpObj = null;
        switch(queryType){
            case 1:
                tmpObj = ranking.filter(r => r.schoolName == schoolName).sort(sortFunc(a, b));
                break;
            case 2:
                tmpObj = ranking.filter(r => r.userId == userId).sort(sortFunc(a, b));
                break;
            case 3:
                tmpObj = ranking.filter(r => r.schoolName == schoolName && r.userId == userId).sort(sortFunc(a, b));
                break;
            default:
                break;
        }
        for(let i = 0; i < fetchCount; i++){
            if(tmpObj.length > i){retObj.push(tmpObj[i]);}else{retObj.push({schoolName: "", point: 0, userId: ""});}
        }
        return retObj;
    }

    sortFunc(a, b){
        return a.point > b.point ? -1 : 1;
    }

    async api(path, prm){
        let retObj = null;
        let tmpObj = [];
        switch(path.split("/")[2]){
            // テンプレ
            case "":
                break;

            // 起動時ランキング
            case "startup":
                retObj = [];
                tmpObj = tmpObj = ranking.filter(r => r.schoolName == prm.schoolName).sort((a, b) => {
                    return a.point > b.point ? -1 : 1;
                });
                for(let i = 0; i < fetchNumber; i++){
                    if(tmpObj.length > i){retObj.push({schoolName: tmpObj[i].schoolName, point: tmpObj[i].point, userId: tmpObj[i].userId});}
                    else{retObj.push({schoolName: "", point: 0, userId: ""});}
                }
                break;
            
            // タイマーストップ
            case "timerstop":
                const point = (/* なんか適当な処理でポイント計算する */ 0);
                ranking.push({schoolName: prm.schoolName, point: point, userId: prm.userId});
                // retObj = [Number(prm.time), Number(prm.distance), String(prm.schoolName), String(prm.userName)];
                retObj = [];
                tmpObj = ranking.filter(r => r.schoolName == prm.schoolName).sort((a, b) => {
                    return a.point > b.point ? -1 : 1;
                });
                for(let i = 0; i < fetchNumber; i++){
                    if(tmpObj.length > i){retObj.push({schoolName: tmpObj[i].schoolName, point: tmpObj[i].point, userId: tmpObj[i].userId});}
                    else{retObj.push({schoolName: "", point: 0, userId: ""});}
                }
                break;

            // ユーザー登録
            case "adduser":
                lastuserid++;
                retObj = lastuserid;
                break;
            
            // 住所から緯度経度
            case "geocoder":
                const res = await fetch("https://map.yahooapis.jp/geocode/V1/geoCoder?appid=dj00aiZpPXhSanFsWFF0UENiZyZzPWNvbnN1bWVyc2VjcmV0Jng9MzE-&query=" + encodeURI(prm.address) + "&output=json&results=100");
                const data = await res.json();
                retObj = [];
                if(!data){return 0;}
                data.Feature.forEach(r => {
                    const v = r.Geometry.Coordinates.split(",");
                    retObj.push({name: r.Name, lat: v[0], lng: v[1]});
                });
                break;

            // returns error
            default:
                break;
        }
        console.log(retObj);
        return retObj;
    }

}
new body(8001);