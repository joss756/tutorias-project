# Usar una imagen base de Node.js con la versión especificada
FROM node:22.11.0

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si está presente)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Exponer el puerto que utilizará la aplicación (en Angular por defecto es el 4200)
EXPOSE 80

# Ejecutar el servidor de desarrollo de Angular
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "80"]
