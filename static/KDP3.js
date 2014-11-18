var salesData;
var count = 0;
var ASINs = [];
var interval = undefined;

function getASINs() {
  $('#obr_books option').each(function(index) {
		salesData[$(this).val()] = {
			title: $(this).text()
		};
	});
	delete salesData.all;
	ASINs = Object.keys(salesData)
	fillData();
	$('head').append('<link rel="stylesheet" href="http://throwiethetowel.github.io/slabText/js/jquery.slabtext.js">');
	$('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">');
	$('#reportInfoArea').append("<hr><hr><div><center><span id=\"count\"></span></center></div>");
	$('#reportInfoArea').append("<div></span> USD"><span class="slabtext">For one night only</span> <span class="slabtext">Jackie Mittoo</span> <span class="slabtext">with special Studio One guests</span> <span class="slabtext">Dillinger <span class="amp">&amp;</span> Lone Ranger</span></h1></div>")
	$('#reportInfoArea').append("<table id=\"sales\" class=\"table table-striped\"><thead><th>Title</th><th>USD</th><th>Sales+Borrows</th><th>Sales</th><th>Borrows</th></thead><tbody class=\"data\"></tbody></table>");
	$('#reportHolder').append("<pre id=\"redSales\">|Title|USD|Sales+Borrows|Sales|Borrows|<br>|:-|:-:|:-:|:-:|:-:|<br></pre>")
}

function fillData() {
	var custID = init.toString().substr(init.toString().indexOf("customerID")+14).split('"')[0];
	var ASIN = ASINs[count];
	$.ajax({
		url: "https://kdp.amazon.com/reports/data",
		data: {
			customerID: init.toString().substr(init.toString().indexOf("customerID")+14).split('"')[0],
			sessionID: "sessionK",
			type: "OBR",
			marketplaces: "all",
			asins: ASIN,
			startDate: new Date(new Date() - 0*24*60*60*1000).getFullYear() + "-" + (new Date(new Date() - 0*24*60*60*1000).getMonth() + 1) + "-" + new Date(new Date() - 0*24*60*60*1000).getDate(),
			endDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
		},
		success: function(data) {
			data = JSON.parse(data);
			salesData[ASIN].info = data;
			count += 1;
			console.log(count + "/" + ASINs.length);
			$("#count").html(count + "/" + ASINs.length);
			if (count < ASINs.length) {
				fillData();
			} else {
				$("#count").attr("style", "display:none");
				count = 0;
				if (interval === undefined) {
					interval = setInterval(fillData, 600000);
				}
				report();
			}
		},
		error: function(err) {
			console.log("Error: " + err);
		}
	});
}

function go() {
	if (ASINs.length !== 0) {
		report();
	} else {
		salesData = {};
		getASINs();
	}
}

function sum(arr) {
	if (arr !== undefined) {
		result = 0;
		for (var x = 0; x < arr.length; x += 1) {
			result += arr[x];
		}
		return result;
	} else {
		return 0;
	}
}

function report() {
	$('.data').html("");
	$('#redSales').html("|Title|USD|Sales+Borrows|Sales|Borrows|<br>|:-|:-:|:-:|:-:|:-:|<br>");
	var totBor = 0;
	var totSal = 0;
	var totalDollas = 0;
	var totalSales = 0;
	var totalBorrows = 0;
	ASINs = ASINs.sort(function(a,b) {
		 var aBorrows = sum(salesData[a].info.borrowData);
		 var bBorrows = sum(salesData[b].info.borrowData);
		if (aaDataToUSD(salesData[a].info.aaData, aBorrows) > aaDataToUSD(salesData[b].info.aaData, bBorrows)) {
			return -1;
		} else {
			return 1;
		};
	})
	for (var x = 0; x < ASINs.length; x += 1) {
		xASIN = ASINs[x]
		xTitle = salesData[ASINs[x]].title;
		xBorrows = sum(salesData[ASINs[x]].info.borrowData)
		xOrders = sum(salesData[ASINs[x]].info.orderData)
		dollars = aaDataToUSD(salesData[ASINs[x]].info.aaData, xBorrows);
		console.log(salesData[ASINs[x]].title + ": " + (sum(salesData[ASINs[x]].info.orderData)+sum(salesData[ASINs[x]].info.borrowData)));
		var tableRow = "<tr>";
		tableRow += "<td><a href=\"http://amazon.com/dp/"+ASINs[x]+"\">"+salesData[ASINs[x]].title+"</a></td>";
		tableRow += "<td>$"+dollars.toFixed(2)+"</td>";
		tableRow += "<td>"+(xOrders + xBorrows)+"</td>";
		tableRow += "<td>"+xOrders+"</td>";
		tableRow += "<td>"+xBorrows+"</td>";
		tableRow += "</tr>";
		var redTableRow = "|";
		redTableRow += "["+salesData[ASINs[x]].title+"](http://amazon.com/dp/" + ASINs[x] + ")|";
		redTableRow += "$" + dollars.toFixed(2) + "|";
		redTableRow += (xOrders + xBorrows) + "|";
		redTableRow += xOrders + "|";
		redTableRow += xBorrows + "|<br>";
		if (dollars > 0) {
			$('.data').append(tableRow);
			$('#redSales').append(redTableRow);
		}
		totalSales += xOrders;
		totalBorrows += xBorrows;
		totalDollas += dollars;
	}
	$('.totals').show();
	$('#dollas').html(totalDollas.toFixed(2));
	$('#totalSales').html(totalSales);
	$('#totalBorrows').html(totalBorrows);
}

function aaDataToCAD(aaData, borrowCount) {
	return aaDataToUSD(aaData, borrowCount)*1.12;
}

function aaDataToGBP(aaData, borrowCount) {
	return aaDataToUSD(aaData, borrowCount)*0.62;
}

function aaDataToUSD(aaData, borrowCount) {
	dollars = 0;
	for (var y = 0; y < aaData.length; y += 1) {
		switch (aaData[y][2]) {
			case "USD":
				dollars += Number(aaData[y][1]);
				break;
			case "GBP":
				dollars += Number(aaData[y][1])*1.6;
				break;
			case "EUR":
				dollars += Number(aaData[y][1])*1.25;
				break;
			case "JPY":
				dollars += Number(aaData[y][1])*0.0088;
				break;
			case "INR":
				dollars += Number(aaData[y][1])*0.016;
				break;
			case "CAD":
				dollars += Number(aaData[y][1])*0.88;
				break;
			case "BRL":
				dollars += Number(aaData[y][1])*0.4;
				break;
			case "MXN":
				dollars += Number(aaData[y][1])*0.074;
				break;
			case "AUD":
				dollars += Number(aaData[y][1])*0.87;
				break;
		}
	}
	dollars += 1.33*borrowCount;
	return dollars;
}

go();
