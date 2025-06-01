const _ = require('lodash');

module.exports = function (plop) {
  plop.setGenerator('entity', {
    description: 'Crear Repository, Controller y Route para una entidad',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nombre de la entidad (PascalCase, singular):',
      },
      {
        type: 'input',
        name: 'pk',
        message: 'Nombre del campo de clave primaria (exacto):',
        default: answers => `id_${_.snakeCase(answers.name)}`,
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/repositories/{{camelCase name}}Repository.ts',
        templateFile: 'plop-templates/repository.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/controllers/{{camelCase name}}Controller.ts',
        templateFile: 'plop-templates/controller.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/routes/{{camelCase name}}.ts',
        templateFile: 'plop-templates/route.ts.hbs'
      }
    ]
  });
};
