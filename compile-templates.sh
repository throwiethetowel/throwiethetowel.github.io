#!/bin/sh
handlebars widget.tmpl -f static/widgetTemplate.js
handlebars index.tmpl -f static/indexTemplate.js

cat static/widgetTemplate.js static/indexTemplate.js > static/templates.js
