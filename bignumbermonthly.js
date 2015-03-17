$('head').append('<link rel=\"stylesheet\" type=\"text/css\" href=\"https://throwiethetowel.github.io/bignumbercss.css\">');
$('body').html('<table id=\"td\"><tr><td></td></tr></table>');

var intervalInMinutes = 5;
var borrowRate = 1.406;

function fetch() {
	var custID = init.toString().substr(init.toString().indexOf('customerID')+14).split('\"')[0];
	var today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
	var firstOfMonth = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-1';
	$.ajax({
		url: 'https://kdp.amazon.com/reports/data',
		data: {
			customerID: init.toString().substr(init.toString().indexOf("customerID")+14).split('\"')[0],
			sessionID: "sessionK",
			type: "OBR",
			marketplaces: "all",
			asins: '',
			startDate: firstOfMonth,
			endDate: today
		},
		success: function(data) {
			data = JSON.parse(data);
			var borrows = 0;
			for (var x = 0; x < data.borrowData.length; x += 1) {
			  borrows += data.borrowData[x];
			}
			var dollars = aaDataToUSD(data.aaData, borrows);
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
				dollars += Number(aaData[y][1])*1.48;
				break;
			case 'EUR':
				dollars += Number(aaData[y][1])*1.06;
				break;
			case 'JPY':
				dollars += Number(aaData[y][1])*0.0082;
				break;
			case 'INR':
				dollars += Number(aaData[y][1])*0.016;
				break;
			case 'CAD':
				dollars += Number(aaData[y][1])*0.78;
				break;
			case 'BRL':
				dollars += Number(aaData[y][1])*0.31;
				break;
			case 'MXN':
				dollars += Number(aaData[y][1])*0.065;
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
