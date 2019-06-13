![Blender & ThreeJS - Ampliando los horizontes](/toys-readme.png)

# Three.js
Blender & ThreeJS - Ampliando los horizontes

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
