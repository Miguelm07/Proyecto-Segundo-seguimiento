

  var config = {
    apiKey: "AIzaSyAuvC_9FsylKqRdL04X4HYfnd7ipRviWus",
    authDomain: "bdd1-b1bfa.firebaseapp.com",
    databaseURL: "https://bdd1-b1bfa.firebaseio.com",
    projectId: "bdd1-b1bfa",
    storageBucket: "bdd1-b1bfa.appspot.com",
    messagingSenderId: "153920590427"
  };
  firebase.initializeApp(config);

var refid = firebase.database().ref("ID").orderByKey();
var starCountRef = firebase.database().ref("Productos").orderByKey();
var Tcantidad;
var Tvalor;
var Ttotal;
var CantidadPro;
var precio;
var total=0;
var IDIAN;

var id_Producto = [];
var nombre_Producto = [];
var cantidad_Producto = [];
var valor_producto = [];
var cantida_total = [];


	//$('.ventas').hide();
		$('.contabilidad').hide();
			$('.administracion').hide();
				$('.auditoria').hide();
					$('.box').hide();
        $('#rol').show();


////////////////////////////////////////////////////////////////
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

      $( function() {
        $( "#datepicker" ).datepicker({format: 'd/m/yyyy',
                                        disableWeekends:true
                                      });    
      } );


///////////////////////////////////////////////////////////////

var doc = new jsPDF();

var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }

};

var options = {
         pagesplit: true
    };


$('#cmd').click(function () {   
  refrescarTablaH();

    doc.fromHTML($('#modal7').html(), 35, 25, {
        'width': 170,

            'elementHandlers': specialElementHandlers
    });

    doc.save('Historial.pdf');
});

function TerminarVenta() {
	// body...
}

function refrescarTablaH() {
  // body...
  var data = $('#datepicker').val();
  var fech;
  var contador=0;
  var sumaTotal=0;
  $('#Historial').empty();
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1;
  var yyyy = hoy.getFullYear();
  var  hora = hoy.getHours();
  console.log(data);
  if(data==''){

 fech = dd+'/'+mm+'/'+yyyy;
  }else{

 fech = data;
}
let usersRef = firebase.database().ref('Ventas'); 
usersRef.orderByChild('fecha').equalTo(fech).on("value", function(snapshot) { 
    console.log(snapshot.val()); 
    snapshot.forEach(function(doc) { 
    $('.PrecioTotaHistorial').empty();

      $('#Historial').append(
        '<tr>'+
        '<td>'+'CDA'+doc.val().DIAN+'</td>'+
        '<td>'+doc.val().nombre_cliente+'</td>'+
        '<td id="nombresP'+contador+'"></td>'+ 
         '<td id="preciosP'+contador+'"></td>'+
          '<td id="cantidadsP'+contador+'"></td>'+
           '<td>'+doc.val().fecha+'</td>'+
            '<td>'+doc.val().totalVenta+'</td>'+
            '<tr>'

        );
      for (var i = 0; i < doc.val().id.length; i++) {
        $('#nombresP'+contador).append(doc.val().nombre[i]+'<br>');
        $('#cantidadsP'+contador).append(doc.val().cantidad_vendida[i]+'<br>');
        $('#preciosP'+contador).append(doc.val().precio[i]+'<br>');
      }
  
      contador++;
      sumaTotal=parseInt(doc.val().totalVenta)+sumaTotal;
      console.log(doc.val().id.length);
      console.log('$'+sumaTotal);
      $('.PrecioTotaHistorial').append('$'+sumaTotal);
    });

  });


}

function DescontarCantidad(id,Cantidad,CantidadPro) {
	// body...
	var resta = parseInt(CantidadPro)-parseInt(Cantidad);

		firebase.database().ref().child('Productos/'+id).update({
		cantidad: resta
  });

}

function ReponerCantidad(id,CantidadPro,cantidad) {
	// body...
	var cambio = parseInt(CantidadPro);

		firebase.database().ref().child('Productos/'+id).update({
		cantidad: cambio
  });

}


function enviarReporte() {
    // body...
    var nombre = $('#nombre').val();
    var cedula = $('#cedula').val();
    var telefono = $('#telefono').val();
    var mensaje = $('#mensaje').val();
   	var	fecha = new Date(); 
	var  hora = fecha.getHours();

    firebase.database().ref().child('Soporte/'+fecha+hora).set({
	name: nombre,
    cedula: cedula,
    telefono : telefono,
    mensaje: mensaje,
    fecha : fecha+'-'+hora
  });

$('#nombre').empty();
$('#cedula').empty();
$('#telefono').empty();
$('#mensaje').empty();

}


function printDiv() {
var elemento = document.querySelector("#modal6");
    var ventana = window.open('', 'PRINT', 'height=400,width=600');
  ventana.document.write('<html><head><title>' + document.title + '</title>');
  ventana.document.write('</head><body >');
  ventana.document.write(elemento.innerHTML);
  ventana.document.write('</body></html>');
  ventana.document.close();
  ventana.focus();
  ventana.print();
  ventana.close();
  return true;
}


