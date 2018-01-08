/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


function RSA_padding_add_PKCS1_OAEP(_1, _2, _3, _4) {
    var _5 = _4.length;
    if (_5 > (_2 - (2 * _1) - 2)) {
        alert("The message to be encrypted is too long");
        return;
    }
    var _6 = [];
    var _7 = _2 - _5 - (2 * _1) - 2;
    for (var i = 0; i < _7; i++) {
        _6[i] = 0;
    }
    var _8;
    if (_3 == null || _3.length == 0) {
        _8 = DEFAULT_LABEL_HASH.slice();
    } else {
        _8 = encodeSHA1(_3);
    }
    var _9 = [];
    _9 = _9.concat(_8, _6, 1, _4);
    var _a;
    _a = Rndbytes(_1);
    var _b = PKCS1_MGF1(_1, _2 - _1 - 1, _a);
    var _c = simpleXOR(_9, _b);
    var _d = PKCS1_MGF1(_1, _1, _c);
    var _e = simpleXOR(_a, _d);
    var _f = [0].concat(_e, _c);
    return _f;
};

function simpleXOR(_10, _11) {
    var _12 = [];
    for (var i = 0; i < _10.length; i++) {
        _12[i] = _10[i] ^ _11[i];
    }
    return _12;
};

function PKCS1_MGF1(_13, _14, _15) {
    var cnt = [];
    var _16 = [];
    var _17 = [];
    var _18 = 0;
    for (var i = 0; _18 < _14; i++) {
        cnt[0] = ((i >> 24) & 255);
        cnt[1] = ((i >> 16) & 255);
        cnt[2] = ((i >> 8)) & 255;
        cnt[3] = (i & 255);
        var _19 = _15.concat(cnt);
        _17 = encodeSHA1(_19);
        for (var j = 0; j < _17.length && _18 < _14; j++, _18++) {
            _16[_18] = _17[j];
        }
    }
    return _16;
};

function encodeSHA1(_1a) {
    var _1b = 64;
    var _1c = _1a.length;
    var _1d = _1c;
    var _1e = (64 - ((_1c + 1 + 8) % 64)) % 64;
    _1a[_1d] = 128;
    _1d++;
    for (var i = 0; i < _1e; i++, _1d++) {
        _1a[_1d] = 0;
    }
    _1c = _1c * 8;
    for (var i = 7; i >= 0; i--) {
        _1a[_1d + i] = (_1c % 256) & 255;
        _1c = _1c / 256;
    }
    var h0 = 1732584193;
    var h1 = 4023233417;
    var h2 = 2562383102;
    var h3 = 271733878;
    var h4 = 3285377520;
    var A, B, C, D, E, _1f;
    var _20 = _1a.length / _1b;
    for (var _21 = 0; _21 < _20; _21++) {
        var W = [];
        for (var _22 = 0, _23 = (_21 * _1b); _22 < _1b / 4; _22++) {
            W[_22] = bytestowords(_1a.slice(_23, _23 + 4));
            _23 = _23 + 4;
        }
        for (var i = 16; i <= 79; i++) {
            W[i] = rotateLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        }
        A = h0;
        B = h1;
        C = h2;
        D = h3;
        E = h4;
        for (var i = 0; i <= 19; i++) {
            _1f = safe_add(safe_add(rotateLeft(A, 5), ((B & C) | (~B & D))), safe_add(safe_add(E, W[i]), 1518500249)) & 4294967295;
            E = D;
            D = C;
            C = rotateLeft(B, 30);
            B = A;
            A = _1f;
        }
        for (var i = 20; i <= 39; i++) {
            _1f = safe_add(safe_add(rotateLeft(A, 5), (B ^ C ^ D)), safe_add(safe_add(E, W[i]), 1859775393)) & 4294967295;
            E = D;
            D = C;
            C = rotateLeft(B, 30);
            B = A;
            A = _1f;
        }
        for (var i = 40; i <= 59; i++) {
            _1f = safe_add(safe_add(rotateLeft(A, 5), ((B & C) | (B & D) | (C & D))), safe_add(safe_add(E, W[i]), 2400959708)) & 4294967295;
            E = D;
            D = C;
            C = rotateLeft(B, 30);
            B = A;
            A = _1f;
        }
        for (var i = 60; i <= 79; i++) {
            _1f = safe_add(safe_add(rotateLeft(A, 5), (B ^ C ^ D)), safe_add(safe_add(E, W[i]), 3395469782)) & 4294967295;
            E = D;
            D = C;
            C = rotateLeft(B, 30);
            B = A;
            A = _1f;
        }
        h0 = safe_add(h0, A) & 4294967295;
        h1 = safe_add(h1, B) & 4294967295;
        h2 = safe_add(h2, C) & 4294967295;
        h3 = safe_add(h3, D) & 4294967295;
        h4 = safe_add(h4, E) & 4294967295;
    }
    var _24 = [];
    var _25 = wordstobytes(h0);
    _24 = _25.concat(wordstobytes(h1), wordstobytes(h2), wordstobytes(h3), wordstobytes(h4));
    return _24;
};

