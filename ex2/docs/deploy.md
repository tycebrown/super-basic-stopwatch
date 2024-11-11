## Deploying On Google Cloud

You will need the following installed:

- [Docker](https://www.docker.com/)
- [Google Cloud Cli](https://cloud.google.com/sdk/docs/install)
  - Make sure to run `gcloud init` after installing
- [Python3](https://www.python.org/downloads/)

You also need a [Google Cloud](cloud.google.com) account setup.

### 1. Create/select project

If you already have a project you would like to deploy this site to, then run:

```
gcloud config set project $YOUR_PROJECT_ID
```

and skip to the next step.

Otherwise else, do the following:

1. Run

```
gcloud projects create $YOUR_PROJECT_ID
gcloud config set project $YOUR_PROJECT_ID
```

- _Choose whatever project id is appropriate for your project_

2. Run the following to list your billing accounts:

```
gcloud billing accounts list
```

3. Finally, link one of your billing account to your project:

```
gcloud billing projects link $YOUR_PROJECT_ID --billing-account $YOUR_BILLING_ACCOUNT_ID
```

### 2. Deploy

Run

```
gcloud run deploy --source .
```

in the `ex2` directory of your local clone of this repo. When prompted:

- Answer yes to enable APIs
- Enter the [region](https://cloud.google.com/compute/docs/regions-zones/) to deploy your project
- Answer yes to create a docker repo
- If you want anyone to be able to access your repo, answer yes to unauthenticated access

### 3. Enjoy :)

If, any step of the way, you run into trouble, see the [google cloud docs](https://cloud.google.com/docs)
