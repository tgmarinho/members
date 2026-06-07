# Members

A CRUD app to manage members and people, with a dashboard, backed by a GraphQL API on Hasura.

**Live demo:** https://members-app.vercel.app/

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB">
  <img alt="Apollo" src="https://img.shields.io/badge/Apollo-311C87?style=flat-square&logo=apollographql&logoColor=white">
  <img alt="GraphQL" src="https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white">
  <img alt="Hasura" src="https://img.shields.io/badge/Hasura-1EB4D4?style=flat-square&logo=hasura&logoColor=white">
  <img alt="Chakra UI" src="https://img.shields.io/badge/Chakra%20UI-319795?style=flat-square&logo=chakraui&logoColor=white">
</p>

## What it does

- Create, read, update, and delete members.
- Mark members as active or inactive. Inactive members stay in the database.
- List members by active and inactive status.
- Show a dashboard with counts by active and inactive status, age, gender, and birthdays.
- Generate a dynamic PDF report from selected fields.

## Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/)
- [Hasura](https://hasura.io/)
- [Chakra UI](https://chakra-ui.com/)

The app reads and writes data through a GraphQL API served by Hasura.

## Run locally

This project uses yarn.

```bash
git clone https://github.com/tgmarinho/members.git
cd members
yarn
yarn dev
```

Other scripts:

- `yarn build` builds the production app.
- `yarn start` runs the production build.
- `yarn test` runs the tests with Jest.

## Environment

The app uses Firebase for authentication. Create a `.env` file based on `.env.sample` and fill in your Firebase keys:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

The Hasura GraphQL endpoint is set in `graphql/apollo.js`. Change it there if you run your own Hasura instance.

## License

This project is under the [MIT](./LICENSE) license.
