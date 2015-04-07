angular.module('tpls').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('modules/articles/views/create-article.client.view.html',
    "<h3>New Article</h3>\n" +
    "<section data-ng-controller=\"ArticlesController\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<form name=\"articleForm\" class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "\t\t\t<fieldset>\n" +
    "\t\t\t\t<div class=\"form-group\" ng-class=\"{ 'has-error': articleForm.title.$dirty && articleForm.title.$invalid }\">\n" +
    "\t\t\t\t\t<label class=\"control-label\" for=\"title\">Title</label>\n" +
    "\t\t\t\t\t<div class=\"controls\">\n" +
    "\t\t\t\t\t\t<input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t<label class=\"control-label\" for=\"content\">Content</label>\n" +
    "\t\t\t\t\t<div class=\"controls\">\n" +
    "\t\t\t\t\t\t<textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Content\"></textarea>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"form-group mt\">\n" +
    "\t\t\t\t\t<input type=\"submit\" class=\"btn btn-default\">\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</fieldset>\n" +
    "\t\t</form>\n" +
    "\t</div>\n" +
    "</section>"
  );


  $templateCache.put('modules/articles/views/edit-article.client.view.html',
    "<h3>Edit Article</h3>\n" +
    "<section data-ng-controller=\"ArticlesController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<form name=\"articleForm\" class=\"form-horizontal\" data-ng-submit=\"update(articleForm.$valid)\" novalidate>\n" +
    "\t\t\t<fieldset>\n" +
    "\t\t\t\t<div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && articleForm.title.$invalid}\">\n" +
    "\t\t\t\t\t<label class=\"control-label\" for=\"title\">Title</label>\n" +
    "\t\t\t\t\t<div class=\"controls\">\n" +
    "\t\t\t\t\t\t<input name=\"title\" type=\"text\" data-ng-model=\"article.title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div ng-show=\"submitted && articleForm.title.$invalid\" class=\"help-block\">\n" +
    "\t\t\t\t\t\t<p ng-show=\"articleForm.title.$error.required\" class=\"text-danger\">Title is required</p>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && articleForm.content.$invalid}\">\n" +
    "\t\t\t\t\t<label class=\"control-label\" for=\"content\">Content</label>\n" +
    "\t\t\t\t\t<div class=\"controls\">\n" +
    "\t\t\t\t\t\t<textarea name=\"content\" data-ng-model=\"article.content\" id=\"content\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Content\" required></textarea>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div ng-show=\"submitted && articleForm.content.$invalid\" class=\"help-block\">\n" +
    "\t\t\t\t\t\t<p ng-show=\"articleForm.content.$error.required\" class=\"text-danger\">Content is required</p>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"form-group mt\">\n" +
    "\t\t\t\t\t<input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</fieldset>\n" +
    "\t\t</form>\n" +
    "\t</div>\n" +
    "</section>"
  );


  $templateCache.put('modules/articles/views/list-articles.client.view.html',
    "<h3>Articles</h3>\n" +
    "<section data-ng-controller=\"ArticlesController\" data-ng-init=\"find()\">\n" +
    "\t<div class=\"list-group\">\n" +
    "\t\t<a data-ng-repeat=\"article in articles\" data-ng-href=\"#!/articles/{{article._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"article.created | date:'mediumDate'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"article.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"article.title\"></h4>\n" +
    "\t\t\t<p class=\"list-group-item-text\" data-ng-bind=\"article.content\"></p>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<h4 class=\"alert alert-purple text-center pv-lg\" data-ng-if=\"articles.$resolved && !articles.length\">\n" +
    "\t\tNo articles yet, why don't you <a href=\"/#!/articles/create\" class=\"text-yellow\">create one</a>?\n" +
    "\t</h4>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/articles/views/view-article.client.view.html',
    "<h3>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"authentication.user._id == article.user._id\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/articles/{{article._id}}/edit\">\n" +
    "\t\t\t<i class=\"fa fa-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"fa fa-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t{{article.title}}\n" +
    "</h3>\n" +
    "<section data-ng-init=\"findOne()\">\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"article.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"article.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "\t<p class=\"lead\" data-ng-bind=\"article.content\"></p>\n" +
    "</section>"
  );


  $templateCache.put('modules/comments/views/create-comment.client.view.html',
    "<section data-ng-controller=\"CommentsController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Comment</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/comments/views/edit-comment.client.view.html',
    "<section data-ng-controller=\"CommentsController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Comment</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"comment.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/comments/views/list-comments.client.view.html',
    "<section data-ng-controller=\"CommentsController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Comments</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"comment in comments\" data-ng-href=\"#!/comments/{{comment._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"comment.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"comment.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"comment.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!comments.$resolved || comments.length\">\n" +
    "    \tNo Comments yet, why don't you <a href=\"/#!/comments/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/comments/views/view-comment.client.view.html',
    "<section data-ng-controller=\"CommentsController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"comment.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == comment.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/comments/{{comment._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"comment.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"comment.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/contacts/views/create-contact.client.view.html',
    "<section data-ng-controller=\"ContactsController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h2>Queres formar parte de mascoteros?</h2>\n" +
    "\n" +
    "        <p>Estamos trabajando para darte el mejor servicio, déjanos tu mail, un teléfono y tu rol( vet, paseador, entrenador, etc y nosotros nos ponemos en contacto con vos).</p>\n" +
    "\n" +
    "        <p>Por otras consultas envíanos un mail a <a href=\"mailto:info@mascoteros.net\">info@mascoteros.net</a></p>\n" +
    "\n" +
    "        <p>Gracias por confiar en nosotros. <br/>\n" +
    "        El equipo de mascoteros.</p>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Nombre</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Nombre\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"role\">Rol</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"role\" id=\"role\" class=\"form-control\" placeholder=\"Veterinaria, Entrenador\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"email\">Email</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"email\" id=\"email\" class=\"form-control\" placeholder=\"Email@email.com\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"tel\">Teléfono</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"tel\" id=\"tel\" class=\"form-control\" placeholder=\"(011)11-2233-4455\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <br/>\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/contacts/views/edit-contact.client.view.html',
    "<section data-ng-controller=\"ContactsController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Contact</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"contact.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/contacts/views/list-contacts.client.view.html',
    "<section data-ng-controller=\"ContactsController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Contacts</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"contact in contacts\" data-ng-href=\"#!/contacts/{{contact._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"contact.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"contact.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"contact.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!contacts.$resolved || contacts.length\">\n" +
    "    \tNo Contacts yet, why don't you <a href=\"/#!/contacts/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/contacts/views/view-contact.client.view.html',
    "<section data-ng-controller=\"ContactsController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1>Gracias {{contact.name}}.</h1>\n" +
    "\t</div>\n" +
    "\t<!--\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == contact.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/contacts/{{contact._id}}/edit\">\n" +
    "\t\t\t<i class=\"fa fa-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"fa fa-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t-->\n" +
    "\t<!--<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"contact.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tpor\n" +
    "\t\t\t<span data-ng-bind=\"contact.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>-->\n" +
    "</section>\n"
  );


  $templateCache.put('modules/core/views/home.client.view.html',
    "<header class=\"header landing\" data-ng-controller=\"HomeController\" data-ng-init=\"checkAuthentication()\" ng-cloak>\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-5 col-md-offset-1\">\n" +
    "        <div class=\"content\">\n" +
    "          <div class=\"pull-middle\">\n" +
    "            <h1 class=\"page-header\">La nueva forma de cuidar a tu mascota, gratis!</h1>\n" +
    "            <p class=\"lead\">Ingresá con tus redes sociales, añadí tu mascota y listo.</p>\n" +
    "            <a href=\"/auth/facebook\" class=\"undecorated-link\">\n" +
    "              <img src=\"/modules/users/img/buttons/facebook.png\" data-wow-offset=\"15\" data-wow-duration=\"1.2s\" class=\"wow zoomIn animated\">\n" +
    "            </a>\n" +
    "            <a href=\"/auth/twitter\" class=\"undecorated-link\">\n" +
    "              <img src=\"/modules/users/img/buttons/twitter.png\" data-wow-offset=\"15\" data-wow-duration=\"1.2s\" class=\"wow zoomIn animated\">\n" +
    "            </a>\n" +
    "            <a href=\"/auth/google\" class=\"undecorated-link\">\n" +
    "              <img src=\"/modules/users/img/buttons/google.png\" data-wow-offset=\"15\" data-wow-duration=\"1.2s\" class=\"wow zoomIn animated\">\n" +
    "            </a>\n" +
    "            <!--<button class=\"btn btn-primary btn-large\"><i class=\"fa fa-facebook\"></i> Facebook</button>\n" +
    "            <button class=\"btn btn-primary btn-large\"><i class=\"fa fa-facebook\"></i> Twitter</button>-->\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-4 text-center mt-100 mb-100\">\n" +
    "        <div class=\"phone\">\n" +
    "          <img class=\"img-responsive img-rounded\" src=\"/modules/core/img/cel1.png\" data-wow-offset=\"15\" data-wow-duration=\"1.2s\" class=\"wow zoomIn animated\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</header>\n" +
    "<!-- START DOWNLOAD-->\n" +
    "<section id=\"download\" class=\"download landing\">\n" +
    "  <div class=\"container\">\n" +
    "    <h2 data-wow-offset=\"0\" data-wow-duration=\"1.2s\" class=\"wow fadeInDown animated\">Bajate la app mascotera!</h2>\n" +
    "    <div data-wow-offset=\"0\" data-wow-duration=\"1.2s\" class=\"wow fadeInUp animated\">\n" +
    "      <a href=\"\" class=\"btn btn-lg btn-primary\">\n" +
    "        <em class=\"fa fa-apple\"></em> Itunes Store</a>\n" +
    "      <a href=\"\" class=\"btn btn-lg btn-primary\">\n" +
    "        <em class=\"fa fa-android\"></em> Play Store</a>\n" +
    "    </div>\n" +
    "    <div data-wow-offset=\"0\" data-wow-duration=\"1.2s\" class=\"wow fadeInUp animated\">\n" +
    "      (Proximamente)\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>\n" +
    "<!-- END DOWNLOAD-->\n" +
    "<section class=\"section landing\">\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-4 text-center mt-100 mb-100\">\n" +
    "        <div class=\"phone\">\n" +
    "          <img class=\"img-responsive img-rounded\" src=\"/modules/core/img/cel2.png\" data-wow-offset=\"15\" data-wow-duration=\"1.2s\" class=\"wow fadeInDown\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-5 col-md-offset-1\">\n" +
    "        <div class=\"content\">\n" +
    "          <div class=\"pull-middle\">\n" +
    "            <h2 class=\"h1 page-header\">Descubrí la nueva forma de cuidar a tu mascota.</h2>\n" +
    "            <ul class=\"media-list\">\n" +
    "              <li class=\"media\">\n" +
    "                <a class=\"media-left\" href=\"#\">\n" +
    "                  <span class=\"fa fa-cloud icon text-success\"></span>\n" +
    "                </a>\n" +
    "                <div class=\"media-body\">\n" +
    "                  <h3 class=\"media-heading\">Id para tu mascota.</h3>\n" +
    "                  <p>Registrate, imprimí y listo. Desde un celular escanea el codigo QR y podes ver el perfil de tu mascota, totalmente gratis.</p>\n" +
    "                </div>\n" +
    "              </li>\n" +
    "              <li class=\"media\">\n" +
    "                <a class=\"media-left\" href=\"#\">\n" +
    "                  <span class=\"fa fa-lock icon text-success\"></span>\n" +
    "                </a>\n" +
    "                <div class=\"media-body\">\n" +
    "                  <h3 class=\"media-heading\">Privacidad.</h3>\n" +
    "                  <p>Si no queres que tus datos sean publicos, podés activar el perfíl cuando lo necesites.(premium)</p>\n" +
    "                </div>\n" +
    "              </li>\n" +
    "              <li class=\"media\">\n" +
    "                <a class=\"media-left\" href=\"#\">\n" +
    "                  <span class=\"fa fa-user icon text-success\"></span>\n" +
    "                </a>\n" +
    "                <div class=\"media-body\">\n" +
    "                  <h3 class=\"media-heading\">Geo Localization.</h3>\n" +
    "                  <p>Si tu perro es escaneado te enviamos un alerta con la posición.</p>\n" +
    "                </div>\n" +
    "              </li>\n" +
    "              <li class=\"media\">\n" +
    "                <a class=\"media-left\" href=\"#\">\n" +
    "                  <span class=\"fa fa-user icon text-success\"></span>\n" +
    "                </a>\n" +
    "                <div class=\"media-body\">\n" +
    "                  <h3 class=\"media-heading\">Directorio.</h3>\n" +
    "                  <p>Buscas entrenadores, veterinarias, amigos, eventos... encontralo acá. </p>\n" +
    "                </div>\n" +
    "              </li>\n" +
    "              <li class=\"media\">\n" +
    "                <a class=\"media-left\" href=\"#\">\n" +
    "                  <span class=\"fa fa-user icon text-success\"></span>\n" +
    "                </a>\n" +
    "                <div class=\"media-body\">\n" +
    "                  <h3 class=\"media-heading\">Y más.</h3>\n" +
    "                  <p>Estamos en desarrollo constantemente, para ofrecerte siempre algo nuevo para vos y tus mascotas. </p>\n" +
    "                </div>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/core/views/timeline.client.view.html',
    "\n" +
    "<h3>Timeline</h3>\n" +
    "\n" +
    "<div class=\"panel widget bg-warning\">\n" +
    "\t<div class=\"row row-table row-flush\">\n" +
    "\t\t<div class=\"col-xs-1\">\n" +
    "\t\t\t<picture class=\"lateral-picture\">\n" +
    "\t\t\t\t<i class=\"icon-info\"></i>\n" +
    "\t\t\t</picture>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"col-xs-11 align-middle p-lg\">\n" +
    "\t\t\t<div class=\"pull-right\">\n" +
    "\t\t\t\t<a href=\"/#!/settings/profile\" class=\"btn btn-primary btn-sm\">Editar perfíl</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<p>Completá tu perfíl para obtener una experiéncia más adecuada!</p>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- START timeline-->\n" +
    "<!-- ul.timeline-alt-->\n" +
    "<ul class=\"timeline\" data-ng-controller=\"TimelineController\">\n" +
    "\t<li data-datetime=\"Now\" class=\"timeline-separator\"></li>\n" +
    "\t<!-- START timeline item-->\n" +
    "\t<li>\n" +
    "\t\t<div class=\"timeline-badge primary\">\n" +
    "\t\t\t<em class=\"fa fa-users\"></em>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"timeline-panel\">\n" +
    "\t\t\t<div class=\"popover\">\n" +
    "\t\t\t\t<h4 class=\"popover-title\">Client Meeting</h4>\n" +
    "\t\t\t\t<div class=\"arrow\"></div>\n" +
    "\t\t\t\t<div class=\"popover-content\">\n" +
    "\t\t\t\t\t<p>Av 123 St - Floor 2\n" +
    "\t\t\t\t\t\t<br>\n" +
    "\t\t\t\t\t\t<small>Pellentesque ut diam velit, eget porttitor risus. Nullam posuere euismod volutpat.</small>\n" +
    "\t\t\t\t\t</p>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</li>\n" +
    "\t<!-- END timeline item-->\n" +
    "\t<!-- START timeline item-->\n" +
    "\t<li class=\"timeline-inverted\">\n" +
    "\t\t<div class=\"timeline-badge warning\">\n" +
    "\t\t\t<em class=\"fa fa-phone\"></em>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"timeline-panel\">\n" +
    "\t\t\t<div class=\"popover right\">\n" +
    "\t\t\t\t<h4 class=\"popover-title\">Call</h4>\n" +
    "\t\t\t\t<div class=\"arrow\"></div>\n" +
    "\t\t\t\t<div class=\"popover-content\">\n" +
    "\t\t\t\t\t<p>Michael <a href=\"tel:+011654524578\">(+011) 6545 24578 ext. 132</a>\n" +
    "\t\t\t\t\t\t<br>\n" +
    "\t\t\t\t\t\t<small>Pellentesque ut diam velit, eget porttitor risus. Nullam posuere euismod volutpat.</small>\n" +
    "\t\t\t\t\t</p>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</li>\n" +
    "\t<!-- END timeline item-->\n" +
    "\t<!-- START timeline separator-->\n" +
    "\t<li data-datetime=\"Yesterday\" class=\"timeline-separator\"></li>\n" +
    "\t<!-- END timeline separator-->\n" +
    "\t<!-- START timeline item-->\n" +
    "\t<li>\n" +
    "\t\t<div class=\"timeline-badge danger\">\n" +
    "\t\t\t<em class=\"fa fa-video-camera\"></em>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"timeline-panel\">\n" +
    "\t\t\t<div class=\"popover\">\n" +
    "\t\t\t\t<h4 class=\"popover-title\">Conference</h4>\n" +
    "\t\t\t\t<div class=\"arrow\"></div>\n" +
    "\t\t\t\t<div class=\"popover-content\">\n" +
    "\t\t\t\t\t<p>Join development group</p>\n" +
    "\t\t\t\t\t<small>\n" +
    "\t\t\t\t\t\t<a href=\"skype:echo123?call\">\n" +
    "\t\t\t\t\t\t\t<em class=\"fa fa-phone\"></em>Call the Skype Echo</a>\n" +
    "\t\t\t\t\t</small>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</li>\n" +
    "\t<!-- END timeline item-->\n" +
    "\t<!-- START timeline item-->\n" +
    "\t<li class=\"timeline-inverted\">\n" +
    "\t\t<div class=\"timeline-panel\">\n" +
    "\t\t\t<div class=\"popover right\">\n" +
    "\t\t\t\t<h4 class=\"popover-title\">Appointment</h4>\n" +
    "\t\t\t\t<div class=\"arrow\"></div>\n" +
    "\t\t\t\t<div class=\"popover-content\">\n" +
    "\t\t\t\t\t<p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam.</p>\n" +
    "\t\t\t\t\t<div class=\"btn-group\">\n" +
    "\t\t\t\t\t\t<a href=\"#\" data-toggle=\"dropdown\" data-play=\"fadeIn\" class=\"dropdown-toggle\">\n" +
    "\t\t\t\t\t\t\t<em class=\"fa fa-paperclip\"></em>\n" +
    "\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t<ul class=\"dropdown-menu text-left\">\n" +
    "\t\t\t\t\t\t\t<li>\n" +
    "\t\t\t\t\t\t\t\t<a href=\"#\">\n" +
    "\t\t\t\t\t\t\t\t\t<em class=\"fa fa-download\"></em>Download</a>\n" +
    "\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t\t<li>\n" +
    "\t\t\t\t\t\t\t\t<a href=\"#\">\n" +
    "\t\t\t\t\t\t\t\t\t<em class=\"fa fa-share\"></em>Send to</a>\n" +
    "\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t\t<li class=\"divider\"></li>\n" +
    "\t\t\t\t\t\t\t<li>\n" +
    "\t\t\t\t\t\t\t\t<a href=\"#\">\n" +
    "\t\t\t\t\t\t\t\t\t<em class=\"fa fa-times\"></em>Delete</a>\n" +
    "\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t</ul>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</li>\n" +
    "\t<!-- END timeline item-->\n" +
    "\t<!-- START timeline item-->\n" +
    "\t<li>\n" +
    "\t\t<div class=\"timeline-badge info\">\n" +
    "\t\t\t<em class=\"fa fa-plane\"></em>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"timeline-panel\">\n" +
    "\t\t\t<div class=\"popover\">\n" +
    "\t\t\t\t<h4 class=\"popover-title\">Fly</h4>\n" +
    "\t\t\t\t<div class=\"arrow\"></div>\n" +
    "\t\t\t\t<div class=\"popover-content\">\n" +
    "\t\t\t\t\t<p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</li>\n" +
    "\t<!-- END timeline item-->\n" +
    "\t<!-- START timeline item-->\n" +
    "\t<li>\n" +
    "\t\t<div class=\"timeline-panel\">\n" +
    "\t\t\t<div class=\"popover\">\n" +
    "\t\t\t\t<h4 class=\"popover-title\">Appointment</h4>\n" +
    "\t\t\t\t<div class=\"arrow\"></div>\n" +
    "\t\t\t\t<div class=\"popover-content\">\n" +
    "\t\t\t\t\t<p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</li>\n" +
    "\t<!-- END timeline item-->\n" +
    "\t<!-- START timeline separator-->\n" +
    "\t<li data-datetime=\"2014-05-21\" class=\"timeline-separator\"></li>\n" +
    "\t<!-- END timeline separator-->\n" +
    "\t<!-- START timeline item-->\n" +
    "\t<li class=\"timeline-inverted\">\n" +
    "\t\t<div class=\"timeline-badge success\">\n" +
    "\t\t\t<em class=\"fa fa-music\"></em>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"timeline-panel\">\n" +
    "\t\t\t<div class=\"popover right\">\n" +
    "\t\t\t\t<h4 class=\"popover-title\">Relax</h4>\n" +
    "\t\t\t\t<div class=\"arrow\"></div>\n" +
    "\t\t\t\t<div class=\"popover-content\">\n" +
    "\t\t\t\t\t<p>Listen some music</p>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</li>\n" +
    "\t<!-- END timeline item-->\n" +
    "\t<!-- START timeline item-->\n" +
    "\t<li class=\"timeline-end\">\n" +
    "\t\t<a href=\"#\" class=\"timeline-badge\">\n" +
    "\t\t\t<em class=\"fa fa-plus\"></em>\n" +
    "\t\t</a>\n" +
    "\t</li>\n" +
    "\t<!-- END timeline item-->\n" +
    "</ul>\n" +
    "<!-- END timeline-->\n"
  );


  $templateCache.put('modules/events/views/create-event.client.view.html',
    "<section data-ng-controller=\"EventsController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Nuevo Evento</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"title\">Titulo</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Titulo\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"image\">Foto</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <!--<input type=\"text\" data-ng-model=\"picture\" id=\"picture\" class=\"form-control\" placeholder=\"Pic Url\" required>-->\n" +
    "                        <input type=\"file\" id=\"image\" fileread=\"image\"  data-ng-model=\"image\" id=\"images.name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"date\">Fecha</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <div class=\"input-group custom-datepicker\">\n" +
    "                            <input type=\"text\" class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"date\" is-open=\"opened\" min-date=\"minDate\" max-date=\"'2015-06-22'\" datepicker-options=\"dateOptions\" date-disabled=\"disabled(date, mode)\" minutes ng-required=\"true\" close-text=\"Close\" />\n" +
    "                              <span class=\"input-group-btn\">\n" +
    "                                <button type=\"button\" id=\"date\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"fa fa-calendar\"></i></button>\n" +
    "                              </span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <timepicker-pop input-time=\"time1\" class=\"input-group\"\n" +
    "                                    show-meridian='true'>\n" +
    "                    </timepicker-pop>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"content\">Contenido</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <text-angular id=\"content\" ng-model=\"content\"></text-angular>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" ng-disabled=\"formBusy\" class=\"btn btn-default mar-bot-40\">\n" +
    "                    <i ng-show=\"formBusy\" class=\"fa fa-cog fa-spin\"></i>\n" +
    "                </div>\n" +
    "                <div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "                    <strong data-ng-bind=\"error\"></strong>\n" +
    "                </div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/events/views/edit-event.client.view.html',
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Editar Evento: {{event.title}}</h1>\n" +
    "        <a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "            <i class=\"fa fa-trash\"></i>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"title\">Titulo</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"event.title\" id=\"title\" class=\"form-control\" placeholder=\"Titulo\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"image\">Foto</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <!--<input type=\"text\" data-ng-model=\"picture\" id=\"picture\" class=\"form-control\" placeholder=\"Pic Url\" required>-->\n" +
    "                        <input type=\"file\" id=\"image\" fileread=\"image\"  data-ng-model=\"event.image\" id=\"images.name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"date\">Fecha</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <p class=\"input-group custom-datepicker\">\n" +
    "                            <input type=\"text\" class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"event.date\" is-open=\"opened\" min-date=\"minDate\" max-date=\"'2015-06-22'\" datepicker-options=\"dateOptions\" date-disabled=\"disabled(date, mode)\" ng-required=\"true\" close-text=\"Close\" />\n" +
    "                              <span class=\"input-group-btn\">\n" +
    "                                <button type=\"button\" id=\"date\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"fa fa-calendar\"></i></button>\n" +
    "                              </span>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"content\">Contenido</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <text-angular id=\"content\" ng-model=\"event.content\"></text-angular>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" ng-disabled=\"formBusy\" class=\"btn btn-default mar-bot-40\">\n" +
    "                    <i ng-show=\"formBusy\" class=\"fa fa-cog fa-spin\"></i>\n" +
    "                </div>\n" +
    "                <div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "                    <strong data-ng-bind=\"error\"></strong>\n" +
    "                </div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/events/views/list-events.client.view.html',
    "<h3>Eventos</h3>\n" +
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"list-group\">\n" +
    "        <div data-ng-repeat=\"event in events\" data-ng-href=\"#!/events/{{event._id}}\" class=\"list-group-item\">\n" +
    "            <div class=\"well\">\n" +
    "                <div class=\"media\">\n" +
    "                    <div class=\"pull-left\">\n" +
    "                        <img class=\"media-object\" ng-src=\"{{event.image | cloudinaryProfile}}\">\n" +
    "                    </div>\n" +
    "                    <div class=\"media-body\">\n" +
    "                        <h4 class=\"media-heading\" data-ng-bind=\"event.title\"></h4>\n" +
    "                        <div ng-bind-html=\"event.content\"></div>\n" +
    "                        <ul class=\"list-inline list-unstyled\">\n" +
    "                            <li><span><i class=\"fa fa-calendar\"></i> {{event.date | amCalendar }} </span></li>\n" +
    "                            <li data-ng-show=\"((authentication.user) && (authentication.user._id == event.user._id))\">\n" +
    "                                <a class=\"btn btn-primary\" href=\"/#!/events/{{event._id}}/edit\">\n" +
    "                                    <i class=\"fa fa-edit\"></i>\n" +
    "                                </a>\n" +
    "                            </li>\n" +
    "                            <!--<li>\n" +
    "                                <span><i class=\"fa fa-facebook-square\"></i></span>\n" +
    "                                <span><i class=\"fa fa-twitter-square\"></i></span>\n" +
    "                                <span><i class=\"fa fa-google-plus-square\"></i></span>\n" +
    "                            </li>-->\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <h4 class=\"alert alert-purple text-center pv-lg\" data-ng-if=\"events.$resolved && !events.length\">\n" +
    "        No tienes eventos creados, deseas <a href=\"/#!/events/create\" class=\"text-yellow\">crear uno</a>?\n" +
    "    </h4>\n" +
    "</section>\n" +
    "<!--<section data-ng-controller=\"PetsController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Pets</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"pet in pets\" data-ng-href=\"#!/pets/{{pet._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"pet.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"pet.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"pet.name\"></h4>\n" +
    "            <span>{{pet}}</span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!pets.$resolved || pets.length\">\n" +
    "    \tNo Pets yet, why don't you <a href=\"/#!/pets/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>-->\n"
  );


  $templateCache.put('modules/events/views/view-event.client.view.html',
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"event.title\"></h1>\n" +
    "\t\t<div ng-bind-html=\"event.content\"></div>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == event.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/events/{{event._id}}/edit\">\n" +
    "\t\t\t<i class=\"fa fa-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"fa fa-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"event.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"event.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/faqs/views/create-faq.client.view.html',
    "<section data-ng-controller=\"FaqsController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Faq</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"title\">Titulo</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Titulo\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"content\">Contenido</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <text-angular id=\"content\" ng-model=\"content\"></text-angular>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/faqs/views/edit-faq.client.view.html',
    "<section data-ng-controller=\"FaqsController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Faq</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"title\">Titulo</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"faq.title\" id=\"title\" class=\"form-control\" placeholder=\"Titulo\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"content\">Contenido</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <text-angular id=\"content\" ng-model=\"faq.content\"></text-angular>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Enviar\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/faqs/views/list-faqs.client.view.html',
    "<h3>Preguntas frecuentes</h3>\n" +
    "<section data-ng-controller=\"FaqsController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"faq in faqs\" data-ng-href=\"#!/faqs/{{faq._id}}\" class=\"list-group-item\">\n" +
    "            <div class=\"well\">\n" +
    "                <div class=\"media\">\n" +
    "                    <div class=\"pull-left\">\n" +
    "                        <i class=\"icon-question\"></i>\n" +
    "                    </div>\n" +
    "                    <div class=\"media-body\">\n" +
    "                        <h4 class=\"media-heading\" data-ng-bind=\"faq.title\"></h4>\n" +
    "                        <div ng-bind-html=\"faq.content\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <h4 class=\"alert alert-purple text-center pv-lg\" data-ng-if=\"faqs.$resolved && !faqs.length\">\n" +
    "        No hay preguntas frecuentes, deseas <a href=\"/#!/faqs/create\" class=\"text-yellow\">crear una</a>?\n" +
    "    </h4>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/faqs/views/view-faq.client.view.html',
    "<section data-ng-controller=\"FaqsController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"faq.title\"></h1>\n" +
    "\t</div>\n" +
    "\t<div ng-bind-html=\"faq.content\"></div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == faq.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/faqs/{{faq._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"faq.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"faq.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/imageuploaders/views/create-imageuploader.client.view.html',
    "<section data-ng-controller=\"ImageuploadersController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Imageuploader</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"images.name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"file\"  fileread=\"vm.file\"  data-ng-model=\"vm.file\" id=\"images.name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                        <input type=\"text\" data-ng-model=\"vm.text\" id=\"images.text\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/imageuploaders/views/edit-imageuploader.client.view.html',
    "<section data-ng-controller=\"ImageuploadersController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Imageuploader</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"imageuploader.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/imageuploaders/views/list-imageuploaders.client.view.html',
    "<section data-ng-controller=\"ImageuploadersController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Imageuploaders</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"imageuploader in imageuploaders\" data-ng-href=\"#!/imageuploaders/{{imageuploader._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"imageuploader.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"imageuploader.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"imageuploader.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!imageuploaders.$resolved || imageuploaders.length\">\n" +
    "    \tNo Imageuploaders yet, why don't you <a href=\"/#!/imageuploaders/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/imageuploaders/views/view-imageuploader.client.view.html',
    "<section data-ng-controller=\"ImageuploadersController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"imageuploader.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == imageuploader.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/imageuploaders/{{imageuploader._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"imageuploader.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"imageuploader.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/issues/views/create-issue.client.view.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <section data-ng-controller=\"IssuesController\">\n" +
    "            <div class=\"page-header\">\n" +
    "                <h1>Nuevo reporte</h1>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "                    <fieldset>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label\" for=\"title\">Titulo</label>\n" +
    "                            <div class=\"controls\">\n" +
    "                                <input type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label\" for=\"title\">Foto</label>\n" +
    "                            <div class=\"controls\">\n" +
    "                                <input type=\"file\"  fileread=\"image\"  data-ng-model=\"image\" id=\"image\" class=\"form-control\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label\" for=\"title\">Descripción</label>\n" +
    "                            <div class=\"controls\">\n" +
    "                                <textarea name=\"description\" data-ng-model=\"description\" id=\"description\" class=\"form-control\" required></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                            <i ng-show=\"formBusy\" class=\"fa fa-cog fa-spin\"></i>\n" +
    "                        </div>\n" +
    "                        <div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "                            <strong data-ng-bind=\"error\"></strong>\n" +
    "                        </div>\n" +
    "                    </fieldset>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </section>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/issues/views/edit-issue.client.view.html',
    "<section data-ng-controller=\"IssuesController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Issue</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"issue.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/issues/views/list-issues.client.view.html',
    "<section data-ng-controller=\"IssuesController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Issues</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"issue in issues\" data-ng-href=\"#!/issues/{{issue._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"issue.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"issue.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"issue.title\"></h4>\n" +
    "            <p>{{issue.description}}</p>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!issues.$resolved || issues.length\">\n" +
    "    \tNo Issues yet, why don't you <a href=\"/#!/issues/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/issues/views/view-issue.client.view.html',
    "<section data-ng-controller=\"IssuesController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"issue.title\"></h1>\n" +
    "\t\t<img ng-src=\"{{issue.image | cloudinaryProfile}}\" alt=\"\"/>\n" +
    "\t\t<p>{{issue.description}}</p>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == issue.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/issues/{{issue._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"issue.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"issue.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/notifications/views/create-notification.client.view.html',
    "<section data-ng-controller=\"NotificationsController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Notification</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/notifications/views/edit-notification.client.view.html',
    "<section data-ng-controller=\"NotificationsController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Notification</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"notification.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/notifications/views/list-notifications.client.view.html',
    "<section data-ng-controller=\"NotificationsController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Notifications</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"notification in notifications\" data-ng-href=\"#!/notifications/{{notification._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"notification.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"notification.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"notification.title\"></h4>\n" +
    "            <p>{{notification.geoLocation}}</p>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!notifications.$resolved || notifications.length\">\n" +
    "    \tNo Notifications yet, why don't you <a href=\"/#!/notifications/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/notifications/views/view-notification.client.view.html',
    "<section data-ng-controller=\"NotificationsController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"notification.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == notification.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/notifications/{{notification._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"notification.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"notification.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/petgenres/views/create-petgenre.client.view.html',
    "<section data-ng-controller=\"PetgenresController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Petgenre</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/petgenres/views/edit-petgenre.client.view.html',
    "<section data-ng-controller=\"PetgenresController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Petgenre</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"petgenre.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/petgenres/views/list-petgenres.client.view.html',
    "<section data-ng-controller=\"PetgenresController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Petgenres</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"petgenre in petgenres\" data-ng-href=\"#!/petgenres/{{petgenre._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"petgenre.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"petgenre.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"petgenre.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!petgenres.$resolved || petgenres.length\">\n" +
    "    \tNo Petgenres yet, why don't you <a href=\"/#!/petgenres/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/petgenres/views/view-petgenre.client.view.html',
    "<section data-ng-controller=\"PetgenresController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"petgenre.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == petgenre.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/petgenres/{{petgenre._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"petgenre.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"petgenre.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/pets/views/create-pet.client.view.html',
    "<section data-ng-controller=\"PetsController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Nueva Mascota</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <div class=\"panel-info\" id=\"step1\" ng-show=\"step == 1\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-4 col-md-offset-1\">\n" +
    "                        <div class=\"panel widget\" ng-click=\"step = 3\">\n" +
    "                            <div class=\"panel-body\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-12\" style=\"background-image: url('/modules/core/img/create1.jpg'); background-size: cover; height: 350px;margin-bottom: 15px;background-position: center center;\"></div>\n" +
    "                                </div>\n" +
    "                                <div class=\"row row-table\">\n" +
    "                                    <div class=\"col-xs-12 text-center\">\n" +
    "                                        Registrar mi mascota\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-4 col-md-offset-2\">\n" +
    "                        <div class=\"panel widget\" ng-click=\"step = 2\">\n" +
    "                            <div class=\"panel-body\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-12\" style=\"background-image: url('/modules/core/img/create2.jpg'); background-size: cover; height: 350px;margin-bottom: 15px;background-position: center center;\"></div>\n" +
    "                                </div>\n" +
    "                                <div class=\"row row-table\">\n" +
    "                                    <div class=\"col-xs-12 text-center\">\n" +
    "                                        Registrar una mascota de otra persona\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"\" id=\"step2\" ng-show=\"step == 2\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-10 col-md-offset-1\">\n" +
    "                        <div class=\"panel widget\">\n" +
    "                            <div class=\"panel-body\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-xs-6 text-center\">\n" +
    "                                        Invitar amigo:\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-xs-6 text-center\">\n" +
    "                                        <input type=\"text\" data-ng-model=\"inviteUserEmail\" id=\"inviteUserEmail\" class=\"form-control\" placeholder=\"amigo@email.com\" required>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-12\">\n" +
    "                        <button class=\"btn btn-lg-btn-primary\" ng-click=\"step = 1\"> atras</button>\n" +
    "                        <button class=\"btn btn-lg-btn-primary\" ng-click=\"step = 3\"> siguiente</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"panel panel-info\" id=\"step3\" ng-show=\"step == 3\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-3 col-lg-3 \" align=\"center\">\n" +
    "                            <div ng-hide=\"pet.picture\" class=\"pet-avatar\">\n" +
    "                                <i class=\"fa fa-paw img-circle\"></i>\n" +
    "                            </div>\n" +
    "                            <img ng-show=\"picture\" alt=\"{{name}}\" ng-src=\"{{picture}}\" class=\"\">\n" +
    "                            <label class=\"control-label\" for=\"name\">Foto</label>\n" +
    "                            <div class=\"controls\">\n" +
    "                                <!--<input type=\"text\" data-ng-model=\"picture\" id=\"picture\" class=\"form-control\" placeholder=\"Pic Url\" required>-->\n" +
    "                                <input type=\"file\" fileread=\"picture\" data-ng-model=\"picture\" id=\"images.name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\" col-md-9 col-lg-9 \">\n" +
    "                            <table class=\"table table-user-information\">\n" +
    "                                <tbody>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"isPrivate\">Perfil Privado?</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"checkbox\" data-ng-model=\"isPrivate\" id=\"isPrivate\" class=\"form-control\">\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"name\">Nombre</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"nombre de la mascota\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"name\">Tipo de Mascota</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <pet-type-selector ng-model=\"type\"></pet-type-selector>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"breed\">Raza</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"text\" data-ng-model=\"breed\" id=\"breed\" class=\"form-control\" placeholder=\"Raza\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"color\">Color</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"text\" data-ng-model=\"color\" id=\"color\" class=\"form-control\" placeholder=\"Color\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td colspan=\"2\">\n" +
    "                                        <label class=\"control-label\" for=\"yearOfBirth\" style=\"float:left;\">Nació</label>\n" +
    "                                        <simple-date-input data-date=\"yearOfBirth\"></simple-date-input>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "\n" +
    "                                <tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"color\">Genero</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <!--<select name=\"genre\" ng-model=\"genre\" class=\"form-control\" id=\"genre\" required>\n" +
    "                                                <option value=\"male\">Macho</option>\n" +
    "                                                <option value=\"female\">Hembra</option>\n" +
    "                                            </select>-->\n" +
    "                                            <pet-genre-selector ng-model=\"genre\"></pet-genre-selector>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"neutered\">Castrado</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"checkbox\" data-ng-model=\"neutered\" id=\"neutered\" class=\"form-control\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"isAdoption\">En Adopción</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"checkbox\" data-ng-model=\"isAdoption\" id=\"isAdoption\" class=\"form-control\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>Email de contacto</td>\n" +
    "                                    <td>\n" +
    "                                        <input type=\"text\" data-ng-model=\"email\" id=\"email\" class=\"form-control\" placeholder=\"usuario@email.com\" required>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <td><label class=\"control-label\" for=\"description\">Descripcion o Rasgos de la mascota</label></td>\n" +
    "                                <td>\n" +
    "                                    <div class=\"controls\">\n" +
    "                                        <input type=\"text\" data-ng-model=\"description\" id=\"description\" class=\"form-control\" placeholder=\"Mancha pata derecha\" required>\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "\n" +
    "                                </tr>\n" +
    "\n" +
    "                                <!--<tr>\n" +
    "                                    <td>\n" +
    "                                        <iframe ng-if=\"address\" width=\"100%\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" ng-src=\"https://www.google.com.ar/maps/place/{{address}}&output=embed\"></iframe>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"description\">Dirección</label>\n" +
    "                                        <input type=\"text\" ng-autocomplete data-ng-model=\"address\" options=\"options\" details=\"details\" id=\"address\" class=\"form-control\" placeholder=\"Calle 123 - PB\" required>\n" +
    "                                    </td>\n" +
    "                                </tr>-->\n" +
    "                                <tr>\n" +
    "                                    <td>{{address}}</td>\n" +
    "                                </tr>\n" +
    "                                <tr ng-init=\"getGeoLocalization();\">\n" +
    "                                  <td colspan=\"2\">\n" +
    "                                        <script type=\"text/ng-template\" id=\"searchbox.tpl.html\">\n" +
    "                                            <input type=\"text\" data-ng-model=\"address\" id=\"address\" class=\"form-control\" placeholder=\"\" required>\n" +
    "                                        </script>\n" +
    "                                      <ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\" draggable=\"true\" options=\"options\">\n" +
    "                                          <ui-gmap-search-box template=\"searchbox.template\" events=\"searchbox.events\">\n" +
    "                                          </ui-gmap-search-box>\n" +
    "                                          <ui-gmap-marker coords=\"marker.coords\" options=\"marker.options\" events=\"marker.events\" idkey=\"marker.id\">\n" +
    "                                          </ui-gmap-marker>\n" +
    "                                      </ui-gmap-google-map>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "\n" +
    "                                <tr>\n" +
    "                                    <td>Telefono de contacto</td>\n" +
    "                                    <td>\n" +
    "                                        <input type=\"text\" data-ng-model=\"tel1\" id=\"tel1\" class=\"form-control\" placeholder=\"\">\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "\n" +
    "                                <tr>\n" +
    "                                    <td>Celular de contacto</td>\n" +
    "                                    <td>\n" +
    "                                        <input type=\"text\" data-ng-model=\"tel2\" id=\"tel2\" class=\"form-control\" placeholder=\"\">\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "\n" +
    "                                </tbody>\n" +
    "                            </table>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <fieldset ng-show=\"step == 3\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <button class=\"btn btn-lg-btn-primary\" ng-click=\"step = 1\"> atras</button>\n" +
    "                    <input type=\"submit\" ng-disabled=\"formBusy\" class=\"btn btn-default mar-bot-40\">\n" +
    "                    <i ng-show=\"formBusy\" class=\"fa fa-cog fa-spin\"></i>\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/pets/views/edit-pet.client.view.html',
    "<section data-ng-controller=\"PetsController\"  data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>{{pet.name}}</h1>\n" +
    "        <a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "            <i class=\"fa fa-trash\"></i> Eliminar perfíl\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "\n" +
    "            <div class=\"panel panel-info\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-3 col-lg-3 \" align=\"center\">\n" +
    "                            <label class=\"control-label\" for=\"name\">Foto</label>\n" +
    "                            <br/><br/>\n" +
    "                            <img ng-if=\"pet.picture\" alt=\"{{pet.name}}\" ng-src=\"{{pet.picture | cloudinaryProfile}}\" class=\"\">\n" +
    "                            <br/><br/>\n" +
    "                            <div class=\"controls\">\n" +
    "                                <input type=\"file\"  fileread=\"pet.picture\"  data-ng-model=\"pet.picture\" id=\"images.name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\" col-md-9 col-lg-9 \">\n" +
    "                            <table class=\"table table-user-information\">\n" +
    "                                <tbody>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"isPrivate\">Perfil Privado?</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"checkbox\" data-ng-model=\"pet.isPrivate\" id=\"isPrivate\" class=\"form-control\">\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"isAdoption\">En adopción?</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"checkbox\" data-ng-model=\"pet.isAdoption\" id=\"isAdoption\" class=\"form-control\">\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr ng-hide=\"true\">\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"name\">Nombre</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"hidden\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"nombre de la mascota\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr ng-hide=\"true\">\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"breed\">Raza</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"hidden\" data-ng-model=\"pet.breed\" id=\"breed\" class=\"form-control\" placeholder=\"Raza\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"color\">Color</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"text\" data-ng-model=\"pet.color\" id=\"color\" class=\"form-control\" placeholder=\"Color\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td><label class=\"control-label\" for=\"yearOfBirth\">Nació</label></td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"text\" ng-if=\"pet.yearOfBirth\" disabled data-ng-model=\"pet.yearOfBirth | date:'fullDate'\" id=\"yearOfBirth\" class=\"form-control\" placeholder=\"Fecha de Nac\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "\n" +
    "                                <tr>\n" +
    "                                <tr ng-hide=\"true\">\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"color\">Genero</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"hidden\" data-ng-model=\"pet.genre\" id=\"genre\" class=\"form-control\" placeholder=\"\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"neutered\">Castrado</label>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <div class=\"controls\">\n" +
    "                                            <input type=\"checkbox\" data-ng-model=\"pet.neutered\" id=\"neutered\" class=\"form-control\" placeholder=\"Si/ No\" required>\n" +
    "                                        </div>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>Email de contacto</td>\n" +
    "                                    <td>\n" +
    "                                        <input ng-if=\"pet.email\" type=\"text\" data-ng-model=\"pet.email\" id=\"email\" class=\"form-control\" placeholder=\"usuario@email.com\" required>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <td><label class=\"control-label\" for=\"description\">Descripcion o Rasgos de la mascota</label></td>\n" +
    "                                <td>\n" +
    "                                    <div class=\"controls\">\n" +
    "                                        <input type=\"text\" data-ng-model=\"pet.description\" id=\"description\" class=\"form-control\" placeholder=\"Mancha pata derecha\" required>\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                        <iframe ng-if=\"pet.address\" width=\"100%\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"https://www.google.com.ar/maps/place/\"{{pet.address + '&output=embed'}}></iframe>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"description\">Dirección</label>\n" +
    "                                        <input type=\"text\" data-ng-model=\"pet.address\" id=\"address\" class=\"form-control\" placeholder=\"Calle 123 - PB\" required>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"tel1\">Teléfono de contacto</label>\n" +
    "                                        <input type=\"text\" data-ng-model=\"pet.tel1\" id=\"tel1\" class=\"form-control\" placeholder=\"\">\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td>\n" +
    "                                    </td>\n" +
    "                                    <td>\n" +
    "                                        <label class=\"control-label\" for=\"tel2\">Celular de contacto</label>\n" +
    "                                        <input type=\"text\" data-ng-model=\"pet.tel2\" id=\"tel2\" class=\"form-control\" placeholder=\"\">\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "\n" +
    "                                </tbody>\n" +
    "                            </table>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" ng-disabled=\"formBusy\" class=\"btn btn-default mar-bot-40\">\n" +
    "                    <i ng-show=\"formBusy\" class=\"fa fa-cog fa-spin\"></i>\n" +
    "                </div>\n" +
    "                <div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "                    <strong data-ng-bind=\"error\"></strong>\n" +
    "                </div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/pets/views/list-pets-adoption.client.view.html',
    "<h3>Mascotas</h3>\n" +
    "<section data-ng-init=\"findAdoptions()\" class=\"row\">\n" +
    "  <pet-list></pet-list>\n" +
    "  <h4 class=\"alert alert-purple text-center pv-lg\" data-ng-if=\"!pets.length\">\n" +
    "      Actualmente no hay mascotas en adopción, deseas <a href=\"/#!/pets/create\" class=\"text-yellow\">agregar una</a>?\n" +
    "  </h4>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/pets/views/list-pets-missing.client.view.html',
    "<h3>Mascotas</h3>\n" +
    "<section ng-init=\"findMissing()\" class=\"row\">\n" +
    "\t<pet-list></pet-list>\n" +
    "\t<h4 class=\"alert alert-purple text-center pv-lg\" data-ng-if=\"!pets.length\">\n" +
    "\t\tActualmente no hay mascotas perdidas, deseas <a href=\"/#!/pets/create\" class=\"text-yellow\">agregar una</a>?\n" +
    "\t</h4>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/pets/views/list-pets.client.view.html',
    "<h3>Mascotas</h3>\n" +
    "<section data-ng-init=\"find()\" class=\"row\">\n" +
    "  <pet-list></pet-list>\n" +
    "  <h4 class=\"alert alert-purple text-center pv-lg\" data-ng-if=\"!pets.length\">\n" +
    "      No tienes mascotas creadas, deseas <a href=\"/#!/pets/create\" class=\"text-yellow\">crear una</a>?\n" +
    "  </h4>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/pets/views/qr.client.view.html',
    "<div>\n" +
    "\t<style>\n" +
    "\t\t@media print{\n" +
    "\t\t\tsection.a {\n" +
    "\t\t\t\tclear: both;\n" +
    "\t\t\t\tborder: 0.05cm gray dashed;\n" +
    "\t\t\t\theight: 4cm;\n" +
    "\t\t\t\twidth: 6.4cm;\n" +
    "\t\t\t\tmargin-bottom: 0.5cm;\n" +
    "\t\t\t}\n" +
    "\t\t\t.id-front, .id-back{\n" +
    "\t\t\t\twidth: 2.8cm;\n" +
    "\t\t\t\theight: 3.6cm;\n" +
    "\t\t\t\tbackground-color: #76c5f0;\n" +
    "\t\t\t\tborder: 0.2cm solid black;\n" +
    "\t\t\t\tfloat: left;\n" +
    "\t\t\t}\n" +
    "\t\t\t.id-front-2, .id-back-2{\n" +
    "\t\t\t\twidth: 2.8cm;\n" +
    "\t\t\t\theight: 3.6cm;\n" +
    "\t\t\t\tbackground-color: #dea5a4;\n" +
    "\t\t\t\tborder: 0.2cm solid black;\n" +
    "\t\t\t\tfloat: left;\n" +
    "\t\t\t}\n" +
    "\t\t\t.pin {\n" +
    "\t\t\t\theight: 0.6cm;\n" +
    "\t\t\t\twidth: 100%\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\t.pin .circle {\n" +
    "\t\t\t\twidth: 0.3cm;\n" +
    "\t\t\t\theight: 0.3cm;\n" +
    "\t\t\t\tbackground: white;\n" +
    "\t\t\t\tborder-radius: 50%;\n" +
    "\t\t\t\tborder: 2px solid black;\n" +
    "\t\t\t\tmargin: 0.2cm auto 0;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\t.qr {\n" +
    "\t\t\t\twidth: 100%;\n" +
    "\t\t\t\theight: 2cm;\n" +
    "\t\t\t\tbackground-color: white;\n" +
    "\t\t\t\ttext-align: center;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\t.qr img {\n" +
    "\t\t\t\theight: 2cm;\n" +
    "\t\t\t\twidth: 2cm;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\t.name {\n" +
    "\t\t\t\twidth: 100%;\n" +
    "\t\t\t\theight: 0.6cm;\n" +
    "\t\t\t\tfont-size: 0.5cm;\n" +
    "\t\t\t\tline-height: 0.8cm;\n" +
    "\t\t\t\tfont-family: sans-serif;\n" +
    "\t\t\t\tvertical-align: middle;\n" +
    "\t\t\t\ttext-align: center;\n" +
    "\t\t\t\tpadding: 0.05cm 0 0;\n" +
    "\t\t\t\tcolor: white;\n" +
    "\t\t\t\tfont-weight: 400;\n" +
    "\t\t\t\ttext-transform: uppercase;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\t.page, .tel {\n" +
    "\t\t\t\twidth: 90%;\n" +
    "\t\t\t\theight: 1.5cm;\n" +
    "\t\t\t\tfont-size: 0.25cm;\n" +
    "\t\t\t\tmargin: 0 auto;\n" +
    "\t\t\t\tcolor: white;\n" +
    "\t\t\t\ttext-align: center;\n" +
    "\t\t\t\tfont-family: sans-serif;\n" +
    "\t\t\t\tline-height: 0.4cm;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\t.page span {\n" +
    "\t\t\t\tfont-weight: bold;\n" +
    "\t\t\t\ttext-decoration: underline;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\t.tel {\n" +
    "\t\t\t\tfont-weight: bold;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.b {\n" +
    "\t\t\t\tclear: both;\n" +
    "\t\t\t\tborder: 0.05cm gray dashed;\n" +
    "\t\t\t\theight: 4cm;\n" +
    "\t\t\t\twidth: 6.4cm;\n" +
    "\t\t\t\tmargin-bottom: 0.5cm;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.b .page, section.b .tel {\n" +
    "\t\t\t\tcolor: black;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.b .name {\n" +
    "\t\t\t\twidth: 100%;\n" +
    "\t\t\t\theight: 0.6cm;\n" +
    "\t\t\t\tfont-size: 0.5cm;\n" +
    "\t\t\t\tline-height: 0.8cm;\n" +
    "\t\t\t\tfont-family: sans-serif;\n" +
    "\t\t\t\tvertical-align: middle;\n" +
    "\t\t\t\ttext-align: center;\n" +
    "\t\t\t\tpadding: 0.05cm 0 0;\n" +
    "\t\t\t\tcolor: black;\n" +
    "\t\t\t\tfont-weight: 400;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.c {\n" +
    "\t\t\t\tclear: both;\n" +
    "\t\t\t\tborder: 0.05cm gray dashed;\n" +
    "\t\t\t\theight: 3.2cm;\n" +
    "\t\t\t\twidth: 4.8cm;\n" +
    "\t\t\t\tmargin-bottom: 0.5cm;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.c .id-front-2, section.c .id-back-2{\n" +
    "\t\t\t\twidth: 2cm;\n" +
    "\t\t\t\theight: 2.8cm;\n" +
    "\t\t\t\tbackground-color: #76c5f0;\n" +
    "\t\t\t\tborder: 0.2cm solid black;\n" +
    "\t\t\t\tfloat: left;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.c .qr {\n" +
    "\t\t\t\twidth: 100%;\n" +
    "\t\t\t\theight: 1.5cm;\n" +
    "\t\t\t\tbackground-color: white;\n" +
    "\t\t\t\ttext-align: center;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.c .qr img {\n" +
    "\t\t\t\theight: 1.5cm;\n" +
    "\t\t\t\twidth: 1.5cm;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.c .page, section.c .tel {\n" +
    "\t\t\t\twidth: 90%;\n" +
    "\t\t\t\theight: 1.5cm;\n" +
    "\t\t\t\tfont-size: 0.25cm;\n" +
    "\t\t\t\tmargin: 0 auto;\n" +
    "\t\t\t\tcolor: white;\n" +
    "\t\t\t\ttext-align: center;\n" +
    "\t\t\t\tfont-family: sans-serif;\n" +
    "\t\t\t\tline-height: 0.4cm;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.c .page span {\n" +
    "\t\t\t\tfont-weight: bold;\n" +
    "\t\t\t\ttext-decoration: underline;\n" +
    "\t\t\t}\n" +
    "\n" +
    "\t\t\tsection.c .name {\n" +
    "\t\t\t\twidth: 100%;\n" +
    "\t\t\t\theight: 0.3cm;\n" +
    "\t\t\t\tfont-size: 0.3cm;\n" +
    "\t\t\t\tline-height: 0.5cm;\n" +
    "\t\t\t\tfont-family: sans-serif;\n" +
    "\t\t\t\tvertical-align: middle;\n" +
    "\t\t\t\ttext-align: center;\n" +
    "\t\t\t\tpadding: 0.05cm 0 0;\n" +
    "\t\t\t\tcolor: white;\n" +
    "\t\t\t\tfont-weight: 400;\n" +
    "\t\t\t}\n" +
    "\t\t}\n" +
    "\t</style>\n" +
    "\t<section id=\"id-container\" class=\"c\">\n" +
    "\t\t<article class=\"id-front-2\" ng-class=\"{'female': pet.genre.name == 'Hembra'}\">\n" +
    "\t\t\t<div class=\"pin\">\n" +
    "\t\t\t\t<div class=\"circle\"></div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"qr-container\">\n" +
    "\t\t\t\t<img class=\"qr\" ng-src=\"/qr/{{pet.slug}}\" alt=\"\"/>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<!--<div class=\"qr\" ng-bind-html=\"svg\"></div>-->\n" +
    "\t\t\t<div class=\"name\" ng-bind=\"pet.name\"></div>\n" +
    "\t\t</article>\n" +
    "\t\t<article class=\"id-back-2\" ng-class=\"{'female': pet.genre.name == 'Hembra'}\">\n" +
    "\t\t\t<div class=\"pin\">\n" +
    "\t\t\t\t<div class=\"circle\"></div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"page\">\n" +
    "\t\t\t\tmascoteros.net<br/>/#!/pet/<br/><span>{{pet.slug}}</span>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"tel\" ng-show=\"pet.tel1 && !pet.tel2\">{{pet.tel1}}</div>\n" +
    "\t\t\t<div class=\"tel\" ng-show=\"pet.tel2\">{{pet.tel2}}</div>\n" +
    "\t\t</article>\n" +
    "\t</section>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('modules/pets/views/view-pet.client.view.html',
    "<div data-ng-init=\"findOneBySlug(); getGeoLocalization();\"></div>\n" +
    "<pet-profile-view></pet-profile-view>\n"
  );


  $templateCache.put('modules/pets/views/view-pets.client.view.html',
    "<div data-ng-init=\"findOne(); getGeoLocalization();\"></div>\n" +
    "<pet-profile-view></pet-profile-view>\n"
  );


  $templateCache.put('modules/pettypes/views/create-pettype.client.view.html',
    "<section data-ng-controller=\"PettypesController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Pettype</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/pettypes/views/edit-pettype.client.view.html',
    "<section data-ng-controller=\"PettypesController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Pettype</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"pettype.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/pettypes/views/list-pettypes.client.view.html',
    "<section data-ng-controller=\"PettypesController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Pettypes</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"pettype in pettypes\" data-ng-href=\"#!/pettypes/{{pettype._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"pettype.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"pettype.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"pettype.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!pettypes.$resolved || pettypes.length\">\n" +
    "    \tNo Pettypes yet, why don't you <a href=\"/#!/pettypes/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/pettypes/views/view-pettype.client.view.html',
    "<section data-ng-controller=\"PettypesController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"pettype.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == pettype.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/pettypes/{{pettype._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"pettype.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"pettype.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/rescues/views/create-rescue.client.view.html',
    "<section data-ng-controller=\"RescuesController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Rescue</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/rescues/views/edit-rescue.client.view.html',
    "<section data-ng-controller=\"RescuesController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Rescue</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"rescue.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/rescues/views/list-rescues.client.view.html',
    "<section data-ng-controller=\"RescuesController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Rescues</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"rescue in rescues\" data-ng-href=\"#!/rescues/{{rescue._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"rescue.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"rescue.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"rescue.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!rescues.$resolved || rescues.length\">\n" +
    "    \tNo Rescues yet, why don't you <a href=\"/#!/rescues/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/rescues/views/view-rescue.client.view.html',
    "<section data-ng-controller=\"RescuesController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"rescue.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == rescue.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/rescues/{{rescue._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"rescue.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"rescue.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/roles/views/create-role.client.view.html',
    "<section data-ng-controller=\"RolesController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Role</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/roles/views/edit-role.client.view.html',
    "<section data-ng-controller=\"RolesController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Role</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"role.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/roles/views/list-roles.client.view.html',
    "<section data-ng-controller=\"RolesController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Roles</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"role in roles\" data-ng-href=\"#!/roles/{{role._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"role.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"role.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"role.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!roles.$resolved || roles.length\">\n" +
    "    \tNo Roles yet, why don't you <a href=\"/#!/roles/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/roles/views/view-role.client.view.html',
    "<section data-ng-controller=\"RolesController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"role.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == role.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/roles/{{role._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"role.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"role.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/shelters/views/create-shelter.client.view.html',
    "<section data-ng-controller=\"SheltersController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Shelter</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/shelters/views/edit-shelter.client.view.html',
    "<section data-ng-controller=\"SheltersController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Shelter</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"shelter.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/shelters/views/list-shelters.client.view.html',
    "<section data-ng-controller=\"SheltersController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Shelters</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"shelter in shelters\" data-ng-href=\"#!/shelters/{{shelter._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"shelter.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"shelter.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"shelter.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!shelters.$resolved || shelters.length\">\n" +
    "    \tNo Shelters yet, why don't you <a href=\"/#!/shelters/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/shelters/views/view-shelter.client.view.html',
    "<section data-ng-controller=\"SheltersController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"shelter.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == shelter.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/shelters/{{shelter._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"shelter.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"shelter.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/shops/views/create-shop.client.view.html',
    "<section data-ng-controller=\"ShopsController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Shop</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/shops/views/edit-shop.client.view.html',
    "<section data-ng-controller=\"ShopsController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Shop</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"shop.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/shops/views/list-shops.client.view.html',
    "<section data-ng-controller=\"ShopsController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Shops</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"shop in shops\" data-ng-href=\"#!/shops/{{shop._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"shop.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"shop.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"shop.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!shops.$resolved || shops.length\">\n" +
    "    \tNo Shops yet, why don't you <a href=\"/#!/shops/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/shops/views/view-shop.client.view.html',
    "<section data-ng-controller=\"ShopsController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"shop.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == shop.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/shops/{{shop._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"shop.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"shop.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/trainers/views/create-trainer.client.view.html',
    "<section data-ng-controller=\"TrainersController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Trainer</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/trainers/views/edit-trainer.client.view.html',
    "<section data-ng-controller=\"TrainersController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Trainer</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"trainer.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/trainers/views/list-trainers.client.view.html',
    "<section data-ng-controller=\"TrainersController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Trainers</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"trainer in trainers\" data-ng-href=\"#!/trainers/{{trainer._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"trainer.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"trainer.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"trainer.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!trainers.$resolved || trainers.length\">\n" +
    "    \tNo Trainers yet, why don't you <a href=\"/#!/trainers/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/trainers/views/view-trainer.client.view.html',
    "<section data-ng-controller=\"TrainersController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"trainer.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == trainer.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/trainers/{{trainer._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"trainer.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"trainer.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );


  $templateCache.put('modules/vets/views/create-vet.client.view.html',
    "<section data-ng-controller=\"VetsController\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>New Vet</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/vets/views/edit-vet.client.view.html',
    "<section data-ng-controller=\"VetsController\" data-ng-init=\"findOne()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Edit Vet</h1>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-horizontal\" data-ng-submit=\"update()\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" for=\"name\">Name</label>\n" +
    "                    <div class=\"controls\">\n" +
    "                        <input type=\"text\" data-ng-model=\"vet.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n" +
    "                </div>\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\n" +
    "\t\t\t\t</div>\n" +
    "            </fieldset>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/vets/views/list-vets.client.view.html',
    "<section data-ng-controller=\"VetsController\" data-ng-init=\"find()\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h1>Vets</h1>\n" +
    "    </div>\n" +
    "    <div class=\"list-group\">\n" +
    "        <a data-ng-repeat=\"vet in vets\" data-ng-href=\"#!/vets/{{vet._id}}\" class=\"list-group-item\">\n" +
    "\t\t\t<small class=\"list-group-item-text\">\n" +
    "\t\t\t\tPosted on\n" +
    "\t\t\t\t<span data-ng-bind=\"vet.created | date:'medium'\"></span>\n" +
    "\t\t\t\tby\n" +
    "\t\t\t\t<span data-ng-bind=\"vet.user.displayName\"></span>\n" +
    "\t\t\t</small>\n" +
    "\t\t\t<h4 class=\"list-group-item-heading\" data-ng-bind=\"vet.name\"></h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-warning text-center\" data-ng-hide=\"!vets.$resolved || vets.length\">\n" +
    "    \tNo Vets yet, why don't you <a href=\"/#!/vets/create\">create one</a>?\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('modules/vets/views/view-vet.client.view.html',
    "<section data-ng-controller=\"VetsController\" data-ng-init=\"findOne()\">\n" +
    "\t<div class=\"page-header\">\n" +
    "\t\t<h1 data-ng-bind=\"vet.name\"></h1>\n" +
    "\t</div>\n" +
    "\t<div class=\"pull-right\" data-ng-show=\"((authentication.user) && (authentication.user._id == vet.user._id))\">\n" +
    "\t\t<a class=\"btn btn-primary\" href=\"/#!/vets/{{vet._id}}/edit\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-edit\"></i>\n" +
    "\t\t</a>\n" +
    "\t\t<a class=\"btn btn-primary\" data-ng-click=\"remove();\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<small>\n" +
    "\t\t<em class=\"text-muted\">\n" +
    "\t\t\tPosted on\n" +
    "\t\t\t<span data-ng-bind=\"vet.created | date:'mediumDate'\"></span>\n" +
    "\t\t\tby\n" +
    "\t\t\t<span data-ng-bind=\"vet.user.displayName\"></span>\n" +
    "\t\t</em>\n" +
    "\t</small>\n" +
    "</section>\n"
  );

}]);
