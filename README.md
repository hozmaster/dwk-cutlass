
# Exercise 3.12 The project, step 20 (Resources and limits)

 Task: Set sensible resource requests and limits for the project.

## Folders
  - \services       Contains base applications for the cutlass-project   
    - \cutlass-app  Web UI part.
    - \cutlass-backend The API layer. Handles and stores todo's. Limit max todo length to 140 chars.
    - \cutlass-feeder : Go project to fetch a random wiki page and store it toto system
    - manifests      Kubernetes files to install and set up the project to the cluster  
  - \backup         Backup cronjob related files
    - cutlass-backup    Docker image for the backup cronjob manifest
  - \setup     PostgreSQL and database initializing files

### GKE setup

  Setup at first GCKE cluster with Gateway API support. e2-micro or e2-small with two nodes should be sufficient
  
### PostgreSQL setup 
  
  - Set up the postgreSQL instance and needed database and tables to K8s cluster at first : 
    
    ```
    cd setup
    kustomize build . | kubectl apply -f - 
    ``` 
    
    Login to a running to the postgres-svc pod to check status of installation :
    
    ```
     # psql -h postgres-svc -U admin -d postgres
    
     postgres=# \l
     postgres=# \du
    ```    

    Now there should be database called 'cutlass' and proper username and roles has created for the service.

### Service installation

    You need setup GKE cluster to to allow Github Actions to build and install the service.

### Logging

# Enable system logs 
```
gcloud container clusters update my-cluster \
--logging=SYSTEM
```


# Disable logging 
```
gcloud container clusters update my-cluster \
--logging=SYSTEM