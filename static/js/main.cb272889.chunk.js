(this.webpackJsonpclima=this.webpackJsonpclima||[]).push([[0],{52:function(e,t,a){},57:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),o=a(20),s=a.n(o),r=a(24),i=a.n(r),l=a(38),d=a(15),j=a(25),u=a(33),m=a(45),b=a(40),h=a(29),p=a(39),x=a(43),O=a(16),f=a(41),g=a(42),v=a(34),w=a(44),N=(a(51),a(52),a(10)),y=a(5);var C=function(){var e=Object(c.useState)(null),t=Object(d.a)(e,2),a=t[0],n=t[1],o=Object(c.useState)(!1),s=Object(d.a)(o,2),r=s[0],C=s[1],k=Object(c.useState)(null),S=Object(d.a)(k,2),I=S[0],P=S[1],A=Object(c.useState)(!1),B=Object(d.a)(A,2),q=B[0],R=B[1],z=Object(c.useState)(""),H=Object(d.a)(z,2),D=H[0],F=H[1],U=Object(c.useState)(null),J=Object(d.a)(U,2),L=J[0],T=J[1],_="5511983275107";function E(){return(E=Object(l.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return R(!0),"62f17a7cff53cf644e40267fda2b5aa3",a="http://api.openweathermap.org/data/2.5/weather?q=".concat(t,"&lang=pt&units=metric&appid=").concat("62f17a7cff53cf644e40267fda2b5aa3"),e.next=5,fetch(a).then((function(e){return e.json()})).then((function(e){"404"===e.cod?P("Cidade n\xe3o encontrada"):T(e)})).catch((function(e){console.error("Houve um problema ao efetuar a requisi\xe7\xe3o: "+e.message)}));case 5:R(!1);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(e){var t="";return t=[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some((function(e){return navigator.userAgent.match(e)}))?"whatsapp://send?phone=".concat(encodeURIComponent(_),"&text=").concat(encodeURIComponent(e)):"https://api.whatsapp.com/send?phone=".concat(encodeURIComponent(_),"&text=").concat(encodeURIComponent(e)),alert(t),t}return Object(c.useEffect)((function(){var e="8081c112a089489b8d31fdd779872d39";function t(){return(t=Object(l.a)(i.a.mark((function t(a,c){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return C(!0),n="https://api.opencagedata.com/geocode/v1/json?q=".concat(a,"+").concat(c,"&key=").concat(e),t.next=4,fetch(n).then((function(e){return e.json()})).then((function(e){console.log(e.results[0].components),F(e.results[0].components.city+", "+e.results[0].components.country)})).catch((function(e){console.error("Houve um problema ao efetuar a requisi\xe7\xe3o: "+e.message)}));case 4:C(!1);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}"geolocation"in navigator&&navigator.geolocation.getCurrentPosition((function(e){e.coords.latitude&&function(e,a){t.apply(this,arguments)}(e.coords.latitude,e.coords.longitude)}),(function(e){n(e.code)}))}),[]),Object(y.jsxs)(g.a,{fluid:!0,className:"p-0",children:[Object(y.jsxs)(j.a,{bg:"primary",children:[Object(y.jsx)(j.a.Brand,{href:"#home",children:"FateClima"}),Object(y.jsxs)(u.a,{className:"mr-auto",children:[Object(y.jsx)(u.a.Link,{href:"#home",children:"In\xedcio"}),Object(y.jsx)(u.a.Link,{href:"#contato",children:"Contato"})]}),Object(y.jsxs)(m.a,{inline:!0,children:[Object(y.jsx)(h.a,{type:"text",placeholder:r?"Aguarde, obtendo a cidade...":"Informe a cidade",className:"sm-3",value:D,onChange:function(e){return F(e.target.value)}}),"\xa0",r&&Object(y.jsx)(N.e,{className:"spinner",color:"white"}),Object(y.jsxs)(p.a,{variant:"secondary",onClick:function(){!function(e){E.apply(this,arguments)}(D)},children:[q?Object(y.jsx)(N.e,{className:"spinner",color:"white"}):Object(y.jsx)(N.d,{color:"white"}),"\xa0Obter Clima"]})]})]}),a&&Object(y.jsxs)(b.a,{variant:"danger",onClose:function(){return n(null)},dismissible:!0,children:[Object(y.jsx)(b.a.Heading,{children:"Ops! Ocorreu um erro ao obter a sua localiza\xe7\xe3o"}),Object(y.jsxs)("p",{children:[[{codigo:1,texto:"N\xe3o foi dada permiss\xe3o para o sistema poder encontrar a sua localiza\xe7\xe3o"},{codigo:2,texto:"N\xe3o foi poss\xedvel obter a sua localiza\xe7\xe3o"},{codigo:3,texto:"O tempo para obter a sua localiza\xe7\xe3o foi expirado!"}][a-1].texto," ",Object(y.jsx)("br",{}),"Digite a ",Object(y.jsx)("strong",{children:"cidade"})," desejada no campo de busca e clique em Obter Clima."]})]}),I&&Object(y.jsxs)(v.a,{onClose:function(){return P(null)},delay:4e3,autohide:!0,className:"bg-danger",children:[Object(y.jsxs)(v.a.Header,{children:[Object(y.jsx)("strong",{className:"mr-auto",children:"Cidade n\xe3o encontrada!"}),Object(y.jsx)("small",{children:"\u2639\ufe0f"})]}),Object(y.jsx)(v.a.Body,{className:"bg-white text-danger",children:"Por favor, fa\xe7a uma nova busca."})]}),Object(y.jsxs)(x.a,{className:"jumbotron-background jumbotron-texto",children:[Object(y.jsxs)("h1",{children:[Object(y.jsx)(N.c,{})," FateClima"]}),Object(y.jsxs)("p",{children:["Consulte o clima de qualquer cidade do mundo. ",Object(y.jsx)("br",{}),"App desenvolvido em ReactJS e integrado com as APIs Opencagedata e OpenWeatherMap"]})]}),q&&Object(y.jsx)(f.a,{className:"justify-content-center",children:Object(y.jsx)(w.a,{animation:"border",variant:"primary"})}),L&&Object(y.jsx)(f.a,{className:"justify-content-center",children:Object(y.jsxs)(O.a,{bg:"primary",className:"cartao text-center",children:[Object(y.jsxs)(O.a.Header,{children:[Object(y.jsx)("h2",{children:L.name}),Object(y.jsxs)("h3",{children:[L.main.temp,"\u2103"]})," ",Object(y.jsxs)("h5",{children:["min: ",L.main.temp_min,"\u2103",Object(y.jsx)(N.a,{className:"text-danger"})," - m\xe1x: ",L.main.temp_max,"\u2103",Object(y.jsx)(N.b,{className:"text-success"})]})]}),Object(y.jsxs)(O.a.Body,{className:"bg-dark",children:[Object(y.jsx)(O.a.Img,{src:"http://openweathermap.org/img/wn/".concat(L.weather[0].icon,"@4x.png"),title:L.weather[0].description}),Object(y.jsx)("h3",{className:"text-light",children:L.weather[0].description}),Object(y.jsx)(O.a.Title,{className:"text-light",children:"Previs\xe3o do Tempo"}),Object(y.jsxs)(p.a,{variant:"success",onClick:function(e){e.preventDefault(),window.location.href=M("A temperatura em ".concat(L.name," \xe9 de ").concat(L.main.temp))},children:[Object(y.jsx)(N.f,{})," Compartilhar"]})]}),Object(y.jsxs)(O.a.Footer,{className:"text-light",children:["Atualizado em: ",new Date(1e3*L.dt).toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo"})]})]})}),Object(y.jsx)(j.a,{bg:"dark",sticky:"bottom",id:"contato",className:"m-1",children:Object(y.jsxs)(j.a.Brand,{href:"#home",className:"text-light",children:[Object(y.jsx)(N.c,{})," FateClima - \xa9 - Todos os direitos reservados - Desenvolvido por mim"]})})]})};s.a.render(Object(y.jsx)(n.a.StrictMode,{children:Object(y.jsx)(C,{})}),document.getElementById("root"))}},[[57,1,2]]]);
//# sourceMappingURL=main.cb272889.chunk.js.map