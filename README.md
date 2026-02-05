
# Exercise 3.11 The project, step 19 (GKE and cronjobs)

 Task: Set sensible resource requests and limits for the project.

## Folders
  - \services       Contains base applications for the cutlass-project   
    - \cutlass-app  Web UI part.
    - \cutlass-backend The API layer. Handles and stores todo's. Limit max todo length to 140 chars.
    - \cutlass-feeder : Go project to fetch a random wiki page and store it toto system
    - manifests      Kubernetes files to install and set up the project to the cluster  
  - \backup    Backup cronjob related files
    - cutlass-backup    Docker image for the backup cronjob manifest
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

  After GitHub actions has run successfully, build table structures running locally next commands:
    
```
    cd \service\db-init
    kubectl apply -f db-init-sql.yaml
    kubectl apply -f db-init-job.yaml
```
    

### The task setup and verifying it:

    You find the command `kubectl top pods -n project/postgres` useful.
