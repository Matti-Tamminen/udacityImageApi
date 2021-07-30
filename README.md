# udacityImageApi
Serves an endpoint to resize image to desired size. Image is returned and served separately as an url and as saved as a file.

## Tests
npm run test
/ jasmine (without build)

## Lint
npm run check (prettier + eslint)

## Build
npm run build

## Start development
npm run server
/ nodemon

## Start production
npm start

### Running the program
* currently works only with jpg-format
* Example image included @ data/full/kuva.jpg (needed for testing)
* Separate config files for prettier, eslint, nodemon, typescript
* Example testing path: http://localhost:3000/api/resize?name=kuva&height=500&width=500
