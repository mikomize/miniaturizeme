all : app.js

app.js : src/*
	tsc --out $@ src/web.ts 
