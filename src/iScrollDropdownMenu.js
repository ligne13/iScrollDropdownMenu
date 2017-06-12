const iScrollDropdownMenu = (($) => {

    const NAME = 'iScrollDropdownMenu';
    const DATA_KEY = 'iScrollDropdownMenu';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const defaults = {
        scrollerClass: 'scroller',
        startAtItem: 0,
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
                var itemId = 'item' + $(this).index();
                $(this).data('id', itemId).attr('data-id', itemId);
                $(this).find('.dropdown-menu').data('parent', itemId).attr('data-id', itemId);
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
                self.$scroller.width(self.getItemsWidth()+1);
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
            }, 500);

            this.$items.on('click', function () {
                $(this).find('> a').trigger('click');
            });
            this.$items.find('> a').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.$dropdownMenusWrapper.find('div').hide();
                var $liParent = $(this).parent('li');
                self.iScroll.scrollToElement($liParent.get(0), 500);
                self.$items.removeClass('beforeActive');
                self.$items.not($liParent).removeClass('active');
                $liParent.prev().addClass('beforeActive');
                $liParent.addClass('active');
                if ($liParent.hasClass('dropdown')) {
                    var itemId = $liParent.data('id');
                    self.$dropdownMenusWrapper.find('div[data-id=' + itemId + ']').slideDown();
                } else {
                    if ($(this).attr('target') =='_blank') {
                        window.open(this.href);
                    } else {
                        location.href = this.href;
                    }
                }
            });

            // initial setup if there is an item with an active class
            var $active = self.$items.filter('.active');
            if ($active) {
                $active.prev().addClass('beforeActive');
                this.$startItem = $active;
            }

        }

        toggleIndicator() {
            if (!this.iScroll.hasHorizontalScroll) {
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
