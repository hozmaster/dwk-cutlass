package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
)

type EnvKey string

func getBackendHost() string {
	var host = os.Getenv("TODO_BACKEND_HOST")
	if len(strings.TrimSpace(host)) == 0 {
		host = "localhost"
	}
	return host
}

func getBackendPort() string {
	var port = os.Getenv("TODO_BACKEND_PORT")
	if len(strings.TrimSpace(port)) == 0 {
		port = "3010"
	}
	return port

}

func (key EnvKey) GetValue() string {
	return os.Getenv(string(key))
}

type RandomResponse struct {
	Query struct {
		Random []struct {
			Title string `json:"title"`
		} `json:"random"`
	} `json:"query"`
}

func createNewTodo(action string) {

	url := "http://" + getBackendHost() + ":" + getBackendPort() + "/todos"
	values := map[string]string{"todo": action}
	jsonValue, _ := json.Marshal(values)
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
}

func main() {
	client := &http.Client{
		Transport: &http.Transport{},
	}

	req, err := http.NewRequest("GET", "https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json", nil)
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64; rv:10.0) Gecko/20100101 Firefox/127.0")
	resp, err := client.Do(req)

	var data RandomResponse
	if resp.StatusCode != 200 {
		log.Fatal(resp.StatusCode)
	}

	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		log.Fatal(err)
	}

	if len(data.Query.Random) > 0 {
		title := data.Query.Random[0].Title
		url := "https://en.wikipedia.org/wiki/" + strings.ReplaceAll(title, " ", "_")
		// fmt.Println("Random article title:", title)
		var action = "Read " + url
		createNewTodo(action)
	}

}
