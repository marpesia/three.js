![Blender & ThreeJS - Ampliando los horizontes](/toys-readme.png)


# Blender & ThreeJS - Ampliando los horizontes

## Parte 1 - BLENDER

1. Instalar Blender 2.79 [Descargar](https://www.blender.org/download/) + Crear archivo + Preferencias
2. Interfaz (zonas de interaccion) + Funciones (colapsar ventanas, vistas) + vista camara
3. Cubo y modificadores (escalar, mover, girar, ...)
4. Añadir objetos
5. Modelar juguete = edit mode + extruir + inset + faces, vertex, booleanos, ...
6. Materiales básico
7. Iluminación básica
8. Render + cámara
9. Exportar archivo (.obj)

### Recursos Blender
- [Atajos de teclado](https://www.giudansky.com/downloads/learnwithaposter/blender-poster-infographic/blender-infographic-SM-1280.png)
- [Tutoriales básicos](https://www.youtube.com/channel/UCOKHwx1VCdgnxwbjyb9Iu1g)
- [Imagen de referencia](https://github.com/marpesia/three.js/raw/master/toys-readme.png)

## Parte 2 - THREEJS

#### Exportación de la Escena de Blender 2.79
File -> Export -> Wavefront (.obj)
Configuración de exportación por defecto

#### Three.js
- Crear un tag `<canvas>` en el HTML. Si no lo crea ThreeJS por defecto pero luego puede dar problemas.
- Creamos la escena, la cámara y damos la orden de renderizar la escena y la cámara.
- Creamos luz de ambiente y un suelo
- Importamos el tren y los cubos en formato obj con sus materiales de Blender
- Creamos unas esferas que harán de faros y unas luces que proyectarán la luz de los faros
- Creamos una acción lanzada desde el DOM que añada los faros a la escena o los borre según si marcamos o no el checkbox

#### Documentación
https://threejs.org/

https://threejsfundamentals.org/
