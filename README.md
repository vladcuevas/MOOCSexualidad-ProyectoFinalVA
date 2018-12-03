# ProyectoFinalVA

![alt text](https://raw.githubusercontent.com/vladcuevas/MOOCSexualidad-ProyectoFinalVA/master/img/main-banner.jpg)

- Estudiantes: Vladimir E. Cuevas, Juan Carlos Oyuela y Andres Segura Tinoco
- Curso: Visual Analytics
- Proyecto Final
- Fecha: 12/04/2018
- Licencia: MIT

## Introducción
La Universidad de los Andes, dentro de su proceso de innovación y exploración del esquema educativo, ha desarrollado un conjunto de cursos virtuales (MOOC's) que pretenden extender la enseñanza mucho más allá de sus fronteras físicas. En particular, el departamento de Psicología ha creado el MOOC “Sexualidad… mucho más que sexo”, el cual tiene como objetivo mejorar la experiencia de los estudiantes para hablar acerca de sexualidad con niñas, niños, estudiantes, pareja o colegas. Este curso se encuentra implementado dentro de la plataforma COURSERA, a partir de la cual se pretende realizar un ejercicio de análisis y construcción de visualización de datos, que fortalezcan el posicionamiento del curso y la posibilidad de mejorar sus contenidos.

## Datos del Proyecto – What
El dataset principal que se utiliza para la visualización es del tipo temporal y estático, y contiene la información relevante de los estudiantes que se inscriben diariamente en el MOOC. Los atributos del dataset son los siguientes:
- Student ID: ordinal y secuencial
- Grade Note: cuantitativo y secuencial (de 0.0 a 1.0)
- Country Origin: categórico
- Country Residence: categórico
- Gender: categórico
- Education Level: categórico
- Age Range: categórico
- Previous Completed Courses: categórico
- Date Enrollment: ordinal y secuencial (solo fechas mayores a 2010)
- Start Date: cuantitativa y secuencial (solo fechas mayores a 2010)
- Last Update: cuantitativa y secuencial (solo fechas mayores a 2010)

Para la tarea principal número 3, se utiliza otro dataset de tipo temporal y estático, que contiene las actividades (items) que van realizando los estudiantes durante el curso. Contiene los siguientes atributos:
- Student ID: ordinal y secuencial
- Item Name: categórico
- Item Sequence: cuantitativo y secuencial
- State: categórico (Started y Completed)
- Datestamp: cuantitativa, secuencial (solo fechas mayores a 2010) y temporal

También se utiliza otro dataset de tipo temporal y estático, que contiene la información de los usuarios del curso que realizan actividades. Se utilizan los siguientes atributos:
- Uniandes_user_id: ordinal y secuencial
- Reported_or_inferred_gender: categórico (mujer, hombre y desconocido)

De igual manera, se utiliza otro dataset de tipo temporal y estático, que contiene la información de los feedbacks de cada actividad que proporciona el usuario. Se utilizan los siguientes atributos:
- Course_item_id: ordinal y secuencial
- Feedback_rating: categórico ("Pulgares hacia arriba" y "Pulgares abajo")

De manera complementaria haremos uso de las encuestas iniciales y finales que toman los estudiantes para agregar información al perfil demográfico o profesional. El dataset de tipo tabla se compone de:
- Student ID: ordinal y secuencial (Llave con los otros datasets)
- Fecha Actualización:  ordinal y secuencial
- Pregunta: Categórico
- Respuesta: Depende de la pregunta, las posibles respuestas pueden ser: Categóricas u Ordinales Secuenciales.

Por último, para cumplir con las tareas principales de la visualización, se derivarán los siguientes atributos:
- Grade Level: categórico, derivado a partir de Grade Note
- Activity Level: categórico, derivado a partir la cantidad de Items que vea un estudiante durante el curso
- Daily Inscriptions: cuantitativa y secuencial

El resultado de las encuestas es la data que apoya la tarea principal.

## Objetivos del Proyecto - Why
Tareas Principales
- TP1: Identificar las características que indican que el MOOC es efectivo y que realmente mejora las competencias y capacidades para hablar de “Sexualidad” en los participantes, aunque no cuente con un profesor de forma presencial (Identify – Features).
- TP2: Descubrir la distribución de las variables demográficas de los estudiantes que completan el curso, para identificar cuales comunidades demuestran mayor interés en realizar y terminar del curso (Discover - Distributions).
- TP3: Identificar las actividades más populares y las menos populares de las disponibles en el curso, contrastando la cantidad de veces que una actividad fue completada contra la cantidad de veces que una actividad no fue completada. ()

Tareas Secundarias
1. Determinar si existe alguna actividad o ítem en la cual los estudiantes se retiran del curso de manera frecuente, de tal manera que se logre identificar un momento clave de deserción (Locate - Outliers).
2. Explorar la distribución y el conteo de los estudiantes a nivel global, teniendo en cuenta que el curso se dicta en línea (Explore - Distribution).
3. Perfilar los usuarios del curso, y lograr identificar las poblaciones más activas (Compare-Features).
4. Encontrar las épocas o rangos de fechas de mayor inscripción de estudiantes, con el fin de fortalecer y enfocar hacia determinadas poblaciones las campañas de marketing del curso, de tal manera que se logre aumentar el índice de participación anual (Locate - Outliers).
5. Identificar las actividades (ítems) más populares y las menos populares de las disponibles en el curso, a través de su calificación de tipo Like/Dislike (Identify- Extremes).
6. Identificar las actividades más populares y las menos populares de las disponibles en el curso, a través de la cantidad de interacciones que tiene cada ítem, donde cada actividad que es iniciada tiene un estado de “iniciada” y cada actividad iniciada que es completada por el usuario de cambia de estado a “completada”. La actividad puede ser iniciada y completada muchas veces por un mismo usuario. (Identify- Extremes)

## Marcas y Canales – How
En el proceso de definición de la visualización, teniendo en cuenta las tareas seleccionadas y los datos, se realizó la propuesta del HOW la cual consta de los modismos descritos a continuación:
Modismo para la TP1, compuesto por 2 gráficos (un bar chart a la izquierda y un multi series line chart) yuxtapuestos:
- Marcas: para el bar chart, líneas verticales y para el ms line chart, puntos unidos por líneas.
- Canales: longitud en el eje Y para expresar cantidad (de estudiantes en el bar chart y de expectativa para el ms line chart) y color hue para diferenciar las categorías de las variables (curvas).
- How-Encode: para el bar chart arrange express en el eje Y, y en el eje X, separate, order y align para las posibles respuestas de las encuestas. Para el ms line chart, arrange express para ambos ejes.
- How-Face: juxtapose de los 2 gráficos (bar chart y multi series line chart).
- How-Reduce: los datos pueden ser reducidos a partir de un conjunto de filtros comunes, por: género, país de residencia, horas dedicadas y nivel educativo.
- Coordinate views: multiform, ya que usan los mismos datos, pero con diferente encoding.
- Descripción: este modismo está compuesto por 2 gráficos yuxtapuestos, que ayudan a identificar características o patrones que muestren la relevancia del presente MOOC.

Modismo para la TP2, Stacked Bar Chart Vertical, Horizontal BarChart, Bubble chart y Map view:
- Marcas: líneas verticales y Areas (Circulos).
- Canales: longitud y Area 2D para expresar la cantidad de estudiantes. Color (Hue) para separar las categorías en las variables demográficas Sexo, Área de trabajo, Rango de edad. El eje Y está ordenado de forma express. Área para expresar el volumen de estudiantes por sexo. Área para cantidad de estudiantes y ubicación espacial en el mapa por país de residencia del estudiante
- How-Encode: agrupación de las poblaciones por cuartiles en rangos de porcentaje para la completitud de actividades. Separate, order & align.
- How-Manipulate: change.
- How-Reduce: aggregate.
- Descripción: se presenta la cantidad de estudiantes en el eje Y, agrupada por cuartiles y se complementa con la volumetría en cada variable demográfica.

Modismo para la TP3, un Force Network Diagram:
- Marcas: Puntos para los nodos y líneas (connection marks) for links.
- Canales: Area (2D size): que se obtiene por el valor de la cantidad de casos aplicada con una escala SQRT sobre el radio de los puntos. Posición para aplicar la fuerza y mantener los nodos visibles dentro del espacio del SVG. y para obtener la posición del nodo target. Hue - Color: para diferenciar los grupos o clusters de las diferentes categorías.
- How: Manipulate - Change: para hacer el cambio entre el uso de la fuerza (force) y agrupar. Manipulate - Navigate: para navegar los nodos una vez se hace zoom.
- Descripción: este modismo estará compuesto por una red que representará los enlaces y nodos que son los ítems o actividades dentro del MOOC de sexualidad.

Con respecto a los modismos para las tareas secundarias:
- Para la tarea secundaria 1, se propone un bar chart vertical, que contabilice (summarize) cual fue la última actividad realizada por cada estudiante, a fin de identificar si existe una actividad en donde un grupo importante de estudiantes se retira del curso. Las marcas serán líneas verticales, y los canales será longitud para expresar la cantidad de estudiantes que llegaron a dicha actividad. El eje Y estará ordenado de forma express, y el eje X usará separete, order y align para posicionar las barras.
- Para las tareas secundarias de la 2 y 3, se propone como modismos el uso de Stacked Bar Chart Horizontal (Normalized), similar al propuesto para la tarea principal 3.
- Para la tarea secundaria 4, se propone usar un modismo compuesto por un Calendar View y un Line Chart. En el Calendar View se resumirán las tendencias de todos los años, mientras que en el Line Chart, se mostrará información sólo para 1 año en específico. Además, el Line Chart, mostrará líneas del tipo dash que corten el eje Y, para definir las zonas de tolerancia a partir de las cuales, se identifican los outliers. Los datos de ambos gráficos estarán ordenados de forma express sobre el eje X. También estarán ordenados y alineados en el eje Y, con respecto a la cantidad de inscripciones por fecha. El line chart será actualizado, a partir de una interacción del tipo Select sobre un combo box.

## Insights
- I1: Los exámenes no están siendo muy atractivos para los estudiantes ya que de acuerdo con la visualización son los ítems menos populares entre la gente que no completa el curso, es por esto por lo que a pesar de que nuestro curso es el que tiene mayor popularidad en Los Andes y probablemente en español, de mis más de 70 mil estudiantes, tan solo el 25% me están completando el curso.
- I2: Pensábamos que la fecha de mayor inscripción era en febrero, pero analizando la visualización nos dimos cuenta de que es a mediados del tercer trimestre del año.
- I3: Entre diciembre y febrero, la población activa cambia, ya que los que lo utilizan más son personas de entre 20 y 25, contrario a lo que creíamos antes de ver la visualización.
- I4: Lastimosamente cerca del 25% de los cursos que dictamos tienen nivel de deserción, según la visualización de entre 2 y 4 de 5.
- I5: Los estudiantes activos están más atraídos a tomar los ítems que no están dentro del top 5 de cursos más vistos.
- I6: Los estudiantes menos activos están más atraídos a tomar los ítems aparecen al principio, pero luego se desmotivan al llegar a los ítems cercanos al 13.
- I7: Comparando los estudiantes que aprueban el curso contra los estudiantes que se retiran antes de obtener el certificado, se denota que la mayoría de los estudiantes que no se certifican tienen un nivel académico inferior a los que sí se certifican, no definen su género al momento de registrarse a Coursera y no llenan las encuestas.
- I8: Arriba del 85% de los estudiantes que están ubicados en países diferentes a Colombia siempre completan el curso y obtienen certificado.
- I9: Los estudiantes que no completan el curso y que son colombianos, tienen predilección por los cursos con títulos más descriptivos.
- I10: Gracias a la visualización me di cuenta de que existen unas fechas en las que ha habido picos de inscripción que no tenía presentes por el tiempo que había transcurrido y que ahora me permitirá entender si tenemos que volver a solicitar o a Coursera o a UNIANDES campañas similares para volver a atraer más gente.
- I11: A pesar de que en principio se pensaba que el balance de hombres y mujeres participantes en el curso era similar, e incluso, que la población masculina podría llegar a ser mayor, hemos detectado que son las mujeres quienes más se interesan por los contenidos del MOOC, y no solamente por curiosear, son las mas juiciosas para completar las actividades del curso.
- I12: La población más interesada en los contenidos del curso, son profesionales de la salud y las ciencias sociales, que se encuentran entre los 18 y 44 años. El curso en línea ha logrado despertar el interés de profesionales jóvenes, gracias a su amplio contenido enfocado al desarrollo de capacidades para entender y transmitir los conceptos de sexualidad.
- I13: Hemos encontrado un comportamiento particular con el volumen de inscripciones durante los 3 años que lleva el curso en línea, en donde principalmente el volumen de inscritos a venido descendiendo, sin embargo, existen unos puntos en el tiempo donde se disparan las inscripciones, como es el caso del 10 de junio, fecha inmediatamente posterior a una publicación en revista, evidenciando la efectividad de estas campañas publicitarias.
- I14: A partir de las encuestas realizadas, se observa la efectividad del MOOC en los estudiantes, ya que antes de cursarlo tienen un conocimiento y expectativas sobre el tema entre regular y bueno (2.5/5.0 en promedio), pero luego de cursarlo, mejora su conocimiento entre muy bueno o excelente (4.5/5.0 en promedio).

## Tecnologías Usadas
Para el desarrollo del proyecto se usaron las siguientes tecnologías:
- Se usó Sublime Text 3 como IDE de desarrollo.
- HTML y CSS, para maquetar el sitio web.
- Javascript y el framework d3.js para crear los gráficos (de barras y de líneas) y la respectiva interacción con ellos.
- Tableau para realizar los gráficos de la tarea principal 2.
- GitHub para almacenar el código de la Viz y de los datos usados.

## Prerrequisitos y Uso
El proyecto sólo depende del acceso a los datos almacenados en el repositorio https://github.com/vladcuevas/MOOCSexualidad-ProyectoFinalVA/ y a la disponibilidad del servicio de GitHub Pages, que permite el acceso por medio de un Navegador a la página principal proyecto.

## Autores
El autor de los datos es...
Los datos están actualizados hasta mediados del 2018.

Los autores de la visualización son Vladimir E. Cuevas, Juan Carlos Oyuela y Andres Segura Tinoco.

## Screenshot
A continuación, se presentan unos pantallazo del proyecto:

## Licencia
Este proyecto está bajo la licencia MIT.
