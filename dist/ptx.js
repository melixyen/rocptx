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
    inBrowser: !!(typeof window != 'undefined' && window.document),
    clone: function clone(objA) {
      return JSON.parse(JSON.stringify(objA));
    }
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
      var dir = cfg.orderDir || false;
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

  function _StationOfLine(companyTag, cfg) {
    cfg = setDefaultCfg(cfg);
    var param = processCfg(cfg);
    return getPTX(urls.StationOfLine + companyTag + param);
  }

  var metro = {
    getCompanyTag: getCompanyTag,
    _LINE: _LINE,
    _StationOfLine: _StationOfLine,
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

  function _StationOfLine$1(cfg) {
    return metro._StationOfLine(companyTag$1, cfg);
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
    _StationOfLine: _StationOfLine$1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHR4LmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tbW9uLmpzIiwiLi4vc3JjL2pzU0hBLmpzIiwiLi4vc3JjL3B0eC5qcyIsIi4uL3NyYy9kYXRhLmpzIiwiLi4vc3JjL2J1cy5qcyIsIi4uL3NyYy9tZXRyby5qcyIsIi4uL3NyYy90cnRjLmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBDTSA9IHtcclxuICAgIGluQnJvd3NlcjogISEodHlwZW9mKHdpbmRvdykhPSd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCksXHJcbiAgICBjbG9uZTogZnVuY3Rpb24ob2JqQSl7cmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqQSkpO31cclxufVxyXG5cclxuQ00uc3RhdHVzQ29kZSA9IHtcclxuICAgIFNVQ0NFU1M6ICdzdWNjZXNzJyxcclxuICAgIEZBSUw6ICdmYWlsJ1xyXG59XHJcbkNNLkNPTlNUX1BUWF9BUElfU1VDQ0VTUyA9IENNLnN0YXR1c0NvZGUuU1VDQ0VTUztcclxuQ00uQ09OU1RfUFRYX0FQSV9GQUlMID0gQ00uc3RhdHVzQ29kZS5GQUlMO1xyXG5DTS5DT05TVF9QVFhfQVBJX01TR19DT01NX0ZBSUxFRCA9ICdDb21tdW5pY2F0aW9uIGZhaWxlZCwgbm8gcmVzcG9uc2UuICjpgJroqIrlpLHmlZfvvIxQVFgg54Sh5rOV5Y+W5Zue6LOH5paZ44CCKSc7XHJcbkNNLnYydXJsID0gJ2h0dHBzOi8vcHR4LnRyYW5zcG9ydGRhdGEudHcvTU9UQy92Mic7XHJcbkNNLnB0eFVSTCA9IENNLnYydXJsO1xyXG5DTS5tZXRyb1VSTCA9IENNLnB0eFVSTCArICcvUmFpbC9NZXRybyc7XHJcbkNNLmJ1c1VSTCA9IENNLnB0eFVSTCArICcvQnVzJ1xyXG5DTS50cmFVUkwgPSAnL1JhaWwvVFJBJztcclxuQ00ucHR4TVJUV2Vla1N0ciA9IFsnU3VuZGF5JywnTW9uZGF5JywnVHVlc2RheScsJ1dlZG5lc2RheScsJ1RodXJzZGF5JywnRnJpZGF5JywnU2F0dXJkYXknXTtcclxuXHJcblxyXG5DTS5wdWkgPSB7XHJcbiAgICBwcmludFN0YXR1czogZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0eXBlb2YoVFQpPT0nb2JqZWN0JyAmJiBUVC51aSAmJiBUVC51aS5wcmludFN0YXR1cyl7IFRULnVpLnByaW50U3RhdHVzLmFwcGx5KFRULnVpLCBhcmd1bWVudHMpOyB9XHJcbiAgICB9LFxyXG4gICAgbXNnOiB7XHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKXtpZih0eXBlb2YoVFQpPT0nb2JqZWN0JyAmJiBUVC51aSAmJiBUVC51aS5tc2cgJiYgVFQudWkubXNnLnNob3cpeyBUVC51aS5tc2cuc2hvdy5hcHBseShUVC51aSwgYXJndW1lbnRzKTsgfX0sXHJcbiAgICAgICAgYWxlcnQ6IGZ1bmN0aW9uKCl7aWYodHlwZW9mKFRUKT09J29iamVjdCcgJiYgVFQudWkgJiYgVFQudWkubXNnICYmIFRULnVpLm1zZy5hbGVydCl7IFRULnVpLm1zZy5hbGVydC5hcHBseShUVC51aSwgYXJndW1lbnRzKTsgfX1cclxuICAgIH0sXHJcbiAgICBtYXNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHR5cGVvZihUVCk9PSdvYmplY3QnICYmIFRULnVpICYmIFRULnVpLm1hc2speyBUVC51aS5tYXNrLmFwcGx5KFRULnVpLCBhcmd1bWVudHMpOyB9XHJcbiAgICB9LFxyXG4gICAgdW5tYXNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHR5cGVvZihUVCk9PSdvYmplY3QnICYmIFRULnVpICYmIFRULnVpLnVubWFzayl7IFRULnVpLnVubWFzay5hcHBseShUVC51aSwgYXJndW1lbnRzKTsgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENNO1xyXG5cclxuIiwidmFyIG1lID0ge307XG4vL2pzU0hBIGZ1bmN0aW9uIHN0YXJ0XG4oZnVuY3Rpb24oRyl7ZnVuY3Rpb24gcihkLGIsYyl7dmFyIGg9MCxhPVtdLGY9MCxnLG0sayxlLGwscCxxLHQsdz0hMSxuPVtdLHU9W10sdixyPSExO2M9Y3x8e307Zz1jLmVuY29kaW5nfHxcIlVURjhcIjt2PWMubnVtUm91bmRzfHwxO2lmKHYhPT1wYXJzZUludCh2LDEwKXx8MT52KXRocm93IEVycm9yKFwibnVtUm91bmRzIG11c3QgYSBpbnRlZ2VyID49IDFcIik7aWYoXCJTSEEtMVwiPT09ZClsPTUxMixwPXoscT1ILGU9MTYwLHQ9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc2xpY2UoKX07ZWxzZSB0aHJvdyBFcnJvcihcIkNob3NlbiBTSEEgdmFyaWFudCBpcyBub3Qgc3VwcG9ydGVkXCIpO2s9QShiLGcpO209eChkKTt0aGlzLnNldEhNQUNLZXk9ZnVuY3Rpb24oYSxmLGIpe3ZhciBjO2lmKCEwPT09dyl0aHJvdyBFcnJvcihcIkhNQUMga2V5IGFscmVhZHkgc2V0XCIpO2lmKCEwPT09cil0aHJvdyBFcnJvcihcIkNhbm5vdCBzZXQgSE1BQyBrZXkgYWZ0ZXIgY2FsbGluZyB1cGRhdGVcIik7XG5nPShifHx7fSkuZW5jb2Rpbmd8fFwiVVRGOFwiO2Y9QShmLGcpKGEpO2E9Zi5iaW5MZW47Zj1mLnZhbHVlO2M9bD4+PjM7Yj1jLzQtMTtpZihjPGEvOCl7Zm9yKGY9cShmLGEsMCx4KGQpLGUpO2YubGVuZ3RoPD1iOylmLnB1c2goMCk7ZltiXSY9NDI5NDk2NzA0MH1lbHNlIGlmKGM+YS84KXtmb3IoO2YubGVuZ3RoPD1iOylmLnB1c2goMCk7ZltiXSY9NDI5NDk2NzA0MH1mb3IoYT0wO2E8PWI7YSs9MSluW2FdPWZbYV1eOTA5NTIyNDg2LHVbYV09ZlthXV4xNTQ5NTU2ODI4O209cChuLG0pO2g9bDt3PSEwfTt0aGlzLnVwZGF0ZT1mdW5jdGlvbihlKXt2YXIgYixnLGMsZD0wLHE9bD4+PjU7Yj1rKGUsYSxmKTtlPWIuYmluTGVuO2c9Yi52YWx1ZTtiPWU+Pj41O2ZvcihjPTA7YzxiO2MrPXEpZCtsPD1lJiYobT1wKGcuc2xpY2UoYyxjK3EpLG0pLGQrPWwpO2grPWQ7YT1nLnNsaWNlKGQ+Pj41KTtmPWUlbDtyPSEwfTt0aGlzLmdldEhhc2g9ZnVuY3Rpb24oYixnKXt2YXIgYyxrLGwscDtpZighMD09PVxudyl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhhc2ggYWZ0ZXIgc2V0dGluZyBITUFDIGtleVwiKTtsPUIoZyk7c3dpdGNoKGIpe2Nhc2UgXCJIRVhcIjpjPWZ1bmN0aW9uKGEpe3JldHVybiBDKGEsZSxsKX07YnJlYWs7Y2FzZSBcIkI2NFwiOmM9ZnVuY3Rpb24oYSl7cmV0dXJuIEQoYSxlLGwpfTticmVhaztjYXNlIFwiQllURVNcIjpjPWZ1bmN0aW9uKGEpe3JldHVybiBFKGEsZSl9O2JyZWFrO2Nhc2UgXCJBUlJBWUJVRkZFUlwiOnRyeXtrPW5ldyBBcnJheUJ1ZmZlcigwKX1jYXRjaChJKXt0aHJvdyBFcnJvcihcIkFSUkFZQlVGRkVSIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBlbnZpcm9ubWVudFwiKTt9Yz1mdW5jdGlvbihhKXtyZXR1cm4gRihhLGUpfTticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiZm9ybWF0IG11c3QgYmUgSEVYLCBCNjQsIEJZVEVTLCBvciBBUlJBWUJVRkZFUlwiKTt9cD1xKGEuc2xpY2UoKSxmLGgsdChtKSxlKTtmb3Ioaz0xO2s8djtrKz0xKXA9cShwLGUsMCx4KGQpLGUpO1xucmV0dXJuIGMocCl9O3RoaXMuZ2V0SE1BQz1mdW5jdGlvbihiLGcpe3ZhciBjLGssbixyO2lmKCExPT09dyl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhNQUMgd2l0aG91dCBmaXJzdCBzZXR0aW5nIEhNQUMga2V5XCIpO249QihnKTtzd2l0Y2goYil7Y2FzZSBcIkhFWFwiOmM9ZnVuY3Rpb24oYSl7cmV0dXJuIEMoYSxlLG4pfTticmVhaztjYXNlIFwiQjY0XCI6Yz1mdW5jdGlvbihhKXtyZXR1cm4gRChhLGUsbil9O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmM9ZnVuY3Rpb24oYSl7cmV0dXJuIEUoYSxlKX07YnJlYWs7Y2FzZSBcIkFSUkFZQlVGRkVSXCI6dHJ5e2M9bmV3IEFycmF5QnVmZmVyKDApfWNhdGNoKEkpe3Rocm93IEVycm9yKFwiQVJSQVlCVUZGRVIgbm90IHN1cHBvcnRlZCBieSB0aGlzIGVudmlyb25tZW50XCIpO31jPWZ1bmN0aW9uKGEpe3JldHVybiBGKGEsZSl9O2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJvdXRwdXRGb3JtYXQgbXVzdCBiZSBIRVgsIEI2NCwgQllURVMsIG9yIEFSUkFZQlVGRkVSXCIpO1xufWs9cShhLnNsaWNlKCksZixoLHQobSksZSk7cj1wKHUseChkKSk7cj1xKGssZSxsLHIsZSk7cmV0dXJuIGMocil9fWZ1bmN0aW9uIEMoZCxiLGMpe3ZhciBoPVwiXCI7Yi89ODt2YXIgYSxmO2ZvcihhPTA7YTxiO2ErPTEpZj1kW2E+Pj4yXT4+PjgqKDMrYSU0Ki0xKSxoKz1cIjAxMjM0NTY3ODlhYmNkZWZcIi5jaGFyQXQoZj4+PjQmMTUpK1wiMDEyMzQ1Njc4OWFiY2RlZlwiLmNoYXJBdChmJjE1KTtyZXR1cm4gYy5vdXRwdXRVcHBlcj9oLnRvVXBwZXJDYXNlKCk6aH1mdW5jdGlvbiBEKGQsYixjKXt2YXIgaD1cIlwiLGE9Yi84LGYsZyxtO2ZvcihmPTA7ZjxhO2YrPTMpZm9yKGc9ZisxPGE/ZFtmKzE+Pj4yXTowLG09ZisyPGE/ZFtmKzI+Pj4yXTowLG09KGRbZj4+PjJdPj4+OCooMytmJTQqLTEpJjI1NSk8PDE2fChnPj4+OCooMysoZisxKSU0Ki0xKSYyNTUpPDw4fG0+Pj44KigzKyhmKzIpJTQqLTEpJjI1NSxnPTA7ND5nO2crPTEpOCpmKzYqZzw9Yj9oKz1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5jaGFyQXQobT4+PlxuNiooMy1nKSY2Myk6aCs9Yy5iNjRQYWQ7cmV0dXJuIGh9ZnVuY3Rpb24gRShkLGIpe3ZhciBjPVwiXCIsaD1iLzgsYSxmO2ZvcihhPTA7YTxoO2ErPTEpZj1kW2E+Pj4yXT4+PjgqKDMrYSU0Ki0xKSYyNTUsYys9U3RyaW5nLmZyb21DaGFyQ29kZShmKTtyZXR1cm4gY31mdW5jdGlvbiBGKGQsYil7dmFyIGM9Yi84LGgsYT1uZXcgQXJyYXlCdWZmZXIoYyksZjtmPW5ldyBVaW50OEFycmF5KGEpO2ZvcihoPTA7aDxjO2grPTEpZltoXT1kW2g+Pj4yXT4+PjgqKDMraCU0Ki0xKSYyNTU7cmV0dXJuIGF9ZnVuY3Rpb24gQihkKXt2YXIgYj17b3V0cHV0VXBwZXI6ITEsYjY0UGFkOlwiPVwiLHNoYWtlTGVuOi0xfTtkPWR8fHt9O2Iub3V0cHV0VXBwZXI9ZC5vdXRwdXRVcHBlcnx8ITE7ITA9PT1kLmhhc093blByb3BlcnR5KFwiYjY0UGFkXCIpJiYoYi5iNjRQYWQ9ZC5iNjRQYWQpO2lmKFwiYm9vbGVhblwiIT09dHlwZW9mIGIub3V0cHV0VXBwZXIpdGhyb3cgRXJyb3IoXCJJbnZhbGlkIG91dHB1dFVwcGVyIGZvcm1hdHRpbmcgb3B0aW9uXCIpO1xuaWYoXCJzdHJpbmdcIiE9PXR5cGVvZiBiLmI2NFBhZCl0aHJvdyBFcnJvcihcIkludmFsaWQgYjY0UGFkIGZvcm1hdHRpbmcgb3B0aW9uXCIpO3JldHVybiBifWZ1bmN0aW9uIEEoZCxiKXt2YXIgYztzd2l0Y2goYil7Y2FzZSBcIlVURjhcIjpjYXNlIFwiVVRGMTZCRVwiOmNhc2UgXCJVVEYxNkxFXCI6YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcImVuY29kaW5nIG11c3QgYmUgVVRGOCwgVVRGMTZCRSwgb3IgVVRGMTZMRVwiKTt9c3dpdGNoKGQpe2Nhc2UgXCJIRVhcIjpjPWZ1bmN0aW9uKGIsYSxmKXt2YXIgZz1iLmxlbmd0aCxjLGQsZSxsLHA7aWYoMCE9PWclMil0aHJvdyBFcnJvcihcIlN0cmluZyBvZiBIRVggdHlwZSBtdXN0IGJlIGluIGJ5dGUgaW5jcmVtZW50c1wiKTthPWF8fFswXTtmPWZ8fDA7cD1mPj4+Mztmb3IoYz0wO2M8ZztjKz0yKXtkPXBhcnNlSW50KGIuc3Vic3RyKGMsMiksMTYpO2lmKGlzTmFOKGQpKXRocm93IEVycm9yKFwiU3RyaW5nIG9mIEhFWCB0eXBlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyc1wiKTtcbmw9KGM+Pj4xKStwO2ZvcihlPWw+Pj4yO2EubGVuZ3RoPD1lOylhLnB1c2goMCk7YVtlXXw9ZDw8OCooMytsJTQqLTEpfXJldHVybnt2YWx1ZTphLGJpbkxlbjo0KmcrZn19O2JyZWFrO2Nhc2UgXCJURVhUXCI6Yz1mdW5jdGlvbihjLGEsZil7dmFyIGcsZCxrPTAsZSxsLHAscSx0LG47YT1hfHxbMF07Zj1mfHwwO3A9Zj4+PjM7aWYoXCJVVEY4XCI9PT1iKWZvcihuPTMsZT0wO2U8Yy5sZW5ndGg7ZSs9MSlmb3IoZz1jLmNoYXJDb2RlQXQoZSksZD1bXSwxMjg+Zz9kLnB1c2goZyk6MjA0OD5nPyhkLnB1c2goMTkyfGc+Pj42KSxkLnB1c2goMTI4fGcmNjMpKTo1NTI5Nj5nfHw1NzM0NDw9Zz9kLnB1c2goMjI0fGc+Pj4xMiwxMjh8Zz4+PjYmNjMsMTI4fGcmNjMpOihlKz0xLGc9NjU1MzYrKChnJjEwMjMpPDwxMHxjLmNoYXJDb2RlQXQoZSkmMTAyMyksZC5wdXNoKDI0MHxnPj4+MTgsMTI4fGc+Pj4xMiY2MywxMjh8Zz4+PjYmNjMsMTI4fGcmNjMpKSxsPTA7bDxkLmxlbmd0aDtsKz0xKXt0PWsrXG5wO2ZvcihxPXQ+Pj4yO2EubGVuZ3RoPD1xOylhLnB1c2goMCk7YVtxXXw9ZFtsXTw8OCoobit0JTQqLTEpO2srPTF9ZWxzZSBpZihcIlVURjE2QkVcIj09PWJ8fFwiVVRGMTZMRVwiPT09Yilmb3Iobj0yLGU9MDtlPGMubGVuZ3RoO2UrPTEpe2c9Yy5jaGFyQ29kZUF0KGUpO1wiVVRGMTZMRVwiPT09YiYmKGw9ZyYyNTUsZz1sPDw4fGc+Pj44KTt0PWsrcDtmb3IocT10Pj4+MjthLmxlbmd0aDw9cTspYS5wdXNoKDApO2FbcV18PWc8PDgqKG4rdCU0Ki0xKTtrKz0yfXJldHVybnt2YWx1ZTphLGJpbkxlbjo4KmsrZn19O2JyZWFrO2Nhc2UgXCJCNjRcIjpjPWZ1bmN0aW9uKGIsYSxmKXt2YXIgYz0wLGQsayxlLGwscCxxLG47aWYoLTE9PT1iLnNlYXJjaCgvXlthLXpBLVowLTk9K1xcL10rJC8pKXRocm93IEVycm9yKFwiSW52YWxpZCBjaGFyYWN0ZXIgaW4gYmFzZS02NCBzdHJpbmdcIik7az1iLmluZGV4T2YoXCI9XCIpO2I9Yi5yZXBsYWNlKC9cXD0vZyxcIlwiKTtpZigtMSE9PWsmJms8Yi5sZW5ndGgpdGhyb3cgRXJyb3IoXCJJbnZhbGlkICc9JyBmb3VuZCBpbiBiYXNlLTY0IHN0cmluZ1wiKTtcbmE9YXx8WzBdO2Y9Znx8MDtxPWY+Pj4zO2ZvcihrPTA7azxiLmxlbmd0aDtrKz00KXtwPWIuc3Vic3RyKGssNCk7Zm9yKGU9bD0wO2U8cC5sZW5ndGg7ZSs9MSlkPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLmluZGV4T2YocFtlXSksbHw9ZDw8MTgtNiplO2ZvcihlPTA7ZTxwLmxlbmd0aC0xO2UrPTEpe249YytxO2ZvcihkPW4+Pj4yO2EubGVuZ3RoPD1kOylhLnB1c2goMCk7YVtkXXw9KGw+Pj4xNi04KmUmMjU1KTw8OCooMytuJTQqLTEpO2MrPTF9fXJldHVybnt2YWx1ZTphLGJpbkxlbjo4KmMrZn19O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmM9ZnVuY3Rpb24oYixhLGMpe3ZhciBkLG0sayxlLGw7YT1hfHxbMF07Yz1jfHwwO2s9Yz4+PjM7Zm9yKG09MDttPGIubGVuZ3RoO20rPTEpZD1iLmNoYXJDb2RlQXQobSksbD1tK2ssZT1sPj4+MixhLmxlbmd0aDw9ZSYmYS5wdXNoKDApLGFbZV18PWQ8PDgqKDMrbCU0Ki0xKTtcbnJldHVybnt2YWx1ZTphLGJpbkxlbjo4KmIubGVuZ3RoK2N9fTticmVhaztjYXNlIFwiQVJSQVlCVUZGRVJcIjp0cnl7Yz1uZXcgQXJyYXlCdWZmZXIoMCl9Y2F0Y2goaCl7dGhyb3cgRXJyb3IoXCJBUlJBWUJVRkZFUiBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgZW52aXJvbm1lbnRcIik7fWM9ZnVuY3Rpb24oYixhLGMpe3ZhciBkLG0sayxlLGw7YT1hfHxbMF07Yz1jfHwwO209Yz4+PjM7bD1uZXcgVWludDhBcnJheShiKTtmb3IoZD0wO2Q8Yi5ieXRlTGVuZ3RoO2QrPTEpZT1kK20saz1lPj4+MixhLmxlbmd0aDw9ayYmYS5wdXNoKDApLGFba118PWxbZF08PDgqKDMrZSU0Ki0xKTtyZXR1cm57dmFsdWU6YSxiaW5MZW46OCpiLmJ5dGVMZW5ndGgrY319O2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJmb3JtYXQgbXVzdCBiZSBIRVgsIFRFWFQsIEI2NCwgQllURVMsIG9yIEFSUkFZQlVGRkVSXCIpO31yZXR1cm4gY31mdW5jdGlvbiBuKGQsYil7cmV0dXJuIGQ8PGJ8ZD4+PjMyLWJ9ZnVuY3Rpb24gdShkLFxuYil7dmFyIGM9KGQmNjU1MzUpKyhiJjY1NTM1KTtyZXR1cm4oKGQ+Pj4xNikrKGI+Pj4xNikrKGM+Pj4xNikmNjU1MzUpPDwxNnxjJjY1NTM1fWZ1bmN0aW9uIHkoZCxiLGMsaCxhKXt2YXIgZj0oZCY2NTUzNSkrKGImNjU1MzUpKyhjJjY1NTM1KSsoaCY2NTUzNSkrKGEmNjU1MzUpO3JldHVybigoZD4+PjE2KSsoYj4+PjE2KSsoYz4+PjE2KSsoaD4+PjE2KSsoYT4+PjE2KSsoZj4+PjE2KSY2NTUzNSk8PDE2fGYmNjU1MzV9ZnVuY3Rpb24geChkKXt2YXIgYj1bXTtpZihcIlNIQS0xXCI9PT1kKWI9WzE3MzI1ODQxOTMsNDAyMzIzMzQxNywyNTYyMzgzMTAyLDI3MTczMzg3OCwzMjg1Mzc3NTIwXTtlbHNlIHRocm93IEVycm9yKFwiTm8gU0hBIHZhcmlhbnRzIHN1cHBvcnRlZFwiKTtyZXR1cm4gYn1mdW5jdGlvbiB6KGQsYil7dmFyIGM9W10saCxhLGYsZyxtLGssZTtoPWJbMF07YT1iWzFdO2Y9YlsyXTtnPWJbM107bT1iWzRdO2ZvcihlPTA7ODA+ZTtlKz0xKWNbZV09MTY+ZT9kW2VdOm4oY1tlLVxuM11eY1tlLThdXmNbZS0xNF1eY1tlLTE2XSwxKSxrPTIwPmU/eShuKGgsNSksYSZmXn5hJmcsbSwxNTE4NTAwMjQ5LGNbZV0pOjQwPmU/eShuKGgsNSksYV5mXmcsbSwxODU5Nzc1MzkzLGNbZV0pOjYwPmU/eShuKGgsNSksYSZmXmEmZ15mJmcsbSwyNDAwOTU5NzA4LGNbZV0pOnkobihoLDUpLGFeZl5nLG0sMzM5NTQ2OTc4MixjW2VdKSxtPWcsZz1mLGY9bihhLDMwKSxhPWgsaD1rO2JbMF09dShoLGJbMF0pO2JbMV09dShhLGJbMV0pO2JbMl09dShmLGJbMl0pO2JbM109dShnLGJbM10pO2JbNF09dShtLGJbNF0pO3JldHVybiBifWZ1bmN0aW9uIEgoZCxiLGMsaCl7dmFyIGE7Zm9yKGE9KGIrNjU+Pj45PDw0KSsxNTtkLmxlbmd0aDw9YTspZC5wdXNoKDApO2RbYj4+PjVdfD0xMjg8PDI0LWIlMzI7Yis9YztkW2FdPWImNDI5NDk2NzI5NTtkW2EtMV09Yi80Mjk0OTY3Mjk2fDA7Yj1kLmxlbmd0aDtmb3IoYT0wO2E8YjthKz0xNiloPXooZC5zbGljZShhLGErMTYpLGgpO3JldHVybiBofVxuXCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gcn0pOlwidW5kZWZpbmVkXCIhPT10eXBlb2YgZXhwb3J0cz8oXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9ciksZXhwb3J0cz1yKTpHLmpzU0hBPXJ9KShtZSk7XG4vL2pzU0hBIGZ1bmN0aW9uIGVuZFxuXG5leHBvcnQgZGVmYXVsdCBtZS5qc1NIQTsiLCJpbXBvcnQganNTSEEgZnJvbSAnLi9qc1NIQSc7XHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi9jb21tb24uanMnO1xyXG5cclxuXHJcbmxldCBmblRSVEMgPSAoKSA9PiBwdHgudHJ0YztcclxuXHJcbnZhciBwdHggPSB7XHJcbiAgICBzdGF0dXNDb2RlOiBjb21tb24uc3RhdHVzQ29kZSxcclxuICAgIHRpbWVvdXQ6IDMwMDAwLFxyXG4gICAgdGVtcFRpbWVUYWJsZToge30sXHJcbiAgICB0aHJvd0Vycm9yOiBmdW5jdGlvbihzdHIpeyB0aHJvdyBzdHI7fSxcclxuICAgIGZpbHRlclBhcmFtOiBmdW5jdGlvbihmaWVsZCwgb3AsIHZhbHVlLCBhbmRPcil7XHJcbiAgICAgICAgLy9maWVsZCDlj4ogdmFsdWXlj6/ngrrpmaPliJfvvIzlhbbkuK3kuIDogIXngrrpmaPliJfmmYLlsIfnlKggYW5kT3Ig6YCj5o6l77yM5L2G55W25YWp6ICF55qG54K66Zmj5YiX5pmC5b+F6ZyA6ZW35bqm5LiA6Ie05Lul5L6/6YWN5bCN6YCj5o6lXHJcbiAgICAgICAgLy9wdHguZmlsdGVyUGFyYW0oWydmZGZzZC9mZGZkJywnZmRmZC9nZmcnLCdmZ2YnXSwnPCcsWzMyNSwnZ2dnJyw5OTZdLCdBTkQnKVxyXG4gICAgICAgIGFuZE9yID0gYW5kT3IgfHwgJ29yJzsgYW5kT3IgPSBhbmRPci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciBvcE1hcCA9IHtcclxuICAgICAgICAgICAgJz0nOiAnZXEnLCAnPT0nOiAnZXEnLCAnPT09JzogJ2VxJyxcclxuICAgICAgICAgICAgJyE9JzogJ25lJywgJyE9PSc6ICduZScsXHJcbiAgICAgICAgICAgICchJzogJ25vdCcsXHJcbiAgICAgICAgICAgICc+JzogJ2d0JywgJz49JzogJ2dlJywgJzwnOiAnbHQnLCAnPD0nOiAnbGUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvcDIgPSBvcE1hcFtvcF0gfHwgb3A7XHJcbiAgICAgICAgaWYodHlwZW9mKGZpZWxkKT09J29iamVjdCcgJiYgdHlwZW9mKHZhbHVlKT09J29iamVjdCcgJiYgZmllbGQubGVuZ3RoICE9IHZhbHVlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHB0eC50aHJvd0Vycm9yKCdOb3QgZXF1YWwgbGVuZ3RoIG9mIGZpbHRlclBhcmFtIGZpbGVkIGFuZCB2YWx1ZTsnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlb2YoZmllbGQpIT0nb2JqZWN0Jyl7ZmllbGQgPSBbZmllbGRdO31cclxuICAgICAgICBpZih0eXBlb2YodmFsdWUpIT0nb2JqZWN0Jyl7dmFsdWUgPSBbdmFsdWVdO31cclxuICAgICAgICB2YXIgY250ID0gKGZpZWxkLmxlbmd0aCA+IHZhbHVlLmxlbmd0aCkgPyBmaWVsZC5sZW5ndGggOiB2YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHRtcEZpZWxkLCB0bXBWYWx1ZSwgc3RyaW5nQXJ5ID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8Y250OyBpKyspe1xyXG4gICAgICAgICAgICB0bXBGaWVsZCA9IGZpZWxkW2ldIHx8IGZpZWxkWzBdO1xyXG4gICAgICAgICAgICB0bXBWYWx1ZSA9IHZhbHVlW2ldIHx8IHZhbHVlWzBdO1xyXG4gICAgICAgICAgICBpZih0eXBlb2YodG1wVmFsdWUpPT0nc3RyaW5nJykgdG1wVmFsdWUgPSBcIidcIiArIHRtcFZhbHVlICsgXCInXCI7XHJcbiAgICAgICAgICAgIHN0cmluZ0FyeS5wdXNoKHRtcEZpZWxkICsgJyAnICsgb3AyICsgJyAnICsgdG1wVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyaW5nQXJ5LmpvaW4oJyAnICsgYW5kT3IgKyAnICcpO1xyXG4gICAgfSxcclxuICAgIGZpbHRlckZuOiBmdW5jdGlvbihwYXJhbSl7XHJcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSSgnJGZpbHRlcj0nICsgcGFyYW0pO1xyXG4gICAgfSxcclxuICAgIG9yZGVyQnlGbjogZnVuY3Rpb24oZmllbGQsIGRpcil7XHJcbiAgICAgICAgZGlyID0gKGRpciAmJiB0eXBlb2YoZGlyKT09J3N0cmluZycpID8gJyAnICsgZGlyLnRvTG93ZXJDYXNlKCkgOiAnJztcclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJKCckb3JkZXJieT0nICsgYXJndW1lbnRzWzBdICsgZGlyKTtcclxuICAgIH0sXHJcbiAgICB0b3BGbjogZnVuY3Rpb24odG9wLCBmb3JtYXRTdHIpe1xyXG4gICAgICAgIHRvcCA9IHRvcCB8fCAzMDAwO1xyXG4gICAgICAgIGZvcm1hdFN0ciA9IGZvcm1hdFN0ciB8fCAnSlNPTic7XHJcbiAgICAgICAgcmV0dXJuICckdG9wPScgKyB0b3AgKyAnJmZvcm1hdD0nICsgZm9ybWF0U3RyO1xyXG4gICAgfSxcclxuICAgIHNlbGVjdEZpZWxkRm46IGZ1bmN0aW9uKHN0cil7XHJcbiAgICAgICAgaWYodHlwZW9mKHN0cik9PSdvYmplY3QnICYmIHN0ci5sZW5ndGgpe1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuam9pbignLCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJKCckc2VsZWN0PScgKyBzdHIpO1xyXG4gICAgfSxcclxuICAgIEdldEF1dGhvcml6YXRpb25IZWFkZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIEFwcElEID0gcHR4LkFwcElEIHx8ICdGRkZGRkZGRi1GRkZGLUZGRkYtRkZGRi1GRkZGRkZGRkZGRkYnO1xyXG4gICAgICAgIHZhciBBcHBLZXkgPSBwdHguQXBwS2V5IHx8ICdGRkZGRkZGRi1GRkZGLUZGRkYtRkZGRi1GRkZGRkZGRkZGRkYnO1xyXG5cclxuICAgICAgICB2YXIgR01UU3RyaW5nID0gbmV3IERhdGUoKS50b0dNVFN0cmluZygpO1xyXG4gICAgICAgIHZhciBTaGFPYmogPSBuZXcganNTSEEoJ1NIQS0xJywgJ1RFWFQnKTtcclxuICAgICAgICBTaGFPYmouc2V0SE1BQ0tleShBcHBLZXksICdURVhUJyk7XHJcbiAgICAgICAgU2hhT2JqLnVwZGF0ZSgneC1kYXRlOiAnICsgR01UU3RyaW5nKTtcclxuICAgICAgICB2YXIgSE1BQyA9IFNoYU9iai5nZXRITUFDKCdCNjQnKTtcclxuICAgICAgICB2YXIgQXV0aG9yaXphdGlvbiA9ICdobWFjIHVzZXJuYW1lPVxcXCInICsgQXBwSUQgKyAnXFxcIiwgYWxnb3JpdGhtPVxcXCJobWFjLXNoYTFcXFwiLCBoZWFkZXJzPVxcXCJ4LWRhdGVcXFwiLCBzaWduYXR1cmU9XFxcIicgKyBITUFDICsgJ1xcXCInO1xyXG5cclxuICAgICAgICByZXR1cm4geyAnQXV0aG9yaXphdGlvbic6IEF1dGhvcml6YXRpb24sICdYLURhdGUnOiBHTVRTdHJpbmd9O1xyXG4gICAgfSxcclxuICAgIGdldFRha2VNUlRUaW1lVGFibGU6IGZ1bmN0aW9uKG1ydFBUWEFyeSwgdywgY2JGbil7XHJcbiAgICAgICAgdmFyIHJ0U3RhdHVzID0gW107XHJcbiAgICAgICAgZnVuY3Rpb24gcnVuR2V0KGFycil7XHJcbiAgICAgICAgICAgIGlmKGFyci5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICAgICAgY2JGbihydFN0YXR1cywgcHR4LnRlbXBUaW1lVGFibGUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGlmKG9iai5jb21wYW55PT0ndHJ0Yycpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBMaW5lSUQgPSBmblRSVEMoKS5nZXRMaW5lSUQob2JqLmxpbmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdGF0aW9uSUQgPSBmblRSVEMoKS5nZXRTdGF0aW9uSUQob2JqLnRha2VSYW5nZVswXSwgb2JqLmxpbmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJRCA9IGZuVFJUQygpLmdldFN0YXRpb25JRChvYmoudGFrZVJhbmdlWzFdLCBvYmoubGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm5UUlRDKCkuZ2V0U3RhdGlvblRpbWUoTGluZUlELCBbU3RhdGlvbklELHRhcmdldElEXSwgcGFyc2VJbnQodyksIGZ1bmN0aW9uKGpzb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcnRzID0ge0xpbmVJRDpMaW5lSUQsIFN0YXRpb25JRDogU3RhdGlvbklELCB0YXJnZXRJRDogdGFyZ2V0SUR9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihqc29uPT1jb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ0cy5zdGF0dXMgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnRzLm1lc3NhZ2UgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9NU0dfQ09NTV9GQUlMRUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydFN0YXR1cy5wdXNoKHJ0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5HZXQoYXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydHMuc3RhdHVzID0gY29tbW9uLkNPTlNUX1BUWF9BUElfU1VDQ0VTUztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ0U3RhdHVzLnB1c2gocnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkdldChhcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcnVuR2V0KG1ydFBUWEFyeSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0VVJMOiBmdW5jdGlvbih1cmwsIGNiRm4pe1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlcUxpc3RlbmVyKHhocil7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHtcclxuICAgICAgICAgICAgICAgIHhocjogeGhyLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeGhyLnRhcmdldC5yZXNwb25zZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHhoci50YXJnZXQucmVhZHlTdGF0ZT09NCAmJiB4aHIudGFyZ2V0LnN0YXR1cz09MjAwKXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0YXR1cyA9IGNvbW1vbi5DT05TVF9QVFhfQVBJX1NVQ0NFU1M7XHJcbiAgICAgICAgICAgICAgICBjYkZuKEpTT04ucGFyc2UoeGhyLnRhcmdldC5yZXNwb25zZSksIGV2ZW50KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdGF0dXMgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMO1xyXG4gICAgICAgICAgICAgICAgY2JGbih4aHIudGFyZ2V0LnJlc3BvbnNlLCBldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZtID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgZm0uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVxTGlzdGVuZXIpO1xyXG4gICAgICAgIGZtLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgZm0uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIHJlcUxpc3RlbmVyKTtcclxuICAgICAgICBmbS5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgZm0ub3BlbignR0VUJywgdXJsKTtcclxuICAgICAgICBmbS50aW1lb3V0ID0gcHR4LnRpbWVvdXQ7XHJcbiAgICAgICAgdmFyIGhlYWRlck9iaiA9IHRoaXMuR2V0QXV0aG9yaXphdGlvbkhlYWRlcigpO1xyXG4gICAgICAgIGZvcih2YXIgayBpbiBoZWFkZXJPYmope1xyXG4gICAgICAgICAgICBmbS5zZXRSZXF1ZXN0SGVhZGVyKGssIGhlYWRlck9ialtrXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZtLnNlbmQoKTtcclxuICAgIH0sXHJcbiAgICBnZXRQcm9taXNlVVJMOiBmdW5jdGlvbih1cmwsIGNmZz17fSl7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICBmdW5jdGlvbiByZXFMaXN0ZW5lcih4aHIpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHhocjogeGhyLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogY2ZnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0OiByZWplY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHhoci50YXJnZXQucmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHhoci50YXJnZXQucmVhZHlTdGF0ZT09NCAmJiB4aHIudGFyZ2V0LnN0YXR1cz09MjAwKXtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdGF0dXMgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9TVUNDRVNTO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEgPSBKU09OLnBhcnNlKHhoci50YXJnZXQucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RhdHVzID0gY29tbW9uLkNPTlNUX1BUWF9BUElfRkFJTDtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBmbSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBmbS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGZtLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGZtLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGZtLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1lb3V0XCIsIHJlcUxpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBjZmcubWV0aG9kIHx8ICdHRVQnO1xyXG4gICAgICAgICAgICBmbS5vcGVuKG1ldGhvZCwgdXJsKTtcclxuICAgICAgICAgICAgZm0udGltZW91dCA9IGNmZy50aW1lb3V0IHx8IHB0eC50aW1lb3V0O1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVyT2JqID0gY2ZnLmhlYWQgfHwgcHR4LkdldEF1dGhvcml6YXRpb25IZWFkZXIoKTtcclxuICAgICAgICAgICAgZm9yKHZhciBrIGluIGhlYWRlck9iail7XHJcbiAgICAgICAgICAgICAgICBmbS5zZXRSZXF1ZXN0SGVhZGVyKGssIGhlYWRlck9ialtrXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm0uc2VuZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0U3RhdGlvbkxpdmVJbmZvOiBmdW5jdGlvbihzdGlkLCBjYkZuKXtcclxuICAgICAgICBzdGlkID0gKHN0aWQpID8gc3RpZC5yZXBsYWNlKCd0cmFfJywnJykgOiAnMTAwOCc7XHJcbiAgICAgICAgY2JGbiA9IGNiRm4gfHwgZnVuY3Rpb24oZGF0YSl7Y29uc29sZS5pbmZvKGRhdGEpO307XHJcbiAgICAgICAgdmFyIHVybCA9IHRyYVVSTCArICcvTGl2ZUJvYXJkL1N0YXRpb24vJyArIHN0aWQgKyAnPyR0b3A9MzAmJGZvcm1hdD1KU09OJztcclxuICAgICAgICB0aGlzLmdldFVSTCh1cmwsIGNiRm4pO1xyXG4gICAgfSxcclxuICAgIGdldFN0YXRpb25Ub2RheVRpbWU6IGZ1bmN0aW9uKHN0aWQsIGNiRm4pe1xyXG4gICAgICAgIHN0aWQgPSAoc3RpZCkgPyBzdGlkLnJlcGxhY2UoJ3RyYV8nLCcnKSA6ICcxMDA4JztcclxuICAgICAgICBjYkZuID0gY2JGbiB8fCBmdW5jdGlvbihkYXRhKXtjb25zb2xlLmluZm8oZGF0YSk7fTtcclxuICAgICAgICB2YXIgdXJsID0gdHJhVVJMICsgJy9EYWlseVRpbWV0YWJsZS9TdGF0aW9uLycgKyBzdGlkICsgJy8nICsgVFQuZ29pbmdEYXRhLnRvZGF5ICsgJz8kdG9wPTMwMDAmJGZvcm1hdD1KU09OJztcclxuICAgICAgICB0aGlzLmdldFVSTCh1cmwsIGNiRm4pO1xyXG4gICAgfSxcclxuICAgIHNvcnRCeVRUU29ydFRpbWU6IGZ1bmN0aW9uKGEsYil7XHJcbiAgICAgICAgdmFyIGludEEgPSBwYXJzZUludChhLnR0X3NvcnRUaW1lLDEwKTtcclxuICAgICAgICB2YXIgaW50QiA9IHBhcnNlSW50KGIudHRfc29ydFRpbWUsMTApO1xyXG4gICAgICAgIGlmKGludEE9PWludEIpIHJldHVybiAwO1xyXG4gICAgICAgIGlmKGludEEgPCBpbnRCKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYoaW50QSA+IGludEIpIHJldHVybiAxO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdHg7XHJcblxyXG4iLCJ2YXIgcERhdGEgPSB7XG4gICAgYnVzOiB7XG4gICAgICAgIGNpdHk6IFtcbiAgICAgICAgICAgIHtuYW1lOifoh7rljJfluIInLCBDaXR5OidUYWlwZWknLCBDaXR5Q29kZTonVFBFJ30sXG4gICAgICAgICAgICB7bmFtZTon5paw5YyX5biCJywgQ2l0eTonTmV3VGFpcGVpJywgQ2l0eUNvZGU6J05XVCd9LFxuICAgICAgICAgICAge25hbWU6J+ahg+WckuW4gicsIENpdHk6J1Rhb3l1YW4nLCBDaXR5Q29kZTonVEFPJ30sXG4gICAgICAgICAgICB7bmFtZTon6Ie65Lit5biCJywgQ2l0eTonVGFpY2h1bmcnLCBDaXR5Q29kZTonVFhHJ30sXG4gICAgICAgICAgICB7bmFtZTon6Ie65Y2X5biCJywgQ2l0eTonVGFpbmFuJywgQ2l0eUNvZGU6J1ROTid9LFxuICAgICAgICAgICAge25hbWU6J+mrmOmbhOW4gicsIENpdHk6J0thb2hzaXVuZycsIENpdHlDb2RlOidLSEgnfSxcbiAgICAgICAgICAgIHtuYW1lOifln7rpmobluIInLCBDaXR5OidLZWVsdW5nJywgQ2l0eUNvZGU6J0tFRSd9LFxuICAgICAgICAgICAge25hbWU6J+aWsOerueW4gicsIENpdHk6J0hzaW5jaHUnLCBDaXR5Q29kZTonSFNaJ30sXG4gICAgICAgICAgICB7bmFtZTon5paw56u557ijJywgQ2l0eTonSHNpbmNodUNvdW50eScsIENpdHlDb2RlOidIU1EnfSxcbiAgICAgICAgICAgIHtuYW1lOifoi5fmoJfnuKMnLCBDaXR5OidNaWFvbGlDb3VudHknLCBDaXR5Q29kZTonTUlBJ30sXG4gICAgICAgICAgICB7bmFtZTon5b2w5YyW57ijJywgQ2l0eTonQ2hhbmdodWFDb3VudHknLCBDaXR5Q29kZTonQ0hBJ30sXG4gICAgICAgICAgICB7bmFtZTon5Y2X5oqV57ijJywgQ2l0eTonTmFudG91Q291bnR5JywgQ2l0eUNvZGU6J05BTid9LFxuICAgICAgICAgICAge25hbWU6J+mbsuael+e4oycsIENpdHk6J1l1bmxpbkNvdW50eScsIENpdHlDb2RlOidZVU4nfSxcbiAgICAgICAgICAgIHtuYW1lOiflmInnvqnnuKMnLCBDaXR5OidDaGlheWlDb3VudHknLCBDaXR5Q29kZTonQ1lRJ30sXG4gICAgICAgICAgICB7bmFtZTon5ZiJ576p5biCJywgQ2l0eTonQ2hpYXlpJywgQ2l0eUNvZGU6J0NZSSd9LFxuICAgICAgICAgICAge25hbWU6J+Wxj+adsee4oycsIENpdHk6J1Bpbmd0dW5nQ291bnR5JywgQ2l0eUNvZGU6J1BJRid9LFxuICAgICAgICAgICAge25hbWU6J+WunOiYree4oycsIENpdHk6J1lpbGFuQ291bnR5JywgQ2l0eUNvZGU6J0lMQSd9LFxuICAgICAgICAgICAge25hbWU6J+iKseiTrue4oycsIENpdHk6J0h1YWxpZW5Db3VudHknLCBDaXR5Q29kZTonSFVBJ30sXG4gICAgICAgICAgICB7bmFtZTon6Ie65p2x57ijJywgQ2l0eTonVGFpdHVuZ0NvdW50eScsIENpdHlDb2RlOidUVFQnfSxcbiAgICAgICAgICAgIHtuYW1lOifph5HploDnuKMnLCBDaXR5OidLaW5tZW5Db3VudHknLCBDaXR5Q29kZTonS0lOJ30sXG4gICAgICAgICAgICB7bmFtZTon5r6O5rmW57ijJywgQ2l0eTonUGVuZ2h1Q291bnR5JywgQ2l0eUNvZGU6J1BFTid9LFxuICAgICAgICAgICAge25hbWU6J+mAo+axn+e4oycsIENpdHk6J0xpZW5jaGlhbmdDb3VudHknLCBDaXR5Q29kZTonTElFJ31cbiAgICAgICAgXVxuICAgIH0sXG4gICAgdHJ0Yzoge1xuICAgICAgICBzdGF0aW9uX2FyeTogW1xuICAgICAgICAgICAgLy9CYW5uYW4gTGluZVxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzFcIiwgU3RhdGlvbklEOltcIkJMMjNcIixcIkJSMjRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTdcIiwgU3RhdGlvbklEOltcIkJMMjJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTZcIiwgU3RhdGlvbklEOltcIkJMMjFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTVcIiwgU3RhdGlvbklEOltcIkJMMjBcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTRcIiwgU3RhdGlvbklEOltcIkJMMTlcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTNcIiwgU3RhdGlvbklEOltcIkJMMThcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTJcIiwgU3RhdGlvbklEOltcIkJMMTdcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wOTFcIiwgU3RhdGlvbklEOltcIkJMMTZcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMTBcIiwgU3RhdGlvbklEOltcIkJMMTVcIixcIkJSMTBcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wODlcIiwgU3RhdGlvbklEOltcIkJMMTRcIixcIk8wN1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA4OFwiLCBTdGF0aW9uSUQ6W1wiQkwxM1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA4NlwiLCBTdGF0aW9uSUQ6W1wiQkwxMVwiLFwiRzEyXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDg1XCIsIFN0YXRpb25JRDpbXCJCTDEwXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDg0XCIsIFN0YXRpb25JRDpbXCJCTDA5XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDgzXCIsIFN0YXRpb25JRDpbXCJCTDA4XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDgyXCIsIFN0YXRpb25JRDpbXCJCTDA3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDgxXCIsIFN0YXRpb25JRDpbXCJCTDA2XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDgwXCIsIFN0YXRpb25JRDpbXCJCTDA1XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDc5XCIsIFN0YXRpb25JRDpbXCJCTDA0XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDc4XCIsIFN0YXRpb25JRDpbXCJCTDAzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDc3XCIsIFN0YXRpb25JRDpbXCJCTDAyXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDc2XCIsIFN0YXRpb25JRDpbXCJCTDAxXCJdfSxcbiAgICAgICAgICAgIC8vVGFtc3VpWGlueWkgTGluZVxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNzFcIiwgU3RhdGlvbklEOltcIlIyOFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA3MFwiLCBTdGF0aW9uSUQ6W1wiUjI3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDY5XCIsIFN0YXRpb25JRDpbXCJSMjZcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNjhcIiwgU3RhdGlvbklEOltcIlIyNVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA2N1wiLCBTdGF0aW9uSUQ6W1wiUjI0XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDY2XCIsIFN0YXRpb25JRDpbXCJSMjNcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNjRcIiwgU3RhdGlvbklEOltcIlIyMlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA2M1wiLCBTdGF0aW9uSUQ6W1wiUjIxXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDYyXCIsIFN0YXRpb25JRDpbXCJSMjBcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNjFcIiwgU3RhdGlvbklEOltcIlIxOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA2MFwiLCBTdGF0aW9uSUQ6W1wiUjE4XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDU5XCIsIFN0YXRpb25JRDpbXCJSMTdcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNThcIiwgU3RhdGlvbklEOltcIlIxNlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA1N1wiLCBTdGF0aW9uSUQ6W1wiUjE1XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDU2XCIsIFN0YXRpb25JRDpbXCJSMTRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTVcIiwgU3RhdGlvbklEOltcIlIxM1wiLFwiTzExXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDU0XCIsIFN0YXRpb25JRDpbXCJSMTJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTNcIiwgU3RhdGlvbklEOltcIlIxMVwiLFwiRzE0XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDUxXCIsIFN0YXRpb25JRDpbXCJSMTBcIixcIkJMMTJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTBcIiwgU3RhdGlvbklEOltcIlIwOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEzNFwiLCBTdGF0aW9uSUQ6W1wiUjA3XCIsXCJPMDZcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMDNcIiwgU3RhdGlvbklEOltcIlIwNlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAxMVwiLCBTdGF0aW9uSUQ6W1wiUjA1XCIsXCJCUjA5XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTAxXCIsIFN0YXRpb25JRDpbXCJSMDRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMDBcIiwgU3RhdGlvbklEOltcIlIwM1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA5OVwiLCBTdGF0aW9uSUQ6W1wiUjAyXCJdfSxcbiAgICAgICAgICAgIC8vWmhvbmdIZVhpbkx1IExpbmVcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDQ4XCIsIFN0YXRpb25JRDpbXCJPMDFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNDdcIiwgU3RhdGlvbklEOltcIk8wMlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA0NlwiLCBTdGF0aW9uSUQ6W1wiTzAzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDQ1XCIsIFN0YXRpb25JRDpbXCJPMDRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMzFcIiwgU3RhdGlvbklEOltcIk8wOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEzMFwiLCBTdGF0aW9uSUQ6W1wiTzEwXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTI4XCIsIFN0YXRpb25JRDpbXCJPMTJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMjdcIiwgU3RhdGlvbklEOltcIk8xM1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEyNlwiLCBTdGF0aW9uSUQ6W1wiTzE0XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTI1XCIsIFN0YXRpb25JRDpbXCJPMTVcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMjRcIiwgU3RhdGlvbklEOltcIk8xNlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEyM1wiLCBTdGF0aW9uSUQ6W1wiTzE3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTIyXCIsIFN0YXRpb25JRDpbXCJPMThcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMjFcIiwgU3RhdGlvbklEOltcIk8xOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzE4MFwiLCBTdGF0aW9uSUQ6W1wiTzIwXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTc5XCIsIFN0YXRpb25JRDpbXCJPMjFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xNzhcIiwgU3RhdGlvbklEOltcIk81MFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzE3N1wiLCBTdGF0aW9uSUQ6W1wiTzUxXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTc2XCIsIFN0YXRpb25JRDpbXCJPNTJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xNzVcIiwgU3RhdGlvbklEOltcIk81M1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzE3NFwiLCBTdGF0aW9uSUQ6W1wiTzU0XCJdfSxcbiAgICAgICAgICAgIC8vU29uZ1NoYW5YaW5EaWFuIExpbmVcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTExXCIsIFN0YXRpb25JRDpbXCJHMTlcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMTBcIiwgU3RhdGlvbklEOltcIkcxOFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEwOVwiLCBTdGF0aW9uSUQ6W1wiRzE3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDA5XCIsIFN0YXRpb25JRDpbXCJHMTZcIixcIkJSMTFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMzJcIiwgU3RhdGlvbklEOltcIkcxNVwiLFwiTzA4XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTA1XCIsIFN0YXRpb25JRDpbXCJHMTNcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNDNcIiwgU3RhdGlvbklEOltcIkcxMVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA0MlwiLCBTdGF0aW9uSUQ6W1wiRzEwXCIsXCJSMDhcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNDFcIiwgU3RhdGlvbklEOltcIkcwOVwiLFwiTzA1XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDQwXCIsIFN0YXRpb25JRDpbXCJHMDhcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzlcIiwgU3RhdGlvbklEOltcIkcwN1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAzOFwiLCBTdGF0aW9uSUQ6W1wiRzA2XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDM3XCIsIFN0YXRpb25JRDpbXCJHMDVcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzZcIiwgU3RhdGlvbklEOltcIkcwNFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAzNVwiLCBTdGF0aW9uSUQ6W1wiRzAzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDM0XCIsIFN0YXRpb25JRDpbXCJHMDJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzNcIiwgU3RhdGlvbklEOltcIkcwMVwiXX1cbiAgICAgICAgXSxcbiAgICAgICAgbGluZTogW3tcbiAgICAgICAgICAgIGlkOiAndHJ0Y18xJyxcbiAgICAgICAgICAgIExpbmVJRDogJ0JSJyxcbiAgICAgICAgICAgIHJvdXRlOiBbe1xuICAgICAgICAgICAgICAgIGRpcjogMCxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnQlItMScsIGZyb206ICdCUjAxJywgdG86ICdCUjI0J31dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGlyOiAxLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdCUi0xJywgZnJvbTogJ0JSMjQnLCB0bzogJ0JSMDEnfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAndHJ0Y18yJyxcbiAgICAgICAgICAgIExpbmVJRDogJ1InLFxuICAgICAgICAgICAgcm91dGU6IFt7XG4gICAgICAgICAgICAgICAgZGlyOiAwLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMCxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdSLTEnLCBmcm9tOiAnUjAyJywgdG86ICdSMjgnfSwge1JvdXRlSUQ6ICdSLTInLCBmcm9tOiAnUjA1JywgdG86ICdSMjInfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkaXI6IDEsXG4gICAgICAgICAgICAgICAgRGlyZWN0aW9uOiAxLFxuICAgICAgICAgICAgICAgIHdvcms6IFt7Um91dGVJRDogJ1ItMScsIGZyb206ICdSMjgnLCB0bzogJ1IwMid9LCB7Um91dGVJRDogJ1ItMicsIGZyb206ICdSMjInLCB0bzogJ1IwNSd9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd0cnRjXzMnLFxuICAgICAgICAgICAgTGluZUlEOiAnRycsXG4gICAgICAgICAgICByb3V0ZTogW3tcbiAgICAgICAgICAgICAgICBkaXI6IDAsXG4gICAgICAgICAgICAgICAgRGlyZWN0aW9uOiAwLFxuICAgICAgICAgICAgICAgIHdvcms6IFt7Um91dGVJRDogJ0ctMScsIGZyb206ICdHMDEnLCB0bzogJ0cxOSd9LCB7Um91dGVJRDogJ0ctMicsIGZyb206ICdHMDgnLCB0bzogJ0cxOSd9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRpcjogMSxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDEsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnRy0xJywgZnJvbTogJ0cxOScsIHRvOiAnRzAxJ30sIHtSb3V0ZUlEOiAnRy0yJywgZnJvbTogJ0cxOScsIHRvOiAnRzA4J31dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ3RydGNfNCcsXG4gICAgICAgICAgICBMaW5lSUQ6ICdPJyxcbiAgICAgICAgICAgIHJvdXRlOiBbe1xuICAgICAgICAgICAgICAgIGRpcjogMCxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnTy0xJywgZnJvbTogJ08wMScsIHRvOiAnTzIxJ30sIHtSb3V0ZUlEOiAnTy0yJywgZnJvbTogJ08wMScsIHRvOiAnTzU0J31dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGlyOiAxLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdPLTEnLCBmcm9tOiAnTzIxJywgdG86ICdPMDEnfSwge1JvdXRlSUQ6ICdPLTInLCBmcm9tOiAnTzU0JywgdG86ICdPMDEnfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAndHJ0Y181JyxcbiAgICAgICAgICAgIExpbmVJRDogJ0JMJyxcbiAgICAgICAgICAgIHJvdXRlOiBbe1xuICAgICAgICAgICAgICAgIGRpcjogMCxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnQkwtMScsIGZyb206ICdCTDAxJywgdG86ICdCTDIzJ30sIHtSb3V0ZUlEOiAnQkwtMicsIGZyb206ICdCTDA1JywgdG86ICdCTDIzJ31dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGlyOiAxLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdCTC0xJywgZnJvbTogJ0JMMjMnLCB0bzogJ0JMMDEnfSwge1JvdXRlSUQ6ICdCTC0yJywgZnJvbTogJ0JMMjMnLCB0bzogJ0JMMDUnfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwRGF0YTsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uLmpzJztcbmltcG9ydCBwdHggZnJvbSAnLi9wdHguanMnO1xuaW1wb3J0IHBEYXRhIGZyb20gJy4vZGF0YS5qcyc7XG5cbmxldCBidXNVUkwgPSBjb21tb24uYnVzVVJMO1xuXG52YXIgZm5CVVMgPSB7XG4gICAgc2V0RGVmYXVsdENmZzogZnVuY3Rpb24oY2ZnKXtcbiAgICAgICAgY2ZnID0gY2ZnIHx8IHt9O1xuICAgICAgICBjZmcubWFuYWdlQnkgPSBjZmcubWFuYWdlQnkgfHwgJ0NpdHknOy8vQ2l0eSAsIEludGVyQ2l0eVxuICAgICAgICBjZmcuY2JGbiA9IGNmZy5jYkZuIHx8IGZ1bmN0aW9uKGRhdGEsZSl7Y29uc29sZS5pbmZvKGRhdGEpO307XG4gICAgICAgIGNmZy5zZWxlY3RGaWVsZCA9IChjZmcuc2VsZWN0RmllbGQpID8gcHR4LnNlbGVjdEZpZWxkRm4oY2ZnLnNlbGVjdEZpZWxkKSA6ICcnO1xuICAgICAgICBjZmcudG9wID0gMzAwMDtcbiAgICAgICAgcmV0dXJuIGNmZztcbiAgICB9LFxuICAgIGdldENpdHlEYXRhOiBmdW5jdGlvbihzdHIpe1xuICAgICAgICB2YXIgYXJ5ID0gcERhdGEuYnVzLmNpdHk7XG4gICAgICAgIHZhciBydCA9IGZhbHNlO1xuICAgICAgICBmb3IodmFyIGk9MDsgaTxhcnkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYoYXJ5W2ldLm5hbWU9PXN0ciB8fCBhcnlbaV0uQ2l0eT09c3RyIHx8IGFyeVtpXS5DaXR5Q29kZT09c3RyKXtcbiAgICAgICAgICAgIHJ0ID0gYXJ5W2ldO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ0O1xuICAgIH0sXG4gICAgZ2V0QnVzQXJyaXZlVGltZTogZnVuY3Rpb24oU3RvcFVJRCwgY2l0eSwgY2ZnKXtcbiAgICAgICAgdmFyIGZpbHRlclN0ciA9IHB0eC5maWx0ZXJGbihwdHguZmlsdGVyUGFyYW0oJ1N0b3BVSUQnLCc9PScsU3RvcFVJRCwnb3InKSk7XG4gICAgICAgIHRoaXMuZ2V0RXN0aW1hdGVkVGltZU9mQXJyaXZhbChmaWx0ZXJTdHIsIGNpdHksIGNmZyk7XG4gICAgfSxcbiAgICBnZXRCdXNSb3V0ZUFycml2ZVRpbWU6IGZ1bmN0aW9uKFJvdXRlVUlELCBjZmcpe1xuICAgICAgICB2YXIgY2l0eSA9IFJvdXRlVUlELnN1YnN0cigwLDMpO1xuICAgICAgICB2YXIgZmlsdGVyU3RyID0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnUm91dGVVSUQnLCc9PScsUm91dGVVSUQsJ29yJykpO1xuICAgICAgICB0aGlzLmdldEVzdGltYXRlZFRpbWVPZkFycml2YWwoZmlsdGVyU3RyLCBjaXR5LCBjZmcpO1xuICAgIH0sXG4gICAgZ2V0QnVzUm91dGVJbmZvOiBmdW5jdGlvbihSb3V0ZVVJRCwgY2ZnKXtcbiAgICAgICAgY2ZnID0gdGhpcy5zZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgICAgIHZhciBjaXR5ID0gUm91dGVVSUQuc3Vic3RyKDAsMyk7XG4gICAgICAgIHZhciBteVVSTCA9IGJ1c1VSTCArICcvUm91dGUvJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnUm91dGVVSUQnLCc9PScsUm91dGVVSUQpICsgJyYnICsgcHR4LnRvcEZuKCkpO1xuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH0sXG4gICAgZ2V0QnVzUmVhbHRpbWVOZWFyU3RvcDogZnVuY3Rpb24oUm91dGVVSUQsIGRpciwgY2ZnKXtcbiAgICAgICAgY2ZnID0gdGhpcy5zZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgICAgIHZhciBjaXR5ID0gUm91dGVVSUQuc3Vic3RyKDAsMyk7XG4gICAgICAgIGlmKC9zdHJpbmd8bnVtYmVyLy50ZXN0KHR5cGVvZihkaXIpKSl7XG4gICAgICAgICAgICBkaXIgPSBkaXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHZhciBteVVSTCA9IGJ1c1VSTCArICcvUmVhbFRpbWVOZWFyU3RvcC8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJz8nO1xuICAgICAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbShbJ1JvdXRlVUlEJywgJ0RpcmVjdGlvbiddLCc9PScsW1JvdXRlVUlELCBkaXJdLCdhbmQnKSkgKyAnJicgKyBwdHgudG9wRm4oKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgbXlVUkwgPSBidXNVUkwgKyAnL1JlYWxUaW1lTmVhclN0b3AvJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgICAgIG15VVJMICs9IHB0eC5maWx0ZXJGbihwdHguZmlsdGVyUGFyYW0oWydSb3V0ZVVJRCddLCc9PScsW1JvdXRlVUlEXSwnYW5kJykpICsgJyYnICsgcHR4LnRvcEZuKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2ZnLnNlbGVjdEZpZWxkKSBteVVSTCArPSAnJicgKyBjZmcuc2VsZWN0RmllbGQ7XG4gICAgICAgIHB0eC5nZXRVUkwobXlVUkwsIGNmZy5jYkZuKTtcbiAgICB9LFxuICAgIGdldEJ1c1JvdXRlOiBmdW5jdGlvbihSb3V0ZVVJRCwgY2ZnLCBjaXR5KXtcbiAgICAgICAgY2ZnID0gdGhpcy5zZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgICAgIGlmKCFjaXR5KXtcbiAgICAgICAgICAgIGlmKHR5cGVvZihSb3V0ZVVJRCk9PSdzdHJpbmcnKXtjaXR5ID0gUm91dGVVSUQuc3Vic3RyKDAsMyk7fVxuICAgICAgICAgICAgZWxzZXtjaXR5ID0gUm91dGVVSURbMF0uc3Vic3RyKDAsMyk7fVxuICAgICAgICB9XG4gICAgICAgIHZhciBteVVSTCA9IGJ1c1VSTCArICcvUm91dGUvJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnUm91dGVVSUQnLCc9PScsUm91dGVVSUQpLCdvcicpICsgJyYnICsgcHR4LnRvcEZuKCk7XG4gICAgICAgIGlmKGNmZy5zZWxlY3RGaWVsZCkgbXlVUkwgKz0gJyYnICsgY2ZnLnNlbGVjdEZpZWxkO1xuICAgICAgICBwdHguZ2V0VVJMKG15VVJMLCBjZmcuY2JGbik7XG4gICAgfSxcbiAgICBnZXRCdXNTdGF0aW9uOiBmdW5jdGlvbihTdGF0aW9uSUQsIGNpdHksIGNmZyl7XG4gICAgICAgIGNmZyA9IHRoaXMuc2V0RGVmYXVsdENmZyhjZmcpO1xuICAgICAgICB2YXIgbXlVUkwgPSBidXNVUkwgKyAnL1N0YXRpb24vJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnU3RhdGlvbklEJywnPT0nLFN0YXRpb25JRC50b1N0cmluZygpKSkgKyAnJicgKyBwdHgudG9wRm4oKTtcbiAgICAgICAgaWYoY2ZnLnNlbGVjdEZpZWxkKSBteVVSTCArPSAnJicgKyBjZmcuc2VsZWN0RmllbGQ7XG4gICAgICAgIHB0eC5nZXRVUkwobXlVUkwsIGNmZy5jYkZuKTtcbiAgICB9LFxuICAgIGdldEJ1c1N0b3BSb3V0ZTogZnVuY3Rpb24oUm91dGVVSUQsIGNpdHksIGNmZyl7XG4gICAgICAgIGNmZyA9IHRoaXMuc2V0RGVmYXVsdENmZyhjZmcpO1xuICAgICAgICB2YXIgbXlVUkwgPSBidXNVUkwgKyAnL1N0b3BPZlJvdXRlLycgKyBjZmcubWFuYWdlQnkgKyAnLycgKyB0aGlzLmdldENpdHlEYXRhKGNpdHkpLkNpdHkgKyAnPyc7XG4gICAgICAgIG15VVJMICs9IHB0eC5maWx0ZXJGbihwdHguZmlsdGVyUGFyYW0oJ1JvdXRlVUlEJywnPT0nLFJvdXRlVUlELnRvU3RyaW5nKCkpKSArICcmJztcbiAgICAgICAgbXlVUkwgKz0gcHR4Lm9yZGVyQnlGbignU3ViUm91dGVOYW1lL1poX3R3JywgJ2FzYycpICsgJyYnICsgcHR4LnRvcEZuKCk7XG4gICAgICAgIGlmKGNmZy5zZWxlY3RGaWVsZCkgbXlVUkwgKz0gJyYnICsgY2ZnLnNlbGVjdEZpZWxkO1xuICAgICAgICBwdHguZ2V0VVJMKG15VVJMLCBjZmcuY2JGbik7XG4gICAgfSxcbiAgICBnZXRCdXNTdG9wUm91dGVCeU51bWJlcjogZnVuY3Rpb24oYnVzTnVtYmVyLCBjaXR5LCBjZmcpe1xuICAgICAgICBjZmcgPSB0aGlzLnNldERlZmF1bHRDZmcoY2ZnKTtcbiAgICAgICAgdmFyIG15VVJMID0gYnVzVVJMICsgJy9TdG9wT2ZSb3V0ZS8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJy8nICsgZW5jb2RlVVJJKGJ1c051bWJlcikgKyAnPyc7XG4gICAgICAgIG15VVJMICs9IHB0eC5vcmRlckJ5Rm4oJ1N1YlJvdXRlTmFtZS9aaF90dycsICdhc2MnKSArICcmJyArIHB0eC50b3BGbigpO1xuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH0sXG4gICAgZ2V0RXN0aW1hdGVkVGltZU9mQXJyaXZhbDogZnVuY3Rpb24oZmlsdGVyU3RyLCBjaXR5LCBjZmcpe1xuICAgICAgICBmaWx0ZXJTdHIgPSAoZmlsdGVyU3RyKSA/IGZpbHRlclN0ciArICcmJyA6ICcnO1xuICAgICAgICBjZmcgPSB0aGlzLnNldERlZmF1bHRDZmcoY2ZnKTtcbiAgICAgICAgdmFyIG15VVJMID0gYnVzVVJMICsgJy9Fc3RpbWF0ZWRUaW1lT2ZBcnJpdmFsLycgKyBjZmcubWFuYWdlQnkgKyAnLycgKyB0aGlzLmdldENpdHlEYXRhKGNpdHkpLkNpdHkgKyAnPyc7XG4gICAgICAgIG15VVJMICs9IGZpbHRlclN0ciArIHB0eC50b3BGbigpO1xuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH0sXG4gICAgc2VhcmNoQnVzQnlOdW1iZXI6ZnVuY3Rpb24oYnVzTnVtYmVyLCBjaXR5LCBjZmcpe1xuICAgICAgICBjZmcgPSB0aGlzLnNldERlZmF1bHRDZmcoY2ZnKTtcbiAgICAgICAgdmFyIG15VVJMID0gYnVzVVJMICsgJy9Sb3V0ZS8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJy8nICsgZW5jb2RlVVJJKGJ1c051bWJlcikgKyAnPyc7XG4gICAgICAgIG15VVJMICs9IHB0eC5vcmRlckJ5Rm4oJ1JvdXRlTmFtZS9aaF90dycsICdhc2MnKSArICcmJyArIHB0eC50b3BGbigpO1xuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZm5CVVM7IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi5qcyc7XG5pbXBvcnQgcHR4IGZyb20gJy4vcHR4LmpzJztcbmltcG9ydCBwRGF0YSBmcm9tICcuL2RhdGEuanMnO1xuXG5jb25zdCBtZXRyb1VSTCA9IGNvbW1vbi5tZXRyb1VSTDtcbmNvbnN0IHVybHMgPSB7XG4gICAgTmV0d29yazogbWV0cm9VUkwgKyAnL05ldHdvcmsnLCAvL+WPluW+l+aNt+mBi+i3r+e2suizh+aWmVxuICAgIExJTkU6IG1ldHJvVVJMICsgJy9MSU5FLycsIC8v5Y+W5b6X5o236YGL6Lev57ea5Z+65pys6LOH5paZXG4gICAgU3RhdGlvbjogbWV0cm9VUkwgKyAnL1N0YXRpb24vJywgLy/lj5blvpfmjbfpgYvou4rnq5nln7rmnKzos4fmlplcbiAgICBTdGF0aW9uT2ZMaW5lOiBtZXRyb1VSTCArICcvU3RhdGlvbk9mTGluZS8nLCAvL+WPluW+l+aNt+mBi+i3r+e3mui7iuermeWfuuacrOizh+aWmVxuICAgIExpbmVUcmFuc2ZlcjogbWV0cm9VUkwgKyAnL0xpbmVUcmFuc2Zlci8nLCAvL+WPluW+l+aNt+mBi+i3r+e3muermemWk+i9ieS5mOWfuuacrOizh+aWmVxuICAgIFN0YXRpb25GYWNpbGl0eTogbWV0cm9VUkwgKyAnL1N0YXRpb25GYWNpbGl0eS8nLCAvL+WPluW+l+aNt+mBi+i7iuermeioreaWveizh+aWmVxuICAgIFN0YXRpb25FeGl0OiBtZXRyb1VSTCArICcvU3RhdGlvbkV4aXQvJywgLy/lj5blvpfmjbfpgYvou4rnq5nlh7rlhaXlj6Pln7rmnKzos4fmlplcbiAgICBSb3V0ZTogbWV0cm9VUkwgKyAnL1JvdXRlLycsIC8v5Y+W5b6X5o236YGL54ef6YGL6Lev57ea5Z+65pys6LOH5paZXG4gICAgU3RhdGlvbk9mUm91dGU6IG1ldHJvVVJMICsgJy9TdGF0aW9uT2ZSb3V0ZS8nLCAvL+WPluW+l+aNt+mBi+eHn+mBi+i3r+e3mui7iuermeWfuuacrOizh+aWmVxuICAgIEZpcnN0TGFzdFRpbWV0YWJsZTogbWV0cm9VUkwgKyAnL0ZpcnN0TGFzdFRpbWV0YWJsZS8nLCAvL+WPluW+l+aNt+mBi+mmluacq+ePrei7iuaZguWIu+ihqOizh+aWmVxuICAgIEZyZXF1ZW5jeTogbWV0cm9VUkwgKyAnL0ZyZXF1ZW5jeS8nLCAvL+WPluW+l+aNt+mBi+i3r+e3mueZvOi7iuePrei3nemgu+eOh+izh+aWmVxuICAgIFMyU1RyYXZlbFRpbWU6IG1ldHJvVVJMICsgJy9TMlNUcmF2ZWxUaW1lLycsIC8v5Y+W5b6X5o236YGL5YiX6LuK56uZ6ZaT6YGL6KGM5pmC6ZaT6LOH5paZXG4gICAgT0RGYXJlOiBtZXRyb1VSTCArICcvT0RGYXJlLycsIC8v5Y+W5b6X5o236YGL6LW36L+E56uZ6ZaT56Wo5YO56LOH5paZXG4gICAgTGl2ZUJvYXJkOiBtZXRyb1VSTCArICcvTGl2ZUJvYXJkLycsIC8v5Y+W5b6X5o236YGL6LW36L+E56uZ6ZaT56Wo5YO56LOH5paZXG4gICAgU3RhdGlvblRpbWVUYWJsZTogbWV0cm9VUkwgKyAnL1N0YXRpb25UaW1lVGFibGUvJywgLy/lj5blvpfmjbfpgYvnq5nliKXmmYLliLvooajos4fmlplcbiAgICBTaGFwZTogbWV0cm9VUkwgKyAnL1NoYXBlLycgLy/lj5blvpfmjIflrprnh5/pgYvmpa3ogIXkuYvou4zpgZPot6/ntrLlr6bpq5Tot6/nt5rlnJbos4fos4fmlplcbn1cbmNvbnN0IGNvbXBhbnlUYWcgPSB7XG4gICAgdHJ0YzogJ1RSVEMnLFxuICAgIHR5bWV0cm86ICdUWU1DJyxcbiAgICBrbHJ0OiAnS0xSVCcsXG4gICAga3J0YzogJ0tSVEMnXG59XG5cbmxldCBnZXRQVFggPSBwdHguZ2V0UHJvbWlzZVVSTDtcblxuZnVuY3Rpb24gc2V0RGVmYXVsdENmZyhjZmc9e30pe1xuICAgIGlmKHR5cGVvZihjZmcpPT0nc3RyaW5nJykgY2ZnID0ge3BhcmFtRGlyZWN0bHlVc2U6IGNmZ307Ly/oi6XlgrPlhaXnmoTngrrlrZfkuLLku6Pooajnm7TmjqXnlKjmlrzmnIDlvoznmoTlj4PmlbjkuI3pnIDlho3oqr/mlbRcbiAgICBjZmcuY2JGbiA9IGNmZy5jYkZuIHx8IGZ1bmN0aW9uKGRhdGEsZSl7fTtcbiAgICBjZmcuc2VsZWN0RmllbGQgPSAoY2ZnLnNlbGVjdEZpZWxkKSA/IHB0eC5zZWxlY3RGaWVsZEZuKGNmZy5zZWxlY3RGaWVsZCkgOiAnJztcbiAgICBjZmcudG9wID0gMzAwMDtcbiAgICBjZmcuZm9ybWF0ID0gJ0pTT04nO1xuICAgIHJldHVybiBjZmc7XG59XG5mdW5jdGlvbiBwcm9jZXNzQ2ZnKGNmZyl7Ly/lsIcgY2ZnIOi9ieeCuuWwjeaHieeahOWPg+aVuFxuICAgIGlmKGNmZy5wYXJhbURpcmVjdGx5VXNlKSByZXR1cm4gY2ZnLnBhcmFtRGlyZWN0bHlVc2U7XG4gICAgdmFyIGFyeVBhcmFtID0gW107XG4gICAgaWYoY2ZnLnNlbGVjdEZpZWxkKSBhcnlQYXJhbS5wdXNoKHB0eC5zZWxlY3RGaWVsZEZuKGNmZy5zZWxlY3RGaWVsZCkpO1xuICAgIGlmKGNmZy5maWx0ZXJCeSkgYXJ5UGFyYW0ucHVzaChwdHguZmlsdGVyRm4oY2ZnLmZpbHRlckJ5KSk7XG4gICAgaWYoY2ZnLm9yZGVyQnkpe1xuICAgICAgICB2YXIgZGlyID0gY2ZnLm9yZGVyRGlyIHx8IGZhbHNlO1xuICAgICAgICBhcnlQYXJhbS5wdXNoKHB0eC5vcmRlckJ5Rm4oY2ZnLm9yZGVyQnksIGRpcikpO1xuICAgIH1cbiAgICBhcnlQYXJhbS5wdXNoKHB0eC50b3BGbihjZmcudG9wLCBjZmcuZm9ybWF0KSk7Ly/mnIDlvozliqDpgJnlgItcblxuICAgIHJldHVybiAnPycgKyBhcnlQYXJhbS5qb2luKCcmJyk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBhbnlUYWcobmFtZSl7IHJldHVybiBjb21wYW55VGFnW25hbWVdIHx8IG5hbWU7IH1cblxuZnVuY3Rpb24gX0xJTkUoY29tcGFueVRhZywgY2ZnKXtcbiAgICBjZmcgPSBzZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgdmFyIHBhcmFtID0gcHJvY2Vzc0NmZyhjZmcpO1xuICAgIHJldHVybiBnZXRQVFgodXJscy5MSU5FICsgY29tcGFueVRhZyArIHBhcmFtKTtcbn1cblxuZnVuY3Rpb24gX1N0YXRpb25PZkxpbmUoY29tcGFueVRhZywgY2ZnKXtcbiAgICBjZmcgPSBzZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgdmFyIHBhcmFtID0gcHJvY2Vzc0NmZyhjZmcpO1xuICAgIHJldHVybiBnZXRQVFgodXJscy5TdGF0aW9uT2ZMaW5lICsgY29tcGFueVRhZyArIHBhcmFtKTtcbn1cblxudmFyIG1ldHJvID0ge1xuICAgIGdldENvbXBhbnlUYWc6IGdldENvbXBhbnlUYWcsXG4gICAgX0xJTkU6IF9MSU5FLFxuICAgIF9TdGF0aW9uT2ZMaW5lOiBfU3RhdGlvbk9mTGluZSxcbiAgICB1cmxzOiB1cmxzLFxuICAgIGNvbXBhbnlUYWc6IGNvbXBhbnlUYWdcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWV0cm87IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi5qcyc7XG5pbXBvcnQgcHR4IGZyb20gJy4vcHR4LmpzJztcbmltcG9ydCBwRGF0YSBmcm9tICcuL2RhdGEuanMnO1xuaW1wb3J0IG1ldHJvIGZyb20gJy4vbWV0cm8uanMnO1xuXG5jb25zdCBjb21wYW55VGFnID0gbWV0cm8uZ2V0Q29tcGFueVRhZygndHJ0YycpO1xuXG5mdW5jdGlvbiB0ZXN0RmV0Y2goY21kKXtcbiAgICBpZih0eXBlb2YoZm5UUlRDW2NtZF0pPT0nZnVuY3Rpb24nKXtcbiAgICAgICAgcmV0dXJuIGZuVFJUQ1tjbWRdKCkudGhlbihmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhlKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oZSk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuZnVuY3Rpb24gX0xJTkUoY2ZnKXsgcmV0dXJuIG1ldHJvLl9MSU5FKGNvbXBhbnlUYWcsIGNmZyk7IH1cbmZ1bmN0aW9uIF9TdGF0aW9uT2ZMaW5lKGNmZyl7IHJldHVybiBtZXRyby5fU3RhdGlvbk9mTGluZShjb21wYW55VGFnLCBjZmcpOyB9XG5cbnZhciBmblRSVEMgPSB7XG4gICAgY2hlY2tSb3V0ZUlkT25Vc2U6IGZ1bmN0aW9uKFJvdXRlSUQsIExpbmVJRCl7XG4gICAgICAgIHZhciBsaW5lRGF0YSA9IHRoaXMuZ2V0TGluZURhdGEoTGluZUlEKTtcbiAgICAgICAgdmFyIHJ0ID0gZmFsc2U7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGxpbmVEYXRhLnJvdXRlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGZvcih2YXIgaj0wOyBqPGxpbmVEYXRhLnJvdXRlW2ldLndvcmsubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgIGlmKGxpbmVEYXRhLnJvdXRlW2ldLndvcmtbal0uUm91dGVJRD09Um91dGVJRCl7XG4gICAgICAgICAgICAgICAgICAgIHJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydDtcbiAgICB9LFxuICAgIGdldExpbmVEYXRhOiBmdW5jdGlvbihpZCl7XG4gICAgICAgIHZhciBydCA9IGZhbHNlO1xuICAgICAgICBwRGF0YS50cnRjLmxpbmUuZm9yRWFjaChmdW5jdGlvbihjKXtcbiAgICAgICAgICAgIGlmKGMuaWQ9PWlkIHx8IGMuTGluZUlEPT1pZCl7XG4gICAgICAgICAgICAgICAgcnQgPSBjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJ0O1xuICAgIH0sXG4gICAgZ2V0TGluZUlEOiBmdW5jdGlvbihpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldExpbmVEYXRhKGlkKS5MaW5lSUQ7XG4gICAgfSxcbiAgICBnZXRPcmlnaW5hbExpbmVCeUxpbmVJRDogZnVuY3Rpb24oTGluZUlEKXtcbiAgICAgICAgdmFyIHJ0ID0gZmFsc2U7XG4gICAgICAgIHBEYXRhLnRydGMubGluZS5mb3JFYWNoKGZ1bmN0aW9uKGMpe1xuICAgICAgICAgICAgaWYoYy5MaW5lSUQ9PUxpbmVJRCl7XG4gICAgICAgICAgICAgICAgcnQgPSBjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJ0O1xuICAgIH0sXG4gICAgZ2V0U3RhdGlvbklEQXJ5OiBmdW5jdGlvbihpZCl7XG4gICAgICAgIHZhciBhcnkgPSBwRGF0YS50cnRjLnN0YXRpb25fYXJ5O1xuICAgICAgICB2YXIgc3REYXRhID0gZmFsc2U7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGFyeS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihhcnlbaV0uaWQ9PWlkKXtcbiAgICAgICAgICAgICAgICBzdERhdGEgPSBhcnlbaV0uU3RhdGlvbklEO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdERhdGE7XG4gICAgfSxcbiAgICBnZXRTdGF0aW9uSUQ6IGZ1bmN0aW9uKGlkLCBsaW5lT3JpZ2luYWxJRCl7XG4gICAgICAgIHZhciBMaW5lSUQgPSAoL150cnRjLy50ZXN0KGxpbmVPcmlnaW5hbElEKSkgPyB0aGlzLmdldExpbmVJRChsaW5lT3JpZ2luYWxJRCkgOiBsaW5lT3JpZ2luYWxJRDtcbiAgICAgICAgdmFyIHN0RGF0YSA9IHRoaXMuZ2V0U3RhdGlvbklEQXJ5KGlkKTtcbiAgICAgICAgaWYoIUxpbmVJRCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyIHJ0ID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgbGluZUNvZGUgPSAnJyxcbiAgICAgICAgICAgICAgICBjb2RlTGVuID0gMDtcbiAgICAgICAgICAgIHN0RGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGMpe1xuICAgICAgICAgICAgICAgIGlmKC9eW2EtekEtWl17MX1cXGR7Mn0vZ2kudGVzdChjKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvZGVMZW4gPSAxO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKC9eW2EtekEtWl17Mn1cXGR7Mn0vZ2kudGVzdChjKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvZGVMZW4gPSAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaW5lQ29kZSA9IGMuc3Vic3RyKDAsIGNvZGVMZW4pO1xuICAgICAgICAgICAgICAgIGlmKGxpbmVDb2RlID09IExpbmVJRCl7XG4gICAgICAgICAgICAgICAgICAgIHJ0ID0gYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBydDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3RhdGlvbklESW5XaGF0TGluZTogZnVuY3Rpb24oU3RhdGlvaW5JRCl7XG4gICAgICAgIGlmKC9eW2EtekEtWl17MX1cXGR7Mn0vZ2kudGVzdChTdGF0aW9pbklEKSl7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGlvaW5JRC5zdWJzdHIoMCwxKTtcbiAgICAgICAgfWVsc2UgaWYoL15bYS16QS1aXXsyfVxcZHsyfS9naS50ZXN0KFN0YXRpb2luSUQpKXtcbiAgICAgICAgICAgIHJldHVybiBTdGF0aW9pbklELnN1YnN0cigwLDIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdGF0aW9uVGltZTogZnVuY3Rpb24oTGluZUlELCBTdGF0aW9uSUQsIHcsIGNiRm4pe1xuICAgICAgICB2YXIgdGFyZ2V0SUQgPSBmYWxzZTtcbiAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgaWYodHlwZW9mKFN0YXRpb25JRCkhPSdzdHJpbmcnICYmIFN0YXRpb25JRC5sZW5ndGg9PTIpe1xuICAgICAgICAgICAgdGFyZ2V0SUQgPSBTdGF0aW9uSURbMV07XG4gICAgICAgICAgICBTdGF0aW9uSUQgPSBTdGF0aW9uSURbMF07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIFdlZWsgPSBmYWxzZTtcbiAgICAgICAgaWYodHlwZW9mKHcpPT0nbnVtYmVyJykgV2VlayA9IGNvbW1vbi5wdHhNUlRXZWVrU3RyW3ddO1xuICAgICAgICB2YXIgbXRTdHIgPSBcIiRmaWx0ZXI9TGluZUlEIGVxICdcIiArIExpbmVJRCArIFwiJyBhbmQgU3RhdGlvbklEIGVxICdcIiArIFN0YXRpb25JRCArIFwiJ1wiO1xuICAgICAgICBpZihXZWVrKSBtdFN0ciArPSAnIGFuZCBTZXJ2aWNlRGF5cy8nICsgV2VlayArICcgZXEgdHJ1ZSc7XG4gICAgICAgIHZhciB1cmwgPSBjb21tb24ubWV0cm9VUkwgKyAnL1N0YXRpb25UaW1lVGFibGUvVFJUQz8nICsgZW5jb2RlVVJJKG10U3RyKSArICcmJHRvcD0zMDAwJiRmb3JtYXQ9SlNPTic7XG4gICAgICAgIGNvbW1vbi5wdWkucHJpbnRTdGF0dXMoJ+e3muS4iuWwi+aJvuaNt+mBiyAnICsgU3RhdGlvbklEICsgJyDnq5nmmYLliLvooagnKTtcbiAgICAgICAgLy/nlKLnlJ/mmqvlrZjmmYLliLvooajnqbrplpNcbiAgICAgICAgaWYoIXB0eC50ZW1wVGltZVRhYmxlLnRydGMpIHB0eC50ZW1wVGltZVRhYmxlLnRydGMgPSB7fTtcbiAgICAgICAgaWYoIXB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXSkgcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdID0gW107XG4gICAgICAgIGlmKCFwdHgudGVtcFRpbWVUYWJsZS50cnRjW0xpbmVJRF1bU3RhdGlvbklEXSkgcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF0gPSBbXTtcbiAgICAgICAgcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF1bd10gPSBbW10sW11dOy8vRGlyZWN0aW9uIDAgYW5kIDFcbiAgICAgICAgLy/mipPmmYLliLvooahcbiAgICAgICAgcHR4LmdldFVSTCh1cmwsIGZ1bmN0aW9uKGpzb24sIGUpe1xuICAgICAgICAgICAgaWYoZS5zdGF0dXM9PWNvbW1vbi5DT05TVF9QVFhfQVBJX0ZBSUwpe1xuICAgICAgICAgICAgICAgIGNiRm4oanNvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAganNvbi5mb3JFYWNoKGZ1bmN0aW9uKHJvdXRlQSl7XG4gICAgICAgICAgICAgICAgdmFyIHRtcEFyeSA9IHB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddO1xuICAgICAgICAgICAgICAgIHZhciB0bXBUaW1lQXJ5ID0gcm91dGVBLlRpbWV0YWJsZXMubWFwKGZ1bmN0aW9uKHRpbWVPYmope1xuICAgICAgICAgICAgICAgICAgICB0aW1lT2JqLnR0X3NvcnRUaW1lID0gVFQuZm4udHJhbnNUaW1lMlNlYyh0aW1lT2JqLkRlcGFydHVyZVRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lT2JqLlJvdXRlSUQgPSByb3V0ZUEuUm91dGVJRDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVPYmo7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYobWUuY2hlY2tSb3V0ZUlkT25Vc2Uocm91dGVBLlJvdXRlSUQsIHJvdXRlQS5MaW5lSUQpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocm91dGVBLkRpcmVjdGlvbiA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFyeVswXSA9IHRtcEFyeVswXS5jb25jYXQodG1wVGltZUFyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJvdXRlQS5EaXJlY3Rpb24gPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnlbMV0gPSB0bXBBcnlbMV0uY29uY2F0KHRtcFRpbWVBcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB3b3JrQXJ5ID0gcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF1bd107XG4gICAgICAgICAgICB2YXIgdGltZU1ha2VGbiA9IGZ1bmN0aW9uKGMpe1xuICAgICAgICAgICAgICAgIHJldHVybiBjLkRlcGFydHVyZVRpbWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd29ya0FyeVswXSA9IHdvcmtBcnlbMF0uc29ydChwdHguc29ydEJ5VFRTb3J0VGltZSk7XG4gICAgICAgICAgICAvL+WcqOmAmeS4gOatpeS5i+WJjemDvemChOaYr+eJqeS7tueLgOaFi+aZguWIu+ihqO+8jOS5i+W+jOaaq+aZguaUuemAoOaIkOWWruS4gOaZguWIu+ihqOabv+aPmyBybndUaW1lVGFibGVcbiAgICAgICAgICAgIHdvcmtBcnlbMF0gPSB3b3JrQXJ5WzBdLm1hcCh0aW1lTWFrZUZuKTtcbiAgICAgICAgICAgIHdvcmtBcnlbMV0gPSB3b3JrQXJ5WzFdLnNvcnQocHR4LnNvcnRCeVRUU29ydFRpbWUpO1xuICAgICAgICAgICAgd29ya0FyeVsxXSA9IHdvcmtBcnlbMV0ubWFwKHRpbWVNYWtlRm4pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYkZuKGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldEZvcm1hdFN0YXRpb25UaW1lOiBmdW5jdGlvbihzdElELCBsaW5lLCBkaXIsIHcpe1xuICAgICAgICB3ID0gcGFyc2VJbnQodyk7XG4gICAgICAgIHZhciBTdGF0aW9uSUQgPSBwdHgudHJ0Yy5nZXRTdGF0aW9uSUQoc3RJRCwgbGluZSk7XG4gICAgICAgIHZhciBMaW5lSUQgPSBwdHgudHJ0Yy5nZXRMaW5lSUQobGluZSk7XG4gICAgICAgIHZhciBydCA9IGZhbHNlO1xuICAgICAgICBpZighcHR4LnRlbXBUaW1lVGFibGUudHJ0YykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFwdHgudGVtcFRpbWVUYWJsZS50cnRjW0xpbmVJRF1bU3RhdGlvbklEXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF1bd10pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIXB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddW2Rpcl0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYocHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF1bd11bZGlyXS5sZW5ndGg9PTApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddW2Rpcl07XG4gICAgfSxcbiAgICBnZXRPcmlnaW5hbFN0YXRpb25JRDogZnVuY3Rpb24oU3RhdGlvbklEKXtcbiAgICAgICAgdmFyIGFyeSA9IHBEYXRhLnRydGMuc3RhdGlvbl9hcnk7XG4gICAgICAgIHZhciBzdERhdGEgPSBmYWxzZTtcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJ5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKGFyeVtpXS5TdGF0aW9uSUQuaW5kZXhPZihTdGF0aW9uSUQpIT0tMSl7XG4gICAgICAgICAgICAgICAgc3REYXRhID0gYXJ5W2ldLmlkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdERhdGE7XG4gICAgfSxcbiAgICBfTElORTogX0xJTkUsXG4gICAgX1N0YXRpb25PZkxpbmU6IF9TdGF0aW9uT2ZMaW5lLFxuICAgIHRlc3RGZXRjaDogdGVzdEZldGNoXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZuVFJUQzsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uLmpzJztcbmltcG9ydCBwdHggZnJvbSAnLi9wdHguanMnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhLmpzJztcbmltcG9ydCBidXMgZnJvbSAnLi9idXMuanMnO1xuaW1wb3J0IG1ldHJvIGZyb20gJy4vbWV0cm8uanMnO1xuaW1wb3J0IHRydGMgZnJvbSAnLi90cnRjLmpzJztcbmltcG9ydCBqc1NIQSBmcm9tICcuL2pzU0hBJztcblxuXG52YXIgaW5Ccm93c2VyID0gY29tbW9uLmluQnJvd3NlcjtcblxuXG52YXIgY29tYmluZSA9IHtcblx0ZGF0YTogZGF0YSxcblx0YnVzOiBidXMsXG5cdG1ldHJvOiBtZXRybyxcblx0dHJ0YzogdHJ0Yyxcblx0anNTSEE6IGpzU0hBLFxuXHRjb21tb246IGNvbW1vblxufVxuZm9yKHZhciBrIGluIGNvbWJpbmUpe1xuXHRwdHhba10gPSBjb21iaW5lW2tdO1xufVxuXG5pZihpbkJyb3dzZXIgJiYgIXdpbmRvdy5yb2NwdHgpe1xuXHR3aW5kb3cucm9jcHR4ID0gcHR4O1xuXHRpZighd2luZG93LlByb21pc2UpIGNvbnNvbGUubG9nKFwiUFRYIGxpYnJhcnkgbmVlZCBQcm9taXNlLCBwbGVhc2UgaW5jbHVkZSBhIFByb21pc2UgcG9seWZpbGwuXCIpXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgcHR4O1xuIl0sIm5hbWVzIjpbIkNNIiwiaW5Ccm93c2VyIiwid2luZG93IiwiZG9jdW1lbnQiLCJjbG9uZSIsIm9iakEiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJzdGF0dXNDb2RlIiwiU1VDQ0VTUyIsIkZBSUwiLCJDT05TVF9QVFhfQVBJX1NVQ0NFU1MiLCJDT05TVF9QVFhfQVBJX0ZBSUwiLCJDT05TVF9QVFhfQVBJX01TR19DT01NX0ZBSUxFRCIsInYydXJsIiwicHR4VVJMIiwibWV0cm9VUkwiLCJidXNVUkwiLCJ0cmFVUkwiLCJwdHhNUlRXZWVrU3RyIiwicHVpIiwicHJpbnRTdGF0dXMiLCJUVCIsInVpIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtc2ciLCJzaG93IiwiYWxlcnQiLCJtYXNrIiwidW5tYXNrIiwibWUiLCJHIiwiciIsImQiLCJiIiwiYyIsImgiLCJhIiwiZiIsImciLCJtIiwiayIsImUiLCJsIiwicCIsInEiLCJ0IiwidyIsIm4iLCJ1IiwidiIsImVuY29kaW5nIiwibnVtUm91bmRzIiwicGFyc2VJbnQiLCJFcnJvciIsInoiLCJIIiwic2xpY2UiLCJBIiwieCIsInNldEhNQUNLZXkiLCJiaW5MZW4iLCJ2YWx1ZSIsImxlbmd0aCIsInB1c2giLCJ1cGRhdGUiLCJnZXRIYXNoIiwiQiIsIkMiLCJEIiwiRSIsIkFycmF5QnVmZmVyIiwiSSIsIkYiLCJnZXRITUFDIiwiY2hhckF0Iiwib3V0cHV0VXBwZXIiLCJ0b1VwcGVyQ2FzZSIsImI2NFBhZCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIlVpbnQ4QXJyYXkiLCJzaGFrZUxlbiIsImhhc093blByb3BlcnR5Iiwic3Vic3RyIiwiaXNOYU4iLCJjaGFyQ29kZUF0Iiwic2VhcmNoIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJieXRlTGVuZ3RoIiwieSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJqc1NIQSIsImZuVFJUQyIsInB0eCIsInRydGMiLCJjb21tb24iLCJ0aW1lb3V0IiwidGVtcFRpbWVUYWJsZSIsInRocm93RXJyb3IiLCJzdHIiLCJmaWx0ZXJQYXJhbSIsImZpZWxkIiwib3AiLCJhbmRPciIsInRvTG93ZXJDYXNlIiwib3BNYXAiLCJvcDIiLCJjbnQiLCJ0bXBGaWVsZCIsInRtcFZhbHVlIiwic3RyaW5nQXJ5IiwiaSIsImpvaW4iLCJmaWx0ZXJGbiIsInBhcmFtIiwiZW5jb2RlVVJJIiwib3JkZXJCeUZuIiwiZGlyIiwidG9wRm4iLCJ0b3AiLCJmb3JtYXRTdHIiLCJzZWxlY3RGaWVsZEZuIiwiR2V0QXV0aG9yaXphdGlvbkhlYWRlciIsIkFwcElEIiwiQXBwS2V5IiwiR01UU3RyaW5nIiwiRGF0ZSIsInRvR01UU3RyaW5nIiwiU2hhT2JqIiwiSE1BQyIsIkF1dGhvcml6YXRpb24iLCJnZXRUYWtlTVJUVGltZVRhYmxlIiwibXJ0UFRYQXJ5IiwiY2JGbiIsInJ0U3RhdHVzIiwicnVuR2V0IiwiYXJyIiwib2JqIiwic2hpZnQiLCJjb21wYW55IiwiTGluZUlEIiwiZ2V0TGluZUlEIiwibGluZSIsIlN0YXRpb25JRCIsImdldFN0YXRpb25JRCIsInRha2VSYW5nZSIsInRhcmdldElEIiwiZ2V0U3RhdGlvblRpbWUiLCJqc29uIiwicnRzIiwic3RhdHVzIiwibWVzc2FnZSIsImdldFVSTCIsInVybCIsInJlcUxpc3RlbmVyIiwieGhyIiwiZXZlbnQiLCJkYXRhIiwidGFyZ2V0IiwicmVzcG9uc2UiLCJyZWFkeVN0YXRlIiwiZm0iLCJYTUxIdHRwUmVxdWVzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcGVuIiwiaGVhZGVyT2JqIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJnZXRQcm9taXNlVVJMIiwiY2ZnIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb25maWciLCJtZXRob2QiLCJoZWFkIiwiZ2V0U3RhdGlvbkxpdmVJbmZvIiwic3RpZCIsImNvbnNvbGUiLCJpbmZvIiwiZ2V0U3RhdGlvblRvZGF5VGltZSIsImdvaW5nRGF0YSIsInRvZGF5Iiwic29ydEJ5VFRTb3J0VGltZSIsImludEEiLCJ0dF9zb3J0VGltZSIsImludEIiLCJwRGF0YSIsImJ1cyIsImNpdHkiLCJuYW1lIiwiQ2l0eSIsIkNpdHlDb2RlIiwic3RhdGlvbl9hcnkiLCJpZCIsInJvdXRlIiwiRGlyZWN0aW9uIiwid29yayIsIlJvdXRlSUQiLCJmcm9tIiwidG8iLCJmbkJVUyIsInNldERlZmF1bHRDZmciLCJtYW5hZ2VCeSIsInNlbGVjdEZpZWxkIiwiZ2V0Q2l0eURhdGEiLCJhcnkiLCJydCIsImdldEJ1c0Fycml2ZVRpbWUiLCJTdG9wVUlEIiwiZmlsdGVyU3RyIiwiZ2V0RXN0aW1hdGVkVGltZU9mQXJyaXZhbCIsImdldEJ1c1JvdXRlQXJyaXZlVGltZSIsIlJvdXRlVUlEIiwiZ2V0QnVzUm91dGVJbmZvIiwibXlVUkwiLCJnZXRCdXNSZWFsdGltZU5lYXJTdG9wIiwidGVzdCIsInRvU3RyaW5nIiwiZ2V0QnVzUm91dGUiLCJnZXRCdXNTdGF0aW9uIiwiZ2V0QnVzU3RvcFJvdXRlIiwiZ2V0QnVzU3RvcFJvdXRlQnlOdW1iZXIiLCJidXNOdW1iZXIiLCJzZWFyY2hCdXNCeU51bWJlciIsInVybHMiLCJOZXR3b3JrIiwiTElORSIsIlN0YXRpb24iLCJTdGF0aW9uT2ZMaW5lIiwiTGluZVRyYW5zZmVyIiwiU3RhdGlvbkZhY2lsaXR5IiwiU3RhdGlvbkV4aXQiLCJSb3V0ZSIsIlN0YXRpb25PZlJvdXRlIiwiRmlyc3RMYXN0VGltZXRhYmxlIiwiRnJlcXVlbmN5IiwiUzJTVHJhdmVsVGltZSIsIk9ERmFyZSIsIkxpdmVCb2FyZCIsIlN0YXRpb25UaW1lVGFibGUiLCJTaGFwZSIsImNvbXBhbnlUYWciLCJ0eW1ldHJvIiwia2xydCIsImtydGMiLCJnZXRQVFgiLCJwYXJhbURpcmVjdGx5VXNlIiwiZm9ybWF0IiwicHJvY2Vzc0NmZyIsImFyeVBhcmFtIiwiZmlsdGVyQnkiLCJvcmRlckJ5Iiwib3JkZXJEaXIiLCJnZXRDb21wYW55VGFnIiwiX0xJTkUiLCJfU3RhdGlvbk9mTGluZSIsIm1ldHJvIiwidGVzdEZldGNoIiwiY21kIiwidGhlbiIsImNhdGNoIiwiY2hlY2tSb3V0ZUlkT25Vc2UiLCJsaW5lRGF0YSIsImdldExpbmVEYXRhIiwiaiIsImZvckVhY2giLCJnZXRPcmlnaW5hbExpbmVCeUxpbmVJRCIsImdldFN0YXRpb25JREFyeSIsInN0RGF0YSIsImxpbmVPcmlnaW5hbElEIiwibGluZUNvZGUiLCJjb2RlTGVuIiwiZ2V0U3RhdGlvbklESW5XaGF0TGluZSIsIlN0YXRpb2luSUQiLCJXZWVrIiwibXRTdHIiLCJyb3V0ZUEiLCJ0bXBBcnkiLCJ0bXBUaW1lQXJ5IiwiVGltZXRhYmxlcyIsIm1hcCIsInRpbWVPYmoiLCJmbiIsInRyYW5zVGltZTJTZWMiLCJEZXBhcnR1cmVUaW1lIiwiY29uY2F0Iiwid29ya0FyeSIsInRpbWVNYWtlRm4iLCJzb3J0IiwiZ2V0Rm9ybWF0U3RhdGlvblRpbWUiLCJzdElEIiwiZ2V0T3JpZ2luYWxTdGF0aW9uSUQiLCJjb21iaW5lIiwicm9jcHR4IiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUNBLElBQUlBLEVBQUUsR0FBRztFQUNMQyxFQUFBQSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU9DLE1BQVAsSUFBZ0IsV0FBaEIsSUFBK0JBLE1BQU0sQ0FBQ0MsUUFBeEMsQ0FEUDtFQUVMQyxFQUFBQSxLQUFLLEVBQUUsZUFBU0MsSUFBVCxFQUFjO0VBQUMsV0FBT0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsU0FBTCxDQUFlSCxJQUFmLENBQVgsQ0FBUDtFQUF5QztFQUYxRCxDQUFUO0VBS0FMLEVBQUUsQ0FBQ1MsVUFBSCxHQUFnQjtFQUNaQyxFQUFBQSxPQUFPLEVBQUUsU0FERztFQUVaQyxFQUFBQSxJQUFJLEVBQUU7RUFGTSxDQUFoQjtFQUlBWCxFQUFFLENBQUNZLHFCQUFILEdBQTJCWixFQUFFLENBQUNTLFVBQUgsQ0FBY0MsT0FBekM7RUFDQVYsRUFBRSxDQUFDYSxrQkFBSCxHQUF3QmIsRUFBRSxDQUFDUyxVQUFILENBQWNFLElBQXRDO0VBQ0FYLEVBQUUsQ0FBQ2MsNkJBQUgsR0FBbUMsdURBQW5DO0VBQ0FkLEVBQUUsQ0FBQ2UsS0FBSCxHQUFXLHNDQUFYO0VBQ0FmLEVBQUUsQ0FBQ2dCLE1BQUgsR0FBWWhCLEVBQUUs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
