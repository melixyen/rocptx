/*
*   name: rocptx 
*   description: Dynamic public traffic library of Taiwan and Kinmen, Lienchiang 
*   version: 0.0.1 
*   license: MIT 
*   
*   Edit by: Melix Yen
*   E-Mail: melixyen@gmail.com
*   	
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.rocptx = factory());
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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var CM = {
    defaultCrossDayTime: '04:00',
    timeHour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
    timeMinSec: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
    weekStringAry: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    inBrowser: !!(typeof window != 'undefined' && window.document),
    clone: function clone(objA) {
      return JSON.parse(JSON.stringify(objA));
    },
    findArrayTarget: function findArrayTarget(ary, testFn) {
      for (var i = 0; i < ary.length; i++) {
        if (testFn(ary[i])) {
          return ary[i];
        }
      }
    },
    findAllArrayarget: function findAllArrayarget(ary, testFn) {
      var rt = [];

      for (var i = 0; i < ary.length; i++) {
        if (testFn(ary[i])) {
          rt.push(ary[i]);
        }
      }

      return rt;
    },
    weekArray2WeekStr: function weekArray2WeekStr(week) {
      return week.map(function (c, i) {
        return c ? i : '';
      }).join('');
    },
    transTime2Sec: function transTime2Sec(str, offsetTomorrow) {
      if (str == null || str == '') {
        str = '0';
      }

      var aryA = str.split(':'),
          rt;

      if (aryA.length <= 1) {
        rt = parseInt(str, 10);
      } else if (aryA.length == 2) {
        rt = parseInt(aryA[0], 10) * 3600 + parseInt(aryA[1], 10) * 60;
      } else if (aryA.length == 3) {
        rt = parseInt(aryA[0], 10) * 3600 + parseInt(aryA[1], 10) * 60 + parseInt(aryA[2], 10);
      }

      if (offsetTomorrow && rt < this.transTime2Sec(this.defaultCrossDayTime)) {
        rt = rt + 86400;
      }

      return rt;
    },
    transSec2Time: function transSec2Time(sec) {
      var tih = 0,
          tim = 0,
          tis = 0;

      if (sec === '') {
        return '';
      } else if (parseInt(sec, 10) < 0) {
        sec = 86400 + sec;
      }

      sec = parseInt(sec, 10);
      tis = sec % 60;
      sec = sec - tis;
      sec = sec / 60;
      tim = sec % 60;
      sec = sec - tim;
      sec = sec / 60;
      tih = sec;
      tih = tih < 10 ? '0' + tih : tih;
      tim = tim < 10 ? '0' + tim : tim;
      tis = tis < 10 ? '0' + tis : tis;
      return tih + ':' + tim;
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
  CM.defaultCrossDayTimeSec = CM.transTime2Sec(CM.defaultCrossDayTime);
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

  var trtc_line = [{"LineID":"BR","LineName":{"Zh_tw":"文湖線","En":"Wenhu Line"},"LineColor":"#b57a25","IsBranch":false,"Route":[{"RouteID":"BR-1","Direction":0,"LineID":"BR","Stations":["BR01","BR02","BR03","BR04","BR05","BR06","BR07","BR08","BR09","BR10","BR11","BR12","BR13","BR14","BR15","BR16","BR17","BR18","BR19","BR20","BR21","BR22","BR23","BR24"],"TravelTime":{"RunTime":[67,47,99,106,124,72,122,69,67,86,66,142,172,103,110,65,72,78,71,121,78,85,78,0],"StopTime":[0,25,18,20,18,18,20,25,30,45,35,35,18,25,25,25,25,25,20,18,20,20,18,0]}},{"RouteID":"BR-1","Direction":1,"LineID":"BR","Stations":["BR24","BR23","BR22","BR21","BR20","BR19","BR18","BR17","BR16","BR15","BR14","BR13","BR12","BR11","BR10","BR09","BR08","BR07","BR06","BR05","BR04","BR03","BR02","BR01"],"TravelTime":{"RunTime":[78,85,78,121,71,78,72,65,110,103,172,142,66,86,67,69,122,72,124,106,99,47,67,0],"StopTime":[0,18,20,20,18,20,25,25,25,25,25,18,35,35,45,30,25,20,18,18,20,18,25,0]}}],"Transfer":[{"FromLineID":"BR","FromStationID":"BR09","ToLineID":"R","ToStationID":"R05","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BR","FromStationID":"BR11","ToLineID":"G","ToStationID":"G16","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BR","FromStationID":"BR24","ToLineID":"BL","ToStationID":"BL23","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BR","FromStationID":"BR10","ToLineID":"BL","ToStationID":"BL15","IsOnSiteTransfer":1,"TransferTime":5}],"Frequency":[{"LineID":"BR","RouteID":"BR-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["06:00","07:00"],"AveMins":6},{"PeakFlag":"1","MinHeadwayMins":2,"MaxHeadwayMins":4,"Time":["07:00","09:00"],"AveMins":3},{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["09:00","17:00"],"AveMins":6},{"PeakFlag":"1","MinHeadwayMins":2,"MaxHeadwayMins":4,"Time":["17:00","19:30"],"AveMins":3},{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["19:30","23:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"BR","RouteID":"BR-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["06:00","23:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]}],"main":["BR-1"]},{"LineID":"R","LineName":{"Zh_tw":"淡水信義線","En":"Tamsui-Xinyi Line"},"LineColor":"#d90023","IsBranch":false,"Route":[{"RouteID":"R-1","Direction":0,"LineID":"R","Stations":["R02","R03","R04","R05","R06","R07","R08","R09","R10","R11","R12","R13","R14","R15","R16","R17","R18","R19","R20","R21","R22","R23","R24","R25","R26","R27","R28"],"TravelTime":{"RunTime":[93,81,81,70,65,165,83,63,65,58,57,90,109,92,91,76,61,100,73,91,145,109,78,145,136,175,0],"StopTime":[0,30,30,30,30,35,35,25,45,30,25,35,25,25,25,25,25,25,25,25,25,25,25,25,25,25,0]}},{"RouteID":"R-1","Direction":1,"LineID":"R","Stations":["R28","R27","R26","R25","R24","R23","R22","R21","R20","R19","R18","R17","R16","R15","R14","R13","R12","R11","R10","R09","R08","R07","R06","R05","R04","R03","R02"],"TravelTime":{"RunTime":[175,136,145,78,109,145,91,73,100,61,76,91,92,109,90,57,58,65,63,83,165,65,70,81,81,93,0],"StopTime":[0,25,25,25,25,25,25,25,25,25,25,25,25,25,25,35,25,30,45,25,35,35,30,30,30,30,0]}},{"RouteID":"R-2","Direction":0,"LineID":"R","Stations":["R05","R06","R07","R08","R09","R10","R11","R12","R13","R14","R15","R16","R17","R18","R19","R20","R21","R22"],"TravelTime":{"RunTime":[70,65,165,83,63,65,58,57,90,109,92,91,76,61,100,73,91,0],"StopTime":[0,30,35,35,25,45,30,25,35,25,25,25,25,25,25,25,25,0]}},{"RouteID":"R-2","Direction":1,"LineID":"R","Stations":["R22","R21","R20","R19","R18","R17","R16","R15","R14","R13","R12","R11","R10","R09","R08","R07","R06","R05"],"TravelTime":{"RunTime":[91,73,100,61,76,91,92,109,90,57,58,65,63,83,165,65,70,0],"StopTime":[0,25,25,25,25,25,25,25,25,35,25,30,45,25,35,35,30,0]}},{"RouteID":"R-3","Direction":0,"LineID":"R","Stations":["R22","R22A"],"TravelTime":{"RunTime":[157,0],"StopTime":[0,0]}},{"RouteID":"R-3","Direction":1,"LineID":"R","Stations":["R22A","R22"],"TravelTime":{"RunTime":[157,0],"StopTime":[0,0]}}],"Transfer":[{"FromLineID":"R","FromStationID":"R22","ToLineID":"R","ToStationID":"R22","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"R","FromStationID":"R13","ToLineID":"O","ToStationID":"O11","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"R","FromStationID":"R11","ToLineID":"G","ToStationID":"G14","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"R","FromStationID":"R10","ToLineID":"BL","ToStationID":"BL12","IsOnSiteTransfer":1,"TransferTime":4},{"FromLineID":"R","FromStationID":"R08","ToLineID":"G","ToStationID":"G10","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"R","FromStationID":"R07","ToLineID":"O","ToStationID":"O06","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"R","FromStationID":"R05","ToLineID":"BR","ToStationID":"BR09","IsOnSiteTransfer":1,"TransferTime":5}],"Frequency":[{"LineID":"R","RouteID":"R-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-3","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":15,"Time":["06:00","06:30"],"AveMins":14},{"PeakFlag":"1","MinHeadwayMins":7,"MaxHeadwayMins":8,"Time":["06:30","09:00"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":10,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":10},{"PeakFlag":"1","MinHeadwayMins":7,"MaxHeadwayMins":8,"Time":["17:00","19:30"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":15,"Time":["23:00","00:00"],"AveMins":14}]},{"LineID":"R","RouteID":"R-3","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":10,"MaxHeadwayMins":12,"Time":["06:00","23:00"],"AveMins":11},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":15,"Time":["23:00","00:00"],"AveMins":14}]}],"main":["R-1","R-2"]},{"LineID":"G","LineName":{"Zh_tw":"松山新店線","En":"Songshan-Xindian Line"},"LineColor":"#107547","IsBranch":false,"Route":[{"RouteID":"G-1","Direction":0,"LineID":"G","Stations":["G01","G02","G03","G04","G05","G06","G07","G08","G09","G10","G11","G12","G13","G14","G15","G16","G17","G18","G19"],"TravelTime":{"RunTime":[111,78,75,89,87,119,67,88,83,75,81,75,114,106,92,84,102,138,0],"StopTime":[0,22,25,25,25,25,25,25,25,25,25,35,30,35,35,35,30,30,0]}},{"RouteID":"G-1","Direction":1,"LineID":"G","Stations":["G19","G18","G17","G16","G15","G14","G13","G12","G11","G10","G09","G08","G07","G06","G05","G04","G03","G02","G01"],"TravelTime":{"RunTime":[138,102,84,92,106,114,75,81,75,83,88,67,119,87,89,75,78,111,0],"StopTime":[0,30,30,35,35,35,30,35,25,25,25,25,25,25,25,25,25,22,0]}},{"RouteID":"G-2","Direction":0,"LineID":"G","Stations":["G08","G09","G10","G11","G12","G13","G14","G15","G16","G17","G18","G19"],"TravelTime":{"RunTime":[88,83,75,81,75,114,106,92,84,102,138,0],"StopTime":[0,25,25,25,35,30,35,35,35,30,30,0]}},{"RouteID":"G-2","Direction":1,"LineID":"G","Stations":["G19","G18","G17","G16","G15","G14","G13","G12","G11","G10","G09","G08"],"TravelTime":{"RunTime":[138,102,84,92,106,114,75,81,75,83,88,0],"StopTime":[0,30,30,35,35,35,30,35,25,25,25,0]}},{"RouteID":"G-3","Direction":0,"LineID":"G","Stations":["G03","G03A"],"TravelTime":{"RunTime":[203,0],"StopTime":[0,0]}},{"RouteID":"G-3","Direction":1,"LineID":"G","Stations":["G03A","G03"],"TravelTime":{"RunTime":[203,0],"StopTime":[0,0]}}],"Transfer":[{"FromLineID":"G","FromStationID":"G14","ToLineID":"R","ToStationID":"R11","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"G","FromStationID":"G10","ToLineID":"R","ToStationID":"R08","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G16","ToLineID":"BR","ToStationID":"BR11","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"G","FromStationID":"G15","ToLineID":"O","ToStationID":"O08","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G12","ToLineID":"BL","ToStationID":"BL11","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G09","ToLineID":"O","ToStationID":"O05","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G03","ToLineID":"G","ToStationID":"G03","IsOnSiteTransfer":1,"TransferTime":3}],"Frequency":[{"LineID":"G","RouteID":"G-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["06:00","07:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","17:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["19:30","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["06:00","07:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","17:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["19:30","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-3","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":20,"Time":["06:00","00:00"],"AveMins":16}]},{"LineID":"G","RouteID":"G-3","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":20,"Time":["06:00","00:00"],"AveMins":16}]}],"main":["G-1","G-2"]},{"LineID":"O","LineName":{"Zh_tw":"中和新蘆線","En":"Zhonghe-Xinlu Line"},"LineColor":"#f5a818","IsBranch":false,"Route":[{"RouteID":"O-1","Direction":0,"LineID":"O","Stations":["O01","O02","O03","O04","O05","O06","O07","O08","O09","O10","O11","O12","O13","O14","O15","O16","O17","O18","O19","O20","O21"],"TravelTime":{"RunTime":[103,88,100,187,192,118,114,75,89,72,75,115,93,84,142,105,93,130,110,159,0],"StopTime":[0,25,25,25,40,35,35,35,35,35,45,35,25,25,25,25,25,25,25,25,0]}},{"RouteID":"O-1","Direction":1,"LineID":"O","Stations":["O21","O20","O19","O18","O17","O16","O15","O14","O13","O12","O11","O10","O09","O08","O07","O06","O05","O04","O03","O02","O01"],"TravelTime":{"RunTime":[159,110,130,93,105,142,84,93,115,75,72,89,75,114,118,192,187,100,88,103,0],"StopTime":[0,25,25,25,25,25,25,25,25,35,45,35,35,35,35,35,40,25,25,25,0]}},{"RouteID":"O-2","Direction":0,"LineID":"O","Stations":["O01","O02","O03","O04","O05","O06","O07","O08","O09","O10","O11","O12","O50","O51","O52","O53","O54"],"TravelTime":{"RunTime":[103,88,100,187,192,118,114,75,89,72,75,148,104,82,87,110,0],"StopTime":[0,25,25,25,40,35,35,35,35,35,45,35,30,30,30,30,0]}},{"RouteID":"O-2","Direction":1,"LineID":"O","Stations":["O54","O53","O52","O51","O50","O12","O11","O10","O09","O08","O07","O06","O05","O04","O03","O02","O01"],"TravelTime":{"RunTime":[110,87,82,104,148,75,72,89,75,114,118,192,187,100,88,103,0],"StopTime":[0,30,30,30,30,35,45,35,35,35,35,35,40,25,25,25,0]}}],"Transfer":[{"FromLineID":"O","FromStationID":"O11","ToLineID":"R","ToStationID":"R13","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"O","FromStationID":"O06","ToLineID":"R","ToStationID":"R07","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"O","FromStationID":"O08","ToLineID":"G","ToStationID":"G15","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"O","FromStationID":"O05","ToLineID":"G","ToStationID":"G09","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"O","FromStationID":"O12","ToLineID":"O","ToStationID":"O12","IsOnSiteTransfer":1,"TransferTime":1},{"FromLineID":"O","FromStationID":"O07","ToLineID":"BL","ToStationID":"BL14","IsOnSiteTransfer":1,"TransferTime":2}],"Frequency":[{"LineID":"O","RouteID":"O-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":9,"MaxHeadwayMins":10,"Time":["06:00","23:00"],"AveMins":10},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"O","RouteID":"O-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"O","RouteID":"O-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":9,"MaxHeadwayMins":10,"Time":["06:00","23:00"],"AveMins":10},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"O","RouteID":"O-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]}],"main":["O-1","O-2"]},{"LineID":"BL","LineName":{"Zh_tw":"板南線","En":"Bannan Line"},"LineColor":"#0a59ae","IsBranch":false,"Route":[{"RouteID":"BL-1","Direction":0,"LineID":"BL","Stations":["BL01","BL02","BL03","BL04","BL05","BL06","BL07","BL08","BL09","BL10","BL11","BL12","BL13","BL14","BL15","BL16","BL17","BL18","BL19","BL20","BL21","BL22","BL23"],"TravelTime":{"RunTime":[180,95,106,142,92,89,102,74,190,103,132,64,76,84,63,67,72,82,73,99,105,114,0],"StopTime":[0,25,25,25,25,25,25,30,28,28,30,40,30,28,40,28,28,28,25,25,25,25,0]}},{"RouteID":"BL-1","Direction":1,"LineID":"BL","Stations":["BL23","BL22","BL21","BL20","BL19","BL18","BL17","BL16","BL15","BL14","BL13","BL12","BL11","BL10","BL09","BL08","BL07","BL06","BL05","BL04","BL03","BL02","BL01"],"TravelTime":{"RunTime":[114,105,99,73,82,72,67,63,84,76,64,132,103,190,74,102,89,92,142,106,95,180,0],"StopTime":[0,25,25,25,25,28,28,28,40,28,30,40,30,28,28,30,25,25,25,25,25,25,0]}},{"RouteID":"BL-2","Direction":0,"LineID":"BL","Stations":["BL05","BL06","BL07","BL08","BL09","BL10","BL11","BL12","BL13","BL14","BL15","BL16","BL17","BL18","BL19","BL20","BL21","BL22","BL23"],"TravelTime":{"RunTime":[92,89,102,74,190,103,132,64,76,84,63,67,72,82,73,99,105,114,0],"StopTime":[0,25,25,30,28,28,30,40,30,28,40,28,28,28,25,25,25,25,0]}},{"RouteID":"BL-2","Direction":1,"LineID":"BL","Stations":["BL23","BL22","BL21","BL20","BL19","BL18","BL17","BL16","BL15","BL14","BL13","BL12","BL11","BL10","BL09","BL08","BL07","BL06","BL05"],"TravelTime":{"RunTime":[114,105,99,73,82,72,67,63,84,76,64,132,103,190,74,102,89,92,0],"StopTime":[0,25,25,25,25,28,28,28,40,28,30,40,30,28,28,30,25,25,0]}}],"Transfer":[{"FromLineID":"BL","FromStationID":"BL12","ToLineID":"R","ToStationID":"R10","IsOnSiteTransfer":1,"TransferTime":4},{"FromLineID":"BL","FromStationID":"BL11","ToLineID":"G","ToStationID":"G12","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"BL","FromStationID":"BL14","ToLineID":"O","ToStationID":"O07","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"BL","FromStationID":"BL23","ToLineID":"BR","ToStationID":"BR24","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BL","FromStationID":"BL15","ToLineID":"BR","ToStationID":"BR10","IsOnSiteTransfer":1,"TransferTime":5}],"Frequency":[{"LineID":"BL","RouteID":"BL-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]},{"LineID":"BL","RouteID":"BL-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":8,"Time":["06:00","09:00"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":9,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]},{"LineID":"BL","RouteID":"BL-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":8,"Time":["06:00","09:00"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":9,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]},{"LineID":"BL","RouteID":"BL-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]}],"main":["BL-1","BL-2"]}];

  var krtc_line = [{"LineID":"R","LineName":{"Zh_tw":"紅線","En":"Red Line"},"LineColor":"#d30547","IsBranch":false,"Route":[{"RouteID":"R","Direction":0,"LineID":"R","Stations":["R3","R4","R4A","R5","R6","R7","R8","R9","R10","R11","R12","R13","R14","R15","R16","R17","R18","R19","R20","R21","R22","R22A","R23","R24"],"TravelTime":{"RunTime":[120,180,180,180,180,120,180,120,180,180,120,120,180,180,180,120,180,120,120,180,120,120,240,0],"StopTime":[20,25,25,20,20,30,30,40,40,25,25,35,20,30,20,20,20,20,20,20,20,25,300,0]}},{"RouteID":"R","Direction":1,"LineID":"R","Stations":["R24","R23","R22A","R22","R21","R20","R19","R18","R17","R16","R15","R14","R13","R12","R11","R10","R9","R8","R7","R6","R5","R4A","R4","R3"],"TravelTime":{"RunTime":[240,120,120,180,120,120,180,120,180,180,180,120,120,180,180,120,180,120,180,180,180,180,120,0],"StopTime":[0,300,25,20,20,20,20,20,20,20,30,20,35,25,25,40,40,30,30,20,20,25,25,20]}}],"Transfer":[{"FromLineID":"R","FromStationID":"R10","ToLineID":"O","ToStationID":"O5","TransferTime":3}],"Frequency":[]},{"LineID":"O","LineName":{"Zh_tw":"橘線","En":"Orange Line"},"LineColor":"#f77f00","IsBranch":false,"Route":[{"RouteID":"O","Direction":0,"LineID":"O","Stations":["O1","O2","O4","O5","O6","O7","O8","O9","O10","O11","O12","O13","O14","OT1"],"TravelTime":{"RunTime":[120,120,120,120,120,120,120,120,120,120,240,120,240,0],"StopTime":[20,20,40,20,25,20,20,25,25,20,20,20,300,0]}},{"RouteID":"O","Direction":1,"LineID":"O","Stations":["OT1","O14","O13","O12","O11","O10","O9","O8","O7","O6","O5","O4","O2","O1"],"TravelTime":{"RunTime":[240,120,240,120,120,120,120,120,120,120,120,120,120,0],"StopTime":[0,300,20,20,20,25,25,20,20,25,20,40,20,20]}}],"Transfer":[{"FromLineID":"O","FromStationID":"O5","ToLineID":"R","ToStationID":"R10","TransferTime":3}],"Frequency":[]}];

  var tymetro_line = [{"LineID":"A","LineName":{"Zh_tw":"桃園機場捷運線","En":"Airport MRT Line"},"LineColor":"#8246af","IsBranch":false,"Route":[{"RouteID":"A","Direction":0,"LineID":"A","Stations":["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14a","A15","A16","A17","A18","A19","A20","A21"]},{"RouteID":"A","Direction":1,"LineID":"A","Stations":["A21","A20","A19","A18","A17","A16","A15","A14a","A13","A12","A11","A10","A9","A8","A7","A6","A5","A4","A3","A2","A1"]}],"Transfer":[],"TravelTime":[null,null,null,null],"Frequency":[{"LineID":"A","RouteID":"A","TrainType":1,"LineNo":"A","ServiceDays":{"ServiceTag":"每日","NationalHolidays":true,"week":[true,true,true,true,true,true,true]},"OperationTime":["05:57","00:25"],"Headways":[{"PeakFlag":"1","MinHeadwayMins":15,"MaxHeadwayMins":15,"Time":["05:57","00:25"],"AveMins":15}]}],"TravelTimeBetween":{"TrainType1":{"A1":{"A2":300,"A3":539,"A4":669,"A5":757,"A6":908,"A7":1189,"A8":1363,"A9":1511,"A10":2033,"A11":2154,"A12":2346,"A13":2451,"A14a":2505,"A15":2651,"A16":2813,"A17":2931,"A18":3133,"A19":3263,"A20":3523,"A21":3732},"A2":{"A3":239,"A4":369,"A5":457,"A6":608,"A7":889,"A8":1063,"A9":1211,"A10":1733,"A11":1854,"A12":2046,"A13":2151,"A14a":2205,"A15":2351,"A16":2513,"A17":2631,"A18":2833,"A19":2963,"A20":3223,"A21":3432,"A1":305},"A3":{"A4":130,"A5":218,"A6":369,"A7":650,"A8":824,"A9":972,"A10":1494,"A11":1615,"A12":1807,"A13":1912,"A14a":1966,"A15":2112,"A16":2274,"A17":2392,"A18":2594,"A19":2724,"A20":2984,"A21":3193,"A1":541,"A2":236},"A4":{"A5":88,"A6":239,"A7":520,"A8":694,"A9":842,"A10":1364,"A11":1485,"A12":1677,"A13":1782,"A14a":1836,"A15":1982,"A16":2144,"A17":2262,"A18":2464,"A19":2594,"A20":2854,"A21":3063,"A1":669,"A2":364,"A3":128},"A5":{"A6":151,"A7":432,"A8":606,"A9":754,"A10":1276,"A11":1397,"A12":1589,"A13":1694,"A14a":1748,"A15":1894,"A16":2056,"A17":2174,"A18":2376,"A19":2506,"A20":2766,"A21":2975,"A1":754,"A2":449,"A3":213,"A4":85},"A6":{"A7":281,"A8":455,"A9":603,"A10":1125,"A11":1246,"A12":1438,"A13":1543,"A14a":1597,"A15":1743,"A16":1905,"A17":2023,"A18":2225,"A19":2355,"A20":2615,"A21":2824,"A1":910,"A2":605,"A3":369,"A4":241,"A5":156},"A7":{"A8":174,"A9":322,"A10":844,"A11":965,"A12":1157,"A13":1262,"A14a":1316,"A15":1462,"A16":1624,"A17":1742,"A18":1944,"A19":2074,"A20":2334,"A21":2543,"A1":1225,"A2":920,"A3":684,"A4":556,"A5":471,"A6":315},"A8":{"A9":148,"A10":670,"A11":791,"A12":983,"A13":1088,"A14a":1142,"A15":1288,"A16":1450,"A17":1568,"A18":1770,"A19":1900,"A20":2160,"A21":2369,"A1":1435,"A2":1130,"A3":894,"A4":766,"A5":681,"A6":525,"A7":210},"A9":{"A10":522,"A11":643,"A12":835,"A13":940,"A14a":994,"A15":1140,"A16":1302,"A17":1420,"A18":1622,"A19":1752,"A20":2012,"A21":2221,"A1":1587,"A2":1282,"A3":1046,"A4":918,"A5":833,"A6":677,"A7":362,"A8":152},"A10":{"A11":121,"A12":313,"A13":418,"A14a":472,"A15":618,"A16":780,"A17":898,"A18":1100,"A19":1230,"A20":1490,"A21":1699,"A1":2007,"A2":1702,"A3":1466,"A4":1338,"A5":1253,"A6":1097,"A7":782,"A8":572,"A9":420},"A11":{"A12":192,"A13":297,"A14a":351,"A15":497,"A16":659,"A17":777,"A18":979,"A19":1109,"A20":1369,"A21":1578,"A1":2126,"A2":1821,"A3":1585,"A4":1457,"A5":1372,"A6":1216,"A7":901,"A8":691,"A9":539,"A10":119},"A12":{"A13":105,"A14a":159,"A15":305,"A16":467,"A17":585,"A18":787,"A19":917,"A20":1177,"A21":1386,"A1":2311,"A2":2006,"A3":1770,"A4":1642,"A5":1557,"A6":1401,"A7":1086,"A8":876,"A9":724,"A10":304,"A11":185},"A13":{"A14a":54,"A15":200,"A16":362,"A17":480,"A18":682,"A19":812,"A20":1072,"A21":1281,"A1":2412,"A2":2107,"A3":1871,"A4":1743,"A5":1658,"A6":1502,"A7":1187,"A8":977,"A9":825,"A10":405,"A11":286,"A12":101},"A14a":{"A15":146,"A16":308,"A17":426,"A18":628,"A19":758,"A20":1018,"A21":1227,"A1":2472,"A2":2167,"A3":1931,"A4":1803,"A5":1718,"A6":1562,"A7":1247,"A8":1037,"A9":885,"A10":465,"A11":346,"A12":161,"A13":60},"A15":{"A16":162,"A17":280,"A18":482,"A19":612,"A20":872,"A21":1081,"A1":2624,"A2":2319,"A3":2083,"A4":1955,"A5":1870,"A6":1714,"A7":1399,"A8":1189,"A9":1037,"A10":617,"A11":498,"A12":313,"A13":212,"A14a":152},"A16":{"A17":118,"A18":320,"A19":450,"A20":710,"A21":919,"A1":2787,"A2":2482,"A3":2246,"A4":2118,"A5":2033,"A6":1877,"A7":1562,"A8":1352,"A9":1200,"A10":780,"A11":661,"A12":476,"A13":375,"A14a":315,"A15":163},"A17":{"A18":202,"A19":332,"A20":592,"A21":801,"A1":2992,"A2":2687,"A3":2451,"A4":2323,"A5":2238,"A6":2082,"A7":1767,"A8":1557,"A9":1405,"A10":985,"A11":866,"A12":681,"A13":580,"A14a":520,"A15":368,"A16":205},"A18":{"A19":130,"A20":390,"A21":599,"A1":3205,"A2":2900,"A3":2664,"A4":2536,"A5":2451,"A6":2295,"A7":1980,"A8":1770,"A9":1618,"A10":1198,"A11":1079,"A12":894,"A13":793,"A14a":733,"A15":581,"A16":418,"A17":213},"A19":{"A20":260,"A21":469,"A1":3335,"A2":3030,"A3":2794,"A4":2666,"A5":2581,"A6":2425,"A7":2110,"A8":1900,"A9":1748,"A10":1328,"A11":1209,"A12":1024,"A13":923,"A14a":863,"A15":711,"A16":548,"A17":343,"A18":130},"A20":{"A21":209,"A1":3600,"A2":3295,"A3":3059,"A4":2931,"A5":2846,"A6":2690,"A7":2375,"A8":2165,"A9":2013,"A10":1593,"A11":1474,"A12":1289,"A13":1188,"A14a":1128,"A15":976,"A16":813,"A17":608,"A18":395,"A19":265},"A21":{"A1":3753,"A2":3448,"A3":3212,"A4":3084,"A5":2999,"A6":2843,"A7":2528,"A8":2318,"A9":2166,"A10":1746,"A11":1627,"A12":1442,"A13":1341,"A14a":1281,"A15":1129,"A16":966,"A17":761,"A18":548,"A19":418,"A20":153}},"TrainType2":{"A1":{"A3":95,"A8":758,"A12":1622,"A13":1723},"A3":{"A8":663,"A12":1527,"A13":1628,"A1":479},"A8":{"A12":864,"A13":965,"A1":1246,"A3":767},"A12":{"A13":101,"A1":1964,"A3":1485,"A8":718},"A13":{"A1":2052,"A3":1573,"A8":806,"A12":88}}}}];

  var trtc_station = [{"StationID":"BR01","lat":24.998205,"lon":24.998205,"name":"動物園","ename":"Taipei Zoo","FirstLast":[{"To":"BR24","Time":["06:00","00:00"]}]},{"StationID":"BR02","lat":24.99824,"lon":24.99824,"name":"木柵","ename":"Muzha","FirstLast":[{"To":"BR24","Time":["06:01","00:01"]},{"To":"BR01","Time":["06:04","00:53"]}]},{"StationID":"BR03","lat":24.99857,"lon":24.99857,"name":"萬芳社區","ename":"Wanfang Community","FirstLast":[{"To":"BR24","Time":["06:02","00:03"]},{"To":"BR01","Time":["06:03","00:52"]}]},{"StationID":"BR04","lat":24.99932,"lon":24.99932,"name":"萬芳醫院","ename":"Wanfang Hospital","FirstLast":[{"To":"BR24","Time":["06:04","00:05"]},{"To":"BR01","Time":["06:01","00:49"]}]},{"StationID":"BR05","lat":25.005455,"lon":25.005455,"name":"辛亥","ename":"Xinhai","FirstLast":[{"To":"BR24","Time":["06:00","00:07"]},{"To":"BR01","Time":["06:00","00:47"]}]},{"StationID":"BR06","lat":25.018495,"lon":25.018495,"name":"麟光","ename":"Linguang","FirstLast":[{"To":"BR24","Time":["06:01","00:10"]},{"To":"BR01","Time":["06:03","00:44"]}]},{"StationID":"BR07","lat":25.02381,"lon":25.02381,"name":"六張犁","ename":"Liuzhangli","FirstLast":[{"To":"BR24","Time":["06:03","00:12"]},{"To":"BR01","Time":["06:01","00:42"]}]},{"StationID":"BR08","lat":25.02612,"lon":25.02612,"name":"科技大樓","ename":"Technology Building","FirstLast":[{"To":"BR24","Time":["06:00","00:15"]},{"To":"BR01","Time":["06:00","00:39"]}]},{"StationID":"BR09","lat":25.033311,"lon":25.033311,"name":"大安","ename":"Daan","FirstLast":[{"To":"BR24","Time":["06:01","00:33"]},{"To":"BR01","Time":["06:05","00:37"]}]},{"StationID":"BR10","lat":25.041749,"lon":25.041749,"name":"忠孝復興","ename":"Zhongxiao Fuxing","FirstLast":[{"To":"BR24","Time":["06:03","00:35"]},{"To":"BR01","Time":["06:03","00:35"]}]},{"StationID":"BR11","lat":25.052044,"lon":25.052044,"name":"南京復興","ename":"Nanjing Fuxing","FirstLast":[{"To":"BR24","Time":["06:05","00:38"]},{"To":"BR01","Time":["06:01","00:33"]}]},{"StationID":"BR12","lat":25.06085,"lon":25.06085,"name":"中山國中","ename":"Zhongshan Junior High School","FirstLast":[{"To":"BR24","Time":["06:00","00:40"]},{"To":"BR01","Time":["06:00","00:29"]}]},{"StationID":"BR13","lat":25.062908,"lon":25.062908,"name":"松山機場","ename":"Songshan Airport","FirstLast":[{"To":"BR24","Time":["06:02","00:43"]},{"To":"BR01","Time":["06:02","00:25"]}]},{"StationID":"BR14","lat":25.07943,"lon":25.07943,"name":"大直","ename":"Dazhi","FirstLast":[{"To":"BR24","Time":["06:00","00:46"]},{"To":"BR01","Time":["06:00","00:22"]}]},{"StationID":"BR15","lat":25.08483,"lon":25.08483,"name":"劍南路","ename":"Jiannan Rd.","FirstLast":[{"To":"BR24","Time":["06:01","00:49"]},{"To":"BR01","Time":["06:03","00:19"]}]},{"StationID":"BR16","lat":25.08216,"lon":25.08216,"name":"西湖","ename":"Xihu","FirstLast":[{"To":"BR24","Time":["06:03","00:52"]},{"To":"BR01","Time":["06:01","00:16"]}]},{"StationID":"BR17","lat":25.08007,"lon":25.08007,"name":"港墘","ename":"Gangqian","FirstLast":[{"To":"BR24","Time":["06:00","00:54"]},{"To":"BR01","Time":["06:00","00:14"]}]},{"StationID":"BR18","lat":25.078455,"lon":25.078455,"name":"文德","ename":"Wende","FirstLast":[{"To":"BR24","Time":["06:01","00:56"]},{"To":"BR01","Time":["06:05","00:12"]}]},{"StationID":"BR19","lat":25.083675,"lon":25.083675,"name":"內湖","ename":"Neihu","FirstLast":[{"To":"BR24","Time":["06:02","00:58"]},{"To":"BR01","Time":["06:03","00:10"]}]},{"StationID":"BR20","lat":25.083805,"lon":25.083805,"name":"大湖公園","ename":"Dahu Park","FirstLast":[{"To":"BR24","Time":["06:04","01:00"]},{"To":"BR01","Time":["06:01","00:08"]}]},{"StationID":"BR21","lat":25.07271,"lon":25.07271,"name":"葫洲","ename":"Huzhou","FirstLast":[{"To":"BR24","Time":["06:00","01:03"]},{"To":"BR01","Time":["06:00","00:05"]}]},{"StationID":"BR22","lat":25.067455,"lon":25.067455,"name":"東湖","ename":"Donghu","FirstLast":[{"To":"BR24","Time":["06:01","01:05"]},{"To":"BR01","Time":["06:03","00:03"]}]},{"StationID":"BR23","lat":25.05992,"lon":25.05992,"name":"南港軟體園區","ename":"Nangang Software Park","FirstLast":[{"To":"BR24","Time":["06:03","01:07"]},{"To":"BR01","Time":["06:01","00:01"]}]},{"StationID":"BR24","lat":25.054919,"lon":25.054919,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center","FirstLast":[{"To":"BR01","Time":["06:00","00:00"]}]},{"StationID":"R02","lat":25.032395,"lon":25.032395,"name":"象山","ename":"Xiangshan","FirstLast":[{"To":"R28","Time":["06:00","00:00"]}]},{"StationID":"R03","lat":25.032865,"lon":25.032865,"name":"台北101/世貿","ename":"Taipei 101/World Trade Center","FirstLast":[{"To":"R28","Time":["06:02","00:02"]},{"To":"R02","Time":["06:04","00:56"]}]},{"StationID":"R04","lat":25.033015,"lon":25.033015,"name":"信義安和","ename":"Xinyi Anhe","FirstLast":[{"To":"R28","Time":["06:04","00:04"]},{"To":"R02","Time":["06:02","00:54"]}]},{"StationID":"R05","lat":25.033311,"lon":25.033311,"name":"大安","ename":"Daan","FirstLast":[{"To":"R28","Time":["06:00","00:25"]},{"To":"R02","Time":["06:00","00:52"]}]},{"StationID":"R06","lat":25.033225,"lon":25.033225,"name":"大安森林公園","ename":"Daan Park","FirstLast":[{"To":"R28","Time":["06:01","00:26"]},{"To":"R02","Time":["06:08","00:50"]}]},{"StationID":"R07","lat":25.033894,"lon":25.033894,"name":"東門","ename":"Dongmen","FirstLast":[{"To":"R28","Time":["06:03","00:28"]},{"To":"R02","Time":["06:06","00:49"]}]},{"StationID":"R08","lat":25.032767,"lon":25.032767,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall","FirstLast":[{"To":"R28","Time":["06:06","00:31"]},{"To":"R02","Time":["06:03","00:45"]}]},{"StationID":"R09","lat":25.041399,"lon":25.041399,"name":"台大醫院","ename":"NTU Hospital","FirstLast":[{"To":"R28","Time":["06:08","00:33"]},{"To":"R02","Time":["06:01","00:43"]}]},{"StationID":"R10","lat":25.04631,"lon":25.04631,"name":"台北車站","ename":"Taipei Main Station","FirstLast":[{"To":"R28","Time":["06:00","00:35"]},{"To":"R02","Time":["06:00","00:41"]}]},{"StationID":"R11","lat":25.052621,"lon":25.052621,"name":"中山","ename":"Zhongshan","FirstLast":[{"To":"R28","Time":["06:02","00:37"]},{"To":"R02","Time":["06:03","00:40"]}]},{"StationID":"R12","lat":25.057575,"lon":25.057575,"name":"雙連","ename":"Shuanglian","FirstLast":[{"To":"R28","Time":["06:03","00:38"]},{"To":"R02","Time":["06:01","00:38"]}]},{"StationID":"R13","lat":25.06235,"lon":25.06235,"name":"民權西路","ename":"Minzuan W. Rd.","FirstLast":[{"To":"R28","Time":["06:05","00:39"]},{"To":"R02","Time":["06:00","00:37"]}]},{"StationID":"R14","lat":25.071409,"lon":25.071409,"name":"圓山","ename":"Yuanshan","FirstLast":[{"To":"R28","Time":["06:07","00:42"]},{"To":"R02","Time":["06:02","00:34"]}]},{"StationID":"R15","lat":25.084201,"lon":25.084201,"name":"劍潭","ename":"Jiantan","FirstLast":[{"To":"R28","Time":["06:00","00:45"]},{"To":"R02","Time":["06:00","00:31"]}]},{"StationID":"R16","lat":25.093492,"lon":25.093492,"name":"士林","ename":"Shilin","FirstLast":[{"To":"R28","Time":["06:02","00:47"]},{"To":"R02","Time":["06:05","00:28"]}]},{"StationID":"R17","lat":25.102718,"lon":25.102718,"name":"芝山","ename":"Zhishan","FirstLast":[{"To":"R28","Time":["06:04","00:50"]},{"To":"R02","Time":["06:03","00:26"]}]},{"StationID":"R18","lat":25.109815,"lon":25.109815,"name":"明德","ename":"Mingde","FirstLast":[{"To":"R28","Time":["06:05","00:52"]},{"To":"R02","Time":["06:01","00:24"]}]},{"StationID":"R19","lat":25.114455,"lon":25.114455,"name":"石牌","ename":"Shipai","FirstLast":[{"To":"R28","Time":["06:07","00:53"]},{"To":"R02","Time":["06:00","00:23"]}]},{"StationID":"R20","lat":25.120852,"lon":25.120852,"name":"唭哩岸","ename":"Qilian","FirstLast":[{"To":"R28","Time":["06:00","00:56"]},{"To":"R02","Time":["06:00","00:19"]}]},{"StationID":"R21","lat":25.12547,"lon":25.12547,"name":"奇岩","ename":"Qiyan","FirstLast":[{"To":"R28","Time":["06:02","00:58"]},{"To":"R02","Time":["06:02","00:18"]}]},{"StationID":"R22","lat":25.131819,"lon":25.131819,"name":"北投","ename":"Beitou","FirstLast":[{"To":"R28","Time":["06:03","01:00"]},{"To":"R02","Time":["06:00","00:16"]},{"To":"R22A","Time":["06:00","00:10"]}]},{"StationID":"R22A","lat":25.136931,"lon":25.136931,"name":"新北投","ename":"Xinbeitou","FirstLast":[{"To":"R22","Time":["06:05","00:02"]}]},{"StationID":"R23","lat":25.137497,"lon":25.137497,"name":"復興崗","ename":"Fuxinggang","FirstLast":[{"To":"R28","Time":["06:06","01:03"]},{"To":"R02","Time":["06:02","00:12"]}]},{"StationID":"R24","lat":25.130923,"lon":25.130923,"name":"忠義","ename":"Zhongyi","FirstLast":[{"To":"R28","Time":["06:02","01:05"]},{"To":"R02","Time":["06:00","00:10"]}]},{"StationID":"R25","lat":25.12551,"lon":25.12551,"name":"關渡","ename":"Guandu","FirstLast":[{"To":"R28","Time":["06:04","01:07"]},{"To":"R02","Time":["06:08","00:08"]}]},{"StationID":"R26","lat":25.1369,"lon":25.1369,"name":"竹圍","ename":"Zhuwei","FirstLast":[{"To":"R28","Time":["06:07","01:10"]},{"To":"R02","Time":["06:05","00:06"]}]},{"StationID":"R27","lat":25.15399,"lon":25.15399,"name":"紅樹林","ename":"Hongshulin","FirstLast":[{"To":"R28","Time":["06:00","01:13"]},{"To":"R02","Time":["06:03","00:03"]}]},{"StationID":"R28","lat":25.167745,"lon":25.167745,"name":"淡水","ename":"Tamsui","FirstLast":[{"To":"R02","Time":["06:00","00:00"]}]},{"StationID":"G01","lat":24.95761,"lon":24.95761,"name":"新店","ename":"Xindian","FirstLast":[{"To":"G19","Time":["06:00","00:00"]}]},{"StationID":"G02","lat":24.96744,"lon":24.96744,"name":"新店區公所","ename":"Xindian District Office","FirstLast":[{"To":"G19","Time":["06:02","00:02"]},{"To":"G01","Time":["06:02","01:05"]}]},{"StationID":"G03","lat":24.97545,"lon":24.97545,"name":"七張","ename":"Qizhang","FirstLast":[{"To":"G19","Time":["06:03","00:03"]},{"To":"G01","Time":["06:00","01:03"]},{"To":"G03","Time":["06:03","23:57"]}]},{"StationID":"G03A","lat":24.97188,"lon":24.97188,"name":"小碧潭","ename":"Xiaobitan","FirstLast":[{"To":"G03A","Time":["06:11","00:09"]}]},{"StationID":"G04","lat":24.98272,"lon":24.98272,"name":"大坪林","ename":"Dapinglin","FirstLast":[{"To":"G19","Time":["06:00","00:05"]},{"To":"G01","Time":["06:08","01:02"]}]},{"StationID":"G05","lat":24.992824,"lon":24.992824,"name":"景美","ename":"Jingmei","FirstLast":[{"To":"G19","Time":["06:02","00:07"]},{"To":"G01","Time":["06:06","01:00"]}]},{"StationID":"G06","lat":25.001978,"lon":25.001978,"name":"萬隆","ename":"Wanlong","FirstLast":[{"To":"G19","Time":["06:04","00:08"]},{"To":"G01","Time":["06:04","00:58"]}]},{"StationID":"G07","lat":25.014781,"lon":25.014781,"name":"公館","ename":"Gongguan","FirstLast":[{"To":"G19","Time":["06:00","00:11"]},{"To":"G01","Time":["06:02","00:55"]}]},{"StationID":"G08","lat":25.020733,"lon":25.020733,"name":"台電大樓","ename":"Taipower Building","FirstLast":[{"To":"G19","Time":["06:02","00:12"]},{"To":"G01","Time":["06:00","00:54"]}]},{"StationID":"G09","lat":25.026373,"lon":25.026373,"name":"古亭","ename":"Guting","FirstLast":[{"To":"G19","Time":["06:04","00:14"]},{"To":"G01","Time":["06:05","00:52"]}]},{"StationID":"G10","lat":25.032767,"lon":25.032767,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall","FirstLast":[{"To":"G19","Time":["06:00","00:16"]},{"To":"G01","Time":["06:03","00:50"]}]},{"StationID":"G11","lat":25.035585,"lon":25.035585,"name":"小南門","ename":"Xiaonanmen","FirstLast":[{"To":"G19","Time":["06:02","00:18"]},{"To":"G01","Time":["06:02","00:48"]}]},{"StationID":"G12","lat":25.042025,"lon":25.042025,"name":"西門","ename":"Ximen","FirstLast":[{"To":"G19","Time":["06:04","00:27"]},{"To":"G01","Time":["06:00","00:46"]}]},{"StationID":"G13","lat":25.049554,"lon":25.049554,"name":"北門","ename":"Beimen","FirstLast":[{"To":"G19","Time":["06:00","00:41"]},{"To":"G01","Time":["06:02","00:44"]}]},{"StationID":"G14","lat":25.052621,"lon":25.052621,"name":"中山","ename":"Zhongshan","FirstLast":[{"To":"G19","Time":["06:02","00:43"]},{"To":"G01","Time":["06:00","00:42"]}]},{"StationID":"G15","lat":25.052693,"lon":25.052693,"name":"松江南京","ename":"Songliang Nanjing","FirstLast":[{"To":"G19","Time":["06:05","00:45"]},{"To":"G01","Time":["06:02","00:40"]}]},{"StationID":"G16","lat":25.052044,"lon":25.052044,"name":"南京復興","ename":"Nanjing Fuxing","FirstLast":[{"To":"G19","Time":["06:00","00:47"]},{"To":"G01","Time":["06:00","00:38"]}]},{"StationID":"G17","lat":25.05152,"lon":25.05152,"name":"台北小巨蛋","ename":"Taipei Arena","FirstLast":[{"To":"G19","Time":["06:02","00:49"]},{"To":"G01","Time":["06:05","00:05"]}]},{"StationID":"G18","lat":25.051588,"lon":25.051588,"name":"南京三民","ename":"Nanjing Sanmin","FirstLast":[{"To":"G19","Time":["06:05","00:51"]},{"To":"G01","Time":["06:03","00:03"]}]},{"StationID":"G19","lat":25.050118,"lon":25.050118,"name":"松山","ename":"Songshan","FirstLast":[{"To":"G01","Time":["06:00","00:00"]}]},{"StationID":"O01","lat":24.990065,"lon":24.990065,"name":"南勢角","ename":"Nanshijiao","FirstLast":[{"To":"O21","Time":["06:00","00:00"]},{"To":"O54","Time":["06:04","00:03"]}]},{"StationID":"O02","lat":24.99392,"lon":24.99392,"name":"景安","ename":"Jingan","FirstLast":[{"To":"O21","Time":["06:01","00:02"]},{"To":"O01","Time":["06:01","01:01"]},{"To":"O54","Time":["06:05","00:05"]}]},{"StationID":"O03","lat":25.002895,"lon":25.002895,"name":"永安市場","ename":"Yongan Market","FirstLast":[{"To":"O21","Time":["06:03","00:04"]},{"To":"O01","Time":["06:00","01:00"]},{"To":"O54","Time":["06:00","00:07"]}]},{"StationID":"O04","lat":25.013858,"lon":25.013858,"name":"頂溪","ename":"Dingxi","FirstLast":[{"To":"O21","Time":["06:05","00:06"]},{"To":"O01","Time":["06:03","00:58"]},{"To":"O54","Time":["06:02","00:09"]}]},{"StationID":"O05","lat":25.026373,"lon":25.026373,"name":"古亭","ename":"Guting","FirstLast":[{"To":"O21","Time":["06:00","00:17"]},{"To":"O01","Time":["06:00","00:54"]},{"To":"O54","Time":["06:06","00:27"]}]},{"StationID":"O06","lat":25.033894,"lon":25.033894,"name":"東門","ename":"Dongmen","FirstLast":[{"To":"O21","Time":["06:03","00:33"]},{"To":"O01","Time":["06:03","00:50"]},{"To":"O54","Time":["06:08","00:30"]}]},{"StationID":"O07","lat":25.042498,"lon":25.042498,"name":"忠孝新生","ename":"Zhongxiao Xinsheng","FirstLast":[{"To":"O21","Time":["06:06","00:36"]},{"To":"O01","Time":["06:00","00:48"]},{"To":"O54","Time":["06:00","00:33"]}]},{"StationID":"O08","lat":25.052693,"lon":25.052693,"name":"松江南京","ename":"Songliang Nanjing","FirstLast":[{"To":"O21","Time":["06:08","00:38"]},{"To":"O01","Time":["06:03","00:46"]},{"To":"O54","Time":["06:02","00:35"]}]},{"StationID":"O09","lat":25.05924,"lon":25.05924,"name":"行天宮","ename":"Xingtian Temple","FirstLast":[{"To":"O21","Time":["06:00","00:40"]},{"To":"O01","Time":["06:01","00:44"]},{"To":"O54","Time":["06:04","00:37"]}]},{"StationID":"O10","lat":25.062665,"lon":25.062665,"name":"中山國小","ename":"Zhongshan Elementary School","FirstLast":[{"To":"O21","Time":["06:02","00:41"]},{"To":"O01","Time":["06:00","00:42"]},{"To":"O54","Time":["06:06","00:39"]}]},{"StationID":"O11","lat":25.06235,"lon":25.06235,"name":"民權西路","ename":"Minzuan W. Rd.","FirstLast":[{"To":"O21","Time":["06:04","00:43"]},{"To":"O01","Time":["06:01","00:40"]},{"To":"O54","Time":["06:00","00:41"]}]},{"StationID":"O12","lat":25.06322,"lon":25.06322,"name":"大橋頭","ename":"Daqiaotou","FirstLast":[{"To":"O21","Time":["06:06","00:45"]},{"To":"O01","Time":["06:00","00:29"]},{"To":"O54","Time":["06:02","00:42"]}]},{"StationID":"O13","lat":25.063075,"lon":25.063075,"name":"台北橋","ename":"Taipei Bridge","FirstLast":[{"To":"O21","Time":["06:08","00:47"]},{"To":"O01","Time":["06:06","00:27"]}]},{"StationID":"O14","lat":25.059451,"lon":25.059451,"name":"菜寮","ename":"Cailiao","FirstLast":[{"To":"O21","Time":["06:00","00:49"]},{"To":"O01","Time":["06:04","00:25"]}]},{"StationID":"O15","lat":25.05571,"lon":25.05571,"name":"三重","ename":"Sanchong","FirstLast":[{"To":"O21","Time":["06:02","00:51"]},{"To":"O01","Time":["06:02","00:23"]}]},{"StationID":"O16","lat":25.04632,"lon":25.04632,"name":"先嗇宮","ename":"Xianse Temple","FirstLast":[{"To":"O21","Time":["06:04","00:53"]},{"To":"O01","Time":["06:00","00:12"]}]},{"StationID":"O17","lat":25.039735,"lon":25.039735,"name":"頭前庄","ename":"Touqianzhuang","FirstLast":[{"To":"O21","Time":["06:07","00:56"]},{"To":"O01","Time":["06:04","00:10"]}]},{"StationID":"O18","lat":25.03608,"lon":25.03608,"name":"新莊","ename":"Xinzhuang","FirstLast":[{"To":"O21","Time":["06:00","00:58"]},{"To":"O01","Time":["06:03","00:08"]}]},{"StationID":"O19","lat":25.03279,"lon":25.03279,"name":"輔大","ename":"Fu Jen University","FirstLast":[{"To":"O21","Time":["06:03","01:01"]},{"To":"O01","Time":["06:00","00:05"]}]},{"StationID":"O20","lat":25.029073,"lon":25.029073,"name":"丹鳳","ename":"Danfeng","FirstLast":[{"To":"O21","Time":["06:00","01:03"]},{"To":"O01","Time":["06:03","00:03"]}]},{"StationID":"O21","lat":25.022107,"lon":25.022107,"name":"迴龍","ename":"Huilong","FirstLast":[{"To":"O01","Time":["06:00","00:00"]}]},{"StationID":"O50","lat":25.070275,"lon":25.070275,"name":"三重國小","ename":"Sanchong Elementary School","FirstLast":[{"To":"O54","Time":["06:05","00:45"]},{"To":"O01","Time":["06:02","00:09"]}]},{"StationID":"O51","lat":25.07646,"lon":25.07646,"name":"三和國中","ename":"Sanhe Junior High School","FirstLast":[{"To":"O54","Time":["06:07","00:47"]},{"To":"O01","Time":["06:00","00:07"]}]},{"StationID":"O52","lat":25.080485,"lon":25.080485,"name":"徐匯中學","ename":"St.lgnatius High School","FirstLast":[{"To":"O54","Time":["06:00","00:49"]},{"To":"O01","Time":["06:04","00:05"]}]},{"StationID":"O53","lat":25.085425,"lon":25.085425,"name":"三民高中","ename":"Sanmin Senior High School","FirstLast":[{"To":"O54","Time":["06:02","00:51"]},{"To":"O01","Time":["06:02","00:03"]}]},{"StationID":"O54","lat":25.09152,"lon":25.09152,"name":"蘆洲","ename":"Luzhou","FirstLast":[{"To":"O01","Time":["06:00","00:00"]}]},{"StationID":"BL01","lat":24.96012,"lon":24.96012,"name":"頂埔","ename":"Dingpu","FirstLast":[{"To":"BL23","Time":["06:00","00:00"]}]},{"StationID":"BL02","lat":24.96682,"lon":24.96682,"name":"永寧","ename":"Yongning","FirstLast":[{"To":"BL23","Time":["06:03","00:03"]},{"To":"BL01","Time":["06:00","01:08"]}]},{"StationID":"BL03","lat":24.97313,"lon":24.97313,"name":"土城","ename":"Tucheng","FirstLast":[{"To":"BL23","Time":["06:05","00:05"]},{"To":"BL01","Time":["06:05","01:06"]}]},{"StationID":"BL04","lat":24.985305,"lon":24.985305,"name":"海山","ename":"Haishan","FirstLast":[{"To":"BL23","Time":["06:07","00:07"]},{"To":"BL01","Time":["06:03","01:04"]}]},{"StationID":"BL05","lat":24.99828,"lon":24.99828,"name":"亞東醫院","ename":"Far Eastern Hospital","FirstLast":[{"To":"BL23","Time":["06:00","00:10"]},{"To":"BL01","Time":["06:00","01:01"]}]},{"StationID":"BL06","lat":25.008465,"lon":25.008465,"name":"府中","ename":"Fuzhong","FirstLast":[{"To":"BL23","Time":["06:02","00:12"]},{"To":"BL01","Time":["06:05","00:59"]}]},{"StationID":"BL07","lat":25.013825,"lon":25.013825,"name":"板橋","ename":"Banqiao","FirstLast":[{"To":"BL23","Time":["06:03","00:13"]},{"To":"BL01","Time":["06:04","00:57"]}]},{"StationID":"BL08","lat":25.02327,"lon":25.02327,"name":"新埔","ename":"Xinpu","FirstLast":[{"To":"BL23","Time":["06:00","00:16"]},{"To":"BL01","Time":["06:02","00:55"]}]},{"StationID":"BL09","lat":25.030265,"lon":25.030265,"name":"江子翠","ename":"Jiangzicui","FirstLast":[{"To":"BL23","Time":["06:02","00:17"]},{"To":"BL01","Time":["06:00","00:54"]}]},{"StationID":"BL10","lat":25.03528,"lon":25.03528,"name":"龍山寺","ename":"Longshan Temple","FirstLast":[{"To":"BL23","Time":["06:05","00:21"]},{"To":"BL01","Time":["06:05","00:50"]}]},{"StationID":"BL11","lat":25.042025,"lon":25.042025,"name":"西門","ename":"Ximen","FirstLast":[{"To":"BL23","Time":["06:08","00:23"]},{"To":"BL01","Time":["06:03","00:48"]}]},{"StationID":"BL12","lat":25.04631,"lon":25.04631,"name":"台北車站","ename":"Taipei Main Station","FirstLast":[{"To":"BL23","Time":["06:00","00:45"]},{"To":"BL01","Time":["06:00","00:45"]}]},{"StationID":"BL13","lat":25.04468,"lon":25.04468,"name":"善導寺","ename":"Shandao Temple","FirstLast":[{"To":"BL23","Time":["06:02","00:46"]},{"To":"BL01","Time":["06:07","00:44"]}]},{"StationID":"BL14","lat":25.042498,"lon":25.042498,"name":"忠孝新生","ename":"Zhongxiao Xinsheng","FirstLast":[{"To":"BL23","Time":["06:04","00:48"]},{"To":"BL01","Time":["06:05","00:42"]}]},{"StationID":"BL15","lat":25.041749,"lon":25.041749,"name":"忠孝復興","ename":"Zhongxiao Fuxing","FirstLast":[{"To":"BL23","Time":["06:00","00:50"]},{"To":"BL01","Time":["06:03","00:40"]}]},{"StationID":"BL16","lat":25.041505,"lon":25.041505,"name":"忠孝敦化","ename":"Xhongxiao Dunhua","FirstLast":[{"To":"BL23","Time":["06:01","00:52"]},{"To":"BL01","Time":["06:02","00:24"]}]},{"StationID":"BL17","lat":25.04137,"lon":25.04137,"name":"國父紀念館","ename":"Sun Yat-Sen Memorial Hall","FirstLast":[{"To":"BL23","Time":["06:03","00:53"]},{"To":"BL01","Time":["06:00","00:22"]}]},{"StationID":"BL18","lat":25.041135,"lon":25.041135,"name":"市政府","ename":"Taipei City Hall","FirstLast":[{"To":"BL23","Time":["06:00","00:55"]},{"To":"BL01","Time":["06:03","00:21"]}]},{"StationID":"BL19","lat":25.040855,"lon":25.040855,"name":"永春","ename":"Yongchun","FirstLast":[{"To":"BL23","Time":["06:02","00:57"]},{"To":"BL01","Time":["06:02","00:19"]}]},{"StationID":"BL20","lat":25.044715,"lon":25.044715,"name":"後山埤","ename":"Houshanpi","FirstLast":[{"To":"BL23","Time":["06:04","00:59"]},{"To":"BL01","Time":["06:00","00:17"]}]},{"StationID":"BL21","lat":25.050459,"lon":25.050459,"name":"昆陽","ename":"Kunyang","FirstLast":[{"To":"BL23","Time":["06:06","01:01"]},{"To":"BL01","Time":["06:04","00:15"]}]},{"StationID":"BL22","lat":25.052035,"lon":25.052035,"name":"南港","ename":"Nangang","FirstLast":[{"To":"BL23","Time":["06:00","01:03"]},{"To":"BL01","Time":["06:02","00:12"]}]},{"StationID":"BL23","lat":25.054919,"lon":25.054919,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center","FirstLast":[{"To":"BL01","Time":["06:00","00:00"]}]}];

  var krtc_station = [{"StationID":"R3","lat":22.564822,"lon":22.564822,"name":"小港","ename":"Siaogang","FirstLast":[{"To":"R24","Time":["05:55","00:00"]},{"To":"R3","Time":["",""]}]},{"StationID":"R4","lat":22.570199,"lon":22.570199,"name":"高雄國際機場","ename":"Kaohsiung International Airport","FirstLast":[{"To":"R24","Time":["05:56","00:02"]},{"To":"R3","Time":["06:26","00:44"]}]},{"StationID":"R4A","lat":22.580363,"lon":22.580363,"name":"草衙","ename":"Caoya","FirstLast":[{"To":"R24","Time":["05:58","00:05"]},{"To":"R3","Time":["06:24","00:42"]}]},{"StationID":"R5","lat":22.588356,"lon":22.588356,"name":"前鎮高中","ename":"Cianjhen Senior High School","FirstLast":[{"To":"R24","Time":["06:00","00:08"]},{"To":"R3","Time":["06:22","00:40"]}]},{"StationID":"R6","lat":22.596856,"lon":22.596856,"name":"凱旋","ename":"Kaisyuan","FirstLast":[{"To":"R24","Time":["06:02","00:10"]},{"To":"R3","Time":["06:20","00:38"]}]},{"StationID":"R7","lat":22.60587,"lon":22.60587,"name":"獅甲","ename":"Shihjia","FirstLast":[{"To":"R24","Time":["06:04","00:13"]},{"To":"R3","Time":["06:18","00:35"]}]},{"StationID":"R8","lat":22.614011,"lon":22.614011,"name":"三多商圈","ename":"Sanduo Shopping District","FirstLast":[{"To":"R24","Time":["05:55","00:16"]},{"To":"R3","Time":["06:16","00:33"]}]},{"StationID":"R9","lat":22.624628,"lon":22.624628,"name":"中央公園","ename":"Central Park","FirstLast":[{"To":"R24","Time":["05:56","00:18"]},{"To":"R3","Time":["06:14","00:31"]}]},{"StationID":"R10","lat":22.631387,"lon":22.631387,"name":"美麗島","ename":"Formosa Boulevard","FirstLast":[{"To":"R24","Time":["05:58","00:21"]},{"To":"R3","Time":["06:12","00:29"]}]},{"StationID":"R11","lat":22.639769,"lon":22.639769,"name":"高雄車站","ename":"Kaohsiung Main Station","FirstLast":[{"To":"R24","Time":["06:00","00:23"]},{"To":"R3","Time":["06:10","00:28"]}]},{"StationID":"R12","lat":22.648314,"lon":22.648314,"name":"後驛","ename":"Houyi","FirstLast":[{"To":"R24","Time":["06:02","00:25"]},{"To":"R3","Time":["06:08","00:25"]}]},{"StationID":"R13","lat":22.657126,"lon":22.657126,"name":"凹子底","ename":"Aozihdi","FirstLast":[{"To":"R24","Time":["06:04","00:27"]},{"To":"R3","Time":["06:06","00:24"]}]},{"StationID":"R14","lat":22.666135,"lon":22.666135,"name":"巨蛋","ename":"Kaohsiung Arena","FirstLast":[{"To":"R24","Time":["06:06","00:29"]},{"To":"R3","Time":["06:04","00:22"]}]},{"StationID":"R15","lat":22.676738,"lon":22.676738,"name":"生態園區","ename":"Ecological District","FirstLast":[{"To":"R24","Time":["06:08","00:31"]},{"To":"R3","Time":["06:02","00:20"]}]},{"StationID":"R16","lat":22.688073,"lon":22.688073,"name":"左營","ename":"Zuoying","FirstLast":[{"To":"R24","Time":["06:10","00:33"]},{"To":"R3","Time":["06:00","00:17"]}]},{"StationID":"R17","lat":22.701622,"lon":22.701622,"name":"世運","ename":"World Game","FirstLast":[{"To":"R24","Time":["06:12","00:35"]},{"To":"R3","Time":["05:58","00:15"]}]},{"StationID":"R18","lat":22.708479,"lon":22.708479,"name":"油廠國小","ename":"Oil Refinery Elementary School","FirstLast":[{"To":"R24","Time":["06:14","00:37"]},{"To":"R3","Time":["05:56","00:14"]}]},{"StationID":"R19","lat":22.718671,"lon":22.718671,"name":"楠梓加工區","ename":"Nanzih Export Processing Zone","FirstLast":[{"To":"R24","Time":["06:16","00:39"]},{"To":"R3","Time":["05:55","00:11"]}]},{"StationID":"R20","lat":22.7223,"lon":22.7223,"name":"後勁","ename":"Houjing","FirstLast":[{"To":"R24","Time":["06:18","00:41"]},{"To":"R3","Time":["06:10","00:10"]}]},{"StationID":"R21","lat":22.729403,"lon":22.729403,"name":"都會公園","ename":"Metropolitan Park","FirstLast":[{"To":"R24","Time":["06:20","00:42"]},{"To":"R3","Time":["06:08","00:08"]}]},{"StationID":"R22","lat":22.744399,"lon":22.744399,"name":"青埔","ename":"Cingpu","FirstLast":[{"To":"R24","Time":["06:22","00:45"]},{"To":"R3","Time":["06:06","00:06"]}]},{"StationID":"R22A","lat":22.753398,"lon":22.753398,"name":"橋頭糖廠","ename":"Ciaotou Sugar Refinery","FirstLast":[{"To":"R24","Time":["06:24","00:46"]},{"To":"R3","Time":["06:04","00:04"]}]},{"StationID":"R23","lat":22.760452,"lon":22.760452,"name":"橋頭火車站","ename":"Ciaotou Station","FirstLast":[{"To":"R24","Time":["06:25","00:48"]},{"To":"R3","Time":["06:02","00:02"]}]},{"StationID":"R24","lat":22.780544,"lon":22.780544,"name":"南岡山","ename":"Gangshan South","FirstLast":[{"To":"R24","Time":["",""]},{"To":"R3","Time":["06:00","00:00"]}]},{"StationID":"O1","lat":22.621544,"lon":22.621544,"name":"西子灣","ename":"Sizihwan","FirstLast":[{"To":"OT1","Time":["06:00","00:00"]},{"To":"O1","Time":["",""]}]},{"StationID":"O2","lat":22.623538,"lon":22.623538,"name":"鹽埕埔","ename":"Yanchengpu","FirstLast":[{"To":"OT1","Time":["06:01","00:01"]},{"To":"O1","Time":["06:03","00:21"]}]},{"StationID":"O4","lat":22.629002,"lon":22.629002,"name":"市議會","ename":"City Council","FirstLast":[{"To":"OT1","Time":["06:03","00:03"]},{"To":"O1","Time":["06:01","00:19"]}]},{"StationID":"O5","lat":22.631387,"lon":22.631387,"name":"美麗島","ename":"Formosa Boulevard","FirstLast":[{"To":"OT1","Time":["06:05","00:05"]},{"To":"O1","Time":["06:00","00:16"]}]},{"StationID":"O6","lat":22.630745,"lon":22.630745,"name":"信義國小","ename":"Sinyi Elementary School","FirstLast":[{"To":"OT1","Time":["06:07","00:07"]},{"To":"O1","Time":["06:05","00:15"]}]},{"StationID":"O7","lat":22.630292,"lon":22.630292,"name":"文化中心","ename":"Cultural Center","FirstLast":[{"To":"OT1","Time":["06:08","00:08"]},{"To":"O1","Time":["06:04","00:13"]}]},{"StationID":"O8","lat":22.629331,"lon":22.629331,"name":"五塊厝","ename":"Wukuaicuo","FirstLast":[{"To":"OT1","Time":["06:00","00:10"]},{"To":"O1","Time":["06:02","00:12"]}]},{"StationID":"O9","lat":22.627291,"lon":22.627291,"name":"技擊館","ename":"Martial Arts Stadium","FirstLast":[{"To":"OT1","Time":["06:01","00:12"]},{"To":"O1","Time":["06:01","00:10"]}]},{"StationID":"O10","lat":22.625162,"lon":22.625162,"name":"衛武營","ename":"Weiwuying","FirstLast":[{"To":"OT1","Time":["06:02","00:13"]},{"To":"O1","Time":["06:00","00:09"]}]},{"StationID":"O11","lat":22.625331,"lon":22.625331,"name":"鳳山西站","ename":"Fongshan West","FirstLast":[{"To":"OT1","Time":["06:04","00:15"]},{"To":"O1","Time":["06:06","00:07"]}]},{"StationID":"O12","lat":22.625994,"lon":22.625994,"name":"鳳山","ename":"Fongshan","FirstLast":[{"To":"OT1","Time":["06:05","00:16"]},{"To":"O1","Time":["06:05","00:06"]}]},{"StationID":"O13","lat":22.625197,"lon":22.625197,"name":"大東","ename":"Dadong","FirstLast":[{"To":"OT1","Time":["06:07","00:18"]},{"To":"O1","Time":["06:03","00:04"]}]},{"StationID":"O14","lat":22.624915,"lon":22.624915,"name":"鳳山國中","ename":"Fongshan Junior High School","FirstLast":[{"To":"OT1","Time":["06:09","00:20"]},{"To":"O1","Time":["06:02","00:02"]}]},{"StationID":"OT1","lat":22.622423,"lon":22.622423,"name":"大寮","ename":"Daliao","FirstLast":[{"To":"OT1","Time":["",""]},{"To":"O1","Time":["06:00","00:00"]}]}];

  var tymetro_station = [{"StationID":"A1","lat":25.048,"lon":25.048,"name":"台北車站","ename":"Taipei Main Station","FirstLast":[{"To":"A21","Time":["06:07","23:07"],"TrainType":1},{"To":"A13","Time":["06:00","23:00"],"TrainType":2}]},{"StationID":"A2","lat":25.054,"lon":25.054,"name":"三重站","ename":"Sanchong Station","FirstLast":[{"To":"A21","Time":["05:58","23:15"],"TrainType":1},{"To":"A1","Time":["06:08","00:17"],"TrainType":1}]},{"StationID":"A3","lat":25.061,"lon":25.061,"name":"新北產業園區站","ename":"New Taipei Industrial Park Station","FirstLast":[{"To":"A21","Time":["06:02","23:19"],"TrainType":1},{"To":"A1","Time":["06:03","00:12"],"TrainType":1},{"To":"A13","Time":["06:09","23:09"],"TrainType":2},{"To":"A1","Time":["06:11","23:26"],"TrainType":2}]},{"StationID":"A4","lat":25.059,"lon":25.059,"name":"新莊副都心站","ename":"Xinzhuang Fuduxin Station","FirstLast":[{"To":"A21","Time":["06:05","23:22"],"TrainType":1},{"To":"A1","Time":["06:00","00:09"],"TrainType":1}]},{"StationID":"A5","lat":25.052,"lon":25.052,"name":"泰山站","ename":"Taishan Station","FirstLast":[{"To":"A21","Time":["06:07","23:24"],"TrainType":1},{"To":"A1","Time":["05:58","00:07"],"TrainType":1}]},{"StationID":"A6","lat":25.033,"lon":25.033,"name":"泰山貴和站","ename":"Taishan Guihe Station","FirstLast":[{"To":"A21","Time":["06:10","23:27"],"TrainType":1},{"To":"A1","Time":["06:10","00:04"],"TrainType":1}]},{"StationID":"A7","lat":25.041,"lon":25.041,"name":"體育大學站","ename":"National Taiwan Sport University Station","FirstLast":[{"To":"A21","Time":["06:00","23:32"],"TrainType":1},{"To":"A1","Time":["06:03","23:57"],"TrainType":1}]},{"StationID":"A8","lat":25.061,"lon":25.061,"name":"長庚醫院站","ename":"Chang Gung Memorial Hospital Station","FirstLast":[{"To":"A21","Time":["06:08","23:36"],"TrainType":1},{"To":"A1","Time":["05:59","23:53"],"TrainType":1},{"To":"A13","Time":["06:06","23:21"],"TrainType":2},{"To":"A1","Time":["05:58","23:11"],"TrainType":2}]},{"StationID":"A9","lat":25.066,"lon":25.066,"name":"林口站","ename":"Linkou Station","FirstLast":[{"To":"A21","Time":["06:11","23:39"],"TrainType":1},{"To":"A1","Time":["06:07","23:50"],"TrainType":1}]},{"StationID":"A10","lat":25.081,"lon":25.081,"name":"山鼻站","ename":"Shanbi Station","FirstLast":[{"To":"A21","Time":["06:05","23:48"],"TrainType":1},{"To":"A1","Time":["05:59","23:42"],"TrainType":1}]},{"StationID":"A11","lat":25.086,"lon":25.086,"name":"坑口站","ename":"Kengkou Station","FirstLast":[{"To":"A21","Time":["06:08","23:51"],"TrainType":1},{"To":"A1","Time":["06:11","23:40"],"TrainType":1}]},{"StationID":"A12","lat":25.082,"lon":25.082,"name":"機場第一航廈站","ename":"Airport Terminal 1 Station","FirstLast":[{"To":"A21","Time":["05:57","23:55"],"TrainType":1},{"To":"A1","Time":["06:07","23:36"],"TrainType":1},{"To":"A13","Time":["06:07","23:37"],"TrainType":2},{"To":"A1","Time":["05:59","22:58"],"TrainType":2}]},{"StationID":"A13","lat":25.077,"lon":25.077,"name":"機場第二航廈站","ename":"Airport Terminal 2 Station","FirstLast":[{"To":"A21","Time":["06:00","23:57"],"TrainType":1},{"To":"A1","Time":["06:04","23:33"],"TrainType":1},{"To":"A1","Time":["05:57","22:55"],"TrainType":2}]},{"StationID":"A14a","lat":25.069,"lon":25.069,"name":"機場旅館站","ename":"Airport Hotel Station","FirstLast":[{"To":"A21","Time":["06:03","00:00"],"TrainType":1},{"To":"A1","Time":["06:00","23:29"],"TrainType":1}]},{"StationID":"A15","lat":25.056,"lon":25.056,"name":"大園站","ename":"Dayuan Station","FirstLast":[{"To":"A21","Time":["06:06","00:03"],"TrainType":1},{"To":"A1","Time":["06:12","23:26"],"TrainType":1}]},{"StationID":"A16","lat":25.037,"lon":25.037,"name":"橫山站","ename":"Hengshan Station","FirstLast":[{"To":"A21","Time":["06:09","00:06"],"TrainType":1},{"To":"A1","Time":["06:09","23:23"],"TrainType":1}]},{"StationID":"A17","lat":25.024,"lon":25.024,"name":"領航站","ename":"Linghang Station","FirstLast":[{"To":"A21","Time":["06:12","00:09"],"TrainType":1},{"To":"A1","Time":["06:06","23:20"],"TrainType":1}]},{"StationID":"A18","lat":25.014,"lon":25.014,"name":"高鐵桃園站","ename":"Taoyuan HSR Station","FirstLast":[{"To":"A21","Time":["06:02","00:13"],"TrainType":1},{"To":"A1","Time":["06:02","23:16"],"TrainType":1}]},{"StationID":"A19","lat":25.002,"lon":25.002,"name":"桃園體育園區站","ename":"Taoyuan Sports Park Station","FirstLast":[{"To":"A21","Time":["06:05","00:16"],"TrainType":1},{"To":"A1","Time":["06:13","23:13"],"TrainType":1}]},{"StationID":"A20","lat":24.98,"lon":24.98,"name":"興南站","ename":"Xingnan Station","FirstLast":[{"To":"A21","Time":["06:10","00:21"],"TrainType":1},{"To":"A1","Time":["06:08","23:08"],"TrainType":1}]},{"StationID":"A21","lat":24.967,"lon":24.967,"name":"環北站","ename":"Huanbei Station","FirstLast":[{"To":"A1","Time":["06:05","23:05"],"TrainType":1}]}];

  var datax = {
    trtc: {
      line: trtc_line,
      station: trtc_station
    },
    krtc: {
      line: krtc_line,
      station: krtc_station
    },
    tymetro: {
      line: tymetro_line,
      station: tymetro_station
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

  function companyTagFind(str) {
    return Object.keys(companyTag).find(function (c) {
      return !!(str == companyTag[c]);
    });
  }

  var getPTX = ptx.getPromiseURL;

  function setDefaultCfg() {
    var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (typeof cfg == 'string') cfg = {
      paramDirectlyUse: cfg
    }; //若傳入的為字串代表直接用於最後的參數不需再調整

    cfg.cbFn = cfg.cbFn || function (data, e) {};

    cfg.top = cfg.top || 50000;
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

  function getStationOnWhatLineID(StationID) {
    if (/^[a-zA-Z]{1}\d{2}/gi.test(StationID)) {
      return StationID.substr(0, 1);
    } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StationID)) {
      return StationID.substr(0, 2);
    }

    var ary = StationID.split('');
    var rt = '';

    for (var i = 0; i < ary.length; i++) {
      if (/[a-zA-Z]/.test(ary[i])) {
        rt = rt + ary[i];
      } else {
        break;
      }
    }

    return rt;
  }

  function promiseCatchLineCombine(json, data, combineName) {
    var LineIDName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'LineID';
    var mode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'array';
    json.forEach(function (c) {
      if (mode == 'array') c[combineName] = [];
    });
    data.forEach(function (c) {
      var LineObj = CM.findArrayTarget(json, function (item) {
        return !!(item.LineID == c[LineIDName]);
      });
      if (mode == 'array') LineObj[combineName].push(c);
    });
    return json;
  }

  function promiseCatchLinePredo(data, backTag, otherDo) {
    return data.map(function (c) {
      var rt = {};
      backTag.forEach(function (key) {
        rt[key] = c[key];
      });
      if (typeof otherDo == 'function') rt = otherDo(rt);
      return rt;
    });
  }

  function promiseCatchStationCombine(json, data, combineName) {
    var StationID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'StationID';
    var mode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'array';
    var otherDo = arguments.length > 5 ? arguments[5] : undefined;
    json.forEach(function (c) {
      if (mode == 'array') c[combineName] = [];
    });
    data.forEach(function (c) {
      var Obj = CM.findArrayTarget(json, function (item) {
        return !!(item.StationID == c[StationID]);
      });
      if (typeof otherDo == 'function') c = otherDo(c);
      if (mode == 'array') Obj[combineName].push(c);
    });
    return json;
  }

  var metro = {
    getCompanyTag: getCompanyTag,
    getStationOnWhatLineID: getStationOnWhatLineID,
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
  metro.ptxAutoMetroFunctionKey = ptxAutoMetroFunctionKey; //========= 建立各捷運公司可直接使用之基本定義 Function ============

  var baseMethod = function baseMethod(companyTag) {
    var _this = this,
        _methodObj;

    _classCallCheck(this, baseMethod);

    var me = this;
    var compName = companyTagFind(companyTag);
    this.companyTag = companyTag;
    ptxAutoMetroFunctionKey.forEach(function (fn) {
      _this[fn] = function (cfg) {
        return metro[fn](companyTag, cfg);
      };
    });

    function useLineID2filterBy(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg.filterBy = cfg.filterBy || '';
      cfg.filterBy += ptx.filterParam('LineID', '==', LineID);
      return cfg;
    }

    function useStationID2filterBy(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg.filterBy = cfg.filterBy || '';
      cfg.filterBy += ptx.filterParam('StationID', '==', StationID);
      return cfg;
    }

    var methodObj = (_methodObj = {
      getRoute: function getRoute(LineID) {
        var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        cfg = useLineID2filterBy(LineID, cfg);
        return me._Route(cfg);
      },
      getLineFrequency: function getLineFrequency(LineID) {
        var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        cfg = useLineID2filterBy(LineID, cfg);
        return me._Frequency(cfg);
      },
      getLineTransfer: function getLineTransfer(LineID) {
        var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        cfg.filterBy = cfg.filterBy || '';
        cfg.filterBy += ptx.filterParam('FromLineID', '==', LineID);
        return me._LineTransfer(cfg);
      }
    }, _defineProperty(_methodObj, "getLineFrequency", function getLineFrequency(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return me._Frequency(cfg);
    }), _defineProperty(_methodObj, "getFirstLastTimetable", function getFirstLastTimetable(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return me._FirstLastTimetable(cfg);
    }), _defineProperty(_methodObj, "getS2STravelTime", function getS2STravelTime(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);

      cfg.processJSON = function (json) {
        var travleTimes, tmpA, tmpNextStop;
        if (_typeof(json) != 'object') return json;

        for (var m = 0; m < json.length; m++) {
          travleTimes = json[m].TravelTimes;
          json[m].TravelInterval = travleTimes.map(function (c, idx, arr) {
            tmpNextStop = arr[idx + 1] ? parseInt(arr[idx + 1].StopTime) : 0;
            tmpA = parseInt(c.RunTime) + Math.ceil(parseInt(c.StopTime) / 2) + Math.ceil(tmpNextStop / 2);
            return tmpA;
          });
        }

        return json;
      };

      return me._S2STravelTime(cfg);
    }), _defineProperty(_methodObj, "getStationOfLine", function getStationOfLine(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return me._StationOfLine(cfg);
    }), _defineProperty(_methodObj, "getStationOfRoute", function getStationOfRoute(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return me._StationOfRoute(cfg);
    }), _defineProperty(_methodObj, "getFromToFare", function getFromToFare(fromID, toID) {
      var cfg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      cfg.filterBy = cfg.filterBy || '';
      cfg.filterBy += TT.ptx.filterParam(['OriginStationID', 'DestinationStationID'], '==', [fromID, toID], 'and');
      return me._ODFare(cfg);
    }), _defineProperty(_methodObj, "getFromToTravelTime", function getFromToTravelTime(fromID, toID) {
      var cfg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var LineID = getStationOnWhatLineID(fromID);
      return me.getS2STravelTime(LineID, cfg).then(function (res) {
        var aryTravelTimes = res.data.find(function (c) {
          var hasFrom = false,
              hasTo = false,
              t = c.TravelTimes;

          for (var i = 0; i < t.length; i++) {
            if (t[i].FromStationID == fromID || t[i].ToStationID == fromID) {
              hasFrom = true;
            } else if (t[i].FromStationID == toID || t[i].ToStationID == toID) {
              hasTo = true;
            }
          }

          return hasFrom && hasTo;
        });
        if (aryTravelTimes && aryTravelTimes.TravelTimes) aryTravelTimes = aryTravelTimes.TravelTimes;
        var flagReverse = false,
            findTag = 'any'; // any , from / to , finish

        if (!aryTravelTimes) return {
          status: CM.CONST_PTX_API_FAIL,
          error: 'No match any route.'
        };
        var aryBack = aryTravelTimes.filter(function (c, idx) {
          switch (findTag) {
            case 'any':
              if (c.FromStationID == fromID || c.FromStationID == toID) {
                findTag = c.FromStationID == fromID ? 'to' : 'from';
                return true;
              } else {
                return false;
              }

              break;

            case 'from':
              flagReverse = true;

            case 'to':
              if (c.ToStationID == fromID || c.ToStationID == toID) findTag = 'finish';
              return true;
              break;

            case 'finish':
              return false;
              break;
          }
        });

        if (flagReverse) {
          //如果是和伺服器給的順序相反時，將 FromStatioinID 與 ToStationID 反向
          aryBack = aryBack.map(function (c, idx, arr) {
            return {
              FromStationID: c.ToStationID,
              FromStationName: c.ToStationName,
              ToStationID: c.FromStationID,
              ToStationName: c.FromStationName,
              Sequence: arr.length - idx,
              RunTime: c.RunTime,
              StopTime: idx == arr.length - 1 ? 0 : c.StopTime
            };
          }).reverse();
        } else {
          aryBack = aryBack.map(function (c, idx) {
            c.Sequence = idx + 1;
            c.StopTime = idx == 0 ? 0 : c.StopTime;
            return c;
          });
        }

        var totalTime = 0,
            tmpNextStop;
        var travelInterval = aryBack.map(function (c, idx, arr) {
          totalTime += parseInt(c.RunTime) + parseInt(c.StopTime);
          tmpNextStop = arr[idx + 1] ? parseInt(arr[idx + 1].StopTime) : 0;
          return parseInt(c.RunTime) + Math.ceil(parseInt(c.StopTime) / 2) + Math.ceil(tmpNextStop / 2);
        });
        return {
          status: CM.CONST_PTX_API_SUCCESS,
          TravelTimes: aryBack,
          TravelInterval: travelInterval,
          TotalTime: totalTime,
          FromStationID: fromID,
          ToStationID: toID
        };
      });
    }), _defineProperty(_methodObj, "getStation", function getStation(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useStationID2filterBy(StationID, cfg);
      return me._Station(cfg);
    }), _defineProperty(_methodObj, "getStationTimeTable", function getStationTimeTable(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useStationID2filterBy(StationID, cfg);
      return me._StationTimeTable(cfg);
    }), _defineProperty(_methodObj, "getStationFacility", function getStationFacility(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useStationID2filterBy(StationID, cfg);
      return me._StationFacility(cfg);
    }), _defineProperty(_methodObj, "getStationFirstLastTimetable", function getStationFirstLastTimetable(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useStationID2filterBy(StationID, cfg);
      return me._FirstLastTimetable(cfg);
    }), _defineProperty(_methodObj, "getStationExit", function getStationExit(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useStationID2filterBy(StationID, cfg);
      return me._StationExit(cfg);
    }), _defineProperty(_methodObj, "getStationFare", function getStationFare(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg.filterBy = cfg.filterBy || '';
      cfg.filterBy += TT.ptx.filterParam('OriginStationID', '==', StationID);
      return me._ODFare(cfg);
    }), _defineProperty(_methodObj, "getStationLiveBoard", function getStationLiveBoard(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useStationID2filterBy(StationID, cfg);
      return me._LiveBoard(cfg);
    }), _methodObj);

    for (var k in methodObj) {
      this[k] = methodObj[k];
    } // ==== 整合抓資料 Function 以及抓完後的固定資料存取 Function ====


    var catchData = {
      config: {
        Line_BackTag: ['LineID', 'LineName', 'LineColor', 'IsBranch'],
        Line_StationOfRoute_BackTag: ['RouteID', 'Direction', 'LineID', 'Stations'],
        Line_LineTransfer_BackTag: ['FromLineID', 'FromStationID', 'ToLineID', 'ToStationID', 'IsOnSiteTransfer', 'TransferTime'],
        Line_S2STravelTime_BackTag: ['LineID', 'RouteID', 'TravelTimes'],
        Line_Frequency_BackTag: ['LineID', 'RouteID', 'ServiceDays', 'OperationTime', 'Headways'],
        Line_callback: function Line_callback(json) {
          //通用預處理
          return json;
        },
        Line_callback_final: function Line_callback_final(json) {
          //私用預處理
          return json;
        },
        Station_BackTag: ['StationID', 'StationName', 'StationPosition'],
        Station_FirstLastTimetable_BackTag: ['StationID', 'LineID', 'DestinationStaionID', 'FirstTrainTime', 'LastTrainTime'],
        Station_Fare_BackTag: ['OriginStationID', 'DestinationStationID', 'Fares']
      },
      calcStationDayTimeBySimple: function calcStationDayTimeBySimple(timeObj) {
        var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        //運用 TimeSimple Format 計算一個車站每週每日往兩方向的所有班次資訊 , w for weekdays
        w = w.toString();
        var regW = new RegExp(w);
        if (!timeObj) return {
          error: "No time data"
        };
        var mainSub = catchData.getDataXLineMainSub(timeObj.LineID);
        var hasSubLine = !!(mainSub.sub.length > 0); //如果這路線有分主幹線，要區分主幹線
        //過濾要找的星期
        //+++++++++++++++++++++++++++++++++++++++++++特殊排除規則待 PTX Bug Fix++++++++++++++++++++++++

        function specialNeedFilter(Route) {
          if (w == '6' && /^R-/.test(Route.RouteID) && /0/.test(Route.weekStr)) return true;
          return false;
        } //+++++++++++++++++++++++++++++++++++++++++++特殊排除規則待 PTX Bug Fix End++++++++++++++++++++++++


        function procTIme(rollTime) {
          var Full = [],
              Simple = [];
          rollTime.forEach(function (c) {
            c.Timetables.forEach(function (t) {
              if (Simple.indexOf(t) == -1) {
                Simple.push(t);
                var tmpRG = {
                  RouteID: c.RouteID,
                  To: c.To,
                  Time: t,
                  tt_sortTime: CM.transTime2Sec(t, true)
                };
                if (c.TrainType) tmpRG.TrainType = c.TrainType;
                Full.push(tmpRG);
              }
            });
          });
          Full.sort(ptx.sortByTTSortTime);
          Simple = Full.map(function (c) {
            return c.Time;
          });
          return {
            Route: rollTime,
            Full: Full,
            Simple: Simple,
            isEmpty: !!(rollTime.length == 0)
          };
        }

        var SubDirTime = false,
            isSubOfStation = false;
        var MainDirTime = timeObj.Direction.map(function (DirTime) {
          var rollTime = DirTime.filter(function (c) {
            if (hasSubLine && mainSub.main.indexOf(c.RouteID) == -1) isSubOfStation = true;
            return mainSub.main.indexOf(c.RouteID) != -1 && regW.test(c.weekStr) && !specialNeedFilter(c);
          });
          return procTIme(rollTime);
        });
        if (MainDirTime[0].isEmpty && MainDirTime[1].isEmpty) MainDirTime = false;

        if (hasSubLine && isSubOfStation) {
          SubDirTime = timeObj.Direction.map(function (DirTime) {
            var backTime = DirTime.filter(function (c) {
              return mainSub.sub.indexOf(c.RouteID) != -1 && regW.test(c.weekStr) && !specialNeedFilter(c);
            });
            return procTIme(backTime);
          });
        } //整理目標方向車站


        var mainTo = [[], []],
            subTo = [[], []];

        if (MainDirTime) {
          MainDirTime[0].Route.forEach(function (c) {
            if (mainTo[0].indexOf(c.To) == -1) {
              mainTo[0].push(c.To);
            }
          });
          MainDirTime[1].Route.forEach(function (c) {
            if (mainTo[1].indexOf(c.To) == -1) {
              mainTo[1].push(c.To);
            }
          });
        }

        if (SubDirTime) {
          SubDirTime[0].Route.forEach(function (c) {
            if (subTo[0].indexOf(c.To) == -1) {
              subTo[0].push(c.To);
            }
          });
          SubDirTime[1].Route.forEach(function (c) {
            if (subTo[1].indexOf(c.To) == -1) {
              subTo[1].push(c.To);
            }
          });
        }

        return {
          StationID: timeObj.StationID,
          LineID: timeObj.LineID,
          main: MainDirTime,
          sub: SubDirTime,
          mainTo: mainTo,
          subTo: subTo,
          week: w
        };
      },
      calcStationTimeByHeadWays: function calcStationTimeByHeadWays(LineObj, StationID, RouteID, Direction) {
        if (typeof LineObj == 'string') LineObj = catchData.getDataXLineObj(LineObj);
        var stData = catchData.getDataXStationData(StationID);
        var ToStationID = LineObj.Route.find(function (c) {
          return c.RouteID == RouteID && c.Direction == Direction;
        }).Stations;
        ToStationID = ToStationID[ToStationID.length - 1];
        var Frq = stData.FirstLast.find(function (c) {
          return c.To == ToStationID;
        });
        var first = Frq.Time[0],
            last = Frq.Time[1];
        return LineObj.Frequency.map(function (c) {
          var Headways = c.Headways;
          var time = [],
              tmpTime = '',
              startTime = 0,
              endTime = 0,
              headWay = false,
              intTime = 0,
              intCount = 0,
              headwayIndex = 0;

          while (headwayIndex < Headways.length) {
            headWay = Headways[headwayIndex];
            startTime = headwayIndex == 0 ? CM.transTime2Sec(first, true) / 60 : CM.transTime2Sec(headWay.Time[0], true) / 60;
            endTime = CM.transTime2Sec(headWay.Time[1], true) / 60;
            intTime = headWay.AveMins + (endTime - startTime) % headWay.AveMins;
            intCount = Math.ceil((endTime - startTime) / intTime);

            for (var i = 0; i < intCount; i++) {
              tmpTime = CM.transSec2Time((startTime + i * intTime) * 60);
              time.push(tmpTime);
            }

            headwayIndex++;
          }

          if (time.indexOf(last) == -1) time.push(last);
          return {
            weekStr: CM.weekArray2WeekStr(c.ServiceDays.week),
            time: time
          };
        });
      },
      calcLineTimeByFirstStation: function calcLineTimeByFirstStation(LineObj, FirstStationID, FirstStationTime, RouteID, Direction) {
        if (typeof LineObj == 'string') LineObj = catchData.getDataXLineObj(LineObj); //let stData = catchData.getDataXStationData(StationID);

        var Route = LineObj.Route.find(function (c) {
          return c.RouteID == RouteID && c.Direction == Direction;
        });
        var Stations = Route.Stations;
        var ToStationID = Route.Stations[Route.Stations.length - 1];
        var RunTime = Route.TravelTime.RunTime,
            StopTime = Route.TravelTime.StopTime;
        var startIndex = Route.Stations.indexOf(FirstStationID);
        var time = [],
            tmpA,
            nowSec = CM.transTime2Sec(FirstStationTime),
            countSec = 0;

        for (var i = startIndex; i < Stations.length; i++) {
          tmpA = nowSec + countSec;
          time.push(tmpA);

          if (i < Stations.length - 1) {
            nowSec = tmpA + RunTime[i];
            if (StopTime[i + 1]) nowSec += StopTime[i + 1];
          }
        }

        return time.map(function (c) {
          return CM.transSec2Time(c);
        });
      },
      getDataXLineObj: function getDataXLineObj(LineID) {
        return ptx.datax[compName].line.find(function (c) {
          return !!(c.LineID == LineID);
        });
      },
      getDataXLineMainSub: function getDataXLineMainSub(lineObj) {
        lineObj = (typeof line === "undefined" ? "undefined" : _typeof(line)) == 'object' ? lineObj : catchData.getDataXLineObj(lineObj);
        var main = [],
            sub = [];
        var aryRouteID = lineObj.Route.map(function (c) {
          return c.RouteID;
        }).filter(function (c, idx, arr) {
          return arr.indexOf(c) == idx;
        });

        if (lineObj.main) {
          main = lineObj.main;
          sub = aryRouteID.filter(function (c) {
            return main.indexOf(c) == -1;
          });
        } else {
          main = aryRouteID;
        }

        return {
          main: main,
          sub: sub
        };
      },
      getDataXRouteDirectionInfo: function getDataXRouteDirectionInfo(LineID, RouteID, Direction) {
        var lineObj = catchData.getDataXLineObj(LineID);
        return lineObj.Route.find(function (c) {
          return c.RouteID == RouteID && c.Direction == Direction;
        });
      },
      getDataXRouteMainTerminal: function getDataXRouteMainTerminal(LineID) {
        var lineObj = catchData.getDataXLineObj(LineID);
        var r = lineObj.Route[0].Stations;
        return [r[0], r[r.length - 1]];
      },
      getDataXStationData: function getDataXStationData(StationID) {
        return ptx.datax[compName].station.find(function (c) {
          return !!(c.StationID == StationID);
        });
      },
      getDataXStationName: function getDataXStationName(StationID, isEn) {
        var st = catchData.getDataXStationData(StationID);
        return isEn ? st.ename : st.name;
      },
      getStationByTimeSimpleArray: function getStationByTimeSimpleArray(StationID, ary) {
        return ary.find(function (c) {
          return c.StationID == StationID;
        });
      },
      Line: function Line(progressFn) {
        if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //路線包抓法 1.Line  2.合併路由和轉乘到 Line  3.合併站間距與班距到路由

        progressFn('取得路網中');
        var lineBackTag = catchData.config.Line_BackTag;

        var atLine = me._Line({
          selectField: lineBackTag
        }).then(function (res) {
          return promiseCatchLinePredo(res.data, lineBackTag);
        }).then(function (json) {
          //抓路由
          progressFn('取得各線路由中');
          var backTag = catchData.config.Line_StationOfRoute_BackTag;
          return me._StationOfRoute({
            selectField: backTag
          }).then(function (res) {
            //整理
            return promiseCatchLinePredo(res.data, backTag, function (rt) {
              rt.Stations = rt.Stations.map(function (st) {
                return st.StationID;
              });
              return rt;
            });
          }).then(function (data) {
            //合併
            return promiseCatchLineCombine(json, data, 'Route');
          }).catch(function () {
            return json;
          });
        }).then(function (json) {
          //抓轉乘
          progressFn('取得轉乘資訊中');
          var backTag = catchData.config.Line_LineTransfer_BackTag;
          return me._LineTransfer({
            selectField: backTag
          }).then(function (res) {
            //整理
            return promiseCatchLinePredo(res.data, backTag);
          }).then(function (data) {
            //合併
            return promiseCatchLineCombine(json, data, 'Transfer', 'FromLineID');
          }).catch(function () {
            return json;
          });
        }).then(function (json) {
          //抓站間距
          progressFn('取得站間距時間中');
          var backTag = catchData.config.Line_S2STravelTime_BackTag;
          return me._S2STravelTime({
            selectField: backTag
          }).then(function (res) {
            //整理
            return promiseCatchLinePredo(res.data, backTag, function (rt) {
              rt.TravelTimes = rt.TravelTimes.map(function (c, idx, arr) {
                var ret = {
                  FromTo: [c.FromStationID, c.ToStationID],
                  RunTime: c.RunTime
                };
                if (typeof c.StopTime != 'undefined') ret.StopTime = c.StopTime;
                return ret;
              });
              return rt;
            });
          }).then(function (data) {
            //合併
            return promiseCatchLineCombine(json, data, 'TravelTime');
          }).catch(function () {
            return json;
          });
        }).then(function (json) {
          //抓班距
          progressFn('取得班距中');
          var backTag = catchData.config.Line_Frequency_BackTag;
          return me._Frequency({
            selectField: backTag
          }).then(function (res) {
            //整理
            return promiseCatchLinePredo(res.data, backTag, function (rt) {
              rt.OperationTime = [rt.OperationTime.StartTime, rt.OperationTime.EndTime];
              rt.Headways = rt.Headways.map(function (c) {
                c.Time = [c.StartTime, c.EndTime];
                delete c.StartTime;
                delete c.EndTime;
                c.AveMins = Math.ceil((parseInt(c.MinHeadwayMins) + parseInt(c.MaxHeadwayMins)) / 2);
                return c;
              });
              var tmpSD = rt.ServiceDays;
              rt.ServiceDays = {
                ServiceTag: tmpSD.ServiceTag,
                NationalHolidays: tmpSD.NationalHolidays,
                week: [tmpSD.Sunday, tmpSD.Monday, tmpSD.Tuesday, tmpSD.Wednesday, tmpSD.Thursday, tmpSD.Friday, tmpSD.Saturday]
              };
              return rt;
            });
          }).then(function (data) {
            //合併
            return promiseCatchLineCombine(json, data, 'Frequency');
          }).catch(function () {
            return json;
          });
        }).then(function (json) {
          progressFn('整理輸出資料格式');
          return catchData.config.Line_callback_final(catchData.config.Line_callback(json));
        });

        return atLine;
      },
      Station: function Station(progressFn) {
        if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //車站包抓法  1.取得所有車站資料 2.合併首末班車

        progressFn('取得車站中');
        var stationBackTag = catchData.config.Station_BackTag;

        var atStation = me._Station({
          selectField: stationBackTag
        }).then(function (res) {
          return promiseCatchLinePredo(res.data, stationBackTag);
        }).then(function (json) {
          json.forEach(function (st, idx, arr) {
            if (st.StationPosition) {
              st.lat = st.StationPosition.PositionLat;
              st.lon = st.StationPosition.PositionLat;
              delete st.StationPosition;
            }

            st.name = st.StationName.Zh_tw;
            if (st.StationName.En) st.ename = st.StationName.En;
            delete st.StationName;
          });
          return json;
        }).then(function (json) {
          //抓首末班車
          progressFn('取得首末班車');
          var backTag = catchData.config.Station_FirstLastTimetable_BackTag;
          return me._FirstLastTimetable({
            selectField: backTag
          }).then(function (res) {
            //整理
            return promiseCatchLinePredo(res.data, backTag);
          }).then(function (data) {
            //合併
            var json2 = promiseCatchStationCombine(json, data, 'FirstLast', 'StationID', 'array', function (time) {
              var rtObj = {
                To: time.DestinationStaionID,
                Time: [time.FirstTrainTime, time.LastTrainTime]
              };
              if (typeof time.TrainType != 'undefined') rtObj.TrainType = time.TrainType;
              return rtObj;
            });
            return json2;
          }).catch(function () {
            return json;
          });
        });

        return atStation;
      },
      Fare: function Fare(progressFn) {
        if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //票價包抓法  1.抓所有 ODFare  2.整理輸出全票票價就好

        progressFn('取得車站中');
        var backTag = catchData.config.Station_Fare_BackTag;
        return me._ODFare({
          selectField: backTag
        }).then(function (res) {
          //整理
          return promiseCatchLinePredo(res.data, backTag);
        }).then(function (data) {
          //合併
          var json2 = {};
          data.forEach(function (st) {
            if (!json2[st.OriginStationID]) json2[st.OriginStationID] = {};
            var tmpA = st.Fares.find(function (fp) {
              return !!(fp.TicketType == 1 && fp.FareClass == 1);
            });
            if (tmpA) json2[st.OriginStationID][st.DestinationStationID] = tmpA.Price;
          });
          return json2;
        }).catch(function (res) {
          return res;
        });
      },
      TimeTable: function TimeTable(progressFn) {
        if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
        progressFn('取得車站中');
        var stationBackTag = ['StationID'];
        var aryTime = [];
        return me._Station({
          selectField: stationBackTag
        }).then(function (res) {
          return promiseCatchLinePredo(res.data, stationBackTag);
        }).then(function (json) {
          //依序將所有車站做成 Promise 抓資料，間隔 
          function makeCatchStation(StationID) {
            return function () {
              return new Promise(function (resolve) {
                setTimeout(resolve, 100);
              }).then(function () {
                progressFn('正在讀取 ' + StationID + ' 站的時刻表');
                return me.getStationTimeTable(StationID).then(function (objA) {
                  var rawTime = objA.data;
                  if (rawTime && rawTime.length > 0) aryTime.push(rawTime);
                  return rawTime;
                });
              });
            };
          }

          var aryStationFn = json.map(function (c) {
            return makeCatchStation(c.StationID);
          });
          return aryStationFn.reduce(function (cur, next) {
            return cur.then(next);
          }, Promise.resolve()).then(function () {
            return aryTime;
          });
        }).then(function (pp) {
          return pp;
        }).catch(function (res) {
          return res;
        });
      },
      TimeSimple: function TimeSimple(progressFn) {
        return catchData.TimeTable(progressFn).then(function (json) {
          progressFn('簡化輸出格式');
          json.forEach(function (station, idx, arr) {
            var rt = {};
            station.forEach(function (data, didx) {
              if (didx == 0) {
                rt.StationID = data.StationID;
                rt.LineID = data.LineID;
                rt.Direction = [[], []]; //Direction 0 與 1 直接分配到陣列的 0 跟 1
              }

              var weekStr = [data.ServiceDays.Sunday, data.ServiceDays.Monday, data.ServiceDays.Tuesday, data.ServiceDays.Wednesday, data.ServiceDays.Thursday, data.ServiceDays.Friday, data.ServiceDays.Saturday].map(function (day, idx) {
                return day ? idx.toString() : '';
              }).join('');
              var TrainType = undefined;
              var Timetables = data.Timetables.map(function (time) {
                if (time.TrainType) {
                  TrainType = time.TrainType;
                }
                return time.DepartureTime;
              });
              rt.Direction[data.Direction].push({
                To: data.DestinationStaionID,
                RouteID: data.RouteID,
                weekStr: weekStr,
                TrainType: TrainType,
                Timetables: Timetables
              });
            });
            arr[idx] = rt;
          });
          return json;
        });
      }
    };
    this.catchData = catchData;
    var methodList = Object.keys(this);
    this.methodList = methodList;
  };

  metro.baseMethod = baseMethod;

  var companyTag$1 = metro.getCompanyTag('trtc');
  var mrtPTXFn = new metro.baseMethod(companyTag$1);
  var catchData = mrtPTXFn.catchData; //Catch Data 資料預處理

  mrtPTXFn.catchData.config.Line_callback = function (json) {
    json.forEach(function (Line) {
      var TravelTime = Line.TravelTime,
          tmpA,
          tmpB,
          main = [];
      Line.Route.forEach(function (Route) {
        if (main.indexOf(Route.RouteID) == -1 && Route.RouteID != 'G-3' && Route.RouteID != 'R-3') main.push(Route.RouteID);
        tmpA = TravelTime.find(function (rr) {
          return !!(rr.RouteID == Route.RouteID);
        });
        var sameDir = !!(tmpA.TravelTimes[0].FromTo[0] == Route.Stations[0]);
        var RunTime = [],
            StopTime = [];

        for (var i = 0; i < Route.Stations.length; i++) {
          tmpB = tmpA.TravelTimes[i] || {
            RunTime: 0,
            StopTime: 0
          };
          RunTime.push(tmpB.RunTime);
          StopTime.push(tmpB.StopTime);
        }

        if (!sameDir) {
          //與 Route 同方向時，每一站同一 index , RunTime 儲存本站到下一站要開多久 , StopTime 儲存本站要停多久 ; 不同時反轉陣列，RunTime 位移一站再補終站 0
          RunTime.reverse().shift();
          RunTime.push(0);
          StopTime.reverse();
        }

        Route.TravelTime = {
          RunTime: RunTime,
          StopTime: StopTime
        };
      });
      delete Line.TravelTime;
      Line.main = main;
    });
    return json;
  };

  catchData.calcBRLineTime = function () {
    var RouteName = 'BR-1';
    var LineObj = catchData.getDataXLineObj('BR');

    var Route = [];
    Route.push(LineObj.Route.find(function (c) {
      return c.RouteID == RouteName && c.Direction == 0;
    }));
    Route.push(LineObj.Route.find(function (c) {
      return c.RouteID == RouteName && c.Direction == 1;
    })); //2.把起站依照間距排出全日時刻表 , 按照 Frequency 數量分出要建立幾組時刻表

    var startStationTime = [{
      StationID: Route[0].Stations[0],
      DepTime: catchData.calcStationTimeByHeadWays(LineObj, Route[0].Stations[0], RouteName, 0)
    }, {
      StationID: Route[1].Stations[0],
      DepTime: catchData.calcStationTimeByHeadWays(LineObj, Route[1].Stations[0], RouteName, 1)
    }]; //3.用 RunTime 與 StopTime 計算全線時刻表

    var tmpTrainTime = [];
    startStationTime.forEach(function (dirObj, Direction) {
      dirObj.DepTime.forEach(function (c) {
        c.trainTime = [];
        c.stationTime = [];
        c.time.forEach(function (t) {
          tmpTrainTime = catchData.calcLineTimeByFirstStation(LineObj, dirObj.StationID, t, RouteName, Direction);
          tmpTrainTime.forEach(function (stt, stidx) {
            c.stationTime[stidx] = c.stationTime[stidx] || [Route[Direction].Stations[stidx]];
            c.stationTime[stidx].push(stt);
          });
          c.trainTime.push(tmpTrainTime);
        });
      });
    }); //4.找沿線車站的首班發車時間，早於首站的第一班車且早超過班距最大值時補上該站起始的車到順位最前面，依序算到倒數第二站
    //先跳過
    //5.將時間轉化為 TimeSimple 格式

    var timeBack = Route[0].Stations.map(function (st) {
      return {
        Direction: [[], []],
        LineID: LineObj.LineID,
        StationID: st
      };
    });
    startStationTime.forEach(function (dirObj, dir) {
      dirObj.DepTime.forEach(function (c, cidx) {
        c.stationTime.forEach(function (stt, stidx) {
          var aryTimes = stt.map(function (m) {
            return m;
          });
          var targetStationID = aryTimes.shift();
          timeBack.find(function (st) {
            return targetStationID == st.StationID;
          }).Direction[dir].push({
            RouteID: RouteName,
            Timetables: aryTimes,
            To: c.stationTime[c.stationTime.length - 1][0],
            weekStr: c.weekStr
          });
        });
      });
    });
    return timeBack;
  };

  var fnMRT = {
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
  mrtPTXFn.methodList.forEach(function (k) {
    fnMRT[k] = mrtPTXFn[k];
  });

  var companyTag$2 = metro.getCompanyTag('krtc');
  var mrtPTXFn$1 = new metro.baseMethod(companyTag$2); //Catch Data 資料預處理

  mrtPTXFn$1.catchData.config.Line_callback = function (json) {
    json.forEach(function (Line) {
      var TravelTime = Line.TravelTime,
          tmpA,
          tmpB;
      Line.Route.forEach(function (Route) {
        tmpA = TravelTime.find(function (rr) {
          return !!(rr.RouteID == Route.RouteID);
        }); //高雄捷運 TravelTimes 有重複值要先濾除

        var alreadyWriteStation = [],
            aryTravelTimes = [];
        tmpA.TravelTimes.forEach(function (c, idx, arr) {
          if (alreadyWriteStation.indexOf(c.FromTo[0]) == -1) {
            if (c.FromTo[0] == 'R11' && alreadyWriteStation.indexOf('R10') == -1) {
              //PTX Bug : 高雄紅線 Travel Time 漏掉 R10 to R11 
              aryTravelTimes.push({
                RunTime: 180,
                StopTime: 40
              });
            }

            aryTravelTimes.push(c);
            alreadyWriteStation.push(c.FromTo[0]);
          }
        });
        var sameDir = !!(aryTravelTimes[0].FromTo[0] == Route.Stations[0]);
        var RunTime = [],
            StopTime = [];

        for (var i = 0; i < Route.Stations.length; i++) {
          tmpB = aryTravelTimes[i] || {
            RunTime: 0,
            StopTime: 0
          };
          RunTime.push(tmpB.RunTime);
          StopTime.push(tmpB.StopTime);
        }

        if (!sameDir) {
          //與 Route 同方向時，每一站同一 index , RunTime 儲存本站到下一站要開多久 , StopTime 儲存本站要停多久 ; 不同時反轉陣列，RunTime 位移一站再補終站 0
          RunTime.reverse().shift();
          RunTime.push(0);
          StopTime.reverse();
        }

        Route.TravelTime = {
          RunTime: RunTime,
          StopTime: StopTime
        };
      });
      delete Line.TravelTime;
    });
    return json;
  };

  var fnMRT$1 = {
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
      pData.krtc.line.forEach(function (c) {
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
      pData.krtc.line.forEach(function (c) {
        if (c.LineID == LineID) {
          rt = c;
        }
      });
      return rt;
    },
    getStationIDAry: function getStationIDAry(id) {
      var ary = pData.krtc.station_ary;
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
      var LineID = /^krtc/.test(lineOriginalID) ? this.getLineID(lineOriginalID) : lineOriginalID;
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
      var url = CM.metroURL + '/StationTimeTable/KRTC?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
      CM.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表'); //產生暫存時刻表空間

      if (!ptx.tempTimeTable.krtc) ptx.tempTimeTable.krtc = {};
      if (!ptx.tempTimeTable.krtc[LineID]) ptx.tempTimeTable.krtc[LineID] = [];
      if (!ptx.tempTimeTable.krtc[LineID][StationID]) ptx.tempTimeTable.krtc[LineID][StationID] = [];
      ptx.tempTimeTable.krtc[LineID][StationID][w] = [[], []]; //Direction 0 and 1
      //抓時刻表

      ptx.getURL(url, function (json, e) {
        if (e.status == CM.CONST_PTX_API_FAIL) {
          cbFn(json);
          return false;
        }

        json.forEach(function (routeA) {
          var tmpAry = ptx.tempTimeTable.krtc[LineID][StationID][w];
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
        var workAry = ptx.tempTimeTable.krtc[LineID][StationID][w];

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
      var StationID = ptx.krtc.getStationID(stID, line);
      var LineID = ptx.krtc.getLineID(line);
      if (!ptx.tempTimeTable.krtc) return false;
      if (!ptx.tempTimeTable.krtc[LineID]) return false;
      if (!ptx.tempTimeTable.krtc[LineID][StationID]) return false;
      if (!ptx.tempTimeTable.krtc[LineID][StationID][w]) return false;
      if (!ptx.tempTimeTable.krtc[LineID][StationID][w][dir]) return false;
      if (ptx.tempTimeTable.krtc[LineID][StationID][w][dir].length == 0) return false;
      return ptx.tempTimeTable.krtc[LineID][StationID][w][dir];
    },
    getOriginalStationID: function getOriginalStationID(StationID) {
      var ary = pData.krtc.station_ary;
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
  mrtPTXFn$1.methodList.forEach(function (k) {
    fnMRT$1[k] = mrtPTXFn$1[k];
  });

  var companyTag$3 = metro.getCompanyTag('tymetro');
  var mrtPTXFn$2 = new metro.baseMethod(companyTag$3); //修正桃園捷運的 function

  mrtPTXFn$2.catchData.config.Line_S2STravelTime_BackTag = ['LineID', 'RouteID', 'TrainType', 'LineNo', 'TravelTimes'];
  mrtPTXFn$2.catchData.config.Line_Frequency_BackTag = ['LineID', 'RouteID', 'TrainType', 'LineNo', 'ServiceDays', 'OperationTime', 'Headways'];
  mrtPTXFn$2.catchData.config.Station_FirstLastTimetable_BackTag = ['LineID', 'StationID', 'TrainType', 'DestinationStaionID', 'FirstTrainTime', 'LastTrainTime'];
  mrtPTXFn$2.catchData.config.Station_Fare_BackTag = ['OriginStationID', 'DestinationStationID', 'Fares', 'TrainType']; //Catch Data 資料預處理

  mrtPTXFn$2.catchData.config.Line_callback = function (json) {
    json.forEach(function (Line) {
      if (Line.LineID == 'A') {
        var TravelTime = Line.TravelTime;
        var TravelTimeTrainType1 = {},
            TravelTimeTrainType2 = {};
        TravelTime.forEach(function (TRTM, Tidx) {
          var objA = TRTM.TrainType == 1 ? TravelTimeTrainType1 : TravelTimeTrainType2;
          TRTM.TravelTimes.forEach(function (c) {
            if (!objA[c.FromTo[0]]) objA[c.FromTo[0]] = {};
            objA[c.FromTo[0]][c.FromTo[1]] = c.RunTime;
          });
          TravelTime[Tidx] = undefined;
        });
        Line.TravelTimeBetween = {
          "TrainType1": TravelTimeTrainType1,
          "TrainType2": TravelTimeTrainType2
        };
      }
    });
    return json;
  };

  var fnMRT$2 = {
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
      pData.tymetro.line.forEach(function (c) {
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
      pData.tymetro.line.forEach(function (c) {
        if (c.LineID == LineID) {
          rt = c;
        }
      });
      return rt;
    },
    getStationIDAry: function getStationIDAry(id) {
      var ary = pData.tymetro.station_ary;
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
      var LineID = /^tymetro/.test(lineOriginalID) ? this.getLineID(lineOriginalID) : lineOriginalID;
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
      var url = CM.metroURL + '/StationTimeTable/TYMC?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
      CM.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表'); //產生暫存時刻表空間

      if (!ptx.tempTimeTable.tymetro) ptx.tempTimeTable.tymetro = {};
      if (!ptx.tempTimeTable.tymetro[LineID]) ptx.tempTimeTable.tymetro[LineID] = [];
      if (!ptx.tempTimeTable.tymetro[LineID][StationID]) ptx.tempTimeTable.tymetro[LineID][StationID] = [];
      ptx.tempTimeTable.tymetro[LineID][StationID][w] = [[], []]; //Direction 0 and 1
      //抓時刻表

      ptx.getURL(url, function (json, e) {
        if (e.status == CM.CONST_PTX_API_FAIL) {
          cbFn(json);
          return false;
        }

        json.forEach(function (routeA) {
          var tmpAry = ptx.tempTimeTable.tymetro[LineID][StationID][w];
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
        var workAry = ptx.tempTimeTable.tymetro[LineID][StationID][w];

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
      var StationID = ptx.tymetro.getStationID(stID, line);
      var LineID = ptx.tymetro.getLineID(line);
      if (!ptx.tempTimeTable.tymetro) return false;
      if (!ptx.tempTimeTable.tymetro[LineID]) return false;
      if (!ptx.tempTimeTable.tymetro[LineID][StationID]) return false;
      if (!ptx.tempTimeTable.tymetro[LineID][StationID][w]) return false;
      if (!ptx.tempTimeTable.tymetro[LineID][StationID][w][dir]) return false;
      if (ptx.tempTimeTable.tymetro[LineID][StationID][w][dir].length == 0) return false;
      return ptx.tempTimeTable.tymetro[LineID][StationID][w][dir];
    },
    getOriginalStationID: function getOriginalStationID(StationID) {
      var ary = pData.tymetro.station_ary;
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
  mrtPTXFn$2.methodList.forEach(function (k) {
    fnMRT$2[k] = mrtPTXFn$2[k];
  });

  var companyTag$4 = metro.getCompanyTag('klrt');
  var mrtPTXFn$3 = new metro.baseMethod(companyTag$4);
  var fnMRT$3 = {
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
      pData.klrt.line.forEach(function (c) {
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
      pData.klrt.line.forEach(function (c) {
        if (c.LineID == LineID) {
          rt = c;
        }
      });
      return rt;
    },
    getStationIDAry: function getStationIDAry(id) {
      var ary = pData.klrt.station_ary;
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
      var LineID = /^klrt/.test(lineOriginalID) ? this.getLineID(lineOriginalID) : lineOriginalID;
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
      var url = CM.metroURL + '/StationTimeTable/KLRT?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
      CM.pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表'); //產生暫存時刻表空間

      if (!ptx.tempTimeTable.klrt) ptx.tempTimeTable.klrt = {};
      if (!ptx.tempTimeTable.klrt[LineID]) ptx.tempTimeTable.klrt[LineID] = [];
      if (!ptx.tempTimeTable.klrt[LineID][StationID]) ptx.tempTimeTable.klrt[LineID][StationID] = [];
      ptx.tempTimeTable.klrt[LineID][StationID][w] = [[], []]; //Direction 0 and 1
      //抓時刻表

      ptx.getURL(url, function (json, e) {
        if (e.status == CM.CONST_PTX_API_FAIL) {
          cbFn(json);
          return false;
        }

        json.forEach(function (routeA) {
          var tmpAry = ptx.tempTimeTable.klrt[LineID][StationID][w];
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
        var workAry = ptx.tempTimeTable.klrt[LineID][StationID][w];

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
      var StationID = ptx.klrt.getStationID(stID, line);
      var LineID = ptx.klrt.getLineID(line);
      if (!ptx.tempTimeTable.klrt) return false;
      if (!ptx.tempTimeTable.klrt[LineID]) return false;
      if (!ptx.tempTimeTable.klrt[LineID][StationID]) return false;
      if (!ptx.tempTimeTable.klrt[LineID][StationID][w]) return false;
      if (!ptx.tempTimeTable.klrt[LineID][StationID][w][dir]) return false;
      if (ptx.tempTimeTable.klrt[LineID][StationID][w][dir].length == 0) return false;
      return ptx.tempTimeTable.klrt[LineID][StationID][w][dir];
    },
    getOriginalStationID: function getOriginalStationID(StationID) {
      var ary = pData.klrt.station_ary;
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
  mrtPTXFn$3.methodList.forEach(function (k) {
    fnMRT$3[k] = mrtPTXFn$3[k];
  });

  var inBrowser = CM.inBrowser;
  var combine = {
    data: pData,
    datax: datax,
    bus: fnBUS,
    metro: metro,
    trtc: fnMRT,
    krtc: fnMRT$1,
    tymetro: fnMRT$2,
    klrt: fnMRT$3,
    jsSHA: jsSHA,
    common: CM
  };

  for (var k in combine) {
    ptx[k] = combine[k];
  }

  if (inBrowser) {
    if (!window.rocptx) window.rocptx = ptx;
    if (!window.$trainTaiwanLib) window.$trainTaiwanLib = {};
    if (!window.$trainTaiwanLib.ptx) window.$trainTaiwanLib.ptx = ptx;
    if (!window.Promise) console.log("PTX library need Promise, please include a Promise polyfill.");
  }

  return ptx;

}));