function refrescarcarrito() {
	// body...

	$('#carrito').empty();
   $('#btick').empty();
           $('.PrecioTotaCarrito').empty();
        $('#PrecioTotal').empty();

        total=0;

for(var i = 0 ; i< id_Producto.length; i++){
	      $('#carrito').append(
      	'<tr>'+
      	'<td>'+id_Producto[i]+'</td>'+
      	'<td>'+nombre_Producto[i]+'</td>'+
      	'<td>'+valor_producto[i]+'</td>'+
      	'<td>'+cantidad_Producto[i]+'</td>'+
      	'<td>'+parseInt(valor_producto[i])*parseInt(cantidad_Producto[i])+'</td>'+
      	'<td>'+'<a type="" href="#" id="'+i+'" onclick="QuitarDecarrito(this.id)">X</a>'+'</td>'
      	);

        $('#btick').append(
        '<tr>'+
        '<td>'+cantidad_Producto[i]+'</td>'+
        '<td>'+nombre_Producto[i]+'</td>'+
        '<td>'+parseInt(valor_producto[i])*parseInt(cantidad_Producto[i])+'</td>'+
        '</tr>');

        total = parseInt(valor_producto[i])*parseInt(cantidad_Producto[i]) + total;

}

        console.log(total);
        $('.PrecioTotaCarrito').append(total);
        $('#PrecioTotal').append(total);
}


function Agregar_carrito() {
	// body...
var id = $('#IDPro').val();
var nombre = $('#NomPro').val();
var cantidad = $('#Cantidad').val();

	

	var validacion = parseInt(CantidadPro)-parseInt(cantidad);

	if(validacion<0){


 swal ( "Oops" ,  "No tienes esa cantidad de este producto!" ,  "error" );

	}else{
	id_Producto.push(id);
	nombre_Producto.push(nombre);
	cantidad_Producto.push(parseInt(cantidad));
	valor_producto.push(parseInt(precio));
	cantida_total.push(CantidadPro);

	DescontarCantidad(id,cantidad,CantidadPro);

refrescarcarrito();

}

}



function QuitarDecarrito(pos) {
	// body...

var posv = parseInt(pos);

ReponerCantidad(id_Producto[posv],cantida_total[posv],cantidad_Producto[posv]);

	id_Producto.splice(posv, 1);
	nombre_Producto.splice(posv, 1);
	cantidad_Producto.splice(posv, 1);
	valor_producto.splice(posv, 1);
	cantida_total.splice(posv, 1);
	refrescarcarrito();
}


function Busquedaid(argument) {
	// body...

	let usersRef = firebase.database().ref('Productos'); 
usersRef.orderByChild('id').equalTo(argument).on("value", function(snapshot) { 
    console.log(snapshot.val()); 
    snapshot.forEach(function(data) { 
       	
     console.log(data.key);
     if(data.key === null){console.log('es nulo');}else{
     $('#NomPro').empty();
     $('#NomPro').val(data.val().name);
     CantidadPro=data.val().cantidad;
     precio=data.val().valor;
 	}
    
    }); 
    console.log(precio);
}); 

}

function BusquedaPorNombre(palabra) {
	// body...
let usersRef = firebase.database().ref('Productos'); 
usersRef.orderByChild('name').equalTo(palabra).on("value", function(snapshot) { 
    console.log(snapshot.val()); 
    snapshot.forEach(function(data) { 
       	
     console.log(data.key);
     if(data.key === null){console.log('es nulo');}else{
     $('#IDPro').empty();
     $('#IDPro').val(data.key);
     CantidadPro=data.val().cantidad;
     precio=data.val().valor;
 	}
    
    }); 
    console.log(precio);
}); 
	
}


function refrescarTabla() {
	// body...
		 $('.addProductoNew').empty();

		starCountRef.once('value').then(function(snapshot) {
		snapshot.forEach(function(doc) {
      // key will be "ada" the first time and "alan" the second time

      $('.addProductoNew').append(
      	'<tr>'+
      	'<td>'+doc.key+'</td>'+
      	'<td>'+doc.val().name+'</td>'+
      	'<td>'+doc.val().valor+'</td>'+
      	'<td>'+doc.val().cantidad+'</td>'+
      	'<td>'+parseInt(doc.val().valor)*parseInt(doc.val().cantidad)+'</td>'+
      	'<td>'+'<a type="" href="#" class="boton" id="'+doc.key+'" onclick="eliminarProducto(this.id)">Borrar</a>'+'</td>'+
      	'<td><a class="modal-trigger waves-effect waves-light btn" href="#modal4"  id="'+doc.key+'+'+doc.val().name+'+'+doc.val().valor+'+'+doc.val().cantidad+'"  onclick="clickModificar(this.id)" >Modificar</a></td>'
      	
      	);
      Tcantidad = Tcantidad + doc.val().cantidad;
      Tvalor = Tvalor + doc.val().valor;
      Ttotal = Ttotal + (parseInt(doc.val().valor)*parseInt(doc.val().cantidad));

  });
});





}

