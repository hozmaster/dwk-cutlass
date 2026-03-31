
# Exercise 4.5 The project, step 22

- Our todo application could use "Done" field for
todos that are already done. It should be a PUT request to /todos/
<id>

After this exercise, your app could look something like this:

## Folders
  - \services       Contains base applications for the cutlass-project   
    - \cutlass-app  Web UI part.
    - \cutlass-backend The API layer. Handles and stores todo's. Limit max todo length to 140 chars.
    - \cutlass-feeder : Go project to fetch a random wiki page and store it toto system
    - manifests      Kubernetes files to install and set up the project to the cluster  
  - \backup          Backup cronjob related files
    - cutlass-backup    Docker image for the backup cronjob manifest
  - \setup     PostgreSQL and database initializing files

### GKE setup

  Setup at first GCKE cluster with Gateway API support. e2-micro or e2-small with two nodes should be sufficient
  
### PostgreSQL setup 
  
  - Set up the postgreSQL instance and needed database and tables to K8s cluster at first : 
    
    ```
    cd setup
    sops -d manifetsts\secret.enc.yaml > manifetsts\secret.yaml   
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

    Now there should be database called 'cutlass' and proper username and roles has created for the service.

### Service installation

You need setup GKE cluster to allow GitHub Actions to trigger the build and install the service.

Find the external URL (Gateway API way)

```bash
 kubectl get gateway cutlass-gateway -n project -o jsonpath='{.status.addresses[0].value} `
``` 

Example output you might see:

```bash
Addresses:
  Value:  34.118.XX.XX
```

Then open:
- http://34.118.XX.XX/

### Task info 

See images from inside the [screenshots](./screenshots) folder 

### Logging

*Enable system logs* 
```
gcloud container clusters update my-cluster \
--logging=SYSTEM
```

*Disable logging* 
```
gcloud container clusters update my-cluster \
--logging=NONE