# ------------------ PRIMERA PARTE DE LA CLASE -----------------------
# ACCEDER A NUESTRA CARPETA RAIZ DEL PROYECTO DE DOCKER Y HACER LO SIGUIENTE:
# INICIAR NPM: 
          npm init --y
 instalar npm i express colors mongoose
          npm i nodemon --save-dev (solo en caso de querer usar nodemon)

configurar el package.json, quitar test, poner: "start": "nodemon index.js" (solo en caso de querer usar nodemon)


# PASOS DE LA CLASE PRIMERO CREAR EL SERVIDOR E INSTALAR EXPRESS Y MONGOOSE
# DESPUÉS EXPLICAR EL CÓDIGO DEL SERVIDOR Y HACER LA PRUEBA DEL ERROR
mongoose.connect('mongodb://devf:password@monguito:27017/miapp?authSource=admin')
# LA SOLUCIÓN ES LA SIGUIENTE: 
mongoose.connect('mongodb://devf:password@localhost:27017/miapp?authSource=admin')


# LUEGO IRSE A DOCKER HUB BUSCAR MONGO:
# luego en la temrinal hacer:
    docker pull mongo
    docker images
    docker ps -a (no hay contenedor aún)

 # CREAR NUESTRO CONTENEDOR
docker create -p27017:27017 --name monguito -e MONGO_INITDB_ROOT_USERNAME=devf -e MONGO_INITDB_ROOT_PASSWORD=password mongo

# HECHAMOS ANDAR NUESTRO CONTENEDOR
 docker start monguito

# PARA VERIFICAR DONDE ESTÁ CORRIENDO NUESTRO CONTENEDOR
 docker ps
 CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS          PORTS                      NAMES
 cc819595e169   mongo     "docker-entrypoint.s…"   2 minutes ago   Up 16 seconds   0.0.0.0:27017->27017/tcp   monguito

 # Después vamos a la aplicación:
 # Ejecutamos:
  npm start | node index.js


# Hablamos de los contenedores:
# NUESTROS CONTENEDORES NO SE PUEDEN COMUNICAR ENTRE SI, PARA ELLO
# NECESITAMOS AGRUPAR NUESTROS CONTENEDORES MEDIANTE UNA RED INTERNA DE DOCKER
# EJEMPLO: MI RED 
 ir a la carpeta images -> red.png ![Alt text](image.png)


# DOCKER NETWORK:
docker network ls 
NETWORK ID     NAME      DRIVER    SCOPE
00d1fe23b27e   bridge    bridge    local
a72d6f825b20   host      host      local
147592e0e461   none      null      local

# CREAMOS NUESTRA RED: 
docker network create mired
e02614c4bdc545991a82c3bda6222a8138a4d2f87367cc875fc6bbe7942cb959

# DOCKER NETWORK:
docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
00d1fe23b27e   bridge    bridge    local
a72d6f825b20   host      host      local
e02614c4bdc5   mired     bridge    local
147592e0e461   none      null      local

# PODEMOS BORRAR UNA RED:
docker network rm mired
mired

docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
00d1fe23b27e   bridge    bridge    local
a72d6f825b20   host      host      local
147592e0e461   none      null      local

# VOLVEMOS A CREAR LA RED:
docker network create mired
ID DE LA RED: 2c2dd71337260bd0268efdb30db06b2d0015a14a933cb0fc379b03c22f1f382f

docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
00d1fe23b27e   bridge    bridge    local
a72d6f825b20   host      host      local
2c2dd7133726   mired     bridge    local
147592e0e461   none      null      local

# OJO AQUÍ EN ESTE PASO QUITAMOS EL @localhost de index.js y lo suplantamos por @monguito
mongoose.connect('mongodb://devf:password@monguito:27017/miapp?authSource=admin')

# sirve para crear imagenes en base a un archivo dockerfile que creamos antes
docker build

# recibe dos argumentos (una etiqueta | la ruta )
docker build -t my_app:1.0 . 

# VER LO QUE CREAMOS
 docker images

 # DETENEMOS NUESTRO CONTENEDOR
 docker stop monguito

 
 # ELIMINAMOS NUESTRO CONTENEDOR DE MONGO, Y HACEMOS UNO NUEVO PARA CONECTARLO A NUESTRA RED
 docker stop monguito

