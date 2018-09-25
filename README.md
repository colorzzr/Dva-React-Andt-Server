# Color's Web Server

Using ant-design + dva + React. Parse-API is need for Postgresql. Operating Golang Program in back-end

---

<p align="center">
  <img src="https://zos.alipayobjects.com/rmsportal/bmkNCEoluwGaeGjYjInf.png" />
</p>

## Getting Started
Install dependencies.

```bash
$ npm install
```

or

```bash
$ yarn
```


Start server.

```bash
$ npm start
```

or 

```bash
$ yarn start
```

If success, app will be open in your default browser automatically.

## Few Important Note

[Introduction to Dva](https://juejin.im/entry/5852184b128fe1006b5454c6)

React component life cycle:

component start with the `componentWillMount` -> `componentDidMount` -> `render`

the component will reload ONLY IF the `state` of component is changed

---

dva-loading:

dva-loading is used to help controlling asynchronized request.(To back or database)

once using the `app.use(createLoading())`, dva would give global models call`loading` with following structure

```
{
	global: false,
	models:{},
	effects:{},
}
```

Note here! there is noting in `models` and `effects` is empty. because dva does not know what model you have.

once the model is excuting the `effects`(OK Here! `effects` not `reducers`!!), dva would automaticly adding the

models and effects,




