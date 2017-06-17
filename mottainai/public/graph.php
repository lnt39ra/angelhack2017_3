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
			type: 'bar',
			data: {
				labels: [
					<?php
						$row = 1;
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
					label: 'ゴミグラフ',
					data: [
						//12, 19, 3, 5, 2, 3
						<?php
							$row = 1;
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
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							userCallback: function( tick)
							{
								return tick.toString( ) + "g";
							}
						}
					}]
				}
			}
		});
		</script>
	</body>
</html>
