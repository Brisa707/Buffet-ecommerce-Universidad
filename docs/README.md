## 🔀 Flujo de trabajo con ramas (Git Flow básico)

En este proyecto usamos un flujo simple de ramas para mantener el código ordenado y estable.

- **main** → rama principal, siempre estable y lista para entregar.
- **dev** → rama de desarrollo, donde trabaja el equipo antes de pasar los cambios a `main`.


### 📂 Organización del flujo
1. Los desarrolladores trabajan en `dev`.
2. Si se agrega una funcionalidad, se crea una rama desde `dev` (ejemplo: `feature/login`).
3. Una vez finalizada la funcionalidad, se fusiona nuevamente a `dev`.
4. Cuando `dev` está probado y estable, se fusiona a `main`.


### ✅ Buenas prácticas
- No trabajar directamente en main.
- Mantener dev como rama de integración.
-Crear ramas específicas para cada funcionalidad o corrección (feature/ o fix/).
- Escribir mensajes de commit claros y descriptivos.
- Usar pull requests para revisar el código antes de fusionar.
