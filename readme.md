# BackEnd-Fraccionamientos

Este repositorio contiene el código del backend para el proyecto Fraccionamientos. El servidor está implementado usando Express.js, e incluye endpoints para operaciones aritméticas básicas y registro de usuarios.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/BackEnd-Fraccionamientos.git
   ```
2. Navega al directorio:
   ```bash
   cd BackEnd-Fraccionamientos
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

Para iniciar el servidor, ejecuta:

```bash
node app.js
```

## Fase 1

Los endpoints de la API son los siguientes:

- `GET /api/hola`: Devuelve un mensaje de saludo.
- `GET /api/suma/:n1/:n2`: Acepta dos parámetros en la ruta y devuelve la suma de `n1` y `n2`.
- `POST /api/resta/:n1/:n2`: Acepta dos parámetros en la ruta y devuelve la diferencia entre `n1` y `n2`.
- `POST /api/nuevousuario`: Registra un nuevo usuario con los detalles proporcionados en el cuerpo de la solicitud.
