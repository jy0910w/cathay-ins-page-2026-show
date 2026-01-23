(function() {
  // deepcode ignore GlobalReplacementRegex: <please specify a reason of ignoring this>
  !function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self)["@smartbear/browser-info"]=n()}(this,(function(){"use strict";var e=/^\d+/;function n(e,n){this.name=e,this.pattern=n}n.prototype.match=function(n){var r=n.match(this.pattern);if(null===r)return null;var t={name:this.name,version:null,release:null};return void 0!==r[1]&&(t.version=r[1].replace("_","."),t.release=parseInt(t.version.match(e)[0],10)),t};var r=[new n("Firefox",/Firefox\/([0-9.]+)/),new n("Edge",/Edg[AeiOS]{0,3}\/([0-9.]+)/),new n("Opera",/OPR\/([0-9.]+)/),new n("SamsungInternet",/SamsungBrowser\/([0-9.]+)/),new n("UCBrowser",/UCBrowser\/([0-9.]+)/),new n("Chrome",/Chrome\/([0-9.]+)/),new n("Safari",/Version\/([0-9.]+)(?: .*)? Safari\//),new n("ie",/(?:MSIE |IEMobile\/|Trident\/.*rv:)([0-9.]+)/)],t=[new n("Windows",/Windows NT ([0-9.]+)/),new n("Windows Phone",/Windows Phone ([0-9.]+)/),new n("MacOS",/OS X ([0-9._]+)/),new n("iOS",/iPhone OS ([0-9_.]+)/),new n("iPadOS",/iPad.+?OS ([0-9_,]+)/),new n("ChromeOS",/CrOS [^ ]+ ([0-9.]+)/),new n("Android",/(?:Android|Adr) ([0-9.]+)/),new n("BlackBerry",/BlackBerry|BB10/),new n("webOS",/webOS\/([0-9.]+)/),new n("Linux",/Linux/)],i={os:"?",name:"?",release:"?",version:"?",detect:function(e){var n,i,o="string"==typeof e?e:window.navigator.userAgent,s=!1;for(i=0;i<r.length;i++)if(null!==(n=r[i].match(o))){this.name=n.name,this.release=n.release,this.version=n.version,s=!0;break}for(i=0;i<t.length;i++)if(null!==(n=t[i].match(o))){this.os=n.name;break}return s},toString:function(){return this.name+" "+this.version}};return Object.defineProperty(i,"versionAsNumber",{get:function(){return parseInt(this.version.replace(/\./g,""))}}),window.navigator.browserInfo=i,i.detect(),i}));
  const OS_CLASS = navigator.browserInfo['os'].toLowerCase();
  const NAME_CLASS = navigator.browserInfo['name'].toLowerCase();
  const RELEASE_CLASS = navigator.browserInfo['release'];
  var root = document.documentElement;
  root.classList.add(OS_CLASS, NAME_CLASS, `${OS_CLASS}-${NAME_CLASS}`, `${NAME_CLASS}${RELEASE_CLASS}`);
})();

const debounce =(func, delay)=> {
  let timeoutId;
  return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
          func.apply(context, args);
      }, delay);
  };
}
const pristineConfig = {
  // class of the parent element where the error/success class is added
  classTo: 'tw-form-group',
  errorClass: 'tw-has-error',
  successClass: 'tw-has-success',
  // class of the parent element where error text element is appended
  errorTextParent: 'tw-form-group',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'tw-text-tertiary-400 tw-caption tw-mt-2 tw-font-medium'
};