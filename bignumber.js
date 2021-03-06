$('head').append('<link rel=\"stylesheet\" type=\"text/css\" href=\"https://throwiethetowel.github.io/bignumbercss.css\">');
$('body').html('<table id=\"td\"><tr><td></td></tr></table>');

var intervalInMinutes = 2;
var pageRate = 0.0049566;

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
			var dollars = aaDataToUSD(data.aaData, data.pagesData[0]);
			var str = '$' + Number(dollars).toFixed(2);
      console.log(str);
			$('td').html(str);
		},
		error: function(err) {
			console.log('Error: ' + err);
		}
	});
}

function aaDataToUSD(aaData, pageCount) {
	dollars = 0;
	for (var y = 0; y < aaData.length; y += 1) {
		switch (aaData[y][2]) {
			case 'USD':
				dollars += Number(aaData[y][1]);
				break;
			case 'GBP':
				dollars += Number(aaData[y][1])*1.46;
				break;
			case 'EUR':
				dollars += Number(aaData[y][1])*1.12;
				break;
			case 'JPY':
				dollars += Number(aaData[y][1])*0.0091;
				break;
			case 'INR':
				dollars += Number(aaData[y][1])*0.015;
				break;
			case 'CAD':
				dollars += Number(aaData[y][1])*0.77;
				break;
			case 'BRL':
				dollars += Number(aaData[y][1])*0.28;
				break;
			case 'MXN':
				dollars += Number(aaData[y][1])*0.054;
				break;
			case 'AUD':
				dollars += Number(aaData[y][1])*0.72;
				break;
		}
	}
	dollars += pageRate*pageCount;
	return dollars;
}

function sizeText() {
    
};

fetch();
setInterval(fetch, intervalInMinutes*60*1000); 
