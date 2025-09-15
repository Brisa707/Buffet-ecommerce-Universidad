# Database - Buffet Ecommerce

Esta carpeta contiene los archivos relacionados con la base de datos del proyecto.  
Incluye scripts para crear las tablas, insertar datos de prueba y documentación de la estructura.

---

## 📂 Contenido de la carpeta

- `create_tables.sql`  
  Script para crear todas las tablas de la base de datos.

- `insert_sample_data.sql`  
  Contiene datos de prueba para poblar la base de datos y poder testear la aplicación.

- `schema.png` (opcional)  
  Diagrama visual de las tablas y sus relaciones.

---

## 🗄 Estructura de la base de datos

### Tablas principales

1. **Usuarios**  
   - id_usuario (PK)  
   - nombre  
   - email  
   - contraseña  
   - tipo (estudiante, administrador)

2. **Productos**  
   - id_producto (PK)  
   - nombre  
   - descripción  
   - precio  
   - stock

3. **Pedidos**  
   - id_pedido (PK)  
   - id_usuario (FK)  
   - fecha  
   - estado (pendiente, en preparación, entregado)

4. **Detalle_Pedidos**  
   - id_detalle (PK)  
   - id_pedido (FK)  
   - id_producto (FK)  
   - cantidad  
   - subtotal



Información a actualizar si es necesario..
---

## ⚡ Instrucciones de uso

1. Crear la base de datos vacía en tu gestor SQL (MySQL, MongoDB, PostgreSQL, etc.).  
2. Ejecutar `create_tables.sql` para generar todas las tablas.  
3. Ejecutar `insert_sample_data.sql` para cargar datos de prueba.  
4. Conectar tu backend a la base de datos usando los datos de conexión correctos.  

---

## 📝 Buenas prácticas

- Nunca subir datos reales de estudiantes o usuarios a GitHub.  
- Usar solo datos ficticios para pruebas.  
- Mantener actualizados los scripts si se modifica la estructura de la base de datos.
