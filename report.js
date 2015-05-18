var database = {};
var dateInfo = {};
var ASINs = [];
var daysAgo = 0;
var ctx;
var ctx2;
var max = 90;
var currentReport = {
	ago: 0,
	count: 14,
	books: ASINs,
	currency: "USD",
	borrowRate: 1.355
}
var loading = 0;
$('#loading').css('display', 'none');
var options = {};
var frequency = 300000;

function start() {
	//adds ASINs and titles to database, ASINs to array
	//gets ball rolling
	var theOptions = $('#obr_books option');
	for (var x = 1; x < theOptions.length; x += 1) {
		ASINs.push($(theOptions[x]).val());
  		database[$(theOptions[x]).val()] = {
			title: $(theOptions[x]).text(),
			color: randomColor(),
			hasAuthor: false
		};
	}
	Chart.defaults.global.scaleBeginAtZero = true;
	Chart.defaults.global.scaleStartValue = 0;
	Chart.defaults.global.animation = false;
	Chart.defaults.global.responsive = true;
	addHTML();
	fetchSave();
	updateSelect();
	checkForAuthors(0);
	makeCalls(0);
	setInterval(function(){
		if (loading === 0) {
			makeCalls(0);
		}
	}, frequency);
}

function makeCalls(ago) {
	var calls = ASINs.map(function(ASIN) {
		return getInfo(ASIN, daysAgoToDate(ago));
	});	
	$.when.apply($, calls).done(function(){
		if (dateInfo[ago]) {
			report();
		} else {
			if (daysAgo !== 0) {
				dateInfo[daysAgoToDate(daysAgo)] = true;
			}
			if (daysAgo <= max) {
				daysAgo += 1;
				makeCalls(daysAgo);
			} else {
				$('#main').show();
				$('#initialize').hide();
				report();
			}
			save();
		}
	});
}

function addHTML() {
	$('html').html('<head> <title>Reports</title> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <style>.multiselect-container{position:absolute;list-style-type:none;margin:0;padding:0}.multiselect-container .input-group{margin:5px}.multiselect-container>li{padding:0}.multiselect-container>li>a.multiselect-all label{font-weight:700}.multiselect-container>li.multiselect-group label{margin:0;padding:3px 20px 3px 20px;height:100%;font-weight:700}.multiselect-container>li.multiselect-group-clickable label{cursor:pointer}.multiselect-container>li>a{padding:0}.multiselect-container>li>a>label{margin:0;height:100%;cursor:pointer;font-weight:400;padding:3px 20px 3px 40px}.multiselect-container>li>a>label.radio,.multiselect-container>li>a>label.checkbox{margin:0}.multiselect-container>li>a>label>input[type=checkbox]{margin-bottom:5px}.btn-group>.btn-group:nth-child(2)>.multiselect.btn{border-top-left-radius:4px;border-bottom-left-radius:4px}.form-inline .multiselect-container label.checkbox,.form-inline .multiselect-container label.radio{padding:3px 20px 3px 40px}.form-inline .multiselect-container li a label.checkbox input[type=checkbox],.form-inline .multiselect-container li a label.radio input[type=radio]{margin-left:-20px;margin-right:0} html { font-size: 14px; } #borrowRate { padding-right: 5px; } .jumbotron { background: none; border-bottom: 1px solid lightgray; } #loading { display: none; position: absolute; padding: 14px; -webkit-animation: spin 1000ms infinite linear; animation: spin 1000ms infinite linear; } @-webkit-keyframes spin { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(359deg); transform: rotate(359deg); } } @keyframes spin { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(359deg); transform: rotate(359deg); } } } </style> </head> <body> <span class="glyphicon glyphicon-refresh" id="loading" aria-hidden="true"></span> <div id="container"> <div id="main"> <div class="row"> <div class="jumboHolder col-md-6 col-md-offset-3"> <div class="jumbotron"> <center> <h1><span class="dollars"></span></h1> <p>Earned so far today.</p> </center> </div> </div> </div> <div class="row"> <div class="col-md-6 col-md-offset-3 form-inline"> <select class="form-control" id="range"> <option value="today">Today</option> <option value="week">Seven days</option> <option value="fortnight" selected>Two weeks</option> <option value="month">This month</option> <option value="lastmonth">Last month</option> <option value="ninety">90 days</option> </select> <select id="selectASINs" multiple="multiple"> </select> | <select class="form-control" id="currency"> <option value="USD" selected>USD</option> <option value="CAD">CAD</option> <option value="GBP">GBP</option> <option value="EUR">EUR</option> <option value="AUD">AUD</option> </select> <input type="number" title="Estimated borrow rate." id="borrowRate" class="form-control" value="1.41" min="0.00" step="0.01" max="2.50"> </div> <div class="col-md-6 col-md-offset-3"> <div id="lineHolder"> <h2>Earnings per day</h2> <canvas id="lineChart" width="960" height="400"></canvas> </div> </div> <div class="col-md-6 col-md-offset-3"> <div id="pieHolder"> <h2>Earnings per book</h2> <canvas id="pieChart" width="960" height="400"></canvas> </div> </div> <div class="col-md-6 col-md-offset-3"> <div id="tableHolder"></div> </div> </div> </div> </div> <div class="row"> <div class="col-md-6 col-md-offset-3"> <div id="initialize" style="display:none;"> <h1>Loading all your data.</h1><span id="number">0</span> pieces of information found. <br> <div class="progress"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div> </div> <br> <br> <p>This should only happen on your first use. If the number gets stuck, or the spinner disappears, reload the page and try again. You won\'t lose any data.</p> </div> </div> </div> </body>');
	for (var x = 0; x < ASINs.length; x += 1) {
		$('#selectASINs').append('<option value="'+ASINs[x]+'" id="select-'+ASINs[x]+'" selected="selected">'+database[ASINs[x]].title+'</option>');
	}
	$('#selectASINs').multiselect({
		maxHeight: 400,
		onChange: function(option, checked, select) {
			if ($('#selectASINs').val() === null) {
				currentReport.books = [];
			} else {
				currentReport.books = $('#selectASINs').val();
			}
			report();
		},
		nonSelectedText: "Select some books!",
		nSelectedText: " books included in report.",
		allSelectedText: "All books included in report.",
		numberDisplayed: 1,
		includeSelectAllOption: true,
		enableFiltering: true,
		enableCaseInsensitiveFiltering: true,
		filterBehavior: "both"
	});
	updateSelect();
	bindEvents();
}

