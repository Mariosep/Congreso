function validarFormulario() {
        var valid = true;
        var not_null = /^.+$/;
        if (!not_null.test(document.forms[0].fullName.value)) {
          document.forms[0].fullName.placeholder = 'Introduzca el Nombre';
          document.forms[0].fullName.style.backgroundColor = "#f7c5c5";
          
          valid = false;
        }

        if (!not_null.test(document.forms[0].apel.value)) {
          document.forms[0].apel.placeholder = 'Introduzca los Apellidos';
          document.forms[0].apel.style.backgroundColor = "#f7c5c5";
          
          valid = false;
        }
        var email_val = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (!email_val.test(document.forms[0].email.value)) {
          document.forms[0].email.value = '';
          document.forms[0].email.placeholder = 'Introduzca un email válido';
          document.forms[0].email.style.backgroundColor = "#f7c5c5";
          valid = false;
        } 
        if (!not_null.test(document.forms[0].location.value)) {
          document.forms[0].location.placeholder = 'Introduzca una localización';
          document.forms[0].location.style.backgroundColor = "#f7c5c5";
          valid = false;
        }

        var tel_val = /^(\+34|0034|34)?[9|8][0-9]{8}$/;
        if(!tel_val.test(document.forms[0].tel.value)){
          document.forms[0].tel.value = '';
          document.forms[0].tel.placeholder = 'Introduzca un teléfono válido';
          document.forms[0].tel.style.backgroundColor = "#f7c5c5";
          valid = false;
        }

        var tel_mov = /^(\+34|0034|34)?[6|7|9|8][0-9]{8}$/;
        if(!tel_mov.test(document.forms[0].tel.value)){
          document.forms[0].telmov.value = '';
          document.forms[0].telmov.placeholder = 'Introduzca un teléfono válido';
          document.forms[0].telmov.style.backgroundColor = "#f7c5c5";
          valid = false;
        }
        
        if(document.forms[0].country.value == 0){
          document.forms[0].country.style.backgroundColor = "#f7c5c5";
          valid = false;
        }
        
        if (!not_null.test(document.forms[0].dir.value)) {
          document.forms[0].dir.placeholder = 'Introduzca su dirección';
          document.forms[0].dir.style.backgroundColor = "#f7c5c5";
          valid = false;
        }
        
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        today = yyyy + '/' + mm + '/' + dd  ;
        
        if(document.forms[0].sourceDate.value < today){
          document.forms[0].sourceDate.style.backgroundColor = "#f7c5c5";
          valid = false;
        }
        if(document.forms[0].destDate.value < today){
          document.forms[0].destDate.style.backgroundColor = "#f7c5c5";
          valid = false;
        }

        if(!valid){
          $('html, body').animate({
          scrollTop: $("#myPage").offset().top
          }, 1500);
        }else{
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/users/",
                contentType: "application/json",
                dataType: "text",
                data: JSON.stringify({
                    "nombre": fullName,
                    "apellidos": apel,
                    "year": year
                }),
                success: function(data) {
                    $("#resGetHello").html(data);
                },
                error: function(res) {
                    alert("ERROR " + res.statusText);
                }
            });
        }
        return valid;
      }