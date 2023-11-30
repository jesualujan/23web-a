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

 # REPASO DE LO QUE VIMOS:
  IR A IMAGES -> contenido_clase ![Alt text](image-1.png)