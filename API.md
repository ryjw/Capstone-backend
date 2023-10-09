# Capstone API Documentation

## GET /

### Request:

```js
fetch(`${API}/`);
```

### Response:

```js
{
  "success": true,
  "message": "Welcome to Capstone Project!"
}
```

## GET /users/token

### Request:

```js
fetch(`${API}/users/token`, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNDJkMjdhMC0zYWI0LTQxYjItYTMzOC0wY2IxMjY4NTc4MTgiLCJpYXQiOjE2OTY2NDkxODB9.YcmDepxQx1q2r0AVwFvR7w5wZDTAeif4V3Hfbb3iUTw",
  },
});
```

### Response:

```js
{
  "success": true,
  "user": {
    "id": "342d27a0-3ab4-41b2-a338-0cb126857818",
    "username": "Peter",
    "role": "MANAGER"
  }
}
```

## POST /users/register

### Request:

```js
fetch(`${API}/users/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "Peter",
    password: "789",
    role: "MANAGER",
  }),
});
```

### Response:

```js
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNDJkMjdhMC0zYWI0LTQxYjItYTMzOC0wY2IxMjY4NTc4MTgiLCJpYXQiOjE2OTY2NDkxODB9.YcmDepxQx1q2r0AVwFvR7w5wZDTAeif4V3Hfbb3iUTw"
}
```

## POST /users/login

### Request:

```js
fetch(`${API}/users/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "Maria",
    password: "12cats",
  }),
});
```

### Response:

```js
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NmM5MDYzMC00OTgwLTQwYWEtOWI0Ny01OWRhN2Y2ODhjMmQiLCJpYXQiOjE2OTY2NDg5NDgsImV4cCI6MTY5NjY1MjU0OH0.yjjie4sCpTrb97kG5Ey89cnr0HGWPxvmf5ho8zKqmFo"
}
```

## DELETE /users/:userId

### Request:

```js
fetch(`${API}/users/501c288d-e235-43b8-898c-5d2a74ea0588`, {
  method: "DELETE",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwOTIwMGM1OC0xYzNlLTQ3ZTEtODM4My1mMTllNTM4MTdjZmEiLCJpYXQiOjE2OTY2MzI1Mjh9.ab9APJmcWdkOIDSIEN96zy2TrajwOixkIZZS3-WZJSA",
  },
});
```

### Response:

```js
{
  "success": true,
      "user": {
        "id": "501c288d-e235-43b8-898c-5d2a74ea0588",
        "username": "DeleteMe",
        "role": "MANAGER",
        "createdAt": "2023-10-07T03:33:55.974Z"
      }
 }
```

## GET /orders

### Request:

```js
fetch(`${API}/orders`);
```

### Response:

```js
{
  "success": true,
  "orders": [
    {
      "id": "2a8222f1-aa5c-4926-8511-e1ef7178858a",
      "createdAt": "2023-10-06T21:21:29.234Z",
      "totalPrice": 0,
      "status": "CART",
      "userId": "aed5073f-b74a-4fad-812a-88bc35f45ad4",
      "user": {
        "username": "Jack",
        "id": "aed5073f-b74a-4fad-812a-88bc35f45ad4"
      },
      "orderItems": [
        {
          "id": "d063d641-e61e-47f1-84ba-2fc477a4963b",
          "quantity": 4,
          "orderId": "2a8222f1-aa5c-4926-8511-e1ef7178858a",
          "menuItemId": "21c67342-349a-4ae5-9b8d-41a116fae14e",
          "userId": "aed5073f-b74a-4fad-812a-88bc35f45ad4"
        }
      ]
    },
    {
      "id": "9bd1a538-d654-4952-8518-f188280b836e",
      "createdAt": "2023-10-08T18:42:34.400Z",
      "totalPrice": 0,
      "status": "CART",
      "userId": "fe2a11de-0463-494d-ad5e-3b7e59e64d3b",
      "user": {
        "username": "zak4",
        "id": "fe2a11de-0463-494d-ad5e-3b7e59e64d3b"
      },
      "orderItems": [
        {
          "id": "6b3137e4-dea5-4989-9585-8f9c60e75d61",
          "quantity": 1,
          "orderId": "9bd1a538-d654-4952-8518-f188280b836e",
          "menuItemId": "77efa6c6-0b96-46ac-83b6-99fe8741a6d1",
          "userId": "fe2a11de-0463-494d-ad5e-3b7e59e64d3b"
        }
      ]
    },
    {
      "id": "ce0d3e7f-1d19-4121-b4bf-7cebb436371a",
      "createdAt": "2023-10-07T02:50:45.918Z",
      "totalPrice": 0,
      "status": "CART",
      "userId": "86c90630-4980-40aa-9b47-59da7f688c2d",
      "user": {
        "username": "Maria",
        "id": "86c90630-4980-40aa-9b47-59da7f688c2d"
      },
      "orderItems": [
        {
          "id": "f8559474-54ef-4ec8-a43f-923bc649db96",
          "quantity": 1,
          "orderId": "ce0d3e7f-1d19-4121-b4bf-7cebb436371a",
          "menuItemId": "77efa6c6-0b96-46ac-83b6-99fe8741a6d1",
          "userId": "86c90630-4980-40aa-9b47-59da7f688c2d"
        }
      ]
    },
    {
      "id": "df9f970e-a428-45ec-a2b9-fe7b30080cff",
      "createdAt": "2023-10-07T03:00:44.315Z",
      "totalPrice": 7.25,
      "status": "COMPLETE",
      "userId": "aed5073f-b74a-4fad-812a-88bc35f45ad4",
      "user": {
        "username": "Jack",
        "id": "aed5073f-b74a-4fad-812a-88bc35f45ad4"
      },
      "orderItems": [
        {
          "id": "f531f683-baee-48c5-aa53-d3b85eacd295",
          "quantity": 3,
          "orderId": "df9f970e-a428-45ec-a2b9-fe7b30080cff",
          "menuItemId": "21c67342-349a-4ae5-9b8d-41a116fae14e",
          "userId": "aed5073f-b74a-4fad-812a-88bc35f45ad4"
        }
      ]
    }
  ]
}
```

## GET /orders/:userId

### Request:

```js
fetch(`${API}/orders/aed5073f-b74a-4fad-812a-88bc35f45ad4`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZWQ1MDczZi1iNzRhLTRmYWQtODEyYS04OGJjMzVmNDVhZDQiLCJpYXQiOjE2OTY2NTAyNTYsImV4cCI6MTY5NjY1Mzg1Nn0.tKBNoBxRjPz6kMikLi25ryY1tSf63f3aiCjt_5FDUmQ",
  },
});
```

### Response:

```js
{
  "success": true,
  "orders": [
    {
      "id": "ce0d3e7f-1d19-4121-b4bf-7cebb436371a",
      "createdAt": "2023-10-07T02:50:45.918Z",
      "totalPrice": 0,
      "status": "CART",
      "userId": "86c90630-4980-40aa-9b47-59da7f688c2d",
      "orderItems": [
        {
          "id": "f8559474-54ef-4ec8-a43f-923bc649db96",
          "quantity": 1,
          "orderId": "ce0d3e7f-1d19-4121-b4bf-7cebb436371a",
          "menuItemId": "77efa6c6-0b96-46ac-83b6-99fe8741a6d1",
          "userId": "86c90630-4980-40aa-9b47-59da7f688c2d"
        }
      ]
    } ]
}
```

## POST /orders

### Request:

```js
fetch(`${API}/orders`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDY1MjQ3Ny0yZDY1LTQzYzctYTJmMS1mMzU4ZTQyMGQxYWEiLCJpYXQiOjE2OTQ1Mjk3MDh9.a1HjJulV55JAwyKfKt8sTjpq0AKgGcahBNM1efgFE5g",
  },
});
```

### Response:

```js
{
  "success": true,
  "order": {
    "id": "ce0d3e7f-1d19-4121-b4bf-7cebb436371a",
    "createdAt": "2023-10-07T02:50:45.918Z",
    "totalPrice": 0,
    "status": "CART",
    "userId": "86c90630-4980-40aa-9b47-59da7f688c2d"
  }
}
```

## POST /orders/items

### Request:

```js
fetch(`${API}/items`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZWQ1MDczZi1iNzRhLTRmYWQtODEyYS04OGJjMzVmNDVhZDQiLCJpYXQiOjE2OTY2MjcxMzB9.RYx2o1JSmATKdSCr79FssCiCsZcgdQuYuP59UgYkLFw",
  },
  body: JSON.stringify({
    orderId: "2a8222f1-aa5c-4926-8511-e1ef7178858a",
    menuItemId: "21c67342-349a-4ae5-9b8d-41a116fae14e",
    quantity: 4,
  }),
});
```

### Response:

```js
{
  "success": true,
  "orderItem":
    {
      "id": "d063d641-e61e-47f1-84ba-2fc477a4963b",
      "quantity": 4,
      "orderId": "2a8222f1-aa5c-4926-8511-e1ef7178858a",
      "menuItemId": "21c67342-349a-4ae5-9b8d-41a116fae14e",
      "userId": "aed5073f-b74a-4fad-812a-88bc35f45ad4"
    }
}
```

## PUT /orders/items/:orderItemId

### Request:

```js
fetch(`${API}/orders/items/aecd57be-0765-4a03-bf8d-15db7ed80a25`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NmM5MDYzMC00OTgwLTQwYWEtOWI0Ny01OWRhN2Y2ODhjMmQiLCJpYXQiOjE2OTY2NTM0MzcsImV4cCI6MTY5NjY1NzAzN30.ZddnHI_2dM6sfPk9tQQ6FWFBlnnk4qBdDI-pZYh-CJ4",
  },
  body: JSON.stringify({
    quantity: 17,
  }),
});
```

### Response:

```js
{
  "success": true,
  "orderItem": {
    "id": "aecd57be-0765-4a03-bf8d-15db7ed80a25",
    "quantity": 17,
    "orderId": "e822cf0f-679a-4569-8feb-2f5ab550733a",
    "menuItemId": "3b11d233-fe14-4678-b000-7c2d51dba71a",
    "userId": "86c90630-4980-40aa-9b47-59da7f688c2d"
  }
}
```

## DELETE /orders/items/:orderItemId

### Request:

```js
fetch(`${API}/orders/items/d55ecba1-b526-4277-a3f8-0201123dc2bd`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZWQ1MDczZi1iNzRhLTRmYWQtODEyYS04OGJjMzVmNDVhZDQiLCJpYXQiOjE2OTY2NTAyNTYsImV4cCI6MTY5NjY1Mzg1Nn0.tKBNoBxRjPz6kMikLi25ryY1tSf63f3aiCjt_5FDUmQ",
  },
});
```

### Response:

```js
{
  "success": true,
  "orderItem": {
    "id": "d55ecba1-b526-4277-a3f8-0201123dc2bd",
    "quantity": 2,
    "orderId": "2a8222f1-aa5c-4926-8511-e1ef7178858a",
    "menuItemId": "f629322f-0c3d-47a9-b65f-c1ffb5dc1311",
    "userId": "aed5073f-b74a-4fad-812a-88bc35f45ad4"
  }
}
```

## PUT /orders/:orderId

### Request:

```js
fetch(`${API}/orders/df9f970e-a428-45ec-a2b9-fe7b30080cff`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDY1MjQ3Ny0yZDY1LTQzYzctYTJmMS1mMzU4ZTQyMGQxYWEiLCJpYXQiOjE2OTQ1Mjk3MDh9.a1HjJulV55JAwyKfKt8sTjpq0AKgGcahBNM1efgFE5g",
  },
  body: JSON.stringify({
    totalPrice: 7.25,
    status: "COMPLETE",
  }),
});
```

### Response:

```js
{
  "success": true,
  "order": {
    "id": "df9f970e-a428-45ec-a2b9-fe7b30080cff",
    "createdAt": "2023-10-07T03:00:44.315Z",
    "totalPrice": 7.25,
    "status": "COMPLETE",
    "userId": "aed5073f-b74a-4fad-812a-88bc35f45ad4"
  }
}
```

## GET /menu

### Request:

```js
fetch(`${API}/menu`);
```

### Response:

```js
{
  "success": true,
  "menuItems": [
    {
      "id": "21c67342-349a-4ae5-9b8d-41a116fae14e",
      "name": "The Sponge Bob Special",
      "category": "Burger",
      "image": "8753",
      "isKeto": true,
      "isVegan": false,
      "description": "Our most popular burger. It includes mayo, ketchup, and maple syrup.",
      "price": 7.25
    },
    {
      "id": "3b11d233-fe14-4678-b000-7c2d51dba71a",
      "name": "Spicy Seacucumber Fries",
      "category": "Fries",
      "image": "78932",
      "isKeto": false,
      "isVegan": true,
      "description": "A spicy delight to lighten up your day.",
      "price": 5.5
    },
    {
      "id": "77efa6c6-0b96-46ac-83b6-99fe8741a6d1",
      "name": "Krabby Patty",
      "category": "Burger",
      "image": "8753",
      "isKeto": true,
      "isVegan": false,
      "description": "Created from the gods themselves...",
      "price": 7.25
    },
    {
      "id": "f629322f-0c3d-47a9-b65f-c1ffb5dc1311",
      "name": "Kelp Shake",
      "category": "Milkshake",
      "image": "34343",
      "isKeto": false,
      "isVegan": false,
      "description": "A kelp shake full of seaweed!",
      "price": 8.5
    }
  ]
}
```

## GET /menu/:menuItemId

### Request:

```js
fetch(`${API}/menu/21c67342-349a-4ae5-9b8d-41a116fae14e`);
```

### Response:

```js
{
  "success": true,
  "menuItem": {
    "id": "21c67342-349a-4ae5-9b8d-41a116fae14e",
    "name": "The Sponge Bob Special",
    "category": "Burger",
    "image": "8753",
    "isKeto": true,
    "isVegan": false,
    "description": "Our most popular burger. It includes mayo, ketchup, and maple syrup.",
    "price": 7.25
  }
}
```

## POST /menu

### Request:

```js
fetch(`${API}/menu`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNDJkMjdhMC0zYWI0LTQxYjItYTMzOC0wY2IxMjY4NTc4MTgiLCJpYXQiOjE2OTY2NDkxODB9.YcmDepxQx1q2r0AVwFvR7w5wZDTAeif4V3Hfbb3iUTw",
  },
  body: JSON.stringify({
    "name": "Kelp Shake",
    "category": "Milkshake",
    "image": "34343",
    "isKeto": false,
    "isVegan": false,
    "description": "A Kelp shake full of seaweed!"
    "price": 8.50,
  }),
});
```

### Response:

```js
{
  "success": true,
  "menuItem":
    {
      "id": "f629322f-0c3d-47a9-b65f-c1ffb5dc1311",
      "name": "Kelp Shake",
      "category": "Milkshake",
      "image": "http://photosite.com/34343",
      "isKeto": false,
      "isVegan": false,
      "description": "A Kelp shake full of seaweed!"
      "price": 8.50,
    },
 }
```

## PUT /menu/:menuItemId

### Request:

```js
fetch(`${API}/menu/f629322f-0c3d-47a9-b65f-c1ffb5dc1311`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwOTIwMGM1OC0xYzNlLTQ3ZTEtODM4My1mMTllNTM4MTdjZmEiLCJpYXQiOjE2OTY2MzI1Mjh9.ab9APJmcWdkOIDSIEN96zy2TrajwOixkIZZS3-WZJSA",
  },
  body: JSON.stringify({
    name: "Kelp Shake",
    category: "Milkshake",
    image: "34343",
    isKeto: false,
    isVegan: false,
    description: "A Kelp shake full of seaweed! - Updated Again!",
    price: 8.5,
  }),
});
```

### Response:

```js
{
  "success": true,
  "menuItem": {
    "id": "21c67342-349a-4ae5-9b8d-41a116fae14e",
    "name": "Kelp Shake",
    "category": "Milkshake",
    "image": "34343",
    "isKeto": false,
    "isVegan": false,
    "description": "A Kelp shake full of seaweed! - Updated Again!",
    "price": 8.5
  }
}
```
