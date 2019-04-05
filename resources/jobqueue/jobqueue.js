( function () {

	// --------- modify below as req'd --------

	// var wiki = "demo";
	var wiki = window.location.href.split( '/' )[ 3 ],
		// var fqdn = "example.com";
		fqdn = window.location.href.split( '/' )[ 2 ],
		refreshSeconds = 10;

	// ----------- no changes below -----------

	$( 'canvas' ).css( {
		'-moz-user-select': 'none',
		'-webkit-user-select': 'none',
		'-ms-user-select': 'none'
	} );

	function getRemainingJobs( callback ) {
		$.get(
			'https://' + fqdn + '/' + wiki + '/api.php?action=query&meta=siteinfo&format=json&siprop=statistics',
			{},
			callback
		);
	}

	$.getScript( 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js', function () {
		$.getScript( 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js', function () {
			getRemainingJobs( function ( mwApiResponse ) {

				var timeFormat = 'HH:mm:ss',
					config = {
						type: 'line',
						data: {
							labels: [
								new Date()
							],
							datasets: [ {
								label: 'Jobs',
								// backgroundColor: window.chartColors.red,
								// borderColor: window.chartColors.red,
								data: [ mwApiResponse.query.statistics.jobs ],
								fill: false
							} ]
						},
						options: {
							responsive: true,
							title: {
								display: true,
								text: 'Jobs Chart'
							},
							tooltips: {
								mode: 'index',
								intersect: false
							},
							hover: {
								mode: 'nearest',
								intersect: true
							},
							scales: {
								xAxes: [ {
									type: 'time',
									time: {
										format: timeFormat,
										// round: 'day'
										tooltipFormat: 'll HH:mm:ss'
									},
									scaleLabel: {
										display: true,
										labelString: 'Date'
									}
								} ],
								yAxes: [ {
								// display: true,
									scaleLabel: {
										display: true,
										labelString: 'Jobs'
									}
								} ]
							}
						}
					},
					ctx = document.getElementById( 'canvas' ).getContext( '2d' );

				window.myLine = new Chart( ctx, config ); // eslint-disable-line no-undef

				setInterval( function () {
					getRemainingJobs( function ( mwApiResponse ) {
						var now = new Date(),
							newData = {
								x: now,
								y: mwApiResponse.query.statistics.jobs
							};
						config.data.labels.push( now );
						// console.log( newData );
						config.data.datasets[ 0 ].data.push( newData );
						window.myLine.update();
					} );
				}, refreshSeconds * 1000 );

			} );
		} );
	} );

}() );
