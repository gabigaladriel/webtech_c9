var express = require('express');
var router = express.Router();
var BookService = require('../services/service.book');

/* GET customer listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Invalid Book UID."});
});

/* adds a new customer to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const book = await BookService.create(body);

		if(body.guid != null)
		{
			book.guid = body.guid;
		}

		res.cookie('guid', book.guid, { maxAge: 900000, httpOnly: true });

		// created the book! 
		return res.status(201).json({ book: book });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* retrieves a customer by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const book = await BookService.retrieve(req.params.id);

		return res.json({ book: book });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the customer by uid */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const book = await BookService.update(req.params.id, req.body);

		return res.json({ book: book });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the customer from the customer list by uid */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const book= await BookService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;
