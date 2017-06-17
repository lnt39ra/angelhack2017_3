<!DOCTYPE html>
<html>
	<head>
		<title>ゴミグラフ</title>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
	</head>
	<body>
		<canvas id="myChart" width="400" height="200"></canvas>
		<script>
		var ctx = document.getElementById("myChart").getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: [
					<?php
						if( ( $handle = fopen( "../data/data.csv", "r")) !== FALSE)
						{
							while( ( $data = fgetcsv($handle, 1000, ",")) !== FALSE)
							{
								echo "\"". substr( $data[ 0], 0, 4) ."年". substr( $data[ 0], 4, 2) ."月". substr( $data[ 0], 6, 2) ."日\", ";
							}
							fclose( $handle);
						}
					?>
				],
				datasets: [{
					label: '廃棄量',
					data: [
						//12, 19, 3, 5, 2, 3
						<?php
							if( ( $handle = fopen( "../data/data.csv", "r")) !== FALSE)
							{
								while( ( $data = fgetcsv($handle, 1000, ",")) !== FALSE)
								{
									echo $data[ 1] .", ";
								}
								fclose( $handle);
							}
						?>
					],
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba( 255, 9, 3, 1)',
					//borderWidth: 1,
					fill: false
				}, {
					label: '平均量',
					data: [
						//12, 19, 3, 5, 2, 3
						<?php
							if( ( $handle = fopen( "../data/data.csv", "r")) !== FALSE)
							{
								while( ( $data = fgetcsv($handle, 1000, ",")) !== FALSE)
								{	// http://www.city.osaka.lg.jp/toshikeikaku/cmsfiles/contents/0000164/164883/15-17-1.xls
									echo "739, ";
								}
								fclose( $handle);
							}
						?>
					],
					backgroundColor: 'rgba( 10, 99, 255, 0.2)',
					borderColor: 'rgba( 10, 99, 255, 1)',
					//borderWidth: 1,
					fill: false
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							userCallback: function( tick)
							{
								return tick.toString( ) +"g";
							}
						}
					}]
				},
				title: {
					display: true,
					text: 'ゴミグラフ'
				}
			}
		});
		</script>
		<h5>出典</h5>
		<div>大阪市オープンデータ</div>
		<div><a href="http://www.city.osaka.lg.jp/shimin/page/0000065430.html">http://www.city.osaka.lg.jp/shimin/page/0000065430.html</a></div>
		<div><a href="http://www.city.osaka.lg.jp/toshikeikaku/cmsfiles/contents/0000164/164883/15-17-1.xls">http://www.city.osaka.lg.jp/toshikeikaku/cmsfiles/contents/0000164/164883/15-17-1.xls</a></div>
	</body>
</html>
