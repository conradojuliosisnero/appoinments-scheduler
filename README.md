# Sistema de Gestión de Citas Médicas

Este proyecto es un sistema de gestión de citas médicas que permite a los usuarios registrarse, iniciar sesión, ver y gestionar sus citas. La aplicación está construida utilizando Next.js, React, Redux y otras tecnologías modernas.

## Características

- Registro de usuarios
- Inicio de sesión y autenticación
- Visualización de citas en un calendario
- Creación, actualización y eliminación de citas
- Filtros de búsqueda y estado de citas
- Protección de rutas para usuarios autenticados

## Tecnologías Utilizadas

- **Next.js**: Framework de React para la creación de aplicaciones web.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Redux**: Biblioteca para el manejo del estado global de la aplicación.
- **Ant Design (antd)**: Biblioteca de componentes UI para React.
- **React Big Calendar**: Componente de calendario para React.
- **CSS Modules**: Para el manejo de estilos CSS de manera modular.
- **JWT (JSON Web Tokens)**: Para la autenticación de usuarios.

## Estructura del Proyecto

```
```
├── public/                 # Archivos estáticos
├── pages/                  # Páginas de la aplicación
│   ├── _app.js             # Componente principal de la aplicación
│   ├── index.js            # Página de inicio
│   └── ...                 # Otras páginas
├── components/             # Componentes reutilizables
├── styles/                 # Archivos de estilos CSS
├── redux/                  # Configuración y slices de Redux
├── utils/                  # Utilidades y funciones auxiliares
├── .gitignore              # Archivos y directorios ignorados por Git
├── package.json            # Dependencias y scripts del proyecto
└── README.md               # Documentación del proyecto
```
```
## Instalación y Ejecución

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/schedule-appointments.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd schedule-appointments
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Inicia la aplicación:
    ```bash
    npm run dev
    ```

La aplicación estará disponible en `http://localhost:3000`.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en GitHub.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.