FROM denoland/deno

EXPOSE 8000

WORKDIR /app

USER deno

COPY types /types
COPY backend .

RUN deno cache ./src/server.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "src/server.ts"]