const loc = "福井県鯖江市川島町"
const res = await fetch("https://map.yahooapis.jp/geocode/V1/geoCoder?appid=dj00aiZpPXhSanFsWFF0UENiZyZzPWNvbnN1bWVyc2VjcmV0Jng9MzE-&query=" + encodeURI(loc) + "&output=json&results=100");
const data = await res.json();
//if(!data){return 0;}
data.Feature.forEach(r => {
  console.log(r.Name);
});