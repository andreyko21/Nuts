"use strict";document.addEventListener("DOMContentLoaded",function(){function t(){var e=this.parentElement.querySelector(".quantity-num");1<parseInt(e.value)&&(e.value=parseInt(e.value)-1)}function n(){var e=this.parentElement.querySelector(".quantity-num");e.value=parseInt(e.value)+1}var e,r;e=document.querySelectorAll(".quantity-arrow-minus"),r=document.querySelectorAll(".quantity-arrow-plus"),e.forEach(function(e){e.addEventListener("click",t)}),r.forEach(function(e){e.addEventListener("click",n)})});
//# sourceMappingURL=input-select-number.js.map
