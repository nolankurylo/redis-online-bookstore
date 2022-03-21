# redis-online-bookstore

This is an Online Bookstore to demonstrate how to use a Redis database as a caching system via Docker. It is a simple web app that has a page for creating book orders, an admin page to view orders sorted by purchase date and an order confirmation page. It is built using a Docker compose file where a docker container is created for the Redis server and one for the application that communicate over a bridge network.

## Final Application

### Orders Page
![image](https://user-images.githubusercontent.com/44009838/159213789-abaf2544-9d6c-43bd-b5d9-2e5d87135222.png)

### Order Confirmation Page
![image](https://user-images.githubusercontent.com/44009838/159213851-727b9652-f52c-4811-a392-c9c9630da3c0.png)

### Admin - Orders Retrieval Page (sorted oldest orders first)
![image](https://user-images.githubusercontent.com/44009838/159213905-53704514-032a-4a8f-ad48-869d0f864076.png)

