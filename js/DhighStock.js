// JS 代码 
Highcharts.setOptions({
	global: {
		useUTC: false
	}
});
// Create the chart
var ajax2;

function sendTest1() {
	$.ajax({
		type: "get",
		url: "json/test.json",
		async: true,
		dataType: 'json',
		success: function(data) {
			ajax2 = data.test;
		},
		error: function() {
			alert("fail")
		}
	});
}

Highcharts.stockChart('container', {
	chart: {
		events: {
			load: function() {
				// set up the updating of the chart each second
				var series = this.series[0];
				setInterval(function() {
									sendTest1();
					var x = (new Date()).getTime(), // current time
						//									y = Math.round(Math.random() * 100);
						y = parseInt(ajax2);
					series.addPoint([x, y], true, true);
				}, 1000);
			}
		}
	},
	rangeSelector: {
		buttons: [{
			count: 1,
			type: 'minute',
			text: '1M'
		}, {
			count: 5,
			type: 'minute',
			text: '5M'
		}, {
			type: 'all',
			text: 'All'
		}],
		inputEnabled: false,
		selected: 0
	},
	title: {
		text: 'Live random data'
	},
	tooltip: {
		split: false
	},
	exporting: {
		enabled: false
	},
	series: [{
		name: '随机数据',
		data: (function() {
			// generate an array of random data
			var data = [],
				time = (new Date()).getTime(),
				i;
			for(i = -100; i <= 0; i += 1) {
				data.push([
					time + i * 1000,
//					Math.round(Math.random() * 100)
					0
				]);
			}
			return data;
		}())
	}]
});