function updateSelect() {
	for (var x = 0; x < ASINs.length; x += 1) {
		if (database[ASINs[x]].hasAuthor === true) {
			$('#select-'+ASINs[x]).html(database[ASINs[x]].title + " by " + database[ASINs[x]].author);
		} else {
			$('#select-'+ASINs[x]).html(database[ASINs[x]].title);
		}
	}
	$('#selectASINs').multiselect("rebuild");
}

function bindEvents() {
	$('#range').off('change').on('change', function(e) {
		$('#lineHolder').show();
		switch ($(this).val()) {
			case "today":
				currentReport.ago = 0;
				currentReport.count = 1;
				$('#lineHolder').hide();
				report();
				break;
			case "week":
				currentReport.ago = 0;
				currentReport.count = 7;
				report();
				break;
			case "fortnight":
				currentReport.ago = 0;
				currentReport.count = 14;
				report();
				break;
			case "month":
				currentReport.ago = 0;
				currentReport.count = new Date().getDate();
				report();
				break;
			case "lastmonth":
				currentReport.ago = new Date().getDate();
				currentReport.count = new Date(new Date().getYear(), new Date().getMonth(), 0).getDate() + new Date().getDate();
				report();
				break;
			case "ninety":
				currentReport.age = 0;
				currentReport.count = 90;
				report();
				break;
		}
	});
	$('#currency').off('change').on('change', function(e) {
		currentReport.currency = $('#currency').val();
		report();
	})
	$('#borrowRate').off('change').on('change', function(e) {
		currentReport.borrowRate = $("#borrowRate").val();
		report();
	});
}

function currencySymbol(curr) {
	switch (curr) {
		case "GBP":
			return 'Â£';
			break;
		case "EUR":
			return 'â‚¬';
			break;
		default:
			return '$';
			break;
	}
}

