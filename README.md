# Getting Started
Das Projekt wurde clientseitig mit React und MaterialUI und serverseitig mit PHP umgesetzt
## Setup

/client 
> npm install
> npm start
<br>
> configure server url in src/services/local.service.js

/server 
> composer install
<br>
> configure database in config.php

## Documentation
### Client
---
#### /assets
> Alle Grafiken, Bilder und lokale Schriften

##### /components/posts
> Alle components in zusammenhang mit posts
##### /components/posts/PostActions.js
> Einstellungen eines Posts (liken, löschen, ...)
##### /components/posts/PostForm.js
> Erstellen eines Posts (Verwendung in feed.js, profile.js)
##### /components/posts/PostList.js
> Eine Liste von mehreren Posts (Verwendung in Feed.js, Profile.js, UserProfile.js)
##### /components/routing
> Routing
##### /components/user
> Alle components in zusammenhang mit der darstellung von Usern
##### /components/user/UserCard.js
> Usercard
##### /components/user/UserList.js
> Eine Liste von mehreren Usern (Verwendung in Profile.js, Users.js)
##### /components/Layout.js
> Container der Seite
##### /components/Nav.js
> Navigation der Seite
##### /components/NoContent.js
> Wenn etwas nicht dargestellt werden kann/nicht gefunden wird (Keine Posts, keine User, Seite nicht gefunden)
##### /components/StyledForm.js
> Gestyltes Formular (Login, Signup, Settings)
##### /context
> Beinhaltet alle Contexts
##### /helpers
> Bereiten Funktionen für Fetchanfragen vor. Definiert die jeweiligen Pfade und die Methode (GET, POST, PUT oder DELETE)
##### /pages
> Beinhaltet die Seiten und dessen Unterseiten
##### /services
> Beinhaltet die Fetchanfragen und die BaseUrl<br>
##### /services/local.service.js
> Service für Fetchanfragen auf den eigenen Server
##### /styles
> Beinhaltet das Styling, basierend auf MUI

### Server
---
##### /Controller
> Beinhaltet alle Controller
##### /Model
> Beinhaltet alle Models
##### /Model/Traits
> Beinhaltet alle Methoden, welche von meherern Controllern beansprucht werden 
##### /config.php
> Configuration der Datenbank
