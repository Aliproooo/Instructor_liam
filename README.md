#### Step 1 To install the dependencies

`npm run install `

### Step 2 env past this data

`DATABASE_URL="mysql://dbeaver:dbeaver@localhost:3306/multivendor" // replace this with your own db url
STRIPE_PUBLISABLE_KEY="pk_test_51OgYkcE3r2iYwawjHoN2vtHP0LSWT1YTURGXLYjmuiE3ZyphOdOO7xDCmp2GdYpUEASxs3acvpE215Vrxm9xBOPZ00XJiCB6sd"
STRIPE_SECRET_KEY="sk_test_51OgYkcE3r2iYwawjIkx67l4JMHRygA3zbl8ceIFX9WrraLzNCUgsre61tCJPxM3OUwkrOO4HDIq5RksLgAsyYkrg00bdZ8Tev2"
UPLOADTHING_SECRET=sk_live_1b58d77d1f4d1acae7bb4a67d2fb4bba4d4a09db0d407b1c01d1fad61a9cceae
UPLOADTHING_APP_ID=z2vozdzv3f
STRIPE_WEBHOOK_SECRET="whsec_47bd902bd28a1027c684a2768c066ec462651429b376a6816e05be65b48f9a31"
DOMAIN="http://localhost:3000"`

### Step 3 env.local paste this data

`KINDE_CLIENT_ID=eb9e009bf55e4c64bcf0233d84a2969f
KINDE_CLIENT_SECRET=XgidmTGJwVPuXRvPoxefObBZeLd2V7XpdPKUzP6xuicm75SI2O
KINDE_ISSUER_URL=https://multivendors2.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard`

### Step 4 after adding the right creds in env files

`npx prisma db push`
`npx prisma generate`

### Step 5 login

##### after running the application go the /dashbord route

#### sign up with a user

###### after that go to your kinde dashboard settings permission tab and create the permission after creating the permission go to the roles tab to create the roles