function getInfo(ASIN, date) {
	if (dateInfo[date] === undefined || database[ASIN][date] === undefined) {
		loading += 1;
		checkLoading();
		return $.ajax({
			url: "https://kdp.amazon.com/reports/data",
			data: {
				customerID: init.toString().substr(init.toString().indexOf("customerID")+14).split('"')[0],
				sessionID: "sessionK",
				type: "OBR",
				marketplaces: "all",
				asins: ASIN,
				startDate: date,
				endDate: date
			}
		}).done(function(data) {
			loading -= 1;
			checkLoading()
			var data = JSON.parse(data);
			database[ASIN][date] = infoParse(data);
			var newNum = parseInt($('#number').html())+4
			$('#number').html(newNum);
			$('.progress-bar').css('width', ((newNum * 100)/(ASINs.length*(max+1)*4)) + "%");
		}).fail(function(err) {
			console.log(err);
			loading -= 1;
			checkLoading()
			return getInfo(ASIN, date);
		});
	} else {
		var newNum = parseInt($('#number').html())+4
		$('#number').html(newNum);
		$('.progress-bar').css('width', ((newNum * 100)/(ASINs.length*(max+1)*4)) + "%");
	}
}

function checkLoading() {
	if (loading === 0) {
		$('#loading').css('display', 'none');
	} else {
		$('#loading').css('display', 'block');
	}
}

function infoParse(info) {
	var parsed = {
		frees: info.freeData[0],
		borrows: info.borrowData[0],
		sales: info.orderData[0],
		royalties: aaToDollars(info.aaData)
	}
	return parsed;
}

function dateRange(little, big, nice) {
	var result = [];
	for (var x = big - 1; x >= little; x -= 1) {
		result.push(daysAgoToDate(x, nice));
	}
	return result;
}

function earnings(books, dates) {
	var x;
	var y;
	var result = 0;
	for (x = 0; x < books.length; x += 1) {
		for (y = 0; y < dates.length; y += 1) {
			var theOne = database[books[x]][dates[y]];
			if (theOne !== undefined) { 
				result += theOne.royalties || 0;
				result += theOne.borrows * dtbr(dates[y]) || 0;
			}
		}
	}
	return fix(result);
}

function fix(num) {
	switch (currentReport.currency) {
		case "CAD":
			num *= 1.26;
			break;
		case "GBP":
			num *= 0.67;
			break
		case "EUR":
			num *= 0.92;
			break;
		case "AUD":
			num *= 0.71;
			break;
	}
	return Math.round(num*100)/100;
}

function downloads(books, dates) {
	var x;
	var y;
	var bor = 0;
	var sal = 0;
	var fre = 0;
	for (x = 0; x < books.length; x += 1) {
		for (y = 0; y < dates.length; y += 1) {
			var theOne = database[books[x]][dates[y]];
			if (theOne !== undefined) { 
				sal += theOne.sales;
				bor += theOne.borrows;
				fre += theOne.frees;
			}
		}
	}
	return [bor, sal, fre];
}

function dailyEarnings(books, dates) {
	var x;
	var y;
	var result = 0;
	var arr = [];
	for (x = 0; x < dates.length; x += 1) {
		result = 0;
		for (y = 0; y < books.length; y += 1) {
			var theOne = database[books[y]][dates[x]];
			if (theOne !== undefined) { 
				result += theOne.royalties || 0;
				result += theOne.borrows * dtbr(dates[x]) || 0;
			}
		}
		arr.push(fix(result));
	}
	return arr;
}

function aaToDollars(aa) {
	royalties = 0;
	for (var y = 0; y < aa.length; y += 1) {
		switch (aa[y][2]) {
			case 'USD':
				royalties += Number(aa[y][1]);
				break;
			case 'GBP':
				royalties += Number(aa[y][1])*1.54;
				break;
			case 'EUR':
				royalties += Number(aa[y][1])*1.14;
				break;
			case 'JPY':
				royalties += Number(aa[y][1])*0.0084;
				break;
			case 'INR':
				royalties += Number(aa[y][1])*0.016;
				break;
			case 'CAD':
				royalties += Number(aa[y][1])*0.80;
				break;
			case 'BRL':
				royalties += Number(aa[y][1])*0.35;
				break;
			case 'MXN':
				royalties += Number(aa[y][1])*0.067;
				break;
			case 'AUD':
				royalties += Number(aa[y][1])*0.78;
				break;
		}
	}
	return fix(royalties);
}

