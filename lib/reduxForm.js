'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _partialRight2 = require('lodash/partialRight');

var _partialRight3 = _interopRequireDefault(_partialRight2);

var _partial2 = require('lodash/partial');

var _partial3 = _interopRequireDefault(_partial2);

var _mapValues2 = require('lodash/mapValues');

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _getDisplayName = require('./util/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _actions = require('./actions');

var importedActions = _interopRequireWildcard(_actions);

var _handleSubmit = require('./handleSubmit');

var _handleSubmit2 = _interopRequireDefault(_handleSubmit);

var _silenceEvent = require('./events/silenceEvent');

var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

var _silenceEvents = require('./events/silenceEvents');

var _silenceEvents2 = _interopRequireDefault(_silenceEvents);

var _asyncValidation = require('./asyncValidation');

var _asyncValidation2 = _interopRequireDefault(_asyncValidation);

var _hasErrors = require('./hasErrors');

var _hasErrors2 = _interopRequireDefault(_hasErrors);

var _hasError = require('./hasError');

var _hasError2 = _interopRequireDefault(_hasError);

var _defaultShouldAsyncValidate = require('./defaultShouldAsyncValidate');

var _defaultShouldAsyncValidate2 = _interopRequireDefault(_defaultShouldAsyncValidate);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// extract field-specific actions
var arrayInsert = importedActions.arrayInsert;
var arrayPop = importedActions.arrayPop;
var arrayPush = importedActions.arrayPush;
var arrayRemove = importedActions.arrayRemove;
var arrayShift = importedActions.arrayShift;
var arraySplice = importedActions.arraySplice;
var arraySwap = importedActions.arraySwap;
var arrayUnshift = importedActions.arrayUnshift;
var blur = importedActions.blur;
var change = importedActions.change;
var focus = importedActions.focus;

var formActions = _objectWithoutProperties(importedActions, ['arrayInsert', 'arrayPop', 'arrayPush', 'arrayRemove', 'arrayShift', 'arraySplice', 'arraySwap', 'arrayUnshift', 'blur', 'change', 'focus']);

var arrayActions = {
  arrayInsert: arrayInsert,
  arrayPop: arrayPop,
  arrayPush: arrayPush,
  arrayRemove: arrayRemove,
  arrayShift: arrayShift,
  arraySplice: arraySplice,
  arraySwap: arraySwap,
  arrayUnshift: arrayUnshift
};

var propsToNotUpdateFor = [].concat(_toConsumableArray(Object.keys(importedActions)), ['array', 'asyncErrors', 'initialized', 'initialValues', 'syncErrors', 'values', 'registeredFields']);

var checkSubmit = function checkSubmit(submit) {
  if (!submit || typeof submit !== 'function') {
    throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
  }
  return submit;
};

/**
 * The decorator that is the main API to redux-form
 */
var createReduxForm = function createReduxForm(structure) {
  var deepEqual = structure.deepEqual;
  var empty = structure.empty;
  var getIn = structure.getIn;
  var setIn = structure.setIn;
  var fromJS = structure.fromJS;
  var some = structure.some;

  var hasErrors = (0, _hasErrors2.default)(structure);
  var hasError = (0, _hasError2.default)(structure);
  var plainHasErrors = (0, _hasErrors2.default)(_plain2.default);
  return function (initialConfig) {
    var config = _extends({
      touchOnBlur: true,
      touchOnChange: false,
      destroyOnUnmount: true,
      shouldAsyncValidate: _defaultShouldAsyncValidate2.default,
      getFormState: function getFormState(state) {
        return getIn(state, 'form');
      }
    }, initialConfig);
    return function (WrappedComponent) {
      var Form = function (_Component) {
        _inherits(Form, _Component);

        function Form(props) {
          _classCallCheck(this, Form);

          var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, props));

          _this.submit = _this.submit.bind(_this);
          _this.reset = _this.reset.bind(_this);
          _this.asyncValidate = _this.asyncValidate.bind(_this);
          _this.getSyncErrors = _this.getSyncErrors.bind(_this);
          _this.register = _this.register.bind(_this);
          _this.unregister = _this.unregister.bind(_this);
          _this.submitCompleted = _this.submitCompleted.bind(_this);
          return _this;
        }

        _createClass(Form, [{
          key: 'getChildContext',
          value: function getChildContext() {
            var _this2 = this;

            return {
              _reduxForm: _extends({}, this.props, {
                getFormState: function getFormState(state) {
                  return getIn(_this2.props.getFormState(state), _this2.props.form);
                },
                asyncValidate: this.asyncValidate,
                getSyncErrors: this.getSyncErrors,
                register: this.register,
                unregister: this.unregister
              })
            };
          }
        }, {
          key: 'initIfNeeded',
          value: function initIfNeeded(_ref) {
            var initialize = _ref.initialize;
            var initialized = _ref.initialized;
            var initialValues = _ref.initialValues;

            if (initialValues && !initialized) {
              initialize(initialValues);
            }
          }
        }, {
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.initIfNeeded(this.props);
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            this.initIfNeeded(nextProps);
          }
        }, {
          key: 'shouldComponentUpdate',
          value: function shouldComponentUpdate(nextProps) {
            var _this3 = this;

            return Object.keys(nextProps).some(function (prop) {
              // useful to debug rerenders
              // if (!plain.deepEqual(this.props[ prop ], nextProps[ prop ])) {
              //   console.info(prop, 'changed', this.props[ prop ], '==>', nextProps[ prop ])
              // }
              return ! ~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this3.props[prop], nextProps[prop]);
            });
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            var _props = this.props;
            var destroyOnUnmount = _props.destroyOnUnmount;
            var destroy = _props.destroy;

            if (destroyOnUnmount) {
              this.destroyed = true;
              destroy();
            }
          }
        }, {
          key: 'getSyncErrors',
          value: function getSyncErrors() {
            return this.props.syncErrors;
          }
        }, {
          key: 'register',
          value: function register(name, type) {
            this.props.registerField(name, type);
          }
        }, {
          key: 'unregister',
          value: function unregister(name) {
            if (!this.destroyed) {
              this.props.unregisterField(name);
            }
          }
        }, {
          key: 'asyncValidate',
          value: function asyncValidate(name, value) {
            var _this4 = this;

            var _props2 = this.props;
            var asyncBlurFields = _props2.asyncBlurFields;
            var asyncErrors = _props2.asyncErrors;
            var asyncValidate = _props2.asyncValidate;
            var dispatch = _props2.dispatch;
            var initialized = _props2.initialized;
            var pristine = _props2.pristine;
            var shouldAsyncValidate = _props2.shouldAsyncValidate;
            var startAsyncValidation = _props2.startAsyncValidation;
            var stopAsyncValidation = _props2.stopAsyncValidation;
            var syncErrors = _props2.syncErrors;
            var values = _props2.values;

            var submitting = !name;
            if (asyncValidate) {
              var _ret = function () {
                var valuesToValidate = submitting ? values : setIn(values, name, value);
                var syncValidationPasses = submitting || !getIn(syncErrors, name);
                var isBlurredField = !submitting && (!asyncBlurFields || ~asyncBlurFields.indexOf(name.replace(/\[[0-9]+\]/g, '[]')));
                if ((isBlurredField || submitting) && shouldAsyncValidate({
                  asyncErrors: asyncErrors,
                  initialized: initialized,
                  trigger: submitting ? 'submit' : 'blur',
                  blurredField: name,
                  pristine: pristine,
                  syncValidationPasses: syncValidationPasses
                })) {
                  return {
                    v: (0, _asyncValidation2.default)(function () {
                      return asyncValidate(valuesToValidate, dispatch, _this4.props);
                    }, startAsyncValidation, stopAsyncValidation, name)
                  };
                }
              }();

              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
          }
        }, {
          key: 'submitCompleted',
          value: function submitCompleted(result) {
            delete this.submitPromise;
            return result;
          }
        }, {
          key: 'listenToSubmit',
          value: function listenToSubmit(promise) {
            if (!(0, _isPromise2.default)(promise)) {
              return promise;
            }
            this.submitPromise = promise;
            return promise.then(this.submitCompleted, this.submitCompleted);
          }
        }, {
          key: 'submit',
          value: function submit(submitOrEvent) {
            var _this5 = this;

            var onSubmit = this.props.onSubmit;


            if (!submitOrEvent || (0, _silenceEvent2.default)(submitOrEvent)) {
              // submitOrEvent is an event: fire submit if not already submitting
              if (!this.submitPromise) {
                return this.listenToSubmit((0, _handleSubmit2.default)(checkSubmit(onSubmit), this.props, this.valid, this.asyncValidate, this.fieldList));
              }
            } else {
              // submitOrEvent is the submit function: return deferred submit thunk
              return (0, _silenceEvents2.default)(function () {
                return !_this5.submitPromise && _this5.listenToSubmit((0, _handleSubmit2.default)(checkSubmit(submitOrEvent), _this5.props, _this5.valid, _this5.asyncValidate, _this5.fieldList));
              });
            }
          }
        }, {
          key: 'reset',
          value: function reset() {
            this.props.reset();
          }
        }, {
          key: 'render',
          value: function render() {
            // remove some redux-form config-only props
            var _props3 = this.props;
            var arrayInsert = _props3.arrayInsert;
            var arrayPop = _props3.arrayPop;
            var arrayPush = _props3.arrayPush;
            var arrayRemove = _props3.arrayRemove;
            var arrayShift = _props3.arrayShift;
            var arraySplice = _props3.arraySplice;
            var arraySwap = _props3.arraySwap;
            var arrayUnshift = _props3.arrayUnshift;
            var asyncErrors = _props3.asyncErrors;
            var reduxMountPoint = _props3.reduxMountPoint;
            var destroyOnUnmount = _props3.destroyOnUnmount;
            var getFormState = _props3.getFormState;
            var touchOnBlur = _props3.touchOnBlur;
            var touchOnChange = _props3.touchOnChange;
            var syncErrors = _props3.syncErrors;
            var values = _props3.values;
            var registerField = _props3.registerField;
            var unregisterField = _props3.unregisterField;

            var passableProps = _objectWithoutProperties(_props3, ['arrayInsert', 'arrayPop', 'arrayPush', 'arrayRemove', 'arrayShift', 'arraySplice', 'arraySwap', 'arrayUnshift', 'asyncErrors', 'reduxMountPoint', 'destroyOnUnmount', 'getFormState', 'touchOnBlur', 'touchOnChange', 'syncErrors', 'values', 'registerField', 'unregisterField']); // eslint-disable-line no-redeclare


            return (0, _react.createElement)(WrappedComponent, _extends({}, passableProps, {
              handleSubmit: this.submit
            }));
          }
        }, {
          key: 'values',
          get: function get() {
            return this.props.values;
          }
        }, {
          key: 'valid',
          get: function get() {
            return this.props.valid;
          }
        }, {
          key: 'invalid',
          get: function get() {
            return !this.valid;
          }
        }, {
          key: 'fieldList',
          get: function get() {
            return this.props.registeredFields.map(function (field) {
              return getIn(field, 'name');
            });
          }
        }]);

        return Form;
      }(_react.Component);

      Form.displayName = 'Form(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
      Form.WrappedComponent = WrappedComponent;
      Form.childContextTypes = {
        _reduxForm: _react.PropTypes.object.isRequired
      };
      Form.propTypes = {
        destroyOnUnmount: _react.PropTypes.bool,
        form: _react.PropTypes.string.isRequired,
        initialValues: _react.PropTypes.object,
        getFormState: _react.PropTypes.func,
        validate: _react.PropTypes.func,
        touchOnBlur: _react.PropTypes.bool,
        touchOnChange: _react.PropTypes.bool,
        registeredFields: _react.PropTypes.any
      };

      var connector = (0, _reactRedux.connect)(function (state, props) {
        var form = props.form;
        var getFormState = props.getFormState;
        var initialValues = props.initialValues;
        var validate = props.validate;

        var formState = getIn(getFormState(state) || empty, form) || empty;
        var stateInitial = getIn(formState, 'initial');
        var initial = initialValues || stateInitial || empty;
        var values = getIn(formState, 'values') || initial;
        var pristine = deepEqual(initial, values);
        var asyncErrors = getIn(formState, 'asyncErrors');
        var submitErrors = getIn(formState, 'submitErrors');
        var syncErrors = validate && validate(values, props) || {};
        var hasSyncErrors = plainHasErrors(syncErrors);
        var hasAsyncErrors = hasErrors(asyncErrors);
        var hasSubmitErrors = hasErrors(submitErrors);
        var valid = !hasSyncErrors && !hasAsyncErrors && !hasSubmitErrors && !some(getIn(formState, 'registeredFields'), function (field) {
          return hasError(field, syncErrors, asyncErrors, submitErrors);
        });
        var anyTouched = !!getIn(formState, 'anyTouched');
        var submitting = !!getIn(formState, 'submitting');
        var submitFailed = !!getIn(formState, 'submitFailed');
        var error = getIn(formState, 'error');
        var registeredFields = getIn(formState, 'registeredFields');
        return {
          anyTouched: anyTouched,
          asyncErrors: asyncErrors,
          asyncValidating: getIn(formState, 'asyncValidating'),
          dirty: !pristine,
          error: error,
          initialized: !!stateInitial,
          invalid: !valid,
          pristine: pristine,
          registeredFields: registeredFields,
          submitting: submitting,
          submitFailed: submitFailed,
          syncErrors: syncErrors,
          values: values,
          valid: valid
        };
      }, function (dispatch, initialProps) {
        var bindForm = function bindForm(actionCreator) {
          return (0, _partial3.default)(actionCreator, initialProps.form);
        };

        // Bind the first parameter on `props.form`
        var boundFormACs = (0, _mapValues3.default)(formActions, bindForm);
        var boundArrayACs = (0, _mapValues3.default)(arrayActions, bindForm);
        var boundBlur = (0, _partialRight3.default)(bindForm(blur), !!initialProps.touchOnBlur);
        var boundChange = (0, _partialRight3.default)(bindForm(change), !!initialProps.touchOnChange);
        var boundFocus = bindForm(focus);

        // Wrap action creators with `dispatch`
        var connectedFormACs = (0, _redux.bindActionCreators)(boundFormACs, dispatch);
        var connectedArrayACs = {
          insert: (0, _redux.bindActionCreators)(boundArrayACs.arrayInsert, dispatch),
          pop: (0, _redux.bindActionCreators)(boundArrayACs.arrayPop, dispatch),
          push: (0, _redux.bindActionCreators)(boundArrayACs.arrayPush, dispatch),
          remove: (0, _redux.bindActionCreators)(boundArrayACs.arrayRemove, dispatch),
          shift: (0, _redux.bindActionCreators)(boundArrayACs.arrayShift, dispatch),
          splice: (0, _redux.bindActionCreators)(boundArrayACs.arraySplice, dispatch),
          swap: (0, _redux.bindActionCreators)(boundArrayACs.arraySwap, dispatch),
          unshift: (0, _redux.bindActionCreators)(boundArrayACs.arrayUnshift, dispatch)
        };

        var computedActions = _extends({}, connectedFormACs, boundArrayACs, {
          blur: boundBlur,
          change: boundChange,
          array: connectedArrayACs,
          focus: boundFocus,
          dispatch: dispatch
        });

        return function () {
          return computedActions;
        };
      }, undefined, { withRef: true });
      var ConnectedForm = (0, _hoistNonReactStatics2.default)(connector(Form), WrappedComponent);
      ConnectedForm.defaultProps = config;

      // build outer component to expose instance api
      return function (_Component2) {
        _inherits(ReduxForm, _Component2);

        function ReduxForm() {
          _classCallCheck(this, ReduxForm);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxForm).apply(this, arguments));
        }

        _createClass(ReduxForm, [{
          key: 'submit',
          value: function submit() {
            return this.refs.wrapped.getWrappedInstance().submit();
          }
        }, {
          key: 'reset',
          value: function reset() {
            return this.refs.wrapped.getWrappedInstance().reset();
          }
        }, {
          key: 'render',
          value: function render() {
            var _props4 = this.props;
            var initialValues = _props4.initialValues;

            var rest = _objectWithoutProperties(_props4, ['initialValues']);

            return (0, _react.createElement)(ConnectedForm, _extends({}, rest, {
              ref: 'wrapped',
              // convert initialValues if need to
              initialValues: fromJS(initialValues)
            }));
          }
        }, {
          key: 'valid',
          get: function get() {
            return this.refs.wrapped.getWrappedInstance().valid;
          }
        }, {
          key: 'invalid',
          get: function get() {
            return this.refs.wrapped.getWrappedInstance().invalid;
          }
        }, {
          key: 'values',
          get: function get() {
            return this.refs.wrapped.getWrappedInstance().values;
          }
        }, {
          key: 'fieldList',
          get: function get() {
            // mainly provided for testing
            return this.refs.wrapped.getWrappedInstance().fieldList;
          }
        }]);

        return ReduxForm;
      }(_react.Component);
    };
  };
};

exports.default = createReduxForm;