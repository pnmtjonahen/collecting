# My Collection application

- Check it out / Or clone it.
- make a sub folder data in the app folder and place a cards.json file in there.

## electron

run the following:
see https://capacitor-community.github.io/electron/#/./getting-started/index

```bash
npm run build
npx cap add @capacitor-community/electron
npx cap open @capacitor-community/electron
```

## Docker

```bash
docker build -t tjonahen/collecting:latest -t registry.tjonahen.home:5000/tjonahen/collecting .
docker push registry.tjonahen.home:5000/tjonahen/collecting
```