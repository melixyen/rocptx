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
      return encodeURI('$orderby=' + arguments[0] + ' ' + arguments[1].toLowerCase());
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
    }
  };

  var inBrowser = CM.inBrowser;
  var combine = {
    data: pData,
    bus: fnBUS,
    trtc: fnTRTC$1,
    jsSHA: jsSHA,
    common: CM
  };

  for (var k in combine) {
    ptx[k] = combine[k];
  }

  if (inBrowser && !window.rocptx) {
    window.rocptx = ptx;
  }

  return ptx;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHR4LmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tbW9uLmpzIiwiLi4vc3JjL2pzU0hBLmpzIiwiLi4vc3JjL3B0eC5qcyIsIi4uL3NyYy9kYXRhLmpzIiwiLi4vc3JjL2J1cy5qcyIsIi4uL3NyYy90cnRjLmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBDTSA9IHtcclxuICAgIGluQnJvd3NlcjogISEodHlwZW9mKHdpbmRvdykhPSd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudClcclxufVxyXG5cclxuQ00uc3RhdHVzQ29kZSA9IHtcclxuICAgIFNVQ0NFU1M6ICdzdWNjZXNzJyxcclxuICAgIEZBSUw6ICdmYWlsJ1xyXG59XHJcbkNNLkNPTlNUX1BUWF9BUElfU1VDQ0VTUyA9IENNLnN0YXR1c0NvZGUuU1VDQ0VTUztcclxuQ00uQ09OU1RfUFRYX0FQSV9GQUlMID0gQ00uc3RhdHVzQ29kZS5GQUlMO1xyXG5DTS5DT05TVF9QVFhfQVBJX01TR19DT01NX0ZBSUxFRCA9ICdDb21tdW5pY2F0aW9uIGZhaWxlZCwgbm8gcmVzcG9uc2UuICjpgJroqIrlpLHmlZfvvIxQVFgg54Sh5rOV5Y+W5Zue6LOH5paZ44CCKSc7XHJcbkNNLnYydXJsID0gJ2h0dHBzOi8vcHR4LnRyYW5zcG9ydGRhdGEudHcvTU9UQy92Mic7XHJcbkNNLnB0eFVSTCA9IENNLnYydXJsO1xyXG5DTS5tZXRyb1VSTCA9IENNLnB0eFVSTCArICcvUmFpbC9NZXRybyc7XHJcbkNNLmJ1c1VSTCA9IENNLnB0eFVSTCArICcvQnVzJ1xyXG5DTS50cmFVUkwgPSAnL1JhaWwvVFJBJztcclxuQ00ucHR4TVJUV2Vla1N0ciA9IFsnU3VuZGF5JywnTW9uZGF5JywnVHVlc2RheScsJ1dlZG5lc2RheScsJ1RodXJzZGF5JywnRnJpZGF5JywnU2F0dXJkYXknXTtcclxuXHJcblxyXG5DTS5wdWkgPSB7XHJcbiAgICBwcmludFN0YXR1czogZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0eXBlb2YoVFQpPT0nb2JqZWN0JyAmJiBUVC51aSAmJiBUVC51aS5wcmludFN0YXR1cyl7IFRULnVpLnByaW50U3RhdHVzLmFwcGx5KFRULnVpLCBhcmd1bWVudHMpOyB9XHJcbiAgICB9LFxyXG4gICAgbXNnOiB7XHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKXtpZih0eXBlb2YoVFQpPT0nb2JqZWN0JyAmJiBUVC51aSAmJiBUVC51aS5tc2cgJiYgVFQudWkubXNnLnNob3cpeyBUVC51aS5tc2cuc2hvdy5hcHBseShUVC51aSwgYXJndW1lbnRzKTsgfX0sXHJcbiAgICAgICAgYWxlcnQ6IGZ1bmN0aW9uKCl7aWYodHlwZW9mKFRUKT09J29iamVjdCcgJiYgVFQudWkgJiYgVFQudWkubXNnICYmIFRULnVpLm1zZy5hbGVydCl7IFRULnVpLm1zZy5hbGVydC5hcHBseShUVC51aSwgYXJndW1lbnRzKTsgfX1cclxuICAgIH0sXHJcbiAgICBtYXNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHR5cGVvZihUVCk9PSdvYmplY3QnICYmIFRULnVpICYmIFRULnVpLm1hc2speyBUVC51aS5tYXNrLmFwcGx5KFRULnVpLCBhcmd1bWVudHMpOyB9XHJcbiAgICB9LFxyXG4gICAgdW5tYXNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHR5cGVvZihUVCk9PSdvYmplY3QnICYmIFRULnVpICYmIFRULnVpLnVubWFzayl7IFRULnVpLnVubWFzay5hcHBseShUVC51aSwgYXJndW1lbnRzKTsgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENNO1xyXG5cclxuIiwidmFyIG1lID0ge307XG4vL2pzU0hBIGZ1bmN0aW9uIHN0YXJ0XG4oZnVuY3Rpb24oRyl7ZnVuY3Rpb24gcihkLGIsYyl7dmFyIGg9MCxhPVtdLGY9MCxnLG0sayxlLGwscCxxLHQsdz0hMSxuPVtdLHU9W10sdixyPSExO2M9Y3x8e307Zz1jLmVuY29kaW5nfHxcIlVURjhcIjt2PWMubnVtUm91bmRzfHwxO2lmKHYhPT1wYXJzZUludCh2LDEwKXx8MT52KXRocm93IEVycm9yKFwibnVtUm91bmRzIG11c3QgYSBpbnRlZ2VyID49IDFcIik7aWYoXCJTSEEtMVwiPT09ZClsPTUxMixwPXoscT1ILGU9MTYwLHQ9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc2xpY2UoKX07ZWxzZSB0aHJvdyBFcnJvcihcIkNob3NlbiBTSEEgdmFyaWFudCBpcyBub3Qgc3VwcG9ydGVkXCIpO2s9QShiLGcpO209eChkKTt0aGlzLnNldEhNQUNLZXk9ZnVuY3Rpb24oYSxmLGIpe3ZhciBjO2lmKCEwPT09dyl0aHJvdyBFcnJvcihcIkhNQUMga2V5IGFscmVhZHkgc2V0XCIpO2lmKCEwPT09cil0aHJvdyBFcnJvcihcIkNhbm5vdCBzZXQgSE1BQyBrZXkgYWZ0ZXIgY2FsbGluZyB1cGRhdGVcIik7XG5nPShifHx7fSkuZW5jb2Rpbmd8fFwiVVRGOFwiO2Y9QShmLGcpKGEpO2E9Zi5iaW5MZW47Zj1mLnZhbHVlO2M9bD4+PjM7Yj1jLzQtMTtpZihjPGEvOCl7Zm9yKGY9cShmLGEsMCx4KGQpLGUpO2YubGVuZ3RoPD1iOylmLnB1c2goMCk7ZltiXSY9NDI5NDk2NzA0MH1lbHNlIGlmKGM+YS84KXtmb3IoO2YubGVuZ3RoPD1iOylmLnB1c2goMCk7ZltiXSY9NDI5NDk2NzA0MH1mb3IoYT0wO2E8PWI7YSs9MSluW2FdPWZbYV1eOTA5NTIyNDg2LHVbYV09ZlthXV4xNTQ5NTU2ODI4O209cChuLG0pO2g9bDt3PSEwfTt0aGlzLnVwZGF0ZT1mdW5jdGlvbihlKXt2YXIgYixnLGMsZD0wLHE9bD4+PjU7Yj1rKGUsYSxmKTtlPWIuYmluTGVuO2c9Yi52YWx1ZTtiPWU+Pj41O2ZvcihjPTA7YzxiO2MrPXEpZCtsPD1lJiYobT1wKGcuc2xpY2UoYyxjK3EpLG0pLGQrPWwpO2grPWQ7YT1nLnNsaWNlKGQ+Pj41KTtmPWUlbDtyPSEwfTt0aGlzLmdldEhhc2g9ZnVuY3Rpb24oYixnKXt2YXIgYyxrLGwscDtpZighMD09PVxudyl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhhc2ggYWZ0ZXIgc2V0dGluZyBITUFDIGtleVwiKTtsPUIoZyk7c3dpdGNoKGIpe2Nhc2UgXCJIRVhcIjpjPWZ1bmN0aW9uKGEpe3JldHVybiBDKGEsZSxsKX07YnJlYWs7Y2FzZSBcIkI2NFwiOmM9ZnVuY3Rpb24oYSl7cmV0dXJuIEQoYSxlLGwpfTticmVhaztjYXNlIFwiQllURVNcIjpjPWZ1bmN0aW9uKGEpe3JldHVybiBFKGEsZSl9O2JyZWFrO2Nhc2UgXCJBUlJBWUJVRkZFUlwiOnRyeXtrPW5ldyBBcnJheUJ1ZmZlcigwKX1jYXRjaChJKXt0aHJvdyBFcnJvcihcIkFSUkFZQlVGRkVSIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBlbnZpcm9ubWVudFwiKTt9Yz1mdW5jdGlvbihhKXtyZXR1cm4gRihhLGUpfTticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiZm9ybWF0IG11c3QgYmUgSEVYLCBCNjQsIEJZVEVTLCBvciBBUlJBWUJVRkZFUlwiKTt9cD1xKGEuc2xpY2UoKSxmLGgsdChtKSxlKTtmb3Ioaz0xO2s8djtrKz0xKXA9cShwLGUsMCx4KGQpLGUpO1xucmV0dXJuIGMocCl9O3RoaXMuZ2V0SE1BQz1mdW5jdGlvbihiLGcpe3ZhciBjLGssbixyO2lmKCExPT09dyl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhNQUMgd2l0aG91dCBmaXJzdCBzZXR0aW5nIEhNQUMga2V5XCIpO249QihnKTtzd2l0Y2goYil7Y2FzZSBcIkhFWFwiOmM9ZnVuY3Rpb24oYSl7cmV0dXJuIEMoYSxlLG4pfTticmVhaztjYXNlIFwiQjY0XCI6Yz1mdW5jdGlvbihhKXtyZXR1cm4gRChhLGUsbil9O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmM9ZnVuY3Rpb24oYSl7cmV0dXJuIEUoYSxlKX07YnJlYWs7Y2FzZSBcIkFSUkFZQlVGRkVSXCI6dHJ5e2M9bmV3IEFycmF5QnVmZmVyKDApfWNhdGNoKEkpe3Rocm93IEVycm9yKFwiQVJSQVlCVUZGRVIgbm90IHN1cHBvcnRlZCBieSB0aGlzIGVudmlyb25tZW50XCIpO31jPWZ1bmN0aW9uKGEpe3JldHVybiBGKGEsZSl9O2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJvdXRwdXRGb3JtYXQgbXVzdCBiZSBIRVgsIEI2NCwgQllURVMsIG9yIEFSUkFZQlVGRkVSXCIpO1xufWs9cShhLnNsaWNlKCksZixoLHQobSksZSk7cj1wKHUseChkKSk7cj1xKGssZSxsLHIsZSk7cmV0dXJuIGMocil9fWZ1bmN0aW9uIEMoZCxiLGMpe3ZhciBoPVwiXCI7Yi89ODt2YXIgYSxmO2ZvcihhPTA7YTxiO2ErPTEpZj1kW2E+Pj4yXT4+PjgqKDMrYSU0Ki0xKSxoKz1cIjAxMjM0NTY3ODlhYmNkZWZcIi5jaGFyQXQoZj4+PjQmMTUpK1wiMDEyMzQ1Njc4OWFiY2RlZlwiLmNoYXJBdChmJjE1KTtyZXR1cm4gYy5vdXRwdXRVcHBlcj9oLnRvVXBwZXJDYXNlKCk6aH1mdW5jdGlvbiBEKGQsYixjKXt2YXIgaD1cIlwiLGE9Yi84LGYsZyxtO2ZvcihmPTA7ZjxhO2YrPTMpZm9yKGc9ZisxPGE/ZFtmKzE+Pj4yXTowLG09ZisyPGE/ZFtmKzI+Pj4yXTowLG09KGRbZj4+PjJdPj4+OCooMytmJTQqLTEpJjI1NSk8PDE2fChnPj4+OCooMysoZisxKSU0Ki0xKSYyNTUpPDw4fG0+Pj44KigzKyhmKzIpJTQqLTEpJjI1NSxnPTA7ND5nO2crPTEpOCpmKzYqZzw9Yj9oKz1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5jaGFyQXQobT4+PlxuNiooMy1nKSY2Myk6aCs9Yy5iNjRQYWQ7cmV0dXJuIGh9ZnVuY3Rpb24gRShkLGIpe3ZhciBjPVwiXCIsaD1iLzgsYSxmO2ZvcihhPTA7YTxoO2ErPTEpZj1kW2E+Pj4yXT4+PjgqKDMrYSU0Ki0xKSYyNTUsYys9U3RyaW5nLmZyb21DaGFyQ29kZShmKTtyZXR1cm4gY31mdW5jdGlvbiBGKGQsYil7dmFyIGM9Yi84LGgsYT1uZXcgQXJyYXlCdWZmZXIoYyksZjtmPW5ldyBVaW50OEFycmF5KGEpO2ZvcihoPTA7aDxjO2grPTEpZltoXT1kW2g+Pj4yXT4+PjgqKDMraCU0Ki0xKSYyNTU7cmV0dXJuIGF9ZnVuY3Rpb24gQihkKXt2YXIgYj17b3V0cHV0VXBwZXI6ITEsYjY0UGFkOlwiPVwiLHNoYWtlTGVuOi0xfTtkPWR8fHt9O2Iub3V0cHV0VXBwZXI9ZC5vdXRwdXRVcHBlcnx8ITE7ITA9PT1kLmhhc093blByb3BlcnR5KFwiYjY0UGFkXCIpJiYoYi5iNjRQYWQ9ZC5iNjRQYWQpO2lmKFwiYm9vbGVhblwiIT09dHlwZW9mIGIub3V0cHV0VXBwZXIpdGhyb3cgRXJyb3IoXCJJbnZhbGlkIG91dHB1dFVwcGVyIGZvcm1hdHRpbmcgb3B0aW9uXCIpO1xuaWYoXCJzdHJpbmdcIiE9PXR5cGVvZiBiLmI2NFBhZCl0aHJvdyBFcnJvcihcIkludmFsaWQgYjY0UGFkIGZvcm1hdHRpbmcgb3B0aW9uXCIpO3JldHVybiBifWZ1bmN0aW9uIEEoZCxiKXt2YXIgYztzd2l0Y2goYil7Y2FzZSBcIlVURjhcIjpjYXNlIFwiVVRGMTZCRVwiOmNhc2UgXCJVVEYxNkxFXCI6YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcImVuY29kaW5nIG11c3QgYmUgVVRGOCwgVVRGMTZCRSwgb3IgVVRGMTZMRVwiKTt9c3dpdGNoKGQpe2Nhc2UgXCJIRVhcIjpjPWZ1bmN0aW9uKGIsYSxmKXt2YXIgZz1iLmxlbmd0aCxjLGQsZSxsLHA7aWYoMCE9PWclMil0aHJvdyBFcnJvcihcIlN0cmluZyBvZiBIRVggdHlwZSBtdXN0IGJlIGluIGJ5dGUgaW5jcmVtZW50c1wiKTthPWF8fFswXTtmPWZ8fDA7cD1mPj4+Mztmb3IoYz0wO2M8ZztjKz0yKXtkPXBhcnNlSW50KGIuc3Vic3RyKGMsMiksMTYpO2lmKGlzTmFOKGQpKXRocm93IEVycm9yKFwiU3RyaW5nIG9mIEhFWCB0eXBlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyc1wiKTtcbmw9KGM+Pj4xKStwO2ZvcihlPWw+Pj4yO2EubGVuZ3RoPD1lOylhLnB1c2goMCk7YVtlXXw9ZDw8OCooMytsJTQqLTEpfXJldHVybnt2YWx1ZTphLGJpbkxlbjo0KmcrZn19O2JyZWFrO2Nhc2UgXCJURVhUXCI6Yz1mdW5jdGlvbihjLGEsZil7dmFyIGcsZCxrPTAsZSxsLHAscSx0LG47YT1hfHxbMF07Zj1mfHwwO3A9Zj4+PjM7aWYoXCJVVEY4XCI9PT1iKWZvcihuPTMsZT0wO2U8Yy5sZW5ndGg7ZSs9MSlmb3IoZz1jLmNoYXJDb2RlQXQoZSksZD1bXSwxMjg+Zz9kLnB1c2goZyk6MjA0OD5nPyhkLnB1c2goMTkyfGc+Pj42KSxkLnB1c2goMTI4fGcmNjMpKTo1NTI5Nj5nfHw1NzM0NDw9Zz9kLnB1c2goMjI0fGc+Pj4xMiwxMjh8Zz4+PjYmNjMsMTI4fGcmNjMpOihlKz0xLGc9NjU1MzYrKChnJjEwMjMpPDwxMHxjLmNoYXJDb2RlQXQoZSkmMTAyMyksZC5wdXNoKDI0MHxnPj4+MTgsMTI4fGc+Pj4xMiY2MywxMjh8Zz4+PjYmNjMsMTI4fGcmNjMpKSxsPTA7bDxkLmxlbmd0aDtsKz0xKXt0PWsrXG5wO2ZvcihxPXQ+Pj4yO2EubGVuZ3RoPD1xOylhLnB1c2goMCk7YVtxXXw9ZFtsXTw8OCoobit0JTQqLTEpO2srPTF9ZWxzZSBpZihcIlVURjE2QkVcIj09PWJ8fFwiVVRGMTZMRVwiPT09Yilmb3Iobj0yLGU9MDtlPGMubGVuZ3RoO2UrPTEpe2c9Yy5jaGFyQ29kZUF0KGUpO1wiVVRGMTZMRVwiPT09YiYmKGw9ZyYyNTUsZz1sPDw4fGc+Pj44KTt0PWsrcDtmb3IocT10Pj4+MjthLmxlbmd0aDw9cTspYS5wdXNoKDApO2FbcV18PWc8PDgqKG4rdCU0Ki0xKTtrKz0yfXJldHVybnt2YWx1ZTphLGJpbkxlbjo4KmsrZn19O2JyZWFrO2Nhc2UgXCJCNjRcIjpjPWZ1bmN0aW9uKGIsYSxmKXt2YXIgYz0wLGQsayxlLGwscCxxLG47aWYoLTE9PT1iLnNlYXJjaCgvXlthLXpBLVowLTk9K1xcL10rJC8pKXRocm93IEVycm9yKFwiSW52YWxpZCBjaGFyYWN0ZXIgaW4gYmFzZS02NCBzdHJpbmdcIik7az1iLmluZGV4T2YoXCI9XCIpO2I9Yi5yZXBsYWNlKC9cXD0vZyxcIlwiKTtpZigtMSE9PWsmJms8Yi5sZW5ndGgpdGhyb3cgRXJyb3IoXCJJbnZhbGlkICc9JyBmb3VuZCBpbiBiYXNlLTY0IHN0cmluZ1wiKTtcbmE9YXx8WzBdO2Y9Znx8MDtxPWY+Pj4zO2ZvcihrPTA7azxiLmxlbmd0aDtrKz00KXtwPWIuc3Vic3RyKGssNCk7Zm9yKGU9bD0wO2U8cC5sZW5ndGg7ZSs9MSlkPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLmluZGV4T2YocFtlXSksbHw9ZDw8MTgtNiplO2ZvcihlPTA7ZTxwLmxlbmd0aC0xO2UrPTEpe249YytxO2ZvcihkPW4+Pj4yO2EubGVuZ3RoPD1kOylhLnB1c2goMCk7YVtkXXw9KGw+Pj4xNi04KmUmMjU1KTw8OCooMytuJTQqLTEpO2MrPTF9fXJldHVybnt2YWx1ZTphLGJpbkxlbjo4KmMrZn19O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmM9ZnVuY3Rpb24oYixhLGMpe3ZhciBkLG0sayxlLGw7YT1hfHxbMF07Yz1jfHwwO2s9Yz4+PjM7Zm9yKG09MDttPGIubGVuZ3RoO20rPTEpZD1iLmNoYXJDb2RlQXQobSksbD1tK2ssZT1sPj4+MixhLmxlbmd0aDw9ZSYmYS5wdXNoKDApLGFbZV18PWQ8PDgqKDMrbCU0Ki0xKTtcbnJldHVybnt2YWx1ZTphLGJpbkxlbjo4KmIubGVuZ3RoK2N9fTticmVhaztjYXNlIFwiQVJSQVlCVUZGRVJcIjp0cnl7Yz1uZXcgQXJyYXlCdWZmZXIoMCl9Y2F0Y2goaCl7dGhyb3cgRXJyb3IoXCJBUlJBWUJVRkZFUiBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgZW52aXJvbm1lbnRcIik7fWM9ZnVuY3Rpb24oYixhLGMpe3ZhciBkLG0sayxlLGw7YT1hfHxbMF07Yz1jfHwwO209Yz4+PjM7bD1uZXcgVWludDhBcnJheShiKTtmb3IoZD0wO2Q8Yi5ieXRlTGVuZ3RoO2QrPTEpZT1kK20saz1lPj4+MixhLmxlbmd0aDw9ayYmYS5wdXNoKDApLGFba118PWxbZF08PDgqKDMrZSU0Ki0xKTtyZXR1cm57dmFsdWU6YSxiaW5MZW46OCpiLmJ5dGVMZW5ndGgrY319O2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJmb3JtYXQgbXVzdCBiZSBIRVgsIFRFWFQsIEI2NCwgQllURVMsIG9yIEFSUkFZQlVGRkVSXCIpO31yZXR1cm4gY31mdW5jdGlvbiBuKGQsYil7cmV0dXJuIGQ8PGJ8ZD4+PjMyLWJ9ZnVuY3Rpb24gdShkLFxuYil7dmFyIGM9KGQmNjU1MzUpKyhiJjY1NTM1KTtyZXR1cm4oKGQ+Pj4xNikrKGI+Pj4xNikrKGM+Pj4xNikmNjU1MzUpPDwxNnxjJjY1NTM1fWZ1bmN0aW9uIHkoZCxiLGMsaCxhKXt2YXIgZj0oZCY2NTUzNSkrKGImNjU1MzUpKyhjJjY1NTM1KSsoaCY2NTUzNSkrKGEmNjU1MzUpO3JldHVybigoZD4+PjE2KSsoYj4+PjE2KSsoYz4+PjE2KSsoaD4+PjE2KSsoYT4+PjE2KSsoZj4+PjE2KSY2NTUzNSk8PDE2fGYmNjU1MzV9ZnVuY3Rpb24geChkKXt2YXIgYj1bXTtpZihcIlNIQS0xXCI9PT1kKWI9WzE3MzI1ODQxOTMsNDAyMzIzMzQxNywyNTYyMzgzMTAyLDI3MTczMzg3OCwzMjg1Mzc3NTIwXTtlbHNlIHRocm93IEVycm9yKFwiTm8gU0hBIHZhcmlhbnRzIHN1cHBvcnRlZFwiKTtyZXR1cm4gYn1mdW5jdGlvbiB6KGQsYil7dmFyIGM9W10saCxhLGYsZyxtLGssZTtoPWJbMF07YT1iWzFdO2Y9YlsyXTtnPWJbM107bT1iWzRdO2ZvcihlPTA7ODA+ZTtlKz0xKWNbZV09MTY+ZT9kW2VdOm4oY1tlLVxuM11eY1tlLThdXmNbZS0xNF1eY1tlLTE2XSwxKSxrPTIwPmU/eShuKGgsNSksYSZmXn5hJmcsbSwxNTE4NTAwMjQ5LGNbZV0pOjQwPmU/eShuKGgsNSksYV5mXmcsbSwxODU5Nzc1MzkzLGNbZV0pOjYwPmU/eShuKGgsNSksYSZmXmEmZ15mJmcsbSwyNDAwOTU5NzA4LGNbZV0pOnkobihoLDUpLGFeZl5nLG0sMzM5NTQ2OTc4MixjW2VdKSxtPWcsZz1mLGY9bihhLDMwKSxhPWgsaD1rO2JbMF09dShoLGJbMF0pO2JbMV09dShhLGJbMV0pO2JbMl09dShmLGJbMl0pO2JbM109dShnLGJbM10pO2JbNF09dShtLGJbNF0pO3JldHVybiBifWZ1bmN0aW9uIEgoZCxiLGMsaCl7dmFyIGE7Zm9yKGE9KGIrNjU+Pj45PDw0KSsxNTtkLmxlbmd0aDw9YTspZC5wdXNoKDApO2RbYj4+PjVdfD0xMjg8PDI0LWIlMzI7Yis9YztkW2FdPWImNDI5NDk2NzI5NTtkW2EtMV09Yi80Mjk0OTY3Mjk2fDA7Yj1kLmxlbmd0aDtmb3IoYT0wO2E8YjthKz0xNiloPXooZC5zbGljZShhLGErMTYpLGgpO3JldHVybiBofVxuXCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gcn0pOlwidW5kZWZpbmVkXCIhPT10eXBlb2YgZXhwb3J0cz8oXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9ciksZXhwb3J0cz1yKTpHLmpzU0hBPXJ9KShtZSk7XG4vL2pzU0hBIGZ1bmN0aW9uIGVuZFxuXG5leHBvcnQgZGVmYXVsdCBtZS5qc1NIQTsiLCJpbXBvcnQganNTSEEgZnJvbSAnLi9qc1NIQSc7XHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi9jb21tb24uanMnO1xyXG5cclxuXHJcbmxldCBmblRSVEMgPSAoKSA9PiBwdHgudHJ0YztcclxuXHJcbnZhciBwdHggPSB7XHJcbiAgICBzdGF0dXNDb2RlOiBjb21tb24uc3RhdHVzQ29kZSxcclxuICAgIHRpbWVvdXQ6IDMwMDAwLFxyXG4gICAgdGVtcFRpbWVUYWJsZToge30sXHJcbiAgICB0aHJvd0Vycm9yOiBmdW5jdGlvbihzdHIpeyB0aHJvdyBzdHI7fSxcclxuICAgIGZpbHRlclBhcmFtOiBmdW5jdGlvbihmaWVsZCwgb3AsIHZhbHVlLCBhbmRPcil7XHJcbiAgICAgICAgLy9maWVsZCDlj4ogdmFsdWXlj6/ngrrpmaPliJfvvIzlhbbkuK3kuIDogIXngrrpmaPliJfmmYLlsIfnlKggYW5kT3Ig6YCj5o6l77yM5L2G55W25YWp6ICF55qG54K66Zmj5YiX5pmC5b+F6ZyA6ZW35bqm5LiA6Ie05Lul5L6/6YWN5bCN6YCj5o6lXHJcbiAgICAgICAgLy9wdHguZmlsdGVyUGFyYW0oWydmZGZzZC9mZGZkJywnZmRmZC9nZmcnLCdmZ2YnXSwnPCcsWzMyNSwnZ2dnJyw5OTZdLCdBTkQnKVxyXG4gICAgICAgIGFuZE9yID0gYW5kT3IgfHwgJ29yJzsgYW5kT3IgPSBhbmRPci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciBvcE1hcCA9IHtcclxuICAgICAgICAgICAgJz0nOiAnZXEnLCAnPT0nOiAnZXEnLCAnPT09JzogJ2VxJyxcclxuICAgICAgICAgICAgJyE9JzogJ25lJywgJyE9PSc6ICduZScsXHJcbiAgICAgICAgICAgICchJzogJ25vdCcsXHJcbiAgICAgICAgICAgICc+JzogJ2d0JywgJz49JzogJ2dlJywgJzwnOiAnbHQnLCAnPD0nOiAnbGUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvcDIgPSBvcE1hcFtvcF0gfHwgb3A7XHJcbiAgICAgICAgaWYodHlwZW9mKGZpZWxkKT09J29iamVjdCcgJiYgdHlwZW9mKHZhbHVlKT09J29iamVjdCcgJiYgZmllbGQubGVuZ3RoICE9IHZhbHVlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHB0eC50aHJvd0Vycm9yKCdOb3QgZXF1YWwgbGVuZ3RoIG9mIGZpbHRlclBhcmFtIGZpbGVkIGFuZCB2YWx1ZTsnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlb2YoZmllbGQpIT0nb2JqZWN0Jyl7ZmllbGQgPSBbZmllbGRdO31cclxuICAgICAgICBpZih0eXBlb2YodmFsdWUpIT0nb2JqZWN0Jyl7dmFsdWUgPSBbdmFsdWVdO31cclxuICAgICAgICB2YXIgY250ID0gKGZpZWxkLmxlbmd0aCA+IHZhbHVlLmxlbmd0aCkgPyBmaWVsZC5sZW5ndGggOiB2YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHRtcEZpZWxkLCB0bXBWYWx1ZSwgc3RyaW5nQXJ5ID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8Y250OyBpKyspe1xyXG4gICAgICAgICAgICB0bXBGaWVsZCA9IGZpZWxkW2ldIHx8IGZpZWxkWzBdO1xyXG4gICAgICAgICAgICB0bXBWYWx1ZSA9IHZhbHVlW2ldIHx8IHZhbHVlWzBdO1xyXG4gICAgICAgICAgICBpZih0eXBlb2YodG1wVmFsdWUpPT0nc3RyaW5nJykgdG1wVmFsdWUgPSBcIidcIiArIHRtcFZhbHVlICsgXCInXCI7XHJcbiAgICAgICAgICAgIHN0cmluZ0FyeS5wdXNoKHRtcEZpZWxkICsgJyAnICsgb3AyICsgJyAnICsgdG1wVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyaW5nQXJ5LmpvaW4oJyAnICsgYW5kT3IgKyAnICcpO1xyXG4gICAgfSxcclxuICAgIGZpbHRlckZuOiBmdW5jdGlvbihwYXJhbSl7XHJcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSSgnJGZpbHRlcj0nICsgcGFyYW0pO1xyXG4gICAgfSxcclxuICAgIG9yZGVyQnlGbjogZnVuY3Rpb24oZmllbGQsIGRpcil7XHJcbiAgICAgICAgdmFyIGEgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSSgnJG9yZGVyYnk9JyArIGFyZ3VtZW50c1swXSArICcgJyArIGFyZ3VtZW50c1sxXS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIH0sXHJcbiAgICB0b3BGbjogZnVuY3Rpb24odG9wLCBmb3JtYXRTdHIpe1xyXG4gICAgICAgIHRvcCA9IHRvcCB8fCAzMDAwO1xyXG4gICAgICAgIGZvcm1hdFN0ciA9IGZvcm1hdFN0ciB8fCAnSlNPTic7XHJcbiAgICAgICAgcmV0dXJuICckdG9wPScgKyB0b3AgKyAnJmZvcm1hdD0nICsgZm9ybWF0U3RyO1xyXG4gICAgfSxcclxuICAgIHNlbGVjdEZpZWxkRm46IGZ1bmN0aW9uKHN0cil7XHJcbiAgICAgICAgaWYodHlwZW9mKHN0cik9PSdvYmplY3QnICYmIHN0ci5sZW5ndGgpe1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuam9pbignLCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJKCckc2VsZWN0PScgKyBzdHIpO1xyXG4gICAgfSxcclxuICAgIEdldEF1dGhvcml6YXRpb25IZWFkZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIEFwcElEID0gcHR4LkFwcElEIHx8ICdGRkZGRkZGRi1GRkZGLUZGRkYtRkZGRi1GRkZGRkZGRkZGRkYnO1xyXG4gICAgICAgIHZhciBBcHBLZXkgPSBwdHguQXBwS2V5IHx8ICdGRkZGRkZGRi1GRkZGLUZGRkYtRkZGRi1GRkZGRkZGRkZGRkYnO1xyXG5cclxuICAgICAgICB2YXIgR01UU3RyaW5nID0gbmV3IERhdGUoKS50b0dNVFN0cmluZygpO1xyXG4gICAgICAgIHZhciBTaGFPYmogPSBuZXcganNTSEEoJ1NIQS0xJywgJ1RFWFQnKTtcclxuICAgICAgICBTaGFPYmouc2V0SE1BQ0tleShBcHBLZXksICdURVhUJyk7XHJcbiAgICAgICAgU2hhT2JqLnVwZGF0ZSgneC1kYXRlOiAnICsgR01UU3RyaW5nKTtcclxuICAgICAgICB2YXIgSE1BQyA9IFNoYU9iai5nZXRITUFDKCdCNjQnKTtcclxuICAgICAgICB2YXIgQXV0aG9yaXphdGlvbiA9ICdobWFjIHVzZXJuYW1lPVxcXCInICsgQXBwSUQgKyAnXFxcIiwgYWxnb3JpdGhtPVxcXCJobWFjLXNoYTFcXFwiLCBoZWFkZXJzPVxcXCJ4LWRhdGVcXFwiLCBzaWduYXR1cmU9XFxcIicgKyBITUFDICsgJ1xcXCInO1xyXG5cclxuICAgICAgICByZXR1cm4geyAnQXV0aG9yaXphdGlvbic6IEF1dGhvcml6YXRpb24sICdYLURhdGUnOiBHTVRTdHJpbmd9O1xyXG4gICAgfSxcclxuICAgIGdldFRha2VNUlRUaW1lVGFibGU6IGZ1bmN0aW9uKG1ydFBUWEFyeSwgdywgY2JGbil7XHJcbiAgICAgICAgdmFyIHJ0U3RhdHVzID0gW107XHJcbiAgICAgICAgZnVuY3Rpb24gcnVuR2V0KGFycil7XHJcbiAgICAgICAgICAgIGlmKGFyci5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICAgICAgY2JGbihydFN0YXR1cywgcHR4LnRlbXBUaW1lVGFibGUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGlmKG9iai5jb21wYW55PT0ndHJ0Yycpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBMaW5lSUQgPSBmblRSVEMoKS5nZXRMaW5lSUQob2JqLmxpbmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdGF0aW9uSUQgPSBmblRSVEMoKS5nZXRTdGF0aW9uSUQob2JqLnRha2VSYW5nZVswXSwgb2JqLmxpbmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJRCA9IGZuVFJUQygpLmdldFN0YXRpb25JRChvYmoudGFrZVJhbmdlWzFdLCBvYmoubGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm5UUlRDKCkuZ2V0U3RhdGlvblRpbWUoTGluZUlELCBbU3RhdGlvbklELHRhcmdldElEXSwgcGFyc2VJbnQodyksIGZ1bmN0aW9uKGpzb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcnRzID0ge0xpbmVJRDpMaW5lSUQsIFN0YXRpb25JRDogU3RhdGlvbklELCB0YXJnZXRJRDogdGFyZ2V0SUR9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihqc29uPT1jb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ0cy5zdGF0dXMgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnRzLm1lc3NhZ2UgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9NU0dfQ09NTV9GQUlMRUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydFN0YXR1cy5wdXNoKHJ0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5HZXQoYXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydHMuc3RhdHVzID0gY29tbW9uLkNPTlNUX1BUWF9BUElfU1VDQ0VTUztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ0U3RhdHVzLnB1c2gocnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkdldChhcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcnVuR2V0KG1ydFBUWEFyeSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0VVJMOiBmdW5jdGlvbih1cmwsIGNiRm4pe1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlcUxpc3RlbmVyKHhocil7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHtcclxuICAgICAgICAgICAgICAgIHhocjogeGhyLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeGhyLnRhcmdldC5yZXNwb25zZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHhoci50YXJnZXQucmVhZHlTdGF0ZT09NCAmJiB4aHIudGFyZ2V0LnN0YXR1cz09MjAwKXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0YXR1cyA9IGNvbW1vbi5DT05TVF9QVFhfQVBJX1NVQ0NFU1M7XHJcbiAgICAgICAgICAgICAgICBjYkZuKEpTT04ucGFyc2UoeGhyLnRhcmdldC5yZXNwb25zZSksIGV2ZW50KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdGF0dXMgPSBjb21tb24uQ09OU1RfUFRYX0FQSV9GQUlMO1xyXG4gICAgICAgICAgICAgICAgY2JGbih4aHIudGFyZ2V0LnJlc3BvbnNlLCBldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZtID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgZm0uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVxTGlzdGVuZXIpO1xyXG4gICAgICAgIGZtLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgZm0uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIHJlcUxpc3RlbmVyKTtcclxuICAgICAgICBmbS5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCByZXFMaXN0ZW5lcik7XHJcbiAgICAgICAgZm0ub3BlbignR0VUJywgdXJsKTtcclxuICAgICAgICBmbS50aW1lb3V0ID0gcHR4LnRpbWVvdXQ7XHJcbiAgICAgICAgdmFyIGhlYWRlck9iaiA9IHRoaXMuR2V0QXV0aG9yaXphdGlvbkhlYWRlcigpO1xyXG4gICAgICAgIGZvcih2YXIgayBpbiBoZWFkZXJPYmope1xyXG4gICAgICAgICAgICBmbS5zZXRSZXF1ZXN0SGVhZGVyKGssIGhlYWRlck9ialtrXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZtLnNlbmQoKTtcclxuICAgIH0sXHJcbiAgICBnZXRTdGF0aW9uTGl2ZUluZm86IGZ1bmN0aW9uKHN0aWQsIGNiRm4pe1xyXG4gICAgICAgIHN0aWQgPSAoc3RpZCkgPyBzdGlkLnJlcGxhY2UoJ3RyYV8nLCcnKSA6ICcxMDA4JztcclxuICAgICAgICBjYkZuID0gY2JGbiB8fCBmdW5jdGlvbihkYXRhKXtjb25zb2xlLmluZm8oZGF0YSk7fTtcclxuICAgICAgICB2YXIgdXJsID0gdHJhVVJMICsgJy9MaXZlQm9hcmQvU3RhdGlvbi8nICsgc3RpZCArICc/JHRvcD0zMCYkZm9ybWF0PUpTT04nO1xyXG4gICAgICAgIHRoaXMuZ2V0VVJMKHVybCwgY2JGbik7XHJcbiAgICB9LFxyXG4gICAgZ2V0U3RhdGlvblRvZGF5VGltZTogZnVuY3Rpb24oc3RpZCwgY2JGbil7XHJcbiAgICAgICAgc3RpZCA9IChzdGlkKSA/IHN0aWQucmVwbGFjZSgndHJhXycsJycpIDogJzEwMDgnO1xyXG4gICAgICAgIGNiRm4gPSBjYkZuIHx8IGZ1bmN0aW9uKGRhdGEpe2NvbnNvbGUuaW5mbyhkYXRhKTt9O1xyXG4gICAgICAgIHZhciB1cmwgPSB0cmFVUkwgKyAnL0RhaWx5VGltZXRhYmxlL1N0YXRpb24vJyArIHN0aWQgKyAnLycgKyBUVC5nb2luZ0RhdGEudG9kYXkgKyAnPyR0b3A9MzAwMCYkZm9ybWF0PUpTT04nO1xyXG4gICAgICAgIHRoaXMuZ2V0VVJMKHVybCwgY2JGbik7XHJcbiAgICB9LFxyXG4gICAgc29ydEJ5VFRTb3J0VGltZTogZnVuY3Rpb24oYSxiKXtcclxuICAgICAgICB2YXIgaW50QSA9IHBhcnNlSW50KGEudHRfc29ydFRpbWUsMTApO1xyXG4gICAgICAgIHZhciBpbnRCID0gcGFyc2VJbnQoYi50dF9zb3J0VGltZSwxMCk7XHJcbiAgICAgICAgaWYoaW50QT09aW50QikgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYoaW50QSA8IGludEIpIHJldHVybiAtMTtcclxuICAgICAgICBpZihpbnRBID4gaW50QikgcmV0dXJuIDE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB0eDtcclxuXHJcbiIsInZhciBwRGF0YSA9IHtcbiAgICBidXM6IHtcbiAgICAgICAgY2l0eTogW1xuICAgICAgICAgICAge25hbWU6J+iHuuWMl+W4gicsIENpdHk6J1RhaXBlaScsIENpdHlDb2RlOidUUEUnfSxcbiAgICAgICAgICAgIHtuYW1lOifmlrDljJfluIInLCBDaXR5OidOZXdUYWlwZWknLCBDaXR5Q29kZTonTldUJ30sXG4gICAgICAgICAgICB7bmFtZTon5qGD5ZyS5biCJywgQ2l0eTonVGFveXVhbicsIENpdHlDb2RlOidUQU8nfSxcbiAgICAgICAgICAgIHtuYW1lOifoh7rkuK3luIInLCBDaXR5OidUYWljaHVuZycsIENpdHlDb2RlOidUWEcnfSxcbiAgICAgICAgICAgIHtuYW1lOifoh7rljZfluIInLCBDaXR5OidUYWluYW4nLCBDaXR5Q29kZTonVE5OJ30sXG4gICAgICAgICAgICB7bmFtZTon6auY6ZuE5biCJywgQ2l0eTonS2FvaHNpdW5nJywgQ2l0eUNvZGU6J0tISCd9LFxuICAgICAgICAgICAge25hbWU6J+WfuumahuW4gicsIENpdHk6J0tlZWx1bmcnLCBDaXR5Q29kZTonS0VFJ30sXG4gICAgICAgICAgICB7bmFtZTon5paw56u55biCJywgQ2l0eTonSHNpbmNodScsIENpdHlDb2RlOidIU1onfSxcbiAgICAgICAgICAgIHtuYW1lOifmlrDnq7nnuKMnLCBDaXR5OidIc2luY2h1Q291bnR5JywgQ2l0eUNvZGU6J0hTUSd9LFxuICAgICAgICAgICAge25hbWU6J+iLl+agl+e4oycsIENpdHk6J01pYW9saUNvdW50eScsIENpdHlDb2RlOidNSUEnfSxcbiAgICAgICAgICAgIHtuYW1lOiflvbDljJbnuKMnLCBDaXR5OidDaGFuZ2h1YUNvdW50eScsIENpdHlDb2RlOidDSEEnfSxcbiAgICAgICAgICAgIHtuYW1lOifljZfmipXnuKMnLCBDaXR5OidOYW50b3VDb3VudHknLCBDaXR5Q29kZTonTkFOJ30sXG4gICAgICAgICAgICB7bmFtZTon6Zuy5p6X57ijJywgQ2l0eTonWXVubGluQ291bnR5JywgQ2l0eUNvZGU6J1lVTid9LFxuICAgICAgICAgICAge25hbWU6J+WYiee+qee4oycsIENpdHk6J0NoaWF5aUNvdW50eScsIENpdHlDb2RlOidDWVEnfSxcbiAgICAgICAgICAgIHtuYW1lOiflmInnvqnluIInLCBDaXR5OidDaGlheWknLCBDaXR5Q29kZTonQ1lJJ30sXG4gICAgICAgICAgICB7bmFtZTon5bGP5p2x57ijJywgQ2l0eTonUGluZ3R1bmdDb3VudHknLCBDaXR5Q29kZTonUElGJ30sXG4gICAgICAgICAgICB7bmFtZTon5a6c6Jit57ijJywgQ2l0eTonWWlsYW5Db3VudHknLCBDaXR5Q29kZTonSUxBJ30sXG4gICAgICAgICAgICB7bmFtZTon6Iqx6JOu57ijJywgQ2l0eTonSHVhbGllbkNvdW50eScsIENpdHlDb2RlOidIVUEnfSxcbiAgICAgICAgICAgIHtuYW1lOifoh7rmnbHnuKMnLCBDaXR5OidUYWl0dW5nQ291bnR5JywgQ2l0eUNvZGU6J1RUVCd9LFxuICAgICAgICAgICAge25hbWU6J+mHkemWgOe4oycsIENpdHk6J0tpbm1lbkNvdW50eScsIENpdHlDb2RlOidLSU4nfSxcbiAgICAgICAgICAgIHtuYW1lOifmvo7muZbnuKMnLCBDaXR5OidQZW5naHVDb3VudHknLCBDaXR5Q29kZTonUEVOJ30sXG4gICAgICAgICAgICB7bmFtZTon6YCj5rGf57ijJywgQ2l0eTonTGllbmNoaWFuZ0NvdW50eScsIENpdHlDb2RlOidMSUUnfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB0cnRjOiB7XG4gICAgICAgIHN0YXRpb25fYXJ5OiBbXG4gICAgICAgICAgICAvL0Jhbm5hbiBMaW5lXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAzMVwiLCBTdGF0aW9uSUQ6W1wiQkwyM1wiLFwiQlIyNFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA5N1wiLCBTdGF0aW9uSUQ6W1wiQkwyMlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA5NlwiLCBTdGF0aW9uSUQ6W1wiQkwyMVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA5NVwiLCBTdGF0aW9uSUQ6W1wiQkwyMFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA5NFwiLCBTdGF0aW9uSUQ6W1wiQkwxOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA5M1wiLCBTdGF0aW9uSUQ6W1wiQkwxOFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA5MlwiLCBTdGF0aW9uSUQ6W1wiQkwxN1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA5MVwiLCBTdGF0aW9uSUQ6W1wiQkwxNlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAxMFwiLCBTdGF0aW9uSUQ6W1wiQkwxNVwiLFwiQlIxMFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA4OVwiLCBTdGF0aW9uSUQ6W1wiQkwxNFwiLFwiTzA3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDg4XCIsIFN0YXRpb25JRDpbXCJCTDEzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDg2XCIsIFN0YXRpb25JRDpbXCJCTDExXCIsXCJHMTJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wODVcIiwgU3RhdGlvbklEOltcIkJMMTBcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wODRcIiwgU3RhdGlvbklEOltcIkJMMDlcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wODNcIiwgU3RhdGlvbklEOltcIkJMMDhcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wODJcIiwgU3RhdGlvbklEOltcIkJMMDdcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wODFcIiwgU3RhdGlvbklEOltcIkJMMDZcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wODBcIiwgU3RhdGlvbklEOltcIkJMMDVcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNzlcIiwgU3RhdGlvbklEOltcIkJMMDRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNzhcIiwgU3RhdGlvbklEOltcIkJMMDNcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNzdcIiwgU3RhdGlvbklEOltcIkJMMDJcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNzZcIiwgU3RhdGlvbklEOltcIkJMMDFcIl19LFxuICAgICAgICAgICAgLy9UYW1zdWlYaW55aSBMaW5lXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA3MVwiLCBTdGF0aW9uSUQ6W1wiUjI4XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDcwXCIsIFN0YXRpb25JRDpbXCJSMjdcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNjlcIiwgU3RhdGlvbklEOltcIlIyNlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA2OFwiLCBTdGF0aW9uSUQ6W1wiUjI1XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDY3XCIsIFN0YXRpb25JRDpbXCJSMjRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNjZcIiwgU3RhdGlvbklEOltcIlIyM1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA2NFwiLCBTdGF0aW9uSUQ6W1wiUjIyXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDYzXCIsIFN0YXRpb25JRDpbXCJSMjFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNjJcIiwgU3RhdGlvbklEOltcIlIyMFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA2MVwiLCBTdGF0aW9uSUQ6W1wiUjE5XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDYwXCIsIFN0YXRpb25JRDpbXCJSMThcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTlcIiwgU3RhdGlvbklEOltcIlIxN1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA1OFwiLCBTdGF0aW9uSUQ6W1wiUjE2XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDU3XCIsIFN0YXRpb25JRDpbXCJSMTVcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTZcIiwgU3RhdGlvbklEOltcIlIxNFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA1NVwiLCBTdGF0aW9uSUQ6W1wiUjEzXCIsXCJPMTFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTRcIiwgU3RhdGlvbklEOltcIlIxMlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA1M1wiLCBTdGF0aW9uSUQ6W1wiUjExXCIsXCJHMTRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNTFcIiwgU3RhdGlvbklEOltcIlIxMFwiLFwiQkwxMlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA1MFwiLCBTdGF0aW9uSUQ6W1wiUjA5XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTM0XCIsIFN0YXRpb25JRDpbXCJSMDdcIixcIk8wNlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEwM1wiLCBTdGF0aW9uSUQ6W1wiUjA2XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDExXCIsIFN0YXRpb25JRDpbXCJSMDVcIixcIkJSMDlcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMDFcIiwgU3RhdGlvbklEOltcIlIwNFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEwMFwiLCBTdGF0aW9uSUQ6W1wiUjAzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDk5XCIsIFN0YXRpb25JRDpbXCJSMDJcIl19LFxuICAgICAgICAgICAgLy9aaG9uZ0hlWGluTHUgTGluZVxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNDhcIiwgU3RhdGlvbklEOltcIk8wMVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA0N1wiLCBTdGF0aW9uSUQ6W1wiTzAyXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDQ2XCIsIFN0YXRpb25JRDpbXCJPMDNcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNDVcIiwgU3RhdGlvbklEOltcIk8wNFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEzMVwiLCBTdGF0aW9uSUQ6W1wiTzA5XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTMwXCIsIFN0YXRpb25JRDpbXCJPMTBcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMjhcIiwgU3RhdGlvbklEOltcIk8xMlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEyN1wiLCBTdGF0aW9uSUQ6W1wiTzEzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTI2XCIsIFN0YXRpb25JRDpbXCJPMTRcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMjVcIiwgU3RhdGlvbklEOltcIk8xNVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEyNFwiLCBTdGF0aW9uSUQ6W1wiTzE2XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTIzXCIsIFN0YXRpb25JRDpbXCJPMTdcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMjJcIiwgU3RhdGlvbklEOltcIk8xOFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEyMVwiLCBTdGF0aW9uSUQ6W1wiTzE5XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTgwXCIsIFN0YXRpb25JRDpbXCJPMjBcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xNzlcIiwgU3RhdGlvbklEOltcIk8yMVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzE3OFwiLCBTdGF0aW9uSUQ6W1wiTzUwXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTc3XCIsIFN0YXRpb25JRDpbXCJPNTFcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xNzZcIiwgU3RhdGlvbklEOltcIk81MlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzE3NVwiLCBTdGF0aW9uSUQ6W1wiTzUzXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTc0XCIsIFN0YXRpb25JRDpbXCJPNTRcIl19LFxuICAgICAgICAgICAgLy9Tb25nU2hhblhpbkRpYW4gTGluZVxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMTFcIiwgU3RhdGlvbklEOltcIkcxOVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzExMFwiLCBTdGF0aW9uSUQ6W1wiRzE4XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMTA5XCIsIFN0YXRpb25JRDpbXCJHMTdcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMDlcIiwgU3RhdGlvbklEOltcIkcxNlwiLFwiQlIxMVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzEzMlwiLCBTdGF0aW9uSUQ6W1wiRzE1XCIsXCJPMDhcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18xMDVcIiwgU3RhdGlvbklEOltcIkcxM1wiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA0M1wiLCBTdGF0aW9uSUQ6W1wiRzExXCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDQyXCIsIFN0YXRpb25JRDpbXCJHMTBcIixcIlIwOFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzA0MVwiLCBTdGF0aW9uSUQ6W1wiRzA5XCIsXCJPMDVcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wNDBcIiwgU3RhdGlvbklEOltcIkcwOFwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAzOVwiLCBTdGF0aW9uSUQ6W1wiRzA3XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDM4XCIsIFN0YXRpb25JRDpbXCJHMDZcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzdcIiwgU3RhdGlvbklEOltcIkcwNVwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAzNlwiLCBTdGF0aW9uSUQ6W1wiRzA0XCJdfSxcbiAgICAgICAgICAgIHtpZDpcInRydGNfMDM1XCIsIFN0YXRpb25JRDpbXCJHMDNcIl19LFxuICAgICAgICAgICAge2lkOlwidHJ0Y18wMzRcIiwgU3RhdGlvbklEOltcIkcwMlwiXX0sXG4gICAgICAgICAgICB7aWQ6XCJ0cnRjXzAzM1wiLCBTdGF0aW9uSUQ6W1wiRzAxXCJdfVxuICAgICAgICBdLFxuICAgICAgICBsaW5lOiBbe1xuICAgICAgICAgICAgaWQ6ICd0cnRjXzEnLFxuICAgICAgICAgICAgTGluZUlEOiAnQlInLFxuICAgICAgICAgICAgcm91dGU6IFt7XG4gICAgICAgICAgICAgICAgZGlyOiAwLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMCxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdCUi0xJywgZnJvbTogJ0JSMDEnLCB0bzogJ0JSMjQnfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkaXI6IDEsXG4gICAgICAgICAgICAgICAgRGlyZWN0aW9uOiAxLFxuICAgICAgICAgICAgICAgIHdvcms6IFt7Um91dGVJRDogJ0JSLTEnLCBmcm9tOiAnQlIyNCcsIHRvOiAnQlIwMSd9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd0cnRjXzInLFxuICAgICAgICAgICAgTGluZUlEOiAnUicsXG4gICAgICAgICAgICByb3V0ZTogW3tcbiAgICAgICAgICAgICAgICBkaXI6IDAsXG4gICAgICAgICAgICAgICAgRGlyZWN0aW9uOiAwLFxuICAgICAgICAgICAgICAgIHdvcms6IFt7Um91dGVJRDogJ1ItMScsIGZyb206ICdSMDInLCB0bzogJ1IyOCd9LCB7Um91dGVJRDogJ1ItMicsIGZyb206ICdSMDUnLCB0bzogJ1IyMid9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRpcjogMSxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDEsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnUi0xJywgZnJvbTogJ1IyOCcsIHRvOiAnUjAyJ30sIHtSb3V0ZUlEOiAnUi0yJywgZnJvbTogJ1IyMicsIHRvOiAnUjA1J31dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ3RydGNfMycsXG4gICAgICAgICAgICBMaW5lSUQ6ICdHJyxcbiAgICAgICAgICAgIHJvdXRlOiBbe1xuICAgICAgICAgICAgICAgIGRpcjogMCxcbiAgICAgICAgICAgICAgICBEaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgd29yazogW3tSb3V0ZUlEOiAnRy0xJywgZnJvbTogJ0cwMScsIHRvOiAnRzE5J30sIHtSb3V0ZUlEOiAnRy0yJywgZnJvbTogJ0cwOCcsIHRvOiAnRzE5J31dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGlyOiAxLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdHLTEnLCBmcm9tOiAnRzE5JywgdG86ICdHMDEnfSwge1JvdXRlSUQ6ICdHLTInLCBmcm9tOiAnRzE5JywgdG86ICdHMDgnfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAndHJ0Y180JyxcbiAgICAgICAgICAgIExpbmVJRDogJ08nLFxuICAgICAgICAgICAgcm91dGU6IFt7XG4gICAgICAgICAgICAgICAgZGlyOiAwLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMCxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdPLTEnLCBmcm9tOiAnTzAxJywgdG86ICdPMjEnfSwge1JvdXRlSUQ6ICdPLTInLCBmcm9tOiAnTzAxJywgdG86ICdPNTQnfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkaXI6IDEsXG4gICAgICAgICAgICAgICAgRGlyZWN0aW9uOiAxLFxuICAgICAgICAgICAgICAgIHdvcms6IFt7Um91dGVJRDogJ08tMScsIGZyb206ICdPMjEnLCB0bzogJ08wMSd9LCB7Um91dGVJRDogJ08tMicsIGZyb206ICdPNTQnLCB0bzogJ08wMSd9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd0cnRjXzUnLFxuICAgICAgICAgICAgTGluZUlEOiAnQkwnLFxuICAgICAgICAgICAgcm91dGU6IFt7XG4gICAgICAgICAgICAgICAgZGlyOiAwLFxuICAgICAgICAgICAgICAgIERpcmVjdGlvbjogMCxcbiAgICAgICAgICAgICAgICB3b3JrOiBbe1JvdXRlSUQ6ICdCTC0xJywgZnJvbTogJ0JMMDEnLCB0bzogJ0JMMjMnfSwge1JvdXRlSUQ6ICdCTC0yJywgZnJvbTogJ0JMMDUnLCB0bzogJ0JMMjMnfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkaXI6IDEsXG4gICAgICAgICAgICAgICAgRGlyZWN0aW9uOiAxLFxuICAgICAgICAgICAgICAgIHdvcms6IFt7Um91dGVJRDogJ0JMLTEnLCBmcm9tOiAnQkwyMycsIHRvOiAnQkwwMSd9LCB7Um91dGVJRDogJ0JMLTInLCBmcm9tOiAnQkwyMycsIHRvOiAnQkwwNSd9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBEYXRhOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi9jb21tb24uanMnO1xuaW1wb3J0IHB0eCBmcm9tICcuL3B0eC5qcyc7XG5pbXBvcnQgcERhdGEgZnJvbSAnLi9kYXRhLmpzJztcblxubGV0IGJ1c1VSTCA9IGNvbW1vbi5idXNVUkw7XG5cbnZhciBmbkJVUyA9IHtcbiAgICBzZXREZWZhdWx0Q2ZnOiBmdW5jdGlvbihjZmcpe1xuICAgICAgICBjZmcgPSBjZmcgfHwge307XG4gICAgICAgIGNmZy5tYW5hZ2VCeSA9IGNmZy5tYW5hZ2VCeSB8fCAnQ2l0eSc7Ly9DaXR5ICwgSW50ZXJDaXR5XG4gICAgICAgIGNmZy5jYkZuID0gY2ZnLmNiRm4gfHwgZnVuY3Rpb24oZGF0YSxlKXtjb25zb2xlLmluZm8oZGF0YSk7fTtcbiAgICAgICAgY2ZnLnNlbGVjdEZpZWxkID0gKGNmZy5zZWxlY3RGaWVsZCkgPyBwdHguc2VsZWN0RmllbGRGbihjZmcuc2VsZWN0RmllbGQpIDogJyc7XG4gICAgICAgIGNmZy50b3AgPSAzMDAwO1xuICAgICAgICByZXR1cm4gY2ZnO1xuICAgIH0sXG4gICAgZ2V0Q2l0eURhdGE6IGZ1bmN0aW9uKHN0cil7XG4gICAgICAgIHZhciBhcnkgPSBwRGF0YS5idXMuY2l0eTtcbiAgICAgICAgdmFyIHJ0ID0gZmFsc2U7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGFyeS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihhcnlbaV0ubmFtZT09c3RyIHx8IGFyeVtpXS5DaXR5PT1zdHIgfHwgYXJ5W2ldLkNpdHlDb2RlPT1zdHIpe1xuICAgICAgICAgICAgcnQgPSBhcnlbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcnQ7XG4gICAgfSxcbiAgICBnZXRCdXNBcnJpdmVUaW1lOiBmdW5jdGlvbihTdG9wVUlELCBjaXR5LCBjZmcpe1xuICAgICAgICB2YXIgZmlsdGVyU3RyID0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnU3RvcFVJRCcsJz09JyxTdG9wVUlELCdvcicpKTtcbiAgICAgICAgdGhpcy5nZXRFc3RpbWF0ZWRUaW1lT2ZBcnJpdmFsKGZpbHRlclN0ciwgY2l0eSwgY2ZnKTtcbiAgICB9LFxuICAgIGdldEJ1c1JvdXRlQXJyaXZlVGltZTogZnVuY3Rpb24oUm91dGVVSUQsIGNmZyl7XG4gICAgICAgIHZhciBjaXR5ID0gUm91dGVVSUQuc3Vic3RyKDAsMyk7XG4gICAgICAgIHZhciBmaWx0ZXJTdHIgPSBwdHguZmlsdGVyRm4ocHR4LmZpbHRlclBhcmFtKCdSb3V0ZVVJRCcsJz09JyxSb3V0ZVVJRCwnb3InKSk7XG4gICAgICAgIHRoaXMuZ2V0RXN0aW1hdGVkVGltZU9mQXJyaXZhbChmaWx0ZXJTdHIsIGNpdHksIGNmZyk7XG4gICAgfSxcbiAgICBnZXRCdXNSb3V0ZUluZm86IGZ1bmN0aW9uKFJvdXRlVUlELCBjZmcpe1xuICAgICAgICBjZmcgPSB0aGlzLnNldERlZmF1bHRDZmcoY2ZnKTtcbiAgICAgICAgdmFyIGNpdHkgPSBSb3V0ZVVJRC5zdWJzdHIoMCwzKTtcbiAgICAgICAgdmFyIG15VVJMID0gYnVzVVJMICsgJy9Sb3V0ZS8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJz8nO1xuICAgICAgICBteVVSTCArPSBwdHguZmlsdGVyRm4ocHR4LmZpbHRlclBhcmFtKCdSb3V0ZVVJRCcsJz09JyxSb3V0ZVVJRCkgKyAnJicgKyBwdHgudG9wRm4oKSk7XG4gICAgICAgIGlmKGNmZy5zZWxlY3RGaWVsZCkgbXlVUkwgKz0gJyYnICsgY2ZnLnNlbGVjdEZpZWxkO1xuICAgICAgICBwdHguZ2V0VVJMKG15VVJMLCBjZmcuY2JGbik7XG4gICAgfSxcbiAgICBnZXRCdXNSZWFsdGltZU5lYXJTdG9wOiBmdW5jdGlvbihSb3V0ZVVJRCwgZGlyLCBjZmcpe1xuICAgICAgICBjZmcgPSB0aGlzLnNldERlZmF1bHRDZmcoY2ZnKTtcbiAgICAgICAgdmFyIGNpdHkgPSBSb3V0ZVVJRC5zdWJzdHIoMCwzKTtcbiAgICAgICAgaWYoL3N0cmluZ3xudW1iZXIvLnRlc3QodHlwZW9mKGRpcikpKXtcbiAgICAgICAgICAgIGRpciA9IGRpci50b1N0cmluZygpO1xuICAgICAgICAgICAgdmFyIG15VVJMID0gYnVzVVJMICsgJy9SZWFsVGltZU5lYXJTdG9wLycgKyBjZmcubWFuYWdlQnkgKyAnLycgKyB0aGlzLmdldENpdHlEYXRhKGNpdHkpLkNpdHkgKyAnPyc7XG4gICAgICAgICAgICBteVVSTCArPSBwdHguZmlsdGVyRm4ocHR4LmZpbHRlclBhcmFtKFsnUm91dGVVSUQnLCAnRGlyZWN0aW9uJ10sJz09JyxbUm91dGVVSUQsIGRpcl0sJ2FuZCcpKSArICcmJyArIHB0eC50b3BGbigpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBteVVSTCA9IGJ1c1VSTCArICcvUmVhbFRpbWVOZWFyU3RvcC8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJz8nO1xuICAgICAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbShbJ1JvdXRlVUlEJ10sJz09JyxbUm91dGVVSURdLCdhbmQnKSkgKyAnJicgKyBwdHgudG9wRm4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH0sXG4gICAgZ2V0QnVzUm91dGU6IGZ1bmN0aW9uKFJvdXRlVUlELCBjZmcsIGNpdHkpe1xuICAgICAgICBjZmcgPSB0aGlzLnNldERlZmF1bHRDZmcoY2ZnKTtcbiAgICAgICAgaWYoIWNpdHkpe1xuICAgICAgICAgICAgaWYodHlwZW9mKFJvdXRlVUlEKT09J3N0cmluZycpe2NpdHkgPSBSb3V0ZVVJRC5zdWJzdHIoMCwzKTt9XG4gICAgICAgICAgICBlbHNle2NpdHkgPSBSb3V0ZVVJRFswXS5zdWJzdHIoMCwzKTt9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG15VVJMID0gYnVzVVJMICsgJy9Sb3V0ZS8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJz8nO1xuICAgICAgICBteVVSTCArPSBwdHguZmlsdGVyRm4ocHR4LmZpbHRlclBhcmFtKCdSb3V0ZVVJRCcsJz09JyxSb3V0ZVVJRCksJ29yJykgKyAnJicgKyBwdHgudG9wRm4oKTtcbiAgICAgICAgaWYoY2ZnLnNlbGVjdEZpZWxkKSBteVVSTCArPSAnJicgKyBjZmcuc2VsZWN0RmllbGQ7XG4gICAgICAgIHB0eC5nZXRVUkwobXlVUkwsIGNmZy5jYkZuKTtcbiAgICB9LFxuICAgIGdldEJ1c1N0YXRpb246IGZ1bmN0aW9uKFN0YXRpb25JRCwgY2l0eSwgY2ZnKXtcbiAgICAgICAgY2ZnID0gdGhpcy5zZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgICAgIHZhciBteVVSTCA9IGJ1c1VSTCArICcvU3RhdGlvbi8nICsgY2ZnLm1hbmFnZUJ5ICsgJy8nICsgdGhpcy5nZXRDaXR5RGF0YShjaXR5KS5DaXR5ICsgJz8nO1xuICAgICAgICBteVVSTCArPSBwdHguZmlsdGVyRm4ocHR4LmZpbHRlclBhcmFtKCdTdGF0aW9uSUQnLCc9PScsU3RhdGlvbklELnRvU3RyaW5nKCkpKSArICcmJyArIHB0eC50b3BGbigpO1xuICAgICAgICBpZihjZmcuc2VsZWN0RmllbGQpIG15VVJMICs9ICcmJyArIGNmZy5zZWxlY3RGaWVsZDtcbiAgICAgICAgcHR4LmdldFVSTChteVVSTCwgY2ZnLmNiRm4pO1xuICAgIH0sXG4gICAgZ2V0QnVzU3RvcFJvdXRlOiBmdW5jdGlvbihSb3V0ZVVJRCwgY2l0eSwgY2ZnKXtcbiAgICAgICAgY2ZnID0gdGhpcy5zZXREZWZhdWx0Q2ZnKGNmZyk7XG4gICAgICAgIHZhciBteVVSTCA9IGJ1c1VSTCArICcvU3RvcE9mUm91dGUvJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gcHR4LmZpbHRlckZuKHB0eC5maWx0ZXJQYXJhbSgnUm91dGVVSUQnLCc9PScsUm91dGVVSUQudG9TdHJpbmcoKSkpICsgJyYnO1xuICAgICAgICBteVVSTCArPSBwdHgub3JkZXJCeUZuKCdTdWJSb3V0ZU5hbWUvWmhfdHcnLCAnYXNjJykgKyAnJicgKyBwdHgudG9wRm4oKTtcbiAgICAgICAgaWYoY2ZnLnNlbGVjdEZpZWxkKSBteVVSTCArPSAnJicgKyBjZmcuc2VsZWN0RmllbGQ7XG4gICAgICAgIHB0eC5nZXRVUkwobXlVUkwsIGNmZy5jYkZuKTtcbiAgICB9LFxuICAgIGdldEJ1c1N0b3BSb3V0ZUJ5TnVtYmVyOiBmdW5jdGlvbihidXNOdW1iZXIsIGNpdHksIGNmZyl7XG4gICAgICAgIGNmZyA9IHRoaXMuc2V0RGVmYXVsdENmZyhjZmcpO1xuICAgICAgICB2YXIgbXlVUkwgPSBidXNVUkwgKyAnL1N0b3BPZlJvdXRlLycgKyBjZmcubWFuYWdlQnkgKyAnLycgKyB0aGlzLmdldENpdHlEYXRhKGNpdHkpLkNpdHkgKyAnLycgKyBlbmNvZGVVUkkoYnVzTnVtYmVyKSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gcHR4Lm9yZGVyQnlGbignU3ViUm91dGVOYW1lL1poX3R3JywgJ2FzYycpICsgJyYnICsgcHR4LnRvcEZuKCk7XG4gICAgICAgIGlmKGNmZy5zZWxlY3RGaWVsZCkgbXlVUkwgKz0gJyYnICsgY2ZnLnNlbGVjdEZpZWxkO1xuICAgICAgICBwdHguZ2V0VVJMKG15VVJMLCBjZmcuY2JGbik7XG4gICAgfSxcbiAgICBnZXRFc3RpbWF0ZWRUaW1lT2ZBcnJpdmFsOiBmdW5jdGlvbihmaWx0ZXJTdHIsIGNpdHksIGNmZyl7XG4gICAgICAgIGZpbHRlclN0ciA9IChmaWx0ZXJTdHIpID8gZmlsdGVyU3RyICsgJyYnIDogJyc7XG4gICAgICAgIGNmZyA9IHRoaXMuc2V0RGVmYXVsdENmZyhjZmcpO1xuICAgICAgICB2YXIgbXlVUkwgPSBidXNVUkwgKyAnL0VzdGltYXRlZFRpbWVPZkFycml2YWwvJyArIGNmZy5tYW5hZ2VCeSArICcvJyArIHRoaXMuZ2V0Q2l0eURhdGEoY2l0eSkuQ2l0eSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gZmlsdGVyU3RyICsgcHR4LnRvcEZuKCk7XG4gICAgICAgIGlmKGNmZy5zZWxlY3RGaWVsZCkgbXlVUkwgKz0gJyYnICsgY2ZnLnNlbGVjdEZpZWxkO1xuICAgICAgICBwdHguZ2V0VVJMKG15VVJMLCBjZmcuY2JGbik7XG4gICAgfSxcbiAgICBzZWFyY2hCdXNCeU51bWJlcjpmdW5jdGlvbihidXNOdW1iZXIsIGNpdHksIGNmZyl7XG4gICAgICAgIGNmZyA9IHRoaXMuc2V0RGVmYXVsdENmZyhjZmcpO1xuICAgICAgICB2YXIgbXlVUkwgPSBidXNVUkwgKyAnL1JvdXRlLycgKyBjZmcubWFuYWdlQnkgKyAnLycgKyB0aGlzLmdldENpdHlEYXRhKGNpdHkpLkNpdHkgKyAnLycgKyBlbmNvZGVVUkkoYnVzTnVtYmVyKSArICc/JztcbiAgICAgICAgbXlVUkwgKz0gcHR4Lm9yZGVyQnlGbignUm91dGVOYW1lL1poX3R3JywgJ2FzYycpICsgJyYnICsgcHR4LnRvcEZuKCk7XG4gICAgICAgIGlmKGNmZy5zZWxlY3RGaWVsZCkgbXlVUkwgKz0gJyYnICsgY2ZnLnNlbGVjdEZpZWxkO1xuICAgICAgICBwdHguZ2V0VVJMKG15VVJMLCBjZmcuY2JGbik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmbkJVUzsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uLmpzJztcbmltcG9ydCBwdHggZnJvbSAnLi9wdHguanMnO1xuaW1wb3J0IHBEYXRhIGZyb20gJy4vZGF0YS5qcyc7XG5cbnZhciBmblRSVEMgPSB7XG4gICAgY2hlY2tSb3V0ZUlkT25Vc2U6IGZ1bmN0aW9uKFJvdXRlSUQsIExpbmVJRCl7XG4gICAgICAgIHZhciBsaW5lRGF0YSA9IHRoaXMuZ2V0TGluZURhdGEoTGluZUlEKTtcbiAgICAgICAgdmFyIHJ0ID0gZmFsc2U7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGxpbmVEYXRhLnJvdXRlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGZvcih2YXIgaj0wOyBqPGxpbmVEYXRhLnJvdXRlW2ldLndvcmsubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgIGlmKGxpbmVEYXRhLnJvdXRlW2ldLndvcmtbal0uUm91dGVJRD09Um91dGVJRCl7XG4gICAgICAgICAgICAgICAgICAgIHJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydDtcbiAgICB9LFxuICAgIGdldExpbmVEYXRhOiBmdW5jdGlvbihpZCl7XG4gICAgICAgIHZhciBydCA9IGZhbHNlO1xuICAgICAgICBwRGF0YS50cnRjLmxpbmUuZm9yRWFjaChmdW5jdGlvbihjKXtcbiAgICAgICAgICAgIGlmKGMuaWQ9PWlkIHx8IGMuTGluZUlEPT1pZCl7XG4gICAgICAgICAgICAgICAgcnQgPSBjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJ0O1xuICAgIH0sXG4gICAgZ2V0TGluZUlEOiBmdW5jdGlvbihpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldExpbmVEYXRhKGlkKS5MaW5lSUQ7XG4gICAgfSxcbiAgICBnZXRPcmlnaW5hbExpbmVCeUxpbmVJRDogZnVuY3Rpb24oTGluZUlEKXtcbiAgICAgICAgdmFyIHJ0ID0gZmFsc2U7XG4gICAgICAgIHBEYXRhLnRydGMubGluZS5mb3JFYWNoKGZ1bmN0aW9uKGMpe1xuICAgICAgICAgICAgaWYoYy5MaW5lSUQ9PUxpbmVJRCl7XG4gICAgICAgICAgICAgICAgcnQgPSBjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJ0O1xuICAgIH0sXG4gICAgZ2V0U3RhdGlvbklEQXJ5OiBmdW5jdGlvbihpZCl7XG4gICAgICAgIHZhciBhcnkgPSBwRGF0YS50cnRjLnN0YXRpb25fYXJ5O1xuICAgICAgICB2YXIgc3REYXRhID0gZmFsc2U7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGFyeS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihhcnlbaV0uaWQ9PWlkKXtcbiAgICAgICAgICAgICAgICBzdERhdGEgPSBhcnlbaV0uU3RhdGlvbklEO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdERhdGE7XG4gICAgfSxcbiAgICBnZXRTdGF0aW9uSUQ6IGZ1bmN0aW9uKGlkLCBsaW5lT3JpZ2luYWxJRCl7XG4gICAgICAgIHZhciBMaW5lSUQgPSAoL150cnRjLy50ZXN0KGxpbmVPcmlnaW5hbElEKSkgPyB0aGlzLmdldExpbmVJRChsaW5lT3JpZ2luYWxJRCkgOiBsaW5lT3JpZ2luYWxJRDtcbiAgICAgICAgdmFyIHN0RGF0YSA9IHRoaXMuZ2V0U3RhdGlvbklEQXJ5KGlkKTtcbiAgICAgICAgaWYoIUxpbmVJRCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyIHJ0ID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgbGluZUNvZGUgPSAnJyxcbiAgICAgICAgICAgICAgICBjb2RlTGVuID0gMDtcbiAgICAgICAgICAgIHN0RGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGMpe1xuICAgICAgICAgICAgICAgIGlmKC9eW2EtekEtWl17MX1cXGR7Mn0vZ2kudGVzdChjKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvZGVMZW4gPSAxO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKC9eW2EtekEtWl17Mn1cXGR7Mn0vZ2kudGVzdChjKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvZGVMZW4gPSAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaW5lQ29kZSA9IGMuc3Vic3RyKDAsIGNvZGVMZW4pO1xuICAgICAgICAgICAgICAgIGlmKGxpbmVDb2RlID09IExpbmVJRCl7XG4gICAgICAgICAgICAgICAgICAgIHJ0ID0gYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBydDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3RhdGlvbklESW5XaGF0TGluZTogZnVuY3Rpb24oU3RhdGlvaW5JRCl7XG4gICAgICAgIGlmKC9eW2EtekEtWl17MX1cXGR7Mn0vZ2kudGVzdChTdGF0aW9pbklEKSl7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGlvaW5JRC5zdWJzdHIoMCwxKTtcbiAgICAgICAgfWVsc2UgaWYoL15bYS16QS1aXXsyfVxcZHsyfS9naS50ZXN0KFN0YXRpb2luSUQpKXtcbiAgICAgICAgICAgIHJldHVybiBTdGF0aW9pbklELnN1YnN0cigwLDIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdGF0aW9uVGltZTogZnVuY3Rpb24oTGluZUlELCBTdGF0aW9uSUQsIHcsIGNiRm4pe1xuICAgICAgICB2YXIgdGFyZ2V0SUQgPSBmYWxzZTtcbiAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgaWYodHlwZW9mKFN0YXRpb25JRCkhPSdzdHJpbmcnICYmIFN0YXRpb25JRC5sZW5ndGg9PTIpe1xuICAgICAgICAgICAgdGFyZ2V0SUQgPSBTdGF0aW9uSURbMV07XG4gICAgICAgICAgICBTdGF0aW9uSUQgPSBTdGF0aW9uSURbMF07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIFdlZWsgPSBmYWxzZTtcbiAgICAgICAgaWYodHlwZW9mKHcpPT0nbnVtYmVyJykgV2VlayA9IGNvbW1vbi5wdHhNUlRXZWVrU3RyW3ddO1xuICAgICAgICB2YXIgbXRTdHIgPSBcIiRmaWx0ZXI9TGluZUlEIGVxICdcIiArIExpbmVJRCArIFwiJyBhbmQgU3RhdGlvbklEIGVxICdcIiArIFN0YXRpb25JRCArIFwiJ1wiO1xuICAgICAgICBpZihXZWVrKSBtdFN0ciArPSAnIGFuZCBTZXJ2aWNlRGF5cy8nICsgV2VlayArICcgZXEgdHJ1ZSc7XG4gICAgICAgIHZhciB1cmwgPSBjb21tb24ubWV0cm9VUkwgKyAnL1N0YXRpb25UaW1lVGFibGUvVFJUQz8nICsgZW5jb2RlVVJJKG10U3RyKSArICcmJHRvcD0zMDAwJiRmb3JtYXQ9SlNPTic7XG4gICAgICAgIGNvbW1vbi5wdWkucHJpbnRTdGF0dXMoJ+e3muS4iuWwi+aJvuaNt+mBiyAnICsgU3RhdGlvbklEICsgJyDnq5nmmYLliLvooagnKTtcbiAgICAgICAgLy/nlKLnlJ/mmqvlrZjmmYLliLvooajnqbrplpNcbiAgICAgICAgaWYoIXB0eC50ZW1wVGltZVRhYmxlLnRydGMpIHB0eC50ZW1wVGltZVRhYmxlLnRydGMgPSB7fTtcbiAgICAgICAgaWYoIXB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXSkgcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdID0gW107XG4gICAgICAgIGlmKCFwdHgudGVtcFRpbWVUYWJsZS50cnRjW0xpbmVJRF1bU3RhdGlvbklEXSkgcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF0gPSBbXTtcbiAgICAgICAgcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF1bd10gPSBbW10sW11dOy8vRGlyZWN0aW9uIDAgYW5kIDFcbiAgICAgICAgLy/mipPmmYLliLvooahcbiAgICAgICAgcHR4LmdldFVSTCh1cmwsIGZ1bmN0aW9uKGpzb24sIGUpe1xuICAgICAgICAgICAgaWYoZS5zdGF0dXM9PWNvbW1vbi5DT05TVF9QVFhfQVBJX0ZBSUwpe1xuICAgICAgICAgICAgICAgIGNiRm4oanNvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAganNvbi5mb3JFYWNoKGZ1bmN0aW9uKHJvdXRlQSl7XG4gICAgICAgICAgICAgICAgdmFyIHRtcEFyeSA9IHB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddO1xuICAgICAgICAgICAgICAgIHZhciB0bXBUaW1lQXJ5ID0gcm91dGVBLlRpbWV0YWJsZXMubWFwKGZ1bmN0aW9uKHRpbWVPYmope1xuICAgICAgICAgICAgICAgICAgICB0aW1lT2JqLnR0X3NvcnRUaW1lID0gVFQuZm4udHJhbnNUaW1lMlNlYyh0aW1lT2JqLkRlcGFydHVyZVRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lT2JqLlJvdXRlSUQgPSByb3V0ZUEuUm91dGVJRDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVPYmo7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYobWUuY2hlY2tSb3V0ZUlkT25Vc2Uocm91dGVBLlJvdXRlSUQsIHJvdXRlQS5MaW5lSUQpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocm91dGVBLkRpcmVjdGlvbiA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFyeVswXSA9IHRtcEFyeVswXS5jb25jYXQodG1wVGltZUFyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJvdXRlQS5EaXJlY3Rpb24gPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnlbMV0gPSB0bXBBcnlbMV0uY29uY2F0KHRtcFRpbWVBcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB3b3JrQXJ5ID0gcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF1bd107XG4gICAgICAgICAgICB2YXIgdGltZU1ha2VGbiA9IGZ1bmN0aW9uKGMpe1xuICAgICAgICAgICAgICAgIHJldHVybiBjLkRlcGFydHVyZVRpbWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd29ya0FyeVswXSA9IHdvcmtBcnlbMF0uc29ydChwdHguc29ydEJ5VFRTb3J0VGltZSk7XG4gICAgICAgICAgICAvL+WcqOmAmeS4gOatpeS5i+WJjemDvemChOaYr+eJqeS7tueLgOaFi+aZguWIu+ihqO+8jOS5i+W+jOaaq+aZguaUuemAoOaIkOWWruS4gOaZguWIu+ihqOabv+aPmyBybndUaW1lVGFibGVcbiAgICAgICAgICAgIHdvcmtBcnlbMF0gPSB3b3JrQXJ5WzBdLm1hcCh0aW1lTWFrZUZuKTtcbiAgICAgICAgICAgIHdvcmtBcnlbMV0gPSB3b3JrQXJ5WzFdLnNvcnQocHR4LnNvcnRCeVRUU29ydFRpbWUpO1xuICAgICAgICAgICAgd29ya0FyeVsxXSA9IHdvcmtBcnlbMV0ubWFwKHRpbWVNYWtlRm4pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYkZuKGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldEZvcm1hdFN0YXRpb25UaW1lOiBmdW5jdGlvbihzdElELCBsaW5lLCBkaXIsIHcpe1xuICAgICAgICB3ID0gcGFyc2VJbnQodyk7XG4gICAgICAgIHZhciBTdGF0aW9uSUQgPSBwdHgudHJ0Yy5nZXRTdGF0aW9uSUQoc3RJRCwgbGluZSk7XG4gICAgICAgIHZhciBMaW5lSUQgPSBwdHgudHJ0Yy5nZXRMaW5lSUQobGluZSk7XG4gICAgICAgIHZhciBydCA9IGZhbHNlO1xuICAgICAgICBpZighcHR4LnRlbXBUaW1lVGFibGUudHJ0YykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFwdHgudGVtcFRpbWVUYWJsZS50cnRjW0xpbmVJRF1bU3RhdGlvbklEXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighcHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF1bd10pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIXB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddW2Rpcl0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYocHR4LnRlbXBUaW1lVGFibGUudHJ0Y1tMaW5lSURdW1N0YXRpb25JRF1bd11bZGlyXS5sZW5ndGg9PTApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHB0eC50ZW1wVGltZVRhYmxlLnRydGNbTGluZUlEXVtTdGF0aW9uSURdW3ddW2Rpcl07XG4gICAgfSxcbiAgICBnZXRPcmlnaW5hbFN0YXRpb25JRDogZnVuY3Rpb24oU3RhdGlvbklEKXtcbiAgICAgICAgdmFyIGFyeSA9IHBEYXRhLnRydGMuc3RhdGlvbl9hcnk7XG4gICAgICAgIHZhciBzdERhdGEgPSBmYWxzZTtcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJ5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKGFyeVtpXS5TdGF0aW9uSUQuaW5kZXhPZihTdGF0aW9uSUQpIT0tMSl7XG4gICAgICAgICAgICAgICAgc3REYXRhID0gYXJ5W2ldLmlkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdERhdGE7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmblRSVEM7IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi5qcyc7XG5pbXBvcnQgcHR4IGZyb20gJy4vcHR4LmpzJztcbmltcG9ydCBkYXRhIGZyb20gJy4vZGF0YS5qcyc7XG5pbXBvcnQgYnVzIGZyb20gJy4vYnVzLmpzJztcbmltcG9ydCB0cnRjIGZyb20gJy4vdHJ0Yy5qcyc7XG5pbXBvcnQganNTSEEgZnJvbSAnLi9qc1NIQSc7XG5cblxudmFyIGluQnJvd3NlciA9IGNvbW1vbi5pbkJyb3dzZXI7XG5cblxudmFyIGNvbWJpbmUgPSB7XG5cdGRhdGE6IGRhdGEsXG5cdGJ1czogYnVzLFxuXHR0cnRjOiB0cnRjLFxuXHRqc1NIQToganNTSEEsXG5cdGNvbW1vbjogY29tbW9uXG59XG5mb3IodmFyIGsgaW4gY29tYmluZSl7XG5cdHB0eFtrXSA9IGNvbWJpbmVba107XG59XG5cbmlmKGluQnJvd3NlciAmJiAhd2luZG93LnJvY3B0eCl7XG5cdHdpbmRvdy5yb2NwdHggPSBwdHg7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgcHR4O1xuIl0sIm5hbWVzIjpbIkNNIiwiaW5Ccm93c2VyIiwid2luZG93IiwiZG9jdW1lbnQiLCJzdGF0dXNDb2RlIiwiU1VDQ0VTUyIsIkZBSUwiLCJDT05TVF9QVFhfQVBJX1NVQ0NFU1MiLCJDT05TVF9QVFhfQVBJX0ZBSUwiLCJDT05TVF9QVFhfQVBJX01TR19DT01NX0ZBSUxFRCIsInYydXJsIiwicHR4VVJMIiwibWV0cm9VUkwiLCJidXNVUkwiLCJ0cmFVUkwiLCJwdHhNUlRXZWVrU3RyIiwicHVpIiwicHJpbnRTdGF0dXMiLCJUVCIsInVpIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtc2ciLCJzaG93IiwiYWxlcnQiLCJtYXNrIiwidW5tYXNrIiwibWUiLCJHIiwiciIsImQiLCJiIiwiYyIsImgiLCJhIiwiZiIsImciLCJtIiwiayIsImUiLCJsIiwicCIsInEiLCJ0IiwidyIsIm4iLCJ1IiwidiIsImVuY29kaW5nIiwibnVtUm91bmRzIiwicGFyc2VJbnQiLCJFcnJvciIsInoiLCJIIiwic2xpY2UiLCJBIiwieCIsInNldEhNQUNLZXkiLCJiaW5MZW4iLCJ2YWx1ZSIsImxlbmd0aCIsInB1c2giLCJ1cGRhdGUiLCJnZXRIYXNoIiwiQiIsIkMiLCJEIiwiRSIsIkFycmF5QnVmZmVyIiwiSSIsIkYiLCJnZXRITUFDIiwiY2hhckF0Iiwib3V0cHV0VXBwZXIiLCJ0b1VwcGVyQ2FzZSIsImI2NFBhZCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIlVpbnQ4QXJyYXkiLCJzaGFrZUxlbiIsImhhc093blByb3BlcnR5Iiwic3Vic3RyIiwiaXNOYU4iLCJjaGFyQ29kZUF0Iiwic2VhcmNoIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJieXRlTGVuZ3RoIiwieSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJqc1NIQSIsImZuVFJUQyIsInB0eCIsInRydGMiLCJjb21tb24iLCJ0aW1lb3V0IiwidGVtcFRpbWVUYWJsZSIsInRocm93RXJyb3IiLCJzdHIiLCJmaWx0ZXJQYXJhbSIsImZpZWxkIiwib3AiLCJhbmRPciIsInRvTG93ZXJDYXNlIiwib3BNYXAiLCJvcDIiLCJjbnQiLCJ0bXBGaWVsZCIsInRtcFZhbHVlIiwic3RyaW5nQXJ5IiwiaSIsImpvaW4iLCJmaWx0ZXJGbiIsInBhcmFtIiwiZW5jb2RlVVJJIiwib3JkZXJCeUZuIiwiZGlyIiwidG9wRm4iLCJ0b3AiLCJmb3JtYXRTdHIiLCJzZWxlY3RGaWVsZEZuIiwiR2V0QXV0aG9yaXphdGlvbkhlYWRlciIsIkFwcElEIiwiQXBwS2V5IiwiR01UU3RyaW5nIiwiRGF0ZSIsInRvR01UU3RyaW5nIiwiU2hhT2JqIiwiSE1BQyIsIkF1dGhvcml6YXRpb24iLCJnZXRUYWtlTVJUVGltZVRhYmxlIiwibXJ0UFRYQXJ5IiwiY2JGbiIsInJ0U3RhdHVzIiwicnVuR2V0IiwiYXJyIiwib2JqIiwic2hpZnQiLCJjb21wYW55IiwiTGluZUlEIiwiZ2V0TGluZUlEIiwibGluZSIsIlN0YXRpb25JRCIsImdldFN0YXRpb25JRCIsInRha2VSYW5nZSIsInRhcmdldElEIiwiZ2V0U3RhdGlvblRpbWUiLCJqc29uIiwicnRzIiwic3RhdHVzIiwibWVzc2FnZSIsImdldFVSTCIsInVybCIsInJlcUxpc3RlbmVyIiwieGhyIiwiZXZlbnQiLCJkYXRhIiwidGFyZ2V0IiwicmVzcG9uc2UiLCJyZWFkeVN0YXRlIiwiSlNPTiIsInBhcnNlIiwiZm0iLCJYTUxIdHRwUmVxdWVzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcGVuIiwiaGVhZGVyT2JqIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJnZXRTdGF0aW9uTGl2ZUluZm8iLCJzdGlkIiwiY29uc29sZSIsImluZm8iLCJnZXRTdGF0aW9uVG9kYXlUaW1lIiwiZ29pbmdEYXRhIiwidG9kYXkiLCJzb3J0QnlUVFNvcnRUaW1lIiwiaW50QSIsInR0X3NvcnRUaW1lIiwiaW50QiIsInBEYXRhIiwiYnVzIiwiY2l0eSIsIm5hbWUiLCJDaXR5IiwiQ2l0eUNvZGUiLCJzdGF0aW9uX2FyeSIsImlkIiwicm91dGUiLCJEaXJlY3Rpb24iLCJ3b3JrIiwiUm91dGVJRCIsImZyb20iLCJ0byIsImZuQlVTIiwic2V0RGVmYXVsdENmZyIsImNmZyIsIm1hbmFnZUJ5Iiwic2VsZWN0RmllbGQiLCJnZXRDaXR5RGF0YSIsImFyeSIsInJ0IiwiZ2V0QnVzQXJyaXZlVGltZSIsIlN0b3BVSUQiLCJmaWx0ZXJTdHIiLCJnZXRFc3RpbWF0ZWRUaW1lT2ZBcnJpdmFsIiwiZ2V0QnVzUm91dGVBcnJpdmVUaW1lIiwiUm91dGVVSUQiLCJnZXRCdXNSb3V0ZUluZm8iLCJteVVSTCIsImdldEJ1c1JlYWx0aW1lTmVhclN0b3AiLCJ0ZXN0IiwidG9TdHJpbmciLCJnZXRCdXNSb3V0ZSIsImdldEJ1c1N0YXRpb24iLCJnZXRCdXNTdG9wUm91dGUiLCJnZXRCdXNTdG9wUm91dGVCeU51bWJlciIsImJ1c051bWJlciIsInNlYXJjaEJ1c0J5TnVtYmVyIiwiY2hlY2tSb3V0ZUlkT25Vc2UiLCJsaW5lRGF0YSIsImdldExpbmVEYXRhIiwiaiIsImZvckVhY2giLCJnZXRPcmlnaW5hbExpbmVCeUxpbmVJRCIsImdldFN0YXRpb25JREFyeSIsInN0RGF0YSIsImxpbmVPcmlnaW5hbElEIiwibGluZUNvZGUiLCJjb2RlTGVuIiwiZ2V0U3RhdGlvbklESW5XaGF0TGluZSIsIlN0YXRpb2luSUQiLCJXZWVrIiwibXRTdHIiLCJyb3V0ZUEiLCJ0bXBBcnkiLCJ0bXBUaW1lQXJ5IiwiVGltZXRhYmxlcyIsIm1hcCIsInRpbWVPYmoiLCJmbiIsInRyYW5zVGltZTJTZWMiLCJEZXBhcnR1cmVUaW1lIiwiY29uY2F0Iiwid29ya0FyeSIsInRpbWVNYWtlRm4iLCJzb3J0IiwiZ2V0Rm9ybWF0U3RhdGlvblRpbWUiLCJzdElEIiwiZ2V0T3JpZ2luYWxTdGF0aW9uSUQiLCJjb21iaW5lIiwicm9jcHR4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUNBLElBQUlBLEVBQUUsR0FBRztFQUNMQyxFQUFBQSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU9DLE1BQVAsSUFBZ0IsV0FBaEIsSUFBK0JBLE1BQU0sQ0FBQ0MsUUFBeEM7RUFEUCxDQUFUO0VBSUFILEVBQUUsQ0FBQ0ksVUFBSCxHQUFnQjtFQUNaQyxFQUFBQSxPQUFPLEVBQUUsU0FERztFQUVaQyxFQUFBQSxJQUFJLEVBQUU7RUFGTSxDQUFoQjtFQUlBTixFQUFFLENBQUNP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
