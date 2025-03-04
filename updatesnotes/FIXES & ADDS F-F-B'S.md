##### **1. BUGS DETECTADOS:**
1. Error de carga infinita de posts tanto en **home** como en **profile** (5)



##### **2. P/ AÑADIR:**

**2.1 FUNCIONALIDADES:**
- implementar el **repost** y caracteristicas diferenciadoras del mismo. (2)
  
- poder fijar un post propio al inicio de tu **perfil** (con mensaje de que fue fijado) (2)

- [EN PC] : Mantener diseño de **right-nav** y implementar detección en tiempo real de usuarios en linea, de manera que sea visual mediante un circulo verde pequeño a lado del nombre, también implementar que se organicen primero por quienes están en linea. Además de esto, en vez de al tocar un usuario te lleve directamente a su perfil, al tocar te va a aparecer un mini recuadro con la información principal de este usuario (Avatar, Nombre, Bi y el futuro sistema de **Premio de popularidad**) toda esta información va a estar arriba de dos botones, uno de **Ver perfil** y otro abajo de **Enviar Mensaje** para el futuro sistema de mensajes privados.  [EN CELULAR] : Rediseñar **right-nav** para que los usuarios se vean más grandes y que se bloquee el scroll de fondo del feed, hacer un rediseño completo de componentes y textos y implementar lo antes mencionado para Pc. (2)

- en **profile** debajo del box del perfil añadir sección de 4 seleccionables [Posts, Multimedia, Opiniones, Likes] : Tal que en **posts** se vean todos los posts del usuario, tanto de texto como de imagen y en **Multimedia** solo los posts que contengan un archivo de imagen,gif y en un futuro vídeo. En **Opiniones** sería una sección donde otros usuarios pueden opinar de el usuario que están viendo, teniendo cada usuario un máximo de 1 opinión por perfil. El dueño del perfil decide si quiere eliminar o mantener las **opiniones** que le dejan. Por ultimo en **Likes** se van a poder ver las cosas que likeó el usuario. También agregar contador de posts totales en [posts] (2)

- Sección de buzon (Quién te dio like, quien te comentó, quien te comenzó a seguir, Quien te opinó el perfil, otras posibles informaciones). (3)

- hacer funcionales los dos modos [Todo el mundo, Popular]  en home, de manera que en la seccion **Todo el mundo** van a estar los posts de todos los usuarios tal y como ya está implementado, mientras que en la de **Popular** se van a organizar los posts por los que más **Interacciones** tuvieron en el mes, es decir, internamente en el backend y en la base de datos se tiene registro de cuanto está haciendo en interacciones cada post (likes, reposts, comentarios), en la sección de popular se van a organizar automaticamente los posts con más interacciones teniendo en cuenta el inicio **DEL MES** no de los ultimos 30 dias en general, al final de un mes se va a otorgar un **Premio de popularidad** al usuario que más interacciones tuvo por ej desde el 1 de julio hasta el 31 del mismo mes, este premio va a consistir en una insignia o medalla que destaque su perfil, esta medalla va a estar en su **perfil** y en el mini menú desplegable al tocar su usuario en la futura actualizada **right-nav**, está medalla va a destacar que este usuario fue el usuario con más interacciones de determinado més, ej "Más popular de julio", también se va a destacar el **Nickname** del usuario con un color diferenciado de todos los demás, al final del siguiente mes, si es el caso se selecciona un nuevo ganador o si es el mismo sigue con el premio un mes más, los premios que gane un usuario se van a quedar guardados y demostrados en su perfil, por ejemplo si un usuario gana en Marzo y en Abril lo gana otro, el que gano en marzo en su perfil y mini perfil se va a quedar guardado como "Poster más popular del mes de Marzo de 2025" y así podrá ir acumulando **Premios de popularidad** (4)

- Soporte de videos (pagar base de datos mayor) (3)

- implementación de mensajes directos, (esto prefiero dejarlo para el final, una vez que se tenga el diseño final, iconos, funcionalidades y demás, ya que es lo más complejo de implementar y me va a llevar mucho tiempo y muchos testeos) (5)
  
- que al tocar el botón de **postear** se despliegue un "post-box" en medio de la pantalla en todo momento. 

**2.2 UI (Visualización y customización):**
- Posibilidad de cambiar color de fondo y color de textos en cada perfil, se tiene que dividir en 3 opciones de personalización (fondo (background), contenido (fondo de posts), textos(textos generales)) en un futuro también añadir al menos 3 tipos de fuentes posibles (5)

- diseñar ejemplos en figma de como se va a ver el mini perfil y demás. (2)

- Futura mejora del diseño del login (4)

- Rediseñar "profile" (2)

