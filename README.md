# Social-Net 📲
Demo https://social-net-phi.vercel.app/


Hola bienvenid@, social-net es una modesta red social construida con tecnologias como **React.js** haciendo uso de **Next.js** que es su framework oficial del lado del servidor, el cual no permite crear nuestros propios endpoints API y hacer server side rendering (SSR) y por ende mejorar en gran medida el performance de nuestra apps, lo cual es muy bueno en cuanto a SEO.

También hago uso de **Firebase** como backend as a service para la base de datos.

Construida bajo el paradigma de Mobile Only.

> Registro y login de usuarios

![screenshot](https://i.postimg.cc/jqhKPspZ/login-page.png) 
![screenshot](https://i.postimg.cc/4NNG1DZZ/login-modal.png)


En social-net puedes crearte una cuenta para ingresar, donde lo primero que veras será el timeline de la home, en la cual podrás observar todas las publicaciones que los usuarios de social-net han creado, donde también podras interactuar con dichas publicaciones haciendoles comentarios o guardandolas en tus favoritos.

> Imagen de la home timeline

![screenshot](https://i.postimg.cc/zf60Hrf7/home-timeline.png)

Cada post creado se compone por el avatar del usuario que lo creó junto con su nombre, un timestamp que indica hace cuanto tiempo se ha creado la publicación, el contendio del post porsupuesto (el cual puede llevar solo texto, o tambien ir acompañado de una imagen) , también encontraras algunos iconos, como el icono de "cesta de basura" con el cual si eres el creador podras eliminar dicho post, tambien un icono de "comentario" que indica el numero de comentarios que posee el post, y por último el icono de "estrella" cuya funcion es guardar dicho post en tus favoritos al dar clic sobre ella, donde si le vuelves a dar clic elimará dicho post de tus favoritos.

> Estrucutra del post

![screenshot](https://i.postimg.cc/Y242KcZ3/nett-details-page.png)
![screenshot](https://i.postimg.cc/SsQN9wtX/nett-structure.png)


Cada usuario de la app posee su propio perfil, donde si por ejemplo en cualquier post das click sobre la imagen de avatar o su nombre, te llevará al perfil del usuario correspondiente, donde podrás visualizar todos los post que dicho usuario ha creado.

Tu también contaras con una sección para tu perfil, donde además de visualizar todos lo post que has creado también tendrás un sección de "Favs" donde podrás visualizar todos los post que has guardado como favoritos. Además de lo anterior tambien es aqui donde podrás actualizar tu foto de avatar y tu username.

> Profile

![screenshot](https://i.postimg.cc/ZKmZykBJ/profile-page.png)

Exite también una sección muy importante, que es la sección para crear un post, a la cual puedes acceder desde el icono de "crear nota" que esta hubicada en la home timeline. Entonces es en esta sección donde crearás tus post , ya sean solo texto, o con imagen, la cual podras adjuntar a tráves del icono de "imagen".

> Crear un Post

![screenshot](https://i.postimg.cc/pXYvQP3s/create-nett.png)


En la home también encontrarás un icono de "lupa" la cual te llevará a una sección donde logicamente podrás buscar a cualquier usuario de la app, a tráves de su username. Dichos usuarios solamente aparecerán en el buscador solamente si han hecho almenos un post.

> Buscador de usuarios

![screenshot](https://i.postimg.cc/jqpmkByB/search-user.png)


Te invito a conocer el proyecto en https://social-net-phi.vercel.app/
