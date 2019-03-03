(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (global.$trainTaiwanLib = global.$trainTaiwanLib || {}, global.$trainTaiwanLib.ptx = factory()));
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var CM = {
    inBrowser: !!(typeof window != 'undefined' && window.document)
  };
  CM.statusCode = {
    SUCCESS: 'success',
    FAIL: 'fail'
  };
  CM.CONST_PTX_API_SUCCESS = CM.statusCode.SUCCESS;
  CM.CONST_PTX_API_FAIL = CM.statusCode.FAIL;
  CM.CONST_PTX_API_MSG_COMM_FAILED = 'Communication failed, no response. (通訊失敗，PTX 無法取回資料。)';
  CM.v2url = 'https://ptx.transportdata.tw/MOTC/v2';
  CM.ptxURL = CM.v2url;
  CM.metroURL = CM.ptxURL + '/Rail/Metro';
  CM.busURL = CM.ptxURL + '/Bus';
  CM.traURL = '/Rail/TRA';
  CM.ptxMRTWeekStr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  CM.pui = {
    printStatus: function printStatus() {
      if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.printStatus) {
        TT.ui.printStatus.apply(TT.ui, arguments);
      }
    },
    msg: {
      show: function show() {
        if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.msg && TT.ui.msg.show) {
          TT.ui.msg.show.apply(TT.ui, arguments);
        }
      },
      alert: function alert() {
        if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.msg && TT.ui.msg.alert) {
          TT.ui.msg.alert.apply(TT.ui, arguments);
        }
      }
    },
    mask: function mask() {
      if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.mask) {
        TT.ui.mask.apply(TT.ui, arguments);
      }
    },
    unmask: function unmask() {
      if ((typeof TT === "undefined" ? "undefined" : _typeof(TT)) == 'object' && TT.ui && TT.ui.unmask) {
        TT.ui.unmask.apply(TT.ui, arguments);
      }
    }
  };

  var me = {}; //jsSHA function start

  (function (G) {
    function r(d, b, c) {
      var h = 0,
          a = [],
          f = 0,
          g,
          m,
          k,
          e,
          l,
          p,
          q,
          t,
          w = !1,
          n = [],
          u = [],
          v,
          r = !1;
      c = c || {};
      g = c.encoding || "UTF8";
      v = c.numRounds || 1;
      if (v !== parseInt(v, 10) || 1 > v) throw Error("numRounds must a integer >= 1");
      if ("SHA-1" === d) l = 512, p = z, q = H, e = 160, t = function t(a) {
        return a.slice();
      };else throw Error("Chosen SHA variant is not supported");
      k = A(b, g);
      m = x(d);

      this.setHMACKey = function (a, f, b) {
        var c;
        if (!0 === w) throw Error("HMAC key already set");
        if (!0 === r) throw Error("Cannot set HMAC key after calling update");
        g = (b || {}).encoding || "UTF8";
        f = A(f, g)(a);
        a = f.binLen;
        f = f.value;
        c = l >>> 3;
        b = c / 4 - 1;

        if (c < a / 8) {
          for (f = q(f, a, 0, x(d), e); f.length <= b;) {
            f.push(0);
          }

          f[b] &= 4294967040;
        } else if (c > a / 8) {
          for (; f.length <= b;) {
            f.push(0);
          }

          f[b] &= 4294967040;
        }

        for (a = 0; a <= b; a += 1) {
          n[a] = f[a] ^ 909522486, u[a] = f[a] ^ 1549556828;
        }

        m = p(n, m);
        h = l;
        w = !0;
      };

      this.update = function (e) {
        var b,
            g,
            c,
            d = 0,
            q = l >>> 5;
        b = k(e, a, f);
        e = b.binLen;
        g = b.value;
        b = e >>> 5;

        for (c = 0; c < b; c += q) {
          d + l <= e && (m = p(g.slice(c, c + q), m), d += l);
        }

        h += d;
        a = g.slice(d >>> 5);
        f = e % l;
        r = !0;
      };

      this.getHash = function (b, g) {
        var c, k, l, p;
        if (!0 === w) throw Error("Cannot call getHash after setting HMAC key");
        l = B(g);

        switch (b) {
          case "HEX":
            c = function c(a) {
              return C(a, e, l);
            };

            break;

          case "B64":
            c = function c(a) {
              return D(a, e, l);
            };

            break;

          case "BYTES":
            c = function c(a) {
              return E(a, e);
            };

            break;

          case "ARRAYBUFFER":
            try {
              k = new ArrayBuffer(0);
            } catch (I) {
              throw Error("ARRAYBUFFER not supported by this environment");
            }

            c = function c(a) {
              return F(a, e);
            };

            break;

          default:
            throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
        }

        p = q(a.slice(), f, h, t(m), e);

        for (k = 1; k < v; k += 1) {
          p = q(p, e, 0, x(d), e);
        }

        return c(p);
      };

      this.getHMAC = function (b, g) {
        var c, k, n, r;
        if (!1 === w) throw Error("Cannot call getHMAC without first setting HMAC key");
        n = B(g);

        switch (b) {
          case "HEX":
            c = function c(a) {
              return C(a, e, n);
            };

            break;

          case "B64":
            c = function c(a) {
              return D(a, e, n);
            };

            break;

          case "BYTES":
            c = function c(a) {
              return E(a, e);
            };

            break;

          case "ARRAYBUFFER":
            try {
              c = new ArrayBuffer(0);
            } catch (I) {
              throw Error("ARRAYBUFFER not supported by this environment");
            }

            c = function c(a) {
              return F(a, e);
            };

            break;

          default:
            throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
        }

        k = q(a.slice(), f, h, t(m), e);
        r = p(u, x(d));
        r = q(k, e, l, r, e);
        return c(r);
      };
    }

    function C(d, b, c) {
      var h = "";
      b /= 8;
      var a, f;

      for (a = 0; a < b; a += 1) {
        f = d[a >>> 2] >>> 8 * (3 + a % 4 * -1), h += "0123456789abcdef".charAt(f >>> 4 & 15) + "0123456789abcdef".charAt(f & 15);
      }

      return c.outputUpper ? h.toUpperCase() : h;
    }

    function D(d, b, c) {
      var h = "",
          a = b / 8,
          f,
          g,
          m;

      for (f = 0; f < a; f += 3) {
        for (g = f + 1 < a ? d[f + 1 >>> 2] : 0, m = f + 2 < a ? d[f + 2 >>> 2] : 0, m = (d[f >>> 2] >>> 8 * (3 + f % 4 * -1) & 255) << 16 | (g >>> 8 * (3 + (f + 1) % 4 * -1) & 255) << 8 | m >>> 8 * (3 + (f + 2) % 4 * -1) & 255, g = 0; 4 > g; g += 1) {
          8 * f + 6 * g <= b ? h += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(m >>> 6 * (3 - g) & 63) : h += c.b64Pad;
        }
      }

      return h;
    }

    function E(d, b) {
      var c = "",
          h = b / 8,
          a,
          f;

      for (a = 0; a < h; a += 1) {
        f = d[a >>> 2] >>> 8 * (3 + a % 4 * -1) & 255, c += String.fromCharCode(f);
      }

      return c;
    }

    function F(d, b) {
      var c = b / 8,
          h,
          a = new ArrayBuffer(c),
          f;
      f = new Uint8Array(a);

      for (h = 0; h < c; h += 1) {
        f[h] = d[h >>> 2] >>> 8 * (3 + h % 4 * -1) & 255;
      }

      return a;
    }

    function B(d) {
      var b = {
        outputUpper: !1,
        b64Pad: "=",
        shakeLen: -1
      };
      d = d || {};
      b.outputUpper = d.outputUpper || !1;
      !0 === d.hasOwnProperty("b64Pad") && (b.b64Pad = d.b64Pad);
      if ("boolean" !== typeof b.outputUpper) throw Error("Invalid outputUpper formatting option");
      if ("string" !== typeof b.b64Pad) throw Error("Invalid b64Pad formatting option");
      return b;
    }

    function A(d, b) {
      var c;

      switch (b) {
        case "UTF8":
        case "UTF16BE":
        case "UTF16LE":
          break;

        default:
          throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
      }

      switch (d) {
        case "HEX":
          c = function c(b, a, f) {
            var g = b.length,
                c,
                d,
                e,
                l,
                p;
            if (0 !== g % 2) throw Error("String of HEX type must be in byte increments");
            a = a || [0];
            f = f || 0;
            p = f >>> 3;

            for (c = 0; c < g; c += 2) {
              d = parseInt(b.substr(c, 2), 16);
              if (isNaN(d)) throw Error("String of HEX type contains invalid characters");
              l = (c >>> 1) + p;

              for (e = l >>> 2; a.length <= e;) {
                a.push(0);
              }

              a[e] |= d << 8 * (3 + l % 4 * -1);
            }

            return {
              value: a,
              binLen: 4 * g + f
            };
          };

          break;

        case "TEXT":
          c = function c(_c, a, f) {
            var g,
                d,
                k = 0,
                e,
                l,
                p,
                q,
                t,
                n;
            a = a || [0];
            f = f || 0;
            p = f >>> 3;
            if ("UTF8" === b) for (n = 3, e = 0; e < _c.length; e += 1) {
              for (g = _c.charCodeAt(e), d = [], 128 > g ? d.push(g) : 2048 > g ? (d.push(192 | g >>> 6), d.push(128 | g & 63)) : 55296 > g || 57344 <= g ? d.push(224 | g >>> 12, 128 | g >>> 6 & 63, 128 | g & 63) : (e += 1, g = 65536 + ((g & 1023) << 10 | _c.charCodeAt(e) & 1023), d.push(240 | g >>> 18, 128 | g >>> 12 & 63, 128 | g >>> 6 & 63, 128 | g & 63)), l = 0; l < d.length; l += 1) {
                t = k + p;

                for (q = t >>> 2; a.length <= q;) {
                  a.push(0);
                }

                a[q] |= d[l] << 8 * (n + t % 4 * -1);
                k += 1;
              }
            } else if ("UTF16BE" === b || "UTF16LE" === b) for (n = 2, e = 0; e < _c.length; e += 1) {
              g = _c.charCodeAt(e);
              "UTF16LE" === b && (l = g & 255, g = l << 8 | g >>> 8);
              t = k + p;

              for (q = t >>> 2; a.length <= q;) {
                a.push(0);
              }

              a[q] |= g << 8 * (n + t % 4 * -1);
              k += 2;
            }
            return {
              value: a,
              binLen: 8 * k + f
            };
          };

          break;

        case "B64":
          c = function c(b, a, f) {
            var c = 0,
                d,
                k,
                e,
                l,
                p,
                q,
                n;
            if (-1 === b.search(/^[a-zA-Z0-9=+\/]+$/)) throw Error("Invalid character in base-64 string");
            k = b.indexOf("=");
            b = b.replace(/\=/g, "");
            if (-1 !== k && k < b.length) throw Error("Invalid '=' found in base-64 string");
            a = a || [0];
            f = f || 0;
            q = f >>> 3;

            for (k = 0; k < b.length; k += 4) {
              p = b.substr(k, 4);

              for (e = l = 0; e < p.length; e += 1) {
                d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(p[e]), l |= d << 18 - 6 * e;
              }

              for (e = 0; e < p.length - 1; e += 1) {
                n = c + q;

                for (d = n >>> 2; a.length <= d;) {
                  a.push(0);
                }

                a[d] |= (l >>> 16 - 8 * e & 255) << 8 * (3 + n % 4 * -1);
                c += 1;
              }
            }

            return {
              value: a,
              binLen: 8 * c + f
            };
          };

          break;

        case "BYTES":
          c = function c(b, a, _c2) {
            var d, m, k, e, l;
            a = a || [0];
            _c2 = _c2 || 0;
            k = _c2 >>> 3;

            for (m = 0; m < b.length; m += 1) {
              d = b.charCodeAt(m), l = m + k, e = l >>> 2, a.length <= e && a.push(0), a[e] |= d << 8 * (3 + l % 4 * -1);
            }

            return {
              value: a,
              binLen: 8 * b.length + _c2
            };
          };

          break;

        case "ARRAYBUFFER":
          try {
            c = new ArrayBuffer(0);
          } catch (h) {
            throw Error("ARRAYBUFFER not supported by this environment");
          }

          c = function c(b, a, _c3) {
            var d, m, k, e, l;
            a = a || [0];
            _c3 = _c3 || 0;
            m = _c3 >>> 3;
            l = new Uint8Array(b);

            for (d = 0; d < b.byteLength; d += 1) {
              e = d + m, k = e >>> 2, a.length <= k && a.push(0), a[k] |= l[d] << 8 * (3 + e % 4 * -1);
            }

            return {
              value: a,
              binLen: 8 * b.byteLength + _c3
            };
          };

          break;

        default:
          throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
      }

      return c;
    }

    function n(d, b) {
      return d << b | d >>> 32 - b;
    }

    function u(d, b) {
      var c = (d & 65535) + (b & 65535);
      return ((d >>> 16) + (b >>> 16) + (c >>> 16) & 65535) << 16 | c & 65535;
    }

    function y(d, b, c, h, a) {
      var f = (d & 65535) + (b & 65535) + (c & 65535) + (h & 65535) + (a & 65535);
      return ((d >>> 16) + (b >>> 16) + (c >>> 16) + (h >>> 16) + (a >>> 16) + (f >>> 16) & 65535) << 16 | f & 65535;
    }

    function x(d) {
      var b = [];
      if ("SHA-1" === d) b = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];else throw Error("No SHA variants supported");
      return b;
    }

    function z(d, b) {
      var c = [],
          h,
          a,
          f,
          g,
          m,
          k,
          e;
      h = b[0];
      a = b[1];
      f = b[2];
      g = b[3];
      m = b[4];

      for (e = 0; 80 > e; e += 1) {
        c[e] = 16 > e ? d[e] : n(c[e - 3] ^ c[e - 8] ^ c[e - 14] ^ c[e - 16], 1), k = 20 > e ? y(n(h, 5), a & f ^ ~a & g, m, 1518500249, c[e]) : 40 > e ? y(n(h, 5), a ^ f ^ g, m, 1859775393, c[e]) : 60 > e ? y(n(h, 5), a & f ^ a & g ^ f & g, m, 2400959708, c[e]) : y(n(h, 5), a ^ f ^ g, m, 3395469782, c[e]), m = g, g = f, f = n(a, 30), a = h, h = k;
      }

      b[0] = u(h, b[0]);
      b[1] = u(a, b[1]);
      b[2] = u(f, b[2]);
      b[3] = u(g, b[3]);
      b[4] = u(m, b[4]);
      return b;
    }

    function H(d, b, c, h) {
      var a;

      for (a = (b + 65 >>> 9 << 4) + 15; d.length <= a;) {
        d.push(0);
      }

      d[b >>> 5] |= 128 << 24 - b % 32;
      b += c;
      d[a] = b & 4294967295;
      d[a - 1] = b / 4294967296 | 0;
      b = d.length;

      for (a = 0; a < b; a += 16) {
        h = z(d.slice(a, a + 16), h);
      }

      return h;
    }

    "function" === typeof define && define.amd ? define(function () {
      return r;
    }) : "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (module.exports = r), exports = r) : G.jsSHA = r;
  })(me); //jsSHA function end


  var jsSHA = me.jsSHA;

  var fnTRTC = function fnTRTC() {
    return ptx.trtc;
  };

  var ptx = {
    statusCode: CM.statusCode,
    timeout: 30000,
    tempTimeTable: {},
    throwError: function throwError(str) {
      throw str;
    },
    filterParam: function filterParam(field, op, value, andOr) {
      //field 及 value可為陣列，其中一者為陣列時將用 andOr 連接，但當兩者皆為陣列時必需長度一致以便配對連接
      //ptx.filterParam(['fdfsd/fdfd','fdfd/gfg','fgf'],'<',[325,'ggg',996],'AND')
      andOr = andOr || 'or';
      andOr = andOr.toLowerCase();
      var opMap = {
        '=': 'eq',
        '==': 'eq',
        '===': 'eq',
        '!=': 'ne',
        '!==': 'ne',
        '!': 'not',
        '>': 'gt',
        '>=': 'ge',
        '<': 'lt',
        '<=': 'le'
      };
      var op2 = opMap[op] || op;

      if (_typeof(field) == 'object' && _typeof(value) == 'object' && field.length != value.length) {
        ptx.throwError('Not equal length of filterParam filed and value;');
        return false;
      }

      if (_typeof(field) != 'object') {
        field = [field];
      }

      if (_typeof(value) != 'object') {
        value = [value];
      }

      var cnt = field.length > value.length ? field.length : value.length;
      var tmpField,
          tmpValue,
          stringAry = [];

      for (var i = 0; i < cnt; i++) {
        tmpField = field[i] || field[0];
        tmpValue = value[i] || value[0];
        if (typeof tmpValue == 'string') tmpValue = "'" + tmpValue + "'";
        stringAry.push(tmpField + ' ' + op2 + ' ' + tmpValue);
      }

      return stringAry.join(' ' + andOr + ' ');
    },
    filterFn: function filterFn(param) {
      return encodeURI('$filter=' + param);
    },
    orderByFn: function orderByFn(field, dir) {
      dir = dir && typeof dir == 'string' ? ' ' + dir.toLowerCase() : '';
      return encodeURI('$orderby=' + arguments[0] + dir);
    },
    topFn: function topFn(top, formatStr) {
      top = top || 3000;
      formatStr = formatStr || 'JSON';
      return '$top=' + top + '&format=' + formatStr;
    },
    selectFieldFn: function selectFieldFn(str) {
      if (_typeof(str) == 'object' && str.length) {
        str = str.join(',');
      }

      return encodeURI('$select=' + str);
    },
    GetAuthorizationHeader: function GetAuthorizationHeader() {
      var AppID = ptx.AppID || 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
      var AppKey = ptx.AppKey || 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
      var GMTString = new Date().toGMTString();
      var ShaObj = new jsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update('x-date: ' + GMTString);
      var HMAC = ShaObj.getHMAC('B64');
      var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
      return {
        'Authorization': Authorization,
        'X-Date': GMTString
      };
    },
    getTakeMRTTimeTable: function getTakeMRTTimeTable(mrtPTXAry, w, cbFn) {
      var rtStatus = [];

      function runGet(arr) {
        if (arr.length == 0) {
          cbFn(rtStatus, ptx.tempTimeTable);
        } else {
          var obj = arr.shift();

          if (obj.company == 'trtc') {
            var LineID = fnTRTC().getLineID(obj.line),
                StationID = fnTRTC().getStationID(obj.takeRange[0], obj.line),
                targetID = fnTRTC().getStationID(obj.takeRange[1], obj.line);
            fnTRTC().getStationTime(LineID, [StationID, targetID], parseInt(w), function (json) {
              var rts = {
                LineID: LineID,
                StationID: StationID,
                targetID: targetID
              };

              if (json == CM.CONST_PTX_API_FAIL) {
                rts.status = CM.CONST_PTX_API_FAIL;
                rts.message = CM.CONST_PTX_API_MSG_COMM_FAILED;
                rtStatus.push(rts);
                runGet(arr);
              } else {
                rts.status = CM.CONST_PTX_API_SUCCESS;
                rtStatus.push(rts);
                runGet(arr);
              }
            });
          }
        }
      }

      runGet(mrtPTXAry);
    },
    getURL: function getURL(url, cbFn) {
      function reqListener(xhr) {
        var event = {
          xhr: xhr,
          data: xhr.target.response
        };

        if (xhr.target.readyState == 4 && xhr.target.status == 200) {
          event.status = CM.CONST_PTX_API_SUCCESS;
          cbFn(JSON.parse(xhr.target.response), event);
        } else {
          event.status = CM.CONST_PTX_API_FAIL;
          cbFn(xhr.target.response, event);
        }
      }

      var fm = new XMLHttpRequest();
      fm.addEventListener("load", reqListener);
      fm.addEventListener("error", reqListener);
      fm.addEventListener("abort", reqListener);
      fm.addEventListener("timeout", reqListener);
      fm.open('GET', url);
      fm.timeout = ptx.timeout;
      var headerObj = this.GetAuthorizationHeader();

      for (var k in headerObj) {
        fm.setRequestHeader(k, headerObj[k]);
      }

      fm.send();
    },
    getPromiseURL: function getPromiseURL(url) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        function reqListener(xhr) {
          var event = {
            xhr: xhr,
            url: url,
            config: cfg,
            resolve: resolve,
            reject: reject,
            response: xhr.target.response
          };

          if (xhr.target.readyState == 4 && xhr.target.status == 200) {
            event.status = CM.CONST_PTX_API_SUCCESS;
            event.data = JSON.parse(xhr.target.response);
            resolve(event);
          } else {
            event.status = CM.CONST_PTX_API_FAIL;
            reject(event);
          }
        }

        var fm = new XMLHttpRequest();
        fm.addEventListener("load", reqListener);
        fm.addEventListener("error", reqListener);
        fm.addEventListener("abort", reqListener);
        fm.addEventListener("timeout", reqListener);
        var method = cfg.method || 'GET';
        fm.open(method, url);
        fm.timeout = cfg.timeout || ptx.timeout;
        var headerObj = cfg.head || ptx.GetAuthorizationHeader();

        for (var k in headerObj) {
          fm.setRequestHeader(k, headerObj[k]);
        }

        fm.send();
      });
    },
    getStationLiveInfo: function getStationLiveInfo(stid, cbFn) {
      stid = stid ? stid.replace('tra_', '') : '1008';

      cbFn = cbFn || function (data) {
        console.info(data);
      };

      var url = traURL + '/LiveBoard/Station/' + stid + '?$top=30&$format=JSON';
      this.getURL(url, cbFn);
    },
    getStationTodayTime: function getStationTodayTime(stid, cbFn) {
      stid = stid ? stid.replace('tra_', '') : '1008';

      cbFn = cbFn || function (data) {
        console.info(data);
      };

      var url = traURL + '/DailyTimetable/Station/' + stid + '/' + TT.goingData.today + '?$top=3000&$format=JSON';
      this.getURL(url, cbFn);
    },
    sortByTTSortTime: function sortByTTSortTime(a, b) {
      var intA = parseInt(a.tt_sortTime, 10);
      var intB = parseInt(b.tt_sortTime, 10);
      if (intA == intB) return 0;
      if (intA < intB) return -1;
      if (intA > intB) return 1;
    }
  };

  var pData = {
    bus: {
      city: [{
        name: '臺北市',
        City: 'Taipei',
        CityCode: 'TPE'
      }, {
        name: '新北市',
        City: 'NewTaipei',
        CityCode: 'NWT'
      }, {
        name: '桃園市',
        City: 'Taoyuan',
        CityCode: 'TAO'
      }, {
        name: '臺中市',
        City: 'Taichung',
        CityCode: 'TXG'
      }, {
        name: '臺南市',
        City: 'Tainan',
        CityCode: 'TNN'
      }, {
        name: '高雄市',
        City: 'Kaohsiung',
        CityCode: 'KHH'
      }, {
        name: '基隆市',
        City: 'Keelung',
        CityCode: 'KEE'
      }, {
        name: '新竹市',
        City: 'Hsinchu',
        CityCode: 'HSZ'
      }, {
        name: '新竹縣',
        City: 'HsinchuCounty',
        CityCode: 'HSQ'
      }, {
        name: '苗栗縣',
        City: 'MiaoliCounty',
        CityCode: 'MIA'
      }, {
        name: '彰化縣',
        City: 'ChanghuaCounty',
        CityCode: 'CHA'
      }, {
        name: '南投縣',
        City: 'NantouCounty',
        CityCode: 'NAN'
      }, {
        name: '雲林縣',
        City: 'YunlinCounty',
        CityCode: 'YUN'
      }, {
        name: '嘉義縣',
        City: 'ChiayiCounty',
        CityCode: 'CYQ'
      }, {
        name: '嘉義市',
        City: 'Chiayi',
        CityCode: 'CYI'
      }, {
        name: '屏東縣',
        City: 'PingtungCounty',
        CityCode: 'PIF'
      }, {
        name: '宜蘭縣',
        City: 'YilanCounty',
        CityCode: 'ILA'
      }, {
        name: '花蓮縣',
        City: 'HualienCounty',
        CityCode: 'HUA'
      }, {
        name: '臺東縣',
        City: 'TaitungCounty',
        CityCode: 'TTT'
      }, {
        name: '金門縣',
        City: 'KinmenCounty',
        CityCode: 'KIN'
      }, {
        name: '澎湖縣',
        City: 'PenghuCounty',
        CityCode: 'PEN'
      }, {
        name: '連江縣',
        City: 'LienchiangCounty',
        CityCode: 'LIE'
      }]
    },
    trtc: {
      station_ary: [//Bannan Line
      {
        id: "trtc_031",
        StationID: ["BL23", "BR24"]
      }, {
        id: "trtc_097",
        StationID: ["BL22"]
      }, {
        id: "trtc_096",
        StationID: ["BL21"]
      }, {
        id: "trtc_095",
        StationID: ["BL20"]
      }, {
        id: "trtc_094",
        StationID: ["BL19"]
      }, {
        id: "trtc_093",
        StationID: ["BL18"]
      }, {
        id: "trtc_092",
        StationID: ["BL17"]
      }, {
        id: "trtc_091",
        StationID: ["BL16"]
      }, {
        id: "trtc_010",
        StationID: ["BL15", "BR10"]
      }, {
        id: "trtc_089",
        StationID: ["BL14", "O07"]
      }, {
        id: "trtc_088",
        StationID: ["BL13"]
      }, {
        id: "trtc_086",
        StationID: ["BL11", "G12"]
      }, {
        id: "trtc_085",
        StationID: ["BL10"]
      }, {
        id: "trtc_084",
        StationID: ["BL09"]
      }, {
        id: "trtc_083",
        StationID: ["BL08"]
      }, {
        id: "trtc_082",
        StationID: ["BL07"]
      }, {
        id: "trtc_081",
        StationID: ["BL06"]
      }, {
        id: "trtc_080",
        StationID: ["BL05"]
      }, {
        id: "trtc_079",
        StationID: ["BL04"]
      }, {
        id: "trtc_078",
        StationID: ["BL03"]
      }, {
        id: "trtc_077",
        StationID: ["BL02"]
      }, {
        id: "trtc_076",
        StationID: ["BL01"]
      }, //TamsuiXinyi Line
      {
        id: "trtc_071",
        StationID: ["R28"]
      }, {
        id: "trtc_070",
        StationID: ["R27"]
      }, {
        id: "trtc_069",
        StationID: ["R26"]
      }, {
        id: "trtc_068",
        StationID: ["R25"]
      }, {
        id: "trtc_067",
        StationID: ["R24"]
      }, {
        id: "trtc_066",
        StationID: ["R23"]
      }, {
        id: "trtc_064",
        StationID: ["R22"]
      }, {
        id: "trtc_063",
        StationID: ["R21"]
      }, {
        id: "trtc_062",
        StationID: ["R20"]
      }, {
        id: "trtc_061",
        StationID: ["R19"]
      }, {
        id: "trtc_060",
        StationID: ["R18"]
      }, {
        id: "trtc_059",
        StationID: ["R17"]
      }, {
        id: "trtc_058",
        StationID: ["R16"]
      }, {
        id: "trtc_057",
        StationID: ["R15"]
      }, {
        id: "trtc_056",
        StationID: ["R14"]
      }, {
        id: "trtc_055",
        StationID: ["R13", "O11"]
      }, {
        id: "trtc_054",
        StationID: ["R12"]
      }, {
        id: "trtc_053",
        StationID: ["R11", "G14"]
      }, {
        id: "trtc_051",
        StationID: ["R10", "BL12"]
      }, {
        id: "trtc_050",
        StationID: ["R09"]
      }, {
        id: "trtc_134",
        StationID: ["R07", "O06"]
      }, {
        id: "trtc_103",
        StationID: ["R06"]
      }, {
        id: "trtc_011",
        StationID: ["R05", "BR09"]
      }, {
        id: "trtc_101",
        StationID: ["R04"]
      }, {
        id: "trtc_100",
        StationID: ["R03"]
      }, {
        id: "trtc_099",
        StationID: ["R02"]
      }, //ZhongHeXinLu Line
      {
        id: "trtc_048",
        StationID: ["O01"]
      }, {
        id: "trtc_047",
        StationID: ["O02"]
      }, {
        id: "trtc_046",
        StationID: ["O03"]
      }, {
        id: "trtc_045",
        StationID: ["O04"]
      }, {
        id: "trtc_131",
        StationID: ["O09"]
      }, {
        id: "trtc_130",
        StationID: ["O10"]
      }, {
        id: "trtc_128",
        StationID: ["O12"]
      }, {
        id: "trtc_127",
        StationID: ["O13"]
      }, {
        id: "trtc_126",
        StationID: ["O14"]
      }, {
        id: "trtc_125",
        StationID: ["O15"]
      }, {
        id: "trtc_124",
        StationID: ["O16"]
      }, {
        id: "trtc_123",
        StationID: ["O17"]
      }, {
        id: "trtc_122",
        StationID: ["O18"]
      }, {
        id: "trtc_121",
        StationID: ["O19"]
      }, {
        id: "trtc_180",
        StationID: ["O20"]
      }, {
        id: "trtc_179",
        StationID: ["O21"]
      }, {
        id: "trtc_178",
        StationID: ["O50"]
      }, {
        id: "trtc_177",
        StationID: ["O51"]
      }, {
        id: "trtc_176",
        StationID: ["O52"]
      }, {
        id: "trtc_175",
        StationID: ["O53"]
      }, {
        id: "trtc_174",
        StationID: ["O54"]
      }, //SongShanXinDian Line
      {
        id: "trtc_111",
        StationID: ["G19"]
      }, {
        id: "trtc_110",
        StationID: ["G18"]
      }, {
        id: "trtc_109",
        StationID: ["G17"]
      }, {
        id: "trtc_009",
        StationID: ["G16", "BR11"]
      }, {
        id: "trtc_132",
        StationID: ["G15", "O08"]
      }, {
        id: "trtc_105",
        StationID: ["G13"]
      }, {
        id: "trtc_043",
        StationID: ["G11"]
      }, {
        id: "trtc_042",
        StationID: ["G10", "R08"]
      }, {
        id: "trtc_041",
        StationID: ["G09", "O05"]
      }, {
        id: "trtc_040",
        StationID: ["G08"]
      }, {
        id: "trtc_039",
        StationID: ["G07"]
      }, {
        id: "trtc_038",
        StationID: ["G06"]
      }, {
        id: "trtc_037",
        StationID: ["G05"]
      }, {
        id: "trtc_036",
        StationID: ["G04"]
      }, {
        id: "trtc_035",
        StationID: ["G03"]
      }, {
        id: "trtc_034",
        StationID: ["G02"]
      }, {
        id: "trtc_033",
        StationID: ["G01"]
      }],
      line: [{
        id: 'trtc_1',
        LineID: 'BR',
        route: [{
          dir: 0,
          Direction: 0,
          work: [{
            RouteID: 'BR-1',
            from: 'BR01',
            to: 'BR24'
          }]
        }, {
          dir: 1,
          Direction: 1,
          work: [{
            RouteID: 'BR-1',
            from: 'BR24',
            to: 'BR01'
          }]
        }]
      }, {
        id: 'trtc_2',
        LineID: 'R',
        route: [{
          dir: 0,
          Direction: 0,
          work: [{
            RouteID: 'R-1',
            from: 'R02',
            to: 'R28'
          }, {
            RouteID: 'R-2',
            from: 'R05',
            to: 'R22'
          }]
        }, {
          dir: 1,
          Direction: 1,
          work: [{
            RouteID: 'R-1',
            from: 'R28',
            to: 'R02'
          }, {
            RouteID: 'R-2',
            from: 'R22',
            to: 'R05'
          }]
        }]
      }, {
        id: 'trtc_3',
        LineID: 'G',
        route: [{
          dir: 0,
          Direction: 0,
          work: [{
            RouteID: 'G-1',
            from: 'G01',
            to: 'G19'
          }, {
            RouteID: 'G-2',
            from: 'G08',
            to: 'G19'
          }]
        }, {
          dir: 1,
          Direction: 1,
          work: [{
            RouteID: 'G-1',
            from: 'G19',
            to: 'G01'
          }, {
            RouteID: 'G-2',
            from: 'G19',
            to: 'G08'
          }]
        }]
      }, {
        id: 'trtc_4',
        LineID: 'O',
        route: [{
          dir: 0,
          Direction: 0,
          work: [{
            RouteID: 'O-1',
            from: 'O01',
            to: 'O21'
          }, {
            RouteID: 'O-2',
            from: 'O01',
            to: 'O54'
          }]
        }, {
          dir: 1,
          Direction: 1,
          work: [{
            RouteID: 'O-1',
            from: 'O21',
            to: 'O01'
          }, {
            RouteID: 'O-2',
            from: 'O54',
            to: 'O01'
          }]
        }]
      }, {
        id: 'trtc_5',
        LineID: 'BL',
        route: [{
          dir: 0,
          Direction: 0,
          work: [{
            RouteID: 'BL-1',
            from: 'BL01',
            to: 'BL23'
          }, {
            RouteID: 'BL-2',
            from: 'BL05',
            to: 'BL23'
          }]
        }, {
          dir: 1,
          Direction: 1,
          work: [{
            RouteID: 'BL-1',
            from: 'BL23',
            to: 'BL01'
          }, {
            RouteID: 'BL-2',
            from: 'BL23',
            to: 'BL05'
          }]
        }]
      }]
    }
  };

  var busURL = CM.busURL;
  var fnBUS = {
    setDefaultCfg: function setDefaultCfg(cfg) {
      cfg = cfg || {};
      cfg.manageBy = cfg.manageBy || 'City'; //City , InterCity

      cfg.cbFn = cfg.cbFn || function (data, e) {
        console.info(data);
      };

      cfg.selectField = cfg.selectField ? ptx.selectFieldFn(cfg.selectField) : '';
      cfg.top = 3000;
      return cfg;
    },
    getCityData: function getCityData(str) {
      var ary = pData.bus.city;
      var rt = false;

      for (var i = 0; i < ary.length; i++) {
        if (ary[i].name == str || ary[i].City == str || ary[i].CityCode == str) {
          rt = ary[i];
          break;
        }
      }

      return rt;
    },
    getBusArriveTime: function getBusArriveTime(StopUID, city, cfg) {
      var filterStr = ptx.filterFn(ptx.filterParam('StopUID', '==', StopUID, 'or'));
      this.getEstimatedTimeOfArrival(filterStr, city, cfg);
    },
    getBusRouteArriveTime: function getBusRouteArriveTime(RouteUID, cfg) {
      var city = RouteUID.substr(0, 3);
      var filterStr = ptx.filterFn(ptx.filterParam('RouteUID', '==', RouteUID, 'or'));
      this.getEstimatedTimeOfArrival(filterStr, city, cfg);
    },
    getBusRouteInfo: function getBusRouteInfo(RouteUID, cfg) {
      cfg = this.setDefaultCfg(cfg);
      var city = RouteUID.substr(0, 3);
      var myURL = busURL + '/Route/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
      myURL += ptx.filterFn(ptx.filterParam('RouteUID', '==', RouteUID) + '&' + ptx.topFn());
      if (cfg.selectField) myURL += '&' + cfg.selectField;
      ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRealtimeNearStop: function getBusRealtimeNearStop(RouteUID, dir, cfg) {
      cfg = this.setDefaultCfg(cfg);
      var city = RouteUID.substr(0, 3);

      if (/string|number/.test(_typeof(dir))) {
        dir = dir.toString();
        var myURL = busURL + '/RealTimeNearStop/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
        myURL += ptx.filterFn(ptx.filterParam(['RouteUID', 'Direction'], '==', [RouteUID, dir], 'and')) + '&' + ptx.topFn();
      } else {
        var myURL = busURL + '/RealTimeNearStop/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
        myURL += ptx.filterFn(ptx.filterParam(['RouteUID'], '==', [RouteUID], 'and')) + '&' + ptx.topFn();
      }

      if (cfg.selectField) myURL += '&' + cfg.selectField;
      ptx.getURL(myURL, cfg.cbFn);
    },
    getBusRoute: function getBusRoute(RouteUID, cfg, city) {
      cfg = this.setDefaultCfg(cfg);

      if (!city) {
        if (typeof RouteUID == 'string') {
          city = RouteUID.substr(0, 3);
        } else {
          city = RouteUID[0].substr(0, 3);
        }
      }

      var myURL = busURL + '/Route/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
      myURL += ptx.filterFn(ptx.filterParam('RouteUID', '==', RouteUID), 'or') + '&' + ptx.topFn();
      if (cfg.selectField) myURL += '&' + cfg.selectField;
      ptx.getURL(myURL, cfg.cbFn);
    },
    getBusStation: function getBusStation(StationID, city, cfg) {
      cfg = this.setDefaultCfg(cfg);
      var myURL = busURL + '/Station/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
      myURL += ptx.filterFn(ptx.filterParam('StationID', '==', StationID.toString())) + '&' + ptx.topFn();
      if (cfg.selectField) myURL += '&' + cfg.selectField;
      ptx.getURL(myURL, cfg.cbFn);
    },
    getBusStopRoute: function getBusStopRoute(RouteUID, city, cfg) {
      cfg = this.setDefaultCfg(cfg);
      var myURL = busURL + '/StopOfRoute/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
      myURL += ptx.filterFn(ptx.filterParam('RouteUID', '==', RouteUID.toString())) + '&';
      myURL += ptx.orderByFn('SubRouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
      if (cfg.selectField) myURL += '&' + cfg.selectField;
      ptx.getURL(myURL, cfg.cbFn);
    },
    getBusStopRouteByNumber: function getBusStopRouteByNumber(busNumber, city, cfg) {
      cfg = this.setDefaultCfg(cfg);
      var myURL = busURL + '/StopOfRoute/' + cfg.manageBy + '/' + this.getCityData(city).City + '/' + encodeURI(busNumber) + '?';
      myURL += ptx.orderByFn('SubRouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
      if (cfg.selectField) myURL += '&' + cfg.selectField;
      ptx.getURL(myURL, cfg.cbFn);
    },
    getEstimatedTimeOfArrival: function getEstimatedTimeOfArrival(filterStr, city, cfg) {
      filterStr = filterStr ? filterStr + '&' : '';
      cfg = this.setDefaultCfg(cfg);
      var myURL = busURL + '/EstimatedTimeOfArrival/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
      myURL += filterStr + ptx.topFn();
      if (cfg.selectField) myURL += '&' + cfg.selectField;
      ptx.getURL(myURL, cfg.cbFn);
    },
    searchBusByNumber: function searchBusByNumber(busNumber, city, cfg) {
      cfg = this.setDefaultCfg(cfg);
      var myURL = busURL + '/Route/' + cfg.manageBy + '/' + this.getCityData(city).City + '/' + encodeURI(busNumber) + '?';
      myURL += ptx.orderByFn('RouteName/Zh_tw', 'asc') + '&' + ptx.topFn();
      if (cfg.selectField) myURL += '&' + cfg.selectField;
      ptx.getURL(myURL, cfg.cbFn);
    }
  };

  var metroURL = CM.metroURL;
  var urls = {
    Network: metroURL + '/Network',
    //取得捷運路網資料
    LINE: metroURL + '/LINE/',
    //取得捷運路線基本資料
    Station: metroURL + '/Station/',
    //取得捷運車站基本資料
    StationOfLine: metroURL + '/StationOfLine/',
    //取得捷運路線車站基本資料
    LineTransfer: metroURL + '/LineTransfer/',
    //取得捷運路線站間轉乘基本資料
    StationFacility: metroURL + '/StationFacility/',
    //取得捷運車站設施資料
    StationExit: metroURL + '/StationExit/',
    //取得捷運車站出入口基本資料
    Route: metroURL + '/Route/',
    //取得捷運營運路線基本資料
    StationOfRoute: metroURL + '/StationOfRoute/',
    //取得捷運營運路線車站基本資料
    FirstLastTimetable: metroURL + '/FirstLastTimetable/',
    //取得捷運首末班車時刻表資料
    Frequency: metroURL + '/Frequency/',
    //取得捷運路線發車班距頻率資料
    S2STravelTime: metroURL + '/S2STravelTime/',
    //取得捷運列車站間運行時間資料
    ODFare: metroURL + '/ODFare/',
    //取得捷運起迄站間票價資料
    LiveBoard: metroURL + '/LiveBoard/',
    //取得捷運起迄站間票價資料
    StationTimeTable: metroURL + '/StationTimeTable/',
    //取得捷運站別時刻表資料
    Shape: metroURL + '/Shape/' //取得指定營運業者之軌道路網實體路線圖資資料

  };
  var companyTag = {
    trtc: 'TRTC',
    tymetro: 'TYMC',
    klrt: 'KLRT',
    krtc: 'KRTC'
  };
  var getPTX = ptx.getPromiseURL;

  function setDefaultCfg() {
    var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (typeof cfg == 'string') cfg = {
      paramDirectlyUse: cfg
    }; //若傳入的為字串代表直接用於最後的參數不需再調整

    cfg.cbFn = cfg.cbFn || function (data, e) {};

    cfg.selectField = cfg.selectField ? ptx.selectFieldFn(cfg.selectField) : '';
    cfg.top = 3000;
    cfg.format = 'JSON';
    return cfg;
  }

  function processCfg(cfg) {
    //將 cfg 轉為對應的參數
    if (cfg.paramDirectlyUse) return cfg.paramDirectlyUse;
    var aryParam = [];
    if (cfg.selectField) aryParam.push(ptx.selectFieldFn(cfg.selectField));
    if (cfg.filterBy) aryParam.push(ptx.filterFn(cfg.filterBy));

    if (cfg.orderBy) {
      var dir = cfg.orderDir || 'asc';
      aryParam.push(ptx.orderByFn(cfg.orderBy, dir));
    }

    aryParam.push(ptx.topFn(cfg.top, cfg.format)); //最後加這個

    return '?' + aryParam.join('&');
  }

  function getCompanyTag(name) {
    return companyTag[name] || name;
  }

  function _LINE(companyTag, cfg) {
    cfg = setDefaultCfg(cfg);
    var param = processCfg(cfg);
    return getPTX(urls.LINE + companyTag + param);
  }

  var metro = {
    getCompanyTag: getCompanyTag,
    _LINE: _LINE,
    urls: urls,
    companyTag: companyTag
  };

  var companyTag$1 = metro.getCompanyTag('trtc');

  function testFetch(cmd) {
    if (typeof fnTRTC$1[cmd] == 'function') {
      return fnTRTC$1[cmd]().then(function (e) {
        console.info(e);
      }).catch(function (e) {
        console.info(e);
      });
    }
  }

  function _LINE$1(cfg) {
    return metro._LINE(companyTag$1, cfg);
  }

  var fnTRTC$1 = {
    checkRouteIdOnUse: function checkRouteIdOnUse(RouteID, LineID) {
      var lineData = this.getLineData(LineID);
      var rt = false;

      for (var i = 0; i < lineData.route.length; i++) {
        for (var j = 0; j < lineData.route[i].work.length; j++) {
          if (lineData.route[i].work[j].RouteID == RouteID) {
            rt = true;
            break;
          }
        }
      }

      return rt;
    },
    getLineData: function getLineData(id) {
      var rt = false;
      pData.trtc.line.forEach(function (c) {
        if (c.id == id || c.LineID == id) {
          rt = c;
        }
      });
      return rt;
    },
    getLineID: function getLineID(id) {
      return this.getLineData(id).LineID;
    },
    getOriginalLineByLineID: function getOriginalLineByLineID(LineID) {
      var rt = false;
      pData.trtc.line.forEach(function (c) {
        if (c.LineID == LineID) {
          rt = c;
        }
      });
      return rt;
    },
    getStationIDAry: function getStationIDAry(id) {
      var ary = pData.trtc.station_ary;
      var stData = false;

      for (var i = 0; i < ary.length; i++) {
        if (ary[i].id == id) {
          stData = ary[i].StationID;
          break;
        }
      }

      return stData;
    },
    getStationID: function getStationID(id, lineOriginalID) {
      var LineID = /^trtc/.test(lineOriginalID) ? this.getLineID(lineOriginalID) : lineOriginalID;
      var stData = this.getStationIDAry(id);

      if (!LineID) {
        return false;
      } else {
        var rt = false,
            lineCode = '',
            codeLen = 0;
        stData.forEach(function (c) {
          if (/^[a-zA-Z]{1}\d{2}/gi.test(c)) {
            codeLen = 1;
          } else if (/^[a-zA-Z]{2}\d{2}/gi.test(c)) {
            codeLen = 2;
          }

          lineCode = c.substr(0, codeLen);

          if (lineCode == LineID) {
            rt = c;
          }
        });
        return rt;
      }
    },
    getStationIDInWhatLine: function getStationIDInWhatLine(StatioinID) {
      if (/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)) {
        return StatioinID.substr(0, 1);
      } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)) {
        return StatioinID.substr(0, 2);
      }
    },
    getStationTime: function getStationTime(LineID, StationID, w, cbFn) {
      var targetID = false;
      var me = this;

      if (typeof StationID != 'string' && StationID.length == 2) {
        targetID = StationID[1];
        StationID = StationID[0];
      }

      var Week = false;
      if (typeof w == 'number') Week = CM.ptxMRTWeekStr[w];
      var mtStr = "$filter=LineID eq '" + LineID + "' and StationID eq '" + StationID + "'";
      if (Week) mtStr += ' and ServiceDays/' + Week + ' eq true';
      var url = CM.metroURL + '/StationTimeTable/TRTC?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
      CM.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表'); //產生暫存時刻表空間

      if (!ptx.tempTimeTable.trtc) ptx.tempTimeTable.trtc = {};
      if (!ptx.tempTimeTable.trtc[LineID]) ptx.tempTimeTable.trtc[LineID] = [];
      if (!ptx.tempTimeTable.trtc[LineID][StationID]) ptx.tempTimeTable.trtc[LineID][StationID] = [];
      ptx.tempTimeTable.trtc[LineID][StationID][w] = [[], []]; //Direction 0 and 1
      //抓時刻表

      ptx.getURL(url, function (json, e) {
        if (e.status == CM.CONST_PTX_API_FAIL) {
          cbFn(json);
          return false;
        }

        json.forEach(function (routeA) {
          var tmpAry = ptx.tempTimeTable.trtc[LineID][StationID][w];
          var tmpTimeAry = routeA.Timetables.map(function (timeObj) {
            timeObj.tt_sortTime = TT.fn.transTime2Sec(timeObj.DepartureTime);
            timeObj.RouteID = routeA.RouteID;
            return timeObj;
          });

          if (me.checkRouteIdOnUse(routeA.RouteID, routeA.LineID)) {
            if (routeA.Direction == 0) {
              tmpAry[0] = tmpAry[0].concat(tmpTimeAry);
            } else if (routeA.Direction == 1) {
              tmpAry[1] = tmpAry[1].concat(tmpTimeAry);
            }
          }
        });
        var workAry = ptx.tempTimeTable.trtc[LineID][StationID][w];

        var timeMakeFn = function timeMakeFn(c) {
          return c.DepartureTime;
        };

        workAry[0] = workAry[0].sort(ptx.sortByTTSortTime); //在這一步之前都還是物件狀態時刻表，之後暫時改造成單一時刻表替換 rnwTimeTable

        workAry[0] = workAry[0].map(timeMakeFn);
        workAry[1] = workAry[1].sort(ptx.sortByTTSortTime);
        workAry[1] = workAry[1].map(timeMakeFn);
        cbFn(json);
      });
    },
    getFormatStationTime: function getFormatStationTime(stID, line, dir, w) {
      w = parseInt(w);
      var StationID = ptx.trtc.getStationID(stID, line);
      var LineID = ptx.trtc.getLineID(line);
      if (!ptx.tempTimeTable.trtc) return false;
      if (!ptx.tempTimeTable.trtc[LineID]) return false;
      if (!ptx.tempTimeTable.trtc[LineID][StationID]) return false;
      if (!ptx.tempTimeTable.trtc[LineID][StationID][w]) return false;
      if (!ptx.tempTimeTable.trtc[LineID][StationID][w][dir]) return false;
      if (ptx.tempTimeTable.trtc[LineID][StationID][w][dir].length == 0) return false;
      return ptx.tempTimeTable.trtc[LineID][StationID][w][dir];
    },
    getOriginalStationID: function getOriginalStationID(StationID) {
      var ary = pData.trtc.station_ary;
      var stData = false;

      for (var i = 0; i < ary.length; i++) {
        if (ary[i].StationID.indexOf(StationID) != -1) {
          stData = ary[i].id;
          break;
        }
      }

      return stData;
    },
    _LINE: _LINE$1,
    testFetch: testFetch
  };

  var inBrowser = CM.inBrowser;
  var combine = {
    data: pData,
    bus: fnBUS,
    metro: metro,
    trtc: fnTRTC$1,
    jsSHA: jsSHA,
    common: CM
  };

  for (var k in combine) {
    ptx[k] = combine[k];
  }

  if (inBrowser && !window.rocptx) {
    window.rocptx = ptx;
    if (!window.Promise) console.log("PTX library need Promise, please include a Promise polyfill.");
  }

  return ptx;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHR4LmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tbW9uLmpzIiwiLi4vc3JjL2pzU0hBLmpzIiwiLi4vc3JjL3B0eC5qcyIsIi4uL3NyYy9kYXRhLmpzIiwiLi4vc3JjL2J1cy5qcyIsIi4uL3NyYy9tZXRyby5qcyIsIi4uL3NyYy90cnRjLmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBDTSA9IHtcclxuICAgIGluQnJvd3NlcjogISEodHlwZW9mKHdpbmRvdykhPSd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudClcclxufVxyXG5cclxuQ00uc3RhdHVzQ29kZSA9IHtcclxuICAgIFNVQ0NFU1M6ICdzdWNjZXNzJyxcclxuICAgIEZBSUw6ICdmYWlsJ1xyXG59XHJcbkNNLkNPTlNUX1BUWF9BUElfU1VDQ0VTUyA9IENNLnN0YXR1c0NvZGUuU1VDQ0VTUztcclxuQ00uQ09OU1RfUFRYX0FQSV9GQUlMID0gQ00uc3RhdHVzQ29kZS5GQUlMO1xyXG5DTS5DT05TVF9QVFhfQVBJX01TR19DT01NX0ZBSUxFRCA9ICdDb21tdW5pY2F0aW9uIGZhaWxlZCwgbm8gcmVzcG9uc2UuICjpgJroqIrlpLHmlZfvvIxQVFgg54Sh5rOV5Y+W5Zue6LOH5paZ44CCKSc7XHJcbkNNLnYydXJsID0gJ2h0dHBzOi8vcHR4LnRyYW5zcG9ydGRhdGEudHcvTU9UQy92Mic7XHJcbkNNLnB0eFVSTCA9IENNLnYydXJsO1xyXG5DTS5tZXRyb1VSTCA9IENNLnB0eFVSTCArICcvUmFpbC9NZXRybyc7XHJcbkNNLmJ1c1VSTCA9IENNLnB0eFVSTCArICcvQnVzJ1xyXG5DTS50cmFVUkwgPSAnL1JhaWwvVFJBJztcclxuQ00ucHR4TVJUV2Vla1N0ciA9IFsnU3VuZGF5JywnTW9uZGF5JywnVHVlc2RheScsJ1dlZG5lc2RheScsJ1RodXJzZGF5JywnRnJpZGF5JywnU2F0dXJkYXknXTtcclxuXHJcblxyXG5DTS5wdWkgPSB7XHJcbiAgICBwcmludFN0YXR1czogZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0eXBlb2YoVFQpPT0nb2JqZWN0JyAmJiBUVC51aSAmJiBUVC51aS5wcmludFN0YXR1cyl7IFRULnVpLnByaW50U3RhdHVzLmFwcGx5KFRULnVpLCBhcmd1bWVudHMpOyB9XHJcbiAgICB9LFxyXG4gICAgbXNnOiB7XHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKXtpZih0eXBlb2YoVFQpPT0nb2JqZWN0JyAmJiBUVC51aSAmJiBUVC51aS5tc2cgJiYgVFQudWkubXNnLnNob3cpeyBUVC51aS5tc2cuc2hvdy5hcHBseShUVC51aSwgYXJndW1lbnRzKTsgfX0sXHJcbiAgICAgICAgYWxlcnQ6IGZ1bmN0aW9uKCl7aWYodHlwZW9mKFRUKT09J29iamVjdCcgJiYgVFQudWkgJiYgVFQudWkubXNnICYmIFRULnVpLm1zZy5hbGVydCl7IFRULnVpLm1zZy5hbGVydC5hcHBseShUVC51aSwgYXJndW1lbnRzKTsgfX1cclxuICAgIH0sXHJcbiAgICBtYXNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHR5cGVvZihUVCk9PSdvYmplY3QnICYmIFRULnVpICYmIFRULnVpLm1hc2speyBUVC51aS5tYXNrLmFwcGx5KFRULnVpLCBhcmd1bWVudHMpOyB9XHJcbiAgICB9LFxyXG4gICAgdW5tYXNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHR5cGVvZihUVCk9PSdvYmplY3QnICYmIFRULnVpICYmIFRULnVpLnVubWFzayl7IFRULnVpLnVubWFzay5hcHBseShUVC51aSwgYXJndW1lbnRzKTsgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENNO1xyXG5cclxuIiwidmFyIG1lID0ge307XG4vL2pzU0hBIGZ1bmN0aW9uIHN0YXJ0XG4oZnVuY3Rpb24oRyl7ZnVuY3Rpb24gcihkLGIsYyl7dmFyIGg9MCxhPVtdLGY9MCxnLG0sayxlLGwscCxxLHQsdz0hMSxuPVtdLHU9W10sdixyPSExO2M9Y3x8e307Zz1jLmVuY29kaW5nfHxcIlVURjhcIjt2PWMubnVtUm91bmRzfHwxO2lmKHYhPT1wYXJzZUludCh2LDEwKXx8MT52KXRocm93IEVycm9yKFwibnVtUm91bmRzIG11c3QgYSBpbnRlZ2VyID49IDFcIik7aWYoXCJTSEEtMVwiPT09ZClsPTUxMixwPXoscT1ILGU9MTYwLHQ9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc2xpY2UoKX07ZWxzZSB0aHJvdyBFcnJvcihcIkNob3NlbiBTSEEgdmFyaWFudCBpcyBub3Qgc3VwcG9ydGVkXCIpO2s9QShiLGcpO209eChkKTt0aGlzLnNldEhNQUNLZXk9ZnVuY3Rpb24oYSxmLGIpe3ZhciBjO2lmKCEwPT09dyl0aHJvdyBFcnJvcihcIkhNQUMga2V5IGFscmVhZHkgc2V0XCIpO2lmKCEwPT09cil0aHJvdyBFcnJvcihcIkNhbm5vdCBzZXQgSE1BQyBrZXkgYWZ0ZXIgY2FsbGluZyB1cGRhdGVcIik7XG5nPShifHx7fSkuZW5jb2Rpbmd8fFwiVVRGOFwiO2Y9QShmLGcpKGEpO2E9Zi5iaW5MZW47Zj1mLnZhbHVlO2M9bD4+PjM7Yj1jLzQtMTtpZihjPGEvOCl7Zm9yKGY9cShmLGEsMCx4KGQpLGUpO2YubGVuZ3RoPD1iOylmLnB1c2goMCk7ZltiXSY9NDI5NDk2NzA0MH1lbHNlIGlmKGM+YS84KXtmb3IoO2YubGVuZ3RoPD1iOylmLnB1c2goMCk7ZltiXSY9NDI5NDk2NzA0MH1mb3IoYT0wO2E8PWI7YSs9MSluW2FdPWZbYV1eOTA5NTIyNDg2LHVbYV09ZlthXV4xNTQ5NTU2ODI4O209cChuLG0pO2g9bDt3PSEwfTt0aGlzLnVwZGF0ZT1mdW5jdGlvbihlKXt2YXIgYixnLGMsZD0wLHE9bD4+PjU7Yj1rKGUsYSxmKTtlPWIuYmluTGVuO2c9Yi52YWx1ZTtiPWU+Pj41O2ZvcihjPTA7YzxiO2MrPXEpZCtsPD1lJiYobT1wKGcuc2xpY2UoYyxjK3EpLG0pLGQrPWwpO2grPWQ7YT1nLnNsaWNlKGQ+Pj41KTtmPWUlbDtyPSEwfTt0aGlzLmdldEhhc2g9ZnVuY3Rpb24oYixnKXt2YXIgYyxrLGwscDtpZighMD09PVxudyl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhhc2ggYWZ0ZXIgc2V0dGluZyBITUFDIGtleVwiKTtsPUIoZyk7c3dpdGNoKGIpe2Nhc2UgXCJIRVhcIjpjPWZ1bmN0aW9uKGEpe3JldHVybiBDKGEsZSxsKX07YnJlYWs7Y2FzZSBcIkI2NFwiOmM9ZnVuY3Rpb24oYSl7cmV0dXJuIEQoYSxlLGwpfTticmVhaztjYXNlIFwiQllURVNcIjpjPWZ1bmN0aW9uKGEpe3JldHVybiBFKGEsZSl9O2JyZWFrO2Nhc2UgXCJBUlJBWUJVRkZFUlwiOnRyeXtrPW5ldyBBcnJheUJ1ZmZlcigwKX1jYXRjaChJKXt0aHJvdyBFcnJvcihcIkFSUkFZQlVGRkVSIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBlbnZpcm9ubWVudFwiKTt9Yz1mdW5jdGlvbihhKXtyZXR1cm4gRihhLGUpfTticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiZm9ybWF0IG11c3QgYmUgSEVYLCBCNjQsIEJZVEVTLCBvciBBUlJBWUJVRkZFUlwiKTt9cD1xKGEuc2xpY2UoKSxmLGgsdChtKSxlKTtmb3Ioaz0xO2s8djtrKz0xKXA9cShwLGUsMCx4KGQpLGUpO1xucmV0dXJuIGMocCl9O3RoaXMuZ2V0SE1BQz1mdW5jdGlvbihiLGcpe3ZhciBjLGssbixyO2lmKCExPT09dyl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhNQUMgd2l0aG91dCBmaXJzdCBzZXR0aW5nIEhNQUMga2V5XCIpO249QihnKTtzd2l0Y2goYil7Y2FzZSBcIkhFWFwiOmM9ZnVuY3Rpb24oYSl7cmV0dXJuIEMoYSxlLG4pfTticmVhaztjYXNlIFwiQjY0XCI6Yz1mdW5jdGlvbihhKXtyZXR1cm4gRChhLGUsbil9O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmM9ZnVuY3Rpb24oYSl7cmV0dXJuIEUoYSxlKX07YnJlYWs7Y2FzZSBcIkFSUkFZQlVGRkVSXCI6dHJ5e2M9bmV3IEFycmF5QnVmZmVyKDApfWNhdGNoKEkpe3Rocm93IEVycm9yKFwiQVJSQVlCVUZGRVIgbm90IHN1cHBvcnRlZCBieSB0aGlzIGVudmlyb25tZW50XCIpO31jPWZ1bmN0aW9uKGEpe3JldHVybiBGKGEsZSl9O2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJvdXRwdXRGb3JtYXQgbXVzdCBiZSBIRVgsIEI2NCwgQllURVMsIG9yIEFSUkFZQlVGRkVSXCIpO1xufWs9cShhLnNsaWNlKCksZixoLHQobSksZSk7cj1wKHUseChkKSk7cj1xKGssZSxsLHIsZSk7cmV0dXJuIGMocil9fWZ1bmN0aW9uIEMoZCxiLGMpe3ZhciBoPVwiXCI7Yi89ODt2YXIgYSxmO2ZvcihhPTA7YTxiO2ErPTEpZj1kW2E+Pj4yXT4+PjgqKDMrYSU0Ki0xKSxoKz1cIjAxMjM0NTY3ODlhYmNkZWZcIi5jaGFyQXQoZj4+PjQmMTUpK1wiMDEyMzQ1Njc4OWFiY2RlZlwiLmNoYXJBdChmJjE1KTtyZXR1cm4gYy5vdXRwdXRVcHBlcj9oLnRvVXBwZXJDYXNlKCk6aH1mdW5jdGlvbiBEKGQsYixjKXt2YXIgaD1cIlwiLGE9Yi84LGYsZyxtO2ZvcihmPTA7ZjxhO2YrPTMpZm9yKGc9ZisxPGE/ZFtmKzE+Pj4yXTowLG09ZisyPGE/ZFtmKzI+Pj4yXTowLG09KGRbZj4+PjJdPj4+OCooMytmJTQqLTEpJjI1NSk8PDE2fChnPj4+OCooMysoZisxKSU0Ki0xKSYyNTUpPDw4fG0+Pj44KigzKyhmKzIpJTQqLTEpJjI1NSxnPTA7ND5nO2crPTEpOCpmKzYqZzw9Yj9oKz1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5jaGFyQXQobT4+PlxuNiooMy1nKSY2Myk6aCs9Yy5iNjRQYWQ7cmV0dXJuIGh9ZnVuY3Rpb24gRShkLGIpe3ZhciBjPVwiXCIsaD1iLzgsYSxmO2ZvcihhPTA7YTxoO2ErPTEpZj1kW2E+Pj4yXT4+PjgqKDMrYSU0Ki0xKSYyNTUsYys9U3RyaW5nLmZyb21DaGFyQ29kZShmKTtyZXR1cm4gY31mdW5jdGlvbiBGKGQsYil7dmFyIGM9Yi84LGgsYT1uZXcgQXJyYXlCdWZmZXIoYyksZjtmPW5ldyBVaW50OEFycmF5KGEpO2ZvcihoPTA7aDxjO2grPTEpZltoXT1kW2g+Pj4yXT4+PjgqKDMraCU0Ki0xKSYyNTU7cmV0dXJuIGF9ZnVuY3Rpb24gQihkKXt2YXIgYj17b3V0cHV0VXBwZXI6ITEsYjY0UGFkOlwiPVwiLHNoYWtlTGVuOi0xfTtkPWR8fHt9O2Iub3V0cHV0VXBwZXI9ZC5vdXRwdXRVcHBlcnx8ITE7ITA9PT1kLmhhc093blByb3BlcnR5KFwiYjY0UGFkXCIpJiYoYi5iNjRQYWQ9ZC5iNjRQYWQpO2lmKFwiYm9vbGVhblwiIT09dHlwZW9mIGIub3V0cHV0VXBwZXIpdGhyb3cgRXJyb3IoXCJJbnZhbGlkIG91dHB1dFVwcGVyIGZvcm1hdHRpbmcgb3B0aW9uXCIpO1xuaWYoXCJzdHJpbmdcIiE9PXR5cGVvZiBiLmI2NFBhZCl0aHJvdyBFcnJvcihcIkludmFsaWQgYjY0UGFkIGZvcm1hdHRpbmcgb3B0aW9uXCIpO3JldHVybiBifWZ1bmN0aW9uIEEoZCxiKXt2YXIgYztzd2l0Y2goYil7Y2FzZSBcIlVURjhcIjpjYXNlIFwiVVRGMTZCRVwiOmNhc2UgXCJVVEYxNkxFXCI6YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcImVuY29kaW5nIG11c3QgYmUgVVRGOCwgVVRGMTZCRSwgb3IgVVRGMTZMRVwiKTt9c3dpdGNoKGQpe2Nhc2UgXCJIRVhcIjpjPWZ1bmN0aW9uKGIsYSxmKXt2YXIgZz1iLmxlbmd0aCxjLGQsZSxsLHA7aWYoMCE9PWclMil0aHJvdyBFcnJvcihcIlN0cmluZyBvZiBIRVggdHlwZSBtdXN0IGJlIGluIGJ5dGUgaW5jcmVtZW50c1wiKTthPWF8fFswXTtmPWZ8fDA7cD1mPj4+Mztmb3IoYz0wO2M8ZztjKz0yKXtkPXBhcnNlSW50KGIuc3Vic3RyKGMsMiksMTYpO2lmKGlzTmFOKGQpKXRocm93IEVycm9yKFwiU3RyaW5nIG9mIEhFWCB0eXBlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyc1wiKTtcbmw9KGM+Pj4xKStwO2ZvcihlPWw+Pj4yO2EubGVuZ3RoPD1lOylhLnB1c2goMCk7YVtlXXw9ZDw8OCooMytsJTQqLTEpfXJldHVybnt2YWx1ZTphLGJpbkxlbjo0KmcrZn19O2JyZWFrO2Nhc2UgXCJURVhUXCI6Yz1mdW5jdGlvbihjLGEsZil7dmFyIGcsZCxrPTAsZSxsLHAscSx0LG47YT1hfHxbMF07Zj1mfHwwO3A9Zj4+PjM7aWYoXCJVVEY4XCI9PT1iKWZvcihuPTMsZT0wO2U8Yy5sZW5ndGg7ZSs9MSlmb3IoZz1jLmNoYXJDb2RlQXQoZSksZD1bXSwxMjg+Zz9kLnB1c2goZyk6MjA0OD5nPyhkLnB1c2goMTkyfGc+Pj42KSxkLnB1c2goMTI4fGcmNjMpKTo1NTI5Nj5nfHw1NzM0NDw9Zz9kLnB1c2goMjI0fGc+Pj4xMiwxMjh8Zz4+PjYmNjMsMTI4fGcmNjMpOihlKz0xLGc9NjU1MzYrKChnJjEwMjMpPDwxMHxjLmNoYXJDb2RlQXQoZSkmMTAyMyksZC5wdXNoKDI0MHxnPj4+MTgsMTI4fGc+Pj4xMiY2MywxMjh8Zz4+PjYmNjMsMTI4fGcmNjMpKSxsPTA7bDxkLmxlbmd0aDtsKz0xKXt0PWsrXG5wO2ZvcihxPXQ+Pj4yO2EubGVuZ3RoPD1xOylhLnB1c2goMCk7YVtxXXw9ZFtsXTw8OCoobit0JTQqLTEpO2srPTF9ZWxzZSBpZihcIlVURjE2QkVcIj09PWJ8fFwiVVRGMTZMRVwiPT09Yilmb3Iobj0yLGU9MDtlPGMubGVuZ3RoO2UrPTEpe2c9Yy5jaGFyQ29kZUF0KGUpO1wiVVRGMTZMRVwiPT09YiYmKGw9ZyYyNTUsZz1sPDw4fGc+Pj44KTt0PWsrcDtmb3IocT10Pj4+MjthLmxlbmd0aDw9cTspYS5wdXNoKDApO2FbcV18PWc8PDgqKG4rdCU0Ki0xKTtrKz0yfXJldHVybnt2YWx1ZTphLGJpbkxlbjo4KmsrZn19O2JyZWFrO2Nhc2UgXCJCNjRcIjpjPWZ1bmN0aW9uKGIsYSxmKXt2YXIgYz0wLGQsayxlLGwscCxxLG47aWYoLTE9PT1iLnNlYXJjaCgvXlthLXpBLVowLTk9K1xcL10rJC8pKXRocm93IEVycm9yKFwiSW52YWxpZCBjaGFyYWN0ZXIgaW4gYmFzZS02NCBzdHJpbmdcIik7az1iLmluZGV4T2YoXCI9XCIpO2I9Yi5yZXBsYWNlKC9cXD0vZyxcIlwiKTtpZigtMSE9PWsmJms8Yi5sZW5ndGgpdGhyb3cgRXJyb3IoXCJJbnZhbGlkICc9JyBmb3VuZCBpbiBiYXNlLTY0IHN0cmluZ1wiKTtcbmE9YXx8WzBdO2Y9Znx8MDtxPWY+Pj4zO2ZvcihrPTA7azxiLmxlbmd0aDtrKz00KXtwPWIuc3Vic3RyKGssNCk7Zm9yKGU9bD0wO2U8cC5sZW5ndGg7ZSs9MSlkPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLmluZGV4T2YocFtlXSksbHw9ZDw8MTgtNiplO2ZvcihlPTA7ZTxwLmxlbmd0aC0xO2UrPTEpe249YytxO2ZvcihkPW4+Pj4yO2EubGVuZ3RoPD1kOylhLnB1c2goMCk7YVtkXXw9KGw+Pj4xNi04KmUmMjU1KTw8OCooMytuJTQqLTEpO2MrPTF9fXJldHVybnt2YWx1ZTphLGJpbkxlbjo4KmMrZn19O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmM9ZnVuY3Rpb24oYixhLGMpe3ZhciBkLG0sayxlLGw7YT1hfHxbMF07Yz1jfHwwO2s9Yz4+PjM7Zm9yKG09MDttPGIubGVuZ3RoO20rPTEpZD1iLmNoYXJDb2RlQXQobSksbD1tK2ssZT1sPj4+MixhLmxlbmd0aDw9ZSYmYS5wdXNoKDApLGFbZV18PWQ8PDgqKDMrbCU0Ki0xKTtcbnJldHVybnt2YWx1ZTphLGJpbkxlbjo4KmIubGVuZ3RoK2N9fTticmVhaztjYXNlIFwiQVJSQVlCVUZGRVJcIjp0cnl7Yz1uZXcgQXJyYXlCdWZmZXIoMCl9Y2F0Y2goaCl7dGhyb3cgRXJyb3IoXCJBUlJBWUJVRkZFUiBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgZW52aXJvbm1lbnRcIik7fWM9ZnVuY3Rpb24oYixhLGMpe3ZhciBkLG0sayxlLGw7YT1hfHxbMF07Yz1jfHwwO209Yz4+PjM7bD1uZXcgVWludDhBcnJheShiKTtmb3IoZD0wO2Q8Yi5ieXRlTGVuZ3RoO2QrPTEpZT1kK20saz1lPj4+MixhLmxlbmd0aDw9ayYmYS5wdXNoKDApLGFba118PWxbZF08PDgqKDMrZSU0Ki0xKTtyZXR1cm57dmFsdWU6YSxiaW5MZW46OCpiLmJ5dGVMZW5ndGgrY319O2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJmb3JtYXQgbXVzdCBiZSBIRVgsIFRFWFQsIEI2NCwgQllURVMsIG9yIEFSUkFZQlVGRkVSXCIpO31yZXR1cm4gY31mdW5jdGlvbiBuKGQsYil7cmV0dXJuIGQ8PGJ8ZD4+PjMyLWJ9ZnVuY3Rpb24gdShkLFxuYil7dmFyIGM9KGQmNjU1MzUpKyhiJjY1NTM1KTtyZXR1cm4oKGQ+Pj4xNikrKGI+Pj4xNikrKGM+Pj4xNikmNjU1MzUpPDwxNnxjJjY1NTM1fWZ1bmN0aW9uIHkoZCxiLGMsaCxhKXt2YXIgZj0oZCY2NTUzNSkrKGImNjU1MzUpKyhjJjY1NTM1KSsoaCY2NTUzNSkrKGEmNjU1MzUpO3JldHVybigoZD4+PjE2KSsoYj4+PjE2KSsoYz4+PjE2KSsoaD4+PjE2KSsoYT4+PjE2KSsoZj4+PjE2KSY2NTUzNSk8PDE2fGYmNjU1MzV9ZnVuY3Rpb24geChkKXt2YXIgYj1bXTtpZihcIlNIQS0xXCI9PT1kKWI9WzE3MzI1ODQxOTMsNDAyMzIzMzQxNywyNTYyMzgzMTAyLDI3MTczMzg3OCwzMjg1Mzc3NTIwXTtlbHNlIHRocm93IEVycm9yKFwiTm8gU0hBIHZhcmlhbnRzIHN1cHBvcnRlZFwiKTtyZXR1cm4gYn1mdW5jdGlvbiB6KGQsYil7dmFyIGM9W10saCxhLGYsZyxtLGssZTtoPWJbMF07YT1iWzFdO2Y9YlsyXTtnPWJbM107bT1iWzRdO2ZvcihlPTA7ODA+ZTtlKz0xKWNbZV09MTY+ZT9kW2VdOm4oY1tlLVxuM11eY1tlLThdXmNbZS0xNF1eY1tlLTE2XSwxKSxrPTIwPmU/eShuKGgsNSksYSZmXn5hJmcsbSwxNTE4NTAwMjQ5LGNbZV0pOjQwPmU/eShuKGgsNSksYV5mXmcsbSwxODU5Nzc1MzkzLGNbZV0pOjYwPmU/eShuKGgsNSksYSZmXmEmZ15mJmcsbSwyNDAwOTU5NzA4LGNbZV0pOnkobihoLDUpLGFeZl5nLG0sMzM5NTQ2OTc4MixjW2VdKSxtPWcsZz1mLGY9bihhLDMwKSxhPWgsaD1rO2JbMF09dShoLGJbMF0pO2JbMV09dShhLGJbMV0pO2JbMl09dShmLGJbMl0pO2JbM109dShnLGJbM10pO2JbNF09dShtLGJbNF0pO3JldHVybiBifWZ1bmN0aW9uIEgoZCxiLGMsaCl7dmFyIGE7Zm9yKGE9KGIrNjU+Pj45PDw0KSsxNTtkLmxlbmd0aDw9YTspZC5wdXNoKDApO2RbYj4+PjVdfD0xMjg8PDI0LWIlMzI7Yis9YztkW2FdPWImNDI5NDk2NzI5NTtkW2EtMV09Yi80Mjk0OTY3Mjk2fDA7Yj1kLmxlbmd0aDtmb3IoYT0wO2E8YjthKz0xNiloPXooZC5zbGljZShhLGErMTYpLGgpO3JldHVybiBofVxuXCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gcn0pOlwidW5kZWZpbmVkXCIhPT10eXBlb2YgZXhwb3J0cz8oXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9ciksZXhwb3J0cz1yKTpHLmpzU0hBPXJ9KShtZSk7XG4vL2pzU0hBIGZ1bmN0aW9uIGVuZFxuXG5leHBvcnQgZGVmYXVsdCBtZS5qc1NIQTsiLCJpbXBvcnQganNTSEEgZnJvbSAnLi9qc1NIQSc7XHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi9jb21tb24uanMnO1xyXG5cclxuXHJcbmxldCBmblRSVEMgPSAoKSA9PiBwdHgudHJ0YztcclxuXHJcbnZhciBwdHggPSB7XHJcbiAgICBzdGF0dXNDb2RlOiBjb21tb24uc3RhdHVzQ29kZSxcclxuICAgIHRpbWVvdXQ6IDMwMDAwLFxyXG4gICAgdGVtcFRpbWVUYWJsZToge30sXHJcbiAgICB0aHJvd0Vycm9yOiBmdW5jdGlvbihzdHIpeyB0aHJvdyBzdHI7fSxcclxuICAgIGZpbHRlclBhcmFtOiBmdW5jdGlvbihmaWVsZCwgb3AsIHZhbHVlLCBhbmRPcil7XHJcbiAgICAgICAgLy9maWVsZCDlj4ogdmFsdWXlj6/ngrrpmaPliJfvvIzlhbbkuK3kuIDogIXngrrpmaPliJfmmYLlsIfnlKggYW5kT3Ig6YCj5o6l77yM5L2G55W25YWp6ICF55qG54K66Zmj5YiX5pmC5b+F6ZyA6ZW35bqm5LiA6Ie05Lul5L6/6YWN5bCN6YCj5o6lXHJcbiAgICAgICAgLy9wdHguZmlsdGVyUGFyYW0oWydmZGZzZC9mZGZkJywnZmRmZC9nZmcnLCdmZ2YnXSwnPCcsWzMyNSwnZ2dnJyw5OTZdLCdBTkQnKVxyXG4gICAgICAgIGFuZE9yID0gYW5kT3IgfHwgJ29yJzsgYW5kT3IgPSBhbmRPci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciBvcE1hcCA9IHtcclxuICAgICAgICAgICAgJz0nOiAnZXEnLCAnPT0nOiAnZXEnLCAnPT09JzogJ2VxJyxcclxuICAgICAgICAgICAgJyE9JzogJ25lJywgJyE9PSc6ICduZScsXHJcbiAgICAgICAgICAgICchJzogJ25vdCcsXHJcbiAgICAgICAgICAgICc+JzogJ2d0JywgJz49JzogJ2dlJywgJzwnOiAnbHQnLCAnPD0nOiAnbGUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvcDIgPSBvcE1hcFtvcF0gfHwgb3A7XHJcbiAgICAgICAgaWYodHlwZW9mKGZpZWxkKT09J29iamVjdCcgJiYgdHlwZW9mKHZhbHVlKT09J29iamVjdCcgJiYgZmllbGQubGVuZ3RoICE9IHZhbHVlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHB0eC50aHJvd0Vycm9yKCdOb3QgZXF1YWwgbGVuZ3RoIG9mIGZpbHRlclBhcmFtIGZpbGVkIGFuZCB2YWx1ZTsnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlb2YoZmllbGQpIT0nb2JqZWN0Jyl7ZmllbGQgPSBbZmllbGRdO31cclxuICAgICAgICBpZih0eXBlb2YodmFsdWUpIT0nb2JqZWN0Jyl7dmFsdWUgPSBbdmFsdWVdO31cclxuICAgICAgICB2YXIgY250ID0gKGZpZWxkLmxlbmd0aCA+IHZhbHVlLmxlbmd0aCkgPyBmaWVsZC5sZW5ndGggOiB2YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHRtcEZpZWxkLCB0bXBWYWx1ZSwgc3RyaW5nQXJ5ID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8Y250OyBpKyspe1xyXG4gICAgICAgICAgICB0bXBGaWVsZCA9IGZpZWxkW2ldIHx8IGZpZWxkWzBdO1xyXG4gICAgICAgICAgICB0bXBWYWx1ZSA9IHZhbHVlW2ldIHx8IHZhbHVlWzBdO1xyXG4gICAgICAgICAgICBpZih0eXBlb2YodG1wVmFsdWUpPT0nc3RyaW5nJykgdG1wVmFsdWUgPSBcIidcIiArIHRtcFZhbHVlICsgXCInXCI7XHJcbiAgICAgICAgICAgIHN0cmluZ0FyeS5wdXNoKHRtcEZpZWxkICsgJyAnICsgb3AyICsgJyAnICsgdG1wVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyaW5nQXJ5LmpvaW4oJyAnICsgYW5kT3IgKyAnICcpO1xyXG4gICAgfSxcclxuICAgIGZpbHRlckZuOiBmdW5jdGlvbihwYXJhbSl7XHJcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSSgnJGZpbHRlcj0nICsgcGFyYW0pO1xyXG4gICAgfSxcclxuICAgIG9yZGVyQnlGbjogZnVuY3Rpb24oZmllbGQsIGRpcil7XHJcbiAgICAgICAgZGlyID0gKGRpciAmJiB0eXBlb2YoZGlyKT09J3N0cmluZycpID8gJyAnICsgZGlyLnRvTG93ZXJDYXNlKCkgOiAnJztcclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJKCckb3JkZXJieT0nICsgYXJndW1lbnRzWzBdICsgZGlyKTtcclxuICAgIH0sXHJcbiAgICB0b3BGbjogZnVuY3Rpb24odG9wLCBmb3JtYXRTdHIpe1xyXG4gICAgICAgIHRvcCA9IHRvcCB8fCAzMDAwO1xyXG4gICAgICAgIGZvcm1hdFN0ciA9IGZvcm1hdFN0ciB8fCAnSlNPTic7XHJcbiAgICAgICAgcmV0dXJuICckdG9wPScgKyB0b3AgKyAnJmZvcm1hdD0nICsgZm9ybWF0U3RyO1xyXG4gICAgfSxcclxuICAgIHNlbGVjdEZpZWxkRm46IGZ1bmN0aW9uKHN0cil7XHJcbiAgICAgICAgaWYodHlwZW9mKHN0cik9PSdvYmplY3QnICYmIHN0ci5sZW5ndGgpe1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuam9pbignLCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJKCckc2VsZWN0PScgKyBzdHIpO1xyXG4gICAgfSxcclxuICAgIEdldEF1dGhvcml6YXRpb25IZWFkZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIEFwcElEID0gcHR4LkFwcElEIHx8ICdGRkZGRkZGRi1GRkZGLUZGRkYtRkZGRi1GRkZGRkZGRkZGRkYnO1xyXG4gICAgICAgIHZhciBBcHBLZXkgPSBwdHguQXBwS2V5IHx8ICdGRkZGRkZGRi1GRkZGLUZGRkYtRkZGRi1GRkZGRkZGRkZGRkYnO1xyXG5cclxuICAgICAgICB2YXIgR01UU3RyaW5nID0gbmV3IERhdGUoKS50b0dNVFN0cmluZygpO1xyXG4gICAgICAgIHZhciBTaGFPYmogPSBuZXcganNTSEEoJ1NIQS0xJywgJ1RFWFQnKTtcclxuICAgICAgICBTaGFPYmouc2V0SE1BQ0tleShBcHBLZXksICdURVhUJyk7XHJcbiAgICAgICAgU2hhT2JqLnVwZGF0ZSgneC1kYXRlOiAnICsgR01UU3RyaW5nKTtcclxuICAgICAgICB2YXIgSE1BQyA9IFNoYU9iai5nZXRITUFDKCdCNjQnKTtcclxuICAgICAgICB2YXIgQXV0aG9yaXphdGlvbiA9ICdobWFjIHVzZXJuYW1lPVxcXCInICsgQXBwSUQgKyAnXFxcIiwgYWxnb3JpdGhtPVxcXCJobWFjLXNoYTFcXFwiLCBoZWFkZXJzPVxcXCJ4LWRhdGVcXFwiLCBzaWduYXR1cmU9XFxcIicgKyBITUFDICsgJ1xcXCInO1xyXG5cclxuICAgICAgICByZXR1cm4geyAnQXV0aG9yaXphdGlvbic6IEF1dGhvcml6YXRpb24sICdYLURhdGUnOiBHTVRTdHJpbmd9O1xyXG4gICAgfSxcclxuICAgIGdldFRha2VNUlRUaW1lVGFibGU6IGZ1bmN0aW9uKG1ydFBUWEFyeSwgdywgY2JGbil7XHJcbiAgICAgICAgdmFyIHJ0U3RhdHVzID0gW107XHJcbiAgICAgICAgZnVuY3Rpb24gcnVuR2V0KGFycil7XHJcbiAgICAgICAgICAgIGlmKGFyci5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICAgICAgY2JGbihydFN0YXR1cywgcHR4LnRlbXBUaW1lVGFibGUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGlmKG9iai5jb21wYW55PT0ndHJ0Yycpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBMaW5lSUQgPSBmblRSVEMoKS5nZXRMaW5lSUQob2JqLmxpbmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdGF0aW9uSUQgPSBmblRSVEMoKS5nZXRTdGF0aW9uSUQob2JqLnRha2VSYW5nZVswXSwgb2JqLmxpbmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJRCA9IGZuVFJUQygpLmdldFN0YXRpb25JRChvYmoudGFrZVJhbmdlWzFdLCBvYmoubGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm5UUlRDKCkuZ2V0U3RhdGlvblRpbWUoTGluZUlELCBbU3RhdGlvbklELHRhcmdldElEXSwgcGFyc2VJbnQodyksIGZ1bmN0aW9uKGpzb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcnRzID0ge0xpbmVJRDpMaW5lSUQsIFN0YXRpb25JRDogU3RhdGlvbklELCB0YXJnZXRJRDogdGFyZ2V0SUR9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihqc29uPT1jb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ0cy5zdGF0dXMgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnRzLm1lc3NhZ2UgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9NU0dfQ09NTV9GQUlMRUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydFN0YXR1cy5wdXNoKHJ0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5HZXQoYXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydHMuc3RhdHVzID0gY29tbW9uLkNPTlNUX1BUWF9BUElfU1VDQ0VTUztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ0U3RhdHVzLnB1c2gocnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkdldChhcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcnVuR2V0KG1ydFBUWEFyeSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0VVJMOiBmdW5jdGlvbih1cmwsIGNiRm4pe1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlcUxpc3RlbmVyKHhocil7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHtcclxuICAgICAgICAgICAgICAgIHhocjogeGhyLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeGhyLnRhcmdldC5yZXNwb25zZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHhoci50YXJnZXQucmVhZHlTdGF0ZT09NCAmJiB4aHIudGFyZ2V0LnN0YXR1cz09MjAwKXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0YXR1cyA9IGNvbW1vbi5DT05TVF9QVFhfQVBJX1NVQ0NFU1M7XHJcbiAgICAgICAgICAgICAgICBjYkZuKEpTT04ucGFyc2UoeGhyLnRhcmdldC5yZXNwb25zZSksIGV2ZW50KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdGF0dXMgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMO1xyXG4gICAgICAgICAgICAgICAgY2JGbih4aHIudGFyZ2V0LnJlc3BvbnNlLCBldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZtID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgZm0uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVxTGlzdGVuZXIpO1xyXG4gICAgICAgIGZtLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgZm0uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIHJlcUxpc3RlbmVyKTtcclxuICAgICAgICBmbS5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgZm0ub3BlbignR0VUJywgdXJsKTtcclxuICAgICAgICBmbS50aW1lb3V0ID0gcHR4LnRpbWVvdXQ7XHJcbiAgICAgICAgdmFyIGhlYWRlck9iaiA9IHRoaXMuR2V0QXV0aG9yaXphdGlvbkhlYWRlcigpO1xyXG4gICAgICAgIGZvcih2YXIgayBpbiBoZWFkZXJPYmope1xyXG4gICAgICAgICAgICBmbS5zZXRSZXF1ZXN0SGVhZGVyKGssIGhlYWRlck9ialtrXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZtLnNlbmQoKTtcclxuICAgIH0sXHJcbiAgICBnZXRQcm9taXNlVVJMOiBmdW5jdGlvbih1cmwsIGNmZz17fSl7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICBmdW5jdGlvbiByZXFMaXN0ZW5lcih4aHIpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHhocjogeGhyLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogY2ZnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0OiByZWplY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHhoci50YXJnZXQucmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHhoci50YXJnZXQucmVhZHlTdGF0ZT09NCAmJiB4aHIudGFyZ2V0LnN0YXR1cz09MjAwKXtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdGF0dXMgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9TVUNDRVNTO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEgPSBKU09OLnBhcnNlKHhoci50YXJnZXQucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RhdHVzID0gY29tbW9uLkNPTlNUX1BUWF9BUElfRkFJTDtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBmbSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBmbS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGZtLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGZtLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGZtLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1lb3V0XCIsIHJlcUxpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBjZmcubWV0aG9kIHx8ICdHRVQnO1xyXG4gICAgICAgICAgICBmbS5vcGVuKG1ldGhvZCwgdXJsKTtcclxuICAgICAgICAgICAgZm0udGltZW91dCA9IGNmZy50aW1lb3V0IHx8IHB0eC50aW1lb3V0O1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVyT2JqID0gY2ZnLmhlYWQgfHwgcHR4LkdldEF1dGhvcml6YXRpb25IZWFkZXIoKTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIGhlYWRlck9iail7XHJcbiAgICAgICAgICAgICAgICBmbS5zZXRSZXF1ZXN0SGVhZGVyKGssIGhlYWRlck9ialtrXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm0uc2VuZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0U3RhdGlvbkxpdmVJbmZvOiBmdW5jdGlvbihzdGlkLCBjYkZuKXtcclxuICAgICAgICBzdGlkID0gKHN0aWQpID8gc3RpZC5yZXBsYWNlKCd0cmFfJywnJykgOiAnMTAwOCc7XHJcbiAgICAgICAgY2JGbiA9IGNiRm4gfHwgZnVuY3Rpb24oZGF0YSl7Y29uc29sZS5pbmZvKGRhdGEpO307XHJcbiAgICAgICAgdmFyIHVybCA9IHRyYVVSTCArICcvTGl2ZUJvYXJkL1N0YXRpb24vJyArIHN0aWQgKyAnPyR0b3A9MzAmJGZvcm1hdD1KU09OJztcclxuICAgICAgICB0aGlzLmdldFVSTCh1cmwsIGNiRm4pO1xyXG4gICAgfSxcclxuICAgIGdldFN0YXRpb25Ub2RheVRpbWU6IGZ1bmN0aW9uKHN0aWQsIGNiRm4pe1xyXG4gICAgICAgIHN0aWQgPSAoc3RpZCkgPyBzdGlkLnJlcGxhY2UoJ3RyYV8nLCcnKSA6ICcxMDA4JztcclxuICAgICAgICBjYkZuID0gY2JGbiB8fCBmdW5jdGlvbihkYXRhKXtjb25zb2xlLmluZm8oZGF0YSk7fTtcclxuICAgICAgICB2YXIgdXJsID0gdHJhVVJMICsgJy9EYWlseVRpbWV0YWJsZS9TdGF0aW9uLycgKyBzdGlkICsgJy8nICsgVFQuZ29pbmdEYXRhLnRvZGF5ICsgJz8kdG9wPTMwMDAmJGZvcm1hdD1KU09OJztcclxuICAgICAgICB0aGlzLmdldFVSTCh1cmwsIGNiRm4pO1xyXG4gICAgfSxcclxuICAgIHNvcnRCeVRUU29ydFRpbWU6IGZ1bmN0aW9uKGEsYil7XHJcbiAgICAgICAgdmFyIGludEEgPSBwYXJzZUludChhLnR0X3NvcnRUaW1lLDEwKTtcclxuICAgICAgICB2YXIgaW50QiA9IHBhcnNlSW50KGIudHRfc29ydFRpbWUsMTApO1xyXG4gICAgICAgIGlmKGludEE9PWludEIpIHJldHVybiAwO1xyXG4gICAgICAgIGlmKGludEEgPCBpbnRCKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYoaW50QSA+IGludEIpIHJldHVybiAxO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdHg7XHJcblxyXG4iLCJ2YXIgcERhdGEgPSB7XG4gICAgYnVzOiB7XG4gICAgICAgIGNpdHk6IFtcbiAgICAgICAgICAgIHtuYW1lOifoh7rljJfluIInLCBDaXR5OidUYWlwZWknLCBDaXR5Q29kZTonVFBFJ30sXG4gICAgICAgICAgICB7bmFtZTon5paw5YyX5biCJywgQ2l0eTonTmV3VGFpcGVpJywgQ2l0eUNvZGU6J05XVCd9LFxuICAgICAgICAgICAge25hbWU6J+ahg+WckuW4gicsIENpdHk6J1Rhb3l1YW4nLCBDaXR5Q29kZTonVEFPJ30sXG4gICAgICAgICAgICB7bmFtZTon6Ie65Lit5biCJywgQ2l0eTonVGFpY2h1bmcnLCBDaXR5Q29kZTonVFhHJ30sXG4gICAgICAgICAgICB7bmFtZTon6Ie65Y2X5biCJywgQ2l0eTonVGFpbmFuJywgQ2l0eUNvZGU6J1ROTid9LFxuICAgICAgICAgICAge25hbWU6J+mrmOmbhOW4gicsIENpdHk6J0thb2hzaXVuZycsIENpdHlDb2RlOidLSEgnfSxcbiAgICAgICAgICAgIHtuYW1lOifln7rpmobluIInLCBDaXR5OidLZWVsdW5nJywgQ2l0eUNvZGU6J0tFRSd9LFxuICAgICAgICAgICAge25hbWU6J+aWsOerueW4gicsIENpdHk6J0hzaW5jaHUnLCBDaXR5Q29kZTonSFNaJ30sXG4gICAgICAgICAgICB7bmFtZTon5paw56u557ijJywgQ2l0eTonSHNpbmNodUNvdW50eScsIENpdHlDb2RlOidIU1EnfSxcbiAgICAgICAgICAgIHtuYW1lOifoi5fmoJfnuKMnLCBDaXR5OidNaWFvbGlDb3VudHknLCBDaXR5Q29kZTonTUlBJ30sXG4gICAgICAgICAgICB7bmFtZTon5b2w5YyW57ijJywgQ2l0eTonQ2hhbmdodWFDb3VudHknLCBDaXR5Q29kZTonQ0hBJ30sXG4gICAgICAgICAgICB7bmFtZTon5Y2X5oqV57ijJywgQ2l0eTonTmFudG91Q291bnR5JywgQ2l0eUNvZGU6J05BTid9LFxuICAgICAgICAgICAge25hbWU6J+mbsuael+e4oycsIENpdHk6J1l1bmxpbkNvdW50eScsIENpdHlDb2RlOidZVU4nfSxcbiAgICAgICAgICAgIHtuYW1lOiflmInnvqnnuKMnLCBDaXR5OidDaGlheWlDb3VudHknLCBDaXR5Q29kZTonQ1lRJ30sXG4gICAgICAgICAgICB7bmFtZTon5ZiJ576p5biCJywgQ2l0eTonQ2hpYXlpJywgQ2l0eUNvZGU6J0NZSSd9LFxuICAgICAgICAgICAge25hbWU6J+Wxj+adsee4oycsIENpdHk6J1Bpbmd0dW5nQ291bnR5JywgQ2l0eUNvZGU6J1BJRid9LFxuICAgICAgICAgICAge25hbWU6J+WunOiYree4oycsIENpdHk6J1lpbGFuQ291bnR5JywgQ2l0eUNvZGU6J0lMQSd9LFxuICAgICAgICAgICAge25hbWU6J+iKseiTrue4oycsIENpdHk6J0h1YWxpZW5Db3VudHknLCBDaXR5Q29kZTonSFVBJ30sXG4gICAgICAgICAgICB7bmFtZTon6Ie65p2x57ijJywgQ2l0eTonVGFpdHVuZ0NvdW50eScsIENpdHlDb2RlOidUVFQnfSxcbiAgICAgICAgICAgIHtuYW1lOifph5HploDnuKMnLCBDaXR5OidLaW5tZW5Db3VudHknLCBDaXR5Q29kZTonS0lOJ30sXG4gICAgICAgICAgICB7bmFtZTon5r6O5rmW57ijJywgQ2l0eTonUGVuZ2h1Q291bnR5JywgQ2l0eUNvZGU6J1BFTid9LFxuICAgICAgICAgICAge25hbWU6J+mAo+axn+e4oycsIENpdHk6J0xpZW5jaGlhbmdDb3VudHknLCBDaXR5Q29kZTonTElFJ31cbiAgICAgICAgXVxuICAgIH0sXG4gICAgdHJ0Yzoge1xuICAgICAgICBzdGF0aW9uX2FyeTogW1xuICAgICAgICAgICAgLy9CYW5uYW4gTGluZVxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzFcIiwgU3RhdGlvbklEOltcIkJMMjNcIixcIkJSMjRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTdcIiwgU3RhdGlvbklEOltcIkJMMjJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTZcIiwgU3RhdGlvbklEOltcIkJMMjFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTVcIiwgU3RhdGlvbklEOltcIkJMMjBcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTRcIiwgU3RhdGlvbklEOltcIkJMMTlcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTNcIiwgU3RhdGlvbklEOltcIkJMMThcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTJcIiwgU3RhdGlvbklEOltcIkJMMTdcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTFcIiwgU3RhdGlvbklEOltcIkJMMTZcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMTBcIiwgU3RhdGlvbklEOltcIkJMMTVcIixcIkJSMTBcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wODlcIiwgU3RhdGlvbklEOltcIkJMMTRcIixcIk8wN1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA4OFwiLCBTdGF0aW9uSUQ6W1wiQkwxM1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA4NlwiLCBTdGF0aW9uSUQ6W1wiQkwxMVwiLFwiRzEyXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDg1XCIsIFN0YXRpb25JRDpbXCJCTDEwXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDg0XCIsIFN0YXRpb25JRDpbXCJCTDA5XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDgzXCIsIFN0YXRpb25JRDpbXCJCTDA4XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDgyXCIsIFN0YXRpb25JRDpbXCJCTDA3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDgxXCIsIFN0YXRpb25JRDpbXCJCTDA2XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDgwXCIsIFN0YXRpb25JRDpbXCJCTDA1XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDc5XCIsIFN0YXRpb25JRDpbXCJCTDA0XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDc4XCIsIFN0YXRpb25JRDpbXCJCTDAzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDc3XCIsIFN0YXRpb25JRDpbXCJCTDAyXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDc2XCIsIFN0YXRpb25JRDpbXCJCTDAxXCJdfSxcbiAgICAgICAgICAgIC8vVGFtc3VpWGlueWkgTGluZVxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNzFcIiwgU3RhdGlvbklEOltcIlIyOFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA3MFwiLCBTdGF0aW9uSUQ6W1wiUjI3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDY5XCIsIFN0YXRpb25JRDpbXCJSMjZcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNjhcIiwgU3RhdGlvbklEOltcIlIyNVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA2N1wiLCBTdGF0aW9uSUQ6W1wiUjI0XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDY2XCIsIFN0YXRpb25JRDpbXCJSMjNcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNjRcIiwgU3RhdGlvbklEOltcIlIyMlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA2M1wiLCBTdGF0aW9uSUQ6W1wiUjIxXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDYyXCIsIFN0YXRpb25JRDpbXCJSMjBcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNjFcIiwgU3RhdGlvbklEOltcIlIxOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA2MFwiLCBTdGF0aW9uSUQ6W1wiUjE4XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDU5XCIsIFN0YXRpb25JRDpbXCJSMTdcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNThcIiwgU3RhdGlvbklEOltcIlIxNlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA1N1wiLCBTdGF0aW9uSUQ6W1wiUjE1XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDU2XCIsIFN0YXRpb25JRDpbXCJSMTRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTVcIiwgU3RhdGlvbklEOltcIlIxM1wiLFwiTzExXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDU0XCIsIFN0YXRpb25JRDpbXCJSMTJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTNcIiwgU3RhdGlvbklEOltcIlIxMVwiLFwiRzE0XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDUxXCIsIFN0YXRpb25JRDpbXCJSMTBcIixcIkJMMTJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTBcIiwgU3RhdGlvbklEOltcIlIwOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEzNFwiLCBTdGF0aW9uSUQ6W1wiUjA3XCIsXCJPMDZcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMDNcIiwgU3RhdGlvbklEOltcIlIwNlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAxMVwiLCBTdGF0aW9uSUQ6W1wiUjA1XCIsXCJCUjA5XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTAxXCIsIFN0YXRpb25JRDpbXCJSMDRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMDBcIiwgU3RhdGlvbklEOltcIlIwM1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA5OVwiLCBTdGF0aW9uSUQ6W1wiUjAyXCJdfSxcbiAgICAgICAgICAgIC8vWmhvbmdIZVhpbkx1IExpbmVcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDQ4XCIsIFN0YXRpb25JRDpbXCJPMDFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNDdcIiwgU3RhdGlvbklEOltcIk8wMlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA0NlwiLCBTdGF0aW9uSUQ6W1wiTzAzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDQ1XCIsIFN0YXRpb25JRDpbXCJPMDRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMzFcIiwgU3RhdGlvbklEOltcIk8wOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEzMFwiLCBTdGF0aW9uSUQ6W1wiTzEwXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTI4XCIsIFN0YXRpb25JRDpbXCJPMTJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMjdcIiwgU3RhdGlvbklEOltcIk8xM1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEyNlwiLCBTdGF0aW9uSUQ6W1wiTzE0XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTI1XCIsIFN0YXRpb25JRDpbXCJPMTVcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMjRcIiwgU3RhdGlvbklEOltcIk8xNlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEyM1wiLCBTdGF0aW9uSUQ6W1wiTzE3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTIyXCIsIFN0YXRpb25JRDpbXCJPMThcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMjFcIiwgU3RhdGlvbklEOltcIk8xOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzE4MFwiLCBTdGF0aW9uSUQ6W1wiTzIwXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTc5XCIsIFN0YXRpb25JRDpbXCJPMjFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xNzhcIiwgU3RhdGlvbklEOltcIk81MFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzE3N1wiLCBTdGF0aW9uSUQ6W1wiTzUxXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTc2XCIsIFN0YXRpb25JRDpbXCJPNTJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xNzVcIiwgU3RhdGlvbklEOltcIk81M1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzE3NFwiLCBTdGF0aW9uSUQ6W1wiTzU0XCJdfSxcbiAgICAgICAgICAgIC8vU29uZ1NoYW5YaW5EaWFuIExpbmVcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTExXCIsIFN0YXRpb25JRDpbXCJHMTlcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMTBcIiwgU3RhdGlvbklEOltcIkcxOFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEwOVwiLCBTdGF0aW9uSUQ6W1wiRzE3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDA5XCIsIFN0YXRpb25JRDpbXCJHMTZcIixcIkJSMTFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMzJcIiwgU3RhdGlvbklEOltcIkcxNVwiLFwiTzA4XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTA1XCIsIFN0YXRpb25JRDpbXCJHMTNcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNDNcIiwgU3RhdGlvbklEOltcIkcxMVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA0MlwiLCBTdGF0aW9uSUQ6W1wiRzEwXCIsXCJSMDhcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNDFcIiwgU3RhdGlvbklEOltcIkcwOVwiLFwiTzA1XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDQwXCIsIFN0YXRpb25JRDpbXCJHMDhcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzlcIiwgU3RhdGlvbklEOltcIkcwN1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAzOFwiLCBTdGF0aW9uSUQ6W1wiRzA2XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDM3XCIsIFN0YXRpb25JRDpbXCJHMDVcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzZcIiwgU3RhdGlvbklEOltcIkcwNFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAzNVwiLCBTdGF0aW9uSUQ6W1wiRzAzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDM0XCIsIFN0YXRpb25JRDpbXCJHMDJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzNcIiwgU3RhdGlvbklEOltcIkcwMVwiXX1cbiAgICAgICAgXSxcbiAgICAgICAgbGluZTogW3tcbiAgICAgICAgICAgIGlkOiAndHJ0Y18xJyxcbiAgICAgICAgICAgIExpbmVJRDogJ0JSJyxcbiAgICAgICAgICAgIHJvdXRlOiBbe1xuICAgICAgICAgICAgICAgIGRpcjogMCxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnQlItMScsIGZyb206ICdCUjAxJywgdG86ICdCUjI0J31dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGlyOiAxLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdCUi0xJywgZnJvbTogJ0JSMjQnLCB0bzogJ0JSMDEnfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAndHJ0Y18yJyxcbiAgICAgICAgICAgIExpbmVJRDogJ1InLFxuICAgICAgICAgICAgcm91dGU6IFt7XG4gICAgICAgICAgICAgICAgZGlyOiAwLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMCxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdSLTEnLCBmcm9tOiAnUjAyJywgdG86ICdSMjgnfSwge1JvdXRlSUQ6ICdSLTInLCBmcm9tOiAnUjA1JywgdG86ICdSMjInfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkaXI6IDEsXG4gICAgICAgICAgICAgICAgRGlyZWN0aW9uOiAxLFxuICAgICAgICAgICAgICAgIHdvcms6IFt7Um91dGVJRDogJ1ItMScsIGZyb206ICdSMjgnLCB0bzogJ1IwMid9LCB7Um91dGVJRDogJ1ItMicsIGZyb206ICdSMjInLCB0bzogJ1IwNSd9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd0cnRjXzMnLFxuICAgICAgICAgICAgTGluZUlEOiAnRycsXG4gICAgICAgICAgICByb3V0ZTogW3tcbiAgICAgICAgICAgICAgICBkaXI6IDAsXG4gICAgICAgICAgICAgICAgRGlyZWN0aW9uOiAwLFxuICAgICAgICAgICAgICAgIHdvcms6IFt7Um91dGVJRDogJ0ctMScsIGZyb206ICdHMDEnLCB0bzogJ0cxOSd9LCB7Um91dGVJRDogJ0ctMicsIGZyb206ICdHMDgnLCB0bzogJ0cxOSd9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRpcjogMSxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDEsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnRy0xJywgZnJvbTogJ0cxOScsIHRvOiAnRzAxJ30sIHtSb3V0ZUlEOiAnRy0yJywgZnJvbTogJ0cxOScsIHRvOiAnRzA4J31dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ3RydGNfNCcsXG4gICAgICAgICAgICBMaW5lSUQ6ICdPJyxcbiAgICAgICAgICAgIHJvdXRlOiBbe1xuICAgICAgICAgICAgICAgIGRpcjogMCxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnTy0xJywgZnJvbTogJ08wMScsIHRvOiAnTzIxJ30sIHtSb3V0ZUlEOiAnTy0yJywgZnJvbTogJ08wMScsIHRvOiAnTzU0J31dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGlyOiAxLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdPLTEnLCBmcm9tOiAnTzIxJywgdG86ICdPMDEnfSwge1JvdXRlSUQ6ICdPLTInLCBmcm9tOiAnTzU0JywgdG86ICdPMDEnfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAndHJ0Y181JyxcbiAgICAgICAgICAgIExpbmVJRDogJ0JMJyxcbiAgICAgICAgICAgIHJvdXRlOiBbe1xuICAgICAgICAgICAgICAgIGRpcjogMCxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnQkwtMScsIGZyb206ICdCTDAxJywgdG86ICdCTDIzJ30sIHtSb3V0ZUlEOiAnQkwtMicsIGZyb206ICdCTDA1JywgdG86ICdCTDIzJ31dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGlyOiAxLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdCTC0xJywgZnJvbTogJ0JMMjMnLCB0bzogJ0JMMDEnfSwge1JvdXRlSUQ6ICdCTC0yJywgZnJvbTogJ0JMMjMnLCB0bzogJ0JMMDUnfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwRGF0YTsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uLmpzJztcbmltcG9ydCBwdHggZnJvbSAnLi9wdHguanMnO1xuaW1wb3J0IHBEYXRhIGZyb20gJy4vZGF0YS5qcyc7XG5cbmxldCBidXNVUkwgPSBjb21tb24uYnVzVVJMO1xuXG52YXIgZm5CVVMgPSB7XG4gICAgc2V0RGVmYXVsdENmZzogZnVuY3Rpb24oY2ZnKXtcbiAgICAgICAgY2ZnID0gY2ZnIHx8IHt9O1xuICAgICAgICBjZmcubWFuYWdlQnkgPSBjZmcubWFuYWdlQnkgfHwgJ0NpdHknOy8vQ2l0eSAsIEludGVyQ2l0eVxuICAgICAgICBjZmcuY2JGbiA9IGNmZy5jYkZuIHx8IGZ1bmN0aW9uKGRhdGEsZSl7Y29uc29sZS5pbmZvKGRhdGEpO307XG4gICAgICAgIGNmZy5zZWxlY3RGaWVsZCA9IChjZmcuc2VsZWN0RmllbGQpID8gcHR4LnNlbGVjdEZpZWxkRm4oY2ZnLnNlbGVjdEZpZWxkKSA6ICcnO1xuICAgICAgICBjZmcudG9wID0gMzAwMDtcbiAgICAgICAgcmV0dXJuIGNmZztcbiAgICB9LFxuICAgIGdldENpdHlEYXRhOiBmdW5jdGlvbihzdHIpe1xuICAgICAgICB2YXIgYXJ5ID0gcERhdGEuYnVzLmNpdHk7XG4gICAgICAgIHZhciBydCA9IGZhbHNlO1xuICAgICAgICBmb3IodmFyIGk9MDsgaTxhcnkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYoYXJ5W2ldLm5hbWU9PXN0ciB8fCBhcnlbaV0uQ2l0eT09c3RyIHx8IGFyeVtpXS5DaXR5Q29kZT09c3RyKXtcbiAgICAgICAgICAgIHJ0ID0gYXJ5W2ldO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ0O1xuICAgIH0sXG4gICAgZ2V0QnVzQXJyaXZlVGltZTogZnVuY3Rpb24oU3RvcFVJRCwgY2l0eSwgY2ZnKXtcbiAgICAgICAgdmFyIGZpbHRlclN0ciA9IHB0eC5maWx0ZXJGbihwdHguZmlsdGVyUGFyYW0oJ1N0b3BVSUQnLCc9PScsU3RvcFVJRCwnb3InKSk7XG4gICAgICAgIHRoaXMuZ2V0RXN0aW1hdGVkVGltZU9mQXJyaXZhbChmaWx0ZXJTdHIsIGNpdHksIGNmZyk7XG4gICAgfSxcbiAgICBnZXRCdXNSb3V0ZUFycml2ZVRpbWU6IGZ1bmN0aW9uKFJvdXRlVUlELCBjZmcpe1xuICAgICAgICB2YXIgY2l0eSA9IFJvdXRlVUlELnN1YnN0cigwLDMpO1xuICAgICAgICB2YXIgZmlsdGVyU3RyID0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnUm91dGVVSUQnLCc9PScsUm91dGVVSUQsJ29yJykpO1xuICAgICAgICB0aGlzLmdldEVzdGltYXRlZFRpbWVPZkFycml2YWwoZmlsdGVyU3RyLCBjaXR5LCBjZmcpO1xuICAgIH0sXG4gICAgZ2V0QnVzUm91dGVJbmZvOiBmdW5jdGlvbihSb3V0ZVVJRCwgY2ZnKXtcbiAgICAgICAgY2ZnID0gdGhpcy5zZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgICAgIHZhciBjaXR5ID0gUm91dGVVSUQuc3Vic3RyKDAsMyk7XG4gICAgICAgIHZhciBteVVSTCA9IGJ1c1VSTCArICcvUm91dGUvJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnUm91dGVVSUQnLCc9PScsUm91dGVVSUQpICsgJyYnICsgcHR4LnRvcEZuKCkpO1xuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH0sXG4gICAgZ2V0QnVzUmVhbHRpbWVOZWFyU3RvcDogZnVuY3Rpb24oUm91dGVVSUQsIGRpciwgY2ZnKXtcbiAgICAgICAgY2ZnID0gdGhpcy5zZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgICAgIHZhciBjaXR5ID0gUm91dGVVSUQuc3Vic3RyKDAsMyk7XG4gICAgICAgIGlmKC9zdHJpbmd8bnVtYmVyLy50ZXN0KHR5cGVvZihkaXIpKSl7XG4gICAgICAgICAgICBkaXIgPSBkaXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHZhciBteVVSTCA9IGJ1c1VSTCArICcvUmVhbFRpbWVOZWFyU3RvcC8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJz8nO1xuICAgICAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbShbJ1JvdXRlVUlEJywgJ0RpcmVjdGlvbiddLCc9PScsW1JvdXRlVUlELCBkaXJdLCdhbmQnKSkgKyAnJicgKyBwdHgudG9wRm4oKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgbXlVUkwgPSBidXNVUkwgKyAnL1JlYWxUaW1lTmVhclN0b3AvJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgICAgIG15VVJMICs9IHB0eC5maWx0ZXJGbihwdHguZmlsdGVyUGFyYW0oWydSb3V0ZVVJRCddLCc9PScsW1JvdXRlVUlEXSwnYW5kJykpICsgJyYnICsgcHR4LnRvcEZuKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2ZnLnNlbGVjdEZpZWxkKSBteVVSTCArPSAnJicgKyBjZmcuc2VsZWN0RmllbGQ7XG4gICAgICAgIHB0eC5nZXRVUkwobXlVUkwsIGNmZy5jYkZuKTtcbiAgICB9LFxuICAgIGdldEJ1c1JvdXRlOiBmdW5jdGlvbihSb3V0ZVVJRCwgY2ZnLCBjaXR5KXtcbiAgICAgICAgY2ZnID0gdGhpcy5zZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgICAgIGlmKCFjaXR5KXtcbiAgICAgICAgICAgIGlmKHR5cGVvZihSb3V0ZVVJRCk9PSdzdHJpbmcnKXtjaXR5ID0gUm91dGVVSUQuc3Vic3RyKDAsMyk7fVxuICAgICAgICAgICAgZWxzZXtjaXR5ID0gUm91dGVVSURbMF0uc3Vic3RyKDAsMyk7fVxuICAgICAgICB9XG4gICAgICAgIHZhciBteVVSTCA9IGJ1c1VSTCArICcvUm91dGUvJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnUm91dGVVSUQnLCc9PScsUm91dGVVSUQpLCdvcicpICsgJyYnICsgcHR4LnRvcEZuKCk7XG4gICAgICAgIGlmKGNmZy5zZWxlY3RGaWVsZCkgbXlVUkwgKz0gJyYnICsgY2ZnLnNlbGVjdEZpZWxkO1xuICAgICAgICBwdHguZ2V0VVJMKG15VVJMLCBjZmcuY2JGbik7XG4gICAgfSxcbiAgICBnZXRCdXNTdGF0aW9uOiBmdW5jdGlvbihTdGF0aW9uSUQsIGNpdHksIGNmZyl7XG4gICAgICAgIGNmZyA9IHRoaXMuc2V0RGVmYXVsdENmZyhjZmcpO1xuICAgICAgICB2YXIgbXlVUkwgPSBidXNVUkwgKyAnL1N0YXRpb24vJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnU3RhdGlvbklEJywnPT0nLFN0YXRpb25JRC50b1N0cmluZygpKSkgKyAnJicgKyBwdHgudG9wRm4oKTtcbiAgICAgICAgaWYoY2ZnLnNlbGVjdEZpZWxkKSBteVVSTCArPSAnJicgKyBjZmcuc2VsZWN0RmllbGQ7XG4gICAgICAgIHB0eC5nZXRVUkwobXlVUkwsIGNmZy5jYkZuKTtcbiAgICB9LFxuICAgIGdldEJ1c1N0b3BSb3V0ZTogZnVuY3Rpb24oUm91dGVVSUQsIGNpdHksIGNmZyl7XG4gICAgICAgIGNmZyA9IHRoaXMuc2V0RGVmYXVsdENmZyhjZmcpO1xuICAgICAgICB2YXIgbXlVUkwgPSBidXNVUkwgKyAnL1N0b3BPZlJvdXRlLycgKyBjZmcubWFuYWdlQnkgKyAnLycgKyB0aGlzLmdldENpdHlEYXRhKGNpdHkpLkNpdHkgKyAnPyc7XG4gICAgICAgIG15VVJMICs9IHB0eC5maWx0ZXJGbihwdHguZmlsdGVyUGFyYW0oJ1JvdXRlVUlEJywnPT0nLFJvdXRlVUlELnRvU3RyaW5nKCkpKSArICcmJztcbiAgICAgICAgbXlVUkwgKz0gcHR4Lm9yZGVyQnlGbignU3ViUm91dGVOYW1lL1poX3R3JywgJ2FzYycpICsgJyYnICsgcHR4LnRvcEZuKCk7XG4gICAgICAgIGlmKGNmZy5zZWxlY3RGaWVsZCkgbXlVUkwgKz0gJyYnICsgY2ZnLnNlbGVjdEZpZWxkO1xuICAgICAgICBwdHguZ2V0VVJMKG15VVJMLCBjZmcuY2JGbik7XG4gICAgfSxcbiAgICBnZXRCdXNTdG9wUm91dGVCeU51bWJlcjogZnVuY3Rpb24oYnVzTnVtYmVyLCBjaXR5LCBjZmcpe1xuICAgICAgICBjZmcgPSB0aGlzLnNldERlZmF1bHRDZmcoY2ZnKTtcbiAgICAgICAgdmFyIG15VVJMID0gYnVzVVJMICsgJy9TdG9wT2ZSb3V0ZS8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJy8nICsgZW5jb2RlVVJJKGJ1c051bWJlcikgKyAnPyc7XG4gICAgICAgIG15VVJMICs9IHB0eC5vcmRlckJ5Rm4oJ1N1YlJvdXRlTmFtZS9aaF90dycsICdhc2MnKSArICcmJyArIHB0eC50b3BGbigpO1xuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH0sXG4gICAgZ2V0RXN0aW1hdGVkVGltZU9mQXJyaXZhbDogZnVuY3Rpb24oZmlsdGVyU3RyLCBjaXR5LCBjZmcpe1xuICAgICAgICBmaWx0ZXJTdHIgPSAoZmlsdGVyU3RyKSA/IGZpbHRlclN0ciArICcmJyA6ICcnO1xuICAgICAgICBjZmcgPSB0aGlzLnNldERlZmF1bHRDZmcoY2ZnKTtcbiAgICAgICAgdmFyIG15VVJMID0gYnVzVVJMICsgJy9Fc3RpbWF0ZWRUaW1lT2ZBcnJpdmFsLycgKyBjZmcubWFuYWdlQnkgKyAnLycgKyB0aGlzLmdldENpdHlEYXRhKGNpdHkpLkNpdHkgKyAnPyc7XG4gICAgICAgIG15VVJMICs9IGZpbHRlclN0ciArIHB0eC50b3BGbigpO1xuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH0sXG4gICAgc2VhcmNoQnVzQnlOdW1iZXI6ZnVuY3Rpb24oYnVzTnVtYmVyLCBjaXR5LCBjZmcpe1xuICAgICAgICBjZmcgPSB0aGlzLnNldERlZmF1bHRDZmcoY2ZnKTtcbiAgICAgICAgdmFyIG15VVJMID0gYnVzVVJMICsgJy9Sb3V0ZS8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJy8nICsgZW5jb2RlVVJJKGJ1c051bWJlcikgKyAnPyc7XG4gICAgICAgIG15VVJMICs9IHB0eC5vcmRlckJ5Rm4oJ1JvdXRlTmFtZS9aaF90dycsICdhc2MnKSArICcmJyArIHB0eC50b3BGbigpO1xuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZm5CVVM7IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi5qcyc7XG5pbXBvcnQgcHR4IGZyb20gJy4vcHR4LmpzJztcbmltcG9ydCBwRGF0YSBmcm9tICcuL2RhdGEuanMnO1xuXG5jb25zdCBtZXRyb1VSTCA9IGNvbW1vbi5tZXRyb1VSTDtcbmNvbnN0IHVybHMgPSB7XG4gICAgTmV0d29yazogbWV0cm9VUkwgKyAnL05ldHdvcmsnLCAvL+WPluW+l+aNt+mBi+i3r+e2suizh+aWmVxuICAgIExJTkU6IG1ldHJvVVJMICsgJy9MSU5FLycsIC8v5Y+W5b6X5o236YGL6Lev57ea5Z+65pys6LOH5paZXG4gICAgU3RhdGlvbjogbWV0cm9VUkwgKyAnL1N0YXRpb24vJywgLy/lj5blvpfmjbfpgYvou4rnq5nln7rmnKzos4fmlplcbiAgICBTdGF0aW9uT2ZMaW5lOiBtZXRyb1VSTCArICcvU3RhdGlvbk9mTGluZS8nLCAvL+WPluW+l+aNt+mBi+i3r+e3mui7iuermeWfuuacrOizh+aWmVxuICAgIExpbmVUcmFuc2ZlcjogbWV0cm9VUkwgKyAnL0xpbmVUcmFuc2Zlci8nLCAvL+WPluW+l+aNt+mBi+i3r+e3muermemWk+i9ieS5mOWfuuacrOizh+aWmVxuICAgIFN0YXRpb25GYWNpbGl0eTogbWV0cm9VUkwgKyAnL1N0YXRpb25GYWNpbGl0eS8nLCAvL+WPluW+l+aNt+mBi+i7iuermeioreaWveizh+aWmVxuICAgIFN0YXRpb25FeGl0OiBtZXRyb1VSTCArICcvU3RhdGlvbkV4aXQvJywgLy/lj5blvpfmjbfpgYvou4rnq5nlh7rlhaXlj6Pln7rmnKzos4fmlplcbiAgICBSb3V0ZTogbWV0cm9VUkwgKyAnL1JvdXRlLycsIC8v5Y+W5b6X5o236YGL54ef6YGL6Lev57ea5Z+65pys6LOH5paZXG4gICAgU3RhdGlvbk9mUm91dGU6IG1ldHJvVVJMICsgJy9TdGF0aW9uT2ZSb3V0ZS8nLCAvL+WPluW+l+aNt+mBi+eHn+mBi+i3r+e3mui7iuermeWfuuacrOizh+aWmVxuICAgIEZpcnN0TGFzdFRpbWV0YWJsZTogbWV0cm9VUkwgKyAnL0ZpcnN0TGFzdFRpbWV0YWJsZS8nLCAvL+WPluW+l+aNt+mBi+mmluacq+ePrei7iuaZguWIu+ihqOizh+aWmVxuICAgIEZyZXF1ZW5jeTogbWV0cm9VUkwgKyAnL0ZyZXF1ZW5jeS8nLCAvL+WPluW+l+aNt+mBi+i3r+e3mueZvOi7iuePrei3nemgu+eOh+izh+aWmVxuICAgIFMyU1RyYXZlbFRpbWU6IG1ldHJvVVJMICsgJy9TMlNUcmF2ZWxUaW1lLycsIC8v5Y+W5b6X5o236YGL5YiX6LuK56uZ6ZaT6YGL6KGM5pmC6ZaT6LOH5paZXG4gICAgT0RGYXJlOiBtZXRyb1VSTCArICcvT0RGYXJlLycsIC8v5Y+W5b6X5o236YGL6LW36L+E56uZ6ZaT56Wo5YO56LOH5paZXG4gICAgTGl2ZUJvYXJkOiBtZXRyb1VSTCArICcvTGl2ZUJvYXJkLycsIC8v5Y+W5b6X5o236YGL6LW36L+E56uZ6ZaT56Wo5YO56LOH5paZXG4gICAgU3RhdGlvblRpbWVUYWJsZTogbWV0cm9VUkwgKyAnL1N0YXRpb25UaW1lVGFibGUvJywgLy/lj5blvpfmjbfpgYvnq5nliKXmmYLliLvooajos4fmlplcbiAgICBTaGFwZTogbWV0cm9VUkwgKyAnL1NoYXBlLycgLy/lj5blvpfmjIflrprnh5/pgYvmpa3ogIXkuYvou4zpgZPot6/ntrLlr6bpq5Tot6/nt5rlnJbos4fos4fmlplcbn1cbmNvbnN0IGNvbXBhbnlUYWcgPSB7XG4gICAgdHJ0YzogJ1RSVEMnLFxuICAgIHR5bWV0cm86ICdUWU1DJyxcbiAgICBrbHJ0OiAnS0xSVCcsXG4gICAga3J0YzogJ0tSVEMnXG59XG5cbmxldCBnZXRQVFggPSBwdHguZ2V0UHJvbWlzZVVSTDtcblxuZnVuY3Rpb24gc2V0RGVmYXVsdENmZyhjZmc9e30pe1xuICAgIGlmKHR5cGVvZihjZmcpPT0nc3RyaW5nJykgY2ZnID0ge3BhcmFtRGlyZWN0bHlVc2U6IGNmZ307Ly/oi6XlgrPlhaXnmoTngrrlrZfkuLLku6Pooajnm7TmjqXnlKjmlrzmnIDlvoznmoTlj4PmlbjkuI3pnIDlho3oqr/mlbRcbiAgICBjZmcuY2JGbiA9IGNmZy5jYkZuIHx8IGZ1bmN0aW9uKGRhdGEsZSl7fTtcbiAgICBjZmcuc2VsZWN0RmllbGQgPSAoY2ZnLnNlbGVjdEZpZWxkKSA/IHB0eC5zZWxlY3RGaWVsZEZuKGNmZy5zZWxlY3RGaWVsZCkgOiAnJztcbiAgICBjZmcudG9wID0gMzAwMDtcbiAgICBjZmcuZm9ybWF0ID0gJ0pTT04nO1xuICAgIHJldHVybiBjZmc7XG59XG5mdW5jdGlvbiBwcm9jZXNzQ2ZnKGNmZyl7Ly/lsIcgY2ZnIOi9ieeCuuWwjeaHieeahOWPg+aVuFxuICAgIGlmKGNmZy5wYXJhbURpcmVjdGx5VXNlKSByZXR1cm4gY2ZnLnBhcmFtRGlyZWN0bHlVc2U7XG4gICAgdmFyIGFyeVBhcmFtID0gW107XG4gICAgaWYoY2ZnLnNlbGVjdEZpZWxkKSBhcnlQYXJhbS5wdXNoKHB0eC5zZWxlY3RGaWVsZEZuKGNmZy5zZWxlY3RGaWVsZCkpO1xuICAgIGlmKGNmZy5maWx0ZXJCeSkgYXJ5UGFyYW0ucHVzaChwdHguZmlsdGVyRm4oY2ZnLmZpbHRlckJ5KSk7XG4gICAgaWYoY2ZnLm9yZGVyQnkpe1xuICAgICAgICB2YXIgZGlyID0gY2ZnLm9yZGVyRGlyIHx8ICdhc2MnO1xuICAgICAgICBhcnlQYXJhbS5wdXNoKHB0eC5vcmRlckJ5Rm4oY2ZnLm9yZGVyQnksIGRpcikpO1xuICAgIH1cbiAgICBhcnlQYXJhbS5wdXNoKHB0eC50b3BGbihjZmcudG9wLCBjZmcuZm9ybWF0KSk7Ly/mnIDlvozliqDpgJnlgItcblxuICAgIHJldHVybiAnPycgKyBhcnlQYXJhbS5qb2luKCcmJyk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBhbnlUYWcobmFtZSl7IHJldHVybiBjb21wYW55VGFnW25hbWVdIHx8IG5hbWU7IH1cblxuZnVuY3Rpb24gX0xJTkUoY29tcGFueVRhZywgY2ZnKXtcbiAgICBjZmcgPSBzZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgdmFyIHBhcmFtID0gcHJvY2Vzc0NmZyhjZmcpO1xuICAgIHJldHVybiBnZXRQVFgodXJscy5MSU5FICsgY29tcGFueVRhZyArIHBhcmFtKTtcbn1cblxudmFyIG1ldHJvID0ge1xuICAgIGdldENvbXBhbnlUYWc6IGdldENvbXBhbnlUYWcsXG4gICAgX0xJTkU6IF9MSU5FLFxuICAgIHVybHM6IHVybHMsXG4gICAgY29tcGFueVRhZzogY29tcGFueVRhZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZXRybzsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uLmpzJztcbmltcG9ydCBwdHggZnJvbSAnLi9wdHguanMnO1xuaW1wb3J0IHBEYXRhIGZyb20gJy4vZGF0YS5qcyc7XG5pbXBvcnQgbWV0cm8gZnJvbSAnLi9tZXRyby5qcyc7XG5cbmNvbnN0IGNvbXBhbnlUYWcgPSBtZXRyby5nZXRDb21wYW55VGFnKCd0cnRjJyk7XG5cbmZ1bmN0aW9uIHRlc3RGZXRjaChjbWQpe1xuICAgIGlmKHR5cGVvZihmblRSVENbY21kXSk9PSdmdW5jdGlvbicpe1xuICAgICAgICByZXR1cm4gZm5UUlRDW2NtZF0oKS50aGVuKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGUpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhlKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5mdW5jdGlvbiBfTElORShjZmcpe1xuICAgIHJldHVybiBtZXRyby5fTElORShjb21wYW55VGFnLCBjZmcpO1xufVxuXG52YXIgZm5UUlRDID0ge1xuICAgIGNoZWNrUm91dGVJZE9uVXNlOiBmdW5jdGlvbihSb3V0ZUlELCBMaW5lSUQpe1xuICAgICAgICB2YXIgbGluZURhdGEgPSB0aGlzLmdldExpbmVEYXRhKExpbmVJRCk7XG4gICAgICAgIHZhciBydCA9IGZhbHNlO1xuICAgICAgICBmb3IodmFyIGk9MDsgaTxsaW5lRGF0YS5yb3V0ZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBmb3IodmFyIGo9MDsgajxsaW5lRGF0YS5yb3V0ZVtpXS53b3JrLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICBpZihsaW5lRGF0YS5yb3V0ZVtpXS53b3JrW2pdLlJvdXRlSUQ9PVJvdXRlSUQpe1xuICAgICAgICAgICAgICAgICAgICBydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcnQ7XG4gICAgfSxcbiAgICBnZXRMaW5lRGF0YTogZnVuY3Rpb24oaWQpe1xuICAgICAgICB2YXIgcnQgPSBmYWxzZTtcbiAgICAgICAgcERhdGEudHJ0Yy5saW5lLmZvckVhY2goZnVuY3Rpb24oYyl7XG4gICAgICAgICAgICBpZihjLmlkPT1pZCB8fCBjLkxpbmVJRD09aWQpe1xuICAgICAgICAgICAgICAgIHJ0ID0gYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBydDtcbiAgICB9LFxuICAgIGdldExpbmVJRDogZnVuY3Rpb24oaWQpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRMaW5lRGF0YShpZCkuTGluZUlEO1xuICAgIH0sXG4gICAgZ2V0T3JpZ2luYWxMaW5lQnlMaW5lSUQ6IGZ1bmN0aW9uKExpbmVJRCl7XG4gICAgICAgIHZhciBydCA9IGZhbHNlO1xuICAgICAgICBwRGF0YS50cnRjLmxpbmUuZm9yRWFjaChmdW5jdGlvbihjKXtcbiAgICAgICAgICAgIGlmKGMuTGluZUlEPT1MaW5lSUQpe1xuICAgICAgICAgICAgICAgIHJ0ID0gYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBydDtcbiAgICB9LFxuICAgIGdldFN0YXRpb25JREFyeTogZnVuY3Rpb24oaWQpe1xuICAgICAgICB2YXIgYXJ5ID0gcERhdGEudHJ0Yy5zdGF0aW9uX2FyeTtcbiAgICAgICAgdmFyIHN0RGF0YSA9IGZhbHNlO1xuICAgICAgICBmb3IodmFyIGk9MDsgaTxhcnkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYoYXJ5W2ldLmlkPT1pZCl7XG4gICAgICAgICAgICAgICAgc3REYXRhID0gYXJ5W2ldLlN0YXRpb25JRDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3REYXRhO1xuICAgIH0sXG4gICAgZ2V0U3RhdGlvbklEOiBmdW5jdGlvbihpZCwgbGluZU9yaWdpbmFsSUQpe1xuICAgICAgICB2YXIgTGluZUlEID0gKC9edHJ0Yy8udGVzdChsaW5lT3JpZ2luYWxJRCkpID8gdGhpcy5nZXRMaW5lSUQobGluZU9yaWdpbmFsSUQpIDogbGluZU9yaWdpbmFsSUQ7XG4gICAgICAgIHZhciBzdERhdGEgPSB0aGlzLmdldFN0YXRpb25JREFyeShpZCk7XG4gICAgICAgIGlmKCFMaW5lSUQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBydCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxpbmVDb2RlID0gJycsXG4gICAgICAgICAgICAgICAgY29kZUxlbiA9IDA7XG4gICAgICAgICAgICBzdERhdGEuZm9yRWFjaChmdW5jdGlvbihjKXtcbiAgICAgICAgICAgICAgICBpZigvXlthLXpBLVpdezF9XFxkezJ9L2dpLnRlc3QoYykpe1xuICAgICAgICAgICAgICAgICAgICBjb2RlTGVuID0gMTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZigvXlthLXpBLVpdezJ9XFxkezJ9L2dpLnRlc3QoYykpe1xuICAgICAgICAgICAgICAgICAgICBjb2RlTGVuID0gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGluZUNvZGUgPSBjLnN1YnN0cigwLCBjb2RlTGVuKTtcbiAgICAgICAgICAgICAgICBpZihsaW5lQ29kZSA9PSBMaW5lSUQpe1xuICAgICAgICAgICAgICAgICAgICBydCA9IGM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcnQ7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0YXRpb25JREluV2hhdExpbmU6IGZ1bmN0aW9uKFN0YXRpb2luSUQpe1xuICAgICAgICBpZigvXlthLXpBLVpdezF9XFxkezJ9L2dpLnRlc3QoU3RhdGlvaW5JRCkpe1xuICAgICAgICAgICAgcmV0dXJuIFN0YXRpb2luSUQuc3Vic3RyKDAsMSk7XG4gICAgICAgIH1lbHNlIGlmKC9eW2EtekEtWl17Mn1cXGR7Mn0vZ2kudGVzdChTdGF0aW9pbklEKSl7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGlvaW5JRC5zdWJzdHIoMCwyKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3RhdGlvblRpbWU6IGZ1bmN0aW9uKExpbmVJRCwgU3RhdGlvbklELCB3LCBjYkZuKXtcbiAgICAgICAgdmFyIHRhcmdldElEID0gZmFsc2U7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIGlmKHR5cGVvZihTdGF0aW9uSUQpIT0nc3RyaW5nJyAmJiBTdGF0aW9uSUQubGVuZ3RoPT0yKXtcbiAgICAgICAgICAgIHRhcmdldElEID0gU3RhdGlvbklEWzFdO1xuICAgICAgICAgICAgU3RhdGlvbklEID0gU3RhdGlvbklEWzBdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBXZWVrID0gZmFsc2U7XG4gICAgICAgIGlmKHR5cGVvZih3KT09J251bWJlcicpIFdlZWsgPSBjb21tb24ucHR4TVJUV2Vla1N0clt3XTtcbiAgICAgICAgdmFyIG10U3RyID0gXCIkZmlsdGVyPUxpbmVJRCBlcSAnXCIgKyBMaW5lSUQgKyBcIicgYW5kIFN0YXRpb25JRCBlcSAnXCIgKyBTdGF0aW9uSUQgKyBcIidcIjtcbiAgICAgICAgaWYoV2VlaykgbXRTdHIgKz0gJyBhbmQgU2VydmljZURheXMvJyArIFdlZWsgKyAnIGVxIHRydWUnO1xuICAgICAgICB2YXIgdXJsID0gY29tbW9uLm1ldHJvVVJMICsgJy9TdGF0aW9uVGltZVRhYmxlL1RSVEM/JyArIGVuY29kZVVSSShtdFN0cikgKyAnJiR0b3A9MzAwMCYkZm9ybWF0PUpTT04nO1xuICAgICAgICBjb21tb24ucHVpLnByaW50U3RhdHVzKCfnt5rkuIrlsIvmib7mjbfpgYsgJyArIFN0YXRpb25JRCArICcg56uZ5pmC5Yi76KGoJyk7XG4gICAgICAgIC8v55Si55Sf5pqr5a2Y5pmC5Yi76KGo56m66ZaTXG4gICAgICAgIGlmKCFwdHgudGVtcFRpbWVUYWJsZS50cnRjKSBwdHgudGVtcFRpbWVUYWJsZS50cnRjID0ge307XG4gICAgICAgIGlmKCFwdHgudGVtcFRpbWVUYWJsZS50cnRjW0xpbmVJRF0pIHB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXSA9IFtdO1xuICAgICAgICBpZighcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF0pIHB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdID0gW107XG4gICAgICAgIHB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddID0gW1tdLFtdXTsvL0RpcmVjdGlvbiAwIGFuZCAxXG4gICAgICAgIC8v5oqT5pmC5Yi76KGoXG4gICAgICAgIHB0eC5nZXRVUkwodXJsLCBmdW5jdGlvbihqc29uLCBlKXtcbiAgICAgICAgICAgIGlmKGUuc3RhdHVzPT1jb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMKXtcbiAgICAgICAgICAgICAgICBjYkZuKGpzb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzb24uZm9yRWFjaChmdW5jdGlvbihyb3V0ZUEpe1xuICAgICAgICAgICAgICAgIHZhciB0bXBBcnkgPSBwdHgudGVtcFRpbWVUYWJsZS50cnRjW0xpbmVJRF1bU3RhdGlvbklEXVt3XTtcbiAgICAgICAgICAgICAgICB2YXIgdG1wVGltZUFyeSA9IHJvdXRlQS5UaW1ldGFibGVzLm1hcChmdW5jdGlvbih0aW1lT2JqKXtcbiAgICAgICAgICAgICAgICAgICAgdGltZU9iai50dF9zb3J0VGltZSA9IFRULmZuLnRyYW5zVGltZTJTZWModGltZU9iai5EZXBhcnR1cmVUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZU9iai5Sb3V0ZUlEID0gcm91dGVBLlJvdXRlSUQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aW1lT2JqO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmKG1lLmNoZWNrUm91dGVJZE9uVXNlKHJvdXRlQS5Sb3V0ZUlELCByb3V0ZUEuTGluZUlEKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJvdXRlQS5EaXJlY3Rpb24gPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnlbMF0gPSB0bXBBcnlbMF0uY29uY2F0KHRtcFRpbWVBcnkpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihyb3V0ZUEuRGlyZWN0aW9uID09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wQXJ5WzFdID0gdG1wQXJ5WzFdLmNvbmNhdCh0bXBUaW1lQXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgd29ya0FyeSA9IHB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddO1xuICAgICAgICAgICAgdmFyIHRpbWVNYWtlRm4gPSBmdW5jdGlvbihjKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5EZXBhcnR1cmVUaW1lO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdvcmtBcnlbMF0gPSB3b3JrQXJ5WzBdLnNvcnQocHR4LnNvcnRCeVRUU29ydFRpbWUpO1xuICAgICAgICAgICAgLy/lnKjpgJnkuIDmraXkuYvliY3pg73pgoTmmK/nianku7bni4DmhYvmmYLliLvooajvvIzkuYvlvozmmqvmmYLmlLnpgKDmiJDllq7kuIDmmYLliLvooajmm7/mj5sgcm53VGltZVRhYmxlXG4gICAgICAgICAgICB3b3JrQXJ5WzBdID0gd29ya0FyeVswXS5tYXAodGltZU1ha2VGbik7XG4gICAgICAgICAgICB3b3JrQXJ5WzFdID0gd29ya0FyeVsxXS5zb3J0KHB0eC5zb3J0QnlUVFNvcnRUaW1lKTtcbiAgICAgICAgICAgIHdvcmtBcnlbMV0gPSB3b3JrQXJ5WzFdLm1hcCh0aW1lTWFrZUZuKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2JGbihqc29uKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRGb3JtYXRTdGF0aW9uVGltZTogZnVuY3Rpb24oc3RJRCwgbGluZSwgZGlyLCB3KXtcbiAgICAgICAgdyA9IHBhcnNlSW50KHcpO1xuICAgICAgICB2YXIgU3RhdGlvbklEID0gcHR4LnRydGMuZ2V0U3RhdGlvbklEKHN0SUQsIGxpbmUpO1xuICAgICAgICB2YXIgTGluZUlEID0gcHR4LnRydGMuZ2V0TGluZUlEKGxpbmUpO1xuICAgICAgICB2YXIgcnQgPSBmYWxzZTtcbiAgICAgICAgaWYoIXB0eC50ZW1wVGltZVRhYmxlLnRydGMpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIXB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIXB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFwdHgudGVtcFRpbWVUYWJsZS50cnRjW0xpbmVJRF1bU3RhdGlvbklEXVt3XVtkaXJdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKHB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddW2Rpcl0ubGVuZ3RoPT0wKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBwdHgudGVtcFRpbWVUYWJsZS50cnRjW0xpbmVJRF1bU3RhdGlvbklEXVt3XVtkaXJdO1xuICAgIH0sXG4gICAgZ2V0T3JpZ2luYWxTdGF0aW9uSUQ6IGZ1bmN0aW9uKFN0YXRpb25JRCl7XG4gICAgICAgIHZhciBhcnkgPSBwRGF0YS50cnRjLnN0YXRpb25fYXJ5O1xuICAgICAgICB2YXIgc3REYXRhID0gZmFsc2U7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGFyeS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihhcnlbaV0uU3RhdGlvbklELmluZGV4T2YoU3RhdGlvbklEKSE9LTEpe1xuICAgICAgICAgICAgICAgIHN0RGF0YSA9IGFyeVtpXS5pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3REYXRhO1xuICAgIH0sXG4gICAgX0xJTkU6IF9MSU5FLFxuICAgIHRlc3RGZXRjaDogdGVzdEZldGNoXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZuVFJUQzsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uLmpzJztcbmltcG9ydCBwdHggZnJvbSAnLi9wdHguanMnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhLmpzJztcbmltcG9ydCBidXMgZnJvbSAnLi9idXMuanMnO1xuaW1wb3J0IG1ldHJvIGZyb20gJy4vbWV0cm8uanMnO1xuaW1wb3J0IHRydGMgZnJvbSAnLi90cnRjLmpzJztcbmltcG9ydCBqc1NIQSBmcm9tICcuL2pzU0hBJztcblxuXG52YXIgaW5Ccm93c2VyID0gY29tbW9uLmluQnJvd3NlcjtcblxuXG52YXIgY29tYmluZSA9IHtcblx0ZGF0YTogZGF0YSxcblx0YnVzOiBidXMsXG5cdG1ldHJvOiBtZXRybyxcblx0dHJ0YzogdHJ0Yyxcblx0anNTSEE6IGpzU0hBLFxuXHRjb21tb246IGNvbW1vblxufVxuZm9yKHZhciBrIGluIGNvbWJpbmUpe1xuXHRwdHhba10gPSBjb21iaW5lW2tdO1xufVxuXG5pZihpbkJyb3dzZXIgJiYgIXdpbmRvdy5yb2NwdHgpe1xuXHR3aW5kb3cucm9jcHR4ID0gcHR4O1xuXHRpZighd2luZG93LlByb21pc2UpIGNvbnNvbGUubG9nKFwiUFRYIGxpYnJhcnkgbmVlZCBQcm9taXNlLCBwbGVhc2UgaW5jbHVkZSBhIFByb21pc2UgcG9seWZpbGwuXCIpXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgcHR4O1xuIl0sIm5hbWVzIjpbIkNNIiwiaW5Ccm93c2VyIiwid2luZG93IiwiZG9jdW1lbnQiLCJzdGF0dXNDb2RlIiwiU1VDQ0VTUyIsIkZBSUwiLCJDT05TVF9QVFhfQVBJX1NVQ0NFU1MiLCJDT05TVF9QVFhfQVBJX0ZBSUwiLCJDT05TVF9QVFhfQVBJX01TR19DT01NX0ZBSUxFRCIsInYydXJsIiwicHR4VVJMIiwibWV0cm9VUkwiLCJidXNVUkwiLCJ0cmFVUkwiLCJwdHhNUlRXZWVrU3RyIiwicHVpIiwicHJpbnRTdGF0dXMiLCJUVCIsInVpIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtc2ciLCJzaG93IiwiYWxlcnQiLCJtYXNrIiwidW5tYXNrIiwibWUiLCJHIiwiciIsImQiLCJiIiwiYyIsImgiLCJhIiwiZiIsImciLCJtIiwiayIsImUiLCJsIiwicCIsInEiLCJ0IiwidyIsIm4iLCJ1IiwidiIsImVuY29kaW5nIiwibnVtUm91bmRzIiwicGFyc2VJbnQiLCJFcnJvciIsInoiLCJIIiwic2xpY2UiLCJBIiwieCIsInNldEhNQUNLZXkiLCJiaW5MZW4iLCJ2YWx1ZSIsImxlbmd0aCIsInB1c2giLCJ1cGRhdGUiLCJnZXRIYXNoIiwiQiIsIkMiLCJEIiwiRSIsIkFycmF5QnVmZmVyIiwiSSIsIkYiLCJnZXRITUFDIiwiY2hhckF0Iiwib3V0cHV0VXBwZXIiLCJ0b1VwcGVyQ2FzZSIsImI2NFBhZCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIlVpbnQ4QXJyYXkiLCJzaGFrZUxlbiIsImhhc093blByb3BlcnR5Iiwic3Vic3RyIiwiaXNOYU4iLCJjaGFyQ29kZUF0Iiwic2VhcmNoIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJieXRlTGVuZ3RoIiwieSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJqc1NIQSIsImZuVFJUQyIsInB0eCIsInRydGMiLCJjb21tb24iLCJ0aW1lb3V0IiwidGVtcFRpbWVUYWJsZSIsInRocm93RXJyb3IiLCJzdHIiLCJmaWx0ZXJQYXJhbSIsImZpZWxkIiwib3AiLCJhbmRPciIsInRvTG93ZXJDYXNlIiwib3BNYXAiLCJvcDIiLCJjbnQiLCJ0bXBGaWVsZCIsInRtcFZhbHVlIiwic3RyaW5nQXJ5IiwiaSIsImpvaW4iLCJmaWx0ZXJGbiIsInBhcmFtIiwiZW5jb2RlVVJJIiwib3JkZXJCeUZuIiwiZGlyIiwidG9wRm4iLCJ0b3AiLCJmb3JtYXRTdHIiLCJzZWxlY3RGaWVsZEZuIiwiR2V0QXV0aG9yaXphdGlvbkhlYWRlciIsIkFwcElEIiwiQXBwS2V5IiwiR01UU3RyaW5nIiwiRGF0ZSIsInRvR01UU3RyaW5nIiwiU2hhT2JqIiwiSE1BQyIsIkF1dGhvcml6YXRpb24iLCJnZXRUYWtlTVJUVGltZVRhYmxlIiwibXJ0UFRYQXJ5IiwiY2JGbiIsInJ0U3RhdHVzIiwicnVuR2V0IiwiYXJyIiwib2JqIiwic2hpZnQiLCJjb21wYW55IiwiTGluZUlEIiwiZ2V0TGluZUlEIiwibGluZSIsIlN0YXRpb25JRCIsImdldFN0YXRpb25JRCIsInRha2VSYW5nZSIsInRhcmdldElEIiwiZ2V0U3RhdGlvblRpbWUiLCJqc29uIiwicnRzIiwic3RhdHVzIiwibWVzc2FnZSIsImdldFVSTCIsInVybCIsInJlcUxpc3RlbmVyIiwieGhyIiwiZXZlbnQiLCJkYXRhIiwidGFyZ2V0IiwicmVzcG9uc2UiLCJyZWFkeVN0YXRlIiwiSlNPTiIsInBhcnNlIiwiZm0iLCJYTUxIdHRwUmVxdWVzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcGVuIiwiaGVhZGVyT2JqIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJnZXRQcm9taXNlVVJMIiwiY2ZnIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb25maWciLCJtZXRob2QiLCJoZWFkIiwiZ2V0U3RhdGlvbkxpdmVJbmZvIiwic3RpZCIsImNvbnNvbGUiLCJpbmZvIiwiZ2V0U3RhdGlvblRvZGF5VGltZSIsImdvaW5nRGF0YSIsInRvZGF5Iiwic29ydEJ5VFRTb3J0VGltZSIsImludEEiLCJ0dF9zb3J0VGltZSIsImludEIiLCJwRGF0YSIsImJ1cyIsImNpdHkiLCJuYW1lIiwiQ2l0eSIsIkNpdHlDb2RlIiwic3RhdGlvbl9hcnkiLCJpZCIsInJvdXRlIiwiRGlyZWN0aW9uIiwid29yayIsIlJvdXRlSUQiLCJmcm9tIiwidG8iLCJmbkJVUyIsInNldERlZmF1bHRDZmciLCJtYW5hZ2VCeSIsInNlbGVjdEZpZWxkIiwiZ2V0Q2l0eURhdGEiLCJhcnkiLCJydCIsImdldEJ1c0Fycml2ZVRpbWUiLCJTdG9wVUlEIiwiZmlsdGVyU3RyIiwiZ2V0RXN0aW1hdGVkVGltZU9mQXJyaXZhbCIsImdldEJ1c1JvdXRlQXJyaXZlVGltZSIsIlJvdXRlVUlEIiwiZ2V0QnVzUm91dGVJbmZvIiwibXlVUkwiLCJnZXRCdXNSZWFsdGltZU5lYXJTdG9wIiwidGVzdCIsInRvU3RyaW5nIiwiZ2V0QnVzUm91dGUiLCJnZXRCdXNTdGF0aW9uIiwiZ2V0QnVzU3RvcFJvdXRlIiwiZ2V0QnVzU3RvcFJvdXRlQnlOdW1iZXIiLCJidXNOdW1iZXIiLCJzZWFyY2hCdXNCeU51bWJlciIsInVybHMiLCJOZXR3b3JrIiwiTElORSIsIlN0YXRpb24iLCJTdGF0aW9uT2ZMaW5lIiwiTGluZVRyYW5zZmVyIiwiU3RhdGlvbkZhY2lsaXR5IiwiU3RhdGlvbkV4aXQiLCJSb3V0ZSIsIlN0YXRpb25PZlJvdXRlIiwiRmlyc3RMYXN0VGltZXRhYmxlIiwiRnJlcXVlbmN5IiwiUzJTVHJhdmVsVGltZSIsIk9ERmFyZSIsIkxpdmVCb2FyZCIsIlN0YXRpb25UaW1lVGFibGUiLCJTaGFwZSIsImNvbXBhbnlUYWciLCJ0eW1ldHJvIiwia2xydCIsImtydGMiLCJnZXRQVFgiLCJwYXJhbURpcmVjdGx5VXNlIiwiZm9ybWF0IiwicHJvY2Vzc0NmZyIsImFyeVBhcmFtIiwiZmlsdGVyQnkiLCJvcmRlckJ5Iiwib3JkZXJEaXIiLCJnZXRDb21wYW55VGFnIiwiX0xJTkUiLCJtZXRybyIsInRlc3RGZXRjaCIsImNtZCIsInRoZW4iLCJjYXRjaCIsImNoZWNrUm91dGVJZE9uVXNlIiwibGluZURhdGEiLCJnZXRMaW5lRGF0YSIsImoiLCJmb3JFYWNoIiwiZ2V0T3JpZ2luYWxMaW5lQnlMaW5lSUQiLCJnZXRTdGF0aW9uSURBcnkiLCJzdERhdGEiLCJsaW5lT3JpZ2luYWxJRCIsImxpbmVDb2RlIiwiY29kZUxlbiIsImdldFN0YXRpb25JREluV2hhdExpbmUiLCJTdGF0aW9pbklEIiwiV2VlayIsIm10U3RyIiwicm91dGVBIiwidG1wQXJ5IiwidG1wVGltZUFyeSIsIlRpbWV0YWJsZXMiLCJtYXAiLCJ0aW1lT2JqIiwiZm4iLCJ0cmFuc1RpbWUyU2VjIiwiRGVwYXJ0dXJlVGltZSIsImNvbmNhdCIsIndvcmtBcnkiLCJ0aW1lTWFrZUZuIiwic29ydCIsImdldEZvcm1hdFN0YXRpb25UaW1lIiwic3RJRCIsImdldE9yaWdpbmFsU3RhdGlvbklEIiwiY29tYmluZSIsInJvY3B0eCIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFDQSxJQUFJQSxFQUFFLEdBQUc7RUFDTEMsRUFBQUEsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPQyxNQUFQLElBQWdCLFdBQWhC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
