import $ from 'jquery'
import './jquery.shield.less'

/**
 * noop function
 */
const noop = () => {}

/**
 * bind function context
 *
 * @param {Funciton} func function to bind
 * @param {any} context context
 * @return {Function}
 */
const bind = (func, context) => {
    return function () {
        return func.apply(context, arguments)
    }
}

/**
 * @class
 *
 * jQuery mask shield class
 */
class Shield {

    /**
     * jQuery plugin name
     *
     * @type {string}
     */
    static pluginName = 'shield'

    /**
     * plugin default options
     *
     * @type {Object}
     */
    static defaultOptions = {

        /**
         * scroll reflection magnification
         *
        * @type {number}
         */
        magnification: 5,

        /**
         * initial image y position
         *
         * @type {number}
         */
        initialY: 0.5,

        /**
         * before scroll
         *
         * @type {Function}
         */
        beforeScroll: () => {},

        /**
         * after scroll
         *
         * @type {Function}
         */
        onScroll: () => {},
    }

    /**
     * @constructor
     *
     * @param {HTMLElement} el element
     * @param {Object} options options
     */
    constructor(el, options) {

        // merge default options
        this.options = $.extend({}, Shield.defaultOptions, options)

        // assign element
        this.el = el
        this.$el = $(this.el)

        // Init
        this.initialize()
    }

    /**
     * get image in the element
     *
     * @return {jQuery object}
     */
    get $img() {
        return this.$el.find('img')
    }

    /**
     * add some required style when initializing
     */
    prepareImg() {
        this.$img.addClass('image')
            .css('position', 'relative')
    }

    /**
     * update image offset
     *
     * @param {number} offset image offset
     */
    offsetYImg(offset) {
        this.$img.css('top', offset + 'px')
    }

    /**
     * initialize plugin
     */
    initialize() {
        this.prepareImg()
        this.bindEvents()
    }

    /**
     * bind `scroll` event
     */
    bindEvents() {
        $(document).on('scroll', bind(this.handleScroll, this))
    }

    /**
     * handle window scroll
     */
    handleScroll() {
        this.options.beforeScroll.call(this, this)
        this.offsetYImg(window.scrollY / this.options.magnification)
        this.options.onScroll.call(this, this)
    }
}

$.fn[Shield.pluginName] = function (options) {

    // Init each Shield
    return this.each(function () {
        if (!$(this).data(`plugin_${Shield.pluginName}`)) {
            $(this).data(`plugin_${Shield.pluginName}`, new Shield(this, options))
        }
    })
}