function daysAgoToDate(x, nice) {
	var date = new Date(new Date() - x*24*60*60*1000);
	if (nice) {
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return months[date.getMonth()] + " " + date.getDate();
	} else {
		return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();;
	}
}

function titleEarnings(books, dates, nice) {
	var result = {};
	for (x = 0; x < books.length; x += 1) {
		result[books[x]] = 0;
		for (y = 0; y < dates.length; y += 1) {
			var theOne = database[books[x]][dates[y]];
			if (theOne !== undefined) {
				result[books[x]] += theOne.royalties || 0;
				result[books[x]] += theOne.borrows * dtbr(dates[y]) || 0;
			} else {
				result[books[x]] = 0;
			}
		}
		result[books[x]] = fix(result[books[x]]);
	}
	if (nice) {
		var arr = [];
		for (book in result) {
			arr.push({
				value: result[book],
				label: database[book].title,
				color: database[book].color,
				highlight: database[book].color
			})
		}
		return arr;
	} else {
		return result;
	}
}

function entryToEarnings(one) {
	result = 0;
	result += one.royalties | 0;
	result += one.borrows;
}

function report() {
	save();
	var ago = currentReport.ago;
	var count = currentReport.count;
	var books = currentReport.books;

	books.sort(function compare(a, b) {
		if (earnings([a], dateRange(ago, count)) > earnings([b], dateRange(ago, count))) {
			return -1;
		} else {
			return 1;
		}
	});

	$('#pieHolder').show();
	if (currentReport.books.length === 1) {
		$('#pieHolder').hide();
	}
	$('#lineHolder').show();
	if (currentReport.ago === 0 && currentReport.count === 1) {
		$('#lineHolder').hide();
	}

	$('#lineHolder').html('');
	$('#lineHolder').html('<h2>Earnings per day</h2><canvas id="lineChart" width="960" height="400"></canvas>');
	$('#pieHolder').html('');
	$('#pieHolder').html('<h2>Earnings per book</h2><canvas id="pieChart" width="960" height="400"></canvas>');
	$('#tableHolder').html('<h2>Details</h2><table id="table" class="table table-striped"></table>');

	$('.dollars').html(currencySymbol(currentReport.currency)+earnings(ASINs, dateRange(0, 1)).toFixed(2));
	document.title = currencySymbol(currentReport.currency) + earnings(ASINs, dateRange(0, 1)).toFixed(2) + " earned so far today.";

	ctx = document.getElementById("lineChart").getContext("2d");
	ctx2 = document.getElementById("pieChart").getContext("2d");
	table = $('table#table');
	
	var tr = '<tr>'
	tr += '<th>Title</th>';
	tr += '<th>'+currentReport.currency+'</th>';
	tr += '<th>Downloads</th>';
	tr += '<th>Borrows</th>';
	tr += '<th>Sales</th>';
	tr += '<th>Giveaways</th>';
	tr += "</tr>"
	table.append(tr);

	tr = '<tr>'
	tr += '<td>Total</td>';
	tr += '<td>' + currencySymbol(currentReport.currency) + earnings(books, dateRange(ago, count)).toFixed(2) + '</td>';
	tr += '<td>' + downloads(books, dateRange(ago, count)).reduce(function(pv, cv) { return pv + cv; }, 0) + '</td>';
	tr += '<td>' + downloads(books, dateRange(ago, count))[0] + '</td>';
	tr += '<td>' + downloads(books, dateRange(ago, count))[1] + '</td>';
	tr += '<td>' + downloads(books, dateRange(ago, count))[2] + '</td>';
	tr += "</tr>"
	table.append(tr);


	for (var x = 0; x < books.length; x += 1) {
		if (downloads([books[x]], dateRange(ago, count)).reduce(function(pv, cv) { return pv + cv; }, 0) !== 0) {
			tr = '<tr>'
			tr += '<td><a href="https://www.amazon.com/dp/'+books[x]+'" target="_blank">' + database[books[x]].title + '</a></td>';
			tr += '<td>' + currencySymbol(currentReport.currency) + earnings([books[x]], dateRange(ago, count)).toFixed(2) + '</td>';
			tr += '<td>' + downloads([books[x]], dateRange(ago, count)).reduce(function(pv, cv) { return pv + cv; }, 0) + '</td>';
			tr += '<td>' + downloads([books[x]], dateRange(ago, count))[0] + '</td>';
			tr += '<td>' + downloads([books[x]], dateRange(ago, count))[1] + '</td>';
			tr += '<td>' + downloads([books[x]], dateRange(ago, count))[2] + '</td>';
			tr += "</tr>"
			table.append(tr);
		}
	}

	var lineChart = new Chart(ctx).Line({
		labels: dateRange(ago, count, true),
		datasets: [{
			label: "Dollars",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: dailyEarnings(books, dateRange(ago, count))
		}]
		},{
            pointHitDetectionRadius : 0
		}
	);
	var pieChart = new Chart(ctx2).Pie(
		titleEarnings(books, dateRange(ago, count), true)
	);
}

