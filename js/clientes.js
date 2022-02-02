//obtenemos los datos del formulario
const clienteInput=document.querySelector("#cliente");
const productoInput=document.querySelector("#producto");
const telefonoInput=document.querySelector("#telefono");
const fechaInput=document.querySelector("#fecha");
const horaInput=document.querySelector("#hora");
const precioInput=document.querySelector("#precio");
const saldoInput=document.querySelector("#saldo");

//obtenemos formulario

const form=document.querySelector("#nuevo-cliente");
const contenidoCliente=document.querySelector("#citas");

let editar;

eventListener();
function eventListener(){
    clienteInput.addEventListener('input',datosCliente);
    productoInput.addEventListener('input',datosCliente);
    telefonoInput.addEventListener('input',datosCliente);
    fechaInput.addEventListener('input',datosCliente);
    horaInput.addEventListener('input',datosCliente);
    precioInput.addEventListener('input',datosCliente);
    saldoInput.addEventListener('input',datosCliente);
    form.addEventListener('submit',nuevoCliente);
    

}



class Clientes{
    
    constructor(){
        this.clientes=[];
    }

    agregarClientes(cliente){
        this.clientes=[...this.clientes,cliente];
      

    }

    eliminarCliente(id){
        this.clientes=this.clientes.filter(cliente=>cliente.id !==id);

    }
    editarCliente(clienteeditado){
        this.clientes=this.clientes.map((cliente)=>cliente.id===clienteeditado.id ? clienteeditado: cliente )
    }

}


class IU{


    imprimirAlerta(mensaje,error){

        const divAlerta=document.createElement('div');
        divAlerta.classList.add('text-center','alert','d-block','col-12');
        if(error==='error'){
            divAlerta.classList.add('alert-danger','text-center');
           
        }else{
            divAlerta.classList.add('alert-success','text-center');
        }
        divAlerta.textContent=mensaje;
        //insertar en html
        document.querySelector('#contenido').insertBefore(divAlerta,document.querySelector('.agregar-cita'));

        setTimeout(()=>{
            divAlerta.remove();
        },3000);


    }

    imprimirClientes({clientes}){
        this.limpiarHtml();
       clientes.forEach((cli)=>{
                const {cliente,producto,telefono,fecha,hora,precio,saldo,id}=cli;
                let faltante;
                faltante=cli.datos(precio,saldo);
                console.log(faltante);

        const divcliente=document.createElement('div');
        divcliente.classList.add('cita','p-3');
        divcliente.dataset.id=id;
        
        // scriptin de la cita

        const clienteParrafo=document.createElement('h2');
        clienteParrafo.classList.add('card-title','font-weight-bolder');
        clienteParrafo.textContent=cliente;

        const productoParrafo=document.createElement('p');
        productoParrafo.innerHTML=`
        <span class="font-wight-bolder">Producto: </span>${producto}
        
        `;

        const telefonoParrafo=document.createElement('p');
        telefonoParrafo.innerHTML=`
        <span class="font-wight-bolder">Telefono: </span>${telefono}
        
        `;

        const fechaParrafo=document.createElement('p');
        fechaParrafo.innerHTML=`
        <span class="font-wight-bolder">Fecha: </span>${fecha}
        `;

        const horaParrafo=document.createElement('p');
        horaParrafo.innerHTML=`
        <span class="font-wight-bolder">Telefono: </span>${hora}
        
        `;

        const precioParrafo=document.createElement('p');
        precioParrafo.innerHTML=`
        <span class="font-wight-bolder">Precio:  $</span>${precio}
        
        `;

        const abonadoParrafo=document.createElement('p');
        abonadoParrafo.innerHTML=`
        <span class="font-wight-bolder">Saldo apartado: $</span>${saldo}
        
        `;

        const faltanteParrafo=document.createElement('p');
        faltanteParrafo.innerHTML=`
        <span class="font-wight-bolder">Restante: $</span>${faltante}
        
        `;

        const btnEliminar=document.createElement('button');
        btnEliminar.classList.add('btn','btn-danger','mr-2');
        btnEliminar.innerHTML='Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor>'+
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';

        btnEliminar.onclick=()=>{
            eliminarCliente(id);
        }

        const btnEditar=document.createElement('button');
        btnEditar.classList.add('btn','btn-danger','mr-2');
        btnEditar.innerHTML='Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor>'+
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';

        btnEditar.onclick=()=>{
            editarCliente(cli);
        }

        divcliente.appendChild(clienteParrafo);
        divcliente.appendChild(productoParrafo);
        divcliente.appendChild(telefonoParrafo);
        divcliente.appendChild(fechaParrafo);
        divcliente.appendChild(horaParrafo);
        divcliente.appendChild(precioParrafo);
        divcliente.appendChild(abonadoParrafo);
        divcliente.appendChild(faltanteParrafo);
        divcliente.appendChild(btnEliminar);
        divcliente.appendChild(btnEditar);
        contenidoCliente.appendChild(divcliente);
                
       })
      
    }

