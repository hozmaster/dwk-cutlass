
# Exercise 3.6 The project, step 15 (GCKE & Github actions)

 Task: Setup automatic deployment for the project as well (Github actions to GCKE)

## Folders

- cutlass-app Web UI part.
- cutlass-backend The API layer. Handles and stores todo's. Limit max todo length to 140 chars. 
- cutlass-feeder : Go project to fetch a random wiki page and store it toto system 

### ENVIRONMENT variables for K8s and dev

| ENV variable      | Recommend value                  | Description                              |
|-------------------|----------------------------------|------------------------------------------|
| TODO_URL_ADDRESS  | http://cutlass-backend-svc:80    | Address of the backend service           |
| IPSUM_PIC_SP_URL  | https://picsum.photos            | Picsum service url                       |
| APP_PORT          | 3000                             | Socket port which app service listen     |
| BACKEND_PORT      | 3010                             | Socket port which backend service listen |     
| TODO_BACKEND_HOST | cutlass-backend-svc              |                                          |
| TODO_BACKEND_PORT | "80"                             |                                          |

### Setup

   - Setup GCKE cluster with Gateway API. Setup artifact repositories to subprojects
   - Set action secrets for : GKE_SA_KEY and GKE_PROJECT-keys.
   - 
   - See KubernetesSubmissions/gcke/README.md for more details. 

### Verification
  
 Get Gateway ip address (`kubectl get gateway -n project`) and enter it to browser.
  
  
### Curl 
* Get all todo's : 'curl -X GET http://<ip_address>/todos'
* Add new todo to the system :  
 
   ` curl -X POST -H 'Content-type: application/json' -d '{"todo":"Learn JavaScript"}' http://<ip_address>/todos'  `
