parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UldJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r=function(r){return""+String.fromCharCode(97+r)};function e(e,t){var n=[];return function t(o,i){if(void 0===i&&(i=""),n.push(i),!(o<=0))for(var u=0;u<e;u++)t(o-1,i+r(u))}(t),n}exports.generateStrings=e;
},{}],"tL4M":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./utils"),i=function(){function i(t,i,r){this.statesCount=t,this.symbolCount=i,this.finalStates=r,this.transitionMatrix=[];for(var n=0;n<this.statesCount;n++)this.transitionMatrix.push(Array(this.symbolCount))}return i.prototype.setTransition=function(t,i,r){this.transitionMatrix[t][i]=r},i.prototype.getStringsUptoLimit=function(i){for(var r=[],n=0,s=t.generateStrings(this.symbolCount,i);n<s.length;n++){var e=s[n];this.testString(e)&&r.push(e)}return r},i.prototype.testString=function(t){for(var i=0,r=0;r<t.length;r++){var n=t.charCodeAt(r)-97;i=this.transitionMatrix[i][n]}return-1!==this.finalStates.indexOf(i)},i}();exports.default=i;
},{"./utils":"UldJ"}],"UQkK":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var e=t(require("./DFA")),n=function(){function t(t,e){var n=this;this.getNFA=function(){},this.saveTransition=function(t,e){var i=n.selectedToString(e);t.innerText=i,n.modal.style.display="none"},this.loadTransition=function(t,e){},this.setTransition=function(t){t.target.id;var e=t.target;n.modal.style.display="block";var i=n.modal.querySelector("#transition_states");i.innerHTML="",n.stringToSelected(e.innerText).forEach(function(t){i.appendChild(t)});var r=n.modal.querySelector("#modal_save_btn"),a=r.cloneNode(!0);n.modal.replaceChild(a,r),a.addEventListener("click",function(){return n.saveTransition(e,i)})},this.setFinalState=function(t){var e,n=t.target;-1!==n.innerText.indexOf("*")?(e=n.querySelector("sup")).remove():((e=document.createElement("sup")).innerText="*",n.appendChild(e))},this.table=document.getElementById(t),this.modal=document.getElementById(e),this.symbolCount=0,this.stateCount=0,this.addState(),this.addState(),this.addSymbol(),this.addSymbol()}return t.prototype.validateDFA=function(){if(!this.validateNFA())return!1;for(var t=this.table.getElementsByTagName("td"),e=0;e<t.length;e++)if(-1!==t[e].innerText.indexOf(","))return!1;return!0},t.prototype.getDFA=function(){for(var t=[],n=0,i=this.table.getElementsByTagName("td");n<i.length;n++){-1!==(s=i[n]).innerText.indexOf("*")&&t.push(parseInt(s.innerText))}for(var r=new e.default(this.stateCount,this.symbolCount,t),a=0,o=this.table.getElementsByTagName("td");a<o.length;a++){var s;if(-1!==(s=o[a]).id.indexOf(";")){var l=s.id.split(";").map(function(t){return parseInt(t)}),d=l[0],u=l[1],h=parseInt(s.innerText);r.setTransition(d,u,h)}}return r},t.prototype.validateNFA=function(){for(var t=this.table.getElementsByTagName("td"),e=0;e<t.length;e++)if("-"===t[e].innerText)return!1;return!0},t.prototype.stringToSelected=function(t){var e="-"!==t?t.split(","):[];return Array(this.stateCount).fill(0).map(function(t,n){var i=document.createElement("span");return i.innerText=n.toString(),-1!==e.indexOf(n.toString())&&(i.className="selected"),i.addEventListener("click",function(t){var e=t.target.className;i.className="selected"===e?"":"selected"}),i})},t.prototype.selectedToString=function(t){for(var e=[],n=0;n<t.children.length;n++)"selected"===t.children[n].className&&e.push(t.children[n].innerText);return e.length>0?e.join():"-"},t.prototype.createCell=function(t,e){var n=document.createElement("td");return n.innerText="-",n.id=t+";"+e,n.addEventListener("click",this.setTransition),n},t.prototype.addSymbol=function(){this.symbolCount+=1;var t=document.createElement("td");t.innerText=String.fromCharCode(this.symbolCount+96),this.table.rows[0].appendChild(t);for(var e=1;e<this.table.rows.length;e++){var n=this.createCell(e-1,this.symbolCount-1);this.table.rows[e].appendChild(n)}},t.prototype.removeSymbol=function(){if(this.symbolCount>=1){this.symbolCount-=1;for(var t=0;t<this.table.rows.length;t++)this.table.rows[t].lastElementChild.remove()}},t.prototype.addState=function(){this.table.insertRow();var t=this.table.rows[this.table.rows.length-1],e=document.createElement("td");e.innerText=this.stateCount.toString(),e.addEventListener("click",this.setFinalState),t.appendChild(e);for(var n=0;n<this.table.rows[0].childElementCount-1;n++){var i=this.createCell(this.stateCount,n);t.appendChild(i)}this.stateCount+=1},t.prototype.removeState=function(){this.stateCount>0&&(this.stateCount-=1,this.table.deleteRow(this.table.rows.length-1))},t}();exports.default=n;
},{"./DFA":"tL4M"}],"Yyn2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e){this.table=document.getElementById(e)}return e.prototype.addItem=function(e,t){var n=document.createElement("div");n.innerText=e||"є",n.className=t?"accepted":"notaccepted",this.table.appendChild(n)},e.prototype.clear=function(){this.table.innerHTML=""},e}();exports.default=e;
},{}],"ZCfc":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./src/transitionTable")),n=require("./src/utils"),r=e(require("./src/StringsList")),a=new r.default("strings_list"),i=0,l=void 0,d=document.getElementById("sigma"),o=document.getElementById("add_symbol_btn"),u=document.getElementById("remove_symbol_btn"),c=document.getElementById("add_state_btn"),s=document.getElementById("remove_state_btn"),v=document.querySelector("#transition_selection_modal"),m=document.querySelector("#generate_dfa_btn"),_=document.querySelector("#generate_nfa_btn"),g=new t.default("transition_table","transition_selection_modal");d.value="a,b",i=2,o.addEventListener("click",function(e){g.addSymbol(),i+=1,""!==d.value&&(d.value+=","),d.value+=""+String.fromCharCode(i+96)}),u.addEventListener("click",function(e){g.removeSymbol(),i>0&&(i-=1),d.value=d.value.slice(0,d.value.length-2)}),c.addEventListener("click",function(e){g.addState()}),s.addEventListener("click",function(e){g.removeState()}),m.addEventListener("click",function(){if(g.validateDFA()){var e=(l=g.getDFA()).getStringsUptoLimit(S()),t=n.generateStrings(g.symbolCount,S());a.clear();for(var r=0,i=t;r<i.length;r++){var d=i[r];-1!==e.indexOf(d)?a.addItem(d,!0):a.addItem(d,!1)}}else alert("Not a valid DFA")}),_.addEventListener("click",function(){g.validateNFA()?alert("NFA not yet implemented."):alert("Not a valid NFA")});var f=document.querySelector("#string_len_inp"),y=document.querySelector("#dec_string_len_btn"),b=document.querySelector("#inc_string_len_btn");f.value="3",y.addEventListener("click",function(){f.value=String(parseInt(f.value)-1)}),b.addEventListener("click",function(){f.value=String(parseInt(f.value)+1)});var S=function(){return parseInt(f.value)};
},{"./src/transitionTable":"UQkK","./src/utils":"UldJ","./src/StringsList":"Yyn2"}]},{},["ZCfc"], null)
//# sourceMappingURL=/main.f09c314f.js.map