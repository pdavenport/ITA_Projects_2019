package main

import (
	// I'm using sql here, so we'll be using the database/sql package
	// http://go-database-sql.org/importing.html
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"encoding/json"
	"fmt"
	"net/http" // or gorilla mux for queries with specific ID's:
  //"github.com/gorilla/mux"
)


// First up: define some global functions and variables.

// Later on we'll be using "ListenAndServe" to listen on the TCP network and handle requests from incoming connections and serve them accordingly. For this we need to define our port as a global
var port = "8080"

// We need to enable cors because we're making a request to a 'third party' (our database) for information. So we'll make a function that can add this to the headers whenever needed.
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
// database/sql package tells us we need to tell GO what our db connections are going to be.
// http://go-database-sql.org/accessing.html
// What is a database object?
// https://github.com/go-sql-driver/mysql/wiki/Examples
// handle for a database = our *sql.DB
// So why can't we use 'var db sql.DB'?
// pool (multiple memory addresses) = potential energy
// According to database/sql :
// "The first actual connection to the underlying datastore will be established lazily, when it’s needed for the first time."
// https://goinbigdata.com/golang-pass-by-pointer-vs-pass-by-value/
// so when you pass by value, you're copying the entire db pool and opening connections everytime you call it, creating lots of left open and redundant connections
// We're going to pass by pointer.
var db *sql.DB

// Product : A custom struct to hold the Product fields from the database. Fun fact, in Go this is how you're supposed to comment structs for some reason. StructName : comment here
type Product struct {
	ID          int64  `json:"id"`
	ProductName string `json:"prod_name"`
	Price       int64  `json:"price"`
	Description string `json:"description"`
	Category    string `json:"category"`
	ProductNum  int64  `json:"prod_number"`
	Image       string `json:"image"`
}

// User : A custom struct to hold the User fields from the database
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
	database, err := sql.Open("mysql", "root:passwordfake@tcp(db:3306)/db") /////// ALWAYS USE A FAKE PASSWORD! _ESPECIALLY_ IF YOU'RE UPLOADING TO GITHUB! For your docker files, use an .env file to substitute sensitive information
	if err != nil {
		panic(err)
	}
	//assign the database connection we created to the global variable db (sql.DB is actually a struct)
	db = database

	//Always close your connection with a defer right after opening. Defer will run the db.Close when the function main() completes.
	defer db.Close()

	//define which function handles which route
	http.HandleFunc("/products", prodRequest)
	http.HandleFunc("/users", usersRequest)
	// mux : http://www.gorillatoolkit.org/pkg/mux

	//need an application to run to constantly listen
	fmt.Printf("Listening on port %s\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		panic(err)
	}
}

func prodRequest(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		products := []Product{} // the structure of what we're going to return
		query := `SELECT id, prod_name, price, description, category, prod_number, image FROM product`
		enableCors(&w) // make sure we have cors in the header
		rows, err := db.Query(query) // db.Query will return the rows affected by the query, whereas db.Exec will return the num of affected rows
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
			products = append(products, product) // Append adds elements to the end of a slice. It technically creates a new slice of the things you want to append, so you have to make sure you put the variable first, so it's included.
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
		// Next we need to make what's called a prepared statement. This is a SQL statement with parameter placeholders which is sent to the DB.
		// Why?
		// So this:
		
		// var x = 1
		// SELECT * FROM users where id = x

		// Doesn't get turned into:

		// var x = 1; DROP TABLE users;
		// SELECT * FROM users where id =1; DROP TABLE users;


		// "In MySQL, as well as in most databases, you first send the SQL (program) to the server and ask for it to be prepared with placeholders for bind parameters. 
		// The server responds with a statement ID. You then send an execute a command to the server, passing it the statement ID and the parameters."

		// So basically we're telling our DB that you're going to execute ONLY:
		// SELECT * FROM users where id = ?
		// and anything else sent after should be considered a value and not part of the "program"
		// So if someone spoofs a request with 'DROP TABLE' or something similar, it will NOT be added to the "program"

		// The prepared statement defined by the database/sql package would look like this:
		query := `INSERT INTO user (first_name, last_name, email, phone, password, contact_method, heard_from, comments, sub_to_news) values (?,?,?,?,?,?,?,?,?)` 
		// MySQL = ?, ?, ?  PostgreSQL = $1, $2, $3  Oracle = :val1, :val3, :val3
		
		res, err := db.Exec(query, user.FirstName, user.LastName, user.Email, user.Phone, user.Password, user.ContactMeth, user.HeardFrom, user.Comments, user.SubToNews)
		if err != nil {
			fmt.Println(err)
			return
		}
		// included in what db.Exec returns is LastInsertId() (int64, error) as well as RowsAffected() (int64, error)
		id, err := res.LastInsertId()

		if err != nil {
			fmt.Println(err)
			return
		}
		// now that you have the last inserted ID, you can save it to the user that came in on the original request.
		user.ID = id

		w.WriteHeader(http.StatusCreated) // 201
		json.NewEncoder(w).Encode(user)
	}
}

// Gorilla Mux for queries with IDs:
// http://www.gorillatoolkit.org/pkg/mux

r := mux.NewRouter()
r.HandleFunc("/products/{id}", prodIDRequest)
//r.HandleFunc("/users/{id}", usersIDRequest)
//r.HandleFunc("/products/{category}/{id:[0-9]+}", prodCategoryIDRequest)
params := mux.Vars(r)
userID := params["id"]
//category := params["category"]
func prodIDRequest(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodGet {
        products := []Product{} // structure of what we're returning, IE: JSON
        query := `SELECT id, prod_name, price, description, category, prod_number, image FROM product WHERE ID = ?` 
        enableCors(&w)
        rows, err := db.Query(query, userID)
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


// sory by ascending/descending:
// r.HandleFunc("/articles/{category}/{sort:(?:asc|desc|new)}", ArticlesCategoryHandler)