function wordstobytes(val) {
    var out = [];
    var _26 = 0;
    for (var i = 3; i >= 0; i--, _26++) {
        out[_26] = (val >>> (i * 8)) & 255;
    }
    return out;
};

function rotateLeft(X, n) {
    var _27 = (X << n) | (X >>> (32 - n));
    return _27;
};

function bytestowords(_28) {
    var out = [];
    if (_28.length % 4) {
        return;
    }
    for (var i = 0; i < _28.length / 4; i++) {
        var wrd = 0;
        for (var j = 0; j < 4; j++) {
            wrd = wrd << 8 | _28[i * 4 + j];
        }
        out[i] = wrd;
    }
    return out;
};

function safe_add(x, y) {
    var lsw = (x & 65535) + (y & 65535);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 65535);
};

function Rndbytes(_29) {
    var a = [];
    for (i = 0; i < _29; i++) {
        a[i] = (Math.floor(256 * Math.random()));
    }
    return a;
};var dbits;
var canary = 244837814094590;
var j_lm = ((canary & 16777215) == 15715070);

function BigInteger(a, b, c) {
    if (a != null) {
        if ("number" == typeof a) {
            this.fromNumber(a, b, c);
        } else {
            if (b == null && "string" != typeof a) {
                this.fromString(a, 256);
            } else {
                this.fromString(a, b);
            }
        }
    }
};

function nbi() {
    return new BigInteger(null);
};

function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
        var v = x * this[i++] + w[j] + c;
        c = Math.floor(v / 67108864);
        w[j++] = v & 67108863;
    }
    return c;
};

function am2(i, x, w, j, c, n) {
    var xl = x & 32767, xh = x >> 15;
    while (--n >= 0) {
        var l = this[i] & 32767;
        var h = this[i++] >> 15;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
        w[j++] = l & 1073741823;
    }
    return c;
};

function am3(i, x, w, j, c, n) {
    var xl = x & 16383, xh = x >> 14;
    while (--n >= 0) {
        var l = this[i] & 16383;
        var h = this[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 16383) << 14) + w[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w[j++] = l & 268435455;
    }
    return c;
};
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
} else {
    if (j_lm && (navigator.appName != "Netscape")) {
        BigInteger.prototype.am = am1;
        dbits = 26;
    } else {
        BigInteger.prototype.am = am3;
        dbits = 28;
    }
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}

function int2char(n) {
    return BI_RM.charAt(n);
};

function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c == null) ? -1 : c;
};

function bnpCopyTo(r) {
    for (var i = this.t - 1; i >= 0; --i) {
        r[i] = this[i];
    }
    r.t = this.t;
    r.s = this.s;
};

function bnpFromInt(x) {
    this.t = 1;
    this.s = (x < 0) ? -1 : 0;
    if (x > 0) {
        this[0] = x;
    } else {
        if (x < -1) {
            this[0] = x + DV;
        } else {
            this.t = 0;
        }
    }
};

function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
};

function bnpFromString(s, b) {
    var k;
    if (b == 16) {
        k = 4;
    } else {
        if (b == 8) {
            k = 3;
        } else {
            if (b == 256) {
                k = 8;
            } else {
                if (b == 2) {
                    k = 1;
                } else {
                    if (b == 32) {
                        k = 5;
                    } else {
                        if (b == 4) {
                            k = 2;
                        } else {
                            this.fromRadix(s, b);
                            return;
                        }
                    }
                }
            }
        }
    }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while (--i >= 0) {
        var x = (k == 8) ? s[i] & 255 : intAt(s, i);
        if (x < 0) {
            if (s.charAt(i) == "-") {
                mi = true;
            }
            continue;
        }
        mi = false;
        if (sh == 0) {
            this[this.t++] = x;
        } else {
            if (sh + k > this.DB) {
                this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                this[this.t++] = (x >> (this.DB - sh));
            } else {
                this[this.t - 1] |= x << sh;
            }
        }
        sh += k;
        if (sh >= this.DB) {
            sh -= this.DB;
        }
    }
    if (k == 8 && (s[0] & 128) != 0) {
        alert("negative");
        this.s = -1;
        if (sh > 0) {
            this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
        }
    }
    this.clamp();
    if (mi) {
        BigInteger.ZERO.subTo(this, this);
    }
};

