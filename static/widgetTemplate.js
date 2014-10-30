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
})();