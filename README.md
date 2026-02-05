
# Exercise 3.10 The project, step 18 (GKE and cronjobs)

 Task: Create now a CronJob that makes a backup of your todo database (once
 per 24 hours) and saves it to Google Object Storage

## Folders
  - \services       Contains base applications for the cutlass-project   
    - \cutlass-app  Web UI part.
    - \cutlass-backend The API layer. Handles and stores todo's. Limit max todo length to 140 chars.
    - \cutlass-feeder : Go project to fetch a random wiki page and store it toto system
    - manifests      Kubernetes files to install and set up the project to the cluster  
  - \backup    Backup cronjob related files
    - cutlass-backup    Docker iamge for the backup cronjob manifest
  - \setup     PostgreSQL and database initializing files

### GKE setup

  Setup at first GCKE cluster with Gateway API support. e2-small with two nodes should be sufficient
  
### Postgresql setup 
  
  - Setup the postgreSQL instance at first : 
    
    ```
    cd setup
    kustomize build . | kubectl apply -f - 
    ``` 
    
    Login to a running to the postgres-svc pod to check status of installation :

    ```
     # psql -h postgres-svc -U admin -d postgres
    
     postgres=# \l
     postgres=# \du
     postgres=# \c cutlass
     postgres=# \dt
    ```    

### Installation

  This application can be installed only trough Github Actions and GCKE artifact repository. Trigger the installation procedure when these are ready from making a change to single file inside of the \service-folder.

  After github actions has run successfully, build table structures running locally next commands:
    
```
    cd \service\db-init
    kubectl apply -f db-init-sql.yaml
    kubectl apply -f db-init-job.yaml
```
    

### The Task setup and verifying it:

   Start the installation by making one change to a file in the \cutlass-backup folder.

   Create a SIGNED_URL for the backup scripts with command:

```
$ gsutil signurl -m PUT -d 168h -c application/sql dwk-gke-XXXXX-XXXXX.json gs://dwk-cutlass-<bucket_name>/pg_backup_$(date +%Y-%m-%d).sql 
```
    
   Update created signed to \backup\manifest\backuo-cm.yaml and update config with kubectl apply.

   Check that the backup-cronjob is uo and running and a feeder job is add new rows to the db.
