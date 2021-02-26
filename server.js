// server.js
// 2/26 18:00
// author : Santa + Yamatatsu

import {Server} from "./MyServer.js"

const lastuserid = 0;
const ranking = [];                     // ランキングのデータを保持する変数
const fetchNumber = 3;
class body extends Server{

    // tmpObj = ranking.filter(r => r.schoolName == schoolName && r.userId == userId).sort(sortFunc(a, b));
    // for(let i = 0; i < fetchCount; i++){
    //     if(tmpObj.length > i){retObj.push(tmpObj[i]);}else{retObj.push({schoolName: "", point: 0, userId: ""});}
    // }

    async api(path, prm){
        let retObj = null;
        let tmpObj = [];
        switch(path.split("/")[2]){
            // テンプレ
            case "":
                break;

            // 起動時ランキング
            case "startup":
                retObj = ranking.filter(r => r.userId == prm.userId).sort((a, b) => {
                    return a.point > b.point ? -1 : 1;
                })[0];
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
                    retObj.push({name: r.Name, lat: v[1], lng: v[0]});
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