# crud-Menu-subMenu
Personal project, simple crud for Menu and Submenu.
This is web-service that can do simple crud with Menu dan Submenu.
The relation between that two is one menu consists of multiple submenus, but one submenu would only exist on a single menu.

The project use express.js and sequelize(postgreql)
--------------------------------------------

### URL endpoint

##### Get all menu

```
http://localhost:8080/api/menu
```

##### Getall submenu

```
http://localhost:8080/api/submenu
```

##### Get single menu by id

```
http://localhost:8080/api/menu/:id
```

##### Get single submenu by id

```
http://localhost:8080/api/submenu/:id
```

##### Get single menu by label

```
http://localhost:8080/api/menu?label=:label
```

##### Get single submenu by label

```
http://localhost:8080/api/submenu?label=:label
```

##### Add new menu
```
http://localhost:8080/api/menu
```
with content on body, price on menu is optional
```
{
    "label":"label example",
    "price":120000,
    "description":"Desc example"
}
```

##### Add new submenu
```
http://localhost:8080/api/submenu
```
with content on body, menu_id is for association with menu 
```
{
    "label":"label example",
    "price":45000,
    "description":"desc example",
    "menu_id":1
}
```

##### Update menu
```
http://localhost:8080/api/menu/:id
```
with content on body like in add

##### Update submenu
```
http://localhost:8080/api/submenu/:id
```
with content on body like in add

##### Delete menu
```
http://localhost:8080/api/menu/:id
```

##### Delete submenu
```
http://localhost:8080/api/submenu/:id
```