    limpiarHtml(){
        while(contenidoCliente.firstChild){
            contenidoCliente.removeChild(contenidoCliente.firstChild);
        }
    }
}
const iu= new IU();
const administrarClientes= new Clientes();

const ClienteObj={
    cliente:'',
    producto:'',
    telefono:'',
    fecha:'',
    hora:'',
    precio:'',
    saldo:'',
    datos:function(saldo,precio){
        let total
        return total=saldo-precio;
    }
}











function datosCliente(e){
    ClienteObj[e.target.name]=e.target.value;
  

}

//instanciamos objetos




function nuevoCliente(e){
    e.preventDefault();
    const {cliente,producto,telefono,fecha,hora,precio,saldo}=ClienteObj;

    if(cliente==='' || producto==='' || telefono==='' || fecha==='' || hora==='' || precio==='' 
    || saldo===''){
        iu.imprimirAlerta('Porfavor complete todos los campos','error');
        return;
    }else if(Number(saldo)>Number(precio)){
        iu.imprimirAlerta('El saldo no puede ser mayor al precio del producto','error');
        return;
    }

    console.log(ClienteObj.datos(precio,saldo));

   
    if(editar){
        
        administrarClientes.editarCliente({...ClienteObj});
        iu.imprimirAlerta('Cliente editado correctamente');
        form.querySelector('button[type="submit"]').textContent='Crear cita';
        
        //quitar edicion
        editar=false;


    }else{
        ClienteObj.id=Date.now();
        administrarClientes.agregarClientes({...ClienteObj});
        iu.imprimirAlerta('Cliente agregado correctamente');
    }

    form.reset();
    objetoReset();
    

    iu.imprimirClientes(administrarClientes);
    

}

function objetoReset(){
    ClienteObj.cliente='',
    ClienteObj.producto='';
    ClienteObj.telefono='';
    ClienteObj.fecha='';
    ClienteObj.hora='';
    ClienteObj.precio='';
    ClienteObj.saldo='';
}




function eliminarCliente(id){
    administrarClientes.eliminarCliente(id);
    iu.imprimirAlerta('Cliente eliminado exitosamente');
    iu.imprimirClientes(administrarClientes);
}

function editarCliente(cli){
  
    const{cliente,producto,telefono,fecha,hora,precio,saldo}=cli;

    clienteInput.value=cliente;
    productoInput.value=producto;
    telefonoInput.value=telefono;
    fechaInput.value=fecha;
    horaInput.value=hora;
    precioInput.value=precio;
    saldoInput.value=saldo;

    //

    ClienteObj.cliente=cliente;
    ClienteObj.producto=producto;
    ClienteObj.telefono=telefono;
    ClienteObj.fecha=fecha;
    ClienteObj.hora=hora;
    ClienteObj.precio=precio;
    ClienteObj.saldo=saldo;

    form.querySelector('button[type="submit"]').textContent='Guardar cambios';

   

    editar=true;


}