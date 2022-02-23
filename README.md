# <img src="https://github.com/gmtorres95/GratiBox-front/blob/main/public/favicon.ico" height="24px" /> GratiBox (back-end)

Get a monthly subscription of natural products and meditation equipments!  
Check the front-end of this application [here](https://github.com/gmtorres95/GratiBox-front)  
Link of the API: https://gratibox-backend.herokuapp.com/

## Technologies

<div styles="display: flex">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white" height="28px" />
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
</div>

## How to use the API

### POST /sign-up

With this route you can create a new user.  
<details>
  <summary>Send a JSON like this one:</summary>

  ```bash
  {
    "name": "myUsername",
    "email": "myemail@gmail.com",
    "password": "12345678"
  }
  ```
</details>

### POST /sign-in

With this route you can sign-in into your account.
<details>
  <summary>Send a JSON like this one:</summary>

  ```bash
  {
    "email": "myemail@gmail.com",
    "password": "12345678"
  }
  ```
</details>
<details>
  <summary>This route will return a JSON like this one:</summary>

  ```bash
  {
    "id": 1,
    "name": "myUsername",
    "token": "f7bccb16-cf91-4be8-94c1-b104273a0de7"
  }
  ```
</details>

### GET /subscription

With this route you can get the user's subscription.  
This route needs a bearer token authorization.  
<details>
  <summary>This route will return a JSON like this one:</summary>

  ```bash
  {
    "id": 1,
    "subscription_date": "2021-11-22T00:00:00.000Z",
    "plan": {
      "name": "Semanal",
      "delivery_day": "friday"
    },
    "delivery": {
      "name": "myUsername",
      "address": "Rua João Teodoro, 750, Brás",
      "zipcode": "01105000",
      "city": "São Paulo",
      "state": "SP"
    },
    "items": [
      "Chas",
      "Incensos"
    ]
  }
  ```
</details>

### POST /subscription

With this route you can get a new subscription.  
This route needs a bearer token authorization.  
<details>
  <summary>Send a JSON like this one:</summary>

  ```bash
  {
    "name": "myUsername",
    "dayId": 1,
    "items": [1, 2],
    "address": "Rua João Teodoro, 750, Brás",
    "zipcode": "01105000",
    "city": "São Paulo",
    "state": "SP",
  }
  ```
</details>

## How to run

### Install the application

```bash
# Clone this repository
$ git clone https://github.com/gmtorres95/GratiBox-back

# Install the dependencies
$ npm i
```

### Configure the .env file

Use the .env.example file

### Run the application

```bash
$ npm run start
```
