FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /playwright-test

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

CMD ["npx", "playwright", "test", "--project=languageChangeWikipedia"]