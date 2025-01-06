# Utilisez le runtime officiel Node.js comme image de base
FROM node:latest as mundia_node

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez package.json dans le répertoire de travail
COPY package.json ./

# Installer les dépendances
RUN npm install

# Copiez l'intégralité du code de l'application dans le conteneur
COPY ./ /app/

# Créez l'application React pour la production
RUN npm run build

# Utiliser Nginx comme serveur de production
FROM nginx:latest

# Copy the Vite build output to the Nginx web server directory
COPY --from=mundia_node /app/dist /usr/share/nginx/html

# Exposer le port 80 pour le serveur Nginx
EXPOSE 80

# Démarrez Nginx lorsque le conteneur s'exécute
CMD ["nginx", "-g", "daemon off;"]