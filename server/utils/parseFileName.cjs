const {v4: uuid} = require('uuid');

const parseFileName = (fileName, ...types) => {
  console.log(fileName)
  const splittedFileName = fileName.split('.'); // thumbnail.name = <name>.<file extension>
  const [ fileType ] = splittedFileName.splice(splittedFileName.length - 1, 1)

  if(!types.includes(fileType)) {
    throw new Error(`Invalid file please provide ${types.join('/')}`);
  }

  return `${splittedFileName.join('')}-${uuid()}.${fileType}`;
}

module.exports = parseFileName;
