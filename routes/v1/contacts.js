const {Router} = require("express");
const router = Router();
const {contacts, ContactModel, Pager, sortContacts, filterContacts, ContactNotFoundError} = require("@jworkman-fs/asl");

router.get("/", (req, res)=>{
	const {page=1, limit=10, sort, direction} = req.query;
	const filtered = filterContacts(req.get("X-Filter-By"), req.get("X-Filter-Operator"), req.get("X-Filter-Value"))
	const sorted = sortContacts(filtered, sort, direction);
	const pager = new Pager(sorted, page, limit);
	res.set("X-Page-Total", pager.total);
	res.set("X-Page-Next", pager.next());
	res.set("X-Page-Prev", pager.prev());
	res.json(pager.results());
});

router.get("/:id", (req, res, next) => {
	const {id} = req.params;
	try{
		const contact = ContactModel.show(id);
		return res.status(200).json(contact);
	} catch (e) {
		switch (e.name){
			case "ContactNotFoundError":
				return res.status(404).json({message: e.message});
			default:
				return res.status(500).json({message: e.message});
		}
	}
});

router.post("/", (req, res) => {
	try {
		const {id} = ContactModel.create(req.body);
		return res.redirect(303, `/v1/contacts/${id}`);
	} catch (e) {
		switch (e.name) {
			case "InvalidContactError":
				return res.status(400).json({message: e.message}); //break is unecessary
			default:
				return res.status(500).json({message: e.message});
		}
	}
});

router.put("/:id", (req, res, next)=>{
	const {id} = req.params;
	try{
		ContactModel.update(id, req.body);
		return res.redirect(303, `/v1/contacts/${id}`);
	} catch (e) {
		switch (e.name){
			case "ContactNotFoundError":
				return res.status(404).json({message: e.message}); //break is unecessary
			default:
				return res.status(500).json({message: e.message});
		}
	}
});

router.delete("/:id", (req, res, next)=>{
	const {id} = req.params;
	try{
		ContactModel.remove(id);
		return res.redirect(303, "/v1/contacts/");
	} catch (e) {
		switch (e.name){
			case "ContactNotFoundError":
				return res.status(404).json({message: e.message});
			default:
				return res.status(500).json({message: e.message});
		}
	}
	
})
module.exports = router;