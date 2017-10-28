//ピクセルポジション情報
pointdata.forEach(function(d) {
    var point = googleMapProjection([d['X_CODE'] ,d['Y_CODE']]);//位置情報→ピクセル
    d['xpoint'] = point[0];
    d['ypoint'] = point[1];
});

//前のグラフをすべて削除する
d3.selectAll(".pie").remove()

//データの数だけ円グラフを各
pointdata.forEach(function(point){
    if (+point['男'+index] <= 0 && +point['女'+index] <= 0) return ;  //男女ともに０人の場合は抜ける

    //円グラフ作成用のデータセットを作る
    var data = google.visualization.arrayToDataTable([
      ['City',   'Population', 'Area'],
      ['Rome',      2761477,    1285.31],
      ['Milan',     1324110,    181.76],
      ['Naples',    959574,     117.27],
      ['Turin',     907563,     130.17],
      ['Palermo',   655875,     158.9],
      ['Genoa',     607906,     243.60],
      ['Bologna',   380181,     140.7],
      ['Florence',  371282,     102.41],
      ['Fiumicino', 67370,      213.44],
      ['Anzio',     52192,      43.43],
      ['Ciampino',  38262,      11]
    ]);

    var options = {
        region: 'IT',
        displayMode: 'markers',
        colorAxis: {colors: ['green', 'blue']}
    };
    var chart = new google.visualization.GeoChart(document.getElementById('map-canvas'));
    chart.draw(data, options);
        
    //	円グラフを作成するのに必要な座標計算
    var pie = d3.layout.pie().value(function(d) { return d.value; });
    var arc = d3.svg.arc().outerRadius(15).innerRadius(Math.floor(3));　//パスデータジェネレータ

    var arcsGroup = gunmalayer //Gmap上のsvgレイヤ
        .data([data])
        .append("g")
        .attr("class", "pie")
        .attr("transform", "translate(" + point.xpoint+ "," + point.ypoint + ")")　//円グラフを表示する座標を指定


    //円グラフ(グループ)作成
    var circleGroup = arcsGroup.selectAll(".pie")
       .data(pie)
       .enter()
       .append("svg:g")
       .attr("class", "pie") ;

     //円グラフ path描画
    var circlePaths = circleGroup.append("svg:path")
       .attr("class", "pie")
       .attr({
           fill:function(d){
               if(d.data.key == "男"){
                   return "blue";
               }else{
                   return "red";
               }
           },
           "stroke":"black",
           d: arc
       })

    //マウスオーバーした際に詳細を表示
    circleGroup.append("title")
        .text(function(d){ return d.data.town + " " + d.data.key + "：" +d.data.value + "人" })


})

function draw() {
    getFushoITBudget();
    getFushoAddress();
    handleLoadGoogleMap();
    overlayITBudget();
}

function getFushoITBudget() {
    $.ajax({
        url: "http://www.itdashboard.go.jp/PublicApi/getData.json",
        data: {
            dataset: "Budget",
            field: "organization,sum_budget"
        },
        async: false
    }).done(function(data) {
        $.each(data.raw_data, function(i, item) {
            if (fusho_array[item.organization] === undefined) {
                fusho_array[item.organization] = {
                    "budget": item.sum_budget
                };
            } else {
                fusho_array[item.organization].budget = Number(fusho_array[item.organization].budget) + item.sum_budget;
            }
        });
    });
}

function getFushoAddress() {
    $.each(fusho_array, function(name, object) {
        var geocoding = "http://maps.googleapis.com/maps/api/geocode/json";
        $.ajax({
            url: geocoding,
            data: {
                address: name
            },
            async: false
        }).done(function(data) {
            if (data.results[0] === undefined) {
                console.log(name);
            } else {
                fusho_array[name]["lat"] = data.results[0].geometry.location.lat;
                fusho_array[name]["lng"] = data.results[0].geometry.location.lng;
            }
        });
    });
}

function handleLoadGoogleMap() {
    /*
    var mapOptions = {
        center: new google.maps.LatLng(35.673838, 139.750899),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        disableDefaultUI: true
    };
    mymap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    */
    var latlng = new google.maps.LatLng(34.704, 135.497);
    var MY_MAPTYPE_ID = google.maps.MapTypeId.ROADMAP
    var featureOpts = [{
        "stylers": [
            { "hue": "#339966" },
            { "saturation": -70 }
        ],
        "elementType": "all",
        "featureType": "all"
    }]
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: MY_MAPTYPE_ID,
        mapTypeControl: false,
        disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

    var styledMapOptions = {
        name: 'Pandy Map'
    };
    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

}

function overlayITBudget() {
    $.each(fusho_array, function(name, object) {
        // D3jsでグラフを表示
        if (object.lat !== undefined) {
            var overlay = new google.maps.OverlayView(); //OverLayオブジェクトの作成
            overlay.onAdd = function() {
                //オーバーレイ設定
                var layer = d3.select("#map-canvas").append("div").attr("class", "SvgOverlay");
                var svg = layer.append("svg");

                // 緯度経度をpx座標に変換
                var point = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(object.lat, object.lng));
                overlay.draw = function() {
                    // 予算で棒グラフで表示
                    svg.selectAll(".node")
                        .data([point]).enter()
                        .append("line")
                        .attr("class", "node")
                        .attr("x1", function(d) {
                            return d.x;
                        })
                        .attr("x2", function(d) {
                            return d.x;
                        })
                        .attr("y1", function(d) {
                            return d.y - object.budget / 1000000000;
                        })
                        .attr("y2", function(d) {
                            return d.y;
                        })
                        .style("stroke", "gray")
                        .style("stroke-width", "10px");
                    // 府省名をテキストで表示
                    svg.selectAll("text")
                        .data([point]).enter()
                        .append("text")
                        .attr("x", function(d) {
                            return d.x;
                        })
                        .attr("y", function(d) {
                            return d.y;
                        })
                        .attr("fill", "blue")
                        .attr("font-size", "12px")
                        .text(name);
                }
                overlay.draw();
            }
            overlay.setMap(mymap);
        }
    });
}
