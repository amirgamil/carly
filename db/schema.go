package db

type Letter struct {
	Hash    string `json:"hash"`
	Title   string `json:"title"`
	Message string `json:"message"`
	Person  string `json:"person"`
	Image   string `json:"image"`
}
