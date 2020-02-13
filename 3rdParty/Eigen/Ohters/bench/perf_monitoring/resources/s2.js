!function() {
  var a = {};
  a.dev = !1, a.tooltip = a.tooltip || {}, a.utils = a.utils || {},
  a.models = a.models || {}, a.charts = {}, a.logs = {}, a.dom = {},
  "undefined" != typeof module && "undefined" != typeof exports &&
      "undefined" == typeof d3 && (d3 = require("d3")),
  a.dispatch = d3.dispatch("render_start", "render_end"),
  Function.prototype.bind ||
      (Function.prototype.bind =
           function(a) {
             if ("function" != typeof this)
               throw new TypeError(
                   "Function.prototype.bind - what is trying to be bound is not callable");
             var b = Array.prototype.slice.call(arguments, 1), c = this,
                 d = function() {}, e = function() {
                   return c.apply(
                       this instanceof d && a ? this : a,
                       b.concat(Array.prototype.slice.call(arguments)))
                 };
             return d.prototype = this.prototype, e.prototype = new d, e
           }),
  a.dev && (a.dispatch.on("render_start",
                          function(b) { a.logs.startTime = +new Date }),
            a.dispatch.on("render_end",
                          function(b) {
                            a.logs.endTime = +new Date,
                            a.logs.totalTime =
                                a.logs.endTime - a.logs.startTime,
                            a.log("total", a.logs.totalTime)
                          })),
  a.log =
      function() {
    if (a.dev && window.console && console.log && console.log.apply)
      console.log.apply(console, arguments);
    else if (a.dev && window.console && "function" == typeof console.log &&
             Function.prototype.bind) {
      var b = Function.prototype.bind.call(console.log, console);
      b.apply(console, arguments)
    }
    return arguments[arguments.length - 1]
  },
  a.deprecated =
      function(a, b) {
    console && console.warn &&
        console.warn("nvd3 warning: `" + a + "` has been deprecated. ", b || "")
  },
  a.render =
      function(b) {
    b = b || 1, a.render.active = !0, a.dispatch.render_start();
    var c = function() {
      for (var d, e, f = 0; b > f && (e = a.render.queue[f]); f++)
        d = e.generate(), typeof e.callback == typeof Function && e.callback(d);
      a.render.queue.splice(0, f),
          a.render.queue.length
              ? setTimeout(c)
              : (a.dispatch.render_end(), a.render.active = !1)
    };
    setTimeout(c)
  },
  a.render.active = !1, a.render.queue = [],
  a.addGraph =
      function(b) {
    typeof arguments[0] == typeof Function &&
        (b = {generate : arguments[0], callback : arguments[1]}),
        a.render.queue.push(b), a.render.active || a.render()
  },
  "undefined" != typeof module && "undefined" != typeof exports &&
      (module.exports = a),
  "undefined" != typeof window && (window.nv = a),
  a.dom.write = function(
      a) { return void 0 !== window.fastdom ? fastdom.mutate(a) : a() },
  a.dom.read = function(
      a) { return void 0 !== window.fastdom ? fastdom.measure(a) : a() },
  a.interactiveGuideline =
      function() {
    "use strict";
    function b(l) {
      l.each(function(l) {
        function m() {
          var a = d3.mouse(this), d = a[0], e = a[1], h = !0, i = !1;
          if (k && (d = d3.event.offsetX, e = d3.event.offsetY,
                    "svg" !== d3.event.target.tagName && (h = !1),
                    d3.event.target.className.baseVal.match("nv-legend") &&
                        (i = !0)),
              h && (d -= c.left, e -= c.top),
              "mouseout" === d3.event.type || 0 > d || 0 > e || d > o ||
                  e > p ||
                  d3.event.relatedTarget &&
                      void 0 === d3.event.relatedTarget.ownerSVGElement ||
                  i) {
            if (k && d3.event.relatedTarget &&
                void 0 === d3.event.relatedTarget.ownerSVGElement &&
                (void 0 === d3.event.relatedTarget.className ||
                 d3.event.relatedTarget.className.match(
                     j.nvPointerEventsClass)))
              return;
            return g.elementMouseout({mouseX : d, mouseY : e}),
                   b.renderGuideLine(null), void j.hidden(!0)
          }
          j.hidden(!1);
          var l = "function" == typeof f.rangeBands, m = void 0;
          if (l) {
            var n = d3.bisect(f.range(), d) - 1;
            if (!(f.range()[n] + f.rangeBand() >= d))
              return g.elementMouseout({mouseX : d, mouseY : e}),
                     b.renderGuideLine(null), void j.hidden(!0);
            m = f.domain()[d3.bisect(f.range(), d) - 1]
          } else
            m = f.invert(d);
          g.elementMousemove({mouseX : d, mouseY : e, pointXValue : m}),
              "dblclick" === d3.event.type &&
                  g.elementDblclick({mouseX : d, mouseY : e, pointXValue : m}),
              "click" === d3.event.type &&
                  g.elementClick({mouseX : d, mouseY : e, pointXValue : m}),
              "mousedown" === d3.event.type &&
                  g.elementMouseDown({mouseX : d, mouseY : e, pointXValue : m}),
              "mouseup" === d3.event.type &&
                  g.elementMouseUp({mouseX : d, mouseY : e, pointXValue : m})
        }
        var n = d3.select(this), o = d || 960, p = e || 400,
            q = n.selectAll("g.nv-wrap.nv-interactiveLineLayer").data([ l ]),
            r = q.enter().append("g").attr("class",
                                           " nv-wrap nv-interactiveLineLayer");
        r.append("g").attr("class", "nv-interactiveGuideLine"),
            i && (i.on("touchmove", m)
                      .on("mousemove", m, !0)
                      .on("mouseout", m, !0)
                      .on("mousedown", m, !0)
                      .on("mouseup", m, !0)
                      .on("dblclick", m)
                      .on("click", m),
                  b.guideLine = null, b.renderGuideLine = function(c) {
                    h && (b.guideLine && b.guideLine.attr("x1") === c ||
                          a.dom.write(function() {
                            var b =
                                q.select(".nv-interactiveGuideLine")
                                    .selectAll("line")
                                    .data(null != c ? [ a.utils.NaNtoZero(c) ]
                                                    : [],
                                          String);
                            b.enter()
                                .append("line")
                                .attr("class", "nv-guideline")
                                .attr("x1", function(a) { return a })
                                .attr("x2", function(a) { return a })
                                .attr("y1", p)
                                .attr("y2", 0),
                                b.exit().remove()
                          }))
                  })
      })
    }
    var c = {left : 0, top : 0}, d = null, e = null, f = d3.scale.linear(),
        g = d3.dispatch("elementMousemove", "elementMouseout", "elementClick",
                        "elementDblclick", "elementMouseDown",
                        "elementMouseUp"),
        h = !0, i = null, j = a.models.tooltip(), k = window.ActiveXObject;
    return j.duration(0).hideDelay(0).hidden(!1),
           b.dispatch = g, b.tooltip = j,
           b.margin =
               function(a) {
             return arguments.length
                        ? (c.top = "undefined" != typeof a.top ? a.top : c.top,
                           c.left =
                               "undefined" != typeof a.left ? a.left : c.left,
                           b)
                        : c
           },
           b.width = function(a) { return arguments.length ? (d = a, b) : d },
           b.height = function(a) { return arguments.length ? (e = a, b) : e },
           b.xScale = function(a) { return arguments.length ? (f = a, b) : f },
           b.showGuideLine = function(
               a) { return arguments.length ? (h = a, b) : h },
           b.svgContainer = function(
               a) { return arguments.length ? (i = a, b) : i },
           b
  },
  a.interactiveBisect =
      function(a, b, c) {
    "use strict";
    if (!(a instanceof Array))
      return null;
    var d;
    d = "function" != typeof c ? function(a) { return a.x } : c;
    var e = function(a, b) { return d(a) - b }, f = d3.bisector(e).left,
        g = d3.max([ 0, f(a, b) - 1 ]), h = d(a[g]);
    if ("undefined" == typeof h && (h = g), h === b)
      return g;
    var i = d3.min([ g + 1, a.length - 1 ]), j = d(a[i]);
    return "undefined" == typeof j && (j = i),
           Math.abs(j - b) >= Math.abs(h - b) ? g : i
  },
  a.nearestValueIndex =
      function(a, b, c) {
    "use strict";
    var d = 1 / 0, e = null;
    return a.forEach(function(a, f) {
      var g = Math.abs(b - a);
      null != a && d >= g && c > g && (d = g, e = f)
    }),
           e
  },
  a.models.tooltip =
      function() {
    "use strict";
    function b() {
      if (!l || !l.node()) {
        var a = [ 1 ];
        l = d3.select(document.body).selectAll(".nvtooltip").data(a),
        l.enter()
            .append("div")
            .attr("class", "nvtooltip " + (i ? i : "xy-tooltip"))
            .attr("id", d)
            .style("top", 0)
            .style("left", 0)
            .style("opacity", 0)
            .style("position", "fixed")
            .selectAll("div, table, td, tr")
            .classed(q, !0)
            .classed(q, !0),
        l.exit().remove()
      }
    }
    function c() {
      return n && w(e) ? (a.dom.write(function() {
        b();
        var a = u(e);
        a && (l.node().innerHTML = a), y()
      }),
                          c)
                       : void 0
    }
    var d = "nvtooltip-" + Math.floor(1e5 * Math.random()), e = null, f = "w",
        g = 25, h = 0, i = null, j = !0, k = 200, l = null,
        m = {left : null, top : null}, n = !0, o = 100, p = !0,
        q = "nv-pointer-events-none", r = function(a, b) { return a },
        s = function(a) { return a }, t = function(a, b) { return a },
        u = function(a) {
          if (null === a)
            return "";
          var b = d3.select(document.createElement("table"));
          if (p) {
            var c = b.selectAll("thead").data([ a ]).enter().append("thead");
            c.append("tr")
                .append("td")
                .attr("colspan", 3)
                .append("strong")
                .classed("x-value", !0)
                .html(s(a.value))
          }
          var d = b.selectAll("tbody").data([ a ]).enter().append("tbody"),
              e = d.selectAll("tr")
                      .data(function(a) { return a.series })
                      .enter()
                      .append("tr")
                      .classed("highlight", function(a) { return a.highlight });
          e.append("td")
              .classed("legend-color-guide", !0)
              .append("div")
              .style("background-color", function(a) { return a.color }),
              e.append("td")
                  .classed("key", !0)
                  .classed("total", function(a) { return !!a.total })
                  .html(function(a, b) { return t(a.key, b) }),
              e.append("td")
                  .classed("value", !0)
                  .html(function(a, b) { return r(a.value, b) }),
              e.filter(function(a, b) { return void 0 !== a.percent })
                  .append("td")
                  .classed("percent", !0)
                  .html(function(
                      a, b) { return "(" + d3.format("%")(a.percent) + ")" }),
              e.selectAll("td").each(function(a) {
                if (a.highlight) {
                  var b = d3.scale.linear().domain([ 0, 1 ]).range(
                          [ "#fff", a.color ]),
                      c = .6;
                  d3.select(this)
                      .style("border-bottom-color", b(c))
                      .style("border-top-color", b(c))
                }
              });
          var f = b.node().outerHTML;
          return void 0 !== a.footer &&
                     (f += "<div class='footer'>" + a.footer + "</div>"),
                 f
        }, v = function() {
          var a = {
            left : null !== d3.event ? d3.event.clientX : 0,
            top : null !== d3.event ? d3.event.clientY : 0
          };
          if ("none" != getComputedStyle(document.body).transform) {
            var b = document.body.getBoundingClientRect();
            a.left -= b.left, a.top -= b.top
          }
          return a
        }, w = function(b) {
          if (b && b.series) {
            if (a.utils.isArray(b.series))
              return !0;
            if (a.utils.isObject(b.series))
              return b.series = [ b.series ], !0
          }
          return !1
        }, x = function(a) {
          var b, c, d, e = l.node().offsetHeight, h = l.node().offsetWidth,
                       i = document.documentElement.clientWidth,
                       j = document.documentElement.clientHeight;
          switch (f) {
          case "e":
            b = -h - g, c = -(e / 2), a.left + b < 0 && (b = g),
            (d = a.top + c) < 0 && (c -= d),
            (d = a.top + c + e) > j && (c -= d - j);
            break;
          case "w":
            b = g, c = -(e / 2), a.left + b + h > i && (b = -h - g),
            (d = a.top + c) < 0 && (c -= d),
            (d = a.top + c + e) > j && (c -= d - j);
            break;
          case "n":
            b = -(h / 2) - 5, c = g, a.top + c + e > j && (c = -e - g),
            (d = a.left + b) < 0 && (b -= d),
            (d = a.left + b + h) > i && (b -= d - i);
            break;
          case "s":
            b = -(h / 2), c = -e - g, a.top + c < 0 && (c = g),
            (d = a.left + b) < 0 && (b -= d),
            (d = a.left + b + h) > i && (b -= d - i);
            break;
          case "center":
            b = -(h / 2), c = -(e / 2);
            break;
          default:
            b = 0, c = 0
          }
          return { left: b, top: c }
        }, y = function() {
          a.dom.read(function() {
            var a = v(), b = x(a), c = a.left + b.left, d = a.top + b.top;
            if (j)
              l.interrupt().transition().delay(k).duration(0).style("opacity",
                                                                    0);
            else {
              var e = "translate(" + m.left + "px, " + m.top + "px)",
                  f = "translate(" + Math.round(c) + "px, " + Math.round(d) +
                      "px)",
                  g = d3.interpolateString(e, f), h = l.style("opacity") < .1;
              l.interrupt()
                  .transition()
                  .duration(h ? 0 : o)
                  .styleTween("transform", function(a) { return g },
                              "important")
                  .styleTween("-webkit-transform", function(a) { return g })
                  .style("-ms-transform", f)
                  .style("opacity", 1)
            }
            m.left = c, m.top = d
          })
        };
    return c.nvPointerEventsClass = q, c.options = a.utils.optionsFunc.bind(c),
           c._options = Object.create({}, {
             duration :
                 {get : function() { return o }, set : function(a) { o = a }},
             gravity :
                 {get : function() { return f }, set : function(a) { f = a }},
             distance :
                 {get : function() { return g }, set : function(a) { g = a }},
             snapDistance :
                 {get : function() { return h }, set : function(a) { h = a }},
             classes :
                 {get : function() { return i }, set : function(a) { i = a }},
             enabled :
                 {get : function() { return n }, set : function(a) { n = a }},
             hideDelay :
                 {get : function() { return k }, set : function(a) { k = a }},
             contentGenerator :
                 {get : function() { return u }, set : function(a) { u = a }},
             valueFormatter :
                 {get : function() { return r }, set : function(a) { r = a }},
             headerFormatter :
                 {get : function() { return s }, set : function(a) { s = a }},
             keyFormatter :
                 {get : function() { return t }, set : function(a) { t = a }},
             headerEnabled :
                 {get : function() { return p }, set : function(a) { p = a }},
             position :
                 {get : function() { return v }, set : function(a) { v = a }},
             chartContainer : {
               get : function() { return document.body },
               set : function(b) {
                 a.deprecated("chartContainer", "feature removed after 1.8.3")
               }
             },
             fixedTop : {
               get : function() { return null },
               set : function(b) {
                 a.deprecated("fixedTop", "feature removed after 1.8.1")
               }
             },
             offset : {
               get : function() {
                 return { left: 0, top: 0 }
               },
               set : function(b) {
                 a.deprecated("offset", "use chart.tooltip.distance() instead")
               }
             },
             hidden : {
               get : function() { return j },
               set : function(a) { j != a && (j = !!a, c()) }
             },
             data : {
               get : function() { return e },
               set : function(a) {
                 a.point && (a.value = a.point.x, a.series = a.series || {},
                             a.series.value = a.point.y,
                             a.series.color = a.point.color || a.series.color),
                     e = a
               }
             },
             node :
                 {get : function() { return l.node() }, set : function(a) {}},
             id : {get : function() { return d }, set : function(a) {}}
           }),
           a.utils.initOptions(c), c
  },
  a.utils.windowSize =
      function() {
    var a = {width : 640, height : 480};
    return window.innerWidth && window.innerHeight
               ? (a.width = window.innerWidth, a.height = window.innerHeight, a)
               : "CSS1Compat" == document.compatMode &&
                         document.documentElement &&
                         document.documentElement.offsetWidth
                     ? (a.width = document.documentElement.offsetWidth,
                        a.height = document.documentElement.offsetHeight, a)
                     : document.body && document.body.offsetWidth
                           ? (a.width = document.body.offsetWidth,
                              a.height = document.body.offsetHeight, a)
                           : a
  },
  a.utils.isArray = Array.isArray,
  a.utils.isObject = function(a) { return null !== a && "object" == typeof a },
  a.utils.isFunction = function(a) { return "function" == typeof a },
  a.utils.isDate = function(a) { return "[object Date]" === toString.call(a) },
  a.utils.isNumber = function(a) { return !isNaN(a) && "number" == typeof a },
  a.utils.windowResize = function(b) {
    return window.addEventListener
               ? window.addEventListener("resize", b)
               : a.log("ERROR: Failed to bind to window.resize with: ", b),
    {
      callback: b, clear: function() { window.removeEventListener("resize", b) }
    }
  }, a.utils.getColor = function(b) {
    if (void 0 === b)
      return a.utils.defaultColor();
    if (a.utils.isArray(b)) {
      var c = d3.scale.ordinal().range(b);
      return function(a, b) {
        var d = void 0 === b ? a : b;
        return a.color || c(d)
      }
    }
    return b
  }, a.utils.defaultColor = function() {
    return a.utils.getColor(d3.scale.category20().range())
  }, a.utils.customTheme = function(b, c, d) {
    c = c || function(a) { return a.key },
    d = d || d3.scale.category20().range();
    var e = d.length;
    return function(f, g) {
      var h = c(f);
      return a.utils.isFunction(b[h])
                 ? b[h]()
                 : void 0 !== b[h] ? b[h] : (e || (e = d.length), e -= 1, d[e])
    }
  }, a.utils.pjax = function(b, c) {
    var d = function(d) {
      d3.html(d, function(d) {
        var e = d3.select(c).node();
        e.parentNode.replaceChild(d3.select(d).select(c).node(), e),
            a.utils.pjax(b, c)
      })
    };
    d3.selectAll(b).on("click",
                       function() {
                         history.pushState(this.href, this.textContent,
                                           this.href),
                             d(this.href), d3.event.preventDefault()
                       }),
        d3.select(window).on("popstate",
                             function() { d3.event.state && d(d3.event.state) })
  }, a.utils.calcApproxTextWidth = function(b) {
    if (a.utils.isFunction(b.style) && a.utils.isFunction(b.text)) {
      var c = parseInt(b.style("font-size").replace("px", ""), 10),
          d = b.text().length;
      return a.utils.NaNtoZero(d * c * .5)
    }
    return 0
  }, a.utils.NaNtoZero = function(b) {
    return !a.utils.isNumber(b) || isNaN(b) || null === b || b === 1 / 0 ||
                   b === -(1 / 0)
               ? 0
               : b
  }, d3.selection.prototype.watchTransition = function(a) {
    var b = [ this ].concat([].slice.call(arguments, 1));
    return a.transition.apply(a, b)
  }, a.utils.renderWatch = function(b, c) {
    if (!(this instanceof a.utils.renderWatch))
      return new a.utils.renderWatch(b, c);
    var d = void 0 !== c ? c : 250, e = [], f = this;
    this.models =
        function(a) {
      return a = [].slice.call(arguments, 0), a.forEach(function(a) {
        a.__rendered = !1, function(a) {
          a.dispatch.on("renderEnd",
                        function(b) { a.__rendered = !0, f.renderEnd("model") })
        }(a), e.indexOf(a) < 0 && e.push(a)
      }),
             this
    },
    this.reset = function(a) { void 0 !== a && (d = a), e = [] },
    this.transition = function(a, b, c) {
      if (b = arguments.length > 1 ? [].slice.call(arguments, 1) : [],
          c = b.length > 1 ? b.pop() : void 0 !== d ? d : 250,
          a.__rendered = !1, e.indexOf(a) < 0 && e.push(a), 0 === c)
        return a.__rendered = !0, a.delay = function() { return this },
               a.duration = function() { return this }, a;
      0 === a.length
          ? a.__rendered = !0
          : a.every(function(a) { return !a.length }) ? a.__rendered = !0
                                                      : a.__rendered = !1;
      var g = 0;
      return a.transition()
          .duration(c)
          .each(function() { ++g })
          .each("end", function(c, d) {
            0 === --g && (a.__rendered = !0, f.renderEnd.apply(this, b))
          })
    }, this.renderEnd = function() {
      e.every(function(a) { return a.__rendered }) &&
          (e.forEach(function(a) { a.__rendered = !1 }),
           b.renderEnd.apply(this, arguments))
    }
  }, a.utils.deepExtend = function(b) {
    var c = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
    c.forEach(function(c) {
      for (var d in c) {
        var e = a.utils.isArray(b[d]), f = a.utils.isObject(b[d]),
            g = a.utils.isObject(c[d]);
        f && !e && g ? a.utils.deepExtend(b[d], c[d]) : b[d] = c[d]
      }
    })
  }, a.utils.state = function() {
    if (!(this instanceof a.utils.state))
      return new a.utils.state;
    var b = {}, c = function() {}, d = function() {
      return {}
    }, e = null, f = null;
    this.dispatch = d3.dispatch("change", "set"),
    this.dispatch.on("set", function(a) { c(a, !0) }),
    this.getter = function(a) { return d = a, this },
    this.setter = function(a, b) {
      return b || (b = function() {}), c = function(c, d) { a(c), d && b() },
                                       this
    }, this.init = function(b) { e = e || {}, a.utils.deepExtend(e, b) };
    var g = function() {
      var a = d();
      if (JSON.stringify(a) === JSON.stringify(b))
        return !1;
      for (var c in a)
        void 0 === b[c] && (b[c] = {}), b[c] = a[c], f = !0;
      return !0
    };
    this.update = function() {
      e && (c(e, !1), e = null), g.call(this) && this.dispatch.change(b)
    }
  }, a.utils.optionsFunc = function(b) {
    return b && d3.map(b).forEach(function(b, c) {
      a.utils.isFunction(this[b]) && this[b](c)
    }.bind(this)),
           this
  }, a.utils.calcTicksX = function(b, c) {
    var d = 1, e = 0;
    for (e; e < c.length; e += 1) {
      var f = c[e] && c[e].values ? c[e].values.length : 0;
      d = f > d ? f : d
    }
    return a.log("Requested number of ticks: ", b),
           a.log("Calculated max values to be: ", d),
           b = b > d ? b = d - 1 : b, b = 1 > b ? 1 : b, b = Math.floor(b),
           a.log("Calculating tick count as: ", b), b
  }, a.utils.calcTicksY = function(b, c) {
    return a.utils.calcTicksX(b, c)
  }, a.utils.initOption = function(a, b) {
    a._calls && a._calls[b]
        ? a[b] = a._calls[b]
        : (a[b] =
               function(c) {
                 return arguments.length
                            ? (a._overrides[b] = !0, a._options[b] = c, a)
                            : a._options[b]
               },
           a["_" + b] =
               function(c) {
                 return arguments.length
                            ? (a._overrides[b] || (a._options[b] = c), a)
                            : a._options[b]
               })
  }, a.utils.initOptions = function(b) {
    b._overrides = b._overrides || {};
    var c = Object.getOwnPropertyNames(b._options || {}),
        d = Object.getOwnPropertyNames(b._calls || {});
    c = c.concat(d);
    for (var e in c)
      a.utils.initOption(b, c[e])
  }, a.utils.inheritOptionsD3 = function(a, b, c) {
    a._d3options = c.concat(a._d3options || []), c.unshift(b), c.unshift(a),
    d3.rebind.apply(this, c)
  }, a.utils.arrayUnique = function(a) {
    return a.sort().filter(function(b, c) { return !c || b != a[c - 1] })
  }, a.utils.symbolMap = d3.map(), a.utils.symbol = function() {
    function b(b, e) {
      var f = c.call(this, b, e), g = d.call(this, b, e);
      return -1 !== d3.svg.symbolTypes.indexOf(f)
                 ? d3.svg.symbol().type(f).size(g)()
                 : a.utils.symbolMap.get(f)(g)
    }
    var c, d = 64;
    return b.type = function(
               a) { return arguments.length ? (c = d3.functor(a), b) : c },
           b.size = function(
               a) { return arguments.length ? (d = d3.functor(a), b) : d },
           b
  }, a.utils.inheritOptions = function(b, c) {
    var d = Object.getOwnPropertyNames(c._options || {}),
        e = Object.getOwnPropertyNames(c._calls || {}), f = c._inherited || [],
        g = c._d3options || [], h = d.concat(e).concat(f).concat(g);
    h.unshift(c), h.unshift(b), d3.rebind.apply(this, h),
        b._inherited = a.utils.arrayUnique(
            d.concat(e).concat(f).concat(d).concat(b._inherited || [])),
        b._d3options = a.utils.arrayUnique(g.concat(b._d3options || []))
  }, a.utils.initSVG = function(a) {
    a.classed({"nvd3-svg" : !0})
  }, a.utils.sanitizeHeight = function(a, b) {
    return a || parseInt(b.style("height"), 10) || 400
  }, a.utils.sanitizeWidth = function(a, b) {
    return a || parseInt(b.style("width"), 10) || 960
  }, a.utils.availableHeight = function(b, c, d) {
    return Math.max(0, a.utils.sanitizeHeight(b, c) - d.top - d.bottom)
  }, a.utils.availableWidth = function(b, c, d) {
    return Math.max(0, a.utils.sanitizeWidth(b, c) - d.left - d.right)
  }, a.utils.noData = function(b, c) {
    var d = b.options(), e = d.margin(), f = d.noData(),
        g = null == f ? [ "No Data Available." ] : [ f ],
        h = a.utils.availableHeight(null, c, e),
        i = a.utils.availableWidth(null, c, e), j = e.left + i / 2,
        k = e.top + h / 2;
    c.selectAll("g").remove();
    var l = c.selectAll(".nv-noData").data(g);
    l.enter()
        .append("text")
        .attr("class", "nvd3 nv-noData")
        .attr("dy", "-.7em")
        .style("text-anchor", "middle"),
        l.attr("x", j).attr("y", k).text(function(a) { return a })
  }, a.utils.wrapTicks = function(a, b) {
    a.each(function() {
      for (var a,
           c = d3.select(this), d = c.text().split(/\s+/).reverse(), e = [],
           f = 0, g = 1.1, h = c.attr("y"), i = parseFloat(c.attr("dy")),
           j = c.text(null).append("tspan").attr("x", 0).attr("y", h).attr(
               "dy", i + "em");
           a = d.pop();)
        e.push(a), j.text(e.join(" ")),
            j.node().getComputedTextLength() > b &&
                (e.pop(), j.text(e.join(" ")), e = [ a ],
                 j = c.append("tspan")
                         .attr("x", 0)
                         .attr("y", h)
                         .attr("dy", ++f * g + i + "em")
                         .text(a))
    })
  }, a.utils.arrayEquals = function(b, c) {
    if (b === c)
      return !0;
    if (!b || !c)
      return !1;
    if (b.length != c.length)
      return !1;
    for (var d = 0, e = b.length; e > d; d++)
      if (b[d] instanceof Array && c[d] instanceof Array) {
        if (!a.arrayEquals(b[d], c[d]))
          return !1
      } else if (b[d] != c[d])
        return !1;
    return !0
  }, a.models.axis = function() {
    "use strict";
    function b(g) {
      return t.reset(), g.each(function(b) {
        var g = d3.select(this);
        a.utils.initSVG(g);
        var q = g.selectAll("g.nv-wrap.nv-axis").data([ b ]),
            r = q.enter().append("g").attr("class", "nvd3 nv-wrap nv-axis"),
            u = (r.append("g"), q.select("g"));
        null !== n ? c.ticks(n)
                   : ("top" == c.orient() || "bottom" == c.orient()) &&
                         c.ticks(Math.abs(d.range()[1] - d.range()[0]) / 100),
            u.watchTransition(t, "axis").call(c), s = s || c.scale();
        var v = c.tickFormat();
        null == v && (v = s.tickFormat());
        var w = u.selectAll("text.nv-axislabel").data([ h || null ]);
        w.exit().remove(),
            void 0 !== p &&
                u.selectAll("g").select("text").style("font-size", p);
        var x, y, z;
        switch (c.orient()) {
        case "top":
          w.enter().append("text").attr("class", "nv-axislabel"),
              z = 0,
              1 === d.range().length
                  ? z = m ? 2 * d.range()[0] + d.rangeBand() : 0
                  : 2 === d.range().length
                        ? z = m ? d.range()[0] + d.range()[1] + d.rangeBand()
                                : d.range()[1]
                        : d.range().length > 2 &&
                              (z = d.range()[d.range().length - 1] +
                                   (d.range()[1] - d.range()[0])),
              w.attr("text-anchor", "middle").attr("y", 0).attr("x", z / 2),
              i && (y = q.selectAll("g.nv-axisMaxMin").data(d.domain()),
                    y.enter()
                        .append("g")
                        .attr("class",
                              function(a, b) {
                                return [
                                  "nv-axisMaxMin", "nv-axisMaxMin-x",
                                  0 == b ? "nv-axisMin-x" : "nv-axisMax-x"
                                ].join(" ")
                              })
                        .append("text"),
                    y.exit().remove(),
                    y.attr("transform",
                           function(b, c) {
                             return "translate(" + a.utils.NaNtoZero(d(b)) +
                                    ",0)"
                           })
                        .select("text")
                        .attr("dy", "-0.5em")
                        .attr("y", -c.tickPadding())
                        .attr("text-anchor", "middle")
                        .text(function(a, b) {
                          var c = v(a);
                          return ("" + c).match("NaN") ? "" : c
                        }),
                    y.watchTransition(t, "min-max top")
                        .attr("transform", function(b, c) {
                          return "translate(" +
                                 a.utils.NaNtoZero(d.range()[c]) + ",0)"
                        }));
          break;
        case "bottom":
          x = o + 36;
          var A = 30, B = 0, C = u.selectAll("g").select("text"), D = "";
          if (j % 360) {
            C.attr("transform", ""), C.each(function(a, b) {
              var c = this.getBoundingClientRect(), d = c.width;
              B = c.height, d > A && (A = d)
            }),
                D = "rotate(" + j + " 0," + (B / 2 + c.tickPadding()) + ")";
            var E = Math.abs(Math.sin(j * Math.PI / 180));
            x = (E ? E * A : A) + 30,
            C.attr("transform", D)
                .style("text-anchor", j % 360 > 0 ? "start" : "end")
          } else
            l ? C.attr("transform", function(a, b) {
              return "translate(0," + (b % 2 == 0 ? "0" : "12") + ")"
            }) : C.attr("transform", "translate(0,0)");
          w.enter().append("text").attr("class", "nv-axislabel"),
              z = 0,
              1 === d.range().length
                  ? z = m ? 2 * d.range()[0] + d.rangeBand() : 0
                  : 2 === d.range().length
                        ? z = m ? d.range()[0] + d.range()[1] + d.rangeBand()
                                : d.range()[1]
                        : d.range().length > 2 &&
                              (z = d.range()[d.range().length - 1] +
                                   (d.range()[1] - d.range()[0])),
              w.attr("text-anchor", "middle").attr("y", x).attr("x", z / 2),
              i && (y = q.selectAll("g.nv-axisMaxMin").data([
                d.domain()[0], d.domain()[d.domain().length - 1]
              ]),
                    y.enter()
                        .append("g")
                        .attr("class",
                              function(a, b) {
                                return [
                                  "nv-axisMaxMin", "nv-axisMaxMin-x",
                                  0 == b ? "nv-axisMin-x" : "nv-axisMax-x"
                                ].join(" ")
                              })
                        .append("text"),
                    y.exit().remove(),
                    y.attr("transform",
                           function(b, c) {
                             return "translate(" +
                                    a.utils.NaNtoZero(
                                        d(b) + (m ? d.rangeBand() / 2 : 0)) +
                                    ",0)"
                           })
                        .select("text")
                        .attr("dy", ".71em")
                        .attr("y", c.tickPadding())
                        .attr("transform", D)
                        .style("text-anchor",
                               j ? j % 360 > 0 ? "start" : "end" : "middle")
                        .text(function(a, b) {
                          var c = v(a);
                          return ("" + c).match("NaN") ? "" : c
                        }),
                    y.watchTransition(t, "min-max bottom")
                        .attr("transform", function(b, c) {
                          return "translate(" +
                                 a.utils.NaNtoZero(
                                     d(b) + (m ? d.rangeBand() / 2 : 0)) +
                                 ",0)"
                        }));
          break;
        case "right":
          w.enter().append("text").attr("class", "nv-axislabel"),
              w.style("text-anchor", k ? "middle" : "begin")
                  .attr("transform", k ? "rotate(90)" : "")
                  .attr("y", k ? -Math.max(e.right, f) + 12 - (o || 0) : -10)
                  .attr("x", k ? d3.max(d.range()) / 2 : c.tickPadding()),
              i && (y = q.selectAll("g.nv-axisMaxMin").data(d.domain()),
                    y.enter()
                        .append("g")
                        .attr("class",
                              function(a, b) {
                                return [
                                  "nv-axisMaxMin", "nv-axisMaxMin-y",
                                  0 == b ? "nv-axisMin-y" : "nv-axisMax-y"
                                ].join(" ")
                              })
                        .append("text")
                        .style("opacity", 0),
                    y.exit().remove(),
                    y.attr("transform",
                           function(b, c) {
                             return "translate(0," + a.utils.NaNtoZero(d(b)) +
                                    ")"
                           })
                        .select("text")
                        .attr("dy", ".32em")
                        .attr("y", 0)
                        .attr("x", c.tickPadding())
                        .style("text-anchor", "start")
                        .text(function(a, b) {
                          var c = v(a);
                          return ("" + c).match("NaN") ? "" : c
                        }),
                    y.watchTransition(t, "min-max right")
                        .attr("transform",
                              function(b, c) {
                                return "translate(0," +
                                       a.utils.NaNtoZero(d.range()[c]) + ")"
                              })
                        .select("text")
                        .style("opacity", 1));
          break;
        case "left":
          w.enter().append("text").attr("class", "nv-axislabel"),
              w.style("text-anchor", k ? "middle" : "end")
                  .attr("transform", k ? "rotate(-90)" : "")
                  .attr("y", k ? -Math.max(e.left, f) + 25 - (o || 0) : -10)
                  .attr("x", k ? -d3.max(d.range()) / 2 : -c.tickPadding()),
              i && (y = q.selectAll("g.nv-axisMaxMin").data(d.domain()),
                    y.enter()
                        .append("g")
                        .attr("class",
                              function(a, b) {
                                return [
                                  "nv-axisMaxMin", "nv-axisMaxMin-y",
                                  0 == b ? "nv-axisMin-y" : "nv-axisMax-y"
                                ].join(" ")
                              })
                        .append("text")
                        .style("opacity", 0),
                    y.exit().remove(),
                    y.attr("transform",
                           function(b, c) {
                             return "translate(0," + a.utils.NaNtoZero(s(b)) +
                                    ")"
                           })
                        .select("text")
                        .attr("dy", ".32em")
                        .attr("y", 0)
                        .attr("x", -c.tickPadding())
                        .attr("text-anchor", "end")
                        .text(function(a, b) {
                          var c = v(a);
                          return ("" + c).match("NaN") ? "" : c
                        }),
                    y.watchTransition(t, "min-max right")
                        .attr("transform",
                              function(b, c) {
                                return "translate(0," +
                                       a.utils.NaNtoZero(d.range()[c]) + ")"
                              })
                        .select("text")
                        .style("opacity", 1))
        }
        if (w.text(function(a) { return a }),
            !i || "left" !== c.orient() && "right" !== c.orient() ||
                (u.selectAll("g").each(function(a, b) {
                  d3.select(this).select("text").attr("opacity", 1),
                      (d(a) < d.range()[1] + 10 || d(a) > d.range()[0] - 10) &&
                          ((a > 1e-10 || -1e-10 > a) &&
                               d3.select(this).attr("opacity", 0),
                           d3.select(this).select("text").attr("opacity", 0))
                }),
                 d.domain()[0] == d.domain()[1] && 0 == d.domain()[0] &&
                     q.selectAll("g.nv-axisMaxMin")
                         .style("opacity",
                                function(a, b) { return b ? 0 : 1 })),
            i && ("top" === c.orient() || "bottom" === c.orient())) {
          var F = [];
          q.selectAll("g.nv-axisMaxMin").each(function(a, b) {
            try {
              b ? F.push(d(a) - this.getBoundingClientRect().width - 4)
                : F.push(d(a) + this.getBoundingClientRect().width + 4)
            } catch (c) {
              b ? F.push(d(a) - 4) : F.push(d(a) + 4)
            }
          }),
              u.selectAll("g").each(function(a, b) {
                (d(a) < F[0] || d(a) > F[1]) &&
                    (a > 1e-10 || -1e-10 > a
                         ? d3.select(this).remove()
                         : d3.select(this).select("text").remove())
              })
        }
        u.selectAll(".tick")
            .filter(function(a) {
              return !parseFloat(Math.round(1e5 * a) / 1e6) && void 0 !== a
            })
            .classed("zero", !0),
            s = d.copy()
      }),
             t.renderEnd("axis immediate"), b
    }
    var c = d3.svg.axis(), d = d3.scale.linear(),
        e = {top : 0, right : 0, bottom : 0, left : 0}, f = 75, g = 60,
        h = null, i = !0, j = 0, k = !0, l = !1, m = !1, n = null, o = 0,
        p = void 0, q = 250, r = d3.dispatch("renderEnd");
    c.scale(d).orient("bottom").tickFormat(function(a) { return a });
    var s, t = a.utils.renderWatch(r, q);
    return b.axis = c, b.dispatch = r, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             axisLabelDistance :
                 {get : function() { return o }, set : function(a) { o = a }},
             staggerLabels :
                 {get : function() { return l }, set : function(a) { l = a }},
             rotateLabels :
                 {get : function() { return j }, set : function(a) { j = a }},
             rotateYLabel :
                 {get : function() { return k }, set : function(a) { k = a }},
             showMaxMin :
                 {get : function() { return i }, set : function(a) { i = a }},
             axisLabel :
                 {get : function() { return h }, set : function(a) { h = a }},
             height :
                 {get : function() { return g }, set : function(a) { g = a }},
             ticks :
                 {get : function() { return n }, set : function(a) { n = a }},
             width :
                 {get : function() { return f }, set : function(a) { f = a }},
             fontSize :
                 {get : function() { return p }, set : function(a) { p = a }},
             margin : {
               get : function() { return e },
               set : function(a) {
                 e.top = void 0 !== a.top ? a.top : e.top,
                 e.right = void 0 !== a.right ? a.right : e.right,
                 e.bottom = void 0 !== a.bottom ? a.bottom : e.bottom,
                 e.left = void 0 !== a.left ? a.left : e.left
               }
             },
             duration : {
               get : function() { return q },
               set : function(a) { q = a, t.reset(q) }
             },
             scale : {
               get : function() { return d },
               set : function(e) {
                 d = e, c.scale(d), m = "function" == typeof d.rangeBands,
                 a.utils.inheritOptionsD3(
                     b, d, [ "domain", "range", "rangeBand", "rangeBands" ])
               }
             }
           }),
           a.utils.initOptions(b),
           a.utils.inheritOptionsD3(b, c,
                                    [
                                      "orient", "tickValues", "tickSubdivide",
                                      "tickSize", "tickPadding", "tickFormat"
                                    ]),
           a.utils.inheritOptionsD3(
               b, d, [ "domain", "range", "rangeBand", "rangeBands" ]),
           b
  }, a.models.boxPlot = function() {
    "use strict";
    function b(l) {
      return E.reset(), l.each(function(b) {
        var l = j - i.left - i.right, F = k - i.top - i.bottom;
        A = d3.select(this), a.utils.initSVG(A),
        m.domain(c || b.map(function(a, b) { return o(a, b) }))
            .rangeBands(d || [ 0, l ], .1);
        var G = [];
        if (!e) {
          var H, I, J = [];
          b.forEach(function(a, b) {
            var c = p(a), d = r(a), e = s(a), f = t(a), g = v(a);
            g && g.forEach(function(a, b) { J.push(w(a, b, void 0)) }),
                e && J.push(e), c && J.push(c), d && J.push(d), f && J.push(f)
          }),
              H = d3.min(J), I = d3.max(J), G = [ H, I ]
        }
        n.domain(e || G), n.range(f || [ F, 0 ]),
            g = g || m, h = h || n.copy().range([ n(0), n(0) ]);
        var K = A.selectAll("g.nv-wrap").data([ b ]);
        K.enter().append("g").attr("class", "nvd3 nv-wrap");
        K.attr("transform", "translate(" + i.left + "," + i.top + ")");
        var L = K.selectAll(".nv-boxplot").data(function(a) { return a }),
            M = L.enter()
                    .append("g")
                    .style("stroke-opacity", 1e-6)
                    .style("fill-opacity", 1e-6);
        L.attr("class", "nv-boxplot")
            .attr("transform",
                  function(a, b, c) {
                    return "translate(" + (m(o(a, b)) + .05 * m.rangeBand()) +
                           ", 0)"
                  })
            .classed("hover", function(a) { return a.hover }),
            L.watchTransition(E, "nv-boxplot: boxplots")
                .style("stroke-opacity", 1)
                .style("fill-opacity", .75)
                .delay(function(a, c) { return c * C / b.length })
                .attr("transform",
                      function(a, b) {
                        return "translate(" +
                               (m(o(a, b)) + .05 * m.rangeBand()) + ", 0)"
                      }),
            L.exit().remove(), M.each(function(a, b) {
              var c = d3.select(this);
              [s, t].forEach(function(d) {
                if (d(a)) {
                  var e = d === s ? "low" : "high";
                  c.append("line")
                      .style("stroke", u(a) || z(a, b))
                      .attr("class", "nv-boxplot-whisker nv-boxplot-" + e),
                      c.append("line")
                          .style("stroke", u(a) || z(a, b))
                          .attr("class", "nv-boxplot-tick nv-boxplot-" + e)
                }
              })
            });
        var N =
                function() {
          return null === D ? .9 * m.rangeBand()
                            : Math.min(75, .9 * m.rangeBand())
        },
            O = function() { return .45 * m.rangeBand() - N() / 2 },
            P = function() { return .45 * m.rangeBand() + N() / 2 };
        [s, t].forEach(function(a) {
          var b = a === s ? "low" : "high", c = a === s ? p : r;
          L.select("line.nv-boxplot-whisker.nv-boxplot-" + b)
              .watchTransition(E, "nv-boxplot: boxplots")
              .attr("x1", .45 * m.rangeBand())
              .attr("y1", function(b, c) { return n(a(b)) })
              .attr("x2", .45 * m.rangeBand())
              .attr("y2", function(a, b) { return n(c(a)) }),
              L.select("line.nv-boxplot-tick.nv-boxplot-" + b)
                  .watchTransition(E, "nv-boxplot: boxplots")
                  .attr("x1", O)
                  .attr("y1", function(b, c) { return n(a(b)) })
                  .attr("x2", P)
                  .attr("y2", function(b, c) { return n(a(b)) })
        }),
            [ s, t ].forEach(function(a) {
              var b = a === s ? "low" : "high";
              M.selectAll(".nv-boxplot-" + b)
                  .on("mouseover",
                      function(b, c, d) {
                        d3.select(this).classed("hover", !0),
                            B.elementMouseover({
                              series : {key : a(b), color : u(b) || z(b, d)},
                              e : d3.event
                            })
                      })
                  .on("mouseout",
                      function(b, c, d) {
                        d3.select(this).classed("hover", !1),
                            B.elementMouseout({
                              series : {key : a(b), color : u(b) || z(b, d)},
                              e : d3.event
                            })
                      })
                  .on("mousemove",
                      function(a, b) { B.elementMousemove({e : d3.event}) })
            }),
            M.append("rect")
                .attr("class", "nv-boxplot-box")
                .on("mouseover",
                    function(a, b) {
                      d3.select(this).classed("hover", !0), B.elementMouseover({
                        key : o(a),
                        value : o(a),
                        series : [
                          {key : "Q3", value : r(a), color : u(a) || z(a, b)},
                          {key : "Q2", value : q(a), color : u(a) || z(a, b)},
                          {key : "Q1", value : p(a), color : u(a) || z(a, b)}
                        ],
                        data : a,
                        index : b,
                        e : d3.event
                      })
                    })
                .on("mouseout",
                    function(a, b) {
                      d3.select(this).classed("hover", !1), B.elementMouseout({
                        key : o(a),
                        value : o(a),
                        series : [
                          {key : "Q3", value : r(a), color : u(a) || z(a, b)},
                          {key : "Q2", value : q(a), color : u(a) || z(a, b)},
                          {key : "Q1", value : p(a), color : u(a) || z(a, b)}
                        ],
                        data : a,
                        index : b,
                        e : d3.event
                      })
                    })
                .on("mousemove",
                    function(a, b) { B.elementMousemove({e : d3.event}) }),
            L.select("rect.nv-boxplot-box")
                .watchTransition(E, "nv-boxplot: boxes")
                .attr("y", function(a, b) { return n(r(a)) })
                .attr("width", N)
                .attr("x", O)
                .attr(
                    "height",
                    function(a, b) { return Math.abs(n(r(a)) - n(p(a))) || 1 })
                .style("fill", function(a, b) { return u(a) || z(a, b) })
                .style("stroke", function(a, b) { return u(a) || z(a, b) }),
            M.append("line").attr("class", "nv-boxplot-median"),
            L.select("line.nv-boxplot-median")
                .watchTransition(E, "nv-boxplot: boxplots line")
                .attr("x1", O)
                .attr("y1", function(a, b) { return n(q(a)) })
                .attr("x2", P)
                .attr("y2", function(a, b) { return n(q(a)) });
        var Q = L.selectAll(".nv-boxplot-outlier")
                    .data(function(a) { return v(a) || [] });
        Q.enter()
            .append("circle")
            .style("fill", function(a, b, c) { return y(a, b, c) || z(a, c) })
            .style("stroke", function(a, b, c) { return y(a, b, c) || z(a, c) })
            .style("z-index", 9e3)
            .on("mouseover",
                function(a, b, c) {
                  d3.select(this).classed("hover", !0), B.elementMouseover({
                    series : {key : x(a, b, c), color : y(a, b, c) || z(a, c)},
                    e : d3.event
                  })
                })
            .on("mouseout",
                function(a, b, c) {
                  d3.select(this).classed("hover", !1), B.elementMouseout({
                    series : {key : x(a, b, c), color : y(a, b, c) || z(a, c)},
                    e : d3.event
                  })
                })
            .on("mousemove",
                function(a, b) { B.elementMousemove({e : d3.event}) }),
            Q.attr("class", "nv-boxplot-outlier"),
            Q.watchTransition(E, "nv-boxplot: nv-boxplot-outlier")
                .attr("cx", .45 * m.rangeBand())
                .attr("cy", function(a, b, c) { return n(w(a, b, c)) })
                .attr("r", "3"),
            Q.exit().remove(), g = m.copy(), h = n.copy()
      }),
             E.renderEnd("nv-boxplot immediate"), b
    }
    var c, d, e, f, g, h,
        i = {top : 0, right : 0, bottom : 0, left : 0}, j = 960, k = 500,
        l = Math.floor(1e4 * Math.random()), m = d3.scale.ordinal(),
        n = d3.scale.linear(), o = function(a) { return a.label },
        p = function(a) { return a.values.Q1 },
        q = function(a) { return a.values.Q2 },
        r = function(a) { return a.values.Q3 },
        s = function(a) { return a.values.whisker_low },
        t = function(a) { return a.values.whisker_high },
        u = function(a) { return a.color },
        v = function(a) { return a.values.outliers },
        w = function(a, b, c) { return a }, x = function(a, b, c) { return a },
        y = function(a, b, c) { return void 0 }, z = a.utils.defaultColor(),
        A = null,
        B = d3.dispatch("elementMouseover", "elementMouseout",
                        "elementMousemove", "renderEnd"),
        C = 250, D = null, E = a.utils.renderWatch(B, C);
    return b.dispatch = B, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return j }, set : function(a) { j = a }},
             height :
                 {get : function() { return k }, set : function(a) { k = a }},
             maxBoxWidth :
                 {get : function() { return D }, set : function(a) { D = a }},
             x : {get : function() { return o }, set : function(a) { o = a }},
             q1 : {get : function() { return p }, set : function(a) { p = a }},
             q2 : {get : function() { return q }, set : function(a) { q = a }},
             q3 : {get : function() { return r }, set : function(a) { r = a }},
             wl : {get : function() { return s }, set : function(a) { s = a }},
             wh : {get : function() { return t }, set : function(a) { t = a }},
             itemColor :
                 {get : function() { return u }, set : function(a) { u = a }},
             outliers :
                 {get : function() { return v }, set : function(a) { v = a; }},
             outlierValue :
                 {get : function() { return w }, set : function(a) { w = a }},
             outlierLabel :
                 {get : function() { return x }, set : function(a) { x = a }},
             outlierColor :
                 {get : function() { return y }, set : function(a) { y = a }},
             xScale :
                 {get : function() { return m }, set : function(a) { m = a }},
             yScale :
                 {get : function() { return n }, set : function(a) { n = a }},
             xDomain :
                 {get : function() { return c }, set : function(a) { c = a }},
             yDomain :
                 {get : function() { return e }, set : function(a) { e = a }},
             xRange :
                 {get : function() { return d }, set : function(a) { d = a }},
             yRange :
                 {get : function() { return f }, set : function(a) { f = a }},
             id : {get : function() { return l }, set : function(a) { l = a }},
             y : {
               get : function() {
                 return console.warn(
                            "BoxPlot 'y' chart option is deprecated. Please use model overrides instead."),
                 {}
               },
               set : function(a) {
                 console.warn(
                     "BoxPlot 'y' chart option is deprecated. Please use model overrides instead.")
               }
             },
             margin : {
               get : function() { return i },
               set : function(a) {
                 i.top = void 0 !== a.top ? a.top : i.top,
                 i.right = void 0 !== a.right ? a.right : i.right,
                 i.bottom = void 0 !== a.bottom ? a.bottom : i.bottom,
                 i.left = void 0 !== a.left ? a.left : i.left
               }
             },
             color : {
               get : function() { return z },
               set : function(b) { z = a.utils.getColor(b) }
             },
             duration : {
               get : function() { return C },
               set : function(a) { C = a, E.reset(C) }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.boxPlotChart = function() {
    "use strict";
    function b(k) {
      return t.reset(), t.models(e), l && t.models(f), m && t.models(g),
             k.each(function(k) {
               var p = d3.select(this);
               a.utils.initSVG(p);
               var t = (i || parseInt(p.style("width")) || 960) - h.left -
                       h.right,
                   u = (j || parseInt(p.style("height")) || 400) - h.top -
                       h.bottom;
               if (b.update = function() {
                     r.beforeUpdate(), p.transition().duration(s).call(b)
                   }, b.container = this, !k || !k.length) {
                 var v = p.selectAll(".nv-noData").data([ q ]);
                 return v.enter()
                            .append("text")
                            .attr("class", "nvd3 nv-noData")
                            .attr("dy", "-.7em")
                            .style("text-anchor", "middle"),
                        v.attr("x", h.left + t / 2)
                            .attr("y", h.top + u / 2)
                            .text(function(a) { return a }),
                        b
               }
               p.selectAll(".nv-noData").remove(), c = e.xScale(),
                                                   d = e.yScale().clamp(!0);
               var w = p.selectAll("g.nv-wrap.nv-boxPlotWithAxes").data([ k ]),
                   x = w.enter()
                           .append("g")
                           .attr("class", "nvd3 nv-wrap nv-boxPlotWithAxes")
                           .append("g"),
                   y = x.append("defs"), z = w.select("g");
               x.append("g").attr("class", "nv-x nv-axis"),
                   x.append("g")
                       .attr("class", "nv-y nv-axis")
                       .append("g")
                       .attr("class", "nv-zeroLine")
                       .append("line"),
                   x.append("g").attr("class", "nv-barsWrap"),
                   z.attr("transform",
                          "translate(" + h.left + "," + h.top + ")"),
                   n && z.select(".nv-y.nv-axis")
                            .attr("transform", "translate(" + t + ",0)"),
                   e.width(t).height(u);
               var A = z.select(".nv-barsWrap")
                           .datum(k.filter(function(a) { return !a.disabled }));
               if (A.transition().call(e),
                   y.append("clipPath")
                       .attr("id", "nv-x-label-clip-" + e.id())
                       .append("rect"),
                   z.select("#nv-x-label-clip-" + e.id() + " rect")
                       .attr("width", c.rangeBand() * (o ? 2 : 1))
                       .attr("height", 16)
                       .attr("x", -c.rangeBand() / (o ? 1 : 2)),
                   l) {
                 f.scale(c)
                     .ticks(a.utils.calcTicksX(t / 100, k))
                     .tickSize(-u, 0),
                     z.select(".nv-x.nv-axis")
                         .attr("transform",
                               "translate(0," + d.range()[0] + ")"),
                     z.select(".nv-x.nv-axis").call(f);
                 var B = z.select(".nv-x.nv-axis").selectAll("g");
                 o && B.selectAll("text").attr("transform", function(a, b, c) {
                   return "translate(0," + (c % 2 === 0 ? "5" : "17") + ")"
                 })
               }
               m && (g.scale(d).ticks(Math.floor(u / 36)).tickSize(-t, 0),
                     z.select(".nv-y.nv-axis").call(g)),
                   z.select(".nv-zeroLine line")
                       .attr("x1", 0)
                       .attr("x2", t)
                       .attr("y1", d(0))
                       .attr("y2", d(0))
             }),
             t.renderEnd("nv-boxplot chart immediate"), b
    }
    var c, d, e = a.models.boxPlot(), f = a.models.axis(), g = a.models.axis(),
              h = {top : 15, right : 10, bottom : 50, left : 60}, i = null,
              j = null, k = a.utils.getColor(), l = !0, m = !0, n = !1, o = !1,
              p = a.models.tooltip(), q = "No Data Available.",
              r = d3.dispatch("beforeUpdate", "renderEnd"), s = 250;
    f.orient("bottom").showMaxMin(!1).tickFormat(function(a) { return a }),
        g.orient(n ? "right" : "left").tickFormat(d3.format(",.1f")),
        p.duration(0);
    var t = a.utils.renderWatch(r, s);
    return e.dispatch.on("elementMouseover.tooltip",
                         function(a) { p.data(a).hidden(!1) }),
           e.dispatch.on("elementMouseout.tooltip",
                         function(a) { p.data(a).hidden(!0) }),
           e.dispatch.on("elementMousemove.tooltip", function(a) { p() }),
           b.dispatch = r, b.boxplot = e, b.xAxis = f, b.yAxis = g,
           b.tooltip = p, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return i }, set : function(a) { i = a }},
             height :
                 {get : function() { return j }, set : function(a) { j = a }},
             staggerLabels :
                 {get : function() { return o }, set : function(a) { o = a }},
             showXAxis :
                 {get : function() { return l }, set : function(a) { l = a }},
             showYAxis :
                 {get : function() { return m }, set : function(a) { m = a }},
             tooltipContent :
                 {get : function() { return p }, set : function(a) { p = a }},
             noData :
                 {get : function() { return q }, set : function(a) { q = a }},
             margin : {
               get : function() { return h },
               set : function(a) {
                 h.top = void 0 !== a.top ? a.top : h.top,
                 h.right = void 0 !== a.right ? a.right : h.right,
                 h.bottom = void 0 !== a.bottom ? a.bottom : h.bottom,
                 h.left = void 0 !== a.left ? a.left : h.left
               }
             },
             duration : {
               get : function() { return s },
               set : function(a) {
                 s = a, t.reset(s), e.duration(s), f.duration(s), g.duration(s)
               }
             },
             color : {
               get : function() { return k },
               set : function(b) { k = a.utils.getColor(b), e.color(k) }
             },
             rightAlignYAxis : {
               get : function() { return n },
               set : function(a) { n = a, g.orient(a ? "right" : "left") }
             }
           }),
           a.utils.inheritOptions(b, e), a.utils.initOptions(b), b
  }, a.models.bullet = function() {
    "use strict";
    function b(a, b) {
      var c = a.slice();
      a.sort(function(a, d) {
        var e = c.indexOf(a), f = c.indexOf(d);
        return d3.descending(b[e], b[f])
      })
    }
    function c(e) {
      return e.each(function(c, e) {
        var s = p - d.left - d.right, x = q - d.top - d.bottom;
        r = d3.select(this), a.utils.initSVG(r);
        var y = g.call(this, c, e).slice(), z = h.call(this, c, e).slice(),
            A = i.call(this, c, e).slice().sort(d3.descending),
            B = j.call(this, c, e).slice(), C = k.call(this, c, e).slice(),
            D = l.call(this, c, e).slice(), E = m.call(this, c, e).slice(),
            F = n.call(this, c, e).slice();
        b(C, y), b(D, z), b(E, A), b(F, B), y.sort(d3.descending),
            z.sort(d3.descending), B.sort(d3.descending);
        var G = d3.scale.linear()
                    .domain(d3.extent(d3.merge([ o, y ])))
                    .range(f ? [ s, 0 ] : [ 0, s ]);
        this.__chart__ ||
            d3.scale.linear().domain([ 0, 1 / 0 ]).range(G.range());
        this.__chart__ = G;
        for (var H = (d3.min(y), d3.max(y), y[1],
                      r.selectAll("g.nv-wrap.nv-bullet").data([ c ])),
                 I = H.enter().append("g").attr("class",
                                                "nvd3 nv-wrap nv-bullet"),
                 J = I.append("g"), K = H.select("g"), e = 0, L = y.length;
             L > e; e++) {
          var M = "nv-range nv-range" + e;
          2 >= e && (M = M + " nv-range" + w[e]),
              J.append("rect").attr("class", M)
        }
        J.append("rect").attr("class", "nv-measure"),
            H.attr("transform", "translate(" + d.left + "," + d.top + ")");
        for (var N = function(a) { return Math.abs(G(a) - G(0)) },
                 O = function(a) { return G(0 > a ? a : 0) }, e = 0,
                 L = y.length;
             L > e; e++) {
          var P = y[e];
          K.select("rect.nv-range" + e)
              .attr("height", x)
              .attr("width", N(P))
              .attr("x", O(P))
              .datum(P)
        }
        K.select("rect.nv-measure")
            .style("fill", t)
            .attr("height", x / 3)
            .attr("y", x / 3)
            .attr("width", 0 > B ? G(0) - G(B[0]) : G(B[0]) - G(0))
            .attr("x", O(B))
            .on("mouseover",
                function() {
                  u.elementMouseover({
                    value : B[0],
                    label : F[0] || "Current",
                    color : d3.select(this).style("fill")
                  })
                })
            .on("mousemove",
                function() {
                  u.elementMousemove({
                    value : B[0],
                    label : F[0] || "Current",
                    color : d3.select(this).style("fill")
                  })
                })
            .on("mouseout", function() {
              u.elementMouseout({
                value : B[0],
                label : F[0] || "Current",
                color : d3.select(this).style("fill")
              })
            });
        var Q = x / 6, R = z.map(function(a, b) {
          return { value: a, label: D[b] }
        });
        J.selectAll("path.nv-markerTriangle")
            .data(R)
            .enter()
            .append("path")
            .attr("class", "nv-markerTriangle")
            .attr("d",
                  "M0," + Q + "L" + Q + "," + -Q + " " + -Q + "," + -Q + "Z")
            .on("mouseover",
                function(a) {
                  u.elementMouseover({
                    value : a.value,
                    label : a.label || "Previous",
                    color : d3.select(this).style("fill"),
                    pos : [ G(a.value), x / 2 ]
                  })
                })
            .on("mousemove",
                function(a) {
                  u.elementMousemove({
                    value : a.value,
                    label : a.label || "Previous",
                    color : d3.select(this).style("fill")
                  })
                })
            .on("mouseout",
                function(a, b) {
                  u.elementMouseout({
                    value : a.value,
                    label : a.label || "Previous",
                    color : d3.select(this).style("fill")
                  })
                }),
            K.selectAll("path.nv-markerTriangle")
                .data(R)
                .attr("transform", function(a) {
                  return "translate(" + G(a.value) + "," + x / 2 + ")"
                });
        var S = A.map(function(a, b) {
          return { value: a, label: E[b] }
        });
        J.selectAll("path.nv-markerLine")
            .data(S)
            .enter()
            .append("line")
            .attr("cursor", "")
            .attr("class", "nv-markerLine")
            .attr("x1", function(a) { return G(a.value) })
            .attr("y1", "2")
            .attr("x2", function(a) { return G(a.value) })
            .attr("y2", x - 2)
            .on("mouseover",
                function(a) {
                  u.elementMouseover({
                    value : a.value,
                    label : a.label || "Previous",
                    color : d3.select(this).style("fill"),
                    pos : [ G(a.value), x / 2 ]
                  })
                })
            .on("mousemove",
                function(a) {
                  u.elementMousemove({
                    value : a.value,
                    label : a.label || "Previous",
                    color : d3.select(this).style("fill")
                  })
                })
            .on("mouseout",
                function(a, b) {
                  u.elementMouseout({
                    value : a.value,
                    label : a.label || "Previous",
                    color : d3.select(this).style("fill")
                  })
                }),
            K.selectAll("path.nv-markerLines")
                .data(S)
                .attr("transform",
                      function(a) {
                        return "translate(" + G(a.value) + "," + x / 2 + ")"
                      }),
            H.selectAll(".nv-range")
                .on("mouseover",
                    function(a, b) {
                      var c = C[b] || v[b];
                      u.elementMouseover({
                        value : a,
                        label : c,
                        color : d3.select(this).style("fill")
                      })
                    })
                .on("mousemove",
                    function() {
                      u.elementMousemove({
                        value : B[0],
                        label : F[0] || "Previous",
                        color : d3.select(this).style("fill")
                      })
                    })
                .on("mouseout", function(a, b) {
                  var c = C[b] || v[b];
                  u.elementMouseout({
                    value : a,
                    label : c,
                    color : d3.select(this).style("fill")
                  })
                })
      }),
             c
    }
    var d = {top : 0, right : 0, bottom : 0, left : 0}, e = "left", f = !1,
        g = function(a) { return a.ranges },
        h = function(a) { return a.markers ? a.markers : [] },
        i = function(a) { return a.markerLines ? a.markerLines : [ 0 ] },
        j = function(a) { return a.measures },
        k = function(a) { return a.rangeLabels ? a.rangeLabels : [] },
        l = function(a) { return a.markerLabels ? a.markerLabels : [] },
        m = function(a) { return a.markerLineLabels ? a.markerLineLabels : [] },
        n = function(a) { return a.measureLabels ? a.measureLabels : [] },
        o = [ 0 ], p = 380, q = 30, r = null, s = null,
        t = a.utils.getColor([ "#1f77b4" ]),
        u = d3.dispatch("elementMouseover", "elementMouseout",
                        "elementMousemove"),
        v = [ "Maximum", "Mean", "Minimum" ], w = [ "Max", "Avg", "Min" ];
    return c.dispatch = u, c.options = a.utils.optionsFunc.bind(c),
           c._options = Object.create({}, {
             ranges :
                 {get : function() { return g }, set : function(a) { g = a }},
             markers :
                 {get : function() { return h }, set : function(a) { h = a }},
             measures :
                 {get : function() { return j }, set : function(a) { j = a }},
             forceX :
                 {get : function() { return o }, set : function(a) { o = a }},
             width :
                 {get : function() { return p }, set : function(a) { p = a }},
             height :
                 {get : function() { return q }, set : function(a) { q = a }},
             tickFormat :
                 {get : function() { return s }, set : function(a) { s = a }},
             margin : {
               get : function() { return d },
               set : function(a) {
                 d.top = void 0 !== a.top ? a.top : d.top,
                 d.right = void 0 !== a.right ? a.right : d.right,
                 d.bottom = void 0 !== a.bottom ? a.bottom : d.bottom,
                 d.left = void 0 !== a.left ? a.left : d.left
               }
             },
             orient : {
               get : function() { return e },
               set : function(a) { e = a, f = "right" == e || "bottom" == e }
             },
             color : {
               get : function() { return t },
               set : function(b) { t = a.utils.getColor(b) }
             }
           }),
           a.utils.initOptions(c), c
  }, a.models.bulletChart = function() {
    "use strict";
    function b(d) {
      return d.each(function(e, o) {
        var p = d3.select(this);
        a.utils.initSVG(p);
        var q = a.utils.availableWidth(k, p, g), r = l - g.top - g.bottom;
        if (b.update = function() { b(d) }, b.container = this,
            !e || !h.call(this, e, o))
          return a.utils.noData(b, p), b;
        p.selectAll(".nv-noData").remove();
        var s = h.call(this, e, o).slice().sort(d3.descending),
            t = i.call(this, e, o).slice().sort(d3.descending),
            u = j.call(this, e, o).slice().sort(d3.descending),
            v = p.selectAll("g.nv-wrap.nv-bulletChart").data([ e ]),
            w = v.enter().append("g").attr("class",
                                           "nvd3 nv-wrap nv-bulletChart"),
            x = w.append("g"), y = v.select("g");
        x.append("g").attr("class", "nv-bulletWrap"),
            x.append("g").attr("class", "nv-titles"),
            v.attr("transform", "translate(" + g.left + "," + g.top + ")");
        var z = d3.scale.linear()
                    .domain([ 0, Math.max(s[0], t[0] || 0, u[0]) ])
                    .range(f ? [ q, 0 ] : [ 0, q ]),
            A = this.__chart__ ||
                d3.scale.linear().domain([ 0, 1 / 0 ]).range(z.range());
        this.__chart__ = z;
        var B = x.select(".nv-titles")
                    .append("g")
                    .attr("text-anchor", "end")
                    .attr("transform",
                          "translate(-6," + (l - g.top - g.bottom) / 2 + ")");
        B.append("text")
            .attr("class", "nv-title")
            .text(function(a) { return a.title }),
            B.append("text")
                .attr("class", "nv-subtitle")
                .attr("dy", "1em")
                .text(function(a) { return a.subtitle }),
            c.width(q).height(r);
        var C = y.select(".nv-bulletWrap");
        d3.transition(C).call(c);
        var D = m || z.tickFormat(q / 100),
            E = y.selectAll("g.nv-tick")
                    .data(z.ticks(n ? n : q / 50),
                          function(a) { return this.textContent || D(a) }),
            F = E.enter()
                    .append("g")
                    .attr("class", "nv-tick")
                    .attr("transform",
                          function(a) { return "translate(" + A(a) + ",0)" })
                    .style("opacity", 1e-6);
        F.append("line").attr("y1", r).attr("y2", 7 * r / 6),
            F.append("text")
                .attr("text-anchor", "middle")
                .attr("dy", "1em")
                .attr("y", 7 * r / 6)
                .text(D);
        var G = d3.transition(E)
                    .attr("transform",
                          function(a) { return "translate(" + z(a) + ",0)" })
                    .style("opacity", 1);
        G.select("line").attr("y1", r).attr("y2", 7 * r / 6),
            G.select("text").attr("y", 7 * r / 6),
            d3.transition(E.exit())
                .attr("transform",
                      function(a) { return "translate(" + z(a) + ",0)" })
                .style("opacity", 1e-6)
                .remove()
      }),
             d3.timer.flush(), b
    }
    var c = a.models.bullet(), d = a.models.tooltip(), e = "left", f = !1,
        g = {top : 5, right : 40, bottom : 20, left : 120},
        h = function(a) { return a.ranges },
        i = function(a) { return a.markers ? a.markers : [] },
        j = function(a) { return a.measures }, k = null, l = 55, m = null,
        n = null, o = null, p = d3.dispatch();
    return d.duration(0).headerEnabled(!1),
           c.dispatch.on(
               "elementMouseover.tooltip",
               function(a) {
                 a.series = {key : a.label, value : a.value, color : a.color},
                 d.data(a).hidden(!1)
               }),
           c.dispatch.on("elementMouseout.tooltip",
                         function(a) { d.hidden(!0) }),
           c.dispatch.on("elementMousemove.tooltip", function(a) { d() }),
           b.bullet = c, b.dispatch = p, b.tooltip = d,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             ranges :
                 {get : function() { return h }, set : function(a) { h = a }},
             markers :
                 {get : function() { return i }, set : function(a) { i = a }},
             measures :
                 {get : function() { return j }, set : function(a) { j = a }},
             width :
                 {get : function() { return k }, set : function(a) { k = a }},
             height :
                 {get : function() { return l }, set : function(a) { l = a }},
             tickFormat :
                 {get : function() { return m }, set : function(a) { m = a }},
             ticks :
                 {get : function() { return n }, set : function(a) { n = a }},
             noData :
                 {get : function() { return o }, set : function(a) { o = a }},
             margin : {
               get : function() { return g },
               set : function(a) {
                 g.top = void 0 !== a.top ? a.top : g.top,
                 g.right = void 0 !== a.right ? a.right : g.right,
                 g.bottom = void 0 !== a.bottom ? a.bottom : g.bottom,
                 g.left = void 0 !== a.left ? a.left : g.left
               }
             },
             orient : {
               get : function() { return e },
               set : function(a) { e = a, f = "right" == e || "bottom" == e }
             }
           }),
           a.utils.inheritOptions(b, c), a.utils.initOptions(b), b
  }, a.models.candlestickBar = function() {
    "use strict";
    function b(x) {
      return x.each(function(b) {
        c = d3.select(this);
        var x = a.utils.availableWidth(i, c, h),
            y = a.utils.availableHeight(j, c, h);
        a.utils.initSVG(c);
        var A = x / b[0].values.length * .45;
        l.domain(d || d3.extent(b[0].values.map(n).concat(t))),
            v ? l.range(f ||
                        [
                          .5 * x / b[0].values.length,
                          x * (b[0].values.length - .5) / b[0].values.length
                        ])
              : l.range(f || [ 5 + A / 2, x - A / 2 - 5 ]),
            m.domain(e ||
                     [
                       d3.min(b[0].values.map(s).concat(u)),
                       d3.max(b[0].values.map(r).concat(u))
                     ])
                .range(g || [ y, 0 ]),
            l.domain()[0] === l.domain()[1] &&
                (l.domain()[0] ? l.domain([
                  l.domain()[0] - .01 * l.domain()[0],
                  l.domain()[1] + .01 * l.domain()[1]
                ])
                               : l.domain([ -1, 1 ])),
            m.domain()[0] === m.domain()[1] &&
                (m.domain()[0] ? m.domain([
                  m.domain()[0] + .01 * m.domain()[0],
                  m.domain()[1] - .01 * m.domain()[1]
                ])
                               : m.domain([ -1, 1 ]));
        var B = d3.select(this).selectAll("g.nv-wrap.nv-candlestickBar").data([
          b[0].values
        ]),
            C = B.enter().append("g").attr("class",
                                           "nvd3 nv-wrap nv-candlestickBar"),
            D = C.append("defs"), E = C.append("g"), F = B.select("g");
        E.append("g").attr("class", "nv-ticks"),
            B.attr("transform", "translate(" + h.left + "," + h.top + ")"),
            c.on("click",
                 function(a, b) {
                   z.chartClick({data : a, index : b, pos : d3.event, id : k})
                 }),
            D.append("clipPath")
                .attr("id", "nv-chart-clip-path-" + k)
                .append("rect"),
            B.select("#nv-chart-clip-path-" + k + " rect")
                .attr("width", x)
                .attr("height", y),
            F.attr("clip-path", w ? "url(#nv-chart-clip-path-" + k + ")" : "");
        var G = B.select(".nv-ticks")
                    .selectAll(".nv-tick")
                    .data(function(a) { return a });
        G.exit().remove();
        var H = G.enter().append("g");
        G.attr("class", function(a, b, c) {
          return (p(a, b) > q(a, b) ? "nv-tick negative" : "nv-tick positive") +
                 " nv-tick-" + c + "-" + b
        });
        H.append("line")
            .attr("class", "nv-candlestick-lines")
            .attr("transform",
                  function(a, b) { return "translate(" + l(n(a, b)) + ",0)" })
            .attr("x1", 0)
            .attr("y1", function(a, b) { return m(r(a, b)) })
            .attr("x2", 0)
            .attr("y2", function(a, b) { return m(s(a, b)) }),
            H.append("rect")
                .attr("class", "nv-candlestick-rects nv-bars")
                .attr("transform",
                      function(a, b) {
                        return "translate(" + (l(n(a, b)) - A / 2) + "," +
                               (m(o(a, b)) - (p(a, b) > q(a, b)
                                                  ? m(q(a, b)) - m(p(a, b))
                                                  : 0)) +
                               ")"
                      })
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", A)
                .attr("height", function(a, b) {
                  var c = p(a, b), d = q(a, b);
                  return c > d ? m(d) - m(c) : m(c) - m(d)
                });
        G.select(".nv-candlestick-lines")
            .transition()
            .attr("transform",
                  function(a, b) { return "translate(" + l(n(a, b)) + ",0)" })
            .attr("x1", 0)
            .attr("y1", function(a, b) { return m(r(a, b)) })
            .attr("x2", 0)
            .attr("y2", function(a, b) { return m(s(a, b)) }),
            G.select(".nv-candlestick-rects")
                .transition()
                .attr("transform",
                      function(a, b) {
                        return "translate(" + (l(n(a, b)) - A / 2) + "," +
                               (m(o(a, b)) - (p(a, b) > q(a, b)
                                                  ? m(q(a, b)) - m(p(a, b))
                                                  : 0)) +
                               ")"
                      })
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", A)
                .attr("height", function(a, b) {
                  var c = p(a, b), d = q(a, b);
                  return c > d ? m(d) - m(c) : m(c) - m(d)
                })
      }),
             b
    }
    var c, d, e, f, g,
        h = {top : 0, right : 0, bottom : 0, left : 0}, i = null, j = null,
        k = Math.floor(1e4 * Math.random()), l = d3.scale.linear(),
        m = d3.scale.linear(), n = function(a) { return a.x },
        o = function(a) { return a.y }, p = function(a) { return a.open },
        q = function(a) { return a.close }, r = function(a) { return a.high },
        s = function(a) { return a.low }, t = [], u = [], v = !1, w = !0,
        x = a.utils.defaultColor(), y = !1,
        z = d3.dispatch("stateChange", "changeState", "renderEnd", "chartClick",
                        "elementClick", "elementDblClick", "elementMouseover",
                        "elementMouseout", "elementMousemove");
    return b.highlightPoint =
               function(a, d) {
      b.clearHighlights(),
          c.select(".nv-candlestickBar .nv-tick-0-" + a).classed("hover", d)
    },
           b.clearHighlights =
               function() {
             c.select(".nv-candlestickBar .nv-tick.hover").classed("hover", !1)
           },
           b.dispatch = z, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return i }, set : function(a) { i = a }},
             height :
                 {get : function() { return j }, set : function(a) { j = a }},
             xScale :
                 {get : function() { return l }, set : function(a) { l = a }},
             yScale :
                 {get : function() { return m }, set : function(a) { m = a }},
             xDomain :
                 {get : function() { return d }, set : function(a) { d = a }},
             yDomain :
                 {get : function() { return e }, set : function(a) { e = a }},
             xRange :
                 {get : function() { return f }, set : function(a) { f = a }},
             yRange :
                 {get : function() { return g }, set : function(a) { g = a }},
             forceX :
                 {get : function() { return t }, set : function(a) { t = a }},
             forceY :
                 {get : function() { return u }, set : function(a) { u = a }},
             padData :
                 {get : function() { return v }, set : function(a) { v = a }},
             clipEdge :
                 {get : function() { return w }, set : function(a) { w = a }},
             id : {get : function() { return k }, set : function(a) { k = a }},
             interactive :
                 {get : function() { return y }, set : function(a) { y = a }},
             x : {get : function() { return n }, set : function(a) { n = a }},
             y : {get : function() { return o }, set : function(a) { o = a }},
             open :
                 {get : function() { return p() }, set : function(a) { p = a }},
             close :
                 {get : function() { return q() }, set : function(a) { q = a }},
             high :
                 {get : function() { return r }, set : function(a) { r = a }},
             low : {get : function() { return s }, set : function(a) { s = a }},
             margin : {
               get : function() { return h },
               set : function(a) {
                 h.top = void 0 != a.top ? a.top : h.top,
                 h.right = void 0 != a.right ? a.right : h.right,
                 h.bottom = void 0 != a.bottom ? a.bottom : h.bottom,
                 h.left = void 0 != a.left ? a.left : h.left
               }
             },
             color : {
               get : function() { return x },
               set : function(b) { x = a.utils.getColor(b) }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.cumulativeLineChart = function() {
    "use strict";
    function b(l) {
      return H.reset(), H.models(f), r && H.models(g), s && H.models(h),
             l.each(function(l) {
               function A(a, c) {
                 d3.select(b.container).style("cursor", "ew-resize")
               }
               function E(a, b) {
                 G.x = d3.event.x, G.i = Math.round(F.invert(G.x)), K()
               }
               function H(a, c) {
                 d3.select(b.container).style("cursor", "auto"),
                     y.index = G.i, C.stateChange(y)
               }
               function K() {
                 aa.data([ G ]);
                 var a = b.duration();
                 b.duration(0), b.update(), b.duration(a)
               }
               var L = d3.select(this);
               a.utils.initSVG(L), L.classed("nv-chart-" + x, !0);
               var M = a.utils.availableWidth(o, L, m),
                   N = a.utils.availableHeight(p, L, m);
               if (b.update =
                       function() {
                         0 === D ? L.call(b)
                                 : L.transition().duration(D).call(b)
                       },
                   b.container = this,
                   y.setter(J(l), b.update).getter(I(l)).update(),
                   y.disabled = l.map(function(a) { return !!a.disabled }),
                   !z) {
                 var O;
                 z = {};
                 for (O in y)
                   y[O] instanceof Array ? z[O] = y[O].slice(0) : z[O] = y[O]
               }
               var P = d3.behavior.drag()
                           .on("dragstart", A)
                           .on("drag", E)
                           .on("dragend", H);
               if (!(l && l.length &&
                     l.filter(function(a) { return a.values.length }).length))
                 return a.utils.noData(b, L), b;
               if (L.selectAll(".nv-noData").remove(), d = f.xScale(),
                   e = f.yScale(), w)
                 f.yDomain(null);
               else {
                 var Q = l.filter(function(a) { return !a.disabled })
                             .map(function(a, b) {
                               var c = d3.extent(a.values, f.y());
                               return c[0] < -.95 && (c[0] = -.95), [
                                 (c[0] - c[1]) / (1 + c[1]),
                                 (c[1] - c[0]) / (1 + c[0])
                               ]
                             }),
                     R = [
                       d3.min(Q, function(a) { return a[0] }),
                       d3.max(Q, function(a) { return a[1] })
                     ];
                 f.yDomain(R)
               }
               F.domain([ 0, l[0].values.length - 1 ])
                   .range([ 0, M ])
                   .clamp(!0);
               var l = c(G.i, l), S = v ? "none" : "all",
                   T = L.selectAll("g.nv-wrap.nv-cumulativeLine").data([ l ]),
                   U = T.enter()
                           .append("g")
                           .attr("class", "nvd3 nv-wrap nv-cumulativeLine")
                           .append("g"),
                   V = T.select("g");
               if (U.append("g").attr("class", "nv-interactive"),
                   U.append("g")
                       .attr("class", "nv-x nv-axis")
                       .style("pointer-events", "none"),
                   U.append("g").attr("class", "nv-y nv-axis"),
                   U.append("g").attr("class", "nv-background"),
                   U.append("g")
                       .attr("class", "nv-linesWrap")
                       .style("pointer-events", S),
                   U.append("g")
                       .attr("class", "nv-avgLinesWrap")
                       .style("pointer-events", "none"),
                   U.append("g").attr("class", "nv-legendWrap"),
                   U.append("g").attr("class", "nv-controlsWrap"),
                   q ? (i.width(M), V.select(".nv-legendWrap").datum(l).call(i),
                        i.height() > m.top &&
                            (m.top = i.height(),
                             N = a.utils.availableHeight(p, L, m)),
                        V.select(".nv-legendWrap")
                            .attr("transform", "translate(0," + -m.top + ")"))
                     : V.select(".nv-legendWrap").selectAll("*").remove(),
                   u) {
                 var W = [ {key : "Re-scale y-axis", disabled : !w} ];
                 j.width(140)
                     .color([ "#444", "#444", "#444" ])
                     .rightAlign(!1)
                     .margin({top : 5, right : 0, bottom : 5, left : 20}),
                     V.select(".nv-controlsWrap")
                         .datum(W)
                         .attr("transform", "translate(0," + -m.top + ")")
                         .call(j)
               } else
                 V.select(".nv-controlsWrap").selectAll("*").remove();
               T.attr("transform", "translate(" + m.left + "," + m.top + ")"),
                   t && V.select(".nv-y.nv-axis")
                            .attr("transform", "translate(" + M + ",0)");
               var X = l.filter(function(a) { return a.tempDisabled });
               T.select(".tempDisabled").remove(),
                   X.length &&
                       T.append("text")
                           .attr("class", "tempDisabled")
                           .attr("x", M / 2)
                           .attr("y", "-.71em")
                           .style("text-anchor", "end")
                           .text(
                               X.map(function(a) { return a.key }).join(", ") +
                               " values cannot be calculated for this time period."),
                   v && (k.width(M)
                             .height(N)
                             .margin({left : m.left, top : m.top})
                             .svgContainer(L)
                             .xScale(d),
                         T.select(".nv-interactive").call(k)),
                   U.select(".nv-background").append("rect"),
                   V.select(".nv-background rect")
                       .attr("width", M)
                       .attr("height", N),
                   f.y(function(a) { return a.display.y })
                       .width(M)
                       .height(N)
                       .color(
                           l.map(function(a, b) { return a.color || n(a, b) })
                               .filter(function(a, b) {
                                 return !l[b].disabled && !l[b].tempDisabled
                               }));
               var Y = V.select(".nv-linesWrap").datum(l.filter(function(a) {
                 return !a.disabled && !a.tempDisabled
               }));
               Y.call(f), l.forEach(function(a, b) { a.seriesIndex = b });
               var Z = l.filter(function(a) { return !a.disabled && !!B(a) }),
                   $ = V.select(".nv-avgLinesWrap")
                           .selectAll("line")
                           .data(Z, function(a) { return a.key }),
                   _ = function(a) {
                     var b = e(B(a));
                     return 0 > b ? 0 : b > N ? N : b
                   };
               $.enter()
                   .append("line")
                   .style("stroke-width", 2)
                   .style("stroke-dasharray", "10,10")
                   .style("stroke",
                          function(a, b) { return f.color()(a, a.seriesIndex) })
                   .attr("x1", 0)
                   .attr("x2", M)
                   .attr("y1", _)
                   .attr("y2", _),
                   $.style("stroke-opacity",
                           function(a) {
                             var b = e(B(a));
                             return 0 > b || b > N ? 0 : 1
                           })
                       .attr("x1", 0)
                       .attr("x2", M)
                       .attr("y1", _)
                       .attr("y2", _),
                   $.exit().remove();
               var aa = Y.selectAll(".nv-indexLine").data([ G ]);
               aa.enter()
                   .append("rect")
                   .attr("class", "nv-indexLine")
                   .attr("width", 3)
                   .attr("x", -2)
                   .attr("fill", "red")
                   .attr("fill-opacity", .5)
                   .style("pointer-events", "all")
                   .call(P),
                   aa.attr("transform",
                           function(a) { return "translate(" + F(a.i) + ",0)" })
                       .attr("height", N),
                   r && (g.scale(d)
                             ._ticks(a.utils.calcTicksX(M / 70, l))
                             .tickSize(-N, 0),
                         V.select(".nv-x.nv-axis")
                             .attr("transform",
                                   "translate(0," + e.range()[0] + ")"),
                         V.select(".nv-x.nv-axis").call(g)),
                   s && (h.scale(e)
                             ._ticks(a.utils.calcTicksY(N / 36, l))
                             .tickSize(-M, 0),
                         V.select(".nv-y.nv-axis").call(h)),
                   V.select(".nv-background rect").on("click", function() {
                     G.x = d3.mouse(this)[0], G.i = Math.round(F.invert(G.x)),
                     y.index = G.i, C.stateChange(y), K()
                   }), f.dispatch.on("elementClick", function(a) {
                     G.i = a.pointIndex, G.x = F(G.i), y.index = G.i,
                     C.stateChange(y), K()
                   }), j.dispatch.on("legendClick", function(a, c) {
                     a.disabled = !a.disabled, w = !a.disabled, y.rescaleY = w,
                     C.stateChange(y), b.update()
                   }), i.dispatch.on("stateChange", function(a) {
                     for (var c in a)
                       y[c] = a[c];
                     C.stateChange(y), b.update()
                   }), k.dispatch.on("elementMousemove", function(c) {
                     f.clearHighlights();
                     var d, e, i, j = [];
                     if (l.filter(function(a, b) {
                            return a.seriesIndex = b, !a.disabled
                          }).forEach(function(g, h) {
                           e = a.interactiveBisect(g.values, c.pointXValue,
                                                   b.x()),
                           f.highlightPoint(h, e, !0);
                           var k = g.values[e];
                           "undefined" != typeof k &&
                               ("undefined" == typeof d && (d = k),
                                "undefined" == typeof i &&
                                    (i = b.xScale()(b.x()(k, e))),
                                j.push({
                                  key : g.key,
                                  value : b.y()(k, e),
                                  color : n(g, g.seriesIndex)
                                }))
                         }),
                         j.length > 2) {
                       var m = b.yScale().invert(c.mouseY),
                           o = Math.abs(b.yScale().domain()[0] -
                                        b.yScale().domain()[1]),
                           p = .03 * o,
                           q = a.nearestValueIndex(
                               j.map(function(a) { return a.value }), m, p);
                       null !== q && (j[q].highlight = !0)
                     }
                     var r = g.tickFormat()(b.x()(d, e), e);
                     k.tooltip
                         .valueFormatter(function(
                             a, b) { return h.tickFormat()(a) })
                         .data({value : r, series : j})(),
                         k.renderGuideLine(i)
                   }), k.dispatch.on("elementMouseout", function(a) {
                     f.clearHighlights()
                   }), C.on("changeState", function(a) {
                     "undefined" != typeof a.disabled &&
                         (l.forEach(function(b,
                                             c) { b.disabled = a.disabled[c] }),
                          y.disabled = a.disabled),
                         "undefined" != typeof a.index &&
                             (G.i = a.index, G.x = F(G.i), y.index = a.index,
                              aa.data([ G ])),
                         "undefined" != typeof a.rescaleY && (w = a.rescaleY),
                         b.update()
                   })
             }),
             H.renderEnd("cumulativeLineChart immediate"), b
    }
    function c(a, b) {
      return K || (K = f.y()), b.map(function(b, c) {
        if (!b.values)
          return b;
        var d = b.values[a];
        if (null == d)
          return b;
        var e = K(d, a);
        return -.95 > e && !E
                   ? (b.tempDisabled = !0, b)
                   : (b.tempDisabled = !1,
                      b.values = b.values.map(function(a, b) {
                        return a.display = {y : (K(a, b) - e) / (1 + e)}, a
                      }),
                      b)
      })
    }
    var d, e,
        f = a.models.line(), g = a.models.axis(), h = a.models.axis(),
        i = a.models.legend(), j = a.models.legend(),
        k = a.interactiveGuideline(), l = a.models.tooltip(),
        m = {top : 30, right : 30, bottom : 50, left : 60},
        n = a.utils.defaultColor(), o = null, p = null, q = !0, r = !0, s = !0,
        t = !1, u = !0, v = !1, w = !0, x = f.id(), y = a.utils.state(),
        z = null, A = null, B = function(a) { return a.average },
        C = d3.dispatch("stateChange", "changeState", "renderEnd"), D = 250,
        E = !1;
    y.index = 0, y.rescaleY = w, g.orient("bottom").tickPadding(7),
    h.orient(t ? "right" : "left"),
    l.valueFormatter(function(a, b) { return h.tickFormat()(a, b) })
        .headerFormatter(function(a, b) { return g.tickFormat()(a, b) }),
    j.updateState(!1);
    var F = d3.scale.linear(), G = {i : 0, x : 0},
        H = a.utils.renderWatch(C, D), I = function(a) {
          return function() {
            return {
              active: a.map(function(a) { return !a.disabled }), index: G.i,
                  rescaleY: w
            }
          }
        }, J = function(a) {
          return function(b) {
            void 0 !== b.index && (G.i = b.index),
                void 0 !== b.rescaleY && (w = b.rescaleY),
                void 0 !== b.active &&
                    a.forEach(function(a, c) { a.disabled = !b.active[c] })
          }
        };
    f.dispatch.on("elementMouseover.tooltip", function(a) {
      var c = {x : b.x()(a.point), y : b.y()(a.point), color : a.point.color};
      a.point = c, l.data(a).hidden(!1)
    }), f.dispatch.on("elementMouseout.tooltip", function(a) { l.hidden(!0) });
    var K = null;
    return b.dispatch = C, b.lines = f, b.legend = i, b.controls = j,
           b.xAxis = g, b.yAxis = h, b.interactiveLayer = k, b.state = y,
           b.tooltip = l, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return o }, set : function(a) { o = a }},
             height :
                 {get : function() { return p }, set : function(a) { p = a }},
             rescaleY :
                 {get : function() { return w }, set : function(a) { w = a }},
             showControls :
                 {get : function() { return u }, set : function(a) { u = a }},
             showLegend :
                 {get : function() { return q }, set : function(a) { q = a }},
             average :
                 {get : function() { return B }, set : function(a) { B = a }},
             defaultState :
                 {get : function() { return z }, set : function(a) { z = a }},
             noData :
                 {get : function() { return A }, set : function(a) { A = a }},
             showXAxis :
                 {get : function() { return r }, set : function(a) { r = a }},
             showYAxis :
                 {get : function() { return s }, set : function(a) { s = a }},
             noErrorCheck :
                 {get : function() { return E }, set : function(a) { E = a }},
             margin : {
               get : function() { return m },
               set : function(a) {
                 m.top = void 0 !== a.top ? a.top : m.top,
                 m.right = void 0 !== a.right ? a.right : m.right,
                 m.bottom = void 0 !== a.bottom ? a.bottom : m.bottom,
                 m.left = void 0 !== a.left ? a.left : m.left
               }
             },
             color : {
               get : function() { return n },
               set : function(b) { n = a.utils.getColor(b), i.color(n) }
             },
             useInteractiveGuideline : {
               get : function() { return v },
               set : function(a) {
                 v = a, a === !0 && (b.interactive(!1), b.useVoronoi(!1))
               }
             },
             rightAlignYAxis : {
               get : function() { return t },
               set : function(a) { t = a, h.orient(a ? "right" : "left") }
             },
             duration : {
               get : function() { return D },
               set : function(a) {
                 D = a, f.duration(D), g.duration(D), h.duration(D), H.reset(D)
               }
             }
           }),
           a.utils.inheritOptions(b, f), a.utils.initOptions(b), b
  }, a.models.discreteBar = function() {
    "use strict";
    function b(m) {
      return y.reset(), m.each(function(b) {
        var m = k - j.left - j.right, x = l - j.top - j.bottom;
        c = d3.select(this), a.utils.initSVG(c),
        b.forEach(function(
            a, b) { a.values.forEach(function(a) { a.series = b }) });
        var z = d && e ? [] : b.map(function(a) {
          return a.values.map(function(a, b) {
            return { x: p(a, b), y: q(a, b), y0: a.y0 }
          })
        });
        n.domain(d || d3.merge(z).map(function(a) { return a.x }))
            .rangeBands(f || [ 0, m ], .1),
            o.domain(
                e ||
                d3.extent(
                    d3.merge(z).map(function(a) { return a.y }).concat(r))),
            t ? o.range(g ||
                        [
                          x - (o.domain()[0] < 0 ? 12 : 0),
                          o.domain()[1] > 0 ? 12 : 0
                        ])
              : o.range(g || [ x, 0 ]),
            h = h || n, i = i || o.copy().range([ o(0), o(0) ]);
        var A = c.selectAll("g.nv-wrap.nv-discretebar").data([ b ]),
            B = A.enter().append("g").attr("class",
                                           "nvd3 nv-wrap nv-discretebar"),
            C = B.append("g");
        A.select("g");
        C.append("g").attr("class", "nv-groups"),
            A.attr("transform", "translate(" + j.left + "," + j.top + ")");
        var D =
            A.select(".nv-groups")
                .selectAll(".nv-group")
                .data(function(a) { return a }, function(a) { return a.key });
        D.enter()
            .append("g")
            .style("stroke-opacity", 1e-6)
            .style("fill-opacity", 1e-6),
            D.exit()
                .watchTransition(y, "discreteBar: exit groups")
                .style("stroke-opacity", 1e-6)
                .style("fill-opacity", 1e-6)
                .remove(),
            D.attr("class", function(a, b) { return "nv-group nv-series-" + b })
                .classed("hover", function(a) { return a.hover }),
            D.watchTransition(y, "discreteBar: groups")
                .style("stroke-opacity", 1)
                .style("fill-opacity", .75);
        var E = D.selectAll("g.nv-bar").data(function(a) { return a.values });
        E.exit().remove();
        var F =
            E.enter()
                .append("g")
                .attr("transform",
                      function(a, b, c) {
                        return "translate(" +
                               (n(p(a, b)) + .05 * n.rangeBand()) + ", " +
                               o(0) + ")"
                      })
                .on("mouseover",
                    function(a, b) {
                      d3.select(this).classed("hover", !0), v.elementMouseover({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      })
                    })
                .on("mouseout",
                    function(a, b) {
                      d3.select(this).classed("hover", !1), v.elementMouseout({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      })
                    })
                .on("mousemove",
                    function(a, b) {
                      v.elementMousemove({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      })
                    })
                .on("click",
                    function(a, b) {
                      var c = this;
                      v.elementClick({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill"),
                        event : d3.event,
                        element : c
                      }),
                          d3.event.stopPropagation()
                    })
                .on("dblclick", function(a, b) {
                  v.elementDblClick({
                    data : a,
                    index : b,
                    color : d3.select(this).style("fill")
                  }),
                      d3.event.stopPropagation()
                });
        F.append("rect")
            .attr("height", 0)
            .attr("width", .9 * n.rangeBand() / b.length),
            t ? (F.append("text").attr("text-anchor", "middle"),
                 E.select("text")
                     .text(function(a, b) { return u(q(a, b)) })
                     .watchTransition(y, "discreteBar: bars text")
                     .attr("x", .9 * n.rangeBand() / 2)
                     .attr("y",
                           function(a, b) {
                             return q(a, b) < 0 ? o(q(a, b)) - o(0) + 12 : -4
                           }))
              : E.selectAll("text").remove(),
            E.attr("class",
                   function(a, b) {
                     return q(a, b) < 0 ? "nv-bar negative" : "nv-bar positive"
                   })
                .style("fill", function(a, b) { return a.color || s(a, b) })
                .style("stroke", function(a, b) { return a.color || s(a, b) })
                .select("rect")
                .attr("class", w)
                .watchTransition(y, "discreteBar: bars rect")
                .attr("width", .9 * n.rangeBand() / b.length),
            E.watchTransition(y, "discreteBar: bars")
                .attr("transform",
                      function(a, b) {
                        var c = n(p(a, b)) + .05 * n.rangeBand(),
                            d = q(a, b) < 0
                                    ? o(0)
                                    : o(0) - o(q(a, b)) < 1 ? o(0) - 1
                                                            : o(q(a, b));
                        return "translate(" + c + ", " + d + ")"
                      })
                .select("rect")
                .attr(
                    "height",
                    function(
                        a,
                        b) { return Math.max(Math.abs(o(q(a, b)) - o(0)), 1) }),
            h = n.copy(), i = o.copy()
      }),
             y.renderEnd("discreteBar immediate"), b
    }
    var c, d, e, f, g, h, i,
        j = {top : 0, right : 0, bottom : 0, left : 0}, k = 960, l = 500,
        m = Math.floor(1e4 * Math.random()), n = d3.scale.ordinal(),
        o = d3.scale.linear(), p = function(a) { return a.x },
        q = function(a) { return a.y }, r = [ 0 ], s = a.utils.defaultColor(),
        t = !1, u = d3.format(",.2f"),
        v = d3.dispatch("chartClick", "elementClick", "elementDblClick",
                        "elementMouseover", "elementMouseout",
                        "elementMousemove", "renderEnd"),
        w = "discreteBar", x = 250, y = a.utils.renderWatch(v, x);
    return b.dispatch = v, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return k }, set : function(a) { k = a }},
             height :
                 {get : function() { return l }, set : function(a) { l = a }},
             forceY :
                 {get : function() { return r }, set : function(a) { r = a }},
             showValues :
                 {get : function() { return t }, set : function(a) { t = a }},
             x : {get : function() { return p }, set : function(a) { p = a }},
             y : {get : function() { return q }, set : function(a) { q = a }},
             xScale :
                 {get : function() { return n }, set : function(a) { n = a }},
             yScale :
                 {get : function() { return o }, set : function(a) { o = a }},
             xDomain :
                 {get : function() { return d }, set : function(a) { d = a }},
             yDomain :
                 {get : function() { return e }, set : function(a) { e = a }},
             xRange :
                 {get : function() { return f }, set : function(a) { f = a }},
             yRange :
                 {get : function() { return g }, set : function(a) { g = a }},
             valueFormat :
                 {get : function() { return u }, set : function(a) { u = a }},
             id : {get : function() { return m }, set : function(a) { m = a }},
             rectClass :
                 {get : function() { return w }, set : function(a) { w = a }},
             margin : {
               get : function() { return j },
               set : function(a) {
                 j.top = void 0 !== a.top ? a.top : j.top,
                 j.right = void 0 !== a.right ? a.right : j.right,
                 j.bottom = void 0 !== a.bottom ? a.bottom : j.bottom,
                 j.left = void 0 !== a.left ? a.left : j.left
               }
             },
             color : {
               get : function() { return s },
               set : function(b) { s = a.utils.getColor(b) }
             },
             duration : {
               get : function() { return x },
               set : function(a) { x = a, y.reset(x) }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.discreteBarChart = function() {
    "use strict";
    function b(i) {
      return x.reset(), x.models(e), o && x.models(f), p && x.models(g),
             i.each(function(i) {
               var m = d3.select(this);
               a.utils.initSVG(m);
               var u = a.utils.availableWidth(k, m, j),
                   x = a.utils.availableHeight(l, m, j);
               if (b.update =
                       function() {
                         v.beforeUpdate(), m.transition().duration(w).call(b)
                       },
                   b.container = this,
                   !(i && i.length &&
                     i.filter(function(a) { return a.values.length }).length))
                 return a.utils.noData(b, m), b;
               m.selectAll(".nv-noData").remove(), c = e.xScale(),
                                                   d = e.yScale().clamp(!0);
               var y = m.selectAll("g.nv-wrap.nv-discreteBarWithAxes").data([
                 i
               ]),
                   z = y.enter()
                           .append("g")
                           .attr("class", "nvd3 nv-wrap nv-discreteBarWithAxes")
                           .append("g"),
                   A = z.append("defs"), B = y.select("g");
               z.append("g").attr("class", "nv-x nv-axis"),
                   z.append("g")
                       .attr("class", "nv-y nv-axis")
                       .append("g")
                       .attr("class", "nv-zeroLine")
                       .append("line"),
                   z.append("g").attr("class", "nv-barsWrap"),
                   z.append("g").attr("class", "nv-legendWrap"),
                   B.attr("transform",
                          "translate(" + j.left + "," + j.top + ")"),
                   n ? (h.width(u), B.select(".nv-legendWrap").datum(i).call(h),
                        h.height() > j.top &&
                            (j.top = h.height(),
                             x = a.utils.availableHeight(l, m, j)),
                        y.select(".nv-legendWrap")
                            .attr("transform", "translate(0," + -j.top + ")"))
                     : B.select(".nv-legendWrap").selectAll("*").remove(),
                   q && B.select(".nv-y.nv-axis")
                            .attr("transform", "translate(" + u + ",0)"),
                   e.width(u).height(x);
               var C = B.select(".nv-barsWrap")
                           .datum(i.filter(function(a) { return !a.disabled }));
               if (C.transition().call(e),
                   A.append("clipPath")
                       .attr("id", "nv-x-label-clip-" + e.id())
                       .append("rect"),
                   B.select("#nv-x-label-clip-" + e.id() + " rect")
                       .attr("width", c.rangeBand() * (r ? 2 : 1))
                       .attr("height", 16)
                       .attr("x", -c.rangeBand() / (r ? 1 : 2)),
                   o) {
                 f.scale(c)
                     ._ticks(a.utils.calcTicksX(u / 100, i))
                     .tickSize(-x, 0),
                     B.select(".nv-x.nv-axis")
                         .attr("transform",
                               "translate(0," +
                                   (d.range()[0] +
                                    (e.showValues() && d.domain()[0] < 0 ? 16
                                                                         : 0)) +
                                   ")"),
                     B.select(".nv-x.nv-axis").call(f);
                 var D = B.select(".nv-x.nv-axis").selectAll("g");
                 r && D.selectAll("text").attr(
                          "transform",
                          function(a, b, c) {
                            return "translate(0," + (c % 2 == 0 ? "5" : "17") +
                                   ")"
                          }),
                     t && D.selectAll(".tick text")
                              .attr("transform", "rotate(" + t + " 0,0)")
                              .style("text-anchor", t > 0 ? "start" : "end"),
                     s && B.selectAll(".tick text")
                              .call(a.utils.wrapTicks, b.xAxis.rangeBand())
               }
               p && (g.scale(d)
                         ._ticks(a.utils.calcTicksY(x / 36, i))
                         .tickSize(-u, 0),
                     B.select(".nv-y.nv-axis").call(g)),
                   B.select(".nv-zeroLine line")
                       .attr("x1", 0)
                       .attr("x2", q ? -u : u)
                       .attr("y1", d(0))
                       .attr("y2", d(0))
             }),
             x.renderEnd("discreteBar chart immediate"), b
    }
    var c, d,
        e = a.models.discreteBar(), f = a.models.axis(), g = a.models.axis(),
        h = a.models.legend(), i = a.models.tooltip(),
        j = {top : 15, right : 10, bottom : 50, left : 60}, k = null, l = null,
        m = a.utils.getColor(), n = !1, o = !0, p = !0, q = !1, r = !1, s = !1,
        t = 0, u = null, v = d3.dispatch("beforeUpdate", "renderEnd"), w = 250;
    f.orient("bottom").showMaxMin(!1).tickFormat(function(a) { return a }),
        g.orient(q ? "right" : "left").tickFormat(d3.format(",.1f")),
        i.duration(0)
            .headerEnabled(!1)
            .valueFormatter(function(a, b) { return g.tickFormat()(a, b) })
            .keyFormatter(function(a, b) { return f.tickFormat()(a, b) });
    var x = a.utils.renderWatch(v, w);
    return e.dispatch.on("elementMouseover.tooltip",
                         function(a) {
                           a.series = {
                             key : b.x()(a.data),
                             value : b.y()(a.data),
                             color : a.color
                           },
                           i.data(a).hidden(!1)
                         }),
           e.dispatch.on("elementMouseout.tooltip",
                         function(a) { i.hidden(!0) }),
           e.dispatch.on("elementMousemove.tooltip", function(a) { i() }),
           b.dispatch = v, b.discretebar = e, b.legend = h, b.xAxis = f,
           b.yAxis = g, b.tooltip = i, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return k }, set : function(a) { k = a }},
             height :
                 {get : function() { return l }, set : function(a) { l = a }},
             showLegend :
                 {get : function() { return n }, set : function(a) { n = a }},
             staggerLabels :
                 {get : function() { return r }, set : function(a) { r = a }},
             rotateLabels :
                 {get : function() { return t }, set : function(a) { t = a }},
             wrapLabels :
                 {get : function() { return s }, set : function(a) { s = !!a }},
             showXAxis :
                 {get : function() { return o }, set : function(a) { o = a }},
             showYAxis :
                 {get : function() { return p }, set : function(a) { p = a }},
             noData :
                 {get : function() { return u }, set : function(a) { u = a }},
             margin : {
               get : function() { return j },
               set : function(a) {
                 j.top = void 0 !== a.top ? a.top : j.top,
                 j.right = void 0 !== a.right ? a.right : j.right,
                 j.bottom = void 0 !== a.bottom ? a.bottom : j.bottom,
                 j.left = void 0 !== a.left ? a.left : j.left
               }
             },
             duration : {
               get : function() { return w },
               set : function(a) {
                 w = a, x.reset(w), e.duration(w), f.duration(w), g.duration(w)
               }
             },
             color : {
               get : function() { return m },
               set : function(
                   b) { m = a.utils.getColor(b), e.color(m), h.color(m) }
             },
             rightAlignYAxis : {
               get : function() { return q },
               set : function(a) { q = a, g.orient(a ? "right" : "left") }
             }
           }),
           a.utils.inheritOptions(b, e), a.utils.initOptions(b), b
  }, a.models.distribution = function() {
    "use strict";
    function b(k) {
      return m.reset(), k.each(function(b) {
        var k = (e - ("x" === g ? d.left + d.right : d.top + d.bottom),
                 "x" == g ? "y" : "x"),
            l = d3.select(this);
        a.utils.initSVG(l), c = c || j;
        var n = l.selectAll("g.nv-distribution").data([ b ]),
            o = n.enter().append("g").attr("class", "nvd3 nv-distribution"),
            p = (o.append("g"), n.select("g"));
        n.attr("transform", "translate(" + d.left + "," + d.top + ")");
        var q =
            p.selectAll("g.nv-dist")
                .data(function(a) { return a }, function(a) { return a.key });
        q.enter().append("g"),
            q.attr("class", function(a, b) { return "nv-dist nv-series-" + b })
                .style("stroke", function(a, b) { return i(a, b) });
        var r = q.selectAll("line.nv-dist" + g)
                    .data(function(a) { return a.values });
        r.enter()
            .append("line")
            .attr(g + "1", function(a, b) { return c(h(a, b)) })
            .attr(g + "2", function(a, b) { return c(h(a, b)) }),
            m.transition(q.exit().selectAll("line.nv-dist" + g), "dist exit")
                .attr(g + "1", function(a, b) { return j(h(a, b)) })
                .attr(g + "2", function(a, b) { return j(h(a, b)) })
                .style("stroke-opacity", 0)
                .remove(),
            r.attr(
                 "class",
                 function(
                     a, b) { return "nv-dist" + g + " nv-dist" + g + "-" + b })
                .attr(k + "1", 0)
                .attr(k + "2", f),
            m.transition(r, "dist")
                .attr(g + "1", function(a, b) { return j(h(a, b)) })
                .attr(g + "2", function(a, b) { return j(h(a, b)) }),
            c = j.copy()
      }),
             m.renderEnd("distribution immediate"), b
    }
    var c, d = {top : 0, right : 0, bottom : 0, left : 0}, e = 400, f = 8,
           g = "x", h = function(a) { return a[g] }, i = a.utils.defaultColor(),
           j = d3.scale.linear(), k = 250, l = d3.dispatch("renderEnd"),
           m = a.utils.renderWatch(l, k);
    return b.options = a.utils.optionsFunc.bind(b), b.dispatch = l,
           b.margin =
               function(a) {
             return arguments.length
                        ? (d.top = "undefined" != typeof a.top ? a.top : d.top,
                           d.right = "undefined" != typeof a.right ? a.right
                                                                   : d.right,
                           d.bottom = "undefined" != typeof a.bottom ? a.bottom
                                                                     : d.bottom,
                           d.left =
                               "undefined" != typeof a.left ? a.left : d.left,
                           b)
                        : d
           },
           b.width = function(a) { return arguments.length ? (e = a, b) : e },
           b.axis = function(a) { return arguments.length ? (g = a, b) : g },
           b.size = function(a) { return arguments.length ? (f = a, b) : f },
           b.getData = function(
               a) { return arguments.length ? (h = d3.functor(a), b) : h },
           b.scale = function(a) { return arguments.length ? (j = a, b) : j },
           b.color =
               function(c) {
             return arguments.length ? (i = a.utils.getColor(c), b) : i
           },
           b.duration = function(
               a) { return arguments.length ? (k = a, m.reset(k), b) : k },
           b
  }, a.models.focus = function(b) {
    "use strict";
    function c(t) {
      return s.reset(), s.models(b), m && s.models(f), n && s.models(g),
             t.each(function(s) {
               function t(a) {
                 var b = +("e" == a), c = b ? 1 : -1, d = y / 3;
                 return "M" + .5 * c + "," + d + "A6,6 0 0 " + b + " " +
                        6.5 * c + "," + (d + 6) + "V" + (2 * d - 6) +
                        "A6,6 0 0 " + b + " " + .5 * c + "," + 2 * d + "ZM" +
                        2.5 * c + "," + (d + 8) + "V" + (2 * d - 8) + "M" +
                        4.5 * c + "," + (d + 8) + "V" + (2 * d - 8)
               }
               function u() {
                 h.empty() || h.extent(p), D.data([
                                              h.empty() ? d.domain() : p
                                            ]).each(function(a, b) {
                   var c = d(a[0]) - d.range()[0], e = x - d(a[1]);
                   d3.select(this).select(".left").attr("width", 0 > c ? 0 : c),
                       d3.select(this)
                           .select(".right")
                           .attr("x", d(a[1]))
                           .attr("width", 0 > e ? 0 : e)
                 })
               }
               function v() {
                 p = h.empty() ? null : h.extent();
                 var a = h.empty() ? d.domain() : h.extent();
                 Math.abs(a[0] - a[1]) <= 1 ||
                     (r.brush({extent : a, brush : h}), u(), r.onBrush(a))
               }
               var w = d3.select(this);
               a.utils.initSVG(w);
               var x = a.utils.availableWidth(k, w, i),
                   y = l - i.top - i.bottom;
               c.update = function() {
                 0 === q ? w.call(c) : w.transition().duration(q).call(c)
               }, c.container = this, d = b.xScale(), e = b.yScale();
               var z = w.selectAll("g.nv-focus").data([ s ]),
                   A = z.enter()
                           .append("g")
                           .attr("class", "nvd3 nv-focus")
                           .append("g"),
                   B = z.select("g");
               z.attr("transform", "translate(" + i.left + "," + i.top + ")"),
                   A.append("g").attr("class", "nv-background").append("rect"),
                   A.append("g").attr("class", "nv-x nv-axis"),
                   A.append("g").attr("class", "nv-y nv-axis"),
                   A.append("g").attr("class", "nv-contentWrap"),
                   A.append("g").attr("class", "nv-brushBackground"),
                   A.append("g").attr("class", "nv-x nv-brush"),
                   o && B.select(".nv-y.nv-axis")
                            .attr("transform", "translate(" + x + ",0)"),
                   B.select(".nv-background rect")
                       .attr("width", x)
                       .attr("height", y),
                   b.width(x).height(y).color(
                       s.map(function(a, b) { return a.color || j(a, b) })
                           .filter(function(a, b) { return !s[b].disabled }));
               var C = B.select(".nv-contentWrap")
                           .datum(s.filter(function(a) { return !a.disabled }));
               d3.transition(C).call(b), h.x(d).on("brush", function() { v() }),
                   p && h.extent(p);
               var D = B.select(".nv-brushBackground").selectAll("g").data([
                 p || h.extent()
               ]),
                   E = D.enter().append("g");
               E.append("rect")
                   .attr("class", "left")
                   .attr("x", 0)
                   .attr("y", 0)
                   .attr("height", y),
                   E.append("rect")
                       .attr("class", "right")
                       .attr("x", 0)
                       .attr("y", 0)
                       .attr("height", y);
               var F = B.select(".nv-x.nv-brush").call(h);
               F.selectAll("rect").attr("height", y),
                   F.selectAll(".resize").append("path").attr("d", t), v(),
                   B.select(".nv-background rect")
                       .attr("width", x)
                       .attr("height", y),
                   m && (f.scale(d)
                             ._ticks(a.utils.calcTicksX(x / 100, s))
                             .tickSize(-y, 0),
                         B.select(".nv-x.nv-axis")
                             .attr("transform",
                                   "translate(0," + e.range()[0] + ")"),
                         d3.transition(B.select(".nv-x.nv-axis")).call(f)),
                   n && (g.scale(e)
                             ._ticks(a.utils.calcTicksY(y / 36, s))
                             .tickSize(-x, 0),
                         d3.transition(B.select(".nv-y.nv-axis")).call(g)),
                   B.select(".nv-x.nv-axis")
                       .attr("transform", "translate(0," + e.range()[0] + ")")
             }),
             s.renderEnd("focus immediate"), c
    }
    var d, e,
        b = b || a.models.line(), f = a.models.axis(), g = a.models.axis(),
        h = d3.svg.brush(), i = {top : 10, right : 0, bottom : 30, left : 0},
        j = a.utils.defaultColor(), k = null, l = 70, m = !0, n = !1, o = !1,
        p = null, q = 250, r = d3.dispatch("brush", "onBrush", "renderEnd");
    b.interactive(!1), b.pointActive(function(a) { return !1 });
    var s = a.utils.renderWatch(r, q);
    return c.dispatch = r, c.content = b, c.brush = h, c.xAxis = f, c.yAxis = g,
           c.options = a.utils.optionsFunc.bind(c),
           c._options = Object.create({}, {
             width :
                 {get : function() { return k }, set : function(a) { k = a }},
             height :
                 {get : function() { return l }, set : function(a) { l = a }},
             showXAxis :
                 {get : function() { return m }, set : function(a) { m = a }},
             showYAxis :
                 {get : function() { return n }, set : function(a) { n = a }},
             brushExtent :
                 {get : function() { return p }, set : function(a) { p = a }},
             margin : {
               get : function() { return i },
               set : function(a) {
                 i.top = void 0 !== a.top ? a.top : i.top,
                 i.right = void 0 !== a.right ? a.right : i.right,
                 i.bottom = void 0 !== a.bottom ? a.bottom : i.bottom,
                 i.left = void 0 !== a.left ? a.left : i.left
               }
             },
             duration : {
               get : function() { return q },
               set : function(a) {
                 q = a, s.reset(q), b.duration(q), f.duration(q), g.duration(q)
               }
             },
             color : {
               get : function() { return j },
               set : function(c) { j = a.utils.getColor(c), b.color(j) }
             },
             interpolate : {
               get : function() { return b.interpolate() },
               set : function(a) { b.interpolate(a) }
             },
             xTickFormat : {
               get : function() { return f.tickFormat() },
               set : function(a) { f.tickFormat(a) }
             },
             yTickFormat : {
               get : function() { return g.tickFormat() },
               set : function(a) { g.tickFormat(a) }
             },
             x : {
               get : function() { return b.x() },
               set : function(a) { b.x(a) }
             },
             y : {
               get : function() { return b.y() },
               set : function(a) { b.y(a) }
             },
             rightAlignYAxis : {
               get : function() { return o },
               set : function(a) { o = a, g.orient(o ? "right" : "left") }
             }
           }),
           a.utils.inheritOptions(c, b), a.utils.initOptions(c), c
  }, a.models.forceDirectedGraph = function() {
    "use strict";
    function b(g) {
      return u.reset(), g.each(function(g) {
        f = d3.select(this), a.utils.initSVG(f);
        var j = a.utils.availableWidth(d, f, c),
            u = a.utils.availableHeight(e, f, c);
        if (f.attr("width", j).attr("height", u), !(g && g.links && g.nodes))
          return a.utils.noData(b, f), b;
        f.selectAll(".nv-noData").remove(), f.selectAll("*").remove();
        var v = new Set;
        g.nodes.forEach(function(a) {
          var b = Object.keys(a);
          b.forEach(function(a) { v.add(a) })
        });
        var w = d3.layout.force()
                    .nodes(g.nodes)
                    .links(g.links)
                    .size([ j, u ])
                    .linkStrength(k)
                    .friction(l)
                    .linkDistance(m)
                    .charge(n)
                    .gravity(o)
                    .theta(p)
                    .alpha(q)
                    .start(),
            x = f.selectAll(".link")
                    .data(g.links)
                    .enter()
                    .append("line")
                    .attr("class", "nv-force-link")
                    .style("stroke-width",
                           function(a) { return Math.sqrt(a.value) }),
            y = f.selectAll(".node")
                    .data(g.nodes)
                    .enter()
                    .append("g")
                    .attr("class", "nv-force-node")
                    .call(w.drag);
        y.append("circle")
            .attr("r", r)
            .style("fill", function(a) { return h(a) })
            .on("mouseover",
                function(a) {
                  f.select(".nv-series-" + a.seriesIndex + " .nv-distx-" +
                           a.pointIndex)
                      .attr("y1", a.py),
                      f.select(".nv-series-" + a.seriesIndex + " .nv-disty-" +
                               a.pointIndex)
                          .attr("x2", a.px);
                  var b = h(a);
                  a.series = [],
                  v.forEach(function(
                      c) { a.series.push({color : b, key : c, value : a[c]}) }),
                  i.data(a).hidden(!1)
                })
            .on("mouseout", function(a) { i.hidden(!0) }),
            i.headerFormatter(function(a) { return "Node" }), t(x), s(y),
            w.on("tick", function() {
              x.attr("x1", function(a) { return a.source.x })
                  .attr("y1", function(a) { return a.source.y })
                  .attr("x2", function(a) { return a.target.x })
                  .attr("y2", function(a) { return a.target.y }),
                  y.attr(
                      "transform",
                      function(
                          a) { return "translate(" + a.x + ", " + a.y + ")" })
            })
      }),
             b
    }
    var c = {top : 2, right : 0, bottom : 2, left : 0}, d = 400, e = 32,
        f = null, g = d3.dispatch("renderEnd"),
        h = a.utils.getColor([ "#000" ]), i = a.models.tooltip(), j = null,
        k = .1, l = .9, m = 30, n = -120, o = .1, p = .8, q = .1, r = 5,
        s = function(a) {}, t = function(a) {}, u = a.utils.renderWatch(g);
    return b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return d }, set : function(a) { d = a }},
             height :
                 {get : function() { return e }, set : function(a) { e = a }},
             linkStrength :
                 {get : function() { return k }, set : function(a) { k = a }},
             friction :
                 {get : function() { return l }, set : function(a) { l = a }},
             linkDist :
                 {get : function() { return m }, set : function(a) { m = a }},
             charge :
                 {get : function() { return n }, set : function(a) { n = a }},
             gravity :
                 {get : function() { return o }, set : function(a) { o = a }},
             theta :
                 {get : function() { return p }, set : function(a) { p = a }},
             alpha :
                 {get : function() { return q }, set : function(a) { q = a }},
             radius :
                 {get : function() { return r }, set : function(a) { r = a }},
             x : {
               get : function() { return getX },
               set : function(a) { getX = d3.functor(a) }
             },
             y : {
               get : function() { return getY },
               set : function(a) { getY = d3.functor(a) }
             },
             margin : {
               get : function() { return c },
               set : function(a) {
                 c.top = void 0 !== a.top ? a.top : c.top,
                 c.right = void 0 !== a.right ? a.right : c.right,
                 c.bottom = void 0 !== a.bottom ? a.bottom : c.bottom,
                 c.left = void 0 !== a.left ? a.left : c.left
               }
             },
             color : {
               get : function() { return h },
               set : function(b) { h = a.utils.getColor(b) }
             },
             noData :
                 {get : function() { return j }, set : function(a) { j = a }},
             nodeExtras :
                 {get : function() { return s }, set : function(a) { s = a }},
             linkExtras :
                 {get : function() { return t }, set : function(a) { t = a }}
           }),
           b.dispatch = g, b.tooltip = i, a.utils.initOptions(b), b
  }, a.models.furiousLegend = function() {
    "use strict";
    function b(r) {
      function s(a, b) {
        return "furious" != q ? "#000"
                              : o ? a.disengaged ? h(a, b) : "#fff"
                                  : o ? void 0 : a.disabled ? h(a, b) : "#fff"
      }
      function t(a, b) {
        return o && "furious" == q ? a.disengaged ? "#fff" : h(a, b)
                                   : a.disabled ? "#fff" : h(a, b)
      }
      return r.each(function(b) {
        var r = d - c.left - c.right, u = d3.select(this);
        a.utils.initSVG(u);
        var v = u.selectAll("g.nv-legend").data([ b ]),
            w = (v.enter()
                     .append("g")
                     .attr("class", "nvd3 nv-legend")
                     .append("g"),
                 v.select("g"));
        v.attr("transform", "translate(" + c.left + "," + c.top + ")");
        var x, y = w.selectAll(".nv-series").data(function(a) {
          return "furious" != q
                     ? a
                     : a.filter(function(a) { return o ? !0 : !a.disengaged })
        }),
               z = y.enter().append("g").attr("class", "nv-series");
        if ("classic" == q)
          z.append("circle")
              .style("stroke-width", 2)
              .attr("class", "nv-legend-symbol")
              .attr("r", 5),
              x = y.select("circle");
        else if ("furious" == q) {
          z.append("rect")
              .style("stroke-width", 2)
              .attr("class", "nv-legend-symbol")
              .attr("rx", 3)
              .attr("ry", 3),
              x = y.select("rect"),
              z.append("g")
                  .attr("class", "nv-check-box")
                  .property(
                      "innerHTML",
                      '<path d="M0.5,5 L22.5,5 L22.5,26.5 L0.5,26.5 L0.5,5 Z" class="nv-box"></path><path d="M5.5,12.8618467 L11.9185089,19.2803556 L31,0.198864511" class="nv-check"></path>')
                  .attr("transform", "translate(-10,-8)scale(0.5)");
          var A = y.select(".nv-check-box");
          A.each(function(
              a,
              b) { d3.select(this).selectAll("path").attr("stroke", s(a, b)) })
        }
        z.append("text")
            .attr("text-anchor", "start")
            .attr("class", "nv-legend-text")
            .attr("dy", ".32em")
            .attr("dx", "8");
        var B = y.select("text.nv-legend-text");
        y.on("mouseover", function(a, b) { p.legendMouseover(a, b) })
            .on("mouseout", function(a, b) { p.legendMouseout(a, b) })
            .on("click",
                function(a, b) {
                  p.legendClick(a, b);
                  var c = y.data();
                  if (m) {
                    if ("classic" == q)
                      n ? (c.forEach(function(a) { a.disabled = !0 }),
                           a.disabled = !1)
                        : (a.disabled = !a.disabled,
                           c.every(function(a) { return a.disabled }) &&
                               c.forEach(function(a) { a.disabled = !1 }));
                    else if ("furious" == q)
                      if (o)
                        a.disengaged = !a.disengaged,
                        a.userDisabled = void 0 == a.userDisabled
                                             ? !!a.disabled
                                             : a.userDisabled,
                        a.disabled = a.disengaged || a.userDisabled;
                      else if (!o) {
                        a.disabled = !a.disabled, a.userDisabled = a.disabled;
                        var d = c.filter(function(a) { return !a.disengaged });
                        d.every(function(a) { return a.userDisabled }) &&
                            c.forEach(function(
                                a) { a.disabled = a.userDisabled = !1 })
                      }
                    p.stateChange({
                      disabled : c.map(function(a) { return !!a.disabled }),
                      disengaged : c.map(function(a) { return !!a.disengaged })
                    })
                  }
                })
            .on("dblclick",
                function(a, b) {
                  if (("furious" != q || !o) && (p.legendDblclick(a, b), m)) {
                    var c = y.data();
                    c.forEach(function(a) {
                      a.disabled = !0,
                      "furious" == q && (a.userDisabled = a.disabled)
                    }),
                        a.disabled = !1,
                        "furious" == q && (a.userDisabled = a.disabled),
                        p.stateChange({
                          disabled : c.map(function(a) { return !!a.disabled })
                        })
                  }
                }),
            y.classed("nv-disabled", function(a) { return a.userDisabled }),
            y.exit().remove(),
            B.attr("fill", s).text(function(a) { return g(f(a)) });
        var C;
        switch (q) {
        case "furious":
          C = 23;
          break;
        case "classic":
          C = 20
        }
        if (j) {
          var D = [];
          y.each(function(b, c) {
            var d;
            if (g(f(b)) && g(f(b)).length > i) {
              var e = g(f(b)).substring(0, i);
              d = d3.select(this).select("text").text(e + "..."),
              d3.select(this).append("svg:title").text(g(f(b)))
            } else
              d = d3.select(this).select("text");
            var h;
            try {
              if (h = d.node().getComputedTextLength(), 0 >= h)
                throw Error()
            } catch (j) {
              h = a.utils.calcApproxTextWidth(d)
            }
            D.push(h + k)
          });
          for (var E = 0, F = 0, G = []; r > F && E < D.length;)
            G[E] = D[E], F += D[E++];
          for (0 === E && (E = 1); F > r && E > 1;) {
            G = [], E--;
            for (var H = 0; H < D.length; H++)
              D[H] > (G[H % E] || 0) && (G[H % E] = D[H]);
            F = G.reduce(function(a, b, c, d) { return a + b })
          }
          for (var I = [], J = 0, K = 0; E > J; J++)
            I[J] = K, K += G[J];
          y.attr("transform",
                 function(a, b) {
                   return "translate(" + I[b % E] + "," +
                          (5 + Math.floor(b / E) * C) + ")"
                 }),
              l ? w.attr("transform",
                         "translate(" + (d - c.right - F) + "," + c.top + ")")
                : w.attr("transform", "translate(0," + c.top + ")"),
              e = c.top + c.bottom + Math.ceil(D.length / E) * C
        } else {
          var L, M = 5, N = 5, O = 0;
          y.attr("transform",
                 function(a, b) {
                   var e = d3.select(this)
                               .select("text")
                               .node()
                               .getComputedTextLength() +
                           k;
                   return L = N,
                          d < c.left + c.right + L + e && (N = L = 5, M += C),
                          N += e, N > O && (O = N),
                          "translate(" + L + "," + M + ")"
                 }),
              w.attr("transform",
                     "translate(" + (d - c.right - O) + "," + c.top + ")"),
              e = c.top + c.bottom + M + 15
        }
        "furious" == q &&
            x.attr(
                 "width",
                 function(a, b) { return B[0][b].getComputedTextLength() + 27 })
                .attr("height", 18)
                .attr("y", -9)
                .attr("x", -15),
            x.style("fill", t).style(
                "stroke", function(a, b) { return a.color || h(a, b) })
      }),
             b
    }
    var c = {top : 5, right : 0, bottom : 5, left : 0}, d = 400, e = 20,
        f = function(a) { return a.key }, g = function(a) { return a },
        h = a.utils.getColor(), i = 20, j = !0, k = 28, l = !0, m = !0, n = !1,
        o = !1,
        p = d3.dispatch("legendClick", "legendDblclick", "legendMouseover",
                        "legendMouseout", "stateChange"),
        q = "classic";
    return b.dispatch = p, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return d }, set : function(a) { d = a }},
             height :
                 {get : function() { return e }, set : function(a) { e = a }},
             key : {get : function() { return f }, set : function(a) { f = a }},
             keyFormatter :
                 {get : function() { return g }, set : function(a) { g = a }},
             align :
                 {get : function() { return j }, set : function(a) { j = a }},
             rightAlign :
                 {get : function() { return l }, set : function(a) { l = a }},
             maxKeyLength :
                 {get : function() { return i }, set : function(a) { i = a }},
             padding :
                 {get : function() { return k }, set : function(a) { k = a }},
             updateState :
                 {get : function() { return m }, set : function(a) { m = a }},
             radioButtonMode :
                 {get : function() { return n }, set : function(a) { n = a }},
             expanded :
                 {get : function() { return o }, set : function(a) { o = a }},
             vers :
                 {get : function() { return q }, set : function(a) { q = a }},
             margin : {
               get : function() { return c },
               set : function(a) {
                 c.top = void 0 !== a.top ? a.top : c.top,
                 c.right = void 0 !== a.right ? a.right : c.right,
                 c.bottom = void 0 !== a.bottom ? a.bottom : c.bottom,
                 c.left = void 0 !== a.left ? a.left : c.left
               }
             },
             color : {
               get : function() { return h },
               set : function(b) { h = a.utils.getColor(b) }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.historicalBar = function() {
    "use strict";
    function b(x) {
      return x.each(function(b) {
        w.reset(), k = d3.select(this);
        var x = a.utils.availableWidth(h, k, g),
            y = a.utils.availableHeight(i, k, g);
        a.utils.initSVG(k),
            l.domain(c || d3.extent(b[0].values.map(n).concat(p))),
            r ? l.range(e ||
                        [
                          .5 * x / b[0].values.length,
                          x * (b[0].values.length - .5) / b[0].values.length
                        ])
              : l.range(e || [ 0, x ]),
            m.domain(d || d3.extent(b[0].values.map(o).concat(q)))
                .range(f || [ y, 0 ]),
            l.domain()[0] === l.domain()[1] &&
                (l.domain()[0] ? l.domain([
                  l.domain()[0] - .01 * l.domain()[0],
                  l.domain()[1] + .01 * l.domain()[1]
                ])
                               : l.domain([ -1, 1 ])),
            m.domain()[0] === m.domain()[1] &&
                (m.domain()[0] ? m.domain([
                  m.domain()[0] + .01 * m.domain()[0],
                  m.domain()[1] - .01 * m.domain()[1]
                ])
                               : m.domain([ -1, 1 ]));
        var z = k.selectAll("g.nv-wrap.nv-historicalBar-" + j).data([
          b[0].values
        ]),
            A = z.enter().append("g").attr(
                "class", "nvd3 nv-wrap nv-historicalBar-" + j),
            B = A.append("defs"), C = A.append("g"), D = z.select("g");
        C.append("g").attr("class", "nv-bars"),
            z.attr("transform", "translate(" + g.left + "," + g.top + ")"),
            k.on("click",
                 function(a, b) {
                   u.chartClick({data : a, index : b, pos : d3.event, id : j})
                 }),
            B.append("clipPath")
                .attr("id", "nv-chart-clip-path-" + j)
                .append("rect"),
            z.select("#nv-chart-clip-path-" + j + " rect")
                .attr("width", x)
                .attr("height", y),
            D.attr("clip-path", s ? "url(#nv-chart-clip-path-" + j + ")" : "");
        var E = z.select(".nv-bars")
                    .selectAll(".nv-bar")
                    .data(function(a) { return a },
                          function(a, b) { return n(a, b) });
        E.exit().remove(),
            E.enter()
                .append("rect")
                .attr("x", 0)
                .attr("y",
                      function(b, c) {
                        return a.utils.NaNtoZero(m(Math.max(0, o(b, c))))
                      })
                .attr("height",
                      function(b, c) {
                        return a.utils.NaNtoZero(Math.abs(m(o(b, c)) - m(0)))
                      })
                .attr("transform",
                      function(a, c) {
                        return "translate(" +
                               (l(n(a, c)) - x / b[0].values.length * .45) +
                               ",0)"
                      })
                .on("mouseover",
                    function(a, b) {
                      v && (d3.select(this).classed("hover", !0),
                            u.elementMouseover({
                              data : a,
                              index : b,
                              color : d3.select(this).style("fill")
                            }))
                    })
                .on("mouseout",
                    function(a, b) {
                      v && (d3.select(this).classed("hover", !1),
                            u.elementMouseout({
                              data : a,
                              index : b,
                              color : d3.select(this).style("fill")
                            }))
                    })
                .on("mousemove",
                    function(a, b) {
                      v && u.elementMousemove({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      })
                    })
                .on("click",
                    function(a, b) {
                      v && (u.elementClick({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      }),
                            d3.event.stopPropagation())
                    })
                .on("dblclick",
                    function(a, b) {
                      v && (u.elementDblClick({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      }),
                            d3.event.stopPropagation())
                    }),
            E.attr("fill", function(a, b) { return t(a, b) })
                .attr("class",
                      function(a, b, c) {
                        return (o(a, b) < 0 ? "nv-bar negative"
                                            : "nv-bar positive") +
                               " nv-bar-" + c + "-" + b
                      })
                .watchTransition(w, "bars")
                .attr("transform",
                      function(a, c) {
                        return "translate(" +
                               (l(n(a, c)) - x / b[0].values.length * .45) +
                               ",0)"
                      })
                .attr("width", x / b[0].values.length * .9),
            E.watchTransition(w, "bars")
                .attr("y",
                      function(b, c) {
                        var d =
                            o(b, c) < 0
                                ? m(0)
                                : m(0) - m(o(b, c)) < 1 ? m(0) - 1 : m(o(b, c));
                        return a.utils.NaNtoZero(d)
                      })
                .attr("height", function(b, c) {
                  return a.utils.NaNtoZero(
                      Math.max(Math.abs(m(o(b, c)) - m(0)), 1))
                })
      }),
             w.renderEnd("historicalBar immediate"), b
    }
    var c, d, e, f,
        g = {top : 0, right : 0, bottom : 0, left : 0}, h = null, i = null,
        j = Math.floor(1e4 * Math.random()), k = null, l = d3.scale.linear(),
        m = d3.scale.linear(), n = function(a) { return a.x },
        o = function(a) { return a.y }, p = [], q = [ 0 ], r = !1, s = !0,
        t = a.utils.defaultColor(),
        u = d3.dispatch("chartClick", "elementClick", "elementDblClick",
                        "elementMouseover", "elementMouseout",
                        "elementMousemove", "renderEnd"),
        v = !0, w = a.utils.renderWatch(u, 0);
    return b.highlightPoint = function(
               a,
               b) { k.select(".nv-bars .nv-bar-0-" + a).classed("hover", b) },
           b.clearHighlights =
               function() {
             k.select(".nv-bars .nv-bar.hover").classed("hover", !1)
           },
           b.dispatch = u, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return h }, set : function(a) { h = a }},
             height :
                 {get : function() { return i }, set : function(a) { i = a }},
             forceX :
                 {get : function() { return p }, set : function(a) { p = a }},
             forceY :
                 {get : function() { return q }, set : function(a) { q = a }},
             padData :
                 {get : function() { return r }, set : function(a) { r = a }},
             x : {get : function() { return n }, set : function(a) { n = a }},
             y : {get : function() { return o }, set : function(a) { o = a }},
             xScale :
                 {get : function() { return l }, set : function(a) { l = a }},
             yScale :
                 {get : function() { return m }, set : function(a) { m = a }},
             xDomain :
                 {get : function() { return c }, set : function(a) { c = a }},
             yDomain :
                 {get : function() { return d }, set : function(a) { d = a }},
             xRange :
                 {get : function() { return e }, set : function(a) { e = a }},
             yRange :
                 {get : function() { return f }, set : function(a) { f = a }},
             clipEdge :
                 {get : function() { return s }, set : function(a) { s = a }},
             id : {get : function() { return j }, set : function(a) { j = a }},
             interactive :
                 {get : function() { return v }, set : function(a) { v = a }},
             margin : {
               get : function() { return g },
               set : function(a) {
                 g.top = void 0 !== a.top ? a.top : g.top,
                 g.right = void 0 !== a.right ? a.right : g.right,
                 g.bottom = void 0 !== a.bottom ? a.bottom : g.bottom,
                 g.left = void 0 !== a.left ? a.left : g.left
               }
             },
             color : {
               get : function() { return t },
               set : function(b) { t = a.utils.getColor(b) }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.historicalBarChart = function(b) {
    "use strict";
    function c(b) {
      return b.each(function(k) {
        z.reset(), z.models(f), q && z.models(g), r && z.models(h);
        var w = d3.select(this);
        a.utils.initSVG(w);
        var A = a.utils.availableWidth(n, w, l),
            B = a.utils.availableHeight(o, w, l);
        if (c.update = function() { w.transition().duration(y).call(c) },
            c.container = this,
            u.disabled = k.map(function(a) { return !!a.disabled }), !v) {
          var C;
          v = {};
          for (C in u)
            u[C] instanceof Array ? v[C] = u[C].slice(0) : v[C] = u[C]
        }
        if (!(k && k.length &&
              k.filter(function(a) { return a.values.length }).length))
          return a.utils.noData(c, w), c;
        w.selectAll(".nv-noData").remove(), d = f.xScale(), e = f.yScale();
        var D = w.selectAll("g.nv-wrap.nv-historicalBarChart").data([ k ]),
            E = D.enter()
                    .append("g")
                    .attr("class", "nvd3 nv-wrap nv-historicalBarChart")
                    .append("g"),
            F = D.select("g");
        E.append("g").attr("class", "nv-x nv-axis"),
            E.append("g").attr("class", "nv-y nv-axis"),
            E.append("g").attr("class", "nv-barsWrap"),
            E.append("g").attr("class", "nv-legendWrap"),
            E.append("g").attr("class", "nv-interactive"),
            p ? (i.width(A), F.select(".nv-legendWrap").datum(k).call(i),
                 i.height() > l.top &&
                     (l.top = i.height(), B = a.utils.availableHeight(o, w, l)),
                 D.select(".nv-legendWrap")
                     .attr("transform", "translate(0," + -l.top + ")"))
              : F.select(".nv-legendWrap").selectAll("*").remove(),
            D.attr("transform", "translate(" + l.left + "," + l.top + ")"),
            s && F.select(".nv-y.nv-axis")
                     .attr("transform", "translate(" + A + ",0)"),
            t && (j.width(A)
                      .height(B)
                      .margin({left : l.left, top : l.top})
                      .svgContainer(w)
                      .xScale(d),
                  D.select(".nv-interactive").call(j)),
            f.width(A).height(B).color(
                k.map(function(a, b) { return a.color || m(a, b) })
                    .filter(function(a, b) { return !k[b].disabled }));
        var G = F.select(".nv-barsWrap")
                    .datum(k.filter(function(a) { return !a.disabled }));
        G.transition().call(f),
            q && (g.scale(d)
                      ._ticks(a.utils.calcTicksX(A / 100, k))
                      .tickSize(-B, 0),
                  F.select(".nv-x.nv-axis")
                      .attr("transform", "translate(0," + e.range()[0] + ")"),
                  F.select(".nv-x.nv-axis").transition().call(g)),
            r && (h.scale(e)
                      ._ticks(a.utils.calcTicksY(B / 36, k))
                      .tickSize(-A, 0),
                  F.select(".nv-y.nv-axis").transition().call(h)),
            j.dispatch.on("elementMousemove", function(b) {
              f.clearHighlights();
              var d, e, i, l = [];
              k.filter(function(a, b) { return a.seriesIndex = b, !a.disabled })
                  .forEach(function(g, h) {
                    e = a.interactiveBisect(g.values, b.pointXValue, c.x()),
                    f.highlightPoint(e, !0);
                    var j = g.values[e];
                    void 0 !== j &&
                        (void 0 === d && (d = j),
                         void 0 === i && (i = c.xScale()(c.x()(j, e))), l.push({
                           key : g.key,
                           value : c.y()(j, e),
                           color : m(g, g.seriesIndex),
                           data : g.values[e]
                         }))
                  });
              var n = g.tickFormat()(c.x()(d, e));
              j.tooltip
                  .valueFormatter(function(a, b) { return h.tickFormat()(a) })
                  .data({value : n, index : e, series : l})(),
                  j.renderGuideLine(i)
            }), j.dispatch.on("elementMouseout", function(a) {
              x.tooltipHide(), f.clearHighlights()
            }), i.dispatch.on("legendClick", function(a, d) {
              a.disabled = !a.disabled,
              k.filter(function(a) { return !a.disabled }).length ||
                  k.map(function(a) {
                    return a.disabled = !1,
                           D.selectAll(".nv-series").classed("disabled", !1), a
                  }),
              u.disabled = k.map(function(a) { return !!a.disabled }),
              x.stateChange(u), b.transition().call(c)
            }), i.dispatch.on("legendDblclick", function(a) {
              k.forEach(function(a) { a.disabled = !0 }),
                  a.disabled = !1,
                  u.disabled = k.map(function(a) { return !!a.disabled }),
                  x.stateChange(u), c.update()
            }), x.on("changeState", function(a) {
              "undefined" != typeof a.disabled &&
                  (k.forEach(function(b, c) { b.disabled = a.disabled[c] }),
                   u.disabled = a.disabled),
                  c.update()
            })
      }),
             z.renderEnd("historicalBarChart immediate"), c
    }
    var d, e, f = b || a.models.historicalBar(), g = a.models.axis(),
              h = a.models.axis(), i = a.models.legend(),
              j = a.interactiveGuideline(), k = a.models.tooltip(),
              l = {top : 30, right : 90, bottom : 50, left : 90},
              m = a.utils.defaultColor(), n = null, o = null, p = !1, q = !0,
              r = !0, s = !1, t = !1, u = {}, v = null, w = null,
              x = d3.dispatch("tooltipHide", "stateChange", "changeState",
                              "renderEnd"),
              y = 250;
    g.orient("bottom").tickPadding(7), h.orient(s ? "right" : "left"),
        k.duration(0)
            .headerEnabled(!1)
            .valueFormatter(function(a, b) { return h.tickFormat()(a, b) })
            .headerFormatter(function(a, b) { return g.tickFormat()(a, b) });
    var z = a.utils.renderWatch(x, 0);
    return f.dispatch.on("elementMouseover.tooltip",
                         function(a) {
                           a.series = {
                             key : c.x()(a.data),
                             value : c.y()(a.data),
                             color : a.color
                           },
                           k.data(a).hidden(!1)
                         }),
           f.dispatch.on("elementMouseout.tooltip",
                         function(a) { k.hidden(!0) }),
           f.dispatch.on("elementMousemove.tooltip", function(a) { k() }),
           c.dispatch = x, c.bars = f, c.legend = i, c.xAxis = g, c.yAxis = h,
           c.interactiveLayer = j, c.tooltip = k,
           c.options = a.utils.optionsFunc.bind(c),
           c._options = Object.create({}, {
             width :
                 {get : function() { return n }, set : function(a) { n = a }},
             height :
                 {get : function() { return o }, set : function(a) { o = a }},
             showLegend :
                 {get : function() { return p }, set : function(a) { p = a }},
             showXAxis :
                 {get : function() { return q }, set : function(a) { q = a }},
             showYAxis :
                 {get : function() { return r }, set : function(a) { r = a }},
             defaultState :
                 {get : function() { return v }, set : function(a) { v = a }},
             noData :
                 {get : function() { return w }, set : function(a) { w = a }},
             margin : {
               get : function() { return l },
               set : function(a) {
                 l.top = void 0 !== a.top ? a.top : l.top,
                 l.right = void 0 !== a.right ? a.right : l.right,
                 l.bottom = void 0 !== a.bottom ? a.bottom : l.bottom,
                 l.left = void 0 !== a.left ? a.left : l.left
               }
             },
             color : {
               get : function() { return m },
               set : function(
                   b) { m = a.utils.getColor(b), i.color(m), f.color(m) }
             },
             duration : {
               get : function() { return y },
               set : function(
                   a) { y = a, z.reset(y), h.duration(y), g.duration(y) }
             },
             rightAlignYAxis : {
               get : function() { return s },
               set : function(a) { s = a, h.orient(a ? "right" : "left") }
             },
             useInteractiveGuideline : {
               get : function() { return t },
               set : function(a) { t = a, a === !0 && c.interactive(!1) }
             }
           }),
           a.utils.inheritOptions(c, f), a.utils.initOptions(c), c
  }, a.models.ohlcBarChart = function() {
    var b = a.models.historicalBarChart(a.models.ohlcBar());
    return b.useInteractiveGuideline(!0),
           b.interactiveLayer.tooltip.contentGenerator(function(a) {
             var c = a.series[0].data,
                 d = c.open < c.close ? "2ca02c" : "d62728";
             return '<h3 style="color: #' + d + '">' + a.value +
                    "</h3><table><tr><td>open:</td><td>" +
                    b.yAxis.tickFormat()(c.open) +
                    "</td></tr><tr><td>close:</td><td>" +
                    b.yAxis.tickFormat()(c.close) +
                    "</td></tr><tr><td>high</td><td>" +
                    b.yAxis.tickFormat()(c.high) +
                    "</td></tr><tr><td>low:</td><td>" +
                    b.yAxis.tickFormat()(c.low) + "</td></tr></table>"
           }),
           b
  }, a.models.candlestickBarChart = function() {
    var b = a.models.historicalBarChart(a.models.candlestickBar());
    return b.useInteractiveGuideline(!0),
           b.interactiveLayer.tooltip.contentGenerator(function(a) {
             var c = a.series[0].data,
                 d = c.open < c.close ? "2ca02c" : "d62728";
             return '<h3 style="color: #' + d + '">' + a.value +
                    "</h3><table><tr><td>open:</td><td>" +
                    b.yAxis.tickFormat()(c.open) +
                    "</td></tr><tr><td>close:</td><td>" +
                    b.yAxis.tickFormat()(c.close) +
                    "</td></tr><tr><td>high</td><td>" +
                    b.yAxis.tickFormat()(c.high) +
                    "</td></tr><tr><td>low:</td><td>" +
                    b.yAxis.tickFormat()(c.low) + "</td></tr></table>"
           }),
           b
  }, a.models.legend = function() {
    "use strict";
    function b(r) {
      function s(a, b) {
        return "furious" != q ? "#000"
                              : o ? a.disengaged ? "#000" : "#fff"
                                  : o ? void 0
                                      : (a.color || (a.color = h(a, b)),
                                         a.disabled ? a.color : "#fff")
      }
      function t(a, b) {
        return o && "furious" == q && a.disengaged ? "#eee" : a.color || h(a, b)
      }
      function u(a, b) { return o && "furious" == q ? 1 : a.disabled ? 0 : 1 }
      return r.each(function(b) {
        var h = d - c.left - c.right, r = d3.select(this);
        a.utils.initSVG(r);
        var v = r.selectAll("g.nv-legend").data([ b ]),
            w = v.enter()
                    .append("g")
                    .attr("class", "nvd3 nv-legend")
                    .append("g"),
            x = v.select("g");
        v.attr("transform", "translate(" + c.left + "," + c.top + ")");
        var y, z, A = x.selectAll(".nv-series").data(function(a) {
          return "furious" != q
                     ? a
                     : a.filter(function(a) { return o ? !0 : !a.disengaged })
        }),
                  B = A.enter().append("g").attr("class", "nv-series");
        switch (q) {
        case "furious":
          z = 23;
          break;
        case "classic":
          z = 20
        }
        if ("classic" == q)
          B.append("circle")
              .style("stroke-width", 2)
              .attr("class", "nv-legend-symbol")
              .attr("r", 5),
              y = A.select(".nv-legend-symbol");
        else if ("furious" == q) {
          B.append("rect")
              .style("stroke-width", 2)
              .attr("class", "nv-legend-symbol")
              .attr("rx", 3)
              .attr("ry", 3),
              y = A.select(".nv-legend-symbol"),
              B.append("g")
                  .attr("class", "nv-check-box")
                  .property(
                      "innerHTML",
                      '<path d="M0.5,5 L22.5,5 L22.5,26.5 L0.5,26.5 L0.5,5 Z" class="nv-box"></path><path d="M5.5,12.8618467 L11.9185089,19.2803556 L31,0.198864511" class="nv-check"></path>')
                  .attr("transform", "translate(-10,-8)scale(0.5)");
          var C = A.select(".nv-check-box");
          C.each(function(
              a,
              b) { d3.select(this).selectAll("path").attr("stroke", s(a, b)) })
        }
        B.append("text")
            .attr("text-anchor", "start")
            .attr("class", "nv-legend-text")
            .attr("dy", ".32em")
            .attr("dx", "8");
        var D = A.select("text.nv-legend-text");
        A.on("mouseover", function(a, b) { p.legendMouseover(a, b) })
            .on("mouseout", function(a, b) { p.legendMouseout(a, b) })
            .on("click",
                function(a, b) {
                  p.legendClick(a, b);
                  var c = A.data();
                  if (m) {
                    if ("classic" == q)
                      n ? (c.forEach(function(a) { a.disabled = !0 }),
                           a.disabled = !1)
                        : (a.disabled = !a.disabled,
                           c.every(function(a) { return a.disabled }) &&
                               c.forEach(function(a) { a.disabled = !1 }));
                    else if ("furious" == q)
                      if (o)
                        a.disengaged = !a.disengaged,
                        a.userDisabled = void 0 == a.userDisabled
                                             ? !!a.disabled
                                             : a.userDisabled,
                        a.disabled = a.disengaged || a.userDisabled;
                      else if (!o) {
                        a.disabled = !a.disabled, a.userDisabled = a.disabled;
                        var d = c.filter(function(a) { return !a.disengaged });
                        d.every(function(a) { return a.userDisabled }) &&
                            c.forEach(function(
                                a) { a.disabled = a.userDisabled = !1 })
                      }
                    p.stateChange({
                      disabled : c.map(function(a) { return !!a.disabled }),
                      disengaged : c.map(function(a) { return !!a.disengaged })
                    })
                  }
                })
            .on("dblclick",
                function(a, b) {
                  if (("furious" != q || !o) && (p.legendDblclick(a, b), m)) {
                    var c = A.data();
                    c.forEach(function(a) {
                      a.disabled = !0,
                      "furious" == q && (a.userDisabled = a.disabled)
                    }),
                        a.disabled = !1,
                        "furious" == q && (a.userDisabled = a.disabled),
                        p.stateChange({
                          disabled : c.map(function(a) { return !!a.disabled })
                        })
                  }
                }),
            A.classed("nv-disabled", function(a) { return a.userDisabled }),
            A.exit().remove(),
            D.attr("fill", s).text(function(a) { return g(f(a)) });
        var E = 0;
        if (j) {
          var F = [];
          A.each(function(b, c) {
            var d;
            if (g(f(b)) && g(f(b)).length > i) {
              var e = g(f(b)).substring(0, i);
              d = d3.select(this).select("text").text(e + "..."),
              d3.select(this).append("svg:title").text(g(f(b)))
            } else
              d = d3.select(this).select("text");
            var h;
            try {
              if (h = d.node().getComputedTextLength(), 0 >= h)
                throw Error()
            } catch (j) {
              h = a.utils.calcApproxTextWidth(d)
            }
            F.push(h + k)
          });
          var G = 0, H = [];
          for (E = 0; h > E && G < F.length;)
            H[G] = F[G], E += F[G++];
          for (0 === G && (G = 1); E > h && G > 1;) {
            H = [], G--;
            for (var I = 0; I < F.length; I++)
              F[I] > (H[I % G] || 0) && (H[I % G] = F[I]);
            E = H.reduce(function(a, b, c, d) { return a + b })
          }
          for (var J = [], K = 0, L = 0; G > K; K++)
            J[K] = L, L += H[K];
          A.attr("transform",
                 function(a, b) {
                   return "translate(" + J[b % G] + "," +
                          (5 + Math.floor(b / G) * z) + ")"
                 }),
              l ? x.attr("transform",
                         "translate(" + (d - c.right - E) + "," + c.top + ")")
                : x.attr("transform", "translate(0," + c.top + ")"),
              e = c.top + c.bottom + Math.ceil(F.length / G) * z
        } else {
          var M, N = 5, O = 5, P = 0;
          A.attr("transform",
                 function(a, b) {
                   var e = d3.select(this)
                               .select("text")
                               .node()
                               .getComputedTextLength() +
                           k;
                   return M = O,
                          d < c.left + c.right + M + e && (O = M = 5, N += z),
                          O += e, O > P && (P = O), M + P > E && (E = M + P),
                          "translate(" + M + "," + N + ")"
                 }),
              x.attr("transform",
                     "translate(" + (d - c.right - P) + "," + c.top + ")"),
              e = c.top + c.bottom + N + 15
        }
        if ("furious" == q) {
          y.attr("width",
                 function(a, b) { return D[0][b].getComputedTextLength() + 27 })
              .attr("height", 18)
              .attr("y", -9)
              .attr("x", -15),
              w.insert("rect", ":first-child")
                  .attr("class", "nv-legend-bg")
                  .attr("fill", "#eee")
                  .attr("opacity", 0);
          var Q = x.select(".nv-legend-bg");
          Q.transition()
              .duration(300)
              .attr("x", -z)
              .attr("width", E + z - 12)
              .attr("height", e + 10)
              .attr("y", -c.top - 10)
              .attr("opacity", o ? 1 : 0)
        }
        y.style("fill", t).style("fill-opacity", u).style("stroke", t)
      }),
             b
    }
    var c = {top : 5, right : 0, bottom : 5, left : 0}, d = 400, e = 20,
        f = function(a) { return a.key }, g = function(a) { return a },
        h = a.utils.getColor(), i = 20, j = !0, k = 32, l = !0, m = !0, n = !1,
        o = !1,
        p = d3.dispatch("legendClick", "legendDblclick", "legendMouseover",
                        "legendMouseout", "stateChange"),
        q = "classic";
    return b.dispatch = p, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return d }, set : function(a) { d = a }},
             height :
                 {get : function() { return e }, set : function(a) { e = a }},
             key : {get : function() { return f }, set : function(a) { f = a }},
             keyFormatter :
                 {get : function() { return g }, set : function(a) { g = a }},
             align :
                 {get : function() { return j }, set : function(a) { j = a }},
             maxKeyLength :
                 {get : function() { return i }, set : function(a) { i = a }},
             rightAlign :
                 {get : function() { return l }, set : function(a) { l = a }},
             padding :
                 {get : function() { return k }, set : function(a) { k = a }},
             updateState :
                 {get : function() { return m }, set : function(a) { m = a }},
             radioButtonMode :
                 {get : function() { return n }, set : function(a) { n = a }},
             expanded :
                 {get : function() { return o }, set : function(a) { o = a }},
             vers :
                 {get : function() { return q }, set : function(a) { q = a }},
             margin : {
               get : function() { return c },
               set : function(a) {
                 c.top = void 0 !== a.top ? a.top : c.top,
                 c.right = void 0 !== a.right ? a.right : c.right,
                 c.bottom = void 0 !== a.bottom ? a.bottom : c.bottom,
                 c.left = void 0 !== a.left ? a.left : c.left
               }
             },
             color : {
               get : function() { return h },
               set : function(b) { h = a.utils.getColor(b) }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.line = function() {
    "use strict";
    function b(r) {
      return v.reset(), v.models(e), r.each(function(b) {
        i = d3.select(this);
        var r = a.utils.availableWidth(g, i, f),
            s = a.utils.availableHeight(h, i, f);
        a.utils.initSVG(i), c = e.xScale(), d = e.yScale(), t = t || c,
                            u = u || d;
        var w = i.selectAll("g.nv-wrap.nv-line").data([ b ]),
            x = w.enter().append("g").attr("class", "nvd3 nv-wrap nv-line"),
            y = x.append("defs"), z = x.append("g"), A = w.select("g");
        z.append("g").attr("class", "nv-groups"),
            z.append("g").attr("class", "nv-scatterWrap"),
            w.attr("transform", "translate(" + f.left + "," + f.top + ")"),
            e.width(r).height(s);
        var B = w.select(".nv-scatterWrap");
        B.call(e),
            y.append("clipPath")
                .attr("id", "nv-edge-clip-" + e.id())
                .append("rect"),
            w.select("#nv-edge-clip-" + e.id() + " rect")
                .attr("width", r)
                .attr("height", s > 0 ? s : 0),
            A.attr("clip-path", p ? "url(#nv-edge-clip-" + e.id() + ")" : ""),
            B.attr("clip-path", p ? "url(#nv-edge-clip-" + e.id() + ")" : "");
        var C =
            w.select(".nv-groups")
                .selectAll(".nv-group")
                .data(function(a) { return a }, function(a) { return a.key });
        C.enter()
            .append("g")
            .style("stroke-opacity", 1e-6)
            .style("stroke-width", function(a) { return a.strokeWidth || j })
            .style("fill-opacity", 1e-6),
            C.exit().remove(),
            C.attr("class",
                   function(a, b) {
                     return (a.classed || "") + " nv-group nv-series-" + b
                   })
                .classed("hover", function(a) { return a.hover })
                .style("fill", function(a, b) { return k(a, b) })
                .style("stroke", function(a, b) { return k(a, b) }),
            C.watchTransition(v, "line: groups")
                .style("stroke-opacity", 1)
                .style("fill-opacity",
                       function(a) { return a.fillOpacity || .5 });
        var D = C.selectAll("path.nv-area")
                    .data(function(a) { return o(a) ? [ a ] : [] });
        D.enter()
            .append("path")
            .attr("class", "nv-area")
            .attr("d",
                  function(b) {
                    return d3.svg.area()
                        .interpolate(q)
                        .defined(n)
                        .x(function(b,
                                    c) { return a.utils.NaNtoZero(t(l(b, c))) })
                        .y0(function(
                            b, c) { return a.utils.NaNtoZero(u(m(b, c))) })
                        .y1(function(a, b) {
                          return u(d.domain()[0] <= 0
                                       ? d.domain()[1] >= 0 ? 0 : d.domain()[1]
                                       : d.domain()[0])
                        })
                        .apply(this, [ b.values ])
                  }),
            C.exit().selectAll("path.nv-area").remove(),
            D.watchTransition(v, "line: areaPaths").attr("d", function(b) {
              return d3.svg.area()
                  .interpolate(q)
                  .defined(n)
                  .x(function(b, d) { return a.utils.NaNtoZero(c(l(b, d))) })
                  .y0(function(b, c) { return a.utils.NaNtoZero(d(m(b, c))) })
                  .y1(function(a, b) {
                    return d(d.domain()[0] <= 0
                                 ? d.domain()[1] >= 0 ? 0 : d.domain()[1]
                                 : d.domain()[0])
                  })
                  .apply(this, [ b.values ])
            });
        var E = C.selectAll("path.nv-line")
                    .data(function(a) { return [ a.values ] });
        E.enter()
            .append("path")
            .attr("class", "nv-line")
            .attr(
                "d",
                d3.svg.line()
                    .interpolate(q)
                    .defined(n)
                    .x(function(b, c) { return a.utils.NaNtoZero(t(l(b, c))) })
                    .y(function(b,
                                c) { return a.utils.NaNtoZero(u(m(b, c))) })),
            E.watchTransition(v, "line: linePaths")
                .attr("d",
                      d3.svg.line()
                          .interpolate(q)
                          .defined(n)
                          .x(function(
                              b, d) { return a.utils.NaNtoZero(c(l(b, d))) })
                          .y(function(
                              b, c) { return a.utils.NaNtoZero(d(m(b, c))) })),
            t = c.copy(), u = d.copy()
      }),
             v.renderEnd("line immediate"), b
    }
    var c, d,
        e = a.models.scatter(), f = {top : 0, right : 0, bottom : 0, left : 0},
        g = 960, h = 500, i = null, j = 1.5, k = a.utils.defaultColor(),
        l = function(a) { return a.x }, m = function(a) { return a.y },
        n = function(a, b) { return !isNaN(m(a, b)) && null !== m(a, b) },
        o = function(a) { return a.area }, p = !1, q = "linear", r = 250,
        s = d3.dispatch("elementClick", "elementMouseover", "elementMouseout",
                        "renderEnd");
    e.pointSize(16).pointDomain([ 16, 256 ]);
    var t, u, v = a.utils.renderWatch(s, r);
    return b.dispatch = s, b.scatter = e,
           e.dispatch.on("elementClick",
                         function() { s.elementClick.apply(this, arguments) }),
           e.dispatch.on(
               "elementMouseover",
               function() { s.elementMouseover.apply(this, arguments) }),
           e.dispatch.on(
               "elementMouseout",
               function() { s.elementMouseout.apply(this, arguments) }),
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return g }, set : function(a) { g = a }},
             height :
                 {get : function() { return h }, set : function(a) { h = a }},
             defined :
                 {get : function() { return n }, set : function(a) { n = a }},
             interpolate :
                 {get : function() { return q }, set : function(a) { q = a }},
             clipEdge :
                 {get : function() { return p }, set : function(a) { p = a }},
             margin : {
               get : function() { return f },
               set : function(a) {
                 f.top = void 0 !== a.top ? a.top : f.top,
                 f.right = void 0 !== a.right ? a.right : f.right,
                 f.bottom = void 0 !== a.bottom ? a.bottom : f.bottom,
                 f.left = void 0 !== a.left ? a.left : f.left
               }
             },
             duration : {
               get : function() { return r },
               set : function(a) { r = a, v.reset(r), e.duration(r) }
             },
             isArea : {
               get : function() { return o },
               set : function(a) { o = d3.functor(a) }
             },
             x : {
               get : function() { return l },
               set : function(a) { l = a, e.x(a) }
             },
             y : {
               get : function() { return m },
               set : function(a) { m = a, e.y(a) }
             },
             color : {
               get : function() { return k },
               set : function(b) { k = a.utils.getColor(b), e.color(k) }
             }
           }),
           a.utils.inheritOptions(b, e), a.utils.initOptions(b), b
  }, a.models.lineChart = function() {
    "use strict";
    function b(j) {
      return B.reset(), B.models(e), r && B.models(f), s && B.models(g),
             j.each(function(j) {
               function y() {
                 r && L.select(".nv-focus .nv-x.nv-axis")
                          .transition()
                          .duration(A)
                          .call(f)
               }
               function B() {
                 s && L.select(".nv-focus .nv-y.nv-axis")
                          .transition()
                          .duration(A)
                          .call(g)
               }
               function E(a) {
                 var b = L.select(".nv-focus .nv-linesWrap")
                             .datum(j.filter(function(a) {
                                       return !a.disabled
                                     }).map(function(b, c) {
                               return {
                                 key: b.key, area: b.area, classed: b.classed,
                                     values: b.values.filter(function(b, c) {
                                       return e.x()(b, c) >= a[0] &&
                                              e.x()(b, c) <= a[1]
                                     }),
                                     disableTooltip: b.disableTooltip
                               }
                             }));
                 b.transition().duration(A).call(e), y(), B()
               }
               var F = d3.select(this);
               a.utils.initSVG(F);
               var G = a.utils.availableWidth(n, F, l),
                   H = a.utils.availableHeight(o, F, l) - (v ? k.height() : 0);
               if (b.update =
                       function() {
                         0 === A ? F.call(b)
                                 : F.transition().duration(A).call(b)
                       },
                   b.container = this,
                   w.setter(D(j), b.update).getter(C(j)).update(),
                   w.disabled = j.map(function(a) { return !!a.disabled }),
                   !x) {
                 var I;
                 x = {};
                 for (I in w)
                   w[I] instanceof Array ? x[I] = w[I].slice(0) : x[I] = w[I]
               }
               if (!(j && j.length &&
                     j.filter(function(a) { return a.values.length }).length))
                 return a.utils.noData(b, F), b;
               F.selectAll(".nv-noData").remove(),
                   k.dispatch.on("onBrush", function(a) { E(a) }),
                   c = e.xScale(), d = e.yScale();
               var J = F.selectAll("g.nv-wrap.nv-lineChart").data([ j ]),
                   K = J.enter()
                           .append("g")
                           .attr("class", "nvd3 nv-wrap nv-lineChart")
                           .append("g"),
                   L = J.select("g");
               K.append("g").attr("class", "nv-legendWrap");
               var M = K.append("g").attr("class", "nv-focus");
               M.append("g").attr("class", "nv-background").append("rect"),
                   M.append("g").attr("class", "nv-x nv-axis"),
                   M.append("g").attr("class", "nv-y nv-axis"),
                   M.append("g").attr("class", "nv-linesWrap"),
                   M.append("g").attr("class", "nv-interactive");
               K.append("g").attr("class", "nv-focusWrap");
               p ? (h.width(G), L.select(".nv-legendWrap").datum(j).call(h),
                    "bottom" === q
                        ? J.select(".nv-legendWrap")
                              .attr("transform", "translate(0," + H + ")")
                        : "top" === q &&
                              (h.height() > l.top &&
                                   (l.top = h.height(),
                                    H = a.utils.availableHeight(o, F, l) -
                                        (v ? k.height() : 0)),
                               J.select(".nv-legendWrap")
                                   .attr("transform",
                                         "translate(0," + -l.top + ")")))
                 : L.select(".nv-legendWrap").selectAll("*").remove(),
                   J.attr("transform",
                          "translate(" + l.left + "," + l.top + ")"),
                   t && L.select(".nv-y.nv-axis")
                            .attr("transform", "translate(" + G + ",0)"),
                   u && (i.width(G)
                             .height(H)
                             .margin({left : l.left, top : l.top})
                             .svgContainer(F)
                             .xScale(c),
                         J.select(".nv-interactive").call(i)),
                   L.select(".nv-focus .nv-background rect")
                       .attr("width", G)
                       .attr("height", H),
                   e.width(G).height(H).color(
                       j.map(function(a, b) { return a.color || m(a, b) })
                           .filter(function(a, b) { return !j[b].disabled }));
               var N = L.select(".nv-linesWrap")
                           .datum(j.filter(function(a) { return !a.disabled }));
               if (r && f.scale(c)
                            ._ticks(a.utils.calcTicksX(G / 100, j))
                            .tickSize(-H, 0),
                   s && g.scale(d)
                            ._ticks(a.utils.calcTicksY(H / 36, j))
                            .tickSize(-G, 0),
                   L.select(".nv-focus .nv-x.nv-axis")
                       .attr("transform", "translate(0," + H + ")"),
                   v) {
                 k.width(G),
                     L.select(".nv-focusWrap")
                         .attr("transform",
                               "translate(0," +
                                   (H + l.bottom + k.margin().top) + ")")
                         .datum(j.filter(function(a) { return !a.disabled }))
                         .call(k);
                 var O = k.brush.empty() ? k.xDomain() : k.brush.extent();
                 null !== O && E(O)
               } else
                 N.call(e), y(), B();
               h.dispatch.on("stateChange", function(a) {
                 for (var c in a)
                   w[c] = a[c];
                 z.stateChange(w), b.update()
               }), i.dispatch.on("elementMousemove", function(d) {
                 e.clearHighlights();
                 var f, h, l, n = [];
                 if (j.filter(function(a, b) {
                        return a.seriesIndex = b,
                               !a.disabled && !a.disableTooltip
                      }).forEach(function(g, i) {
                       var j = v ? k.brush.empty() ? k.xScale().domain()
                                                   : k.brush.extent()
                                 : c.domain(),
                           o = g.values.filter(function(a, b) {
                             return e.x()(a, b) >= j[0] && e.x()(a, b) <= j[1]
                           });
                       h = a.interactiveBisect(o, d.pointXValue, e.x());
                       var p = o[h], q = b.y()(p, h);
                       null !== q && e.highlightPoint(g.seriesIndex, h, !0),
                           void 0 !== p &&
                               (void 0 === f && (f = p),
                                void 0 === l && (l = b.xScale()(b.x()(p, h))),
                                n.push({
                                  key : g.key,
                                  value : q,
                                  color : m(g, g.seriesIndex),
                                  data : p
                                }))
                     }),
                     n.length > 2) {
                   var o = b.yScale().invert(d.mouseY),
                       p = Math.abs(b.yScale().domain()[0] -
                                    b.yScale().domain()[1]),
                       q = .03 * p,
                       r = a.nearestValueIndex(
                           n.map(function(a) { return a.value }), o, q);
                   null !== r && (n[r].highlight = !0)
                 }
                 var s = function(
                     a, b) { return null == a ? "N/A" : g.tickFormat()(a) };
                 i.tooltip.valueFormatter(i.tooltip.valueFormatter() || s)
                     .data({value : b.x()(f, h), index : h, series : n})(),
                     i.renderGuideLine(l)
               }), i.dispatch.on("elementClick", function(c) {
                 var d, f = [];
                 j.filter(function(a, b) {
                    return a.seriesIndex = b, !a.disabled
                  }).forEach(function(e) {
                   var g = a.interactiveBisect(e.values, c.pointXValue, b.x()),
                       h = e.values[g];
                   if ("undefined" != typeof h) {
                     "undefined" == typeof d && (d = b.xScale()(b.x()(h, g)));
                     var i = b.yScale()(b.y()(h, g));
                     f.push({
                       point : h,
                       pointIndex : g,
                       pos : [ d, i ],
                       seriesIndex : e.seriesIndex,
                       series : e
                     })
                   }
                 }),
                     e.dispatch.elementClick(f)
               }), i.dispatch.on("elementMouseout", function(a) {
                 e.clearHighlights()
               }), z.on("changeState", function(a) {
                 "undefined" != typeof a.disabled &&
                     j.length === a.disabled.length &&
                     (j.forEach(function(b, c) { b.disabled = a.disabled[c] }),
                      w.disabled = a.disabled),
                     b.update()
               })
             }),
             B.renderEnd("lineChart immediate"), b
    }
    var c, d, e = a.models.line(), f = a.models.axis(), g = a.models.axis(),
              h = a.models.legend(), i = a.interactiveGuideline(),
              j = a.models.tooltip(), k = a.models.focus(a.models.line()),
              l = {top : 30, right : 20, bottom : 50, left : 60},
              m = a.utils.defaultColor(), n = null, o = null, p = !0, q = "top",
              r = !0, s = !0, t = !1, u = !1, v = !1, w = a.utils.state(),
              x = null, y = null,
              z = d3.dispatch("tooltipShow", "tooltipHide", "stateChange",
                              "changeState", "renderEnd"),
              A = 250;
    f.orient("bottom").tickPadding(7), g.orient(t ? "right" : "left"),
        e.clipEdge(!0).duration(0),
        j.valueFormatter(function(a, b) { return g.tickFormat()(a, b) })
            .headerFormatter(function(a, b) { return f.tickFormat()(a, b) }),
        i.tooltip.valueFormatter(function(a, b) { return g.tickFormat()(a, b) })
            .headerFormatter(function(a, b) { return f.tickFormat()(a, b) });
    var B = a.utils.renderWatch(z, A), C = function(a) {
      return function() {
        return {
          active: a.map(function(a) { return !a.disabled })
        }
      }
    }, D = function(a) {
      return function(b) {
        void 0 !== b.active &&
            a.forEach(function(a, c) { a.disabled = !b.active[c] })
      }
    };
    return e.dispatch.on(
               "elementMouseover.tooltip",
               function(a) { a.series.disableTooltip || j.data(a).hidden(!1) }),
           e.dispatch.on("elementMouseout.tooltip",
                         function(a) { j.hidden(!0) }),
           b.dispatch = z, b.lines = e, b.legend = h, b.focus = k, b.xAxis = f,
           b.x2Axis = k.xAxis, b.yAxis = g, b.y2Axis = k.yAxis,
           b.interactiveLayer = i, b.tooltip = j, b.state = w, b.dispatch = z,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return n }, set : function(a) { n = a }},
             height :
                 {get : function() { return o }, set : function(a) { o = a }},
             showLegend :
                 {get : function() { return p }, set : function(a) { p = a }},
             legendPosition :
                 {get : function() { return q }, set : function(a) { q = a }},
             showXAxis :
                 {get : function() { return r }, set : function(a) { r = a }},
             showYAxis :
                 {get : function() { return s }, set : function(a) { s = a }},
             defaultState :
                 {get : function() { return x }, set : function(a) { x = a }},
             noData :
                 {get : function() { return y }, set : function(a) { y = a }},
             focusEnable :
                 {get : function() { return v }, set : function(a) { v = a }},
             focusHeight : {
               get : function() { return k.height() },
               set : function(a) { k.height(a) }
             },
             focusShowAxisX : {
               get : function() { return k.showXAxis() },
               set : function(a) { k.showXAxis(a) }
             },
             focusShowAxisY : {
               get : function() { return k.showYAxis() },
               set : function(a) { k.showYAxis(a) }
             },
             brushExtent : {
               get : function() { return k.brushExtent() },
               set : function(a) { k.brushExtent(a) }
             },
             focusMargin : {
               get : function() { return k.margin },
               set : function(a) {
                 k.margin.top = void 0 !== a.top ? a.top : k.margin.top,
                 k.margin.right = void 0 !== a.right ? a.right : k.margin.right,
                 k.margin.bottom =
                     void 0 !== a.bottom ? a.bottom : k.margin.bottom,
                 k.margin.left = void 0 !== a.left ? a.left : k.margin.left
               }
             },
             margin : {
               get : function() { return l },
               set : function(a) {
                 l.top = void 0 !== a.top ? a.top : l.top,
                 l.right = void 0 !== a.right ? a.right : l.right,
                 l.bottom = void 0 !== a.bottom ? a.bottom : l.bottom,
                 l.left = void 0 !== a.left ? a.left : l.left
               }
             },
             duration : {
               get : function() { return A },
               set : function(a) {
                 A = a, B.reset(A), e.duration(A), k.duration(A), f.duration(A),
                 g.duration(A)
               }
             },
             color : {
               get : function() { return m },
               set : function(b) {
                 m = a.utils.getColor(b), h.color(m), e.color(m), k.color(m)
               }
             },
             interpolate : {
               get : function() { return e.interpolate() },
               set : function(a) { e.interpolate(a), k.interpolate(a) }
             },
             xTickFormat : {
               get : function() { return f.tickFormat() },
               set : function(a) { f.tickFormat(a), k.xTickFormat(a) }
             },
             yTickFormat : {
               get : function() { return g.tickFormat() },
               set : function(a) { g.tickFormat(a), k.yTickFormat(a) }
             },
             x : {
               get : function() { return e.x() },
               set : function(a) { e.x(a), k.x(a) }
             },
             y : {
               get : function() { return e.y() },
               set : function(a) { e.y(a), k.y(a) }
             },
             rightAlignYAxis : {
               get : function() { return t },
               set : function(a) { t = a, g.orient(t ? "right" : "left") }
             },
             useInteractiveGuideline : {
               get : function() { return u },
               set : function(
                   a) { u = a, u && (e.interactive(!1), e.useVoronoi(!1)) }
             }
           }),
           a.utils.inheritOptions(b, e), a.utils.initOptions(b), b
  }, a.models.lineWithFocusChart = function() {
    return a.models.lineChart().margin({bottom : 30}).focusEnable(!0)
  }, a.models.linePlusBarChart = function() {
    "use strict";
    function b(v) {
      return v.each(function(v) {
        function J(a) {
          var b = +("e" == a), c = b ? 1 : -1, d = Z / 3;
          return "M" + .5 * c + "," + d + "A6,6 0 0 " + b + " " + 6.5 * c +
                 "," + (d + 6) + "V" + (2 * d - 6) + "A6,6 0 0 " + b + " " +
                 .5 * c + "," + 2 * d + "ZM" + 2.5 * c + "," + (d + 8) + "V" +
                 (2 * d - 8) + "M" + 4.5 * c + "," + (d + 8) + "V" + (2 * d - 8)
        }
        function R() {
          u.empty() || u.extent(I),
              ma.data([ u.empty() ? e.domain() : I ]).each(function(a, b) {
                var c = e(a[0]) - e.range()[0], d = e.range()[1] - e(a[1]);
                d3.select(this).select(".left").attr("width", 0 > c ? 0 : c),
                    d3.select(this)
                        .select(".right")
                        .attr("x", e(a[1]))
                        .attr("width", 0 > d ? 0 : d)
              })
        }
        function S() {
          I = u.empty() ? null : u.extent(),
          c = u.empty() ? e.domain() : u.extent(),
          K.brush({extent : c, brush : u}), R(),
          l.width(X).height(Y).color(
              v.map(function(a, b) {
                 return a.color || C(a, b)
               }).filter(function(a, b) { return !v[b].disabled && v[b].bar })),
          j.width(X).height(Y).color(
              v.map(function(a, b) { return a.color || C(a, b) })
                  .filter(function(a,
                                   b) { return !v[b].disabled && !v[b].bar }));
          var b = fa.select(".nv-focus .nv-barsWrap")
                      .datum(_.length ? _.map(function(a, b) {
                        return {
                          key: a.key, values: a.values.filter(function(a, b) {
                            return l.x()(a, b) >= c[0] && l.x()(a, b) <= c[1]
                          })
                        }
                      })
                                      : [ {values : []} ]),
              h = fa.select(".nv-focus .nv-linesWrap")
                      .datum(
                          V(aa) ? [ {values : []} ] : aa.filter(function(a) {
                                                          return !a.disabled
                                                        }).map(function(a, b) {
                            return {
                              area: a.area, fillOpacity: a.fillOpacity,
                                  strokeWidth: a.strokeWidth, key: a.key,
                                  values: a.values.filter(function(a, b) {
                                    return j.x()(a, b) >= c[0] &&
                                           j.x()(a, b) <= c[1]
                                  })
                            }
                          }));
          d = _.length && !Q ? l.xScale() : j.xScale(),
          n.scale(d)._ticks(a.utils.calcTicksX(X / 100, v)).tickSize(-Y, 0),
          n.domain([ Math.ceil(c[0]), Math.floor(c[1]) ]),
          fa.select(".nv-x.nv-axis").transition().duration(L).call(n),
          b.transition().duration(L).call(l),
          h.transition().duration(L).call(j),
          fa.select(".nv-focus .nv-x.nv-axis")
              .attr("transform", "translate(0," + f.range()[0] + ")"),
          p.scale(f)._ticks(a.utils.calcTicksY(Y / 36, v)).tickSize(-X, 0),
          q.scale(g)._ticks(a.utils.calcTicksY(Y / 36, v)),
          Q ? q.tickSize(aa.length ? 0 : -X, 0)
            : q.tickSize(_.length ? 0 : -X, 0);
          var i = _.length ? 1 : 0, k = aa.length && !V(aa) ? 1 : 0,
              m = Q ? k : i, o = Q ? i : k;
          fa.select(".nv-focus .nv-y1.nv-axis").style("opacity", m),
              fa.select(".nv-focus .nv-y2.nv-axis")
                  .style("opacity", o)
                  .attr("transform", "translate(" + d.range()[1] + ",0)"),
              fa.select(".nv-focus .nv-y1.nv-axis")
                  .transition()
                  .duration(L)
                  .call(p),
              fa.select(".nv-focus .nv-y2.nv-axis")
                  .transition()
                  .duration(L)
                  .call(q)
        }
        var W = d3.select(this);
        a.utils.initSVG(W);
        var X = a.utils.availableWidth(y, W, w),
            Y = a.utils.availableHeight(z, W, w) - (E ? H : 0),
            Z = H - x.top - x.bottom;
        if (b.update = function() { W.transition().duration(L).call(b) },
            b.container = this, M.setter(U(v), b.update).getter(T(v)).update(),
            M.disabled = v.map(function(a) { return !!a.disabled }), !N) {
          var $;
          N = {};
          for ($ in M)
            M[$] instanceof Array ? N[$] = M[$].slice(0) : N[$] = M[$]
        }
        if (!(v && v.length &&
              v.filter(function(a) { return a.values.length }).length))
          return a.utils.noData(b, W), b;
        W.selectAll(".nv-noData").remove();
        var _ = v.filter(function(a) { return !a.disabled && a.bar }),
            aa = v.filter(function(a) { return !a.bar });
        d = _.length && !Q ? l.xScale() : j.xScale(), e = o.scale(),
        f = Q ? j.yScale() : l.yScale(), g = Q ? l.yScale() : j.yScale(),
        h = Q ? k.yScale() : m.yScale(), i = Q ? m.yScale() : k.yScale();
        var ba = v.filter(function(a) {
                    return !a.disabled && (Q ? !a.bar : a.bar)
                  }).map(function(a) {
          return a.values.map(function(a, b) {
            return { x: A(a, b), y: B(a, b) }
          })
        }),
            ca = v.filter(function(a) {
                    return !a.disabled && (Q ? a.bar : !a.bar)
                  }).map(function(a) {
              return a.values.map(function(a, b) {
                return { x: A(a, b), y: B(a, b) }
              })
            });
        d.range([ 0, X ]), e.domain(d3.extent(d3.merge(ba.concat(ca)),
                                              function(a) { return a.x }))
                               .range([ 0, X ]);
        var da = W.selectAll("g.nv-wrap.nv-linePlusBar").data([ v ]),
            ea = da.enter()
                     .append("g")
                     .attr("class", "nvd3 nv-wrap nv-linePlusBar")
                     .append("g"),
            fa = da.select("g");
        ea.append("g").attr("class", "nv-legendWrap");
        var ga = ea.append("g").attr("class", "nv-focus");
        ga.append("g").attr("class", "nv-x nv-axis"),
            ga.append("g").attr("class", "nv-y1 nv-axis"),
            ga.append("g").attr("class", "nv-y2 nv-axis"),
            ga.append("g").attr("class", "nv-barsWrap"),
            ga.append("g").attr("class", "nv-linesWrap");
        var ha = ea.append("g").attr("class", "nv-context");
        if (ha.append("g").attr("class", "nv-x nv-axis"),
            ha.append("g").attr("class", "nv-y1 nv-axis"),
            ha.append("g").attr("class", "nv-y2 nv-axis"),
            ha.append("g").attr("class", "nv-barsWrap"),
            ha.append("g").attr("class", "nv-linesWrap"),
            ha.append("g").attr("class", "nv-brushBackground"),
            ha.append("g").attr("class", "nv-x nv-brush"), D) {
          var ia = t.align() ? X / 2 : X, ja = t.align() ? ia : 0;
          t.width(ia),
              fa.select(".nv-legendWrap")
                  .datum(v.map(function(a) {
                    return a.originalKey =
                               void 0 === a.originalKey ? a.key : a.originalKey,
                           Q ? a.key = a.originalKey + (a.bar ? P : O)
                             : a.key = a.originalKey + (a.bar ? O : P),
                           a
                  }))
                  .call(t),
              t.height() > w.top && (w.top = t.height(),
                                     Y = a.utils.availableHeight(z, W, w) - H),
              fa.select(".nv-legendWrap")
                  .attr("transform", "translate(" + ja + "," + -w.top + ")")
        } else
          fa.select(".nv-legendWrap").selectAll("*").remove();
        da.attr("transform", "translate(" + w.left + "," + w.top + ")"),
            fa.select(".nv-context").style("display", E ? "initial" : "none"),
            m.width(X).height(Z).color(
                v.map(function(a, b) { return a.color || C(a, b) })
                    .filter(function(a,
                                     b) { return !v[b].disabled && v[b].bar })),
            k.width(X).height(Z).color(
                v.map(function(a, b) { return a.color || C(a, b) })
                    .filter(function(
                        a, b) { return !v[b].disabled && !v[b].bar }));
        var ka = fa.select(".nv-context .nv-barsWrap").datum(_.length ? _ : [ {
          values : []
        } ]),
            la = fa.select(".nv-context .nv-linesWrap")
                     .datum(
                         V(aa) ? [ {values : []} ]
                               : aa.filter(function(a) { return !a.disabled }));
        fa.select(".nv-context")
            .attr("transform", "translate(0," + (Y + w.bottom + x.top) + ")"),
            ka.transition().call(m), la.transition().call(k),
            G && (o._ticks(a.utils.calcTicksX(X / 100, v)).tickSize(-Z, 0),
                  fa.select(".nv-context .nv-x.nv-axis")
                      .attr("transform", "translate(0," + h.range()[0] + ")"),
                  fa.select(".nv-context .nv-x.nv-axis").transition().call(o)),
            F && (r.scale(h)._ticks(Z / 36).tickSize(-X, 0),
                  s.scale(i)._ticks(Z / 36).tickSize(_.length ? 0 : -X, 0),
                  fa.select(".nv-context .nv-y3.nv-axis")
                      .style("opacity", _.length ? 1 : 0)
                      .attr("transform", "translate(0," + e.range()[0] + ")"),
                  fa.select(".nv-context .nv-y2.nv-axis")
                      .style("opacity", aa.length ? 1 : 0)
                      .attr("transform", "translate(" + e.range()[1] + ",0)"),
                  fa.select(".nv-context .nv-y1.nv-axis").transition().call(r),
                  fa.select(".nv-context .nv-y2.nv-axis").transition().call(s)),
            u.x(e).on("brush", S), I && u.extent(I);
        var ma = fa.select(".nv-brushBackground").selectAll("g").data([
          I || u.extent()
        ]),
            na = ma.enter().append("g");
        na.append("rect")
            .attr("class", "left")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", Z),
            na.append("rect")
                .attr("class", "right")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", Z);
        var oa = fa.select(".nv-x.nv-brush").call(u);
        oa.selectAll("rect").attr("height", Z),
            oa.selectAll(".resize").append("path").attr("d", J),
            t.dispatch.on("stateChange", function(a) {
              for (var c in a)
                M[c] = a[c];
              K.stateChange(M), b.update()
            }), K.on("changeState", function(a) {
              "undefined" != typeof a.disabled &&
                  (v.forEach(function(b, c) { b.disabled = a.disabled[c] }),
                   M.disabled = a.disabled),
                  b.update()
            }), S()
      }),
             b
    }
    var c, d, e, f, g, h, i,
        j = a.models.line(), k = a.models.line(), l = a.models.historicalBar(),
        m = a.models.historicalBar(), n = a.models.axis(), o = a.models.axis(),
        p = a.models.axis(), q = a.models.axis(), r = a.models.axis(),
        s = a.models.axis(), t = a.models.legend(), u = d3.svg.brush(),
        v = a.models.tooltip(),
        w = {top : 30, right : 30, bottom : 30, left : 60},
        x = {top : 0, right : 30, bottom : 20, left : 60}, y = null, z = null,
        A = function(a) { return a.x }, B = function(a) { return a.y },
        C = a.utils.defaultColor(), D = !0, E = !0, F = !1, G = !0, H = 50,
        I = null, J = null,
        K = d3.dispatch("brush", "stateChange", "changeState"), L = 0,
        M = a.utils.state(), N = null, O = " (left axis)", P = " (right axis)",
        Q = !1;
    j.clipEdge(!0), k.interactive(!1), k.pointActive(function(a) { return !1 }),
        n.orient("bottom").tickPadding(5), p.orient("left"), q.orient("right"),
        o.orient("bottom").tickPadding(5), r.orient("left"), s.orient("right"),
        v.headerEnabled(!0).headerFormatter(function(
            a, b) { return n.tickFormat()(a, b) });
    var R = function() {
      return Q ? {main : q, focus : s} : {main : p, focus : r}
    }, S = function() {
      return Q ? {main : p, focus : r} : {main : q, focus : s}
    }, T = function(a) {
      return function() {
        return {
          active: a.map(function(a) { return !a.disabled })
        }
      }
    }, U = function(a) {
      return function(b) {
        void 0 !== b.active &&
            a.forEach(function(a, c) { a.disabled = !b.active[c] })
      }
    }, V = function(a) { return a.every(function(a) { return a.disabled }) };
    return j.dispatch.on("elementMouseover.tooltip",
                         function(a) {
                           v.duration(100)
                               .valueFormatter(function(
                                   a, b) { return S().main.tickFormat()(a, b) })
                               .data(a)
                               .hidden(!1)
                         }),
           j.dispatch.on("elementMouseout.tooltip",
                         function(a) { v.hidden(!0) }),
           l.dispatch.on("elementMouseover.tooltip",
                         function(a) {
                           a.value = b.x()(a.data),
                           a.series = {value : b.y()(a.data), color : a.color},
                           v.duration(0)
                               .valueFormatter(function(
                                   a, b) { return R().main.tickFormat()(a, b) })
                               .data(a)
                               .hidden(!1)
                         }),
           l.dispatch.on("elementMouseout.tooltip",
                         function(a) { v.hidden(!0) }),
           l.dispatch.on("elementMousemove.tooltip", function(a) { v() }),
           b.dispatch = K, b.legend = t, b.lines = j, b.lines2 = k, b.bars = l,
           b.bars2 = m, b.xAxis = n, b.x2Axis = o, b.y1Axis = p, b.y2Axis = q,
           b.y3Axis = r, b.y4Axis = s, b.tooltip = v,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return y }, set : function(a) { y = a }},
             height :
                 {get : function() { return z }, set : function(a) { z = a }},
             showLegend :
                 {get : function() { return D }, set : function(a) { D = a }},
             brushExtent :
                 {get : function() { return I }, set : function(a) { I = a }},
             noData :
                 {get : function() { return J }, set : function(a) { J = a }},
             focusEnable :
                 {get : function() { return E }, set : function(a) { E = a }},
             focusHeight :
                 {get : function() { return H }, set : function(a) { H = a }},
             focusShowAxisX :
                 {get : function() { return G }, set : function(a) { G = a }},
             focusShowAxisY :
                 {get : function() { return F }, set : function(a) { F = a }},
             legendLeftAxisHint :
                 {get : function() { return O }, set : function(a) { O = a }},
             legendRightAxisHint :
                 {get : function() { return P }, set : function(a) { P = a }},
             margin : {
               get : function() { return w },
               set : function(a) {
                 w.top = void 0 !== a.top ? a.top : w.top,
                 w.right = void 0 !== a.right ? a.right : w.right,
                 w.bottom = void 0 !== a.bottom ? a.bottom : w.bottom,
                 w.left = void 0 !== a.left ? a.left : w.left
               }
             },
             focusMargin : {
               get : function() { return x },
               set : function(a) {
                 x.top = void 0 !== a.top ? a.top : x.top,
                 x.right = void 0 !== a.right ? a.right : x.right,
                 x.bottom = void 0 !== a.bottom ? a.bottom : x.bottom,
                 x.left = void 0 !== a.left ? a.left : x.left
               }
             },
             duration :
                 {get : function() { return L }, set : function(a) { L = a }},
             color : {
               get : function() { return C },
               set : function(b) { C = a.utils.getColor(b), t.color(C) }
             },
             x : {
               get : function() { return A },
               set : function(a) { A = a, j.x(a), k.x(a), l.x(a), m.x(a) }
             },
             y : {
               get : function() { return B },
               set : function(a) { B = a, j.y(a), k.y(a), l.y(a), m.y(a) }
             },
             switchYAxisOrder : {
               get : function() { return Q },
               set : function(a) {
                 if (Q !== a) {
                   var b = p;
                   p = q, q = b;
                   var c = r;
                   r = s, s = c
                 }
                 Q = a, p.orient("left"), q.orient("right"), r.orient("left"),
                 s.orient("right")
               }
             }
           }),
           a.utils.inheritOptions(b, j), a.utils.initOptions(b), b
  }, a.models.multiBar = function() {
    "use strict";
    function b(F) {
      return D.reset(), F.each(function(b) {
        var F = k - j.left - j.right, G = l - j.top - j.bottom;
        p = d3.select(this), a.utils.initSVG(p);
        var H = 0;
        if (x && b.length && (x = [ {
                                values : b[0].values.map(function(a) {
                                  return {
                                    x: a.x, y: 0, series: a.series, size: .01
                                  }
                                })
                              } ]),
            u) {
          var I = d3.layout.stack()
                      .offset(v)
                      .values(function(a) { return a.values })
                      .y(r)(!b.length && x ? x : b);
          I.forEach(function(a, c) {
            a.nonStackable
                ? (b[c].nonStackableSeries = H++, I[c] = b[c])
                : c > 0 && I[c - 1].nonStackable &&
                      I[c].values.map(function(a, b) {
                        a.y0 -= I[c - 1].values[b].y, a.y1 = a.y0 + a.y
                      })
          }),
              b = I
        }
        b.forEach(function(a, b) {
          a.values.forEach(function(c) { c.series = b, c.key = a.key })
        }),
            u && b.length > 0 && b[0].values.map(function(a, c) {
              var d = 0, e = 0;
              b.map(function(a, f) {
                if (!b[f].nonStackable) {
                  var g = a.values[c];
                  g.size = Math.abs(g.y), g.y < 0
                                              ? (g.y1 = e, e -= g.size)
                                              : (g.y1 = g.size + d, d += g.size)
                }
              })
            });
        var J = d && e ? [] : b.map(function(a, b) {
          return a.values.map(function(a, c) {
            return { x: q(a, c), y: r(a, c), y0: a.y0, y1: a.y1, idx: b }
          })
        });
        m.domain(d || d3.merge(J).map(function(a) { return a.x }))
            .rangeBands(f || [ 0, F ], A),
            n.domain(e || d3.extent(d3.merge(J)
                                        .map(function(a) {
                                          var c = a.y;
                                          return u && !b[a.idx].nonStackable &&
                                                     (c = a.y > 0 ? a.y1
                                                                  : a.y1 + a.y),
                                                 c
                                        })
                                        .concat(s)))
                .range(g || [ G, 0 ]),
            m.domain()[0] === m.domain()[1] &&
                (m.domain()[0] ? m.domain([
                  m.domain()[0] - .01 * m.domain()[0],
                  m.domain()[1] + .01 * m.domain()[1]
                ])
                               : m.domain([ -1, 1 ])),
            n.domain()[0] === n.domain()[1] &&
                (n.domain()[0] ? n.domain([
                  n.domain()[0] + .01 * n.domain()[0],
                  n.domain()[1] - .01 * n.domain()[1]
                ])
                               : n.domain([ -1, 1 ])),
            h = h || m, i = i || n;
        var K = p.selectAll("g.nv-wrap.nv-multibar").data([ b ]),
            L = K.enter().append("g").attr("class", "nvd3 nv-wrap nv-multibar"),
            M = L.append("defs"), N = L.append("g"), O = K.select("g");
        N.append("g").attr("class", "nv-groups"),
            K.attr("transform", "translate(" + j.left + "," + j.top + ")"),
            M.append("clipPath").attr("id", "nv-edge-clip-" + o).append("rect"),
            K.select("#nv-edge-clip-" + o + " rect")
                .attr("width", F)
                .attr("height", G),
            O.attr("clip-path", t ? "url(#nv-edge-clip-" + o + ")" : "");
        var P =
            K.select(".nv-groups")
                .selectAll(".nv-group")
                .data(function(a) { return a }, function(a, b) { return b });
        P.enter()
            .append("g")
            .style("stroke-opacity", 1e-6)
            .style("fill-opacity", 1e-6);
        var Q = D.transition(P.exit().selectAll("rect.nv-bar"), "multibarExit",
                             Math.min(100, z))
                    .attr("y",
                          function(a, c, d) {
                            var e = i(0) || 0;
                            return u && b[a.series] &&
                                       !b[a.series].nonStackable &&
                                       (e = i(a.y0)),
                                   e
                          })
                    .attr("height", 0)
                    .remove();
        Q.delay && Q.delay(function(a, b) {
          var c = b * (z / (E + 1)) - b;
          return c
        }),
            P.attr("class", function(a, b) { return "nv-group nv-series-" + b })
                .classed("hover", function(a) { return a.hover })
                .style("fill", function(a, b) { return w(a, b) })
                .style("stroke", function(a, b) { return w(a, b) }),
            P.style("stroke-opacity", 1).style("fill-opacity", B);
        var R = P.selectAll("rect.nv-bar").data(function(a) {
          return x && !b.length ? x.values : a.values
        });
        R.exit().remove();
        R.enter()
            .append("rect")
            .attr("class",
                  function(a, b) {
                    return r(a, b) < 0 ? "nv-bar negative" : "nv-bar positive"
                  })
            .attr("x",
                  function(a, c, d) {
                    return u && !b[d].nonStackable
                               ? 0
                               : d * m.rangeBand() / b.length
                  })
            .attr("y",
                  function(
                      a, c,
                      d) { return i(u && !b[d].nonStackable ? a.y0 : 0) || 0 })
            .attr("height", 0)
            .attr("width",
                  function(a, c, d) {
                    return m.rangeBand() /
                           (u && !b[d].nonStackable ? 1 : b.length)
                  })
            .attr("transform",
                  function(a, b) { return "translate(" + m(q(a, b)) + ",0)" });
        R.style("fill", function(a, b, c) { return w(a, c, b) })
            .style("stroke", function(a, b, c) { return w(a, c, b) })
            .on("mouseover",
                function(a, b) {
                  d3.select(this).classed("hover", !0), C.elementMouseover({
                    data : a,
                    index : b,
                    color : d3.select(this).style("fill")
                  })
                })
            .on("mouseout",
                function(a, b) {
                  d3.select(this).classed("hover", !1), C.elementMouseout({
                    data : a,
                    index : b,
                    color : d3.select(this).style("fill")
                  })
                })
            .on("mousemove",
                function(a, b) {
                  C.elementMousemove({
                    data : a,
                    index : b,
                    color : d3.select(this).style("fill")
                  })
                })
            .on("click",
                function(a, b) {
                  var c = this;
                  C.elementClick({
                    data : a,
                    index : b,
                    color : d3.select(this).style("fill"),
                    event : d3.event,
                    element : c
                  }),
                      d3.event.stopPropagation()
                })
            .on("dblclick",
                function(a, b) {
                  C.elementDblClick({
                    data : a,
                    index : b,
                    color : d3.select(this).style("fill")
                  }),
                      d3.event.stopPropagation()
                }),
            R.attr("class",
                   function(a, b) {
                     return r(a, b) < 0 ? "nv-bar negative" : "nv-bar positive"
                   })
                .attr("transform",
                      function(a,
                               b) { return "translate(" + m(q(a, b)) + ",0)" }),
            y &&
                (c || (c = b.map(function() { return !0 })),
                 R.style("fill", function(a, b, d) {
                    return d3.rgb(y(a, b))
                        .darker(c.map(function(a, b) { return b })
                                    .filter(function(a, b) { return !c[b] })[d])
                        .toString()
                  }).style("stroke", function(a, b, d) {
                   return d3.rgb(y(a, b))
                       .darker(c.map(function(a, b) { return b })
                                   .filter(function(a, b) { return !c[b] })[d])
                       .toString()
                 }));
        var S =
            R.watchTransition(D, "multibar", Math.min(250, z))
                .delay(function(a, c) { return c * z / b[0].values.length });
        u ? S.attr("y",
                   function(a, c, d) {
                     var e = 0;
                     return e = b[d].nonStackable ? r(a, c) < 0
                                                        ? n(0)
                                                        : n(0) - n(r(a, c)) < -1
                                                              ? n(0) - 1
                                                              : n(r(a, c)) || 0
                                                  : n(a.y1)
                   })
                .attr("height",
                      function(a, c, d) {
                        return b[d].nonStackable
                                   ? Math.max(Math.abs(n(r(a, c)) - n(0)), 0) ||
                                         0
                                   : Math.max(Math.abs(n(a.y + a.y0) - n(a.y0)),
                                              0)
                      })
                .attr("x",
                      function(a, c, d) {
                        var e = 0;
                        return b[d].nonStackable &&
                                   (e = a.series * m.rangeBand() / b.length,
                                    b.length !== H &&
                                        (e = b[d].nonStackableSeries *
                                             m.rangeBand() / (2 * H))),
                               e
                      })
                .attr("width",
                      function(a, c, d) {
                        if (b[d].nonStackable) {
                          var e = m.rangeBand() / H;
                          return b.length !== H &&
                                     (e = m.rangeBand() / (2 * H)),
                                 e
                        }
                        return m.rangeBand()
                      })
          : S.attr(
                 "x",
                 function(a, c) { return a.series * m.rangeBand() / b.length })
                .attr("width", m.rangeBand() / b.length)
                .attr("y",
                      function(a, b) {
                        return r(a, b) < 0
                                   ? n(0)
                                   : n(0) - n(r(a, b)) < 1 ? n(0) - 1
                                                           : n(r(a, b)) || 0
                      })
                .attr("height",
                      function(a, b) {
                        return Math.max(Math.abs(n(r(a, b)) - n(0)), 1) || 0
                      }),
            h = m.copy(), i = n.copy(),
            b[0] && b[0].values && (E = b[0].values.length)
      }),
             D.renderEnd("multibar immediate"), b
    }
    var c, d, e, f, g, h, i,
        j = {top : 0, right : 0, bottom : 0, left : 0}, k = 960, l = 500,
        m = d3.scale.ordinal(), n = d3.scale.linear(),
        o = Math.floor(1e4 * Math.random()), p = null,
        q = function(a) { return a.x }, r = function(a) { return a.y },
        s = [ 0 ], t = !0, u = !1, v = "zero", w = a.utils.defaultColor(),
        x = !1, y = null, z = 500, A = .1, B = .75,
        C = d3.dispatch("chartClick", "elementClick", "elementDblClick",
                        "elementMouseover", "elementMouseout",
                        "elementMousemove", "renderEnd"),
        D = a.utils.renderWatch(C, z), E = 0;
    return b.dispatch = C, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return k }, set : function(a) { k = a }},
             height :
                 {get : function() { return l }, set : function(a) { l = a }},
             x : {get : function() { return q }, set : function(a) { q = a }},
             y : {get : function() { return r }, set : function(a) { r = a }},
             xScale :
                 {get : function() { return m }, set : function(a) { m = a }},
             yScale :
                 {get : function() { return n }, set : function(a) { n = a }},
             xDomain :
                 {get : function() { return d }, set : function(a) { d = a }},
             yDomain :
                 {get : function() { return e }, set : function(a) { e = a }},
             xRange :
                 {get : function() { return f }, set : function(a) { f = a }},
             yRange :
                 {get : function() { return g }, set : function(a) { g = a }},
             forceY :
                 {get : function() { return s }, set : function(a) { s = a }},
             stacked :
                 {get : function() { return u }, set : function(a) { u = a }},
             stackOffset :
                 {get : function() { return v }, set : function(a) { v = a }},
             clipEdge :
                 {get : function() { return t }, set : function(a) { t = a }},
             disabled :
                 {get : function() { return c }, set : function(a) { c = a }},
             id : {get : function() { return o }, set : function(a) { o = a }},
             hideable :
                 {get : function() { return x }, set : function(a) { x = a }},
             groupSpacing :
                 {get : function() { return A }, set : function(a) { A = a }},
             fillOpacity :
                 {get : function() { return B }, set : function(a) { B = a }},
             margin : {
               get : function() { return j },
               set : function(a) {
                 j.top = void 0 !== a.top ? a.top : j.top,
                 j.right = void 0 !== a.right ? a.right : j.right,
                 j.bottom = void 0 !== a.bottom ? a.bottom : j.bottom,
                 j.left = void 0 !== a.left ? a.left : j.left
               }
             },
             duration : {
               get : function() { return z },
               set : function(a) { z = a, D.reset(z) }
             },
             color : {
               get : function() { return w },
               set : function(b) { w = a.utils.getColor(b) }
             },
             barColor : {
               get : function() { return y },
               set : function(b) { y = b ? a.utils.getColor(b) : null }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.multiBarChart = function() {
    "use strict";
    function b(B) {
      return G.reset(), G.models(e), s && G.models(f), t && G.models(g),
             B.each(function(B) {
               var G = d3.select(this);
               a.utils.initSVG(G);
               var K = a.utils.availableWidth(m, G, l),
                   L = a.utils.availableHeight(n, G, l);
               if (b.update =
                       function() {
                         0 === E ? G.call(b)
                                 : G.transition().duration(E).call(b)
                       },
                   b.container = this,
                   z.setter(J(B), b.update).getter(I(B)).update(),
                   z.disabled = B.map(function(a) { return !!a.disabled }),
                   !A) {
                 var M;
                 A = {};
                 for (M in z)
                   z[M] instanceof Array ? A[M] = z[M].slice(0) : A[M] = z[M]
               }
               if (!(B && B.length &&
                     B.filter(function(a) { return a.values.length }).length))
                 return a.utils.noData(b, G), b;
               G.selectAll(".nv-noData").remove(), c = e.xScale(),
                                                   d = e.yScale();
               var N = G.selectAll("g.nv-wrap.nv-multiBarWithLegend").data([
                 B
               ]),
                   O = N.enter()
                           .append("g")
                           .attr("class", "nvd3 nv-wrap nv-multiBarWithLegend")
                           .append("g"),
                   P = N.select("g");
               if (O.append("g").attr("class", "nv-x nv-axis"),
                   O.append("g").attr("class", "nv-y nv-axis"),
                   O.append("g").attr("class", "nv-barsWrap"),
                   O.append("g").attr("class", "nv-legendWrap"),
                   O.append("g").attr("class", "nv-controlsWrap"),
                   O.append("g").attr("class", "nv-interactive"),
                   r ? (i.width(K - D()),
                        P.select(".nv-legendWrap").datum(B).call(i),
                        i.height() > l.top &&
                            (l.top = i.height(),
                             L = a.utils.availableHeight(n, G, l)),
                        P.select(".nv-legendWrap")
                            .attr("transform",
                                  "translate(" + D() + "," + -l.top + ")"))
                     : P.select(".nv-legendWrap").selectAll("*").remove(),
                   p) {
                 var Q = [
                   {key : q.grouped || "Grouped", disabled : e.stacked()},
                   {key : q.stacked || "Stacked", disabled : !e.stacked()}
                 ];
                 j.width(D()).color([ "#444", "#444", "#444" ]),
                     P.select(".nv-controlsWrap")
                         .datum(Q)
                         .attr("transform", "translate(0," + -l.top + ")")
                         .call(j)
               } else
                 P.select(".nv-controlsWrap").selectAll("*").remove();
               N.attr("transform", "translate(" + l.left + "," + l.top + ")"),
                   u && P.select(".nv-y.nv-axis")
                            .attr("transform", "translate(" + K + ",0)"),
                   e.disabled(B.map(function(a) { return a.disabled }))
                       .width(K)
                       .height(L)
                       .color(
                           B.map(function(a, b) { return a.color || o(a, b) })
                               .filter(function(a,
                                                b) { return !B[b].disabled }));
               var R = P.select(".nv-barsWrap")
                           .datum(B.filter(function(a) { return !a.disabled }));
               if (R.call(e), s) {
                 f.scale(c)
                     ._ticks(a.utils.calcTicksX(K / 100, B))
                     .tickSize(-L, 0),
                     P.select(".nv-x.nv-axis")
                         .attr("transform",
                               "translate(0," + d.range()[0] + ")"),
                     P.select(".nv-x.nv-axis").call(f);
                 var S = P.select(".nv-x.nv-axis > g").selectAll("g");
                 if (S.selectAll("line, text").style("opacity", 1), w) {
                   var T = function(
                           a, b) { return "translate(" + a + "," + b + ")" },
                       U = 5, V = 17;
                   S.selectAll("text").attr(
                       "transform",
                       function(a, b, c) { return T(0, c % 2 == 0 ? U : V) });
                   var W = d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0]
                               .length;
                   P.selectAll(".nv-x.nv-axis .nv-axisMaxMin text")
                       .attr("transform", function(a, b) {
                         return T(0, 0 === b || W % 2 !== 0 ? V : U)
                       })
                 }
                 x && P.selectAll(".tick text")
                          .call(a.utils.wrapTicks, b.xAxis.rangeBand()),
                     v && S.filter(function(a, b) {
                             return b % Math.ceil(B[0].values.length /
                                                  (K / 100)) !==
                                    0
                           })
                              .selectAll("text, line")
                              .style("opacity", 0),
                     y && S.selectAll(".tick text")
                              .attr("transform", "rotate(" + y + " 0,0)")
                              .style("text-anchor", y > 0 ? "start" : "end"),
                     P.select(".nv-x.nv-axis")
                         .selectAll("g.nv-axisMaxMin text")
                         .style("opacity", 1)
               }
               t && (g.scale(d)
                         ._ticks(a.utils.calcTicksY(L / 36, B))
                         .tickSize(-K, 0),
                     P.select(".nv-y.nv-axis").call(g)),
                   F && (h.width(K)
                             .height(L)
                             .margin({left : l.left, top : l.top})
                             .svgContainer(G)
                             .xScale(c),
                         N.select(".nv-interactive").call(h)),
                   i.dispatch.on("stateChange",
                                 function(a) {
                                   for (var c in a)
                                     z[c] = a[c];
                                   C.stateChange(z), b.update()
                                 }),
                   j.dispatch.on(
                       "legendClick",
                       function(a, c) {
                         if (a.disabled) {
                           switch (Q = Q.map(function(
                                       a) { return a.disabled = !0, a }),
                                   a.disabled = !1, a.key) {
                           case "Grouped":
                           case q.grouped:
                             e.stacked(!1);
                             break;
                           case "Stacked":
                           case q.stacked:
                             e.stacked(!0)
                           }
                           z.stacked = e.stacked(), C.stateChange(z), b.update()
                         }
                       }),
                   C.on("changeState",
                        function(a) {
                          "undefined" != typeof a.disabled &&
                              (B.forEach(function(
                                   b, c) { b.disabled = a.disabled[c] }),
                               z.disabled = a.disabled),
                              "undefined" != typeof a.stacked &&
                                  (e.stacked(a.stacked), z.stacked = a.stacked,
                                   H = a.stacked),
                              b.update()
                        }),
                   F ? (h.dispatch.on(
                            "elementMousemove",
                            function(a) {
                              if (void 0 != a.pointXValue) {
                                var d, e, f, g, i = [];
                                B.filter(function(a, b) {
                                   return a.seriesIndex = b, !a.disabled
                                 }).forEach(function(h, j) {
                                  e = c.domain().indexOf(a.pointXValue);
                                  var k = h.values[e];
                                  void 0 !== k &&
                                      (g = k.x, void 0 === d && (d = k),
                                       void 0 === f && (f = a.mouseX), i.push({
                                         key : h.key,
                                         value : b.y()(k, e),
                                         color : o(h, h.seriesIndex),
                                         data : h.values[e]
                                       }))
                                }),
                                    h.tooltip.data(
                                        {value : g, index : e, series : i})(),
                                    h.renderGuideLine(f)
                              }
                            }),
                        h.dispatch.on("elementMouseout",
                                      function(a) { h.tooltip.hidden(!0) }))
                     : (e.dispatch.on("elementMouseover.tooltip",
                                      function(a) {
                                        a.value = b.x()(a.data), a.series = {
                                          key : a.data.key,
                                          value : b.y()(a.data),
                                          color : a.color
                                        },
                                        k.data(a).hidden(!1)
                                      }),
                        e.dispatch.on("elementMouseout.tooltip",
                                      function(a) { k.hidden(!0) }),
                        e.dispatch.on("elementMousemove.tooltip",
                                      function(a) { k() }))
             }),
             G.renderEnd("multibarchart immediate"), b
    }
    var c, d, e = a.models.multiBar(), f = a.models.axis(), g = a.models.axis(),
              h = a.interactiveGuideline(), i = a.models.legend(),
              j = a.models.legend(), k = a.models.tooltip(),
              l = {top : 30, right : 20, bottom : 50, left : 60}, m = null,
              n = null, o = a.utils.defaultColor(), p = !0, q = {}, r = !0,
              s = !0, t = !0, u = !1, v = !0, w = !1, x = !1, y = 0,
              z = a.utils.state(), A = null, B = null,
              C = d3.dispatch("stateChange", "changeState", "renderEnd"),
              D = function() { return p ? 180 : 0 }, E = 250, F = !1;
    z.stacked = !1, e.stacked(!1),
    f.orient("bottom").tickPadding(7).showMaxMin(!1).tickFormat(function(
        a) { return a }),
    g.orient(u ? "right" : "left").tickFormat(d3.format(",.1f")),
    k.duration(0)
        .valueFormatter(function(a, b) { return g.tickFormat()(a, b) })
        .headerFormatter(function(a, b) { return f.tickFormat()(a, b) }),
    j.updateState(!1);
    var G = a.utils.renderWatch(C), H = !1, I = function(a) {
      return function() {
        return {
          active: a.map(function(a) { return !a.disabled }), stacked: H
        }
      }
    }, J = function(a) {
      return function(b) {
        void 0 !== b.stacked && (H = b.stacked),
            void 0 !== b.active &&
                a.forEach(function(a, c) { a.disabled = !b.active[c] })
      }
    };
    return b.dispatch = C, b.multibar = e, b.legend = i, b.controls = j,
           b.xAxis = f, b.yAxis = g, b.state = z, b.tooltip = k,
           b.interactiveLayer = h, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return m }, set : function(a) { m = a }},
             height :
                 {get : function() { return n }, set : function(a) { n = a }},
             showLegend :
                 {get : function() { return r }, set : function(a) { r = a }},
             showControls :
                 {get : function() { return p }, set : function(a) { p = a }},
             controlLabels :
                 {get : function() { return q }, set : function(a) { q = a }},
             showXAxis :
                 {get : function() { return s }, set : function(a) { s = a }},
             showYAxis :
                 {get : function() { return t }, set : function(a) { t = a }},
             defaultState :
                 {get : function() { return A }, set : function(a) { A = a }},
             noData :
                 {get : function() { return B }, set : function(a) { B = a }},
             reduceXTicks :
                 {get : function() { return v }, set : function(a) { v = a }},
             rotateLabels :
                 {get : function() { return y }, set : function(a) { y = a }},
             staggerLabels :
                 {get : function() { return w }, set : function(a) { w = a }},
             wrapLabels :
                 {get : function() { return x }, set : function(a) { x = !!a }},
             margin : {
               get : function() { return l },
               set : function(a) {
                 l.top = void 0 !== a.top ? a.top : l.top,
                 l.right = void 0 !== a.right ? a.right : l.right,
                 l.bottom = void 0 !== a.bottom ? a.bottom : l.bottom,
                 l.left = void 0 !== a.left ? a.left : l.left
               }
             },
             duration : {
               get : function() { return E },
               set : function(a) {
                 E = a, e.duration(E), f.duration(E), g.duration(E), G.reset(E)
               }
             },
             color : {
               get : function() { return o },
               set : function(b) { o = a.utils.getColor(b), i.color(o) }
             },
             rightAlignYAxis : {
               get : function() { return u },
               set : function(a) { u = a, g.orient(u ? "right" : "left") }
             },
             useInteractiveGuideline :
                 {get : function() { return F }, set : function(a) { F = a }},
             barColor : {
               get : function() { return e.barColor },
               set : function(a) {
                 e.barColor(a), i.color(function(a, b) {
                   return d3.rgb("#ccc").darker(1.5 * b).toString()
                 })
               }
             }
           }),
           a.utils.inheritOptions(b, e), a.utils.initOptions(b), b
  }, a.models.multiBarHorizontal = function() {
    "use strict";
    function b(m) {
      return F.reset(), m.each(function(b) {
        var m = k - j.left - j.right, D = l - j.top - j.bottom;
        n = d3.select(this), a.utils.initSVG(n),
        w && (b = d3.layout.stack()
                      .offset("zero")
                      .values(function(a) { return a.values })
                      .y(r)(b)),
        b.forEach(function(a, b) {
          a.values.forEach(function(c) { c.series = b, c.key = a.key })
        }),
        w && b[0].values.map(function(a, c) {
          var d = 0, e = 0;
          b.map(function(a) {
            var b = a.values[c];
            b.size = Math.abs(b.y),
            b.y < 0 ? (b.y1 = e - b.size, e -= b.size) : (b.y1 = d, d += b.size)
          })
        });
        var G = d && e ? [] : b.map(function(a) {
          return a.values.map(function(a, b) {
            return { x: q(a, b), y: r(a, b), y0: a.y0, y1: a.y1 }
          })
        });
        o.domain(d || d3.merge(G).map(function(a) { return a.x }))
            .rangeBands(f || [ 0, D ], A),
            p.domain(e || d3.extent(d3.merge(G)
                                        .map(function(a) {
                                          return w ? a.y > 0 ? a.y1 + a.y : a.y1
                                                   : a.y
                                        })
                                        .concat(t))),
            x && !w ? p.range(g ||
                              [
                                p.domain()[0] < 0 ? z : 0,
                                m - (p.domain()[1] > 0 ? z : 0)
                              ])
                    : p.range(g || [ 0, m ]),
            h = h || o,
            i = i || d3.scale.linear().domain(p.domain()).range([ p(0), p(0) ]);
        var H = d3.select(this)
                    .selectAll("g.nv-wrap.nv-multibarHorizontal")
                    .data([ b ]),
            I = H.enter().append("g").attr(
                "class", "nvd3 nv-wrap nv-multibarHorizontal"),
            J = (I.append("defs"), I.append("g"));
        H.select("g");
        J.append("g").attr("class", "nv-groups"),
            H.attr("transform", "translate(" + j.left + "," + j.top + ")");
        var K =
            H.select(".nv-groups")
                .selectAll(".nv-group")
                .data(function(a) { return a }, function(a, b) { return b });
        K.enter()
            .append("g")
            .style("stroke-opacity", 1e-6)
            .style("fill-opacity", 1e-6),
            K.exit()
                .watchTransition(F, "multibarhorizontal: exit groups")
                .style("stroke-opacity", 1e-6)
                .style("fill-opacity", 1e-6)
                .remove(),
            K.attr("class", function(a, b) { return "nv-group nv-series-" + b })
                .classed("hover", function(a) { return a.hover })
                .style("fill", function(a, b) { return u(a, b) })
                .style("stroke", function(a, b) { return u(a, b) }),
            K.watchTransition(F, "multibarhorizontal: groups")
                .style("stroke-opacity", 1)
                .style("fill-opacity", B);
        var L = K.selectAll("g.nv-bar").data(function(a) { return a.values });
        L.exit().remove();
        var M = L.enter().append("g").attr("transform", function(a, c, d) {
          return "translate(" + i(w ? a.y0 : 0) + "," +
                 (w ? 0 : d * o.rangeBand() / b.length + o(q(a, c))) + ")"
        });
        M.append("rect")
            .attr("width", 0)
            .attr("height", o.rangeBand() / (w ? 1 : b.length)),
            L.on("mouseover",
                 function(a, b) {
                   d3.select(this).classed("hover", !0), E.elementMouseover({
                     data : a,
                     index : b,
                     color : d3.select(this).style("fill")
                   })
                 })
                .on("mouseout",
                    function(a, b) {
                      d3.select(this).classed("hover", !1), E.elementMouseout({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      })
                    })
                .on("mouseout",
                    function(a, b) {
                      E.elementMouseout({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      })
                    })
                .on("mousemove",
                    function(a, b) {
                      E.elementMousemove({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      })
                    })
                .on("click",
                    function(a, b) {
                      var c = this;
                      E.elementClick({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill"),
                        event : d3.event,
                        element : c
                      }),
                          d3.event.stopPropagation()
                    })
                .on("dblclick",
                    function(a, b) {
                      E.elementDblClick({
                        data : a,
                        index : b,
                        color : d3.select(this).style("fill")
                      }),
                          d3.event.stopPropagation()
                    }),
            s(b[0], 0) &&
                (M.append("polyline"), L.select("polyline")
                                           .attr("fill", "none")
                                           .attr("points",
                                                 function(a, c) {
                                                   var d = s(a, c),
                                                       e = .8 * o.rangeBand() /
                                                           (2 *
                                                            (w ? 1 : b.length));
                                                   d=d.length?d:[-Math.abs(d),Math.abs(d)],d=d.map(function(a){return p(a)-p(0)});
                                                   var f = [
                                                     [ d[0], -e ], [ d[0], e ],
                                                     [ d[0], 0 ], [ d[1], 0 ],
                                                     [ d[1], -e ],
                                                     [ d[1], e ]
                                                   ];
                                                   return f
                                                       .map(function(a) {
                                                         return a.join(",")
                                                       })
                                                       .join(" ")
                                                 })
                                           .attr("transform",
                                                 function(a, c) {
                                                   var d =
                                                       o.rangeBand() /
                                                       (2 * (w ? 1 : b.length));
                                                   return "translate(" +
                                                          (r(a, c) < 0
                                                               ? 0
                                                               : p(r(a, c)) -
                                                                     p(0)) +
                                                          ", " + d + ")"
                                                 })),
            M.append("text"),
            x && !w
                ? (L.select("text")
                       .attr("text-anchor",
                             function(
                                 a, b) { return r(a, b) < 0 ? "end" : "start" })
                       .attr("y", o.rangeBand() / (2 * b.length))
                       .attr("dy", ".32em")
                       .text(function(a, b) {
                         var c = C(r(a, b)), d = s(a, b);
                         return void 0 === d
                                    ? c
                                    : d.length ? c + "+" + C(Math.abs(d[1])) +
                                                     "-" + C(Math.abs(d[0]))
                                               : c + "±" + C(Math.abs(d))
                       }),
                   L.watchTransition(F, "multibarhorizontal: bars")
                       .select("text")
                       .attr("x",
                             function(a, b) {
                               return r(a, b) < 0 ? -4 : p(r(a, b)) - p(0) + 4
                             }))
                : L.selectAll("text").text(""),
            y && !w
                ? (M.append("text").classed("nv-bar-label", !0),
                   L.select("text.nv-bar-label")
                       .attr("text-anchor",
                             function(
                                 a, b) { return r(a, b) < 0 ? "start" : "end" })
                       .attr("y", o.rangeBand() / (2 * b.length))
                       .attr("dy", ".32em")
                       .text(function(a, b) { return q(a, b) }),
                   L.watchTransition(F, "multibarhorizontal: bars")
                       .select("text.nv-bar-label")
                       .attr("x",
                             function(a, b) {
                               return r(a, b) < 0 ? p(0) - p(r(a, b)) + 4 : -4
                             }))
                : L.selectAll("text.nv-bar-label").text(""),
            L.attr("class",
                   function(a, b) {
                     return r(a, b) < 0 ? "nv-bar negative" : "nv-bar positive"
                   }),
            v && (c || (c = b.map(function() { return !0 })),
                  L.style("fill",
                          function(a, b, d) {
                            return d3.rgb(v(a, b))
                                .darker(c.map(function(a, b) { return b })
                                            .filter(function(
                                                a, b) { return !c[b] })[d])
                                .toString()
                          })
                      .style("stroke",
                             function(a, b, d) {
                               return d3.rgb(v(a, b))
                                   .darker(c.map(function(a, b) { return b })
                                               .filter(function(
                                                   a, b) { return !c[b] })[d])
                                   .toString()
                             })),
            w ? L.watchTransition(F, "multibarhorizontal: bars")
                    .attr("transform",
                          function(a, b) {
                            return "translate(" + p(a.y1) + "," + o(q(a, b)) +
                                   ")"
                          })
                    .select("rect")
                    .attr("width",
                          function(a, b) {
                            return Math.abs(p(r(a, b) + a.y0) - p(a.y0)) || 0
                          })
                    .attr("height", o.rangeBand())
              : L.watchTransition(F, "multibarhorizontal: bars")
                    .attr("transform",
                          function(a, c) {
                            return "translate(" + p(r(a, c) < 0 ? r(a, c) : 0) +
                                   "," +
                                   (a.series * o.rangeBand() / b.length +
                                    o(q(a, c))) +
                                   ")"
                          })
                    .select("rect")
                    .attr("height", o.rangeBand() / b.length)
                    .attr("width",
                          function(a, b) {
                            return Math.max(Math.abs(p(r(a, b)) - p(0)), 1) || 0
                          }),
            h = o.copy(), i = p.copy()
      }),
             F.renderEnd("multibarHorizontal immediate"), b
    }
    var c, d, e, f, g, h, i,
        j = {top : 0, right : 0, bottom : 0, left : 0}, k = 960, l = 500,
        m = Math.floor(1e4 * Math.random()), n = null, o = d3.scale.ordinal(),
        p = d3.scale.linear(), q = function(a) { return a.x },
        r = function(a) { return a.y }, s = function(a) { return a.yErr },
        t = [ 0 ], u = a.utils.defaultColor(), v = null, w = !1, x = !1, y = !1,
        z = 60, A = .1, B = .75, C = d3.format(",.2f"), D = 250,
        E = d3.dispatch("chartClick", "elementClick", "elementDblClick",
                        "elementMouseover", "elementMouseout",
                        "elementMousemove", "renderEnd"),
        F = a.utils.renderWatch(E, D);
    return b.dispatch = E, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return k }, set : function(a) { k = a }},
             height :
                 {get : function() { return l }, set : function(a) { l = a }},
             x : {get : function() { return q }, set : function(a) { q = a }},
             y : {get : function() { return r }, set : function(a) { r = a }},
             yErr :
                 {get : function() { return s }, set : function(a) { s = a }},
             xScale :
                 {get : function() { return o }, set : function(a) { o = a }},
             yScale :
                 {get : function() { return p }, set : function(a) { p = a }},
             xDomain :
                 {get : function() { return d }, set : function(a) { d = a }},
             yDomain :
                 {get : function() { return e }, set : function(a) { e = a }},
             xRange :
                 {get : function() { return f }, set : function(a) { f = a }},
             yRange :
                 {get : function() { return g }, set : function(a) { g = a }},
             forceY :
                 {get : function() { return t }, set : function(a) { t = a }},
             stacked :
                 {get : function() { return w }, set : function(a) { w = a }},
             showValues :
                 {get : function() { return x }, set : function(a) { x = a }},
             disabled :
                 {get : function() { return c }, set : function(a) { c = a }},
             id : {get : function() { return m }, set : function(a) { m = a }},
             valueFormat :
                 {get : function() { return C }, set : function(a) { C = a }},
             valuePadding :
                 {get : function() { return z }, set : function(a) { z = a }},
             groupSpacing :
                 {get : function() { return A }, set : function(a) { A = a }},
             fillOpacity :
                 {get : function() { return B }, set : function(a) { B = a }},
             margin : {
               get : function() { return j },
               set : function(a) {
                 j.top = void 0 !== a.top ? a.top : j.top,
                 j.right = void 0 !== a.right ? a.right : j.right,
                 j.bottom = void 0 !== a.bottom ? a.bottom : j.bottom,
                 j.left = void 0 !== a.left ? a.left : j.left
               }
             },
             duration : {
               get : function() { return D },
               set : function(a) { D = a, F.reset(D) }
             },
             color : {
               get : function() { return u },
               set : function(b) { u = a.utils.getColor(b) }
             },
             barColor : {
               get : function() { return v },
               set : function(b) { v = b ? a.utils.getColor(b) : null }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.multiBarHorizontalChart = function() {
    "use strict";
    function b(j) {
      return C.reset(), C.models(e), r && C.models(f), s && C.models(g),
             j.each(function(j) {
               var w = d3.select(this);
               a.utils.initSVG(w);
               var C = a.utils.availableWidth(l, w, k),
                   D = a.utils.availableHeight(m, w, k);
               if (b.update = function() { w.transition().duration(z).call(b) },
                   b.container = this, t = e.stacked(),
                   u.setter(B(j), b.update).getter(A(j)).update(),
                   u.disabled = j.map(function(a) { return !!a.disabled }),
                   !v) {
                 var E;
                 v = {};
                 for (E in u)
                   u[E] instanceof Array ? v[E] = u[E].slice(0) : v[E] = u[E]
               }
               if (!(j && j.length &&
                     j.filter(function(a) { return a.values.length }).length))
                 return a.utils.noData(b, w), b;
               w.selectAll(".nv-noData").remove(), c = e.xScale(),
                                                   d = e.yScale().clamp(!0);
               var F = w.selectAll("g.nv-wrap.nv-multiBarHorizontalChart")
                           .data([ j ]),
                   G = F.enter()
                           .append("g")
                           .attr("class",
                                 "nvd3 nv-wrap nv-multiBarHorizontalChart")
                           .append("g"),
                   H = F.select("g");
               if (G.append("g").attr("class", "nv-x nv-axis"),
                   G.append("g")
                       .attr("class", "nv-y nv-axis")
                       .append("g")
                       .attr("class", "nv-zeroLine")
                       .append("line"),
                   G.append("g").attr("class", "nv-barsWrap"),
                   G.append("g").attr("class", "nv-legendWrap"),
                   G.append("g").attr("class", "nv-controlsWrap"),
                   q ? (h.width(C - y()),
                        H.select(".nv-legendWrap").datum(j).call(h),
                        h.height() > k.top &&
                            (k.top = h.height(),
                             D = a.utils.availableHeight(m, w, k)),
                        H.select(".nv-legendWrap")
                            .attr("transform",
                                  "translate(" + y() + "," + -k.top + ")"))
                     : H.select(".nv-legendWrap").selectAll("*").remove(),
                   o) {
                 var I = [
                   {key : p.grouped || "Grouped", disabled : e.stacked()},
                   {key : p.stacked || "Stacked", disabled : !e.stacked()}
                 ];
                 i.width(y()).color([ "#444", "#444", "#444" ]),
                     H.select(".nv-controlsWrap")
                         .datum(I)
                         .attr("transform", "translate(0," + -k.top + ")")
                         .call(i)
               } else
                 H.select(".nv-controlsWrap").selectAll("*").remove();
               F.attr("transform", "translate(" + k.left + "," + k.top + ")"),
                   e.disabled(j.map(function(a) { return a.disabled }))
                       .width(C)
                       .height(D)
                       .color(
                           j.map(function(a, b) { return a.color || n(a, b) })
                               .filter(function(a,
                                                b) { return !j[b].disabled }));
               var J = H.select(".nv-barsWrap")
                           .datum(j.filter(function(a) { return !a.disabled }));
               if (J.transition().call(e), r) {
                 f.scale(c)
                     ._ticks(a.utils.calcTicksY(D / 24, j))
                     .tickSize(-C, 0),
                     H.select(".nv-x.nv-axis").call(f);
                 var K = H.select(".nv-x.nv-axis").selectAll("g");
                 K.selectAll("line, text")
               }
               s && (g.scale(d)
                         ._ticks(a.utils.calcTicksX(C / 100, j))
                         .tickSize(-D, 0),
                     H.select(".nv-y.nv-axis")
                         .attr("transform", "translate(0," + D + ")"),
                     H.select(".nv-y.nv-axis").call(g)),
                   H.select(".nv-zeroLine line")
                       .attr("x1", d(0))
                       .attr("x2", d(0))
                       .attr("y1", 0)
                       .attr("y2", -D),
                   h.dispatch.on("stateChange", function(a) {
                     for (var c in a)
                       u[c] = a[c];
                     x.stateChange(u), b.update()
                   }), i.dispatch.on("legendClick", function(a, c) {
                     if (a.disabled) {
                       switch (
                           I = I.map(function(a) { return a.disabled = !0, a }),
                           a.disabled = !1, a.key) {
                       case "Grouped":
                       case p.grouped:
                         e.stacked(!1);
                         break;
                       case "Stacked":
                       case p.stacked:
                         e.stacked(!0)
                       }
                       u.stacked = e.stacked(), x.stateChange(u),
                       t = e.stacked(), b.update()
                     }
                   }), x.on("changeState", function(a) {
                     "undefined" != typeof a.disabled &&
                         (j.forEach(function(b,
                                             c) { b.disabled = a.disabled[c] }),
                          u.disabled = a.disabled),
                         "undefined" != typeof a.stacked &&
                             (e.stacked(a.stacked), u.stacked = a.stacked,
                              t = a.stacked),
                         b.update()
                   })
             }),
             C.renderEnd("multibar horizontal chart immediate"), b
    }
    var c, d, e = a.models.multiBarHorizontal(), f = a.models.axis(),
              g = a.models.axis(), h = a.models.legend().height(30),
              i = a.models.legend().height(30), j = a.models.tooltip(),
              k = {top : 30, right : 20, bottom : 50, left : 60}, l = null,
              m = null, n = a.utils.defaultColor(), o = !0, p = {}, q = !0,
              r = !0, s = !0, t = !1, u = a.utils.state(), v = null, w = null,
              x = d3.dispatch("stateChange", "changeState", "renderEnd"),
              y = function() { return o ? 180 : 0 }, z = 250;
    u.stacked = !1, e.stacked(t),
    f.orient("left").tickPadding(5).showMaxMin(!1).tickFormat(function(
        a) { return a }),
    g.orient("bottom").tickFormat(d3.format(",.1f")),
    j.duration(0)
        .valueFormatter(function(a, b) { return g.tickFormat()(a, b) })
        .headerFormatter(function(a, b) { return f.tickFormat()(a, b) }),
    i.updateState(!1);
    var A = function(a) {
      return function() {
        return {
          active: a.map(function(a) { return !a.disabled }), stacked: t
        }
      }
    }, B = function(a) {
      return function(b) {
        void 0 !== b.stacked && (t = b.stacked),
            void 0 !== b.active &&
                a.forEach(function(a, c) { a.disabled = !b.active[c] })
      }
    }, C = a.utils.renderWatch(x, z);
    return e.dispatch.on("elementMouseover.tooltip",
                         function(a) {
                           a.value = b.x()(a.data), a.series = {
                             key : a.data.key,
                             value : b.y()(a.data),
                             color : a.color
                           },
                           j.data(a).hidden(!1)
                         }),
           e.dispatch.on("elementMouseout.tooltip",
                         function(a) { j.hidden(!0) }),
           e.dispatch.on("elementMousemove.tooltip", function(a) { j() }),
           b.dispatch = x, b.multibar = e, b.legend = h, b.controls = i,
           b.xAxis = f, b.yAxis = g, b.state = u, b.tooltip = j,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return l }, set : function(a) { l = a }},
             height :
                 {get : function() { return m }, set : function(a) { m = a }},
             showLegend :
                 {get : function() { return q }, set : function(a) { q = a }},
             showControls :
                 {get : function() { return o }, set : function(a) { o = a }},
             controlLabels :
                 {get : function() { return p }, set : function(a) { p = a }},
             showXAxis :
                 {get : function() { return r }, set : function(a) { r = a }},
             showYAxis :
                 {get : function() { return s }, set : function(a) { s = a }},
             defaultState :
                 {get : function() { return v }, set : function(a) { v = a }},
             noData :
                 {get : function() { return w }, set : function(a) { w = a }},
             margin : {
               get : function() { return k },
               set : function(a) {
                 k.top = void 0 !== a.top ? a.top : k.top,
                 k.right = void 0 !== a.right ? a.right : k.right,
                 k.bottom = void 0 !== a.bottom ? a.bottom : k.bottom,
                 k.left = void 0 !== a.left ? a.left : k.left
               }
             },
             duration : {
               get : function() { return z },
               set : function(a) {
                 z = a, C.reset(z), e.duration(z), f.duration(z), g.duration(z)
               }
             },
             color : {
               get : function() { return n },
               set : function(b) { n = a.utils.getColor(b), h.color(n) }
             },
             barColor : {
               get : function() { return e.barColor },
               set : function(a) {
                 e.barColor(a), h.color(function(a, b) {
                   return d3.rgb("#ccc").darker(1.5 * b).toString()
                 })
               }
             }
           }),
           a.utils.inheritOptions(b, e), a.utils.initOptions(b), b
  }, a.models.multiChart = function() {
    "use strict";
    function b(j) {
      return j.each(function(j) {
        function n(a) {
          var b = 2 === j[a.seriesIndex].yAxis ? E : D;
          a.value = a.point.x, a.series = {
            value : a.point.y,
            color : a.point.color,
            key : a.series.key
          },
          G.duration(0)
              .headerFormatter(function(a, b) { return C.tickFormat()(a, b) })
              .valueFormatter(function(a, c) { return b.tickFormat()(a, c) })
              .data(a)
              .hidden(!1)
        }
        function H(a) {
          var b = 2 === j[a.seriesIndex].yAxis ? E : D;
          a.value = a.point.x, a.series = {
            value : a.point.y,
            color : a.point.color,
            key : a.series.key
          },
          G.duration(100)
              .headerFormatter(function(a, b) { return C.tickFormat()(a, b) })
              .valueFormatter(function(a, c) { return b.tickFormat()(a, c) })
              .data(a)
              .hidden(!1)
        }
        function J(a) {
          var b = 2 === j[a.seriesIndex].yAxis ? E : D;
          a.point.x = A.x()(a.point), a.point.y = A.y()(a.point),
          G.duration(0)
              .headerFormatter(function(a, b) { return C.tickFormat()(a, b) })
              .valueFormatter(function(a, c) { return b.tickFormat()(a, c) })
              .data(a)
              .hidden(!1)
        }
        function K(a) {
          var b = 2 === j[a.data.series].yAxis ? E : D;
          a.value = y.x()(a.data),
          a.series = {value : y.y()(a.data), color : a.color, key : a.data.key},
          G.duration(0)
              .headerFormatter(function(a, b) { return C.tickFormat()(a, b) })
              .valueFormatter(function(a, c) { return b.tickFormat()(a, c) })
              .data(a)
              .hidden(!1)
        }
        function L() {
          for (var a = 0, b = I.length; b > a; a++) {
            var c = I[a];
            try {
              c.clearHighlights()
            } catch (d) {
            }
          }
        }
        function M(a, b, c) {
          for (var d = 0, e = I.length; e > d; d++) {
            var f = I[d];
            try {
              f.highlightPoint(a, b, c)
            } catch (g) {
            }
          }
        }
        var N = d3.select(this);
        a.utils.initSVG(N), b.update = function() { N.transition().call(b) },
                            b.container = this;
        var O = a.utils.availableWidth(g, N, e),
            P = a.utils.availableHeight(h, N, e),
            Q = j.filter(function(
                a) { return "line" == a.type && 1 == a.yAxis }),
            R = j.filter(function(
                a) { return "line" == a.type && 2 == a.yAxis }),
            S = j.filter(function(
                a) { return "scatter" == a.type && 1 == a.yAxis }),
            T = j.filter(function(
                a) { return "scatter" == a.type && 2 == a.yAxis }),
            U = j.filter(function(
                a) { return "bar" == a.type && 1 == a.yAxis }),
            V = j.filter(function(
                a) { return "bar" == a.type && 2 == a.yAxis }),
            W = j.filter(function(
                a) { return "area" == a.type && 1 == a.yAxis }),
            X = j.filter(function(
                a) { return "area" == a.type && 2 == a.yAxis });
        if (!(j && j.length &&
              j.filter(function(a) { return a.values.length }).length))
          return a.utils.noData(b, N), b;
        N.selectAll(".nv-noData").remove();
        var Y = j.filter(function(a) { return !a.disabled && 1 == a.yAxis })
                    .map(function(a) {
                      return a.values.map(function(a, b) {
                        return { x: k(a), y: l(a) }
                      })
                    }),
            Z = j.filter(function(a) { return !a.disabled && 2 == a.yAxis })
                    .map(function(a) {
                      return a.values.map(function(a, b) {
                        return { x: k(a), y: l(a) }
                      })
                    });
        r.domain(d3.extent(d3.merge(Y.concat(Z)), function(a) { return a.x }))
            .range([ 0, O ]);
        var $ = N.selectAll("g.wrap.multiChart").data([ j ]),
            _ = $.enter()
                    .append("g")
                    .attr("class", "wrap nvd3 multiChart")
                    .append("g");
        _.append("g").attr("class", "nv-x nv-axis"),
            _.append("g").attr("class", "nv-y1 nv-axis"),
            _.append("g").attr("class", "nv-y2 nv-axis"),
            _.append("g").attr("class", "stack1Wrap"),
            _.append("g").attr("class", "stack2Wrap"),
            _.append("g").attr("class", "bars1Wrap"),
            _.append("g").attr("class", "bars2Wrap"),
            _.append("g").attr("class", "scatters1Wrap"),
            _.append("g").attr("class", "scatters2Wrap"),
            _.append("g").attr("class", "lines1Wrap"),
            _.append("g").attr("class", "lines2Wrap"),
            _.append("g").attr("class", "legendWrap"),
            _.append("g").attr("class", "nv-interactive");
        var aa = $.select("g"),
            ba = j.map(function(a, b) { return j[b].color || f(a, b) });
        if (i) {
          var ca = F.align() ? O / 2 : O, da = F.align() ? ca : 0;
          F.width(ca), F.color(ba),
              aa.select(".legendWrap")
                  .datum(j.map(function(a) {
                    return a.originalKey =
                               void 0 === a.originalKey ? a.key : a.originalKey,
                           a.key = a.originalKey + (1 == a.yAxis ? "" : q), a
                  }))
                  .call(F),
              F.height() > e.top &&
                  (e.top = F.height(), P = a.utils.availableHeight(h, N, e)),
              aa.select(".legendWrap")
                  .attr("transform", "translate(" + da + "," + -e.top + ")")
        } else
          aa.select(".legendWrap").selectAll("*").remove();
        u.width(O).height(P).interpolate(m).color(ba.filter(function(a, b) {
          return !j[b].disabled && 1 == j[b].yAxis && "line" == j[b].type
        })),
            v.width(O).height(P).interpolate(m).color(ba.filter(function(a, b) {
              return !j[b].disabled && 2 == j[b].yAxis && "line" == j[b].type
            })),
            w.width(O).height(P).color(ba.filter(function(a, b) {
              return !j[b].disabled && 1 == j[b].yAxis && "scatter" == j[b].type
            })),
            x.width(O).height(P).color(ba.filter(function(a, b) {
              return !j[b].disabled && 2 == j[b].yAxis && "scatter" == j[b].type
            })),
            y.width(O).height(P).color(ba.filter(function(a, b) {
              return !j[b].disabled && 1 == j[b].yAxis && "bar" == j[b].type
            })),
            z.width(O).height(P).color(ba.filter(function(a, b) {
              return !j[b].disabled && 2 == j[b].yAxis && "bar" == j[b].type
            })),
            A.width(O).height(P).interpolate(m).color(ba.filter(function(a, b) {
              return !j[b].disabled && 1 == j[b].yAxis && "area" == j[b].type
            })),
            B.width(O).height(P).interpolate(m).color(ba.filter(function(a, b) {
              return !j[b].disabled && 2 == j[b].yAxis && "area" == j[b].type
            })),
            aa.attr("transform", "translate(" + e.left + "," + e.top + ")");
        var ea = aa.select(".lines1Wrap")
                     .datum(Q.filter(function(a) { return !a.disabled })),
            fa = aa.select(".scatters1Wrap")
                     .datum(S.filter(function(a) { return !a.disabled })),
            ga = aa.select(".bars1Wrap")
                     .datum(U.filter(function(a) { return !a.disabled })),
            ha = aa.select(".stack1Wrap")
                     .datum(W.filter(function(a) { return !a.disabled })),
            ia = aa.select(".lines2Wrap")
                     .datum(R.filter(function(a) { return !a.disabled })),
            ja = aa.select(".scatters2Wrap")
                     .datum(T.filter(function(a) { return !a.disabled })),
            ka = aa.select(".bars2Wrap")
                     .datum(V.filter(function(a) { return !a.disabled })),
            la = aa.select(".stack2Wrap")
                     .datum(X.filter(function(a) { return !a.disabled })),
            ma = W.length ? W.map(function(a) { return a.values })
                                .reduce(function(a, b) {
                                  return a.map(function(a, c) {
                                    return { x: a.x, y: a.y + b[c].y }
                                  })
                                })
                                .concat([ {x : 0, y : 0} ])
                          : [],
            na = X.length ? X.map(function(a) { return a.values })
                                .reduce(function(a, b) {
                                  return a.map(function(a, c) {
                                    return { x: a.x, y: a.y + b[c].y }
                                  })
                                })
                                .concat([ {x : 0, y : 0} ])
                          : [];
        s.domain(c ||
                 d3.extent(d3.merge(Y).concat(ma), function(a) { return a.y }))
            .range([ 0, P ]),
            t.domain(d || d3.extent(d3.merge(Z).concat(na),
                                    function(a) { return a.y }))
                .range([ 0, P ]),
            u.yDomain(s.domain()), w.yDomain(s.domain()), y.yDomain(s.domain()),
            A.yDomain(s.domain()), v.yDomain(t.domain()), x.yDomain(t.domain()),
            z.yDomain(t.domain()), B.yDomain(t.domain()),
            W.length && d3.transition(ha).call(A),
            X.length && d3.transition(la).call(B),
            U.length && d3.transition(ga).call(y),
            V.length && d3.transition(ka).call(z),
            Q.length && d3.transition(ea).call(u),
            R.length && d3.transition(ia).call(v),
            S.length && d3.transition(fa).call(w),
            T.length && d3.transition(ja).call(x),
            C._ticks(a.utils.calcTicksX(O / 100, j)).tickSize(-P, 0),
            aa.select(".nv-x.nv-axis")
                .attr("transform", "translate(0," + P + ")"),
            d3.transition(aa.select(".nv-x.nv-axis")).call(C),
            D._ticks(a.utils.calcTicksY(P / 36, j)).tickSize(-O, 0),
            d3.transition(aa.select(".nv-y1.nv-axis")).call(D),
            E._ticks(a.utils.calcTicksY(P / 36, j)).tickSize(-O, 0),
            d3.transition(aa.select(".nv-y2.nv-axis")).call(E),
            aa.select(".nv-y1.nv-axis")
                .classed("nv-disabled", Y.length ? !1 : !0)
                .attr("transform", "translate(" + r.range()[0] + ",0)"),
            aa.select(".nv-y2.nv-axis")
                .classed("nv-disabled", Z.length ? !1 : !0)
                .attr("transform", "translate(" + r.range()[1] + ",0)"),
            F.dispatch.on("stateChange", function(a) { b.update() }),
            p && (o.width(O)
                      .height(P)
                      .margin({left : e.left, top : e.top})
                      .svgContainer(N)
                      .xScale(r),
                  $.select(".nv-interactive").call(o)),
            p ? (o.dispatch.on(
                     "elementMousemove",
                     function(c) {
                       L();
                       var d, e, g, h = [];
                       j.filter(function(a, b) {
                          return a.seriesIndex = b, !a.disabled
                        }).forEach(function(i, j) {
                         var k = r.domain(),
                             l = i.values.filter(function(a, c) {
                               return b.x()(a, c) >= k[0] && b.x()(a, c) <= k[1]
                             });
                         e = a.interactiveBisect(l, c.pointXValue, b.x());
                         var m = l[e], n = b.y()(m, e);
                         null !== n && M(j, e, !0),
                             void 0 !== m &&
                                 (void 0 === d && (d = m),
                                  void 0 === g && (g = r(b.x()(m, e))), h.push({
                                    key : i.key,
                                    value : n,
                                    color : f(i, i.seriesIndex),
                                    data : m,
                                    yAxis : 2 == i.yAxis ? E : D
                                  }))
                       });
                       var i = function(a, b) {
                         var c = h[b].yAxis;
                         return null == a ? "N/A" : c.tickFormat()(a)
                       };
                       o.tooltip
                           .headerFormatter(function(
                               a, b) { return C.tickFormat()(a, b) })
                           .valueFormatter(o.tooltip.valueFormatter() || i)
                           .data(
                               {value : b.x()(d, e), index : e, series : h})(),
                           o.renderGuideLine(g)
                     }),
                 o.dispatch.on("elementMouseout", function(a) { L() }))
              : (u.dispatch.on("elementMouseover.tooltip", n),
                 v.dispatch.on("elementMouseover.tooltip", n),
                 u.dispatch.on("elementMouseout.tooltip",
                               function(a) { G.hidden(!0) }),
                 v.dispatch.on("elementMouseout.tooltip",
                               function(a) { G.hidden(!0) }),
                 w.dispatch.on("elementMouseover.tooltip", H),
                 x.dispatch.on("elementMouseover.tooltip", H),
                 w.dispatch.on("elementMouseout.tooltip",
                               function(a) { G.hidden(!0) }),
                 x.dispatch.on("elementMouseout.tooltip",
                               function(a) { G.hidden(!0) }),
                 A.dispatch.on("elementMouseover.tooltip", J),
                 B.dispatch.on("elementMouseover.tooltip", J),
                 A.dispatch.on("elementMouseout.tooltip",
                               function(a) { G.hidden(!0) }),
                 B.dispatch.on("elementMouseout.tooltip",
                               function(a) { G.hidden(!0) }),
                 y.dispatch.on("elementMouseover.tooltip", K),
                 z.dispatch.on("elementMouseover.tooltip", K),
                 y.dispatch.on("elementMouseout.tooltip",
                               function(a) { G.hidden(!0) }),
                 z.dispatch.on("elementMouseout.tooltip",
                               function(a) { G.hidden(!0) }),
                 y.dispatch.on("elementMousemove.tooltip", function(a) { G() }),
                 z.dispatch.on("elementMousemove.tooltip", function(a) { G() }))
      }),
             b
    }
    var c, d, e = {top : 30, right : 20, bottom : 50, left : 60},
              f = a.utils.defaultColor(), g = null, h = null, i = !0, j = null,
              k = function(a) { return a.x }, l = function(a) { return a.y },
              m = "linear", n = !0, o = a.interactiveGuideline(), p = !1,
              q = " (right axis)", r = d3.scale.linear(), s = d3.scale.linear(),
              t = d3.scale.linear(), u = a.models.line().yScale(s),
              v = a.models.line().yScale(t), w = a.models.scatter().yScale(s),
              x = a.models.scatter().yScale(t),
              y = a.models.multiBar().stacked(!1).yScale(s),
              z = a.models.multiBar().stacked(!1).yScale(t),
              A = a.models.stackedArea().yScale(s),
              B = a.models.stackedArea().yScale(t),
              C = a.models.axis().scale(r).orient("bottom").tickPadding(5),
              D = a.models.axis().scale(s).orient("left"),
              E = a.models.axis().scale(t).orient("right"),
              F = a.models.legend().height(30), G = a.models.tooltip(),
              H = d3.dispatch(), I = [ u, v, w, x, y, z, A, B ];
    return b.dispatch = H, b.legend = F, b.lines1 = u, b.lines2 = v,
           b.scatters1 = w, b.scatters2 = x, b.bars1 = y, b.bars2 = z,
           b.stack1 = A, b.stack2 = B, b.xAxis = C, b.yAxis1 = D, b.yAxis2 = E,
           b.tooltip = G, b.interactiveLayer = o,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return g }, set : function(a) { g = a }},
             height :
                 {get : function() { return h }, set : function(a) { h = a }},
             showLegend :
                 {get : function() { return i }, set : function(a) { i = a }},
             yDomain1 :
                 {get : function() { return c }, set : function(a) { c = a }},
             yDomain2 :
                 {get : function() { return d }, set : function(a) { d = a }},
             noData :
                 {get : function() { return j }, set : function(a) { j = a }},
             interpolate :
                 {get : function() { return m }, set : function(a) { m = a }},
             legendRightAxisHint :
                 {get : function() { return q }, set : function(a) { q = a }},
             margin : {
               get : function() { return e },
               set : function(a) {
                 e.top = void 0 !== a.top ? a.top : e.top,
                 e.right = void 0 !== a.right ? a.right : e.right,
                 e.bottom = void 0 !== a.bottom ? a.bottom : e.bottom,
                 e.left = void 0 !== a.left ? a.left : e.left
               }
             },
             color : {
               get : function() { return f },
               set : function(b) { f = a.utils.getColor(b) }
             },
             x : {
               get : function() { return k },
               set : function(a) {
                 k = a, u.x(a), v.x(a), w.x(a), x.x(a), y.x(a), z.x(a), A.x(a),
                 B.x(a)
               }
             },
             y : {
               get : function() { return l },
               set : function(a) {
                 l = a, u.y(a), v.y(a), w.y(a), x.y(a), A.y(a), B.y(a), y.y(a),
                 z.y(a)
               }
             },
             useVoronoi : {
               get : function() { return n },
               set : function(a) {
                 n = a, u.useVoronoi(a), v.useVoronoi(a), A.useVoronoi(a),
                 B.useVoronoi(a)
               }
             },
             useInteractiveGuideline : {
               get : function() { return p },
               set : function(a) {
                 p = a,
                 p && (u.interactive(!1), u.useVoronoi(!1), v.interactive(!1),
                       v.useVoronoi(!1), A.interactive(!1), A.useVoronoi(!1),
                       B.interactive(!1), B.useVoronoi(!1), w.interactive(!1),
                       x.interactive(!1))
               }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.ohlcBar = function() {
    "use strict";
    function b(y) {
      return y.each(function(b) {
        k = d3.select(this);
        var y = a.utils.availableWidth(h, k, g),
            A = a.utils.availableHeight(i, k, g);
        a.utils.initSVG(k);
        var B = y / b[0].values.length * .9;
        l.domain(c || d3.extent(b[0].values.map(n).concat(t))),
            v ? l.range(e ||
                        [
                          .5 * y / b[0].values.length,
                          y * (b[0].values.length - .5) / b[0].values.length
                        ])
              : l.range(e || [ 5 + B / 2, y - B / 2 - 5 ]),
            m.domain(d ||
                     [
                       d3.min(b[0].values.map(s).concat(u)),
                       d3.max(b[0].values.map(r).concat(u))
                     ])
                .range(f || [ A, 0 ]),
            l.domain()[0] === l.domain()[1] &&
                (l.domain()[0] ? l.domain([
                  l.domain()[0] - .01 * l.domain()[0],
                  l.domain()[1] + .01 * l.domain()[1]
                ])
                               : l.domain([ -1, 1 ])),
            m.domain()[0] === m.domain()[1] &&
                (m.domain()[0] ? m.domain([
                  m.domain()[0] + .01 * m.domain()[0],
                  m.domain()[1] - .01 * m.domain()[1]
                ])
                               : m.domain([ -1, 1 ]));
        var C = d3.select(this).selectAll("g.nv-wrap.nv-ohlcBar").data([
          b[0].values
        ]),
            D = C.enter().append("g").attr("class", "nvd3 nv-wrap nv-ohlcBar"),
            E = D.append("defs"), F = D.append("g"), G = C.select("g");
        F.append("g").attr("class", "nv-ticks"),
            C.attr("transform", "translate(" + g.left + "," + g.top + ")"),
            k.on("click",
                 function(a, b) {
                   z.chartClick({data : a, index : b, pos : d3.event, id : j})
                 }),
            E.append("clipPath")
                .attr("id", "nv-chart-clip-path-" + j)
                .append("rect"),
            C.select("#nv-chart-clip-path-" + j + " rect")
                .attr("width", y)
                .attr("height", A),
            G.attr("clip-path", w ? "url(#nv-chart-clip-path-" + j + ")" : "");
        var H = C.select(".nv-ticks")
                    .selectAll(".nv-tick")
                    .data(function(a) { return a });
        H.exit().remove(),
            H.enter()
                .append("path")
                .attr("class",
                      function(a, b, c) {
                        return (p(a, b) > q(a, b) ? "nv-tick negative"
                                                  : "nv-tick positive") +
                               " nv-tick-" + c + "-" + b
                      })
                .attr("d",
                      function(a, b) {
                        return "m0,0l0," + (m(p(a, b)) - m(r(a, b))) + "l" +
                               -B / 2 + ",0l" + B / 2 + ",0l0," +
                               (m(s(a, b)) - m(p(a, b))) + "l0," +
                               (m(q(a, b)) - m(s(a, b))) + "l" + B / 2 + ",0l" +
                               -B / 2 + ",0z"
                      })
                .attr("transform",
                      function(a, b) {
                        return "translate(" + l(n(a, b)) + "," + m(r(a, b)) +
                               ")"
                      })
                .attr("fill", function(a, b) { return x[0] })
                .attr("stroke", function(a, b) { return x[0] })
                .attr("x", 0)
                .attr("y", function(a, b) { return m(Math.max(0, o(a, b))) })
                .attr("height",
                      function(a, b) { return Math.abs(m(o(a, b)) - m(0)) }),
            H.attr("class",
                   function(a, b, c) {
                     return (p(a, b) > q(a, b) ? "nv-tick negative"
                                               : "nv-tick positive") +
                            " nv-tick-" + c + "-" + b
                   }),
            d3.transition(H)
                .attr("transform",
                      function(a, b) {
                        return "translate(" + l(n(a, b)) + "," + m(r(a, b)) +
                               ")"
                      })
                .attr("d", function(a, c) {
                  var d = y / b[0].values.length * .9;
                  return "m0,0l0," + (m(p(a, c)) - m(r(a, c))) + "l" + -d / 2 +
                         ",0l" + d / 2 + ",0l0," + (m(s(a, c)) - m(p(a, c))) +
                         "l0," + (m(q(a, c)) - m(s(a, c))) + "l" + d / 2 +
                         ",0l" + -d / 2 + ",0z"
                })
      }),
             b
    }
    var c, d, e, f,
        g = {top : 0, right : 0, bottom : 0, left : 0}, h = null, i = null,
        j = Math.floor(1e4 * Math.random()), k = null, l = d3.scale.linear(),
        m = d3.scale.linear(), n = function(a) { return a.x },
        o = function(a) { return a.y }, p = function(a) { return a.open },
        q = function(a) { return a.close }, r = function(a) { return a.high },
        s = function(a) { return a.low }, t = [], u = [], v = !1, w = !0,
        x = a.utils.defaultColor(), y = !1,
        z = d3.dispatch("stateChange", "changeState", "renderEnd", "chartClick",
                        "elementClick", "elementDblClick", "elementMouseover",
                        "elementMouseout", "elementMousemove");
    return b.highlightPoint =
               function(a, c) {
      b.clearHighlights(),
          k.select(".nv-ohlcBar .nv-tick-0-" + a).classed("hover", c)
    },
           b.clearHighlights =
               function() {
             k.select(".nv-ohlcBar .nv-tick.hover").classed("hover", !1)
           },
           b.dispatch = z, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return h }, set : function(a) { h = a }},
             height :
                 {get : function() { return i }, set : function(a) { i = a }},
             xScale :
                 {get : function() { return l }, set : function(a) { l = a }},
             yScale :
                 {get : function() { return m }, set : function(a) { m = a }},
             xDomain :
                 {get : function() { return c }, set : function(a) { c = a }},
             yDomain :
                 {get : function() { return d }, set : function(a) { d = a }},
             xRange :
                 {get : function() { return e }, set : function(a) { e = a }},
             yRange :
                 {get : function() { return f }, set : function(a) { f = a }},
             forceX :
                 {get : function() { return t }, set : function(a) { t = a }},
             forceY :
                 {get : function() { return u }, set : function(a) { u = a }},
             padData :
                 {get : function() { return v }, set : function(a) { v = a }},
             clipEdge :
                 {get : function() { return w }, set : function(a) { w = a }},
             id : {get : function() { return j }, set : function(a) { j = a }},
             interactive :
                 {get : function() { return y }, set : function(a) { y = a }},
             x : {get : function() { return n }, set : function(a) { n = a }},
             y : {get : function() { return o }, set : function(a) { o = a }},
             open :
                 {get : function() { return p() }, set : function(a) { p = a }},
             close :
                 {get : function() { return q() }, set : function(a) { q = a }},
             high :
                 {get : function() { return r }, set : function(a) { r = a }},
             low : {get : function() { return s }, set : function(a) { s = a }},
             margin : {
               get : function() { return g },
               set : function(a) {
                 g.top = void 0 != a.top ? a.top : g.top,
                 g.right = void 0 != a.right ? a.right : g.right,
                 g.bottom = void 0 != a.bottom ? a.bottom : g.bottom,
                 g.left = void 0 != a.left ? a.left : g.left
               }
             },
             color : {
               get : function() { return x },
               set : function(b) { x = a.utils.getColor(b) }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.parallelCoordinates = function() {
    "use strict";
    function b(B) {
      return A.reset(), B.each(function(b) {
        function A(a) {
          return x(o.map(function(b) {
            if (isNaN(a.values[b.key]) || isNaN(parseFloat(a.values[b.key])) ||
                O) {
              var c = l[b.key].domain(), d = l[b.key].range(),
                  e = c[0] - (c[1] - c[0]) / 9;
              if (v.indexOf(b.key) < 0) {
                var f = d3.scale.linear().domain([ e, c[1] ]).range([
                  j - 12, d[1]
                ]);
                l[b.key].brush.y(f), v.push(b.key)
              }
              if (isNaN(a.values[b.key]) || isNaN(parseFloat(a.values[b.key])))
                return [ k(b.key), l[b.key](e) ]
            }
            return void 0 !== U &&
                       (v.length > 0 || O ? (U.style("display", "inline"),
                                             V.style("display", "inline"))
                                          : (U.style("display", "none"),
                                             V.style("display", "none"))),
                   [ k(b.key), l[b.key](a.values[b.key]) ]
          }))
        }
        function B(a) {
          s.forEach(function(b) {
            var c = l[b.dimension].brush.y().domain();
            b.hasOnlyNaN && (b.extent[1] = (l[b.dimension].domain()[1] - c[0]) *
                                               (b.extent[1] - b.extent[0]) /
                                               (N[b.dimension] - b.extent[0]) +
                                           c[0]),
                b.hasNaN && (b.extent[0] = c[0]),
                a && l[b.dimension].brush.extent(b.extent)
          }),
              e.select(".nv-brushBackground")
                  .each(function(a) { d3.select(this).call(l[a.key].brush) })
                  .selectAll("rect")
                  .attr("x", -8)
                  .attr("width", 16),
              F()
        }
        function C() { q === !1 && (q = !0, B(!0)) }
        function D() {
          $ = p.filter(function(a) { return !l[a].brush.empty() }),
          _ = $.map(function(a) { return l[a].brush.extent() }), s = [],
          $.forEach(function(a, b) {
            s[b] = {
              dimension : a,
              extent : _[b],
              hasNaN : !1,
              hasOnlyNaN : !1
            }
          }),
          t = [], c.style("display", function(a) {
            var b = $.every(function(b, c) {
              return (isNaN(a.values[b]) || isNaN(parseFloat(a.values[b]))) &&
                             _[c][0] == l[b].brush.y().domain()[0]
                         ? !0
                         : _[c][0] <= a.values[b] && a.values[b] <= _[c][1] &&
                               !isNaN(parseFloat(a.values[b]))
            });
            return b && t.push(a), b ? null : "none"
          }), F(), z.brush({filters : s, active : t})
        }
        function E() {
          var a = $.length > 0 ? !0 : !1;
          s.forEach(function(a) {
            a.extent[0] === l[a.dimension].brush.y().domain()[0] &&
                v.indexOf(a.dimension) >= 0 && (a.hasNaN = !0),
                a.extent[1] < l[a.dimension].domain()[0] && (a.hasOnlyNaN = !0)
          }),
              z.brushEnd(t, a)
        }
        function F() {
          e.select(".nv-axis").each(function(a, b) {
            var c = s.filter(function(b) { return b.dimension == a.key });
            P[a.key] = l[a.key].domain(),
            0 != c.length && q &&
                (P[a.key] = [],
                 c[0].extent[1] > l[a.key].domain()[0] &&
                     (P[a.key] = [ c[0].extent[1] ]),
                 c[0].extent[0] >= l[a.key].domain()[0] &&
                     P[a.key].push(c[0].extent[0])),
            d3.select(this).call(
                y.scale(l[a.key]).tickFormat(a.format).tickValues(P[a.key]))
          })
        }
        function G(a) {
          u[a.key] = this.parentNode.__origin__ = k(a.key),
          d.attr("visibility", "hidden")
        }
        function H(a) {
          u[a.key] = Math.min(
              i, Math.max(0, this.parentNode.__origin__ += d3.event.x)),
          c.attr("d", A), o.sort(function(a, b) { return J(a.key) - J(b.key) }),
          o.forEach(function(a, b) { return a.currentPosition = b }),
          k.domain(o.map(function(a) { return a.key })),
          e.attr("transform",
                 function(a) { return "translate(" + J(a.key) + ")" })
        }
        function I(a, b) {
          delete this.parentNode.__origin__, delete u[a.key],
              d3.select(this.parentNode)
                  .attr("transform", "translate(" + k(a.key) + ")"),
              c.attr("d", A), d.attr("d", A).attr("visibility", null),
              z.dimensionsOrder(o)
        }
        function J(a) {
          var b = u[a];
          return null == b ? k(a) : b
        }
        var K = d3.select(this);
        if (i = a.utils.availableWidth(g, K, f),
            j = a.utils.availableHeight(h, K, f), a.utils.initSVG(K),
            void 0 === b[0].values) {
          var L = [];
          b.forEach(function(a) {
            var b = {}, c = Object.keys(a);
            c.forEach(function(c) { "name" !== c && (b[c] = a[c]) }),
                L.push({key : a.name, values : b})
          }),
              b = L
        }
        var M = b.map(function(a) { return a.values });
        0 === t.length && (t = b),
            p = n.sort(function(a, b) {
                   return a.currentPosition - b.currentPosition
                 }).map(function(a) { return a.key }),
            o = n.filter(function(a) { return !a.disabled }),
            k.rangePoints([ 0, i ], 1)
                .domain(o.map(function(a) { return a.key }));
        var N = {}, O = !1, P = [];
        p.forEach(function(a) {
          var b = d3.extent(M, function(b) { return +b[a] }), c = b[0],
              d = b[1], e = !1;
          (isNaN(c) || isNaN(d)) && (e = !0, c = 0, d = 0),
              c === d && (c -= 1, d += 1);
          var f = s.filter(function(b) { return b.dimension == a });
          0 !== f.length &&
              (e ? (c = l[a].domain()[0], d = l[a].domain()[1])
                 : !f[0].hasOnlyNaN && q
                       ? (c = c > f[0].extent[0] ? f[0].extent[0] : c,
                          d = d < f[0].extent[1] ? f[0].extent[1] : d)
                       : f[0].hasNaN &&
                             (d = d < f[0].extent[1] ? f[0].extent[1] : d,
                              N[a] = l[a].domain()[1], O = !0)),
              l[a] = d3.scale.linear().domain([ c, d ]).range(
                  [ .9 * (j - 12), 0 ]),
              v = [],
              l[a].brush = d3.svg.brush()
                               .y(l[a])
                               .on("brushstart", C)
                               .on("brush", D)
                               .on("brushend", E)
        });
        var Q = K.selectAll("g.nv-wrap.nv-parallelCoordinates").data([ b ]),
            R = Q.enter().append("g").attr(
                "class", "nvd3 nv-wrap nv-parallelCoordinates"),
            S = R.append("g"), T = Q.select("g");
        S.append("g").attr("class", "nv-parallelCoordinates background"),
            S.append("g").attr("class", "nv-parallelCoordinates foreground"),
            S.append("g").attr("class",
                               "nv-parallelCoordinates missingValuesline"),
            Q.attr("transform", "translate(" + f.left + "," + f.top + ")"),
            x.interpolate("cardinal").tension(w), y.orient("left");
        var U, V,
            W = d3.behavior.drag()
                    .on("dragstart", G)
                    .on("drag", H)
                    .on("dragend", I),
            X = k.range()[1] - k.range()[0];
        if (!isNaN(X)) {
          var Y = [ 0 + X / 2, j - 12, i - X / 2, j - 12 ];
          U = Q.select(".missingValuesline").selectAll("line").data([ Y ]),
          U.enter().append("line"), U.exit().remove(),
          U.attr("x1", function(a) { return a[0] })
              .attr("y1", function(a) { return a[1] })
              .attr("x2", function(a) { return a[2] })
              .attr("y2", function(a) { return a[3] }),
          V = Q.select(".missingValuesline").selectAll("text").data([ m ]),
          V.append("text").data([ m ]), V.enter().append("text"),
          V.exit().remove(),
          V.attr("y", j)
              .attr("x", i - 92 - X / 2)
              .text(function(a) { return a })
        }
        d = Q.select(".background").selectAll("path").data(b),
        d.enter().append("path"), d.exit().remove(), d.attr("d", A),
        c = Q.select(".foreground").selectAll("path").data(b),
        c.enter().append("path"), c.exit().remove(),
        c.attr("d", A)
            .style("stroke-width",
                   function(a, b) {
                     return isNaN(a.strokeWidth) && (a.strokeWidth = 1),
                            a.strokeWidth
                   })
            .attr("stroke", function(a, b) { return a.color || r(a, b) }),
        c.on("mouseover",
             function(a, b) {
               d3.select(this)
                   .classed("hover", !0)
                   .style("stroke-width", a.strokeWidth + 2 + "px")
                   .style("stroke-opacity", 1),
                   z.elementMouseover({
                     label : a.name,
                     color : a.color || r(a, b),
                     values : a.values,
                     dimensions : o
                   })
             }),
        c.on("mouseout",
             function(a, b) {
               d3.select(this)
                   .classed("hover", !1)
                   .style("stroke-width", a.strokeWidth + "px")
                   .style("stroke-opacity", .7),
                   z.elementMouseout({label : a.name, index : b})
             }),
        c.on("mousemove", function(a, b) { z.elementMousemove() }),
        c.on("click", function(a) { z.elementClick({id : a.id}) }),
        e = T.selectAll(".dimension").data(o);
        var Z = e.enter().append("g").attr("class",
                                           "nv-parallelCoordinates dimension");
        e.attr("transform",
               function(a) { return "translate(" + k(a.key) + ",0)" }),
            Z.append("g").attr("class", "nv-axis"),
            Z.append("text")
                .attr("class", "nv-label")
                .style("cursor", "move")
                .attr("dy", "-1em")
                .attr("text-anchor", "middle")
                .on("mouseover",
                    function(a, b) {
                      z.elementMouseover(
                          {label : a.tooltip || a.key, color : a.color})
                    })
                .on("mouseout",
                    function(a, b) { z.elementMouseout({label : a.tooltip}) })
                .on("mousemove", function(a, b) { z.elementMousemove() })
                .call(W),
            Z.append("g").attr("class", "nv-brushBackground"),
            e.exit().remove(),
            e.select(".nv-label").text(function(a) { return a.key }), B(q);
        var $ = p.filter(function(a) { return !l[a].brush.empty() }),
            _ = $.map(function(a) { return l[a].brush.extent() }),
            aa = t.slice(0);
        t = [], c.style("display", function(a) {
          var b = $.every(function(b, c) {
            return (isNaN(a.values[b]) || isNaN(parseFloat(a.values[b]))) &&
                           _[c][0] == l[b].brush.y().domain()[0]
                       ? !0
                       : _[c][0] <= a.values[b] && a.values[b] <= _[c][1] &&
                             !isNaN(parseFloat(a.values[b]))
          });
          return b && t.push(a), b ? null : "none"
        }), (s.length > 0 || !a.utils.arrayEquals(t, aa)) && z.activeChanged(t)
      }),
             b
    }
    var c, d, e,
        f = {top : 30, right : 0, bottom : 10, left : 0}, g = null, h = null,
        i = null, j = null, k = d3.scale.ordinal(), l = {},
        m = "undefined values", n = [], o = [], p = [], q = !0,
        r = a.utils.defaultColor(), s = [], t = [], u = [], v = [], w = 1,
        x = d3.svg.line(), y = d3.svg.axis(),
        z = d3.dispatch("brushstart", "brush", "brushEnd", "dimensionsOrder",
                        "stateChange", "elementClick", "elementMouseover",
                        "elementMouseout", "elementMousemove", "renderEnd",
                        "activeChanged"),
        A = a.utils.renderWatch(z);
    return b.dispatch = z, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return g }, set : function(a) { g = a }},
             height :
                 {get : function() { return h }, set : function(a) { h = a }},
             dimensionData :
                 {get : function() { return n }, set : function(a) { n = a }},
             displayBrush :
                 {get : function() { return q }, set : function(a) { q = a }},
             filters :
                 {get : function() { return s }, set : function(a) { s = a }},
             active :
                 {get : function() { return t }, set : function(a) { t = a }},
             lineTension :
                 {get : function() { return w }, set : function(a) { w = a }},
             undefinedValuesLabel :
                 {get : function() { return m }, set : function(a) { m = a }},
             dimensions : {
               get : function() { return n.map(function(a) { return a.key }) },
               set : function(b) {
                 a.deprecated("dimensions", "use dimensionData instead"),
                     0 === n.length
                         ? b.forEach(function(a) { n.push({key : a}) })
                         : b.forEach(function(a, b) { n[b].key = a })
               }
             },
             dimensionNames : {
               get : function() { return n.map(function(a) { return a.key }) },
               set : function(b) {
                 a.deprecated("dimensionNames", "use dimensionData instead"),
                     p = [],
                     0 === n.length
                         ? b.forEach(function(a) { n.push({key : a}) })
                         : b.forEach(function(a, b) { n[b].key = a })
               }
             },
             dimensionFormats : {
               get :
                   function() { return n.map(function(a) { return a.format }) },
               set : function(b) {
                 a.deprecated("dimensionFormats", "use dimensionData instead"),
                     0 === n.length
                         ? b.forEach(function(a) { n.push({format : a}) })
                         : b.forEach(function(a, b) { n[b].format = a })
               }
             },
             margin : {
               get : function() { return f },
               set : function(a) {
                 f.top = void 0 !== a.top ? a.top : f.top,
                 f.right = void 0 !== a.right ? a.right : f.right,
                 f.bottom = void 0 !== a.bottom ? a.bottom : f.bottom,
                 f.left = void 0 !== a.left ? a.left : f.left
               }
             },
             color : {
               get : function() { return r },
               set : function(b) { r = a.utils.getColor(b) }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.parallelCoordinatesChart = function() {
    "use strict";
    function b(e) {
      return r.reset(), r.models(c), e.each(function(e) {
        var j = d3.select(this);
        a.utils.initSVG(j);
        var o = a.utils.availableWidth(g, j, f),
            p = a.utils.availableHeight(h, j, f);
        if (b.update = function() { j.call(b) }, b.container = this,
            k.setter(t(l), b.update).getter(s(l)).update(),
            k.disabled = l.map(function(a) { return !!a.disabled }),
            l = l.map(function(a) { return a.disabled = !!a.disabled, a }),
            l.forEach(function(a, b) {
              a.originalPosition =
                  isNaN(a.originalPosition) ? b : a.originalPosition,
              a.currentPosition =
                  isNaN(a.currentPosition) ? b : a.currentPosition
            }),
            !n) {
          var r;
          n = {};
          for (r in k)
            k[r] instanceof Array ? n[r] = k[r].slice(0) : n[r] = k[r]
        }
        if (!e || !e.length)
          return a.utils.noData(b, j), b;
        j.selectAll(".nv-noData").remove();
        var u = j.selectAll("g.nv-wrap.nv-parallelCoordinatesChart").data([
          e
        ]),
            v = u.enter()
                    .append("g")
                    .attr("class", "nvd3 nv-wrap nv-parallelCoordinatesChart")
                    .append("g"),
            w = u.select("g");
        v.append("g").attr("class", "nv-parallelCoordinatesWrap"),
            v.append("g").attr("class", "nv-legendWrap"),
            w.select("rect").attr("width", o).attr("height", p > 0 ? p : 0),
            i ? (d.width(o).color(function(a) { return "rgb(188,190,192)" }),
                 w.select(".nv-legendWrap")
                     .datum(l.sort(function(
                         a,
                         b) { return a.originalPosition - b.originalPosition }))
                     .call(d),
                 d.height() > f.top &&
                     (f.top = d.height(), p = a.utils.availableHeight(h, j, f)),
                 u.select(".nv-legendWrap")
                     .attr("transform", "translate( 0 ," + -f.top + ")"))
              : w.select(".nv-legendWrap").selectAll("*").remove(),
            u.attr("transform", "translate(" + f.left + "," + f.top + ")"),
            c.width(o).height(p).dimensionData(l).displayBrush(m);
        var x = w.select(".nv-parallelCoordinatesWrap ").datum(e);
        x.transition().call(c),
            c.dispatch.on(
                "brushEnd",
                function(a, b) { b ? (m = !0, q.brushEnd(a)) : m = !1 }),
            d.dispatch.on("stateChange", function(a) {
              for (var c in a)
                k[c] = a[c];
              q.stateChange(k), b.update()
            }), c.dispatch.on("dimensionsOrder", function(a) {
              l.sort(function(
                  a, b) { return a.currentPosition - b.currentPosition });
              var b = !1;
              l.forEach(function(a, c) {
                a.currentPosition = c,
                a.currentPosition !== a.originalPosition && (b = !0)
              }),
                  q.dimensionsOrder(l, b)
            }), q.on("changeState", function(a) {
              "undefined" != typeof a.disabled &&
                  (l.forEach(function(b, c) { b.disabled = a.disabled[c] }),
                   k.disabled = a.disabled),
                  b.update()
            })
      }),
             r.renderEnd("parraleleCoordinateChart immediate"), b
    }
    var c = a.models.parallelCoordinates(), d = a.models.legend(),
        e = a.models.tooltip(),
        f = (a.models.tooltip(), {top : 0, right : 0, bottom : 0, left : 0}),
        g = null, h = null, i = !0, j = a.utils.defaultColor(),
        k = a.utils.state(), l = [], m = !0, n = null, o = null,
        p = "undefined",
        q = d3.dispatch("dimensionsOrder", "brushEnd", "stateChange",
                        "changeState", "renderEnd"),
        r = a.utils.renderWatch(q), s = function(a) {
          return function() {
            return {
              active: a.map(function(a) { return !a.disabled })
            }
          }
        }, t = function(a) {
          return function(b) {
            void 0 !== b.active &&
                a.forEach(function(a, c) { a.disabled = !b.active[c] })
          }
        };
    return e.contentGenerator(function(a) {
      var b =
          '<table><thead><tr><td class="legend-color-guide"><div style="background-color:' +
          a.color + '"></div></td><td><strong>' + a.key +
          "</strong></td></tr></thead>";
      return 0 !== a.series.length &&
                 (b += '<tbody><tr><td height ="10px"></td></tr>',
                  a.series.forEach(function(a) {
                    b = b +
                        '<tr><td class="legend-color-guide"><div style="background-color:' +
                        a.color + '"></div></td><td class="key">' + a.key +
                        '</td><td class="value">' + a.value + "</td></tr>"
                  }),
                  b += "</tbody>"),
             b += "</table>"
    }),
           c.dispatch.on(
               "elementMouseover.tooltip",
               function(a) {
                 var b = {key : a.label, color : a.color, series : []};
                 a.values &&
                     (Object.keys(a.values).forEach(function(c) {
                       var d = a.dimensions.filter(function(
                           a) { return a.key === c })[0];
                       if (d) {
                         var e;
                         e = isNaN(a.values[c]) ||
                                     isNaN(parseFloat(a.values[c]))
                                 ? p
                                 : d.format(a.values[c]),
                         b.series.push({
                           idx : d.currentPosition,
                           key : c,
                           value : e,
                           color : d.color
                         })
                       }
                     }),
                      b.series.sort(function(a, b) { return a.idx - b.idx })),
                     e.data(b).hidden(!1)
               }),
           c.dispatch.on("elementMouseout.tooltip",
                         function(a) { e.hidden(!0) }),
           c.dispatch.on("elementMousemove.tooltip", function() { e() }),
           b.dispatch = q, b.parallelCoordinates = c, b.legend = d,
           b.tooltip = e, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return g }, set : function(a) { g = a }},
             height :
                 {get : function() { return h }, set : function(a) { h = a }},
             showLegend :
                 {get : function() { return i }, set : function(a) { i = a }},
             defaultState :
                 {get : function() { return n }, set : function(a) { n = a }},
             dimensionData :
                 {get : function() { return l }, set : function(a) { l = a }},
             displayBrush :
                 {get : function() { return m }, set : function(a) { m = a }},
             noData :
                 {get : function() { return o }, set : function(a) { o = a }},
             nanValue :
                 {get : function() { return p }, set : function(a) { p = a }},
             margin : {
               get : function() { return f },
               set : function(a) {
                 f.top = void 0 !== a.top ? a.top : f.top,
                 f.right = void 0 !== a.right ? a.right : f.right,
                 f.bottom = void 0 !== a.bottom ? a.bottom : f.bottom,
                 f.left = void 0 !== a.left ? a.left : f.left
               }
             },
             color : {
               get : function() { return j },
               set : function(
                   b) { j = a.utils.getColor(b), d.color(j), c.color(j) }
             }
           }),
           a.utils.inheritOptions(b, c), a.utils.initOptions(b), b
  }, a.models.pie = function() {
    "use strict";
    function b(F) {
      return E.reset(), F.each(function(b) {
        function F(a, b) {
          a.endAngle = isNaN(a.endAngle) ? 0 : a.endAngle,
          a.startAngle = isNaN(a.startAngle) ? 0 : a.startAngle,
          p || (a.innerRadius = 0);
          var c = d3.interpolate(this._current, a);
          return this._current = c(0), function(a) { return C[b](c(a)) }
        }
        var G = d - c.left - c.right, H = e - c.top - c.bottom,
            I = Math.min(G, H) / 2, J = [], K = [];
        if (i = d3.select(this), 0 === A.length)
          for (var L = I - I / 5, M = y * I, N = 0; N < b[0].length; N++)
            J.push(L), K.push(M);
        else
          r ? (J = A.map(function(a) { return (a.outer - a.outer / 5) * I }),
               K = A.map(function(a) { return (a.inner - a.inner / 5) * I }),
               y = d3.min(A.map(function(a) { return a.inner - a.inner / 5 })))
            : (J = A.map(function(a) { return a.outer * I }),
               K = A.map(function(a) { return a.inner * I }),
               y = d3.min(A.map(function(a) { return a.inner })));
        a.utils.initSVG(i);
        var O = i.selectAll(".nv-wrap.nv-pie").data(b),
            P = O.enter().append("g").attr("class",
                                           "nvd3 nv-wrap nv-pie nv-chart-" + h),
            Q = P.append("g"), R = O.select("g"),
            S = Q.append("g").attr("class", "nv-pie");
        Q.append("g").attr("class", "nv-pieLabels"),
            O.attr("transform", "translate(" + c.left + "," + c.top + ")"),
            R.select(".nv-pie").attr("transform",
                                     "translate(" + G / 2 + "," + H / 2 + ")"),
            R.select(".nv-pieLabels")
                .attr("transform", "translate(" + G / 2 + "," + H / 2 + ")"),
            i.on("click", function(a, b) {
              B.chartClick({data : a, index : b, pos : d3.event, id : h})
            }), C = [], D = [];
        for (var N = 0; N < b[0].length; N++) {
          var T = d3.svg.arc().outerRadius(J[N]),
              U = d3.svg.arc().outerRadius(J[N] + 5);
          u !== !1 && (T.startAngle(u), U.startAngle(u)),
              w !== !1 && (T.endAngle(w), U.endAngle(w)),
              p && (T.innerRadius(K[N]), U.innerRadius(K[N])),
              T.cornerRadius && x && (T.cornerRadius(x), U.cornerRadius(x)),
              C.push(T), D.push(U)
        }
        var V = d3.layout.pie().sort(null).value(function(
            a) { return a.disabled ? 0 : g(a) });
        V.padAngle && v && V.padAngle(v),
            p && q &&
                (S.append("text").attr("class", "nv-pie-title"),
                 O.select(".nv-pie-title")
                     .style("text-anchor", "middle")
                     .text(function(a) { return q })
                     .style("font-size",
                            Math.min(G, H) * y * 2 / (q.length + 2) + "px")
                     .attr("dy", "0.35em")
                     .attr(
                         "transform",
                         function(a, b) { return "translate(0, " + s + ")" }));
        var W = O.select(".nv-pie").selectAll(".nv-slice").data(V),
            X = O.select(".nv-pieLabels").selectAll(".nv-label").data(V);
        W.exit().remove(), X.exit().remove();
        var Y = W.enter().append("g");
        Y.attr("class", "nv-slice"), Y.on("mouseover", function(a, b) {
          d3.select(this).classed("hover", !0),
              r &&
                  d3.select(this).select("path").transition().duration(70).attr(
                      "d", D[b]),
              B.elementMouseover({
                data : a.data,
                index : b,
                color : d3.select(this).style("fill"),
                percent : (a.endAngle - a.startAngle) / (2 * Math.PI)
              })
        }), Y.on("mouseout", function(a, b) {
          d3.select(this).classed("hover", !1),
              r &&
                  d3.select(this).select("path").transition().duration(50).attr(
                      "d", C[b]),
              B.elementMouseout({data : a.data, index : b})
        }), Y.on("mousemove", function(a, b) {
          B.elementMousemove({data : a.data, index : b})
        }), Y.on("click", function(a, b) {
          var c = this;
          B.elementClick({
            data : a.data,
            index : b,
            color : d3.select(this).style("fill"),
            event : d3.event,
            element : c
          })
        }), Y.on("dblclick", function(a, b) {
          B.elementDblClick(
              {data : a.data, index : b, color : d3.select(this).style("fill")})
        }), W.attr("fill", function(a, b) {
          return j(a.data, b)
        }), W.attr("stroke", function(a, b) { return j(a.data, b) });
        Y.append("path").each(function(a) { this._current = a });
        if (W.select("path")
                .transition()
                .duration(z)
                .attr("d", function(a, b) { return C[b](a) })
                .attrTween("d", F),
            l) {
          for (var Z = [], N = 0; N < b[0].length; N++)
            Z.push(C[N]),
                m ? p && (Z[N] = d3.svg.arc().outerRadius(C[N].outerRadius()),
                          u !== !1 && Z[N].startAngle(u),
                          w !== !1 && Z[N].endAngle(w))
                  : p || Z[N].innerRadius(0);
          X.enter().append("g").classed("nv-label", !0).each(function(a, b) {
            var c = d3.select(this);
            c.attr("transform",
                   function(a, b) {
                     if (t) {
                       a.outerRadius = J[b] + 10, a.innerRadius = J[b] + 15;
                       var c =
                           (a.startAngle + a.endAngle) / 2 * (180 / Math.PI);
                       return (a.startAngle + a.endAngle) / 2 < Math.PI
                                  ? c -= 90
                                  : c += 90,
                              "translate(" + Z[b].centroid(a) + ") rotate(" +
                                  c + ")"
                     }
                     return a.outerRadius = I + 10, a.innerRadius = I + 15,
                            "translate(" + Z[b].centroid(a) + ")"
                   }),
                c.append("rect")
                    .style("stroke", "#fff")
                    .style("fill", "#fff")
                    .attr("rx", 3)
                    .attr("ry", 3),
                c.append("text")
                    .style("text-anchor",
                           t ? (a.startAngle + a.endAngle) / 2 < Math.PI
                                   ? "start"
                                   : "end"
                             : "middle")
                    .style("fill", "#000")
          });
          var $ = {}, _ = 14, aa = 140, ba = function(a) {
            return Math.floor(a[0] / aa) * aa + "," + Math.floor(a[1] / _) * _
          }, ca = function(a) {
            return (a.endAngle - a.startAngle) / (2 * Math.PI)
          };
          X.watchTransition(E, "pie labels")
              .attr("transform",
                    function(a, b) {
                      if (t) {
                        a.outerRadius = J[b] + 10, a.innerRadius = J[b] + 15;
                        var c =
                            (a.startAngle + a.endAngle) / 2 * (180 / Math.PI);
                        return (a.startAngle + a.endAngle) / 2 < Math.PI
                                   ? c -= 90
                                   : c += 90,
                               "translate(" + Z[b].centroid(a) + ") rotate(" +
                                   c + ")"
                      }
                      a.outerRadius = I + 10, a.innerRadius = I + 15;
                      var d = Z[b].centroid(a), e = ca(a);
                      if (a.value && e >= o) {
                        var f = ba(d);
                        $[f] && (d[1] -= _), $[ba(d)] = !0
                      }
                      return "translate(" + d + ")"
                    }),
              X.select(".nv-label text")
                  .style("text-anchor",
                         function(a, b) {
                           return t ? (a.startAngle + a.endAngle) / 2 < Math.PI
                                          ? "start"
                                          : "end"
                                    : "middle"
                         })
                  .text(function(a, b) {
                    var c = ca(a), d = "";
                    if (!a.value || o > c)
                      return "";
                    if ("function" == typeof n)
                      d = n(
                          a, b,
                          {key : f(a.data), value : g(a.data), percent : k(c)});
                    else
                      switch (n) {
                      case "key":
                        d = f(a.data);
                        break;
                      case "value":
                        d = k(g(a.data));
                        break;
                      case "percent":
                        d = d3.format("%")(c)
                      }
                    return d
                  })
        }
      }),
             E.renderEnd("pie immediate"), b
    }
    var c = {top : 0, right : 0, bottom : 0, left : 0}, d = 500, e = 500,
        f = function(a) { return a.x }, g = function(a) { return a.y },
        h = Math.floor(1e4 * Math.random()), i = null,
        j = a.utils.defaultColor(), k = d3.format(",.2f"), l = !0, m = !1,
        n = "key", o = .02, p = !1, q = !1, r = !0, s = 0, t = !1, u = !1,
        v = !1, w = !1, x = 0, y = .5, z = 250, A = [],
        B = d3.dispatch("chartClick", "elementClick", "elementDblClick",
                        "elementMouseover", "elementMouseout",
                        "elementMousemove", "renderEnd"),
        C = [], D = [], E = a.utils.renderWatch(B);
    return b.dispatch = B, b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             arcsRadius :
                 {get : function() { return A }, set : function(a) { A = a }},
             width :
                 {get : function() { return d }, set : function(a) { d = a }},
             height :
                 {get : function() { return e }, set : function(a) { e = a }},
             showLabels :
                 {get : function() { return l }, set : function(a) { l = a }},
             title :
                 {get : function() { return q }, set : function(a) { q = a }},
             titleOffset :
                 {get : function() { return s }, set : function(a) { s = a }},
             labelThreshold :
                 {get : function() { return o }, set : function(a) { o = a }},
             valueFormat :
                 {get : function() { return k }, set : function(a) { k = a }},
             x : {get : function() { return f }, set : function(a) { f = a }},
             id : {get : function() { return h }, set : function(a) { h = a }},
             endAngle :
                 {get : function() { return w }, set : function(a) { w = a }},
             startAngle :
                 {get : function() { return u }, set : function(a) { u = a }},
             padAngle :
                 {get : function() { return v }, set : function(a) { v = a }},
             cornerRadius :
                 {get : function() { return x }, set : function(a) { x = a }},
             donutRatio :
                 {get : function() { return y }, set : function(a) { y = a }},
             labelsOutside :
                 {get : function() { return m }, set : function(a) { m = a }},
             labelSunbeamLayout :
                 {get : function() { return t }, set : function(a) { t = a }},
             donut :
                 {get : function() { return p }, set : function(a) { p = a }},
             growOnHover :
                 {get : function() { return r }, set : function(a) { r = a }},
             pieLabelsOutside : {
               get : function() { return m },
               set : function(b) {
                 m = b,
                 a.deprecated("pieLabelsOutside", "use labelsOutside instead")
               }
             },
             donutLabelsOutside : {
               get : function() { return m },
               set : function(b) {
                 m = b,
                 a.deprecated("donutLabelsOutside", "use labelsOutside instead")
               }
             },
             labelFormat : {
               get : function() { return k },
               set : function(b) {
                 k = b, a.deprecated("labelFormat", "use valueFormat instead")
               }
             },
             margin : {
               get : function() { return c },
               set : function(a) {
                 c.top = "undefined" != typeof a.top ? a.top : c.top,
                 c.right = "undefined" != typeof a.right ? a.right : c.right,
                 c.bottom =
                     "undefined" != typeof a.bottom ? a.bottom : c.bottom,
                 c.left = "undefined" != typeof a.left ? a.left : c.left
               }
             },
             duration : {
               get : function() { return z },
               set : function(a) { z = a, E.reset(z) }
             },
             y : {
               get : function() { return g },
               set : function(a) { g = d3.functor(a) }
             },
             color : {
               get : function() { return j },
               set : function(b) { j = a.utils.getColor(b) }
             },
             labelType : {
               get : function() { return n },
               set : function(a) { n = a || "key" }
             }
           }),
           a.utils.initOptions(b), b
  }, a.models.pieChart = function() {
    "use strict";
    function b(e) {
      return r.reset(), r.models(c), e.each(function(e) {
        var i = d3.select(this);
        a.utils.initSVG(i);
        var l = a.utils.availableWidth(g, i, f),
            o = a.utils.availableHeight(h, i, f);
        if (b.update = function() { i.transition().call(b) },
            b.container = this, m.setter(t(e), b.update).getter(s(e)).update(),
            m.disabled = e.map(function(a) { return !!a.disabled }), !n) {
          var p;
          n = {};
          for (p in m)
            m[p] instanceof Array ? n[p] = m[p].slice(0) : n[p] = m[p]
        }
        if (!e || !e.length)
          return a.utils.noData(b, i), b;
        i.selectAll(".nv-noData").remove();
        var r = i.selectAll("g.nv-wrap.nv-pieChart").data([ e ]),
            u = r.enter()
                    .append("g")
                    .attr("class", "nvd3 nv-wrap nv-pieChart")
                    .append("g"),
            v = r.select("g");
        if (u.append("g").attr("class", "nv-pieWrap"),
            u.append("g").attr("class", "nv-legendWrap"), j) {
          if ("top" === k)
            d.width(l).key(c.x()), r.select(".nv-legendWrap").datum(e).call(d),
                d.height() > f.top &&
                    (f.top = d.height(), o = a.utils.availableHeight(h, i, f)),
                r.select(".nv-legendWrap")
                    .attr("transform", "translate(0," + -f.top + ")");
          else if ("right" === k) {
            var w = a.models.legend().width();
            w > l / 2 && (w = l / 2), d.height(o).key(c.x()), d.width(w),
                l -= d.width(),
                r.select(".nv-legendWrap")
                    .datum(e)
                    .call(d)
                    .attr("transform", "translate(" + l + ",0)")
          }
        } else
          v.select(".nv-legendWrap").selectAll("*").remove();
        r.attr("transform", "translate(" + f.left + "," + f.top + ")"),
            c.width(l).height(o);
        var x = v.select(".nv-pieWrap").datum([ e ]);
        d3.transition(x).call(c), d.dispatch.on("stateChange", function(a) {
          for (var c in a)
            m[c] = a[c];
          q.stateChange(m), b.update()
        }), q.on("changeState", function(a) {
          "undefined" != typeof a.disabled &&
              (e.forEach(function(b, c) { b.disabled = a.disabled[c] }),
               m.disabled = a.disabled),
              b.update()
        })
      }),
             r.renderEnd("pieChart immediate"), b
    }
    var c = a.models.pie(), d = a.models.legend(), e = a.models.tooltip(),
        f = {top : 30, right : 20, bottom : 20, left : 20}, g = null, h = null,
        i = !1, j = !0, k = "top", l = a.utils.defaultColor(),
        m = a.utils.state(), n = null, o = null, p = 250,
        q = d3.dispatch("stateChange", "changeState", "renderEnd");
    e.duration(0).headerEnabled(!1).valueFormatter(function(
        a, b) { return c.valueFormat()(a, b) });
    var r = a.utils.renderWatch(q), s = function(a) {
      return function() {
        return {
          active: a.map(function(a) { return !a.disabled })
        }
      }
    }, t = function(a) {
      return function(b) {
        void 0 !== b.active &&
            a.forEach(function(a, c) { a.disabled = !b.active[c] })
      }
    };
    return c.dispatch.on("elementMouseover.tooltip",
                         function(a) {
                           a.series = {
                             key : b.x()(a.data),
                             value : b.y()(a.data),
                             color : a.color,
                             percent : a.percent
                           },
                           i || (delete a.percent, delete a.series.percent),
                           e.data(a).hidden(!1)
                         }),
           c.dispatch.on("elementMouseout.tooltip",
                         function(a) { e.hidden(!0) }),
           c.dispatch.on("elementMousemove.tooltip", function(a) { e() }),
           b.legend = d, b.dispatch = q, b.pie = c, b.tooltip = e,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return g }, set : function(a) { g = a }},
             height :
                 {get : function() { return h }, set : function(a) { h = a }},
             noData :
                 {get : function() { return o }, set : function(a) { o = a }},
             showTooltipPercent :
                 {get : function() { return i }, set : function(a) { i = a }},
             showLegend :
                 {get : function() { return j }, set : function(a) { j = a }},
             legendPosition :
                 {get : function() { return k }, set : function(a) { k = a }},
             defaultState :
                 {get : function() { return n }, set : function(a) { n = a }},
             color : {
               get : function() { return l },
               set : function(a) { l = a, d.color(l), c.color(l) }
             },
             duration : {
               get : function() { return p },
               set : function(a) { p = a, r.reset(p), c.duration(p) }
             },
             margin : {
               get : function() { return f },
               set : function(a) {
                 f.top = void 0 !== a.top ? a.top : f.top,
                 f.right = void 0 !== a.right ? a.right : f.right,
                 f.bottom = void 0 !== a.bottom ? a.bottom : f.bottom,
                 f.left = void 0 !== a.left ? a.left : f.left
               }
             }
           }),
           a.utils.inheritOptions(b, c), a.utils.initOptions(b), b
  }, a.models.scatter = function() {
    "use strict";
    function b(a) {
      var b, c;
      return b = i = i || {}, c = a[0].series, b = b[c] = b[c] || {}, c = a[1],
             b = b[c] = b[c] || {}
    }
    function c(a) {
      var c, d, e = a[0], f = b(a), g = !1;
      for (c = 1; c < arguments.length; c++)
        d = arguments[c],
        f[d] === e[d] && f.hasOwnProperty(d) || (f[d] = e[d], g = !0);
      return g
    }
    function d(b) {
      return U.reset(), b.each(function(b) {
        function i() {
          if (T = !1, !z)
            return !1;
          if (P === !0) {
            var c = d3.merge(b.map(function(b, c) {
              return b.values
                  .map(function(b, d) {
                    var e = s(b, d), f = t(b, d);
                    return [
                      a.utils.NaNtoZero(p(e)) + 1e-4 * Math.random(),
                      a.utils.NaNtoZero(q(f)) + 1e-4 * Math.random(), c, d, b
                    ]
                  })
                  .filter(function(a, b) { return A(a[4], b) })
            }));
            if (0 == c.length)
              return !1;
            c.length < 3 &&
                (c.push([ p.range()[0] - 20, q.range()[0] - 20, null, null ]),
                 c.push([ p.range()[1] + 20, q.range()[1] + 20, null, null ]),
                 c.push([ p.range()[0] - 20, q.range()[0] + 20, null, null ]),
                 c.push([ p.range()[1] + 20, q.range()[1] - 20, null, null ]));
            var d = d3.geom.polygon([
              [ -10, -10 ], [ -10, l + 10 ], [ k + 10, l + 10 ],
              [ k + 10, -10 ]
            ]),
                e = d3.geom.voronoi(c).map(function(a, b) {
                  return { data: d.clip(a), series: c[b][2], point: c[b][3] }
                });
            _.select(".nv-point-paths").selectAll("path").remove();
            var f = _.select(".nv-point-paths").selectAll("path").data(e),
                g = f.enter()
                        .append("svg:path")
                        .attr("d",
                              function(a) {
                                return a && a.data && 0 !== a.data.length
                                           ? "M" + a.data.join(",") + "Z"
                                           : "M 0 0"
                              })
                        .attr("id", function(a, b) { return "nv-path-" + b })
                        .attr("clip-path", function(a, b) {
                          return "url(#nv-clip-" + n + "-" + b + ")"
                        });
            if (F && g.style("fill", d3.rgb(230, 230, 230))
                         .style("fill-opacity", .4)
                         .style("stroke-opacity", 1)
                         .style("stroke", d3.rgb(200, 200, 200)),
                E) {
              _.select(".nv-point-clips").selectAll("*").remove();
              var h = _.select(".nv-point-clips").selectAll("clipPath").data(c);
              h.enter()
                  .append("svg:clipPath")
                  .attr("id",
                        function(a, b) { return "nv-clip-" + n + "-" + b })
                  .append("svg:circle")
                  .attr("cx", function(a) { return a[0] })
                  .attr("cy", function(a) { return a[1] })
                  .attr("r", G)
            }
            var i = function(a, c) {
              if (T)
                return 0;
              var d = b[a.series];
              if (void 0 !== d) {
                var e = d.values[a.point];
                e.color = m(d, a.series), e.x = s(e), e.y = t(e);
                var f = o.node().getBoundingClientRect(),
                    g = window.pageYOffset ||
                        document.documentElement.scrollTop,
                    h = window.pageXOffset ||
                        document.documentElement.scrollLeft,
                    i = {
                      left : p(s(e, a.point)) + f.left + h + j.left + 10,
                      top : q(t(e, a.point)) + f.top + g + j.top + 10
                    };
                c({
                  point : e,
                  series : d,
                  pos : i,
                  relativePos :
                      [ p(s(e, a.point)) + j.left, q(t(e, a.point)) + j.top ],
                  seriesIndex : a.series,
                  pointIndex : a.point
                })
              }
            };
            f.on("click", function(a) { i(a, O.elementClick) })
                .on("dblclick", function(a) { i(a, O.elementDblClick) })
                .on("mouseover", function(a) { i(a, O.elementMouseover) })
                .on("mouseout", function(a, b) { i(a, O.elementMouseout) })
          } else
            _.select(".nv-groups")
                .selectAll(".nv-group")
                .selectAll(".nv-point")
                .on("click",
                    function(a, c) {
                      if (T || !b[a.series])
                        return 0;
                      var d = b[a.series], e = d.values[c], f = this;
                      O.elementClick({
                        point : e,
                        series : d,
                        pos : [ p(s(e, c)) + j.left, q(t(e, c)) + j.top ],
                        relativePos :
                            [ p(s(e, c)) + j.left, q(t(e, c)) + j.top ],
                        seriesIndex : a.series,
                        pointIndex : c,
                        event : d3.event,
                        element : f
                      })
                    })
                .on("dblclick",
                    function(a, c) {
                      if (T || !b[a.series])
                        return 0;
                      var d = b[a.series], e = d.values[c];
                      O.elementDblClick({
                        point : e,
                        series : d,
                        pos : [ p(s(e, c)) + j.left, q(t(e, c)) + j.top ],
                        relativePos :
                            [ p(s(e, c)) + j.left, q(t(e, c)) + j.top ],
                        seriesIndex : a.series,
                        pointIndex : c
                      })
                    })
                .on("mouseover",
                    function(a, c) {
                      if (T || !b[a.series])
                        return 0;
                      var d = b[a.series], e = d.values[c];
                      O.elementMouseover({
                        point : e,
                        series : d,
                        pos : [ p(s(e, c)) + j.left, q(t(e, c)) + j.top ],
                        relativePos :
                            [ p(s(e, c)) + j.left, q(t(e, c)) + j.top ],
                        seriesIndex : a.series,
                        pointIndex : c,
                        color : m(a, c)
                      })
                    })
                .on("mouseout", function(a, c) {
                  if (T || !b[a.series])
                    return 0;
                  var d = b[a.series], e = d.values[c];
                  O.elementMouseout({
                    point : e,
                    series : d,
                    pos : [ p(s(e, c)) + j.left, q(t(e, c)) + j.top ],
                    relativePos : [ p(s(e, c)) + j.left, q(t(e, c)) + j.top ],
                    seriesIndex : a.series,
                    pointIndex : c,
                    color : m(a, c)
                  })
                })
        }
        o = d3.select(this);
        var Q = a.utils.availableWidth(k, o, j),
            W = a.utils.availableHeight(l, o, j);
        a.utils.initSVG(o),
            b.forEach(function(
                a, b) { a.values.forEach(function(a) { a.series = b }) });
        var X = d.yScale().name === d3.scale.log().name ? !0 : !1,
            Y = H && I && L ? [] : d3.merge(b.map(function(a) {
              return a.values.map(function(a, b) {
                return { x: s(a, b), y: t(a, b), size: u(a, b) }
              })
            }));
        if (p.domain(H ||
                     d3.extent(Y.map(function(a) { return a.x }).concat(w))),
            B && b[0] ? p.range(J ||
                                [
                                  (Q * C + Q) / (2 * b[0].values.length),
                                  Q - Q * (1 + C) / (2 * b[0].values.length)
                                ])
                      : p.range(J || [ 0, Q ]),
            X) {
          var Z =
              d3.min(Y.map(function(a) { return 0 !== a.y ? a.y : void 0 }));
          q.clamp(!0)
              .domain(I || d3.extent(Y.map(function(a) {
                                        return 0 !== a.y ? a.y : .1 * Z
                                      }).concat(x)))
              .range(K || [ W, 0 ])
        } else
          q.domain(I || d3.extent(Y.map(function(a) { return a.y }).concat(x)))
              .range(K || [ W, 0 ]);
        r.domain(L || d3.extent(Y.map(function(a) { return a.size }).concat(y)))
            .range(M || V),
            N = p.domain()[0] === p.domain()[1] ||
                q.domain()[0] === q.domain()[1],
            p.domain()[0] === p.domain()[1] &&
                (p.domain()[0] ? p.domain([
                  p.domain()[0] - .01 * p.domain()[0],
                  p.domain()[1] + .01 * p.domain()[1]
                ])
                               : p.domain([ -1, 1 ])),
            q.domain()[0] === q.domain()[1] &&
                (q.domain()[0] ? q.domain([
                  q.domain()[0] - .01 * q.domain()[0],
                  q.domain()[1] + .01 * q.domain()[1]
                ])
                               : q.domain([ -1, 1 ])),
            isNaN(p.domain()[0]) && p.domain([ -1, 1 ]),
            isNaN(q.domain()[0]) && q.domain([ -1, 1 ]), e = e || p, f = f || q,
            g = g || r;
        var $ = p(1) !== e(1) || q(1) !== f(1) || r(1) !== g(1),
            _ = o.selectAll("g.nv-wrap.nv-scatter").data([ b ]),
            aa = _.enter().append("g").attr(
                "class", "nvd3 nv-wrap nv-scatter nv-chart-" + n),
            ba = aa.append("defs"), ca = aa.append("g"), da = _.select("g");
        _.classed("nv-single-point", N),
            ca.append("g").attr("class", "nv-groups"),
            ca.append("g").attr("class", "nv-point-paths"),
            aa.append("g").attr("class", "nv-point-clips"),
            _.attr("transform", "translate(" + j.left + "," + j.top + ")"),
            ba.append("clipPath")
                .attr("id", "nv-edge-clip-" + n)
                .append("rect"),
            _.select("#nv-edge-clip-" + n + " rect")
                .attr("width", Q)
                .attr("height", W > 0 ? W : 0),
            da.attr("clip-path", D ? "url(#nv-edge-clip-" + n + ")" : ""),
            T = !0;
        var ea =
            _.select(".nv-groups")
                .selectAll(".nv-group")
                .data(function(a) { return a }, function(a) { return a.key });
        ea.enter()
            .append("g")
            .style("stroke-opacity", 1e-6)
            .style("fill-opacity", 1e-6),
            ea.exit().remove(),
            ea.attr("class",
                    function(a, b) {
                      return (a.classed || "") + " nv-group nv-series-" + b
                    })
                .classed("nv-noninteractive", !z)
                .classed("hover", function(a) { return a.hover }),
            ea.watchTransition(U, "scatter: groups")
                .style("fill", function(a, b) { return m(a, b) })
                .style("stroke", function(a, b) { return m(a, b) })
                .style("stroke-opacity", 1)
                .style("fill-opacity", .5);
        var fa = ea.selectAll("path.nv-point").data(function(a) {
          return a.values.map(function(a, b) {
                           return [ a, b ]
                         })
              .filter(function(a, b) { return A(a[0], b) })
        });
        if (fa.enter()
                .append("path")
                .attr("class",
                      function(a) { return "nv-point nv-point-" + a[1] })
                .style("fill", function(a) { return a.color })
                .style("stroke", function(a) { return a.color })
                .attr("transform",
                      function(b) {
                        return "translate(" +
                               a.utils.NaNtoZero(e(s(b[0], b[1]))) + "," +
                               a.utils.NaNtoZero(f(t(b[0], b[1]))) + ")"
                      })
                .attr("d", a.utils.symbol()
                               .type(function(a) { return v(a[0]) })
                               .size(function(a) { return r(u(a[0], a[1])) })),
            fa.exit().remove(),
            ea.exit()
                .selectAll("path.nv-point")
                .watchTransition(U, "scatter exit")
                .attr("transform",
                      function(b) {
                        return "translate(" +
                               a.utils.NaNtoZero(p(s(b[0], b[1]))) + "," +
                               a.utils.NaNtoZero(q(t(b[0], b[1]))) + ")"
                      })
                .remove(),
            fa.filter(function(a) { return $ || c(a, "x", "y") })
                .watchTransition(U, "scatter points")
                .attr("transform",
                      function(b) {
                        return "translate(" +
                               a.utils.NaNtoZero(p(s(b[0], b[1]))) + "," +
                               a.utils.NaNtoZero(q(t(b[0], b[1]))) + ")"
                      }),
            fa.filter(function(a) { return $ || c(a, "shape", "size") })
                .watchTransition(U, "scatter points")
                .attr("d", a.utils.symbol()
                               .type(function(a) { return v(a[0]) })
                               .size(function(a) { return r(u(a[0], a[1])) })),
            S) {
          var ga = ea.selectAll(".nv-label").data(function(a) {
            return a.values.map(function(a, b) {
                             return [ a, b ]
                           })
                .filter(function(a, b) { return A(a[0], b) })
          });
          ga.enter()
              .append("text")
              .style("fill", function(a, b) { return a.color })
              .style("stroke-opacity", 0)
              .style("fill-opacity", 1)
              .attr("transform",
                    function(b) {
                      var c = a.utils.NaNtoZero(e(s(b[0], b[1]))) +
                              Math.sqrt(r(u(b[0], b[1])) / Math.PI) + 2;
                      return "translate(" + c + "," +
                             a.utils.NaNtoZero(f(t(b[0], b[1]))) + ")"
                    })
              .text(function(a, b) { return a[0].label }),
              ga.exit().remove(),
              ea.exit()
                  .selectAll("path.nv-label")
                  .watchTransition(U, "scatter exit")
                  .attr("transform",
                        function(b) {
                          var c = a.utils.NaNtoZero(p(s(b[0], b[1]))) +
                                  Math.sqrt(r(u(b[0], b[1])) / Math.PI) + 2;
                          return "translate(" + c + "," +
                                 a.utils.NaNtoZero(q(t(b[0], b[1]))) + ")"
                        })
                  .remove(),
              ga.each(function(a) {
                d3.select(this)
                    .classed("nv-label", !0)
                    .classed("nv-label-" + a[1], !1)
                    .classed("hover", !1)
              }),
              ga.watchTransition(U, "scatter labels")
                  .attr("transform", function(b) {
                    var c = a.utils.NaNtoZero(p(s(b[0], b[1]))) +
                            Math.sqrt(r(u(b[0], b[1])) / Math.PI) + 2;
                    return "translate(" + c + "," +
                           a.utils.NaNtoZero(q(t(b[0], b[1]))) + ")"
                  })
        }
        R ? (clearTimeout(h), h = setTimeout(i, R)) : i(),
            e = p.copy(), f = q.copy(), g = r.copy()
      }),
             U.renderEnd("scatter immediate"), d
    }
    var e, f, g, h, i,
        j = {top : 0, right : 0, bottom : 0, left : 0}, k = null, l = null,
        m = a.utils.defaultColor(), n = Math.floor(1e5 * Math.random()),
        o = null, p = d3.scale.linear(), q = d3.scale.linear(),
        r = d3.scale.linear(), s = function(a) { return a.x },
        t = function(a) { return a.y }, u = function(a) { return a.size || 1 },
        v = function(a) { return a.shape || "circle" }, w = [], x = [], y = [],
        z = !0, A = function(a) { return !a.notActive }, B = !1, C = .1, D = !1,
        E = !0, F = !1, G = function() { return 25 }, H = null, I = null,
        J = null, K = null, L = null, M = null, N = !1,
        O = d3.dispatch("elementClick", "elementDblClick", "elementMouseover",
                        "elementMouseout", "renderEnd"),
        P = !0, Q = 250, R = 300, S = !1, T = !1, U = a.utils.renderWatch(O, Q),
        V = [ 16, 256 ];
    return d.dispatch = O, d.options = a.utils.optionsFunc.bind(d),
           d._calls =
               new function() {
                 this.clearHighlights = function() {
                   return a.dom.write(function() {
                     o.selectAll(".nv-point.hover").classed("hover", !1)
                   }),
                          null
                 }, this.highlightPoint = function(b, c, d) {
                   a.dom.write(function() {
                     o.select(".nv-groups")
                         .selectAll(".nv-series-" + b)
                         .selectAll(".nv-point-" + c)
                         .classed("hover", d)
                   })
                 }
               },
           O.on("elementMouseover.point",
                function(a) {
                  z && d._calls.highlightPoint(a.seriesIndex, a.pointIndex, !0)
                }),
           O.on("elementMouseout.point",
                function(a) {
                  z && d._calls.highlightPoint(a.seriesIndex, a.pointIndex, !1)
                }),
           d._options =
               Object.create(
                   {}, {
                     width : {
                       get : function() { return k },
                       set : function(a) { k = a }
                     },
                     height : {
                       get : function() { return l },
                       set : function(a) { l = a }
                     },
                     xScale : {
                       get : function() { return p },
                       set : function(a) { p = a }
                     },
                     yScale : {
                       get : function() { return q },
                       set : function(a) { q = a }
                     },
                     pointScale : {
                       get : function() { return r },
                       set : function(a) { r = a }
                     },
                     xDomain : {
                       get : function() { return H },
                       set : function(a) { H = a }
                     },
                     yDomain : {
                       get : function() { return I },
                       set : function(a) { I = a }
                     },
                     pointDomain : {
                       get : function() { return L },
                       set : function(a) { L = a }
                     },
                     xRange : {
                       get : function() { return J },
                       set : function(a) { J = a }
                     },
                     yRange : {
                       get : function() { return K },
                       set : function(a) { K = a }
                     },
                     pointRange : {
                       get : function() { return M },
                       set : function(a) { M = a }
                     },
                     forceX : {
                       get : function() { return w },
                       set : function(a) { w = a }
                     },
                     forceY : {
                       get : function() { return x },
                       set : function(a) { x = a }
                     },
                     forcePoint : {
                       get : function() { return y },
                       set : function(a) { y = a }
                     },
                     interactive : {
                       get : function() { return z },
                       set : function(a) { z = a }
                     },
                     pointActive : {
                       get : function() { return A },
                       set : function(a) { A = a }
                     },
                     padDataOuter : {
                       get : function() { return C },
                       set : function(a) { C = a }
                     },
                     padData : {
                       get : function() { return B },
                       set : function(a) { B = a }
                     },
                     clipEdge : {
                       get : function() { return D },
                       set : function(a) { D = a }
                     },
                     clipVoronoi : {
                       get : function() { return E },
                       set : function(a) { E = a }
                     },
                     clipRadius : {
                       get : function() { return G },
                       set : function(a) { G = a }
                     },
                     showVoronoi : {
                       get : function() { return F },
                       set : function(a) { F = a }
                     },
                     id : {
                       get : function() { return n },
                       set : function(a) { n = a }
                     },
                     interactiveUpdateDelay : {
                       get : function() { return R },
                       set : function(a) { R = a }
                     },
                     showLabels : {
                       get : function() { return S },
                       set : function(a) { S = a }
                     },
                     x : {
                       get : function() { return s },
                       set : function(a) { s = d3.functor(a) }
                     },
                     y : {
                       get : function() { return t },
                       set : function(a) { t = d3.functor(a) }
                     },
                     pointSize : {
                       get : function() { return u },
                       set : function(a) { u = d3.functor(a) }
                     },
                     pointShape : {
                       get : function() { return v },
                       set : function(a) { v = d3.functor(a) }
                     },
                     margin :
                         {
                           get : function() { return j },
                           set : function(a) {
                             j.top = void 0 !== a.top ? a.top : j.top,
                             j.right = void 0 !== a.right ? a.right : j.right,
                             j.bottom =
                                 void 0 !== a.bottom ? a.bottom : j.bottom,
                             j.left = void 0 !== a.left ? a.left : j.left
                           }
                         },
                     duration : {
                       get : function() { return Q },
                       set : function(a) { Q = a, U.reset(Q) }
                     },
                     color : {
                       get : function() { return m },
                       set : function(b) { m = a.utils.getColor(b) }
                     },
                     useVoronoi : {
                       get : function() { return P },
                       set : function(a) { P = a, P === !1 && (E = !1) }
                     }
                   }),
           a.utils.initOptions(d), d
  }, a.models.scatterChart = function() {
    "use strict";
    function b(z) {
      return E.reset(), E.models(c), t && E.models(d), u && E.models(e),
             q && E.models(g), r && E.models(h), z.each(function(z) {
               m = d3.select(this), a.utils.initSVG(m);
               var H = a.utils.availableWidth(k, m, j),
                   I = a.utils.availableHeight(l, m, j);
               if (b.update =
                       function() {
                         0 === A ? m.call(b)
                                 : m.transition().duration(A).call(b)
                       },
                   b.container = this,
                   w.setter(G(z), b.update).getter(F(z)).update(),
                   w.disabled = z.map(function(a) { return !!a.disabled }),
                   !x) {
                 var J;
                 x = {};
                 for (J in w)
                   w[J] instanceof Array ? x[J] = w[J].slice(0) : x[J] = w[J]
               }
               if (!(z && z.length &&
                     z.filter(function(a) { return a.values.length }).length))
                 return a.utils.noData(b, m), E.renderEnd("scatter immediate"),
                        b;
               m.selectAll(".nv-noData").remove(), o = c.xScale(),
                                                   p = c.yScale();
               var K = m.selectAll("g.nv-wrap.nv-scatterChart").data([ z ]),
                   L = K.enter().append("g").attr(
                       "class",
                       "nvd3 nv-wrap nv-scatterChart nv-chart-" + c.id()),
                   M = L.append("g"), N = K.select("g");
               if (M.append("rect")
                       .attr("class", "nvd3 nv-background")
                       .style("pointer-events", "none"),
                   M.append("g").attr("class", "nv-x nv-axis"),
                   M.append("g").attr("class", "nv-y nv-axis"),
                   M.append("g").attr("class", "nv-scatterWrap"),
                   M.append("g").attr("class", "nv-regressionLinesWrap"),
                   M.append("g").attr("class", "nv-distWrap"),
                   M.append("g").attr("class", "nv-legendWrap"),
                   v && N.select(".nv-y.nv-axis")
                            .attr("transform", "translate(" + H + ",0)"),
                   s) {
                 var O = H;
                 f.width(O), K.select(".nv-legendWrap").datum(z).call(f),
                     f.height() > j.top &&
                         (j.top = f.height(),
                          I = a.utils.availableHeight(l, m, j)),
                     K.select(".nv-legendWrap")
                         .attr("transform", "translate(0," + -j.top + ")")
               } else
                 N.select(".nv-legendWrap").selectAll("*").remove();
               K.attr("transform", "translate(" + j.left + "," + j.top + ")"),
                   c.width(H)
                       .height(I)
                       .color(
                           z.map(function(a, b) {
                              return a.color = a.color || n(a, b), a.color
                            }).filter(function(a, b) { return !z[b].disabled }))
                       .showLabels(B),
                   K.select(".nv-scatterWrap")
                       .datum(z.filter(function(a) { return !a.disabled }))
                       .call(c),
                   K.select(".nv-regressionLinesWrap")
                       .attr("clip-path", "url(#nv-edge-clip-" + c.id() + ")");
               var P = K.select(".nv-regressionLinesWrap")
                           .selectAll(".nv-regLines")
                           .data(function(a) { return a });
               P.enter().append("g").attr("class", "nv-regLines");
               var Q = P.selectAll(".nv-regLine")
                           .data(function(a) { return [ a ] });
               Q.enter()
                   .append("line")
                   .attr("class", "nv-regLine")
                   .style("stroke-opacity", 0),
                   Q.filter(function(a) { return a.intercept && a.slope })
                       .watchTransition(E, "scatterPlusLineChart: regline")
                       .attr("x1", o.range()[0])
                       .attr("x2", o.range()[1])
                       .attr("y1",
                             function(a, b) {
                               return p(o.domain()[0] * a.slope + a.intercept)
                             })
                       .attr("y2",
                             function(a, b) {
                               return p(o.domain()[1] * a.slope + a.intercept)
                             })
                       .style("stroke", function(a, b, c) { return n(a, c) })
                       .style("stroke-opacity",
                              function(a, b) {
                                return a.disabled ||
                                               "undefined" == typeof a.slope ||
                                               "undefined" == typeof a.intercept
                                           ? 0
                                           : 1
                              }),
                   t && (d.scale(o)
                             ._ticks(a.utils.calcTicksX(H / 100, z))
                             .tickSize(-I, 0),
                         N.select(".nv-x.nv-axis")
                             .attr("transform",
                                   "translate(0," + p.range()[0] + ")")
                             .call(d)),
                   u && (e.scale(p)
                             ._ticks(a.utils.calcTicksY(I / 36, z))
                             .tickSize(-H, 0),
                         N.select(".nv-y.nv-axis").call(e)),
                   q &&
                       (g.getData(c.x()).scale(o).width(H).color(
                            z.map(function(a, b) { return a.color || n(a, b) })
                                .filter(function(a,
                                                 b) { return !z[b].disabled })),
                        M.select(".nv-distWrap")
                            .append("g")
                            .attr("class", "nv-distributionX"),
                        N.select(".nv-distributionX")
                            .attr("transform",
                                  "translate(0," + p.range()[0] + ")")
                            .datum(z.filter(function(a) { return !a.disabled }))
                            .call(g)),
                   r &&
                       (h.getData(c.y()).scale(p).width(I).color(
                            z.map(function(a, b) { return a.color || n(a, b) })
                                .filter(function(a,
                                                 b) { return !z[b].disabled })),
                        M.select(".nv-distWrap")
                            .append("g")
                            .attr("class", "nv-distributionY"),
                        N.select(".nv-distributionY")
                            .attr("transform",
                                  "translate(" + (v ? H : -h.size()) + ",0)")
                            .datum(z.filter(function(a) { return !a.disabled }))
                            .call(h)),
                   f.dispatch.on("stateChange", function(a) {
                     for (var c in a)
                       w[c] = a[c];
                     y.stateChange(w), b.update()
                   }), y.on("changeState", function(a) {
                     "undefined" != typeof a.disabled &&
                         (z.forEach(function(b,
                                             c) { b.disabled = a.disabled[c] }),
                          w.disabled = a.disabled),
                         b.update()
                   }), c.dispatch.on("elementMouseout.tooltip", function(a) {
                     i.hidden(!0),
                         m.select(".nv-chart-" + c.id() + " .nv-series-" +
                                  a.seriesIndex + " .nv-distx-" + a.pointIndex)
                             .attr("y1", 0),
                         m.select(".nv-chart-" + c.id() + " .nv-series-" +
                                  a.seriesIndex + " .nv-disty-" + a.pointIndex)
                             .attr("x2", h.size())
                   }), c.dispatch.on("elementMouseover.tooltip", function(a) {
                     m.select(".nv-series-" + a.seriesIndex + " .nv-distx-" +
                              a.pointIndex)
                         .attr("y1", a.relativePos[1] - I),
                         m.select(".nv-series-" + a.seriesIndex +
                                  " .nv-disty-" + a.pointIndex)
                             .attr("x2", a.relativePos[0] + g.size()),
                         i.data(a).hidden(!1)
                   }), C = o.copy(), D = p.copy()
             }),
             E.renderEnd("scatter with line immediate"), b
    }
    var c = a.models.scatter(), d = a.models.axis(), e = a.models.axis(),
        f = a.models.legend(), g = a.models.distribution(),
        h = a.models.distribution(), i = a.models.tooltip(),
        j = {top : 30, right : 20, bottom : 50, left : 75}, k = null, l = null,
        m = null, n = a.utils.defaultColor(), o = c.xScale(), p = c.yScale(),
        q = !1, r = !1, s = !0, t = !0, u = !0, v = !1, w = a.utils.state(),
        x = null, y = d3.dispatch("stateChange", "changeState", "renderEnd"),
        z = null, A = 250, B = !1;
    c.xScale(o).yScale(p), d.orient("bottom").tickPadding(10),
        e.orient(v ? "right" : "left").tickPadding(10), g.axis("x"),
        h.axis("y"),
        i.headerFormatter(function(a, b) { return d.tickFormat()(a, b) })
            .valueFormatter(function(a, b) { return e.tickFormat()(a, b) });
    var C, D, E = a.utils.renderWatch(y, A), F = function(a) {
      return function() {
        return {
          active: a.map(function(a) { return !a.disabled })
        }
      }
    }, G = function(a) {
      return function(b) {
        void 0 !== b.active &&
            a.forEach(function(a, c) { a.disabled = !b.active[c] })
      }
    };
    return b.dispatch = y, b.scatter = c, b.legend = f, b.xAxis = d,
           b.yAxis = e, b.distX = g, b.distY = h, b.tooltip = i,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return k }, set : function(a) { k = a }},
             height :
                 {get : function() { return l }, set : function(a) { l = a }},
             container :
                 {get : function() { return m }, set : function(a) { m = a }},
             showDistX :
                 {get : function() { return q }, set : function(a) { q = a }},
             showDistY :
                 {get : function() { return r }, set : function(a) { r = a }},
             showLegend :
                 {get : function() { return s }, set : function(a) { s = a }},
             showXAxis :
                 {get : function() { return t }, set : function(a) { t = a }},
             showYAxis :
                 {get : function() { return u }, set : function(a) { u = a }},
             defaultState :
                 {get : function() { return x }, set : function(a) { x = a }},
             noData :
                 {get : function() { return z }, set : function(a) { z = a }},
             duration :
                 {get : function() { return A }, set : function(a) { A = a }},
             showLabels :
                 {get : function() { return B }, set : function(a) { B = a }},
             margin : {
               get : function() { return j },
               set : function(a) {
                 j.top = void 0 !== a.top ? a.top : j.top,
                 j.right = void 0 !== a.right ? a.right : j.right,
                 j.bottom = void 0 !== a.bottom ? a.bottom : j.bottom,
                 j.left = void 0 !== a.left ? a.left : j.left
               }
             },
             rightAlignYAxis : {
               get : function() { return v },
               set : function(a) { v = a, e.orient(a ? "right" : "left") }
             },
             color : {
               get : function() { return n },
               set : function(b) {
                 n = a.utils.getColor(b), f.color(n), g.color(n), h.color(n)
               }
             }
           }),
           a.utils.inheritOptions(b, c), a.utils.initOptions(b), b
  }, a.models.sparkline = function() {
    "use strict";
    function b(k) {
      return t.reset(), k.each(function(b) {
        var k = h - g.left - g.right, s = i - g.top - g.bottom;
        j = d3.select(this), a.utils.initSVG(j),
        l.domain(c || d3.extent(b, n)).range(e || [ 0, k ]),
        m.domain(d || d3.extent(b, o)).range(f || [ s, 0 ]);
        var t = j.selectAll("g.nv-wrap.nv-sparkline").data([ b ]),
            u = t.enter().append("g").attr("class",
                                           "nvd3 nv-wrap nv-sparkline");
        u.append("g"), t.select("g");
        t.attr("transform", "translate(" + g.left + "," + g.top + ")");
        var v = t.selectAll("path").data(function(a) { return [ a ] });
        v.enter().append("path"), v.exit().remove(),
            v.style("stroke", function(a, b) { return a.color || p(a, b) })
                .attr("d", d3.svg.line()
                               .x(function(a, b) { return l(n(a, b)) })
                               .y(function(a, b) { return m(o(a, b)) }));
        var w = t.selectAll("circle.nv-point").data(function(a) {
          function b(b) {
            if (-1 != b) {
              var c = a[b];
              return c.pointIndex = b, c
            }
            return null
          }
          var c = a.map(function(a, b) { return o(a, b) }),
              d = b(c.lastIndexOf(m.domain()[1])),
              e = b(c.indexOf(m.domain()[0])), f = b(c.length - 1);
          return [ q ? e : null, q ? d : null, r ? f : null ].filter(function(
              a) { return null != a })
        });
        w.enter().append("circle"), w.exit().remove(),
            w.attr("cx", function(a, b) { return l(n(a, a.pointIndex)) })
                .attr("cy", function(a, b) { return m(o(a, a.pointIndex)) })
                .attr("r", 2)
                .attr("class", function(a, b) {
                  return n(a, a.pointIndex) == l.domain()[1]
                             ? "nv-point nv-currentValue"
                             : o(a, a.pointIndex) == m.domain()[0]
                                   ? "nv-point nv-minValue"
                                   : "nv-point nv-maxValue"
                })
      }),
             t.renderEnd("sparkline immediate"), b
    }
    var c, d, e, f, g = {top : 2, right : 0, bottom : 2, left : 0}, h = 400,
                    i = 32, j = null, k = !0, l = d3.scale.linear(),
                    m = d3.scale.linear(), n = function(a) { return a.x },
                    o = function(a) { return a.y },
                    p = a.utils.getColor([ "#000" ]), q = !0, r = !0,
                    s = d3.dispatch("renderEnd"), t = a.utils.renderWatch(s);
    return b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return h }, set : function(a) { h = a }},
             height :
                 {get : function() { return i }, set : function(a) { i = a }},
             xDomain :
                 {get : function() { return c }, set : function(a) { c = a }},
             yDomain :
                 {get : function() { return d }, set : function(a) { d = a }},
             xRange :
                 {get : function() { return e }, set : function(a) { e = a }},
             yRange :
                 {get : function() { return f }, set : function(a) { f = a }},
             xScale :
                 {get : function() { return l }, set : function(a) { l = a }},
             yScale :
                 {get : function() { return m }, set : function(a) { m = a }},
             animate :
                 {get : function() { return k }, set : function(a) { k = a }},
             showMinMaxPoints :
                 {get : function() { return q }, set : function(a) { q = a }},
             showCurrentPoint :
                 {get : function() { return r }, set : function(a) { r = a }},
             x : {
               get : function() { return n },
               set : function(a) { n = d3.functor(a) }
             },
             y : {
               get : function() { return o },
               set : function(a) { o = d3.functor(a) }
             },
             margin : {
               get : function() { return g },
               set : function(a) {
                 g.top = void 0 !== a.top ? a.top : g.top,
                 g.right = void 0 !== a.right ? a.right : g.right,
                 g.bottom = void 0 !== a.bottom ? a.bottom : g.bottom,
                 g.left = void 0 !== a.left ? a.left : g.left
               }
             },
             color : {
               get : function() { return p },
               set : function(b) { p = a.utils.getColor(b) }
             }
           }),
           b.dispatch = s, a.utils.initOptions(b), b
  }, a.models.sparklinePlus = function() {
    "use strict";
    function b(p) {
      return r.reset(), r.models(e), p.each(function(p) {
        function q() {
          if (!j) {
            var a = z.selectAll(".nv-hoverValue").data(i),
                b = a.enter()
                        .append("g")
                        .attr("class", "nv-hoverValue")
                        .style("stroke-opacity", 0)
                        .style("fill-opacity", 0);
            a.exit()
                .transition()
                .duration(250)
                .style("stroke-opacity", 0)
                .style("fill-opacity", 0)
                .remove(),
                a.attr(
                     "transform",
                     function(
                         a) { return "translate(" + c(e.x()(p[a], a)) + ",0)" })
                    .transition()
                    .duration(250)
                    .style("stroke-opacity", 1)
                    .style("fill-opacity", 1),
                i.length && (b.append("line")
                                 .attr("x1", 0)
                                 .attr("y1", -f.top)
                                 .attr("x2", 0)
                                 .attr("y2", u),
                             b.append("text")
                                 .attr("class", "nv-xValue")
                                 .attr("x", -6)
                                 .attr("y", -f.top)
                                 .attr("text-anchor", "end")
                                 .attr("dy", ".9em"),
                             z.select(".nv-hoverValue .nv-xValue")
                                 .text(k(e.x()(p[i[0]], i[0]))),
                             b.append("text")
                                 .attr("class", "nv-yValue")
                                 .attr("x", 6)
                                 .attr("y", -f.top)
                                 .attr("text-anchor", "start")
                                 .attr("dy", ".9em"),
                             z.select(".nv-hoverValue .nv-yValue")
                                 .text(l(e.y()(p[i[0]], i[0]))))
          }
        }
        function r() {
          function a(a, b) {
            for (var c = Math.abs(e.x()(a[0], 0) - b), d = 0, f = 0;
                 f < a.length; f++)
              Math.abs(e.x()(a[f], f) - b) < c &&
                  (c = Math.abs(e.x()(a[f], f) - b), d = f);
            return d
          }
          if (!j) {
            var b = d3.mouse(this)[0] - f.left;
            i = [ a(p, Math.round(c.invert(b))) ], q()
          }
        }
        var s = d3.select(this);
        a.utils.initSVG(s);
        var t = a.utils.availableWidth(g, s, f),
            u = a.utils.availableHeight(h, s, f);
        if (b.update = function() { s.call(b) }, b.container = this,
            !p || !p.length)
          return a.utils.noData(b, s), b;
        s.selectAll(".nv-noData").remove();
        var v = e.y()(p[p.length - 1], p.length - 1);
        c = e.xScale(), d = e.yScale();
        var w = s.selectAll("g.nv-wrap.nv-sparklineplus").data([ p ]),
            x = w.enter().append("g").attr("class",
                                           "nvd3 nv-wrap nv-sparklineplus"),
            y = x.append("g"), z = w.select("g");
        y.append("g").attr("class", "nv-sparklineWrap"),
            y.append("g").attr("class", "nv-valueWrap"),
            y.append("g").attr("class", "nv-hoverArea"),
            w.attr("transform", "translate(" + f.left + "," + f.top + ")");
        var A = z.select(".nv-sparklineWrap");
        if (e.width(t).height(u), A.call(e), m) {
          var B = z.select(".nv-valueWrap"),
              C = B.selectAll(".nv-currentValue").data([ v ]);
          C.enter()
              .append("text")
              .attr("class", "nv-currentValue")
              .attr("dx", o ? -8 : 8)
              .attr("dy", ".9em")
              .style("text-anchor", o ? "end" : "start"),
              C.attr("x", t + (o ? f.right : 0))
                  .attr("y", n ? function(a) { return d(a) } : 0)
                  .style("fill", e.color()(p[p.length - 1], p.length - 1))
                  .text(l(v))
        }
        y.select(".nv-hoverArea")
            .append("rect")
            .on("mousemove", r)
            .on("click", function() { j = !j })
            .on("mouseout", function() { i = [], q() }),
            z.select(".nv-hoverArea rect")
                .attr("transform",
                      function(a) {
                        return "translate(" + -f.left + "," + -f.top + ")"
                      })
                .attr("width", t + f.left + f.right)
                .attr("height", u + f.top)
      }),
             r.renderEnd("sparklinePlus immediate"), b
    }
    var c, d, e = a.models.sparkline(),
              f = {top : 15, right : 100, bottom : 10, left : 50}, g = null,
              h = null, i = [], j = !1, k = d3.format(",r"),
              l = d3.format(",.2f"), m = !0, n = !0, o = !1, p = null,
              q = d3.dispatch("renderEnd"), r = a.utils.renderWatch(q);
    return b.dispatch = q, b.sparkline = e,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return g }, set : function(a) { g = a }},
             height :
                 {get : function() { return h }, set : function(a) { h = a }},
             xTickFormat :
                 {get : function() { return k }, set : function(a) { k = a }},
             yTickFormat :
                 {get : function() { return l }, set : function(a) { l = a }},
             showLastValue :
                 {get : function() { return m }, set : function(a) { m = a }},
             alignValue :
                 {get : function() { return n }, set : function(a) { n = a }},
             rightAlignValue :
                 {get : function() { return o }, set : function(a) { o = a }},
             noData :
                 {get : function() { return p }, set : function(a) { p = a }},
             margin : {
               get : function() { return f },
               set : function(a) {
                 f.top = void 0 !== a.top ? a.top : f.top,
                 f.right = void 0 !== a.right ? a.right : f.right,
                 f.bottom = void 0 !== a.bottom ? a.bottom : f.bottom,
                 f.left = void 0 !== a.left ? a.left : f.left
               }
             }
           }),
           a.utils.inheritOptions(b, e), a.utils.initOptions(b), b
  }, a.models.stackedArea = function() {
    "use strict";
    function b(n) {
      return v.reset(), v.models(s), n.each(function(n) {
        var t = f - e.left - e.right, w = g - e.top - e.bottom;
        j = d3.select(this), a.utils.initSVG(j), c = s.xScale(), d = s.yScale();
        var x = n;
        n.forEach(function(a, b) {
          a.seriesIndex = b,
          a.values = a.values.map(function(
              a, c) { return a.index = c, a.seriesIndex = b, a })
        });
        var y = n.filter(function(a) { return !a.disabled });
        n = d3.layout.stack()
                .order(p)
                .offset(o)
                .values(function(a) { return a.values })
                .x(k)
                .y(l)
                .out(function(a, b, c) { a.display = {
                                           y : c,
                                           y0 : b
                                         } })(y);
        var z = j.selectAll("g.nv-wrap.nv-stackedarea").data([ n ]),
            A = z.enter().append("g").attr("class",
                                           "nvd3 nv-wrap nv-stackedarea"),
            B = A.append("defs"), C = A.append("g"), D = z.select("g");
        C.append("g").attr("class", "nv-areaWrap"),
            C.append("g").attr("class", "nv-scatterWrap"),
            z.attr("transform", "translate(" + e.left + "," + e.top + ")"),
            0 == s.forceY().length && s.forceY().push(0),
            s.width(t)
                .height(w)
                .x(k)
                .y(function(a) {
                  return void 0 !== a.display ? a.display.y + a.display.y0
                                              : void 0
                })
                .color(n.map(function(a, b) {
                  return a.color = a.color || h(a, a.seriesIndex), a.color
                }));
        var E = D.select(".nv-scatterWrap").datum(n);
        E.call(s),
            B.append("clipPath").attr("id", "nv-edge-clip-" + i).append("rect"),
            z.select("#nv-edge-clip-" + i + " rect")
                .attr("width", t)
                .attr("height", w),
            D.attr("clip-path", r ? "url(#nv-edge-clip-" + i + ")" : "");
        var F = d3.svg.area()
                    .defined(m)
                    .x(function(a, b) { return c(k(a, b)) })
                    .y0(function(a) { return d(a.display.y0) })
                    .y1(function(a) { return d(a.display.y + a.display.y0) })
                    .interpolate(q),
            G = d3.svg.area()
                    .defined(m)
                    .x(function(a, b) { return c(k(a, b)) })
                    .y0(function(a) { return d(a.display.y0) })
                    .y1(function(a) { return d(a.display.y0) }),
            H = D.select(".nv-areaWrap")
                    .selectAll("path.nv-area")
                    .data(function(a) { return a });
        H.enter()
            .append("path")
            .attr("class", function(a, b) { return "nv-area nv-area-" + b })
            .attr("d", function(a, b) { return G(a.values, a.seriesIndex) })
            .on("mouseover",
                function(a, b) {
                  d3.select(this).classed("hover", !0), u.areaMouseover({
                    point : a,
                    series : a.key,
                    pos : [ d3.event.pageX, d3.event.pageY ],
                    seriesIndex : a.seriesIndex
                  })
                })
            .on("mouseout",
                function(a, b) {
                  d3.select(this).classed("hover", !1), u.areaMouseout({
                    point : a,
                    series : a.key,
                    pos : [ d3.event.pageX, d3.event.pageY ],
                    seriesIndex : a.seriesIndex
                  })
                })
            .on("click",
                function(a, b) {
                  d3.select(this).classed("hover", !1), u.areaClick({
                    point : a,
                    series : a.key,
                    pos : [ d3.event.pageX, d3.event.pageY ],
                    seriesIndex : a.seriesIndex
                  })
                }),
            H.exit().remove(),
            H.style("fill",
                    function(a, b) { return a.color || h(a, a.seriesIndex) })
                .style(
                    "stroke",
                    function(a, b) { return a.color || h(a, a.seriesIndex) }),
            H.watchTransition(v, "stackedArea path")
                .attr("d", function(a, b) { return F(a.values, b) }),
            s.dispatch.on("elementMouseover.area", function(a) {
              D.select(".nv-chart-" + i + " .nv-area-" + a.seriesIndex)
                  .classed("hover", !0)
            }), s.dispatch.on("elementMouseout.area", function(a) {
              D.select(".nv-chart-" + i + " .nv-area-" + a.seriesIndex)
                  .classed("hover", !1)
            }), b.d3_stackedOffset_stackPercent = function(a) {
              var b, c, d, e = a.length, f = a[0].length, g = [];
              for (c = 0; f > c; ++c) {
                for (b = 0, d = 0; b < x.length; b++)
                  d += l(x[b].values[c]);
                if (d)
                  for (b = 0; e > b; b++)
                    a[b][c][1] /= d;
                else
                  for (b = 0; e > b; b++)
                    a[b][c][1] = 0
              }
              for (c = 0; f > c; ++c)
                g[c] = 0;
              return g
            }
      }),
             v.renderEnd("stackedArea immediate"), b
    }
    var c, d, e = {top : 0, right : 0, bottom : 0, left : 0}, f = 960, g = 500,
              h = a.utils.defaultColor(), i = Math.floor(1e5 * Math.random()),
              j = null, k = function(a) { return a.x },
              l = function(a) { return a.y },
              m = function(a, b) { return !isNaN(l(a, b)) && null !== l(a, b) },
              n = "stack", o = "zero", p = "default", q = "linear", r = !1,
              s = a.models.scatter(), t = 250,
              u = d3.dispatch("areaClick", "areaMouseover", "areaMouseout",
                              "renderEnd", "elementClick", "elementMouseover",
                              "elementMouseout");
    s.pointSize(2.2).pointDomain([ 2.2, 2.2 ]);
    var v = a.utils.renderWatch(u, t);
    return b.dispatch = u, b.scatter = s,
           s.dispatch.on("elementClick",
                         function() { u.elementClick.apply(this, arguments) }),
           s.dispatch.on(
               "elementMouseover",
               function() { u.elementMouseover.apply(this, arguments) }),
           s.dispatch.on(
               "elementMouseout",
               function() { u.elementMouseout.apply(this, arguments) }),
           b.interpolate = function(
               a) { return arguments.length ? (q = a, b) : q },
           b.duration =
               function(a) {
             return arguments.length ? (t = a, v.reset(t), s.duration(t), b) : t
           },
           b.dispatch = u, b.scatter = s,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return f }, set : function(a) { f = a }},
             height :
                 {get : function() { return g }, set : function(a) { g = a }},
             defined :
                 {get : function() { return m }, set : function(a) { m = a }},
             clipEdge :
                 {get : function() { return r }, set : function(a) { r = a }},
             offset :
                 {get : function() { return o }, set : function(a) { o = a }},
             order :
                 {get : function() { return p }, set : function(a) { p = a }},
             interpolate :
                 {get : function() { return q }, set : function(a) { q = a }},
             x : {
               get : function() { return k },
               set : function(a) { k = d3.functor(a) }
             },
             y : {
               get : function() { return l },
               set : function(a) { l = d3.functor(a) }
             },
             margin : {
               get : function() { return e },
               set : function(a) {
                 e.top = void 0 !== a.top ? a.top : e.top,
                 e.right = void 0 !== a.right ? a.right : e.right,
                 e.bottom = void 0 !== a.bottom ? a.bottom : e.bottom,
                 e.left = void 0 !== a.left ? a.left : e.left
               }
             },
             color : {
               get : function() { return h },
               set : function(b) { h = a.utils.getColor(b) }
             },
             style : {
               get : function() { return n },
               set : function(a) {
                 switch (n = a) {
                 case "stack":
                   b.offset("zero"), b.order("default");
                   break;
                 case "stream":
                   b.offset("wiggle"), b.order("inside-out");
                   break;
                 case "stream-center":
                   b.offset("silhouette"), b.order("inside-out");
                   break;
                 case "expand":
                   b.offset("expand"), b.order("default");
                   break;
                 case "stack_percent":
                   b.offset(b.d3_stackedOffset_stackPercent), b.order("default")
                 }
               }
             },
             duration : {
               get : function() { return t },
               set : function(a) { t = a, v.reset(t), s.duration(t) }
             }
           }),
           a.utils.inheritOptions(b, s), a.utils.initOptions(b), b
  }, a.models.stackedAreaChart = function() {
    "use strict";
    function b(k) {
      return J.reset(), J.models(e), s && J.models(f), t && J.models(g),
             k.each(function(k) {
               function B() {
                 s && V.select(".nv-focus .nv-x.nv-axis")
                          .attr("transform", "translate(0," + R + ")")
                          .transition()
                          .duration(G)
                          .call(f)
               }
               function J() {
                 if (t) {
                   if ("expand" === e.style() ||
                       "stack_percent" === e.style()) {
                     var a = g.tickFormat();
                     H && a === N || (H = a), g.tickFormat(N)
                   } else
                     H && (g.tickFormat(H), H = null);
                   V.select(".nv-focus .nv-y.nv-axis")
                       .transition()
                       .duration(0)
                       .call(g)
                 }
               }
               function O(a) {
                 var b = V.select(".nv-focus .nv-stackedWrap")
                             .datum(k.filter(function(a) {
                                       return !a.disabled
                                     }).map(function(b, c) {
                               return {
                                 key: b.key, area: b.area, classed: b.classed,
                                     values: b.values.filter(function(b, c) {
                                       return e.x()(b, c) >= a[0] &&
                                              e.x()(b, c) <= a[1]
                                     }),
                                     disableTooltip: b.disableTooltip
                               }
                             }));
                 b.transition().duration(G).call(e), B(), J()
               }
               var P = d3.select(this);
               a.utils.initSVG(P);
               var Q = a.utils.availableWidth(n, P, m),
                   R = a.utils.availableHeight(o, P, m) - (v ? l.height() : 0);
               if (b.update = function() { P.transition().duration(G).call(b) },
                   b.container = this,
                   z.setter(M(k), b.update).getter(L(k)).update(),
                   z.disabled = k.map(function(a) { return !!a.disabled }),
                   !A) {
                 var S;
                 A = {};
                 for (S in z)
                   z[S] instanceof Array ? A[S] = z[S].slice(0) : A[S] = z[S]
               }
               if (!(k && k.length &&
                     k.filter(function(a) { return a.values.length }).length))
                 return a.utils.noData(b, P), b;
               P.selectAll(".nv-noData").remove(), c = e.xScale(),
                                                   d = e.yScale();
               var T = P.selectAll("g.nv-wrap.nv-stackedAreaChart").data([ k ]),
                   U = T.enter()
                           .append("g")
                           .attr("class", "nvd3 nv-wrap nv-stackedAreaChart")
                           .append("g"),
                   V = T.select("g");
               U.append("g").attr("class", "nv-legendWrap"),
                   U.append("g").attr("class", "nv-controlsWrap");
               var W = U.append("g").attr("class", "nv-focus");
               W.append("g").attr("class", "nv-background").append("rect"),
                   W.append("g").attr("class", "nv-x nv-axis"),
                   W.append("g").attr("class", "nv-y nv-axis"),
                   W.append("g").attr("class", "nv-stackedWrap"),
                   W.append("g").attr("class", "nv-interactive");
               U.append("g").attr("class", "nv-focusWrap");
               if (r) {
                 var X = q ? Q - D : Q;
                 h.width(X), V.select(".nv-legendWrap").datum(k).call(h),
                     h.height() > m.top &&
                         (m.top = h.height(),
                          R = a.utils.availableHeight(o, P, m) -
                              (v ? l.height() : 0)),
                     V.select(".nv-legendWrap")
                         .attr("transform",
                               "translate(" + (Q - X) + "," + -m.top + ")")
               } else
                 V.select(".nv-legendWrap").selectAll("*").remove();
               if (q) {
                 var Y = [
                   {
                     key : F.stacked || "Stacked",
                     metaKey : "Stacked",
                     disabled : "stack" != e.style(),
                     style : "stack"
                   },
                   {
                     key : F.stream || "Stream",
                     metaKey : "Stream",
                     disabled : "stream" != e.style(),
                     style : "stream"
                   },
                   {
                     key : F.expanded || "Expanded",
                     metaKey : "Expanded",
                     disabled : "expand" != e.style(),
                     style : "expand"
                   },
                   {
                     key : F.stack_percent || "Stack %",
                     metaKey : "Stack_Percent",
                     disabled : "stack_percent" != e.style(),
                     style : "stack_percent"
                   }
                 ];
                 D = E.length / 3 * 260,
                 Y = Y.filter(function(
                     a) { return -1 !== E.indexOf(a.metaKey) }),
                 i.width(D).color([ "#444", "#444", "#444" ]),
                 V.select(".nv-controlsWrap").datum(Y).call(i),
                 Math.max(i.height(), h.height()) > m.top &&
                     (m.top = Math.max(i.height(), h.height()),
                      R = a.utils.availableHeight(o, P, m)),
                 V.select(".nv-controlsWrap")
                     .attr("transform", "translate(0," + -m.top + ")")
               } else
                 V.select(".nv-controlsWrap").selectAll("*").remove();
               T.attr("transform", "translate(" + m.left + "," + m.top + ")"),
                   u && V.select(".nv-y.nv-axis")
                            .attr("transform", "translate(" + Q + ",0)"),
                   w && (j.width(Q)
                             .height(R)
                             .margin({left : m.left, top : m.top})
                             .svgContainer(P)
                             .xScale(c),
                         T.select(".nv-interactive").call(j)),
                   V.select(".nv-focus .nv-background rect")
                       .attr("width", Q)
                       .attr("height", R),
                   e.width(Q).height(R).color(
                       k.map(function(a, b) { return a.color || p(a, b) })
                           .filter(function(a, b) { return !k[b].disabled }));
               var Z = V.select(".nv-focus .nv-stackedWrap")
                           .datum(k.filter(function(a) { return !a.disabled }));
               if (s && f.scale(c)
                            ._ticks(a.utils.calcTicksX(Q / 100, k))
                            .tickSize(-R, 0),
                   t) {
                 var $;
                 $ = "wiggle" === e.offset() ? 0
                                             : a.utils.calcTicksY(R / 36, k),
                 g.scale(d)._ticks($).tickSize(-Q, 0)
               }
               if (v) {
                 l.width(Q),
                     V.select(".nv-focusWrap")
                         .attr("transform",
                               "translate(0," +
                                   (R + m.bottom + l.margin().top) + ")")
                         .datum(k.filter(function(a) { return !a.disabled }))
                         .call(l);
                 var _ = l.brush.empty() ? l.xDomain() : l.brush.extent();
                 null !== _ && O(_)
               } else
                 Z.transition().call(e), B(), J();
               e.dispatch.on("areaClick.toggle", function(a) {
                 1 === k.filter(function(a) { return !a.disabled }).length
                     ? k.forEach(function(a) { a.disabled = !1 })
                     : k.forEach(function(
                           b, c) { b.disabled = c != a.seriesIndex }),
                     z.disabled = k.map(function(a) { return !!a.disabled }),
                     C.stateChange(z), b.update()
               }), h.dispatch.on("stateChange", function(a) {
                 for (var c in a)
                   z[c] = a[c];
                 C.stateChange(z), b.update()
               }), i.dispatch.on("legendClick", function(a, c) {
                 a.disabled &&
                     (Y = Y.map(function(a) { return a.disabled = !0, a }),
                      a.disabled = !1, e.style(a.style), z.style = e.style(),
                      C.stateChange(z), b.update())
               }), j.dispatch.on("elementMousemove", function(c) {
                 e.clearHighlights();
                 var d, f, g, h = [], i = 0, l = !0;
                 if (k.filter(function(a, b) {
                        return a.seriesIndex = b, !a.disabled
                      }).forEach(function(j, k) {
                       f = a.interactiveBisect(j.values, c.pointXValue, b.x());
                       var m = j.values[f], n = b.y()(m, f);
                       if (null != n && e.highlightPoint(k, f, !0),
                           "undefined" != typeof m) {
                         "undefined" == typeof d && (d = m),
                             "undefined" == typeof g &&
                                 (g = b.xScale()(b.x()(m, f)));
                         var o =
                             "expand" == e.style() ? m.display.y : b.y()(m, f);
                         h.push({
                           key : j.key,
                           value : o,
                           color : p(j, j.seriesIndex),
                           point : m
                         }),
                             x && "expand" != e.style() && null != o &&
                                 (i += o, l = !1)
                       }
                     }),
                     h.reverse(), h.length > 2) {
                   var m = b.yScale().invert(c.mouseY), n = null;
                   h.forEach(function(a, b) {
                     m = Math.abs(m);
                     var c = Math.abs(a.point.display.y0),
                         d = Math.abs(a.point.display.y);
                     return m >= c && d + c >= m ? void (n = b) : void 0
                   }),
                       null != n && (h[n].highlight = !0)
                 }
                 x && "expand" != e.style() && h.length >= 2 && !l &&
                     h.push({key : y, value : i, total : !0});
                 var o = b.x()(d, f), q = j.tooltip.valueFormatter();
                 "expand" === e.style() || "stack_percent" === e.style()
                     ? (I || (I = q), q = d3.format(".1%"))
                     : I && (q = I, I = null),
                     j.tooltip.valueFormatter(q).data(
                         {value : o, series : h})(),
                     j.renderGuideLine(g)
               }), j.dispatch.on("elementMouseout", function(a) {
                 e.clearHighlights()
               }), l.dispatch.on("onBrush", function(a) {
                 O(a)
               }), C.on("changeState", function(a) {
                 "undefined" != typeof a.disabled &&
                     k.length === a.disabled.length &&
                     (k.forEach(function(b, c) { b.disabled = a.disabled[c] }),
                      z.disabled = a.disabled),
                     "undefined" != typeof a.style &&
                         (e.style(a.style), K = a.style),
                     b.update()
               })
             }),
             J.renderEnd("stacked Area chart immediate"), b
    }
    var c, d, e = a.models.stackedArea(), f = a.models.axis(),
              g = a.models.axis(), h = a.models.legend(), i = a.models.legend(),
              j = a.interactiveGuideline(), k = a.models.tooltip(),
              l = a.models.focus(a.models.stackedArea()),
              m = {top : 30, right : 25, bottom : 50, left : 60}, n = null,
              o = null, p = a.utils.defaultColor(), q = !0, r = !0, s = !0,
              t = !0, u = !1, v = !1, w = !1, x = !0, y = "TOTAL",
              z = a.utils.state(), A = null, B = null,
              C = d3.dispatch("stateChange", "changeState", "renderEnd"),
              D = 250, E = [ "Stacked", "Stream", "Expanded" ], F = {}, G = 250;
    z.style = e.style(), f.orient("bottom").tickPadding(7),
    g.orient(u ? "right" : "left"),
    k.headerFormatter(function(a, b) { return f.tickFormat()(a, b) })
        .valueFormatter(function(a, b) { return g.tickFormat()(a, b) }),
    j.tooltip.headerFormatter(function(a, b) { return f.tickFormat()(a, b) })
        .valueFormatter(function(
            a, b) { return null == a ? "N/A" : g.tickFormat()(a, b) });
    var H = null, I = null;
    i.updateState(!1);
    var J = a.utils.renderWatch(C), K = e.style(), L = function(a) {
      return function() {
        return {
          active: a.map(function(a) { return !a.disabled }), style: e.style()
        }
      }
    }, M = function(a) {
      return function(b) {
        void 0 !== b.style && (K = b.style),
            void 0 !== b.active &&
                a.forEach(function(a, c) { a.disabled = !b.active[c] })
      }
    }, N = d3.format("%");
    return e.dispatch.on("elementMouseover.tooltip",
                         function(a) {
                           a.point.x = e.x()(a.point),
                           a.point.y = e.y()(a.point), k.data(a).hidden(!1)
                         }),
           e.dispatch.on("elementMouseout.tooltip",
                         function(a) { k.hidden(!0) }),
           b.dispatch = C, b.stacked = e, b.legend = h, b.controls = i,
           b.xAxis = f, b.x2Axis = l.xAxis, b.yAxis = g, b.y2Axis = l.yAxis,
           b.interactiveLayer = j, b.tooltip = k, b.focus = l, b.dispatch = C,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             width :
                 {get : function() { return n }, set : function(a) { n = a }},
             height :
                 {get : function() { return o }, set : function(a) { o = a }},
             showLegend :
                 {get : function() { return r }, set : function(a) { r = a }},
             showXAxis :
                 {get : function() { return s }, set : function(a) { s = a }},
             showYAxis :
                 {get : function() { return t }, set : function(a) { t = a }},
             defaultState :
                 {get : function() { return A }, set : function(a) { A = a }},
             noData :
                 {get : function() { return B }, set : function(a) { B = a }},
             showControls :
                 {get : function() { return q }, set : function(a) { q = a }},
             controlLabels :
                 {get : function() { return F }, set : function(a) { F = a }},
             controlOptions :
                 {get : function() { return E }, set : function(a) { E = a }},
             showTotalInTooltip :
                 {get : function() { return x }, set : function(a) { x = a }},
             totalLabel :
                 {get : function() { return y }, set : function(a) { y = a }},
             focusEnable :
                 {get : function() { return v }, set : function(a) { v = a }},
             focusHeight : {
               get : function() { return l.height() },
               set : function(a) { l.height(a) }
             },
             brushExtent : {
               get : function() { return l.brushExtent() },
               set : function(a) { l.brushExtent(a) }
             },
             margin : {
               get : function() { return m },
               set : function(a) {
                 m.top = void 0 !== a.top ? a.top : m.top,
                 m.right = void 0 !== a.right ? a.right : m.right,
                 m.bottom = void 0 !== a.bottom ? a.bottom : m.bottom,
                 m.left = void 0 !== a.left ? a.left : m.left
               }
             },
             focusMargin : {
               get : function() { return l.margin },
               set : function(a) {
                 l.margin.top = void 0 !== a.top ? a.top : l.margin.top,
                 l.margin.right = void 0 !== a.right ? a.right : l.margin.right,
                 l.margin.bottom =
                     void 0 !== a.bottom ? a.bottom : l.margin.bottom,
                 l.margin.left = void 0 !== a.left ? a.left : l.margin.left
               }
             },
             duration : {
               get : function() { return G },
               set : function(a) {
                 G = a, J.reset(G), e.duration(G), f.duration(G), g.duration(G)
               }
             },
             color : {
               get : function() { return p },
               set : function(b) {
                 p = a.utils.getColor(b), h.color(p), e.color(p), l.color(p)
               }
             },
             x : {
               get : function() { return e.x() },
               set : function(a) { e.x(a), l.x(a) }
             },
             y : {
               get : function() { return e.y() },
               set : function(a) { e.y(a), l.y(a) }
             },
             rightAlignYAxis : {
               get : function() { return u },
               set : function(a) { u = a, g.orient(u ? "right" : "left") }
             },
             useInteractiveGuideline : {
               get : function() { return w },
               set : function(a) {
                 w = !!a, b.interactive(!a), b.useVoronoi(!a),
                 e.scatter.interactive(!a)
               }
             }
           }),
           a.utils.inheritOptions(b, e), a.utils.initOptions(b), b
  }, a.models.stackedAreaWithFocusChart = function() {
    return a.models.stackedAreaChart().margin({bottom : 30}).focusEnable(!0)
  }, a.models.sunburst = function() {
    "use strict";
    function b(a) {
      var b = c(a);
      return b > 90 ? 180 : 0
    }
    function c(a) {
      var b = Math.max(0, Math.min(2 * Math.PI, F(a.x))),
          c = Math.max(0, Math.min(2 * Math.PI, F(a.x + a.dx))),
          d = (b + c) / 2 * (180 / Math.PI) - 90;
      return d
    }
    function d(a) {
      var b = Math.max(0, Math.min(2 * Math.PI, F(a.x))),
          c = Math.max(0, Math.min(2 * Math.PI, F(a.x + a.dx)));
      return (c - b) / (2 * Math.PI)
    }
    function e(a) {
      var b = Math.max(0, Math.min(2 * Math.PI, F(a.x))),
          c = Math.max(0, Math.min(2 * Math.PI, F(a.x + a.dx))), d = c - b;
      return d > z
    }
    function f(a, b) {
      var c = d3.interpolate(F.domain(), [ l.x, l.x + l.dx ]),
          d = d3.interpolate(G.domain(), [ l.y, 1 ]),
          e = d3.interpolate(G.range(), [ l.y ? 20 : 0, o ]);
      return 0 === b ? function() { return J(a) } : function(b) {
        return F.domain(c(b)), G.domain(d(b)).range(e(b)), J(a)
      }
    }
    function g(a) {
      var b = d3.interpolate({x : a.x0, dx : a.dx0, y : a.y0, dy : a.dy0}, a);
      return function(c) {
        var d = b(c);
        return a.x0 = d.x, a.dx0 = d.dx, a.y0 = d.y, a.dy0 = d.dy, J(d)
      }
    }
    function h(a) {
      var b = B(a);
      I[b] || (I[b] = {});
      var c = I[b];
      c.dx = a.dx, c.x = a.x, c.dy = a.dy, c.y = a.y
    }
    function i(a) {
      a.forEach(function(a) {
        var b = B(a), c = I[b];
        c ? (a.dx0 = c.dx, a.x0 = c.x, a.dy0 = c.dy, a.y0 = c.y)
          : (a.dx0 = a.dx, a.x0 = a.x, a.dy0 = a.dy, a.y0 = a.y),
            h(a)
      })
    }
    function j(a) {
      var d = v.selectAll("text"), g = v.selectAll("path");
      d.transition().attr("opacity", 0),
          l = a,
          g.transition().duration(D).attrTween("d", f).each("end", function(d) {
            if (d.x >= a.x && d.x < a.x + a.dx && d.depth >= a.depth) {
              var f = d3.select(this.parentNode), g = f.select("text");
              g.transition()
                  .duration(D)
                  .text(function(a) { return y(a) })
                  .attr("opacity", function(a) { return e(a) ? 1 : 0 })
                  .attr("transform", function() {
                    var e = this.getBBox().width;
                    if (0 === d.depth)
                      return "translate(" + e / 2 * -1 + ",0)";
                    if (d.depth === a.depth)
                      return "translate(" + (G(d.y) + 5) + ",0)";
                    var f = c(d), g = b(d);
                    return 0 === g
                               ? "rotate(" + f + ")translate(" + (G(d.y) + 5) +
                                     ",0)"
                               : "rotate(" + f + ")translate(" +
                                     (G(d.y) + e + 5) + ",0)rotate(" + g + ")"
                  })
            }
          })
    }
    function k(f) {
      return K.reset(), f.each(function(f) {
        v = d3.select(this), m = a.utils.availableWidth(q, v, p),
        n = a.utils.availableHeight(r, v, p), o = Math.min(m, n) / 2,
        G.range([ 0, o ]);
        var h = v.select("g.nvd3.nv-wrap.nv-sunburst");
        h[0][0]
            ? h.attr("transform", "translate(" + (m / 2 + p.left + p.right) +
                                      "," + (n / 2 + p.top + p.bottom) + ")")
            : h = v.append("g")
                      .attr("class", "nvd3 nv-wrap nv-sunburst nv-chart-" + u)
                      .attr("transform", "translate(" +
                                             (m / 2 + p.left + p.right) + "," +
                                             (n / 2 + p.top + p.bottom) + ")"),
              v.on("click", function(a, b) {
                E.chartClick({data : a, index : b, pos : d3.event, id : u})
              }), H.value(t[s] || t.count);
        var k = H.nodes(f[0]).reverse();
        i(k);
        var l = h.selectAll(".arc-container").data(k, B),
            z = l.enter().append("g").attr("class", "arc-container");
        z.append("path")
            .attr("d", J)
            .style("fill",
                   function(a) {
                     return a.color ? a.color
                                    : w(C ? (a.children ? a : a.parent).name
                                          : a.name)
                   })
            .style("stroke", "#FFF")
            .on("click", j)
            .on("mouseover",
                function(a, b) {
                  d3.select(this).classed("hover", !0).style("opacity", .8),
                      E.elementMouseover({
                        data : a,
                        color : d3.select(this).style("fill"),
                        percent : d(a)
                      })
                })
            .on("mouseout",
                function(a, b) {
                  d3.select(this).classed("hover", !1).style("opacity", 1),
                      E.elementMouseout({data : a})
                })
            .on("mousemove", function(a, b) { E.elementMousemove({data : a}) }),
            l.each(function(a) {
              d3.select(this).select("path").transition().duration(D).attrTween(
                  "d", g)
            }),
            x && (l.selectAll("text").remove(),
                  l.append("text")
                      .text(function(a) { return y(a) })
                      .transition()
                      .duration(D)
                      .attr("opacity", function(a) { return e(a) ? 1 : 0 })
                      .attr("transform",
                            function(a) {
                              var d = this.getBBox().width;
                              if (0 === a.depth)
                                return "rotate(0)translate(" + d / 2 * -1 +
                                       ",0)";
                              var e = c(a), f = b(a);
                              return 0 === f ? "rotate(" + e + ")translate(" +
                                                   (G(a.y) + 5) + ",0)"
                                             : "rotate(" + e + ")translate(" +
                                                   (G(a.y) + d + 5) +
                                                   ",0)rotate(" + f + ")"
                            })),
            j(k[k.length - 1]),
            l.exit()
                .transition()
                .duration(D)
                .attr("opacity", 0)
                .each("end",
                      function(a) {
                        var b = B(a);
                        I[b] = void 0
                      })
                .remove()
      }),
             K.renderEnd("sunburst immediate"), k
    }
    var l, m, n, o,
        p = {top : 0, right : 0, bottom : 0, left : 0}, q = 600, r = 600,
        s = "count", t = {
          count : function(a) { return 1 },
          value : function(a) { return a.value || a.size },
          size : function(a) { return a.value || a.size }
        },
        u = Math.floor(1e4 * Math.random()), v = null,
        w = a.utils.defaultColor(), x = !1,
        y =
            function(a) {
          return "count" === s ? a.name + " #" + a.value
                               : a.name + " " + (a.value || a.size)
        },
        z = .02, A = function(a, b) { return a.name > b.name },
        B = function(a, b) { return a.name }, C = !0, D = 500,
        E = d3.dispatch("chartClick", "elementClick", "elementDblClick",
                        "elementMousemove", "elementMouseover",
                        "elementMouseout", "renderEnd"),
        F = d3.scale.linear().range([ 0, 2 * Math.PI ]), G = d3.scale.sqrt(),
        H = d3.layout.partition().sort(A), I = {},
        J = d3.svg.arc()
                .startAngle(function(
                    a) { return Math.max(0, Math.min(2 * Math.PI, F(a.x))) })
                .endAngle(function(a) {
                  return Math.max(0, Math.min(2 * Math.PI, F(a.x + a.dx)))
                })
                .innerRadius(function(a) { return Math.max(0, G(a.y)) })
                .outerRadius(function(a) { return Math.max(0, G(a.y + a.dy)) }),
        K = a.utils.renderWatch(E);
    return k.dispatch = E, k.options = a.utils.optionsFunc.bind(k),
           k._options = Object.create({}, {
             width :
                 {get : function() { return q }, set : function(a) { q = a }},
             height :
                 {get : function() { return r }, set : function(a) { r = a }},
             mode :
                 {get : function() { return s }, set : function(a) { s = a }},
             id : {get : function() { return u }, set : function(a) { u = a }},
             duration :
                 {get : function() { return D }, set : function(a) { D = a }},
             groupColorByParent :
                 {get : function() { return C }, set : function(a) { C = !!a }},
             showLabels :
                 {get : function() { return x }, set : function(a) { x = !!a }},
             labelFormat :
                 {get : function() { return y }, set : function(a) { y = a }},
             labelThreshold :
                 {get : function() { return z }, set : function(a) { z = a }},
             sort :
                 {get : function() { return A }, set : function(a) { A = a }},
             key : {get : function() { return B }, set : function(a) { B = a }},
             margin : {
               get : function() { return p },
               set : function(a) {
                 p.top = void 0 != a.top ? a.top : p.top,
                 p.right = void 0 != a.right ? a.right : p.right,
                 p.bottom = void 0 != a.bottom ? a.bottom : p.bottom,
                 p.left = void 0 != a.left ? a.left : p.left
               }
             },
             color : {
               get : function() { return w },
               set : function(b) { w = a.utils.getColor(b) }
             }
           }),
           a.utils.initOptions(k), k
  }, a.models.sunburstChart = function() {
    "use strict";
    function b(d) {
      return n.reset(), n.models(c), d.each(function(d) {
        var h = d3.select(this);
        a.utils.initSVG(h);
        var i = a.utils.availableWidth(f, h, e),
            j = a.utils.availableHeight(g, h, e);
        return b.update =
                   function() {
          0 === l ? h.call(b) : h.transition().duration(l).call(b)
        },
               b.container = h,
               d && d.length ? (h.selectAll(".nv-noData").remove(),
                                c.width(i).height(j).margin(e), void h.call(c))
                             : (a.utils.noData(b, h), b)
      }),
             n.renderEnd("sunburstChart immediate"), b
    }
    var c = a.models.sunburst(), d = a.models.tooltip(),
        e = {top : 30, right : 20, bottom : 20, left : 20}, f = null, g = null,
        h = a.utils.defaultColor(), i = !1,
        j = (Math.round(1e5 * Math.random()), null), k = null, l = 250,
        m = d3.dispatch("stateChange", "changeState", "renderEnd"),
        n = a.utils.renderWatch(m);
    return d.duration(0).headerEnabled(!1).valueFormatter(function(
               a) { return a }),
           c.dispatch.on("elementMouseover.tooltip",
                         function(a) {
                           a.series = {
                             key : a.data.name,
                             value : a.data.value || a.data.size,
                             color : a.color,
                             percent : a.percent
                           },
                           i || (delete a.percent, delete a.series.percent),
                           d.data(a).hidden(!1)
                         }),
           c.dispatch.on("elementMouseout.tooltip",
                         function(a) { d.hidden(!0) }),
           c.dispatch.on("elementMousemove.tooltip", function(a) { d() }),
           b.dispatch = m, b.sunburst = c, b.tooltip = d,
           b.options = a.utils.optionsFunc.bind(b),
           b._options = Object.create({}, {
             noData :
                 {get : function() { return k }, set : function(a) { k = a }},
             defaultState :
                 {get : function() { return j }, set : function(a) { j = a }},
             showTooltipPercent :
                 {get : function() { return i }, set : function(a) { i = a }},
             color : {
               get : function() { return h },
               set : function(a) { h = a, c.color(h) }
             },
             duration : {
               get : function() { return l },
               set : function(a) { l = a, n.reset(l), c.duration(l) }
             },
             margin : {
               get : function() { return e },
               set : function(a) {
                 e.top = void 0 !== a.top ? a.top : e.top,
                 e.right = void 0 !== a.right ? a.right : e.right,
                 e.bottom = void 0 !== a.bottom ? a.bottom : e.bottom,
                 e.left = void 0 !== a.left ? a.left : e.left, c.margin(e)
               }
             }
           }),
           a.utils.inheritOptions(b, c), a.utils.initOptions(b), b
  }, a.version = "1.8.4-dev"
}();