"use strict";for(var j,ll,selElmnt,a,b,c,x=document.getElementsByClassName("custom-select"),l=x.length,i=0;i<l;i++){for(ll=(selElmnt=x[i].getElementsByTagName("select")[0]).length,(a=document.createElement("DIV")).setAttribute("class","select-selected"),a.innerHTML=selElmnt.options[selElmnt.selectedIndex].innerHTML,x[i].appendChild(a),(b=document.createElement("DIV")).setAttribute("class","select-items select-hide"),j=1;j<ll;j++)(c=document.createElement("DIV")).innerHTML=selElmnt.options[j].innerHTML,c.addEventListener("click",function(e){for(var t,s,l,n=this.parentNode.parentNode.getElementsByTagName("select")[0],i=n.length,c=this.parentNode.previousSibling,a=0;a<i;a++)if(n.options[a].innerHTML==this.innerHTML){for(n.selectedIndex=a,c.innerHTML=this.innerHTML,l=(t=this.parentNode.getElementsByClassName("same-as-selected")).length,s=0;s<l;s++)t[s].removeAttribute("class");this.setAttribute("class","same-as-selected");break}c.click()}),b.appendChild(c);x[i].appendChild(b),a.addEventListener("click",function(e){e.stopPropagation(),closeAllSelect(this),this.nextSibling.classList.toggle("select-hide"),this.classList.toggle("select-arrow-active")})}function closeAllSelect(e){for(var t=[],s=document.getElementsByClassName("select-items"),l=document.getElementsByClassName("select-selected"),n=s.length,i=l.length,c=0;c<i;c++)e==l[c]?t.push(c):l[c].classList.remove("select-arrow-active");for(c=0;c<n;c++)t.indexOf(c)&&s[c].classList.add("select-hide")}document.addEventListener("click",closeAllSelect);
//# sourceMappingURL=custom-select.js.map