function Añadir(argument) {

	var dato = argument.split("+");

$('#IDPro').val(dato[0]);
$('#NomPro').val(dato[1]);
CantidadPro=dato[2];
precio= dato[3];
console.log(dato[2]);

}

function GenerarID() {
  refid.once('value').then(function(snapshot) {
    snapshot.forEach(function(doc) {
      // key will be "ada" the first time and "alan" the second time
     completarVenta( doc.val().id);
     console.log(doc.val().id)
          firebase.database().ref().child('ID/ID').set({
          id: parseInt( doc.val().id)+1

           });

  });
});

  $('#DIAN').append(IDIAN);
}





function completarVenta(IDDIAN) {
	
		var email = $('#email').val();
		var NombreC = $('#NomCli').val();
		var cedula = $('#Cc').val();

 var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1;
  var yyyy = hoy.getFullYear();
  var  hora = hoy.getHours();
  var id = btoa(nombre);
    
    console.log(IDDIAN);
     $('#DIAN').append('CDA'+IDDIAN);

	firebase.database().ref().child('Ventas/CDA'+IDDIAN).set({
    DIAN:IDDIAN ,
	  id: id_Producto,
    nombre: nombre_Producto,
    cantidad_vendida : cantidad_Producto,
    precio: valor_producto,
    nombre_cliente:NombreC,
    email:email,
    cedula:cedula,
    totalVenta:total,
    fecha :dd+'/'+mm+'/'+yyyy,

  });

  printDiv();
  id_Producto.splice(1,id_Producto.length);
  nombre_Producto.splice(1,id_Producto.length);
  cantidad_Producto.splice(1,id_Producto.length);
  cantida_total.splice(1,id_Producto.length);
  $('#DIAN').empty();
}







function refrescarTablap(){


		 $('.addProducto').empty();

		starCountRef.once('value').then(function(snapshot) {
		snapshot.forEach(function(doc) {
      // key will be "ada" the first time and "alan" the second time
     
      $('.addProducto').append(
      	'<tr>'+
      	'<td>'+doc.key+'</td>'+
      	'<td>'+doc.val().name+'</td>'+
      	'<td>'+doc.val().valor+'</td>'+
      	'<td>'+doc.val().cantidad+'</td>'+
      	'<td>'+parseInt(doc.val().valor)*parseInt(doc.val().cantidad)+'</td>'+
      	'<td>'+'<a class="modal-trigger waves-effect waves-light btn" href="#" id="'+doc.key+'+'+doc.val().name+'+'+doc.val().cantidad+'+'+doc.val().valor+'" class="boton" onclick="Añadir(this.id)">Añadir</a>'+'</td>'+
      	'<td><a class="modal-trigger waves-effect waves-light btn" href="#" >Generar</a></td>'
      	);
      Tcantidad = Tcantidad + doc.val().cantidad;
      Tvalor = Tvalor + doc.val().valor;
      Ttotal = Ttotal + (parseInt(doc.val().valor)*parseInt(doc.val().cantidad));

  });
});
//Historial

}


function login() {
	// body...
	var rol = $('#rol').val();
	var pass = $('#pass').val();

	if(rol === 'ventas'){
	console.log("ventas");
	$('.box').hide();
	$('.ventas').show();


	}else if(rol === 'contabilidad'){

	if(pass === 'conta321'){
		
		console.log("contabilidad");
			$('.box').hide();
			$('.contabilidad').show();


	}else{alert("contraseña incorrecta");}

	}else if(rol === 'administracion'){

	if(pass === 'admin1'){
		
		console.log("administracion");
			$('.box').hide();
			$('.administracion').show();



	}else{alert("contraseña incorrecta");}

	
	}else if(rol === 'auditoria'){
		
	if(pass === 'aud321'){
		
		console.log("auditoria");
			$('.box').hide();
			$('.auditoria').show();



	}else{alert("contraseña incorrecta");}


	}
}

function eliminarProducto(argument) {
	// body...
	firebase.database().ref('Productos/'+argument).remove();

	refrescarTabla();
}

function clickModificar(argument) {
    // body...

    var dato = argument.split("+");
    var idM = dato[0];
    var nombreM = dato[1]
    var precioM = dato[2];
    var cantidadM = dato[3];

      $(".mask2").addClass("active2");
      $('#idM').val(idM);
      $('#nombreM').val(nombreM);
      $('#precioM').val(precioM);
      $('#CantidadM').val(cantidadM);
}


function modificarProducto() {
	// body...


firebase.database().ref().child('Productos/'+$('#idM').val()).update({
	  
      name: $('#nombreM').val(),
      valor: $('#precioM').val(),
      cantidad:$('#CantidadM').val()
  });


refrescarTabla();
}
