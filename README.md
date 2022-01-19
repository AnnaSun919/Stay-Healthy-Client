# Be active , stay healthy

Stay Healthy is a Platform for users to create and join healthy activities.

Server-side repo:
https://github.com/AnnaSun919/Stay-Healthy-Server

## Deployment Link 

https://be-active-stay-healthy.herokuapp.com/  
Demo-User please use:  
Username: Mary  
Password: 123456Aa!  

## User Stories
- 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- Signup: As an anon I can sign up in the platform so that I can start joining activities
- Login: As a user I can login to the platform so that I can see my the activities I will join
- Logout: As a user I can logout from the platform so no one else can use it
- Add activities As a user I can add an activity so that I can share it with the community
- List activities As a user I want to see the activities so that I can choose one to join
- Comment actvites as a user i can comment any activites

## Backlog
- User community
- see other users profile chat with them

## Goal 
- learn to use React class and react hooks 
- learn to build UI with Material UI 
- learn to build components with React.js 

## Client Side 
### Routes 
- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /activities - activities list
- /activites/create - create a activity
- /activities/:id - activie detail
- /profile/me - my details and activities I will join

### Pages
- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Activities List Page (public )
- Activities Create (user only)
- Activities Detail Page (public only)
- My Profile Page (user only)
- 404 Page (public)



## Services Side 
### Auth Services
- auth.login(user)
- auth.signup(user)
- auth.logout()
- auth.profile()
- auth.getUser() // synchronous

### Activities Services
- activities.list()
- activities.create(data)
- activities.detail(id)
- activities.join
- activities.comment()


## Models


### User Model:

    username:
    type: String,
    unique: true,
    require: true,

    password:
    type: String,
    required : true,
    
    img:String


### Activities Model:

    user: ID
    name: String,
    require: true,
    
    date: String,
    time: String,
    Description : String,
    
    joined : Schema.Types.ObjectId, 
    ref: "User",
    
    comment : Schema.Types.ObjectId, 
    ref: "comment",
    
    
### Comment model:

    UserID: Schema.Types.ObjectId,
    ref: "User",
    
    ActivitiesID: Schema.Types.ObjectId, 
    ref: "Activites",
    
    Comment: String,
 
## Built with

-   React.js 
-   React Hooks 
-   MaterialUI
-   Axios
-   Cloudinary 
-   Mongodb
