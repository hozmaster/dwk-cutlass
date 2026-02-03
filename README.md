
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

  - Setup GCKE cluster with Gateway API support.
  

### Postgresql setup 
  
  - Setup PostgreSQL at first : 
    
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

  - This application can be installed only trough Github Actions and GCKE artifact repository. 

### The Task setup and verifying it:

   - Trigger the build installation and making a change empty in the \cutlass-backup-folder.  

   - Create a SIGNED_URL for the backup scripts:

```
$ gsutil signurl -m PUT -d 168h -c application/sql dwk-gke-XXXXX-XXXXX.json gs://dwk-cutlass-<bucket_name>/pg_backup_$(date +%Y-%m-%d).sql 
```
    
   - Update created signed 