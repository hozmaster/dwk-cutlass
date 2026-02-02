
# Exercise 3.10 The project, step 18 (GKE and cronjobs)

 Task: Create now a CronJob that makes a backup of your todo database (once
 per 24 hours) and saves it to Google Object Storage

## Folders

  - \cutlass-app Web UI part.
  - \cutlass-backend The API layer. Handles and stores todo's. Limit max todo length to 140 chars. 
  - \cutlass-feeder : Go project to fetch a random wiki page and store it toto system
  - \k8s YAMl manifests files for Kubernetes 
  - \postgresql  K8s setup files for poostgresql 

### GKE setup

  - Setup GCKE cluster with Gateway API. 

### Postgresql setup 
  
  - Setup PostgreSQL at first : 
    
    ```
    cd postgresql
    kubectl apply -f k8s/
    ```
    
    After it has finished, and it's running, setup needed user, roles and databases:
    
    ```
    cd ..
    cd manifest/db-init
    kubectl apply -f database-init-sql
    kubectl apply -f database-job-sql.yaml
    ```
    
    Re-run a githun which applies kustomization-script for         
    And after create needed tables what is needed the cutlass-service:
  
    ```
    kubectl create ns cutlass
    kubectl apply -f structure-init-sql.yaml
    kubectl apply -f structure-init-job.yaml
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
   -  