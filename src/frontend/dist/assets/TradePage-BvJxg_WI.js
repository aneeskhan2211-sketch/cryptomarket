import { c as createLucideIcon, R as React2, b as useSettings, q as useMarketDataInfinite, r as reactExports, t as formatQuantity, j as jsxRuntimeExports, f as formatPrice } from "./index-CAwuyKvd.js";
import { L as Layout, A as ArrowLeftRight, B as Button, W as Wallet, h as Label, I as Input, D as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle, j as DialogDescription, k as DialogFooter } from "./Layout-CGMG0XZW.js";
import { u as usePortfolio } from "./usePortfolio-CAwpzsz8.js";
import { P as PropTypes } from "./index-D4u-7GDa.js";
import { S as Search } from "./search-D6LFxpVr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var useAttachEvent = function useAttachEvent2(element, event, cb) {
  var cbDefined = !!cb;
  var cbRef = React2.useRef(cb);
  React2.useEffect(function() {
    cbRef.current = cb;
  }, [cb]);
  React2.useEffect(function() {
    if (!cbDefined || !element) {
      return function() {
      };
    }
    var decoratedCb = function decoratedCb2() {
      if (cbRef.current) {
        return cbRef.current.apply(cbRef, arguments);
      }
      return void 0;
    };
    element.on(event, decoratedCb);
    return function() {
      element.off(event, decoratedCb);
    };
  }, [cbDefined, event, element, cbRef]);
};
var usePrevious = function usePrevious2(value) {
  var ref = React2.useRef(value);
  React2.useEffect(function() {
    ref.current = value;
  }, [value]);
  return ref.current;
};
var isUnknownObject = function isUnknownObject2(raw) {
  return raw !== null && _typeof$1(raw) === "object";
};
var isPromise = function isPromise2(raw) {
  return isUnknownObject(raw) && typeof raw.then === "function";
};
var isStripe = function isStripe2(raw) {
  return isUnknownObject(raw) && typeof raw.elements === "function" && typeof raw.createToken === "function" && typeof raw.createPaymentMethod === "function" && typeof raw.confirmCardPayment === "function";
};
var PLAIN_OBJECT_STR = "[object Object]";
var isEqual = function isEqual2(left, right) {
  if (!isUnknownObject(left) || !isUnknownObject(right)) {
    return left === right;
  }
  var leftArray = Array.isArray(left);
  var rightArray = Array.isArray(right);
  if (leftArray !== rightArray) return false;
  var leftPlainObject = Object.prototype.toString.call(left) === PLAIN_OBJECT_STR;
  var rightPlainObject = Object.prototype.toString.call(right) === PLAIN_OBJECT_STR;
  if (leftPlainObject !== rightPlainObject) return false;
  if (!leftPlainObject && !leftArray) return left === right;
  var leftKeys = Object.keys(left);
  var rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) return false;
  var keySet = {};
  for (var i = 0; i < leftKeys.length; i += 1) {
    keySet[leftKeys[i]] = true;
  }
  for (var _i = 0; _i < rightKeys.length; _i += 1) {
    keySet[rightKeys[_i]] = true;
  }
  var allKeys = Object.keys(keySet);
  if (allKeys.length !== leftKeys.length) {
    return false;
  }
  var l = left;
  var r = right;
  var pred = function pred2(key) {
    return isEqual2(l[key], r[key]);
  };
  return allKeys.every(pred);
};
var extractAllowedOptionsUpdates = function extractAllowedOptionsUpdates2(options, prevOptions, immutableKeys) {
  if (!isUnknownObject(options)) {
    return null;
  }
  return Object.keys(options).reduce(function(newOptions, key) {
    var isUpdated = !isUnknownObject(prevOptions) || !isEqual(options[key], prevOptions[key]);
    if (immutableKeys.includes(key)) {
      if (isUpdated) {
        console.warn("Unsupported prop change: options.".concat(key, " is not a mutable property."));
      }
      return newOptions;
    }
    if (!isUpdated) {
      return newOptions;
    }
    return _objectSpread2(_objectSpread2({}, newOptions || {}), {}, _defineProperty({}, key, options[key]));
  }, null);
};
var INVALID_STRIPE_ERROR$1 = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.";
var validateStripe = function validateStripe2(maybeStripe) {
  var errorMsg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : INVALID_STRIPE_ERROR$1;
  if (maybeStripe === null || isStripe(maybeStripe)) {
    return maybeStripe;
  }
  throw new Error(errorMsg);
};
var parseStripeProp = function parseStripeProp2(raw) {
  var errorMsg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : INVALID_STRIPE_ERROR$1;
  if (isPromise(raw)) {
    return {
      tag: "async",
      stripePromise: Promise.resolve(raw).then(function(result) {
        return validateStripe(result, errorMsg);
      })
    };
  }
  var stripe = validateStripe(raw, errorMsg);
  if (stripe === null) {
    return {
      tag: "empty"
    };
  }
  return {
    tag: "sync",
    stripe
  };
};
var registerWithStripeJs = function registerWithStripeJs2(stripe) {
  if (!stripe || !stripe._registerWrapper || !stripe.registerAppInfo) {
    return;
  }
  stripe._registerWrapper({
    name: "react-stripe-js",
    version: "6.6.0"
  });
  stripe.registerAppInfo({
    name: "react-stripe-js",
    version: "6.6.0",
    url: "https://stripe.com/docs/stripe-js/react"
  });
};
var ElementsContext = /* @__PURE__ */ React2.createContext(null);
ElementsContext.displayName = "ElementsContext";
var parseElementsContext = function parseElementsContext2(ctx, useCase) {
  if (!ctx) {
    throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(useCase, " in an <Elements> provider."));
  }
  return ctx;
};
var Elements = function Elements2(_ref) {
  var rawStripeProp = _ref.stripe, options = _ref.options, children = _ref.children;
  var parsed = React2.useMemo(function() {
    return parseStripeProp(rawStripeProp);
  }, [rawStripeProp]);
  var _React$useState = React2.useState(function() {
    return {
      stripe: parsed.tag === "sync" ? parsed.stripe : null,
      elements: parsed.tag === "sync" ? parsed.stripe.elements(options) : null
    };
  }), _React$useState2 = _slicedToArray(_React$useState, 2), ctx = _React$useState2[0], setContext = _React$useState2[1];
  React2.useEffect(function() {
    var isMounted = true;
    var safeSetContext = function safeSetContext2(stripe) {
      setContext(function(ctx2) {
        if (ctx2.stripe) return ctx2;
        return {
          stripe,
          elements: stripe.elements(options)
        };
      });
    };
    if (parsed.tag === "async" && !ctx.stripe) {
      parsed.stripePromise.then(function(stripe) {
        if (stripe && isMounted) {
          safeSetContext(stripe);
        }
      });
    } else if (parsed.tag === "sync" && !ctx.stripe) {
      safeSetContext(parsed.stripe);
    }
    return function() {
      isMounted = false;
    };
  }, [parsed, ctx, options]);
  var prevStripe = usePrevious(rawStripeProp);
  React2.useEffect(function() {
    if (prevStripe !== null && prevStripe !== rawStripeProp) {
      console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
    }
  }, [prevStripe, rawStripeProp]);
  var prevOptions = usePrevious(options);
  React2.useEffect(function() {
    if (!ctx.elements) {
      return;
    }
    var updates = extractAllowedOptionsUpdates(options, prevOptions, ["clientSecret", "fonts"]);
    if (updates) {
      ctx.elements.update(updates);
    }
  }, [options, prevOptions, ctx.elements]);
  React2.useEffect(function() {
    registerWithStripeJs(ctx.stripe);
  }, [ctx.stripe]);
  return /* @__PURE__ */ React2.createElement(ElementsContext.Provider, {
    value: ctx
  }, children);
};
Elements.propTypes = {
  stripe: PropTypes.any,
  options: PropTypes.object
};
({
  children: PropTypes.func.isRequired
});
var CheckoutContext = /* @__PURE__ */ React2.createContext(null);
CheckoutContext.displayName = "CheckoutContext";
var useElementsOrCheckoutContextWithUseCase = function useElementsOrCheckoutContextWithUseCase2(useCaseString) {
  var checkout = React2.useContext(CheckoutContext);
  var elements = React2.useContext(ElementsContext);
  if (checkout) {
    if (elements) {
      throw new Error("You cannot wrap the part of your app that ".concat(useCaseString, " in both a checkout provider and <Elements> provider."));
    } else {
      return checkout;
    }
  } else {
    return parseElementsContext(elements, useCaseString);
  }
};
var _excluded = ["mode"];
var capitalized = function capitalized2(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var createElementComponent = function createElementComponent2(type, isServer2, customDisplayName) {
  var displayName = "".concat(capitalized(type), "Element");
  var ClientElement = function ClientElement2(_ref) {
    var id = _ref.id, className = _ref.className, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, onBlur = _ref.onBlur, onFocus = _ref.onFocus, onReady = _ref.onReady, onChange = _ref.onChange, onEscape = _ref.onEscape, onClick = _ref.onClick, onLoadError = _ref.onLoadError, onLoaderStart = _ref.onLoaderStart, onNetworksChange = _ref.onNetworksChange, onConfirm = _ref.onConfirm, onCancel = _ref.onCancel, onShippingAddressChange = _ref.onShippingAddressChange, onShippingRateChange = _ref.onShippingRateChange, onSavedPaymentMethodRemove = _ref.onSavedPaymentMethodRemove, onSavedPaymentMethodUpdate = _ref.onSavedPaymentMethodUpdate, onAvailablePaymentMethodsChange = _ref.onAvailablePaymentMethodsChange;
    var ctx = useElementsOrCheckoutContextWithUseCase("mounts <".concat(displayName, ">"));
    var elements = "elements" in ctx ? ctx.elements : null;
    var checkoutState = "checkoutState" in ctx ? ctx.checkoutState : null;
    var checkoutSdk = (checkoutState === null || checkoutState === void 0 ? void 0 : checkoutState.type) === "success" || (checkoutState === null || checkoutState === void 0 ? void 0 : checkoutState.type) === "loading" ? checkoutState.sdk : null;
    var _React$useState = React2.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), element = _React$useState2[0], setElement = _React$useState2[1];
    var elementRef = React2.useRef(null);
    var domNode = React2.useRef(null);
    useAttachEvent(element, "blur", onBlur);
    useAttachEvent(element, "focus", onFocus);
    useAttachEvent(element, "escape", onEscape);
    useAttachEvent(element, "click", onClick);
    useAttachEvent(element, "loaderror", onLoadError);
    useAttachEvent(element, "loaderstart", onLoaderStart);
    useAttachEvent(element, "networkschange", onNetworksChange);
    useAttachEvent(element, "confirm", onConfirm);
    useAttachEvent(element, "cancel", onCancel);
    useAttachEvent(element, "shippingaddresschange", onShippingAddressChange);
    useAttachEvent(element, "shippingratechange", onShippingRateChange);
    useAttachEvent(element, "savedpaymentmethodremove", onSavedPaymentMethodRemove);
    useAttachEvent(element, "savedpaymentmethodupdate", onSavedPaymentMethodUpdate);
    useAttachEvent(element, "availablepaymentmethodschange", onAvailablePaymentMethodsChange);
    useAttachEvent(element, "change", onChange);
    var readyCallback;
    if (onReady) {
      if (type === "expressCheckout") {
        readyCallback = onReady;
      } else {
        readyCallback = function readyCallback2() {
          onReady(element);
        };
      }
    }
    useAttachEvent(element, "ready", readyCallback);
    React2.useLayoutEffect(function() {
      if (elementRef.current === null && domNode.current !== null && (elements || checkoutSdk)) {
        var newElement = null;
        if (checkoutSdk) {
          var elementsSdk = checkoutSdk;
          var formSdk = checkoutSdk;
          switch (type) {
            case "paymentForm":
              newElement = formSdk.createForm(options);
              break;
            case "payment":
              newElement = elementsSdk.createPaymentElement(options);
              break;
            case "address":
              if ("mode" in options) {
                var mode = options.mode, restOptions = _objectWithoutProperties(options, _excluded);
                if (mode === "shipping") {
                  newElement = elementsSdk.createShippingAddressElement(restOptions);
                } else if (mode === "billing") {
                  newElement = elementsSdk.createBillingAddressElement(restOptions);
                } else {
                  throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
                }
              } else {
                throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              }
              break;
            case "expressCheckout":
              newElement = elementsSdk.createExpressCheckoutElement(options);
              break;
            case "currencySelector":
              newElement = checkoutSdk.createCurrencySelectorElement();
              break;
            case "taxId":
              newElement = elementsSdk.createTaxIdElement(options);
              break;
            case "contactDetails":
              newElement = elementsSdk.createContactDetailsElement();
              break;
            default:
              throw new Error("<".concat(displayName, "> is not supported inside a checkout provider. Use an <Elements> provider instead."));
          }
        } else if (elements) {
          newElement = elements.create(type, options);
        }
        elementRef.current = newElement;
        setElement(newElement);
        if (newElement) {
          newElement.mount(domNode.current);
        }
      }
    }, [elements, checkoutSdk, options]);
    var prevOptions = usePrevious(options);
    React2.useEffect(function() {
      if (!elementRef.current) {
        return;
      }
      var updates = extractAllowedOptionsUpdates(options, prevOptions, ["paymentRequest"]);
      if (updates && "update" in elementRef.current) {
        elementRef.current.update(updates);
      }
    }, [options, prevOptions]);
    React2.useLayoutEffect(function() {
      return function() {
        if (elementRef.current && typeof elementRef.current.destroy === "function") {
          try {
            elementRef.current.destroy();
            elementRef.current = null;
          } catch (error) {
          }
        }
      };
    }, []);
    return /* @__PURE__ */ React2.createElement("div", {
      id,
      className,
      ref: domNode
    });
  };
  var ServerElement = function ServerElement2(props) {
    useElementsOrCheckoutContextWithUseCase("mounts <".concat(displayName, ">"));
    var id = props.id, className = props.className;
    return /* @__PURE__ */ React2.createElement("div", {
      id,
      className
    });
  };
  var Element = isServer2 ? ServerElement : ClientElement;
  Element.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onReady: PropTypes.func,
    onEscape: PropTypes.func,
    onClick: PropTypes.func,
    onLoadError: PropTypes.func,
    onLoaderStart: PropTypes.func,
    onNetworksChange: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onShippingAddressChange: PropTypes.func,
    onShippingRateChange: PropTypes.func,
    onSavedPaymentMethodRemove: PropTypes.func,
    onSavedPaymentMethodUpdate: PropTypes.func,
    onAvailablePaymentMethodsChange: PropTypes.func,
    options: PropTypes.object
  };
  Element.displayName = displayName;
  Element.__elementType = type;
  return Element;
};
var isServer = typeof window === "undefined";
var EmbeddedCheckoutContext = /* @__PURE__ */ React2.createContext(null);
EmbeddedCheckoutContext.displayName = "EmbeddedCheckoutProviderContext";
createElementComponent("auBankAccount", isServer);
var CardElement = createElementComponent("card", isServer);
createElementComponent("cardNumber", isServer);
createElementComponent("cardExpiry", isServer);
createElementComponent("cardCvc", isServer);
createElementComponent("currencySelector", isServer);
createElementComponent("iban", isServer);
createElementComponent("payment", isServer);
createElementComponent("expressCheckout", isServer);
createElementComponent("paymentRequestButton", isServer);
createElementComponent("linkAuthentication", isServer);
createElementComponent("contactDetails", isServer);
createElementComponent("address", isServer);
createElementComponent("shippingAddress", isServer);
createElementComponent("paymentMethodMessaging", isServer);
createElementComponent("taxId", isServer);
createElementComponent("issuingCardNumberDisplay", isServer);
createElementComponent("issuingCardCvcDisplay", isServer);
createElementComponent("issuingCardExpiryDisplay", isServer);
createElementComponent("issuingCardPinDisplay", isServer);
createElementComponent("issuingCardCopyButton", isServer);
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
var RELEASE_TRAIN = "dahlia";
var runtimeVersionToUrlVersion = function runtimeVersionToUrlVersion2(version) {
  return version === 3 ? "v3" : version;
};
var ORIGIN = "https://js.stripe.com";
var STRIPE_JS_URL = "".concat(ORIGIN, "/").concat(RELEASE_TRAIN, "/stripe.js");
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var STRIPE_JS_URL_REGEX = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
var isStripeJSURL = function isStripeJSURL2(url) {
  return V3_URL_REGEX.test(url) || STRIPE_JS_URL_REGEX.test(url);
};
var findScript = function findScript2() {
  var scripts = document.querySelectorAll('script[src^="'.concat(ORIGIN, '"]'));
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (!isStripeJSURL(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
var injectScript = function injectScript2(params) {
  var queryString = "";
  var script = document.createElement("script");
  script.src = "".concat(STRIPE_JS_URL).concat(queryString);
  var headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  }
  headOrBody.appendChild(script);
  return script;
};
var registerWrapper = function registerWrapper2(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }
  stripe._registerWrapper({
    name: "stripe-js",
    version: "9.7.0",
    startTime
  });
};
var stripePromise$1 = null;
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError2(reject) {
  return function(cause) {
    reject(new Error("Failed to load Stripe.js", {
      cause
    }));
  };
};
var onLoad = function onLoad2(resolve, reject) {
  return function() {
    if (window.Stripe) {
      resolve(window.Stripe);
    } else {
      reject(new Error("Stripe.js not available"));
    }
  };
};
var loadScript = function loadScript2(params) {
  if (stripePromise$1 !== null) {
    return stripePromise$1;
  }
  stripePromise$1 = new Promise(function(resolve, reject) {
    if (typeof window === "undefined" || typeof document === "undefined") {
      resolve(null);
      return;
    }
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    try {
      var script = findScript();
      if (script && params) ;
      else if (!script) {
        script = injectScript(params);
      } else if (script && onLoadListener !== null && onErrorListener !== null) {
        var _script$parentNode;
        script.removeEventListener("load", onLoadListener);
        script.removeEventListener("error", onErrorListener);
        (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 ? void 0 : _script$parentNode.removeChild(script);
        script = injectScript(params);
      }
      onLoadListener = onLoad(resolve, reject);
      onErrorListener = onError(reject);
      script.addEventListener("load", onLoadListener);
      script.addEventListener("error", onErrorListener);
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise$1["catch"](function(error) {
    stripePromise$1 = null;
    return Promise.reject(error);
  });
};
var initStripe = function initStripe2(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }
  var pk = args[0];
  if (typeof pk !== "string") {
    throw new Error("Expected publishable key to be of type string, got type ".concat(_typeof(pk), " instead."));
  }
  var isTestKey = pk.match(/^pk_test/);
  var version = runtimeVersionToUrlVersion(maybeStripe.version);
  var expectedVersion = RELEASE_TRAIN;
  if (isTestKey && version !== expectedVersion) {
    console.warn("Stripe.js@".concat(version, " was loaded on the page, but @stripe/stripe-js@").concat("9.7.0", " expected Stripe.js@").concat(expectedVersion, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  }
  var stripe = maybeStripe.apply(void 0, args);
  registerWrapper(stripe, startTime);
  return stripe;
};
var stripePromise$2;
var loadCalled = false;
var getStripePromise = function getStripePromise2() {
  if (stripePromise$2) {
    return stripePromise$2;
  }
  stripePromise$2 = loadScript(null)["catch"](function(error) {
    stripePromise$2 = null;
    return Promise.reject(error);
  });
  return stripePromise$2;
};
Promise.resolve().then(function() {
  return getStripePromise();
})["catch"](function(error) {
  if (!loadCalled) {
    console.warn(error);
  }
});
var loadStripe = function loadStripe2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  loadCalled = true;
  var startTime = Date.now();
  return getStripePromise().then(function(maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};
const stripePromise = loadStripe("pk_test_placeholder");
function TradePage() {
  const { t, formatMoney } = useSettings();
  const { holdings, addTransaction, isAuthenticated } = usePortfolio();
  const { data: pages } = useMarketDataInfinite();
  const [tab, setTab] = reactExports.useState("buy");
  const [buySearch, setBuySearch] = reactExports.useState("");
  const [selectedCoin, setSelectedCoin] = reactExports.useState(null);
  const [buyAmount, setBuyAmount] = reactExports.useState("");
  const [selectedHoldingId, setSelectedHoldingId] = reactExports.useState("");
  const [sellQty, setSellQty] = reactExports.useState("");
  const [modal, setModal] = reactExports.useState({ kind: "hidden" });
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const allCoins = reactExports.useMemo(() => {
    if (!pages) return [];
    return pages.pages.flatMap((p) => p.coins);
  }, [pages]);
  const filteredCoins = reactExports.useMemo(() => {
    const q = buySearch.trim().toLowerCase();
    if (!q) return allCoins.slice(0, 20);
    return allCoins.filter(
      (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
    );
  }, [allCoins, buySearch]);
  const selectedHolding = reactExports.useMemo(
    () => holdings.find((h) => h.coinId === selectedHoldingId) || null,
    [holdings, selectedHoldingId]
  );
  const buyQuantity = reactExports.useMemo(() => {
    const amount = Number.parseFloat(buyAmount);
    if (!selectedCoin || !amount || amount <= 0) return 0;
    return amount / selectedCoin.currentPrice;
  }, [buyAmount, selectedCoin]);
  const sellProceeds = reactExports.useMemo(() => {
    var _a;
    const qty = Number.parseFloat(sellQty);
    if (!selectedHolding || !qty || qty <= 0) return 0;
    const price = ((_a = allCoins.find((c) => c.id === selectedHolding.coinId)) == null ? void 0 : _a.currentPrice) ?? 0;
    return qty * price;
  }, [sellQty, selectedHolding, allCoins]);
  const sellPrice = reactExports.useMemo(() => {
    var _a;
    if (!selectedHolding) return 0;
    return ((_a = allCoins.find((c) => c.id === selectedHolding.coinId)) == null ? void 0 : _a.currentPrice) ?? 0;
  }, [selectedHolding, allCoins]);
  const handleBuyClick = reactExports.useCallback(() => {
    const amount = Number.parseFloat(buyAmount);
    if (!selectedCoin || !amount || amount <= 0) return;
    const qty = amount / selectedCoin.currentPrice;
    setModal({
      kind: "confirm_buy",
      coin: selectedCoin,
      amount,
      quantity: qty
    });
  }, [buyAmount, selectedCoin]);
  const handleSellClick = reactExports.useCallback(() => {
    var _a;
    const qty = Number.parseFloat(sellQty);
    if (!selectedHolding || !qty || qty <= 0) return;
    const price = ((_a = allCoins.find((c) => c.id === selectedHolding.coinId)) == null ? void 0 : _a.currentPrice) ?? 0;
    const proceeds = qty * price;
    setModal({
      kind: "confirm_sell",
      holding: selectedHolding,
      qty,
      proceeds,
      price
    });
  }, [sellQty, selectedHolding, allCoins]);
  const executeBuy = reactExports.useCallback(async () => {
    if (modal.kind !== "confirm_buy") return;
    setIsSubmitting(true);
    try {
      addTransaction({
        coinId: modal.coin.id,
        symbol: modal.coin.symbol,
        kind: "buy",
        quantity: modal.quantity,
        pricePerUnit: modal.coin.currentPrice,
        timestamp: Date.now()
      });
      setModal({
        kind: "success",
        message: t("trade.successBuy", {
          quantity: formatQuantity(modal.quantity),
          symbol: modal.coin.symbol,
          amount: formatMoney(modal.amount)
        })
      });
      setBuyAmount("");
      setSelectedCoin(null);
      setBuySearch("");
    } catch {
      setModal({ kind: "error", message: t("trade.error") });
    } finally {
      setIsSubmitting(false);
    }
  }, [modal, addTransaction, t, formatMoney]);
  const executeSell = reactExports.useCallback(async () => {
    if (modal.kind !== "confirm_sell") return;
    setIsSubmitting(true);
    try {
      addTransaction({
        coinId: modal.holding.coinId,
        symbol: modal.holding.symbol,
        kind: "sell",
        quantity: modal.qty,
        pricePerUnit: modal.price,
        timestamp: Date.now()
      });
      setModal({
        kind: "success",
        message: t("trade.successSell", {
          quantity: formatQuantity(modal.qty),
          symbol: modal.holding.symbol,
          amount: formatMoney(modal.proceeds)
        })
      });
      setSellQty("");
      setSelectedHoldingId("");
    } catch {
      setModal({ kind: "error", message: t("trade.error") });
    } finally {
      setIsSubmitting(false);
    }
  }, [modal, addTransaction, t, formatMoney]);
  const closeModal = reactExports.useCallback(() => setModal({ kind: "hidden" }), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 py-6 max-w-screen-xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: t("trade.title") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: tab === "buy" ? "default" : "outline",
            className: "flex-1",
            onClick: () => setTab("buy"),
            "data-ocid": "trade.buy_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 mr-2" }),
              t("trade.buy")
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: tab === "sell" ? "default" : "outline",
            className: "flex-1",
            onClick: () => setTab("sell"),
            "data-ocid": "trade.sell_tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4 mr-2" }),
              t("trade.sell")
            ]
          }
        )
      ] }),
      tab === "buy" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("trade.selectCoin") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: t("market.search"),
                value: buySearch,
                onChange: (e) => setBuySearch(e.target.value),
                className: "pl-9",
                "data-ocid": "trade.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-48 overflow-y-auto border border-border rounded-lg bg-card", children: filteredCoins.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-sm text-muted-foreground", children: t("market.noResults", { query: buySearch }) }) : filteredCoins.map((coin) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setSelectedCoin(coin);
                setBuySearch(`${coin.symbol} — ${coin.name}`);
              },
              className: `w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted transition-colors ${(selectedCoin == null ? void 0 : selectedCoin.id) === coin.id ? "bg-muted" : ""}`,
              "data-ocid": `trade.coin.item.${coin.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: coin.image,
                      alt: coin.symbol,
                      className: "w-6 h-6 rounded-full",
                      loading: "lazy"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground", children: coin.symbol }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: coin.name })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-mono text-foreground", children: formatPrice(coin.currentPrice) })
              ]
            },
            coin.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("trade.fiatAmount") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              step: "0.01",
              placeholder: "0.00",
              value: buyAmount,
              onChange: (e) => setBuyAmount(e.target.value),
              "data-ocid": "trade.fiat_input"
            }
          )
        ] }),
        selectedCoin && buyQuantity > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-3 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("trade.price") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: formatPrice(selectedCoin.currentPrice) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("trade.quantity") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
              formatQuantity(buyQuantity),
              " ",
              selectedCoin.symbol
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("trade.total") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: formatMoney(Number.parseFloat(buyAmount || "0")) })
          ] })
        ] }),
        selectedCoin && Number.parseFloat(buyAmount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("trade.cardDetails") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Elements, { stripe: stripePromise, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-lg p-3 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardElement,
            {
              options: {
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ffffff",
                    "::placeholder": { color: "#aab7c4" }
                  }
                }
              }
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full",
              onClick: handleBuyClick,
              disabled: isSubmitting,
              "data-ocid": "trade.pay_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 mr-2" }),
                t("trade.pay")
              ]
            }
          )
        ] })
      ] }),
      tab === "sell" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: !isAuthenticated || holdings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-10 h-10 mx-auto mb-3 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("trade.noHoldings") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("trade.selectHolding") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-48 overflow-y-auto border border-border rounded-lg bg-card", children: holdings.map((h) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSelectedHoldingId(h.coinId),
                className: `w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted transition-colors ${selectedHoldingId === h.coinId ? "bg-muted" : ""}`,
                "data-ocid": `trade.holding.item.${h.coinId}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground", children: h.symbol }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      t("trade.holding"),
                      ": ",
                      formatQuantity(h.quantity)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-mono text-foreground", children: formatPrice(
                    ((_a = allCoins.find((c) => c.id === h.coinId)) == null ? void 0 : _a.currentPrice) ?? 0
                  ) })
                ]
              },
              h.coinId
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("trade.enterQuantity") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              step: "any",
              placeholder: "0.00",
              value: sellQty,
              onChange: (e) => setSellQty(e.target.value),
              "data-ocid": "trade.quantity_input"
            }
          )
        ] }),
        selectedHolding && Number.parseFloat(sellQty) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-3 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("trade.price") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: formatPrice(sellPrice) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("trade.proceeds") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: formatMoney(sellProceeds) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "w-full",
            variant: "secondary",
            onClick: handleSellClick,
            disabled: !selectedHolding || Number.parseFloat(sellQty) <= 0 || isSubmitting,
            "data-ocid": "trade.confirmSell_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4 mr-2" }),
              t("trade.confirmSell")
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal.kind !== "hidden",
        onOpenChange: (open) => !open && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
          modal.kind === "confirm_buy" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("trade.confirmTitle") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: t("trade.successBuy", {
                quantity: formatQuantity(modal.quantity),
                symbol: modal.coin.symbol,
                amount: formatMoney(modal.amount)
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: closeModal,
                  "data-ocid": "trade.cancel_button",
                  children: t("trade.cancel")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: executeBuy,
                  disabled: isSubmitting,
                  "data-ocid": "trade.confirm_button",
                  children: t("trade.confirmButton")
                }
              )
            ] })
          ] }),
          modal.kind === "confirm_sell" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("trade.confirmTitle") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: t("trade.successSell", {
                quantity: formatQuantity(modal.qty),
                symbol: modal.holding.symbol,
                amount: formatMoney(modal.proceeds)
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: closeModal,
                  "data-ocid": "trade.cancel_button",
                  children: t("trade.cancel")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: executeSell,
                  disabled: isSubmitting,
                  "data-ocid": "trade.confirm_button",
                  children: t("trade.confirmButton")
                }
              )
            ] })
          ] }),
          modal.kind === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-price-up" }),
                t("trade.success")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: modal.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: closeModal, "data-ocid": "trade.close_button", children: t("trade.cancel") }) })
          ] }),
          modal.kind === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-price-down" }),
                t("trade.error")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: modal.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: closeModal,
                variant: "destructive",
                "data-ocid": "trade.close_button",
                children: t("trade.cancel")
              }
            ) })
          ] })
        ] })
      }
    )
  ] });
}
export {
  TradePage as default
};
