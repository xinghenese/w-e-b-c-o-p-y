/**
 * Created by Administrator on 2014/12/17.
 */
define(['../base/Base', '../utils/TypeCheckExtender', '../utils/CSSUtil', '../utils/MathUtil'], function(Base, TypeCheck, CSSUtil, MathUtil){
    HTMLElement.implementMethods({
        getParent: function(){
            return this.parentNode || this.parentElement();
        },
        getStyle: function(type){
            if(window.getComputedStyle){
                HTMLElement.prototype.getStyle = function(type){
//                    console.info("ComputedStyle: " + type);
                    return window.getComputedStyle(this, null).getPropertyValue(CSSUtil.cssFormat(type));
                };
            }
            else if(this.currentStyle){
                HTMLElement.prototype.getStyle = function(type){
//                    console.info("CurrentStyle: " + type);
                    return this.currentStyle[type];
                };
            }
            else {
                HTMLElement.prototype.getStyle = function(type){
//                    console.info("Style: " + type);
                    return this.style[type];
                }
            }
            return this.getStyle(type);
        },
        getMessures: function(type){
            if(type = this.fetchOriginalStyle(type) || this.getStyle(type)){
                var arr = type.match(/(\d+)\.*\d*(\D*)$/);
                return {
                    digit: arr[1],
                    unit: arr[2]
                }
            }
        },
        getMessureDigits: function(type){
            if(type = this.fetchOriginalStyle(type) || this.getStyle(type)){
                return parseInt(type);
            }
            return 0;
        },
        //only cache the last-modified style
        cacheOriginalStyle: function(type){
            var _self = this;
            this.o_style = this.o_style || {};
            if(TypeCheck.isString(type)){
                _cacheSingleStyle(type);
            }
            else if(TypeCheck.isNonEmptyArray(type)){
                type.each(function(){
                    _cacheSingleStyle(this);
                })
            }
            return this;

            function _cacheSingleStyle(type){
                if(type && _self.getStyle(type)){
                    _self.o_style[type] = _self.getStyle(type);
                }
            }
        },
        fetchOriginalStyle: function(type){
            return type && this.o_style && this.o_style[type] || "";
        },
        show: function(value){
            this.style.display = value || this.fetchOriginalStyle("display") || "block";
            return this;
        },
        hide: function(){
            this.cacheOriginalStyle(["display", "width", "height", "top", "left", "font-size"]).style.display = "none";
            return this;
        },
        float: function(){
            this.style.display = "inline-block";
            return this;
        },
        borderBox: function(){
            var direction = ["Top", "Right", "Bottom", "Left"],
                messures = ["margin", "border", "padding"],
                _size = [this.getMessureDigits("height"), this.getMessureDigits("width")];
//            console.info("origin_width: " + _size[1]);
//            console.info("origin_height: " + _size[0]);
            for(var i = 0, ilen = direction.length; i < ilen; i++){
                for(var j = 0, tmp = _size[MathUtil.isOdd(i)], jlen = messures.length; j < jlen; j++){
                    tmp -= this.getMessureDigits(messures[j] + direction[i]);
//                    console.log(messures[j] + direction[i] + ": " + this.getMessureDigits(messures[j] + direction[i]));
//                    console.log("tmp: " + tmp);
                }
                _size[MathUtil.isOdd(i)] = tmp;
            }
//            console.info("_height: " + _size[0]);
//            console.info("_width: " + _size[1]);
            this.style.height = _size[0] + "px";
            this.style.width = _size[1] + "px";
            return this;
        },
        modifyStyle: function(fn, args){
            if(TypeCheck.isFunction(fn) || TypeCheck.isString(fn) && TypeCheck.isFunction(fn = this[fn])){
                this.hide();
//                this[fn]();
                fn.apply(this, args);
                this.show();
            }
            return this;
        },
        setCenter: function(){
            var _style = this.style, _parent = this.getParent();
            if(_style.position == "static"){
                _style.margin = "auto";
                _style.marginTop = (_parent.getMessureDigits("width") - _parent.getMessureDigits("height"))/2 + "px";
            }
            else{
                _style.left = _parent.getMessureDigits("width")/2 + "px";
                _style.top = _parent.getMessureDigits("height")/2 + "px";
                _style.marginLeft = -parseInt(this.getMessureDigits("width"))/2 + "px";
                _style.marginTop = -parseInt(this.getMessureDigits("height"))/2 + "px";
            }
            return this;
        },
        setVerticalAlign: function(baseElement, direction){
            if(TypeCheck.isHTMLElement(baseElement)){
                direction = direction != "right";
                if(direction){
                    var margin = baseElement.getMessureDigits("marginLeft");
                }
                else{
                    margin = baseElement.getMessureDigits("marginLeft") + baseElement.getMessureDigits("width") -
                        (margin = this.getMessures("width")).digit + margin.unit;
                }
                this.style.marginLeft = margin;
            }
            return this;
        },
        setTextCenter: function(){
            this.style.textAlign = "center";
            this.style.lineHeight = this.getMessureDigits("height") + "px";
            return this;
        }
    });

    NodeList.implementMethods({
        each: function(fn, args){
            return Array.prototype.each.call(this, fn, args);
        },
        modifyStyle: function(fn, args){
            return HTMLElement.prototype.modifyStyle.call(this, fn, args);
        },
        setVerticalAlign: function(baseElement, direction) {
            var _self = this, len = _self.length;
            if (TypeCheck.isString(baseElement)) {
                direction = baseElement;
                if (direction != "right") {
                    var ibase = MathUtil.findMin(_self, function (i) {
                        return _self[i].getMessureDigits("marginLeft");
                    });
                }
                else {
                    ibase = MathUtil.findMax(_self, function (i) {
                        return _self[i].getMessureDigits("marginLeft") + _self[i].getMessureDigits("width");
                    });
                }
                baseElement = _self[ibase];
            }
            return _self.each(function(){
                this.setVerticalAlign(baseElement, direction);
            });
        }
    });

    NodeList.implementMethods(HTMLElement.prototype, ["show", "hide", "float", "borderBox", "setCenter", "setTextCenter"], function(method){
        return function(){
            //cache arguments of outer anonymous function
            var args = arguments;
            return this.each(function(){
                //use apply method 'cause args: Arguments Object in nature is an Array-like Object
                method.apply(this, args);
            })
        }
    });

});