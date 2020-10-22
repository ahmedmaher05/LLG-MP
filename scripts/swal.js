!(function (t, e) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = e() : typeof define === 'function' && define.amd ? define(e) : t.Sweetalert2 = e()
}(this, function () {
  'use strict'

  function w (t) {
    return (w = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (t) {
      return typeof t
    } : function (t) {
      return t && typeof Symbol === 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t
    })(t)
  }

  function o (t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
  }

  function i (t, e) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n]
      o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
    }
  }

  function r (t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t
  }

  function a () {
    return (a = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e]
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
      }
      return t
    }).apply(this, arguments)
  }

  function s (t) {
    return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t)
    })(t)
  }

  function u (t, e) {
    return (u = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t
    })(t, e)
  }

  function c (t, e, n) {
    return (c = (function () {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if (typeof Proxy === 'function') return !0
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0
      } catch (t) {
        return !1
      }
    }()) ? Reflect.construct : function (t, e, n) {
        var o = [null]
        o.push.apply(o, e)
        var i = new (Function.bind.apply(t, o))()
        return n && u(i, n.prototype), i
      }).apply(null, arguments)
  }

  function l (t, e) {
    return !e || typeof e !== 'object' && typeof e !== 'function' ? (function (t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      return t
    }(t)) : e
  }

  function d (t, e, n) {
    return (d = typeof Reflect !== 'undefined' && Reflect.get ? Reflect.get : function (t, e, n) {
      var o = (function (t, e) {
        for (; !Object.prototype.hasOwnProperty.call(t, e) && (t = s(t)) !== null;);
        return t
      }(t, e))
      if (o) {
        var i = Object.getOwnPropertyDescriptor(o, e)
        return i.get ? i.get.call(n) : i.value
      }
    })(t, e, n || t)
  }
  var e = 'SweetAlert2:'
  var p = function (e) {
    return Object.keys(e).map(function (t) {
      return e[t]
    })
  }
  var f = function (t) {
    return Array.prototype.slice.call(t)
  }
  var m = function (t) {
    console.warn(''.concat(e, ' ').concat(t))
  }
  var C = function (t) {
    console.error(''.concat(e, ' ').concat(t))
  }
  var g = []
  var k = function (t, e) {
    var n
    n = '"'.concat(t, '" is deprecated and will be removed in the next major release. Please use "').concat(e, '" instead.'), g.indexOf(n) === -1 && (g.push(n), m(n))
  }
  var B = function (t) {
    return typeof t === 'function' ? t() : t
  }
  var x = function (t) {
    return t && Promise.resolve(t) === t
  }
  var t = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  })
  var n = function (t) {
    var e = {}
    for (var n in t) e[t[n]] = 'swal2-' + t[n]
    return e
  }
  var S = n(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'toast-column', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl'])
  var h = n(['success', 'warning', 'info', 'question', 'error'])
  var v = {
    previousBodyPadding: null
  }
  var b = function (t, e) {
    return t.classList.contains(e)
  }
  var y = function (e, t, n) {
    f(e.classList).forEach(function (t) {
      p(S).indexOf(t) === -1 && p(h).indexOf(t) === -1 && e.classList.remove(t)
    }), t && t[n] && O(e, t[n])
  }

  function A (t, e) {
    if (!e) return null
    switch (e) {
      case 'select':
      case 'textarea':
      case 'file':
        return M(t, S[e])
      case 'checkbox':
        return t.querySelector('.'.concat(S.checkbox, ' input'))
      case 'radio':
        return t.querySelector('.'.concat(S.radio, ' input:checked')) || t.querySelector('.'.concat(S.radio, ' input:first-child'))
      case 'range':
        return t.querySelector('.'.concat(S.range, ' input'))
      default:
        return M(t, S.input)
    }
  }
  var P; var L = function (t) {
    if (t.focus(), t.type !== 'file') {
      var e = t.value
      t.value = '', t.value = e
    }
  }
  var E = function (t, e, n) {
    t && e && (typeof e === 'string' && (e = e.split(/\s+/).filter(Boolean)), e.forEach(function (e) {
      t.forEach ? t.forEach(function (t) {
        n ? t.classList.add(e) : t.classList.remove(e)
      }) : n ? t.classList.add(e) : t.classList.remove(e)
    }))
  }
  var O = function (t, e) {
    E(t, e, !0)
  }
  var T = function (t, e) {
    E(t, e, !1)
  }
  var M = function (t, e) {
    for (var n = 0; n < t.childNodes.length; n++) { if (b(t.childNodes[n], e)) return t.childNodes[n] }
  }
  var V = function (t, e, n) {
    n || parseInt(n) === 0 ? t.style[e] = typeof n === 'number' ? n + 'px' : n : t.style.removeProperty(e)
  }
  var j = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'flex'
    t.style.opacity = '', t.style.display = e
  }
  var q = function (t) {
    t.style.opacity = '', t.style.display = 'none'
  }
  var I = function (t, e, n) {
    e ? j(t, n) : q(t)
  }
  var H = function (t) {
    return !(!t || !(t.offsetWidth || t.offsetHeight || t.getClientRects().length))
  }
  var R = function () {
    return document.body.querySelector('.' + S.container)
  }
  var D = function (t) {
    var e = R()
    return e ? e.querySelector(t) : null
  }
  var N = function (t) {
    return D('.' + t)
  }
  var U = function () {
    return N(S.popup)
  }
  var _ = function () {
    var t = U()
    return f(t.querySelectorAll('.' + S.icon))
  }
  var z = function () {
    var t = _().filter(function (t) {
      return H(t)
    })
    return t.length ? t[0] : null
  }
  var W = function () {
    return N(S.title)
  }
  var K = function () {
    return N(S.content)
  }
  var F = function () {
    return N(S.image)
  }
  var Z = function () {
    return N(S['progress-steps'])
  }
  var Q = function () {
    return N(S['validation-message'])
  }
  var Y = function () {
    return D('.' + S.actions + ' .' + S.confirm)
  }
  var $ = function () {
    return D('.' + S.actions + ' .' + S.cancel)
  }
  var J = function () {
    return N(S.actions)
  }
  var X = function () {
    return N(S.header)
  }
  var G = function () {
    return N(S.footer)
  }
  var tt = function () {
    return N(S.close)
  }
  var et = function () {
    var t = f(U().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function (t, e) {
      return t = parseInt(t.getAttribute('tabindex')), (e = parseInt(e.getAttribute('tabindex'))) < t ? 1 : t < e ? -1 : 0
    })
    var e = f(U().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')).filter(function (t) {
      return t.getAttribute('tabindex') !== '-1'
    })
    return (function (t) {
      for (var e = [], n = 0; n < t.length; n++) e.indexOf(t[n]) === -1 && e.push(t[n])
      return e
    }(t.concat(e))).filter(function (t) {
      return H(t)
    })
  }
  var nt = function () {
    return !ot() && !document.body.classList.contains(S['no-backdrop'])
  }
  var ot = function () {
    return document.body.classList.contains(S['toast-shown'])
  }
  var it = function () {
    return typeof window === 'undefined' || typeof document === 'undefined'
  }
  var rt = '\n <div aria-labelledby="'.concat(S.title, '" aria-describedby="').concat(S.content, '" class="').concat(S.popup, '" tabindex="-1">\n   <div class="').concat(S.header, '">\n     <ul class="').concat(S['progress-steps'], '"></ul>\n     <div class="').concat(S.icon, ' ').concat(h.error, '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="').concat(S.icon, ' ').concat(h.question, '"></div>\n     <div class="').concat(S.icon, ' ').concat(h.warning, '"></div>\n     <div class="').concat(S.icon, ' ').concat(h.info, '"></div>\n     <div class="').concat(S.icon, ' ').concat(h.success, '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="').concat(S.image, '" />\n     <h2 class="').concat(S.title, '" id="').concat(S.title, '"></h2>\n     <button type="button" class="').concat(S.close, '">&times;</button>\n   </div>\n   <div class="').concat(S.content, '">\n     <div id="').concat(S.content, '"></div>\n     <input class="').concat(S.input, '" />\n     <input type="file" class="').concat(S.file, '" />\n     <div class="').concat(S.range, '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(S.select, '"></select>\n     <div class="').concat(S.radio, '"></div>\n     <label for="').concat(S.checkbox, '" class="').concat(S.checkbox, '">\n       <input type="checkbox" />\n       <span class="').concat(S.label, '"></span>\n     </label>\n     <textarea class="').concat(S.textarea, '"></textarea>\n     <div class="').concat(S['validation-message'], '" id="').concat(S['validation-message'], '"></div>\n   </div>\n   <div class="').concat(S.actions, '">\n     <button type="button" class="').concat(S.confirm, '">OK</button>\n     <button type="button" class="').concat(S.cancel, '">Cancel</button>\n   </div>\n   <div class="').concat(S.footer, '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '')
  var at = function (t) {
    se.isVisible() && P !== t.target.value && se.resetValidationMessage(), P = t.target.value
  }
  var st = function (t) {
    var e
    if ((e = R()) && (e.parentNode.removeChild(e), T([document.documentElement, document.body], [S['no-backdrop'], S['toast-shown'], S['has-column']])), it()) C('SweetAlert2 requires document to initialize')
    else {
      var n = document.createElement('div')
      n.className = S.container, n.innerHTML = rt
      var o; var i; var r; var a; var s; var u; var c; var l; var d; var p; var f; var m; var g = typeof (o = t.target) === 'string' ? document.querySelector(o) : o
      g.appendChild(n), i = t, (r = U()).setAttribute('role', i.toast ? 'alert' : 'dialog'), r.setAttribute('aria-live', i.toast ? 'polite' : 'assertive'), i.toast || r.setAttribute('aria-modal', 'true'), a = g, window.getComputedStyle(a).direction === 'rtl' && O(R(), S.rtl), s = K(), u = M(s, S.input), c = M(s, S.file), l = s.querySelector('.'.concat(S.range, ' input')), d = s.querySelector('.'.concat(S.range, ' output')), p = M(s, S.select), f = s.querySelector('.'.concat(S.checkbox, ' input')), m = M(s, S.textarea), u.oninput = at, c.onchange = at, p.onchange = at, f.onchange = at, m.oninput = at, l.oninput = function (t) {
        at(t), d.value = l.value
      }, l.onchange = function (t) {
        at(t), l.nextSibling.value = l.value
      }
    }
  }
  var ut = function (t, e) {
    t instanceof HTMLElement ? e.appendChild(t) : w(t) === 'object' ? ct(e, t) : t && (e.innerHTML = t)
  }
  var ct = function (t, e) {
    if (t.innerHTML = '', 0 in e) { for (var n = 0; n in e; n++) t.appendChild(e[n].cloneNode(!0)) } else t.appendChild(e.cloneNode(!0))
  }
  var lt = (function () {
    if (it()) return !1
    var t = document.createElement('div')
    var e = {
      WebkitAnimation: 'webkitAnimationEnd',
      OAnimation: 'oAnimationEnd oanimationend',
      animation: 'animationend'
    }
    for (var n in e) { if (e.hasOwnProperty(n) && void 0 !== t.style[n]) return e[n] }
    return !1
  }())

  function dt (t, e, n) {
    I(t, n['showC' + e.substring(1) + 'Button'], 'inline-block'), t.innerHTML = n[e + 'ButtonText'], t.setAttribute('aria-label', n[e + 'ButtonAriaLabel']), t.className = S[e], y(t, n.customClass, e + 'Button'), O(t, n[e + 'ButtonClass'])
  }
  var pt = function (t, e) {
    var n = J()
    var o = Y()
    var i = $()
    e.showConfirmButton || e.showCancelButton ? j(n) : q(n), y(n, e.customClass, 'actions'), dt(o, 'confirm', e), dt(i, 'cancel', e), e.buttonsStyling ? (function (t, e, n) {
      O([t, e], S.styled), n.confirmButtonColor && (t.style.backgroundColor = n.confirmButtonColor), n.cancelButtonColor && (e.style.backgroundColor = n.cancelButtonColor)
      var o = window.getComputedStyle(t).getPropertyValue('background-color')
      t.style.borderLeftColor = o, t.style.borderRightColor = o
    }(o, i, e)) : (T([o, i], S.styled), o.style.backgroundColor = o.style.borderLeftColor = o.style.borderRightColor = '', i.style.backgroundColor = i.style.borderLeftColor = i.style.borderRightColor = '')
  }
  var ft = function (t, e) {
    var n; var o; var i; var r; var a = R()
    a && (n = a, typeof (o = e.backdrop) === 'string' ? n.style.background = o : o || O([document.documentElement, document.body], S['no-backdrop']), !e.backdrop && e.allowOutsideClick && m('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'), i = a, (r = e.position) in S ? O(i, S[r]) : (m('The "position" parameter is not valid, defaulting to "center"'), O(i, S.center)), (function (t, e) {
      if (e && typeof e === 'string') {
        var n = 'grow-' + e
        n in S && O(t, S[n])
      }
    }(a, e.grow)), y(a, e.customClass, 'container'), e.customContainerClass && O(a, e.customContainerClass))
  }
  var mt = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap()
  }
  var gt = function (t, e) {
    var n = A(K(), t)
    if (n) {
      for (var o in (function (t) {
        for (var e = 0; e < t.attributes.length; e++) {
          var n = t.attributes[e].name; ['type', 'value', 'style'].indexOf(n) === -1 && t.removeAttribute(n)
        }
      }(n)), e) t === 'range' && o === 'placeholder' || n.setAttribute(o, e[o])
    }
  }
  var ht = function (t, e, n) {
    t.className = e, n.inputClass && O(t, n.inputClass), n.customClass && O(t, n.customClass.input)
  }
  var vt = function (t, e) {
    t.placeholder && !e.inputPlaceholder || (t.placeholder = e.inputPlaceholder)
  }
  var bt = {}
  bt.text = bt.email = bt.password = bt.number = bt.tel = bt.url = function (t) {
    var e = M(K(), S.input)
    return typeof t.inputValue === 'string' || typeof t.inputValue === 'number' ? e.value = t.inputValue : x(t.inputValue) || m('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(w(t.inputValue), '"')), vt(e, t), e.type = t.input, e
  }, bt.file = function (t) {
    var e = M(K(), S.file)
    return vt(e, t), e.type = t.input, e
  }, bt.range = function (t) {
    var e = M(K(), S.range)
    var n = e.querySelector('input')
    var o = e.querySelector('output')
    return n.value = t.inputValue, n.type = t.input, o.value = t.inputValue, e
  }, bt.select = function (t) {
    var e = M(K(), S.select)
    if (e.innerHTML = '', t.inputPlaceholder) {
      var n = document.createElement('option')
      n.innerHTML = t.inputPlaceholder, n.value = '', n.disabled = !0, n.selected = !0, e.appendChild(n)
    }
    return e
  }, bt.radio = function () {
    var t = M(K(), S.radio)
    return t.innerHTML = '', t
  }, bt.checkbox = function (t) {
    var e = M(K(), S.checkbox)
    var n = A(K(), 'checkbox')
    return n.type = 'checkbox', n.value = 1, n.id = S.checkbox, n.checked = Boolean(t.inputValue), e.querySelector('span').innerHTML = t.inputPlaceholder, e
  }, bt.textarea = function (t) {
    var e = M(K(), S.textarea)
    return e.value = t.inputValue, vt(e, t), e
  }
  var yt = function (t, e) {
    var n = K().querySelector('#' + S.content)
    e.html ? (ut(e.html, n), j(n, 'block')) : e.text ? (n.textContent = e.text, j(n, 'block')) : q(n),
    (function (t, e) {
      for (var n = mt.innerParams.get(t), o = !n || e.input !== n.input, i = K(), r = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'], a = 0; a < r.length; a++) {
        var s = S[r[a]]
        var u = M(i, s)
        gt(r[a], e.inputAttributes), ht(u, s, e), o && q(u)
      }
      if (e.input) {
        if (!bt[e.input]) return C('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input, '"'))
        if (o) {
          var c = bt[e.input](e)
          j(c)
        }
      }
    }(t, e)), y(K(), e.customClass, 'content')
  }
  var wt = function () {
    for (var t = _(), e = 0; e < t.length; e++) q(t[e])
  }
  var Ct = function () {
    for (var t = U(), e = window.getComputedStyle(t).getPropertyValue('background-color'), n = t.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix'), o = 0; o < n.length; o++) n[o].style.backgroundColor = e
  }
  var kt = function (t, u) {
    var c = Z()
    if (!u.progressSteps || u.progressSteps.length === 0) return q(c)
    j(c), c.innerHTML = ''
    var l = parseInt(u.currentProgressStep === null ? se.getQueueStep() : u.currentProgressStep)
    l >= u.progressSteps.length && m('Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)'), u.progressSteps.forEach(function (t, e) {
      var n; var o; var i; var r; var a = (n = t, o = document.createElement('li'), O(o, S['progress-step']), o.innerHTML = n, o)
      if (c.appendChild(a), e === l && O(a, S['active-progress-step']), e !== u.progressSteps.length - 1) {
        var s = (i = t, r = document.createElement('li'), O(r, S['progress-step-line']), i.progressStepsDistance && (r.style.width = i.progressStepsDistance), r)
        c.appendChild(s)
      }
    })
  }
  var Bt = function (t, e) {
    var n; var o; var i; var r; var a = X()
    y(a, e.customClass, 'header'), kt(0, e),
    (function (t, e) {
      var n = mt.innerParams.get(t)
      if (n && e.type === n.type && z()) y(z(), e.customClass, 'icon')
      else if (wt(), e.type) {
        if (Ct(), Object.keys(h).indexOf(e.type) !== -1) {
          var o = D('.'.concat(S.icon, '.').concat(h[e.type]))
          j(o), y(o, e.customClass, 'icon'), E(o, 'swal2-animate-'.concat(e.type, '-icon'), e.animation)
        } else C('Unknown type! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.type, '"'))
      }
    }(t, e)),
    (function (t, e) {
      var n = F()
      if (!e.imageUrl) return q(n)
      j(n), n.setAttribute('src', e.imageUrl), n.setAttribute('alt', e.imageAlt), V(n, 'width', e.imageWidth), V(n, 'height', e.imageHeight), n.className = S.image, y(n, e.customClass, 'image'), e.imageClass && O(n, e.imageClass)
    }(0, e)), n = e, o = W(), I(o, n.title || n.titleText), n.title && ut(n.title, o), n.titleText && (o.innerText = n.titleText), y(o, n.customClass, 'title'), i = e, r = tt(), y(r, i.customClass, 'closeButton'), I(r, i.showCloseButton), r.setAttribute('aria-label', i.closeButtonAriaLabel)
  }
  var xt = function (t, e) {
    var n, o, i, r
    n = e, o = U(), V(o, 'width', n.width), V(o, 'padding', n.padding), n.background && (o.style.background = n.background), o.className = S.popup, n.toast ? (O([document.documentElement, document.body], S['toast-shown']), O(o, S.toast)) : O(o, S.modal), y(o, n.customClass, 'popup'), typeof n.customClass === 'string' && O(o, n.customClass), E(o, S.noanimation, !n.animation), ft(0, e), Bt(t, e), yt(t, e), pt(0, e), i = e, r = G(), I(r, i.footer), i.footer && ut(i.footer, r), y(r, i.customClass, 'footer')
  }
  var St = []
  var At = function () {
    var t = U()
    t || se.fire(''), t = U()
    var e = J()
    var n = Y()
    var o = $()
    j(e), j(n), O([t, e], S.loading), n.disabled = !0, o.disabled = !0, t.setAttribute('data-loading', !0), t.setAttribute('aria-busy', !0), t.focus()
  }
  var Pt = {}
  var Lt = function () {
    return new Promise(function (t) {
      var e = window.scrollX
      var n = window.scrollY
      Pt.restoreFocusTimeout = setTimeout(function () {
        Pt.previousActiveElement && Pt.previousActiveElement.focus ? (Pt.previousActiveElement.focus(), Pt.previousActiveElement = null) : document.body && document.body.focus(), t()
      }, 100), void 0 !== e && void 0 !== n && window.scrollTo(e, n)
    })
  }
  var Et = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    type: null,
    toast: !1,
    customClass: '',
    customContainerClass: '',
    target: 'body',
    backdrop: !0,
    animation: !0,
    heightAuto: !0,
    allowOutsideClick: !0,
    allowEscapeKey: !0,
    allowEnterKey: !0,
    stopKeydownPropagation: !0,
    keydownListenerCapture: !1,
    showConfirmButton: !0,
    showCancelButton: !1,
    preConfirm: null,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: null,
    confirmButtonClass: '',
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: null,
    cancelButtonClass: '',
    buttonsStyling: !0,
    reverseButtons: !1,
    focusConfirm: !0,
    focusCancel: !1,
    showCloseButton: !1,
    closeButtonAriaLabel: 'Close this dialog',
    showLoaderOnConfirm: !1,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    imageAlt: '',
    imageClass: '',
    timer: null,
    width: null,
    padding: null,
    background: null,
    input: null,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: !0,
    inputClass: '',
    inputAttributes: {},
    inputValidator: null,
    validationMessage: null,
    grow: !1,
    position: 'center',
    progressSteps: [],
    currentProgressStep: null,
    progressStepsDistance: null,
    onBeforeOpen: null,
    onAfterClose: null,
    onOpen: null,
    onClose: null,
    scrollbarPadding: !0
  }
  var Ot = ['title', 'titleText', 'text', 'html', 'type', 'customClass', 'showConfirmButton', 'showCancelButton', 'confirmButtonText', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonClass', 'cancelButtonText', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonClass', 'buttonsStyling', 'reverseButtons', 'imageUrl', 'imageWidth', 'imageHeigth', 'imageAlt', 'imageClass', 'progressSteps', 'currentProgressStep']
  var Tt = {
    customContainerClass: 'customClass',
    confirmButtonClass: 'customClass',
    cancelButtonClass: 'customClass',
    imageClass: 'customClass',
    inputClass: 'customClass'
  }
  var Mt = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusCancel', 'heightAuto', 'keydownListenerCapture']
  var Vt = function (t) {
    return Et.hasOwnProperty(t)
  }
  var jt = function (t) {
    return Tt[t]
  }
  var qt = Object.freeze({
    isValidParameter: Vt,
    isUpdatableParameter: function (t) {
      return Ot.indexOf(t) !== -1
    },
    isDeprecatedParameter: jt,
    argsToParams: function (n) {
      var o = {}
      switch (w(n[0])) {
        case 'object':
          a(o, n[0])
          break
        default:
          ['title', 'html', 'type'].forEach(function (t, e) {
            switch (w(n[e])) {
              case 'string':
                o[t] = n[e]
                break
              case 'undefined':
                break
              default:
                C('Unexpected type of '.concat(t, '! Expected "string", got ').concat(w(n[e])))
            }
          })
      }
      return o
    },
    isVisible: function () {
      return H(U())
    },
    clickConfirm: function () {
      return Y() && Y().click()
    },
    clickCancel: function () {
      return $() && $().click()
    },
    getContainer: R,
    getPopup: U,
    getTitle: W,
    getContent: K,
    getImage: F,
    getIcon: z,
    getIcons: _,
    getCloseButton: tt,
    getActions: J,
    getConfirmButton: Y,
    getCancelButton: $,
    getHeader: X,
    getFooter: G,
    getFocusableElements: et,
    getValidationMessage: Q,
    isLoading: function () {
      return U().hasAttribute('data-loading')
    },
    fire: function () {
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n]
      return c(this, e)
    },
    mixin: function (n) {
      return (function (t) {
        function e () {
          return o(this, e), l(this, s(e).apply(this, arguments))
        }
        return (function (t, e) {
          if (typeof e !== 'function' && e !== null) throw new TypeError('Super expression must either be null or a function')
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), e && u(t, e)
        }(e, t)), r(e, [{
          key: '_main',
          value: function (t) {
            return d(s(e.prototype), '_main', this).call(this, a({}, n, t))
          }
        }]), e
      }(this))
    },
    queue: function (t) {
      var r = this
      St = t
      var a = function (t, e) {
        St = [], document.body.removeAttribute('data-swal2-queue-step'), t(e)
      }
      var s = []
      return new Promise(function (i) {
        !(function e (n, o) {
          n < St.length ? (document.body.setAttribute('data-swal2-queue-step', n), r.fire(St[n]).then(function (t) {
            void 0 !== t.value ? (s.push(t.value), e(n + 1, o)) : a(i, {
              dismiss: t.dismiss
            })
          })) : a(i, {
            value: s
          })
        }(0))
      })
    },
    getQueueStep: function () {
      return document.body.getAttribute('data-swal2-queue-step')
    },
    insertQueueStep: function (t, e) {
      return e && e < St.length ? St.splice(e, 0, t) : St.push(t)
    },
    deleteQueueStep: function (t) {
      void 0 !== St[t] && St.splice(t, 1)
    },
    showLoading: At,
    enableLoading: At,
    getTimerLeft: function () {
      return Pt.timeout && Pt.timeout.getTimerLeft()
    },
    stopTimer: function () {
      return Pt.timeout && Pt.timeout.stop()
    },
    resumeTimer: function () {
      return Pt.timeout && Pt.timeout.start()
    },
    toggleTimer: function () {
      var t = Pt.timeout
      return t && (t.running ? t.stop() : t.start())
    },
    increaseTimer: function (t) {
      return Pt.timeout && Pt.timeout.increase(t)
    },
    isTimerRunning: function () {
      return Pt.timeout && Pt.timeout.isRunning()
    }
  })

  function It () {
    var t = mt.innerParams.get(this)
    var e = mt.domCache.get(this)
    t.showConfirmButton || (q(e.confirmButton), t.showCancelButton || q(e.actions)), T([e.popup, e.actions], S.loading), e.popup.removeAttribute('aria-busy'), e.popup.removeAttribute('data-loading'), e.confirmButton.disabled = !1, e.cancelButton.disabled = !1
  }
  var Ht = function () {
    v.previousBodyPadding === null && document.body.scrollHeight > window.innerHeight && (v.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right')), document.body.style.paddingRight = v.previousBodyPadding + (function () {
      if ('ontouchstart' in window || navigator.msMaxTouchPoints) return 0
      var t = document.createElement('div')
      t.style.width = '50px', t.style.height = '50px', t.style.overflow = 'scroll', document.body.appendChild(t)
      var e = t.offsetWidth - t.clientWidth
      return document.body.removeChild(t), e
    }()) + 'px')
  }
  var Rt = function () {
    v.previousBodyPadding !== null && (document.body.style.paddingRight = v.previousBodyPadding + 'px', v.previousBodyPadding = null)
  }
  var Dt = function () {
    if (b(document.body, S.iosfix)) {
      var t = parseInt(document.body.style.top, 10)
      T(document.body, S.iosfix), document.body.style.top = '', document.body.scrollTop = -1 * t
    }
  }
  var Nt = function () {
    return !!window.MSInputMethodContext && !!document.documentMode
  }
  var Ut = function () {
    var t = R()
    var e = U()
    t.style.removeProperty('align-items'), e.offsetTop < 0 && (t.style.alignItems = 'flex-start')
  }
  var _t = function () {
    typeof window !== 'undefined' && Nt() && window.removeEventListener('resize', Ut)
  }
  var zt = function () {
    f(document.body.children).forEach(function (t) {
      t.hasAttribute('data-previous-aria-hidden') ? (t.setAttribute('aria-hidden', t.getAttribute('data-previous-aria-hidden')), t.removeAttribute('data-previous-aria-hidden')) : t.removeAttribute('aria-hidden')
    })
  }
  var Wt = {
    swalPromiseResolve: new WeakMap()
  }

  function Kt (t, e) {
    ot() ? Qt(e) : (Lt().then(function () {
      return Qt(e)
    }), Pt.keydownTarget.removeEventListener('keydown', Pt.keydownHandler, {
      capture: Pt.keydownListenerCapture
    }), Pt.keydownHandlerAdded = !1), t.parentNode && t.parentNode.removeChild(t), T([document.documentElement, document.body], [S.shown, S['height-auto'], S['no-backdrop'], S['toast-shown'], S['toast-column']]), nt() && (Rt(), Dt(), _t(), zt())
  }

  function Ft (t, e, n) {
    t.removeEventListener(lt, Ft), b(t, S.hide) && Kt(e, n)
  }

  function Zt (t) {
    var e = R()
    var n = U()
    var o = mt.innerParams.get(this)
    var i = Wt.swalPromiseResolve.get(this)
    var r = o.onClose
    var a = o.onAfterClose
    n && (r !== null && typeof r === 'function' && r(n), T(n, S.show), O(n, S.hide), lt && !b(n, S.noanimation) ? n.addEventListener(lt, Ft.bind(null, n, e, a)) : Kt(e, a), i(t || {}))
  }
  var Qt = function (t) {
    t !== null && typeof t === 'function' && setTimeout(function () {
      t()
    })
  }

  function Yt (t, e, n) {
    var o = mt.domCache.get(t)
    e.forEach(function (t) {
      o[t].disabled = n
    })
  }

  function $t (t, e) {
    if (!t) return !1
    if (t.type === 'radio') { for (var n = t.parentNode.parentNode.querySelectorAll('input'), o = 0; o < n.length; o++) n[o].disabled = e } else t.disabled = e
  }
  var Jt = (function () {
    function n (t, e) {
      o(this, n), this.callback = t, this.remaining = e, this.running = !1, this.start()
    }
    return r(n, [{
      key: 'start',
      value: function () {
        return this.running || (this.running = !0, this.started = new Date(), this.id = setTimeout(this.callback, this.remaining)), this.remaining
      }
    }, {
      key: 'stop',
      value: function () {
        return this.running && (this.running = !1, clearTimeout(this.id), this.remaining -= new Date() - this.started), this.remaining
      }
    }, {
      key: 'increase',
      value: function (t) {
        var e = this.running
        return e && this.stop(), this.remaining += t, e && this.start(), this.remaining
      }
    }, {
      key: 'getTimerLeft',
      value: function () {
        return this.running && (this.stop(), this.start()), this.remaining
      }
    }, {
      key: 'isRunning',
      value: function () {
        return this.running
      }
    }]), n
  }())
  var Xt = {
    email: function (t, e) {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t) ? Promise.resolve() : Promise.resolve(e || 'Invalid email address')
    },
    url: function (t, e) {
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(t) ? Promise.resolve() : Promise.resolve(e || 'Invalid URL')
    }
  }

  function Gt (t, e) {
    t.removeEventListener(lt, Gt), e.style.overflowY = 'auto'
  }
  var te = function (t) {
    var e = R()
    var n = U()
    t.onBeforeOpen !== null && typeof t.onBeforeOpen === 'function' && t.onBeforeOpen(n), t.animation && (O(n, S.show), O(e, S.fade)), j(n), lt && !b(n, S.noanimation) ? (e.style.overflowY = 'hidden', n.addEventListener(lt, Gt.bind(null, n, e))) : e.style.overflowY = 'auto', O([document.documentElement, document.body, e], S.shown), t.heightAuto && t.backdrop && !t.toast && O([document.documentElement, document.body], S['height-auto']), nt() && (t.scrollbarPadding && Ht(), (function () {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !b(document.body, S.iosfix)) {
        var t = document.body.scrollTop
        document.body.style.top = -1 * t + 'px', O(document.body, S.iosfix)
      }
    }()), typeof window !== 'undefined' && Nt() && (Ut(), window.addEventListener('resize', Ut)), f(document.body.children).forEach(function (t) {
      t === R() || (function (t, e) {
        if (typeof t.contains === 'function') return t.contains(e)
      }(t, R())) || (t.hasAttribute('aria-hidden') && t.setAttribute('data-previous-aria-hidden', t.getAttribute('aria-hidden')), t.setAttribute('aria-hidden', 'true'))
    }), setTimeout(function () {
      e.scrollTop = 0
    })), ot() || Pt.previousActiveElement || (Pt.previousActiveElement = document.activeElement), t.onOpen !== null && typeof t.onOpen === 'function' && setTimeout(function () {
      t.onOpen(n)
    })
  }
  var ee = void 0
  var ne = {
    select: function (t, e, i) {
      var r = M(t, S.select)
      e.forEach(function (t) {
        var e = t[0]
        var n = t[1]
        var o = document.createElement('option')
        o.value = e, o.innerHTML = n, i.inputValue.toString() === e.toString() && (o.selected = !0), r.appendChild(o)
      }), r.focus()
    },
    radio: function (t, e, a) {
      var s = M(t, S.radio)
      e.forEach(function (t) {
        var e = t[0]
        var n = t[1]
        var o = document.createElement('input')
        var i = document.createElement('label')
        o.type = 'radio', o.name = S.radio, o.value = e, a.inputValue.toString() === e.toString() && (o.checked = !0)
        var r = document.createElement('span')
        r.innerHTML = n, r.className = S.label, i.appendChild(o), i.appendChild(r), s.appendChild(i)
      })
      var n = s.querySelectorAll('input')
      n.length && n[0].focus()
    }
  }
  var oe = function (e) {
    var n = []
    return typeof Map !== 'undefined' && e instanceof Map ? e.forEach(function (t, e) {
      n.push([e, t])
    }) : Object.keys(e).forEach(function (t) {
      n.push([t, e[t]])
    }), n
  }
  var ie; var re = Object.freeze({
    hideLoading: It,
    disableLoading: It,
    getInput: function (t) {
      var e = mt.innerParams.get(t || this)
      return A(mt.domCache.get(t || this).content, e.input)
    },
    close: Zt,
    closePopup: Zt,
    closeModal: Zt,
    closeToast: Zt,
    enableButtons: function () {
      Yt(this, ['confirmButton', 'cancelButton'], !1)
    },
    disableButtons: function () {
      Yt(this, ['confirmButton', 'cancelButton'], !0)
    },
    enableConfirmButton: function () {
      k('Swal.disableConfirmButton()', "Swal.getConfirmButton().removeAttribute('disabled')"), Yt(this, ['confirmButton'], !1)
    },
    disableConfirmButton: function () {
      k('Swal.enableConfirmButton()', "Swal.getConfirmButton().setAttribute('disabled', '')"), Yt(this, ['confirmButton'], !0)
    },
    enableInput: function () {
      return $t(this.getInput(), !1)
    },
    disableInput: function () {
      return $t(this.getInput(), !0)
    },
    showValidationMessage: function (t) {
      var e = mt.domCache.get(this)
      e.validationMessage.innerHTML = t
      var n = window.getComputedStyle(e.popup)
      e.validationMessage.style.marginLeft = '-'.concat(n.getPropertyValue('padding-left')), e.validationMessage.style.marginRight = '-'.concat(n.getPropertyValue('padding-right')), j(e.validationMessage)
      var o = this.getInput()
      o && (o.setAttribute('aria-invalid', !0), o.setAttribute('aria-describedBy', S['validation-message']), L(o), O(o, S.inputerror))
    },
    resetValidationMessage: function () {
      var t = mt.domCache.get(this)
      t.validationMessage && q(t.validationMessage)
      var e = this.getInput()
      e && (e.removeAttribute('aria-invalid'), e.removeAttribute('aria-describedBy'), T(e, S.inputerror))
    },
    getProgressSteps: function () {
      return k('Swal.getProgressSteps()', "const swalInstance = Swal.fire({progressSteps: ['1', '2', '3']}); const progressSteps = swalInstance.params.progressSteps"), mt.innerParams.get(this).progressSteps
    },
    setProgressSteps: function (t) {
      k('Swal.setProgressSteps()', 'Swal.update()')
      var e = a({}, mt.innerParams.get(this), {
        progressSteps: t
      })
      kt(0, e), mt.innerParams.set(this, e)
    },
    showProgressSteps: function () {
      var t = mt.domCache.get(this)
      j(t.progressSteps)
    },
    hideProgressSteps: function () {
      var t = mt.domCache.get(this)
      q(t.progressSteps)
    },
    _main: function (t) {
      var h = this
      !(function (t) {
        for (var e in t) Vt(i = e) || m('Unknown parameter "'.concat(i, '"')), t.toast && (o = e, Mt.indexOf(o) !== -1 && m('The parameter "'.concat(o, '" is incompatible with toasts'))), jt(n = void 0) && k(n, jt(n))
        var n, o, i
      }(t))
      var v = a({}, Et, t)
      !(function (e) {
        e.inputValidator || Object.keys(Xt).forEach(function (t) {
          e.input === t && (e.inputValidator = Xt[t])
        }), e.showLoaderOnConfirm && !e.preConfirm && m('showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request'), e.animation = B(e.animation), (!e.target || typeof e.target === 'string' && !document.querySelector(e.target) || typeof e.target !== 'string' && !e.target.appendChild) && (m('Target parameter is not valid, defaulting to "body"'), e.target = 'body'), typeof e.title === 'string' && (e.title = e.title.split('\n').join('<br />'))
        var t = U()
        var n = typeof e.target === 'string' ? document.querySelector(e.target) : e.target;
        (!t || t && n && t.parentNode !== n.parentNode) && st(e)
      }(v)), Object.freeze(v), Pt.timeout && (Pt.timeout.stop(), delete Pt.timeout), clearTimeout(Pt.restoreFocusTimeout)
      var b = {
        popup: U(),
        container: R(),
        content: K(),
        actions: J(),
        confirmButton: Y(),
        cancelButton: $(),
        closeButton: tt(),
        validationMessage: Q(),
        progressSteps: Z()
      }
      mt.domCache.set(this, b), xt(this, v), mt.innerParams.set(this, v)
      var y = this.constructor
      return new Promise(function (t) {
        var n = function (t) {
          h.closePopup({
            value: t
          })
        }
        var s = function (t) {
          h.closePopup({
            dismiss: t
          })
        }
        Wt.swalPromiseResolve.set(h, t), v.timer && (Pt.timeout = new Jt(function () {
          s('timer'), delete Pt.timeout
        }, v.timer)), v.input && setTimeout(function () {
          var t = h.getInput()
          t && L(t)
        }, 0)
        for (var u = function (e) {
            v.showLoaderOnConfirm && y.showLoading(), v.preConfirm ? (h.resetValidationMessage(), Promise.resolve().then(function () {
              return v.preConfirm(e, v.validationMessage)
            }).then(function (t) {
              H(b.validationMessage) || !1 === t ? h.hideLoading() : n(void 0 === t ? e : t)
            })) : n(e)
          }, e = function (t) {
            var e = t.target
            var n = b.confirmButton
            var o = b.cancelButton
            var i = n && (n === e || n.contains(e))
            var r = o && (o === e || o.contains(e))
            switch (t.type) {
              case 'click':
                if (i) {
                  if (h.disableButtons(), v.input) {
                    var a = (function () {
                      var t = h.getInput()
                      if (!t) return null
                      switch (v.input) {
                        case 'checkbox':
                          return t.checked ? 1 : 0
                        case 'radio':
                          return t.checked ? t.value : null
                        case 'file':
                          return t.files.length ? t.files[0] : null
                        default:
                          return v.inputAutoTrim ? t.value.trim() : t.value
                      }
                    }())
                    v.inputValidator ? (h.disableInput(), Promise.resolve().then(function () {
                      return v.inputValidator(a, v.validationMessage)
                    }).then(function (t) {
                      h.enableButtons(), h.enableInput(), t ? h.showValidationMessage(t) : u(a)
                    })) : h.getInput().checkValidity() ? u(a) : (h.enableButtons(), h.showValidationMessage(v.validationMessage))
                  } else u(!0)
                } else r && (h.disableButtons(), s(y.DismissReason.cancel))
            }
          }, o = b.popup.querySelectorAll('button'), i = 0; i < o.length; i++) o[i].onclick = e, o[i].onmouseover = e, o[i].onmouseout = e, o[i].onmousedown = e
        if (b.closeButton.onclick = function () {
          s(y.DismissReason.close)
        }, v.toast) {
          b.popup.onclick = function () {
            v.showConfirmButton || v.showCancelButton || v.showCloseButton || v.input || s(y.DismissReason.close)
          }
        } else {
          var r = !1
          b.popup.onmousedown = function () {
            b.container.onmouseup = function (t) {
              b.container.onmouseup = void 0, t.target === b.container && (r = !0)
            }
          }, b.container.onmousedown = function () {
            b.popup.onmouseup = function (t) {
              b.popup.onmouseup = void 0, (t.target === b.popup || b.popup.contains(t.target)) && (r = !0)
            }
          }, b.container.onclick = function (t) {
            r ? r = !1 : t.target === b.container && B(v.allowOutsideClick) && s(y.DismissReason.backdrop)
          }
        }
        v.reverseButtons ? b.confirmButton.parentNode.insertBefore(b.cancelButton, b.confirmButton) : b.confirmButton.parentNode.insertBefore(b.confirmButton, b.cancelButton)
        var a; var c; var l; var d; var p; var f; var m; var g = function (t, e) {
          for (var n = et(v.focusCancel), o = 0; o < n.length; o++) return (t += e) === n.length ? t = 0 : t === -1 && (t = n.length - 1), n[t].focus()
          b.popup.focus()
        }
        Pt.keydownHandlerAdded && (Pt.keydownTarget.removeEventListener('keydown', Pt.keydownHandler, {
          capture: Pt.keydownListenerCapture
        }), Pt.keydownHandlerAdded = !1), v.toast || (Pt.keydownHandler = function (t) {
          return (function (t, e) {
            if (e.stopKeydownPropagation && t.stopPropagation(), t.key !== 'Enter' || t.isComposing) {
              if (t.key === 'Tab') {
                for (var n = t.target, o = et(e.focusCancel), i = -1, r = 0; r < o.length; r++) {
                  if (n === o[r]) {
                    i = r
                    break
                  }
                } t.shiftKey ? g(i, -1) : g(i, 1), t.stopPropagation(), t.preventDefault()
              } else ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down'].indexOf(t.key) !== -1 ? document.activeElement === b.confirmButton && H(b.cancelButton) ? b.cancelButton.focus() : document.activeElement === b.cancelButton && H(b.confirmButton) && b.confirmButton.focus() : t.key !== 'Escape' && t.key !== 'Esc' || !0 !== B(e.allowEscapeKey) || (t.preventDefault(), s(y.DismissReason.esc))
            } else if (t.target && h.getInput() && t.target.outerHTML === h.getInput().outerHTML) {
              if (['textarea', 'file'].indexOf(e.input) !== -1) return
              y.clickConfirm(), t.preventDefault()
            }
          }(t, v))
        }, Pt.keydownTarget = v.keydownListenerCapture ? window : b.popup, Pt.keydownListenerCapture = v.keydownListenerCapture, Pt.keydownTarget.addEventListener('keydown', Pt.keydownHandler, {
          capture: Pt.keydownListenerCapture
        }), Pt.keydownHandlerAdded = !0), h.enableButtons(), h.hideLoading(), h.resetValidationMessage(), v.toast && (v.input || v.footer || v.showCloseButton) ? O(document.body, S['toast-column']) : T(document.body, S['toast-column']), v.input === 'select' || v.input === 'radio' ? (d = h, p = v, f = K(), m = function (t) {
          return ne[p.input](f, oe(t), p)
        }, x(p.inputOptions) ? (At(), p.inputOptions.then(function (t) {
          d.hideLoading(), m(t)
        })) : w(p.inputOptions) === 'object' ? m(p.inputOptions) : C('Unexpected type of inputOptions! Expected object, Map or Promise, got '.concat(w(p.inputOptions)))) : ['text', 'email', 'number', 'tel', 'textarea'].indexOf(v.input) !== -1 && x(v.inputValue) && (c = v, l = (a = h).getInput(), q(l), c.inputValue.then(function (t) {
          l.value = c.input === 'number' ? parseFloat(t) || 0 : t + '', j(l), l.focus(), a.hideLoading()
        }).catch(function (t) {
          C('Error in inputValue promise: ' + t), l.value = '', j(l), l.focus(), ee.hideLoading()
        })), te(v), v.toast || (B(v.allowEnterKey) ? v.focusCancel && H(b.cancelButton) ? b.cancelButton.focus() : v.focusConfirm && H(b.confirmButton) ? b.confirmButton.focus() : g(-1, 1) : document.activeElement && typeof document.activeElement.blur === 'function' && document.activeElement.blur()), b.container.scrollTop = 0
      })
    },
    update: function (e) {
      var n = {}
      Object.keys(e).forEach(function (t) {
        se.isUpdatableParameter(t) ? n[t] = e[t] : m('Invalid parameter to update: "'.concat(t, '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js'))
      })
      var t = a({}, mt.innerParams.get(this), n)
      xt(this, t), mt.innerParams.set(this, t), Object.defineProperties(this, {
        params: {
          value: a({}, this.params, e),
          writable: !1,
          enumerable: !0
        }
      })
    }
  })

  function ae () {
    if (typeof window !== 'undefined') {
      typeof Promise === 'undefined' && C('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)'), ie = this
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n]
      var o = Object.freeze(this.constructor.argsToParams(e))
      Object.defineProperties(this, {
        params: {
          value: o,
          writable: !1,
          enumerable: !0,
          configurable: !0
        }
      })
      var i = this._main(this.params)
      mt.promise.set(this, i)
    }
  }
  ae.prototype.then = function (t) {
    return mt.promise.get(this).then(t)
  }, ae.prototype.finally = function (t) {
    return mt.promise.get(this).finally(t)
  }, a(ae.prototype, re), a(ae, qt), Object.keys(re).forEach(function (e) {
    ae[e] = function () {
      var t
      if (ie) return (t = ie)[e].apply(t, arguments)
    }
  }), ae.DismissReason = t, ae.version = '8.8.5'
  var se = ae
  return se.default = se
})), typeof window !== 'undefined' && window.Sweetalert2 && (window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2)
typeof document !== 'undefined' && (function (e, t) {
  var n = e.createElement('style')
  if (e.getElementsByTagName('head')[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t)
  else {
    try {
      n.innerHTML = t
    } catch (e) {
      n.innerText = t
    }
  }
}(document, "@charset \"UTF-8\";@-webkit-keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:initial;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon::before{display:flex;align-items:center;font-size:2em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon::before{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:2em;height:2.8125em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.25em;left:-.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:2em 2em;transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;-webkit-transform-origin:0 2em;transform-origin:0 2em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:showSweetToast .5s;animation:showSweetToast .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:hideSweetToast .2s forwards;animation:hideSweetToast .2s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:animate-toast-success-tip .75s;animation:animate-toast-success-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:animate-toast-success-long .75s;animation:animate-toast-success-long .75s}@-webkit-keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@-webkit-keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;background-color:transparent;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{z-index:1;flex-wrap:wrap;align-items:center;justify-content:center;margin:1.25em auto 0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-actions.swal2-loading .swal2-styled.swal2-confirm{box-sizing:border-box;width:2.5em;height:2.5em;margin:.46875em;padding:0;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{content:'';display:inline-block;width:15px;height:15px;margin-left:5px;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff}.swal2-styled{margin:.3125em;padding:.625em 2em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:0;outline:initial;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{-webkit-transform:none;transform:none;color:#f27474}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;word-wrap:break-word}#swal2-content{text-align:center}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-file::-webkit-input-placeholder,.swal2-input::-webkit-input-placeholder,.swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::-ms-input-placeholder,.swal2-input::-ms-input-placeholder,.swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:inherit}.swal2-range input{width:80%}.swal2-range output{width:20%;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:#545454;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{margin:0 .4em}.swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:'!';display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;zoom:normal;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;zoom:normal;border:.25em solid transparent;border-radius:50%;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon::before{display:flex;align-items:center;height:92%;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning::before{content:'!'}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info::before{content:'i'}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question::before{content:'?'}.swal2-icon.swal2-question.swal2-arabic-question-mark::before{content:'؟'}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:3.75em 3.75em;transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 3.75em;transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progress-steps{align-items:center;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#3085d6}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;width:2.5em;height:.4em;margin:0 -1px;background:#3085d6}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@-webkit-keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:initial!important}}"))
