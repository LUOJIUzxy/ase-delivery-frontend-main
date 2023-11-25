# Getting Started With Local Deployment

Make sure the backend has already started in docker container for the external network is defined in backend side.

Then follow below steps:
## Clone Repo
```bash
git clone git@gitlab.lrz.de:ase-22-23/team13/ase-delivery-frontend.git
```

## Docker compose build under dev environment
```bash
docker-compose -f ./docker-compose-dev.yml build --no-cache
```

## Docker compose up under dev environment
```bash
docker-compose -f ./docker-compose-dev.yml up
```

## Play with the React-UI
Now you can visit the localhost:3000 and you should be directed to the login page.