function save() {
	localStorage["database"] = JSON.stringify(database);
	localStorage["dateInfo"] = JSON.stringify(dateInfo);
	options = {
		currentReport: currentReport,
		range: $('#range').val(),
		selectASINs: $('#selectASINs').val()
	}
	localStorage["options"] = JSON.stringify(options);
}

function checkForAuthors(count) {
	book = ASINs[count];
	if (book !== undefined && database[book].hasAuthor !== true) {
		loading += 1;
		checkLoading();
			$.ajax("https://gentle-mesa-7312.herokuapp.com/api/"+book)
				.done(function(data) {
					loading -= 1;
					checkLoading();
					if (data.error === false) {
						database[book].author = data.author; 
						database[book].hasAuthor = true;
						$('#select-'+book).html(database[book].title + " by " + database[book].author);
						$('#selectASINs').multiselect("rebuild");
						save();
					}
					if (data.code === "RequestThrottled") {
						console.log('waiting...');
						setTimeout(function(){checkForAuthors(count)}, 60000);
					} else {
						setTimeout(function(){checkForAuthors(count + 1)}, 1000);
					}
				}).fail(function(err) {
					console.log(err);
					loading -= 1;
					checkLoading();
					setTimeout(function(){checkForAuthors(count + 1)}, 1000);
				});
	} else if (book !== undefined) {
		checkForAuthors(count + 1);
	}
}

function fetchSave() {
	if (localStorage["dateInfo"] !== undefined) {
		dateInfo = JSON.parse(localStorage["dateInfo"]);
	}
	if (localStorage["options"] !== undefined) {

		options = JSON.parse(localStorage["options"]);
		currentReport = options.currentReport;
		$('#currency').val(options.currentReport.currency);
		$('#borrowRate').val(options.currentReport.borrowRate);
		$('#range').val(options.range);
		$('#selectASINs').multiselect('deselectAll', false);
		for (var x = 0; x < options.currentReport.books.length; x += 1) {
			$('#selectASINs').multiselect('select', options.currentReport.books[x]);
		}
		$('#selectASINs').multiselect('updateButtonText');
	}
	if (localStorage["database"] !== undefined) {
		oldDatabase = JSON.parse(localStorage["database"]);
		for (x in oldDatabase) {
			database[x] = oldDatabase[x];
		}
		if (dateInfo[daysAgoToDate(max)]) {
			report();
		} else {
			$('#initialize').show();
		$('#main').hide();	
		}
	} else {
		$('#initialize').show();
		$('#main').hide();
	}
}

function dtbr(date) {
	switch (date.substr(0, 7)) {
		case '2015-4-':
			return currentReport.borrowRate;
			break;
		case '2015-3-':
			return currentReport.borrowRate;
			break;
		case '2015-2-':
			return 1.41;
			break;
		case '2015-1-':
			return 1.38;
			break;
		case '2014-12':
			return 1.43;
			break;
	}
}








var headTag = document.getElementsByTagName('head')[0];
var jqTag = document.createElement('script');
jqTag.type = 'text/javascript';
$.noConflict(true);
jqTag.src = 'https://throwiethetowel.github.io/scripts.js';
jqTag.onload = start;
headTag.appendChild(jqTag);
