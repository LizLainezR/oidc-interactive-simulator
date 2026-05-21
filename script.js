 
 const stepsData = {
            0: {
                title: "Consola lista para iniciar",
                shortDesc: "Simulador preparado.",
                desc: "Bienvenido al laboratorio de seguridad OIDC. El flujo de código de autorización es el método más robusto para proteger clientes Web y Mobile. Presiona 'Iniciar' o 'Siguiente' para comenzar el envío seguro.",
                origin: "-",
                dest: "-",
                phase: 0,
                channel: "Front-Channel",
                channelClass: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                request: `// Inicia el flujo presionando "Iniciar" o "Siguiente".`,
                response: `// Esperando eventos...`,
                jwt: `// No hay tokens emitidos todavía.`
            },
            1: {
                title: "1.1 Redirección de Autorización",
                shortDesc: "Enrutamiento al Endpoint de Autorización",
                desc: "El usuario intenta ingresar a la aplicación (Relying Party). Para autenticarlo de forma segura sin pedirle la clave directamente, la aplicación genera un URI especial del Proveedor de Identidad (IdP) y redirige al navegador del usuario allí. Se envían parámetros de seguridad vitales como scopes y client_id.",
                origin: "User Browser",
                dest: "Identity Provider",
                phase: 1,
                pathId: "path-step-1",
                particleId: "particle-f1",
                motionId: "motion-f1",
                channel: "Front-Channel",
                channelClass: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                request: `<span class="text-pink-400">GET</span> <span class="text-amber-400">/oauth/authorize</span> HTTP/1.1
<span class="text-cyan-400">Host:</span> identity-provider.com
<span class="text-cyan-400">Query Parameters:</span>
  ?response_type=<span class="text-emerald-400">code</span>
  &client_id=<span class="text-emerald-400">rp_app_cyber_01</span>
  &scope=<span class="text-emerald-400">openid%20profile%20email</span>
  &redirect_uri=<span class="text-emerald-400">https://relying-party.com/callback</span>
  &state=<span class="text-emerald-400">xyz_state_987</span>
  &nonce=<span class="text-emerald-400">nonce_random_abc</span>`,
                response: `<span class="text-slate-500">// El IdP recibe la petición del navegador y renderiza el formulario de login.</span>
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<span class="text-slate-400">&lt;form id="login-form" action="/login" method="POST"&gt;</span>
  <span class="text-slate-400">... Formulario de credenciales seguras ...</span>`,
                jwt: `// En espera del intercambio del Token.`
            },
            2: {
                title: "1.2 Retorno con Código Temporal",
                shortDesc: "IdP emite código vía callback de redirección",
                desc: "Tras validar con éxito las credenciales y el consentimiento de scopes del usuario, el IdP emite un código de autorización temporal de un solo uso. Redirige el navegador del usuario de vuelta a la URL especificada por la aplicación (la Callback URI), adjuntando el código en los parámetros de la URL.",
                origin: "Identity Provider",
                dest: "Relying Party (Callback)",
                phase: 1,
                pathId: "path-step-2A", // Usaremos el primero y encadenaremos el segundo en la simulación
                pathIdSeq: "path-step-2B", 
                particleId: "particle-f1",
                motionId: "motion-f1",
                channel: "Front-Channel",
                channelClass: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                request: `<span class="text-slate-500">// El navegador procesa la redirección HTTP 302 que responde el IdP</span>
<span class="text-pink-400">HTTP/1.1 302 Found</span>
<span class="text-cyan-400">Location:</span> https://relying-party.com/callback
  ?code=<span class="text-amber-400">splat_auth_code_987654321</span>
  &state=<span class="text-emerald-400">xyz_state_987</span>`,
                response: `<span class="text-slate-500">// El navegador hace la llamada GET al Callback de la App (RP)</span>
<span class="text-pink-400">GET</span> <span class="text-amber-400">/callback?code=splat_auth_code_987654321...</span> HTTP/1.1
<span class="text-cyan-400">Host:</span> relying-party.com`,
                jwt: `// En espera del intercambio del Token.`
            },
            3: {
                title: "2.1 Petición de Intercambio (POST)",
                shortDesc: "Llamada directa Back-Channel de Servidor a Servidor",
                desc: "Aquí ocurre la magia de OIDC. La aplicación (RP) extrae el código temporal. Realiza una llamada HTTPS directa por detrás (Back-Channel) al Token Endpoint del IdP. En esta petición POST se envían las credenciales secretas del cliente (client_secret) y el código. El navegador del usuario no interviene, protegiendo el secreto.",
                origin: "Relying Party",
                dest: "Identity Provider",
                phase: 2,
                pathId: "path-step-3",
                particleId: "particle-f2",
                motionId: "motion-f2",
                channel: "Back-Channel",
                channelClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                request: `<span class="text-pink-400">POST</span> <span class="text-amber-400">/oauth/token</span> HTTP/1.1
<span class="text-cyan-400">Host:</span> identity-provider.com
<span class="text-cyan-400">Content-Type:</span> application/x-www-form-urlencoded
<span class="text-cyan-400">Authorization:</span> Basic <span class="text-pink-400">Base64(rp_app_cyber_01:client_secret_xyz_abc_123)</span>

grant_type=<span class="text-emerald-400">authorization_code</span>
&code=<span class="text-amber-400">splat_auth_code_987654321</span>
&redirect_uri=<span class="text-emerald-400">https://relying-party.com/callback</span>`,
                response: `// Esperando respuesta del IdP...`,
                jwt: `// Generando decodificación del token...`
            },
            4: {
                title: "2.2 Entrega de Tokens Firmados",
                shortDesc: "IdP entrega tokens ID y Access en formato JSON",
                desc: "El IdP procesa la petición de Back-Channel, valida el Client Secret de la RP y confirma que el código es legítimo. Devuelve un objeto JSON con el 'Access Token' (para autorizar peticiones API) y el 'ID Token' (un token JWT firmado que describe la identidad del usuario).",
                origin: "Identity Provider",
                dest: "Relying Party",
                phase: 2,
                pathId: "path-step-4",
                particleId: "particle-f2",
                motionId: "motion-f2",
                channel: "Back-Channel",
                channelClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                request: `<span class="text-slate-500">// La petición HTTP POST de servidor a servidor finaliza. El IdP responde:</span>`,
                response: `<span class="text-pink-400">HTTP/1.1 200 OK</span>
<span class="text-cyan-400">Content-Type:</span> application/json;charset=UTF-8

{
  "<span class="text-cyan-400">access_token</span>": "<span class="text-indigo-400">at_eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJz...</span>",
  "<span class="text-cyan-400">id_token</span>": "<span class="text-pink-400">eyJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJpc3M...</span>",
  "<span class="text-cyan-400">token_type</span>": "Bearer",
  "<span class="text-cyan-400">expires_in</span>": 3600,
  "<span class="text-cyan-400">scope</span>": "openid profile email"
}`,
                jwt: `<span class="text-pink-400 font-bold">// ID TOKEN DECODIFICADO (JSON Web Token)</span>
<span class="text-slate-500">// Header (Firmado con RS256 usando claves JWKS públicas del IdP)</span>
{
  "<span class="text-cyan-400">alg</span>": "RS256",
  "<span class="text-cyan-400">typ</span>": "JWT",
  "<span class="text-cyan-400">kid</span>": "pub_key_idp_sig_1"
}

<span class="text-slate-500">// Payload (Claims de Identidad estándar OIDC)</span>
{
  "<span class="text-cyan-400">iss</span>": "https://identity-provider.com",
  "<span class="text-cyan-400">sub</span>": "usr_9921_liz_lainez",
  "<span class="text-cyan-400">aud</span>": "rp_app_cyber_01",
  "<span class="text-cyan-400">exp</span>": 1782294190,
  "<span class="text-cyan-400">iat</span>": 1782290590,
  "<span class="text-cyan-400">name</span>": "Liz Lainez Reyes",
  "<span class="text-cyan-400">email</span>": "liz.lainez@example.com"
}`
            },
            5: {
                title: "3.1 Petición de Datos (API)",
                shortDesc: "Acceso al Endpoint de UserInfo con Bearer",
                desc: "La aplicación posee ahora el ID Token, pero si requiere atributos adicionales o actualizados en tiempo real del perfil del usuario, realiza una petición directa al endpoint '/userinfo' del IdP enviando el 'Access Token' en la cabecera 'Authorization: Bearer'.",
                origin: "Relying Party",
                dest: "Identity Provider",
                phase: 3,
                pathId: "path-step-5",
                particleId: "particle-f3",
                motionId: "motion-f3",
                channel: "Back-Channel",
                channelClass: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
                request: `<span class="text-pink-400">GET</span> <span class="text-amber-400">/oauth/userinfo</span> HTTP/1.1
<span class="text-cyan-400">Host:</span> identity-provider.com
<span class="text-cyan-400">Authorization:</span> Bearer <span class="text-indigo-400">at_eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJz...</span>`,
                response: `// Procesando autorización en el servidor...`,
                jwt: `// ID Token verificado anteriormente.`
            },
            6: {
                title: "3.2 Envío de Perfil de Usuario",
                shortDesc: "IdP entrega claims adicionales",
                desc: "El IdP inspecciona y valida criptográficamente el Access Token. Si el token está activo y posee los alcances (scopes) requeridos, devuelve la estructura de datos extendida de la cuenta del usuario final.",
                origin: "Identity Provider",
                dest: "Relying Party",
                phase: 3,
                pathId: "path-step-6",
                particleId: "particle-f3",
                motionId: "motion-f3",
                channel: "Back-Channel",
                channelClass: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
                request: `<span class="text-slate-500">// Llamada autorizada exitosamente. El IdP responde:</span>`,
                response: `<span class="text-pink-400">HTTP/1.1 200 OK</span>
<span class="text-cyan-400">Content-Type:</span> application/json

{
  "<span class="text-cyan-400">sub</span>": "usr_9921_liz_lainez",
  "<span class="text-cyan-400">name</span>": "Liz Lainez Reyes",
  "<span class="text-cyan-400">email</span>": "liz.lainez@example.com",
  "<span class="text-cyan-400">email_verified</span>": true,
  "<span class="text-cyan-400">preferred_username</span>": "liz_lainez",
  "<span class="text-cyan-400">picture</span>": "https://identity-provider.com/assets/avatars/liz.png",
  "<span class="text-cyan-400">locale</span>": "es-ES"
}`,
                jwt: `// Claims adicionales inyectados de UserInfo.`
            },
            7: {
                title: "4.1 Creación de Sesión Local",
                shortDesc: "Entrega de HTML y Cookies seguras",
                desc: "Una vez que la aplicación tiene la identidad comprobada del usuario, su servidor web inicia una sesión de usuario de manera interna (creando una cookie de sesión cifrada). Redirige o responde al navegador para dar acceso formal a la aplicación.",
                origin: "Relying Party",
                dest: "User Browser",
                phase: 4,
                pathId: "path-step-7",
                particleId: "particle-f4",
                motionId: "motion-f4",
                channel: "Front-Channel",
                channelClass: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                request: `<span class="text-slate-500">// Servidor de la App (RP) establece cookie segura y responde al navegador del usuario</span>
<span class="text-pink-400">HTTP/1.1 302 Found</span>
<span class="text-cyan-400">Location:</span> https://relying-party.com/dashboard
<span class="text-cyan-400">Set-Cookie:</span> <span class="text-emerald-400">rp_session_id=cipher_77189a02fb; Secure; HttpOnly; SameSite=Lax</span>`,
                response: `<span class="text-slate-500">// El navegador del usuario inicia la llamada con la cookie adjunta</span>
<span class="text-pink-400">GET</span> <span class="text-amber-400">/dashboard</span> HTTP/1.1
<span class="text-cyan-400">Cookie:</span> rp_session_id=cipher_77189a02fb`,
                jwt: `// Sesión asegurada localmente.`
            },
            8: {
                title: "4.2 ¡Acceso Concedido!",
                shortDesc: "Flujo OIDC Finalizado Exitosamente",
                desc: "¡Felicidades! El flujo OIDC se ha completado. El navegador del usuario final carga la pantalla segura del Dashboard de la aplicación mostrando de forma dinámica los datos del usuario (Nombre, Email, Foto de Perfil) obtenidos directamente del IdP.",
                origin: "-",
                dest: "-",
                phase: 4,
                channel: "Establecido",
                channelClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                request: `<span class="text-emerald-400 font-bold">// FLUJO OIDC DE ALTA SEGURIDAD COMPLETADO</span>
El cliente ha iniciado sesión correctamente.
* Código Temporal verificado y destruido.
* ID Token verificado criptográficamente.
* Access Token válido para consumir recursos.`,
                response: `<span class="text-pink-400">HTTP/1.1 200 OK</span>
Content-Type: text/html

<span class="text-slate-400">&lt;div class="dashboard"&gt;</span>
  <span class="text-emerald-400">&lt;h1&gt;Bienvenida, Liz Lainez Reyes!&lt;/h1&gt;</span>
<span class="text-slate-400">&lt;/div&gt;</span>`,
                jwt: `Claims persistidos en el cliente.`
            }
        };

  