/*! Full Tilt v0.5.3 / http://github.com/richtr/Full-Tilt */
!(function(a) {
  function b(a) {
    return (a = +a), 0 === a || isNaN(a) ? a : a > 0 ? 1 : -1;
  }
  function c(a) {
    var b = new Promise(function(b, c) {
      var d = function(e) {
        setTimeout(function() {
          a && a.data ? b() : e >= 20 ? c() : d(++e);
        }, 50);
      };
      d(0);
    });
    return b;
  }
  function d() {
    o = n ? (a.screen.orientation.angle || 0) * j : (a.orientation || 0) * j;
  }
  function e(a) {
    l.orientation.data = a;
    for (var b in l.orientation.callbacks)
      l.orientation.callbacks[b].call(this);
  }
  function f(a) {
    l.motion.data = a;
    for (var b in l.motion.callbacks) l.motion.callbacks[b].call(this);
  }
  if (void 0 === a.FULLTILT || null === a.FULLTILT) {
    var g = Math.PI,
      h = g / 2,
      i = 2 * g,
      j = g / 180,
      k = 180 / g,
      l = {
        orientation: { active: !1, callbacks: [], data: void 0 },
        motion: { active: !1, callbacks: [], data: void 0 }
      },
      m = !1,
      n =
        a.screen &&
        a.screen.orientation &&
        void 0 !== a.screen.orientation.angle &&
        null !== a.screen.orientation.angle
          ? !0
          : !1,
      o = (n ? a.screen.orientation.angle : a.orientation || 0) * j,
      p = h,
      q = g,
      r = i / 3,
      s = -h,
      t = {};
    (t.version = "0.5.3"),
      (t.getDeviceOrientation = function(a) {
        var b = new Promise(function(b, d) {
          var e = new t.DeviceOrientation(a);
          e.start();
          var f = new c(l.orientation);
          f.then(function() {
            (e._alphaAvailable =
              l.orientation.data.alpha && null !== l.orientation.data.alpha),
              (e._betaAvailable =
                l.orientation.data.beta && null !== l.orientation.data.beta),
              (e._gammaAvailable =
                l.orientation.data.gamma && null !== l.orientation.data.gamma),
              b(e);
          })["catch"](function() {
            e.stop(), d("DeviceOrientation is not supported");
          });
        });
        return b;
      }),
      (t.getDeviceMotion = function(a) {
        var b = new Promise(function(b, d) {
          var e = new t.DeviceMotion(a);
          e.start();
          var f = new c(l.motion);
          f.then(function() {
            (e._accelerationXAvailable =
              l.motion.data.acceleration && l.motion.data.acceleration.x),
              (e._accelerationYAvailable =
                l.motion.data.acceleration && l.motion.data.acceleration.y),
              (e._accelerationZAvailable =
                l.motion.data.acceleration && l.motion.data.acceleration.z),
              (e._accelerationIncludingGravityXAvailable =
                l.motion.data.accelerationIncludingGravity &&
                l.motion.data.accelerationIncludingGravity.x),
              (e._accelerationIncludingGravityYAvailable =
                l.motion.data.accelerationIncludingGravity &&
                l.motion.data.accelerationIncludingGravity.y),
              (e._accelerationIncludingGravityZAvailable =
                l.motion.data.accelerationIncludingGravity &&
                l.motion.data.accelerationIncludingGravity.z),
              (e._rotationRateAlphaAvailable =
                l.motion.data.rotationRate && l.motion.data.rotationRate.alpha),
              (e._rotationRateBetaAvailable =
                l.motion.data.rotationRate && l.motion.data.rotationRate.beta),
              (e._rotationRateGammaAvailable =
                l.motion.data.rotationRate && l.motion.data.rotationRate.gamma),
              b(e);
          })["catch"](function() {
            e.stop(), d("DeviceMotion is not supported");
          });
        });
        return b;
      }),
      (t.Quaternion = function(a, c, d, e) {
        var f;
        (this.set = function(a, b, c, d) {
          (this.x = a || 0),
            (this.y = b || 0),
            (this.z = c || 0),
            (this.w = d || 1);
        }),
          (this.copy = function(a) {
            (this.x = a.x), (this.y = a.y), (this.z = a.z), (this.w = a.w);
          }),
          (this.setFromEuler = (function() {
            var a, b, c, d, e, f, g, h, i, k, l, m;
            return function(n) {
              return (
                (n = n || {}),
                (c = (n.alpha || 0) * j),
                (a = (n.beta || 0) * j),
                (b = (n.gamma || 0) * j),
                (f = c / 2),
                (d = a / 2),
                (e = b / 2),
                (g = Math.cos(d)),
                (h = Math.cos(e)),
                (i = Math.cos(f)),
                (k = Math.sin(d)),
                (l = Math.sin(e)),
                (m = Math.sin(f)),
                this.set(
                  k * h * i - g * l * m,
                  g * l * i + k * h * m,
                  g * h * m + k * l * i,
                  g * h * i - k * l * m
                ),
                this.normalize(),
                this
              );
            };
          })()),
          (this.setFromRotationMatrix = (function() {
            var a;
            return function(c) {
              return (
                (a = c.elements),
                this.set(
                  0.5 * Math.sqrt(1 + a[0] - a[4] - a[8]) * b(a[7] - a[5]),
                  0.5 * Math.sqrt(1 - a[0] + a[4] - a[8]) * b(a[2] - a[6]),
                  0.5 * Math.sqrt(1 - a[0] - a[4] + a[8]) * b(a[3] - a[1]),
                  0.5 * Math.sqrt(1 + a[0] + a[4] + a[8])
                ),
                this
              );
            };
          })()),
          (this.multiply = function(a) {
            return (
              (f = t.Quaternion.prototype.multiplyQuaternions(this, a)),
              this.copy(f),
              this
            );
          }),
          (this.rotateX = function(a) {
            return (
              (f = t.Quaternion.prototype.rotateByAxisAngle(
                this,
                [1, 0, 0],
                a
              )),
              this.copy(f),
              this
            );
          }),
          (this.rotateY = function(a) {
            return (
              (f = t.Quaternion.prototype.rotateByAxisAngle(
                this,
                [0, 1, 0],
                a
              )),
              this.copy(f),
              this
            );
          }),
          (this.rotateZ = function(a) {
            return (
              (f = t.Quaternion.prototype.rotateByAxisAngle(
                this,
                [0, 0, 1],
                a
              )),
              this.copy(f),
              this
            );
          }),
          (this.normalize = function() {
            return t.Quaternion.prototype.normalize(this);
          }),
          this.set(a, c, d, e);
      }),
      (t.Quaternion.prototype = {
        constructor: t.Quaternion,
        multiplyQuaternions: (function() {
          var a = new t.Quaternion();
          return function(b, c) {
            var d = b.x,
              e = b.y,
              f = b.z,
              g = b.w,
              h = c.x,
              i = c.y,
              j = c.z,
              k = c.w;
            return (
              a.set(
                d * k + g * h + e * j - f * i,
                e * k + g * i + f * h - d * j,
                f * k + g * j + d * i - e * h,
                g * k - d * h - e * i - f * j
              ),
              a
            );
          };
        })(),
        normalize: function(a) {
          var b = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
          return (
            0 === b
              ? ((a.x = 0), (a.y = 0), (a.z = 0), (a.w = 1))
              : ((b = 1 / b), (a.x *= b), (a.y *= b), (a.z *= b), (a.w *= b)),
            a
          );
        },
        rotateByAxisAngle: (function() {
          var a,
            b,
            c = new t.Quaternion(),
            d = new t.Quaternion();
          return function(e, f, g) {
            return (
              (a = (g || 0) / 2),
              (b = Math.sin(a)),
              d.set(
                (f[0] || 0) * b,
                (f[1] || 0) * b,
                (f[2] || 0) * b,
                Math.cos(a)
              ),
              (c = t.Quaternion.prototype.multiplyQuaternions(e, d)),
              t.Quaternion.prototype.normalize(c)
            );
          };
        })()
      }),
      (t.RotationMatrix = function(a, b, c, d, e, f, g, h, i) {
        var k;
        (this.elements = new Float32Array(9)),
          (this.identity = function() {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
          }),
          (this.set = function(a, b, c, d, e, f, g, h, i) {
            (this.elements[0] = a || 1),
              (this.elements[1] = b || 0),
              (this.elements[2] = c || 0),
              (this.elements[3] = d || 0),
              (this.elements[4] = e || 1),
              (this.elements[5] = f || 0),
              (this.elements[6] = g || 0),
              (this.elements[7] = h || 0),
              (this.elements[8] = i || 1);
          }),
          (this.copy = function(a) {
            (this.elements[0] = a.elements[0]),
              (this.elements[1] = a.elements[1]),
              (this.elements[2] = a.elements[2]),
              (this.elements[3] = a.elements[3]),
              (this.elements[4] = a.elements[4]),
              (this.elements[5] = a.elements[5]),
              (this.elements[6] = a.elements[6]),
              (this.elements[7] = a.elements[7]),
              (this.elements[8] = a.elements[8]);
          }),
          (this.setFromEuler = (function() {
            var a, b, c, d, e, f, g, h, i;
            return function(k) {
              return (
                (k = k || {}),
                (c = (k.alpha || 0) * j),
                (a = (k.beta || 0) * j),
                (b = (k.gamma || 0) * j),
                (d = Math.cos(a)),
                (e = Math.cos(b)),
                (f = Math.cos(c)),
                (g = Math.sin(a)),
                (h = Math.sin(b)),
                (i = Math.sin(c)),
                this.set(
                  f * e - i * g * h,
                  -d * i,
                  e * i * g + f * h,
                  e * i + f * g * h,
                  f * d,
                  i * h - f * e * g,
                  -d * h,
                  g,
                  d * e
                ),
                this.normalize(),
                this
              );
            };
          })()),
          (this.setFromQuaternion = (function() {
            var a, b, c, d;
            return function(e) {
              return (
                (a = e.w * e.w),
                (b = e.x * e.x),
                (c = e.y * e.y),
                (d = e.z * e.z),
                this.set(
                  a + b - c - d,
                  2 * (e.x * e.y - e.w * e.z),
                  2 * (e.x * e.z + e.w * e.y),
                  2 * (e.x * e.y + e.w * e.z),
                  a - b + c - d,
                  2 * (e.y * e.z - e.w * e.x),
                  2 * (e.x * e.z - e.w * e.y),
                  2 * (e.y * e.z + e.w * e.x),
                  a - b - c + d
                ),
                this
              );
            };
          })()),
          (this.multiply = function(a) {
            return (
              (k = t.RotationMatrix.prototype.multiplyMatrices(this, a)),
              this.copy(k),
              this
            );
          }),
          (this.rotateX = function(a) {
            return (
              (k = t.RotationMatrix.prototype.rotateByAxisAngle(
                this,
                [1, 0, 0],
                a
              )),
              this.copy(k),
              this
            );
          }),
          (this.rotateY = function(a) {
            return (
              (k = t.RotationMatrix.prototype.rotateByAxisAngle(
                this,
                [0, 1, 0],
                a
              )),
              this.copy(k),
              this
            );
          }),
          (this.rotateZ = function(a) {
            return (
              (k = t.RotationMatrix.prototype.rotateByAxisAngle(
                this,
                [0, 0, 1],
                a
              )),
              this.copy(k),
              this
            );
          }),
          (this.normalize = function() {
            return t.RotationMatrix.prototype.normalize(this);
          }),
          this.set(a, b, c, d, e, f, g, h, i);
      }),
      (t.RotationMatrix.prototype = {
        constructor: t.RotationMatrix,
        multiplyMatrices: (function() {
          var a,
            b,
            c = new t.RotationMatrix();
          return function(d, e) {
            return (
              (a = d.elements),
              (b = e.elements),
              c.set(
                a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
                a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
                a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
                a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
                a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
                a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
                a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
                a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
                a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
              ),
              c
            );
          };
        })(),
        normalize: function(a) {
          var b = a.elements,
            c =
              b[0] * b[4] * b[8] -
              b[0] * b[5] * b[7] -
              b[1] * b[3] * b[8] +
              b[1] * b[5] * b[6] +
              b[2] * b[3] * b[7] -
              b[2] * b[4] * b[6];
          return (
            (b[0] /= c),
            (b[1] /= c),
            (b[2] /= c),
            (b[3] /= c),
            (b[4] /= c),
            (b[5] /= c),
            (b[6] /= c),
            (b[7] /= c),
            (b[8] /= c),
            (a.elements = b),
            a
          );
        },
        rotateByAxisAngle: (function() {
          var a,
            b,
            c = new t.RotationMatrix(),
            d = new t.RotationMatrix(),
            e = !1;
          return function(f, g, h) {
            return (
              d.identity(),
              (e = !1),
              (a = Math.sin(h)),
              (b = Math.cos(h)),
              1 === g[0] && 0 === g[1] && 0 === g[2]
                ? ((e = !0),
                  (d.elements[4] = b),
                  (d.elements[5] = -a),
                  (d.elements[7] = a),
                  (d.elements[8] = b))
                : 1 === g[1] && 0 === g[0] && 0 === g[2]
                ? ((e = !0),
                  (d.elements[0] = b),
                  (d.elements[2] = a),
                  (d.elements[6] = -a),
                  (d.elements[8] = b))
                : 1 === g[2] &&
                  0 === g[0] &&
                  0 === g[1] &&
                  ((e = !0),
                  (d.elements[0] = b),
                  (d.elements[1] = -a),
                  (d.elements[3] = a),
                  (d.elements[4] = b)),
              e
                ? ((c = t.RotationMatrix.prototype.multiplyMatrices(f, d)),
                  (c = t.RotationMatrix.prototype.normalize(c)))
                : (c = f),
              c
            );
          };
        })()
      }),
      (t.Euler = function(a, b, c) {
        (this.set = function(a, b, c) {
          (this.alpha = a || 0), (this.beta = b || 0), (this.gamma = c || 0);
        }),
          (this.copy = function(a) {
            (this.alpha = a.alpha),
              (this.beta = a.beta),
              (this.gamma = a.gamma);
          }),
          (this.setFromRotationMatrix = (function() {
            var a, b, c, d;
            return function(e) {
              (a = e.elements),
                a[8] > 0
                  ? ((b = Math.atan2(-a[1], a[4])),
                    (c = Math.asin(a[7])),
                    (d = Math.atan2(-a[6], a[8])))
                  : a[8] < 0
                  ? ((b = Math.atan2(a[1], -a[4])),
                    (c = -Math.asin(a[7])),
                    (c += c >= 0 ? -g : g),
                    (d = Math.atan2(a[6], -a[8])))
                  : a[6] > 0
                  ? ((b = Math.atan2(-a[1], a[4])),
                    (c = Math.asin(a[7])),
                    (d = -h))
                  : a[6] < 0
                  ? ((b = Math.atan2(a[1], -a[4])),
                    (c = -Math.asin(a[7])),
                    (c += c >= 0 ? -g : g),
                    (d = -h))
                  : ((b = Math.atan2(a[3], a[0])),
                    (c = a[7] > 0 ? h : -h),
                    (d = 0)),
                0 > b && (b += i),
                (b *= k),
                (c *= k),
                (d *= k),
                this.set(b, c, d);
            };
          })()),
          (this.setFromQuaternion = (function() {
            var a, b, c;
            return function(d) {
              var e = d.w * d.w,
                f = d.x * d.x,
                j = d.y * d.y,
                l = d.z * d.z,
                m = e + f + j + l,
                n = d.w * d.x + d.y * d.z,
                o = 1e-6;
              if (n > (0.5 - o) * m)
                (a = 2 * Math.atan2(d.y, d.w)), (b = h), (c = 0);
              else if ((-0.5 + o) * m > n)
                (a = -2 * Math.atan2(d.y, d.w)), (b = -h), (c = 0);
              else {
                var p = e - f + j - l,
                  q = 2 * (d.w * d.z - d.x * d.y),
                  r = e - f - j + l,
                  s = 2 * (d.w * d.y - d.x * d.z);
                r > 0
                  ? ((a = Math.atan2(q, p)),
                    (b = Math.asin((2 * n) / m)),
                    (c = Math.atan2(s, r)))
                  : ((a = Math.atan2(-q, -p)),
                    (b = -Math.asin((2 * n) / m)),
                    (b += 0 > b ? g : -g),
                    (c = Math.atan2(-s, -r)));
              }
              0 > a && (a += i),
                (a *= k),
                (b *= k),
                (c *= k),
                this.set(a, b, c);
            };
          })()),
          (this.rotateX = function(a) {
            return (
              t.Euler.prototype.rotateByAxisAngle(this, [1, 0, 0], a), this
            );
          }),
          (this.rotateY = function(a) {
            return (
              t.Euler.prototype.rotateByAxisAngle(this, [0, 1, 0], a), this
            );
          }),
          (this.rotateZ = function(a) {
            return (
              t.Euler.prototype.rotateByAxisAngle(this, [0, 0, 1], a), this
            );
          }),
          this.set(a, b, c);
      }),
      (t.Euler.prototype = {
        constructor: t.Euler,
        rotateByAxisAngle: (function() {
          var a = new t.RotationMatrix();
          return function(b, c, d) {
            return (
              a.setFromEuler(b),
              (a = t.RotationMatrix.prototype.rotateByAxisAngle(a, c, d)),
              b.setFromRotationMatrix(a),
              b
            );
          };
        })()
      }),
      (t.DeviceOrientation = function(b) {
        this.options = b || {};
        var c = 0,
          d = 200,
          e = 0,
          f = 10;
        if (
          ((this.alphaOffsetScreen = 0),
          (this.alphaOffsetDevice = void 0),
          "game" === this.options.type)
        ) {
          var g = function(b) {
            return null !== b.alpha &&
              ((this.alphaOffsetDevice = new t.Euler(b.alpha, 0, 0)),
              this.alphaOffsetDevice.rotateZ(-o),
              ++e >= f)
              ? void a.removeEventListener("deviceorientation", g, !1)
              : void (
                  ++c >= d && a.removeEventListener("deviceorientation", g, !1)
                );
          }.bind(this);
          a.addEventListener("deviceorientation", g, !1);
        } else if ("world" === this.options.type) {
          var h = function(b) {
            return b.absolute !== !0 &&
              void 0 !== b.webkitCompassAccuracy &&
              null !== b.webkitCompassAccuracy &&
              +b.webkitCompassAccuracy >= 0 &&
              +b.webkitCompassAccuracy < 50 &&
              ((this.alphaOffsetDevice = new t.Euler(
                b.webkitCompassHeading,
                0,
                0
              )),
              this.alphaOffsetDevice.rotateZ(o),
              (this.alphaOffsetScreen = o),
              ++e >= f)
              ? void a.removeEventListener("deviceorientation", h, !1)
              : void (
                  ++c >= d && a.removeEventListener("deviceorientation", h, !1)
                );
          }.bind(this);
          a.addEventListener("deviceorientation", h, !1);
        }
      }),
      (t.DeviceOrientation.prototype = {
        constructor: t.DeviceOrientation,
        start: function(b) {
          b &&
            "[object Function]" == Object.prototype.toString.call(b) &&
            l.orientation.callbacks.push(b),
            m ||
              (n
                ? a.screen.orientation.addEventListener("change", d, !1)
                : a.addEventListener("orientationchange", d, !1)),
            l.orientation.active ||
              (a.addEventListener("deviceorientation", e, !1),
              (l.orientation.active = !0));
        },
        stop: function() {
          l.orientation.active &&
            (a.removeEventListener("deviceorientation", e, !1),
            (l.orientation.active = !1));
        },
        listen: function(a) {
          this.start(a);
        },
        getFixedFrameQuaternion: (function() {
          var a = new t.Euler(),
            b = new t.RotationMatrix(),
            c = new t.Quaternion();
          return function() {
            var d = l.orientation.data || { alpha: 0, beta: 0, gamma: 0 },
              e = d.alpha;
            return (
              this.alphaOffsetDevice &&
                (b.setFromEuler(this.alphaOffsetDevice),
                b.rotateZ(-this.alphaOffsetScreen),
                a.setFromRotationMatrix(b),
                a.alpha < 0 && (a.alpha += 360),
                (a.alpha %= 360),
                (e -= a.alpha)),
              a.set(e, d.beta, d.gamma),
              c.setFromEuler(a),
              c
            );
          };
        })(),
        getScreenAdjustedQuaternion: (function() {
          var a;
          return function() {
            return (a = this.getFixedFrameQuaternion()), a.rotateZ(-o), a;
          };
        })(),
        getFixedFrameMatrix: (function() {
          var a = new t.Euler(),
            b = new t.RotationMatrix();
          return function() {
            var c = l.orientation.data || { alpha: 0, beta: 0, gamma: 0 },
              d = c.alpha;
            return (
              this.alphaOffsetDevice &&
                (b.setFromEuler(this.alphaOffsetDevice),
                b.rotateZ(-this.alphaOffsetScreen),
                a.setFromRotationMatrix(b),
                a.alpha < 0 && (a.alpha += 360),
                (a.alpha %= 360),
                (d -= a.alpha)),
              a.set(d, c.beta, c.gamma),
              b.setFromEuler(a),
              b
            );
          };
        })(),
        getScreenAdjustedMatrix: (function() {
          var a;
          return function() {
            return (a = this.getFixedFrameMatrix()), a.rotateZ(-o), a;
          };
        })(),
        getFixedFrameEuler: (function() {
          var a,
            b = new t.Euler();
          return function() {
            return (
              (a = this.getFixedFrameMatrix()), b.setFromRotationMatrix(a), b
            );
          };
        })(),
        getScreenAdjustedEuler: (function() {
          var a,
            b = new t.Euler();
          return function() {
            return (
              (a = this.getScreenAdjustedMatrix()),
              b.setFromRotationMatrix(a),
              b
            );
          };
        })(),
        isAbsolute: function() {
          return l.orientation.data && l.orientation.data.absolute === !0
            ? !0
            : !1;
        },
        getLastRawEventData: function() {
          return l.orientation.data || {};
        },
        _alphaAvailable: !1,
        _betaAvailable: !1,
        _gammaAvailable: !1,
        isAvailable: function(a) {
          switch (a) {
            case this.ALPHA:
              return this._alphaAvailable;
            case this.BETA:
              return this._betaAvailable;
            case this.GAMMA:
              return this._gammaAvailable;
          }
        },
        ALPHA: "alpha",
        BETA: "beta",
        GAMMA: "gamma"
      }),
      (t.DeviceMotion = function(a) {
        this.options = a || {};
      }),
      (t.DeviceMotion.prototype = {
        constructor: t.DeviceMotion,
        start: function(b) {
          b &&
            "[object Function]" == Object.prototype.toString.call(b) &&
            l.motion.callbacks.push(b),
            m ||
              (n
                ? a.screen.orientation.addEventListener("change", d, !1)
                : a.addEventListener("orientationchange", d, !1)),
            l.motion.active ||
              (a.addEventListener("devicemotion", f, !1),
              (l.motion.active = !0));
        },
        stop: function() {
          l.motion.active &&
            (a.removeEventListener("devicemotion", f, !1),
            (l.motion.active = !1));
        },
        listen: function(a) {
          this.start(a);
        },
        getScreenAdjustedAcceleration: function() {
          var a =
              l.motion.data && l.motion.data.acceleration
                ? l.motion.data.acceleration
                : { x: 0, y: 0, z: 0 },
            b = {};
          switch (o) {
            case p:
              (b.x = -a.y), (b.y = a.x);
              break;
            case q:
              (b.x = -a.x), (b.y = -a.y);
              break;
            case r:
            case s:
              (b.x = a.y), (b.y = -a.x);
              break;
            default:
              (b.x = a.x), (b.y = a.y);
          }
          return (b.z = a.z), b;
        },
        getScreenAdjustedAccelerationIncludingGravity: function() {
          var a =
              l.motion.data && l.motion.data.accelerationIncludingGravity
                ? l.motion.data.accelerationIncludingGravity
                : { x: 0, y: 0, z: 0 },
            b = {};
          switch (o) {
            case p:
              (b.x = -a.y), (b.y = a.x);
              break;
            case q:
              (b.x = -a.x), (b.y = -a.y);
              break;
            case r:
            case s:
              (b.x = a.y), (b.y = -a.x);
              break;
            default:
              (b.x = a.x), (b.y = a.y);
          }
          return (b.z = a.z), b;
        },
        getScreenAdjustedRotationRate: function() {
          var a =
              l.motion.data && l.motion.data.rotationRate
                ? l.motion.data.rotationRate
                : { alpha: 0, beta: 0, gamma: 0 },
            b = {};
          switch (o) {
            case p:
              (b.beta = -a.gamma), (b.gamma = a.beta);
              break;
            case q:
              (b.beta = -a.beta), (b.gamma = -a.gamma);
              break;
            case r:
            case s:
              (b.beta = a.gamma), (b.gamma = -a.beta);
              break;
            default:
              (b.beta = a.beta), (b.gamma = a.gamma);
          }
          return (b.alpha = a.alpha), b;
        },
        getLastRawEventData: function() {
          return l.motion.data || {};
        },
        _accelerationXAvailable: !1,
        _accelerationYAvailable: !1,
        _accelerationZAvailable: !1,
        _accelerationIncludingGravityXAvailable: !1,
        _accelerationIncludingGravityYAvailable: !1,
        _accelerationIncludingGravityZAvailable: !1,
        _rotationRateAlphaAvailable: !1,
        _rotationRateBetaAvailable: !1,
        _rotationRateGammaAvailable: !1,
        isAvailable: function(a) {
          switch (a) {
            case this.ACCELERATION_X:
              return this._accelerationXAvailable;
            case this.ACCELERATION_Y:
              return this._accelerationYAvailable;
            case this.ACCELERATION_Z:
              return this._accelerationZAvailable;
            case this.ACCELERATION_INCLUDING_GRAVITY_X:
              return this._accelerationIncludingGravityXAvailable;
            case this.ACCELERATION_INCLUDING_GRAVITY_Y:
              return this._accelerationIncludingGravityYAvailable;
            case this.ACCELERATION_INCLUDING_GRAVITY_Z:
              return this._accelerationIncludingGravityZAvailable;
            case this.ROTATION_RATE_ALPHA:
              return this._rotationRateAlphaAvailable;
            case this.ROTATION_RATE_BETA:
              return this._rotationRateBetaAvailable;
            case this.ROTATION_RATE_GAMMA:
              return this._rotationRateGammaAvailable;
          }
        },
        ACCELERATION_X: "accelerationX",
        ACCELERATION_Y: "accelerationY",
        ACCELERATION_Z: "accelerationZ",
        ACCELERATION_INCLUDING_GRAVITY_X: "accelerationIncludingGravityX",
        ACCELERATION_INCLUDING_GRAVITY_Y: "accelerationIncludingGravityY",
        ACCELERATION_INCLUDING_GRAVITY_Z: "accelerationIncludingGravityZ",
        ROTATION_RATE_ALPHA: "rotationRateAlpha",
        ROTATION_RATE_BETA: "rotationRateBeta",
        ROTATION_RATE_GAMMA: "rotationRateGamma"
      }),
      (a.FULLTILT = t);
  }
})(window);

