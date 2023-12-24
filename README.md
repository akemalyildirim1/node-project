# node-project

## Table of contents
* [How To Install?](#how-to-install)
* [How To Run Application?](#how-to-run-application)
* [How To Run Tests?](#how-to-run-tests)

## How To Install?

Before running the application, you need to install the required dependencies:

Run

```bash
npm install
```

or

```bash
npm i
```

## How To Run Application?

Before running the application, you need to provide the environment variables to the application.

The variables are listed:
```
MONGO_URI=${MONGO_URI}
```

After exporting the environment variables, run:
```bash
npm run start
```

Also,
```bash
npm run dev
```

is recommended to use while developing the application.

## How To Run Tests?

Before running the tests, you need to do two things:

1. Run mongodb in localhost by using docker.
```bash
docker-compose -f docker-compose.test.yml up -d
```

2. Install test data.
```bash
node test/setup/setup.js
```

Now, the test environment is ready.

Run
```bash
npm run test
```

**Note: Do not forget to shut down the docker container after testing.**
```bash
docker-compose -f docker-compose.test.yml down
```





