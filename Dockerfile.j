FROM swr.cn-north-4.myhuaweicloud.com/glzh-library/nodejs:14.4 as builder

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build:dev

FROM swr.cn-north-4.myhuaweicloud.com/glzh-library/nginx:1.18

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist  /var/www/html