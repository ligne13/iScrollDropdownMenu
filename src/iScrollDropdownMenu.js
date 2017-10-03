const iScrollDropdownMenu = (($) => {

    const NAME = 'iScrollDropdownMenu';
    const DATA_KEY = 'iScrollDropdownMenu';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const defaults = {
        /**
         * The class name of the element to be scrolled, containing the items
         */
        scrollerClass: 'scroller',
        /**
         * The index of the item on which to set the scroll position at start
         */
        startAtItem: 0,
        /**
         * If true, the scroll will start at the startAtItem value even if the active item index is not the same as the startAtItem value.
         * If false, and if there is an active item, the iScroll will start at the active item index.
         */
        forceStartAtItem: true,
        /**
         * If forceStartAtItem is true, the startAtItem will be ignored if the active item index is greater than this value
         * Example : If the active item is the first item (eg : Home button), the iScroll can still be forced to start at the item index set with startAtItem value.
         */
        forceStartAtItemIfActiveIsGreaterThan: 0,
        /**
         * The indicator will not be displayed if the active item index is greater than this value, matching an item index.
         * This allows to hide the indicator if the active item is the last of the items, and if the indicator overlaps the items.
         */
        hideIndicatorIfActiveItemIsGreaterThan: 0,
    };

    class iScrollDropdownMenu {
        constructor(element, config) {
            this.config = this._getConfig(config);
            this.element = element;
            this.$element = $(this.element);
            this.$scroller = this.$element.find('.' + this.config.scrollerClass);
            this.iScroll;
            this.$ul = this.$scroller.find('> ul');
            this.$items = this.$ul.find('>li');
            this.$itemsDropdowns = this.$items.filter('.dropdown');
            this.$dropdownMenus = this.$itemsDropdowns.find('.dropdown-menu');
            this.$dropdownMenusWrapper;
            this.$startItem = this.$ul.find('li:eq(' + this.config.startAtItem + ')');
            this.$indicator = this.$element.find('.indicator');

            this.init();
        }

        init() {

            var self = this;

            this.$itemsDropdowns.each(function () {
                // check if all <li> are hidden (and if so, we do not add the data attributes on the element. And the click on it will be a normal href click.)
                if ($(this).find('.dropdown-menu li:visible').length > 0) {
                    var itemId = 'item' + $(this).index();
                    $(this).data('id', itemId).attr('data-id', itemId);
                    $(this).find('.dropdown-menu').data('parent', itemId).attr('data-id', itemId);
                }
            });
            this.$dropdownMenusWrapper = $('<div class="iScrollDropdownMenu-dropdowns"></div>');
            this.$element.after(this.$dropdownMenusWrapper);
            this.$dropdownMenusWrapper.append(this.$dropdownMenus);

            this.$dropdownMenus.find('[data-toggle=close]').each(function () {
                $(this).on('click', function () {
                    $(this).closest('.dropdown-menu').slideUp();
                });
            });

            /**
             * Timeout required to avoid bugs with iScroll late initialization...
             */
            setTimeout(function () {
                self.$scroller.width(self.getItemsWidth() + 1);
                self.iScroll = new IScroll(self.element, {
                    eventPassthrough: true,
                    scrollX: true,
                    scrollY: false,
                    preventDefault: false,
                    bounceEasing: 'quadratic',
                    snap: false,
                });
                self.iScroll.scrollToElement(self.$startItem.get(0), 125);
                self.toggleIndicator();
                $(window).on('resize', function () {
                    self.toggleIndicator();
                });

                self.indicatorLoopAnimation(10, 500);
                self.iScroll.on('scrollStart', function () {
                    self.$indicator.fadeOut();
                });
                self.$indicator.on('click', function (e) {
                    self.$indicator.fadeOut();
                    self.iScroll.scrollToElement(self.$items.last().get(0), 1000, 0, 0, IScroll.utils.ease.back);
                });
            }, 500);

            this.$items.on('click', function () {
                $(this).find('> a').trigger('click');
            });
            this.$items.find('> a').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.$dropdownMenusWrapper.find('> *').hide();
                var $liParent = $(this).parent('li');
                self.iScroll.scrollToElement($liParent.get(0), 500);
                self.$items.removeClass('beforeActive');
                self.$items.not($liParent).removeClass('active');
                $liParent.prev().addClass('beforeActive');
                $liParent.addClass('active');
                if ($liParent.hasClass('dropdown') && $liParent.data('id')) {
                    // if the parent .dropdown has the data-id
                    var itemId = $liParent.data('id');
                    self.$dropdownMenusWrapper.find('[data-id=' + itemId + ']').slideDown();
                } else {
                    // if not, or if it not a .dropdown, this is a normal href click.
                    if ($(this).attr('target') == '_blank') {
                        window.open(this.href);
                    } else {
                        location.href = this.href;
                    }
                }
            });

            // initial setup if there is an item with an active class
            var $active = self.$items.filter('.active');
            var activeIndex = $active.index();
            if ($active.length > 0) {
                $active.prev().addClass('beforeActive');
                if (!this.config.forceStartAtItem || (this.config.forceStartAtItem && activeIndex > this.config.forceStartAtItemIfActiveIsGreaterThan)) {
                    this.$startItem = $active;
                }
            }

        }

        toggleIndicator() {
            var $active = this.$items.filter('.active');
            var activeIndex = $active.index();
            if (!this.iScroll.hasHorizontalScroll || activeIndex > this.config.hideIndicatorIfActiveItemIsGreaterThan) {
                this.$indicator.hide();
            } else {
                this.$indicator.show();
            }
        }

        indicatorLoopAnimation(offset, duration) {
            var self = this;
            this.$indicator.find('.fa').animate({
                right: '+=' + offset
            }, duration, function () {
                $(this).animate({
                    right: '-=' + offset
                }, duration, function () {
                    self.indicatorLoopAnimation(offset, duration);
                });
            });
        }

        getItemsWidth() {
            var itemsWidth = 0;
            this.$items.each(function () {
                itemsWidth += $(this).outerWidth();
            });
            return itemsWidth;
        }

        _getConfig(config) {
            config = $.extend({}, defaults, config);
            return config;
        }

        static _jQueryInterface(config) {
            return this.each(function () {
                let $this = $(this);
                let data = $this.data(DATA_KEY);
                let _kikoo = $.extend({},
                    defaults,
                    $this.data(),
                    typeof config === 'object' && config
                );

                if (!data && /dispose/.test(config)) {
                    this.dispose();
                }

                if (!data) {
                    data = new iScrollDropdownMenu(this, _kikoo);
                    $this.data(DATA_KEY, data);
                }

                if (typeof config === 'string') {
                    if (data[config] === undefined) {
                        throw new Error(`No method named "${config}"`);
                    }
                    data[config]();
                }
            });
        }
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = iScrollDropdownMenu._jQueryInterface;
    $.fn[NAME].Constructor = iScrollDropdownMenu;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return iScrollDropdownMenu._jQueryInterface;
    };
    return iScrollDropdownMenu;
})(jQuery);