/* gyronorm.js v2.0.6 - https://github.com/dorukeker/gyronorm.git*/
!(function(a, b) {
  var c = { GyroNorm: b() };
  "function" == typeof define && define.amd
    ? define(function() {
        return c;
      })
    : "object" == typeof module && module.exports
    ? (module.exports = c)
    : (a.GyroNorm = c.GyroNorm);
})(this, function() {
  function a(a) {
    return Math.round(a * Math.pow(10, t)) / Math.pow(10, t);
  }
  function b() {
    var b = {};
    b = v ? o.getScreenAdjustedEuler() : o.getFixedFrameEuler();
    var c = p.getScreenAdjustedAcceleration(),
      e = p.getScreenAdjustedAccelerationIncludingGravity(),
      f = p.getScreenAdjustedRotationRate(),
      g = 0;
    s === d
      ? ((g = b.alpha - k), (g = 0 > g ? 360 - Math.abs(g) : g))
      : (g = b.alpha);
    var h = {
      do: {
        alpha: a(g),
        beta: a(b.beta),
        gamma: a(b.gamma),
        absolute: o.isAbsolute()
      },
      dm: {
        x: a(c.x),
        y: a(c.y),
        z: a(c.z),
        gx: a(e.x),
        gy: a(e.y),
        gz: a(e.z),
        alpha: a(f.alpha),
        beta: a(f.beta),
        gamma: a(f.gamma)
      }
    };
    return r && ((h.dm.gx *= l), (h.dm.gy *= l), (h.dm.gz *= l)), h;
  }
  function c(a) {
    u && ("string" == typeof a && (a = { message: a, code: 0 }), u(a));
  }
  var d = "game",
    e = "world",
    f = "deviceorientation",
    g = "acceleration",
    h = "accelerationinludinggravity",
    i = "rotationrate",
    j = null,
    k = 0,
    l = 0,
    m = !1,
    n = !1,
    o = null,
    p = null,
    q = 50,
    r = !0,
    s = d,
    t = 2,
    u = null,
    v = !1,
    w = function(a) {};
  return (
    (w.GAME = d),
    (w.WORLD = e),
    (w.DEVICE_ORIENTATION = f),
    (w.ACCELERATION = g),
    (w.ACCELERATION_INCLUDING_GRAVITY = h),
    (w.ROTATION_RATE = i),
    (w.prototype.init = function(a) {
      a && a.frequency && (q = a.frequency),
        a && a.gravityNormalized && (r = a.gravityNormalized),
        a && a.orientationBase && (s = a.orientationBase),
        a &&
          "number" == typeof a.decimalCount &&
          a.decimalCount >= 0 &&
          (t = parseInt(a.decimalCount)),
        a && a.logger && (u = a.logger),
        a && a.screenAdjusted && (v = a.screenAdjusted);
      var b = new FULLTILT.getDeviceOrientation({ type: s }).then(function(a) {
          o = a;
        }),
        c = new FULLTILT.getDeviceMotion().then(function(a) {
          (p = a),
            (l =
              p.getScreenAdjustedAccelerationIncludingGravity().z > 0 ? -1 : 1);
        });
      return Promise.all([b, c]).then(function() {
        n = !0;
      });
    }),
    (w.prototype.end = function() {
      try {
        (n = !1), this.stop(), p.stop(), o.stop();
      } catch (a) {
        c(a);
      }
    }),
    (w.prototype.start = function(a) {
      return n
        ? ((j = setInterval(function() {
            a(b());
          }, q)),
          void (m = !0))
        : void c({
            message:
              'GyroNorm is not initialized yet. First call the "init()" function.',
            code: 1
          });
    }),
    (w.prototype.stop = function() {
      j && (clearInterval(j), (m = !1));
    }),
    (w.prototype.normalizeGravity = function(a) {
      r = a ? !0 : !1;
    }),
    (w.prototype.setHeadDirection = function() {
      return v || s === e ? !1 : ((k = o.getFixedFrameEuler().alpha), !0);
    }),
    (w.prototype.startLogging = function(a) {
      a && (u = a);
    }),
    (w.prototype.stopLogging = function() {
      u = null;
    }),
    (w.prototype.isAvailable = function(a) {
      var b = o.getScreenAdjustedEuler(),
        c = p.getScreenAdjustedAcceleration(),
        d = p.getScreenAdjustedAccelerationIncludingGravity(),
        e = p.getScreenAdjustedRotationRate();
      switch (a) {
        case f:
          return (
            b.alpha &&
            null !== b.alpha &&
            b.beta &&
            null !== b.beta &&
            b.gamma &&
            null !== b.gamma
          );
        case g:
          return c && c.x && c.y && c.z;
        case h:
          return d && d.x && d.y && d.z;
        case i:
          return e && e.alpha && e.beta && e.gamma;
        default:
          return {
            deviceOrientationAvailable:
              b.alpha &&
              null !== b.alpha &&
              b.beta &&
              null !== b.beta &&
              b.gamma &&
              null !== b.gamma,
            accelerationAvailable: c && c.x && c.y && c.z,
            accelerationIncludingGravityAvailable: d && d.x && d.y && d.z,
            rotationRateAvailable: e && e.alpha && e.beta && e.gamma
          };
      }
    }),
    (w.prototype.isRunning = function() {
      return m;
    }),
    w
  );
});
