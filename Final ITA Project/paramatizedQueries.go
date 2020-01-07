import "github.com/gorilla/mux"

var err error
	//Assign the paramated in the URL to the variable 'params'
	params := mux.Vars(r)

	missionNumber := params["missionnumber"]
	// If not an integer, we return an error:
	_, err = strconv.Atoi(missionNumber)
	if err != nil {
		err = CustErr(err, "Mission number is not an integer.\nStopping here.")
		log.Println(err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
CUSTOM SQL QUERY V V V V
Make the sql query:
sqlStatement := `SELECT * FROM email_checked_by_john
WHERE mission_number = $1`
rows, err := db.Query(sqlStatement, missionNumber)
if err != nil {
err = CustErr(err, "Following query failed: "+sqlStatement+"\nStopping here.")
log.Println(err)
http.Error(w, "Internal server error", http.StatusInternalServerError)
return emails, err
}
defer rows.Close()




