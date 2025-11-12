# Buffet-Ecommerce - Universidad

## 📌 Descripción
Somos estudiantes de programación y ciencia de datos. Nuestro proyecto busca desarrollar una plataforma web de ecommerce para el buffet universitario.  
El objetivo principal es permitir que los estudiantes realicen pedidos online, reduciendo tiempos de espera y mejorando la organización del servicio.
Incluyendo facilidad en la gestión de pedidios para los administradores.

## 🚀 Tecnologías (propuestas)
- **Frontend**: React + Vite + CSS
- **Backend**: Node.js con Expres
- **Base de datos**: PostgreSQL
- **Control de versiones**: Git + GitHub

## 👥 Integrantes
- Brisa Nahir Valero
- Rocio Soledad Maldonado
- Julieta Delfina Sayago
- Malvina Florencia Avendaño

## 🎯 Objetivos
- Facilitar pedidos online de los estudiantes.
- Reducir filas y tiempos de espera.
- Mejorar la gestión del buffet.

---

## 🛠️ Instalación y ejecución del frontend

### Prerrequisitos
- Node.js v18+  
- Git instalado  
- Navegador moderno (Chrome, Firefox, Edge)

### Paso a paso
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/organizacion/buffet-ecommerce-frontend.git
   cd buffet-ecommerce-frontend
   ```
   
2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo .env en la raíz del frontend:
   ```bash
   VITE_API_URL=http://localhost:3000/api
   ```
   Ajustar VITE_API_URL según la URL del backend.

4. **Levantar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   Abrir en el navegador la URL que muestra Vite (por defecto http://localhost:5173).

## 📌 Scripts útiles

| Comando           | Descripción                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo con Vite        |
| `npm run build`   | Compila el proyecto para producción (`dist/`)    |

## 📁 Estructura del proyecto

```plaintext
BUFFET-ECOMMERCE-UNIVERSIDAD/
├── public/                    # Archivos estáticos
├── src/                       # Código fuente principal
│   ├── assets/                # Imágenes
│   ├── components/            # Componentes reutilizables de React
│   ├── config/                # Configuraciones
│   ├── layout/                # Componentes de layout
│   ├── pages/                 # Páginas del sistema (home, login, pedidos, etc.)
│   └── routes/                # Definición de rutas y navegación
├── App.css                    # Estilos del componente principal
├── App.jsx                    # Componente raíz de la aplicación
├── index.css                  # Estilos globales
├── main.jsx                   # Punto de entrada de React
├── eslint.config.js           # Configuración de ESLint
├── index.html                 # Plantilla HTML principal
├── package-lock.json          # Mapa exacto de dependencias
├── package.json               # Metadatos y scripts del proyecto
└── vite.config.js             # Configuración de Vite
 ```

### 🧩 Dependencias principales

| Dependencia     | Descripción breve                          -|
|-----------------|---------------------------------------------|
| html5-qrcode    | Leer códigos QR desde la cámara del usuario |
| qrcode.react    | Generar códigos QR en componentes React     |
| react           | Librería principal para crear la interfaz   |
| react-dom       | Renderiza los componentes en el navegador   |
| react-icons     | Íconos listos para usar en React            |
| react-router-dom| Navegación entre páginas y rutas SPA        |
| react-toastify  | Mostrar notificaciones tipo *toast*         |

