overlay.draw = function () {
	var index = getIndex();	　//選択されている項目を取得

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
		var data = [
			{key:"男", value:point['男'+index], city:point.CITYNAME, town:point.NAME},
			{key:"女", value:point['女'+index], city:point.CITYNAME, town:point.NAME}
		];

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

}
