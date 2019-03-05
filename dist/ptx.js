(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (global[''] = global[''] || {}, global[''].ptx = factory()));
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

            if (typeof cfg.processJSON == 'function') {
              event.data = cfg.processJSON(event.data);
            }

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
    Line: metroURL + '/Line/',
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

  function makePTX_func(cmd, companyTag, cfg) {
    cfg = setDefaultCfg(cfg);
    var param = processCfg(cfg);
    return getPTX(urls[cmd] + companyTag + param, cfg);
  }

  var metro = {
    getCompanyTag: getCompanyTag,
    //_Line: function(companyTag, cfg){return makePTX_func('Line', companyTag, cfg);},
    //_Route: function(companyTag, cfg){return makePTX_func('Route', companyTag, cfg);},
    //_StationOfLine: function(companyTag, cfg){return makePTX_func('StationOfLine', companyTag, cfg);},
    urls: urls,
    companyTag: companyTag //自動產生 Function

  };
  var aryMakeFunction = Object.keys(urls);
  var ptxAutoMetroFunctionKey = [];
  aryMakeFunction.forEach(function (fn) {
    if (!/^Network$/.test(fn)) {
      metro['_' + fn] = function (companyTag, cfg) {
        return makePTX_func(fn, companyTag, cfg);
      };

      ptxAutoMetroFunctionKey.push('_' + fn);
    }
  });
  metro.ptxAutoMetroFunctionKey = ptxAutoMetroFunctionKey;

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

  function useLineID2filterBy(LineID) {
    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    cfg.filterBy = cfg.filterBy || '';
    cfg.filterBy += TT.ptx.filterParam('LineID', '==', LineID);
    return cfg;
  }

  var trtcPTXFn = {};
  metro.ptxAutoMetroFunctionKey.forEach(function (fn) {
    trtcPTXFn[fn] = function (cfg) {
      return metro[fn](companyTag$1, cfg);
    };
  });
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
    //以下為 Return Promise Function
    getRoute: function getRoute(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return trtcPTXFn._Route(cfg);
    },
    getLineFrequency: function getLineFrequency(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return trtcPTXFn._Frequency(cfg);
    },
    getLineTransfer: function getLineTransfer(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg.filterBy = cfg.filterBy || '';
      cfg.filterBy += TT.ptx.filterParam('FromLineID', '==', LineID);
      return trtcPTXFn._LineTransfer(cfg);
    },
    getShape: function getShape(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return trtcPTXFn._Shape(cfg);
    },
    getFirstLastTimetable: function getFirstLastTimetable(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return trtcPTXFn._FirstLastTimetable(cfg);
    },
    getS2STravelTime: function getS2STravelTime(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);

      cfg.processJSON = function (json) {
        var travleTimes, tmpA, tmpNextStop;

        for (var m = 0; m < json.length; m++) {
          travleTimes = json[m].TravelTimes;
          json[m].TravelInterval = travleTimes.map(function (c, idx) {
            tmpNextStop = travleTimes[idx + 1] ? parseInt(travleTimes[idx + 1].StopTime) : 0;
            tmpA = parseInt(c.RunTime) + Math.ceil(parseInt(c.StopTime) / 2) + Math.ceil(tmpNextStop);
            return tmpA;
          });
        }

        return json;
      };

      return trtcPTXFn._S2STravelTime(cfg);
    },
    getStationOfLine: function getStationOfLine(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return trtcPTXFn._StationOfLine(cfg);
    },
    testFetch: testFetch
  };

  for (var k in trtcPTXFn) {
    fnTRTC$1[k] = trtcPTXFn[k];
  }

  var inBrowser = CM.inBrowser;
  var combine = {
    data: pData,
    bus: fnBUS,
    metro: metro,
    trtc: fnTRTC$1,
    jsSHA: jsSHA,
    common: CM
  };

  for (var k$1 in combine) {
    ptx[k$1] = combine[k$1];
  }

  if (inBrowser && !window.rocptx) {
    window.rocptx = ptx;
    if (!window.Promise) console.log("PTX library need Promise, please include a Promise polyfill.");
  }

  return ptx;

}));
