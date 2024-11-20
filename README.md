### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW
#### 👩🏼‍💻👨🏻‍💻 AUTORES: [Saray Alieth Mendivelso Gonzalez](https://github.com/saraygonm) y [Miguel Camilo Tellez Ávila](https://github.com/miguel-tellez)

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/es-es/free/students/). Al hacerlo usted contará con $100 USD para gastar durante 12 meses.
Antes de iniciar con el laboratorio, revise la siguiente documentación sobre las [Azure Functions](https://www.c-sharpcorner.com/article/an-overview-of-azure-functions/)

### 📍Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

- Escogemos la opción de consumo

<p align="center">
<img src="images/img/1.png" alt="" width="700px">
</p>

- Seleccionamos las opciones anteriores.
<p align="center">
<img src="images/img/2.png" alt="" width="700px">
</p>

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

- Descargamos la extensión en VisualStudioCode
<p align="center">
<img src="images/img/3.png" alt="" width="700px">
</p>

- Descargamos la extensión Azure Account
<p align="center">
<img src="images/img/4.png" alt="" width="700px">
</p>

- Cambiamos la versión en el Host.json
<p align="center">
<img src="images/img/5.png" alt="" width="700px">
</p>

- Si nos dirijimos al portal de azure observamos este error
<p align="center">
<img src="images/img/6.png" alt="" width="700px">
</p>

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

- Realizado:
<p align="center">
<img src="images/img/deploy.png" alt="" width="700px">
</p>

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

- Observamos que se ha conectado exitosamente!:
<p align="center">
<img src="images/img/7.png" alt="" width="700px">
</p>


5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

6. Cree una nueva Function que resuleva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.

❓**Preguntas**

### 1. ¿Qué es un Azure Function?
Es un servicio de Microsoft Azure que permite ejecutar pequeñas piezas de código (funciones) 
en respuesta a eventos, sin necesidad de administrar infraestructura y 
ofreciendo una solución escalable para ejecutar lógica basada en eventos.

---

### 2. ¿Qué es serverless?
Serverless es un modelo de computación en la nube donde el proveedor administra la infraestructura. 
Los desarrolladores se enfocan solo en escribir y desplegar código, y la nube escala automáticamente los recursos
según la demanda. Aunque los servidores existen, son abstractos para el usuario.

---

### 3. ¿Qué es el runtime y qué implica seleccionarlo al momento de crear el Function App?
El runtime es el entorno de ejecución que interpreta y ejecuta el código de las funciones. 

Las implicaciones de su selección son:

- El lenguaje de programación (C#, Python, Node.js, etc.).
- Las versiones compatibles.
- La base para actualizar, mantener y ejecutar las funciones.


---

### 4. ¿Por qué es necesario crear un Storage Account junto con un Function App?
El Storage Account es una dependencia necesaria para el correcto funcionamiento de las Azure Functionses, pues ayuda a:
- Almacenar datos de configuración y estado de las funciones.
- Mantiener los archivos de registro y las colas de mensajes para triggers.
- Soportar la ejecución en modo Durable Functions (persistencia de estado).

.

---

### 5. ¿Cuáles son los tipos de planes para un Function App?

#### 1. **Plan de Consumo:**
- **Características**: Escala automáticamente en función de la demanda; pagas solo por el tiempo de ejecución.
- **Ventajas**: Bajo costo inicial, ideal para cargas variables.
- **Desventajas**: Latencia inicial (cold start), límite de ejecución de 5 minutos.

#### 2. **Plan Premium:**
- **Características**: Precalentamiento de instancias, mayor escalabilidad y acceso a redes privadas.
- **Ventajas**: Sin cold start, más rendimiento.
- **Desventajas**: Más caro que el plan de consumo.

#### 3. **Plan App Service:**
- **Características**: Usa instancias dedicadas compartidas con otras aplicaciones App Service.
- **Ventajas**: Control total sobre la infraestructura, ideal para aplicaciones siempre activas.
- **Desventajas**: No escala automáticamente, costos más altos para cargas variables.

---

### 6. ¿Por qué la memoization falla o no funciona de forma correcta?
La memoization puede fallar porque:
- **Persistencia en ambiente stateless**: Azure Functions se ejecutan en un entorno sin estado, y el almacenamiento en memoria se pierde entre ejecuciones.
- **Inconsistencias en el escalado**: Al escalar horizontalmente, múltiples instancias no comparten la misma memoria.
- **Errores en la implementación**: Pueden surgir problemas si no se manejan adecuadamente las claves o el almacenamiento del resultado.

---

### 7. ¿Cómo funciona el sistema de facturación de las Function App?
La facturación se basa en:
1. **Tiempo de ejecución**: Se mide en segundos y en unidades de GB-s (memoria consumida por segundo).
2. **Número de ejecuciones**: Se cobra según la cantidad de ejecuciones realizadas.

3. **Almacenamiento y networking**: Costo adicional por el uso del Storage Account y el tráfico de red.

El plan de Consumo incluye una capa gratuita con 1 millón de ejecuciones y 400,000 GB-s al mes.

* Informe
