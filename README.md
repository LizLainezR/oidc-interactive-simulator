# oidc-interactive-simulator
# SIMULADOR INTERACTIVO DE FLUJO OpenID Connect (OIDC) - AUTHORIZATION CODE
Herramienta visual  y didáctica en formato Sandbox diseñada para estudiantes que desean comprender como funciona el flujo de "Authorization Code" (CÓDIGO DE AUTORIZACIÓN) EN OpenID Connect


La aplicación desglosa de manera animada y cronológica las interacciones entre los diferentes actores, permitiendo inspeccionar las peticiones HTTP, las respuesta del servidor y los claims de los token (JWT) en tiempo real.
![Licencia](https://img.shields.io/badge/Versión-V1--SANDBOX-cyan)
![Tecnologías](https://img.shields.io/badge/Tech-HTML5%20%7C%20TailwindCSS%20%7C%20JS-blue)
Características Principales

* **Visualización por Capas/Fases: **Separación didáctica del proceso en etapas critícas: 
    1. **Autorización (Authorization Endpoint):** Flujo por el canal frontal (*Front-Channel*).
    2.  **Canje de Token (Token Endpoint):** Intercambio seguro por el canal trasero (*Back-Channel*).
    3.  **UserInfo API:** Consulta de datos de perfil usando el *Access Token*.
    4.  **Sesión Activa:** Establecimiento local de la sesión en el cliente.
* **Consola de Inspección en Tiempo Real:** Pestañas interactivas para examinar:
    * **Peticiones HTTP:** Cabeceras y parámetros enviados (`GET`, `POST`).
    * **Respuestas HTTP:** Códigos de estado (`302 Redirect`, `200 OK`) y payloads JSON.
    * **Claims (JWT):** Estructura interna desglosada del *ID Token*.
* **Modo Automático y Manual:** Controla el flujo paso a paso con los botones de navegación o utiliza el modo **"Auto Simular"** para ver la animación fluida mediante partículas SVG.
* **Interfaz Moderna y Minimalista:** Diseñada con una estética oscura utilizando Tailwind CSS, iconos de Font Awesome y fuentes optimizadas para lectura de código (*JetBrains Mono*).

## 👥 ACTORES SIMULADOS 
El panel superior segmenta claramente las responsabiladades segun el estandar de identidad:
 1. **Actor 1: Usuario Final (Resource Owner): ** Quien se autetica y autoriza compartir sus datos
 2. **Actor 2: Relying Party (RP/Cliente): La aplicación web asegura que delega la autenticación 
 3. **Actor: Identity Provider (IdP): La autoridad federada central (ej Keycloak, ATH0) que emite las credenciales.
 --------
## 🛠️ TECNOLOGÍA UTILIZADAS

* **HTML5** para la estructura semántica.
* **Tailwind CSS (vía CDN)** para el estilizado responsiv y de componentes.
* **JavaScript (Vanilla)**para la lógica del simulador, control de estados de las frases y animaciones de trayectorias SVG.
* **Font Awesome 6.5.1*** para la iconografía0 técnica. 

## 💻 Instalación y Uso Local 
Este proyecto es un entorno *Sandbox* 
puramente *frontend*, por lo que no requiere de servidores pesados ni bases de datos para ser ejecutado.

1. **Clona este repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)