function bnpClamp() {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c) {
        --this.t;
    }
};

function bnToString(b) {
    if (this.s < 0) {
        return "-" + this.negate().toString(b);
    }
    var k;
    if (b == 16) {
        k = 4;
    } else {
        if (b == 8) {
            k = 3;
        } else {
            if (b == 2) {
                k = 1;
            } else {
                if (b == 32) {
                    k = 5;
                } else {
                    if (b == 4) {
                        k = 2;
                    } else {
                        return this.toRadix(b);
                    }
                }
            }
        }
    }
    var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
    var p = this.DB - (i * this.DB) % k;
    if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) > 0) {
            m = true;
            r = int2char(d);
        }
        while (i >= 0) {
            if (p < k) {
                d = (this[i] & ((1 << p) - 1)) << (k - p);
                d |= this[--i] >> (p += this.DB - k);
            } else {
                d = (this[i] >> (p -= k)) & km;
                if (p <= 0) {
                    p += this.DB;
                    --i;
                }
            }
            if (d > 0) {
                m = true;
            }
            if (m) {
                r += int2char(d);
            }
        }
    }
    return m ? r : "0";
};

function bnNegate() {
    var r = nbi();
    BigInteger.ZERO.subTo(this, r);
    return r;
};

function bnAbs() {
    return (this.s < 0) ? this.negate() : this;
};

function bnCompareTo(a) {
    var r = this.s - a.s;
    if (r != 0) {
        return r;
    }
    var i = this.t;
    r = i - a.t;
    if (r != 0) {
        return r;
    }
    while (--i >= 0) {
        if ((r = this[i] - a[i]) != 0) {
            return r;
        }
    }
    return 0;
};

function nbits(x) {
    var r = 1, t;
    if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
    }
    if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
    }
    if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
    }
    if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
    }
    if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
    }
    return r;
};

function bnBitLength() {
    if (this.t <= 0) {
        return 0;
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
};

function bnpDLShiftTo(n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) {
        r[i + n] = this[i];
    }
    for (i = n - 1; i >= 0; --i) {
        r[i] = 0;
    }
    r.t = this.t + n;
    r.s = this.s;
};

function bnpDRShiftTo(n, r) {
    for (var i = n; i < this.t; ++i) {
        r[i - n] = this[i];
    }
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
};

function bnpLShiftTo(n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
    for (i = this.t - 1; i >= 0; --i) {
        r[i + ds + 1] = (this[i] >> cbs) | c;
        c = (this[i] & bm) << bs;
    }
    for (i = ds - 1; i >= 0; --i) {
        r[i] = 0;
    }
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
};

function bnpRShiftTo(n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
        r.t = 0;
        return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
        r[i - ds - 1] |= (this[i] & bm) << cbs;
        r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) {
        r[this.t - ds - 1] |= (this.s & bm) << cbs;
    }
    r.t = this.t - ds;
    r.clamp();
};

function bnpSubTo(a, r) {
    var i = 0, c = 0, m = Math.min(a.t, this.t);
    while (i < m) {
        c += this[i] - a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
    }
    if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
            c += this[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        c += this.s;
    } else {
        c += this.s;
        while (i < a.t) {
            c -= a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        c -= a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c < -1) {
        r[i++] = this.DV + c;
    } else {
        if (c > 0) {
            r[i++] = c;
        }
    }
    r.t = i;
    r.clamp();
};

function bnpMultiplyTo(a, r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) {
        r[i] = 0;
    }
    for (i = 0; i < y.t; ++i) {
        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    }
    r.s = 0;
    r.clamp();
    if (this.s != a.s) {
        BigInteger.ZERO.subTo(r, r);
    }
};

