  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAlUjLJwxvUNiHb05aKNZzVHoIhnip8VKE",
    authDomain: "firstproyect-40c55.firebaseapp.com",
    databaseURL: "https://firstproyect-40c55.firebaseio.com",
    storageBucket: "firstproyect-40c55.appspot.com",
    messagingSenderId: "960595687716"
  };
  firebase.initializeApp(config);

 function getHour(){
   var d = new Date();
   return d.getHours();
 }

 function getMinute(){
   var d = new Date();
   return d.getMinutes();
 }

  function mensaje() {
    if (getHour()<9) {
       return "¡Vaya, hoy has madrugado!";
    } else {
      if (getHour()==9&&getMinute()<=15) {
        return "¡Bien, llegaste a la hora!";
      } else {
          return "¡No te pases pues, es tarde!";
      }
    }
  }
  function getUsuario() {
    return $('#usuario').val();
  }
  function saveMsg (saveh,savem,msg) {
  firebase.database().ref(
    'asistencia/'+getUsuario()
    ).set({
      entrada:{
        hora:8,
        minuto:00
      },
      llegada:{
        hora:saveh,
        minuto:savem
      },
      mensaje:msg
    });
  }


  function loadAutoComplete (data) {
    $('#buscar').autocomplete(
    {
      source: data
    });
  }
  function getAutoCompleteElements(substring){
    var val=substring;
    var i=0;
    var names =[];
    firebase.database().ref('asistencia/').on('value',function(snapshot) {
      for(key in snapshot.val()){
        if (key.indexOf(val)>-1) {
          if (i<5) {
            names.push(key);
            i++;
          }
        }
      }
      loadAutoComplete(names);
    });
  }

  function setDataIntoHTML (data) {
    $("#mensaje").val(data.mensaje);
  }
  function setDataIntoHTMLMore (data) {
    $("#hora").val(data.hora);
    $("#minuto").val(data.minuto);
  }
  function loadForm (data) {
    firebase.database().ref('asistencia/'+data).on('value',function (snapshot) {
      var data=snapshot.val();
      setDataIntoHTML(data);

    });
  }
  function loadFormMore (data,valor) {
    firebase.database().ref('asistencia/'+data+'/'+valor).on('value',function (snapshot) {
      var data=snapshot.val();
      setDataIntoHTMLMore(data);
    });
  }

  $(document).ready(function(){
    $('#marcar').click(function () {
      //(hora,minuto,mensaje);
      if ($('#usuario').val()!="") {
        saveMsg (getHour(),getMinute(),mensaje());
        $('#alert').css("background-color", "#6ABC6E"); 
        $('#alert').show();
        $('#alertext').text("Registro exitoso.");
        $('#usuario').val("");
        $('#alert').fadeOut(3000);
        //alert("Registro exitoso.");
      }
      else{
        $('#alert').css("background-color", "#FFA92B"); 
        $('#alert').show();
        $('#alertext').text("Vuelva a ingresar un nombre.");
        $('#alert').fadeOut(3000);
        //alert("Vuelva a ingresar un nombre.");
      }
    });
    $('#buscar').on('keyup',function(e){
      if (e.which==13) {
        loadForm($(this).val());
        loadFormMore($(this).val(),'entrada');
        loadFormMore($(this).val(),'llegada');
      } else {
        getAutoCompleteElements($(this).val());
      }
    });
  });
  //$('#marcar').prop( "disabled", false );
  //$('#mensaje').val("");
  //$('#mensaje').show();
  //$('#mensaje').hide();
  //$('#usuario').val("");
  $('#alert').hide();
  $('#buscar').val("");
  $('#hora').val("");
  $('#minuto').val("");
  $('#mensaje').val("");