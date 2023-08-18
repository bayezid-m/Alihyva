## Description

This is an ecommerce site containing dummy products, users and so one. This application covers almost everything of an actual ecommerce site.
Some of the highlights are dark theme, card, pagination, authentication, protected routes, sorting product, filtering etc.The API has ben used 
from `https://fakeapi.platzi.com/`. I have mainly built the prontend site and the fapeapi handles all the backend request. It also has small emplementation 
of testing.

## Table of content

1. React
2. Typescript
3. Route
4. Testing
5. Material UI
5. Redux
6. Reducer
7. SASS/SCSS
8. Route protection
9. Custom hooks
10. Components
11. Pagination
12. API endpoints

## Feature

1. User authentication
2. Admin specific tasks (add, update, delete a product)
3. filtering product by catergory or price range or high low order
4. Dynamic dark theme
5. Adding product in cart and managing quantity
6. Some protected routes
7. Well responsive UI
8. Pagination for product card

## Instalation

1. git cone + {my project repository}
2. npm install
3. npm start
4. npm test (for testing)

## Installed packages for project

1. npx create-react-app AliHyva --template redux-typescript
2. npm install --save-dev ts-test
3. npm install --save-dev @testing-library/user-event
3. npm install @mui/material @emotion/react @emotion/styled
4. npm install @mui/icons-material
5. npm install react-router-dome

## Deployment

Live demo -> "https://alihyva.netlify.app/"

## Folder structure

````
src
├── App.css
├── App.tsx
├── components
│   ├── CardView.tsx
│   ├── Footer.tsx
│   ├── NavBar.tsx
│   ├── Pagination.tsx
│   └── Protector.tsx
├── hooks
│   ├── useAppDispatch.ts
│   └── useAppSelecter.ts
├── index.css
├── index.tsx
├── pages
│   ├── CartPage.tsx
│   ├── ConfirmPage.tsx
│   ├── Login.tsx
│   ├── NewProduct.tsx
│   ├── ProductInfo.tsx
│   ├── Profile.tsx
│   ├── Register.tsx
│   ├── RequestPage.tsx
│   ├── UpdateProduct.tsx
│   └── home.tsx
├── redux
│   ├── reducers
│   │   ├── cartReducer.ts
│   │   ├── categoryReducer.ts
│   │   ├── productReducer.ts
│   │   └── userReducer.ts
│   └── store.ts
├── setupTests.ts
├── styles
│   ├── cardView.scss
│   ├── footer.scss
│   ├── home.scss
│   ├── newProduct.scss
│   ├── profile.scss
│   ├── style.scss
│   └── updateProfile.scss
├── tests
│   ├── components
│   ├── data
│   │   ├── category.ts
│   │   └── products.ts
│   ├── reducers
│   │   └── productsReducer.test.ts
│   ├── servers
│   │   └── productServer.ts
│   └── shared
│       └── store.ts
└── types
    ├── CartItem.ts
    ├── Category.ts
    ├── NewProduct.ts
    ├── Product.ts
    ├── UpdateProduct.ts
    ├── User.ts
    └── UserCredential.ts

````
