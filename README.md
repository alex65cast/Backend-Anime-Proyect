# CLÍNICA DENTAL

Este es el back-end del sistema basado en la gestión de una clínica dental.

<a href="https://backendclinicadental-production.up.railway.app/">Enlace del deploy</a>

**ESTE ES UN SERVIDOR NO VISUAL**
## Contenido
El proyecto Back-End con el controlador de usuario y citas está realizado en:

- [Node.js](https://nodejs.org/es/)
- [express.js](https://expressjs.com/es/)
- [MongoDB](https://www.mongodb.com/es)


## Programas necesarios

Para poder utilizar el proyecto en localhost en necesario clonarlo y tener algunos programas necesarios:

- [Nodejs](https://nodejs.org/es/download/) v12.18.0 o Superior.
- IDE de desarrollo de tu comodidad como por ejemplo [Visual Code](https://code.visualstudio.com/download)
- [PostMan](https://www.postman.com/downloads/) para hacer las diferentes puebas de APIS.
- [Git](https://git-scm.com/downloads) para poder gestionar las distintas versiones del mismo.

## Como Clonar

Comando para clonar:

```bash
cd existing_folder
git clone [LINK DEL REPOSITORIO]

```

## Intalación

Ya clonado el proyecto en nuestro equipo es necesario instalar todas las dependencias para que funcione correctamente con el comando:

```bash
npm install
```

### Run en LocalHost:

- Cambiar las llaves a modo pruebas en el archivo [config.js](/config/config.js)

Cuando las llaves esten en modo pruebas ejecutar el comando:

```bash
npm test
```

Este a su vez ejecutara nodemon app.js, el cual ayudará a la funcionalidad de pruebas y dev.

### Run en Producción:

- Cambiar las llaves a modo producción en el archivo [config.js](/config/config.js)

Cuando las llaves esten en modo producción ejecutar el comando:

```bash
npm start
```

Este a su vez ejecutará el comando node app.js el cual estará preparado para la ejecución del servidor en producción.

## Subir cambios

Para poder subir cambios al repositorio es necesario utilizar los siguientes comandos.

`git add .` o si lo prefiere `git add "./direction_file"`

```bash
git commit -m "tu mensaje"
git push origin master
```

o si usted se encuentra en otro branch

```bash
git push origin "your_branch"
```
## Idea del proyecto

### Autor

El desarrollo ha sido realizado por [Alejandro Castejón](https://github.com/alex65cast)
