// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback /*, initialValue*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
      value = arguments[1];
    } else {
      while (k < len && ! k in t) {
        k++;
      }
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}

(function() {
    var host = "https://throwiethetowel.github.io/static/";
    //host = "http://localhost:5555/";

    var BORROW_RATE = 1.355;
    var EXCHANGE_RATE = {
        "USD": 1,
        "GBP": 1.57,
        "EUR": 1.14,
        "JPY": 0.0083,
        "INR": 0.016,
        "CAD": 0.82,
        "BRL": 0.33,
        "MXN": 0.066,
        "AUD": 0.80
    };

    var customerId = /customerID": "([A-Z0-9]+)"/i.exec(init.toString()).slice(-1)[0];
    var today = new Date();

    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    var firstOfMonth = new Date();
    firstOfMonth.setDate(1);

    var firstOfLastMonth = new Date();
    firstOfLastMonth.setDate(1);
    firstOfLastMonth.setMonth(firstOfLastMonth.getMonth()-1);

    var lastOfLastMonth = new Date();
    lastOfLastMonth.setDate(0);

    var books = $('#obr_books option').slice(1).get().map(function(el) {
        return { asin: $(el).val(), title: $(el).text() };
	});

    initUI();

    $.getScript(host + 'templates.js', function() {
        Handlebars.partials = Handlebars.templates;
        Handlebars.registerHelper('money', function(number) {
            return '$ ' + number.toFixed(2).toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',')
        });

        $('body').append(Handlebars.templates['index.tmpl']({ host: host }));

        renderSalesWidget(books, "today", today, today, 4).then(function() {
        renderSalesWidget(books, "yesterday", yesterday, yesterday, 4).then(function() {
        renderSalesWidget(books, "mtd", firstOfMonth, today, 8).then(function() {
        renderSalesWidget(books, "priormonth", firstOfLastMonth, lastOfLastMonth, 8);
        }); }); });

    });


    var sum = function(a,b) { return a + b; };

    function renderSalesWidget(books, id, start, end, numCovers) {

        var salesPromises = books.map(function(book) {
            return getSales(book, start, end);
        });

        return $.when.apply($, salesPromises).done(function() {

            // copy arguments array to sales array
            var sales = Array.prototype.slice.call(arguments, 0);

            // remove books that have no sales, borrows or revenue
            sales = sales.filter(function(book) {
                return book.revenue != 0 || book.sales != 0 || book.borrows != 0;
            });

            sales.sort(function(a,b) {
                return b.revenue - a.revenue;
            });

            var totalRevenue = sales.map(function(b) { return b.revenue } ).reduce(sum, 0);
            var totalSales = sales.map(function(b) { return b.sales } ).reduce(sum, 0);
            var totalBorrows = sales.map(function(b) { return b.borrows } ).reduce(sum, 0);

            var widgetContainerId = "#" + id + "-widget";
            $(widgetContainerId).empty().append(Handlebars.templates['widget.tmpl']({
                id: id,
                revenue: totalRevenue,
                borrows: totalBorrows,
                sales: totalSales,
                bestsellers: sales.slice(0,numCovers).map(function(book) { return book.asin; } ),
                titles: sales,
            }));
        });
    }

    function getSales(book, start, end) {
        return $.ajax({
            url: "https://kdp.amazon.com/reports/data",
            data: {
                customerID: customerId,
                sessionID: "sessionK",
                type: "OBR",
                marketplaces: "all",
                asins: book.asin,
                startDate: dateToString(start),
                endDate: dateToString(end)
            }
        }).pipe(function(data) {
            data = JSON.parse(data);
            var borrows = data.borrowData.reduce(sum, 0);
            var sales = data.orderData.reduce(sum, 0);
            return {
                asin: book.asin,
                title: book.title,
                borrows: borrows,
                sales: sales,
                revenue: borrows * BORROW_RATE + data.aaData.reduce(function(total, sale) {
                    return total + (Number(sale[1]) * EXCHANGE_RATE[sale[2]]);
                  }, 0)
            };
        });

    }

    function initUI() {
        $('body').empty();
        $('body').append('<script src="' + host + 'js/handlebars.runtime-v2.0.0.js"></script>');
        $('head').append('<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">');
        $('head').append('<link rel="stylesheet" type="text/css" media="screen" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">');

        var css = [ 'css/smartadmin-production.css','css/smartadmin-skins.min.css','css/custom.css', 'css/demo.min.css' ];

        css.forEach(function(sheet) {
            $('head').append('<link rel="stylesheet" type="text/css" media="screen" href="' + host + sheet + '">');
        });
    }

    function dateToString(date) {
        return [date.getFullYear(), date.getMonth()+1, date.getDate()].join("-");
    }
})();
