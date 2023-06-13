const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
       res.status(401).send('<body style="background:black;"><div style="text-align:center;font-size:20px;font-family:sans-serif;background-color:white;width:350px;margin:auto;margin-top:200px;padding:40px;border-radius:30px;line-height:2;"> Not Logged In <br> Access Denied <br><br><a href="../" style="background:rgb(84, 80, 211);color:white;padding:10px;border-radius:20px;margin:10px;text-decoration:none;"> Click to return to Log in Page </a> </div>');
    }
  }
  
  module.exports = isLoggedIn