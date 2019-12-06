package main

import (
	//database/sql does not know what flavor of sql you intend to use. So we also import the go-sql-driver/mysql driver to tell it we're using mysql instead of postgres or mssql or something else.
	"database/sql"
	"encoding/json"
	"fmt"

	// Because we don't call mysql directly, but database/sql uses it, we need to import it and ignore it with the underscore in front
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

//the port that the api is running on
var port = "8080"

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

//a global database variable as a pointer. We use a pointer so we don't have to create a bunch of copies of our database connection.
var db *sql.DB

//A custom struct to hold the fields from the database
type Product struct {
	ID          int64  `json:"id"`
	ProductName string `json:"prod_name"`
	Price       int64  `json:"price"`
	Description string `json:"description"`
	Category    string `json:"category"`
	ProductNum  int64  `json:"prod_number"`
	Image       string `json:"image"`
}

type User struct {
	ID          int64  `json:"id"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Email       string `json:"email"`
	Phone       int64  `json:"phone"`
	Password    string `json:"password"`
	ContactMeth string `json:"contact_method"`
	HeardFrom   string `json:"heard_from"`
	Comments    string `json:"comments"`
	SubToNews   string `json:"sub_to_news"`
}

func main() {
	fmt.Println("connecting to db second time")
	database, err := sql.Open("mysql", "root:passwordfake@tcp(db:3306)/db") ////this might have to change
	if err != nil {
		panic(err)
	}
	//assign the database connection we created to the global variable db
	db = database

	//Always close your connection with a defer right after opening. Defer will run the db.Close when the function main() completes.
	defer db.Close()

	//define which function handles which route
	http.HandleFunc("/products", prodRequest)
	http.HandleFunc("/users", usersRequest)

	//need an application to run to constantly listen
	fmt.Printf("Listening on port %s\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		panic(err)
	}
}

//This is the handler for the root path "/"
func prodRequest(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		products := []Product{}
		query := `SELECT id, prod_name, price, description, category, prod_number, image FROM product`
		enableCors(&w)
		rows, err := db.Query(query)
		if err != nil {
			fmt.Println(err)
			return
		}

		for rows.Next() {
			var product Product
			err := rows.Scan(&product.ID, &product.ProductName, &product.Price, &product.Description, &product.Category, &product.ProductNum, &product.Image)
			if err != nil {
				fmt.Println(err)
				return
			}
			products = append(products, product)
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json") //let header know it's in a json
		json.NewEncoder(w).Encode(products)

	}
}
func usersRequest(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var user User
		json.NewDecoder(r.Body).Decode(&user)

		//insert query with `?` to parameterize values to protect from sql injection
		query := `INSERT INTO user (first_name, last_name, email, phone, password, contact_method, heard_from, comments, sub_to_news) values (?,?,?,?,?,?,?,?,?)`
		//using db.Exec for inserts returns a Result, not a row. Give it a query plus the parameters that will replace each `?` in the query string
		res, err := db.Exec(query, user.FirstName, user.LastName, user.Email, user.Phone, user.Password, user.ContactMeth, user.HeardFrom, user.Comments, user.SubToNews)
		if err != nil {
			fmt.Println(err)
			return
		}

		id, err := res.LastInsertId()

		if err != nil {
			fmt.Println(err)
			return
		}
		// now that you have the last inserted ID, you can save it to the user that came in on the original request.
		user.ID = id

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(user)
	}
}
