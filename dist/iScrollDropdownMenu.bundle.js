!function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=5)}([function(t,n,e){"use strict";function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(){function t(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(n,e,i){return e&&t(n.prototype,e),i&&t(n,i),n}}();!function(t){var n="iScrollDropdownMenu",e=t.fn[n],s={startAtItem:0},a=function(){function n(e,o){i(this,n),this.config=this._getConfig(o),this.element=e,this.$element=t(this.element),this.$scroller=this.$element.find(".scroller"),this.iScroll,this.$ul=this.$scroller.find("> ul"),this.$items=this.$ul.find(">li"),this.$itemsDropdowns=this.$items.filter(".dropdown"),this.$dropdownMenus=this.$itemsDropdowns.find(".dropdown-menu"),this.$dropdownMenusWrapper,this.$startItem=this.$ul.find("li:eq("+this.config.startAtItem+")"),this.$indicator=this.$element.find(".indicator"),this.init()}return r(n,[{key:"init",value:function(){var n=this;this.$itemsDropdowns.each(function(){var n="item"+t(this).index();t(this).data("id",n).attr("data-id",n),t(this).find(".dropdown-menu").data("parent",n).attr("data-id",n)}),this.$dropdownMenusWrapper=t('<div class="iScrollDropdownMenu-dropdowns"></div>'),this.$element.after(this.$dropdownMenusWrapper),this.$dropdownMenusWrapper.append(this.$dropdownMenus),this.$dropdownMenus.find("[data-toggle=close]").each(function(){t(this).on("click",function(){t(this).closest(".dropdown-menu").slideUp()})}),setTimeout(function(){n.$scroller.width(n.getItemsWidth()),n.iScroll=new IScroll(n.element,{eventPassthrough:!0,scrollX:!0,scrollY:!1,preventDefault:!1,bounceEasing:"quadratic",snap:!1}),n.iScroll.scrollToElement(n.$startItem.get(0),125),n.toggleIndicator(),t(window).on("resize",function(){n.toggleIndicator()}),n.indicatorLoopAnimation(10,500),n.iScroll.on("scrollStart",function(){n.$indicator.fadeOut()})},500),this.$items.on("click",function(){t(this).find("> a").trigger("click")}),this.$items.find("> a").on("click",function(e){e.preventDefault(),e.stopPropagation(),n.$dropdownMenusWrapper.find("div").hide();var i=t(this).parent("li");if(n.iScroll.scrollToElement(i.get(0),500),n.$items.removeClass("beforeActive"),n.$items.not(i).removeClass("active"),i.prev().addClass("beforeActive"),i.addClass("active"),i.hasClass("dropdown")){var o=i.data("id");n.$dropdownMenusWrapper.find("div[data-id="+o+"]").slideDown()}else location.href=this.href})}},{key:"toggleIndicator",value:function(){this.iScroll.hasHorizontalScroll?this.$indicator.show():this.$indicator.hide()}},{key:"indicatorLoopAnimation",value:function(n,e){var i=this;this.$indicator.find(".fa").animate({right:"+="+n},e,function(){t(this).animate({right:"-="+n},e,function(){i.indicatorLoopAnimation(n,e)})})}},{key:"getItemsWidth",value:function(){var n=0;return this.$items.each(function(){n+=t(this).outerWidth()}),n}},{key:"_getConfig",value:function(n){return n=t.extend({},s,n)}}],[{key:"_jQueryInterface",value:function(e){return this.each(function(){var i=t(this),r=i.data("iScrollDropdownMenu"),a=t.extend({},s,i.data(),"object"===(void 0===e?"undefined":o(e))&&e);if(!r&&/dispose/.test(e)&&this.dispose(),r||(r=new n(this,a),i.data("iScrollDropdownMenu",r)),"string"==typeof e){if(void 0===r[e])throw new Error('No method named "'+e+'"');r[e]()}})}}]),n}();t.fn[n]=a._jQueryInterface,t.fn[n].Constructor=a,t.fn[n].noConflict=function(){return t.fn[n]=e,a._jQueryInterface}}(jQuery)},function(t,n,e){t.exports=e.p+"demo-basic.css"},function(t,n,e){t.exports=e.p+"demo-pink.css"},function(t,n,e){t.exports=e.p+"demo-purple.css"},function(t,n,e){t.exports=e.p+"iScrollDropdownMenu.css"},function(t,n,e){e(0),e(4),e(1),e(2),t.exports=e(3)}]);
//# sourceMappingURL=iScrollDropdownMenu.bundle.js.map