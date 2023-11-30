# Seleccionamos la imagen base de docker: Dockerhub
# Alpine es una pequeña versión muy ligera y liviana de linux
# esto quiere decir que cada contendor que iniciemos tendra alpine de linux y solo nos consumira algunos megabytes
# a diferencia de tener un sistema completo como ubuntu o debian.
FROM node:18

#INDIRCAR UNA RUTA
# indicamos el directorio donde se crea nuestra aplicación (ruta del mismo contenedor)
# no hace referencia a la de nuestra máquina
RUN mkdir -p /home/app

# COPIAMOS ESA RUTA Y LE INDICAMOS EN LA RUTA DEL CONTENEDOR DONDE SE VA A GUARDAR LA APP
COPY . /home/app

# HACER UNA COPIA DEL package.json y package-lock.json
# en lo que docker crea la capa de aplicación este proceso solo se hace una vez
COPY package*.json ./

#SI NUESTRO PACKAGE.JSON NO CAMBIA, no tendremos que ejecutar el npm install 
RUN npm install

# Exponemos nuestro servidor en el puerto 3000 para poder acceder a nuestro contenedor
# o al contenedor
EXPOSE 3000

# COMANDOS PARA CORRER NUESTRO CONTENEDOR
# LO GUARDAMOS EN UNA MATRIZ (UN ARREGLO) PARA TENERLO POR SEPARADO 
CMD [ "node", "/home/app/index.js" ]
# SI UTILZAMOS NODEMON 
# CMD ["npm", "run", "start"]

