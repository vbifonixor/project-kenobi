FROM phusion/baseimage:0.9.19
RUN apt-get update && apt-get install -y npm && npm i -g n

COPY ./ /kenobi-platform/
WORKDIR /kenobi-platform

RUN n `cat .nvmrc` && npm install

CMD npm run start:prod
