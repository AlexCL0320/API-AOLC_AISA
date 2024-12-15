# Login - API Comidas y sus Ingredientes

**Integrantes del Equipo:**  
López Carreño Alexis Oswaldo   
Santiago Anaya Adán Ismael   

**Materia**: Programación Web  
**Docente**: Martínez Nieto Adelina  


**Objetivo**: Generación de un Login que solicite al usuario el ingreso de un correo y una contraseña, estos datos serán verificados mediante solicitudes GET, donde si estos datos coinciden con algún registro de la lista obtenida, se permitirá el acceso a la pantalla principal, donde se podrá mostrar la lista de comidas y usuarios; En caso contrario, se mostrará un mensaje de alerta con el mensaje "Usuario Inválido"

Proyecto Generado con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10. 

# 1.- Pantallas Principales de la Aplicación  
## Pantalla de Login para validación de Usuarios  
![image](https://github.com/user-attachments/assets/b7366bff-dbcb-4f72-a4f5-4e09ea7cfdf3)

## Pantalla de Validación de Usuario  
![image](https://github.com/user-attachments/assets/3e2bc95b-e43e-4d88-a110-eb79a4c220a6)

## Pantalla Principal  
![image](https://github.com/user-attachments/assets/5c63ab7f-3b72-4480-b5d5-0fce31171e5a)

## Menú de Selección  
![image](https://github.com/user-attachments/assets/8af0cc99-4266-464f-af35-42a720ae37c5)

## Pantalla de Tabla de Usuarios  
![image](https://github.com/user-attachments/assets/42fe88ff-fcac-4a20-a667-8592fb942155)

## Pantalla de Visualización de un Usuario Específico  
![image](https://github.com/user-attachments/assets/9915ee02-84fb-4ed4-8e27-dfe5aa4499c1)

## Pantalla de Tabla de Comidas  
![image](https://github.com/user-attachments/assets/5a0605f4-931a-4b16-8079-589b5f11b049)

## Pantalla de Visualización de una Comida Específica   
![image](https://github.com/user-attachments/assets/1dd4390a-5c0d-4848-a728-42a2c15e917f)

# 2.- Explicación del Código  
Para el desarrollo del proyecto ha sido utilizado Angular para la creación del frontend de la aplicación, cumpliendo con la función de creación de las vistas y de realizar llamadas al Backend para la obtención de información requerida por el usuarios (Lista de usuarios, Lista de Comidas, Validación de un Usuario, Eliminación, etc.). Inmplementando funcionalidades de solicitures estándar: GETM POST, PUT, DELETE.

## Requisitos Previos  
1.- IDE de desarrollo (Visual Studio CODE)  
2.- Instalación del Framework ANGULAR CLI vs 18.2.10  
3.- Instalación de librerias npm  
4.- Instalación de librerias boostrap  
5.- Instalación de libreria ngx pagination  
6.- Instalación de Material Desing (Para la incorporación de componentes)  

## Módulos Generados   
###  Login  
Componente que conforma una interfaz de usuario que permite realizar la autenticación en la aplicación. Se encuentra construida por elemnentos como un mensaje de bienvenida, fondo con degradado, mensaje de introducción a la aplicación, imagenes referentes al tema de la aplicación y un formulario de inicio de sesión que solicita al usuario el ingreso de un email y contraseña

#### Código de estilos CSS  
Conjunto de Estilo CSS, utilizado para la definición de la apariencia del login, define el contenedor principal de la tarjeta, estilos de sombra y tamaño de imagenes para una mejor presentación de Login   

![image](https://github.com/user-attachments/assets/df1a9805-d30b-4303-b6b9-9a157868dbd3)

#### Código de Archivo HTML  
Código HTML que define las estructuras e interfaz de inicio de seción, compuerto por bloques card-header, así como la implementación del componente "<app - footer>"

![image](https://github.com/user-attachments/assets/25d1d92c-884d-4026-9de4-4751ddc2c5f4)

#### Código de Componente  
Componente diseñado para la gestión de la lógica de inicio de sesión de la aplicación, haciendo la importación de los módulos necesarios para el funcionamiento de la interfaz, el componente incluye un formulario para la captura de datos del usuario y la obtención de datos por parte del backend mediante el uso del método getUsers(), Este método hace una llamada a la API del backend para la obtención de la lita de todos los usuarios registrados, utilizando esta información para la comparación de información ingresada por el usuario.

![image](https://github.com/user-attachments/assets/0e541420-57b3-4a79-bac8-756825d54640)

###  Home  
Componente correspondiente al funcionamiento de la pantalla principal de la aplicación, implementando una barra superior que incluye un menú de selección de operaciones donde el usuario puede seleccionar los datos que serán recuperados y mostrados de manera organizada

![image](https://github.com/user-attachments/assets/c47cfc9c-8d15-4b39-820a-a0f925efa0b1)

#### Código de estilos CSS  
Define los estilos para el contenedor con un fondo degradado y centrado, mismo que proporciona una correcta visibilidad de la página, definiendo esquinas redondeadas para los elementos, así como la implementación de una sombra para una mejor presentación de los elementos 

![image](https://github.com/user-attachments/assets/1c02cb0b-cfcc-447a-8fb1-9933059da905)

#### Código de Archivo HTML  
El código proporciona una estructura básica para la página webm implementando una barra superior, contenedor y pie de página. Dentro del código es utilizado el componente <app - footer>, se define principalmente una pantalla amigable preparada para la apertura de otros elementos

![image](https://github.com/user-attachments/assets/370d13da-b278-4a57-93aa-f757910dfa00)

#### Código de Componente  
Implementa las dependencias necesarias para para el funcionamiento del componente, proporciona características como una barra de herramientas, botones, íconos y menú, así mismo implementa componentes para la navegación e interacción con rutas de la aplicación, permitiendo navegar entre las diferentes interfaces creadas

![image](https://github.com/user-attachments/assets/cdc9617f-5c9b-479a-981b-9face0fef777)

###  Footer  
Define el componente de pie de página personalizado dentro de la aplicación. Este componente es utilizado para mostrar información relevante del sistema mediante una barra inferior dentro de la página.

#### Código de estilos CSS  
Estilo CSS que proporciona propiedades de color, radio y tamaño del tipo de letra  

![image](https://github.com/user-attachments/assets/1892b965-f3f4-44ea-8111-61392831c45b)

#### Código de Archivo HTML  
Es implementada la estructura "mat-card" para la construcción de un pie de página el cual muestra el mensaje "Todos los derechos reservados ITO" además de un logo correspondiente.

![image](https://github.com/user-attachments/assets/ea422a60-9a8c-407b-9f41-19ef8adc1443)

#### Código de Componente  
El código se encarga de representar el pie de página en la aplicación, configura las propiedades básicas del elemento, permite su uso como plantilla en etiqueta HTML

![image](https://github.com/user-attachments/assets/8d41e78e-514c-43c8-b43a-1680f8ed359a)

###  Header  
Corresponde al elemento de encabezado, proporciona información y funcionalidad para la selección dentro de un menú, así como la foto de perffl.

#### Código de estilos CSS  
El código define estilos especificos para el encabezado, estableciendo un tono azul con degradado, así como una forma circular para la imagen del usuario

![image](https://github.com/user-attachments/assets/37f14fdc-463e-4ef3-8fef-1ae6acd91dd2)

#### Código de Archivo HTML  
Define la estructura del encabezado haciendo uso de los componentes mat-card y mat-card-content de la paquetería de Angular Material, implementando la estructura <app - menu> para el uso de componente de un menú de navegación

![image](https://github.com/user-attachments/assets/497d4db0-5257-4cb9-9280-4133a16312b1)

#### Código de Componente  
Define la gestión de operaciones del encavezado, incluye funcionalidade para la obtencion de una lista de usuairos 

![image](https://github.com/user-attachments/assets/e58da92e-6a09-4e0a-ab00-b199a57d448e)

###  Menu  
#### Código de Archivo HTML  
Define un menú desplegable interactivo, conntiene diferentes acciones, haciendo uso de mat-icon-button y mat-menu para su construcción; Es generaado un botón flotante que al ser presionado es mostrado un emnú interactivo 

![image](https://github.com/user-attachments/assets/d412dcfd-47d7-4e2c-8010-b3f1d9f1b3fd)

#### Código de Componente  
Componente que implementa operaciones para la navegación entre distintas rutas de la aplicación, de acuerdo a la opción seleccionada por el usuario, permitiendo la navegación entre las pantallas de: Usuarios, Home, Comidas y Login.

![image](https://github.com/user-attachments/assets/86f52355-964a-4162-a273-09e6b664264d)

###  Comidas-details  
#### Código de estilos CSS  
Define el estido del cuadro de dialogo encargado de mostrar las características principales de la comida seleccionada, el contenido del cuadro de díalo contiene un fondo azul, diseño redondeado con una imagen central circular 

![image](https://github.com/user-attachments/assets/1d1eccbe-652c-4888-b08d-26c5dc983932)

#### Código de Componente  
Componente utilizado para mostrar los detalles de un elemento de la lista de comidas, esto dentro de un cuadro de diálogo, incluyendo una imagen, nombre, ingredientes y precio, implementando un botón central de cerrar para mayor facilidad al usuario

![image](https://github.com/user-attachments/assets/34b42eed-db63-463c-be65-a2d0ef4c6952)

![image](https://github.com/user-attachments/assets/c378ca98-4b65-4558-abc2-9a7734e52088)

###  Usuarios-details  
#### Código de estilos CSS  
Al igual que "comidas-details" son definidas los estilos correspondientes a la personalización del contendio del cuadro de diálogo donde serán mostrados todas las características de un usuario específico, implementando un fondo azul de tonalidad clara con una imagen central para idenificación de la persona.  

![image](https://github.com/user-attachments/assets/ea2a52df-a8ce-45ab-a6ef-132768db76a0)

#### Código de Componente  
Define el componente utilizado para mostrar los detalles de un usuario dentro del cuadro de diálogo, empleando la paquetería de Angular Material para proporcionar una interfaz atractiva al usuario.

![image](https://github.com/user-attachments/assets/6ab68b8c-0338-4c66-869b-f1300b19e8c5)

![image](https://github.com/user-attachments/assets/a443efa6-710a-42ee-9792-a737a125cfc0)

### Modulos Específicos     
#### Comidas-Lista  
Define la plantilla para mostrar la lista de platillos dentro de una tabla, incluyendo una barra de filtrado, columnas correspondientes con el ID del platillo, nombre, ingredientes, categoría, precio, imagen y botones de acción para la eliminación, edición o ver los detalles del registro.

##### Código CSS  
![image](https://github.com/user-attachments/assets/bdc39f50-f658-4213-b56e-d6c55f4dc0ba)

##### Código HTML  
![image](https://github.com/user-attachments/assets/80d6015d-ec5a-4fc8-a885-fe387eb0eb0f)

##### Código de Componente   
efine la gestión de la lista de platillos, funcionalidad del filtro, busqueda y acciones sobre los platillos, permite el filtro mediante cartegorías especificas, nombre, o precui, así como operaciones como ver los detalles de la comida haicendo uso de otros componentes, eliminación de la comida y edición de esta. haciendo uso de llamadas de actualizacón, eliminación y obtención en la API.  
![image](https://github.com/user-attachments/assets/72f527a0-d924-4609-9eb5-805ba5e77f17)

Es utilizado el componente "MatTableDataSourse" para la gestión y visualización de los datos en la tabla, aplicando la paginacipon y ordenado para facilitar la navegación y clasificación de los datos  
![image](https://github.com/user-attachments/assets/28816d88-37c0-4c93-b4c2-ef20c631cea0)

#### Comidas-Edit  
El componente permite editar los detalles de una comida seleccionada, cada uno de los campos está vinculado al objeto data de tipo comida, haciendo uso de la directiva ngModel para el enlace entre el modelo y la vista. Cuando el usuario decide guardar los cambios, se muestra un mensaje de confirmación. si esta es afirmativa los cambios se envían de vuelta al componente.

Si el usuario opta por cancelar la operacion se cierra sin realizar operaciones.

##### Código CSS  
![image](https://github.com/user-attachments/assets/d937d974-ad96-4f4a-86af-329c25cb16c2)

##### Código de Componente   
![image](https://github.com/user-attachments/assets/06f2d222-95d1-4121-b760-0e25e633bbe3)

#### Usuarios-Lista  
Componente correspondiente a la página de administración de la lista de usuarios mediante una tabla, permitiendo realizar la busqueda, ver detalles, o eliminar registros. La página ucenta con una estructura de fondo gradiente, aplicando estilos a los elementos.   
La tabla incluye elementos pacomo lo son: Id, Nombre, Apellidos, Corro, Foto, Detalles y un apartado de acciones, que permite, editar o eliminar el registro, además es incluido un elemento de paginación que permite ajustar los tamaños de página a 20,50 y 100 elementos.

![image](https://github.com/user-attachments/assets/081d4dad-5d5d-46af-99ee-26397a6d07da)

##### Código CSS  
![image](https://github.com/user-attachments/assets/b850421f-6757-4418-9145-8ba6f5803fce)

##### Código HTML  
![image](https://github.com/user-attachments/assets/6ea33d17-3598-4dd7-a24b-225d2919a0dc)

##### Código de Componente   
![image](https://github.com/user-attachments/assets/1445cde0-4864-4796-b58c-5406dfcaccc5)

#### Usuarios-Edit  
Consiste en la implementación para la edición de un usuario. Permite realizar la edición de todos los atributos, se hace uso de la instrucción PUT para el envió de datos al bakcend donde es realizada la operación de corrección retornando un mensaje de exito o fallo.

##### Código CSS  
![image](https://github.com/user-attachments/assets/23d96d1d-1c29-42f7-91f5-6d38d08a774b)

##### Código de Componente   
![image](https://github.com/user-attachments/assets/3ff8ac47-60f7-4980-bb06-8ceb7c29e864)

## Servicios Generados     
###  Comida  
Servicio que se encarga de la gestión de las solicitudes HTTP hacia el backend para realizar operaciones sobre las comidas, hace uso del cliente HTTP de Angular para enviar y recibir datos desde el servidor  
Se tiene una URL definida para la API de comidas en el backend Http://127.0.0.1:8000/api/comidas. Siendo este el punto de acceso al que se hará n las solicitudes para obtener, actualizar o eliminar registros.   
Dentro del servicio se hacen solicitues HTTP de tipo GET para obtener las comidas desde el backend, obteniendo respuesta  en un objeto que contendra la lista de todas las comidas en formato JSON. Así mismo se hace una solicitud de tipo PUT para actualizar una comida existente y finalmente se puede realizar una solicitud de tipo DELETE para eliminar una comida 

![image](https://github.com/user-attachments/assets/7224a442-a991-455c-90fa-a5c26432d6cb)


###  Usuarios  
Servicio que interactua con el backend para realizar operaciones sobre los usuarios, implementa HttpClient para realizar solicitures HTTP, permitiendo realizar acciones como la eliminación, edición y obtención de usuarios a través de la API del backend  
Permite realizar solicitudes HTTP de tipo DELETE al servidor para la eliminación de un suario, PUT para la actualización de sus datos y GET para obtener la lista de todos los usuarios registrados 

![image](https://github.com/user-attachments/assets/3be4233b-d5c4-4da5-ba74-436c435d8990)

###  Global de Usuarios  
Gestiona la información global del usuario, como su nombre y la URL de su imagen, almacena estos datos y proporciona métodos para establecer y obtener la información. Cualquier componente puede hacer uso del servicio para acceder o modificar la URL y nombre del usuario, sin necesidad de pasarlos como propiedades entre componentes 

![image](https://github.com/user-attachments/assets/f4f60855-543c-42a3-98ad-ded9c2a51367)

# 3.- Datos Recuperados

## Correos y Contraseñas recuperados  
![image](https://github.com/user-attachments/assets/91d92ec4-f9f0-42d7-82aa-7d9d7f7cd74f)


## Comidas Recuperadas  
![image](https://github.com/user-attachments/assets/a80137ba-23e6-4ffd-a56a-9c8bd0465f85)

