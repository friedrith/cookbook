<h1 align="center">
  <img src="src/assets/logo.svg" alt="CookBook" height="70">
</h1>

CookBook is not like other recipe app. The goal is to reproduce the principle of grandmother cook book but with modern tools. For CookBook, we focus on features that really matter in addition of great accessibility and multiple languages support.

The goal is too simplify user life and do most the job. It includes importing the recipes as easier as possible, help him to retrieve them.

## Getting started

```bash
# You need to initialize some environment variables
cp .env.template .env

yarn

yarn start

# in parallel (other terminal)
cd api
nvm use v16.17.0
yarn serve
```

For service worker debugging, you need to run in production with https

```
ngrok ...

```

## Contributing

Before contributing, please read the [./CONTRIBUTING.md](Guidelines).

## Useful links

- https://web.dev/add-manifest/
- [Accessibility](https://reactjs.org/docs/accessibility.html)
- [Single page applications for github pages](https://github.com/rafgraph/spa-github-pages)

## Colors

- #fd5c63
- #E71E4D
- #E21A5F
- #D70466
