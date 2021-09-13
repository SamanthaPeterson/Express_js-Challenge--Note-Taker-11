//Route parameters - Express.js-  express.Router() function is used to create a new router object
//https://www.google.com/search?q=const+router+%3D+require%28%27express%27%29.Router%28%29%3B&rlz=1C5CHFA_enUS956US956&sxsrf=AOaemvIATcH3QXsNTxDVGPSgXWlHatAu7Q%3A1631565170939&ei=crU_YYnfOJGs0PEPr8KnKA&oq=const+router+%3D+require%28%27express%27%29.Router%28%29%3B&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEBYQHkoECEEYAFDk_AhY5PwIYNqCCWgAcAJ4AIABlAGIAZQBkgEDMC4xmAEAoAECoAEBwAEB&sclient=gws-wiz&ved=0ahUKEwiJ4MPz5fzyAhURFjQIHS_hCQUQ4dUDCA4&uact=5
//middleware https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const router = require('express').Router();

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
// add our new route https://morioh.com/p/a1cd78288d90
const notesRoutes = require('./noteRoutes')

//https://www.geeksforgeeks.org/express-js-router-use-function/
//"The router.use() function uses the specified middleware function or functions. It basically mounts middleware for the routes which are being served by the specific router."
router.use(notesRoutes);


//module.exports=router is mapping a router and all logic that's required to map (along with the right callbacks etc...)
//https://stackoverflow.com/questions/56078508/why-is-module-exports-router-is-needed
module.exports = router;

//you have to have express -npm install express
//https://www.npmjs.com/package/express