function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) {
        r[i] = 0;
    }
    for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);
        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
            r[i + x.t] -= x.DV;
            r[i + x.t + 1] = 1;
        }
    }
    if (r.t > 0) {
        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    }
    r.s = 0;
    r.clamp();
};

function bnpDivRemTo(m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0) {
        return;
    }
    var pt = this.abs();
    if (pt.t < pm.t) {
        if (q != null) {
            q.fromInt(0);
        }
        if (r != null) {
            this.copyTo(r);
        }
        return;
    }
    if (r == null) {
        r = nbi();
    }
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]);
    if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
    } else {
        pm.copyTo(y);
        pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0) {
        return;
    }
    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
    var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y);
    while (y.t < ys) {
        y[y.t++] = 0;
    }
    while (--j >= 0) {
        var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
            y.dlShiftTo(j, t);
            r.subTo(t, r);
            while (r[i] < --qd) {
                r.subTo(t, r);
            }
        }
    }
    if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms) {
            BigInteger.ZERO.subTo(q, q);
        }
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) {
        r.rShiftTo(nsh, r);
    }
    if (ts < 0) {
        BigInteger.ZERO.subTo(r, r);
    }
};

function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        a.subTo(r, r);
    }
    return r;
};

function Classic(m) {
    this.m = m;
};

function cConvert(x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) {
        return x.mod(this.m);
    } else {
        return x;
    }
};

function cRevert(x) {
    return x;
};

function cReduce(x) {
    x.divRemTo(this.m, null, x);
};

function cMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
};

function cSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
};Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

function bnpInvDigit() {
    if (this.t < 1) {
        return 0;
    }
    var x = this[0];
    if ((x & 1) == 0) {
        return 0;
    }
    var y = x & 3;
    y = (y * (2 - (x & 15) * y)) & 15;
    y = (y * (2 - (x & 255) * y)) & 255;
    y = (y * (2 - (((x & 65535) * y) & 65535))) & 65535;
    y = (y * (2 - x * y % this.DV)) % this.DV;
    return (y > 0) ? this.DV - y : -y;
};

function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << (m.DB - 15)) - 1;
    this.mt2 = 2 * m.t;
};

function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(r, r);
    }
    return r;
};

function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
};

function montReduce(x) {
    while (x.t <= this.mt2) {
        x[x.t++] = 0;
    }
    for (var i = 0; i < this.m.t; ++i) {
        var j = x[i] & 32767;
        var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
        j = i + this.m.t;
        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        while (x[j] >= x.DV) {
            x[j] -= x.DV;
            x[++j]++;
        }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
    }
};

function montSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
};

function montMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
};Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

function bnpIsEven() {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
};

function bnpExp(e, z) {
    if (e > 4294967295 || e < 1) {
        return BigInteger.ONE;
    }
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & (1 << i)) > 0) {
            z.mulTo(r2, g, r);
        } else {
            var t = r;
            r = r2;
            r2 = t;
        }
    }
    return z.revert(r);
};

function bnModPowInt(e, m) {
    var z;
    if (e < 256 || m.isEven()) {
        z = new Classic(m);
    } else {
        z = new Montgomery(m);
    }
    return this.exp(e, z);
};BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
var dbits;
var canary = 244837814094590;
var j_lm = ((canary & 16777215) == 15715070);

function BigInteger(a, b, c) {
    if (a != null) {
        if ("number" == typeof a) {
            this.fromNumber(a, b, c);
        } else {
            if (b == null && "string" != typeof a) {
                this.fromString(a, 256);
            } else {
                this.fromString(a, b);
            }
        }
    }
};

function nbi() {
    return new BigInteger(null);
};

function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
        var v = x * this[i++] + w[j] + c;
        c = Math.floor(v / 67108864);
        w[j++] = v & 67108863;
    }
    return c;
};

function am2(i, x, w, j, c, n) {
    var xl = x & 32767, xh = x >> 15;
    while (--n >= 0) {
        var l = this[i] & 32767;
        var h = this[i++] >> 15;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
        w[j++] = l & 1073741823;
    }
    return c;
};

function am3(i, x, w, j, c, n) {
    var xl = x & 16383, xh = x >> 14;
    while (--n >= 0) {
        var l = this[i] & 16383;
        var h = this[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 16383) << 14) + w[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w[j++] = l & 268435455;
    }
    return c;
};
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
} else {
    if (j_lm && (navigator.appName != "Netscape")) {
        BigInteger.prototype.am = am1;
        dbits = 26;
    } else {
        BigInteger.prototype.am = am3;
        dbits = 28;
    }
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}