# CREAR NUESTRO CONTENEDOR + LA RED
docker create -p27017:27017 --name monguito --network mired -e MONGO_INITDB_ROOT_USERNAME=devf -e MONGO_INITDB_ROOT_PASSWORD=password mongo

# CREAR EL CONTENEDOR DE LA APLICACIÓN QUE COLOCAMOS DENTRO DE UNA IMAGEN
docker create -p3000:3000 --name cochinito --network mired my_app:1.0

# RESPUESTA DE DOCKER:
docker create -p3000:3000 --name cochinito --network mired my_app:1.0
4ec1053fe89a5bdd02d8ccbeb0df7859a02637c484fe7ef3ba4366162cae6e25

# DOCKER:
docker ps -a
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS    PORTS     NAMES
4ec1053fe89a   my_app:1.0   "docker-entrypoint.s…"   21 seconds ago   Created             cochinito
8fcb22166d4a   mongo        "docker-entrypoint.s…"   2 minutes ago    Created             monguitodos

# ECHAMOS ANDAR:
 docker start monguito
 docker start cochinito

 # volvemos a localhost:3000 ABRIRLO EN UN NAVEGADOR WEB
 # NOTA: YA NO ES NECESARIO ESCRIBIR EN LA TERMINAL DE GIT: node index.js (ya vive en el contenedor)

 # LOGS
 docker logs cochinito


# SI YA NO OCUPAMOS HAY QUE DENETER LOS SERVICIOS:
 docker stop monguito
 docker stop cochinito


 # REPASO DE LO QUE VIMOS:
  IR A IMAGES -> contenido_clase ![Alt text](image-1.png)


  # ------------------ SEGUNDA PARTE: DOCKER COMPOSE  ----------------------- #

# DOCKER COMPOSE (YA SE ECUENTRA INCLUIDA CON LA INSTALACIÓN DE DOCKER DESKTOP)

Docker Compose es una herramienta de código abierto que permite definir y ejecutar 
aplicaciones de Docker de varios contenedores. 

Docker Compose simplifica el proceso de definición y 
ejecución de aplicaciones multicontenedor. Permite trabajar con varios contenedores 
de forma simultánea, haciendo que estos se conecten y relacionen entre sí.

Docker Compose utiliza un archivo YAML para configurar los servicios de la aplicación.
La configuración se guarda en un único archivo YAML, lo que permite crear y escalar 
aplicaciones fácilmente. 
Docker Compose surge porque muchas aplicaciones requieren de más de un microservicio.

1) Crear un nuevo archivo con el nombre: docker-compose.yml
   y agregar lo siguiente:
   #  DEBES RESPETAR LA IDENTACIÓN (TABULACIÓN) QUE TIENE EL CPODIGO DE ABAJO

#yanl nuevo lenguaje de configuración
version: '3.9' #indicamos la versión
services: 
  cochinito:
    build: .
    ports:
      - "3000:3000"    #puerto-anfitrión:contenedor si quieres agregar un nuevo puerto lo puedes hacer abajo
    links:             # el nombre del contenedor que queremos mapear en este caso monguito
      - monguito
  monguito:
    image: mongo   #indicamos a que imagen debe crearse el contenedor (en este caso usamos mongo)
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=jesua
      - MONGO_INITDB_ROOT_PASSWORD=password


# NOTA UNA VEZ CREADO EL ARCHIVO GUARDAR, Y EN LA TERMINAL ESCRBIR LO SIGUIENTE:

2) # DESPUÉS DE CREAR DOCKER COMPOSE 
  comando en la terminal: docker compose up

# VOLVER A LA APP localhost:3000 y ver en la terminal los logs (ojo debes tener tus contenedores iniciados: 
# docker start monguito, docker start cochinito)
# SI YA NO OCUPAMOS HAY QUE DENETER LOS SERVICIOS:
 docker stop monguito
 docker stop cochinito

# VERIFICAMOS LA IMAGEN Y EL CONTENEDOR
 docker images
 docker ps -a 

 # COMANDO PARA LIMPIAR TODO LO QUE EL CREO DOCKER COMPOSE (CONTENEDOR E IMAGENES)
 docker compose down

