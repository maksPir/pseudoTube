FROM node 
WORKDIR /client
EXPOSE 3000
COPY ./package.json .
RUN npm i 
COPY . .
CMD [ "npm", "run", "start" ]