function int2char(n) {
    return BI_RM.charAt(n);
};

function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c == null) ? -1 : c;
};

function bnpCopyTo(r) {
    for (var i = this.t - 1; i >= 0; --i) {
        r[i] = this[i];
    }
    r.t = this.t;
    r.s = this.s;
};

function bnpFromInt(x) {
    this.t = 1;
    this.s = (x < 0) ? -1 : 0;
    if (x > 0) {
        this[0] = x;
    } else {
        if (x < -1) {
            this[0] = x + DV;
        } else {
            this.t = 0;
        }
    }
};

function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
};

function bnpFromString(s, b) {
    var k;
    if (b == 16) {
        k = 4;
    } else {
        if (b == 8) {
            k = 3;
        } else {
            if (b == 256) {
                k = 8;
            } else {
                if (b == 2) {
                    k = 1;
                } else {
                    if (b == 32) {
                        k = 5;
                    } else {
                        if (b == 4) {
                            k = 2;
                        } else {
                            this.fromRadix(s, b);
                            return;
                        }
                    }
                }
            }
        }
    }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while (--i >= 0) {
        var x = (k == 8) ? s[i] & 255 : intAt(s, i);
        if (x < 0) {
            if (s.charAt(i) == "-") {
                mi = true;
            }
            continue;
        }
        mi = false;
        if (sh == 0) {
            this[this.t++] = x;
        } else {
            if (sh + k > this.DB) {
                this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                this[this.t++] = (x >> (this.DB - sh));
            } else {
                this[this.t - 1] |= x << sh;
            }
        }
        sh += k;
        if (sh >= this.DB) {
            sh -= this.DB;
        }
    }
    if (k == 8 && (s[0] & 128) != 0) {
        alert("negative");
        this.s = -1;
        if (sh > 0) {
            this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
        }
    }
    this.clamp();
    if (mi) {
        BigInteger.ZERO.subTo(this, this);
    }
};

function bnpClamp() {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c) {
        --this.t;
    }
};

function bnToString(b) {
    if (this.s < 0) {
        return "-" + this.negate().toString(b);
    }
    var k;
    if (b == 16) {
        k = 4;
    } else {
        if (b == 8) {
            k = 3;
        } else {
            if (b == 2) {
                k = 1;
            } else {
                if (b == 32) {
                    k = 5;
                } else {
                    if (b == 4) {
                        k = 2;
                    } else {
                        return this.toRadix(b);
                    }
                }
            }
        }
    }
    var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
    var p = this.DB - (i * this.DB) % k;
    if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) > 0) {
            m = true;
            r = int2char(d);
        }
        while (i >= 0) {
            if (p < k) {
                d = (this[i] & ((1 << p) - 1)) << (k - p);
                d |= this[--i] >> (p += this.DB - k);
            } else {
                d = (this[i] >> (p -= k)) & km;
                if (p <= 0) {
                    p += this.DB;
                    --i;
                }
            }
            if (d > 0) {
                m = true;
            }
            if (m) {
                r += int2char(d);
            }
        }
    }
    return m ? r : "0";
};

function bnNegate() {
    var r = nbi();
    BigInteger.ZERO.subTo(this, r);
    return r;
};

function bnAbs() {
    return (this.s < 0) ? this.negate() : this;
};

function bnCompareTo(a) {
    var r = this.s - a.s;
    if (r != 0) {
        return r;
    }
    var i = this.t;
    r = i - a.t;
    if (r != 0) {
        return r;
    }
    while (--i >= 0) {
        if ((r = this[i] - a[i]) != 0) {
            return r;
        }
    }
    return 0;
};

function nbits(x) {
    var r = 1, t;
    if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
    }
    if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
    }
    if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
    }
    if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
    }
    if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
    }
    return r;
};

function bnBitLength() {
    if (this.t <= 0) {
        return 0;
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
};

function bnpDLShiftTo(n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) {
        r[i + n] = this[i];
    }
    for (i = n - 1; i >= 0; --i) {
        r[i] = 0;
    }
    r.t = this.t + n;
    r.s = this.s;
};

function bnpDRShiftTo(n, r) {
    for (var i = n; i < this.t; ++i) {
        r[i - n] = this[i];
    }
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
};

