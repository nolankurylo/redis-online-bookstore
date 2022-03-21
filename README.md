# redis-online-bookstore

This is an Online Bookstore to demonstrate how to use a Redis database as a caching system via Docker. It is a simple web app that has a page for creating book orders, an admin page to view orders sorted by purchase date and an order confirmation page. It is built using a Docker compose file where a docker container is created for the Redis server and one for the application that communicate over a bridge network.
