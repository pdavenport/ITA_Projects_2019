module.exports = (app, db) => {
  app.get( "/books", (req, res) =>
    db.book.findAll().then( (result) => res.json(result) )
  );

  app.get( "/book/:id", (req, res) =>
    db.book.findByPk(req.params.id).then( (result) => res.json(result))
  );

  app.post("/book", (req, res) => 
    db.book.create({
      title: req.body.title,
      content: req.body.content
    }).then( (result) => res.json(result) )
  );

  app.put( "/book/:id", (req, res) =>
    db.book.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );

  app.delete( "/book/:id", (req, res) =>
    db.book.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
}