function bnpLShiftTo(n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
    for (i = this.t - 1; i >= 0; --i) {
        r[i + ds + 1] = (this[i] >> cbs) | c;
        c = (this[i] & bm) << bs;
    }
    for (i = ds - 1; i >= 0; --i) {
        r[i] = 0;
    }
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
};

function bnpRShiftTo(n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
        r.t = 0;
        return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
        r[i - ds - 1] |= (this[i] & bm) << cbs;
        r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) {
        r[this.t - ds - 1] |= (this.s & bm) << cbs;
    }
    r.t = this.t - ds;
    r.clamp();
};

function bnpSubTo(a, r) {
    var i = 0, c = 0, m = Math.min(a.t, this.t);
    while (i < m) {
        c += this[i] - a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
    }
    if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
            c += this[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        c += this.s;
    } else {
        c += this.s;
        while (i < a.t) {
            c -= a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        c -= a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c < -1) {
        r[i++] = this.DV + c;
    } else {
        if (c > 0) {
            r[i++] = c;
        }
    }
    r.t = i;
    r.clamp();
};

function bnpMultiplyTo(a, r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) {
        r[i] = 0;
    }
    for (i = 0; i < y.t; ++i) {
        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    }
    r.s = 0;
    r.clamp();
    if (this.s != a.s) {
        BigInteger.ZERO.subTo(r, r);
    }
};

function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) {
        r[i] = 0;
    }
    for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);
        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
            r[i + x.t] -= x.DV;
            r[i + x.t + 1] = 1;
        }
    }
    if (r.t > 0) {
        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    }
    r.s = 0;
    r.clamp();
};

function bnpDivRemTo(m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0) {
        return;
    }
    var pt = this.abs();
    if (pt.t < pm.t) {
        if (q != null) {
            q.fromInt(0);
        }
        if (r != null) {
            this.copyTo(r);
        }
        return;
    }
    if (r == null) {
        r = nbi();
    }
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]);
    if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
    } else {
        pm.copyTo(y);
        pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0) {
        return;
    }
    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
    var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y);
    while (y.t < ys) {
        y[y.t++] = 0;
    }
    while (--j >= 0) {
        var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
            y.dlShiftTo(j, t);
            r.subTo(t, r);
            while (r[i] < --qd) {
                r.subTo(t, r);
            }
        }
    }
    if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms) {
            BigInteger.ZERO.subTo(q, q);
        }
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) {
        r.rShiftTo(nsh, r);
    }
    if (ts < 0) {
        BigInteger.ZERO.subTo(r, r);
    }
};

function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        a.subTo(r, r);
    }
    return r;
};

function Classic(m) {
    this.m = m;
};

function cConvert(x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) {
        return x.mod(this.m);
    } else {
        return x;
    }
};

function cRevert(x) {
    return x;
};

function cReduce(x) {
    x.divRemTo(this.m, null, x);
};

function cMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
};

function cSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
};Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

function bnpInvDigit() {
    if (this.t < 1) {
        return 0;
    }
    var x = this[0];
    if ((x & 1) == 0) {
        return 0;
    }
    var y = x & 3;
    y = (y * (2 - (x & 15) * y)) & 15;
    y = (y * (2 - (x & 255) * y)) & 255;
    y = (y * (2 - (((x & 65535) * y) & 65535))) & 65535;
    y = (y * (2 - x * y % this.DV)) % this.DV;
    return (y > 0) ? this.DV - y : -y;
};

function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << (m.DB - 15)) - 1;
    this.mt2 = 2 * m.t;
};

function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(r, r);
    }
    return r;
};

function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
};

function montReduce(x) {
    while (x.t <= this.mt2) {
        x[x.t++] = 0;
    }
    for (var i = 0; i < this.m.t; ++i) {
        var j = x[i] & 32767;
        var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
        j = i + this.m.t;
        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        while (x[j] >= x.DV) {
            x[j] -= x.DV;
            x[++j]++;
        }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
    }
};

function montSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
};

function montMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
};Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

function bnpIsEven() {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
};

function bnpExp(e, z) {
    if (e > 4294967295 || e < 1) {
        return BigInteger.ONE;
    }
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & (1 << i)) > 0) {
            z.mulTo(r2, g, r);
        } else {
            var t = r;
            r = r2;
            r2 = t;
        }
    }
    return z.revert(r);
};

