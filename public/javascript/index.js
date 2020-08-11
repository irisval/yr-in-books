document.addEventListener("DOMContentLoaded", function(){
    copyJson = function() {
      const data = document.getElementById("json-area").innerText;
      const el = document.createElement('textarea');
      el.value = data;
      el.setAttribute('readonly', '');
      el.setAttribute('display', 'none');
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
});