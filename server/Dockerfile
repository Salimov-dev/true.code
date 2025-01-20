FROM node:alpine
WORKDIR /app
COPY server/package*.json /app/
RUN npm install
COPY server /app
RUN npm run build
COPY --from=client /app/client/dist /app/client
EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]
