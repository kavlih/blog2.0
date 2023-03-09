# Introduction
SAP clientseitig umgesetzt mit React und MaterialUI und serverseitig mit PHP.

## Previews
#### Sign in/up formulars
![Screenshot 2022-04-19 at 18 39 09](https://user-images.githubusercontent.com/31021961/224061775-cfafcc1f-0e89-4229-8ed2-6edf9fe68467.png)
![Screenshot 2022-04-19 at 18 39 39](https://user-images.githubusercontent.com/31021961/224061777-c9c42e51-aec2-4213-a85b-2c42572a5913.png)
#### Feed
![Screenshot 2022-04-19 at 18 38 56](https://user-images.githubusercontent.com/31021961/224061771-362cf27d-1c7e-462a-a922-70794624c808.png)
#### Profile
![Screenshot 2022-04-19 at 18 38 42](https://user-images.githubusercontent.com/31021961/224061764-0d0815f6-43f6-4930-a771-b959293008a6.png)
![Screenshot 2022-04-19 at 18 38 49](https://user-images.githubusercontent.com/31021961/224061767-6104f2a6-de4f-4776-8288-8d4d1dd318e3.png)
#### Users
![Screenshot 2022-04-19 at 18 38 24](https://user-images.githubusercontent.com/31021961/224061761-17bd8288-4cec-4db4-86e6-dddd1ef236a5.png)
#### Settings
![Screenshot 2022-04-19 at 18 38 11](https://user-images.githubusercontent.com/31021961/224061752-f0967fea-1310-490e-8b05-fffb072845f1.png)

# Setup
## /client 
    npm install
    npm start
> configure server url in src/services/local.service.js

## /server 
    composer install
> configure database in config.php

# Documentation
## Client
#### /assets
> Alle Grafiken, Bilder und lokale Schriften

#### /components/posts
> Alle components in zusammenhang mit posts
#### /components/posts/PostActions.js
> Einstellungen eines Posts (liken, löschen, ...)
#### /components/posts/PostForm.js
> Erstellen eines Posts (Verwendung in feed.js, profile.js)
#### /components/posts/PostList.js
> Eine Liste von mehreren Posts (Verwendung in Feed.js, Profile.js, UserProfile.js)
#### /components/routing
> Routing
#### /components/user
> Alle components in zusammenhang mit der darstellung von Usern
#### /components/user/UserCard.js
> Usercard
#### /components/user/UserList.js
> Eine Liste von mehreren Usern (Verwendung in Profile.js, Users.js)
#### /components/Layout.js
> Container der Seite
#### /components/Nav.js
> Navigation der Seite
#### /components/NoContent.js
> Wenn etwas nicht dargestellt werden kann/nicht gefunden wird (Keine Posts, keine User, Seite nicht gefunden)
#### /components/StyledForm.js
> Gestyltes Formular (Login, Signup, Settings)
#### /context
> Beinhaltet alle Contexts
#### /helpers
> Bereiten Funktionen für Fetchanfragen vor. Definiert die jeweiligen Pfade und die Methode (GET, POST, PUT oder DELETE)
#### /pages
> Beinhaltet die Seiten und dessen Unterseiten
#### /services
> Beinhaltet die Fetchanfragen und die BaseUrl<br>
#### /services/local.service.js
> Service für Fetchanfragen auf den eigenen Server
#### /styles
> Beinhaltet das Styling, basierend auf MUI

## Server
#### /Controller
> Beinhaltet alle Controller
#### /Model
> Beinhaltet alle Models
#### /Model/Traits
> Beinhaltet alle Methoden, welche von meherern Controllern beansprucht werden 
#### /config.php
> Configuration der Datenbank