# ------------------ VOLUMENES ----------------------- #


 # VOLUMES CUANDO CREAMOS UN CONTENEDOR VA A TENER UN SO (sistema operativo), UN SISTEMA DE ARCHIVOS Y ALMACENADA LA DATA
 # PODEMOS DECIR SI O PODEMOS DECIR QUE NO
 # SI TU DESARROLLAS EL CÓDIGO DE LA APLICACIÓN CON DOCKER, HAY UNA HERRAMIENTA LLAMADA VOLUMES
 # TIENES TRES TIPOS DE VOLUMENES:
 1) ANONIMOS - NO LOS PODEMOS REFERENCIAR PARA QUE LOS UTILICE OTRO CONTENEDOR
 2) DE ANFITRION O HOST: TU DECIDES QUE CARPETA MONTAR Y DONDE MONTARLA
 3) NOMBRADO - IGUAL AL ANONIMO PERO TU PODRAS REFERENCIARLO A OTRO CONTENEDOR CON LA MISMA IMAGEN
 4) IR A LA CARPETA images -> volumes.png ver la imagen de volumenes

AHORA DEBERAS VOLVER AL ARCHIVO DOCKER COMPOSE Y AL FINAL DE ENVIROMENT AGREGAR VOLUMES: 

    environment:
      - MONGO_INITDB_ROOT_USERNAME=jesua
      - MONGO_INITDB_ROOT_PASSWORD=password
#indicarle al contenedor monguito los volumenes que va a poder utilizar
    volumes:
      - mongo-data: /data/db    #googlear: where mongodb store data base
      # mysql -> /var/lib/mysql
      # postgres -> /var/lib/postgresql/data
#todos los volumenes que va a utilizar nuestros contenedores    
volumes:
  mongo-data:


# volver a ejecutar:
 docker compose up

# VOLVER A LA APP localhost:3000 Y LA APP DEBE SEGUIR FUNCIONANDO, DE ESTA MANERA NUESTROS DATOS PUEDEN PERSISTIR CON EL TIEMPO
# SI LLEGAMOS A ELIMINAR NUESTROS CONTENEDORES.

# CONFIGURAR MULTIPLES AMBIENTES DE DESARROLLO O PROUDICCIÓN  
 POR LO GENERAL EL AMBIENTE DE DESARROLO Y DE PRODUCCIÓN SON TOTALMENTE DIFERENTES
 PARA ESTO DEBEMOS CREAR EL SIGUIENTE ARCHIVO: Dockerfile.dev
 y pegar lo siguiente:  
# PARA ESTE CASO AGREGAMOS NODEMON EN VES DE USAR NODEJS (NOTA NO ES NECESARIO INSTALAR NODEMON EN NUESTRO PACKAGE.JSON LOCAL)

FROM node:18

RUN npm i -g nodemon
RUN mkdir -p /home/app

WORKDIR /home/app #INDICAMOS LA RUTA EN LA CUAL VAMOS A ESTAR TRABAJANDO

RUN npm install


EXPOSE 3000


CMD ["nodemon", "index.js"]
# CMD [ "npm", "run", "start"]


# PARA ESTE CASO AGREGAMOS NODEMON Y GUARDAMOS 

# DESPUES CREAMOS EL SIGUIENTE ARCHIVO LLAMADO:
  docker-compose-dev.yml y pegamos lo siguiente:

version: '3.9'
services: 
  cochinito:
    build: 
      context: . #ruta actual de docker-compose
      dockerfile: Dockerfile.dev #LE INDICAMOS QUE LA IMAGEN LA CONSTRUYA EN DOCKERFILE.DEV
    ports:
      - "3000:3000"
    links:
      - monguito
    volumes:
      - .:/home/app #le indicamos que utilice un volume (en este caso vemos los volumenes anonimos)
  monguito:
    image: mongo 
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=jesua
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongo-data: /data/db
      # mysql -> /var/lib/mysql
      # postgres -> /var/lib/postgresql/data
      
volumes:
  mongo-data:

# Y GUARDAMOS

# Despues de configurar el docker-compose-dev.yml vamos a la terminal y escribimos
# LA -f es una banderita para poder indicarle un archivo docker compose customizado 
ejecutar: docker compose -f docker-compose-dev.yml up

# VOLVER A LA APP localhost:3000 Y LA APP DEBE SEGUIR FUNCIONANDO
DESPUES IR AL INDEX.JS 

en agregar un animal agreguen 2 nuevos

await Animalse.create({ tipo: 'Pumita', estado: 'Cazando' })
await Animales.create({ tipo: 'Palomita', estado: 'Volando' })

// en la terminal debes ver nodemon funcionando