function bnModPowInt(e, m) {
    var z;
    if (e < 256 || m.isEven()) {
        z = new Classic(m);
    } else {
        z = new Montgomery(m);
    }
    return this.exp(e, z);
};BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array();
};

function ARC4init(key) {
    var i, j, t;
    for (i = 0; i < 256; ++i) {
        this.S[i] = i;
    }
    j = 0;
    for (i = 0; i < 256; ++i) {
        j = (j + this.S[i] + key[i % key.length]) & 255;
        t = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
};

function ARC4next() {
    var t;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[(t + this.S[this.i]) & 255];
};Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

function prng_newstate() {
    return new Arcfour();
};var rng_psize = 256;
var rng_state;
var rng_pool;
var rng_pptr;

function rng_seed_int(x) {
    rng_pool[rng_pptr++] ^= x & 255;
    rng_pool[rng_pptr++] ^= (x >> 8) & 255;
    rng_pool[rng_pptr++] ^= (x >> 16) & 255;
    rng_pool[rng_pptr++] ^= (x >> 24) & 255;
    if (rng_pptr >= rng_psize) {
        rng_pptr -= rng_psize;
    }
};

function rng_seed_time() {
    rng_seed_int(new Date().getTime());
};
if (rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t) {
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
        }
    }
    while (rng_pptr < rng_psize) {
        t = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t >>> 8;
        rng_pool[rng_pptr++] = t & 255;
    }
    rng_pptr = 0;
    rng_seed_time();
}

function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
            rng_pool[rng_pptr] = 0;
        }
        rng_pptr = 0;
    }
    return rng_state.next();
};

function rng_get_bytes(ba) {
    var i;
    for (i = 0; i < ba.length; ++i) {
        var _2a = rng_get_byte();
        while (i == 0 && (_2a & 128) != 0) {
            _2a = rng_get_byte();
        }
        ba[i] = _2a;
    }
};

function SecureRandom() {
};SecureRandom.prototype.nextBytes = rng_get_bytes;
var SHA_DIGEST_LENGTH = 20;
var ENCODING_PARAMETER_SIZE_IN_BYTES = 16;

function encryptLoginPin(pin, _2b, _2c, _2d) {
    var _2e = new RSAKey();
    _2e.setPublic(_2c, _2b);
    var _2f = new Array(ENCODING_PARAMETER_SIZE_IN_BYTES);
    var rnd = new SecureRandom();
    rnd.nextBytes(_2f);
    var _30 = new BigInteger(_2f);
    var _31 = _30.toString(16).toUpperCase();
    var _32 = formatPINMessage(pin, _2d);
    var _33 = RSA_padding_add_PKCS1_OAEP(SHA_DIGEST_LENGTH, _2c.length / 2, _2f, _32);
    var _34 = _2e.encrypt(new BigInteger(_33));
    _31 = padOutput(_31, 32);
    _34 = padOutput(_34, 256);
    return _31 + ":" + _34.toUpperCase();
};

function encryptResetPin(_35, _36, _37, _38, _39) {
    var _3a = new RSAKey();
    _3a.setPublic(_38, _37);
    var _3b = new Array(ENCODING_PARAMETER_SIZE_IN_BYTES);
    var rnd = new SecureRandom();
    rnd.nextBytes(_3b);
    var _3c = new BigInteger(_3b);
    var _3d = formatResetPINMessage(_35, _36, _39);
    var _3e = RSA_padding_add_PKCS1_OAEP(SHA_DIGEST_LENGTH, _38.length / 2, _3b, _3d);
    var _3f = _3a.encrypt(new BigInteger(_3e));
    var _40 = _3c.toString(16).toUpperCase();
    _40 = padOutput(_40, 32);
    _3f = padOutput(_3f, 256);
    return _40 + ":" + _3f.toUpperCase();
};

function formatPINMessage(pin, _41) {
    var _42 = [];
    var _43 = 0;
    _42[0] = 1 & 255;
    _43++;
    var _44 = str2bin(pin);
    var _45 = createPINBlock(_44);
    var _46 = hexDecode(_41);
    return _42.concat(_45, _46);
};

function formatResetPINMessage(_47, _48, _49) {
    var _4a = [];
    var _4b = 0;
    _4a[0] = 2 & 255;
    _4b++;
    var _4c = str2bin(_47);
    var _4d = str2bin(_48);
    var _4e = createPINBlock(_4c);
    var _4f = createPINBlock(_4d);
    var _50 = hexDecode(_49);
    return _4a.concat(_4e, _4f, _50);
};

