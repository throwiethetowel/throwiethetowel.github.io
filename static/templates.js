(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['widget.tmpl'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                            <li>\n                                                <a href=\"http://www.amazon.com/dp/"
    + escapeExpression(lambda(depth0, depth0))
    + "\"><img src=\"https://images-na.ssl-images-amazon.com/images/P/"
    + escapeExpression(lambda(depth0, depth0))
    + ".01._SL150_.jpg\" /></a>\n                                            </li>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                                <tr>\n                                                    <td><a href=\"http://www.amazon.com/dp/"
    + escapeExpression(((helper = (helper = helpers.asin || (depth0 != null ? depth0.asin : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"asin","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</a></td>\n                                                    <td nowrap align=\"right\">"
    + escapeExpression(((helpers.money || (depth0 && depth0.money) || helperMissing).call(depth0, (depth0 != null ? depth0.revenue : depth0), {"name":"money","hash":{},"data":data})))
    + "</td>\n                                                    <td nowrap align=\"right\">"
    + escapeExpression(((helper = (helper = helpers.borrows || (depth0 != null ? depth0.borrows : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"borrows","hash":{},"data":data}) : helper)))
    + "</td>\n                                                    <td nowrap align=\"right\">"
    + escapeExpression(((helper = (helper = helpers.sales || (depth0 != null ? depth0.sales : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"sales","hash":{},"data":data}) : helper)))
    + "</td>\n                                                </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "                                        <div class=\"clearfix\">\n                                        <ul id=\"sparks\" class=\"\">\n                                            <li class=\"sparks-info\">\n                                                <h5> Revenue <span>"
    + escapeExpression(((helpers.money || (depth0 && depth0.money) || helperMissing).call(depth0, (depth0 != null ? depth0.revenue : depth0), {"name":"money","hash":{},"data":data})))
    + "</span></h5>\n                                            </li>\n                                            <li class=\"sparks-info\">\n                                                <h5>Borrows<span>"
    + escapeExpression(((helper = (helper = helpers.borrows || (depth0 != null ? depth0.borrows : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"borrows","hash":{},"data":data}) : helper)))
    + "</span></h5>\n                                            </li>\n                                            <li class=\"sparks-info\">\n                                                <h5>Sales<span>"
    + escapeExpression(((helper = (helper = helpers.sales || (depth0 != null ? depth0.sales : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"sales","hash":{},"data":data}) : helper)))
    + "</span></h5>\n                                            </li>\n                                        </ul>\n                                        <ul class=\"bestsellers\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.bestsellers : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                        </ul>\n                                        </div>\n                                        <br class=\"clearfix\"/>\n\n										<div class=\"custom-scroll table-responsive\" style=\"height:290px; overflow-y: scroll;\">\n                                        <table id=\"titles-"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"table table-striped table-bordered table-hover\" width=\"100%\">\n                                            <thead>\n                                                <tr>\n                                                    <th>Title</th>\n                                                    <th>Revenue</th>\n                                                    <th>Borrows</th>\n                                                    <th>Sales</th>\n                                                </tr>\n                                            </thead>\n                                            <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.titles : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                                            </tbody>\n                                        </table>\n                                        </div>\n\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index.tmpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		<header id=\"header\">\r\n			<div id=\"logo-group\">\r\n\r\n				<!-- PLACE YOUR LOGO HERE -->\r\n				<span id=\"logo\"></span>\r\n				<!-- END LOGO PLACEHOLDER -->\r\n            </div>\r\n\r\n			<div class=\"pull-right\">\r\n            <ul class=\"top-nav\">\r\n                <li class=\"active\">\r\n                    <a href=\"#index.html\" title=\"Dashboard\"><i class=\"fa fa-lg fa-fw fa-home\"></i> <span class=\"menu-item-parent\">Dashboard</span></a>\r\n                </li>\r\n\r\n                <li>\r\n                    <a href=https://kdp.amazon.com/\"dashboard\"><i class=\"fa fa-lg fa-fw fa-book\"></i> <span class=\"menu-item-parent\">Books</span></a>\r\n                </li>\r\n\r\n            </ul>\r\n            </div>\r\n\r\n\r\n\r\n			<!-- pulled right: nav area -->\r\n			<div class=\"pull-right\">\r\n\r\n				<!-- input: search field -->\r\n<!--\r\n				<form action=\"#\" class=\"header-search pull-right\">\r\n					<input id=\"search-fld\"  type=\"text\" name=\"param\" placeholder=\"Find a book\" data-autocomplete='[\r\n					\"todo\"]'>\r\n					<button type=\"submit\">\r\n						<i class=\"fa fa-search\"></i>\r\n					</button>\r\n					<a href=\"javascript:void(0);\" id=\"cancel-search-js\" title=\"Cancel Search\"><i class=\"fa fa-times\"></i></a>\r\n				</form>\r\n-->\r\n				<!-- end input: search field -->\r\n\r\n\r\n			</div>\r\n			<!-- end pulled right: nav area -->\r\n\r\n		</header>\r\n		<!-- END HEADER -->\r\n\r\n		<!-- MAIN PANEL -->\r\n		<div id=\"main\" role=\"main\">\r\n\r\n			<!-- MAIN CONTENT -->\r\n			<div id=\"content\">\r\n\r\n                <div class=\"row\">\r\n\r\n                    <article class=\"col-sm-12 col-md-12 col-lg-6\">\r\n\r\n                        <!-- new widget -->\r\n                        <div class=\"jarviswidget\" id=\"wid-id-000\" data-widget-togglebutton=\"false\" data-widget-editbutton=\"false\" data-widget-fullscreenbutton=\"false\" data-widget-colorbutton=\"false\" data-widget-deletebutton=\"false\">\r\n                            <header>\r\n                                <span class=\"widget-icon\"> <i class=\"glyphicon glyphicon-stats txt-color-darken\"></i> </span>\r\n                                <h2>Today</h2>\r\n                            </header>\r\n\r\n								<!-- widget div-->\r\n								<div>\r\n								    <!-- content -->\r\n									<div class=\"widget-body\" id=\"today-widget\">\r\n                                        <img src=\""
    + escapeExpression(((helper = (helper = helpers.host || (depth0 != null ? depth0.host : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"host","hash":{},"data":data}) : helper)))
    + "img/loading.gif\"></img>\r\n									</div>\r\n								    <!-- end content -->\r\n								</div>\r\n                        </div>\r\n                        <!-- end widget -->\r\n                    </article>\r\n\r\n\r\n                    <article class=\"col-sm-12 col-md-12 col-lg-6\">\r\n\r\n                        <!-- new widget -->\r\n                        <div class=\"jarviswidget\" id=\"wid-id-000\" data-widget-togglebutton=\"false\" data-widget-editbutton=\"false\" data-widget-fullscreenbutton=\"false\" data-widget-colorbutton=\"false\" data-widget-deletebutton=\"false\">\r\n                            <header>\r\n                                <span class=\"widget-icon\"> <i class=\"glyphicon glyphicon-stats txt-color-darken\"></i> </span>\r\n                                <h2>Yesterday</h2>\r\n                            </header>\r\n\r\n								<!-- widget div-->\r\n								<div>\r\n								    <!-- content -->\r\n									<div class=\"widget-body\" id=\"yesterday-widget\">\r\n                                        <img src=\""
    + escapeExpression(((helper = (helper = helpers.host || (depth0 != null ? depth0.host : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"host","hash":{},"data":data}) : helper)))
    + "img/loading.gif\"></img>\r\n									</div>\r\n								    <!-- end content -->\r\n								</div>\r\n                        </div>\r\n                        <!-- end widget -->\r\n\r\n                    </article>\r\n\r\n\r\n\r\n                </div>\r\n\r\n                <!-- end row -->\r\n                <div class=\"row\">\r\n                    <article class=\"col-sm-12 col-md-12 col-lg-12\">\r\n\r\n                        <!-- new widget -->\r\n                        <div class=\"jarviswidget\" id=\"wid-id-000\" data-widget-togglebutton=\"false\" data-widget-editbutton=\"false\" data-widget-fullscreenbutton=\"false\" data-widget-colorbutton=\"false\" data-widget-deletebutton=\"false\">\r\n                            <header>\r\n                                <span class=\"widget-icon\"> <i class=\"glyphicon glyphicon-stats txt-color-darken\"></i> </span>\r\n                                <h2>Month To Date</h2>\r\n                            </header>\r\n\r\n								<!-- widget div-->\r\n								<div>\r\n								    <!-- content -->\r\n									<div class=\"widget-body\" id=\"mtd-widget\">\r\n                                        <img src=\""
    + escapeExpression(((helper = (helper = helpers.host || (depth0 != null ? depth0.host : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"host","hash":{},"data":data}) : helper)))
    + "img/loading.gif\"></img>\r\n									</div>\r\n								    <!-- end content -->\r\n\r\n								</div>\r\n\r\n\r\n                        </div>\r\n                        <!-- end widget -->\r\n                    </article>\r\n\r\n                </div>\r\n                <!-- end row -->\r\n\r\n                <!-- end row -->\r\n                <div class=\"row\">\r\n                    <article class=\"col-sm-12 col-md-12 col-lg-12\">\r\n\r\n                        <!-- new widget -->\r\n                        <div class=\"jarviswidget\" id=\"wid-id-000\" data-widget-togglebutton=\"false\" data-widget-editbutton=\"false\" data-widget-fullscreenbutton=\"false\" data-widget-colorbutton=\"false\" data-widget-deletebutton=\"false\">\r\n                            <header>\r\n                                <span class=\"widget-icon\"> <i class=\"glyphicon glyphicon-stats txt-color-darken\"></i> </span>\r\n                                <h2>Prior Month</h2>\r\n                            </header>\r\n\r\n								<!-- widget div-->\r\n								<div>\r\n								    <!-- content -->\r\n									<div class=\"widget-body\" id=\"priormonth-widget\">\r\n                                        <img src=\""
    + escapeExpression(((helper = (helper = helpers.host || (depth0 != null ? depth0.host : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"host","hash":{},"data":data}) : helper)))
    + "img/loading.gif\"></img>\r\n									</div>\r\n								    <!-- end content -->\r\n\r\n								</div>\r\n\r\n\r\n                        </div>\r\n                        <!-- end widget -->\r\n                    </article>\r\n\r\n                </div>\r\n                <!-- end row -->\r\n\r\n\r\n				<div class=\"row\">\r\n					<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\r\n					</div>\r\n				</div>\r\n				<!-- widget grid -->\r\n				<section id=\"widget-grid\" class=\"\">\r\n\r\n					<!-- row -->\r\n					<div class=\"row\">\r\n						<article class=\"col-sm-12\">\r\n\r\n						</article>\r\n					</div>\r\n\r\n					<!-- end row -->\r\n\r\n					<!-- row -->\r\n\r\n					<div class=\"row\">\r\n\r\n						<article class=\"col-sm-12 col-md-12 col-lg-6\">\r\n\r\n						</article>\r\n\r\n						<article class=\"col-sm-12 col-md-12 col-lg-6\">\r\n\r\n\r\n						</article>\r\n\r\n					</div>\r\n\r\n					<!-- end row -->\r\n\r\n				</section>\r\n				<!-- end widget grid -->\r\n\r\n			</div>\r\n			<!-- END MAIN CONTENT -->\r\n\r\n		</div>\r\n		<!-- END MAIN PANEL -->\r\n\r\n		<!-- PAGE FOOTER -->\r\n		<div class=\"page-footer\">\r\n			<div class=\"row\">\r\n				<div class=\"col-xs-12 col-sm-6\">\r\n					<span class=\"txt-color-white\"></span>\r\n				</div>\r\n\r\n				<div class=\"col-xs-6 col-sm-6 text-right hidden-xs\">\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<!-- END PAGE FOOTER -->\r\n\r\n		<!-- JS TOUCH : include this plugin for mobile drag / drop touch events\r\n		<script src=\"js/plugin/jquery-touch/jquery.ui.touch-punch.min.js\"></script> -->\r\n\r\n		<!-- BOOTSTRAP JS -->\r\n        <script src=\"//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js\"></script>\r\n\r\n		<!--[if IE 8]>\r\n\r\n		<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>\r\n\r\n		<![endif]-->\r\n\r\n\r\n\r\n\r\n\r\n";
},"useData":true});
})();
