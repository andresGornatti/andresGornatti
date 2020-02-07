	// --- CONTACT FORMULARIO --- //

  window.addEventListener("DOMContentLoaded", function() {
    
    let form = document.querySelector("#contact form");
    let button = document.querySelector("#submit");
    let status = document.querySelector("#contact .feedback > span");
	let feedbackEmail = document.querySelector("#contact .feedback");

    
    function success() {
      form.reset();
    }

    function error() {
      status.innerHTML = "No se pudo enviar tu mensaje.";
    }

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);   
	     
	      setTimeout(()=>{
	        feedbackEmail.style.opacity=1;
		    feedbackEmail.style.animation="slideInDown 1.5s";
		    feedbackEmail.style.display="block";
	      },1000);
    });
  });

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);

  	// Close .feedback
	document.querySelector("#contact .feedback .close-detailed-info").addEventListener("click",()=>{
	 	let feedbackEmail = document.querySelector("#contact .feedback");
	    feedbackEmail.style.opacity=0;
	    feedbackEmail.style.display="none";
	});
  }