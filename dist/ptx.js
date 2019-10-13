/*
*   name: rocptx 
*   description: Dynamic public traffic library of Taiwan and Kinmen, Lienchiang 
*   version: 0.0.4 
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
    assign: function assign(objA, objB) {
      for (var k in objB) {
        objA[k] = objB[k];
      }
      return objA;
    },
    assignIf: function assignIf(objA, objB) {
      for (var k in objB) {
        if (!objA[k]) {
          objA[k] = objB[k];
        }
      }
      return objA;
    },
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
    appendNumber0: function appendNumber0(str) {
      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      str = str.toString();

      if (str.length < len) {
        var pr = len - str.length;

        for (var i = 0; i < pr; i++) {
          str = '0' + str;
        }
      }

      return str;
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
    transSec2Time: function transSec2Time(sec, doNotTransOver24) {
      var tih = 0,
          tim = 0,
          tis = 0;

      if (sec === '') {
        return '';
      } else if (parseInt(sec, 10) < 0) {
        sec = 86400 + sec;
      } else if (parseInt(sec) >= 86400 && !doNotTransOver24) {
        sec = sec - 86400;
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
  CM.v3url = 'https://ptx.transportdata.tw/MOTC/v3';
  CM.ptxURL = CM.v2url;
  CM.ptxV3URL = CM.v3url;
  CM.metroURL = CM.ptxURL + '/Rail/Metro';
  CM.busURL = CM.ptxURL + '/Bus';
  CM.traURL = CM.ptxURL + '/Rail/TRA';
  CM.traV3URL = CM.ptxV3URL + '/Rail/TRA';
  CM.thsrV2URL = CM.ptxURL + '/Rail/THSR';
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
    spatialFilterFn: function spatialFilterFn(lat, lng) {
      var far = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
      var field = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'StationPosition';
      //預設對 PTX 找 200 公尺範圍的
      return encodeURI('$spatialFilter=nearby(' + field + ', ' + lat + ', ' + lng + ', ' + far + ')');
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
    sect_ary: ['pingdong', 'kaohsiung', 'tainan', 'chiayi', 'yunlin', 'changhua', 'taichung', 'miaoli', 'hsinchu', 'taoyuan', 'taipei', 'keelung', 'northeast', 'yilan', 'beihui', 'hualian', 'taidong'],
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
        StationID: ["BL23", "BR24"],
        name: "南港展覽館",
        estring: "nangangzhanlanguantaipeinangangexhibitioncenter"
      }, {
        id: "trtc_097",
        StationID: ["BL22"],
        name: "南港",
        estring: "nangang"
      }, {
        id: "trtc_096",
        StationID: ["BL21"],
        name: "昆陽",
        estring: "kunyang"
      }, {
        id: "trtc_095",
        StationID: ["BL20"],
        name: "後山埤",
        estring: "houshanpi"
      }, {
        id: "trtc_094",
        StationID: ["BL19"],
        name: "永春",
        estring: "yongchun"
      }, {
        id: "trtc_093",
        StationID: ["BL18"],
        name: "市政府",
        estring: "taipeicityhallshizhengfu"
      }, {
        id: "trtc_092",
        StationID: ["BL17"],
        name: "國父紀念館",
        estring: "sunyatsenmemorialhallguofujinianguan"
      }, {
        id: "trtc_091",
        StationID: ["BL16"],
        name: "忠孝敦化",
        estring: "zhongxiaodunhua"
      }, {
        id: "trtc_010",
        StationID: ["BL15", "BR10"],
        name: "忠孝復興",
        estring: "zhongxiaofuxing"
      }, {
        id: "trtc_089",
        StationID: ["BL14", "O07"],
        name: "忠孝新生",
        estring: "zhongxiaoxinsheng"
      }, {
        id: "trtc_088",
        StationID: ["BL13"],
        name: "善導寺",
        estring: "shandaosishandaotemple"
      }, {
        id: "trtc_086",
        StationID: ["BL11", "G12"],
        name: "西門",
        estring: "ximen"
      }, {
        id: "trtc_085",
        StationID: ["BL10"],
        name: "龍山寺",
        estring: "longshansilongshantemple"
      }, {
        id: "trtc_084",
        StationID: ["BL09"],
        name: "江子翠",
        estring: "jiangzicui"
      }, {
        id: "trtc_083",
        StationID: ["BL08"],
        name: "新埔",
        estring: "xinpu"
      }, {
        id: "trtc_082",
        StationID: ["BL07"],
        name: "板橋",
        estring: "banqiao"
      }, {
        id: "trtc_081",
        StationID: ["BL06"],
        name: "府中",
        estring: "fuzhong"
      }, {
        id: "trtc_080",
        StationID: ["BL05"],
        name: "亞東醫院",
        estring: "yadongyiyuanfareasternhospital"
      }, {
        id: "trtc_079",
        StationID: ["BL04"],
        name: "海山",
        estring: "haishan"
      }, {
        id: "trtc_078",
        StationID: ["BL03"],
        name: "土城",
        estring: "tucheng"
      }, {
        id: "trtc_077",
        StationID: ["BL02"],
        name: "永寧",
        estring: "yongning"
      }, {
        id: "trtc_076",
        StationID: ["BL01"],
        name: "頂埔",
        estring: "dingpu"
      }, //TamsuiXinyi Line
      {
        id: "trtc_071",
        StationID: ["R28"],
        name: "淡水",
        estring: "danshuitamsui"
      }, {
        id: "trtc_070",
        StationID: ["R27"],
        name: "紅樹林",
        estring: "hongshulin"
      }, {
        id: "trtc_069",
        StationID: ["R26"],
        name: "竹圍",
        estring: "zhuwei"
      }, {
        id: "trtc_068",
        StationID: ["R25"],
        name: "關渡",
        estring: "guandu"
      }, {
        id: "trtc_067",
        StationID: ["R24"],
        name: "忠義",
        estring: "zhongyi"
      }, {
        id: "trtc_066",
        StationID: ["R23"],
        name: "復興崗",
        estring: "fuxinggang"
      }, {
        id: "trtc_064",
        StationID: ["R22"],
        name: "北投",
        estring: "beitou"
      }, {
        id: "trtc_063",
        StationID: ["R21"],
        name: "奇岩",
        estring: "qiyan"
      }, {
        id: "trtc_062",
        StationID: ["R20"],
        name: "唭哩岸",
        estring: "qilian"
      }, {
        id: "trtc_061",
        StationID: ["R19"],
        name: "石牌",
        estring: "shipai"
      }, {
        id: "trtc_060",
        StationID: ["R18"],
        name: "明德",
        estring: "mingde"
      }, {
        id: "trtc_059",
        StationID: ["R17"],
        name: "芝山",
        estring: "zhishan"
      }, {
        id: "trtc_058",
        StationID: ["R16"],
        name: "士林",
        estring: "shilin"
      }, {
        id: "trtc_057",
        StationID: ["R15"],
        name: "劍潭",
        estring: "jiantan"
      }, {
        id: "trtc_056",
        StationID: ["R14"],
        name: "圓山",
        estring: "yuanshan"
      }, {
        id: "trtc_055",
        StationID: ["R13", "O11"],
        name: "民權西路",
        estring: "mingquanwrdmingquanxilu"
      }, {
        id: "trtc_054",
        StationID: ["R12"],
        name: "雙連",
        estring: "shuanglian"
      }, {
        id: "trtc_053",
        StationID: ["R11", "G14"],
        name: "中山",
        estring: "zhongshan"
      }, {
        id: "trtc_051",
        StationID: ["R10", "BL12"],
        name: "台北車站",
        estring: "taipeichezhantaipeimainstation"
      }, {
        id: "trtc_050",
        StationID: ["R09"],
        name: "台大醫院",
        estring: "taidayiyuanntuhospital"
      }, {
        id: "trtc_134",
        StationID: ["R07", "O06"],
        name: "東門",
        estring: "dongmen"
      }, {
        id: "trtc_103",
        StationID: ["R06"],
        name: "大安森林公園",
        estring: "daanparkdaansenlingongyuan"
      }, {
        id: "trtc_011",
        StationID: ["R05", "BR09"],
        name: "大安",
        estring: "daan"
      }, {
        id: "trtc_101",
        StationID: ["R04"],
        name: "信義安和",
        estring: "xinyianhe"
      }, {
        id: "trtc_100",
        StationID: ["R03"],
        name: "台北101/世貿",
        estring: "taipei101worldtradecentertaipei101shimao"
      }, {
        id: "trtc_099",
        StationID: ["R02"],
        name: "象山",
        estring: "xiangshan"
      }, //ZhongHeXinLu Line
      {
        id: "trtc_048",
        StationID: ["O01"],
        name: "南勢角",
        estring: "nanshijiao"
      }, {
        id: "trtc_047",
        StationID: ["O02"],
        name: "景安",
        estring: "jingan"
      }, {
        id: "trtc_046",
        StationID: ["O03"],
        name: "永安市場",
        estring: "yonganshichangyonganmarket"
      }, {
        id: "trtc_045",
        StationID: ["O04"],
        name: "頂溪",
        estring: "dingxi"
      }, {
        id: "trtc_131",
        StationID: ["O09"],
        name: "行天宮",
        estring: "xingtiantemplexingtiangong"
      }, {
        id: "trtc_130",
        StationID: ["O10"],
        name: "中山國小",
        estring: "zhongshanguoxiaozhongshanelementaryschool"
      }, {
        id: "trtc_128",
        StationID: ["O12"],
        name: "大橋頭",
        estring: "daqiaotou"
      }, {
        id: "trtc_127",
        StationID: ["O13"],
        name: "台北橋",
        estring: "taibeiqiaotaipeibridge"
      }, {
        id: "trtc_126",
        StationID: ["O14"],
        name: "菜寮",
        estring: "cailiao"
      }, {
        id: "trtc_125",
        StationID: ["O15"],
        name: "三重",
        estring: "sanchong"
      }, {
        id: "trtc_124",
        StationID: ["O16"],
        name: "先嗇宮",
        estring: "xiansetemplexiansegong"
      }, {
        id: "trtc_123",
        StationID: ["O17"],
        name: "頭前庄",
        estring: "touqianzhuang"
      }, {
        id: "trtc_122",
        StationID: ["O18"],
        name: "新莊",
        estring: "xinzhuang"
      }, {
        id: "trtc_121",
        StationID: ["O19"],
        name: "輔大",
        estring: "fudafujenuniversity"
      }, {
        id: "trtc_180",
        StationID: ["O20"],
        name: "丹鳳",
        estring: "danfeng"
      }, {
        id: "trtc_179",
        StationID: ["O21"],
        name: "迴龍",
        estring: "huilong"
      }, {
        id: "trtc_178",
        StationID: ["O50"],
        name: "三重國小",
        estring: "sanchongguoxiaosanchongelementaryschool"
      }, {
        id: "trtc_177",
        StationID: ["O51"],
        name: "三和國中",
        estring: "sanheguozhongsanhejuniorhighschool"
      }, {
        id: "trtc_176",
        StationID: ["O52"],
        name: "徐匯中學",
        estring: "xuhuizhongxuestignatiushighschool"
      }, {
        id: "trtc_175",
        StationID: ["O53"],
        name: "三民高中",
        estring: "sanmingaozhongsanminseniorhighschool"
      }, {
        id: "trtc_174",
        StationID: ["O54"],
        name: "蘆洲",
        estring: "luzhou"
      }, //SongShanXinDian Line
      {
        id: "trtc_111",
        StationID: ["G19"],
        name: "松山",
        estring: "songshan"
      }, {
        id: "trtc_110",
        StationID: ["G18"],
        name: "南京三民",
        estring: "nanjingsanmin"
      }, {
        id: "trtc_109",
        StationID: ["G17"],
        name: "台北小巨蛋",
        estring: "taipeiarenataibeixiaojudan"
      }, {
        id: "trtc_009",
        StationID: ["G16", "BR11"],
        name: "南京復興",
        estring: "nanjingfuxing"
      }, {
        id: "trtc_132",
        StationID: ["G15", "O08"],
        name: "松江南京",
        estring: "songjiangnanjing"
      }, {
        id: "trtc_105",
        StationID: ["G13"],
        name: "北門",
        estring: "beimen"
      }, {
        id: "trtc_043",
        StationID: ["G11"],
        name: "小南門",
        estring: "xiaonanmen"
      }, {
        id: "trtc_042",
        StationID: ["G10", "R08"],
        name: "中正紀念堂",
        estring: "zhongzhengjiniantangchiangkaishekmemorialhall"
      }, {
        id: "trtc_041",
        StationID: ["G09", "O05"],
        name: "古亭",
        estring: "guting"
      }, {
        id: "trtc_040",
        StationID: ["G08"],
        name: "台電大樓",
        estring: "taidiandaloutaipowerbuilding"
      }, {
        id: "trtc_039",
        StationID: ["G07"],
        name: "公館",
        estring: "gongguan"
      }, {
        id: "trtc_038",
        StationID: ["G06"],
        name: "萬隆",
        estring: "wanlong"
      }, {
        id: "trtc_037",
        StationID: ["G05"],
        name: "景美",
        estring: "jingmei"
      }, {
        id: "trtc_036",
        StationID: ["G04"],
        name: "大坪林",
        estring: "dapinglin"
      }, {
        id: "trtc_035",
        StationID: ["G03"],
        name: "七張",
        estring: "qizhang"
      }, {
        id: "trtc_034",
        StationID: ["G02"],
        name: "新店區公所",
        estring: "xindiandistrictofficexindianqugongsuo"
      }, {
        id: "trtc_033",
        StationID: ["G01"],
        name: "新店",
        estring: "xindian"
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
        }],
        name: "淡水信義線(2)",
        color: "#cb2c30",
        dir: "1",
        outArea: [{
          dir: "1",
          station: "trtc_071~trtc_066",
          transAt: "trtc_064",
          waitingNextMinute: 4
        }, {
          dir: "1",
          station: "trtc_101~trtc_099",
          transAt: "trtc_011",
          waitingNextMinute: 4
        }],
        station: ["trtc_071", "trtc_070", "trtc_069", "trtc_068", "trtc_067", "trtc_066", "trtc_064", "trtc_063", "trtc_062", "trtc_061", "trtc_060", "trtc_059", "trtc_058", "trtc_057", "trtc_056", "trtc_055", "trtc_054", "trtc_053", "trtc_051", "trtc_050", "trtc_042", "trtc_134", "trtc_103", "trtc_011", "trtc_101", "trtc_100", "trtc_099"]
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
        }],
        name: "松山新店線(3)",
        color: "#007749",
        dir: "1",
        outArea: [{
          dir: "1",
          station: "trtc_039~trtc_033",
          transAt: "trtc_040",
          waitingNextMinute: 4
        }],
        station: ["trtc_111", "trtc_110", "trtc_109", "trtc_009", "trtc_132", "trtc_053", "trtc_105", "trtc_086", "trtc_043", "trtc_042", "trtc_041", "trtc_040", "trtc_039", "trtc_038", "trtc_037", "trtc_036", "trtc_035", "trtc_034", "trtc_033"]
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
        }],
        name: "中和新蘆線(4)",
        color: "#ffa300",
        dir: "0",
        splitStation: ['trtc_128'],
        outArea: [{
          dir: "0",
          station: "trtc_127~trtc_179",
          transAt: "trtc_128",
          isSubLine: true,
          waitingNextMinute: 4
        }, {
          dir: "0",
          station: "trtc_178~trtc_174",
          transAt: "trtc_128",
          isSubLine: true,
          waitingNextMinute: 4
        }],
        station: ["trtc_048", "trtc_047", "trtc_046", "trtc_045", "trtc_041", "trtc_134", "trtc_089", "trtc_132", "trtc_131", "trtc_130", "trtc_055", "trtc_128", "trtc_127", "trtc_126", "trtc_125", "trtc_124", "trtc_123", "trtc_122", "trtc_121", "trtc_180", "trtc_179", "trtc_178", "trtc_177", "trtc_176", "trtc_175", "trtc_174"]
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
        }],
        name: "板南線(5)",
        color: "#005eb8",
        dir: "1",
        outArea: [{
          dir: "1",
          station: "trtc_079~trtc_076",
          transAt: "trtc_080",
          waitingNextMinute: 4
        }],
        station: ["trtc_031", "trtc_097", "trtc_096", "trtc_095", "trtc_094", "trtc_093", "trtc_092", "trtc_091", "trtc_010", "trtc_089", "trtc_088", "trtc_051", "trtc_086", "trtc_085", "trtc_084", "trtc_083", "trtc_082", "trtc_081", "trtc_080", "trtc_079", "trtc_078", "trtc_077", "trtc_076"]
      }]
    },
    tymetro: {
      defined: {
        "CarClass": [{
          "id": "directly",
          "name": "直達車",
          "ename": "Express",
          "color": "#A1A"
        }, {
          "id": "normal",
          "name": "普通車",
          "ename": "Local",
          "color": "#33F"
        }]
      },
      sect_ary: ['taoyuan', 'taipei'],
      station_ary: [//Airport Line
      {
        id: "tymetro_a01",
        StationID: ["A1"],
        name: "臺北車站",
        estring: "taipeichezhantaipeimainstation",
        sect: 'taipei',
        big: 'd'
      }, {
        id: "tymetro_a02",
        StationID: ["A2"],
        name: "三重",
        estring: "sanchong",
        sect: 'taipei'
      }, {
        id: "tymetro_a03",
        StationID: ["A3"],
        name: "新北產業園區",
        estring: "xinbeichanyeyuanqui",
        sect: 'taipei',
        big: 'd'
      }, {
        id: "tymetro_a04",
        StationID: ["A4"],
        name: "新莊副都心",
        estring: "xinzhungfuduxin",
        sect: 'taipei'
      }, {
        id: "tymetro_a05",
        StationID: ["A5"],
        name: "泰山",
        estring: "taishan",
        sect: 'taipei'
      }, {
        id: "tymetro_a06",
        StationID: ["A6"],
        name: "泰山貴和",
        estring: "taishanguehe",
        sect: 'taipei'
      }, {
        id: "tymetro_a07",
        StationID: ["A7"],
        name: "體育大學",
        estring: "tiyvdaxue",
        sect: 'taipei'
      }, {
        id: "tymetro_a08",
        StationID: ["A8"],
        name: "長庚醫院",
        estring: "changgengyiyuan",
        sect: 'taoyuan',
        big: 'd'
      }, {
        id: "tymetro_a09",
        StationID: ["A9"],
        name: "林口",
        estring: "linkou",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a10",
        StationID: ["A10"],
        name: "山鼻",
        estring: "shanbi",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a11",
        StationID: ["A11"],
        name: "坑口",
        estring: "kengkou",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a12",
        StationID: ["A12"],
        name: "機場第一航廈",
        estring: "terminal1",
        sect: 'taoyuan',
        big: 'd'
      }, {
        id: "tymetro_a13",
        StationID: ["A13"],
        name: "機場第二航廈",
        estring: "terminal2",
        sect: 'taoyuan',
        big: 'd'
      }, {
        id: "tymetro_a14a",
        StationID: ["A14a"],
        name: "機場旅館",
        estring: "airporthotel",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a15",
        StationID: ["A15"],
        name: "大園",
        estring: "dayuan",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a16",
        StationID: ["A16"],
        name: "橫山",
        estring: "hengshan",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a17",
        StationID: ["A17"],
        name: "領航",
        estring: "linghang",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a18",
        StationID: ["A18"],
        name: "高鐵桃園站",
        estring: "gaotietaoyuanzhan",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a19",
        StationID: ["A19"],
        name: "桃園體育園區",
        estring: "taoyuantiyuyuanqui",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a20",
        StationID: ["A20"],
        name: "興南",
        estring: "xingnan",
        sect: 'taoyuan'
      }, {
        id: "tymetro_a21",
        StationID: ["A21"],
        name: "環北",
        estring: "huanbei",
        sect: 'taoyuan'
      }],
      line: [{
        id: "tymetro_1",
        LineID: "A",
        name: "機場捷運",
        trainSect: ["taipei", "taoyuan"],
        color: "#8e47ad",
        dir: "1",
        station: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14a", "A15", "A16", "A17", "A18", "A19", "A20", "A21"]
      }]
    },
    thsr: {
      station_ary: [{
        id: 'thsr_0990',
        StationID: ['0990'],
        name: '南港',
        estring: 'nangang',
        sect: 'taipei'
      }, {
        id: 'thsr_1000',
        StationID: ['1000'],
        name: '台北',
        estring: 'taipeitaibei',
        sect: 'taipei'
      }, {
        id: 'thsr_1010',
        StationID: ['1010'],
        name: '板橋',
        estring: 'banqiaobanciao',
        sect: 'taipei'
      }, {
        id: 'thsr_1020',
        StationID: ['1020'],
        name: '桃園',
        estring: 'taoyuan',
        sect: 'taoyuan'
      }, {
        id: 'thsr_1030',
        StationID: ['1030'],
        name: '新竹',
        estring: 'hsinchuxinzhu',
        sect: 'hsinchu'
      }, {
        id: 'thsr_1035',
        StationID: ['1035'],
        name: '苗栗',
        estring: 'miaoli',
        sect: 'miaoli'
      }, {
        id: 'thsr_1040',
        StationID: ['1040'],
        name: '台中',
        estring: 'taizhongtaichung',
        sect: 'taichung'
      }, {
        id: 'thsr_1043',
        StationID: ['1043'],
        name: '彰化',
        estring: 'zhanghuachanghua',
        sect: 'changhua'
      }, {
        id: 'thsr_1047',
        StationID: ['1047'],
        name: '雲林',
        estring: 'yunlin',
        sect: 'yunlin'
      }, {
        id: 'thsr_1050',
        StationID: ['1050'],
        name: '嘉義',
        estring: 'jiayichiayi',
        sect: 'chiayi'
      }, {
        id: 'thsr_1060',
        StationID: ['1060'],
        name: '台南',
        estring: 'tainan',
        sect: 'tainan'
      }, {
        id: 'thsr_1070',
        StationID: ['1070'],
        name: '左營',
        estring: 'zouying',
        sect: 'kaohsiung'
      }]
    },
    tra: {
      "CarClass": [{
        "id": "1100",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "1101",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "1102",
        "code": 1,
        "name": "太魯閣號",
        "ename": "Tze-Chiang Limited Express(Tarko)",
        "color": "#FD8A10"
      }, {
        "id": "1103",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "1106",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "1107",
        "code": 2,
        "name": "普悠瑪號",
        "ename": "Tze-Chiang Limited Express(Puyuma)",
        "color": "#ff0030"
      }, {
        "id": "1108",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "1109",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "110A",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "110B",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "110C",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "110D",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "110E",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "110F",
        "code": 3,
        "name": "自強號",
        "ename": "Tze-Chiang Limited Express",
        "color": "#fd7a10"
      }, {
        "id": "1110",
        "code": 4,
        "name": "莒光號",
        "ename": "Chu-Kuang Express",
        "color": "#ff1070"
      }, {
        "id": "1111",
        "code": 4,
        "name": "莒光號",
        "ename": "Chu-Kuang Express",
        "color": "#ff1070"
      }, {
        "id": "1114",
        "code": 4,
        "name": "莒光號",
        "ename": "Chu-Kuang Express",
        "color": "#ff1070"
      }, {
        "id": "1115",
        "code": 4,
        "name": "莒光號",
        "ename": "Chu-Kuang Express",
        "color": "#ff1070"
      }, {
        "id": "1120",
        "code": 5,
        "name": "復興號",
        "ename": "Fu-Hsing Semi Express",
        "color": "#32CFBC"
      }, {
        "id": "1130",
        "code": 6,
        "name": "電車號",
        "ename": "Electric Multiple Unit"
      }, {
        "id": "1131",
        "code": 6,
        "name": "區間車",
        "ename": "Local Train",
        "color": "#0D46A2"
      }, {
        "id": "1132",
        "code": 6,
        "name": "區間快",
        "ename": "Fast Local Train",
        "color": "#32CFBC"
      }, {
        "id": "1140",
        "code": 7,
        "name": "普快車",
        "ename": "Ordinary train"
      }, {
        "id": "1141",
        "code": 7,
        "name": "柴快車",
        "ename": "Disel Rail Car"
      }, {
        "id": "1150",
        "code": 7,
        "name": "柴油車",
        "ename": "na"
      }],
      station_ary: [//big: e for big station of east(dongbu), w for big station of west(xibu), s for south link(nanhuei)
      {
        id: "tra_1001",
        v3id: "0900",
        name: "基隆",
        estring: "keelung",
        sect: "keelung"
      }, {
        id: "tra_1029",
        v3id: "0910",
        name: "三坑",
        estring: "sankeng",
        sect: "keelung"
      }, {
        id: "tra_1002",
        v3id: "0920",
        name: "八堵",
        estring: "badu",
        sect: "keelung",
        big: 'e'
      }, {
        id: "tra_1003",
        v3id: "0930",
        name: "七堵",
        estring: "qidu",
        sect: "keelung",
        big: 'ew'
      }, {
        id: "tra_1030",
        v3id: "0940",
        name: "百福",
        estring: "baifu",
        sect: "keelung"
      }, {
        id: "tra_1004",
        v3id: "0950",
        name: "五堵",
        estring: "wudu",
        sect: "taipei"
      }, {
        id: "tra_1005",
        v3id: "0960",
        name: "汐止",
        estring: "xizhisijhih",
        sect: "taipei"
      }, {
        id: "tra_1031",
        v3id: "0970",
        name: "汐科",
        estring: "xikesike",
        sect: "taipei"
      }, {
        id: "tra_1006",
        v3id: "0980",
        name: "南港",
        estring: "nangang",
        sect: "taipei"
      }, {
        id: "tra_1007",
        v3id: "0990",
        name: "松山",
        estring: "songshan",
        sect: "taipei",
        big: 'ew',
        bigMaster: true
      }, {
        id: "tra_1008",
        v3id: "1000",
        name: "台北",
        estring: "taipeitaibei",
        sect: "taipei",
        big: 'ew',
        bigMaster: true
      }, {
        id: "tra_1009",
        v3id: "1010",
        name: "萬華",
        estring: "wanhua",
        sect: "taipei"
      }, {
        id: "tra_1011",
        v3id: "1020",
        name: "板橋",
        estring: "banqiao",
        sect: "taipei",
        big: 'ew',
        bigMaster: true
      }, {
        id: "tra_1032",
        v3id: "1030",
        name: "浮洲",
        estring: "fuzhou",
        sect: "taipei"
      }, {
        id: "tra_1012",
        v3id: "1040",
        name: "樹林",
        estring: "shulin",
        sect: "taipei",
        big: 'e'
      }, {
        id: "tra_1034",
        v3id: "1050",
        name: "南樹林",
        estring: "nanshulin",
        sect: "taipei"
      }, {
        id: "tra_1013",
        v3id: "1060",
        name: "山佳",
        estring: "shanjia",
        sect: "taipei"
      }, {
        id: "tra_1014",
        v3id: "1070",
        name: "鶯歌",
        estring: "yingge",
        sect: "taipei"
      }, {
        id: "tra_1015",
        v3id: "1080",
        name: "桃園",
        estring: "taoyuan",
        sect: "taoyuan",
        big: 'w'
      }, {
        id: "tra_1016",
        v3id: "1090",
        name: "內壢",
        estring: "neili",
        sect: "taoyuan"
      }, {
        id: "tra_1017",
        v3id: "1100",
        name: "中壢",
        estring: "zhongli",
        sect: "taoyuan",
        big: 'w'
      }, {
        id: "tra_1018",
        v3id: "1110",
        name: "埔心",
        estring: "puxin",
        sect: "taoyuan"
      }, {
        id: "tra_1019",
        v3id: "1120",
        name: "楊梅",
        estring: "yangmei",
        sect: "taoyuan"
      }, {
        id: "tra_1020",
        v3id: "1130",
        name: "富岡",
        estring: "fugan",
        sect: "taoyuan"
      }, {
        id: "tra_1036",
        v3id: "1140",
        name: "新富",
        estring: "xinfu",
        sect: "taoyuan"
      }, {
        id: "tra_1033",
        v3id: "1150",
        name: "北湖",
        estring: "beihu",
        sect: "hsinchu"
      }, {
        id: "tra_1021",
        v3id: "1160",
        name: "湖口",
        estring: "hukou",
        sect: "hsinchu"
      }, {
        id: "tra_1022",
        v3id: "1170",
        name: "新豐",
        estring: "xinfeng",
        sect: "hsinchu"
      }, {
        id: "tra_1023",
        v3id: "1180",
        name: "竹北",
        estring: "zhubei",
        sect: "hsinchu"
      }, {
        id: "tra_1024",
        v3id: "1190",
        name: "北新竹",
        estring: "northhsinchubeixinzhu",
        sect: "hsinchu"
      }, {
        id: "tra_1025",
        v3id: "1210",
        name: "新竹",
        estring: "hsinchuxinzhu",
        sect: "hsinchu",
        big: 'w'
      }, {
        id: "tra_1035",
        v3id: "1220",
        name: "三姓橋",
        estring: "sanxingqiao",
        sect: "hsinchu"
      }, {
        id: "tra_1026",
        v3id: "1230",
        name: "香山",
        estring: "xiangshan",
        sect: "hsinchu"
      }, {
        id: "tra_1027",
        v3id: "1240",
        name: "崎頂",
        estring: "jidingciding",
        sect: "hsinchu"
      }, {
        id: "tra_1028",
        v3id: "1250",
        name: "竹南",
        estring: "zhunan",
        sect: "hsinchu",
        big: 'w'
      }, {
        id: "tra_1302",
        v3id: "3140",
        name: "造橋",
        estring: "zaoqiao",
        sect: "miaoli"
      }, {
        id: "tra_1304",
        v3id: "3150",
        name: "豐富",
        estring: "fengfu",
        sect: "miaoli"
      }, {
        id: "tra_1305",
        v3id: "3160",
        name: "苗栗",
        estring: "miaoli",
        sect: "miaoli",
        big: 'w'
      }, {
        id: "tra_1307",
        v3id: "3170",
        name: "南勢",
        estring: "nanshi",
        sect: "miaoli"
      }, {
        id: "tra_1308",
        v3id: "3180",
        name: "銅鑼",
        estring: "tongluo",
        sect: "miaoli"
      }, {
        id: "tra_1310",
        v3id: "3190",
        name: "三義",
        estring: "sanyi",
        sect: "miaoli"
      }, {
        id: "tra_1314",
        v3id: "3210",
        name: "泰安",
        estring: "taian",
        sect: "miaoli"
      }, {
        id: "tra_1315",
        v3id: "3220",
        name: "后里",
        estring: "houli",
        sect: "taichung"
      }, {
        id: "tra_1317",
        v3id: "3230",
        name: "豐原",
        estring: "fengyuan",
        sect: "taichung",
        big: 'w'
      }, {
        id: "tra_1325",
        v3id: "3240",
        name: "栗林",
        estring: "lilin",
        sect: "taichung"
      }, {
        id: "tra_1318",
        v3id: "3250",
        name: "潭子",
        estring: "tanzi",
        sect: "taichung"
      }, {
        id: "tra_1326",
        v3id: "3260",
        name: "頭家厝",
        estring: "toujiacuo",
        sect: "taichung"
      }, {
        id: "tra_1327",
        v3id: "3270",
        name: "松竹",
        estring: "toujiacuo",
        sect: "songzhu"
      }, {
        id: "tra_1323",
        v3id: "3280",
        name: "太原",
        estring: "taiyuan",
        sect: "taichung"
      }, {
        id: "tra_1328",
        v3id: "3290",
        name: "精武",
        estring: "jingwu",
        sect: "taichung"
      }, {
        id: "tra_1319",
        v3id: "3300",
        name: "台中",
        estring: "taizhongtaichung",
        sect: "taichung",
        big: 'w'
      }, {
        id: "tra_1329",
        v3id: "3310",
        name: "五權",
        estring: "wuquan",
        sect: "taichung"
      }, {
        id: "tra_1322",
        v3id: "3320",
        name: "大慶",
        estring: "daqing",
        sect: "taichung"
      }, {
        id: "tra_1320",
        v3id: "3330",
        name: "烏日",
        estring: "wuri",
        sect: "taichung"
      }, {
        id: "tra_1324",
        v3id: "3340",
        name: "新烏日",
        estring: "xinwuri",
        sect: "taichung"
      }, {
        id: "tra_1321",
        v3id: "3350",
        name: "成功",
        estring: "chenggong",
        sect: "taichung"
      }, {
        id: "tra_1120",
        v3id: "3360",
        name: "彰化",
        estring: "zhanghuachanghua",
        sect: "changhua",
        big: 'w'
      }, {
        id: "tra_1202",
        v3id: "3370",
        name: "花壇",
        estring: "huatan",
        sect: "changhua"
      }, {
        id: "tra_1240",
        v3id: "3380",
        name: "大村",
        estring: "dacundatsun",
        sect: "changhua"
      }, {
        id: "tra_1203",
        v3id: "3390",
        name: "員林",
        estring: "yuanlin",
        sect: "changhua",
        big: 'w'
      }, {
        id: "tra_1204",
        v3id: "3400",
        name: "永靖",
        estring: "yongjing",
        sect: "changhua"
      }, {
        id: "tra_1205",
        v3id: "3410",
        name: "社頭",
        estring: "shetou",
        sect: "changhua"
      }, {
        id: "tra_1206",
        v3id: "3420",
        name: "田中",
        estring: "tianzhong",
        sect: "changhua"
      }, {
        id: "tra_1207",
        v3id: "3430",
        name: "二水",
        estring: "ershuei",
        sect: "changhua"
      }, {
        id: "tra_1208",
        v3id: "3450",
        name: "林內",
        estring: "linnei",
        sect: "yunlin"
      }, {
        id: "tra_1209",
        v3id: "3460",
        name: "石榴",
        estring: "shilioushihliou",
        sect: "yunlin"
      }, {
        id: "tra_1210",
        v3id: "3470",
        name: "斗六",
        estring: "douliou",
        sect: "yunlin",
        big: 'w'
      }, {
        id: "tra_1211",
        v3id: "3480",
        name: "斗南",
        estring: "dounan",
        sect: "yunlin"
      }, {
        id: "tra_1212",
        v3id: "3490",
        name: "石龜",
        estring: "shigueishihguei",
        sect: "yunlin"
      }, {
        id: "tra_1213",
        v3id: "4050",
        name: "大林",
        estring: "dalin",
        sect: "yunlin"
      }, {
        id: "tra_1214",
        v3id: "4060",
        name: "民雄",
        estring: "minxiong",
        sect: "chiayi"
      }, {
        id: "tra_1241",
        v3id: "4070",
        name: "嘉北",
        estring: "jiabei",
        sect: "chiayi"
      }, {
        id: "tra_1215",
        v3id: "4080",
        name: "嘉義",
        estring: "jiayichiayi",
        sect: "chiayi",
        big: 'w'
      }, {
        id: "tra_1217",
        v3id: "4090",
        name: "水上",
        estring: "shueishang",
        sect: "chiayi"
      }, {
        id: "tra_1218",
        v3id: "4100",
        name: "南靖",
        estring: "nanjing",
        sect: "chiayi"
      }, {
        id: "tra_1219",
        v3id: "4110",
        name: "後壁",
        estring: "houbi",
        sect: "tainan"
      }, {
        id: "tra_1220",
        v3id: "4120",
        name: "新營",
        estring: "xinyingsinying",
        sect: "tainan",
        big: 'w'
      }, {
        id: "tra_1221",
        v3id: "4130",
        name: "柳營",
        estring: "liouying",
        sect: "tainan"
      }, {
        id: "tra_1222",
        v3id: "4140",
        name: "林鳳營",
        estring: "linfengyinglinfongying",
        sect: "tainan"
      }, {
        id: "tra_1223",
        v3id: "4150",
        name: "隆田",
        estring: "longtian",
        sect: "tainan"
      }, {
        id: "tra_1224",
        v3id: "4160",
        name: "拔林",
        estring: "balin",
        sect: "tainan"
      }, {
        id: "tra_1225",
        v3id: "4170",
        name: "善化",
        estring: "shanghua",
        sect: "tainan"
      }, {
        id: "tra_1244",
        v3id: "4180",
        name: "南科",
        estring: "nanke",
        sect: "tainan"
      }, {
        id: "tra_1226",
        v3id: "4190",
        name: "新市",
        estring: "xinshisinshih",
        sect: "tainan"
      }, {
        id: "tra_1227",
        v3id: "4200",
        name: "永康",
        estring: "yungkangyongkang",
        sect: "tainan"
      }, {
        id: "tra_1239",
        v3id: "4210",
        name: "大橋",
        estring: "daqiaodaciao",
        sect: "tainan"
      }, {
        id: "tra_1228",
        v3id: "4220",
        name: "台南",
        estring: "tainan",
        sect: "tainan",
        big: 'w'
      }, {
        id: "tra_1229",
        v3id: "4250",
        name: "保安",
        estring: "baoan",
        sect: "tainan"
      }, {
        id: "tra_1243",
        v3id: "4260",
        name: "仁德",
        estring: "rende",
        sect: "tainan"
      }, {
        id: "tra_1230",
        v3id: "4270",
        name: "中州",
        estring: "zhongzhoujhongjhou",
        sect: "tainan"
      }, {
        id: "tra_1231",
        v3id: "4290",
        name: "大湖",
        estring: "dahu",
        sect: "kaohsiung"
      }, {
        id: "tra_1232",
        v3id: "4300",
        name: "路竹",
        estring: "luzhulujhu",
        sect: "kaohsiung"
      }, {
        id: "tra_1233",
        v3id: "4310",
        name: "岡山",
        estring: "ganshan",
        sect: "kaohsiung",
        big: 'w'
      }, {
        id: "tra_1234",
        v3id: "4320",
        name: "橋頭",
        estring: "qiaotou",
        sect: "kaohsiung"
      }, {
        id: "tra_1235",
        v3id: "4330",
        name: "楠梓",
        estring: "nanzi",
        sect: "kaohsiung"
      }, {
        id: "tra_1242",
        v3id: "4340",
        name: "新左營",
        estring: "xingzouying",
        sect: "kaohsiung",
        big: 's'
      }, {
        id: "tra_1236",
        v3id: "4350",
        name: "左營",
        estring: "zouying",
        sect: "kaohsiung"
      }, {
        id: "tra_1245",
        v3id: "4360",
        name: "內惟",
        estring: "neiwei",
        sect: "kaohsiung"
      }, {
        id: "tra_1246",
        v3id: "4370",
        name: "美術館",
        estring: "meishuguanmuseumoffinearts",
        sect: "kaohsiung"
      }, {
        id: "tra_1237",
        v3id: "4380",
        name: "鼓山",
        estring: "gushan",
        sect: "kaohsiung"
      }, {
        id: "tra_1247",
        v3id: "4390",
        name: "三塊厝",
        estring: "sankuaicuo",
        sect: "kaohsiung"
      }, {
        id: "tra_1238",
        v3id: "4400",
        name: "高雄",
        estring: "kaohsiunggaoxung",
        sect: "kaohsiung",
        big: 'ws'
      }, {
        id: "tra_1419",
        v3id: "4410",
        name: "民族",
        estring: "mingzhu",
        sect: "kaohsiung"
      }, {
        id: "tra_1420",
        v3id: "4420",
        name: "科工館",
        estring: "kegongguanscienceandtecnologymuseum",
        sect: "kaohsiung"
      }, {
        id: "tra_1421",
        v3id: "4430",
        name: "正義",
        estring: "zhengyi",
        sect: "kaohsiung"
      }, {
        id: "tra_1402",
        v3id: "4440",
        name: "鳳山",
        estring: "fongshanfengshan",
        sect: "kaohsiung"
      }, {
        id: "tra_1403",
        v3id: "4450",
        name: "後庄",
        sect: "kaohsiung"
      }, {
        id: "tra_1404",
        v3id: "4460",
        name: "九曲堂",
        sect: "kaohsiung"
      }, {
        id: "tra_1405",
        v3id: "4470",
        name: "六塊厝",
        sect: "pingdong"
      }, {
        id: "tra_1406",
        v3id: "5000",
        name: "屏東",
        estring: "pingtungpingdong",
        sect: "pingdong",
        big: 'ws',
        noShow: true
      }, {
        id: "tra_1407",
        v3id: "5010",
        name: "歸來",
        sect: "pingdong"
      }, {
        id: "tra_1408",
        v3id: "5020",
        name: "麟洛",
        sect: "pingdong"
      }, {
        id: "tra_1409",
        v3id: "5030",
        name: "西勢",
        sect: "pingdong"
      }, {
        id: "tra_1410",
        v3id: "5040",
        name: "竹田",
        sect: "pingdong"
      }, {
        id: "tra_1411",
        v3id: "5050",
        name: "潮州",
        estring: "chaozhouchaojhou",
        sect: "pingdong",
        big: 'ws',
        noShow: true
      }, {
        id: "tra_1412",
        v3id: "5060",
        name: "崁頂",
        sect: "pingdong"
      }, {
        id: "tra_1413",
        v3id: "5070",
        name: "南州",
        sect: "pingdong"
      }, {
        id: "tra_1414",
        v3id: "5080",
        name: "鎮安",
        sect: "pingdong"
      }, {
        id: "tra_1415",
        v3id: "5090",
        name: "林邊",
        sect: "pingdong"
      }, {
        id: "tra_1416",
        v3id: "5100",
        name: "佳冬",
        sect: "pingdong"
      }, {
        id: "tra_1417",
        v3id: "5110",
        name: "東海",
        sect: "pingdong"
      }, {
        id: "tra_1418",
        v3id: "5120",
        name: "枋寮",
        sect: "pingdong"
      }, {
        id: "tra_1802",
        v3id: "7390",
        name: "暖暖",
        estring: "nuannuan",
        sect: "northeast"
      }, {
        id: "tra_1803",
        v3id: "7380",
        name: "四腳亭",
        estring: "sijiaoting",
        sect: "northeast"
      }, {
        id: "tra_1804",
        v3id: "7360",
        name: "瑞芳",
        estring: "ruifang",
        sect: "northeast",
        big: 'e'
      }, {
        id: "tra_1805",
        v3id: "7350",
        name: "猴硐",
        estring: "houdong",
        sect: "northeast"
      }, {
        id: "tra_1806",
        v3id: "7330",
        name: "三貂嶺",
        estring: "sandiaoling",
        sect: "northeast"
      }, {
        id: "tra_1807",
        v3id: "7320",
        name: "牡丹",
        estring: "mudan",
        sect: "northeast"
      }, {
        id: "tra_1808",
        v3id: "7310",
        name: "雙溪",
        estring: "shuangxi",
        sect: "northeast"
      }, {
        id: "tra_1809",
        v3id: "7300",
        name: "貢寮",
        estring: "gongliao",
        sect: "northeast"
      }, {
        id: "tra_1810",
        v3id: "7290",
        name: "福隆",
        estring: "fulong",
        sect: "northeast"
      }, {
        id: "tra_1811",
        v3id: "7280",
        name: "石城",
        estring: "shicheng",
        sect: "yilan"
      }, {
        id: "tra_1812",
        v3id: "7270",
        name: "大里",
        estring: "dali",
        sect: "yilan"
      }, {
        id: "tra_1813",
        v3id: "7260",
        name: "大溪",
        estring: "daxidasi",
        sect: "yilan"
      }, {
        id: "tra_1814",
        v3id: "7250",
        name: "龜山",
        estring: "gueishan",
        sect: "yilan"
      }, {
        id: "tra_1815",
        v3id: "7240",
        name: "外澳",
        estring: "waiao",
        sect: "yilan"
      }, {
        id: "tra_1816",
        v3id: "7230",
        name: "頭城",
        estring: "toucheng",
        sect: "yilan",
        big: 'e'
      }, {
        id: "tra_1817",
        v3id: "7220",
        name: "頂埔",
        estring: "dingpu",
        sect: "yilan"
      }, {
        id: "tra_1818",
        v3id: "7210",
        name: "礁溪",
        estring: "jiaoxijiaohsi",
        sect: "yilan"
      }, {
        id: "tra_1819",
        v3id: "7200",
        name: "四城",
        estring: "sicheng",
        sect: "yilan"
      }, {
        id: "tra_1820",
        v3id: "7190",
        name: "宜蘭",
        estring: "yilan",
        sect: "yilan",
        big: 'e'
      }, {
        id: "tra_1821",
        v3id: "7180",
        name: "二結",
        estring: "erjie",
        sect: "yilan"
      }, {
        id: "tra_1822",
        v3id: "7170",
        name: "中里",
        estring: "zhongli",
        sect: "yilan"
      }, {
        id: "tra_1823",
        v3id: "7160",
        name: "羅東",
        estring: "luodong",
        sect: "yilan",
        big: 'e'
      }, {
        id: "tra_1824",
        v3id: "7150",
        name: "冬山",
        estring: "dongshan",
        sect: "yilan"
      }, {
        id: "tra_1825",
        v3id: "7140",
        name: "新馬",
        estring: "xinmasinma",
        sect: "yilan"
      }, {
        id: "tra_1826",
        v3id: "7130",
        name: "蘇澳新",
        estring: "suaoxinsuaosin",
        sect: "yilan",
        big: 'e'
      }, {
        id: "tra_1827",
        v3id: "7120",
        name: "蘇澳",
        estring: "suao",
        sect: "yilan"
      }, {
        id: "tra_1703",
        v3id: "7110",
        name: "永樂",
        estring: "yongle",
        sect: "beihui"
      }, {
        id: "tra_1704",
        v3id: "7100",
        name: "東澳",
        estring: "dongao",
        sect: "beihui"
      }, {
        id: "tra_1705",
        v3id: "7090",
        name: "南澳",
        estring: "nanao",
        sect: "beihui",
        big: 'e'
      }, {
        id: "tra_1706",
        v3id: "7080",
        name: "武塔",
        estring: "wuta",
        sect: "beihui"
      }, {
        id: "tra_1708",
        v3id: "7070",
        name: "漢本",
        estring: "hanben",
        sect: "beihui"
      }, {
        id: "tra_1709",
        v3id: "7060",
        name: "和平",
        estring: "heping",
        sect: "beihui"
      }, {
        id: "tra_1710",
        v3id: "7050",
        name: "和仁",
        estring: "heren",
        sect: "beihui"
      }, {
        id: "tra_1711",
        v3id: "7040",
        name: "崇德",
        estring: "chongde",
        sect: "hualian"
      }, {
        id: "tra_1712",
        v3id: "7030",
        name: "新城",
        estring: "xinchengsincheng",
        sect: "hualian"
      }, {
        id: "tra_1713",
        v3id: "7020",
        name: "景美",
        estring: "jingmei",
        sect: "hualian"
      }, {
        id: "tra_1714",
        v3id: "7010",
        name: "北埔",
        estring: "beipu",
        sect: "hualian"
      }, {
        id: "tra_1715",
        v3id: "7000",
        name: "花蓮",
        estring: "hualienhualian",
        sect: "hualian",
        big: 'e'
      }, //sect:hualian
      {
        id: "tra_1602",
        v3id: "6250",
        name: "吉安",
        estring: "jian",
        sect: "hualian"
      }, {
        id: "tra_1604",
        v3id: "6240",
        name: "志學",
        estring: "zhixue",
        sect: "hualian"
      }, {
        id: "tra_1605",
        v3id: "6230",
        name: "平和",
        estring: "pinghe",
        sect: "hualian"
      }, {
        id: "tra_1606",
        v3id: "6220",
        name: "壽豐",
        estring: "shoufeng",
        sect: "hualian"
      }, {
        id: "tra_1607",
        v3id: "6210",
        name: "豐田",
        estring: "fengtian",
        sect: "hualian"
      }, {
        id: "tra_1608",
        v3id: "6200",
        name: "林榮新光",
        estring: "lingrongzinguanglingrongshinkong",
        sect: "hualian"
      }, {
        id: "tra_1609",
        v3id: "6190",
        name: "南平",
        estring: "nanping",
        sect: "hualian"
      }, {
        id: "tra_1610",
        v3id: "6180",
        name: "鳳林",
        estring: "fenglinfonglin",
        sect: "hualian"
      }, {
        id: "tra_1611",
        v3id: "6170",
        name: "萬榮",
        estring: "wanrong",
        sect: "hualian"
      }, {
        id: "tra_1612",
        v3id: "6160",
        name: "光復",
        estring: "guangfu",
        sect: "hualian"
      }, {
        id: "tra_1613",
        v3id: "6150",
        name: "大富",
        estring: "dafu",
        sect: "hualian"
      }, {
        id: "tra_1614",
        v3id: "6140",
        name: "富源",
        estring: "fuyuan",
        sect: "hualian"
      }, {
        id: "tra_1616",
        v3id: "6130",
        name: "瑞穗",
        estring: "ruisui",
        sect: "hualian"
      }, {
        id: "tra_1617",
        v3id: "6120",
        name: "三民",
        estring: "sanmin",
        sect: "hualian"
      }, {
        id: "tra_1619",
        v3id: "6110",
        name: "玉里",
        estring: "yuli",
        sect: "hualian",
        big: 'e'
      }, {
        id: "tra_1621",
        v3id: "6100",
        name: "東里",
        estring: "dongli",
        sect: "hualian"
      }, {
        id: "tra_1622",
        v3id: "6090",
        name: "東竹",
        estring: "dongzhu",
        sect: "hualian"
      }, {
        id: "tra_1623",
        v3id: "6080",
        name: "富里",
        estring: "fuli",
        sect: "hualian"
      }, {
        id: "tra_1624",
        v3id: "6070",
        name: "池上",
        estring: "chishang",
        sect: "taidong"
      }, {
        id: "tra_1625",
        v3id: "6060",
        name: "海端",
        estring: "haiduan",
        sect: "taidong"
      }, {
        id: "tra_1626",
        v3id: "6050",
        name: "關山",
        estring: "guanshan",
        sect: "taidong"
      }, {
        id: "tra_1628",
        v3id: "6040",
        name: "瑞和",
        estring: "ruihe",
        sect: "taidong"
      }, {
        id: "tra_1629",
        v3id: "6030",
        name: "瑞源",
        estring: "ruiyuan",
        sect: "taidong"
      }, {
        id: "tra_1630",
        v3id: "6020",
        name: "鹿野",
        estring: "luye",
        sect: "taidong"
      }, {
        id: "tra_1631",
        v3id: "6010",
        name: "山里",
        estring: "shanli",
        sect: "taidong"
      }, {
        id: "tra_1632",
        v3id: "6000",
        name: "台東",
        estring: "taitungtaidong",
        sect: "taidong",
        big: 'es'
      }, //海線及南迴線臨時資料
      {
        id: "tra_1102",
        v3id: "2110",
        name: "談文",
        sect: "miaoli"
      }, {
        id: "tra_1104",
        v3id: "2120",
        name: "大山",
        sect: "miaoli"
      }, {
        id: "tra_1105",
        v3id: "2130",
        name: "後龍",
        sect: "miaoli"
      }, {
        id: "tra_1106",
        v3id: "2140",
        name: "龍港",
        sect: "miaoli"
      }, {
        id: "tra_1107",
        v3id: "2150",
        name: "白沙屯",
        sect: "miaoli"
      }, {
        id: "tra_1108",
        v3id: "2160",
        name: "新埔",
        sect: "miaoli"
      }, {
        id: "tra_1109",
        v3id: "2170",
        name: "通霄",
        sect: "miaoli"
      }, {
        id: "tra_1110",
        v3id: "2180",
        name: "苑裡",
        sect: "miaoli"
      }, {
        id: "tra_1111",
        v3id: "2190",
        name: "日南",
        sect: "taichung"
      }, {
        id: "tra_1112",
        v3id: "2200",
        name: "大甲",
        sect: "taichung"
      }, {
        id: "tra_1113",
        v3id: "2210",
        name: "臺中港",
        sect: "taichung"
      }, {
        id: "tra_1114",
        v3id: "2220",
        name: "清水",
        sect: "taichung"
      }, {
        id: "tra_1115",
        v3id: "2230",
        name: "沙鹿",
        sect: "taichung"
      }, {
        id: "tra_1116",
        v3id: "2240",
        name: "龍井",
        sect: "taichung"
      }, {
        id: "tra_1117",
        v3id: "2250",
        name: "大肚",
        sect: "taichung"
      }, {
        id: "tra_1118",
        v3id: "2260",
        name: "追分",
        sect: "taichung"
      }, {
        id: "tra_1502",
        v3id: "5130",
        name: "加祿",
        sect: "pingdong"
      }, {
        id: "tra_1503",
        v3id: "5140",
        name: "內獅",
        sect: "pingdong"
      }, {
        id: "tra_1504",
        v3id: "5160",
        name: "枋山",
        sect: "pingdong"
      }, {
        id: "tra_1507",
        v3id: "5180",
        name: "古莊",
        sect: "taidong"
      }, {
        id: "tra_1508",
        v3id: "5190",
        name: "大武",
        sect: "taidong"
      }, {
        id: "tra_1510",
        v3id: "5200",
        name: "瀧溪",
        sect: "taidong"
      }, {
        id: "tra_1512",
        v3id: "5210",
        name: "金崙",
        sect: "taidong"
      }, {
        id: "tra_1514",
        v3id: "5220",
        name: "太麻里",
        sect: "taidong"
      }, {
        id: "tra_1516",
        v3id: "5230",
        name: "知本",
        sect: "taidong"
      }, {
        id: "tra_1517",
        v3id: "5240",
        name: "康樂",
        sect: "taidong"
      }, //海線及南迴線臨時資料
      {
        id: "tra_2003",
        v3id: "7362",
        name: "八斗子",
        estring: "badouzi",
        sect: "northeast"
      }, {
        id: "tra_6103",
        v3id: "7361",
        name: "海科館",
        estring: "haikeguan",
        sect: "northeast"
      }, {
        id: "tra_1903",
        v3id: "7331",
        name: "大華",
        estring: "dahua",
        sect: "northeast"
      }, {
        id: "tra_1904",
        v3id: "7332",
        name: "十分",
        estring: "shifenshihfen",
        sect: "northeast"
      }, {
        id: "tra_1905",
        v3id: "7333",
        name: "望古",
        estring: "wanggu",
        sect: "northeast"
      }, {
        id: "tra_1906",
        v3id: "7334",
        name: "嶺腳",
        estring: "lingjiao",
        sect: "northeast"
      }, {
        id: "tra_1907",
        v3id: "7335",
        name: "平溪",
        estring: "pingxipingsi",
        sect: "northeast"
      }, {
        id: "tra_1908",
        v3id: "7336",
        name: "菁桐",
        estring: "jingtong",
        sect: "northeast"
      }, {
        id: "tra_2212",
        v3id: "1191",
        name: "千甲",
        estring: "qianjia",
        sect: "hsinchu"
      }, {
        id: "tra_2213",
        v3id: "1192",
        name: "新莊",
        estring: "xinzhuang",
        sect: "hsinchu"
      }, {
        id: "tra_2203",
        v3id: "1193",
        name: "竹中",
        estring: "zhuzhong",
        sect: "hsinchu"
      }, {
        id: "tra_2214",
        v3id: "1194",
        name: "六家",
        estring: "liujia",
        sect: "hsinchu"
      }, {
        id: "tra_2204",
        v3id: "1201",
        name: "上員",
        estring: "shangyuan",
        sect: "hsinchu"
      }, {
        id: "tra_2211",
        v3id: "1202",
        name: "榮華",
        estring: "ronghua",
        sect: "hsinchu"
      }, {
        id: "tra_2205",
        v3id: "1203",
        name: "竹東",
        estring: "zhudong",
        sect: "hsinchu"
      }, {
        id: "tra_2206",
        v3id: "1204",
        name: "橫山",
        estring: "zhuzhong",
        sect: "hsinchu"
      }, {
        id: "tra_2207",
        v3id: "1205",
        name: "九讚頭",
        estring: "jiouzantou",
        sect: "hsinchu"
      }, {
        id: "tra_2208",
        v3id: "1206",
        name: "合興",
        estring: "hexinghesing",
        sect: "hsinchu"
      }, {
        id: "tra_2209",
        v3id: "1207",
        name: "富貴",
        estring: "fuguei",
        sect: "hsinchu"
      }, {
        id: "tra_2210",
        v3id: "1208",
        name: "內灣",
        estring: "neiwan",
        sect: "hsinchu"
      }, {
        id: "tra_2702",
        v3id: "3431",
        name: "源泉",
        estring: "yuanciyuanyuanquan",
        sect: "changhua"
      }, {
        id: "tra_2703",
        v3id: "3432",
        name: "濁水",
        estring: "zhuoshuijhoushuei",
        sect: "changhua"
      }, {
        id: "tra_2704",
        v3id: "3433",
        name: "龍泉",
        estring: "longquanlungcyuan",
        sect: "changhua"
      }, {
        id: "tra_2705",
        v3id: "3434",
        name: "集集",
        estring: "jiji",
        sect: "changhua"
      }, {
        id: "tra_2706",
        v3id: "3435",
        name: "水里",
        estring: "shuilishueili",
        sect: "changhua"
      }, {
        id: "tra_2707",
        v3id: "3436",
        name: "車埕",
        estring: "checheng",
        sect: "changhua"
      }, {
        id: "tra_5101",
        v3id: "4271",
        name: "長榮大學",
        estring: "changrongdaxuechangjungchristianuniversity",
        sect: "tainan"
      }, {
        id: "tra_5102",
        v3id: "4272",
        name: "沙崙",
        estring: "shalun",
        sect: "tainan"
      }],
      line: [{
        v2LineID: 'TL-N',
        v3LineID: 'WL',
        id: "tra_xibu",
        name: "西部幹線(基隆-竹南)",
        trainSect: ["keelung", "taipei", "taoyuan", "hsinchu"],
        color: "#000050",
        dir: "1",
        area: 'w',
        link: {
          "tra_yilan": {
            station: "tra_1002",
            dir: "0"
          },
          "tra_shan": {
            station: "tra_1028",
            dir: "1"
          },
          "tra_hai": {
            station: "tra_1028",
            dir: "1"
          },
          "tra_liujia": {
            station: "tra_1025",
            dir: "0"
          }
        },
        station: ["tra_1001", "tra_1029", "tra_1002", "tra_1003", "tra_1030", "tra_1004", "tra_1005", "tra_1031", "tra_1006", "tra_1007", "tra_1008", "tra_1009", "tra_1011", "tra_1032", "tra_1012", "tra_1034", "tra_1013", "tra_1014", //taipei
        "tra_1015", "tra_1016", "tra_1017", "tra_1018", "tra_1019", "tra_1020", "tra_1036", "tra_1033", "tra_1021", "tra_1022", "tra_1023", "tra_1024", "tra_1025", "tra_1035", "tra_1026", "tra_1027", "tra_1028"]
      }, {
        v2LineID: 'TL-M',
        v3LineID: 'WL',
        id: "tra_shan",
        name: "山線(竹南-彰化)",
        trainSect: ["hsinchu", "miaoli", "taichung", "changhua"],
        color: "#104020",
        dir: "1",
        area: 'w',
        link: {
          "tra_xibu": {
            station: "tra_1028",
            dir: "0"
          },
          "tra_zhjy": {
            station: "tra_1120",
            dir: "1"
          }
        },
        station: ["tra_1028", "tra_1302", "tra_1304", "tra_1305", "tra_1307", "tra_1308", "tra_1310", "tra_1314", "tra_1315", "tra_1317", "tra_1325", "tra_1318", "tra_1326", "tra_1327", "tra_1323", "tra_1328", "tra_1319", "tra_1329", "tra_1322", "tra_1320", "tra_1324", "tra_1321", "tra_1120"]
      }, {
        v2LineID: 'TL-S',
        v3LineID: 'WL',
        id: "tra_zhjy",
        name: "西部幹線(彰化-嘉義)",
        trainSect: ["changhua", "yunlin", "chiayi"],
        color: "#707010",
        dir: "1",
        area: 'w',
        link: {
          "tra_shan": {
            station: "tra_1120",
            dir: "0"
          },
          "tra_hai": {
            station: "tra_1120",
            dir: "0"
          },
          "tra_jiji": {
            station: "tra_1207",
            dir: "1"
          },
          "tra_jygx": {
            station: "tra_1215",
            dir: "1"
          }
        },
        station: ["tra_1120", "tra_1202", "tra_1240", "tra_1203", "tra_1204", "tra_1205", "tra_1206", "tra_1207", "tra_1208", "tra_1209", "tra_1210", "tra_1211", "tra_1212", "tra_1213", "tra_1214", "tra_1241", "tra_1215"]
      }, {
        v2LineID: 'TL-S',
        v3LineID: 'WL',
        id: "tra_jygx",
        name: "西部幹線(嘉義-高雄)",
        trainSect: ["chiayi", "tainan", "kaohsiung"],
        color: "#302040",
        dir: "1",
        area: 'w',
        link: {
          "tra_zhjy": {
            station: "tra_1215",
            dir: "0"
          },
          "tra_pingdong": {
            station: "tra_1238",
            dir: "1"
          },
          "tra_shalun": {
            station: "tra_1230",
            dir: "1"
          }
        },
        station: ["tra_1215", "tra_1217", "tra_1218", "tra_1219", "tra_1220", "tra_1221", "tra_1222", "tra_1223", "tra_1224", "tra_1225", "tra_1244", "tra_1226", "tra_1227", "tra_1239", "tra_1228", "tra_1229", "tra_1243", "tra_1230", "tra_1231", "tra_1232", "tra_1233", "tra_1234", "tra_1235", "tra_1242", "tra_1236", "tra_1245", "tra_1246", "tra_1237", "tra_1247", "tra_1238"]
      }, {
        v2LineID: 'PL',
        v3LineID: 'WL|SL',
        id: "tra_pingdong",
        name: "屏東線",
        trainSect: ["kaohsiung", "pingdong"],
        color: "#7D3810",
        dir: "1",
        area: 'w',
        innerNeedTransAt: 'tra_1411',
        link: {
          "tra_jygx": {
            station: "tra_1238",
            dir: "0"
          }
        },
        station: ["tra_1238", "tra_1419", "tra_1420", "tra_1421", "tra_1402", "tra_1403", "tra_1404", "tra_1405", "tra_1406", "tra_1407", "tra_1408", "tra_1409", "tra_1410", "tra_1411", "tra_1412", "tra_1413", "tra_1414", "tra_1415", "tra_1416", "tra_1417", "tra_1418"]
      }, {
        v2LineID: 'YL',
        v3LineID: 'EL|SU',
        id: "tra_yilan",
        name: "宜蘭線",
        trainSect: ["taipei", "keelung", "northeast", "yilan"],
        color: "#500000",
        dir: "0",
        area: 'e',
        link: {
          "tra_xibu": {
            station: "tra_1002",
            dir: "1"
          },
          "tra_beihui": {
            station: "tra_1826",
            dir: "0"
          },
          "tra_pingxi": {
            station: "tra_1804",
            dir: "0"
          }
        },
        //commonCrossLineStation: ["tra_1012","tra_1032","tra_1011","tra_1009","tra_1008","tra_1007","tra_1006","tra_1031","tra_1005","tra_1004","tra_1030","tra_1003"],
        station: ["tra_1002", "tra_1802", "tra_1803", "tra_1804", "tra_1805", "tra_1806", "tra_1807", "tra_1808", "tra_1809", "tra_1810", //taipei
        "tra_1811", "tra_1812", "tra_1813", "tra_1814", "tra_1815", "tra_1816", "tra_1817", "tra_1818", "tra_1819", "tra_1820", "tra_1821", "tra_1822", "tra_1823", "tra_1824", "tra_1825", "tra_1826", "tra_1827"]
      }, {
        v2LineID: 'NL',
        v3LineID: 'EL',
        id: "tra_beihui",
        name: "北迴線(蘇澳-花蓮)",
        trainSect: ["taipei", "keelung", "northeast", "yilan", "beihui", "hualian"],
        color: "#004060",
        dir: "0",
        area: 'e',
        link: {
          "tra_yilan": {
            station: "tra_1826",
            dir: "1"
          },
          "tra_huadong": {
            station: "tra_1715",
            dir: "0"
          }
        },
        station: ["tra_1826", "tra_1703", "tra_1704", "tra_1705", "tra_1706", "tra_1708", "tra_1709", "tra_1710", "tra_1711", "tra_1712", "tra_1713", "tra_1714", "tra_1715"]
      }, {
        v2LineID: 'TT',
        v3LineID: 'EL',
        id: "tra_huadong",
        name: "台東線",
        trainSect: ["taipei", "keelung", "northeast", "yilan", "beihui", "hualian", "taidong"],
        color: "#605040",
        dir: "0",
        area: 'e',
        link: {
          "tra_beihui": {
            station: "tra_1715",
            dir: "1"
          }
        },
        station: ["tra_1715", "tra_1602", "tra_1604", "tra_1605", "tra_1606", "tra_1607", "tra_1608", "tra_1609", "tra_1610", "tra_1611", "tra_1612", "tra_1613", "tra_1614", "tra_1616", "tra_1617", "tra_1619", "tra_1621", "tra_1622", "tra_1623", "tra_1624", "tra_1625", "tra_1626", "tra_1628", "tra_1629", "tra_1630", "tra_1631", "tra_1632"]
      }, {
        v2LineID: 'TL-C',
        v3LineID: 'WL-C',
        id: "tra_hai",
        name: "海線",
        trainSect: ["miaoli", "taichung"],
        color: "#2050C0",
        dir: "1",
        area: 'w',
        link: {
          "tra_xibu": {
            station: "tra_1028",
            dir: "0"
          },
          "tra_zhjy": {
            station: "tra_1120",
            dir: "1"
          }
        },
        station: ["tra_1028", "tra_1102", "tra_1104", "tra_1105", "tra_1106", "tra_1107", "tra_1108", "tra_1109", "tra_1110", "tra_1111", "tra_1112", "tra_1113", "tra_1114", "tra_1115", "tra_1116", "tra_1117", "tra_1118", "tra_1120"]
      }, {
        v2LineID: 'PX|SA',
        v3LineID: 'PX|SA',
        id: "tra_pingxi",
        name: "平溪線",
        trainSect: ["northeast"],
        color: "#003030",
        dir: "0",
        area: 'e',
        protectStation: ["tra_1804"],
        link: {
          "tra_yilan": {
            station: "tra_1804",
            dir: "1"
          }
        },
        station: ["tra_2003", "tra_6103", "tra_1804", "tra_1805", "tra_1806", "tra_1903", "tra_1904", "tra_1905", "tra_1906", "tra_1907", "tra_1908"]
      }, {
        v2LineID: 'NW|LJ',
        v3LineID: 'NW|LJ',
        id: "tra_liujia",
        name: "內灣／六家線",
        trainSect: ["hsinchu"],
        color: "#403090",
        dir: "0",
        area: 'w',
        protectStation: ["tra_1024", "tra_1025"],
        protectStationSect: {
          "tra_1024": "taoyuan,hsinchu"
        },
        subWorkingArea: {
          transAt: "tra_2203",
          transStationID: "zhuzhongtra1",
          station: ["tra_2204", "tra_2211", "tra_2205", "tra_2206", "tra_2207", "tra_2208", "tra_2209", "tra_2210"]
        },
        link: {
          "tra_xibu": {
            station: "tra_1025",
            dir: "1"
          }
        },
        station: ["tra_1025", "tra_1024", "tra_2212", "tra_2213", "tra_2203", "tra_2214", "tra_2204", "tra_2211", "tra_2205", "tra_2206", "tra_2207", "tra_2208", "tra_2209", "tra_2210"]
      }, {
        v2LineID: 'JJ',
        v3LineID: 'JJ',
        id: "tra_jiji",
        name: "集集線",
        trainSect: ["changhua"],
        color: "#22A050",
        dir: "1",
        area: 'w',
        link: {
          "tra_zhjy": {
            station: "tra_1207",
            dir: "0"
          }
        },
        station: ["tra_1207", "tra_2702", "tra_2703", "tra_2704", "tra_2705", "tra_2706", "tra_2707"]
      }, {
        v2LineID: 'SH',
        v3LineID: 'SH',
        id: "tra_shalun",
        name: "沙崙線",
        trainSect: ["tainan"],
        color: "#124060",
        dir: "1",
        area: 'w',
        protectStation: ["tra_1230"],
        link: {
          "tra_jygx": {
            station: "tra_1230",
            dir: "0"
          }
        },
        station: ["tra_1230", "tra_5101", "tra_5102"]
      }],
      running_ary: [{
        id: 'eTemu',
        cate: 'express',
        CarClass: ['1107', '1102'],
        dir: '0',
        area: 'e',
        range: ['tra_1012', 'tra_1632'],
        name: '東部幹線太魯閣號、普悠瑪號',
        rangeSplit: 'tra_1715',
        lineOf: ['tra_xibu', 'tra_yilan', 'tra_beihui', 'tra_huadong'],
        mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007', 'tra_1715', 'tra_1619', 'tra_1632'],
        maybeStop: ['tra_1006', 'tra_1003', 'tra_1820', 'tra_1823', 'tra_1606', 'tra_1610', 'tra_1612', 'tra_1616', 'tra_1626'],
        lessStop: ['tra_1002', 'tra_1804', 'tra_1816', 'tra_1818', 'tra_1712', 'tra_1602', 'tra_1604', 'tra_1611', 'tra_1623', 'tra_1624', 'tra_1630']
      }, {
        id: 'eZi',
        cate: 'express',
        CarClass: ['1100', '1101', '1103', '1108', '1109', '110A', '110B', '110C', '110D', '110E', '110F'],
        dir: '0',
        area: 'e',
        range: ['tra_1012', 'tra_1632'],
        name: '東部幹線自強號',
        rangeSplit: 'tra_1715',
        lineOf: ['tra_xibu', 'tra_yilan', 'tra_beihui', 'tra_huadong'],
        mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007', 'tra_1820', 'tra_1823', 'tra_1715', 'tra_1619', 'tra_1632'],
        maybeStop: ['tra_1003', 'tra_1804', 'tra_1816', 'tra_1818', 'tra_1826', 'tra_1705', 'tra_1712', 'tra_1602', 'tra_1604', 'tra_1611', 'tra_1623', 'tra_1624', 'tra_1630'],
        lessStop: ['tra_1009', 'tra_1006', 'tra_1005', 'tra_1002', 'tra_1808', 'tra_1810', 'tra_1709']
      }, {
        id: 'eJv',
        cate: 'express',
        CarClass: ['1110', '11111', '1114', '1115'],
        dir: '0',
        area: 'e',
        range: ['tra_1012', 'tra_1632'],
        name: '東部幹線莒光號',
        rangeSplit: 'tra_1715',
        lineOf: ['tra_xibu', 'tra_yilan', 'tra_beihui', 'tra_huadong'],
        mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007', 'tra_1804', 'tra_1816', 'tra_1818', 'tra_1820', 'tra_1823', 'tra_1715', 'tra_1619', 'tra_1632'],
        maybeStop: ['tra_1005', 'tra_1003', 'tra_1826', 'tra_1705', 'tra_1712', 'tra_1602', 'tra_1604', 'tra_1611', 'tra_1623', 'tra_1624', 'tra_1630'],
        lessStop: ['tra_1009', 'tra_1002', 'tra_1805', 'tra_1808', 'tra_1810', 'tra_1704', 'tra_1709', 'tra_1607', 'tra_1621', 'tra_1622']
      }, {
        //西部對號
        id: 'wZi',
        cate: 'express',
        CarClass: ['1100', '1101', '1103', '1108', '1109', '110A', '110B', '110C', '110D', '110E', '110F'],
        dir: '1',
        area: 'w',
        range: ['tra_1003', 'tra_1411'],
        name: '西部幹線自強號',
        lineOf: ['tra_xibu', 'tra_shan', 'tra_zhjy', 'tra_jygx', 'tra_pingdong'],
        mustStop: ['tra_1003', 'tra_1007', 'tra_1008', 'tra_1011', 'tra_1015', 'tra_1017', 'tra_1025', 'tra_1305', 'tra_1317', 'tra_1319', 'tra_1120', 'tra_1210', 'tra_1215', 'tra_1228', 'tra_1242', 'tra_1238', 'tra_1402', 'tra_1406', 'tra_1411'],
        maybeStop: ['tra_1005', 'tra_1028', 'tra_1203', 'tra_1206', 'tra_1211', 'tra_1220', 'tra_1404'],
        lessStop: ['tra_1006', 'tra_1012', 'tra_1214', 'tra_1225', 'tra_1227', 'tra_1233']
      }, {
        id: 'wJv',
        cate: 'express',
        CarClass: ['1110', '11111', '1114', '1115'],
        dir: '1',
        area: 'w',
        range: ['tra_1003', 'tra_1411'],
        name: '西部幹線莒光號',
        lineOf: ['tra_xibu', 'tra_hai', 'tra_zhjy', 'tra_jygx', 'tra_pingdong'],
        mustStop: ['tra_1003', 'tra_1005', 'tra_1007', 'tra_1008', 'tra_1011', 'tra_1012', 'tra_1015', 'tra_1017', 'tra_1019', 'tra_1021', 'tra_1025', 'tra_1028', 'tra_1105', 'tra_1109', 'tra_1110', 'tra_1112', 'tra_1114', 'tra_1115', 'tra_1120', 'tra_1203', 'tra_1206', 'tra_1210', 'tra_1211', 'tra_1215', 'tra_1220', 'tra_1223', 'tra_1225', 'tra_1228', 'tra_1233', 'tra_1242', 'tra_1238', 'tra_1402', 'tra_1406', 'tra_1411'],
        maybeStop: ['tra_1023', 'tra_1207', 'tra_1213', 'tra_1214', 'tra_1227', 'tra_1404'],
        lessStop: ['tra_1014', 'tra_1107', 'tra_1117', 'tra_1214', 'tra_1226', 'tra_1231', 'tra_1232']
      }, {
        //南迴線對號
        id: 'sZi',
        cate: 'express',
        CarClass: ['1100', '1101', '1103', '1108', '1109', '110A', '110B', '110C', '110D', '110E', '110F'],
        dir: '1',
        area: 's',
        range: ['tra_1242', 'tra_1632'],
        name: '南迴線自強號',
        lineOf: ['tra_jygx', 'tra_pingdong'],
        mustStop: ['tra_1242', 'tra_1238', 'tra_1402', 'tra_1406', 'tra_1411', 'tra_1418', 'tra_1508', 'tra_1514', 'tra_1516', 'tra_1632'],
        maybeStop: ['tra_1413', 'tra_1415', 'tra_1512'],
        lessStop: ['tra_1404', 'tra_1510', 'tra_1517']
      }, {
        id: 'sJvFu',
        cate: 'express',
        CarClass: ['1110', '11111', '1114', '1115', '1120'],
        dir: '1',
        area: 's',
        range: ['tra_1242', 'tra_1632'],
        name: '南迴線莒光號、復興號',
        lineOf: ['tra_jygx', 'tra_pingdong'],
        mustStop: ['tra_1242', 'tra_1238', 'tra_1402', 'tra_1406', 'tra_1411', 'tra_1418', 'tra_1508', 'tra_1512', 'tra_1514', 'tra_1516', 'tra_1632'],
        maybeStop: ['tra_1404', 'tra_1413', 'tra_1415', 'tra_1510', 'tra_1517'],
        lessStop: []
      }, {
        id: 'eLocal1',
        cate: 'local',
        CarClass: ['1131'],
        dir: '0',
        area: 'e',
        range: ['tra_1012', 'tra_1827'],
        name: '宜蘭線區間車',
        stopAll: true,
        lineOf: ['tra_xibu', 'tra_yilan']
      }, {
        id: 'eLocal2',
        cate: 'local',
        CarClass: ['1131'],
        dir: '0',
        area: 'e',
        range: ['tra_1820', 'tra_1715'],
        name: '北迴線區間車',
        stopAll: true,
        lineOf: ['tra_yilan', 'tra_beihui']
      }, {
        id: 'eLocal3',
        cate: 'local',
        CarClass: ['1131'],
        dir: '0',
        area: 'e',
        range: ['tra_1715', 'tra_1632'],
        name: '臺東線區間車',
        stopAll: true,
        maybeStop: ['tra_1608'],
        //當stopAll 時 maybeStop 表示為不一定停靠
        lineOf: ['tra_huadong']
      }, {
        id: 'wLocal1',
        cate: 'local',
        CarClass: ['1131'],
        dir: '1',
        area: 'w',
        range: ['tra_1001', 'tra_1025'],
        name: '基隆新竹段區間車',
        stopAll: true,
        lineOf: ['tra_xibu']
      }, {
        id: 'wLocal2',
        cate: 'local',
        CarClass: ['1131'],
        dir: '1',
        area: 'w',
        range: ['tra_1025', 'tra_1120'],
        name: '山線區間車',
        stopAll: true,
        lineOf: ['tra_xibu', 'tra_shan']
      }, {
        id: 'wLocal3',
        cate: 'local',
        CarClass: ['1131'],
        dir: '1',
        area: 'w',
        range: ['tra_1025', 'tra_1120'],
        name: '海線區間車',
        stopAll: true,
        lineOf: ['tra_xibu', 'tra_hai']
      }, {
        id: 'wLocal4',
        cate: 'local',
        CarClass: ['1131'],
        dir: '1',
        area: 'w',
        range: ['tra_1120', 'tra_1215'],
        name: '彰化嘉義段區間車',
        stopAll: true,
        lineOf: ['tra_zhjy']
      }, {
        id: 'wLocal5',
        cate: 'local',
        CarClass: ['1131'],
        dir: '1',
        area: 'w',
        range: ['tra_1215', 'tra_1411'],
        name: '嘉義潮州段區間車',
        stopAll: true,
        lineOf: ['tra_jygx', 'tra_pingdong']
      }, {
        id: 'wLocal6',
        cate: 'local',
        CarClass: ['1131'],
        dir: '1',
        area: 'w',
        range: ['tra_1411', 'tra_1418'],
        name: '潮州枋寮段區間車',
        stopAll: true,
        lineOf: ['tra_pingdong']
      }, {
        id: 'sLocal',
        cate: 'local',
        CarClass: ['1131'],
        dir: '1',
        area: 's',
        range: ['tra_1418', 'tra_1632'],
        name: '南迴線區間車',
        stopAll: true,
        lineOf: ['']
      }, {
        id: 'subPX',
        cate: 'local',
        CarClass: ['1150', '1131'],
        dir: '0',
        area: 'e',
        range: ['tra_2003', 'tra_1908'],
        name: '平溪線',
        stopAll: true,
        lineOf: ['tra_pingxi']
      }, {
        id: 'subLJ',
        cate: 'local',
        CarClass: ['1131'],
        dir: '0',
        area: 'w',
        range: ['tra_1025', 'tra_2214'],
        name: '六家線',
        stopAll: true,
        lineOf: ['tra_liujia']
      }, {
        id: 'subNW',
        cate: 'local',
        CarClass: ['1150', '1131'],
        dir: '0',
        area: 'w',
        range: ['tra_2203', 'tra_2210'],
        name: '內灣線',
        stopAll: true,
        lineOf: ['tra_liujia']
      }, {
        id: 'subJJ',
        cate: 'local',
        CarClass: ['1150', '1131'],
        dir: '1',
        area: 'w',
        range: ['tra_1207', 'tra_2707'],
        name: '集集線',
        stopAll: true,
        lineOf: ['tra_jiji']
      }, {
        id: 'subSL',
        cate: 'local',
        CarClass: ['1150', '1131'],
        dir: '1',
        area: 'w',
        range: ['tra_1228', 'tra_5102'],
        name: '沙崙線',
        stopAll: true,
        lineOf: ['tra_jygx', 'tra_shalun']
      }]
    },
    //================ 以下為轉乘用途資料，非 PTX 資料 ===============================
    transStation: [{
      id: 'taidongtra1',
      name: "台東",
      changeLine: ["tra_huadong", "tra_huadong"],
      changeStation: ['tra_1632', 'tra_1632'],
      walkMinute: 4
    }, {
      id: 'yulitra1',
      name: "玉里",
      changeLine: ["tra_huadong", "tra_huadong"],
      changeStation: ['tra_1619', 'tra_1619'],
      walkMinute: 4
    }, {
      id: 'hualiantra1',
      name: "花蓮",
      changeLine: ["tra_beihui", "tra_huadong"],
      changeStation: ['tra_1715', 'tra_1715'],
      walkMinute: 4
    }, {
      id: 'xingcheng',
      name: "新城",
      changeLine: ["tra_beihui", "tra_beihui"],
      changeStation: ['tra_1712', 'tra_1712'],
      walkMinute: 2
    }, {
      id: 'nanaotra1',
      name: "南澳",
      changeLine: ["tra_beihui", "tra_beihui"],
      changeStation: ['tra_1705', 'tra_1705'],
      walkMinute: 2
    }, {
      id: 'suaoxintra1',
      name: "蘇澳新",
      changeLine: ["tra_yilan", "tra_beihui"],
      changeStation: ['tra_1826', 'tra_1826'],
      walkMinute: 4
    }, {
      id: 'luodongtra1',
      name: "羅東",
      changeLine: ["tra_yilan", "tra_yilan"],
      changeStation: ['tra_1823', 'tra_1823'],
      walkMinute: 4
    }, {
      id: 'yilantra1',
      name: "宜蘭",
      changeLine: ["tra_yilan", "tra_yilan"],
      changeStation: ['tra_1820', 'tra_1820'],
      walkMinute: 4
    }, {
      id: 'toucheng1',
      name: "頭城",
      changeLine: ["tra_yilan", "tra_yilan"],
      changeStation: ['tra_1816', 'tra_1816'],
      walkMinute: 4
    }, {
      id: 'ruifangtra1',
      name: "瑞芳",
      changeLine: ["tra_yilan", "tra_pingxi"],
      changeStation: ['tra_1804', 'tra_1804'],
      walkMinute: 4
    }, {
      id: 'badutra1',
      name: "八堵",
      changeLine: ["tra_xibu", "tra_yilan"],
      changeStation: ['tra_1002', 'tra_1002'],
      walkMinute: 3
    }, {
      id: 'qidutra1',
      name: "七堵",
      changeLine: ["tra_xibu", "tra_xibu"],
      changeStation: ['tra_1003', 'tra_1003'],
      walkMinute: 3
    }, {
      id: 'songshantra1',
      name: "松山",
      changeLine: ["tra_xibu", "tra_xibu"],
      changeStation: ['tra_1007', 'tra_1007'],
      walkMinute: 3
    }, {
      id: 'taipeitra1',
      name: "台北",
      changeLine: ["tra_xibu", "tra_xibu"],
      changeStation: ['tra_1008', 'tra_1008'],
      walkMinute: 3
    }, {
      id: 'banqiaotra1',
      name: "板橋",
      changeLine: ["tra_xibu", "tra_xibu"],
      changeStation: ['tra_1011', 'tra_1011'],
      walkMinute: 3
    }, {
      id: 'taoyuantra1',
      name: "桃園",
      changeLine: ["tra_xibu", "tra_xibu"],
      changeStation: ['tra_1015', 'tra_1015'],
      walkMinute: 3
    }, {
      id: 'zhonglitra1',
      name: "中壢",
      changeLine: ["tra_xibu", "tra_xibu"],
      changeStation: ['tra_1017', 'tra_1017'],
      walkMinute: 3
    }, {
      id: 'northhsinchutra1',
      name: "北新竹",
      changeLine: ["tra_xibu", "tra_liujia"],
      changeStation: ['tra_1024', 'tra_1024'],
      walkMinute: 4
    }, {
      id: 'hsinchutra1',
      name: "新竹",
      changeLine: ["tra_xibu", "tra_liujia"],
      changeStation: ['tra_1025', 'tra_1025'],
      walkMinute: 4
    }, {
      id: 'zhunantra1',
      name: "竹南",
      changeLine: ["tra_xibu", "tra_shan"],
      changeStation: ['tra_1028', 'tra_1028'],
      walkMinute: 3
    }, {
      id: 'zhunantra2',
      name: "竹南",
      changeLine: ["tra_xibu", "tra_hai"],
      changeStation: ['tra_1028', 'tra_1028'],
      walkMinute: 3
    }, {
      id: 'zhunantra3',
      name: "竹南",
      changeLine: ["tra_shan", "tra_hai"],
      changeStation: ['tra_1028', 'tra_1028'],
      walkMinute: 3
    }, {
      id: 'miaolitra1',
      name: "苗栗",
      changeLine: ["tra_shan", "tra_shan"],
      changeStation: ['tra_1305', 'tra_1305'],
      walkMinute: 4
    }, {
      id: 'fengyuantra1',
      name: "豐原",
      changeLine: ["tra_shan", "tra_shan"],
      changeStation: ['tra_1317', 'tra_1317'],
      walkMinute: 4
    }, {
      id: 'taizhongtra1',
      name: "台中",
      changeLine: ["tra_shan", "tra_shan"],
      changeStation: ['tra_1319', 'tra_1319'],
      walkMinute: 4
    }, {
      id: 'zhanghuatra1',
      name: "彰化",
      changeLine: ["tra_shan", "tra_zhjy"],
      changeStation: ['tra_1120', 'tra_1120'],
      walkMinute: 4
    }, {
      id: 'zhanghuatra2',
      name: "彰化",
      changeLine: ["tra_hai", "tra_zhjy"],
      changeStation: ['tra_1120', 'tra_1120'],
      walkMinute: 4
    }, {
      id: 'zhanghuatra3',
      name: "彰化",
      changeLine: ["tra_shan", "tra_hai"],
      changeStation: ['tra_1120', 'tra_1120'],
      walkMinute: 4
    }, {
      id: 'yuanlintra1',
      name: "員林",
      changeLine: ["tra_zhjy", "tra_zhjy"],
      changeStation: ['tra_1203', 'tra_1203'],
      walkMinute: 4
    }, {
      id: 'douliutra1',
      name: "斗六",
      changeLine: ["tra_zhjy", "tra_zhjy"],
      changeStation: ['tra_1210', 'tra_1210'],
      walkMinute: 4
    }, {
      id: 'jiayitra1',
      name: "嘉義",
      changeLine: ["tra_zhjy", "tra_jygx"],
      changeStation: ['tra_1215', 'tra_1215'],
      walkMinute: 4
    }, {
      id: 'xinyingtra1',
      name: "新營",
      changeLine: ["tra_jygx", "tra_jygx"],
      changeStation: ['tra_1220', 'tra_1220'],
      walkMinute: 4
    }, {
      id: 'tainantra1',
      name: "台南",
      changeLine: ["tra_jygx", "tra_shalun"],
      changeStation: ['tra_1228', 'tra_1228'],
      walkMinute: 4
    }, {
      id: 'zhongzhoutra1',
      name: "中洲",
      changeLine: ["tra_jygx", "tra_shalun"],
      changeStation: ['tra_1230', 'tra_1230'],
      walkMinute: 4
    }, {
      id: 'gangshantra1',
      name: "岡山",
      changeLine: ["tra_jygx", "tra_jygx"],
      changeStation: ['tra_1233', 'tra_1233'],
      walkMinute: 4
    }, {
      id: 'gaoxungtra1',
      name: "高雄",
      changeLine: ["tra_jygx", "tra_pingdong"],
      changeStation: ['tra_1238', 'tra_1238'],
      walkMinute: 4
    }, {
      id: 'fongshantra1',
      name: "鳳山",
      changeLine: ["tra_pingdong", "tra_pingdong"],
      changeStation: ['tra_1402', 'tra_1402'],
      walkMinute: 1
    }, {
      id: 'pingdongtra1',
      name: "屏東",
      changeLine: ["tra_pingdong", "tra_pingdong"],
      changeStation: ['tra_1406', 'tra_1406'],
      walkMinute: 1
    }, {
      id: 'chaozhoutra1',
      name: "潮州",
      changeLine: ["tra_pingdong", "tra_pingdong"],
      changeStation: ['tra_1411', 'tra_1411'],
      walkMinute: 1
    }, {
      id: 'holongtra1',
      name: "後龍",
      changeLine: ["tra_hai", "tra_hai"],
      changeStation: ['tra_1105', 'tra_1105'],
      walkMinute: 1
    }, {
      id: 'tongxiaotra1',
      name: "通霄",
      changeLine: ["tra_hai", "tra_hai"],
      changeStation: ['tra_1109', 'tra_1109'],
      walkMinute: 1
    }, {
      id: 'yuanlitra1',
      name: "苑裡",
      changeLine: ["tra_hai", "tra_hai"],
      changeStation: ['tra_1110', 'tra_1110'],
      walkMinute: 1
    }, {
      id: 'dajiatra1',
      name: "大甲",
      changeLine: ["tra_hai", "tra_hai"],
      changeStation: ['tra_1112', 'tra_1112'],
      walkMinute: 1
    }, {
      id: 'qingshuitra1',
      name: "清水",
      changeLine: ["tra_hai", "tra_hai"],
      changeStation: ['tra_1114', 'tra_1114'],
      walkMinute: 1
    }, {
      id: 'shalutra1',
      name: "沙鹿",
      changeLine: ["tra_hai", "tra_hai"],
      changeStation: ['tra_1115', 'tra_1115'],
      walkMinute: 1
    }, {
      id: 'zhuzhongtra1',
      name: "竹中",
      changeLine: ["tra_liujia", "tra_liujia"],
      changeStation: ['tra_2203', 'tra_2203'],
      walkMinute: 3
    }, {
      id: 'nangang1',
      name: "南港",
      changeLine: ["tra_xibu", "trtc_5"],
      changeStation: ['tra_1006', 'trtc_097'],
      video: {
        "tra_1006": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/AIQETgZdBKM'
        },
        "trtc_097": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/HNBdfyBxMa8'
        }
      },
      walkMinute: 5
    }, {
      id: 'songshan1',
      name: "松山",
      changeLine: ["tra_xibu", "trtc_3"],
      changeStation: ['tra_1007', 'trtc_111'],
      video: {
        "tra_1007": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/CFX9EdLwT9A'
        },
        "trtc_111": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/64ADnwMTLyQ'
        }
      },
      walkMinute: 6
    }, {
      id: 'ximen1',
      name: "西門",
      changeLine: ["trtc_5", "trtc_3"],
      changeStation: ['trtc_086', 'trtc_086'],
      walkMinute: 1
    }, {
      id: 'zhongshan1',
      name: "中山",
      changeLine: ["trtc_3", "trtc_2"],
      changeStation: ['trtc_053', 'trtc_053'],
      walkMinute: 2
    }, {
      id: 'taipei1',
      name: "台北",
      changeLine: ["tra_xibu", "trtc_5"],
      changeStation: ['tra_1008', 'trtc_051'],
      walkMinute: 7
    }, {
      id: 'taipei2',
      name: "台北",
      changeLine: ["tra_xibu", "trtc_2"],
      changeStation: ['tra_1008', 'trtc_051'],
      walkMinute: 4
    }, {
      id: 'taipei3',
      name: "台北",
      changeLine: ["trtc_5", "trtc_2"],
      changeStation: ['trtc_051', 'trtc_051'],
      walkMinute: 3
    }, {
      id: 'taipei4',
      name: "台北",
      //機捷台鐵
      changeLine: ["tra_xibu", "tymetro_1"],
      changeStation: ['tra_1008', 'tymetro_a01'],
      video: {
        "tra_1008": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/dxfIJJ0b_3o'
        },
        "tymetro_a01": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/ulOu7N85QRo'
        }
      },
      walkMinute: 7
    }, {
      id: 'taipei5',
      name: "台北",
      //機捷淡水線
      changeLine: ["trtc_2", "tymetro_1"],
      changeStation: ['trtc_051', 'tymetro_a01'],
      video: {
        "trtc_2": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/gq7FJbhUN7U'
        },
        "tymetro_a01": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/A6PPO4zqxJI'
        }
      },
      walkMinute: 12
    }, {
      id: 'taipei6',
      name: "台北",
      //機捷板南線
      changeLine: ["trtc_5", "tymetro_1"],
      changeStation: ['trtc_051', 'tymetro_a01'],
      video: {
        "trtc_5": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/n7FgZ1-sDyk'
        },
        "tymetro_a01": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/uaLbpXkDiX4'
        }
      },
      walkMinute: 11
    }, {
      id: 'taipei7',
      name: "北門",
      //機捷松山線
      changeLine: ["trtc_3", "tymetro_1"],
      changeStation: ['trtc_105', 'tymetro_a01'],
      video: {
        "trtc_105": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/X_sjsSHqsoU'
        },
        "tymetro_a01": {
          width: 420,
          height: 315,
          src: 'https://www.youtube.com/embed/g5nm5Sbn6bw'
        }
      },
      walkMinute: 11
    }, {
      id: 'sanchong1',
      name: "三重",
      //機捷新莊線
      changeLine: ["trtc_4", "tymetro_1"],
      changeStation: ['trtc_125', 'tymetro_a02'],
      walkMinute: 7
    }, {
      id: 'cksmh1',
      name: "中正紀念堂",
      changeLine: ["trtc_3", "trtc_2"],
      changeStation: ['trtc_042', 'trtc_042'],
      walkMinute: 1
    }, {
      id: 'banqiao1',
      name: "板橋",
      changeLine: ["tra_xibu", "trtc_5"],
      changeStation: ['tra_1011', 'trtc_082'],
      walkMinute: 7
    }, {
      id: 'mqxl1',
      name: "民權西路",
      changeLine: ["trtc_2", "trtc_4"],
      changeStation: ['trtc_055', 'trtc_055'],
      walkMinute: 3
    }, {
      id: 'dongmen1',
      name: "東門",
      changeLine: ["trtc_2", "trtc_4"],
      changeStation: ['trtc_134', 'trtc_134'],
      walkMinute: 1
    }, {
      id: 'guting1',
      name: "古亭",
      changeLine: ["trtc_3", "trtc_4"],
      changeStation: ['trtc_041', 'trtc_041'],
      walkMinute: 1
    }, {
      id: 'zhongxiaoxs1',
      name: "忠孝新生",
      changeLine: ["trtc_5", "trtc_4"],
      changeStation: ['trtc_089', 'trtc_089'],
      walkMinute: 2
    }, {
      id: 'sjnanjing1',
      name: "松江南京",
      changeLine: ["trtc_3", "trtc_4"],
      changeStation: ['trtc_132', 'trtc_132'],
      walkMinute: 2
    }, {
      id: 'daqiaotou1',
      name: "大橋頭",
      changeLine: ["trtc_4", "trtc_4"],
      changeStation: ['trtc_128', 'trtc_128'],
      walkMinute: 1
    }, {
      id: 'changgengyiyuan1',
      name: "長庚醫院",
      changeLine: ["tymetro_1", "tymetro_1"],
      changeStation: ['tymetro_a08', 'tymetro_a08'],
      walkMinute: 0
    }],
    routeMap: [{
      id: 'traInnerTrans_tra_xibu,tra_jygx',
      fromToLine: ["tra_xibu", "tra_jygx"],
      sect: ['keelung', 'taipei', 'taoyuan', 'hsinchu', 'chiayi', 'tainan', 'kaohsiung'],
      route: [{
        line: ["tra_xibu", "tra_jygx"],
        transStation: ["qidutra1"]
      }, {
        line: ["tra_xibu", "tra_jygx"],
        transStation: ["songshantra1"]
      }, {
        line: ["tra_xibu", "tra_jygx"],
        transStation: ["taipeitra1"]
      }, {
        line: ["tra_xibu", "tra_jygx"],
        transStation: ["banqiaotra1"]
      }, {
        line: ["tra_xibu", "tra_jygx"],
        transStation: ["taoyuantra1"]
      }, {
        line: ["tra_xibu", "tra_jygx"],
        transStation: ["zhonglitra1"]
      }, {
        line: ["tra_xibu", "tra_jygx"],
        transStation: ["hsinchutra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["jiayitra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["xinyingtra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["tainantra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["gangshantra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["gaoxungtra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_xibu,tra_zhjy',
      fromToLine: ["tra_xibu", "tra_zhjy"],
      sect: ['keelung', 'taipei', 'taoyuan', 'hsinchu', 'changhua', 'yunlin', 'chiayi'],
      route: [{
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["qidutra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["songshantra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["taipeitra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["banqiaotra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["taoyuantra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["zhonglitra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["hsinchutra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["zhunantra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["zhanghuatra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["yuanlintra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["douliutra1"]
      }, {
        line: ["tra_xibu", "tra_zhjy"],
        transStation: ["jiayitra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_xibu,tra_shan',
      fromToLine: ["tra_xibu", "tra_shan"],
      sect: ['keelung', 'taipei', 'taoyuan', 'hsinchu', 'miaoli', 'taichung', 'changhua'],
      route: [{
        line: ["tra_xibu", "tra_xibu"],
        transStation: ["qidutra1"]
      }, {
        line: ["tra_xibu", "tra_xibu"],
        transStation: ["songshantra1"]
      }, {
        line: ["tra_xibu", "tra_xibu"],
        transStation: ["taipeitra1"]
      }, {
        line: ["tra_xibu", "tra_xibu"],
        transStation: ["banqiaotra1"]
      }, {
        line: ["tra_xibu", "tra_xibu"],
        transStation: ["taoyuantra1"]
      }, {
        line: ["tra_xibu", "tra_xibu"],
        transStation: ["zhonglitra1"]
      }, {
        line: ["tra_xibu", "tra_xibu"],
        transStation: ["hsinchutra1"]
      }, {
        line: ["tra_xibu", "tra_shan"],
        transStation: ["zhunantra1"]
      }, {
        line: ["tra_xibu", "tra_shan"],
        transStation: ["miaolitra1"]
      }, {
        line: ["tra_xibu", "tra_shan"],
        transStation: ["fengyuantra1"]
      }, {
        line: ["tra_xibu", "tra_shan"],
        transStation: ["taizhongtra1"]
      }, {
        line: ["tra_xibu", "tra_shan"],
        transStation: ["zhanghuatra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_shan,tra_zhjy',
      fromToLine: ["tra_shan", "tra_zhjy"],
      sect: ['miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi'],
      route: [{
        line: ["tra_shan", "tra_shan"],
        transStation: ["miaolitra1"]
      }, {
        line: ["tra_shan", "tra_shan"],
        transStation: ["fengyuantra1"]
      }, {
        line: ["tra_shan", "tra_shan"],
        transStation: ["taizhongtra1"]
      }, {
        line: ["tra_shan", "tra_zhjy"],
        transStation: ["zhanghuatra1"]
      }, {
        line: ["tra_shan", "tra_zhjy"],
        transStation: ["yuanlintra1"]
      }, {
        line: ["tra_shan", "tra_zhjy"],
        transStation: ["douliutra1"]
      }, {
        line: ["tra_shan", "tra_zhjy"],
        transStation: ["jiayitra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_shan,tra_jygx',
      fromToLine: ["tra_shan", "tra_jygx"],
      sect: ['miaoli', 'taichung', 'changhua', 'chiayi', 'tainan', 'kaohsiung'],
      route: [{
        line: ["tra_shan", "tra_shan"],
        transStation: ["miaolitra1"]
      }, {
        line: ["tra_shan", "tra_shan"],
        transStation: ["fengyuantra1"]
      }, {
        line: ["tra_shan", "tra_shan"],
        transStation: ["taizhongtra1"]
      }, {
        line: ["tra_shan", "tra_jygx"],
        transStation: ["zhanghuatra1"]
      }, {
        line: ["tra_shan", "tra_jygx"],
        transStation: ["jiayitra1"]
      }, {
        line: ["tra_shan", "tra_jygx"],
        transStation: ["xinyingtra1"]
      }, {
        line: ["tra_shan", "tra_jygx"],
        transStation: ["tainantra1"]
      }, {
        line: ["tra_shan", "tra_jygx"],
        transStation: ["gangshantra1"]
      }, {
        line: ["tra_shan", "tra_jygx"],
        transStation: ["gaoxungtra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_zhjy,tra_jygx',
      fromToLine: ["tra_zhjy", "tra_jygx"],
      sect: ['changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung'],
      route: [{
        line: ["tra_zhjy", "tra_zhjy"],
        transStation: ["zhanghuatra1"]
      }, {
        line: ["tra_zhjy", "tra_zhjy"],
        transStation: ["yuanlintra1"]
      }, {
        line: ["tra_zhjy", "tra_zhjy"],
        transStation: ["douliutra1"]
      }, {
        line: ["tra_zhjy", "tra_jygx"],
        transStation: ["jiayitra1"]
      }, {
        line: ["tra_zhjy", "tra_jygx"],
        transStation: ["xinyingtra1"]
      }, {
        line: ["tra_zhjy", "tra_jygx"],
        transStation: ["tainantra1"]
      }, {
        line: ["tra_zhjy", "tra_jygx"],
        transStation: ["gangshantra1"]
      }, {
        line: ["tra_zhjy", "tra_jygx"],
        transStation: ["gaoxungtra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_jygx,tra_pingdong',
      fromToLine: ["tra_jygx", "tra_pingdong"],
      sect: ['chiayi', 'tainan', 'kaohsiung', 'pingdong'],
      route: [{
        line: ["tra_jygx", "tra_pingdong"],
        transStation: ["gaoxungtra1"]
      }, {
        line: ["tra_pingdong", "tra_pingdong"],
        transStation: ["fongshantra1"]
      }, {
        line: ["tra_pingdong", "tra_pingdong"],
        transStation: ["chaozhoutra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_pingdong',
      fromToLine: ["tra_pingdong", "tra_pingdong"],
      sect: ['kaohsiung', 'pingdong'],
      route: [{
        line: ["tra_pingdong", "tra_pingdong"],
        transStation: ["chaozhoutra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_yilan,tra_beihui',
      fromToLine: ["tra_yilan", "tra_beihui"],
      sect: ['northeast', 'yilan', 'beihui', 'hualian'],
      route: [{
        line: ["tra_beihui", "tra_beihui"],
        transStation: ["hualiantra1"]
      }, {
        line: ["tra_yilan", "tra_beihui"],
        transStation: ["suaoxintra1"]
      }, {
        line: ["tra_yilan", "tra_yilan"],
        transStation: ["luodongtra1"]
      }, {
        line: ["tra_yilan", "tra_yilan"],
        transStation: ["yilantra1"]
      }, {
        line: ["tra_yilan", "tra_yilan"],
        transStation: ["ruifangtra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_yilan,tra_huadong',
      fromToLine: ["tra_yilan", "tra_huadong"],
      sect: ['northeast', 'yilan', 'beihui', 'hualian', 'taidong'],
      route: [{
        line: ["tra_huadong", "tra_huadong"],
        transStation: ["taidongtra1"]
      }, {
        line: ["tra_huadong", "tra_huadong"],
        transStation: ["yulitra1"]
      }, {
        line: ["tra_beihui", "tra_huadong"],
        transStation: ["hualiantra1"]
      }, {
        line: ["tra_yilan", "tra_beihui"],
        transStation: ["suaoxintra1"]
      }, {
        line: ["tra_yilan", "tra_yilan"],
        transStation: ["luodongtra1"]
      }, {
        line: ["tra_yilan", "tra_yilan"],
        transStation: ["yilantra1"]
      }, {
        line: ["tra_yilan", "tra_yilan"],
        transStation: ["ruifangtra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_beihui,tra_huadong',
      fromToLine: ["tra_beihui", "tra_huadong"],
      sect: ['yilan', 'beihui', 'hualian', 'taidong'],
      route: [{
        line: ["tra_huadong", "tra_huadong"],
        transStation: ["taidongtra1"]
      }, {
        line: ["tra_huadong", "tra_huadong"],
        transStation: ["yulitra1"]
      }, {
        line: ["tra_beihui", "tra_huadong"],
        transStation: ["hualiantra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_yilan,tra_pingxi',
      fromToLine: ["tra_yilan", "tra_pingxi"],
      fromToLineReg: ["^tra_pingxi$", "^tra_yilan$|^tra_beihui$|^tra_huadong$"],
      sect: ['northeast', 'yilan', 'beihui', 'hualian', 'taidong'],
      route: [{
        line: ["tra_yilan", "tra_pingxi"],
        transStation: ["ruifangtra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_xibu,tra_yilan',
      fromToLine: ["tra_xibu", "tra_yilan"],
      fromToLineReg: ["^tra_xibu$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_shalun$", "^tra_yilan$|^tra_beihui$|^tra_huadong$"],
      sect: ['kaohsiung', 'tainan', 'chiayi', 'yunlin', 'changhua', 'taichung', 'miaoli', 'hsinchu', 'taoyuan', 'taipei', 'keelung', 'northeast', 'yilan', 'beihui', 'hualian', 'taidong'],
      route: [{
        line: ["tra_xibu", "tra_yilan"],
        transStation: ["banqiaotra1"]
      }, {
        line: ["tra_xibu", "tra_yilan"],
        transStation: ["taipeitra1"]
      }, {
        line: ["tra_xibu", "tra_yilan"],
        transStation: ["songshantra1"]
      }, {
        line: ["tra_xibu", "tra_yilan"],
        transStation: ["qidutra1"]
      }, {
        line: ["tra_xibu", "tra_yilan"],
        transStation: ["badutra1"]
      }]
      /*}, {
          id: 'traInnerTrans_tra_xibu,tra_beihui',
          fromToLine: ["tra_xibu","tra_beihui"],
          sect: ['taoyuan','taipei','keelung','northeast','yilan','beihui','hualian'],
          route: [
              {
                  line: ["tra_xibu", "tra_beihui"],
                  transStation: ["banqiaotra1"]
              },
              {
                  line: ["tra_xibu", "tra_beihui"],
                  transStation: ["taipeitra1"]
              },
              {
                  line: ["tra_xibu", "tra_beihui"],
                  transStation: ["songshantra1"]
              },
              {
                  line: ["tra_xibu", "tra_beihui"],
                  transStation: ["qidutra1"]
              },
              {
                  line: ["tra_xibu", "tra_beihui"],
                  transStation: ["badutra1"]
              }
          ]*/

    }, {
      id: 'traInnerTrans_tra_shan,tra_pingxi',
      fromToLine: ["tra_shan", "tra_pingxi"],
      fromToLineReg: ["^tra_shan$|^tra_zhjy$|^tra_jygx$", "^tra_pingxi$"],
      sect: ['northeast', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung'],
      route: [{
        line: ["tra_shan", "tra_pingxi"],
        transStation: ["banqiaotra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_xibu,tra_pingxi',
      fromToLine: ["tra_xibu", "tra_pingxi"],
      fromToLineReg: ["^tra_xibu$|^tra_shan$|^tra_zhjy$|^tra_jygx$", "^tra_pingxi$"],
      sect: ['hsinchu', 'taoyuan', 'taipei', 'keelung', 'northeast'],
      route: [{
        line: ["tra_yilan", "tra_pingxi"],
        transStation: ["ruifangtra1"]
      }, {
        line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
        transStation: ["banqiaotra1", "ruifangtra1"]
      }, {
        line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
        transStation: ["taipeitra1", "ruifangtra1"]
      }, {
        line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
        transStation: ["songshantra1", "ruifangtra1"]
      }, {
        line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
        transStation: ["qidutra1", "ruifangtra1"]
      }, {
        line: ["tra_xibu", "tra_yilan", "tra_pingxi"],
        transStation: ["badutra1", "ruifangtra1"]
      }, {
        line: ["tra_shan", "tra_yilan", "tra_pingxi"],
        transStation: ["banqiaotra1", "ruifangtra1"]
      }, {
        line: ["tra_zhjy", "tra_yilan", "tra_pingxi"],
        transStation: ["banqiaotra1", "ruifangtra1"]
      }, {
        line: ["tra_jygx", "tra_yilan", "tra_pingxi"],
        transStation: ["banqiaotra1", "ruifangtra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_xibu,tra_liujia',
      fromToLine: ["tra_xibu", "tra_liujia"],
      sect: ['hsinchu', 'taoyuan', 'taipei', 'keelung', 'northeast'],
      route: [{
        line: ["tra_xibu", "tra_liujia"],
        transStation: ["hsinchutra1"]
      }, {
        line: ["tra_xibu", "tra_liujia"],
        transStation: ["northhsinchutra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_shan,tra_liujia',
      fromToLine: ["tra_shan", "tra_liujia"],
      fromToLineReg: ["^tra_shan$|^tra_zhjy$|^tra_jygx$", "^tra_liujia$"],
      sect: ['hsinchu', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung'],
      route: [{
        line: ["tra_xibu", "tra_liujia"],
        transStation: ["hsinchutra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_yilan,tra_liujia',
      fromToLine: ["tra_yilan", "tra_liujia"],
      fromToLineReg: ["^tra_liujia$", "^tra_yilan$|^tra_beihui$|^tra_huadong$"],
      sect: ['hsinchu', 'yilan', 'northeast', 'beihui', 'hualian', 'taidong'],
      route: [{
        line: ["tra_yilan", "tra_xibu"],
        transStation: ["banqiaotra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_jygx,tra_shalun',
      fromToLine: ["tra_jygx", "tra_shalun"],
      sect: ['chiayi', 'tainan', 'kaohsiung'],
      route: [{
        line: ["tra_jygx", "tra_shalun"],
        transStation: ["zhongzhoutra1"]
      }, {
        line: ["tra_jygx", "tra_shalun"],
        transStation: ["tainantra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_xibu,tra_shalun',
      fromToLine: ["tra_xibu", "tra_shalun"],
      fromToLineReg: ["^tra_xibu$|^tra_shan$|^tra_zhjy$", "^tra_shalun$"],
      sect: ['northeast', 'keelung', 'taipei', 'taoyuan', 'hsinchu', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan'],
      route: [{
        line: ["tra_xibu", "tra_shalun"],
        transStation: ["tainantra1"]
      }]
    }, {
      //TRA sub line to sub line
      id: 'traInnerTrans_tra_pingxi,tra_liujia',
      fromToLine: ["tra_pingxi", "tra_liujia"],
      sect: ['hsinchu', 'northeast'],
      route: [{
        line: ["tra_pingxi", "tra_xibu", "tra_yilan", "tra_liujia"],
        transStation: ["ruifangtra1", "banqiaotra1", "hsinchutra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_pingxi,tra_shalun',
      fromToLine: ["tra_pingxi", "tra_shalun"],
      sect: ['northeast', 'tainan'],
      route: [{
        line: ["tra_pingxi", "tra_yilan", "tra_xibu", "tra_shalun"],
        transStation: ["ruifangtra1", "banqiaotra1", "tainantra1"]
      }]
    }, {
      id: 'traInnerTrans_tra_liujia,tra_shalun',
      fromToLine: ["tra_liujia", "tra_shalun"],
      sect: ['hsinchu', 'tainan'],
      route: [{
        line: ["tra_liujia", "tra_xibu", "tra_shalun"],
        transStation: ["hsinchutra1", "tainantra1"]
      }]
    }, {
      //TRA to TRTC
      id: 'tra_xibu,trtc_3',
      fromToLine: ["tra_xibu", "trtc_3"],
      sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
      route: [{
        bypassStationReg: '^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$',
        line: ["tra_xibu", "trtc_3"],
        transStation: ["songshan1"]
      }, {
        bypassStationReg: '^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$',
        line: ["tra_xibu", "trtc_2", "trtc_3"],
        transStation: ["taipei2", "zhongshan1"]
      }, {
        line: ["tra_xibu", "trtc_5", "trtc_3"],
        transStation: ["banqiao1", "ximen1"]
      }, {
        bypassStationReg: '^trtc_111$|^trtc_110$|^trtc_109$|^trtc_009$|^trtc_132$|^trtc_053$|^trtc_105$|^trtc_086$',
        line: ["tra_xibu", "trtc_2", "trtc_3"],
        transStation: ["taipei2", "cksmh1"]
      }]
    }, {
      id: 'tra_xibu,trtc_5',
      fromToLine: ["tra_xibu", "trtc_5"],
      sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
      route: [{
        bypassStationReg: '^trtc_08[0-2]$|^trtc_07[6-9]$',
        line: ["tra_xibu", "trtc_5"],
        transStation: ["nangang1"]
      }, {
        line: ["tra_xibu", "trtc_5"],
        transStation: ["taipei1"]
      }, {
        bypassStationReg: '^trtc_031$|^trtc_097$|^trtc_096$',
        line: ["tra_xibu", "trtc_5"],
        transStation: ["banqiao1"]
      }]
    }, {
      id: 'tra_xibu,trtc_2',
      fromToLine: ["tra_xibu", "trtc_2"],
      sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
      route: [{
        line: ["tra_xibu", "trtc_2"],
        transStation: ["taipei2"]
      }]
    }, {
      id: 'tra_xibu,trtc_4',
      fromToLine: ["tra_xibu", "trtc_4"],
      sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
      route: [{
        bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
        line: ["tra_xibu", "trtc_2", "trtc_4"],
        transStation: ["taipei2", "dongmen1"]
      }, {
        bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
        line: ["tra_xibu", "trtc_2", "trtc_4"],
        transStation: ["taipei2", "mqxl1"]
      }, {
        bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
        line: ["tra_xibu", "trtc_2", "trtc_3", "trtc_4"],
        transStation: ["taipei2", "cksmh1", "guting1"]
      }, {
        bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
        line: ["tra_xibu", "trtc_3", "trtc_4"],
        transStation: ["songshan1", "sjnanjing1"]
      }]
    }, {
      //TRA to TTYMETRO
      id: 'tra_xibu,tymetro_1',
      fromToLine: ["tra_xibu", "tymetro_1"],
      sect: ['taipei', 'keelung', 'taoyuan', 'hsinchu'],
      route: [{
        line: ["tra_xibu", "tymetro_1"],
        transStation: ["taipei4"]
      }]
    }, {
      //TRTC inner trans
      id: 'trtc_5,trtc_2',
      fromToLine: ["trtc_5", "trtc_2"],
      sect: ['taipei'],
      route: [{
        line: ["trtc_5", "trtc_2"],
        transStation: ["taipei3"]
      }, {
        bypassBothStationReg: '^trtc_08[8-9]$|^trtc_010$|^trtc_09[1-7]$|^trtc_031$|^trtc_05[1-9]$|^trtc_06[0-9]$|^trtc_07[0-1]$',
        line: ["trtc_5", "trtc_3", "trtc_2"],
        transStation: ["ximen1", "cksmh1"]
      }]
    }, {
      id: 'trtc_4,trtc_2',
      fromToLine: ["trtc_4", "trtc_2"],
      sect: ['taipei'],
      route: [{
        bypassBothStationReg: '^trtc_05[0-4]$|^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
        line: ["trtc_4", "trtc_2"],
        transStation: ["dongmen1"]
      }, {
        bypassBothStationReg: '^trtc_05[0-4]$|^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
        line: ["trtc_4", "trtc_2"],
        transStation: ["mqxl1"]
      }, {
        bypassBothStationReg: '^trtc_05[0-4]$|^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
        line: ["trtc_4", "trtc_3", "trtc_2"],
        transStation: ["guting1", "cksmh1"]
      }]
    }, {
      id: 'trtc_3,trtc_2',
      fromToLine: ["trtc_3", "trtc_2"],
      sect: ['taipei'],
      route: [{
        bypassBothStationReg: '^trtc_105$|^trtc_132$|^trtc_009$|^trtc_11[0-1]$|^trtc_109$|^trtc_05[0-9]$|^trtc_06[0-9]$|^trtc_07[0-1]$',
        line: ["trtc_3", "trtc_2"],
        transStation: ["cksmh1"]
      }, {
        bypassStationReg: '^trtc_04[0-3]$|^trtc_03[2-9]$',
        line: ["trtc_3", "trtc_2"],
        transStation: ["zhongshan1"]
      }]
    }, {
      id: 'trtc_3,trtc_5',
      fromToLine: ["trtc_3", "trtc_5"],
      sect: ['taipei'],
      route: [{
        line: ["trtc_3", "trtc_5"],
        transStation: ["ximen1"]
      }, {
        bypassStationReg: '^trtc_07[6-9]$|^trtc_08[0-9]$|^trtc_09[1-5]$|^trtc_05[1-3]$|^trtc_010$|^trtc_03[2-9]$|^trtc_04[0-3]$|^trtc_132$',
        line: ["trtc_3", "tra_xibu", "trtc_5"],
        transStation: ["songshan1", "nangang1"]
      }]
    }, {
      id: 'trtc_4,trtc_5',
      fromToLine: ["trtc_4", "trtc_5"],
      sect: ['taipei'],
      route: [{
        line: ["trtc_4", "trtc_5"],
        transStation: ["zhongxiaoxs1"]
      }, {
        bypassBothStationReg: '^trtc_08[8-9]$|^trtc_010$|^trtc_09[1-7]$|^trtc_031$|^trtc_051$|^trtc_055$|^trtc_13[0-2]$|^trtc_12[1-8]$|^trtc_17[4-9]$|^trtc_180$',
        line: ["trtc_4", "trtc_3", "trtc_5"],
        transStation: ["guting1", "ximen1"]
      }]
    }, {
      id: 'trtc_3,trtc_4',
      fromToLine: ["trtc_3", "trtc_4"],
      sect: ['taipei'],
      route: [{
        bypassBothStationReg: '^trtc_009$|^trtc_109$|^trtc_11[0-1]$|^trtc_105$|^trtc_053$|^trtc_055$|^trtc_13[0-2]$|^trtc_12[1-8]$|^trtc_17[4-9]$|^trtc_180$',
        line: ["trtc_3", "trtc_4"],
        transStation: ["guting1"]
      }, {
        bypassBothStationReg: '^trtc_04[5-8]$|^trtc_105$|^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$|^trtc_134$|^trtc_089$',
        line: ["trtc_3", "trtc_4"],
        transStation: ["sjnanjing1"]
      }]
    }, {
      id: 'trtc_4,trtc_4',
      fromToLine: ["trtc_4", "trtc_4"],
      sect: ['taipei'],
      route: [{
        line: ["trtc_4", "trtc_4"],
        transStation: ["daqiaotou1"]
      }]
    }, {
      //TYMETRO to TRTC
      id: 'tymetro_1,trtc_3',
      fromToLine: ["tymetro_1", "trtc_3"],
      sect: ['taipei', 'taoyuan'],
      route: [{
        line: ["tymetro_1", "trtc_3"],
        transStation: ["taipei7"]
      }, {
        bypassStationReg: '^trtc_111$|^trtc_110$|^trtc_109$|^trtc_009$|^trtc_132$|^trtc_105$|^trtc_086$',
        line: ["tymetro_1", "trtc_2", "trtc_3"],
        transStation: ["taipei5", "cksmh1"]
      }]
    }, {
      id: 'tymetro_1,trtc_5',
      fromToLine: ["tymetro_1", "trtc_5"],
      sect: ['taipei', 'taoyuan'],
      route: [{
        line: ["tymetro_1", "trtc_5"],
        transStation: ["taipei6"]
      }]
    }, {
      id: 'tymetro_1,trtc_2',
      fromToLine: ["tymetro_1", "trtc_2"],
      sect: ['taipei', 'taoyuan'],
      route: [{
        line: ["tymetro_1", "trtc_2"],
        transStation: ["taipei5"]
      }]
    }, {
      id: 'tymetro_1,trtc_4',
      fromToLine: ["tymetro_1", "trtc_4"],
      sect: ['taipei', 'taoyuan'],
      route: [{
        bypassStationReg: '^trtc_17[4-8]$',
        line: ["tymetro_1", "trtc_4"],
        transStation: ["sanchong1"]
      }, {
        bypassStationReg: '^trtc_089$|^trtc_055$|^trtc_041$|^trtc_04[5-8]$|^trtc_12[1-8]$|^trtc_180$|^trtc_179$|^trtc_13[0-1]$',
        line: ["tymetro_1", "trtc_4", "trtc_4"],
        transStation: ["sanchong1", "daqiaotou1"]
      }, {
        bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
        line: ["tymetro_1", "trtc_2", "trtc_4"],
        transStation: ["taipei5", "dongmen1"]
      }, {
        bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
        line: ["tymetro_1", "trtc_2", "trtc_4"],
        transStation: ["taipei5", "mqxl1"]
      }, {
        bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
        line: ["tymetro_1", "trtc_2", "trtc_3", "trtc_4"],
        transStation: ["taipei5", "cksmh1", "guting1"]
      }]
    }, {
      //TYMETRO Route
      id: 'tymetroInnerTrans_tymetro_1,tymetro_1',
      fromToLine: ["tymetro_1", "tymetro_1"],
      sect: ['taoyuan', 'taipei'],
      route: [{
        line: ["tymetro_1", "tymetro_1"],
        transStation: ["changgengyiyuan1"]
      }]
    }],
    routeSystem: [{
      id: 'tra_r1',
      rType: 'direct',
      //direct , trans 
      company: 'tra',
      big: 'e',
      lineStr: 'tra_xibu,tra_huadong,tra_beihui,tra_yilan',
      directSect: 'taipei,keeling,northeast,yilan,beihui,hualian,taidong'
    }, {
      id: 'tra_r2',
      rType: 'direct',
      //direct , trans 
      company: 'tra',
      big: 'w',
      lineStr: 'tra_xibu,tra_shan,tra_zhjy,tra_jygx,tra_pingdong',
      directSect: 'keeling,taipei,taoyuan,hsinchu,miaoli,taichung,chungha,yunlin,chiayi,tainan,kaohsiung,pingdong'
    }, {
      id: 'tra_r4',
      rType: 'direct',
      //direct , trans 
      company: 'tra',
      big: 'w',
      lineStr: 'tra_huadong,tra_beihui,tra_yilan,tra_shan,tra_zhjy,tra_jygx,tra_pingdong',
      directSect: 'northeast,yilan,beihui,hualian,taidong,miaoli,taichung,chungha,yunlin,chiayi,tainan,kaohsiung,pingdong'
    }, {
      id: 'tra_r5',
      rType: 'direct',
      //direct , trans 
      company: 'tra',
      big: 'w',
      lineStr: 'tra_liujia',
      directSect: 'hsinchu'
    }, {
      id: 'tra_r6',
      rType: 'direct',
      //direct , trans 
      company: 'tra',
      big: 'w',
      lineStr: 'tra_shalun,tra_jygx',
      directSect: 'tainan'
    }, {
      id: 'tra_route_line_map',
      rType: 'map',
      //Do not remove this route system , important
      company: 'tra',
      dir: "0",
      link: ['tra_pingdong,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_pingxi', 'tra_pingdong,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_pingxi', 'tra_pingdong,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_pingdong,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_jiji,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_jiji,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_shalun,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong', 'tra_shalun,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong']
    }, {
      id: 'tra_west_east_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_xibu,tra_yilan,tra_beihui,tra_huadong',
      lineInclude: [['tra_xibu', 'tra_shan', 'tra_zhjy', 'tra_jygx', 'tra_liujia', 'tra_shalun', 'tra_jiji'], ['tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi']],
      rule: [{
        line: ['tra_jygx', 'tra_zhjy', 'tra_shan', 'tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi'],
        sect: ['taoyuan', 'hsinchu', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung', 'pingdong'],
        station: ["tra_1032", "tra_1012", "tra_1013", "tra_1014"],
        transStation: 'banqiaotra1'
      }, {
        line: ['tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi'],
        station: ["tra_1009", "tra_1006", "tra_1031", "tra_1005", "tra_1004"],
        transStation: 'songshantra1'
      }, {
        line: ['tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi'],
        station: ["tra_1031", "tra_1005", "tra_1004", "tra_1030", "tra_1002", "tra_1029", "tra_1001"],
        transStation: 'qidutra1'
      }, {
        line: ['tra_yilan', 'tra_beihui', 'tra_huadong', 'tra_pingxi'],
        station: ["tra_1030", "tra_1003", "tra_1029", "tra_1001"],
        transStation: 'badutra1'
      }, {
        line: ['tra_shalun', 'tra_pingxi'],
        station: ["tra_1228"],
        transStation: 'tainantra1'
      }]
    }, {
      id: 'tra_xibu_shan_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_xibu,tra_shan',
      lineInclude: [['tra_xibu', 'tra_liujia'], ['tra_shan']],
      rule: [{
        line: ['tra_shan'],
        sect: ['keelung'],
        transStation: 'qidutra1'
      }, {
        line: ['tra_shan'],
        station: ["tra_1004", "tra_1005", "tra_1031", "tra_1006"],
        transStation: 'songshantra1'
      }, {
        line: ['tra_shan'],
        station: ["tra_1009", "tra_1032", "tra_1012", "tra_1013"],
        transStation: 'banqiaotra1'
      }, {
        line: ['tra_shan'],
        station: ["tra_1012", "tra_1013", "tra_1014"],
        transStation: 'taoyuantra1'
      }, {
        line: ['tra_shan'],
        station: ["tra_1016", "tra_1018"],
        transStation: 'zhonglitra1'
      }, {
        line: ['tra_shan'],
        station: ["tra_1019", "tra_1020", "tra_1036"],
        sect: ['hsinchu'],
        transStation: 'hsinchutra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        station: ["tra_1019", "tra_1020", "tra_1036"],
        sect: ['miaoli'],
        transStation: 'miaolitra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        station: ["tra_1315", "tra_1318"],
        transStation: 'fengyuantra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        sect: ['taichung'],
        transStation: 'taizhongtra1'
      }]
    }, {
      id: 'tra_xibu_zhjy_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_xibu,tra_zhjy',
      lineInclude: [['tra_xibu', 'tra_liujia'], ['tra_zhjy']],
      rule: [{
        line: ['tra_zhjy'],
        sect: ['keelung'],
        transStation: 'qidutra1'
      }, {
        line: ['tra_zhjy'],
        station: ["tra_1004", "tra_1005", "tra_1031", "tra_1006"],
        transStation: 'songshantra1'
      }, {
        line: ['tra_zhjy'],
        station: ["tra_1009", "tra_1032", "tra_1012", "tra_1013"],
        transStation: 'banqiaotra1'
      }, {
        line: ['tra_zhjy'],
        station: ["tra_1012", "tra_1013", "tra_1014"],
        transStation: 'taoyuantra1'
      }, {
        line: ['tra_zhjy'],
        station: ["tra_1016", "tra_1018"],
        transStation: 'zhonglitra1'
      }, {
        line: ['tra_zhjy'],
        station: ["tra_1019", "tra_1020", "tra_1036"],
        sect: ['hsinchu'],
        transStation: 'hsinchutra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        sect: ['changhua'],
        transStation: 'zhanghuatra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        station: ["tra_1208", "tra_1209"],
        sect: ['changhua'],
        transStation: 'yuanlintra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        sect: ['yunlin'],
        transStation: 'douliutra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        sect: ['chiayi'],
        transStation: 'jiayitra1'
      }]
    }, {
      id: 'tra_xibu_jygx_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_xibu,tra_jygx',
      lineInclude: [['tra_xibu', 'tra_liujia'], ['tra_jygx', 'tra_shalun']],
      rule: [{
        line: ['tra_jygx', 'tra_shalun'],
        sect: ['keelung'],
        transStation: 'qidutra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        station: ["tra_1004", "tra_1005", "tra_1031", "tra_1006"],
        transStation: 'songshantra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        station: ["tra_1009", "tra_1032", "tra_1012", "tra_1013"],
        transStation: 'banqiaotra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        station: ["tra_1012", "tra_1013", "tra_1014"],
        transStation: 'taoyuantra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        station: ["tra_1016", "tra_1018"],
        transStation: 'zhonglitra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        station: ["tra_1019", "tra_1020", "tra_1036"],
        sect: ['hsinchu'],
        transStation: 'hsinchutra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        sect: ['chiayi'],
        transStation: 'jiayitra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        sect: ['tainan'],
        transStation: 'tainantra1'
      }, {
        line: ['tra_xibu', 'tra_liujia'],
        sect: ['kaohsiung'],
        transStation: 'gaoxungtra1'
      }]
    }, {
      id: 'tra_shan_zhjy_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_shan,tra_zhjy',
      lineInclude: [['tra_shan'], ['tra_zhjy']],
      rule: [{
        line: ['tra_zhjy'],
        sect: ['miaoli'],
        transStation: 'miaolitra1'
      }, {
        line: ['tra_zhjy'],
        station: ["tra_1315", "tra_1314", "tra_1310"],
        transStation: 'fengyuantra1'
      }, {
        line: ['tra_zhjy'],
        sect: ['taichung'],
        transStation: 'taizhongtra1'
      }, {
        line: ['tra_shan'],
        sect: ['changhua'],
        station: ["tra_1321", "tra_1324"],
        transStation: 'zhanghuatra1'
      }, {
        line: ['tra_shan'],
        sect: ['changhua'],
        transStation: 'yuanlintra1'
      }, {
        line: ['tra_shan'],
        sect: ['yunlin'],
        transStation: 'douliutra1'
      }, {
        line: ['tra_shan'],
        sect: ['chiayi'],
        transStation: 'jiayitra1'
      }]
    }, {
      id: 'tra_shan_jygx_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_shan,tra_jygx',
      lineInclude: [['tra_shan'], ['tra_jygx', 'tra_shalun']],
      rule: [{
        line: ['tra_jygx', 'tra_shalun'],
        sect: ['miaoli'],
        transStation: 'miaolitra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        station: ["tra_1315", "tra_1314", "tra_1310"],
        transStation: 'fengyuantra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        sect: ['taichung'],
        transStation: 'taizhongtra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        sect: ['changhua'],
        station: ["tra_1321", "tra_1324"],
        transStation: 'zhanghuatra1'
      }, {
        line: ['tra_shan'],
        sect: ['chiayi'],
        transStation: 'jiayitra1'
      }, {
        line: ['tra_shan'],
        sect: ['tainan'],
        transStation: 'tainantra1'
      }, {
        line: ['tra_shan'],
        sect: ['kaohsiung'],
        transStation: 'gaoxungtra1'
      }]
    }, {
      id: 'tra_zhjy_jygx_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_zhjy,tra_jygx',
      lineInclude: [['tra_zhjy'], ['tra_jygx', 'tra_shalun']],
      rule: [{
        line: ['tra_jygx', 'tra_shalun'],
        sect: ['changhua'],
        transStation: 'yuanlintra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        sect: ['yunlin'],
        transStation: 'douliutra1'
      }, {
        line: ['tra_jygx', 'tra_shalun'],
        sect: ['chiayi'],
        transStation: 'jiayitra1'
      }, {
        line: ['tra_zhjy'],
        sect: ['tainan'],
        transStation: 'tainantra1'
      }, {
        line: ['tra_zhjy'],
        sect: ['kaohsiung'],
        transStation: 'gaoxungtra1'
      }]
    }, {
      id: 'tra_xibu_shan_zhjy_pingdong_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_zhjy,tra_pingdong',
      lineInclude: [['tra_xibu', 'tra_shan', 'tra_zhjy', 'tra_liujia'], ['tra_pingdong']],
      rule: [{
        line: ['tra_pingdong'],
        sect: ['keelung'],
        transStation: 'qidutra1'
      }, {
        line: ['tra_pingdong'],
        station: ["tra_1004", "tra_1005", "tra_1031", "tra_1006"],
        transStation: 'songshantra1'
      }, {
        line: ['tra_pingdong'],
        station: ["tra_1009", "tra_1032", "tra_1012", "tra_1013"],
        transStation: 'banqiaotra1'
      }, {
        line: ['tra_pingdong'],
        station: ["tra_1012", "tra_1013", "tra_1014"],
        transStation: 'taoyuantra1'
      }, {
        line: ['tra_pingdong'],
        station: ["tra_1016", "tra_1018"],
        sect: ["taoyuan"],
        transStation: 'zhonglitra1'
      }, {
        line: ['tra_pingdong'],
        station: ["tra_1019", "tra_1020", "tra_1036"],
        sect: ['hsinchu'],
        transStation: 'hsinchutra1'
      }, {
        line: ['tra_pingdong'],
        sect: ['miaoli'],
        transStation: 'miaolitra1'
      }, {
        line: ['tra_pingdong'],
        sect: ['taichung'],
        transStation: 'taizhongtra1'
      }, {
        line: ['tra_pingdong'],
        sect: ['changhua'],
        transStation: 'zhanghuatra1'
      }, {
        line: ['tra_pingdong'],
        sect: ['changhua'],
        transStation: 'yuanlintra1'
      }, {
        line: ['tra_pingdong'],
        sect: ['yunlin'],
        transStation: 'douliutra1'
      }, {
        line: ['tra_pingdong'],
        sect: ['chiayi'],
        transStation: 'jiayitra1'
      }, {
        line: ['tra_zhjy'],
        sect: ['kaohsiung'],
        transStation: 'gaoxungtra1'
      }, {
        line: ['tra_zhjy'],
        sect: ['kaohsiung'],
        transStation: 'fongshantra1'
      }, {
        line: ['tra_zhjy'],
        sect: ['pingdong'],
        transStation: 'pingdongtra1'
      }, {
        line: ['tra_zhjy'],
        sect: ['pingdong'],
        transStation: 'chaozhoutra1'
      }]
    }, {
      id: 'tra_jygx_pingdong_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_jygx,tra_pingdong',
      lineInclude: [['tra_jygx', 'tra_shalun'], ['tra_pingdong']],
      rule: [{
        line: ['tra_jygx', 'tra_shalun', 'tra_pingdong'],
        sect: ['pingdong', 'kaohsiung', 'tainan'],
        transStation: 'chaozhoutra1'
      }, {
        line: ['tra_pingdong'],
        sect: ['tainan'],
        transStation: 'tainantra1'
      }, {
        line: ['tra_pingdong'],
        sect: ['kaohsiung', 'tainan'],
        transStation: 'gaoxungtra1'
      }]
    }, {
      id: 'tra_pingdong_inner_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_pingdong',
      lineInclude: [['tra_pingdong'], ['tra_pingdong']],
      rule: [{
        line: ['tra_pingdong'],
        sect: ['pingdong', 'kaohsiung'],
        transStation: 'chaozhoutra1'
      }]
    }, {
      id: 'tra_yilan_beihui_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_yilan,tra_beihui',
      lineInclude: [['tra_beihui'], ['tra_yilan', 'tra_pingxi']],
      rule: [{
        line: ['tra_beihui'],
        station: ["tra_1802", "tra_1803", "tra_1805", "tra_1806"],
        transStation: 'ruifangtra1'
      }, {
        line: ['tra_beihui'],
        station: ["tra_1807", "tra_1808", "tra_1809", "tra_1810", "tra_1811", "tra_1812", "tra_1813", "tra_1814", "tra_1815", "tra_1816", "tra_1817", "tra_1818", "tra_1819"],
        transStation: 'yilantra1'
      }, {
        line: ['tra_beihui'],
        station: ["tra_1821", "tra_1822", "tra_1824", "tra_1825"],
        transStation: 'luodongtra1'
      }, {
        line: ['tra_beihui'],
        station: ["tra_1827", "tra_1825", "tra_1824"],
        transStation: 'suaoxintra1'
      }, {
        line: ['tra_yilan', 'tra_pingxi'],
        sect: ['hualian'],
        transStation: 'hualiantra1'
      }]
    }, {
      id: 'tra_yilan_huadong_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_yilan,tra_huadong',
      lineInclude: [['tra_huadong'], ['tra_yilan', 'tra_pingxi']],
      rule: [{
        line: ['tra_huadong'],
        station: ["tra_1802", "tra_1803", "tra_1805", "tra_1806"],
        transStation: 'ruifangtra1'
      }, {
        line: ['tra_huadong'],
        station: ["tra_1807", "tra_1808", "tra_1809", "tra_1810", "tra_1811", "tra_1812", "tra_1813", "tra_1814", "tra_1815", "tra_1816", "tra_1817", "tra_1818", "tra_1819"],
        transStation: 'yilantra1'
      }, {
        line: ['tra_huadong'],
        station: ["tra_1821", "tra_1822", "tra_1824", "tra_1825"],
        transStation: 'luodongtra1'
      }, {
        line: ['tra_huadong'],
        station: ["tra_1827", "tra_1825", "tra_1824"],
        transStation: 'suaoxintra1'
      }, {
        line: ['tra_yilan', 'tra_pingxi'],
        sect: ['hualian'],
        transStation: 'hualiantra1'
      }, {
        line: ['tra_yilan', 'tra_pingxi'],
        sect: ['hualian'],
        station: ["tra_1624", "tra_1625", "tra_1626"],
        transStation: 'yulitra1'
      }, {
        line: ['tra_yilan', 'tra_pingxi'],
        sect: ['taidong'],
        transStation: 'taidongtra1'
      }]
    }, {
      id: 'tra_beihui_huadong_trans',
      rType: 'trans',
      company: 'tra',
      routeMapID: 'traInnerTrans_tra_yilan,tra_huadong',
      lineInclude: [['tra_huadong'], ['tra_beihui']],
      rule: [{
        line: ['tra_huadong'],
        sect: ['beihui', 'hualian'],
        transStation: 'hualiantra1'
      }]
    }, {
      id: 'tymetro_1_fast_normal_trans',
      rType: 'trans',
      company: 'tymetro',
      routeMapID: 'tymetroInnerTrans_tymetro_1,tymetro_1',
      rule: [{
        line: ['tymetro_1'],
        sect: ['taoyuan', 'taipei'],
        transStation: 'changgengyiyuan1'
      }]
    }, {
      id: 'trtc_trans_tra_east',
      rType: 'cross',
      //direct , trans 
      company: ['trtc', 'tra'],
      // cross company serial
      regLine: "^trtc_1$|^trtc_2$|^trtc_3$|^trtc_4|^trtc_5$|^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$",
      lineIsSame: {
        "tra_xibu": "^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$"
      },
      link: [{
        regLine: "^trtc_5|^tra_",
        transStation: [['banqiao1', 'taipei1', 'nangang1']]
      }, {
        regLine: "^trtc_3$|^trtc_4|^tra_",
        transStation: [['taipei2', 'songshan1']]
      }, {
        regLine: "^trtc_2$|^tra_",
        transStation: [['taipei2']]
      }],
      sect: ['hsinchu', 'taoyuan', 'taipei', 'keeling', 'northeast', 'yilan', 'beihui', 'hualian', 'taidong']
    }, {
      id: 'trtc_trans_tra_west',
      rType: 'cross',
      //direct , trans 
      company: ['trtc', 'tra'],
      // cross company serial
      regLine: "^trtc_1$|^trtc_2$|^trtc_3$|^trtc_4|^trtc_5$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong|^tra_shalun$|^tra_hai$|^tra_jiji$",
      lineIsSame: {
        "tra_xibu": "^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_jiji$"
      },
      link: [{
        regLine: "^trtc_5|^tra_",
        transStation: [['banqiao1', 'taipei1']]
      }, {
        regLine: "^trtc_3$|^trtc_4|^tra_",
        transStation: [['taipei2', 'songshan1']]
      }, {
        regLine: "^trtc_2$|^tra_",
        transStation: [['taipei2']]
      }],
      sect: ['hsinchu', 'taoyuan', 'taipei', 'keeling', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung', 'pingdong']
    }, {
      //TRA and TYMETRO trans
      id: 'tymetro_trans_tra_east',
      rType: 'cross',
      //direct , trans 
      company: ['tymetro', 'tra'],
      // cross company serial
      regLine: "^tymetro_1$|^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$",
      lineIsSame: {
        "tra_xibu": "^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$"
      },
      link: [{
        regLine: "^tymetro_1|^tra_",
        transStation: [['taipei4']]
      }],
      sect: ['hsinchu', 'taoyuan', 'taipei', 'keeling', 'northeast', 'yilan', 'beihui', 'hualian', 'taidong']
    }, {
      id: 'tymetro_trans_tra_west',
      rType: 'cross',
      //direct , trans 
      company: ['tymetro', 'tra'],
      // cross company serial
      regLine: "^tymetro_1$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_hai$|^tra_jiji$",
      lineIsSame: {
        "tra_xibu": "^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_hai$|^tra_jiji$"
      },
      link: [{
        regLine: "^tymetro_1|^tra_",
        transStation: [['taipei4']]
      }],
      sect: ['hsinchu', 'taoyuan', 'taipei', 'keeling', 'miaoli', 'taichung', 'changhua', 'yunlin', 'chiayi', 'tainan', 'kaohsiung', 'pingdong']
    }]
  };

  var trtc_line = [{"LineID":"BR","LineName":{"Zh_tw":"文湖線","En":"Wenhu Line"},"LineColor":"#b57a25","IsBranch":false,"Route":[{"RouteID":"BR-1","Direction":0,"LineID":"BR","Stations":["BR01","BR02","BR03","BR04","BR05","BR06","BR07","BR08","BR09","BR10","BR11","BR12","BR13","BR14","BR15","BR16","BR17","BR18","BR19","BR20","BR21","BR22","BR23","BR24"],"TravelTime":{"RunTime":[67,47,99,106,124,72,122,69,67,86,66,142,172,103,110,65,72,78,71,121,78,85,78,0],"StopTime":[0,25,18,20,18,18,20,25,30,45,35,35,18,25,25,25,25,25,20,18,20,20,18,0]}},{"RouteID":"BR-1","Direction":1,"LineID":"BR","Stations":["BR24","BR23","BR22","BR21","BR20","BR19","BR18","BR17","BR16","BR15","BR14","BR13","BR12","BR11","BR10","BR09","BR08","BR07","BR06","BR05","BR04","BR03","BR02","BR01"],"TravelTime":{"RunTime":[78,85,78,121,71,78,72,65,110,103,172,142,66,86,67,69,122,72,124,106,99,47,67,0],"StopTime":[0,18,20,20,18,20,25,25,25,25,25,18,35,35,45,30,25,20,18,18,20,18,25,0]}}],"Transfer":[{"FromLineID":"BR","FromStationID":"BR09","ToLineID":"R","ToStationID":"R05","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BR","FromStationID":"BR11","ToLineID":"G","ToStationID":"G16","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BR","FromStationID":"BR24","ToLineID":"BL","ToStationID":"BL23","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BR","FromStationID":"BR10","ToLineID":"BL","ToStationID":"BL15","IsOnSiteTransfer":1,"TransferTime":5}],"Frequency":[{"LineID":"BR","RouteID":"BR-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["06:00","07:00"],"AveMins":6},{"PeakFlag":"1","MinHeadwayMins":2,"MaxHeadwayMins":4,"Time":["07:00","09:00"],"AveMins":3},{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["09:00","17:00"],"AveMins":6},{"PeakFlag":"1","MinHeadwayMins":2,"MaxHeadwayMins":4,"Time":["17:00","19:30"],"AveMins":3},{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["19:30","23:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"BR","RouteID":"BR-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":4,"MaxHeadwayMins":7,"Time":["06:00","23:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]}],"main":["BR-1"]},{"LineID":"R","LineName":{"Zh_tw":"淡水信義線","En":"Tamsui-Xinyi Line"},"LineColor":"#d90023","IsBranch":false,"Route":[{"RouteID":"R-1","Direction":0,"LineID":"R","Stations":["R02","R03","R04","R05","R06","R07","R08","R09","R10","R11","R12","R13","R14","R15","R16","R17","R18","R19","R20","R21","R22","R23","R24","R25","R26","R27","R28"],"TravelTime":{"RunTime":[93,81,81,70,65,165,83,63,65,58,57,90,109,92,91,76,61,100,73,91,145,109,78,145,136,175,0],"StopTime":[0,30,30,30,30,35,35,25,45,30,25,35,25,25,25,25,25,25,25,25,25,25,25,25,25,25,0]}},{"RouteID":"R-1","Direction":1,"LineID":"R","Stations":["R28","R27","R26","R25","R24","R23","R22","R21","R20","R19","R18","R17","R16","R15","R14","R13","R12","R11","R10","R09","R08","R07","R06","R05","R04","R03","R02"],"TravelTime":{"RunTime":[175,136,145,78,109,145,91,73,100,61,76,91,92,109,90,57,58,65,63,83,165,65,70,81,81,93,0],"StopTime":[0,25,25,25,25,25,25,25,25,25,25,25,25,25,25,35,25,30,45,25,35,35,30,30,30,30,0]}},{"RouteID":"R-2","Direction":0,"LineID":"R","Stations":["R05","R06","R07","R08","R09","R10","R11","R12","R13","R14","R15","R16","R17","R18","R19","R20","R21","R22"],"TravelTime":{"RunTime":[70,65,165,83,63,65,58,57,90,109,92,91,76,61,100,73,91,0],"StopTime":[0,30,35,35,25,45,30,25,35,25,25,25,25,25,25,25,25,0]}},{"RouteID":"R-2","Direction":1,"LineID":"R","Stations":["R22","R21","R20","R19","R18","R17","R16","R15","R14","R13","R12","R11","R10","R09","R08","R07","R06","R05"],"TravelTime":{"RunTime":[91,73,100,61,76,91,92,109,90,57,58,65,63,83,165,65,70,0],"StopTime":[0,25,25,25,25,25,25,25,25,35,25,30,45,25,35,35,30,0]}},{"RouteID":"R-3","Direction":0,"LineID":"R","Stations":["R22","R22A"],"TravelTime":{"RunTime":[157,0],"StopTime":[0,0]}},{"RouteID":"R-3","Direction":1,"LineID":"R","Stations":["R22A","R22"],"TravelTime":{"RunTime":[157,0],"StopTime":[0,0]}}],"Transfer":[{"FromLineID":"R","FromStationID":"R22","ToLineID":"R","ToStationID":"R22","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"R","FromStationID":"R13","ToLineID":"O","ToStationID":"O11","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"R","FromStationID":"R11","ToLineID":"G","ToStationID":"G14","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"R","FromStationID":"R10","ToLineID":"BL","ToStationID":"BL12","IsOnSiteTransfer":1,"TransferTime":4},{"FromLineID":"R","FromStationID":"R08","ToLineID":"G","ToStationID":"G10","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"R","FromStationID":"R07","ToLineID":"O","ToStationID":"O06","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"R","FromStationID":"R05","ToLineID":"BR","ToStationID":"BR09","IsOnSiteTransfer":1,"TransferTime":5}],"Frequency":[{"LineID":"R","RouteID":"R-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"R","RouteID":"R-3","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":15,"Time":["06:00","06:30"],"AveMins":14},{"PeakFlag":"1","MinHeadwayMins":7,"MaxHeadwayMins":8,"Time":["06:30","09:00"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":10,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":10},{"PeakFlag":"1","MinHeadwayMins":7,"MaxHeadwayMins":8,"Time":["17:00","19:30"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":15,"Time":["23:00","00:00"],"AveMins":14}]},{"LineID":"R","RouteID":"R-3","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":10,"MaxHeadwayMins":12,"Time":["06:00","23:00"],"AveMins":11},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":15,"Time":["23:00","00:00"],"AveMins":14}]}],"main":["R-1","R-2"]},{"LineID":"G","LineName":{"Zh_tw":"松山新店線","En":"Songshan-Xindian Line"},"LineColor":"#107547","IsBranch":false,"Route":[{"RouteID":"G-1","Direction":0,"LineID":"G","Stations":["G01","G02","G03","G04","G05","G06","G07","G08","G09","G10","G11","G12","G13","G14","G15","G16","G17","G18","G19"],"TravelTime":{"RunTime":[111,78,75,89,87,119,67,88,83,75,81,75,114,106,92,84,102,138,0],"StopTime":[0,22,25,25,25,25,25,25,25,25,25,35,30,35,35,35,30,30,0]}},{"RouteID":"G-1","Direction":1,"LineID":"G","Stations":["G19","G18","G17","G16","G15","G14","G13","G12","G11","G10","G09","G08","G07","G06","G05","G04","G03","G02","G01"],"TravelTime":{"RunTime":[138,102,84,92,106,114,75,81,75,83,88,67,119,87,89,75,78,111,0],"StopTime":[0,30,30,35,35,35,30,35,25,25,25,25,25,25,25,25,25,22,0]}},{"RouteID":"G-2","Direction":0,"LineID":"G","Stations":["G08","G09","G10","G11","G12","G13","G14","G15","G16","G17","G18","G19"],"TravelTime":{"RunTime":[88,83,75,81,75,114,106,92,84,102,138,0],"StopTime":[0,25,25,25,35,30,35,35,35,30,30,0]}},{"RouteID":"G-2","Direction":1,"LineID":"G","Stations":["G19","G18","G17","G16","G15","G14","G13","G12","G11","G10","G09","G08"],"TravelTime":{"RunTime":[138,102,84,92,106,114,75,81,75,83,88,0],"StopTime":[0,30,30,35,35,35,30,35,25,25,25,0]}},{"RouteID":"G-3","Direction":0,"LineID":"G","Stations":["G03","G03A"],"TravelTime":{"RunTime":[203,0],"StopTime":[0,0]}},{"RouteID":"G-3","Direction":1,"LineID":"G","Stations":["G03A","G03"],"TravelTime":{"RunTime":[203,0],"StopTime":[0,0]}}],"Transfer":[{"FromLineID":"G","FromStationID":"G14","ToLineID":"R","ToStationID":"R11","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"G","FromStationID":"G10","ToLineID":"R","ToStationID":"R08","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G16","ToLineID":"BR","ToStationID":"BR11","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"G","FromStationID":"G15","ToLineID":"O","ToStationID":"O08","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G12","ToLineID":"BL","ToStationID":"BL11","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G09","ToLineID":"O","ToStationID":"O05","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"G","FromStationID":"G03","ToLineID":"G","ToStationID":"G03","IsOnSiteTransfer":1,"TransferTime":3}],"Frequency":[{"LineID":"G","RouteID":"G-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["06:00","07:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","17:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["19:30","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["06:00","07:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","17:00"],"AveMins":7},{"PeakFlag":"1","MinHeadwayMins":4,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":5},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["19:30","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","09:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":6,"MaxHeadwayMins":8,"Time":["09:00","23:00"],"AveMins":7},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"G","RouteID":"G-3","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":20,"Time":["06:00","00:00"],"AveMins":16}]},{"LineID":"G","RouteID":"G-3","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":20,"Time":["06:00","00:00"],"AveMins":16}]}],"main":["G-1","G-2"]},{"LineID":"O","LineName":{"Zh_tw":"中和新蘆線","En":"Zhonghe-Xinlu Line"},"LineColor":"#f5a818","IsBranch":false,"Route":[{"RouteID":"O-1","Direction":0,"LineID":"O","Stations":["O01","O02","O03","O04","O05","O06","O07","O08","O09","O10","O11","O12","O13","O14","O15","O16","O17","O18","O19","O20","O21"],"TravelTime":{"RunTime":[103,88,100,187,192,118,114,75,89,72,75,115,93,84,142,105,93,130,110,159,0],"StopTime":[0,25,25,25,40,35,35,35,35,35,45,35,25,25,25,25,25,25,25,25,0]}},{"RouteID":"O-1","Direction":1,"LineID":"O","Stations":["O21","O20","O19","O18","O17","O16","O15","O14","O13","O12","O11","O10","O09","O08","O07","O06","O05","O04","O03","O02","O01"],"TravelTime":{"RunTime":[159,110,130,93,105,142,84,93,115,75,72,89,75,114,118,192,187,100,88,103,0],"StopTime":[0,25,25,25,25,25,25,25,25,35,45,35,35,35,35,35,40,25,25,25,0]}},{"RouteID":"O-2","Direction":0,"LineID":"O","Stations":["O01","O02","O03","O04","O05","O06","O07","O08","O09","O10","O11","O12","O50","O51","O52","O53","O54"],"TravelTime":{"RunTime":[103,88,100,187,192,118,114,75,89,72,75,148,104,82,87,110,0],"StopTime":[0,25,25,25,40,35,35,35,35,35,45,35,30,30,30,30,0]}},{"RouteID":"O-2","Direction":1,"LineID":"O","Stations":["O54","O53","O52","O51","O50","O12","O11","O10","O09","O08","O07","O06","O05","O04","O03","O02","O01"],"TravelTime":{"RunTime":[110,87,82,104,148,75,72,89,75,114,118,192,187,100,88,103,0],"StopTime":[0,30,30,30,30,35,45,35,35,35,35,35,40,25,25,25,0]}}],"Transfer":[{"FromLineID":"O","FromStationID":"O11","ToLineID":"R","ToStationID":"R13","IsOnSiteTransfer":1,"TransferTime":3},{"FromLineID":"O","FromStationID":"O06","ToLineID":"R","ToStationID":"R07","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"O","FromStationID":"O08","ToLineID":"G","ToStationID":"G15","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"O","FromStationID":"O05","ToLineID":"G","ToStationID":"G09","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"O","FromStationID":"O12","ToLineID":"O","ToStationID":"O12","IsOnSiteTransfer":1,"TransferTime":1},{"FromLineID":"O","FromStationID":"O07","ToLineID":"BL","ToStationID":"BL14","IsOnSiteTransfer":1,"TransferTime":2}],"Frequency":[{"LineID":"O","RouteID":"O-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":9,"MaxHeadwayMins":10,"Time":["06:00","23:00"],"AveMins":10},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"O","RouteID":"O-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"O","RouteID":"O-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":9,"MaxHeadwayMins":10,"Time":["06:00","23:00"],"AveMins":10},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]},{"LineID":"O","RouteID":"O-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":12,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":12}]}],"main":["O-1","O-2"]},{"LineID":"BL","LineName":{"Zh_tw":"板南線","En":"Bannan Line"},"LineColor":"#0a59ae","IsBranch":false,"Route":[{"RouteID":"BL-1","Direction":0,"LineID":"BL","Stations":["BL01","BL02","BL03","BL04","BL05","BL06","BL07","BL08","BL09","BL10","BL11","BL12","BL13","BL14","BL15","BL16","BL17","BL18","BL19","BL20","BL21","BL22","BL23"],"TravelTime":{"RunTime":[180,95,106,142,92,89,102,74,190,103,132,64,76,84,63,67,72,82,73,99,105,114,0],"StopTime":[0,25,25,25,25,25,25,30,28,28,30,40,30,28,40,28,28,28,25,25,25,25,0]}},{"RouteID":"BL-1","Direction":1,"LineID":"BL","Stations":["BL23","BL22","BL21","BL20","BL19","BL18","BL17","BL16","BL15","BL14","BL13","BL12","BL11","BL10","BL09","BL08","BL07","BL06","BL05","BL04","BL03","BL02","BL01"],"TravelTime":{"RunTime":[114,105,99,73,82,72,67,63,84,76,64,132,103,190,74,102,89,92,142,106,95,180,0],"StopTime":[0,25,25,25,25,28,28,28,40,28,30,40,30,28,28,30,25,25,25,25,25,25,0]}},{"RouteID":"BL-2","Direction":0,"LineID":"BL","Stations":["BL05","BL06","BL07","BL08","BL09","BL10","BL11","BL12","BL13","BL14","BL15","BL16","BL17","BL18","BL19","BL20","BL21","BL22","BL23"],"TravelTime":{"RunTime":[92,89,102,74,190,103,132,64,76,84,63,67,72,82,73,99,105,114,0],"StopTime":[0,25,25,30,28,28,30,40,30,28,40,28,28,28,25,25,25,25,0]}},{"RouteID":"BL-2","Direction":1,"LineID":"BL","Stations":["BL23","BL22","BL21","BL20","BL19","BL18","BL17","BL16","BL15","BL14","BL13","BL12","BL11","BL10","BL09","BL08","BL07","BL06","BL05"],"TravelTime":{"RunTime":[114,105,99,73,82,72,67,63,84,76,64,132,103,190,74,102,89,92,0],"StopTime":[0,25,25,25,25,28,28,28,40,28,30,40,30,28,28,30,25,25,0]}}],"Transfer":[{"FromLineID":"BL","FromStationID":"BL12","ToLineID":"R","ToStationID":"R10","IsOnSiteTransfer":1,"TransferTime":4},{"FromLineID":"BL","FromStationID":"BL11","ToLineID":"G","ToStationID":"G12","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"BL","FromStationID":"BL14","ToLineID":"O","ToStationID":"O07","IsOnSiteTransfer":1,"TransferTime":2},{"FromLineID":"BL","FromStationID":"BL23","ToLineID":"BR","ToStationID":"BR24","IsOnSiteTransfer":1,"TransferTime":5},{"FromLineID":"BL","FromStationID":"BL15","ToLineID":"BR","ToStationID":"BR10","IsOnSiteTransfer":1,"TransferTime":5}],"Frequency":[{"LineID":"BL","RouteID":"BL-1","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]},{"LineID":"BL","RouteID":"BL-1","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":8,"Time":["06:00","09:00"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":9,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]},{"LineID":"BL","RouteID":"BL-2","ServiceDays":{"ServiceTag":"假日","NationalHolidays":true,"week":[true,false,false,false,false,false,true]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":8,"Time":["06:00","09:00"],"AveMins":8},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":9,"Time":["09:00","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]},{"LineID":"BL","RouteID":"BL-2","ServiceDays":{"ServiceTag":"平日","NationalHolidays":false,"week":[false,true,true,true,true,true,false]},"OperationTime":["06:00","24:00"],"Headways":[{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["06:00","07:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["07:00","09:00"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["09:00","17:00"],"AveMins":9},{"PeakFlag":"1","MinHeadwayMins":6,"MaxHeadwayMins":6,"Time":["17:00","19:30"],"AveMins":6},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":10,"Time":["19:30","23:00"],"AveMins":9},{"PeakFlag":"0","MinHeadwayMins":8,"MaxHeadwayMins":12,"Time":["23:00","00:00"],"AveMins":10}]}],"main":["BL-1","BL-2"]}];

  var krtc_line = [{"LineID":"R","LineName":{"Zh_tw":"紅線","En":"Red Line"},"LineColor":"#d30547","IsBranch":false,"Route":[{"RouteID":"R","Direction":0,"LineID":"R","Stations":["R3","R4","R4A","R5","R6","R7","R8","R9","R10","R11","R12","R13","R14","R15","R16","R17","R18","R19","R20","R21","R22","R22A","R23","R24"],"TravelTime":{"RunTime":[120,180,180,180,180,120,180,120,180,180,120,120,180,180,180,120,180,120,120,180,120,120,240,0],"StopTime":[20,25,25,20,20,30,30,40,40,25,25,35,20,30,20,20,20,20,20,20,20,25,300,0]}},{"RouteID":"R","Direction":1,"LineID":"R","Stations":["R24","R23","R22A","R22","R21","R20","R19","R18","R17","R16","R15","R14","R13","R12","R11","R10","R9","R8","R7","R6","R5","R4A","R4","R3"],"TravelTime":{"RunTime":[240,120,120,180,120,120,180,120,180,180,180,120,120,180,180,120,180,120,180,180,180,180,120,0],"StopTime":[0,300,25,20,20,20,20,20,20,20,30,20,35,25,25,40,40,30,30,20,20,25,25,20]}}],"Transfer":[{"FromLineID":"R","FromStationID":"R10","ToLineID":"O","ToStationID":"O5","TransferTime":3}],"Frequency":[]},{"LineID":"O","LineName":{"Zh_tw":"橘線","En":"Orange Line"},"LineColor":"#f77f00","IsBranch":false,"Route":[{"RouteID":"O","Direction":0,"LineID":"O","Stations":["O1","O2","O4","O5","O6","O7","O8","O9","O10","O11","O12","O13","O14","OT1"],"TravelTime":{"RunTime":[120,120,120,120,120,120,120,120,120,120,240,120,240,0],"StopTime":[20,20,40,20,25,20,20,25,25,20,20,20,300,0]}},{"RouteID":"O","Direction":1,"LineID":"O","Stations":["OT1","O14","O13","O12","O11","O10","O9","O8","O7","O6","O5","O4","O2","O1"],"TravelTime":{"RunTime":[240,120,240,120,120,120,120,120,120,120,120,120,120,0],"StopTime":[0,300,20,20,20,25,25,20,20,25,20,40,20,20]}}],"Transfer":[{"FromLineID":"O","FromStationID":"O5","ToLineID":"R","ToStationID":"R10","TransferTime":3}],"Frequency":[]}];

  var tymetro_line = [{"LineID":"A","LineName":{"Zh_tw":"桃園機場捷運線","En":"Airport MRT Line"},"LineColor":"#8246af","IsBranch":false,"Route":[{"RouteID":"A","Direction":0,"LineID":"A","Stations":["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14a","A15","A16","A17","A18","A19","A20","A21"]},{"RouteID":"A","Direction":1,"LineID":"A","Stations":["A21","A20","A19","A18","A17","A16","A15","A14a","A13","A12","A11","A10","A9","A8","A7","A6","A5","A4","A3","A2","A1"]}],"Transfer":[],"TravelTime":[null,null,null,null],"Frequency":[{"LineID":"A","RouteID":"A","TrainType":1,"LineNo":"A","ServiceDays":{"ServiceTag":"每日","NationalHolidays":true,"week":[true,true,true,true,true,true,true]},"OperationTime":["05:57","00:25"],"Headways":[{"PeakFlag":"1","MinHeadwayMins":15,"MaxHeadwayMins":15,"Time":["05:57","00:25"],"AveMins":15}]}],"TravelTimeBetween":{"TrainType1":{"A1":{"A2":300,"A3":539,"A4":669,"A5":757,"A6":908,"A7":1189,"A8":1363,"A9":1511,"A10":2033,"A11":2154,"A12":2346,"A13":2451,"A14a":2505,"A15":2651,"A16":2813,"A17":2931,"A18":3133,"A19":3263,"A20":3523,"A21":3732},"A2":{"A3":239,"A4":369,"A5":457,"A6":608,"A7":889,"A8":1063,"A9":1211,"A10":1733,"A11":1854,"A12":2046,"A13":2151,"A14a":2205,"A15":2351,"A16":2513,"A17":2631,"A18":2833,"A19":2963,"A20":3223,"A21":3432,"A1":305},"A3":{"A4":130,"A5":218,"A6":369,"A7":650,"A8":824,"A9":972,"A10":1494,"A11":1615,"A12":1807,"A13":1912,"A14a":1966,"A15":2112,"A16":2274,"A17":2392,"A18":2594,"A19":2724,"A20":2984,"A21":3193,"A1":541,"A2":236},"A4":{"A5":88,"A6":239,"A7":520,"A8":694,"A9":842,"A10":1364,"A11":1485,"A12":1677,"A13":1782,"A14a":1836,"A15":1982,"A16":2144,"A17":2262,"A18":2464,"A19":2594,"A20":2854,"A21":3063,"A1":669,"A2":364,"A3":128},"A5":{"A6":151,"A7":432,"A8":606,"A9":754,"A10":1276,"A11":1397,"A12":1589,"A13":1694,"A14a":1748,"A15":1894,"A16":2056,"A17":2174,"A18":2376,"A19":2506,"A20":2766,"A21":2975,"A1":754,"A2":449,"A3":213,"A4":85},"A6":{"A7":281,"A8":455,"A9":603,"A10":1125,"A11":1246,"A12":1438,"A13":1543,"A14a":1597,"A15":1743,"A16":1905,"A17":2023,"A18":2225,"A19":2355,"A20":2615,"A21":2824,"A1":910,"A2":605,"A3":369,"A4":241,"A5":156},"A7":{"A8":174,"A9":322,"A10":844,"A11":965,"A12":1157,"A13":1262,"A14a":1316,"A15":1462,"A16":1624,"A17":1742,"A18":1944,"A19":2074,"A20":2334,"A21":2543,"A1":1225,"A2":920,"A3":684,"A4":556,"A5":471,"A6":315},"A8":{"A9":148,"A10":670,"A11":791,"A12":983,"A13":1088,"A14a":1142,"A15":1288,"A16":1450,"A17":1568,"A18":1770,"A19":1900,"A20":2160,"A21":2369,"A1":1435,"A2":1130,"A3":894,"A4":766,"A5":681,"A6":525,"A7":210},"A9":{"A10":522,"A11":643,"A12":835,"A13":940,"A14a":994,"A15":1140,"A16":1302,"A17":1420,"A18":1622,"A19":1752,"A20":2012,"A21":2221,"A1":1587,"A2":1282,"A3":1046,"A4":918,"A5":833,"A6":677,"A7":362,"A8":152},"A10":{"A11":121,"A12":313,"A13":418,"A14a":472,"A15":618,"A16":780,"A17":898,"A18":1100,"A19":1230,"A20":1490,"A21":1699,"A1":2007,"A2":1702,"A3":1466,"A4":1338,"A5":1253,"A6":1097,"A7":782,"A8":572,"A9":420},"A11":{"A12":192,"A13":297,"A14a":351,"A15":497,"A16":659,"A17":777,"A18":979,"A19":1109,"A20":1369,"A21":1578,"A1":2126,"A2":1821,"A3":1585,"A4":1457,"A5":1372,"A6":1216,"A7":901,"A8":691,"A9":539,"A10":119},"A12":{"A13":105,"A14a":159,"A15":305,"A16":467,"A17":585,"A18":787,"A19":917,"A20":1177,"A21":1386,"A1":2311,"A2":2006,"A3":1770,"A4":1642,"A5":1557,"A6":1401,"A7":1086,"A8":876,"A9":724,"A10":304,"A11":185},"A13":{"A14a":54,"A15":200,"A16":362,"A17":480,"A18":682,"A19":812,"A20":1072,"A21":1281,"A1":2412,"A2":2107,"A3":1871,"A4":1743,"A5":1658,"A6":1502,"A7":1187,"A8":977,"A9":825,"A10":405,"A11":286,"A12":101},"A14a":{"A15":146,"A16":308,"A17":426,"A18":628,"A19":758,"A20":1018,"A21":1227,"A1":2472,"A2":2167,"A3":1931,"A4":1803,"A5":1718,"A6":1562,"A7":1247,"A8":1037,"A9":885,"A10":465,"A11":346,"A12":161,"A13":60},"A15":{"A16":162,"A17":280,"A18":482,"A19":612,"A20":872,"A21":1081,"A1":2624,"A2":2319,"A3":2083,"A4":1955,"A5":1870,"A6":1714,"A7":1399,"A8":1189,"A9":1037,"A10":617,"A11":498,"A12":313,"A13":212,"A14a":152},"A16":{"A17":118,"A18":320,"A19":450,"A20":710,"A21":919,"A1":2787,"A2":2482,"A3":2246,"A4":2118,"A5":2033,"A6":1877,"A7":1562,"A8":1352,"A9":1200,"A10":780,"A11":661,"A12":476,"A13":375,"A14a":315,"A15":163},"A17":{"A18":202,"A19":332,"A20":592,"A21":801,"A1":2992,"A2":2687,"A3":2451,"A4":2323,"A5":2238,"A6":2082,"A7":1767,"A8":1557,"A9":1405,"A10":985,"A11":866,"A12":681,"A13":580,"A14a":520,"A15":368,"A16":205},"A18":{"A19":130,"A20":390,"A21":599,"A1":3205,"A2":2900,"A3":2664,"A4":2536,"A5":2451,"A6":2295,"A7":1980,"A8":1770,"A9":1618,"A10":1198,"A11":1079,"A12":894,"A13":793,"A14a":733,"A15":581,"A16":418,"A17":213},"A19":{"A20":260,"A21":469,"A1":3335,"A2":3030,"A3":2794,"A4":2666,"A5":2581,"A6":2425,"A7":2110,"A8":1900,"A9":1748,"A10":1328,"A11":1209,"A12":1024,"A13":923,"A14a":863,"A15":711,"A16":548,"A17":343,"A18":130},"A20":{"A21":209,"A1":3600,"A2":3295,"A3":3059,"A4":2931,"A5":2846,"A6":2690,"A7":2375,"A8":2165,"A9":2013,"A10":1593,"A11":1474,"A12":1289,"A13":1188,"A14a":1128,"A15":976,"A16":813,"A17":608,"A18":395,"A19":265},"A21":{"A1":3753,"A2":3448,"A3":3212,"A4":3084,"A5":2999,"A6":2843,"A7":2528,"A8":2318,"A9":2166,"A10":1746,"A11":1627,"A12":1442,"A13":1341,"A14a":1281,"A15":1129,"A16":966,"A17":761,"A18":548,"A19":418,"A20":153}},"TrainType2":{"A1":{"A3":95,"A8":758,"A12":1622,"A13":1723},"A3":{"A8":663,"A12":1527,"A13":1628,"A1":479},"A8":{"A12":864,"A13":965,"A1":1246,"A3":767},"A12":{"A13":101,"A1":1964,"A3":1485,"A8":718},"A13":{"A1":2052,"A3":1573,"A8":806,"A12":88}}}}];

  var trtc_station = [{"StationID":"BR01","lat":24.998205,"lon":24.998205,"name":"動物園","ename":"Taipei Zoo","FirstLast":[{"To":"BR24","Time":["06:00","00:00"]}]},{"StationID":"BR02","lat":24.99824,"lon":24.99824,"name":"木柵","ename":"Muzha","FirstLast":[{"To":"BR24","Time":["06:01","00:01"]},{"To":"BR01","Time":["06:04","00:53"]}]},{"StationID":"BR03","lat":24.99857,"lon":24.99857,"name":"萬芳社區","ename":"Wanfang Community","FirstLast":[{"To":"BR24","Time":["06:02","00:03"]},{"To":"BR01","Time":["06:03","00:52"]}]},{"StationID":"BR04","lat":24.99932,"lon":24.99932,"name":"萬芳醫院","ename":"Wanfang Hospital","FirstLast":[{"To":"BR24","Time":["06:04","00:05"]},{"To":"BR01","Time":["06:01","00:49"]}]},{"StationID":"BR05","lat":25.005455,"lon":25.005455,"name":"辛亥","ename":"Xinhai","FirstLast":[{"To":"BR24","Time":["06:00","00:07"]},{"To":"BR01","Time":["06:00","00:47"]}]},{"StationID":"BR06","lat":25.018495,"lon":25.018495,"name":"麟光","ename":"Linguang","FirstLast":[{"To":"BR24","Time":["06:01","00:10"]},{"To":"BR01","Time":["06:03","00:44"]}]},{"StationID":"BR07","lat":25.02381,"lon":25.02381,"name":"六張犁","ename":"Liuzhangli","FirstLast":[{"To":"BR24","Time":["06:03","00:12"]},{"To":"BR01","Time":["06:01","00:42"]}]},{"StationID":"BR08","lat":25.02612,"lon":25.02612,"name":"科技大樓","ename":"Technology Building","FirstLast":[{"To":"BR24","Time":["06:00","00:15"]},{"To":"BR01","Time":["06:00","00:39"]}]},{"StationID":"BR09","lat":25.033311,"lon":25.033311,"name":"大安","ename":"Daan","FirstLast":[{"To":"BR24","Time":["06:01","00:33"]},{"To":"BR01","Time":["06:05","00:37"]}]},{"StationID":"BR10","lat":25.041749,"lon":25.041749,"name":"忠孝復興","ename":"Zhongxiao Fuxing","FirstLast":[{"To":"BR24","Time":["06:03","00:35"]},{"To":"BR01","Time":["06:03","00:35"]}]},{"StationID":"BR11","lat":25.052044,"lon":25.052044,"name":"南京復興","ename":"Nanjing Fuxing","FirstLast":[{"To":"BR24","Time":["06:05","00:38"]},{"To":"BR01","Time":["06:01","00:33"]}]},{"StationID":"BR12","lat":25.06085,"lon":25.06085,"name":"中山國中","ename":"Zhongshan Junior High School","FirstLast":[{"To":"BR24","Time":["06:00","00:40"]},{"To":"BR01","Time":["06:00","00:29"]}]},{"StationID":"BR13","lat":25.062908,"lon":25.062908,"name":"松山機場","ename":"Songshan Airport","FirstLast":[{"To":"BR24","Time":["06:02","00:43"]},{"To":"BR01","Time":["06:02","00:25"]}]},{"StationID":"BR14","lat":25.07943,"lon":25.07943,"name":"大直","ename":"Dazhi","FirstLast":[{"To":"BR24","Time":["06:00","00:46"]},{"To":"BR01","Time":["06:00","00:22"]}]},{"StationID":"BR15","lat":25.08483,"lon":25.08483,"name":"劍南路","ename":"Jiannan Rd.","FirstLast":[{"To":"BR24","Time":["06:01","00:49"]},{"To":"BR01","Time":["06:03","00:19"]}]},{"StationID":"BR16","lat":25.08216,"lon":25.08216,"name":"西湖","ename":"Xihu","FirstLast":[{"To":"BR24","Time":["06:03","00:52"]},{"To":"BR01","Time":["06:01","00:16"]}]},{"StationID":"BR17","lat":25.08007,"lon":25.08007,"name":"港墘","ename":"Gangqian","FirstLast":[{"To":"BR24","Time":["06:00","00:54"]},{"To":"BR01","Time":["06:00","00:14"]}]},{"StationID":"BR18","lat":25.078455,"lon":25.078455,"name":"文德","ename":"Wende","FirstLast":[{"To":"BR24","Time":["06:01","00:56"]},{"To":"BR01","Time":["06:05","00:12"]}]},{"StationID":"BR19","lat":25.083675,"lon":25.083675,"name":"內湖","ename":"Neihu","FirstLast":[{"To":"BR24","Time":["06:02","00:58"]},{"To":"BR01","Time":["06:03","00:10"]}]},{"StationID":"BR20","lat":25.083805,"lon":25.083805,"name":"大湖公園","ename":"Dahu Park","FirstLast":[{"To":"BR24","Time":["06:04","01:00"]},{"To":"BR01","Time":["06:01","00:08"]}]},{"StationID":"BR21","lat":25.07271,"lon":25.07271,"name":"葫洲","ename":"Huzhou","FirstLast":[{"To":"BR24","Time":["06:00","01:03"]},{"To":"BR01","Time":["06:00","00:05"]}]},{"StationID":"BR22","lat":25.067455,"lon":25.067455,"name":"東湖","ename":"Donghu","FirstLast":[{"To":"BR24","Time":["06:01","01:05"]},{"To":"BR01","Time":["06:03","00:03"]}]},{"StationID":"BR23","lat":25.05992,"lon":25.05992,"name":"南港軟體園區","ename":"Nangang Software Park","FirstLast":[{"To":"BR24","Time":["06:03","01:07"]},{"To":"BR01","Time":["06:01","00:01"]}]},{"StationID":"BR24","lat":25.054919,"lon":25.054919,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center","FirstLast":[{"To":"BR01","Time":["06:00","00:00"]}]},{"StationID":"R02","lat":25.032395,"lon":25.032395,"name":"象山","ename":"Xiangshan","FirstLast":[{"To":"R28","Time":["06:00","00:00"]}]},{"StationID":"R03","lat":25.032865,"lon":25.032865,"name":"台北101/世貿","ename":"Taipei 101/World Trade Center","FirstLast":[{"To":"R28","Time":["06:02","00:02"]},{"To":"R02","Time":["06:04","00:56"]}]},{"StationID":"R04","lat":25.033015,"lon":25.033015,"name":"信義安和","ename":"Xinyi Anhe","FirstLast":[{"To":"R28","Time":["06:04","00:04"]},{"To":"R02","Time":["06:02","00:54"]}]},{"StationID":"R05","lat":25.033311,"lon":25.033311,"name":"大安","ename":"Daan","FirstLast":[{"To":"R28","Time":["06:00","00:25"]},{"To":"R02","Time":["06:00","00:52"]}]},{"StationID":"R06","lat":25.033225,"lon":25.033225,"name":"大安森林公園","ename":"Daan Park","FirstLast":[{"To":"R28","Time":["06:01","00:26"]},{"To":"R02","Time":["06:08","00:50"]}]},{"StationID":"R07","lat":25.033894,"lon":25.033894,"name":"東門","ename":"Dongmen","FirstLast":[{"To":"R28","Time":["06:03","00:28"]},{"To":"R02","Time":["06:06","00:49"]}]},{"StationID":"R08","lat":25.032767,"lon":25.032767,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall","FirstLast":[{"To":"R28","Time":["06:06","00:31"]},{"To":"R02","Time":["06:03","00:45"]}]},{"StationID":"R09","lat":25.041399,"lon":25.041399,"name":"台大醫院","ename":"NTU Hospital","FirstLast":[{"To":"R28","Time":["06:08","00:33"]},{"To":"R02","Time":["06:01","00:43"]}]},{"StationID":"R10","lat":25.04631,"lon":25.04631,"name":"台北車站","ename":"Taipei Main Station","FirstLast":[{"To":"R28","Time":["06:00","00:35"]},{"To":"R02","Time":["06:00","00:41"]}]},{"StationID":"R11","lat":25.052621,"lon":25.052621,"name":"中山","ename":"Zhongshan","FirstLast":[{"To":"R28","Time":["06:02","00:37"]},{"To":"R02","Time":["06:03","00:40"]}]},{"StationID":"R12","lat":25.057575,"lon":25.057575,"name":"雙連","ename":"Shuanglian","FirstLast":[{"To":"R28","Time":["06:03","00:38"]},{"To":"R02","Time":["06:01","00:38"]}]},{"StationID":"R13","lat":25.06235,"lon":25.06235,"name":"民權西路","ename":"Minzuan W. Rd.","FirstLast":[{"To":"R28","Time":["06:05","00:39"]},{"To":"R02","Time":["06:00","00:37"]}]},{"StationID":"R14","lat":25.071409,"lon":25.071409,"name":"圓山","ename":"Yuanshan","FirstLast":[{"To":"R28","Time":["06:07","00:42"]},{"To":"R02","Time":["06:02","00:34"]}]},{"StationID":"R15","lat":25.084201,"lon":25.084201,"name":"劍潭","ename":"Jiantan","FirstLast":[{"To":"R28","Time":["06:00","00:45"]},{"To":"R02","Time":["06:00","00:31"]}]},{"StationID":"R16","lat":25.093492,"lon":25.093492,"name":"士林","ename":"Shilin","FirstLast":[{"To":"R28","Time":["06:02","00:47"]},{"To":"R02","Time":["06:05","00:28"]}]},{"StationID":"R17","lat":25.102718,"lon":25.102718,"name":"芝山","ename":"Zhishan","FirstLast":[{"To":"R28","Time":["06:04","00:50"]},{"To":"R02","Time":["06:03","00:26"]}]},{"StationID":"R18","lat":25.109815,"lon":25.109815,"name":"明德","ename":"Mingde","FirstLast":[{"To":"R28","Time":["06:05","00:52"]},{"To":"R02","Time":["06:01","00:24"]}]},{"StationID":"R19","lat":25.114455,"lon":25.114455,"name":"石牌","ename":"Shipai","FirstLast":[{"To":"R28","Time":["06:07","00:53"]},{"To":"R02","Time":["06:00","00:23"]}]},{"StationID":"R20","lat":25.120852,"lon":25.120852,"name":"唭哩岸","ename":"Qilian","FirstLast":[{"To":"R28","Time":["06:00","00:56"]},{"To":"R02","Time":["06:00","00:19"]}]},{"StationID":"R21","lat":25.12547,"lon":25.12547,"name":"奇岩","ename":"Qiyan","FirstLast":[{"To":"R28","Time":["06:02","00:58"]},{"To":"R02","Time":["06:02","00:18"]}]},{"StationID":"R22","lat":25.131819,"lon":25.131819,"name":"北投","ename":"Beitou","FirstLast":[{"To":"R28","Time":["06:03","01:00"]},{"To":"R02","Time":["06:00","00:16"]},{"To":"R22A","Time":["06:00","00:10"]}]},{"StationID":"R22A","lat":25.136931,"lon":25.136931,"name":"新北投","ename":"Xinbeitou","FirstLast":[{"To":"R22","Time":["06:05","00:02"]}]},{"StationID":"R23","lat":25.137497,"lon":25.137497,"name":"復興崗","ename":"Fuxinggang","FirstLast":[{"To":"R28","Time":["06:06","01:03"]},{"To":"R02","Time":["06:02","00:12"]}]},{"StationID":"R24","lat":25.130923,"lon":25.130923,"name":"忠義","ename":"Zhongyi","FirstLast":[{"To":"R28","Time":["06:02","01:05"]},{"To":"R02","Time":["06:00","00:10"]}]},{"StationID":"R25","lat":25.12551,"lon":25.12551,"name":"關渡","ename":"Guandu","FirstLast":[{"To":"R28","Time":["06:04","01:07"]},{"To":"R02","Time":["06:08","00:08"]}]},{"StationID":"R26","lat":25.1369,"lon":25.1369,"name":"竹圍","ename":"Zhuwei","FirstLast":[{"To":"R28","Time":["06:07","01:10"]},{"To":"R02","Time":["06:05","00:06"]}]},{"StationID":"R27","lat":25.15399,"lon":25.15399,"name":"紅樹林","ename":"Hongshulin","FirstLast":[{"To":"R28","Time":["06:00","01:13"]},{"To":"R02","Time":["06:03","00:03"]}]},{"StationID":"R28","lat":25.167745,"lon":25.167745,"name":"淡水","ename":"Tamsui","FirstLast":[{"To":"R02","Time":["06:00","00:00"]}]},{"StationID":"G01","lat":24.95761,"lon":24.95761,"name":"新店","ename":"Xindian","FirstLast":[{"To":"G19","Time":["06:00","00:00"]}]},{"StationID":"G02","lat":24.96744,"lon":24.96744,"name":"新店區公所","ename":"Xindian District Office","FirstLast":[{"To":"G19","Time":["06:02","00:02"]},{"To":"G01","Time":["06:02","01:05"]}]},{"StationID":"G03","lat":24.97545,"lon":24.97545,"name":"七張","ename":"Qizhang","FirstLast":[{"To":"G19","Time":["06:03","00:03"]},{"To":"G01","Time":["06:00","01:03"]},{"To":"G03","Time":["06:03","23:57"]}]},{"StationID":"G03A","lat":24.97188,"lon":24.97188,"name":"小碧潭","ename":"Xiaobitan","FirstLast":[{"To":"G03A","Time":["06:11","00:09"]}]},{"StationID":"G04","lat":24.98272,"lon":24.98272,"name":"大坪林","ename":"Dapinglin","FirstLast":[{"To":"G19","Time":["06:00","00:05"]},{"To":"G01","Time":["06:08","01:02"]}]},{"StationID":"G05","lat":24.992824,"lon":24.992824,"name":"景美","ename":"Jingmei","FirstLast":[{"To":"G19","Time":["06:02","00:07"]},{"To":"G01","Time":["06:06","01:00"]}]},{"StationID":"G06","lat":25.001978,"lon":25.001978,"name":"萬隆","ename":"Wanlong","FirstLast":[{"To":"G19","Time":["06:04","00:08"]},{"To":"G01","Time":["06:04","00:58"]}]},{"StationID":"G07","lat":25.014781,"lon":25.014781,"name":"公館","ename":"Gongguan","FirstLast":[{"To":"G19","Time":["06:00","00:11"]},{"To":"G01","Time":["06:02","00:55"]}]},{"StationID":"G08","lat":25.020733,"lon":25.020733,"name":"台電大樓","ename":"Taipower Building","FirstLast":[{"To":"G19","Time":["06:02","00:12"]},{"To":"G01","Time":["06:00","00:54"]}]},{"StationID":"G09","lat":25.026373,"lon":25.026373,"name":"古亭","ename":"Guting","FirstLast":[{"To":"G19","Time":["06:04","00:14"]},{"To":"G01","Time":["06:05","00:52"]}]},{"StationID":"G10","lat":25.032767,"lon":25.032767,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall","FirstLast":[{"To":"G19","Time":["06:00","00:16"]},{"To":"G01","Time":["06:03","00:50"]}]},{"StationID":"G11","lat":25.035585,"lon":25.035585,"name":"小南門","ename":"Xiaonanmen","FirstLast":[{"To":"G19","Time":["06:02","00:18"]},{"To":"G01","Time":["06:02","00:48"]}]},{"StationID":"G12","lat":25.042025,"lon":25.042025,"name":"西門","ename":"Ximen","FirstLast":[{"To":"G19","Time":["06:04","00:27"]},{"To":"G01","Time":["06:00","00:46"]}]},{"StationID":"G13","lat":25.049554,"lon":25.049554,"name":"北門","ename":"Beimen","FirstLast":[{"To":"G19","Time":["06:00","00:41"]},{"To":"G01","Time":["06:02","00:44"]}]},{"StationID":"G14","lat":25.052621,"lon":25.052621,"name":"中山","ename":"Zhongshan","FirstLast":[{"To":"G19","Time":["06:02","00:43"]},{"To":"G01","Time":["06:00","00:42"]}]},{"StationID":"G15","lat":25.052693,"lon":25.052693,"name":"松江南京","ename":"Songliang Nanjing","FirstLast":[{"To":"G19","Time":["06:05","00:45"]},{"To":"G01","Time":["06:02","00:40"]}]},{"StationID":"G16","lat":25.052044,"lon":25.052044,"name":"南京復興","ename":"Nanjing Fuxing","FirstLast":[{"To":"G19","Time":["06:00","00:47"]},{"To":"G01","Time":["06:00","00:38"]}]},{"StationID":"G17","lat":25.05152,"lon":25.05152,"name":"台北小巨蛋","ename":"Taipei Arena","FirstLast":[{"To":"G19","Time":["06:02","00:49"]},{"To":"G01","Time":["06:05","00:05"]}]},{"StationID":"G18","lat":25.051588,"lon":25.051588,"name":"南京三民","ename":"Nanjing Sanmin","FirstLast":[{"To":"G19","Time":["06:05","00:51"]},{"To":"G01","Time":["06:03","00:03"]}]},{"StationID":"G19","lat":25.050118,"lon":25.050118,"name":"松山","ename":"Songshan","FirstLast":[{"To":"G01","Time":["06:00","00:00"]}]},{"StationID":"O01","lat":24.990065,"lon":24.990065,"name":"南勢角","ename":"Nanshijiao","FirstLast":[{"To":"O21","Time":["06:00","00:00"]},{"To":"O54","Time":["06:04","00:03"]}]},{"StationID":"O02","lat":24.99392,"lon":24.99392,"name":"景安","ename":"Jingan","FirstLast":[{"To":"O21","Time":["06:01","00:02"]},{"To":"O01","Time":["06:01","01:01"]},{"To":"O54","Time":["06:05","00:05"]}]},{"StationID":"O03","lat":25.002895,"lon":25.002895,"name":"永安市場","ename":"Yongan Market","FirstLast":[{"To":"O21","Time":["06:03","00:04"]},{"To":"O01","Time":["06:00","01:00"]},{"To":"O54","Time":["06:00","00:07"]}]},{"StationID":"O04","lat":25.013858,"lon":25.013858,"name":"頂溪","ename":"Dingxi","FirstLast":[{"To":"O21","Time":["06:05","00:06"]},{"To":"O01","Time":["06:03","00:58"]},{"To":"O54","Time":["06:02","00:09"]}]},{"StationID":"O05","lat":25.026373,"lon":25.026373,"name":"古亭","ename":"Guting","FirstLast":[{"To":"O21","Time":["06:00","00:17"]},{"To":"O01","Time":["06:00","00:54"]},{"To":"O54","Time":["06:06","00:27"]}]},{"StationID":"O06","lat":25.033894,"lon":25.033894,"name":"東門","ename":"Dongmen","FirstLast":[{"To":"O21","Time":["06:03","00:33"]},{"To":"O01","Time":["06:03","00:50"]},{"To":"O54","Time":["06:08","00:30"]}]},{"StationID":"O07","lat":25.042498,"lon":25.042498,"name":"忠孝新生","ename":"Zhongxiao Xinsheng","FirstLast":[{"To":"O21","Time":["06:06","00:36"]},{"To":"O01","Time":["06:00","00:48"]},{"To":"O54","Time":["06:00","00:33"]}]},{"StationID":"O08","lat":25.052693,"lon":25.052693,"name":"松江南京","ename":"Songliang Nanjing","FirstLast":[{"To":"O21","Time":["06:08","00:38"]},{"To":"O01","Time":["06:03","00:46"]},{"To":"O54","Time":["06:02","00:35"]}]},{"StationID":"O09","lat":25.05924,"lon":25.05924,"name":"行天宮","ename":"Xingtian Temple","FirstLast":[{"To":"O21","Time":["06:00","00:40"]},{"To":"O01","Time":["06:01","00:44"]},{"To":"O54","Time":["06:04","00:37"]}]},{"StationID":"O10","lat":25.062665,"lon":25.062665,"name":"中山國小","ename":"Zhongshan Elementary School","FirstLast":[{"To":"O21","Time":["06:02","00:41"]},{"To":"O01","Time":["06:00","00:42"]},{"To":"O54","Time":["06:06","00:39"]}]},{"StationID":"O11","lat":25.06235,"lon":25.06235,"name":"民權西路","ename":"Minzuan W. Rd.","FirstLast":[{"To":"O21","Time":["06:04","00:43"]},{"To":"O01","Time":["06:01","00:40"]},{"To":"O54","Time":["06:00","00:41"]}]},{"StationID":"O12","lat":25.06322,"lon":25.06322,"name":"大橋頭","ename":"Daqiaotou","FirstLast":[{"To":"O21","Time":["06:06","00:45"]},{"To":"O01","Time":["06:00","00:29"]},{"To":"O54","Time":["06:02","00:42"]}]},{"StationID":"O13","lat":25.063075,"lon":25.063075,"name":"台北橋","ename":"Taipei Bridge","FirstLast":[{"To":"O21","Time":["06:08","00:47"]},{"To":"O01","Time":["06:06","00:27"]}]},{"StationID":"O14","lat":25.059451,"lon":25.059451,"name":"菜寮","ename":"Cailiao","FirstLast":[{"To":"O21","Time":["06:00","00:49"]},{"To":"O01","Time":["06:04","00:25"]}]},{"StationID":"O15","lat":25.05571,"lon":25.05571,"name":"三重","ename":"Sanchong","FirstLast":[{"To":"O21","Time":["06:02","00:51"]},{"To":"O01","Time":["06:02","00:23"]}]},{"StationID":"O16","lat":25.04632,"lon":25.04632,"name":"先嗇宮","ename":"Xianse Temple","FirstLast":[{"To":"O21","Time":["06:04","00:53"]},{"To":"O01","Time":["06:00","00:12"]}]},{"StationID":"O17","lat":25.039735,"lon":25.039735,"name":"頭前庄","ename":"Touqianzhuang","FirstLast":[{"To":"O21","Time":["06:07","00:56"]},{"To":"O01","Time":["06:04","00:10"]}]},{"StationID":"O18","lat":25.03608,"lon":25.03608,"name":"新莊","ename":"Xinzhuang","FirstLast":[{"To":"O21","Time":["06:00","00:58"]},{"To":"O01","Time":["06:03","00:08"]}]},{"StationID":"O19","lat":25.03279,"lon":25.03279,"name":"輔大","ename":"Fu Jen University","FirstLast":[{"To":"O21","Time":["06:03","01:01"]},{"To":"O01","Time":["06:00","00:05"]}]},{"StationID":"O20","lat":25.029073,"lon":25.029073,"name":"丹鳳","ename":"Danfeng","FirstLast":[{"To":"O21","Time":["06:00","01:03"]},{"To":"O01","Time":["06:03","00:03"]}]},{"StationID":"O21","lat":25.022107,"lon":25.022107,"name":"迴龍","ename":"Huilong","FirstLast":[{"To":"O01","Time":["06:00","00:00"]}]},{"StationID":"O50","lat":25.070275,"lon":25.070275,"name":"三重國小","ename":"Sanchong Elementary School","FirstLast":[{"To":"O54","Time":["06:05","00:45"]},{"To":"O01","Time":["06:02","00:09"]}]},{"StationID":"O51","lat":25.07646,"lon":25.07646,"name":"三和國中","ename":"Sanhe Junior High School","FirstLast":[{"To":"O54","Time":["06:07","00:47"]},{"To":"O01","Time":["06:00","00:07"]}]},{"StationID":"O52","lat":25.080485,"lon":25.080485,"name":"徐匯中學","ename":"St.lgnatius High School","FirstLast":[{"To":"O54","Time":["06:00","00:49"]},{"To":"O01","Time":["06:04","00:05"]}]},{"StationID":"O53","lat":25.085425,"lon":25.085425,"name":"三民高中","ename":"Sanmin Senior High School","FirstLast":[{"To":"O54","Time":["06:02","00:51"]},{"To":"O01","Time":["06:02","00:03"]}]},{"StationID":"O54","lat":25.09152,"lon":25.09152,"name":"蘆洲","ename":"Luzhou","FirstLast":[{"To":"O01","Time":["06:00","00:00"]}]},{"StationID":"BL01","lat":24.96012,"lon":24.96012,"name":"頂埔","ename":"Dingpu","FirstLast":[{"To":"BL23","Time":["06:00","00:00"]}]},{"StationID":"BL02","lat":24.96682,"lon":24.96682,"name":"永寧","ename":"Yongning","FirstLast":[{"To":"BL23","Time":["06:03","00:03"]},{"To":"BL01","Time":["06:00","01:08"]}]},{"StationID":"BL03","lat":24.97313,"lon":24.97313,"name":"土城","ename":"Tucheng","FirstLast":[{"To":"BL23","Time":["06:05","00:05"]},{"To":"BL01","Time":["06:05","01:06"]}]},{"StationID":"BL04","lat":24.985305,"lon":24.985305,"name":"海山","ename":"Haishan","FirstLast":[{"To":"BL23","Time":["06:07","00:07"]},{"To":"BL01","Time":["06:03","01:04"]}]},{"StationID":"BL05","lat":24.99828,"lon":24.99828,"name":"亞東醫院","ename":"Far Eastern Hospital","FirstLast":[{"To":"BL23","Time":["06:00","00:10"]},{"To":"BL01","Time":["06:00","01:01"]}]},{"StationID":"BL06","lat":25.008465,"lon":25.008465,"name":"府中","ename":"Fuzhong","FirstLast":[{"To":"BL23","Time":["06:02","00:12"]},{"To":"BL01","Time":["06:05","00:59"]}]},{"StationID":"BL07","lat":25.013825,"lon":25.013825,"name":"板橋","ename":"Banqiao","FirstLast":[{"To":"BL23","Time":["06:03","00:13"]},{"To":"BL01","Time":["06:04","00:57"]}]},{"StationID":"BL08","lat":25.02327,"lon":25.02327,"name":"新埔","ename":"Xinpu","FirstLast":[{"To":"BL23","Time":["06:00","00:16"]},{"To":"BL01","Time":["06:02","00:55"]}]},{"StationID":"BL09","lat":25.030265,"lon":25.030265,"name":"江子翠","ename":"Jiangzicui","FirstLast":[{"To":"BL23","Time":["06:02","00:17"]},{"To":"BL01","Time":["06:00","00:54"]}]},{"StationID":"BL10","lat":25.03528,"lon":25.03528,"name":"龍山寺","ename":"Longshan Temple","FirstLast":[{"To":"BL23","Time":["06:05","00:21"]},{"To":"BL01","Time":["06:05","00:50"]}]},{"StationID":"BL11","lat":25.042025,"lon":25.042025,"name":"西門","ename":"Ximen","FirstLast":[{"To":"BL23","Time":["06:08","00:23"]},{"To":"BL01","Time":["06:03","00:48"]}]},{"StationID":"BL12","lat":25.04631,"lon":25.04631,"name":"台北車站","ename":"Taipei Main Station","FirstLast":[{"To":"BL23","Time":["06:00","00:45"]},{"To":"BL01","Time":["06:00","00:45"]}]},{"StationID":"BL13","lat":25.04468,"lon":25.04468,"name":"善導寺","ename":"Shandao Temple","FirstLast":[{"To":"BL23","Time":["06:02","00:46"]},{"To":"BL01","Time":["06:07","00:44"]}]},{"StationID":"BL14","lat":25.042498,"lon":25.042498,"name":"忠孝新生","ename":"Zhongxiao Xinsheng","FirstLast":[{"To":"BL23","Time":["06:04","00:48"]},{"To":"BL01","Time":["06:05","00:42"]}]},{"StationID":"BL15","lat":25.041749,"lon":25.041749,"name":"忠孝復興","ename":"Zhongxiao Fuxing","FirstLast":[{"To":"BL23","Time":["06:00","00:50"]},{"To":"BL01","Time":["06:03","00:40"]}]},{"StationID":"BL16","lat":25.041505,"lon":25.041505,"name":"忠孝敦化","ename":"Xhongxiao Dunhua","FirstLast":[{"To":"BL23","Time":["06:01","00:52"]},{"To":"BL01","Time":["06:02","00:24"]}]},{"StationID":"BL17","lat":25.04137,"lon":25.04137,"name":"國父紀念館","ename":"Sun Yat-Sen Memorial Hall","FirstLast":[{"To":"BL23","Time":["06:03","00:53"]},{"To":"BL01","Time":["06:00","00:22"]}]},{"StationID":"BL18","lat":25.041135,"lon":25.041135,"name":"市政府","ename":"Taipei City Hall","FirstLast":[{"To":"BL23","Time":["06:00","00:55"]},{"To":"BL01","Time":["06:03","00:21"]}]},{"StationID":"BL19","lat":25.040855,"lon":25.040855,"name":"永春","ename":"Yongchun","FirstLast":[{"To":"BL23","Time":["06:02","00:57"]},{"To":"BL01","Time":["06:02","00:19"]}]},{"StationID":"BL20","lat":25.044715,"lon":25.044715,"name":"後山埤","ename":"Houshanpi","FirstLast":[{"To":"BL23","Time":["06:04","00:59"]},{"To":"BL01","Time":["06:00","00:17"]}]},{"StationID":"BL21","lat":25.050459,"lon":25.050459,"name":"昆陽","ename":"Kunyang","FirstLast":[{"To":"BL23","Time":["06:06","01:01"]},{"To":"BL01","Time":["06:04","00:15"]}]},{"StationID":"BL22","lat":25.052035,"lon":25.052035,"name":"南港","ename":"Nangang","FirstLast":[{"To":"BL23","Time":["06:00","01:03"]},{"To":"BL01","Time":["06:02","00:12"]}]},{"StationID":"BL23","lat":25.054919,"lon":25.054919,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center","FirstLast":[{"To":"BL01","Time":["06:00","00:00"]}]}];

  var krtc_station = [{"StationID":"R3","lat":22.564822,"lon":22.564822,"name":"小港","ename":"Siaogang","FirstLast":[{"To":"R24","Time":["05:55","00:00"]},{"To":"R3","Time":["",""]}]},{"StationID":"R4","lat":22.570199,"lon":22.570199,"name":"高雄國際機場","ename":"Kaohsiung International Airport","FirstLast":[{"To":"R24","Time":["05:56","00:02"]},{"To":"R3","Time":["06:26","00:44"]}]},{"StationID":"R4A","lat":22.580363,"lon":22.580363,"name":"草衙","ename":"Caoya","FirstLast":[{"To":"R24","Time":["05:58","00:05"]},{"To":"R3","Time":["06:24","00:42"]}]},{"StationID":"R5","lat":22.588356,"lon":22.588356,"name":"前鎮高中","ename":"Cianjhen Senior High School","FirstLast":[{"To":"R24","Time":["06:00","00:08"]},{"To":"R3","Time":["06:22","00:40"]}]},{"StationID":"R6","lat":22.596856,"lon":22.596856,"name":"凱旋","ename":"Kaisyuan","FirstLast":[{"To":"R24","Time":["06:02","00:10"]},{"To":"R3","Time":["06:20","00:38"]}]},{"StationID":"R7","lat":22.60587,"lon":22.60587,"name":"獅甲","ename":"Shihjia","FirstLast":[{"To":"R24","Time":["06:04","00:13"]},{"To":"R3","Time":["06:18","00:35"]}]},{"StationID":"R8","lat":22.614011,"lon":22.614011,"name":"三多商圈","ename":"Sanduo Shopping District","FirstLast":[{"To":"R24","Time":["05:55","00:16"]},{"To":"R3","Time":["06:16","00:33"]}]},{"StationID":"R9","lat":22.624628,"lon":22.624628,"name":"中央公園","ename":"Central Park","FirstLast":[{"To":"R24","Time":["05:56","00:18"]},{"To":"R3","Time":["06:14","00:31"]}]},{"StationID":"R10","lat":22.631387,"lon":22.631387,"name":"美麗島","ename":"Formosa Boulevard","FirstLast":[{"To":"R24","Time":["05:58","00:21"]},{"To":"R3","Time":["06:12","00:29"]}]},{"StationID":"R11","lat":22.639769,"lon":22.639769,"name":"高雄車站","ename":"Kaohsiung Main Station","FirstLast":[{"To":"R24","Time":["06:00","00:23"]},{"To":"R3","Time":["06:10","00:28"]}]},{"StationID":"R12","lat":22.648314,"lon":22.648314,"name":"後驛","ename":"Houyi","FirstLast":[{"To":"R24","Time":["06:02","00:25"]},{"To":"R3","Time":["06:08","00:25"]}]},{"StationID":"R13","lat":22.657126,"lon":22.657126,"name":"凹子底","ename":"Aozihdi","FirstLast":[{"To":"R24","Time":["06:04","00:27"]},{"To":"R3","Time":["06:06","00:24"]}]},{"StationID":"R14","lat":22.666135,"lon":22.666135,"name":"巨蛋","ename":"Kaohsiung Arena","FirstLast":[{"To":"R24","Time":["06:06","00:29"]},{"To":"R3","Time":["06:04","00:22"]}]},{"StationID":"R15","lat":22.676738,"lon":22.676738,"name":"生態園區","ename":"Ecological District","FirstLast":[{"To":"R24","Time":["06:08","00:31"]},{"To":"R3","Time":["06:02","00:20"]}]},{"StationID":"R16","lat":22.688073,"lon":22.688073,"name":"左營","ename":"Zuoying","FirstLast":[{"To":"R24","Time":["06:10","00:33"]},{"To":"R3","Time":["06:00","00:17"]}]},{"StationID":"R17","lat":22.701622,"lon":22.701622,"name":"世運","ename":"World Game","FirstLast":[{"To":"R24","Time":["06:12","00:35"]},{"To":"R3","Time":["05:58","00:15"]}]},{"StationID":"R18","lat":22.708479,"lon":22.708479,"name":"油廠國小","ename":"Oil Refinery Elementary School","FirstLast":[{"To":"R24","Time":["06:14","00:37"]},{"To":"R3","Time":["05:56","00:14"]}]},{"StationID":"R19","lat":22.718671,"lon":22.718671,"name":"楠梓加工區","ename":"Nanzih Export Processing Zone","FirstLast":[{"To":"R24","Time":["06:16","00:39"]},{"To":"R3","Time":["05:55","00:11"]}]},{"StationID":"R20","lat":22.7223,"lon":22.7223,"name":"後勁","ename":"Houjing","FirstLast":[{"To":"R24","Time":["06:18","00:41"]},{"To":"R3","Time":["06:10","00:10"]}]},{"StationID":"R21","lat":22.729403,"lon":22.729403,"name":"都會公園","ename":"Metropolitan Park","FirstLast":[{"To":"R24","Time":["06:20","00:42"]},{"To":"R3","Time":["06:08","00:08"]}]},{"StationID":"R22","lat":22.744399,"lon":22.744399,"name":"青埔","ename":"Cingpu","FirstLast":[{"To":"R24","Time":["06:22","00:45"]},{"To":"R3","Time":["06:06","00:06"]}]},{"StationID":"R22A","lat":22.753398,"lon":22.753398,"name":"橋頭糖廠","ename":"Ciaotou Sugar Refinery","FirstLast":[{"To":"R24","Time":["06:24","00:46"]},{"To":"R3","Time":["06:04","00:04"]}]},{"StationID":"R23","lat":22.760452,"lon":22.760452,"name":"橋頭火車站","ename":"Ciaotou Station","FirstLast":[{"To":"R24","Time":["06:25","00:48"]},{"To":"R3","Time":["06:02","00:02"]}]},{"StationID":"R24","lat":22.780544,"lon":22.780544,"name":"南岡山","ename":"Gangshan South","FirstLast":[{"To":"R24","Time":["",""]},{"To":"R3","Time":["06:00","00:00"]}]},{"StationID":"O1","lat":22.621544,"lon":22.621544,"name":"西子灣","ename":"Sizihwan","FirstLast":[{"To":"OT1","Time":["06:00","00:00"]},{"To":"O1","Time":["",""]}]},{"StationID":"O2","lat":22.623538,"lon":22.623538,"name":"鹽埕埔","ename":"Yanchengpu","FirstLast":[{"To":"OT1","Time":["06:01","00:01"]},{"To":"O1","Time":["06:03","00:21"]}]},{"StationID":"O4","lat":22.629002,"lon":22.629002,"name":"市議會","ename":"City Council","FirstLast":[{"To":"OT1","Time":["06:03","00:03"]},{"To":"O1","Time":["06:01","00:19"]}]},{"StationID":"O5","lat":22.631387,"lon":22.631387,"name":"美麗島","ename":"Formosa Boulevard","FirstLast":[{"To":"OT1","Time":["06:05","00:05"]},{"To":"O1","Time":["06:00","00:16"]}]},{"StationID":"O6","lat":22.630745,"lon":22.630745,"name":"信義國小","ename":"Sinyi Elementary School","FirstLast":[{"To":"OT1","Time":["06:07","00:07"]},{"To":"O1","Time":["06:05","00:15"]}]},{"StationID":"O7","lat":22.630292,"lon":22.630292,"name":"文化中心","ename":"Cultural Center","FirstLast":[{"To":"OT1","Time":["06:08","00:08"]},{"To":"O1","Time":["06:04","00:13"]}]},{"StationID":"O8","lat":22.629331,"lon":22.629331,"name":"五塊厝","ename":"Wukuaicuo","FirstLast":[{"To":"OT1","Time":["06:00","00:10"]},{"To":"O1","Time":["06:02","00:12"]}]},{"StationID":"O9","lat":22.627291,"lon":22.627291,"name":"技擊館","ename":"Martial Arts Stadium","FirstLast":[{"To":"OT1","Time":["06:01","00:12"]},{"To":"O1","Time":["06:01","00:10"]}]},{"StationID":"O10","lat":22.625162,"lon":22.625162,"name":"衛武營","ename":"Weiwuying","FirstLast":[{"To":"OT1","Time":["06:02","00:13"]},{"To":"O1","Time":["06:00","00:09"]}]},{"StationID":"O11","lat":22.625331,"lon":22.625331,"name":"鳳山西站","ename":"Fongshan West","FirstLast":[{"To":"OT1","Time":["06:04","00:15"]},{"To":"O1","Time":["06:06","00:07"]}]},{"StationID":"O12","lat":22.625994,"lon":22.625994,"name":"鳳山","ename":"Fongshan","FirstLast":[{"To":"OT1","Time":["06:05","00:16"]},{"To":"O1","Time":["06:05","00:06"]}]},{"StationID":"O13","lat":22.625197,"lon":22.625197,"name":"大東","ename":"Dadong","FirstLast":[{"To":"OT1","Time":["06:07","00:18"]},{"To":"O1","Time":["06:03","00:04"]}]},{"StationID":"O14","lat":22.624915,"lon":22.624915,"name":"鳳山國中","ename":"Fongshan Junior High School","FirstLast":[{"To":"OT1","Time":["06:09","00:20"]},{"To":"O1","Time":["06:02","00:02"]}]},{"StationID":"OT1","lat":22.622423,"lon":22.622423,"name":"大寮","ename":"Daliao","FirstLast":[{"To":"OT1","Time":["",""]},{"To":"O1","Time":["06:00","00:00"]}]}];

  var tymetro_station = [{"StationID":"A1","lat":25.048,"lon":25.048,"name":"台北車站","ename":"Taipei Main Station","FirstLast":[{"To":"A21","Time":["06:07","23:07"],"TrainType":1},{"To":"A13","Time":["06:00","23:00"],"TrainType":2}]},{"StationID":"A2","lat":25.054,"lon":25.054,"name":"三重站","ename":"Sanchong Station","FirstLast":[{"To":"A21","Time":["05:58","23:15"],"TrainType":1},{"To":"A1","Time":["06:08","00:17"],"TrainType":1}]},{"StationID":"A3","lat":25.061,"lon":25.061,"name":"新北產業園區站","ename":"New Taipei Industrial Park Station","FirstLast":[{"To":"A21","Time":["06:02","23:19"],"TrainType":1},{"To":"A1","Time":["06:03","00:12"],"TrainType":1},{"To":"A13","Time":["06:09","23:09"],"TrainType":2},{"To":"A1","Time":["06:11","23:26"],"TrainType":2}]},{"StationID":"A4","lat":25.059,"lon":25.059,"name":"新莊副都心站","ename":"Xinzhuang Fuduxin Station","FirstLast":[{"To":"A21","Time":["06:05","23:22"],"TrainType":1},{"To":"A1","Time":["06:00","00:09"],"TrainType":1}]},{"StationID":"A5","lat":25.052,"lon":25.052,"name":"泰山站","ename":"Taishan Station","FirstLast":[{"To":"A21","Time":["06:07","23:24"],"TrainType":1},{"To":"A1","Time":["05:58","00:07"],"TrainType":1}]},{"StationID":"A6","lat":25.033,"lon":25.033,"name":"泰山貴和站","ename":"Taishan Guihe Station","FirstLast":[{"To":"A21","Time":["06:10","23:27"],"TrainType":1},{"To":"A1","Time":["06:10","00:04"],"TrainType":1}]},{"StationID":"A7","lat":25.041,"lon":25.041,"name":"體育大學站","ename":"National Taiwan Sport University Station","FirstLast":[{"To":"A21","Time":["06:00","23:32"],"TrainType":1},{"To":"A1","Time":["06:03","23:57"],"TrainType":1}]},{"StationID":"A8","lat":25.061,"lon":25.061,"name":"長庚醫院站","ename":"Chang Gung Memorial Hospital Station","FirstLast":[{"To":"A21","Time":["06:08","23:36"],"TrainType":1},{"To":"A1","Time":["05:59","23:53"],"TrainType":1},{"To":"A13","Time":["06:06","23:21"],"TrainType":2},{"To":"A1","Time":["05:58","23:11"],"TrainType":2}]},{"StationID":"A9","lat":25.066,"lon":25.066,"name":"林口站","ename":"Linkou Station","FirstLast":[{"To":"A21","Time":["06:11","23:39"],"TrainType":1},{"To":"A1","Time":["06:07","23:50"],"TrainType":1}]},{"StationID":"A10","lat":25.081,"lon":25.081,"name":"山鼻站","ename":"Shanbi Station","FirstLast":[{"To":"A21","Time":["06:05","23:48"],"TrainType":1},{"To":"A1","Time":["05:59","23:42"],"TrainType":1}]},{"StationID":"A11","lat":25.086,"lon":25.086,"name":"坑口站","ename":"Kengkou Station","FirstLast":[{"To":"A21","Time":["06:08","23:51"],"TrainType":1},{"To":"A1","Time":["06:11","23:40"],"TrainType":1}]},{"StationID":"A12","lat":25.082,"lon":25.082,"name":"機場第一航廈站","ename":"Airport Terminal 1 Station","FirstLast":[{"To":"A21","Time":["05:57","23:55"],"TrainType":1},{"To":"A1","Time":["06:07","23:36"],"TrainType":1},{"To":"A13","Time":["06:07","23:37"],"TrainType":2},{"To":"A1","Time":["05:59","22:58"],"TrainType":2}]},{"StationID":"A13","lat":25.077,"lon":25.077,"name":"機場第二航廈站","ename":"Airport Terminal 2 Station","FirstLast":[{"To":"A21","Time":["06:00","23:57"],"TrainType":1},{"To":"A1","Time":["06:04","23:33"],"TrainType":1},{"To":"A1","Time":["05:57","22:55"],"TrainType":2}]},{"StationID":"A14a","lat":25.069,"lon":25.069,"name":"機場旅館站","ename":"Airport Hotel Station","FirstLast":[{"To":"A21","Time":["06:03","00:00"],"TrainType":1},{"To":"A1","Time":["06:00","23:29"],"TrainType":1}]},{"StationID":"A15","lat":25.056,"lon":25.056,"name":"大園站","ename":"Dayuan Station","FirstLast":[{"To":"A21","Time":["06:06","00:03"],"TrainType":1},{"To":"A1","Time":["06:12","23:26"],"TrainType":1}]},{"StationID":"A16","lat":25.037,"lon":25.037,"name":"橫山站","ename":"Hengshan Station","FirstLast":[{"To":"A21","Time":["06:09","00:06"],"TrainType":1},{"To":"A1","Time":["06:09","23:23"],"TrainType":1}]},{"StationID":"A17","lat":25.024,"lon":25.024,"name":"領航站","ename":"Linghang Station","FirstLast":[{"To":"A21","Time":["06:12","00:09"],"TrainType":1},{"To":"A1","Time":["06:06","23:20"],"TrainType":1}]},{"StationID":"A18","lat":25.014,"lon":25.014,"name":"高鐵桃園站","ename":"Taoyuan HSR Station","FirstLast":[{"To":"A21","Time":["06:02","00:13"],"TrainType":1},{"To":"A1","Time":["06:02","23:16"],"TrainType":1}]},{"StationID":"A19","lat":25.002,"lon":25.002,"name":"桃園體育園區站","ename":"Taoyuan Sports Park Station","FirstLast":[{"To":"A21","Time":["06:05","00:16"],"TrainType":1},{"To":"A1","Time":["06:13","23:13"],"TrainType":1}]},{"StationID":"A20","lat":24.98,"lon":24.98,"name":"興南站","ename":"Xingnan Station","FirstLast":[{"To":"A21","Time":["06:10","00:21"],"TrainType":1},{"To":"A1","Time":["06:08","23:08"],"TrainType":1}]},{"StationID":"A21","lat":24.967,"lon":24.967,"name":"環北站","ename":"Huanbei Station","FirstLast":[{"To":"A1","Time":["06:05","23:05"],"TrainType":1}]}];

  var trtc_transfer = [{"FromLineID":"R","FromStationID":"R22","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R22","TransferTime":3,"name":"北投","ename":"Beitou"},{"FromLineID":"R","FromStationID":"R13","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O11","TransferTime":3,"name":"民權西路","ename":"Minzuan W. Rd."},{"FromLineID":"O","FromStationID":"O11","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R13","TransferTime":3,"name":"民權西路","ename":"Minzuan W. Rd."},{"FromLineID":"R","FromStationID":"R11","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G14","TransferTime":3,"name":"中山","ename":"Zhongshan"},{"FromLineID":"G","FromStationID":"G14","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R11","TransferTime":3,"name":"中山","ename":"Zhongshan"},{"FromLineID":"R","FromStationID":"R10","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL12","TransferTime":4,"name":"台北車站","ename":"Taipei Main Station"},{"FromLineID":"BL","FromStationID":"BL12","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R10","TransferTime":4,"name":"台北車站","ename":"Taipei Main Station"},{"FromLineID":"R","FromStationID":"R08","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G10","TransferTime":2,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall"},{"FromLineID":"G","FromStationID":"G10","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R08","TransferTime":2,"name":"中正紀念堂","ename":"Chiang Kai-Shek Memorial Hall"},{"FromLineID":"R","FromStationID":"R07","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O06","TransferTime":2,"name":"東門","ename":"Dongmen"},{"FromLineID":"O","FromStationID":"O06","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R07","TransferTime":2,"name":"東門","ename":"Dongmen"},{"FromLineID":"R","FromStationID":"R05","IsOnSiteTransfer":1,"ToLineID":"BR","ToStationID":"BR09","TransferTime":5,"name":"大安","ename":"Daan"},{"FromLineID":"BR","FromStationID":"BR09","IsOnSiteTransfer":1,"ToLineID":"R","ToStationID":"R05","TransferTime":5,"name":"大安","ename":"Daan"},{"FromLineID":"G","FromStationID":"G16","IsOnSiteTransfer":1,"ToLineID":"BR","ToStationID":"BR11","TransferTime":5,"name":"南京復興","ename":"Nanjing Fuxing"},{"FromLineID":"BR","FromStationID":"BR11","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G16","TransferTime":5,"name":"南京復興","ename":"Nanjing Fuxing"},{"FromLineID":"G","FromStationID":"G15","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O08","TransferTime":2,"name":"松江南京","ename":"Songliang Nanjing"},{"FromLineID":"O","FromStationID":"O08","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G15","TransferTime":2,"name":"松江南京","ename":"Songliang Nanjing"},{"FromLineID":"G","FromStationID":"G12","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL11","TransferTime":2,"name":"西門","ename":"Ximen"},{"FromLineID":"BL","FromStationID":"BL11","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G12","TransferTime":2,"name":"西門","ename":"Ximen"},{"FromLineID":"G","FromStationID":"G09","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O05","TransferTime":2,"name":"古亭","ename":"Guting"},{"FromLineID":"O","FromStationID":"O05","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G09","TransferTime":2,"name":"古亭","ename":"Guting"},{"FromLineID":"G","FromStationID":"G03","IsOnSiteTransfer":1,"ToLineID":"G","ToStationID":"G03","TransferTime":3,"name":"七張","ename":"Qizhang"},{"FromLineID":"O","FromStationID":"O12","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O12","TransferTime":1,"name":"大橋頭","ename":"Daqiaotou"},{"FromLineID":"O","FromStationID":"O07","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL14","TransferTime":2,"name":"忠孝新生","ename":"Zhongxiao Xinsheng"},{"FromLineID":"BL","FromStationID":"BL14","IsOnSiteTransfer":1,"ToLineID":"O","ToStationID":"O07","TransferTime":2,"name":"忠孝新生","ename":"Zhongxiao Xinsheng"},{"FromLineID":"BL","FromStationID":"BL23","IsOnSiteTransfer":1,"ToLineID":"BR","ToStationID":"BR24","TransferTime":5,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center"},{"FromLineID":"BR","FromStationID":"BR24","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL23","TransferTime":5,"name":"南港展覽館","ename":"Taipei Nangang Exhibition Center"},{"FromLineID":"BL","FromStationID":"BL15","IsOnSiteTransfer":1,"ToLineID":"BR","ToStationID":"BR10","TransferTime":5,"name":"忠孝復興","ename":"Zhongxiao Fuxing"},{"FromLineID":"BR","FromStationID":"BR10","IsOnSiteTransfer":1,"ToLineID":"BL","ToStationID":"BL15","TransferTime":5,"name":"忠孝復興","ename":"Zhongxiao Fuxing"}];

  var krtc_transfer = [{"FromLineID":"R","FromStationID":"R10","ToLineID":"O","ToStationID":"O5","TransferTime":3,"name":"美麗島","ename":"Formosa Boulevard"},{"FromLineID":"O","FromStationID":"O5","ToLineID":"R","ToStationID":"R10","TransferTime":3,"name":"美麗島","ename":"Formosa Boulevard"}];

  var thsr_station = [{"StationID":"0990","lat":25.05318832397461,"lon":121.60706329345703,"name":"南港","ename":"Nangang"},{"StationID":"1000","lat":25.047670364379883,"lon":121.51698303222656,"name":"台北","ename":"Taipei"},{"StationID":"1010","lat":25.013870239257812,"lon":121.46459197998047,"name":"板橋","ename":"Banciao"},{"StationID":"1020","lat":25.012861251831055,"lon":121.21472930908203,"name":"桃園","ename":"Taoyuan"},{"StationID":"1030","lat":24.808441162109375,"lon":121.0402603149414,"name":"新竹","ename":"Hsinchu"},{"StationID":"1035","lat":24.60544776916504,"lon":120.82527160644531,"name":"苗栗","ename":"Miaoli"},{"StationID":"1040","lat":24.112483978271484,"lon":120.615966796875,"name":"台中","ename":"Taichung"},{"StationID":"1043","lat":23.874326705932617,"lon":120.5746078491211,"name":"彰化","ename":"Changhua"},{"StationID":"1047","lat":23.736230850219727,"lon":120.41651153564453,"name":"雲林","ename":"Yunlin"},{"StationID":"1050","lat":23.45950698852539,"lon":120.32325744628906,"name":"嘉義","ename":"Chiayi"},{"StationID":"1060","lat":22.925077438354492,"lon":120.28620147705078,"name":"台南","ename":"Tainan"},{"StationID":"1070","lat":22.68739128112793,"lon":120.30748748779297,"name":"左營","ename":"Zuoying"}];

  var tra_line = [{"dir":0,"LineID":"YL","station":[{"name":"八堵","ID":"1002","TD":0},{"name":"暖暖","ID":"1802","TD":1.6},{"name":"四腳亭","ID":"1803","TD":3.9},{"name":"瑞芳","ID":"1804","TD":8.9},{"name":"侯硐","ID":"1805","TD":13.5},{"name":"三貂嶺","ID":"1806","TD":16},{"name":"牡丹","ID":"1807","TD":19.6},{"name":"雙溪","ID":"1808","TD":22.9},{"name":"貢寮","ID":"1809","TD":28.3},{"name":"福隆","ID":"1810","TD":32},{"name":"石城","ID":"1811","TD":37.4},{"name":"大里","ID":"1812","TD":40.1},{"name":"大溪","ID":"1813","TD":44.8},{"name":"龜山","ID":"1814","TD":49.4},{"name":"外澳","ID":"1815","TD":53},{"name":"頭城","ID":"1816","TD":56.6},{"name":"頂埔","ID":"1817","TD":58.8},{"name":"礁溪","ID":"1818","TD":62.9},{"name":"四城","ID":"1819","TD":67.6},{"name":"宜蘭","ID":"1820","TD":71.3},{"name":"二結","ID":"1821","TD":77.1},{"name":"中里","ID":"1822","TD":78.3},{"name":"羅東","ID":"1823","TD":80.1},{"name":"冬山","ID":"1824","TD":85.1},{"name":"新馬","ID":"1825","TD":89.3},{"name":"蘇澳新","ID":"1826","TD":90.2},{"name":"蘇澳","ID":"1827","TD":93.6}]},{"dir":0,"LineID":"NL","station":[{"name":"蘇澳新","ID":"1826","TD":0},{"name":"永樂","ID":"1703","TD":5.2},{"name":"東澳","ID":"1704","TD":11},{"name":"南澳","ID":"1705","TD":19},{"name":"武塔","ID":"1706","TD":22.7},{"name":"漢本","ID":"1708","TD":35.6},{"name":"和平","ID":"1709","TD":39.8},{"name":"和仁","ID":"1710","TD":47.5},{"name":"崇德","ID":"1711","TD":57.6},{"name":"新城","ID":"1712","TD":62.9},{"name":"景美","ID":"1713","TD":68.2},{"name":"北埔","ID":"1714","TD":74.7},{"name":"花蓮","ID":"1715","TD":79.2}]},{"dir":0,"LineID":"TT","station":[{"name":"花蓮","ID":"1715","TD":0},{"name":"吉安","ID":"1602","TD":3.4},{"name":"志學","ID":"1604","TD":12.4},{"name":"平和","ID":"1605","TD":15.3},{"name":"壽豐","ID":"1606","TD":17.2},{"name":"豐田","ID":"1607","TD":19.9},{"name":"南平","ID":"1609","TD":28.4},{"name":"鳳林","ID":"1610","TD":32.5},{"name":"萬榮","ID":"1611","TD":37.3},{"name":"光復","ID":"1612","TD":42.9},{"name":"大富","ID":"1613","TD":50.6},{"name":"富源","ID":"1614","TD":53.6},{"name":"瑞穗","ID":"1616","TD":62.9},{"name":"三民","ID":"1617","TD":72.1},{"name":"玉里","ID":"1619","TD":83.1},{"name":"東里","ID":"1621","TD":89.8},{"name":"東竹","ID":"1622","TD":95.7},{"name":"富里","ID":"1623","TD":101.9},{"name":"池上","ID":"1624","TD":108.8},{"name":"海端","ID":"1625","TD":114.4},{"name":"關山","ID":"1626","TD":120.9},{"name":"瑞和","ID":"1628","TD":128.3},{"name":"瑞源","ID":"1629","TD":131.1},{"name":"鹿野","ID":"1630","TD":136.6},{"name":"山里","ID":"1631","TD":142.6},{"name":"臺東","ID":"1632","TD":150.9}]},{"dir":0,"LineID":"PX","station":[{"name":"三貂嶺","ID":"1806","TD":0},{"name":"大華","ID":"1903","TD":3.5},{"name":"十分","ID":"1904","TD":6.4},{"name":"望古","ID":"1905","TD":8.2},{"name":"嶺腳","ID":"1906","TD":10.2},{"name":"平溪","ID":"1907","TD":11.2},{"name":"菁桐","ID":"1908","TD":12.9}]},{"dir":1,"LineID":"SA","station":[{"name":"瑞芳","ID":"1804","TD":0},{"name":"海科館","ID":"6103","TD":4.2}]},{"dir":0,"LineID":"NW","station":[{"name":"新竹","ID":"1025","TD":0},{"name":"北新竹","ID":"1024","TD":1.4},{"name":"千甲","ID":"2212","TD":3.6},{"name":"新莊","ID":"2213","TD":6.6},{"name":"竹中","ID":"2203","TD":7.9},{"name":"上員","ID":"2204","TD":10.5},{"name":"榮華","ID":"2211","TD":15},{"name":"竹東","ID":"2205","TD":16.6},{"name":"橫山","ID":"2206","TD":20},{"name":"九讚頭","ID":"2207","TD":22.2},{"name":"合興","ID":"2208","TD":24.4},{"name":"富貴","ID":"2209","TD":25.7},{"name":"內灣","ID":"2210","TD":27.9}]},{"dir":1,"LineID":"JJ","station":[{"name":"二水","ID":"1207","TD":0},{"name":"源泉","ID":"2702","TD":2.9},{"name":"濁水","ID":"2703","TD":10.8},{"name":"龍泉","ID":"2704","TD":15.7},{"name":"集集","ID":"2705","TD":20.1},{"name":"水里","ID":"2706","TD":27.4},{"name":"車埕","ID":"2707","TD":29.7}]},{"dir":1,"LineID":"SH","station":[{"name":"中洲","ID":"1230","TD":0},{"name":"長榮大學","ID":"5101","TD":2.6},{"name":"沙崙","ID":"5102","TD":5.3}]},{"dir":0,"LineID":"LJ","station":[{"name":"竹中","ID":"2203","TD":0},{"name":"六家","ID":"2214","TD":3.1}]},{"dir":0,"LineID":"CZ","station":[{"name":"成功","ID":"1321","TD":0},{"name":"追分","ID":"1118","TD":2.2}]},{"dir":1,"LineID":"TL-N","station":[{"name":"基隆","ID":"1001","TD":0},{"name":"三坑","ID":"1029","TD":1.3},{"name":"八堵","ID":"1002","TD":3.7},{"name":"七堵","ID":"1003","TD":6},{"name":"百福","ID":"1030","TD":8.7},{"name":"五堵","ID":"1004","TD":11.7},{"name":"汐止","ID":"1005","TD":13.1},{"name":"汐科","ID":"1031","TD":14.6},{"name":"南港","ID":"1006","TD":19.1},{"name":"松山","ID":"1007","TD":21.9},{"name":"臺北","ID":"1008","TD":28.3},{"name":"萬華","ID":"1009","TD":31.1},{"name":"板橋","ID":"1011","TD":35.5},{"name":"浮洲","ID":"1032","TD":38},{"name":"樹林","ID":"1012","TD":40.9},{"name":"山佳","ID":"1013","TD":44.8},{"name":"鶯歌","ID":"1014","TD":49.2},{"name":"桃園","ID":"1015","TD":57.4},{"name":"內壢","ID":"1016","TD":63.3},{"name":"中壢","ID":"1017","TD":67.3},{"name":"埔心","ID":"1018","TD":73.1},{"name":"楊梅","ID":"1019","TD":77.1},{"name":"富岡","ID":"1020","TD":83.9},{"name":"北湖","ID":"1033","TD":87.1},{"name":"湖口","ID":"1021","TD":89.6},{"name":"新豐","ID":"1022","TD":95.8},{"name":"竹北","ID":"1023","TD":100.6},{"name":"北新竹","ID":"1024","TD":105},{"name":"新竹","ID":"1025","TD":106.4},{"name":"三姓橋","ID":"1035","TD":111.2},{"name":"香山","ID":"1026","TD":114.4},{"name":"崎頂","ID":"1027","TD":120.8},{"name":"竹南","ID":"1028","TD":125.4}]},{"dir":1,"LineID":"TL-M","station":[{"name":"竹南","ID":"1028","TD":0},{"name":"造橋","ID":"1302","TD":5.3},{"name":"豐富","ID":"1304","TD":11.7},{"name":"苗栗","ID":"1305","TD":15.2},{"name":"南勢","ID":"1307","TD":21.8},{"name":"銅鑼","ID":"1308","TD":26},{"name":"三義","ID":"1310","TD":33.4},{"name":"泰安","ID":"1314","TD":44.3},{"name":"后里","ID":"1315","TD":46.9},{"name":"豐原","ID":"1317","TD":53.7},{"name":"潭子","ID":"1318","TD":58.7},{"name":"太原","ID":"1323","TD":63.8},{"name":"臺中","ID":"1319","TD":67.9},{"name":"大慶","ID":"1322","TD":72.1},{"name":"烏日","ID":"1320","TD":75.1},{"name":"新烏日","ID":"1324","TD":75.9},{"name":"成功","ID":"1321","TD":78.4},{"name":"彰化","ID":"1120","TD":85.5}]},{"dir":1,"LineID":"TL-C","station":[{"name":"竹南","ID":"1028","TD":0},{"name":"談文","ID":"1102","TD":4.5},{"name":"大山","ID":"1104","TD":11.2},{"name":"後龍","ID":"1105","TD":15},{"name":"龍港","ID":"1106","TD":18.6},{"name":"白沙屯","ID":"1107","TD":26.7},{"name":"新埔","ID":"1108","TD":29.8},{"name":"通霄","ID":"1109","TD":35.6},{"name":"苑裡","ID":"1110","TD":41.7},{"name":"日南","ID":"1111","TD":49.4},{"name":"大甲","ID":"1112","TD":54},{"name":"臺中港","ID":"1113","TD":59.3},{"name":"清水","ID":"1114","TD":65.3},{"name":"沙鹿","ID":"1115","TD":68.5},{"name":"龍井","ID":"1116","TD":73.1},{"name":"大肚","ID":"1117","TD":78.1},{"name":"追分","ID":"1118","TD":83.1},{"name":"彰化","ID":"1120","TD":90.2}]},{"dir":1,"LineID":"TL-S","station":[{"name":"彰化","ID":"1120","TD":0},{"name":"花壇","ID":"1202","TD":6.6},{"name":"大村","ID":"1240","TD":11.2},{"name":"員林","ID":"1203","TD":14.7},{"name":"永靖","ID":"1204","TD":18.2},{"name":"社頭","ID":"1205","TD":21.9},{"name":"田中","ID":"1206","TD":26.2},{"name":"二水","ID":"1207","TD":32},{"name":"林內","ID":"1208","TD":40.1},{"name":"石榴","ID":"1209","TD":44.9},{"name":"斗六","ID":"1210","TD":49.7},{"name":"斗南","ID":"1211","TD":57.3},{"name":"石龜","ID":"1212","TD":61.2},{"name":"大林","ID":"1213","TD":65.8},{"name":"民雄","ID":"1214","TD":71.6},{"name":"嘉北","ID":"1241","TD":78.3},{"name":"嘉義","ID":"1215","TD":80.9},{"name":"水上","ID":"1217","TD":87.5},{"name":"南靖","ID":"1218","TD":90.1},{"name":"後壁","ID":"1219","TD":96.1},{"name":"新營","ID":"1220","TD":103.8},{"name":"柳營","ID":"1221","TD":107.1},{"name":"林鳳營","ID":"1222","TD":111},{"name":"隆田","ID":"1223","TD":116.5},{"name":"拔林","ID":"1224","TD":118.7},{"name":"善化","ID":"1225","TD":123.3},{"name":"南科","ID":"1244","TD":126.2},{"name":"新市","ID":"1226","TD":130.9},{"name":"永康","ID":"1227","TD":135.9},{"name":"大橋","ID":"1239","TD":139.6},{"name":"臺南","ID":"1228","TD":142.3},{"name":"保安","ID":"1229","TD":149.9},{"name":"仁德","ID":"1243","TD":151.3},{"name":"中洲","ID":"1230","TD":153.9},{"name":"大湖","ID":"1231","TD":156.8},{"name":"路竹","ID":"1232","TD":159.7},{"name":"岡山","ID":"1233","TD":167.5},{"name":"橋頭","ID":"1234","TD":171.1},{"name":"楠梓","ID":"1235","TD":175.3},{"name":"新左營","ID":"1242","TD":180.4},{"name":"左營","ID":"1236","TD":182.3},{"name":"高雄","ID":"1238","TD":188.9}]},{"dir":1,"LineID":"PL","station":[{"name":"高雄","ID":"1238","TD":0},{"name":"鳳山","ID":"1402","TD":5.8},{"name":"後庄","ID":"1403","TD":9.5},{"name":"九曲堂","ID":"1404","TD":13.8},{"name":"六塊厝","ID":"1405","TD":18.8},{"name":"屏東","ID":"1406","TD":21},{"name":"歸來","ID":"1407","TD":23.6},{"name":"麟洛","ID":"1408","TD":25.9},{"name":"西勢","ID":"1409","TD":28.3},{"name":"竹田","ID":"1410","TD":32},{"name":"潮州","ID":"1411","TD":36.1},{"name":"崁頂","ID":"1412","TD":40.9},{"name":"南州","ID":"1413","TD":43.3},{"name":"鎮安","ID":"1414","TD":46.9},{"name":"林邊","ID":"1415","TD":50.1},{"name":"佳冬","ID":"1416","TD":54.1},{"name":"東海","ID":"1417","TD":57.2},{"name":"枋寮","ID":"1418","TD":61.3}]},{"dir":1,"LineID":"SL","station":[{"name":"枋寮","ID":"1418","TD":0},{"name":"加祿","ID":"1502","TD":5.3},{"name":"內獅","ID":"1503","TD":8.7},{"name":"枋山","ID":"1504","TD":13.6},{"name":"古莊","ID":"1507","TD":40.5},{"name":"大武","ID":"1508","TD":43.8},{"name":"瀧溪","ID":"1510","TD":55.5},{"name":"金崙","ID":"1512","TD":63.9},{"name":"太麻里","ID":"1514","TD":74.9},{"name":"知本","ID":"1516","TD":86.6},{"name":"康樂","ID":"1517","TD":93.6},{"name":"臺東","ID":"1632","TD":98.2}]}];

  var tra_station = [{"StationID":"4102","name":"樹調","ename":"ShuDiao"},{"StationID":"1632","lat":22.793711,"lon":121.123175,"name":"臺東","ename":"Taitung"},{"StationID":"1631","lat":22.862046,"lon":121.138031,"name":"山里","ename":"Shanli"},{"StationID":"1630","lat":22.912469,"lon":121.137004,"name":"鹿野","ename":"Luye"},{"StationID":"1629","lat":22.955978,"lon":121.159014,"name":"瑞源","ename":"Ruiyuan"},{"StationID":"1628","lat":22.979968,"lon":121.15579,"name":"瑞和","ename":"Ruihe"},{"StationID":"1626","lat":23.045665,"lon":121.164373,"name":"關山","ename":"Guanshan"},{"StationID":"1625","lat":23.102934,"lon":121.176829,"name":"海端","ename":"Haiduan"},{"StationID":"1624","lat":23.126158,"lon":121.21939,"name":"池上","ename":"Chishang"},{"StationID":"1623","lat":23.179132,"lon":121.248692,"name":"富里","ename":"Fuli"},{"StationID":"1622","lat":23.226025,"lon":121.278481,"name":"東竹","ename":"Dongzhu"},{"StationID":"1621","lat":23.272309,"lon":121.304181,"name":"東里","ename":"Dongli"},{"StationID":"1619","lat":23.331518,"lon":121.311726,"name":"玉里","ename":"Yuli"},{"StationID":"1617","lat":23.424766,"lon":121.345344,"name":"三民","ename":"Sanmin"},{"StationID":"1616","lat":23.497376,"lon":121.376841,"name":"瑞穗","ename":"Ruisui"},{"StationID":"1614","lat":23.580268,"lon":121.380122,"name":"富源","ename":"Fuyuan"},{"StationID":"1613","lat":23.605688,"lon":121.389624,"name":"大富","ename":"Dafu"},{"StationID":"1612","lat":23.666293,"lon":121.421168,"name":"光復","ename":"Guangfu"},{"StationID":"1611","lat":23.711978,"lon":121.419067,"name":"萬榮","ename":"Wanrong"},{"StationID":"1610","lat":23.74634,"lon":121.447024,"name":"鳳林","ename":"Fenglin"},{"StationID":"1609","lat":23.782276,"lon":121.45828,"name":"南平","ename":"Nanping"},{"StationID":"1608","lat":23.802587,"lon":121.462015,"name":"林榮新光","ename":"Linrong Shin Kong"},{"StationID":"1607","lat":23.848475,"lon":121.496168,"name":"豐田","ename":"Fengtian"},{"StationID":"1606","lat":23.869016,"lon":121.510633,"name":"壽豐","ename":"Shoufeng"},{"StationID":"1605","lat":23.882774,"lon":121.520485,"name":"平和","ename":"Pinghe"},{"StationID":"1604","lat":23.907494,"lon":121.529437,"name":"志學","ename":"Zhixue"},{"StationID":"1602","lat":23.968179,"lon":121.582699,"name":"吉安","ename":"Jian"},{"StationID":"1715","lat":23.992868,"lon":121.600993,"name":"花蓮","ename":"Hualien"},{"StationID":"1714","lat":24.032533,"lon":121.601671,"name":"北埔","ename":"Beipu"},{"StationID":"1713","lat":24.090317,"lon":121.610786,"name":"景美","ename":"Jingmei"},{"StationID":"1712","lat":24.127524,"lon":121.640866,"name":"新城","ename":"Xincheng"},{"StationID":"1711","lat":24.172116,"lon":121.655498,"name":"崇德","ename":"Chongde"},{"StationID":"1710","lat":24.242199,"lon":121.711749,"name":"和仁","ename":"Heren"},{"StationID":"1709","lat":24.298296,"lon":121.753346,"name":"和平","ename":"Heping"},{"StationID":"1708","lat":24.335428,"lon":121.768355,"name":"漢本","ename":"Hanben"},{"StationID":"1706","lat":24.448674,"lon":121.776037,"name":"武塔","ename":"Wuta"},{"StationID":"1705","lat":24.463396,"lon":121.800926,"name":"南澳","ename":"Nanao"},{"StationID":"1704","lat":24.518221,"lon":121.830683,"name":"東澳","ename":"Dongao"},{"StationID":"1703","lat":24.568417,"lon":121.844564,"name":"永樂","ename":"Yongle"},{"StationID":"1827","lat":24.595181,"lon":121.85144,"name":"蘇澳","ename":"Suao"},{"StationID":"1826","lat":24.609024,"lon":121.82703,"name":"蘇澳新","ename":"Suaoxin"},{"StationID":"1825","lat":24.615395,"lon":121.8229,"name":"新馬","ename":"Xinma"},{"StationID":"1824","lat":24.636726,"lon":121.792246,"name":"冬山","ename":"Dongshan"},{"StationID":"1823","lat":24.677929,"lon":121.774629,"name":"羅東","ename":"Luodong"},{"StationID":"1822","lat":24.694192,"lon":121.775163,"name":"中里","ename":"Zhongli"},{"StationID":"1821","lat":24.705267,"lon":121.774131,"name":"二結","ename":"Erjie"},{"StationID":"1820","lat":24.754512,"lon":121.758253,"name":"宜蘭","ename":"Yilan"},{"StationID":"1819","lat":24.786802,"lon":121.762727,"name":"四城","ename":"Sicheng"},{"StationID":"1818","lat":24.827034,"lon":121.775354,"name":"礁溪","ename":"Jiaoxi"},{"StationID":"1817","lat":24.843998,"lon":121.809207,"name":"頂埔","ename":"Dingpu"},{"StationID":"1816","lat":24.858976,"lon":121.822556,"name":"頭城","ename":"Toucheng"},{"StationID":"1815","lat":24.883703,"lon":121.845758,"name":"外澳","ename":"Waiao"},{"StationID":"1814","lat":24.904818,"lon":121.868878,"name":"龜山","ename":"Guishan"},{"StationID":"1813","lat":24.938423,"lon":121.889873,"name":"大溪","ename":"Daxi"},{"StationID":"1812","lat":24.966799,"lon":121.922496,"name":"大里","ename":"Dali"},{"StationID":"1811","lat":24.978334,"lon":121.945191,"name":"石城","ename":"Shicheng"},{"StationID":"1810","lat":25.015893,"lon":121.944659,"name":"福隆","ename":"Fulong"},{"StationID":"1809","lat":25.022044,"lon":121.908703,"name":"貢寮","ename":"Gongliao"},{"StationID":"1808","lat":25.038544,"lon":121.866548,"name":"雙溪","ename":"Shuangxi"},{"StationID":"1807","lat":25.058738,"lon":121.851977,"name":"牡丹","ename":"Mudan"},{"StationID":"1806","lat":25.065544,"lon":121.822559,"name":"三貂嶺","ename":"Sandiaoling"},{"StationID":"1805","lat":25.087009,"lon":121.827424,"name":"侯硐","ename":"Houtong"},{"StationID":"1804","lat":25.108928,"lon":121.806149,"name":"瑞芳","ename":"Ruifang"},{"StationID":"1803","lat":25.102751,"lon":121.761887,"name":"四腳亭","ename":"Sijiaoting"},{"StationID":"1802","lat":25.102282,"lon":121.740329,"name":"暖暖","ename":"Nuannuan"},{"StationID":"1001","lat":25.131598,"lon":121.738366,"name":"基隆","ename":"Keelung"},{"StationID":"1002","lat":25.108392,"lon":121.729049,"name":"八堵","ename":"Badu"},{"StationID":"1003","lat":25.093359,"lon":121.713868,"name":"七堵","ename":"Qidu"},{"StationID":"1004","lat":25.078,"lon":121.667701,"name":"五堵","ename":"Wudu"},{"StationID":"1005","lat":25.068224,"lon":121.661757,"name":"汐止","ename":"Xizhi"},{"StationID":"1006","lat":25.05314,"lon":121.607019,"name":"南港","ename":"Nangang"},{"StationID":"1007","lat":25.04933,"lon":121.577965,"name":"松山","ename":"Songshan"},{"StationID":"1008","lat":25.047503,"lon":121.517047,"name":"臺北","ename":"Taipei"},{"StationID":"1009","lat":25.03335,"lon":121.500331,"name":"萬華","ename":"Wanhua"},{"StationID":"1011","lat":25.014399,"lon":121.463497,"name":"板橋","ename":"Banqiao"},{"StationID":"1012","lat":24.991348,"lon":121.424564,"name":"樹林","ename":"Shulin"},{"StationID":"1013","lat":24.972482,"lon":121.392657,"name":"山佳","ename":"Shanjia"},{"StationID":"1014","lat":24.954532,"lon":121.355125,"name":"鶯歌","ename":"Yingge"},{"StationID":"1015","lat":24.989209,"lon":121.313499,"name":"桃園","ename":"Taoyuan"},{"StationID":"1016","lat":24.972797,"lon":121.258258,"name":"內壢","ename":"Neili"},{"StationID":"1017","lat":24.953666,"lon":121.225798,"name":"中壢","ename":"Zhongli"},{"StationID":"1018","lat":24.919951,"lon":121.183827,"name":"埔心","ename":"Puxin"},{"StationID":"1019","lat":24.914346,"lon":121.146405,"name":"楊梅","ename":"Yangmei"},{"StationID":"1020","lat":24.934273,"lon":121.083019,"name":"富岡","ename":"Fugang"},{"StationID":"1021","lat":24.903029,"lon":121.044009,"name":"湖口","ename":"Hukou"},{"StationID":"1022","lat":24.869228,"lon":120.99634,"name":"新豐","ename":"Xinfeng"},{"StationID":"1023","lat":24.839283,"lon":121.009376,"name":"竹北","ename":"Zhubei"},{"StationID":"1025","lat":24.801637,"lon":120.971627,"name":"新竹","ename":"Hsinchu"},{"StationID":"1026","lat":24.763121,"lon":120.91389,"name":"香山","ename":"Xiangshan"},{"StationID":"1027","lat":24.722782,"lon":120.87179,"name":"崎頂","ename":"Qiding"},{"StationID":"1028","lat":24.686562,"lon":120.880888,"name":"竹南","ename":"Zhunan"},{"StationID":"1102","lat":24.656414,"lon":120.858241,"name":"談文","ename":"Tanwen"},{"StationID":"1104","lat":24.645645,"lon":120.803778,"name":"大山","ename":"Dashan"},{"StationID":"1105","lat":24.616212,"lon":120.787307,"name":"後龍","ename":"Houlong"},{"StationID":"1106","lat":24.611683,"lon":120.758142,"name":"龍港","ename":"Longgang"},{"StationID":"1107","lat":24.564797,"lon":120.708198,"name":"白沙屯","ename":"Baishatun"},{"StationID":"1108","lat":24.54018,"lon":120.695179,"name":"新埔","ename":"Xinpu"},{"StationID":"1109","lat":24.491403,"lon":120.678425,"name":"通霄","ename":"Tongxiao"},{"StationID":"1110","lat":24.443426,"lon":120.651494,"name":"苑裡","ename":"Yuanli"},{"StationID":"1111","lat":24.378066,"lon":120.654119,"name":"日南","ename":"Rinan"},{"StationID":"1112","lat":24.34443,"lon":120.627017,"name":"大甲","ename":"Dajia"},{"StationID":"1113","lat":24.304366,"lon":120.602297,"name":"臺中港","ename":"Taichung Port"},{"StationID":"1114","lat":24.263624,"lon":120.569178,"name":"清水","ename":"Qingshui"},{"StationID":"1115","lat":24.237044,"lon":120.557627,"name":"沙鹿","ename":"Shalu"},{"StationID":"1116","lat":24.197444,"lon":120.543371,"name":"龍井","ename":"Longjing"},{"StationID":"1117","lat":24.154024,"lon":120.542536,"name":"大肚","ename":"Dadu"},{"StationID":"1118","lat":24.120613,"lon":120.570158,"name":"追分","ename":"Zhuifen"},{"StationID":"1302","lat":24.641439,"lon":120.867051,"name":"造橋","ename":"Zaoqiao"},{"StationID":"1305","lat":24.570036,"lon":120.822319,"name":"苗栗","ename":"Miaoli"},{"StationID":"1307","lat":24.522509,"lon":120.791571,"name":"南勢","ename":"Nanshi"},{"StationID":"1308","lat":24.48634,"lon":120.786173,"name":"銅鑼","ename":"Tongluo"},{"StationID":"1310","lat":24.42062,"lon":120.773931,"name":"三義","ename":"Sanyi"},{"StationID":"1314","lat":24.331292,"lon":120.741816,"name":"泰安","ename":"Taian"},{"StationID":"1315","lat":24.309312,"lon":120.732893,"name":"后里","ename":"Houli"},{"StationID":"1317","lat":24.254111,"lon":120.723447,"name":"豐原","ename":"Fengyuan"},{"StationID":"1318","lat":24.212802,"lon":120.705947,"name":"潭子","ename":"Tanzi"},{"StationID":"1319","lat":24.136955,"lon":120.686827,"name":"臺中","ename":"Taichung"},{"StationID":"1320","lat":24.108692,"lon":120.622472,"name":"烏日","ename":"Wuri"},{"StationID":"1321","lat":24.114232,"lon":120.590164,"name":"成功","ename":"Chenggong"},{"StationID":"1120","lat":24.081666,"lon":120.538539,"name":"彰化","ename":"Changhua"},{"StationID":"1202","lat":24.024997,"lon":120.5374,"name":"花壇","ename":"Huatan"},{"StationID":"1203","lat":23.959258,"lon":120.56965,"name":"員林","ename":"Yuanlin"},{"StationID":"1204","lat":23.928148,"lon":120.571672,"name":"永靖","ename":"Yongjing"},{"StationID":"1205","lat":23.89571,"lon":120.5808,"name":"社頭","ename":"Shetou"},{"StationID":"1206","lat":23.858503,"lon":120.591396,"name":"田中","ename":"Tianzhong"},{"StationID":"1207","lat":23.81315,"lon":120.618115,"name":"二水","ename":"Ershui"},{"StationID":"1208","lat":23.759681,"lon":120.614987,"name":"林內","ename":"Linnei"},{"StationID":"1209","lat":23.731643,"lon":120.579973,"name":"石榴","ename":"Shiliu"},{"StationID":"1210","lat":23.711813,"lon":120.541146,"name":"斗六","ename":"Douliu"},{"StationID":"1211","lat":23.672972,"lon":120.480841,"name":"斗南","ename":"Dounan"},{"StationID":"1212","lat":23.639568,"lon":120.471007,"name":"石龜","ename":"Shigui"},{"StationID":"1213","lat":23.601076,"lon":120.455839,"name":"大林","ename":"Dalin"},{"StationID":"1214","lat":23.555039,"lon":120.431651,"name":"民雄","ename":"Minxiong"},{"StationID":"1215","lat":23.479139,"lon":120.441026,"name":"嘉義","ename":"Chiayi"},{"StationID":"1217","lat":23.433995,"lon":120.399665,"name":"水上","ename":"Shuishang"},{"StationID":"1218","lat":23.41345,"lon":120.386544,"name":"南靖","ename":"Nanjing"},{"StationID":"1219","lat":23.36629,"lon":120.360517,"name":"後壁","ename":"Houbi"},{"StationID":"1220","lat":23.306732,"lon":120.323055,"name":"新營","ename":"Xinying"},{"StationID":"1221","lat":23.277737,"lon":120.322304,"name":"柳營","ename":"Liuying"},{"StationID":"1222","lat":23.24259,"lon":120.32093,"name":"林鳳營","ename":"Linfengying"},{"StationID":"1223","lat":23.192699,"lon":120.31929,"name":"隆田","ename":"Longtian"},{"StationID":"1224","lat":23.172622,"lon":120.32133,"name":"拔林","ename":"Balin"},{"StationID":"1225","lat":23.133323,"lon":120.306551,"name":"善化","ename":"Shanhua"},{"StationID":"1226","lat":23.06823,"lon":120.290035,"name":"新市","ename":"Xinshi"},{"StationID":"1227","lat":23.038338,"lon":120.253524,"name":"永康","ename":"Yongkang"},{"StationID":"1228","lat":22.997144,"lon":120.212966,"name":"臺南","ename":"Tainan"},{"StationID":"1229","lat":22.93294,"lon":120.231594,"name":"保安","ename":"Baoan"},{"StationID":"1230","lat":22.904544,"lon":120.2527,"name":"中洲","ename":"Zhongzhou"},{"StationID":"1231","lat":22.878228,"lon":120.253934,"name":"大湖","ename":"Dahu"},{"StationID":"1232","lat":22.853948,"lon":120.266275,"name":"路竹","ename":"Luzhu"},{"StationID":"1233","lat":22.792355,"lon":120.299933,"name":"岡山","ename":"Gangshan"},{"StationID":"1234","lat":22.760994,"lon":120.310334,"name":"橋頭","ename":"Qiaotou"},{"StationID":"1235","lat":22.727035,"lon":120.324371,"name":"楠梓","ename":"Nanzi"},{"StationID":"1236","lat":22.675204,"lon":120.294793,"name":"左營","ename":"Zuoying"},{"StationID":"1238","lat":22.63962,"lon":120.302111,"name":"高雄","ename":"Kaohsiung"},{"StationID":"1402","lat":22.631284,"lon":120.357683,"name":"鳳山","ename":"Fengshan"},{"StationID":"1403","lat":22.640067,"lon":120.391125,"name":"後庄","ename":"Houzhuang"},{"StationID":"1404","lat":22.656423,"lon":120.420879,"name":"九曲堂","ename":"Jiuqutang"},{"StationID":"1405","lat":22.666252,"lon":120.464873,"name":"六塊厝","ename":"Liukuaicuo"},{"StationID":"1406","lat":22.669306,"lon":120.486203,"name":"屏東","ename":"Pingtung"},{"StationID":"1407","lat":22.65238,"lon":120.502941,"name":"歸來","ename":"Guilai"},{"StationID":"1408","lat":22.634849,"lon":120.514378,"name":"麟洛","ename":"Linluo"},{"StationID":"1409","lat":22.616433,"lon":120.526697,"name":"西勢","ename":"Xishi"},{"StationID":"1410","lat":22.586491,"lon":120.540002,"name":"竹田","ename":"Zhutian"},{"StationID":"1411","lat":22.550086,"lon":120.53642,"name":"潮州","ename":"Chaozhou"},{"StationID":"1412","lat":22.51306,"lon":120.514765,"name":"崁頂","ename":"Kanding"},{"StationID":"1413","lat":22.492058,"lon":120.511738,"name":"南州","ename":"Nanzhou"},{"StationID":"1414","lat":22.457984,"lon":120.511356,"name":"鎮安","ename":"Zhenan"},{"StationID":"1415","lat":22.431406,"lon":120.515376,"name":"林邊","ename":"Linbian"},{"StationID":"1416","lat":22.414087,"lon":120.547742,"name":"佳冬","ename":"Jiadong"},{"StationID":"1417","lat":22.399005,"lon":120.572381,"name":"東海","ename":"Donghai"},{"StationID":"1418","lat":22.368019,"lon":120.595098,"name":"枋寮","ename":"Fangliao"},{"StationID":"1502","lat":22.330971,"lon":120.624621,"name":"加祿","ename":"Jialu"},{"StationID":"1503","lat":22.306184,"lon":120.643492,"name":"內獅","ename":"Neishi"},{"StationID":"1504","lat":22.267067,"lon":120.659647,"name":"枋山","ename":"Fangshan"},{"StationID":"1505","lat":22.280818,"lon":120.717243,"name":"枋野","ename":"Fangye"},{"StationID":"1507","lat":22.345509,"lon":120.878079,"name":"古莊","ename":"Guzhuang"},{"StationID":"1508","lat":22.365206,"lon":120.900713,"name":"大武","ename":"Dawu"},{"StationID":"1510","lat":22.46104,"lon":120.941771,"name":"瀧溪","ename":"Longxi"},{"StationID":"1512","lat":22.531488,"lon":120.967239,"name":"金崙","ename":"Jinlun"},{"StationID":"1514","lat":22.614936,"lon":120.993368,"name":"太麻里","ename":"Taimali"},{"StationID":"1516","lat":22.710182,"lon":121.060744,"name":"知本","ename":"Zhiben"},{"StationID":"1517","lat":22.764277,"lon":121.09356,"name":"康樂","ename":"Kangle"},{"StationID":"1322","lat":24.119304,"lon":120.648571,"name":"大慶","ename":"Daqing"},{"StationID":"1029","lat":25.123081,"lon":121.742009,"name":"三坑","ename":"Sankeng"},{"StationID":"1323","lat":24.163634,"lon":120.699717,"name":"太原","ename":"Taiyuan"},{"StationID":"1239","lat":23.019399,"lon":120.22442,"name":"大橋","ename":"Daqiao"},{"StationID":"1240","lat":23.990053,"lon":120.560645,"name":"大村","ename":"Dacun"},{"StationID":"1241","lat":23.499897,"lon":120.448503,"name":"嘉北","ename":"Jiabei"},{"StationID":"1903","lat":25.049758,"lon":121.797929,"name":"大華","ename":"Dahua"},{"StationID":"1904","lat":25.040991,"lon":121.775229,"name":"十分","ename":"Shifen"},{"StationID":"1905","lat":25.03454,"lon":121.763782,"name":"望古","ename":"Wanggu"},{"StationID":"1906","lat":25.030138,"lon":121.748102,"name":"嶺腳","ename":"Lingjiao"},{"StationID":"1907","lat":25.025633,"lon":121.739984,"name":"平溪","ename":"Pingxi"},{"StationID":"1908","lat":25.023918,"lon":121.723649,"name":"菁桐","ename":"Jingtong"},{"StationID":"1024","lat":24.808746,"lon":120.98367,"name":"北新竹","ename":"North Hsinchu"},{"StationID":"2212","lat":24.806662,"lon":121.003273,"name":"千甲","ename":"Qianjia"},{"StationID":"2213","lat":24.788176,"lon":121.022122,"name":"新莊","ename":"Xinzhuang"},{"StationID":"2214","lat":24.807655,"lon":121.039417,"name":"六家","ename":"Liujia"},{"StationID":"2203","lat":24.781358,"lon":121.031306,"name":"竹中","ename":"Zhuzhong"},{"StationID":"2204","lat":24.77789,"lon":121.055725,"name":"上員","ename":"Shangyuan"},{"StationID":"2205","lat":24.738257,"lon":121.0949,"name":"竹東","ename":"Zhudong"},{"StationID":"2206","lat":24.72056,"lon":121.11645,"name":"橫山","ename":"Hengshan"},{"StationID":"2207","lat":24.720599,"lon":121.13602,"name":"九讚頭","ename":"Jiuzantou"},{"StationID":"2208","lat":24.716746,"lon":121.154403,"name":"合興","ename":"Hexing"},{"StationID":"2209","lat":24.715559,"lon":121.167377,"name":"富貴","ename":"Fugui"},{"StationID":"2210","lat":24.705317,"lon":121.182325,"name":"內灣","ename":"Neiwan"},{"StationID":"2211","lat":24.74839,"lon":121.083399,"name":"榮華","ename":"Ronghua"},{"StationID":"2702","lat":23.798445,"lon":120.642034,"name":"源泉","ename":"Yuanquan"},{"StationID":"2703","lat":23.834666,"lon":120.70472,"name":"濁水","ename":"Zhuoshui"},{"StationID":"2704","lat":23.835188,"lon":120.750404,"name":"龍泉","ename":"Longquan"},{"StationID":"2705","lat":23.826451,"lon":120.784891,"name":"集集","ename":"Jiji"},{"StationID":"2706","lat":23.818456,"lon":120.853323,"name":"水里","ename":"Shuili"},{"StationID":"2707","lat":23.832637,"lon":120.865745,"name":"車埕","ename":"Checheng"},{"StationID":"3202","lat":23.994013,"lon":121.636083,"name":"花蓮港","ename":"hualien Port"},{"StationID":"1030","lat":25.077927,"lon":121.693869,"name":"百福","ename":"Baifu"},{"StationID":"1031","lat":25.062626,"lon":121.646584,"name":"汐科","ename":"Xike"},{"StationID":"1032","lat":25.004184,"lon":121.444649,"name":"浮洲","ename":"Fuzhou"},{"StationID":"1034","lat":24.980485,"lon":121.408796,"name":"南樹林","ename":"South Shulin"},{"StationID":"1036","lat":24.931239,"lon":121.066512,"name":"新富","ename":"Xinfu Station"},{"StationID":"1033","lat":24.922207,"lon":121.055671,"name":"北湖","ename":"BeihuChina University of Technology"},{"StationID":"1035","lat":24.78755,"lon":120.928937,"name":"三姓橋","ename":"Sanxingqiao"},{"StationID":"1304","lat":24.604417,"lon":120.826115,"name":"豐富","ename":"Fengfu"},{"StationID":"1325","name":"栗林","ename":"Lilin"},{"StationID":"1326","name":"頭家厝","ename":"Toujiacuo"},{"StationID":"1327","name":"松竹","ename":"Songzhu"},{"StationID":"1328","name":"精武","ename":"Jingwu"},{"StationID":"1329","lat":24.129105,"lon":120.666833,"name":"五權","ename":"Wuquan"},{"StationID":"1324","lat":24.109851,"lon":120.614309,"name":"新烏日","ename":"Xinwuri"},{"StationID":"1243","lat":22.923682,"lon":120.240609,"name":"仁德","ename":"Rende"},{"StationID":"1244","lat":23.107602,"lon":120.301996,"name":"南科","ename":"Nanke"},{"StationID":"5101","lat":22.907187,"lon":120.272176,"name":"長榮大學","ename":"CJCU"},{"StationID":"5102","lat":22.923953,"lon":120.286371,"name":"沙崙","ename":"Shalun"},{"StationID":"1242","lat":22.687544,"lon":120.306788,"name":"新左營","ename":"Xinzuoying"},{"StationID":"6103","lat":25.137706,"lon":121.800023,"name":"海科館","ename":"NMMST"},{"StationID":"2003","lat":25.135392,"lon":121.803199,"name":"八斗子","ename":"Badouzi"},{"StationID":"1245","lat":22.665959,"lon":120.287059,"name":"內惟","ename":"Neiwei"},{"StationID":"1246","lat":22.652737,"lon":120.281489,"name":"美術館","ename":"Museum of Fine Arts"},{"StationID":"1237","lat":22.639895,"lon":120.281328,"name":"鼓山","ename":"Gushan"},{"StationID":"1247","name":"三塊厝","ename":"Sankuaicuo"},{"StationID":"1419","name":"民族","ename":"Minzu"},{"StationID":"1420","lat":22.639693,"lon":120.323515,"name":"科工館","ename":"Science and Technology Museum"},{"StationID":"1421","name":"正義","ename":"Zhengyi"}];

  var tra_train = [{"TrainTypeID":"1107","TrainTypeCode":"2","note":"普悠瑪","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1115","TrainTypeCode":"4","note":"有身障座位 ,有自行車車廂","name":"莒光","ename":"Chu-Kuang Express"},{"TrainTypeID":"110F","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1110","TrainTypeCode":"4","note":"無身障座位","name":"莒光","ename":"Chu Kuang"},{"TrainTypeID":"110A","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1111","TrainTypeCode":"4","note":"有身障座位","name":"莒光","ename":"Chu-Kuang Express"},{"TrainTypeID":"1120","TrainTypeCode":"5","note":"","name":"復興","ename":"Fu Hsing"},{"TrainTypeID":"110E","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1106","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"110B","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1100","TrainTypeCode":"3","note":"DMU2800、2900、3000型柴聯及 EMU型電車自強號","name":"自強","ename":"Tze Chiang"},{"TrainTypeID":"1103","TrainTypeCode":"3","note":"DMU3100型柴聯自強號","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"110C","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1131","TrainTypeCode":"6","note":"","name":"區間車","ename":"Local Train"},{"TrainTypeID":"1114","TrainTypeCode":"4","note":"無身障座位 ,有自行車車廂","name":"莒光","ename":"Chu-Kuang Express"},{"TrainTypeID":"1109","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1108","TrainTypeCode":"3","note":"推拉式自強號且無自行車車廂","name":"自強","ename":"Tze-Chiang Limited Express"},{"TrainTypeID":"1140","TrainTypeCode":"7","note":"","name":"普快車","ename":"Ordinary Express train"},{"TrainTypeID":"1101","TrainTypeCode":"3","note":"推拉式自強號","name":"自強","ename":"Tze Chiang"},{"TrainTypeID":"1132","TrainTypeCode":"6","note":"","name":"區間快","ename":"Fast Local Train"},{"TrainTypeID":"1102","TrainTypeCode":"1","note":"太魯閣","name":"自強","ename":"Tze Chiang"},{"TrainTypeID":"110D","TrainTypeCode":"3","note":"","name":"自強","ename":"Tze-Chiang Limited Express"}];

  //import trav3_station from './datax/tra.v3.station.json';
  //import trav3_train from './datax/tra.v3.train.json';

  function getObjID(uid) {
    //透過 uid 拆解找對應的資料，uid 格式為 {公司名}_{路線名}，例如 trtc_R 為台北捷運紅線
    if (/^TRA-|^TRTC-|^KRTC-|^TYMC-|^KLRT-|^THSR-/.test(uid)) {
      if (/^TRA-/.test(uid)) uid = uid.replace(/^TRA-/, 'tra_');else if (/^TRTC-/.test(uid)) uid = uid.replace(/^TRTC-/, 'trtc_');else if (/^KRTC-/.test(uid)) uid = uid.replace(/^KRTC-/, 'krtc_');else if (/^TYMC-/.test(uid)) uid = uid.replace(/^TYMC-/, 'tymetro_');else if (/^KLRT-/.test(uid)) uid = uid.replace(/^KLRT-/, 'klrt_');else if (/^THSR-/.test(uid)) uid = uid.replace(/^THSR-/, 'thsr_');
    }

    var ary = uid.split('_');
    var companyTag = ary[0];
    var id = uid.replace(companyTag + '_', '');
    return {
      company: companyTag,
      id: id
    };
  }

  var datax = {
    trtc: {
      line: trtc_line,
      station: trtc_station,
      transfer: trtc_transfer
    },
    krtc: {
      line: krtc_line,
      station: krtc_station,
      transfer: krtc_transfer
    },
    tymetro: {
      line: tymetro_line,
      station: tymetro_station
    },
    thsr: {
      station: thsr_station
    },
    tra: {
      line: tra_line,
      station: tra_station,
      train: tra_train
    },
    getLine: function getLine(uid) {
      var objA = getObjID(uid);

      if (arguments.length == 2) {
        objA = {
          company: arguments[0],
          id: arguments[1]
        };
      }

      if (!this[objA.company]) throw 'Company ' + objA.company + ' is not defined. Error on datax.js getLine';
      var lineAry = this[objA.company].line;
      return lineAry.find(function (c) {
        return c.LineID == objA.id;
      });
    },
    getStation: function getStation(uid) {
      var objA = getObjID(uid);

      if (arguments.length == 2) {
        objA = {
          company: arguments[0],
          id: arguments[1]
        };
      }

      if (!this[objA.company]) throw 'Company ' + objA.company + ' is not defined. Error on datax.js getStation';
      var stAry = this[objA.company].station;
      return stAry.find(function (c) {
        return c.StationID == objA.id;
      });
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
    getPositionBusStation: function getPositionBusStation(city, lat, lng, cfg) {
      cfg = this.setDefaultCfg(cfg);
      var myURL = busURL + '/Station/' + cfg.manageBy + '/' + this.getCityData(city).City + '?';
      myURL += ptx.spatialFilterFn(lat, lng, cfg.far, cfg.field) + '&' + ptx.topFn();
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
        Station_Fare_BackTag: ['OriginStationID', 'DestinationStationID', 'Fares'],
        Station_Transfer_BackTag: ['FromLineID', 'FromStationID', 'FromStationName', 'IsOnSiteTransfer', 'ToLineID', 'ToStationID', 'TransferTime']
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
            return mainSub.main.indexOf(c.RouteID) != -1 && regW.test(c.weekStr);
          });
          return procTIme(rollTime);
        });
        if (MainDirTime[0].isEmpty && MainDirTime[1].isEmpty) MainDirTime = false;

        if (hasSubLine && isSubOfStation) {
          SubDirTime = timeObj.Direction.map(function (DirTime) {
            var backTime = DirTime.filter(function (c) {
              return mainSub.sub.indexOf(c.RouteID) != -1 && regW.test(c.weekStr);
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
      getDataXS2STravelTime: function getDataXS2STravelTime(fromID, toID, TrainType) {
        var LineID = getStationOnWhatLineID(fromID);
        var lineObj = catchData.getDataXLineObj(LineID);
        var fidx = 0,
            tidx = 0;
        var routeData = lineObj.Route.find(function (c) {
          fidx = c.Stations.indexOf(fromID);
          tidx = c.Stations.indexOf(toID);
          return fidx != -1 && tidx != -1 && fidx < tidx;
        });
        var rt = false;

        if (routeData) {
          var aryA = [];

          if (routeData.TravelTime && routeData.TravelTime.RunTime) {
            for (var i = fidx; i < tidx; i++) {
              aryA.push({
                from: routeData.Stations[i],
                to: routeData.Stations[i + 1],
                RunTime: routeData.TravelTime.RunTime[i],
                StopTime: i > fidx && routeData.TravelTime.StopTime ? routeData.TravelTime.StopTime[i] : 0
              });
            }

            rt = {
              list: aryA,
              sec: aryA.reduce(function (val, ac) {
                return val + ac.RunTime + ac.StopTime;
              }, 0)
            };
            rt.min = Math.ceil(rt.sec / 60);
          } else if (routeData.TravelTimeBetween) {
            console.log('TYMetro need rewrite metro.js >> getDataXS2STravelTime()');
          }
        }

        return rt;
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
      getDataXTransferOfLine: function getDataXTransferOfLine(LineID) {
        return ptx.datax[compName].transfer.filter(function (c) {
          return c.FromLineID == LineID;
        });
      },
      getDataXTransferStation: function getDataXTransferStation(FromLineID, ToLineID) {
        return ptx.datax[compName].transfer.filter(function (c) {
          return c.FromLineID == FromLineID && c.ToLineID == ToLineID;
        });
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
      Transfer: function Transfer(progressFn) {
        if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //轉乘包抓法  1.抓所有 ODFare  2.整理輸出就好

        progressFn('取得轉乘站中');
        var backTag = catchData.config.Station_Transfer_BackTag;
        return me._LineTransfer({
          selectField: backTag
        }).then(function (res) {
          //整理
          return promiseCatchLinePredo(res.data, backTag);
        }).then(function (data) {
          //合併
          data.forEach(function (st) {
            st.name = st.FromStationName.Zh_tw;
            st.ename = st.FromStationName.En;
            delete st.FromStationName;
          });
          return data;
        }).catch(function (res) {
          return res;
        });
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
      //分方向
      dirObj.DepTime.forEach(function (c) {
        //分星期幾運行
        c.trainTime = [];
        c.stationTime = [];
        c.stationList = [];
        c.time.forEach(function (t) {
          //算全線時間
          tmpTrainTime = catchData.calcLineTimeByFirstStation(LineObj, dirObj.StationID, t, RouteName, Direction);
          tmpTrainTime.forEach(function (stt, stidx) {
            c.stationTime[stidx] = c.stationTime[stidx] || [];
            c.stationTime[stidx].push(stt);
            c.stationList.push(Route[Direction].Stations[stidx]);
          });
          c.trainTime.push(tmpTrainTime);
        });
        c.To = c.stationList[c.stationList.length - 1];
        var firstTrainTime = c.trainTime[0];
        var otherStationStartTrainTime = [];
        c.stationList.forEach(function (stid, stidx) {
          var stObj = catchData.getDataXStationData(stid);
          var firstLastInfo = stObj.FirstLast.find(function (fs) {
            return fs.To == c.To;
          });
          var advBackTime = false,
              tmpAdvRealTime = [];

          if (firstLastInfo) {
            var firstTime = firstLastInfo.Time[0];

            if (CM.transTime2Sec(firstTime) + 60 < CM.transTime2Sec(firstTrainTime[stidx])) {
              tmpAdvRealTime = catchData.calcLineTimeByFirstStation(LineObj, stid, firstTime, RouteName, Direction);
              advBackTime = new Array(stidx).concat(tmpAdvRealTime);
              firstTrainTime = advBackTime;
              otherStationStartTrainTime.push(advBackTime);
              advBackTime.forEach(function (stt, stidx) {
                if (stt) {
                  c.stationTime[stidx].push(stt);
                }
              });
            }
          }
        });
        c.trainTime = c.trainTime.concat(otherStationStartTrainTime);
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
          var targetStationID = c.stationList[stidx];
          timeBack.find(function (st) {
            return targetStationID == st.StationID;
          }).Direction[dir].push({
            RouteID: RouteName,
            Timetables: aryTimes,
            To: c.stationList[c.stationList.length - 1],
            weekStr: c.weekStr
          });
        });
      });
    });
    return timeBack;
  };

  var cachePTX = {
    station: {}
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
    getStationData: function getStationData(id) {
      var ary = pData.trtc.station_ary;
      var stData = false;

      for (var i = 0; i < ary.length; i++) {
        if (ary[i].id == id) {
          stData = ary[i];
          break;
        }
      }

      return stData;
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
    //使用 PTX StationID 存取
    getByStationID: function getByStationID(StationID) {
      if (cachePTX.station[StationID]) return cachePTX.station[StationID];
      var ttid = this.getOriginalStationID(StationID);
      var data = this.getStationData(ttid);

      if (data) {
        data = JSON.parse(JSON.stringify(data));
        data.targetStationID = StationID;
        data.LineID = this.getStationIDInWhatLine(StationID);
        cachePTX.station[StationID] = data;
      }

      return data;
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

  var thsrV2URL = CM.thsrV2URL;
  var v2urls = {
    Station: thsrV2URL + '/Station/',
    //取得車站基本資料
    ODFare: thsrV2URL + '/ODFare/',
    //取得票價資料
    GeneralTimetable: thsrV2URL + '/GeneralTimetable/',
    //取得所有車次的定期時刻表資料
    DailyTrainInfo_Today: thsrV2URL + '/DailyTrainInfo/Today/',
    //取得當天所有車次的車次資料
    DailyTimetable_Today: thsrV2URL + '/DailyTimetable/Today/',
    //取得當天所有車次的時刻表資料
    AlertInfo: thsrV2URL + '/AlertInfo',
    //取得即時通阻事件資料
    News: thsrV2URL + '/News',
    //取得高鐵最新消息資料
    Shape: thsrV2URL + '/Shape/',
    //取得指定營運業者之軌道路網實體路線圖資資料
    StationExit: thsrV2URL + '/StationExit/',
    //取得車站基本資料
    //以下為帶有變數的 API
    ODFareFromTo: thsrV2URL + '/ODFare/{OriginStationID}/to/{DestinationStationID}',
    //取得指定[起訖站間]之票價資料
    GeneralTimetable_TrainNo: thsrV2URL + '/GeneralTimetable/TrainNo/{TrainNo}',
    //取得指定[車次]的定期時刻表資料
    DailyTrainInfo_Today_TrainNo: thsrV2URL + '/DailyTrainInfo/Today/TrainNo/{TrainNo}',
    //取得當天指定[車次]的車次資料
    DailyTrainInfo_TrainNo_TrainDate: thsrV2URL + '/DailyTrainInfo/TrainNo/{TrainNo}/TrainDate/{TrainDate}',
    //取得指定[日期]與[車次]的車次資料
    DailyTimetable_Today_TrainNo: thsrV2URL + '/DailyTimetable/Today/TrainNo/{TrainNo}',
    //取得當天指定[車次]的時刻表資料
    DailyTimetable_TrainDate_TrainDate: thsrV2URL + '/DailyTimetable/TrainDate/{TrainDate}',
    //取得指定[日期]所有車次的時刻表資料
    DailyTimetable_TrainNo_TrainDate: thsrV2URL + '/DailyTimetable/TrainNo/{TrainNo}/TrainDate/{TrainDate}',
    //取得指定[日期],[車次]的時刻表資料
    DailyTimetable_Station_TrainDate: thsrV2URL + '/DailyTimetable/Station/{StationID}/{TrainDate}',
    //取得指定[日期],[車站]的站別時刻表資料
    DailyTimetable_OD_TrainDate: thsrV2URL + '/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',
    //取得指定[日期],[起迄站間]之站間時刻表資料
    AvailableSeatStatusList: thsrV2URL + '/AvailableSeatStatusList/{StationID}' //取得動態指定[車站]的對號座剩餘座位資訊看板資料

  };
  var vars = {
    queryCount: 10000,
    format: 'JSON'
  };
  var getPTX$1 = ptx.getPromiseURL;

  function setDefaultCfg$1() {
    var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (typeof cfg == 'string') cfg = {
      paramDirectlyUse: cfg
    }; //若傳入的為字串代表直接用於最後的參數不需再調整

    cfg.cbFn = cfg.cbFn || function (data, e) {};

    cfg.top = cfg.top || vars.queryCount;
    cfg.format = vars.format;
    return cfg;
  }

  function processCfg$1(cfg) {
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

  function useStationID2filterBy(StationID) {
    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    cfg.filterBy = cfg.filterBy || '';
    cfg.filterBy += ptx.filterParam('StationID', '==', StationID);
    return cfg;
  }

  var thsr = {
    companyTag: 'THSR',
    vars: vars
  };
  thsr.v2 = {
    urls: v2urls,
    getStationOfLine: function getStationOfLine() {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg.orderBy = 'StationID';
      cfg.orderDir = 'ASC';
      return thsr.v2._Station(cfg);
    },
    getStation: function getStation(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useStationID2filterBy(StationID, cfg);
      return thsr.v2._Station(cfg);
    },
    getStationFare: function getStationFare(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg.filterBy = cfg.filterBy || '';
      cfg.filterBy += TT.ptx.filterParam('OriginStationID', '==', StationID);
      return thsr.v2._ODFare(cfg);
    },
    getStationTodayTimeTable: function getStationTodayTimeTable(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var date = new Date();
      var dateStr = date.getFullYear() + '-' + CM.appendNumber0(date.getMonth() + 1) + '-' + CM.appendNumber0(date.getDate());
      return thsr.v2._DailyTimetable_Station_TrainDate(StationID, dateStr, cfg);
    } //產生整包抓取 Function

  };
  var catchV2Data = {
    config: {
      Line_callback: function Line_callback(json) {
        //通用預處理
        return json;
      },
      Line_callback_final: function Line_callback_final(json) {
        //私用預處理
        return json;
      }
    },
    getDataXStationData: function getDataXStationData(StationID) {
      var rt = ptx.datax['thsr'].station.find(function (c) {
        return !!(c.StationID == StationID);
      });

      if (rt) {
        var dt = ptx.data.thsr.station_ary.find(function (c) {
          return !!(c.id == StationID);
        });

        for (var k in dt) {
          if (k == 'id') {
            rt['ttid'] = 'thsr_' + dt[k];
          } else if (!rt[k]) {
            rt[k] = dt[k];
          } else {
            rt['data_' + k] = dt[k];
          }
        }
      }

      return rt;
    },
    getDataXStationName: function getDataXStationName(StationID, isEn) {
      var st = catchV2Data.getDataXStationData(StationID);
      return isEn ? st.ename : st.name;
    },
    GeneralTimetable: function GeneralTimetable(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //定期時刻表抓法  1.執行 thsr._GeneralTimetable

      progressFn('取得時刻中');

      var atTime = thsr.v2._GeneralTimetable().then(function (res) {
        return res.data.map(function (c) {
          c.GeneralTimetable.UpdateTime = c.UpdateTime;
          c.GeneralTimetable.VersionID = c.VersionID;
          return c.GeneralTimetable;
        });
      }).catch(function (res) {
        return res;
      });

      return atTime;
    },
    Station: function Station(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
      progressFn('取得車站中');
      return thsr.v2._Station().then(function (res) {
        return res.data.map(function (c) {
          return {
            StationID: c.StationID,
            lat: c.StationPosition.PositionLat,
            lon: c.StationPosition.PositionLon,
            name: c.StationName.Zh_tw,
            ename: c.StationName.En
          };
        });
      }).catch(function (res) {
        return res;
      });
    },
    SimpleTimetable: function SimpleTimetable(progressFn) {
      return catchV2Data.GeneralTimetable(progressFn).then(function (json) {
        json.forEach(function (data, didx) {
          var weekStr = [data.ServiceDay.Sunday, data.ServiceDay.Monday, data.ServiceDay.Tuesday, data.ServiceDay.Wednesday, data.ServiceDay.Thursday, data.ServiceDay.Friday, data.ServiceDay.Saturday].map(function (day, idx) {
            return day ? idx.toString() : '';
          }).join('');
          data.weekStr = weekStr;
          delete data.ServiceDay;
          data.StopTimes.sort(function (a, b) {
            return a.StopSequence > b.StopSequence ? 1 : -1;
          });
          data.stopTime = data.StopTimes.map(function (c) {
            return {
              Arr: c.ArrivalTime,
              Dep: c.DepartureTime,
              ID: c.StationID,
              name: c.StationName.Zh_tw
            };
          });
          delete data.StopTimes;
          data.info = {};
          var deleteKey = ['EndingStationName', 'StartingStationName'];

          for (var k in data.GeneralTrainInfo) {
            if (deleteKey.indexOf(k) == -1) {
              data.info[k] = data.GeneralTrainInfo[k];
            }
          }

          delete data.GeneralTrainInfo;

          if (didx > 0) {
            delete data.UpdateTime;
            delete data.VersionID;
          }
        });
        return json;
      });
    }
  };
  thsr.v2.catchData = catchV2Data; //自動產生 Function

  function makePTXV2_func(cmd, cfg) {
    cfg = setDefaultCfg$1(cfg);
    var param = processCfg$1(cfg);
    return getPTX$1(v2urls[cmd] + param, cfg);
  }

  var aryMakeV2Function = Object.keys(v2urls);
  var ptxAutoTHSRV2FunctionKey = [];
  aryMakeV2Function.forEach(function (fn) {
    if (!/\{/.test(v2urls[fn])) {
      //排除要傳參數組 URL 的
      thsr.v2['_' + fn] = function (cfg) {
        return makePTXV2_func(fn, cfg);
      };

      ptxAutoTHSRV2FunctionKey.push('_' + fn);
    } else {
      //處理有動態參數的
      var urlAry = v2urls[fn].split('/');
      var paramCount = 0;
      var paramAry = [];
      urlAry.forEach(function (c) {
        if (/^\{/.test(c)) {
          paramCount++;
          paramAry.push(c);
        }
      });

      thsr.v2['_' + fn] = function () {
        var ptr = 0;
        var arg = arguments;
        if (arg.length < paramCount) throw 'Lose parameter, need ' + paramAry.join();
        var url = urlAry.map(function (c) {
          if (/^\{/.test(c)) {
            c = arg[ptr];
            ptr++;
          }

          return c;
        }).join('/');
        var cfg = arguments[paramCount];
        cfg = setDefaultCfg$1(cfg);
        var param = processCfg$1(cfg);
        return getPTX$1(url + param, cfg);
      };
    }
  });
  thsr.v2.ptxAutoTHSRFunctionKey = ptxAutoTHSRV2FunctionKey;
  thsr.v2.getFromToFare = thsr.v2._ODFareFromTo; //alias

  function getMRTStationIDInWhatLine(StatioinID) {
    if (/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)) {
      return StatioinID.substr(0, 1);
    } else if (/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)) {
      return StatioinID.substr(0, 2);
    }
  } //====================== ID 轉換 ==============================


  function findData(ary, col, val) {
    for (var i = 0; i < ary.length; i++) {
      var colData = ary[i][col];

      if (colData == val) {
        return ary[i];
      } else if (_typeof(colData) == 'object' && colData.length && colData.indexOf(val) >= 0) {
        return ary[i];
      }
    }

    return false;
  }

  function idTrans(objS) {
    //objS.value 原始值放到 objS.from
    //objS.Line 如果有多個 StationID 對應到一組 id 時用 Line 區別 
    objS.returnType = objS.returnType || 'string'; //"string":只給對應 id。"data":給整個車站的 data obj。預設為 string

    objS.fromType = objS.fromType || 'id'; //原來的車站 ID 格式，對應到 data 內的欄位名稱做搜尋匹配

    objS.toType = objS.toType || 'id'; //轉換規則，對應到 data 內的欄位名稱給值，若 returnType 為 data 就不看了

    if (objS.value.indexOf('_') > 0 && !objS.company) {
      objS.company = objS.value.split('_')[0];
    }

    if (!objS.company) return false;
    objS.from = objS.value; // if(/^tra/.test(objS.company) && objS.value.indexOf('_') > 0){ objS.from = objS.value.split('_')[1]; }

    var stationAry = [],
        stData = {},
        tmpA = false,
        rt = false;

    switch (objS.company) {
      case 'tra':
        stationAry = pData.tra.station_ary;
        stData = findData(stationAry, objS.fromType, objS.from);

        if (stData) {
          if (objS.returnType == 'string') {
            rt = stData[objS.toType];
          } else {
            rt = stData;
          }
        }

        break;

      case 'trtc':
        stationAry = pData.trtc.station_ary;
        stData = findData(stationAry, objS.fromType, objS.from);

        if (stData) {
          if (objS.returnType == 'string') {
            tmpA = stData[objS.toType];

            if (_typeof(tmpA) == 'object' && tmpA.length && objS.LineID) {
              if (/^trtc/.test(objS.LineID)) {
                objS.LineID = findData(pData.trtc.line, 'id', objS.LineID)['LineID']; //如果給的是 rocptx 的路線 id 則於此處交換為 PTX 上操作 TRTC 的 LineID
              }

              var testReg = new RegExp('^' + objS.LineID + '[0-9]', 'i');
              var returnValue = tmpA.find(function (k) {
                return testReg.test(k);
              });
              rt = returnValue;
            } else {
              rt = stData[objS.toType];
            }
          } else {
            rt = stData;
          }
        }

        break;

      case 'tymetro':
        stationAry = pData.tymetro.station_ary;
        stData = findData(stationAry, objS.fromType, objS.from);

        if (stData) {
          if (objS.returnType == 'string') {
            tmpA = stData[objS.toType];

            if (_typeof(tmpA) == 'object' && tmpA.length && objS.LineID) {
              if (/^tymetro/.test(objS.LineID)) {
                objS.LineID = findData(pData.tymetro.line, 'id', objS.LineID)['LineID']; //如果給的是 rocptx 的路線 id 則於此處交換為 PTX 上操作 TYMetro 的 LineID
              }

              var testReg = new RegExp('^' + objS.LineID + '[0-9]', 'i');
              var returnValue = tmpA.find(function (k) {
                return testReg.test(k);
              });
              rt = returnValue;
            } else {
              rt = stData[objS.toType];
            }
          } else {
            rt = stData;
          }
        }

        break;
    }

    return rt;
  }

  function mrtLineTrans(objS) {
    //objS.value 原始值放到 objS.from
    objS.returnType = objS.returnType || 'string'; //"string":只給對應 id。"data":給整個車站的 data obj。預設為 string

    objS.fromType = objS.fromType || 'id'; //原來的車站 ID 格式，對應到 data 內的欄位名稱做搜尋匹配

    objS.toType = objS.toType || 'LineID'; //轉換規則，對應到 data 內的欄位名稱給值，若 returnType 為 data 就不看了

    if (!objS.company || !objS.value) return false;
    var lineAry = [],
        lineData = {},
        rt = false;

    switch (objS.company) {
      case "trtc":
        lineAry = pData.trtc.line;
        lineData = findData(lineAry, objS.fromType, objS.value);

        if (lineData) {
          rt = objS.returnType == 'string' ? lineData[objS.toType] : lineData;
        }

        break;

      case "tymetro":
        lineAry = pData.tymetro.line;
        lineData = findData(lineAry, objS.fromType, objS.value);

        if (lineData) {
          rt = objS.returnType == 'string' ? lineData[objS.toType] : lineData;
        }

        break;
    }

    return rt;
  }

  var thsr$1 = {
    getPTXV2: function getPTXV2(id) {
      return id.replace('thsr_', '');
    },
    getRPIDbyPTXV2: function getRPIDbyPTXV2(id) {
      return 'thsr_' + id;
    }
  };
  var tra = {
    getPTXV2: function getPTXV2(id) {
      if (id) id = id.replace(/^tra_/, '');
      return id;
    },
    getPTXV3: function getPTXV3(id) {
      if (!/^tra_/.test(id)) id = 'tra_' + id;
      return idTrans({
        company: 'tra',
        value: id,
        toType: 'v3id'
      });
    },
    getPTXV3byV2: function getPTXV3byV2(id) {
      id = 'tra_' + id;
      return idTrans({
        company: 'tra',
        value: id,
        toType: 'v3id'
      });
    },
    getPTXV2byV3: function getPTXV2byV3(id) {
      return this.getPTXV2(idTrans({
        company: 'tra',
        value: id.toString(),
        fromType: 'v3id',
        toType: 'id'
      }));
    },
    getRPIDbyPTXV2: function getRPIDbyPTXV2(id) {
      //rocptx station id
      return 'tra_' + id;
    },
    getRPIDbyPTXV3: function getRPIDbyPTXV3(id) {
      return idTrans({
        company: 'tra',
        value: id.toString(),
        fromType: 'v3id',
        toType: 'id'
      });
    }
  };
  var trtc = {
    getPTXV2: function getPTXV2(id, line) {
      var param = {
        company: 'trtc',
        value: id,
        fromType: 'id',
        toType: 'StationID'
      };

      if (line) {
        param.LineID = line;
      }

      return idTrans(param);
    },
    getRPIDbyPTXV2: function getRPIDbyPTXV2(id) {
      return idTrans({
        company: 'trtc',
        value: id,
        fromType: 'StationID',
        toType: 'id'
      });
    },
    getLINE_LineIDbyRPID: function getLINE_LineIDbyRPID(id) {
      return mrtLineTrans({
        company: 'trtc',
        value: id,
        fromType: 'id',
        toType: 'LineID'
      });
    },
    getLINE_RPIDbyLineID: function getLINE_RPIDbyLineID(id) {
      return mrtLineTrans({
        company: 'trtc',
        value: id,
        fromType: 'LineID',
        toType: 'id'
      });
    }
  };
  var tymetro = {
    getPTXV2: function getPTXV2(id, line) {
      var param = {
        company: 'tymetro',
        value: id,
        fromType: 'id',
        toType: 'StationID'
      };

      if (line) {
        param.LineID = line;
      }

      return idTrans(param);
    },
    getRPIDbyPTXV2: function getRPIDbyPTXV2(id) {
      return idTrans({
        company: 'tymetro',
        value: id,
        fromType: 'StationID',
        toType: 'id'
      });
    },
    getLINE_LineIDbyRPID: function getLINE_LineIDbyRPID(id) {
      return mrtLineTrans({
        company: 'tymetro',
        value: id,
        fromType: 'id',
        toType: 'LineID'
      });
    },
    getLINE_RPIDbyLineID: function getLINE_RPIDbyLineID(id) {
      return mrtLineTrans({
        company: 'tymetro',
        value: id,
        fromType: 'LineID',
        toType: 'id'
      });
    }
  };
  var id = {
    idTrans: idTrans,
    mrtLineTrans: mrtLineTrans,
    thsr: thsr$1,
    tra: tra,
    trtc: trtc,
    tymetro: tymetro,
    getMRTStationIDInWhatLine: getMRTStationIDInWhatLine
  };

  var traURL$1 = CM.traURL;
  var traV3URL = CM.traV3URL;
  var urls$1 = {
    Network: traURL$1 + '/Network',
    //取得臺鐵路網資料
    Line: traURL$1 + '/Line/',
    //取得路線基本資料
    Station: traURL$1 + '/Station/',
    //取得車站基本資料
    StationOfLine: traURL$1 + '/StationOfLine/',
    //取得路線車站基本資料
    TrainType: traURL$1 + '/TrainType',
    //取得所有列車車種資料
    ODFare: traURL$1 + '/ODFare/',
    //取得票價資料
    Shape: traURL$1 + '/Shape/',
    //取得指定營運業者之軌道路網實體路線圖資資料
    GeneralTrainInfo: traURL$1 + '/GeneralTrainInfo/',
    //取得所有車次的定期車次資料
    GeneralTimetable: traURL$1 + '/GeneralTimetable/',
    //取得所有車次的定期時刻表資料
    DailyTrainInfo_Today: traURL$1 + '/DailyTrainInfo/Today/',
    //取得當天所有車次的車次資料
    DailyTimetable_Today: traURL$1 + '/DailyTimetable/Today/',
    //取得當天所有車次的時刻表資料
    LiveBoard: traURL$1 + '/LiveBoard/',
    //取得車站別列車即時到離站電子看板
    LiveTrainDelay: traURL$1 + '/LiveTrainDelay/',
    //取得列車即時準點/延誤時間資料
    //以下為帶有變數的 API
    ODFareFromTo: traURL$1 + '/ODFare/{OriginStationID}/to/{DestinationStationID}',
    //取得指定[起訖站間]之票價資料
    GeneralTrainInfo_TrainNo: traURL$1 + '/GeneralTrainInfo/TrainNo/{TrainNo}',
    //取得指定[車次]的定期車次資料
    GeneralTimetable_TrainNo: traURL$1 + '/GeneralTimetable/TrainNo/{TrainNo}',
    //取得指定[車次]的定期時刻表資料
    DailyTrainInfo_Today_TrainNo: traURL$1 + '/DailyTrainInfo/Today/TrainNo/{TrainNo}',
    //取得當天指定[車次]的車次資料
    DailyTrainInfo_TrainDate: traURL$1 + '/DailyTrainInfo/TrainDate/{TrainDate}',
    //取得指定[日期]所有車次的車次資料 yyyy-MM-dd
    DailyTrainInfo_TrainNo_TrainDate: traURL$1 + '/DailyTrainInfo/TrainNo/{TrainNo}/TrainDate/{TrainDate}',
    //取得指定[日期]與[車次]的車次資料
    DailyTimetable_Today_TrainNo: traURL$1 + '/DailyTimetable/Today/TrainNo/{TrainNo}',
    //取得當天指定[車次]的時刻表資料
    DailyTimetable_TrainDate_TrainNo: traURL$1 + '/DailyTimetable/TrainDate/{TrainDate}',
    //取得指定[日期]所有車次的時刻表資料
    DailyTimetable_TrainNo_TrainDate: traURL$1 + '/DailyTimetable/TrainNo/{TrainNo}/TrainDate/{TrainDate}',
    //取得指定[日期],[車次]的時刻表資料
    DailyTimetable_Station_TrainDate: traURL$1 + '/DailyTimetable/Station/{StationID}/{TrainDate}',
    //取得指定[日期],[車站]的站別時刻表資料
    DailyTimetable_OD_TrainDate: traURL$1 + '/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',
    //取得指定[日期],[起迄站間]之站間時刻表資料
    LiveBoard_Station: traURL$1 + '/LiveBoard/Station/{StationID}' //取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)

  };
  var v3urls = {
    Network: traV3URL + '/Network',
    //取得臺鐵路網資料
    Station: traV3URL + '/Station/',
    //取得車站基本資料
    StationExit: traV3URL + '/StationExit/',
    //取得車站出入口資料
    StationFacility: traV3URL + '/StationFacility/',
    //取得車站設施資料
    Line: traV3URL + '/Line/',
    //取得路線基本資料
    StationOfLine: traV3URL + '/StationOfLine/',
    //取得路線車站基本資料
    TrainType: traV3URL + '/TrainType',
    //取得所有列車車種資料
    //ODFare: traURL + '/ODFare/', //取得票價資料 , v3 已移除
    //Shape: traURL + '/Shape/', //取得指定營運業者之軌道路網實體路線圖資資料 , v3 已移除
    //GeneralTrainInfo: traURL + '/GeneralTrainInfo/', //取得所有車次的定期車次資料 , v3 已移除
    GeneralTrainTimetable: traV3URL + '/GeneralTrainTimetable/',
    //取得所有車次的定期時刻表資料
    GeneralStationTimetable: traV3URL + '/GeneralStationTimetable',
    //取得各站的定期站別時刻表資料
    SpecificTrainTimetable: traV3URL + '/SpecificTrainTimetable',
    //取得所有特殊車次時刻表資料
    DailyTrainTimetable_Today: traV3URL + '/DailyTrainTimetable/Today/',
    //取得當天車次時刻表資料
    DailyStationTimetable_Today: traV3URL + '/DailyStationTimetable/Today/',
    //取得當天各站站別時刻表資料
    StationLiveBoard: traV3URL + '/StationLiveBoard/',
    //取得列車即時到離站資料
    TrainLiveBoard: traV3URL + '/TrainLiveBoard/',
    //取得列車即時位置動態資料
    LineTransfer: traV3URL + '/LineTransfer/',
    //取得內部路線轉乘資料
    StationTransfer: traV3URL + '/StationTransfer/',
    //取得車站跨運具轉乘資訊
    News: traV3URL + '/News/',
    //取得最新消息
    Alert: traV3URL + '/Alert/',
    //取得營運通阻資料
    //以下為帶有變數的 API
    ODFareFromTo: traV3URL + '/ODFare/{OriginStationID}/to/{DestinationStationID}',
    //取得指定[起訖站間]之票價資料
    GeneralTimetable_TrainNo: traV3URL + '/GeneralTimetable/TrainNo/{TrainNo}',
    //取得指定[車次]的定期時刻表資料
    GeneralStationTimetable_Station: traV3URL + '/GeneralStationTimetable/Station/{StationID}',
    //取得指定[車站]的定期站別時刻表資料
    SpecificTrainTimetable_TrainNo: traV3URL + '/SpecificTrainTimetable/TrainNo/{TrainNo}',
    //取得指定[車次]的特殊車次時刻表資料
    DailyTrainTimetable_Today_TrainNo: traV3URL + '/DailyTrainTimetable/Today/TrainNo/{TrainNo}',
    //取得當天指定[車次]的時刻表資料
    DailyTrainTimetable_TrainDate: traV3URL + '/DailyTrainTimetable/TrainDate/{TrainDate}',
    //取得指定[日期]所有車次的時刻表資料(台鐵提供近60天每日時刻表)
    DailyStationTimetable_Today_Station: traV3URL + '/DailyStationTimetable/Today/Station/{StationID}',
    //取得當天指定[車站]的時刻表資料
    DailyStationTimetable_TrainDate: traV3URL + '/DailyStationTimetable/TrainDate/{TrainDate}',
    //取得各站每日站別時刻表資料 yyyy-MM-dd
    StationLiveBoard_Station: traV3URL + '/StationLiveBoard/Station/{StationID}',
    //取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)
    TrainLiveBoard_TrainNo: traV3URL + '/TrainLiveBoard/TrainNo/{TrainNo}' //取得指定[車次]的列車即時位置動態資料

  };
  var vars$1 = {
    queryCount: 10000,
    format: 'JSON'
  };
  var getPTX$2 = ptx.getPromiseURL;

  function setDefaultCfg$2() {
    var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (typeof cfg == 'string') cfg = {
      paramDirectlyUse: cfg
    }; //若傳入的為字串代表直接用於最後的參數不需再調整

    cfg.cbFn = cfg.cbFn || function (data, e) {};

    cfg.top = cfg.top || vars$1.queryCount;
    cfg.format = vars$1.format;
    return cfg;
  }

  function processCfg$2(cfg) {
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

  function useLineID2filterBy(LineID) {
    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    cfg.filterBy = cfg.filterBy || '';
    cfg.filterBy += ptx.filterParam('LineID', '==', LineID);
    return cfg;
  }

  function useStationID2filterBy$1(StationID) {
    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    cfg.filterBy = cfg.filterBy || '';
    cfg.filterBy += ptx.filterParam('StationID', '==', StationID);
    return cfg;
  }

  var tra$1 = {
    companyTag: 'TRA',
    urls: urls$1,
    vars: vars$1,
    getStationOfLine: function getStationOfLine(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return tra$1._StationOfLine(cfg);
    },
    getStation: function getStation(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useStationID2filterBy$1(StationID, cfg);
      return tra$1._Station(cfg);
    },
    getStationFare: function getStationFare(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg.filterBy = cfg.filterBy || '';
      cfg.filterBy += TT.ptx.filterParam('OriginStationID', '==', StationID);
      return tra$1._ODFare(cfg);
    },
    getStationTodayTimeTable: function getStationTodayTimeTable(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var date = new Date();
      var dateStr = date.getFullYear() + '-' + CM.appendNumber0(date.getMonth() + 1) + '-' + CM.appendNumber0(date.getDate());
      return tra$1._DailyTimetable_Station_TrainDate(StationID, dateStr, cfg);
    } //產生整包抓取 Function

  };
  var catchData$1 = {
    config: {
      Line_callback: function Line_callback(json) {
        //通用預處理
        return json;
      },
      Line_callback_final: function Line_callback_final(json) {
        //私用預處理
        return json;
      }
    },
    getDataXLineObj: function getDataXLineObj(LineID) {
      var rt = ptx.datax['tra'].line.find(function (c) {
        return !!(c.LineID == LineID);
      });

      if (rt) {
        var dt = ptx.data.tra.line.find(function (c) {
          return !!(c.LineID == LineID);
        });

        for (var k in dt) {
          if (!rt[k]) {
            rt[k] = dt[k];
          } else {
            rt['data_' + k] = dt[k];
          }
        }
      }

      return rt;
    },
    getDataXStationData: function getDataXStationData(StationID) {
      var rt = ptx.datax['tra'].station.find(function (c) {
        return !!(c.StationID == StationID);
      });

      if (rt) {
        var dt = ptx.data.tra.station_ary.find(function (c) {
          return !!(id.tra.getPTXV2(c.id) == StationID);
        });

        for (var k in dt) {
          if (k == 'id') {
            rt['id'] = dt[k];
          } else if (!rt[k]) {
            rt[k] = dt[k];
          } else {
            rt['data_' + k] = dt[k];
          }
        }
      }

      return rt;
    },
    getDataXTrain: function getDataXTrain(id) {
      var rt = ptx.datax['tra'].train.find(function (c) {
        return !!(c.TrainTypeID == id);
      });

      if (rt) {
        var dt = ptx.data.tra["CarClass"].find(function (c) {
          return !!(c.id == id);
        });

        for (var k in dt) {
          if (!rt[k]) {
            rt[k] = dt[k];
          } else {
            rt['data_' + k] = dt[k];
          }
        }
      }

      return rt;
    },
    getDataXStationName: function getDataXStationName(StationID, isEn) {
      var st = catchData$1.getDataXStationData(StationID);
      return isEn ? st.ename : st.name;
    },
    Line: function Line(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
      progressFn('取得路線中');

      var atLine = tra$1._StationOfLine().then(function (res) {
        return res.data;
      }).catch(function (res) {
        return res;
      });

      return atLine;
    },
    GeneralTimetable: function GeneralTimetable(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //定期時刻表抓法  1.執行 tra._GeneralTimetable

      progressFn('取得時刻中');

      var atTime = tra$1._GeneralTimetable().then(function (res) {
        return res.data.map(function (c) {
          c.GeneralTimetable.UpdateTime = c.UpdateTime;
          c.GeneralTimetable.VersionID = c.VersionID;
          return c.GeneralTimetable;
        });
      }).catch(function (res) {
        return res;
      });

      return atTime;
    },
    Station: function Station(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
      progressFn('取得車站中');
      return tra$1._Station().then(function (res) {
        return res.data.map(function (c) {
          return {
            StationID: c.StationID,
            lat: c.StationPosition.PositionLat,
            lon: c.StationPosition.PositionLon,
            name: c.StationName.Zh_tw,
            ename: c.StationName.En
          };
        });
      }).catch(function (res) {
        return res;
      });
    },
    TrainType: function TrainType(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
      progressFn('取得車種中');
      return tra$1._TrainType().then(function (res) {
        return res.data.map(function (c) {
          var nameAry = c.TrainTypeName.Zh_tw.split('(');
          if (nameAry[1]) nameAry[1] = nameAry[1].replace(')', '');
          return {
            TrainTypeID: c.TrainTypeID,
            TrainTypeCode: c.TrainTypeCode,
            note: nameAry[1] || '',
            name: nameAry[0],
            ename: c.TrainTypeName.En
          };
        });
      }).catch(function (res) {
        return res;
      });
    },
    SimpleLine: function SimpleLine(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //區分要抓的 line 在資料中是順時針或逆時針方向

      var recordLineDir0 = ['CZ', 'YL', 'NL', 'TT', 'PX', 'NW', 'LJ'];
      var recordLineDir1 = ['TL-N', 'TL-M', 'TL-C', 'TL-S', 'PL', 'SL', 'SA', 'JJ', 'SH'];
      var lineCfg = {
        filterBy: ptx.filterParam('LineID', '==', recordLineDir0.concat(recordLineDir1), 'or')
      };
      progressFn('取得路線中');

      var atLine = tra$1._StationOfLine(lineCfg).then(function (res) {
        return res.data.map(function (c) {
          var stAry = c.Stations.sort(function (a, b) {
            return a.Sequence > b.Sequence ? 1 : -1;
          }).map(function (st) {
            return {
              name: st.StationName,
              ID: st.StationID,
              TD: st.TraveledDistance
            };
          });
          return {
            dir: recordLineDir0.indexOf(c.LineID) != -1 ? 0 : 1,
            LineID: c.LineID,
            station: stAry
          };
        });
      }).catch(function (res) {
        return res;
      });

      return atLine;
    },
    SimpleTimetable: function SimpleTimetable(progressFn) {
      return catchData$1.GeneralTimetable(progressFn).then(function (json) {
        json.forEach(function (data, didx) {
          var weekStr = [data.ServiceDay.Sunday, data.ServiceDay.Monday, data.ServiceDay.Tuesday, data.ServiceDay.Wednesday, data.ServiceDay.Thursday, data.ServiceDay.Friday, data.ServiceDay.Saturday].map(function (day, idx) {
            return day ? idx.toString() : '';
          }).join('');
          data.weekStr = weekStr;
          delete data.ServiceDay;
          data.StopTimes.sort(function (a, b) {
            return a.StopSequence > b.StopSequence ? 1 : -1;
          });
          data.stopTime = data.StopTimes.map(function (c) {
            return {
              Arr: c.ArrivalTime,
              Dep: c.DepartureTime,
              ID: c.StationID,
              name: c.StationName.Zh_tw
            };
          });
          delete data.StopTimes;
          data.info = {};
          var deleteKey = ['EndingStationName', 'StartingStationName', 'TrainTypeName'];

          for (var k in data.GeneralTrainInfo) {
            if (deleteKey.indexOf(k) == -1) {
              data.info[k] = data.GeneralTrainInfo[k];
            }
          }

          delete data.GeneralTrainInfo;

          if (didx > 0) {
            delete data.UpdateTime;
            delete data.VersionID;
          }
        });
        return json;
      });
    }
  };
  tra$1.catchData = catchData$1; //自動產生 Function

  function makePTX_func$1(cmd, cfg) {
    cfg = setDefaultCfg$2(cfg);
    var param = processCfg$2(cfg);
    return getPTX$2(urls$1[cmd] + param, cfg);
  }

  var aryMakeFunction$1 = Object.keys(urls$1);
  var ptxAutoTRAFunctionKey = [];
  aryMakeFunction$1.forEach(function (fn) {
    if (!/\{/.test(urls$1[fn])) {
      //排除要傳參數組 URL 的
      tra$1['_' + fn] = function (cfg) {
        return makePTX_func$1(fn, cfg);
      };

      ptxAutoTRAFunctionKey.push('_' + fn);
    } else {
      //處理有動態參數的
      var urlAry = urls$1[fn].split('/');
      var paramCount = 0;
      var paramAry = [];
      urlAry.forEach(function (c) {
        if (/^\{/.test(c)) {
          paramCount++;
          paramAry.push(c);
        }
      });

      tra$1['_' + fn] = function () {
        var ptr = 0;
        var arg = arguments;
        if (arg.length < paramCount) throw 'Lose parameter, need ' + paramAry.join();
        var url = urlAry.map(function (c) {
          if (/^\{/.test(c)) {
            c = arg[ptr];
            ptr++;
          }

          return c;
        }).join('/');
        var cfg = arguments[paramCount];
        cfg = setDefaultCfg$2(cfg);
        var param = processCfg$2(cfg);
        return getPTX$2(url + param, cfg);
      };
    }
  });
  tra$1.ptxAutoTRAFunctionKey = ptxAutoTRAFunctionKey;
  tra$1.getStationLiveBoard = tra$1._LiveBoard_Station; //alias

  tra$1.getFromToFare = tra$1._ODFareFromTo; //alias
  //====================== TRA V3 Function 產生至 tra.v3 之下 ==============================

  tra$1.v2Sv3 = function (StationID) {
    //輸入 v2 StationID 輸出 v3 id
    return id.tra.getPTXV3byV2(StationID);
  };

  tra$1.v3Sv2 = function (StationID) {
    //輸入 v3 StationID 輸出 v2 id
    return id.tra.getPTXV2byV3(StationID);
  }; //自動產生 V3 Function


  tra$1.v3 = {
    urls: v3urls,
    getStationOfLine: function getStationOfLine(LineID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useLineID2filterBy(LineID, cfg);
      return tra$1.v3._StationOfLine(cfg);
    },
    getStation: function getStation(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      cfg = useStationID2filterBy$1(StationID, cfg);
      return tra$1.v3._Station(cfg);
    },
    getStationTodayTimeTable: function getStationTodayTimeTable(StationID) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return tra$1.v3._DailyStationTimetable_Today_Station(StationID, cfg);
    }
  }; //產生整包抓取 Function

  var catchV3Data = {
    config: {
      Line_callback: function Line_callback(json) {
        //通用預處理
        return json;
      },
      Line_callback_final: function Line_callback_final(json) {
        //私用預處理
        return json;
      }
    },
    getDataXLineObj: function getDataXLineObj(LineID) {
      var rt = ptx.datax['trav3'].line.find(function (c) {
        return !!(c.LineID == LineID);
      });

      if (rt) {
        var dt = ptx.data.tra.line.find(function (c) {
          return !!(c.LineID == LineID);
        });

        for (var k in dt) {
          if (!rt[k]) {
            rt[k] = dt[k];
          } else {
            rt['data_' + k] = dt[k];
          }
        }
      }

      return rt;
    },
    getDataXStationData: function getDataXStationData(StationID) {
      return catchData$1.getDataXStationData(id.tra.getPTXV2byV3(StationID)); // var rt = ptx.datax['trav3'].station.find((c)=>{return !!(c.StationID==StationID)})
      // if(rt){
      //     var dt = ptx.data.tra.station_ary.find(c=> !!(c.v3id==StationID))
      //     for(var k in dt){
      //         if(k=='id'){
      //             rt['id'] = dt[k];
      //         }else if(!rt[k]){
      //             rt[k] = dt[k];
      //         }else{
      //             rt['data_' + k] = dt[k];
      //         }
      //     }
      // }
      // return rt;
    },
    getDataXTrain: function getDataXTrain(id) {
      return catchData$1.getDataXTrain(id); // var rt = ptx.datax['trav3'].train.find((c)=>{return !!(c.TrainTypeID==id)})
      // if(rt){
      //     var dt = ptx.data.tra["CarClass"].find(c=> !!(c.id==id))
      //     for(var k in dt){
      //         if(!rt[k]){
      //             rt[k] = dt[k];
      //         }else{
      //             rt['data_' + k] = dt[k];
      //         }
      //     }
      // }
      // return rt;
    },
    getDataXStationName: function getDataXStationName(StationID, isEn) {
      var st = catchV3Data.getDataXStationData(StationID);
      return isEn ? st.ename : st.name;
    },
    Line: function Line(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
      progressFn('取得路線中');

      var atLine = tra$1.v3._StationOfLine().then(function (res) {
        return res.data.StationOfLines;
      }).catch(function (res) {
        return res;
      });

      return atLine;
    },
    GeneralTrainTimetable: function GeneralTrainTimetable(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //定期時刻表抓法  1.執行 tra.v3._GeneralTrainTimetable

      progressFn('取得時刻中');

      var atTime = tra$1.v3._GeneralTrainTimetable().then(function (res) {
        return res.data.TrainTimetables;
      }).catch(function (res) {
        return res;
      });

      return atTime;
    },
    Station: function Station(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
      progressFn('取得車站中');
      return tra$1.v3._Station().then(function (res) {
        return res.data.Stations.map(function (c) {
          return {
            StationID: c.StationID,
            v2id: tra$1.v3Sv2(c.StationID),
            lat: c.StationPosition.PositionLat,
            lon: c.StationPosition.PositionLon,
            name: c.StationName.Zh_tw,
            ename: c.StationName.En
          };
        });
      }).catch(function (res) {
        return res;
      });
    },
    TrainType: function TrainType(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {};
      progressFn('取得車種中');
      return tra$1.v3._TrainType().then(function (res) {
        return res.data.TrainTypes.map(function (c) {
          var nameAry = c.TrainTypeName.Zh_tw.split('(');
          if (nameAry[1]) nameAry[1] = nameAry[1].replace(')', '');
          return {
            TrainTypeID: c.TrainTypeID,
            TrainTypeCode: c.TrainTypeCode,
            note: nameAry[1] || '',
            name: nameAry[0],
            ename: c.TrainTypeName.En
          };
        });
      }).catch(function (res) {
        return res;
      });
    },
    SimpleLine: function SimpleLine(progressFn) {
      if (typeof progressFn != 'function') progressFn = function progressFn(msg) {}; //區分要抓的 line 在資料中是順時針或逆時針方向

      var recordLineDir0 = ['CZ', 'EL', 'SU', 'PX', 'NW', 'LJ'];
      var recordLineDir1 = ['WL', 'WL-C', 'SL', 'SA', 'JJ', 'SH'];
      var lineCfg = {
        filterBy: ptx.filterParam('LineID', '==', recordLineDir0.concat(recordLineDir1), 'or')
      };
      progressFn('取得路線中');

      var atLine = tra$1.v3._StationOfLine(lineCfg).then(function (res) {
        return res.data.StationOfLines.map(function (c) {
          var stAry = c.Stations.sort(function (a, b) {
            return a.Sequence > b.Sequence ? 1 : -1;
          }).map(function (st) {
            return {
              name: st.StationName,
              ID: st.StationID,
              v2id: tra$1.v3Sv2(st.StationID),
              TD: st.CumulativeDistance
            };
          });
          return {
            dir: recordLineDir0.indexOf(c.LineID) != -1 ? 0 : 1,
            LineID: c.LineID,
            station: stAry
          };
        });
      }).catch(function (res) {
        return res;
      });

      return atLine;
    },
    SimpleTimetable: function SimpleTimetable(progressFn) {
      return catchV3Data.GeneralTrainTimetable(progressFn).then(function (json) {
        json.forEach(function (data, didx) {
          var weekStr = [data.ServiceDay.Sunday, data.ServiceDay.Monday, data.ServiceDay.Tuesday, data.ServiceDay.Wednesday, data.ServiceDay.Thursday, data.ServiceDay.Friday, data.ServiceDay.Saturday].map(function (day, idx) {
            return day ? idx.toString() : '';
          }).join('');
          data.weekStr = weekStr;
          delete data.ServiceDay;
          data.StopTimes.sort(function (a, b) {
            return a.StopSequence > b.StopSequence ? 1 : -1;
          });
          data.stopTime = data.StopTimes.map(function (c) {
            return {
              Arr: c.ArrivalTime,
              Dep: c.DepartureTime,
              ID: c.StationID,
              v2id: tra$1.v3Sv2(c.StationID),
              name: c.StationName.Zh_tw
            };
          });
          delete data.StopTimes;
          data.info = {};
          var deleteKey = ['EndingStationName', 'StartingStationName', 'TrainTypeName', 'TripHeadSign', 'TripLine'];

          for (var k in data.TrainInfo) {
            if (deleteKey.indexOf(k) == -1) {
              data.info[k] = data.TrainInfo[k];
            }
          }

          delete data.TrainInfo;

          if (didx > 0) {
            delete data.UpdateTime;
            delete data.VersionID;
          }
        });
        return json;
      });
    }
  };
  tra$1.v3.catchData = catchV3Data;

  function makePTXV3_func(cmd, cfg) {
    cfg = setDefaultCfg$2(cfg);
    var param = processCfg$2(cfg);
    return getPTX$2(v3urls[cmd] + param, cfg);
  }

  var aryMakeV3Function = Object.keys(v3urls);
  var ptxAutoTRAV3FunctionKey = [];
  aryMakeV3Function.forEach(function (fn) {
    if (!/\{/.test(v3urls[fn])) {
      //排除要傳參數組 URL 的
      tra$1.v3['_' + fn] = function (cfg) {
        return makePTXV3_func(fn, cfg);
      };

      ptxAutoTRAV3FunctionKey.push('_' + fn);
    } else {
      //處理有動態參數的
      var urlAry = v3urls[fn].split('/');
      var paramCount = 0;
      var paramAry = [];
      urlAry.forEach(function (c) {
        if (/^\{/.test(c)) {
          paramCount++;
          paramAry.push(c);
        }
      });

      tra$1.v3['_' + fn] = function () {
        var ptr = 0;
        var arg = arguments;
        if (arg.length < paramCount) throw 'Lose parameter, need ' + paramAry.join();
        var url = urlAry.map(function (c) {
          if (/^\{/.test(c)) {
            c = arg[ptr];
            ptr++;
          }

          return c;
        }).join('/');
        var cfg = arguments[paramCount];
        cfg = setDefaultCfg$2(cfg);
        var param = processCfg$2(cfg);
        return getPTX$2(url + param, cfg);
      };
    }
  });
  tra$1.v3.ptxAutoTRAFunctionKey = ptxAutoTRAV3FunctionKey;
  tra$1.v3.getStationLiveBoard = tra$1.v3._StationLiveBoard_Station; //alias

  tra$1.v3.getFromToFare = tra$1.v3._ODFareFromTo; //alias

  var router = {};

  // import ptx_thsr from './thsr.js';
  // import ptx_tra from './tra.js';

  var ptxFn = {
    trtc: fnMRT,
    krtc: fnMRT$1,
    tymetro: fnMRT$2 // klrt: ptx_klrt,
    // thsr: ptx_thsr,
    // tra: ptx_tra
    //=========== MRT Router Function ==========

  };

  function findMRTpDataTransStation(company, FromStationID, ToStationID) {
    var FromLineID = id.getMRTStationIDInWhatLine(FromStationID),
        ToLineID = id.getMRTStationIDInWhatLine(ToStationID);
    var transStation1 = id[company].getRPIDbyPTXV2(FromStationID),
        transLine1 = id[company].getLINE_RPIDbyLineID(FromLineID),
        transLine2 = id[company].getLINE_RPIDbyLineID(ToLineID),
        transStation2 = id[company].getRPIDbyPTXV2(ToStationID);
    var transStation = pData.transStation.find(function (c) {
      var flg = false;

      if (c.changeLine[0] == transLine1 && c.changeLine[1] == transLine2 || c.changeLine[0] == transLine2 && c.changeLine[1] == transLine1) {
        if (c.changeStation[0] == transStation1 && c.changeStation[1] == transStation2 || c.changeStation[0] == transStation2 && c.changeStation[1] == transStation1) flg = true;
      }

      return flg;
    });
    return transStation;
  }

  function blockMRTLineStation(company) {
    var mDataX = datax[company];
    if (mDataX.block) return mDataX.block;
    var aryBlock = [];
    mDataX.line.forEach(function (line) {
      var afterStation = [];
      var transferStation = line.Transfer.map(function (c) {
        return c.FromStationID;
      });
      var aryLineBlock = [];
      var LineID = line.LineID;
      var existBlock = false;
      line.Route.forEach(function (route) {
        var tmpSt = [];
        var aryRouteBlock = [];
        var cntBlockID = aryLineBlock.length + 1;

        if (route.Direction == 0) {
          route.Stations.forEach(function (st) {
            if (afterStation.indexOf(st) == -1) {
              afterStation.push(st);

              if (transferStation.indexOf(st) == -1) {
                tmpSt.push(st);
              } else {
                //Normal Station Array
                if (tmpSt.length > 0) {
                  var near = [],
                      myID = LineID + '_' + cntBlockID++;
                  if (aryRouteBlock[aryRouteBlock.length - 1]) near.push(aryRouteBlock[aryRouteBlock.length - 1].BlockID);

                  if (existBlock) {
                    near.push(existBlock.BlockID);
                    if (existBlock.near.indexOf(myID) == -1) existBlock.near.push(myID);
                    existBlock = false;
                  }

                  aryRouteBlock.push({
                    BlockID: myID,
                    LineID: LineID,
                    type: 'station',
                    station: tmpSt,
                    routes: [route.RouteID],
                    near: near
                  });
                }

                tmpSt = []; //Trans Station

                var aryTransSt = line.Transfer.filter(function (c) {
                  return !!(c.FromStationID == st);
                });
                var transSt = aryTransSt.map(function (c) {
                  var d = CM.assign({}, c);
                  d.transStation = findMRTpDataTransStation(company, c.FromStationID, c.ToStationID);
                  return d;
                });
                var near = [],
                    myID = LineID + '_' + cntBlockID++;
                if (aryRouteBlock[aryRouteBlock.length - 1]) near.push(aryRouteBlock[aryRouteBlock.length - 1].BlockID);

                if (existBlock) {
                  near.push(existBlock.BlockID);
                  if (existBlock.near.indexOf(myID) == -1) existBlock.near.push(myID);
                  existBlock = false;
                }

                var tst = {
                  BlockID: myID,
                  LineID: LineID,
                  type: 'transfer',
                  station: st,
                  transferList: transSt,
                  routes: [route.RouteID],
                  near: []
                };
                tst.toIDList = transSt.map(function (c) {
                  return c.ToStationID;
                });
                aryRouteBlock.push(tst);
              }
            } else {
              aryLineBlock.forEach(function (c) {
                if (Array.isArray(c.station)) {
                  if (c.station.indexOf(st) != -1 && c.routes.indexOf(route.RouteID) == -1) {
                    c.routes.push(route.RouteID);
                    existBlock = c;
                  }
                } else if (_typeof(c.station == 'string')) {
                  if (c.station == st && c.routes.indexOf(route.RouteID) == -1) {
                    c.routes.push(route.RouteID);
                    existBlock = c;
                  }
                }
              });
            }
          });
        }

        if (tmpSt.length > 0) {
          var near = [],
              myID = LineID + '_' + cntBlockID++;
          if (aryRouteBlock[aryRouteBlock.length - 1]) near.push(aryRouteBlock[aryRouteBlock.length - 1].BlockID);

          if (existBlock) {
            near.push(existBlock.BlockID);
            if (existBlock.near.indexOf(myID) == -1) existBlock.near.push(myID);
            existBlock = false;
          }

          aryRouteBlock.push({
            BlockID: myID,
            LineID: LineID,
            type: 'station',
            station: tmpSt,
            routes: [route.RouteID],
            near: near
          });
        } //有後一個 block 的話把它串為自己的 near，然後把它的 near 加上自己


        aryRouteBlock.forEach(function (c, idx, arr) {
          if (arr[idx + 1] && arr[idx + 1].near.indexOf(c.BlockID) == -1) arr[idx + 1].near.push(c.BlockID);
          if (arr[idx - 1] && arr[idx - 1].near.indexOf(c.BlockID) == -1) arr[idx - 1].near.push(c.BlockID);
        }); //從已經加入到 Line Block 的路線分支出去的話會有 existBlock (如大橋頭站後會有蘆洲新莊兩線)，將彼此的 near 加入對方 BlockID

        aryLineBlock = aryLineBlock.concat(aryRouteBlock); //綁定相鄰的同線 Block
        //console.info(route);
      });
      aryBlock.push(aryLineBlock);
    });
    mDataX.block = aryBlock;
    return aryBlock;
  }

  function getStationBlockByID(station) {
    var blockData = this.getBlockData();
    var aryBlock = blockData.reduce(function (c, n) {
      return c.concat(n);
    }, []);

    for (var i = 0; i < aryBlock.length; i++) {
      if (aryBlock[i].type == 'transfer' || typeof aryBlock[i].station == 'string') {
        if (aryBlock[i].station == station) return aryBlock[i];
      } else {
        if (aryBlock[i].station.indexOf(station) != -1) return aryBlock[i];
      }
    }
  }

  function getMRTThrough(from, to) {
    var me = this;
    var LineID = id.getMRTStationIDInWhatLine(from),
        ToLineID = id.getMRTStationIDInWhatLine(to);
    if (LineID != ToLineID) return false;
    var mDataX = datax[this.company];
    var line = mDataX.line.find(function (c) {
      return c.LineID == LineID;
    });
    var rt = {
      RouteID: []
    };
    line.Route.forEach(function (route) {
      var a = route.Stations.indexOf(from),
          b = route.Stations.indexOf(to);

      if (a != -1 && b != -1 && a < b) {
        rt.Direction = route.Direction;
        rt.RouteID.push(route.RouteID);
        rt.Stations = route.Stations.filter(function (st, idx) {
          return !!(idx >= a && idx <= b);
        });
        rt.travelTime = ptxFn[me.company].catchData.getDataXS2STravelTime(from, to);
      }
    });
    if (rt.RouteID.length == 0) rt = false;
    return rt;
  }

  var findMapBlock = {};

  function findBlock(BlockID) {
    if (findMapBlock[BlockID]) return findMapBlock[BlockID];
    var blockData = this.getBlockData();
    var aryBlock = blockData.reduce(function (c, n) {
      return c.concat(n);
    }, []);

    for (var i = 0; i < aryBlock.length; i++) {
      if (aryBlock[i].BlockID == BlockID) {
        findMapBlock[BlockID] = aryBlock[i];
        return CM.assign({}, aryBlock[i]);
      }
    }
  }

  function getAllLineRoute(from, to) {
    var _this = this;

    var maxCnt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var me = this;
    var company = me.company;
    var fromObj = this.getStationBlockByID(from);
    var toObj = this.getStationBlockByID(to);
    if (!fromObj || !toObj) return [];
    var cnt = 0;
    var travel = [];

    if (fromObj.BlockID == toObj.BlockID) {
      travel.push([fromObj.BlockID]);
    } else {
      //1.指定站 BlockID出發，往陣列前後或本身是轉乘站的話往外路線查
      //2.不走回頭路，查找到走過的 BlockID 就結束該條路徑
      //3.當任一路線從 from 走到 to 後加入 travel 成為一條 route
      var fullRoute = [[fromObj.BlockID]];
      var bObj, linkTarget;

      while (cnt < maxCnt && travel.length < 20) {
        var tmpRouteAry = [];
        cnt++;
        fullRoute.map(function (stAry) {
          var nowID = stAry[stAry.length - 1];
          linkTarget = [];
          bObj = me.findBlock(nowID);
          bObj.near.map(function (near) {
            if (stAry.indexOf(near) == -1) {
              linkTarget.push(near);

              if (near == toObj.BlockID) {
                cnt++;
                travel.push(stAry.concat([near]));
              }
            }
          });

          if (bObj.toIDList) {
            bObj.toIDList.map(function (trans) {
              var tmpBlockID = me.getStationBlockByID(trans).BlockID;

              if (stAry.indexOf(tmpBlockID) == -1) {
                linkTarget.push(tmpBlockID);

                if (tmpBlockID == toObj.BlockID) {
                  cnt++;
                  travel.push(stAry.concat([tmpBlockID]));
                }
              }
            });
          }

          linkTarget.map(function (blockID) {
            tmpRouteAry.push(stAry.concat([blockID]));
          });
        });
        fullRoute = tmpRouteAry;
      } //4.路線重覆經過同一車站但不同路線視為迂迴要過濾掉不採用


      travel = travel.filter(function (blockAry) {
        var rt = true;
        var already = [],
            overLine = [];
        blockAry.forEach(function (c) {
          c = me.findBlock(c);

          if (c.type == 'transfer') {
            var stidx = already.indexOf(c.station);

            if (stidx != -1 && stidx != already.length - 1) {
              rt = false;
            } else {
              already = already.concat(c.toIDList);
            }
          } else {
            already = already.concat(c.station);
          }

          if (overLine[overLine.length - 1] != c.LineID) overLine.push(c.LineID);
        }); //if(overLine.length>3) rt = false;// 最多只搭三條線，轉乘兩次，超過就濾掉

        return rt;
      });
    }

    return travel.map(function (ary) {
      var mainRoute = [],
          startStation = false;
      var blockRoute = ary.map(function (c, idx, arr) {
        var bk = _this.findBlock(c);

        if (arr[idx + 1]) {
          var nextBk = _this.findBlock(arr[idx + 1]);

          var mySt = typeof bk.station == 'string' ? bk.station : bk.station[0];
          if (idx == 0) mySt = from;
          var nextSt = typeof nextBk.station == 'string' ? nextBk.station : nextBk.station[0];
          if (idx == arr.length - 2) nextSt = to;
          if (!startStation) startStation = mySt;
          var tmpRoute = me.getMRTThrough(startStation, nextSt);
          var isSameLineTrans = bk.type == 'transfer' && bk.toIDList.indexOf(bk.station != -1) && ptxFn[company].getStationIDInWhatLine(mySt) == ptxFn[company].getStationIDInWhatLine(nextSt);

          if (tmpRoute) {
            var lastMainRoute = mainRoute[mainRoute.length - 1];

            if (lastMainRoute && lastMainRoute.Stations[0] == tmpRoute.Stations[0]) {
              mainRoute[mainRoute.length - 1] = tmpRoute;
            } else {
              mainRoute.push(tmpRoute);
            }
          } else {
            startStation = false;

            if (isSameLineTrans) {
              startStation = mySt;
              tmpRoute = me.getMRTThrough(startStation, nextSt);
              mainRoute.push(tmpRoute);
            }
          } //同線轉乘站的處理

        } else if (arr.length == 1) {
          var tmpRoute = me.getMRTThrough(from, to);
          if (tmpRoute) mainRoute.push(tmpRoute);
        } else {
          var lastMainRoute = mainRoute[mainRoute.length - 1];
          var tmpA = true;
          lastMainRoute.Stations = lastMainRoute.Stations.filter(function (st) {
            if (tmpA) {
              if (st == to) tmpA = false;
              return true;
            }

            return false;
          });
        }

        return bk;
      }); //組合有包括轉乘站的 travelRoute

      var travelRoute = [],
          station = [];
      mainRoute.forEach(function (route, idx, arr) {
        if (idx == 0 && from != route.Stations[0]) {
          var transSt = me.findTransfer(from, route.Stations[0]);
          if (transSt) travelRoute.push(transSt);
        }

        travelRoute.push(route);

        if (arr[idx + 1]) {
          var transSt = me.findTransfer(route.Stations.slice(-1)[0], arr[idx + 1].Stations[0]);
          if (transSt) travelRoute.push(transSt);
        }

        if (idx == arr.length - 1 && to != route.Stations[route.Stations.length - 1]) {
          var transSt = me.findTransfer(route.Stations[route.Stations.length - 1], to);
          if (transSt) travelRoute.push(transSt);
        }

        station = station.concat(route.Stations);
      });
      var travelTime = travelRoute.reduce(function (val, tr) {
        if (tr.travelTime && tr.travelTime.min) {
          val += tr.travelTime.min;
        } else if (tr.TransferTime) {
          val += tr.TransferTime;
        }

        return val;
      }, 0);
      station = station.filter(function (c, idx, arr) {
        return arr.indexOf(c) == idx;
      });
      var travelStation = station.slice();
      if (travelStation[0] != from) travelStation.splice(0, 0, from);
      if (travelStation[travelStation.length - 1] != to) travelStation.push(to);
      return {
        block: blockRoute,
        station: station,
        travelStation: travelStation,
        route: mainRoute,
        travelRoute: travelRoute,
        travelTime: travelTime
      };
    }).sort(function (a, b) {
      var rt = a.route.length > b.route.length ? 1 : -1;

      if (a.route.length == b.route.length) {
        rt = a.station.length > b.station.length ? 1 : -1;
        if (a.travelTime && b.travelTime) rt = a.travelTime > b.travelTime ? 1 : -1;
      }

      return rt;
    });
  }

  function baseMRT(company) {
    var mrt = {
      company: company
    };
    mrt.dataX = datax[company];

    mrt.getBlockData = function () {
      return blockMRTLineStation(company);
    };

    mrt.getAllLineRoute = getAllLineRoute.bind(mrt);
    mrt.getStationBlockByID = getStationBlockByID.bind(mrt);
    mrt.findBlock = findBlock.bind(mrt);
    mrt.getMRTThrough = getMRTThrough.bind(mrt);

    mrt.findTransfer = function (from, to) {
      var LineID = ptxFn[company].getStationIDInWhatLine(from);
      var transferList = ptxFn[company].catchData.getDataXTransferOfLine(LineID);
      return transferList.find(function (c) {
        return c.FromStationID == from && c.ToStationID == to;
      });
    };

    return mrt;
  }

  var trtc$1 = function () {
    return baseMRT('trtc');
  }();

  var krtc = function () {
    return baseMRT('krtc');
  }();

  var tymetro$1 = function () {
    return baseMRT('tymetro');
  }();

  var router$1 = {
    trtc: trtc$1,
    krtc: krtc,
    tymetro: tymetro$1
  };

  var router$2 = {
    v1: router,
    v2: router$1
  };

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
    thsr: thsr,
    tra: tra$1,
    router: router$2,
    jsSHA: jsSHA,
    id: id,
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
