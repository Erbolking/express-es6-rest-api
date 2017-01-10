import resource from 'resource-router-middleware';


export default ({ config, db }) => {
	let Post = db.model('Post');

    return resource({
        /** Property name to store preloaded entity on `request`. */
        id : 'post',

        /** For requests with an `id`, you can auto-load the entity.
         *  Errors terminate the request, success sets `req[id] = data`.
         */
        load(req, id, callback) {
            let post = Post.find(facet => facet.id===id ),
                err = post ? null : 'Not found';
            callback(err, post);
        },

        /** GET / - List all entities */
        index({ params }, res) {
            Post.find((err, reviews) => {
                if (err)
                    res.send(err);

                res.json(reviews);
            });
        },

        /** POST / - Create a new entity */
        create({ body }, res) {
            Post.create(body, (err) => {
                if (err)
                    res.send(err);
            });

            res.json(body);
        },

        /** GET /:id - Return a given entity */
        read({ facet }, res) {
            res.json(facet);
        },

        /** PUT /:id - Update a given entity */
        update({ facet, body }, res) {
            for (let key in body) {
                if (key!=='id') {
                    facet[key] = body[key];
                }
            }
            res.sendStatus(204);
        },

        /** DELETE /:id - Delete a given entity */
        delete({ facet }, res) {

            res.sendStatus(204);
        }
    });
}