$('head').append('<link rel=\"stylesheet\" type=\"text/css\" href=\"https://throwiethetowel.github.io/bignumbercss.css\">');
$('body').html('<table id=\"td\"><tr><td></td></tr></table>');

var intervalInMinutes = 5;
var borrowRate = 1.41;

function fetch() {
	var custID = init.toString().substr(init.toString().indexOf('customerID')+14).split('\"')[0];
	var today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
	$.ajax({
		url: 'https://kdp.amazon.com/reports/data',
		data: {
			customerID: init.toString().substr(init.toString().indexOf("customerID")+14).split('\"')[0],
			sessionID: "sessionK",
			type: "OBR",
			marketplaces: "all",
			asins: '',
			startDate: today,
			endDate: today
		},
		success: function(data) {
			data = JSON.parse(data);
			var dollars = aaDataToUSD(data.aaData, data.borrowData[0]);
			var str = '$' + Number(dollars).toFixed(2);
      console.log(str);
			$('td').html(str);
		},
		error: function(err) {
			console.log('Error: ' + err);
		}
	});
}

function aaDataToUSD(aaData, borrowCount) {
	dollars = 0;
	for (var y = 0; y < aaData.length; y += 1) {
		switch (aaData[y][2]) {
			case 'USD':
				dollars += Number(aaData[y][1]);
				break;
			case 'GBP':
				dollars += Number(aaData[y][1])*1.54;
				break;
			case 'EUR':
				dollars += Number(aaData[y][1])*1.14;
				break;
			case 'JPY':
				dollars += Number(aaData[y][1])*0.0084;
				break;
			case 'INR':
				dollars += Number(aaData[y][1])*0.016;
				break;
			case 'CAD':
				dollars += Number(aaData[y][1])*0.80;
				break;
			case 'BRL':
				dollars += Number(aaData[y][1])*0.35;
				break;
			case 'MXN':
				dollars += Number(aaData[y][1])*0.074;
				break;
			case 'AUD':
				dollars += Number(aaData[y][1])*0.76;
				break;
		}
	}
	dollars += borrowRate*borrowCount;
	return dollars;
}

function sizeText() {
    
};

fetch();
setInterval(fetch, intervalInMinutes*60*1000);