function createPINBlock(pin) {
    var _51 = [];
    var _52 = 0;
    _51[0] = 193 & 255;
    _52++;
    _51[1] = pin.length & 255;
    _52++;
    for (var i = 0; i < pin.length; i++, _52++) {
        _51[_52] = pin[i];
    }
    while (_52 % 8) {
        _51[_52] = 255;
        _52++;
    }
    return _51;
};

function formatEncryptionResult(_53, _54, _55) {
    var _56 = _53 + "," + _54;
    if (_55.length > 0) {
        _56 = _56 + "," + _55;
    }
    return _56;
};

function hexDecode(_57) {
    var wrt = 0;
    var rd = 0;
    var tmp = new Array(1);
    var _58 = " ";
    var ch = 0;
    while (rd < _57.length) {
        if (_57.charCodeAt(rd) == _58.charCodeAt(0)) {
            ++rd;
            continue;
        }
        ch = (HexToNib(_57.charCodeAt(rd)) << 4) + HexToNib(_57.charCodeAt(rd + 1));
        if (wrt >= tmp.length) {
            tmp.push(ch);
        } else {
            tmp[wrt] = ch;
        }
        ++wrt;
        rd += 2;
    }
    return tmp;
};

function HexToNib(h) {
    if (h >= 65 && h <= 70) {
        return h - 55;
    }
    if (h >= 97 && h <= 102) {
        return h - 87;
    } else {
        return h - 48;
    }
};

function str2bin(_59) {
    var _5a = [];
    var _5b = unescape(encodeURIComponent(_59));
    for (var i = 0; i < _5b.length; i++) {
        _5a[i] = _5b.charCodeAt(i) & 255;
    }
    return _5a;
};

function padOutput(_5c, _5d) {
    var _5e = _5c;
    for (; _5e.length < _5d;) {
        _5e = "0" + _5e;
    }
    return _5e;
};

function parseBigInt(str, r) {
    return new BigInteger(str, r);
};

function linebrk(s, n) {
    var ret = "";
    var i = 0;
    while (i + n < s.length) {
        ret += s.substring(i, i + n) + "\n";
        i += n;
    }
    return ret + s.substring(i, s.length);
};

function byte2Hex(b) {
    if (b < 16) {
        return "0" + b.toString(16);
    } else {
        return b.toString(16);
    }
};

function pkcs1pad2(s, n) {
    if (n < s.length + 11) {
        alert("Message too long for RSA");
        return null;
    }
    var ba = new Array();
    var i = s.length - 1;
    while (i >= 0 && n > 0) {
        ba[--n] = s.charCodeAt(i--);
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = new Array();
    while (n > 2) {
        x[0] = 0;
        while (x[0] == 0) {
            rng.nextBytes(x);
        }
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
};

function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
};

function RSASetPublic(N, E) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
    } else {
        alert("Invalid RSA public key");
    }
};

function RSADoPublic(x) {
    return x.modPowInt(this.e, this.n);
};

function RSAEncrypt(m) {
    if (m == null) {
        return null;
    }
    var c = this.doPublic(m);
    if (c == null) {
        return null;
    }
    var h = c.toString(16);
    if ((h.length & 1) == 0) {
        return h;
    } else {
        return "0" + h;
    }
};RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;

function _getRPIN(pin, rsa_exp, rsa_mod, randomNumber, sessionId)
{
    try
    {
        var loginPIN = encryptLoginPin(pin, rsa_exp, rsa_mod, randomNumber.slice());
        return formatEncryptionResult (sessionId, loginPIN, '');
    }
    catch(e)
    {
        alert('Technical Problem, failed to encrypt the password.');
        return '';
    }
}
function _getRPIN2(old_pin, new_pin, rsa_exp, rsa_mod, randomNumber, sessionId)
{
    try
    {
        var resetPIN1 = encryptLoginPin(new_pin, rsa_exp, rsa_mod, randomNumber.slice());
        var resetPIN2 = encryptResetPin(old_pin, new_pin, rsa_exp, rsa_mod, randomNumber.slice());
        return formatEncryptionResult(sessionId, resetPIN1, resetPIN2);
    }
    catch(e)
    {
        alert('Technical Problem, failed to encrypt the password.');
        return '';
    }
}