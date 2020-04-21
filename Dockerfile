# This build stage extracts dependencies and devDependencies from package.json ...
# ... so that version in package.json doesn't mess up layer caching
FROM endeveit/docker-jq AS deps

COPY package.json /tmp

RUN jq '{ dependencies, devDependencies }' < /tmp/package.json > /tmp/deps.json

FROM node:12.16 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g @angular/cli@9.1.0

# Copy package json without version from previous build stage
COPY --from=deps /tmp/deps.json /app/package.json
COPY yarn.lock /app/yarn.lock

# Don't create lockfile using --frozen-lockfile
RUN yarn install --frozen-lockfile

COPY . /app

RUN ng build --prod --output-path=dist

FROM nginx:1.17.9-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]